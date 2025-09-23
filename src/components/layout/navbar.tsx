'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Crown, Menu, X, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface NavbarProps {
  onUpgrade: () => void
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

const Navbar: React.FC<NavbarProps> = ({ onUpgrade, onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Page Title */}
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Badge variant="default" className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <Crown className="h-3 w-3" />
              <span>Pro Account</span>
            </Badge>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-gray-600 hover:text-gray-800"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar