// components/about-section.tsx

import { Heart } from "lucide-react";

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        
        <div className="mb-8 flex justify-center">
          <div className="p-3 bg-gray-50 rounded-full">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif font-normal text-gray-900 mb-8 italic">
          "A sofisticação da decoração de alto padrão, <br className="hidden md:block" /> com o calor do feito à mão."
        </h2>

        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>
            Por trás de cada peça da <strong>Artesanatos da Vovó</strong>, existe o olhar apurado de <strong>Valdeci De Sousa</strong>. 
            Com anos de experiência atuando como decoradora em lojas de alto padrão, Valdeci une o requinte do design clássico 
            à técnica artesanal que cultiva há décadas.
          </p>

          <p>
            O que começou como um hobby tornou-se uma assinatura de estilo. Valdeci entende que uma casa não precisa apenas ser bonita, 
            ela precisa ter alma. Por isso, cada bordado, cada ponto de crochê e cada pintura é pensado não apenas como um produto, 
            mas como um elemento de composição para o seu ambiente.
          </p>

          <p>
            Aqui, a tradição não é velha, é atemporal. Utilizamos materiais premium e acabamentos impecáveis para garantir que 
            você leve para casa a mesma qualidade exigida nas grandes boutiques de decoração, mas com o carinho que só uma avó sabe colocar.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="font-serif text-xl text-gray-900 italic">Valdeci De Sousa</p>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Decoradora & Artesã</p>
        </div>

      </div>
    </section>
  )
}