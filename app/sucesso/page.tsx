// app/sucesso/page.tsx

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";

export default function SucessoPage() {
  // Gera um número de pedido aleatório para dar realismo
  const numeroPedido = Math.floor(1000 + Math.random() * 9000);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <HeaderWrapper />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-lg text-center border border-gray-100 animate-in fade-in zoom-in duration-500">
          
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="text-green-600 w-16 h-16" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedido Recebido!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Obrigado por comprar conosco. Seu pedido foi processado com sucesso e estamos preparando tudo com carinho.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">Número do Pedido</span>
              <span className="font-mono font-bold text-gray-900">#{numeroPedido}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Status</span>
              <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded text-xs border border-green-100">Pagamento Aprovado</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block w-full">
              <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 uppercase tracking-widest font-bold">
                Continuar Comprando
              </Button>
            </Link>
            <p className="text-xs text-gray-400">Você receberá um e-mail com o código de rastreio.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}