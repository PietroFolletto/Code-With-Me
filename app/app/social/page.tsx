import AppShell from "@/components/AppShell";
import { carregarContexto } from "@/lib/contexto";

export default async function SocialPage() {
  const { linhas, stats } = await carregarContexto();

  return (
    <AppShell ativo="social" stats={stats} linhas={linhas}>
      <div className="rounded-card border border-line bg-panel p-6 text-center">
        <h2 className="font-display text-2xl font-semibold">Menu social</h2>
        <p className="mt-1 text-sm text-textMuted">Conecte-se, compare e conquiste junto!</p>
        <p className="mt-6 font-code text-xs text-accent">em breve</p>
        <p className="mt-2 text-sm leading-relaxed text-textMuted">
          Em breve você vai poder buscar amigos, seguir outros alunos e comparar sua posição no ranking.
        </p>
      </div>
    </AppShell>
  );
}
