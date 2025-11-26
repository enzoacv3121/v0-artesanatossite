import { createClient } from "@/lib/supabase.server"; // <--- REMOVIDA A PASTA EXTRA 'supabase/'


export async function getUserSession() {
    const supabase = createClient();
    
    // Esta função lê os cookies de forma segura no servidor
    const { data: { user } } = await supabase.auth.getUser();
    
    return user; 
}