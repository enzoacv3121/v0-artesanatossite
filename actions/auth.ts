// actions/auth.ts (ou .js)

'use server'; // <--- OBRIGATÓRIO: Define que todas as funções neste arquivo rodam no servidor

import { createClient } from '@supabase/supabase-js'; 
import { redirect } from 'next/navigation';

// ATENÇÃO: Se seu cliente Supabase já está em lib/supabase.server.js, use-o!
// Caso contrário, inicializamos o cliente de servidor aqui.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey); // Cliente de browser/servidor

export async function signOut() {
    // Esta função agora está no servidor (use server)

    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Erro ao sair:', error.message);
    }
    // Redireciona para a página inicial após o logout
    redirect('/');
}