import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        '[Tenreq] Missing Supabase environment variables.\n' +
        'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file and Vercel settings.'
    )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

