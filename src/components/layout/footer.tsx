'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Github, Twitter, Mail } from 'lucide-react'

interface FooterProps {
  onTabChange?: (tab: string) => void
}

const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const handleLinkClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">ProjectPAL</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students to succeed in their academic journey with AI-powered tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('projects')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('assignments')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Assignments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('flashcards')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Flashcards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('resume')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Resume Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('help')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('privacy')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('terms')}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/projectpal"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/projectpal"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:support@projectpal.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 ProjectPAL. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with ❤️ for students</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer