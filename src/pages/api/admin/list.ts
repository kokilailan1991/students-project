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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { admin_token } = req.query

    // Verify admin authentication
    if (admin_token !== ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    let paymentList = Object.entries(payments).map(([user_id, data]) => ({
      user_id,
      ...data
    }))

    // Try to get from Supabase if configured
    try {
      const { data, error } = await supabase
        .from('payment_proofs')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (!error && data) {
        paymentList = data.map(row => ({
          user_id: row.user_id,
          txn_id: row.txn_id,
          screenshot_path: row.screenshot_path,
          status: row.status,
          submitted_at: row.submitted_at,
          note: row.note
        }))
      }
    } catch (dbError) {
      console.log('Supabase not configured, using in-memory storage')
    }

    res.status(200).json({
      success: true,
      payments: paymentList,
      total: paymentList.length,
      pending: paymentList.filter(p => p.status === 'pending').length,
      approved: paymentList.filter(p => p.status === 'pro').length,
      rejected: paymentList.filter(p => p.status === 'rejected').length
    })

  } catch (error) {
    console.error('List error:', error)
    res.status(500).json({ error: 'Failed to list payments' })
  }
}
