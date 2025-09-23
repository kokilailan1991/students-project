'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FolderOpen, 
  FileText, 
  Brain, 
  User, 
  MessageCircle, 
  Plus,
  LogOut,
  Settings,
  Crown,
  CheckCircle,
  BarChart3,
  Home
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SidebarProps {
  isOpen: boolean
  activeTab: string
  onTabChange: (tab: string) => void
  onUpgrade: (tier: 'pro' | 'premium') => void
}

const sidebarItems = [
  {
    id: 'home',
    name: 'Home',
    icon: Home,
    unlocked: true,
    description: 'Welcome to ProjectPAL',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: FolderOpen,
    unlocked: true,
    description: 'Generate abstracts, reports, and presentations',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    unlocked: true,
    description: 'Track your productivity and success',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'assignments',
    name: 'Assignments',
    icon: FileText,
    unlocked: true,
    description: 'Essay generator, lab reports, case studies',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'flashcards',
    name: 'Flashcards',
    icon: Brain,
    unlocked: true,
    description: 'Convert text into Q&A flashcards',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'resume',
    name: 'Resume & CV',
    icon: User,
    unlocked: true,
    description: 'ATS-friendly resumes and LinkedIn summaries',
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 'viva',
    name: 'Viva & Interview',
    icon: MessageCircle,
    unlocked: true,
    description: 'Viva Q&A and interview preparation',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'extras',
    name: 'Extras',
    icon: Plus,
    unlocked: true,
    description: 'Acknowledgements, certificates, research tools',
    color: 'from-indigo-500 to-indigo-600'
  },
]

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, onTabChange, onUpgrade }) => {
  const handleLogout = () => {
    localStorage.removeItem('projectpal_user')
    window.location.href = '/login'
  }

  return (
    <div className="flex flex-col h-full bg-white/90 backdrop-blur-xl">
      {/* Header */}
      <div className="p-6 border-b border-white/20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
            <FolderOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ProjectPAL</h1>
            <p className="text-sm text-white/90">AI-Powered Student Success</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-4 text-left group transition-all duration-200",
                  isActive 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                    : "hover:bg-gray-50 hover:shadow-md"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-white/20" 
                      : `bg-gradient-to-r ${item.color} text-white group-hover:scale-110`
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.name}</span>
                      {item.unlocked && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className={cn(
                      "text-xs mt-1",
                      isActive ? "text-white/80" : "text-gray-500"
                    )}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Button>
            </motion.div>
          )
        })}
      </div>

      {/* User Info & Actions */}
      <div className="p-4 border-t border-gray-200 space-y-4">
        {/* Pro Status */}
        <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-xl p-4 border border-emerald-200/50 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800">Pro Account</span>
          </div>
          <p className="text-xs text-emerald-700 mb-3">
            All premium features unlocked
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">Active</span>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 text-xs">Premium</Badge>
          </div>
        </div>

        {/* User Actions */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-800"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-800"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar