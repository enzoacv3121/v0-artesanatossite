"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contato" className="py-20 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
            Entre em Contato
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tem alguma dúvida ou quer encomendar uma peça especial? Adoraria conversar com você!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Card className="p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <Input id="name" placeholder="Seu nome completo" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail
                </label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <Textarea id="message" placeholder="Conte-me sobre o que você procura..." rows={5} />
              </div>

              <Button className="w-full" size="lg">
                Enviar Mensagem
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">E-mail</h3>
                  <p className="text-muted-foreground">contato@artesanatosdavovo.com.br</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Telefone</h3>
                  <p className="text-muted-foreground">(11) 98765-4321</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Instagram className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Instagram</h3>
                  <p className="text-muted-foreground">@artesanatosdavovo</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Localização</h3>
                  <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
