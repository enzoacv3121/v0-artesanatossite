// components/contact-section.tsx

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// AQUI ESTÁ O SEGREDO: "export function" (sem default)
export function ContactSection() {
  return (
    <section id="contato" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-gray-600">
            Tem alguma dúvida ou quer fazer um pedido personalizado? Mande uma mensagem!
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nome</label>
                <Input id="name" placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
              <Textarea 
                id="message" 
                placeholder="Como podemos ajudar?" 
                className="min-h-[120px]"
              />
            </div>

            <Button className="w-full md:w-auto">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}