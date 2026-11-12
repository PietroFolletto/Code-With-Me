import AppShell from "@/components/AppShell";
import ResumoCard from "@/components/ResumoCard";
import { IconeTrofeu } from "@/components/Icones";
import { carregarContexto } from "@/lib/contexto";
import { avaliarConquistas } from "@/lib/conquistas";

export default async function ConquistasPage() {
  const { linhas, stats } = await carregarContexto();
  const conquistas = avaliarConquistas(stats, linhas);
  const ganhas = conquistas.filter((c) => c.atual >= c.meta).length;

  return (
    <AppShell ativo="conquistas" stats={stats} linhas={linhas}>
      <ResumoCard stats={stats} />

      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-display text-lg font-semibold">Conquistas</h2>
        <span className="font-code text-xs text-textMuted">
          {ganhas} de {conquistas.length}
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {conquistas.map((c) => {
          const ok = c.atual >= c.meta;
          const pct = (c.atual / c.meta) * 100;
          return (
            <li
              key={c.id}
              className={`flex items-center gap-4 rounded-card border px-4 py-4 ${
                ok ? "border-accent/60 bg-panel" : "border-line bg-panel/70"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  ok ? "bg-accent text-ink" : "bg-line text-textMuted"
                }`}
              >
                <IconeTrofeu />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold uppercase tracking-wide">{c.titulo}</p>
                <p className="mt-0.5 text-xs text-textMuted">{c.descricao}</p>
                {ok ? (
                  <p className="mt-2 text-[11px] font-medium text-accent">Conquistada</p>
                ) : (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink">
                      <div className="h-full rounded-full bg-accent/70" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-code text-[10px] text-textMuted">
                      {c.atual}/{c.meta}
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
