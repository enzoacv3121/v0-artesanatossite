// components/header-wrapper.tsx

import { getUserSession } from '@/lib/auth';
import { Header } from './header';

// ESTE É UM SERVER COMPONENT
export async function HeaderWrapper() {
    
    // 1. Obtém o status do usuário no servidor
    const user = await getUserSession();
    
    // 2. user será um objeto (se logado) ou null (se deslogado)
    const userLoggedIn = !!user; 
    
    // 3. Renderiza o Client Component, passando o status via props
    // SINTAXE LIMPA PARA EVITAR ERROS
    return (
        <Header userLoggedIn={userLoggedIn} />
    );
}