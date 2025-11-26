// app/page.tsx

// 1. IMPORTAÇÃO CORRIGIDA: Importamos a função createClient do servidor
import { createClient } from "@/lib/supabase.server"; 

// AVISO: Lembre-se de usar <HeaderWrapper /> no seu layout principal para ver o status de login!

import { Header } from "@/components/header"; 
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
  // Adicione outros campos da sua tabela produtos
}

export default async function Home() {
  // 2. CRIA A INSTÂNCIA DO CLIENTE DE SERVIDOR CORRETA
  const supabase = createClient(); 

  // 3. Busca os dados no Supabase usando a nova instância 'supabase'
  const { data: produtos, error } = await supabase
    .from('produtos') // <-- Nome da sua tabela
    .select('*')     // <-- Seleciona todas as colunas
    .limit(10);      // <-- Limita para 10 itens para teste

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

  // 4. Passa os dados para o ProductsSection
  return (
    <main className="min-h-screen">
      {/* ⚠️ Lembre-se: O Header deve ser chamado via <HeaderWrapper /> no layout/page principal */}
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