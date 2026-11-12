import Link from "next/link";
import { NIVEIS } from "@/lib/trilha";
import type { LinhaProgresso } from "@/lib/estatisticas";
import Mascote from "@/components/Mascote";

const LARGURA = 340;
const CENTRO = 170;
const AMPLITUDE = 88;
const PASSO = 56;
const EXTRA = 30;
const TOPO = 50;

type Ponto = { x: number; y: number; nivelId: number; j: number; grande: boolean };

function gerarPontos(): Ponto[] {
  const pontos: Ponto[] = [];
  let y = TOPO;
  let k = 0;
  for (const nivel of NIVEIS) {
    const n = nivel.questoes.length;
    for (let j = 0; j < n; j++) {
      const grande = j === n - 1;
      const x = CENTRO + AMPLITUDE * Math.sin(k * 0.55);
      pontos.push({ x, y, nivelId: nivel.id, j, grande });
      y += grande ? PASSO + EXTRA : PASSO;
      k++;
    }
  }
  return pontos;
}

function curva(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  const f = (n: number) => n.toFixed(1);
  let d = `M ${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${f(pts[i].x)} ${f(pts[i].y)} ${f(mx)} ${f(my)}`;
  }
  const u = pts[pts.length - 1];
  d += ` L ${f(u.x)} ${f(u.y)}`;
  return d;
}

function IconeCheck() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#121126" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconeCadeado() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="#A9A6C4" strokeWidth="2" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="#A9A6C4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function TrilhaMapa({ linhas }: { linhas: LinhaProgresso[] }) {
  const porNivel = new Map(linhas.map((l) => [l.nivel_id, l]));
  const liberado = (id: number) => id === 1 || Boolean(porNivel.get(id - 1)?.concluido);
  const atualId =
    NIVEIS.find((n) => liberado(n.id) && !porNivel.get(n.id)?.concluido)?.id ?? null;

  const pontos = gerarPontos();
  const altura = pontos[pontos.length - 1].y + 70;

  const preenchido = (p: Ponto) => {
    const l = porNivel.get(p.nivelId);
    return Boolean(l?.concluido) || p.j < (l?.acertos ?? 0);
  };

  let ultimo = -1;
  pontos.forEach((p, i) => {
    if (preenchido(p)) ultimo = i;
  });

  return (
    <div className="px-2 pb-10 pt-6">
      <div className="mx-auto mb-4 flex" style={{ width: LARGURA }}>
        <div className="ml-auto rounded-card border-2 border-line bg-line/40 px-5 py-3 text-center">
          <p className="font-display text-sm font-semibold">Mini game</p>
          <p className="text-[11px] text-textMuted">em breve</p>
        </div>
      </div>

      <div className="relative mx-auto" style={{ width: LARGURA, height: altura }}>
        <svg
          className="absolute inset-0"
          width={LARGURA}
          height={altura}
          viewBox={`0 0 ${LARGURA} ${altura}`}
          fill="none"
          aria-hidden="true"
        >
          <path d={curva(pontos)} stroke="#302559" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" />
          {ultimo >= 1 && (
            <path d={curva(pontos.slice(0, ultimo + 1))} stroke="#30BF62" strokeWidth="4" strokeLinecap="round" />
          )}
        </svg>

        {pontos.map((p, i) => {
          if (!p.grande) {
            return (
              <span
                key={i}
                aria-hidden="true"
                className={`absolute h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  preenchido(p) ? "bg-accent" : "bg-line"
                }`}
                style={{ left: p.x, top: p.y }}
              />
            );
          }

          const nivel = NIVEIS.find((n) => n.id === p.nivelId)!;
          const l = porNivel.get(p.nivelId);
          const concluido = Boolean(l?.concluido);
          const livre = liberado(p.nivelId);
          const atual = p.nivelId === atualId;
          const noDireita = p.x < CENTRO;

          const no = (
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full ${
                concluido
                  ? "bg-accent"
                  : atual
                  ? "border-4 border-accent bg-ink shadow-[0_0_0_6px_rgba(48,191,98,0.18)]"
                  : "border border-line bg-panel"
              }`}
            >
              {concluido ? (
                <IconeCheck />
              ) : livre ? (
                <span className="font-display text-xl font-semibold text-accent">{nivel.id}</span>
              ) : (
                <IconeCadeado />
              )}
            </span>
          );

          return (
            <div key={i}>
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.x, top: p.y }}
              >
                {livre ? (
                  <Link
                    href={`/app/nivel/${nivel.id}`}
                    aria-label={`Abrir nível ${nivel.id}: ${nivel.titulo}`}
                    className="focus-ring block rounded-full"
                  >
                    {no}
                  </Link>
                ) : (
                  no
                )}
              </div>

              <div
                className={`absolute w-[118px] -translate-y-1/2 ${noDireita ? "text-left" : "text-right"} ${
                  livre ? "" : "opacity-60"
                }`}
                style={
                  noDireita
                    ? { top: p.y, left: p.x + 44 }
                    : { top: p.y, right: LARGURA - p.x + 44 }
                }
              >
                <p className="font-code text-[10px] text-textMuted">nível {nivel.id}</p>
                <p className="font-display text-[13px] font-semibold leading-tight">{nivel.titulo}</p>
                {atual && <p className="mt-1 text-[11px] font-medium text-accent">você está aqui</p>}
              </div>
            </div>
          );
        })}
      </div>

      <Mascote className="mx-auto mt-4 w-24 lg:hidden" />
    </div>
  );
}
