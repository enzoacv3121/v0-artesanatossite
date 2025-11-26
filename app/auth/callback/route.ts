// app/auth/callback/route.ts

import { createClient } from '@/lib/supabase/server'; // Importa o cliente de servidor
import { NextResponse } from 'next/server';

// Esta rota é o manipulador (handler) que lida com o redirecionamento do Supabase 
// após o Login, Verificação ou Redefinição de Senha.

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const origin = requestUrl.origin; 

    // O Supabase enviará um código de verificação na URL
    if (code) {
        // 1. Cria a instância do cliente de servidor
        const supabase = createClient();
        
        // 2. Troca o código temporário por uma sessão (Isso define os cookies de login!)
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Se a troca for bem-sucedida, redireciona para a página principal
            return NextResponse.redirect(`${origin}/`);
        }
    }

    // 3. Em caso de erro (código inválido/expirado), redireciona para a página de erro ou login
    return NextResponse.redirect(`${origin}/login?error=true`);
}