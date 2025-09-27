import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { supabase } from '@/lib/supabase'

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

// Simple in-memory storage for demo (in production, use database)
const payments: Record<string, {
  txn_id?: string
  screenshot_path?: string
  status: 'pending' | 'pro' | 'rejected'
  submitted_at: string
  note?: string
}> = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = formidable({
      uploadDir: './uploads/payments',
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        return mimetype?.includes('image') || false
      }
    })

    // Ensure upload directory exists
    const uploadDir = './uploads/payments'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const [fields, files] = await form.parse(req)
    
    const user_id = Array.isArray(fields.user_id) ? fields.user_id[0] : fields.user_id
    const txn_id = Array.isArray(fields.txn_id) ? fields.txn_id[0] : fields.txn_id

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    let screenshot_path: string | undefined

    // Handle file upload
    const screenshot = files.screenshot
    if (screenshot && Array.isArray(screenshot) && screenshot.length > 0) {
      const file = screenshot[0]
      const randomName = `${Date.now()}-${Math.random().toString(36).substring(2)}${path.extname(file.originalFilename || '')}`
      const newPath = path.join(uploadDir, randomName)
      
      // Move file to final location
      fs.renameSync(file.filepath, newPath)
      screenshot_path = `/uploads/payments/${randomName}`
    }

    // Validate that at least one proof is provided
    if (!txn_id && !screenshot_path) {
      return res.status(400).json({ 
        error: 'Please provide either Transaction ID or payment screenshot' 
      })
    }

    // Save payment proof
    payments[user_id] = {
      txn_id: txn_id || undefined,
      screenshot_path,
      status: 'pending',
      submitted_at: new Date().toISOString()
    }

    // Save to Supabase if configured
    if (supabase) {
      try {
        await supabase
          .from('payment_proofs')
          .upsert({
            user_id,
            txn_id: txn_id || null,
            screenshot_path,
            status: 'pending',
            submitted_at: new Date().toISOString()
          })
      } catch (dbError) {
        console.log('Supabase error:', dbError)
      }
    } else {
      console.log('Supabase not configured, using in-memory storage')
    }

    res.status(200).json({
      status: 'submitted',
      message: 'Payment proof received. Verification in progress.'
    })

  } catch (error) {
    console.error('Payment submission error:', error)
    res.status(500).json({ error: 'Failed to submit payment proof' })
  }
}
