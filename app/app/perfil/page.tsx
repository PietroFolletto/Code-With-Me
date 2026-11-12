import AppShell from "@/components/AppShell";
import { carregarContexto } from "@/lib/contexto";
import { sincronizarPerfil } from "@/lib/perfil";

function Bloco({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl bg-line/60 px-3 py-3">
      <p className="text-[10px] leading-tight text-textMuted">{rotulo}</p>
      <p className="mt-1.5 font-display text-lg font-semibold leading-none">{valor}</p>
    </div>
  );
}

export default async function PerfilPage() {
  const { supabase, user, nome, linhas, stats } = await carregarContexto();

  await sincronizarPerfil(supabase, user, stats);

  const [seguidores, seguindo] = await Promise.all([
    supabase.from("seguindo").select("*", { count: "exact", head: true }).eq("seguido_id", user.id),
    supabase.from("seguindo").select("*", { count: "exact", head: true }).eq("seguidor_id", user.id),
  ]);

  return (
    <AppShell ativo="perfil" stats={stats} linhas={linhas}>
      <div className="flex flex-col items-center rounded-card border border-line bg-panel px-5 py-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-line font-display text-4xl font-semibold text-accent">
          {nome.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold">{nome}</h2>
        <p className="mt-1 text-sm text-textMuted">Nível {stats.nivelUsuario} · {stats.xp} XP</p>
      </div>

      <div className="rounded-card border border-line bg-panel p-5">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-textMuted">Nível do usuário</span>
            <span className="font-medium">Nível {stats.nivelUsuario}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-textMuted">Seguidores / seguindo</span>
            <span className="font-medium">
              {seguidores.count ?? 0} / {seguindo.count ?? 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-textMuted">Níveis concluídos</span>
            <span className="font-medium">{stats.concluidos}</span>
          </div>
        </div>

        <p className="mt-5 text-xs text-textMuted">Linguagens atuais</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-lg bg-line px-3 py-1.5 font-code text-xs">JavaScript</span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <Bloco rotulo="Precisão" valor={`${stats.precisao}%`} />
          <Bloco rotulo="Dias seguidos" valor={String(stats.sequencia)} />
          <Bloco rotulo="Dias totais" valor={String(stats.diasTotais)} />
        </div>
      </div>
    </AppShell>
  );
}
