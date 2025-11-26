// components/product-interactive.tsx
"use client"; // Componente de Cliente para interatividade

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
    if (cep.length < 8) return; // Validação simples

    setLoadingCep(true);
    setShippingResult(null);

    // Simula um delay de rede de 1 segundo
    setTimeout(() => {
      setLoadingCep(false);
      setShippingResult("Sedex: R$ 18,90 (2 dias úteis) | PAC: Grátis (5 dias)");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Formulário de Adicionar ao Carrinho */}
      <form action={addItemToCart} className="space-y-6">
        <input type="hidden" name="produtoId" value={produtoId} />
        {/* Input invisível para enviar a quantidade correta ao servidor */}
        <input type="hidden" name="quantity" value={quantity} />

        <div className="flex gap-4">
          {/* Seletor de Quantidade Funcional */}
          <div className="flex items-center border border-gray-300 w-32 h-12">
            <button
              type="button"
              onClick={decrement}
              className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50"
            >
              <Minus size={16} />
            </button>
            <div className="w-full h-full flex items-center justify-center text-sm font-medium border-l border-r border-gray-100">
              {quantity}
            </div>
            <button
              type="button"
              onClick={increment}
              className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Botão COMPRAR */}
          <button
            type="submit"
            className="flex-1 bg-black text-white h-12 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors uppercase flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Comprar
          </button>
        </div>

        <p className="text-xs text-green-600 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>
          Em estoque - Envio imediato
        </p>
      </form>

      {/* Calculadora de Frete (Simulada) */}
      <div className="bg-gray-50 p-4 rounded-sm mt-6 border border-gray-100">
        <p className="text-xs font-bold uppercase text-gray-600 mb-2 flex items-center gap-2">
          <Truck size={16} /> Meios de Envio
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="00000-000"
            maxLength={9}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="flex-1 border border-gray-300 p-2 text-sm outline-none focus:border-black bg-white"
          />
          <button
            type="button"
            onClick={handleSimulateShipping}
            className="bg-black text-white px-4 py-2 text-xs font-bold uppercase min-w-[80px]"
          >
            {loadingCep ? "..." : "Calcular"}
          </button>
        </div>
        
        {/* Resultado da Simulação */}
        {shippingResult && (
          <div className="mt-3 text-xs text-gray-800 font-medium border-t border-gray-200 pt-2 animate-in fade-in slide-in-from-top-1">
            {shippingResult}
          </div>
        )}
        
        <a href="#" className="text-xs text-gray-400 underline mt-2 inline-block hover:text-gray-600">
          Não sei meu CEP
        </a>
      </div>
    </div>
  );
}