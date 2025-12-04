// components/footer.tsx

import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10 font-sans text-gray-600">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div>
                <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">
                  Artesanatos da Vovó
                </span>
            </div>
            <p className="text-sm leading-relaxed">
              Peças únicas feitas à mão com amor e dedicação há mais de 40 anos.
            </p>
            <div className="flex gap-4 pt-2">
              <Instagram size={18} className="cursor-pointer hover:text-black" />
              <Facebook size={18} className="cursor-pointer hover:text-black" />
              <Twitter size={18} className="cursor-pointer hover:text-black" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-xs uppercase tracking-widest">Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-black transition-all">Início</Link></li>
              <li><Link href="/#produtos" className="hover:text-black transition-all">Produtos</Link></li>
              <li><Link href="/contato" className="hover:text-black transition-all">Contato</Link></li>
            </ul>
          </div>

          {/* Links de Categoria Funcionando */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-xs uppercase tracking-widest">Categorias</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/?categoria=Bordados" className="hover:text-black hover:underline transition-all">Bordados</Link></li>
              <li><Link href="/?categoria=Crochê" className="hover:text-black hover:underline transition-all">Crochê</Link></li>
              <li><Link href="/?categoria=Cerâmica" className="hover:text-black hover:underline transition-all">Cerâmica</Link></li>
              <li><Link href="/?categoria=Cestas" className="hover:text-black hover:underline transition-all">Cestas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-xs uppercase tracking-widest">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone size={16} /> (11) 99999-9999</li>
              <li className="flex items-center gap-3"><Mail size={16} /> sac@artesanatos.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-xs text-gray-400">© 2025 Artesanatos da Vovó Valdeci.</p>
        </div>
      </div>
    </footer>
  );
}