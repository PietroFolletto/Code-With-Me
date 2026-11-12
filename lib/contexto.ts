import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { carregarDados } from "@/lib/dados";
import { nomeExibicao } from "@/lib/perfil";

export async function carregarContexto() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const dados = await carregarDados(supabase, user.id);
  return { supabase, user, nome: nomeExibicao(user), ...dados };
}
