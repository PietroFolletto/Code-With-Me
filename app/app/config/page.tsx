import AppShell from "@/components/AppShell";
import SairButton from "@/components/SairButton";
import { carregarContexto } from "@/lib/contexto";

export default async function ConfigPage() {
  const { user, nome, linhas, stats } = await carregarContexto();

  return (
    <AppShell ativo="config" stats={stats} linhas={linhas}>
      <div className="rounded-card border border-line bg-panel p-5">
        <h2 className="font-display text-xl font-semibold">Configuração</h2>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-textMuted">Nome</span>
            <span className="font-medium">{nome}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-textMuted">E-mail</span>
            <span className="min-w-0 truncate font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-textMuted">Linguagem atual</span>
            <span className="font-medium">JavaScript</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <p className="text-xs text-textMuted">Encerrar a sessão neste aparelho.</p>
          <SairButton />
        </div>
      </div>

      <p className="px-1 text-xs leading-relaxed text-textMuted">
        Mais opções, como trocar de linguagem e editar o perfil, chegam nas próximas versões.
      </p>
    </AppShell>
  );
}
