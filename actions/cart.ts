// actions/cart.ts
'use server';

import { createClient } from '@/lib/supabase.server'; 
import { redirect } from 'next/navigation';

export async function addItemToCart(formData: FormData) {
    const supabase = await createClient(); // <--- TEM QUE TER AWAIT
    // ...
    // Pegamos os dados do formulário
    const produtoId = formData.get('produtoId') as string;
    // Pegamos a quantidade (se não vier, assume 1)
    const quantidade = parseInt(formData.get('quantity') as string) || 1;
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    if (user) {
        const { error } = await supabase
            .from('carrinho') 
            .insert([
                { 
                    usuario_id: user.id, 
                    produto_id: produtoId,
                    quantidade: quantidade, // <--- USA A QUANTIDADE ESCOLHIDA
                },
            ]);

        if (error) {
            console.error('Erro ao adicionar:', error.message);
            return; 
        }
    }
    
    redirect('/'); 
}