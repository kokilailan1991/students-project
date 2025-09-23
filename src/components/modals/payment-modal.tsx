'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, QrCode, CreditCard, CheckCircle, Crown, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  tier: 'pro' | 'premium'
  userId: string | null
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, tier, userId }) => {
  const [step, setStep] = useState<'qr' | 'transaction' | 'success'>('qr')
  const [transactionId, setTransactionId] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const tierInfo = {
    pro: {
      price: 499,
      name: 'Pro Plan',
      originalPrice: 999,
      features: [
        'Unlimited Project Abstracts',
        'Complete Project Reports (7+ sections)',
        'Professional PPT Presentations',
        'AI-Powered Resume Builder',
        'Viva & Interview Q&A Generator',
        'Assignment & Essay Tools',
        'Priority AI Processing',
        'Advanced Export Options'
      ],
      color: 'blue',
      popular: false
    },
    premium: {
      price: 999,
      name: 'Premium Plan',
      originalPrice: 1999,
      features: [
        'Everything in Pro Plan',
        'Unlimited Exports & Downloads',
        'Advanced AI Templates',
        'Custom Branding Options',
        'API Access for Developers',
        'Priority Support (24/7)',
        'Team Collaboration Features',
        'Advanced Analytics Dashboard'
      ],
      color: 'purple',
      popular: true
    }
  }

  const currentTier = tierInfo[tier]

  const handleVerifyPayment = async () => {
    if (!transactionId.trim()) {
      toast.error('Please enter a valid transaction ID')
      return
    }

    if (!userId) {
      toast.error('User not authenticated')
      return
    }

    setIsVerifying(true)
    toast.loading('Verifying payment...', { id: 'verifying' })

    try {
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId,
          userId,
          tier,
          amount: currentTier.price
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify payment')
      }

      setStep('success')
      toast.success('Payment verified successfully!', { id: 'verifying' })
    } catch (error) {
      console.error('Payment verification error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to verify payment', { id: 'verifying' })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleClose = () => {
    setStep('qr')
    setTransactionId('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${currentTier.color}-100`}>
                    <Crown className={`h-5 w-5 text-${currentTier.color}-600`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Upgrade to {currentTier.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">One-time payment</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {step === 'qr' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {currentTier.popular && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-2xl text-gray-500 line-through">₹{currentTier.originalPrice}</span>
                      <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{currentTier.price}
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-sm">
                        {Math.round((1 - currentTier.price / currentTier.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-sm bg-blue-50 text-blue-700 border-blue-200">
                      One-time payment • Lifetime access • No recurring charges
                    </Badge>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground text-lg">What's included:</h3>
                    <div className="space-y-3">
                      {currentTier.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="text-center">
                    <div className="bg-muted/50 p-6 rounded-lg mb-4">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                        <QrCode className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Scan with GPay/PhonePe/Paytm
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        UPI ID: projectpal@paytm
                      </p>
                    </div>
                    
                    <Button onClick={() => setStep('transaction')} className="w-full">
                      <Zap className="mr-2 h-4 w-4" />
                      I've Made the Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'transaction' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Enter Transaction ID
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter the transaction ID from your payment app
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input
                      id="transactionId"
                      placeholder="e.g., TXN123456789"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep('qr')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleVerifyPayment}
                      disabled={!transactionId.trim() || isVerifying}
                      className="flex-1"
                    >
                      {isVerifying ? 'Verifying...' : 'Verify Payment'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Payment Successful!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your {currentTier.name} has been activated. Enjoy unlimited access!
                    </p>
                  </div>
                  <Button onClick={handleClose} className="w-full">
                    Start Using ProjectPAL
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PaymentModal