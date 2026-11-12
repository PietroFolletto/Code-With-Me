import { META_DIARIA, type Stats } from "@/lib/estatisticas";

function Bloco({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl bg-line/60 px-3 py-3">
      <p className="text-[10px] leading-tight text-textMuted">{rotulo}</p>
      <p className="mt-1.5 font-display text-lg font-semibold leading-none">{valor}</p>
    </div>
  );
}

export default function ResumoCard({ stats }: { stats: Stats }) {
  const feito = Math.min(stats.hojeQuestoes, META_DIARIA);
  const pct = (feito / META_DIARIA) * 100;

  return (
    <div className="rounded-card border border-line bg-panel p-5">
      <h2 className="text-center font-display text-xl font-semibold">Bem-vindo de volta!</h2>
      <p className="mt-1 text-center text-xs text-textMuted">
        Continue sua jornada de aprendizado
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <Bloco rotulo="Questões resolvidas" valor={String(stats.questoesResolvidas)} />
        <Bloco
          rotulo="Sequência atual"
          valor={`${stats.sequencia} ${stats.sequencia === 1 ? "dia" : "dias"}`}
        />
        <Bloco rotulo="Pontuação total" valor={`${stats.xp} XP`} />
      </div>

      <div className="mt-3 rounded-xl bg-line/60 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Meta diária</span>
          <span className="font-code text-textMuted">
            {feito}/{META_DIARIA} questões
          </span>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-[11px] text-textMuted">
          {feito >= META_DIARIA
            ? "Meta de hoje batida. Mandou bem!"
            : "Complete um nível por dia para bater a meta."}
        </p>
      </div>
    </div>
  );
}
