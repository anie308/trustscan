import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export type WaitlistEntry = {
  id?: string
  name: string
  email: string
  company: string | null
  user_type: 'consumer' | 'manufacturer' | 'retailer' | 'regulator' | 'other'
  agreed_to_terms: boolean
  created_at?: string
  updated_at?: string
}
