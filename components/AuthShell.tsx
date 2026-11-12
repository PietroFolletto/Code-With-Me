import { ReactNode } from "react";
import Logo from "@/components/Logo";

function TrailIllustration() {
  return (
    <svg
      viewBox="0 0 360 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[300px]"
      aria-hidden="true"
    >
      <path
        d="M60 480C60 480 40 400 100 380C160 360 180 300 130 260C80 220 100 160 160 140C220 120 200 60 260 40"
        stroke="#302559"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <path
        d="M60 480C60 480 40 400 100 380C160 360 180 300 130 260"
        stroke="#30BF62"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="60" cy="480" r="9" fill="#30BF62" />
      <circle cx="100" cy="380" r="7" fill="#30BF62" />
      <circle cx="130" cy="260" r="9" fill="#30BF62" stroke="#121126" strokeWidth="4" />
      <circle cx="130" cy="260" r="15" stroke="#30BF62" strokeWidth="1.5" opacity="0.5" />
      <circle cx="160" cy="140" r="6" fill="#302559" />
      <circle cx="260" cy="40" r="6" fill="#302559" />

      <g transform="translate(178 190)" fontFamily="var(--font-code)">
        <rect x="0" y="0" width="150" height="66" rx="10" fill="#1D1840" stroke="#302559" />
        <text x="16" y="26" fill="#A9A6C4" fontSize="11">
          function solve() {"{"}
        </text>
        <text x="28" y="42" fill="#30BF62" fontSize="11">
          return next;
        </text>
        <text x="16" y="58" fill="#A9A6C4" fontSize="11">
          {"}"}
        </text>
      </g>
    </svg>
  );
}

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      <section className="hidden lg:flex flex-col justify-between bg-ink px-14 py-12 relative overflow-hidden">
        <div>
          <Logo />
        </div>

        <div className="flex flex-col items-start gap-8">
          <TrailIllustration />
          <div className="max-w-xs">
            <p className="font-display text-2xl leading-snug text-textPrimary">
              Cada problema resolvido é um passo na trilha.
            </p>
            <p className="text-textMuted text-sm mt-3 leading-relaxed">
              Exercícios práticos, gerados continuamente, pensados pra quem
              quer treinar lógica de verdade — não só decorar sintaxe.
            </p>
          </div>
        </div>

        <p className="text-textMuted text-xs">
          Feito por quem sentiu falta disso na faculdade.
        </p>
      </section>

      <section className="flex items-center justify-center bg-panelLight px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <p className="font-code text-xs text-accentDim mb-2">{eyebrow}</p>
            <h1 className="font-display text-3xl text-textOnLight font-semibold leading-tight">
              {title}
            </h1>
            <p className="text-[#4A4766] text-sm mt-2">{subtitle}</p>
          </div>

          {children}

          <div className="mt-6 text-sm text-[#4A4766]">{footer}</div>
        </div>
      </section>
    </main>
  );
}
