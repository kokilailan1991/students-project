import React, { useState } from 'react';

interface PaymentModalProps {
  tier: 'pro' | 'premium';
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ tier, onClose }) => {
  const [step, setStep] = useState<'qr' | 'transaction' | 'success'>('qr');
  const [transactionId, setTransactionId] = useState('');

  const tierInfo = {
    pro: {
      price: 499,
      name: 'Pro Plan',
      features: ['Unlimited Abstracts', 'Reports & PPT', 'Resume Builder', 'Viva Qs', 'Assignments']
    },
    premium: {
      price: 999,
      name: 'Premium Plan',
      features: ['Everything in Pro', 'Unlimited Exports', 'Priority Support', 'Advanced Templates']
    }
  };

  const handleVerifyPayment = () => {
    if (transactionId.trim()) {
      setStep('success');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Upgrade to {tierInfo[tier].name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {step === 'qr' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ₹{tierInfo[tier].price}
                </div>
                <p className="text-gray-600">One-time payment</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Features included:</h3>
                <ul className="space-y-2">
                  {tierInfo[tier].features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="w-32 h-32 mx-auto bg-gray-300 rounded flex items-center justify-center text-gray-500 text-4xl">
                    📱
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Scan with GPay/PhonePe/Paytm
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    UPI ID: 9962352046@paytm
                  </p>
                </div>
                
                <button
                  onClick={() => setStep('transaction')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full"
                >
                  I've Made the Payment
                </button>
              </div>
            </div>
          )}

          {step === 'transaction' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Enter Transaction ID
                </h3>
                <p className="text-sm text-gray-600">
                  Enter the transaction ID from your payment app
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g., TXN123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('qr')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleVerifyPayment}
                  disabled={!transactionId.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify Payment
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-sm text-gray-600">
                  Your {tierInfo[tier].name} has been activated. Enjoy unlimited access!
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full"
              >
                Start Using ProjectPAL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;