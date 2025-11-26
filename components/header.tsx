// components/header.tsx

"use client"

import { ShoppingCart, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from 'next/link';
import { signOut } from '@/actions/auth'; // <--- IMPORTAÇÃO DA NOVA SERVER ACTION

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // NOTE: userLoggedIn deve ser lido de um contexto/cookie
  // Mantenha como 'false' temporariamente para ver os botões
  const userLoggedIn = false; 

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  }

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
            <a href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">Início</a>
            <a href="#produtos" className="text-sm font-medium hover:text-primary transition-colors">Produtos</a>
            <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">Sobre</a>
            <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">Contato</a>
          </nav>

          {/* Actions (Login/Cadastro, Sair e Carrinho) */}
          <div className="flex items-center gap-4">

            {/* BOTÕES DE AUTENTICAÇÃO */}
            {!userLoggedIn ? (
              <>
                <Link href="/login" onClick={handleLinkClick}>
                  <Button variant="ghost" className="text-sm font-medium hover:bg-muted/50 transition-colors">Entrar</Button>
                </Link>
                <Link href="/cadastro" onClick={handleLinkClick}>
                  <Button variant="default" className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Cadastrar</Button>
                </Link>
              </>
            ) : (
              // Botão de Sair (quando logado)
              <form action={signOut}> {/* <--- CHAMA A AÇÃO IMPORTADA */}
                <Button variant="ghost" size="icon" className="group">
                  <User className="h-5 w-5 mr-2 text-foreground" />
                  <span className="text-sm font-medium text-foreground">Sair</span>
                </Button>
              </form>
            )}

            {/* Carrinho de Compras */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#inicio" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Início</a>
              <a href="#produtos" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Produtos</a>
              <a href="#sobre" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Sobre</a>
              <a href="#contato" onClick={handleLinkClick} className="text-sm font-medium hover:text-primary transition-colors">Contato</a>
              
              {/* Links de Autenticação no Mobile */}
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