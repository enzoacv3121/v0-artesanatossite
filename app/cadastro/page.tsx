// app/cadastro/page.tsx

import { supabaseServer } from "@/lib/supabase.server";
import { redirect } from 'next/navigation';

// Esta é uma Server Action para lidar com o formulário
async function signUp(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string; // <--- NOVO CAMPO DE TELEFONE

  // Chama a função de cadastro do Supabase Auth
  const { data, error } = await supabaseServer.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone_number: phone, // <--- SALVANDO O TELEFONE COMO METADADOS
      },
      emailRedirectTo: 'http://localhost:3000/login' // Opcional: Para onde redirecionar após o clique no email
    },
  });

  if (error) {
    console.error('Erro de Cadastro:', error.message);
    return { error: 'Ocorreu um erro ao tentar cadastrar.' };
  }
  
  // Redireciona o usuário (ele ainda terá que confirmar o email)
  redirect('/'); 
}

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crie Sua Conta</h2>
        
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
            <input 
              id="phone" 
              name="phone" 
              type="tel" // Tipo de input para telefone
              required 
              placeholder="(XX) 9XXXX-XXXX"
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
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}