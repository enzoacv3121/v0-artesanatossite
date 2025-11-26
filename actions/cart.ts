// actions/cart.ts (ou .js)

'use server';

import { createClient } from '@supabase/supabase-js'; 
import { redirect } from 'next/navigation';

// ATENÇÃO: Use seu cliente Supabase de servidor aqui, ou inicialize-o:
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey); 

export async function addItemToCart(formData: FormData) {
    // 1. Obter ID do produto do formulário
    const produtoId = formData.get('produtoId') as string;
    
    // 2. Tentar obter o usuário logado
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Se o usuário não estiver logado, redireciona para o login
        return redirect('/login');
    }

    // 3. Inserir na tabela 'carrinho' (ou 'carrinho_itens')
    const { data, error } = await supabase
        .from('carrinho') // <-- Use o nome correto da sua tabela de carrinho
        .insert([
            { 
                usuario_id: user.id, 
                produto_id: produtoId,
                quantidade: 1, // Por simplicidade, adicionamos 1
            },
        ]);

    if (error) {
        console.error('Erro ao adicionar item ao carrinho:', error.message);
        return { error: 'Falha ao adicionar ao carrinho.' };
    }
    
    // 4. Redireciona de volta à página inicial ou para a página do carrinho
    redirect('/'); 
}