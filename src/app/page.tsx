'use client'

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

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true) // Always open by default
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
      // Redirect to login if not authenticated
      window.location.href = '/login'
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
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4 text-center">Assignments</h1>
              <p className="text-muted-foreground mb-6 text-center">Generate essays, lab reports, case studies, and coding help</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg">✅</span>
                  <span className="font-medium text-green-800">Pro Feature Unlocked</span>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Assignment generation tools are now available!
                </p>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Coming Soon - Under Development
                </button>
              </div>
            </motion.div>
          </div>
        )
      case 'flashcards':
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4">Flashcards</h1>
              <p className="text-muted-foreground mb-6">Convert your notes and text into Q&A flashcards</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg">🧠</span>
                  <span className="font-medium text-green-800">Free Feature</span>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Flashcard generation is coming soon!
                </p>
                <button
                  disabled
                  className="bg-gray-400 text-white font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </motion.div>
          </div>
        )
      case 'resume':
        return (
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4 text-center">Resume & CV Builder</h1>
              <p className="text-muted-foreground mb-6 text-center">Generate ATS-friendly resumes, bullet points, and LinkedIn summaries</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg">✅</span>
                  <span className="font-medium text-green-800">Pro Feature Unlocked</span>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Resume building tools are now available!
                </p>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Coming Soon - Under Development
                </button>
              </div>
            </motion.div>
          </div>
        )
      case 'viva':
        return (
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4 text-center">Viva & Interview Prep</h1>
              <p className="text-muted-foreground mb-6 text-center">Generate viva questions, HR & technical interview prep, and elevator pitch scripts</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg">✅</span>
                  <span className="font-medium text-green-800">Pro Feature Unlocked</span>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Viva and interview preparation tools are now available!
                </p>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Coming Soon - Under Development
                </button>
              </div>
            </motion.div>
          </div>
        )
      case 'extras':
        return (
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4 text-center">Extras</h1>
              <p className="text-muted-foreground mb-6 text-center">Acknowledgement generator, certificate text, and research paper summarizer</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg">✅</span>
                  <span className="font-medium text-green-800">Pro Feature Unlocked</span>
                </div>
                <p className="text-sm text-green-700 mb-4">
                  Extra tools and utilities are now available!
                </p>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Coming Soon - Under Development
                </button>
              </div>
            </motion.div>
          </div>
        )
      case 'help':
        return (
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4">Help Center</h1>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                    <p className="text-muted-foreground">Learn how to use ProjectPAL to generate your academic content.</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-3">FAQ</h3>
                    <p className="text-muted-foreground">Find answers to frequently asked questions.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )
      case 'contact':
        return (
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-muted-foreground mb-6">Get in touch with our support team</p>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <p className="text-lg font-semibold mb-2">Email: support@projectpal.com</p>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours</p>
                </div>
              </div>
            </motion.div>
          </div>
        )
      case 'privacy':
        return (
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <p className="text-muted-foreground">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )
      case 'terms':
        return (
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <p className="text-muted-foreground">These terms govern your use of ProjectPAL. Please read them carefully.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )
      default:
        return <ProjectGenerator onUpgrade={handleUpgrade} userId={userId} />
    }
  }

  if (!isLoggedIn || !userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex h-screen">
        {/* Permanent Left Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col">
          <Sidebar
            isOpen={true}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onUpgrade={handleUpgrade}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <Navbar 
            onUpgrade={() => handleUpgrade('pro')}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="h-full">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </div>
          </main>
        </div>
      </div>

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