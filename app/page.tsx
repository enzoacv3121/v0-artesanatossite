// app/page.tsx

import { supabaseServer } from "@/lib/supabase.server" // 1. Importa o cliente Server
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

// Define a interface para o tipo de produto
interface Produto {
  id_produtos: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
  // Adicione outros campos da sua tabela produtos
}

export default async function Home() {
  // 2. Busca os dados no Supabase
  const { data: produtos, error } = await supabaseServer
    .from('produtos') // <-- Nome da sua tabela
    .select('*')     // <-- Seleciona todas as colunas
    .limit(10);      // <-- Limita para 10 itens para teste

  if (error) {
    console.error('Erro ao buscar produtos:', error.message);
    // Em caso de erro, retorna um array vazio
    return (
      <main className="min-h-screen">
        <p>Erro ao carregar produtos. Verifique sua conexão com o banco de dados.</p>
        <Footer />
      </main>
    );
  }

  // 3. Passa os dados para o ProductsSection
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      {/* Passa os produtos como propriedade */}
      <ProductsSection produtos={produtos as Produto[]} /> 
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}