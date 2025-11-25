// lib/supabase.server.js

import { createClient } from '@supabase/supabase-js'

// Variáveis de ambiente carregadas do .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As variáveis de ambiente do Supabase não foram carregadas. Verifique o .env.local e reinicie o servidor.')
}

// Cria e exporta o cliente para uso em Server Components (app/page.tsx)
export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);