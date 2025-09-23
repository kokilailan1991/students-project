import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Footer from '@/components/layout/footer'
import PaymentModal from '@/components/modals/payment-modal'
import ProjectGenerator from '@/pages/project-generator'

function App() {
  const [activeTab, setActiveTab] = useState('projects')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedTier, setSelectedTier] = useState<'pro' | 'premium'>('pro')

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
      case 'projects':
        return <ProjectGenerator onUpgrade={handleUpgrade} />
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
        return <ProjectGenerator onUpgrade={handleUpgrade} />
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
      />
    </div>
  )
}

export default App