export function AboutSection() {
  return (
    <section id="sobre" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted">
            <img src="/elderly-woman-crafting-handmade-items-workshop.jpg" alt="Artesã trabalhando" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <h2
              className="text-4xl md:text-5xl font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Tradição e carinho em cada peça
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Há mais de 40 anos, dedico minha vida à arte do artesanato. Cada peça que crio carrega não apenas
                técnica, mas também amor, paciência e a sabedoria de décadas de experiência.
              </p>

              <p>
                Aprendi com minha mãe e minha avó, e hoje tenho a alegria de compartilhar essas criações com você. Cada
                bordado, cada ponto de crochê, cada pintura é feita pensando em trazer beleza e aconchego para sua casa.
              </p>

              <p>
                Trabalho com materiais de qualidade, muitos deles naturais e sustentáveis, porque acredito que o
                artesanato deve respeitar tanto quem o faz quanto quem o recebe.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-2xl font-light italic" style={{ fontFamily: "var(--font-cormorant)" }}>
                "Feito à mão, feito com amor"
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Vovó Artesã</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
