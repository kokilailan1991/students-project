import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser usage
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
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}