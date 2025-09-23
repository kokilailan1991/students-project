import { createClient } from '@supabase/supabase-js'

// Use fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-key'

// Client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface User {
  id: string
  email: string
  subscription: 'free' | 'pro' | 'premium'
  transaction_id?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  domain?: string
  technologies?: string
  abstract?: string
  report?: string
  ppt_slides?: any
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  transaction_id: string
  amount: number
  tier: 'pro' | 'premium'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Flashcard {
  id: string
  user_id: string
  question: string
  answer: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  created_at: string
}