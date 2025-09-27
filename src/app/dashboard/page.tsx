'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Presentation, 
  Brain, 
  User, 
  Settings, 
  LogOut,
  Plus,
  Star,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'

interface User {
  id: string
  email: string
  subscription: 'free' | 'pro' | 'premium'
  createdAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('projectpal_user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Redirect to login if not authenticated
      router.push('/auth')
      return
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('projectpal_user')
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handleCreateProject = () => {
    // Navigate to project generator
    router.push('/project-generator')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to auth
  }

  const stats = [
    {
      title: 'Projects Created',
      value: '12',
      change: '+2 this week',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Reports Generated',
      value: '8',
      change: '+1 this week',
      icon: Presentation,
      color: 'text-green-600'
    },
    {
      title: 'Flashcards',
      value: '45',
      change: '+5 this week',
      icon: Brain,
      color: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: '98%',
      change: '+3% this month',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  const quickActions = [
    {
      title: 'Create New Project',
      description: 'Generate abstract, report, and PPT',
      icon: Plus,
      action: handleCreateProject,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Generate Flashcards',
      description: 'Convert text to study cards',
      icon: Brain,
      action: () => router.push('/flashcards'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Build Resume',
      description: 'Create ATS-friendly resume',
      icon: User,
      action: () => router.push('/resume'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Viva Preparation',
      description: 'Practice interview questions',
      icon: Star,
      action: () => router.push('/viva'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ProjectPAL</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge 
              variant={user.subscription === 'premium' ? 'default' : 'secondary'}
              className={user.subscription === 'premium' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
            >
              {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{user.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.email.split('@')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to create amazing projects? Let's get started with your next academic masterpiece.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Projects</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Start creating your first project to see it here</p>
                <Button onClick={handleCreateProject} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
