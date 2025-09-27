import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lock, 
  Upload, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Shield,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UpgradeToProProps {
  onClose?: () => void
  userId?: string | null
}

const UpgradeToPro: React.FC<UpgradeToProProps> = ({ onClose, userId }) => {
  const [txnId, setTxnId] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (PNG/JPG)')
        return
      }
      setScreenshot(file)
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (!userId) {
      setError('User not authenticated')
      return
    }

    if (!txnId && !screenshot) {
      setError('Please provide either Transaction ID or payment screenshot')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('user_id', userId)
      if (txnId) formData.append('txn_id', txnId)
      if (screenshot) formData.append('screenshot', screenshot)

      const response = await fetch('/api/payment/submit', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setError(result.error || 'Failed to submit payment proof')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Proof Submitted!
            </h3>
            <p className="text-gray-600 mb-6">
              Your payment proof has been received. We'll verify it manually and upgrade your account within 24 hours.
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upgrade to Pro</h2>
                <p className="text-gray-600">Unlock premium features</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* QR Code Section */}
          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-6 mb-4">
              <img 
                src="/static/gpay_qr.png" 
                alt="Scan to pay" 
                width="250" 
                className="mx-auto rounded-xl shadow-lg"
              />
            </div>
            <p className="text-gray-700 text-lg font-medium mb-2">
              Scan the QR and pay ₹199 via GPay/UPI
            </p>
            <p className="text-gray-600 text-sm">
              After payment, submit proof below. Your payment will be verified manually.
            </p>
          </div>

          {/* Pro Features Preview */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 text-purple-600 mr-2" />
              Pro Features Unlocked
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Full Reports
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Presentation Slides
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Advanced Export
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Priority Support
              </div>
            </div>
          </div>

          {/* Payment Proof Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Upload className="w-5 h-5 text-blue-600 mr-2" />
              Submit Payment Proof
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction ID (Optional)
              </label>
              <Input
                type="text"
                placeholder="Enter UPI transaction ID"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Screenshot (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="screenshot-upload"
                />
                <label
                  htmlFor="screenshot-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {screenshot ? screenshot.name : 'Click to upload screenshot (PNG/JPG)'}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
                </label>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Verification typically takes 24 hours</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (!txnId && !screenshot)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Submit Payment Proof
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UpgradeToPro
