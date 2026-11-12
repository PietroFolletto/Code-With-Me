export type Questao = {
  enunciado: string;
  codigo?: string;
  alternativas: string[];
  alternativasCodigo?: boolean;
  correta: number;
  explicacao: string;
};

export type Nivel = {
  id: number;
  titulo: string;
  descricao: string;
  questoes: Questao[];
};

export const ACERTOS_PARA_PASSAR = 4;
export const XP_POR_ACERTO = 10;

export const NIVEIS: Nivel[] = [
  {
    id: 1,
    titulo: "Variáveis e tipos",
    descricao: "Guardar informações e entender que tipo de dado é cada coisa.",
    questoes: [
      {
        enunciado: "Qual linha guarda o texto \"Ana\" em uma variável?",
        alternativas: [
          `let nome = "Ana";`,
          `let nome = Ana;`,
          `nome == "Ana";`,
          `"nome" = Ana;`,
        ],
        alternativasCodigo: true,
        correta: 0,
        explicacao:
          "Textos vão entre aspas, e o let cria a variável. Sem as aspas, o computador acharia que Ana é o nome de outra variável.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let idade = 20;
idade = idade + 1;
console.log(idade);`,
        alternativas: ["20", "21", "idade + 1", "Dá erro"],
        correta: 1,
        explicacao:
          "A variável começa valendo 20, depois recebe ela mesma mais 1. Por isso, no final, vale 21.",
      },
      {
        enunciado: "Qual tipo de dado guarda apenas verdadeiro ou falso?",
        alternativas: ["Texto (string)", "Número", "Booleano", "Lista"],
        correta: 2,
        explicacao:
          "O booleano só tem dois valores possíveis: true (verdadeiro) e false (falso). É muito usado em decisões.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let preco = "10";
let total = preco + 5;
console.log(total);`,
        alternativas: ["15", "105", "\"15\"", "Dá erro"],
        correta: 1,
        explicacao:
          "Como \"10\" está entre aspas, é texto. Somar texto com número junta os dois, como colar etiquetas: \"10\" e 5 viram \"105\".",
      },
      {
        enunciado: "Qual destes é um nome de variável válido?",
        alternativas: ["2nome", "meu-nome", "meuNome", "let"],
        correta: 2,
        explicacao:
          "Nome de variável não pode começar com número, nem ter hífen, nem usar palavras reservadas como let. O meuNome segue as regras.",
      },
      {
        enunciado: "Para que serve a palavra const?",
        alternativas: [
          "Para criar uma variável que não pode receber outro valor depois",
          "Para criar uma variável que só aceita números",
          "Para apagar uma variável",
          "Para repetir um código várias vezes",
        ],
        correta: 0,
        explicacao:
          "Const vem de constante: depois de definida, o valor não muda. Ótimo para coisas fixas, como o valor de um imposto.",
      },
    ],
  },
  {
    id: 2,
    titulo: "Condicionais",
    descricao: "Ensinar o programa a tomar decisões com if e else.",
    questoes: [
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let nota = 7;
if (nota >= 7) {
  console.log("Aprovado");
} else {
  console.log("Reprovado");
}`,
        alternativas: ["Aprovado", "Reprovado", "Nada", "Dá erro"],
        correta: 0,
        explicacao:
          "A nota é 7, e 7 é maior ou igual a 7. A condição é verdadeira, então entra no primeiro bloco.",
      },
      {
        enunciado: "Qual operador verifica se dois valores são iguais?",
        alternativas: ["=", "===", "=>", "!=="],
        alternativasCodigo: true,
        correta: 1,
        explicacao:
          "O === compara. Já o = sozinho serve para guardar um valor em uma variável, e é um erro muito comum confundir os dois.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let idade = 20;
let temDocumento = false;
if (idade >= 18 && temDocumento) {
  console.log("Pode entrar");
} else {
  console.log("Não pode entrar");
}`,
        alternativas: [
          "Pode entrar",
          "Não pode entrar",
          "Nada",
          "Dá erro",
        ],
        correta: 1,
        explicacao:
          "O && significa E: as duas condições precisam ser verdadeiras. A pessoa tem 18 anos ou mais, mas não tem documento, então não entra.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let dia = "sábado";
if (dia === "sábado" || dia === "domingo") {
  console.log("Fim de semana");
} else {
  console.log("Dia útil");
}`,
        alternativas: ["Dia útil", "Fim de semana", "Nada", "Dá erro"],
        correta: 1,
        explicacao:
          "O || significa OU: basta uma das condições ser verdadeira. O dia é sábado, então já vale.",
      },
      {
        enunciado:
          "Uma loja dá frete grátis para compras acima de R$ 100. Qual condição representa isso?",
        alternativas: [
          "total < 100",
          "total > 100",
          "total = 100",
          "total !== 100",
        ],
        alternativasCodigo: true,
        correta: 1,
        explicacao:
          "\"Acima de 100\" é maior que 100, ou seja, total > 100. Repare que quem gasta exatamente 100 não entra nessa regra.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let x = 5;
if (x > 10) {
  console.log("A");
} else if (x > 3) {
  console.log("B");
} else {
  console.log("C");
}`,
        alternativas: ["A", "B", "C", "A e B"],
        correta: 1,
        explicacao:
          "O programa testa de cima para baixo e para na primeira condição verdadeira. 5 não é maior que 10, mas é maior que 3, então mostra B.",
      },
    ],
  },
  {
    id: 3,
    titulo: "Repetição (laços)",
    descricao: "Fazer o computador repetir tarefas sem escrever tudo de novo.",
    questoes: [
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `for (let i = 0; i < 3; i++) {
  console.log(i);
}`,
        alternativas: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3, 2, 1"],
        correta: 1,
        explicacao:
          "O i começa em 0 e o laço continua enquanto i for menor que 3. Então mostra 0, 1 e 2, e para quando chega em 3.",
      },
      {
        enunciado: "Quantas vezes esse laço repete?",
        codigo: `for (let i = 1; i <= 5; i++) {
  console.log("oi");
}`,
        alternativas: ["4 vezes", "5 vezes", "6 vezes", "Infinitas vezes"],
        correta: 1,
        explicacao:
          "O i vai de 1 até 5, e o <= inclui o 5. Contando 1, 2, 3, 4 e 5, são 5 repetições.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let soma = 0;
for (let i = 1; i <= 4; i++) {
  soma = soma + i;
}
console.log(soma);`,
        alternativas: ["4", "6", "10", "24"],
        correta: 2,
        explicacao:
          "A soma vai acumulando: 1, depois 1+2=3, depois 3+3=6 e por fim 6+4=10.",
      },
      {
        enunciado:
          "Qual laço é mais indicado quando você não sabe quantas vezes vai repetir e quer parar quando uma condição mudar?",
        alternativas: ["while", "if", "const", "return"],
        alternativasCodigo: true,
        correta: 0,
        explicacao:
          "O while repete enquanto a condição for verdadeira. É ótimo para situações como \"continue pedindo a senha até acertar\".",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let n = 3;
while (n > 0) {
  console.log(n);
  n--;
}`,
        alternativas: ["1, 2, 3", "3, 2, 1", "3, 2, 1, 0", "0"],
        correta: 1,
        explicacao:
          "O n-- diminui o n em 1 a cada volta. Mostra 3, 2 e 1, e quando o n chega a 0 a condição deixa de valer.",
      },
      {
        enunciado: "O que acontece com esse código?",
        codigo: `let contador = 0;
while (contador < 3) {
  console.log("oi");
}`,
        alternativas: [
          "Mostra oi 3 vezes",
          "Mostra oi uma vez",
          "Repete para sempre (laço infinito)",
          "Não mostra nada",
        ],
        correta: 2,
        explicacao:
          "O contador nunca aumenta, então a condição contador < 3 é sempre verdadeira. Esquecer de atualizar a variável é uma causa clássica de laço infinito.",
      },
    ],
  },
  {
    id: 4,
    titulo: "Listas e funções",
    descricao: "Guardar vários itens juntos e criar blocos de código reutilizáveis.",
    questoes: [
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let frutas = ["maçã", "uva", "pera"];
console.log(frutas[1]);`,
        alternativas: ["maçã", "uva", "pera", "undefined"],
        correta: 1,
        explicacao:
          "Em programação, a contagem das posições começa do 0. Então frutas[0] é maçã, e frutas[1] é uva.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let cores = ["azul", "verde", "rosa", "preto"];
console.log(cores.length);`,
        alternativas: ["3", "4", "5", "preto"],
        correta: 1,
        explicacao:
          "O length diz quantos itens a lista tem. São 4 cores, mesmo que a última posição seja a de número 3.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let nums = [1, 2];
nums.push(3);
console.log(nums);`,
        alternativas: ["[1, 2]", "[3, 1, 2]", "[1, 2, 3]", "3"],
        correta: 2,
        explicacao:
          "O push coloca um novo item no final da lista. Por isso o 3 entra depois do 2.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `function dobro(x) {
  return x * 2;
}
console.log(dobro(4));`,
        alternativas: ["2", "4", "6", "8"],
        correta: 3,
        explicacao:
          "A função recebe 4, multiplica por 2 e devolve 8. Funções são como receitas: você entrega os ingredientes e recebe o resultado.",
      },
      {
        enunciado: "Para que serve o return dentro de uma função?",
        alternativas: [
          "Para devolver um valor e encerrar a função",
          "Para repetir a função",
          "Para criar uma variável nova",
          "Para apagar a função",
        ],
        correta: 0,
        explicacao:
          "O return entrega o resultado para quem chamou a função e termina a execução dela ali.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `function saudacao(nome) {
  return "Oi, " + nome;
}
console.log(saudacao("Léo"));`,
        alternativas: ["Oi, nome", "Oi, Léo", "saudacao", "Léo"],
        correta: 1,
        explicacao:
          "Ao chamar saudacao(\"Léo\"), o parâmetro nome passa a valer \"Léo\", e o texto junta tudo: Oi, Léo.",
      },
    ],
  },
  {
    id: 5,
    titulo: "Problemas do dia a dia",
    descricao: "Situações parecidas com as de uma empresa, com mais de um caminho possível.",
    questoes: [
      {
        enunciado:
          "Uma loja dá 10% de desconto em compras acima de R$ 200. Qual código calcula o total final corretamente?",
        alternativas: [
          `if (total > 200) { total = total * 0.9; }`,
          `if (total > 200) { total = total * 0.1; }`,
          `if (total < 200) { total = total * 0.9; }`,
          `total = total - 0.1;`,
        ],
        alternativasCodigo: true,
        correta: 0,
        explicacao:
          "Dar 10% de desconto é pagar 90% do valor, ou seja, multiplicar por 0.9. Multiplicar por 0.1 deixaria o cliente pagando só 10%.",
      },
      {
        enunciado:
          "Uma empresa exige senhas com pelo menos 8 caracteres. Qual condição valida isso?",
        alternativas: [
          "senha.length >= 8",
          "senha.length > 8",
          "senha.length <= 8",
          "senha === 8",
        ],
        alternativasCodigo: true,
        correta: 0,
        explicacao:
          "\"Pelo menos 8\" inclui o 8. Com > 8, uma senha de exatamente 8 caracteres seria recusada por engano.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let pedidos = [30, 150, 80, 200];
let grandes = 0;
for (let i = 0; i < pedidos.length; i++) {
  if (pedidos[i] > 100) {
    grandes++;
  }
}
console.log(grandes);`,
        alternativas: ["1", "2", "3", "4"],
        correta: 1,
        explicacao:
          "Só dois pedidos passam de 100: o de 150 e o de 200. O código percorre a lista e conta quantos atendem à regra.",
      },
      {
        enunciado: "O que esse código mostra na tela?",
        codigo: `let notas = [8, 6, 10];
let soma = 0;
for (let i = 0; i < notas.length; i++) {
  soma += notas[i];
}
console.log(soma / notas.length);`,
        alternativas: ["6", "8", "10", "24"],
        correta: 1,
        explicacao:
          "A soma das notas é 24, e dividindo pela quantidade de notas (3) a média é 8.",
      },
      {
        enunciado:
          "Um colega escreveu if (idade = 18) para testar a maioridade, e o sistema sempre aprova. Qual é o erro?",
        alternativas: [
          "Usou = (guardar valor) no lugar de comparar com === ou >=",
          "A variável idade não pode ter esse nome",
          "O if não aceita números",
          "Faltou o else",
        ],
        correta: 0,
        explicacao:
          "O = guarda o valor 18 na variável, e 18 conta como verdadeiro, então a condição passa sempre. Para comparar, o certo é === ou >=.",
      },
      {
        enunciado:
          "Existem várias formas de resolver o mesmo problema. Qual destas NÃO resolve \"somar todos os valores de uma lista\"?",
        alternativas: [
          "Usar um for acumulando os valores em uma variável",
          "Usar um while percorrendo as posições da lista",
          "Usar lista.reduce((a, b) => a + b, 0)",
          "Usar lista.length",
        ],
        correta: 3,
        explicacao:
          "O length só informa quantos itens a lista tem, não a soma deles. As outras três são caminhos diferentes para chegar ao mesmo resultado.",
      },
    ],
  },
];

export function getNivel(id: number): Nivel | undefined {
  return NIVEIS.find((n) => n.id === id);
}
