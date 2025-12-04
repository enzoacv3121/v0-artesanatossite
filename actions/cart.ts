// actions/cart.ts
'use server';

import { createClient } from '@/lib/supabase.server'; 
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addItemToCart(formData: FormData) {
    // 1. CORREÇÃO CRÍTICA: Adicionado 'await' no createClient
    const supabase = await createClient(); 
    
    const produtoId = formData.get('produtoId') as string;
    // Se não vier quantidade (página home), usa 1
    const quantidade = parseInt(formData.get('quantity') as string) || 1;

    console.log("🛒 Tentando adicionar item:", produtoId, "Qtd:", quantidade);

    // 2. Verifica Usuário
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log("❌ Usuário não logado. Redirecionando para login.");
        redirect('/login');
    }

    // 3. Insere no Banco
    const { error } = await supabase
        .from('carrinho') 
        .insert([
            { 
                usuario_id: user.id, 
                produto_id: produtoId,
                quantidade: quantidade,
            },
        ]);

    if (error) {
        console.error('❌ Erro do Supabase ao adicionar:', error.message);
        return; 
    }
    
    console.log("✅ Item adicionado com sucesso!");

    // 4. Atualiza o cache e redireciona para o carrinho para você ver que funcionou
    revalidatePath('/carrinho'); 
    revalidatePath('/');
    redirect('/carrinho'); 
}