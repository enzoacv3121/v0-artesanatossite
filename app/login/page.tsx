// app/login/page.tsx

import { supabaseServer } from "@/lib/supabase.server";
import { redirect } from 'next/navigation';

// Server Action para lidar com o formulário de login
async function signIn(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Chama a função de login do Supabase Auth
  const { error } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro de Login:', error.message);
    // Em um projeto real, você mostraria o erro na tela
    return { error: 'Email ou senha inválidos.' };
  }
  
  // Redireciona para a página inicial após o login
  redirect('/'); 
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Acesse Sua Conta</h2>
        
        {/* O formulário aponta para o Server Action 'signIn' */}
        <form action={signIn} className="space-y-4">
          
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
            Entrar
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta? 
          <a href="/cadastro" className="font-medium text-pink-600 hover:text-pink-500 ml-1">
            Cadastre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
}