// components/header.tsx (ou .js)

import Link from 'next/link';

// Supondo que você use uma lista de links existente
const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/#produtos' },
    { name: 'Sobre', href: '/#sobre' },
    { name: 'Contato', href: '/#contato' },
];

export function Header() {
    // Você pode adicionar a lógica de verificação de login aqui no futuro
    const userLoggedIn = false; // Substitua por lógica real de sessão

    return (
        <header className="flex justify-between items-center py-4 px-8 border-b">
            {/* Logo/Nome da Loja */}
            <Link href="/" className="text-xl font-serif font-bold">
                Artesanatos da Vovó
            </Link>

            {/* Links de Navegação */}
            <nav className="flex space-x-6">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-gray-600 hover:text-pink-600">
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Área de Ação (Login/Carrinho) */}
            <div className="flex items-center space-x-4">
                {/* Botões de Autenticação */}
                {!userLoggedIn && (
                    <>
                        <Link href="/login" className="text-sm font-medium text-pink-600 hover:text-pink-800">
                            Entrar
                        </Link>
                        <Link href="/cadastro" className="bg-pink-600 text-white py-1.5 px-3 rounded text-sm hover:bg-pink-700">
                            Cadastrar
                        </Link>
                    </>
                )}
                
                {/* Ícone de Carrinho (Já está no seu layout) */}
                <span className="text-gray-600">🛒<sup className="text-xs">0</sup></span> 
            </div>
        </header>
    );
}

// Lembre-se de importar o 'Link' do 'next/link' se ele ainda não estiver lá.