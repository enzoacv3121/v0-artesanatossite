// actions/auth.ts
'use server'; 

import { createClient } from '@/lib/supabase.server'; 
import { redirect } from 'next/navigation';

export async function signOut() {
    // CORREÇÃO: Adicione 'await' aqui
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Erro ao sair:', error.message);
    }
    redirect('/');
}