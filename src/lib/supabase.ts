import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

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
  return createClientComponentClient()
}

// Server component client
export const createServerClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured')
    return null
  }
  return createServerComponentClient({ cookies })
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
          subscription: 'free' | 'pro'
          created_at: string
          updated_at: string
          uploads_this_month: number
          last_upload_date: string | null
        }
        Insert: {
          id: string
          email: string
          subscription?: 'free' | 'pro'
          created_at?: string
          updated_at?: string
          uploads_this_month?: number
          last_upload_date?: string | null
        }
        Update: {
          id?: string
          email?: string
          subscription?: 'free' | 'pro'
          created_at?: string
          updated_at?: string
          uploads_this_month?: number
          last_upload_date?: string | null
        }
      }
      bank_statements: {
        Row: {
          id: string
          user_id: string
          filename: string
          upload_date: string
          parsed_data: any
          analysis: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          filename: string
          upload_date: string
          parsed_data: any
          analysis: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          filename?: string
          upload_date?: string
          parsed_data?: any
          analysis?: any
          created_at?: string
        }
      }
      sip_plans: {
        Row: {
          id: string
          user_id: string
          statement_id: string
          plan_type: 'short_term' | 'medium_term' | 'long_term'
          monthly_sip: number
          expected_return_rate: number
          duration_years: number
          expected_future_value: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          statement_id: string
          plan_type: 'short_term' | 'medium_term' | 'long_term'
          monthly_sip: number
          expected_return_rate: number
          duration_years: number
          expected_future_value: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          statement_id?: string
          plan_type?: 'short_term' | 'medium_term' | 'long_term'
          monthly_sip?: number
          expected_return_rate?: number
          duration_years?: number
          expected_future_value?: number
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'free' | 'pro'
          status: 'active' | 'cancelled' | 'expired'
          payment_provider: 'stripe' | 'razorpay'
          payment_id: string
          amount: number
          currency: string
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          plan: 'free' | 'pro'
          status?: 'active' | 'cancelled' | 'expired'
          payment_provider: 'stripe' | 'razorpay'
          payment_id: string
          amount: number
          currency: string
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          plan?: 'free' | 'pro'
          status?: 'active' | 'cancelled' | 'expired'
          payment_provider?: 'stripe' | 'razorpay'
          payment_id?: string
          amount?: number
          currency?: string
          created_at?: string
          expires_at?: string | null
        }
      }
    }
  }
}