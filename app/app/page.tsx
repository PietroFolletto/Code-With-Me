import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NIVEIS, ACERTOS_PARA_PASSAR, XP_POR_ACERTO } from "@/lib/trilha";
import SairButton from "@/components/SairButton";

type Linha = {
  nivel_id: number;
  acertos: number;
  total: number;
  concluido: boolean;
};

function IconeCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="#12151C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconeCadeado() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="#8B93A3" strokeWidth="2" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="#8B93A3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default async function Trilha() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("progresso")
    .select("nivel_id, acertos, total, concluido")
    .eq("user_id", user.id);

  const linhas = (data ?? []) as Linha[];
  const porNivel = new Map(linhas.map((l) => [l.nivel_id, l]));

  const xp = linhas.reduce((soma, l) => soma + l.acertos * XP_POR_ACERTO, 0);
  const concluidos = linhas.filter((l) => l.concluido).length;

  const desbloqueado = (id: number) =>
    id === 1 || Boolean(porNivel.get(id - 1)?.concluido);
  const atualId =
    NIVEIS.find((n) => desbloqueado(n.id) && !porNivel.get(n.id)?.concluido)?.id ?? null;

  const primeiroNome =
    (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    "";

  return (
    <main className="min-h-screen bg-ink">
      <header className="mx-auto flex max-w-xl items-center justify-between px-6 py-5">
        <span className="font-display text-base font-semibold tracking-tight">
          Code With Me
        </span>
        <div className="flex items-center gap-3">
          <span className="font-code text-xs text-accent">{xp} XP</span>
          <SairButton />
        </div>
      </header>

      <div className="mx-auto max-w-xl px-6 pb-20">
        <div className="mb-10 mt-4">
          <p className="font-code text-xs text-accent">sua trilha</p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight">
            Oi, {primeiroNome}. Bora treinar lógica?
          </h1>
          <p className="mt-2 text-sm text-textMuted">
            {concluidos} de {NIVEIS.length} níveis concluídos. Acerte pelo menos{" "}
            {ACERTOS_PARA_PASSAR} de 6 perguntas para liberar o próximo.
          </p>
        </div>

        {error && (
          <p role="alert" className="mb-6 rounded-lg border border-line bg-panel px-4 py-3 text-sm text-textMuted">
            Não consegui carregar seu progresso agora. Tente atualizar a página.
          </p>
        )}

        <ol>
          {NIVEIS.map((nivel, i) => {
            const linha = porNivel.get(nivel.id);
            const concluido = Boolean(linha?.concluido);
            const liberado = desbloqueado(nivel.id);
            const atual = nivel.id === atualId;
            const ultimo = i === NIVEIS.length - 1;

            const no = concluido
              ? "bg-trail"
              : atual
              ? "bg-accent ring-4 ring-accent/25"
              : liberado
              ? "bg-accent"
              : "bg-panel border border-line";

            const card = (
              <div
                className={`rounded-card border px-5 py-4 transition-colors ${
                  atual
                    ? "border-accent bg-panel hover:bg-[#1F2531]"
                    : liberado
                    ? "border-line bg-panel hover:bg-[#1F2531]"
                    : "border-line bg-panel/50 opacity-60"
                }`}
              >
                <p className="font-code text-[11px] text-textMuted">nível {nivel.id}</p>
                <h2 className="mt-1 font-display text-lg font-semibold">{nivel.titulo}</h2>
                <p className="mt-1 text-sm leading-relaxed text-textMuted">
                  {nivel.descricao}
                </p>

                <p className="mt-3 text-xs">
                  {concluido ? (
                    <span className="text-trail">
                      Concluído · melhor resultado: {linha?.acertos}/{linha?.total} acertos
                    </span>
                  ) : atual ? (
                    <span className="font-medium text-accent">
                      {linha ? "Continuar" : "Começar"} →
                    </span>
                  ) : (
                    <span className="text-textMuted">
                      Conclua o nível anterior para liberar
                    </span>
                  )}
                </p>
              </div>
            );

            return (
              <li key={nivel.id} className={`relative flex gap-4 ${ultimo ? "" : "pb-6"}`}>
                {!ultimo && (
                  <span
                    aria-hidden="true"
                    className={`absolute left-[19px] top-10 bottom-0 w-0.5 ${
                      concluido ? "bg-trail" : "bg-line"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${no}`}
                >
                  {concluido ? (
                    <IconeCheck />
                  ) : liberado ? (
                    <span className="font-display text-sm font-semibold text-ink">
                      {nivel.id}
                    </span>
                  ) : (
                    <IconeCadeado />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  {liberado ? (
                    <Link href={`/app/nivel/${nivel.id}`} className="focus-ring block rounded-card">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
