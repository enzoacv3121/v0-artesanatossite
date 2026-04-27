// actions/cart.ts
'use server';

import { createClient } from '@/lib/supabase.server'; 
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addItemToCart(formData: FormData) {
    const supabase = await createClient(); 
    
    const produtoId = formData.get('produtoId') as string;
    const quantidade = parseInt(formData.get('quantity') as string) || 1;

    console.log("🛒 Tentando adicionar item:", produtoId, "Qtd:", quantidade);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log("❌ Usuário não logado. Redirecionando para login.");
        redirect('/login');
    }

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

    // MUDANÇA AQUI: Mantemos o revalidatePath para atualizar o cache do Next.js,
    // mas apagamos a linha "redirect('/carrinho');" para não tirar o usuário da tela.
    revalidatePath('/');
    revalidatePath('/carrinho'); 
    revalidatePath(`/produto/${produtoId}`);
}