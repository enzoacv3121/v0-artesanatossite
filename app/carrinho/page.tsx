// app/carrinho/page.tsx

import { createClient } from "@/lib/supabase.server";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Trash2, ShoppingBag, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Ação para remover item
async function removeItem(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  // CORREÇÃO: await aqui também
  const supabase = await createClient();
  await supabase.from('carrinho').delete().eq('id_carrinho', id);
  redirect('/carrinho');
}

export default async function CarrinhoPage() {
  // CORREÇÃO CRÍTICA: Adicionado 'await' aqui
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Busca itens do carrinho com os dados do produto
  const { data: itens, error } = await supabase
    .from('carrinho')
    .select(`
      id_carrinho,
      quantidade,
      produtos (
        id_produtos,
        nome,
        preco,
        imagem_url,
        categoria
      )
    `);

  if (error) {
      console.error("Erro ao buscar carrinho:", error);
  }

  // Calcula o total (tratando dados possivelmente vazios)
  const total = itens?.reduce((acc, item: any) => {
    // Verifica se item.produtos existe para evitar erro
    if (item.produtos) {
        return acc + (item.produtos.preco * item.quantidade);
    }
    return acc;
  }, 0) || 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <HeaderWrapper />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-900">
          <ShoppingBag /> Seu Carrinho
        </h1>

        {(!itens || itens.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-6 text-lg">Seu carrinho está vazio.</p>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800">Ver Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
              {itens.map((item: any) => (
                item.produtos && (
                    <div key={item.id_carrinho} className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-center border border-gray-100">
                    {/* Imagem */}
                    <div className="h-24 w-24 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                        src={item.produtos.imagem_url || '/placeholder.jpg'} 
                        alt={item.produtos.nome} 
                        className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg text-gray-900">{item.produtos.nome}</h3>
                        <p className="text-sm text-gray-500">{item.produtos.categoria}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm bg-gray-100 px-3 py-1 rounded font-medium text-gray-700">Qtd: {item.quantidade}</span>
                            <span className="font-bold text-black">R$ {(item.produtos.preco * item.quantidade).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Botão Remover */}
                    <form action={removeItem}>
                        <input type="hidden" name="id" value={item.id_carrinho} />
                        <button type="submit" className="text-gray-400 hover:text-red-600 p-2 transition-colors">
                        <Trash2 size={20} />
                        </button>
                    </form>
                    </div>
                )
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4 text-gray-900">Resumo</h2>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-100 text-black">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* MUDANÇA AQUI: Botão agora é um Link para a página de Checkout */}
                <Link href="/checkout" className="block w-full">
                    <Button className="w-full h-12 text-sm uppercase tracking-widest font-bold bg-black text-white hover:bg-gray-800 transition-colors">
                    Finalizar Compra <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                
                <p className="text-xs text-gray-400 text-center mt-4 flex justify-center items-center gap-1">
                  <CheckCircle size={12} /> Compra 100% Segura e Garantida
                </p>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}