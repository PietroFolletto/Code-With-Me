import type { LinhaProgresso, Stats } from "@/lib/estatisticas";

export type Conquista = {
  id: string;
  titulo: string;
  descricao: string;
  atual: number;
  meta: number;
};

export function avaliarConquistas(stats: Stats, linhas: LinhaProgresso[]): Conquista[] {
  const nivelOk = (id: number) => (linhas.find((l) => l.nivel_id === id)?.concluido ? 1 : 0);
  const perfeito = linhas.some((l) => l.total > 0 && l.acertos === l.total) ? 1 : 0;

  return [
    {
      id: "primeiros-passos",
      titulo: "Primeiros passos",
      descricao: "Resolva sua primeira questão.",
      atual: Math.min(stats.questoesResolvidas, 1),
      meta: 1,
    },
    {
      id: "variaveis",
      titulo: "Dono das variáveis",
      descricao: "Conclua o nível Variáveis e tipos.",
      atual: nivelOk(1),
      meta: 1,
    },
    {
      id: "decisoes",
      titulo: "Tomador de decisões",
      descricao: "Conclua o nível Condicionais.",
      atual: nivelOk(2),
      meta: 1,
    },
    {
      id: "loops",
      titulo: "Mestre dos loops",
      descricao: "Conclua o nível Repetição (laços).",
      atual: nivelOk(3),
      meta: 1,
    },
    {
      id: "funcoes",
      titulo: "Função em ação",
      descricao: "Conclua o nível Listas e funções.",
      atual: nivelOk(4),
      meta: 1,
    },
    {
      id: "resolvedor",
      titulo: "Resolvedor de problemas",
      descricao: "Conclua o nível Problemas do dia a dia.",
      atual: nivelOk(5),
      meta: 1,
    },
    {
      id: "nota-maxima",
      titulo: "Nota máxima",
      descricao: "Acerte todas as perguntas de um nível.",
      atual: perfeito,
      meta: 1,
    },
    {
      id: "constancia",
      titulo: "Constância",
      descricao: "Estude 3 dias seguidos.",
      atual: Math.min(stats.sequencia, 3),
      meta: 3,
    },
    {
      id: "maratonista",
      titulo: "Maratonista",
      descricao: "Resolva 30 questões.",
      atual: Math.min(stats.questoesResolvidas, 30),
      meta: 30,
    },
  ];
}
