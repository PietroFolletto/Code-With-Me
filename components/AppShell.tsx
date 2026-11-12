import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import Mascote from "@/components/Mascote";
import TrilhaMapa from "@/components/TrilhaMapa";
import {
  IconeTrilha,
  IconePerfil,
  IconeTrofeu,
  IconeSocial,
  IconeConfig,
} from "@/components/Icones";
import type { LinhaProgresso, Stats } from "@/lib/estatisticas";

export type Ativo = "home" | "perfil" | "conquistas" | "social" | "config";

const NAV = [
  { id: "perfil", rotulo: "Perfil", href: "/app/perfil", Icone: IconePerfil },
  { id: "conquistas", rotulo: "Conquistas", href: "/app/conquistas", Icone: IconeTrofeu },
  { id: "social", rotulo: "Social", href: "/app/social", Icone: IconeSocial },
  { id: "config", rotulo: "Configuração", href: "/app/config", Icone: IconeConfig },
] as const;

const NAV_MOBILE = [
  { id: "home", rotulo: "Trilha", href: "/app", Icone: IconeTrilha },
  ...NAV,
] as const;

function Chips({ nivel }: { nivel: number }) {
  return (
    <div className="flex gap-3">
      <div className="rounded-xl border border-line bg-panel px-4 py-2.5">
        <p className="text-[10px] text-textMuted">Linguagem</p>
        <p className="font-display text-sm font-semibold">JavaScript</p>
      </div>
      <div className="flex-1 rounded-xl border border-line bg-panel px-4 py-2.5">
        <p className="text-[10px] text-textMuted">Nível do usuário</p>
        <p className="font-display text-sm font-semibold">Nível {nivel}</p>
      </div>
    </div>
  );
}

export default function AppShell({
  ativo,
  stats,
  linhas,
  children,
}: {
  ativo: Ativo;
  stats: Stats;
  linhas: LinhaProgresso[];
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-textPrimary lg:grid lg:grid-cols-[230px_minmax(0,1fr)_390px]">
      <aside className="hidden flex-col justify-between border-r border-line px-5 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div>
          <Link href="/app" className="focus-ring inline-block rounded-md">
            <Logo />
          </Link>
          <nav className="mt-10 flex flex-col gap-3">
            {NAV.map(({ id, rotulo, href, Icone }) => (
              <Link
                key={id}
                href={href}
                aria-current={ativo === id ? "page" : undefined}
                className={`focus-ring flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                  ativo === id
                    ? "border-2 border-accent bg-panel text-textPrimary"
                    : "border border-line bg-panel/60 text-textMuted hover:text-textPrimary"
                }`}
              >
                <Icone />
                {rotulo}
              </Link>
            ))}
          </nav>
        </div>
        <Mascote className="mx-auto w-28" />
      </aside>

      <header className="flex items-center justify-between px-5 py-4 lg:hidden">
        <Link href="/app" className="focus-ring rounded-md">
          <Logo />
        </Link>
      </header>

      <section className="order-3 pb-28 lg:order-none lg:pb-12">
        <TrilhaMapa linhas={linhas} />
      </section>

      <aside className="order-2 border-line px-5 py-2 lg:sticky lg:top-0 lg:order-none lg:h-screen lg:overflow-y-auto lg:border-l lg:px-6 lg:py-6">
        <Chips nivel={stats.nivelUsuario} />
        <div className="mt-4 flex flex-col gap-4">{children}</div>
      </aside>

      <nav
        aria-label="Menu principal"
        className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-line bg-ink/95 px-2 py-2 backdrop-blur lg:hidden"
      >
        {NAV_MOBILE.map(({ id, rotulo, href, Icone }) => (
          <Link
            key={id}
            href={href}
            aria-current={ativo === id ? "page" : undefined}
            className={`focus-ring flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] ${
              ativo === id ? "text-accent" : "text-textMuted"
            }`}
          >
            <Icone />
            {rotulo}
          </Link>
        ))}
      </nav>
    </div>
  );
}
