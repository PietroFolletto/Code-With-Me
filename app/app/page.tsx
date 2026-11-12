import Link from "next/link";
import AppShell from "@/components/AppShell";
import ResumoCard from "@/components/ResumoCard";
import { carregarContexto } from "@/lib/contexto";
import { NIVEIS, ACERTOS_PARA_PASSAR } from "@/lib/trilha";

export default async function Home() {
  const { linhas, stats, erro } = await carregarContexto();

  const porNivel = new Map(linhas.map((l) => [l.nivel_id, l]));
  const liberado = (id: number) => id === 1 || Boolean(porNivel.get(id - 1)?.concluido);
  const proximo = NIVEIS.find((n) => liberado(n.id) && !porNivel.get(n.id)?.concluido);

  return (
    <AppShell ativo="home" stats={stats} linhas={linhas}>
      {erro && (
        <p role="alert" className="rounded-xl border border-line bg-panel px-4 py-3 text-sm text-textMuted">
          Não consegui carregar seu progresso agora. Tente atualizar a página.
        </p>
      )}

      <ResumoCard stats={stats} />

      <div className="rounded-card border border-line bg-panel p-5">
        {proximo ? (
          <>
            <p className="font-code text-[11px] text-accent">próximo passo</p>
            <h3 className="mt-1 font-display text-lg font-semibold">
              Nível {proximo.id}: {proximo.titulo}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-textMuted">{proximo.descricao}</p>
            <p className="mt-2 text-xs text-textMuted">
              Acerte pelo menos {ACERTOS_PARA_PASSAR} de {proximo.questoes.length} para liberar o próximo.
            </p>
            <Link
              href={`/app/nivel/${proximo.id}`}
              className="focus-ring mt-4 block rounded-lg bg-accent py-3 text-center text-sm font-semibold text-ink"
            >
              {porNivel.has(proximo.id) ? "Continuar" : "Começar"}
            </Link>
          </>
        ) : (
          <>
            <p className="font-code text-[11px] text-accent">trilha completa</p>
            <h3 className="mt-1 font-display text-lg font-semibold">Você concluiu todos os níveis!</h3>
            <p className="mt-1 text-sm leading-relaxed text-textMuted">
              Dá para refazer qualquer nível para melhorar seu resultado. Mais conteúdo chega em breve.
            </p>
          </>
        )}
      </div>
    </AppShell>
  );
}
