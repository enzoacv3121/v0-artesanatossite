import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// VARS E CLIENTE AQUI EM CIMA (FORA DAS FUNÇÕES)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey); 
// FIM DAS VARS

// FUNÇÃO POST
export async function POST(request) {
    try {
        const itemParaInserir = { 
            nome: 'Item Teste ' + Date.now(), 
        };
        
        // 1. O ERRO ESTÁ AQUI. VERIFIQUE SE O NOME DA TABELA ESTÁ CORRETO.
        const { data, error } = await supabase
            .from('produtos') // 👈 DEVE SER O NOME EXATO DA SUA TABELA
            .insert(itemParaInserir)
            .select();

        if (error) {
            // RETORNO DE ERRO
            return NextResponse.json({
                status: 'FALHA NA INTERAÇÃO (INSERT)',
                message: error.message,
                detalhes: 'Verifique se o RLS (INSERT) está ON ou se as colunas estão corretas.'
            }, { status: 400 });
        }

        // RETORNO DE SUCESSO
        return NextResponse.json({
            status: 'SUCESSO NA INTERAÇÃO',
            message: 'Dados inseridos com sucesso!',
            item_inserido: data
        }, { status: 201 }); 

    } catch (e) {
        // RETORNO DE ERRO GERAL
        return NextResponse.json({
            status: 'FALHA CRÍTICA',
            message: 'Erro interno do servidor.',
            erro_tecnico: e.message
        }, { status: 500 });
    }
}
// NENHUM CÓDIGO FORA DAS FUNÇÕES GET/POST AQUI