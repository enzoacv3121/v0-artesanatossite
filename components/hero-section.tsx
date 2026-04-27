"use client"

export function HeroSection() {
  return (
    <section id="inicio" className="pt-32 pb-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Artesanato feito com <span className="italic font-medium text-primary">amor</span> e{" "}
            <span className="italic font-medium text-accent">dedicação</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Cada peça é única, criada à mão com técnicas tradicionais e materiais cuidadosamente selecionados
          </p>
        </div>
      </div>
    </section>
  )
}