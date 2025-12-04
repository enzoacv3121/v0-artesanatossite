// app/checkout/page.tsx

import { createClient } from "@/lib/supabase.server";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Footer } from "@/components/footer";
import { redirect } from "next/navigation";
import { CreditCard, QrCode, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Ação de Pagamento Simulado
async function processPayment() {
  'use server';
  
  // Aqui você colocaria a lógica real do Stripe/MercadoPago no futuro
  // Por enquanto, apenas simulamos um sucesso e limpamos o carrinho
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    // Limpa o carrinho
    await supabase.from('carrinho').delete().eq('usuario_id', user.id);
    
    // Cria um registro de pedido (Opcional para a apresentação, mas bom ter)
    await supabase.from('pedidos').insert([
        { 
            usuario_id: user.id, 
            status: 'pago', 
            total: 0 // (Idealmente calcularia o total real aqui)
        }
    ]);
  }
  
  redirect('/sucesso');
}

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  // Busca itens para mostrar o resumo
  const { data: itens } = await supabase
    .from('carrinho')
    .select('quantidade, produtos(nome, preco)')
    .eq('usuario_id', user.id);

  const total = itens?.reduce((acc, item: any) => {
    return acc + (item.produtos.preco * item.quantidade);
  }, 0) || 0;

  if (total === 0) return redirect('/'); // Se não tem itens, volta pra home

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <HeaderWrapper />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Coluna da Esquerda: Formulário de Pagamento */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Finalizar Pedido</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Dados de Pagamento</CardTitle>
                <CardDescription>Escolha como você quer pagar.</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={processPayment} className="space-y-6">
                  
                  <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="card" id="card" className="peer sr-only" />
                      <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-3 h-6 w-6" />
                        Cartão
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                      <Label
                        htmlFor="pix"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <QrCode className="mb-3 h-6 w-6" />
                        Pix
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome no Cartão</Label>
                      <Input id="name" placeholder="Como impresso no cartão" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="number">Número do Cartão</Label>
                      <Input id="number" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-bold uppercase tracking-wider">
                    Pagar R$ {total.toFixed(2)}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Lock size={14} /> Pagamento processado com segurança SSL
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Coluna da Direita: Resumo */}
          <div>
            <Card className="bg-gray-50 border-gray-200 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Resumo da Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {itens?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantidade}x {item.produtos.nome}</span>
                        <span className="font-medium">R$ {(item.produtos.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                ))}
                
                <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Frete</span>
                        <span className="text-green-600">Grátis</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-gray-900 pt-2">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}