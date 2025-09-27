import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

// Simple in-memory storage for demo (in production, use database)
const payments: Record<string, {
  txn_id?: string
  screenshot_path?: string
  status: 'pending' | 'pro' | 'rejected'
  submitted_at: string
  note?: string
}> = {}

// Simple admin authentication (in production, use proper auth)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin123'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { user_id, admin_token } = req.body

    // Verify admin authentication
    if (admin_token !== ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Update payment status to approved
    if (payments[user_id]) {
      payments[user_id].status = 'pro'
    }

    // Update in Supabase if configured
    if (supabase) {
      try {
        await supabase
          .from('payment_proofs')
          .update({ 
            status: 'pro',
            approved_at: new Date().toISOString()
          })
          .eq('user_id', user_id)
      } catch (dbError) {
        console.log('Supabase error:', dbError)
      }
    } else {
      console.log('Supabase not configured, using in-memory storage')
    }

    res.status(200).json({
      success: true,
      message: 'User approved successfully',
      user_id,
      status: 'pro'
    })

  } catch (error) {
    console.error('Approval error:', error)
    res.status(500).json({ error: 'Failed to approve user' })
  }
}
