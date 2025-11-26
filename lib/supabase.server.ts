// lib/supabase.server.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Você pode remover <Database> se não estiver usando a tipagem do Supabase
export function createClient() {
  const cookieStore = cookies()

  return createServerClient<any>( 
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie ? cookie.value : undefined;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Silencia o erro
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Silencia o erro
          }
        },
      },
    }
  )
}