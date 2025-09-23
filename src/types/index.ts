// Core application types for Smart SIP Planner

export interface User {
  id: string
  email: string
  subscription: 'free' | 'pro'
  created_at: string
  updated_at: string
  uploads_this_month: number
  last_upload_date?: string
}

export interface BankStatement {
  id: string
  user_id: string
  filename: string
  upload_date: string
  parsed_data: ParsedTransaction[]
  analysis: StatementAnalysis
  created_at: string
}

export interface ParsedTransaction {
  date: string
  description: string
  debit: number
  credit: number
  balance: number
  category: TransactionCategory
}

export interface StatementAnalysis {
  total_income: number
  total_expenses: number
  monthly_surplus: number
  average_income: number
  average_expenses: number
  category_breakdown: CategoryBreakdown[]
  period_start: string
  period_end: string
}

export interface CategoryBreakdown {
  category: TransactionCategory
  amount: number
  percentage: number
  transaction_count: number
}

export type TransactionCategory = 
  | 'salary'
  | 'emi_loans'
  | 'food'
  | 'shopping'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'transport'
  | 'investment'
  | 'others'

export interface SIPPlan {
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

export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'pro'
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
export interface UploadFormData {
  file: File
  statement_period: {
    start: string
    end: string
  }
}

export interface SIPCalculationParams {
  monthly_surplus: number
  plan_type: 'short_term' | 'medium_term' | 'long_term'
  expected_return_rate?: number
}

// Export types
export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv'
  include_charts: boolean
  include_sip_plans: boolean
  include_category_breakdown: boolean
}