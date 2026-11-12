import { XP_POR_ACERTO } from "@/lib/trilha";

export type LinhaProgresso = {
  nivel_id: number;
  acertos: number;
  total: number;
  concluido: boolean;
};

export type LinhaAtividade = {
  dia: string;
  questoes: number;
  acertos: number;
};

export const META_DIARIA = 6;

export type Stats = {
  xp: number;
  nivelUsuario: number;
  concluidos: number;
  questoesResolvidas: number;
  acertosTotais: number;
  precisao: number;
  sequencia: number;
  diasTotais: number;
  hojeQuestoes: number;
};

// Data de hoje no horário de Brasília, no formato AAAA-MM-DD.
export function diaBR(data: Date = new Date()): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(data);
  const pega = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  return `${pega("year")}-${pega("month")}-${pega("day")}`;
}

function diaParaNumero(dia: string): number {
  const [a, m, d] = dia.split("-").map(Number);
  return Date.UTC(a, m - 1, d) / 86400000;
}

function numeroParaDia(n: number): string {
  return new Date(n * 86400000).toISOString().slice(0, 10);
}

export function calcularStats(
  linhas: LinhaProgresso[],
  atividades: LinhaAtividade[]
): Stats {
  const xp = linhas.reduce((s, l) => s + l.acertos * XP_POR_ACERTO, 0);
  const concluidos = linhas.filter((l) => l.concluido).length;

  const questoesResolvidas = atividades.reduce((s, a) => s + a.questoes, 0);
  const acertosTotais = atividades.reduce((s, a) => s + a.acertos, 0);
  const precisao =
    questoesResolvidas > 0 ? Math.round((acertosTotais / questoesResolvidas) * 100) : 0;

  const dias = new Set(atividades.filter((a) => a.questoes > 0).map((a) => a.dia));
  const hoje = diaBR();

  let sequencia = 0;
  let cursor = diaParaNumero(hoje);
  if (!dias.has(hoje)) cursor -= 1;
  while (dias.has(numeroParaDia(cursor))) {
    sequencia++;
    cursor -= 1;
  }

  const hojeQuestoes = atividades.find((a) => a.dia === hoje)?.questoes ?? 0;

  return {
    xp,
    nivelUsuario: 1 + Math.floor(xp / 50),
    concluidos,
    questoesResolvidas,
    acertosTotais,
    precisao,
    sequencia,
    diasTotais: dias.size,
    hojeQuestoes,
  };
}
