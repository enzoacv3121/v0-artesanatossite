// app/produto/[id]/page.tsx

import { createClient } from "@/lib/supabase.server";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import { addItemToCart } from '@/actions/cart';
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, RefreshCw, ShieldCheck, CreditCard, Heart } from "lucide-react";
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
  const supabase = await createClient();
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
      
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 lg:py-12">
        
        {/* Breadcrumb */}
        <div className="text-[11px] text-gray-400 mb-8 uppercase tracking-widest font-medium">
          <Link href="/" className="hover:text-black transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <Link href="/" className="hover:text-black transition-colors">{p.categoria}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{p.nome}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-20 items-start">
          
          {/* --- COLUNA ESQUERDA: GALERIA --- */}
          <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible hide-scrollbar py-2 lg:py-0">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 lg:w-[70px] lg:h-[90px] flex-shrink-0 cursor-pointer border border-transparent hover:border-gray-900 transition-all opacity-70 hover:opacity-100">
                  <img src={p.imagem_url || '/placeholder.jpg'} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-1 relative bg-gray-50 aspect-[4/5] lg:aspect-[3/4]">
               <span className="absolute top-0 right-0 bg-[#25D366] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                  Compre 4 Pague 3
               </span>
              <img 
                src={p.imagem_url || '/placeholder.jpg'} 
                alt={p.nome}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          </div>

          {/* --- COLUNA DIREITA: INFO --- */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <h1 className="text-3xl font-normal text-gray-900 leading-tight tracking-wide">
              {p.nome}
            </h1>

            <div className="flex items-center gap-2 text-xs">
               <div className="flex text-black">
                 {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
               </div>
               <span className="text-gray-400">Sem avaliações</span>
            </div>

            <div className="py-2">
              <div className="flex items-baseline gap-3">
                <span className="text-gray-400 line-through text-sm">R${precoAntigo.toFixed(2).replace('.', ',')}</span>
                <span className="text-3xl font-bold text-black">R${p.preco.toFixed(2).replace('.', ',')}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                3x de R${(p.preco / 3).toFixed(2).replace('.', ',')} sem juros
              </p>
              <button className="text-xs underline text-gray-800 mt-2 flex items-center gap-1">
                 <CreditCard size={12}/> Ver formas de pagamento
              </button>
            </div>

            <div className="border border-[#25D366] p-4 bg-white">
              <p className="text-[#25D366] font-bold text-sm mb-1 uppercase tracking-wide">Compre 4 e pague 3!</p>
              <p className="text-gray-600 text-xs">Você pode aproveitar esta promoção em qualquer produto da loja.</p>
            </div>

            <ProductInteractive produtoId={p.id_produtos} estoque={p.estoque} />

            <div className="border-t border-gray-100 pt-6 space-y-3 mt-4">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <RefreshCw size={16} /> <span>Primeira troca grátis</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <ShieldCheck size={16} /> <span>Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <Truck size={16} /> <span>Frete Grátis acima de R$250,00</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- AQUI ESTÁ A PARTE PERSONALIZADA SOBRE A SUA AVÓ --- */}
        <div className="border-t border-gray-200 pt-16 mt-12 max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <Heart className="w-8 h-8 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-serif text-gray-900 italic">
              "O luxo está nos detalhes feitos à mão."
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-12 text-gray-600 text-sm leading-8">
            
            <div className="md:col-span-7 space-y-6 text-justify">
                <div>
                    <h3 className="font-bold text-black uppercase tracking-widest text-xs mb-3">Sobre a Peça</h3>
                    <p>{p.descricao}</p>
                </div>
                
                <div>
                    <h3 className="font-bold text-black uppercase tracking-widest text-xs mb-3">A Curadoria</h3>
                    <p>
                        Esta peça foi desenvolvida ou curada por <strong>Valdeci De Sousa</strong>, decoradora com vasta experiência em lojas de alto padrão. 
                        Unindo a técnica artesanal tradicional com um olhar refinado para o design de interiores, Valdeci cria itens que não apenas decoram, mas trazem alma e aconchego para o ambiente.
                    </p>
                    <p>
                        Cada ponto, pintura ou acabamento passa por um rigoroso controle de qualidade, garantindo que você leve para casa não apenas um produto, mas uma obra de arte durável e exclusiva.
                    </p>
                </div>
            </div>

            <div className="md:col-span-5">
                <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
                    <h3 className="font-bold text-black uppercase tracking-widest text-xs mb-6">Detalhes Técnicos</h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span>Categoria</span> 
                            <span className="font-medium text-black">{p.categoria}</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span>Assinatura</span> 
                            <span className="font-medium text-black">Valdeci De Sousa</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span>Material</span> 
                            <span className="font-medium text-black">Premium</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-200 pb-2">
                            <span>Origem</span> 
                            <span className="font-medium text-black">Nacional</span>
                        </li>
                    </ul>
                    <p className="mt-6 text-xs text-gray-400 italic leading-relaxed">
                        *Por se tratar de um produto artesanal, pequenas variações de cor e textura podem ocorrer, o que atesta a exclusividade da sua peça.
                    </p>
                </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}