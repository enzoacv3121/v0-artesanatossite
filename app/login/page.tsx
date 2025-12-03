// app/login/page.tsx

import { createClient } from "@/lib/supabase.server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'; // <--- 1. IMPORTAÇÃO NOVA
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

async function signIn(formData: FormData) {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?error=Credenciais inválidas');
  }

  // 2. A MÁGICA ACONTECE AQUI:
  // Isso avisa ao Next.js para atualizar o layout (onde está o Header)
  revalidatePath('/', 'layout');

  return redirect('/');
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Acesse sua conta</CardTitle>
          <CardDescription>Digite seu e-mail e senha para entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Não tem uma conta? <Link href="/cadastro" className="text-primary font-semibold hover:underline">Cadastre-se</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}