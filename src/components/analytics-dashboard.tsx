'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Download, 
  Clock,
  CheckCircle,
  Users,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AnalyticsData {
  totalProjects: number
  totalExports: number
  timeSaved: number
  successRate: number
  monthlyUsage: Array<{ month: string; count: number }>
  featureUsage: Array<{ feature: string; count: number }>
  recentActivity: Array<{ type: string; description: string; timestamp: string }>
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalProjects: 0,
    totalExports: 0,
    timeSaved: 0,
    successRate: 0,
    monthlyUsage: [],
    featureUsage: [],
    recentActivity: []
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setAnalyticsData({
        totalProjects: 47,
        totalExports: 156,
        timeSaved: 94, // hours
        successRate: 98,
        monthlyUsage: [
          { month: 'Jan', count: 12 },
          { month: 'Feb', count: 18 },
          { month: 'Mar', count: 25 },
          { month: 'Apr', count: 32 },
          { month: 'May', count: 28 },
          { month: 'Jun', count: 35 }
        ],
        featureUsage: [
          { feature: 'Abstracts', count: 23 },
          { feature: 'Reports', count: 15 },
          { feature: 'Presentations', count: 9 },
          { feature: 'Resumes', count: 12 },
          { feature: 'Flashcards', count: 18 }
        ],
        recentActivity: [
          { type: 'generated', description: 'Generated project abstract for "AI Chatbot"', timestamp: '2 hours ago' },
          { type: 'exported', description: 'Exported report as PDF', timestamp: '5 hours ago' },
          { type: 'generated', description: 'Created presentation slides', timestamp: '1 day ago' },
          { type: 'exported', description: 'Downloaded flashcards as CSV', timestamp: '2 days ago' }
        ]
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: 'Projects Generated',
      value: analyticsData.totalProjects,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      change: '+12%'
    },
    {
      title: 'Total Exports',
      value: analyticsData.totalExports,
      icon: Download,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      change: '+8%'
    },
    {
      title: 'Time Saved (Hours)',
      value: analyticsData.timeSaved,
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      change: '+15%'
    },
    {
      title: 'Success Rate',
      value: `${analyticsData.successRate}%`,
      icon: CheckCircle,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      change: '+2%'
    }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
            <p className="text-gray-600 mt-2">Track your productivity and project success</p>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2">
            <TrendingUp className="h-4 w-4 mr-2" />
            Pro Analytics
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Monthly Usage</span>
              </CardTitle>
              <CardDescription>Your project generation activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.monthlyUsage.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600">{item.month}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(item.count / 35) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-8 text-sm text-gray-600 text-right">{item.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Usage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span>Feature Usage</span>
              </CardTitle>
              <CardDescription>Most used features this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.featureUsage.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.feature}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${(item.count / 23) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-6">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest project activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'generated' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'generated' ? (
                      <FileText className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Download className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default AnalyticsDashboard
