// components/products-section.tsx (ou .js)

// 1. Defina a interface (ou tipo) Produto
interface Produto {
  id_produtos: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
  // ... outros campos
}

// 2. O componente agora recebe um array de produtos
interface ProductsSectionProps {
  produtos: Produto[];
}

// 3. Use os produtos na função do componente
export function ProductsSection({ produtos }: ProductsSectionProps) {
  return (
    <section id="produtos" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Nossos Produtos</h2>
      
      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* 4. Mapeia e exibe cada produto */}
          {produtos.map((produto) => (
            <div key={produto.id_produtos} className="border p-4 rounded-lg shadow-md">
              <img src={produto.imagem_url || 'placeholder.jpg'} alt={produto.nome} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold">{produto.nome}</h3>
              <p className="text-gray-600 mt-2">{produto.descricao.substring(0, 100)}...</p>
              <p className="text-lg font-bold mt-3">R$ {produto.preco.toFixed(2)}</p>
              <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}