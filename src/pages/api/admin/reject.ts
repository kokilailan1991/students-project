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
    const { user_id, admin_token, note } = req.body

    // Verify admin authentication
    if (admin_token !== ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Update payment status to rejected
    if (payments[user_id]) {
      payments[user_id].status = 'rejected'
      payments[user_id].note = note
    }

    // Update in Supabase if configured
    if (supabase) {
      try {
        await supabase
          .from('payment_proofs')
          .update({ 
            status: 'rejected',
            note: note || 'Payment verification failed',
            rejected_at: new Date().toISOString()
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
      message: 'User rejected',
      user_id,
      status: 'rejected',
      note: note || 'Payment verification failed'
    })

  } catch (error) {
    console.error('Rejection error:', error)
    res.status(500).json({ error: 'Failed to reject user' })
  }
}
