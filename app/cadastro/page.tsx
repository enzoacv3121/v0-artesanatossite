// app/cadastro/page.tsx

import { supabaseServer } from "@/lib/supabase.server";
import { redirect } from 'next/navigation';

// Esta é uma Server Action para lidar com o formulário
async function signUp(formData: FormData) {
  'use server'; // Indica que esta função será executada no servidor

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string; // Capturando o nome do usuário

  // Chama a função de cadastro do Supabase Auth
  const { data, error } = await supabaseServer.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    console.error('Erro de Cadastro:', error.message);
    // Em um projeto real, você mostraria o erro na tela
    return { error: 'Ocorreu um erro ao tentar cadastrar.' };
  }
  
  // Redireciona para a página inicial após o sucesso
  redirect('/'); 
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crie Sua Conta</h2>
        
        {/* O formulário aponta para o Server Action 'signUp' */}
        <form action={signUp} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              required 
              placeholder="Seu Nome Completo"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="seu.email@exemplo.com"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="********"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}