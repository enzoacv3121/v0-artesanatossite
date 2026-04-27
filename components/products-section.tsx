// components/products-section.tsx

import { addItemToCart } from '@/actions/cart'; 
import Link from "next/link"; 

// 1. Defina a interface (ou tipo) Produto
interface Produto {
  id_produtos: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
}

// 2. O componente agora recebe um array de produtos
interface ProductsSectionProps {
  produtos: Produto[];
}

// ESTE É UM SERVER COMPONENT que aceita Server Actions
export function ProductsSection({ produtos }: ProductsSectionProps) {
  return (
    <section id="produtos" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 tracking-tight">Nossos Produtos</h2>
      
      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {produtos.map((produto) => (
            /* MUDANÇA 1: Card Container Premium */
            <div key={produto.id_produtos} className="group bg-white border border-stone-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              
              {/* MUDANÇA 2: Container da Imagem com efeito de Zoom */}
              <div className="relative w-full h-56 mb-5 overflow-hidden rounded-xl bg-stone-50">
                <img 
                  src={produto.imagem_url || 'placeholder.jpg'} 
                  alt={produto.nome} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{produto.nome}</h3>
              <p className="text-sm text-stone-500 mt-2 flex-grow leading-relaxed">{produto.descricao.substring(0, 100)}...</p>
              
              <div className="mt-4 mb-5">
                  <p className="text-2xl font-semibold text-black tracking-tighter">R$ {produto.preco.toFixed(2)}</p>
              </div>
              
              <div className="mt-auto flex items-center gap-3">
                {/* --- MUDANÇA 3: Botão Ver Detalhes (Visual Suave) --- */}
                <Link 
                  href={`/produto/${produto.id_produtos}`}
                  className="flex-1 border border-stone-200 text-stone-600 py-2.5 px-4 rounded-xl hover:bg-stone-50 hover:text-stone-900 transition-all text-sm font-medium text-center"
                >
                  Ver Detalhes
                </Link>

                {/* Formulário de Adicionar ao Carrinho */}
                <form action={addItemToCart} className="flex-1"> 
                  <input type="hidden" name="produtoId" value={produto.id_produtos} />

                  {/* --- MUDANÇA 4: Botão Adicionar (Destaque e Clique Tátil) --- */}
                  <button 
                      type="submit" 
                      className="w-full bg-black text-white py-2.5 px-4 rounded-xl hover:bg-gray-800 hover:shadow-md transition-all active:scale-95 text-sm font-bold tracking-wide"
                  >
                      Adicionar
                  </button>
                </form>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </section>
  );
}