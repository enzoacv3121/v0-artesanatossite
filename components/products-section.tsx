"use client"

import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "Cesta de Palha Artesanal",
    price: "R$ 89,90",
    category: "Cestas",
    image: "/handmade-woven-basket-natural-fiber.jpg",
  },
  {
    name: "Toalha de Mesa Bordada",
    price: "R$ 145,00",
    category: "Bordados",
    image: "/embroidered-tablecloth-floral-pattern.jpg",
  },
  {
    name: "Vaso de Cerâmica Pintado",
    price: "R$ 67,50",
    category: "Cerâmica",
    image: "/handpainted-ceramic-vase-colorful.jpg",
  },
  {
    name: "Almofada de Crochê",
    price: "R$ 54,90",
    category: "Crochê",
    image: "/crochet-cushion-pillow-handmade.jpg",
  },
  {
    name: "Jogo Americano Tecido",
    price: "R$ 38,00",
    category: "Tecidos",
    image: "/fabric-placemat-handwoven-textile.jpg",
  },
  {
    name: "Porta-Joias Decorado",
    price: "R$ 72,00",
    category: "Decoração",
    image: "/decorated-jewelry-box-handcrafted.jpg",
  },
]

export function ProductsSection() {
  return (
    <section id="produtos" className="py-20 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
            Nossos Produtos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore nossa coleção de peças únicas, cada uma com sua própria história
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  )
}
