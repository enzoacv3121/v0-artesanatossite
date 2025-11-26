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
      <h2 className="text-3xl font-bold text-center mb-10">Nossos Produtos</h2>
      
      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {produtos.map((produto) => (
            <div key={produto.id_produtos} className="border border-border p-4 rounded-lg shadow-sm flex flex-col">
              <img 
                src={produto.imagem_url || 'placeholder.jpg'} 
                alt={produto.nome} 
                className="w-full h-48 object-cover mb-4 rounded" 
              />
              <h3 className="text-xl font-semibold">{produto.nome}</h3>
              <p className="text-gray-600 mt-2 flex-grow">{produto.descricao.substring(0, 100)}...</p>
              <p className="text-lg font-bold mt-3">R$ {produto.preco.toFixed(2)}</p>
              
              <div className="mt-4 flex items-center gap-2">
                {/* --- ALTERAÇÃO AQUI: O Link AGORA É O BOTÃO --- */}
                {/* Removemos a tag <button> e aplicamos o estilo no Link */}
                <Link 
                  href={`/produto/${produto.id_produtos}`}
                  className="border border-primary text-primary py-2 px-4 rounded hover:bg-muted/50 transition-colors text-sm font-medium text-center"
                >
                  Ver Detalhes
                </Link>

                {/* Formulário de Adicionar ao Carrinho */}
                <form action={addItemToCart} className="flex-grow"> 
                  <input type="hidden" name="produtoId" value={produto.id_produtos} />

                  <button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition-colors text-sm font-medium"
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