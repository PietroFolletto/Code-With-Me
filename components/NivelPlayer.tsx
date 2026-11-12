"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ACERTOS_PARA_PASSAR, XP_POR_ACERTO, type Nivel } from "@/lib/trilha";

export default function NivelPlayer({
  nivel,
  userId,
}: {
  nivel: Nivel;
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const total = nivel.questoes.length;

  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [verificado, setVerificado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState<string | null>(null);

  const questao = nivel.questoes[indice];
  const acertou = verificado && escolha === questao.correta;
  const passou = acertos >= ACERTOS_PARA_PASSAR;
  const progresso = ((indice + (verificado ? 1 : 0)) / total) * 100;

  function verificar() {
    if (escolha === null) return;
    setVerificado(true);
    if (escolha === questao.correta) setAcertos((a) => a + 1);
  }

  function continuar() {
    if (indice < total - 1) {
      setIndice((i) => i + 1);
      setEscolha(null);
      setVerificado(false);
      return;
    }
    setFim(true);
    salvar(acertos);
  }

  async function salvar(acertosFinal: number) {
    setSalvando(true);
    setErroSalvar(null);

    const { data: atual } = await supabase
      .from("progresso")
      .select("acertos, concluido")
      .eq("user_id", userId)
      .eq("nivel_id", nivel.id)
      .maybeSingle();

    const melhor = Math.max(atual?.acertos ?? 0, acertosFinal);
    const concluido =
      Boolean(atual?.concluido) || acertosFinal >= ACERTOS_PARA_PASSAR;

    const { error } = await supabase.from("progresso").upsert(
      {
        user_id: userId,
        nivel_id: nivel.id,
        acertos: melhor,
        total,
        concluido,
        atualizado_em: new Date().toISOString(),
      },
      { onConflict: "user_id,nivel_id" }
    );

    setSalvando(false);

    if (error) {
      setErroSalvar("Não consegui salvar seu progresso agora.");
    } else {
      router.refresh();
    }
  }

  function tentarDeNovo() {
    setIndice(0);
    setEscolha(null);
    setVerificado(false);
    setAcertos(0);
    setFim(false);
    setErroSalvar(null);
  }

  function voltarParaTrilha() {
    router.push("/app");
    router.refresh();
  }

  if (fim) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <div className="w-full max-w-md text-center">
          <p className="font-code text-xs text-accent">
            {passou ? "nível concluído" : "quase lá"}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">
            {acertos} de {total} acertos
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-textMuted">
            {passou
              ? "Mandou bem! O próximo nível já está liberado na sua trilha."
              : `Faltou pouco. Para liberar o próximo nível, você precisa de pelo menos ${ACERTOS_PARA_PASSAR} acertos. Errar faz parte, tente de novo!`}
          </p>

          <p className="mt-6 font-code text-sm text-trail">
            +{acertos * XP_POR_ACERTO} XP
          </p>

          {erroSalvar && (
            <p role="alert" className="mt-4 text-sm text-[#E5766A]">
              {erroSalvar}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={voltarParaTrilha}
              disabled={salvando}
              className="focus-ring rounded-lg bg-accent py-3 text-sm font-semibold text-ink transition-opacity disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Voltar para a trilha"}
            </button>
            <button
              onClick={tentarDeNovo}
              disabled={salvando}
              className="focus-ring rounded-lg border border-line py-3 text-sm text-textPrimary transition-colors hover:bg-panel disabled:opacity-60"
            >
              Tentar de novo
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink">
      <header className="mx-auto flex max-w-xl items-center gap-4 px-6 py-5">
        <Link
          href="/app"
          aria-label="Sair do nível"
          className="focus-ring rounded-md p-1 text-textMuted transition-colors hover:text-textPrimary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-panel">
          <div
            className="h-full rounded-full bg-trail transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <span className="font-code text-xs text-textMuted">
          {indice + 1}/{total}
        </span>
      </header>

      <div className="mx-auto max-w-xl px-6 pb-16 pt-4">
        <p className="font-code text-xs text-accent">
          {nivel.titulo.toLowerCase()}
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold leading-snug">
          {questao.enunciado}
        </h1>

        {questao.codigo && (
          <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-panel p-4 font-code text-sm leading-relaxed text-textPrimary">
            {questao.codigo}
          </pre>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {questao.alternativas.map((alt, i) => {
            const selecionada = escolha === i;
            const correta = verificado && i === questao.correta;
            const errada = verificado && selecionada && i !== questao.correta;

            const estilo = correta
              ? "border-trail bg-trail/10"
              : errada
              ? "border-[#E5766A] bg-[#E5766A]/10"
              : selecionada
              ? "border-accent bg-panel"
              : "border-line bg-panel hover:border-textMuted";

            return (
              <button
                key={i}
                type="button"
                disabled={verificado}
                onClick={() => setEscolha(i)}
                aria-pressed={selecionada}
                className={`focus-ring flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${estilo}`}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line font-code text-xs text-textMuted">
                  {String.fromCharCode(65 + i)}
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    questao.alternativasCodigo ? "font-code" : ""
                  }`}
                >
                  {alt}
                </span>
              </button>
            );
          })}
        </div>

        {!verificado ? (
          <button
            onClick={verificar}
            disabled={escolha === null}
            className="focus-ring mt-8 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-ink transition-opacity disabled:opacity-40"
          >
            Verificar
          </button>
        ) : (
          <div
            role="status"
            className={`mt-8 rounded-xl border px-5 py-4 ${
              acertou
                ? "border-trail/50 bg-trail/10"
                : "border-[#E5766A]/50 bg-[#E5766A]/10"
            }`}
          >
            <p
              className={`font-display text-lg font-semibold ${
                acertou ? "text-trail" : "text-[#E5766A]"
              }`}
            >
              {acertou ? "Isso aí!" : "Não foi dessa vez."}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-textPrimary">
              {questao.explicacao}
            </p>
            <button
              onClick={continuar}
              className="focus-ring mt-4 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-ink"
            >
              {indice < total - 1 ? "Continuar" : "Ver resultado"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
