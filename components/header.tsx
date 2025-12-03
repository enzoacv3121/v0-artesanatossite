"use client"; 

import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { signOut } from '@/actions/auth';
import { createClient } from '@/lib/supabase.client'; // <--- IMPORTAÇÃO NOVA

interface HeaderProps {
  userLoggedIn: boolean; 
}

export function Header({ userLoggedIn: initialUserLoggedIn }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Estado local para controlar o login visualmente
  const [isLoggedIn, setIsLoggedIn] = useState(initialUserLoggedIn);

  // EFEITO MÁGICO: Verifica no navegador se o usuário está logado
  useEffect(() => {
    const supabase = createClient();
    
    // 1. Verifica a sessão atual imediatamente
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      }
    };
    checkSession();

    // 2. Escuta mudanças (login/logout) em tempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || session) {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Atualiza o estado se a prop do servidor mudar (sincronia)
  useEffect(() => {
    setIsLoggedIn(initialUserLoggedIn);
  }, [initialUserLoggedIn]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <span
              className="font-serif text-xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Artesanatos da Vovó
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Início</Link>
            <Link href="/#produtos" className="text-sm font-medium hover:text-primary transition-colors">Produtos</Link>
            <Link href="/#sobre" className="text-sm font-medium hover:text-primary transition-colors">Sobre</Link>
            <Link href="/#contato" className="text-sm font-medium hover:text-primary transition-colors">Contato</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {/* LÓGICA VISUAL ATUALIZADA */}
            {!isLoggedIn ? (
              <>
                <Link href="/login" onClick={handleLinkClick}>
                  <Button variant="ghost" className="text-sm font-medium hover:bg-muted/50 transition-colors">Entrar</Button>
                </Link>
                <Link href="/cadastro" onClick={handleLinkClick}>
                  <Button variant="default" className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Cadastrar</Button>
                </Link>
              </>
            ) : (
              <form action={async () => {
                  await signOut();
                  setIsLoggedIn(false); // Força atualização visual imediata ao sair
              }}>
                <Button variant="ghost" size="icon" className="group" type="submit">
                  <LogOut className="h-5 w-5 mr-2 text-foreground" />
                  <span className="sr-only">Sair</span>
                </Button>
              </form>
            )}

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Início</Link>
              <Link href="/#produtos" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Produtos</Link>
              
              {!isLoggedIn && (
                <>
                  <Link href="/login" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Entrar</Link>
                  <Link href="/cadastro" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Cadastrar</Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}