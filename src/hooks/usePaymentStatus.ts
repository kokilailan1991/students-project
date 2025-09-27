import { useState, useEffect } from 'react'

export type PaymentStatus = 'free' | 'pending' | 'pro' | 'rejected' | 'loading'

interface PaymentData {
  status: PaymentStatus
  submitted_at?: string
  note?: string
}

export const usePaymentStatus = (userId: string | null) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('loading')
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setPaymentStatus('free')
      return
    }

    const checkStatus = async () => {
      try {
        setError(null)
        const response = await fetch(`/api/payment/status?user_id=${userId}`)
        const data = await response.json()

        if (response.ok) {
          setPaymentStatus(data.status)
          setPaymentData(data)
        } else {
          setError(data.error || 'Failed to check payment status')
          setPaymentStatus('free')
        }
      } catch (err) {
        setError('Network error')
        setPaymentStatus('free')
      }
    }

    checkStatus()
    
    // Check status every 30 seconds for pending payments
    const interval = setInterval(checkStatus, 30000)
    return () => clearInterval(interval)
  }, [userId])

  const refreshStatus = async () => {
    if (!userId) return

    try {
      setError(null)
      const response = await fetch(`/api/payment/status?user_id=${userId}`)
      const data = await response.json()

      if (response.ok) {
        setPaymentStatus(data.status)
        setPaymentData(data)
      } else {
        setError(data.error || 'Failed to check payment status')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  return {
    paymentStatus,
    paymentData,
    error,
    refreshStatus,
    isLoading: paymentStatus === 'loading',
    isPro: paymentStatus === 'pro',
    isPending: paymentStatus === 'pending',
    isRejected: paymentStatus === 'rejected',
    isFree: paymentStatus === 'free'
  }
}
