import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Footer from '@/components/layout/footer'
import PaymentModal from '@/components/modals/payment-modal'
import ProjectGenerator from '@/pages/project-generator'
import LandingHero from '@/components/landing-hero'
import PremiumFeatures from '@/components/premium-features'
import AnalyticsDashboard from '@/components/analytics-dashboard'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedTier, setSelectedTier] = useState<'pro' | 'premium'>('pro')
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('projectpal_user')
    if (user) {
      const userData = JSON.parse(user)
      setUserId(userData.id)
      setIsLoggedIn(true)
    } else {
      // Create default user for demo
      const defaultUser = {
        id: Date.now().toString(),
        subscription: 'pro',
        createdAt: new Date()
      }
      setUserId(defaultUser.id)
      setIsLoggedIn(true)
      localStorage.setItem('projectpal_user', JSON.stringify(defaultUser))
    }
  }, [])

  const handleUpgrade = (tier: 'pro' | 'premium') => {
    setSelectedTier(tier)
    setShowPaymentModal(true)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setIsSidebarOpen(false) // Close sidebar on mobile after selection
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="h-full">
            <LandingHero onGetStarted={() => setActiveTab('projects')} />
            <PremiumFeatures />
          </div>
        )
      case 'projects':
        return <ProjectGenerator onUpgrade={handleUpgrade} userId={userId} />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'assignments':
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Assignments</h1>
            <p className="text-muted-foreground">Assignment tools coming soon...</p>
          </div>
        )
      case 'flashcards':
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Flashcards</h1>
            <p className="text-muted-foreground">Flashcard tools coming soon...</p>
          </div>
        )
      case 'resume':
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Resume & CV</h1>
            <p className="text-muted-foreground">Resume builder coming soon...</p>
          </div>
        )
      case 'viva':
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Viva & Interview</h1>
            <p className="text-muted-foreground">Interview prep tools coming soon...</p>
          </div>
        )
      case 'extras':
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Extras</h1>
            <p className="text-muted-foreground">Extra tools coming soon...</p>
          </div>
        )
      default:
        return <ProjectGenerator onUpgrade={handleUpgrade} userId={userId} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      
      <Navbar 
        onUpgrade={() => handleUpgrade('pro')}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onUpgrade={handleUpgrade}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        tier={selectedTier}
        userId={userId}
      />
    </div>
  )
}

export default App