import type { SupabaseClient } from "@supabase/supabase-js";
import {
  calcularStats,
  type LinhaAtividade,
  type LinhaProgresso,
} from "@/lib/estatisticas";

export async function carregarDados(supabase: SupabaseClient, userId: string) {
  const [p, a] = await Promise.all([
    supabase
      .from("progresso")
      .select("nivel_id, acertos, total, concluido")
      .eq("user_id", userId),
    supabase.from("atividade").select("dia, questoes, acertos").eq("user_id", userId),
  ]);

  const linhas = (p.data ?? []) as LinhaProgresso[];
  const atividades = (a.data ?? []) as LinhaAtividade[];
  const stats = calcularStats(linhas, atividades);

  return { linhas, atividades, stats, erro: Boolean(p.error) };
}
