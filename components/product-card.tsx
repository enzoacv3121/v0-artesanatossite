"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  name: string
  price: string
  image: string
  category: string
}

export function ProductCard({ name, price, image, category }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-accent text-accent" : ""}`} />
        </Button>
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{category}</p>
        <h3 className="text-lg font-medium mb-2 text-balance">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-primary" style={{ fontFamily: "var(--font-cormorant)" }}>
            {price}
          </span>
          <Button size="sm" className="group">
            <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  )
}
