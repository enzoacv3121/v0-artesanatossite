export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="font-serif text-lg font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
                Artesanatos da Vovó
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Peças únicas feitas à mão com amor e dedicação há mais de 40 anos.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#inicio" className="hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-primary transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Bordados
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Crochê
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cerâmica
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cestas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Artesanatos da Vovó. Feito com amor e carinho.</p>
        </div>
      </div>
    </footer>
  )
}
