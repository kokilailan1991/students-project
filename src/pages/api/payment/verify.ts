import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { transactionId, userId, tier, amount } = req.body

    if (!transactionId || !userId || !tier) {
      return res.status(400).json({ error: 'Transaction ID, userId, and tier are required' })
    }

    // Save payment record
    const { data: payment, error: paymentError } = await supabaseAdmin!
      .from('payments')
      .insert({
        user_id: userId,
        transaction_id: transactionId,
        amount: amount || (tier === 'pro' ? 499 : 999),
        tier,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Payment save error:', paymentError)
      return res.status(500).json({ error: 'Failed to save payment record' })
    }

    // For now, auto-approve payments (in production, this would be manual admin approval)
    const { error: updateError } = await supabaseAdmin!
      .from('payments')
      .update({ 
        status: 'approved',
        updated_at: new Date().toISOString()
      })
      .eq('id', payment.id)

    if (updateError) {
      console.error('Payment update error:', updateError)
      return res.status(500).json({ error: 'Failed to update payment status' })
    }

    // Update user subscription
    const { error: userError } = await supabaseAdmin!
      .from('users')
      .update({ 
        subscription: tier,
        transaction_id: transactionId,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (userError) {
      console.error('User update error:', userError)
      return res.status(500).json({ error: 'Failed to update user subscription' })
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and subscription updated',
      paymentId: payment.id
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to verify payment' })
  }
}
