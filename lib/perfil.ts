import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Stats } from "@/lib/estatisticas";

export function nomeExibicao(user: User): string {
  const completo = (user.user_metadata?.full_name as string | undefined)?.trim();
  return completo || user.email?.split("@")[0] || "Aluno";
}

// Guarda um resumo público do aluno (nome e números) para o ranking e a busca de amigos.
// Se a tabela do social ainda não existir, o erro é simplesmente ignorado.
export async function sincronizarPerfil(
  supabase: SupabaseClient,
  user: User,
  stats: Stats
) {
  await supabase.from("perfis").upsert(
    {
      user_id: user.id,
      nome: nomeExibicao(user),
      xp: stats.xp,
      nivel: stats.nivelUsuario,
      acertos: stats.acertosTotais,
      questoes: stats.questoesResolvidas,
      dias_seguidos: stats.sequencia,
      dias_totais: stats.diasTotais,
      atualizado_em: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}
