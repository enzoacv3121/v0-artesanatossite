// components/product-interactive.tsx
"use client";

import { useState } from "react";
import { Minus, Plus, Truck, ShoppingBag } from "lucide-react";
import { addItemToCart } from "@/actions/cart";

interface ProductInteractiveProps {
  produtoId: string;
  estoque: number;
}

export function ProductInteractive({ produtoId, estoque }: ProductInteractiveProps) {
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");
  const [shippingResult, setShippingResult] = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  const increment = () => setQuantity((prev) => (prev < estoque ? prev + 1 : prev));
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSimulateShipping = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cep.length < 8) return;

    setLoadingCep(true);
    setShippingResult(null);

    setTimeout(() => {
      setLoadingCep(false);
      setShippingResult("Sedex: R$ 18,90 (2 dias úteis) | PAC: Grátis (5 dias)");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <form action={addItemToCart} className="space-y-6">
        <input type="hidden" name="produtoId" value={produtoId} />
        <input type="hidden" name="quantity" value={quantity} />

        <div className="flex gap-4">
          {/* MUDANÇA: rounded-xl, border-stone-200 */}
          <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden h-14 bg-white">
            <button
              type="button"
              onClick={decrement}
              className="w-12 h-full flex items-center justify-center hover:bg-stone-50 text-stone-600 disabled:opacity-50 transition-colors"
            >
              <Minus size={16} />
            </button>
            <div className="w-full h-full flex items-center justify-center text-sm font-medium border-l border-r border-stone-100">
              {quantity}
            </div>
            <button
              type="button"
              onClick={increment}
              className="w-12 h-full flex items-center justify-center hover:bg-stone-50 text-stone-600 disabled:opacity-50 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* MUDANÇA: rounded-xl, hover:shadow-lg, active:scale-95 */}
          <button
            type="submit"
            className="flex-1 bg-black text-white h-14 rounded-xl text-sm font-bold tracking-widest hover:bg-gray-800 hover:shadow-lg active:scale-95 transition-all uppercase flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Comprar
          </button>
        </div>

        <p className="text-xs text-green-600 flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
          Em estoque - Envio imediato
        </p>
      </form>

      {/* MUDANÇA: bg-stone-50, border-stone-100, rounded-2xl */}
      <div className="bg-stone-50 p-5 rounded-2xl mt-6 border border-stone-100">
        <p className="text-xs font-bold uppercase text-stone-600 mb-3 flex items-center gap-2">
          <Truck size={16} /> Meios de Envio
        </p>
        <div className="flex gap-2">
          {/* MUDANÇA: rounded-lg */}
          <input
            type="text"
            placeholder="00000-000"
            maxLength={9}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="flex-1 border border-stone-200 rounded-lg p-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white transition-all"
          />
          {/* MUDANÇA: rounded-lg, active:scale-95 */}
          <button
            type="button"
            onClick={handleSimulateShipping}
            className="bg-black text-white px-5 py-3 rounded-lg text-xs font-bold uppercase hover:bg-gray-800 active:scale-95 transition-all min-w-[90px]"
          >
            {loadingCep ? "..." : "Calcular"}
          </button>
        </div>
        
        {shippingResult && (
          <div className="mt-4 text-xs text-stone-800 font-medium border-t border-stone-200 pt-3 animate-in fade-in slide-in-from-top-1">
            {shippingResult}
          </div>
        )}
        
        <a href="#" className="text-xs text-stone-400 underline mt-3 inline-block hover:text-stone-600 transition-colors">
          Não sei meu CEP
        </a>
      </div>
    </div>
  );
}