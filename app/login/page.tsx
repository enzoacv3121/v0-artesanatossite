// app/login/page.tsx

import { createClient } from "@/lib/supabase.server";
import { redirect } from 'next/navigation';
import Link from "next/link";

// Server Action para lidar com o formulário de login
async function signIn(formData: FormData) {
  'use server';

  const supabase = createClient(); 

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Chama a função de login do Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro de Login:', error.message);
    return; 
  }
  
  // Redireciona para a página inicial após o login
  redirect('/'); 
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Acesse Sua Conta</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Bem-vindo de volta!</p>
        
        <form action={signIn} className="space-y-4">
          
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="seu.email@exemplo.com"
              className="w-full border border-gray-300 p-3 text-sm rounded-sm outline-none focus:border-black transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase mb-1">Senha</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="********"
              className="w-full border border-gray-300 p-3 text-sm rounded-sm outline-none focus:border-black transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-3 px-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-sm mt-4"
          >
            Entrar
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta? 
          <Link href="/cadastro" className="font-bold text-black hover:underline ml-1"> 
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}