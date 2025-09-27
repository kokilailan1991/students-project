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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { user_id } = req.query

    if (!user_id || typeof user_id !== 'string') {
      return res.status(400).json({ error: 'User ID is required' })
    }

    let paymentData = payments[user_id]

    // Try to get from Supabase if configured
    try {
      const { data, error } = await supabase
        .from('payment_proofs')
        .select('*')
        .eq('user_id', user_id)
        .single()

      if (!error && data) {
        paymentData = {
          txn_id: data.txn_id,
          screenshot_path: data.screenshot_path,
          status: data.status,
          submitted_at: data.submitted_at,
          note: data.note
        }
      }
    } catch (dbError) {
      console.log('Supabase not configured, using in-memory storage')
    }

    if (!paymentData) {
      return res.status(200).json({ status: 'free' })
    }

    res.status(200).json({
      status: paymentData.status,
      submitted_at: paymentData.submitted_at,
      note: paymentData.note
    })

  } catch (error) {
    console.error('Status check error:', error)
    res.status(500).json({ error: 'Failed to check payment status' })
  }
}
