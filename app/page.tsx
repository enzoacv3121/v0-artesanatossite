// app/page.tsx
export const dynamic = 'force-dynamic'; // <--- ADICIONE ESTA LINHA

import { createClient } from "@/lib/supabase.server"; 
import { HeaderWrapper } from "@/components/header-wrapper"; // <--- IMPORTA O WRAPPER
import { HeroSection } from "@/components/hero-section";
import { ProductsSection } from "@/components/products-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

// Define a interface para o tipo de produto
interface Produto {
  id_produtos: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
}

export default async function Home() {
  // 2. CRIA A INSTÂNCIA DO CLIENTE DE SERVIDOR CORRETA
  const supabase = createClient(); 

  // 3. Busca os dados no Supabase
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

  // 4. Passa os dados para o ProductsSection
  return (
    <main className="min-h-screen">
      {/* USANDO O WRAPPER NO LUGAR DO HEADER DIRETO */}
      <HeaderWrapper /> 
      <HeroSection />
      <ProductsSection produtos={produtos as Produto[]} /> 
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}