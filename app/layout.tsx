// app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { HeaderWrapper } from "@/components/header-wrapper"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Artesanatos da Vovó Valdeci",
  description: "Peças únicas feitas à mão com amor.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable} ${cormorant.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}>
        
        {/* Cabeçalho Global */}
        <HeaderWrapper />

        {/* Padding-top (pt-20) para o conteúdo não ficar atrás do header fixo */}
        <div className="flex-grow pt-24">
          <Suspense fallback={<div className="p-10 text-center">Carregando...</div>}>
            {children}
            <Analytics />
          </Suspense>
        </div>
        
      </body>
    </html>
  )
}