// app/page.tsx

export const dynamic = 'force-dynamic'; 

import { createClient } from "@/lib/supabase.server"; 
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CategoryFilter } from "@/components/category-filter"; // Agora o arquivo existe!

interface Produto {
  id_produtos: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
}

// CORREÇÃO: searchParams agora é uma Promise
export default async function Home({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const supabase = await createClient(); 
  
  // CORREÇÃO: Aguardamos a resolução dos parâmetros
  const { categoria } = await searchParams;

  let query = supabase.from('produtos').select('*');

  if (categoria && categoria !== 'Todos') {
    query = query.eq('categoria', categoria);
  }

  const { data: produtos, error } = await query.limit(20);      

  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Erro ao carregar produtos. Tente recarregar.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      
      <section id="produtos" className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-8 italic">Nossas Criações</h2>
        
        <CategoryFilter categoriaAtual={categoria} />
        
        {produtos && produtos.length > 0 ? (
            <ProductsSection produtos={produtos as Produto[]} />
        ) : (
            <p className="text-center text-gray-500 py-10">Nenhum produto encontrado nesta categoria.</p>
        )}
        
      </section>
      
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}