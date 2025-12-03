// lib/auth.ts

import { createClient } from '@/lib/supabase.server'; 

// TEM QUE TER O 'export' AQUI:
export async function getUserSession() {
    const supabase = await createClient(); // Com await, pois createClient agora é async
    
    const { data: { user } } = await supabase.auth.getUser();
    
    return user; 
}