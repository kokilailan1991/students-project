import { createClient } from '@supabase/supabase-js'

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Only create clients if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Client component client
export const createClientComponent = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured')
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server component client
export const createServerClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured')
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Admin client for server-side operations
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseServiceKey)
}

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          subscription: 'free' | 'pro' | 'premium'
          created_at: string
          updated_at: string
          uploads_this_month: number
          last_upload_date: string | null
        }
        Insert: {
          id: string
          email: string
          subscription?: 'free' | 'pro' | 'premium'
          created_at?: string
          updated_at?: string
          uploads_this_month?: number
          last_upload_date?: string | null
        }
        Update: {
          id?: string
          email?: string
          subscription?: 'free' | 'pro' | 'premium'
          created_at?: string
          updated_at?: string
          uploads_this_month?: number
          last_upload_date?: string | null
        }
      }
      projects: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          title: string
          domain: string
          technologies: string[]
          abstract?: string
          report?: string
          ppt_slides?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          domain?: string
          technologies?: string[]
          abstract?: string
          report?: string
          ppt_slides?: any
          created_at?: string
          updated_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          user_id: string
          project_id: string
          question: string
          answer: string
          category: string
          difficulty: 'easy' | 'medium' | 'hard'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id: string
          question: string
          answer: string
          category: string
          difficulty: 'easy' | 'medium' | 'hard'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_id?: string
          question?: string
          answer?: string
          category?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          transaction_id: string
          amount: number
          currency: string
          status: 'pending' | 'approved' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          transaction_id: string
          amount: number
          currency: string
          status?: 'pending' | 'approved' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          transaction_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'approved' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}