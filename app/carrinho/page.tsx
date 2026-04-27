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
    <div className="min-h-screen flex flex-col bg-gray-50/50 font-sans">
      <HeaderWrapper />

      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-10 flex items-center gap-3 text-gray-950 tracking-tighter">
          <ShoppingBag className="h-8 w-8 text-primary" /> Seu Carrinho
        </h1>

        {(!itens || itens.length === 0) ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-stone-100/70">
            <ShoppingBag className="h-16 w-16 text-stone-300 mx-auto mb-6" strokeWidth={1} />
            <p className="text-stone-500 mb-8 text-xl font-medium">Seu carrinho está vazio.</p>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800 h-12 px-8 text-sm uppercase tracking-widest font-bold active:scale-95 transition-all">Ver Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-6">
              {itens.map((item: any) => (
                item.produtos && (
                    /* MUDANÇA: group, p-5, rounded-2xl, hover:shadow-lg, hover:-translate-y-1, transition-all */
                    <div key={item.id_carrinho} className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex gap-6 items-center border border-stone-100/50">
                    
                    {/* Imagem */}
                    {/* MUDANÇA: h-28 w-28, rounded-xl, bg-stone-50 */}
                    <div className="h-28 w-28 relative bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                        <img 
                        src={item.produtos.imagem_url || '/placeholder.jpg'} 
                        alt={item.produtos.nome} 
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-grow space-y-1">
                        {/* MUDANÇA: text-lg font-medium (menos agressivo que font-bold) */}
                        <h3 className="text-lg font-medium text-gray-950 tracking-tight">{item.produtos.nome}</h3>
                        <p className="text-sm text-stone-500">{item.produtos.categoria}</p>
                        <div className="flex items-end justify-between pt-2">
                            {/* MUDANÇA: bg-stone-100, font-medium, rounded-md */}
                            <span className="text-sm bg-stone-100 px-3 py-1.5 rounded-md font-medium text-stone-700">Qtd: {item.quantidade}</span>
                            {/* MUDANÇA: text-xl (ligeiramente maior e mais imponente), tracking-tighter */}
                            <span className="text-xl font-semibold text-black tracking-tighter">R$ {(item.produtos.preco * item.quantidade).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Botão Remover */}
                    <form action={removeItem} className="flex-shrink-0 self-start">
                        <input type="hidden" name="id" value={item.id_carrinho} />
                        {/* MUDANÇA: p-3, rounded-full, hover:bg-red-50, opacity-0 group-hover:opacity-100 (Efeito de revelar) */}
                        <button type="submit" className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-600 hover:bg-red-50 p-3 rounded-full transition-all duration-300">
                        <Trash2 size={20} strokeWidth={1.5} />
                        </button>
                    </form>
                    </div>
                )
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100/70 sticky top-24 space-y-8">
                <h2 className="text-2xl font-bold text-gray-950 tracking-tight pb-4 border-b border-stone-100">Resumo</h2>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal ({itens.length} {itens.length === 1 ? 'item' : 'itens'})</span>
                    <span className="font-medium text-gray-900">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Estimativa de Frete</span>
                    <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded text-xs">Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-2xl pt-6 border-t border-stone-100 text-black tracking-tighter">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block w-full">
                    <Button className="group w-full h-14 text-sm uppercase tracking-widest font-bold bg-black text-white hover:bg-gray-800 transition-all active:scale-[0.98] rounded-full shadow-md hover:shadow-lg">
                    Finalizar Compra <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                    </Button>
                </Link>
                
                <p className="text-xs text-gray-400 text-center flex justify-center items-center gap-1.5 pt-2">
                  <CheckCircle size={14} className="text-green-500" /> Compra 100% Segura e Garantida
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