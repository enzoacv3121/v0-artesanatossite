"use client"

import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <span
              className="font-serif text-xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Artesanatos da Vovó
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">
              Início
            </a>
            <a href="#produtos" className="text-sm font-medium hover:text-primary transition-colors">
              Produtos
            </a>
            <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
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
              <a href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">
                Início
              </a>
              <a href="#produtos" className="text-sm font-medium hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
                Contato
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
