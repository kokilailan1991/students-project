'use client'

import React from 'react'
import ResumeTab from '@/pages/ResumeTab'

export default function ResumePage() {
  // Get user data from localStorage
  const [userId, setUserId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const user = localStorage.getItem('projectpal_user')
    if (user) {
      const userData = JSON.parse(user)
      setUserId(userData.id)
    }
  }, [])

  const handleUpgrade = (tier: 'pro' | 'premium') => {
    // This function would typically open a payment modal or redirect to an upgrade page
    console.log(`Upgrade to ${tier} requested!`)
    // For now, we'll just show a toast
    // toast.success(`Upgrade to ${tier} initiated!`)
  }

  return (
    <ResumeTab onUpgrade={handleUpgrade} userId={userId} />
  )
}
