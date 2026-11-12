"use server";

import { createClient } from "@/lib/supabase/server";
import { getNivel, ACERTOS_PARA_PASSAR } from "@/lib/trilha";
import { carregarDados } from "@/lib/dados";
import { diaBR } from "@/lib/estatisticas";
import { sincronizarPerfil } from "@/lib/perfil";

export async function registrarResultado(
  nivelId: number,
  acertosFinal: number
): Promise<{ ok: boolean; erro?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, erro: "Sua sessão expirou. Entre de novo." };

  const nivel = getNivel(nivelId);
  if (!nivel) return { ok: false, erro: "Nível não encontrado." };

  const total = nivel.questoes.length;
  const acertos = Math.max(0, Math.min(total, Math.floor(Number(acertosFinal) || 0)));

  const { data: atual } = await supabase
    .from("progresso")
    .select("acertos, concluido")
    .eq("user_id", user.id)
    .eq("nivel_id", nivelId)
    .maybeSingle();

  const { error } = await supabase.from("progresso").upsert(
    {
      user_id: user.id,
      nivel_id: nivelId,
      acertos: Math.max(atual?.acertos ?? 0, acertos),
      total,
      concluido: Boolean(atual?.concluido) || acertos >= ACERTOS_PARA_PASSAR,
      atualizado_em: new Date().toISOString(),
    },
    { onConflict: "user_id,nivel_id" }
  );

  if (error) return { ok: false, erro: "Não consegui salvar seu progresso agora." };

  // Atividade do dia (usada em sequência, meta diária e precisão).
  const hoje = diaBR();
  const { data: ativ } = await supabase
    .from("atividade")
    .select("questoes, acertos")
    .eq("user_id", user.id)
    .eq("dia", hoje)
    .maybeSingle();

  await supabase.from("atividade").upsert(
    {
      user_id: user.id,
      dia: hoje,
      questoes: (ativ?.questoes ?? 0) + total,
      acertos: (ativ?.acertos ?? 0) + acertos,
    },
    { onConflict: "user_id,dia" }
  );

  const dados = await carregarDados(supabase, user.id);
  await sincronizarPerfil(supabase, user, dados.stats);

  return { ok: true };
}
