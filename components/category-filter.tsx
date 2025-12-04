"use client";

import Link from "next/link";
// Se você tiver a função 'cn' em @/lib/utils (padrão shadcn), use esta linha:
import { cn } from "@/lib/utils"; 
// SE NÃO TIVER 'cn', você pode removê-la e usar strings normais no className, mas o shadcn costuma ter.

const categorias = [
  "Todos",
  "Bordados",
  "Crochê",
  "Cerâmica",
  "Cestas",
  "Madeira" 
];

export function CategoryFilter({ categoriaAtual }: { categoriaAtual?: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-gray-100 pb-4">
      {categorias.map((cat) => {
        const isActive = categoriaAtual === cat || (!categoriaAtual && cat === "Todos");
        
        return (
          <Link 
            key={cat} 
            href={cat === "Todos" ? "/" : `/?categoria=${cat}`}
            scroll={false} 
            className={cn(
              "text-sm uppercase tracking-widest px-4 py-2 rounded-full transition-all",
              isActive 
                ? "bg-black text-white font-bold" 
                : "text-gray-500 hover:text-black hover:bg-gray-50"
            )}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}