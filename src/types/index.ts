// Core application types for ProjectPAL

export interface User {
  id: string
  email: string
  subscription: 'free' | 'pro' | 'premium'
  created_at: string
  updated_at: string
  uploads_this_month: number
  last_upload_date?: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  domain: string
  technologies: string[]
  abstract?: string
  report?: string
  ppt_slides?: any
  created_at: string
  updated_at: string
}

export interface Flashcard {
  id: string
  user_id: string
  project_id: string
  question: string
  answer: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  created_at: string
}

export type PaymentTier = 'free' | 'pro' | 'premium'

export interface PaymentTierInfo {
  name: string
  price: number
  features: string[]
  limits: {
    abstracts: number
    flashcards: number
    resumePoints: number
    vivaQuestions: number
    reports: number
    pptSlides: number
  }
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'pro' | 'premium'
  status: 'active' | 'cancelled' | 'expired'
  payment_provider: 'stripe' | 'razorpay'
  payment_id: string
  amount: number
  currency: string
  created_at: string
  expires_at?: string
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed'
  client_secret?: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form types
export interface ProjectFormData {
  title: string
  domain: string
  technologies: string[]
}

// Export types
export interface ExportOptions {
  format: 'pdf' | 'docx' | 'pptx' | 'html' | 'csv'
  include_branding: boolean
  institution_logo?: string
  watermark?: string
}