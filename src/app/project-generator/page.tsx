'use client'

import React from 'react'
import ProjectGenerator from '@/components/ProjectGenerator'

export default function ProjectGeneratorPage() {
  // Get user data from localStorage
  const [userId, setUserId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const user = localStorage.getItem('projectpal_user')
    if (user) {
      const userData = JSON.parse(user)
      setUserId(userData.id)
    } else {
      // Create default user for demo
      const defaultUser = {
        id: Date.now().toString(),
        subscription: 'pro',
        createdAt: new Date()
      }
      setUserId(defaultUser.id)
      localStorage.setItem('projectpal_user', JSON.stringify(defaultUser))
    }
  }, [])

  const handleUpgrade = (tier: 'pro' | 'premium') => {
    // Handle upgrade logic here
    console.log('Upgrade to:', tier)
  }

  return <ProjectGenerator onUpgrade={handleUpgrade} userId={userId} />
}
