// app/produto/[id]/page.tsx

import { createClient } from "@/lib/supabase.server";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, RefreshCw, ShieldCheck, CreditCard } from "lucide-react";
// IMPORTAMOS O COMPONENTE INTERATIVO AQUI
import { ProductInteractive } from "@/components/product-interactive"; 

interface Produto {
  id_produtos: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
  categoria: string;
  estoque: number;
}

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient();
  const { id } = await params;

  const { data: produto, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("id_produtos", id)
    .single();

  if (error || !produto) {
    return notFound();
  }

  const p = produto as Produto;
  const precoAntigo = (p.preco * 1.2);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <HeaderWrapper />
      
      <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-8 uppercase tracking-wider">
          <Link href="/">Início</Link> / {p.categoria} / <span className="text-black font-semibold">{p.nome}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          {/* Galeria */}
          <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 lg:w-24 lg:h-32 flex-shrink-0 cursor-pointer border border-transparent hover:border-black transition-all">
                  <img src={p.imagem_url} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-1 relative aspect-[4/5] bg-gray-50">
               <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                  Compre 4 Pague 3
               </span>
              <img src={p.imagem_url} alt={p.nome} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-6">
            <h1 className="text-3xl font-normal text-gray-900 leading-tight">{p.nome}</h1>
            
            <div className="flex items-center gap-2">
               <div className="flex text-yellow-500 text-xs">
                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
               </div>
               <span className="text-xs text-gray-500 underline">3 Perguntas</span>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-lg">R${precoAntigo.toFixed(2)}</span>
                <span className="text-3xl font-bold text-black">R${p.preco.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <CreditCard size={16} />
                  <span>3x de R${(p.preco / 3).toFixed(2)} sem juros</span>
              </div>
            </div>

            <div className="border border-green-500 p-4 rounded-sm bg-green-50">
              <p className="text-green-700 font-bold text-sm mb-1">Promoção Progressiva</p>
              <p className="text-green-600 text-xs">Leve mais, pague menos. Aproveite em toda a loja.</p>
            </div>

            {/* AQUI ENTRA O NOVO COMPONENTE INTERATIVO */}
            <ProductInteractive produtoId={p.id_produtos} estoque={p.estoque} />

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <RefreshCw size={18} /> <span className="font-bold">Primeira troca grátis</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <ShieldCheck size={18} /> <span className="font-bold">Compra 100% Segura</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10 mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Descrição</h2>
          <div className="prose max-w-none text-gray-600 text-sm leading-7">
            <p>{p.descricao}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}