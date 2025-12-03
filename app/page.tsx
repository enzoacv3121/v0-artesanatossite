// app/page.tsx
export const dynamic = 'force-dynamic'; 

import { createClient } from "@/lib/supabase.server"; 
// REMOVIDO: import { HeaderWrapper } ...
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

interface Produto {
  id_produtos: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
}

export default async function Home() {
  const supabase = await createClient(); 

  const { data: produtos, error } = await supabase
    .from('produtos') 
    .select('*')     
    .limit(10);      

  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
    return (
      <main className="min-h-screen">
        <p>Erro ao carregar produtos. Verifique sua conexão com o banco de dados.</p>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* REMOVIDO: <HeaderWrapper /> (Agora está no layout.tsx) */}
      
      <HeroSection />
      <ProductsSection produtos={produtos as Produto[]} /> 
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}