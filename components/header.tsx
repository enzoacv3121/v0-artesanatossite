"use client"; 

import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from 'next/link';
import { signOut } from '@/actions/auth';

interface HeaderProps {
  userLoggedIn: boolean; 
  serverCartCount?: number;
}

export function Header({ userLoggedIn, serverCartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
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
            <Link href="/" className="text-sm font-medium hover:text-black/70 transition-colors">Início</Link>
            <Link href="/#produtos" className="text-sm font-medium hover:text-black/70 transition-colors">Produtos</Link>
            <Link href="/#sobre" className="text-sm font-medium hover:text-black/70 transition-colors">Sobre</Link>
            <Link href="/#contato" className="text-sm font-medium hover:text-black/70 transition-colors">Contato</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {!userLoggedIn ? (
              <>
                <Link href="/login" onClick={handleLinkClick}>
                  <Button variant="ghost" className="text-sm font-medium hover:bg-muted/50 transition-colors">Entrar</Button>
                </Link>
                <Link href="/cadastro" onClick={handleLinkClick}>
                  <Button variant="default" className="text-sm font-medium bg-black text-white hover:bg-black/90 transition-colors">Cadastrar</Button>
                </Link>
              </>
            ) : (
              <form action={async () => {
                  await signOut();
              }}>
                <Button variant="ghost" size="icon" className="group" type="submit">
                  <LogOut className="h-5 w-5 mr-2 text-foreground hover:text-red-500 transition-colors" />
                  <span className="sr-only">Sair</span>
                </Button>
              </form>
            )}

            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative group">
                <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                {/* TRAVA DE SEGURANÇA: Só mostra se estiver logado E com itens */}
                {userLoggedIn && serverCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-sm">
                    {serverCartCount}
                  </span>
                )}
              </Button>
            </Link>

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
              
              {!userLoggedIn && (
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