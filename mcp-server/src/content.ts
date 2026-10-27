// Carregador do conteúdo jurídico empacotado (referências, templates, checklists,
// playbooks, SKILL.md). O conteúdo é copiado para `content/` por scripts/bundle-content.mjs
// e incluído no pacote npm, tornando o servidor autossuficiente.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
// dist/content.js -> ../content
export const CONTENT_DIR = resolve(here, "..", "content");

export type Categoria = "references" | "templates" | "checklists" | "playbooks" | "modelos" | "redacao";

export const CATEGORIAS: Categoria[] = [
  "references",
  "templates",
  "checklists",
  "playbooks",
  "modelos",
  "redacao",
];

const LABEL: Record<Categoria, string> = {
  references: "Referência",
  templates: "Template",
  checklists: "Checklist",
  playbooks: "Playbook",
  modelos: "Modelo conferido",
  redacao: "Guia de redação",
};

function dir(cat: Categoria): string {
  return join(CONTENT_DIR, cat);
}

/** Lista os nomes (sem extensão .md) de uma categoria, ordenados, excluindo READMEs de índice. */
export function listar(cat: Categoria): string[] {
  const d = dir(cat);
  if (!existsSync(d)) return [];
  return readdirSync(d)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((f) => f.slice(0, -3))
    .sort();
}

// Nomes de conteúdo: só letras, algarismos e hífens (sem pontos nem separadores — nada sai de content/).
const NOME_CONTEUDO = /^[a-z0-9][a-z0-9-]{0,80}$/i;

/** Indica se `cat`/`nome` são uma categoria conhecida e um nome válido (lista fechada). */
export function itemValido(cat: string, nome: string): cat is Categoria {
  return (CATEGORIAS as string[]).includes(cat) && NOME_CONTEUDO.test(String(nome ?? "").replace(/\.md$/i, ""));
}

/** Lê o markdown de um item; devolve null se a categoria, o nome ou o ficheiro não existirem. */
export function ler(cat: Categoria, nome: string): string | null {
  // Aceita com ou sem .md; recusa categorias desconhecidas e nomes com "..", "/" ou "\".
  const limpo = String(nome ?? "").trim().replace(/\.md$/i, "");
  if (!itemValido(cat, limpo)) return null;
  const caminho = join(dir(cat), `${limpo}.md`);
  if (!existsSync(caminho)) return null;
  return readFileSync(caminho, "utf8");
}

/** Lê o SKILL.md (persona/fluxo). */
export function lerSkill(): string {
  const caminho = join(CONTENT_DIR, "SKILL.md");
  return existsSync(caminho) ? readFileSync(caminho, "utf8") : "";
}

export type Ambito = "nacional" | "ue" | "misto";

export interface ResultadoProcura {
  categoria: Categoria;
  nome: string;
  linhas: string[];
  ambito?: Ambito | null;
}

/** Procura case-insensitive por todo o conteúdo; devolve até `maxFicheiros` ficheiros com trechos. */
export function procurar(query: string, maxFicheiros = 12): ResultadoProcura[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const out: ResultadoProcura[] = [];
  for (const cat of CATEGORIAS) {
    for (const nome of listar(cat)) {
      const texto = ler(cat, nome);
      if (!texto) continue;
      if (!texto.toLowerCase().includes(q)) continue;
      const linhas = texto
        .split("\n")
        .filter((l) => l.toLowerCase().includes(q))
        .slice(0, 3)
        .map((l) => l.trim());
      out.push({ categoria: cat, nome, linhas, ambito: lerAmbito(texto) });
      if (out.length >= maxFicheiros) return out;
    }
  }
  return out;
}

/** Lista todos os itens de conteúdo (para resources). */
export function listarTudo(): Array<{ categoria: Categoria; nome: string; label: string }> {
  const out: Array<{ categoria: Categoria; nome: string; label: string }> = [];
  for (const cat of CATEGORIAS) {
    for (const nome of listar(cat)) {
      out.push({ categoria: cat, nome, label: LABEL[cat] });
    }
  }
  return out;
}

// --- Âmbito (nacional / ue / misto) e pesquisa agrupada ---

const RE_AMBITO = /Âmbito:\**\s*(nacional|ue|misto)\b/i;
const NL = "\n";

/** Lê o âmbito declarado numa linha `Âmbito:` nas primeiras 15 linhas; null se não houver. */
export function lerAmbito(texto: string): Ambito | null {
  const topo = texto.split(NL).slice(0, 15).join(NL);
  const m = RE_AMBITO.exec(topo);
  return m ? (m[1].toLowerCase() as Ambito) : null;
}

/** Lista os itens de uma categoria com o respetivo âmbito. */
export function listarComAmbito(cat: Categoria): Array<{ nome: string; ambito: Ambito | null }> {
  return listar(cat).map((nome) => ({ nome, ambito: lerAmbito(ler(cat, nome) ?? "") }));
}

const TITULO_GRUPO: Record<Categoria, string> = {
  references: "Referências",
  templates: "Templates",
  playbooks: "Playbooks",
  checklists: "Checklists",
  modelos: "Modelos conferidos",
  redacao: "Guias de redação",
};
const ORDEM_GRUPOS: Categoria[] = ["references", "modelos", "templates", "playbooks", "checklists", "redacao"];

/** Formata resultados de `procurar` agrupados por tipo, com o âmbito de cada item. */
export function formatarProcura(res: ResultadoProcura[]): string {
  const blocos: string[] = [];
  for (const cat of ORDEM_GRUPOS) {
    const itens = res.filter((r) => r.categoria === cat);
    if (itens.length === 0) continue;
    const linhas = itens.map(
      (r) => `• ${r.nome}${r.ambito ? ` (${r.ambito})` : ""}${NL}   ${r.linhas.join(NL + "   ")}`
    );
    blocos.push(`## ${TITULO_GRUPO[cat]}${NL}${linhas.join(NL)}`);
  }
  return blocos.join(NL + NL);
}

// --- Modelos conferidos (assets/modelos/): leitura por secções e templates substituídos ---

/** Templates da v2.x substituídos por um modelo conferido na 3.0 (o nome antigo continua a funcionar). */
export const SUBSTITUIDOS: Readonly<Record<string, string>> = {
  "reconhecimento-divida": "confissao-de-divida-e-acordo-de-pagamento",
  "contrato-arrendamento-habitacional": "contrato-de-arrendamento-habitacional",
  "acordo-revogacao": "acordo-de-revogacao-do-contrato-de-trabalho",
  "nota-de-culpa": "processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento",
  "carta-despedimento-justa-causa": "processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento",
  "carta-interpelacao-incumprimento": "interpelacao-e-notificacao-extrajudicial",
  "reclamacao-creditos-insolvencia": "reclamacao-de-creditos-na-insolvencia",
};

/** Secções devolvidas por defeito: quando usar, perguntas, variantes e nota de entrega. */
export const SECOES_POR_DEFEITO = [1, 2, 3, 7];

const NOMES_SECOES: Record<number, string> = {
  1: "quando usar",
  2: "perguntas",
  3: "variantes",
  4: "texto do documento",
  5: "fundamentação permitida",
  6: "armadilhas e verificações",
  7: "nota de entrega",
  8: "trecho de tom",
};

function secoesDe(texto: string): { cabecalho: string; secoes: Map<number, string> } {
  const partes = texto.replace(/\r\n?/g, NL).split(/^(?=## \d+\. )/m);
  const secoes = new Map<number, string>();
  let cabecalho = "";
  for (const p of partes) {
    const m = /^## (\d+)\. /.exec(p);
    if (m) secoes.set(Number(m[1]), p.trimEnd());
    else cabecalho += p;
  }
  return { cabecalho: cabecalho.trimEnd(), secoes };
}

/**
 * Lê um modelo só com as secções pedidas (1–8). Cada modelo tem ~100 KB: inteiro passaria o limite
 * de saída das tools MCP. Devolve null se o modelo não existir; lança se uma secção estiver fora de 1–8.
 */
export function lerModeloSecoes(nome: string, secoes: number[] = SECOES_POR_DEFEITO): string | null {
  const fora = secoes.filter((n) => !Number.isInteger(n) || n < 1 || n > 8);
  if (fora.length) throw new Error(`Secção inválida (${fora.join(", ")}): as secções vão de 1 a 8.`);
  const t = ler("modelos", nome);
  if (t === null) return null;
  const { cabecalho, secoes: todas } = secoesDe(t);
  const pedidas = [...new Set(secoes)].sort((a, b) => a - b);
  const resto = [...todas.keys()].filter((n) => !pedidas.includes(n));
  const nota = resto.length
    ? `${NL}${NL}---${NL}Secções não incluídas: ${resto.map((n) => `${n} (${NOMES_SECOES[n] ?? "?"})`).join(", ")}. ` +
      "Para redigir: obter_modelo com secoes [4, 5]; para verificar: [6]."
    : "";
  return [cabecalho, ...pedidas.map((n) => todas.get(n)).filter((x): x is string => !!x)].join(NL + NL) + nota;
}

export interface InfoModelo {
  nome: string;
  titulo: string;
  quandoUsar: string;
  entregavel: string;
  ambito: Ambito | null;
}

/** Título (H1), primeira frase de "Quando usar", entregável e âmbito de um modelo. */
export function infoModelo(nome: string): InfoModelo | null {
  const t = ler("modelos", nome);
  if (t === null) return null;
  const titulo = (/^#\s+(.+)$/m.exec(t)?.[1] ?? nome).trim();
  const entregavel = (/entregável:\s*([a-z+]+)/i.exec(t)?.[1] ?? "docx").toLowerCase();
  const s1 = secoesDe(t).secoes.get(1) ?? "";
  const corpo1 = s1.split(NL).slice(1).join(" ").replace(/\s+/g, " ").trim();
  const frase = (/^(.+?[.;:])(\s|$)/.exec(corpo1)?.[1] ?? corpo1).trim();
  const quandoUsar = frase.length > 140 ? frase.slice(0, 139).replace(/\s+\S*$/, "") + "…" : frase;
  return { nome, titulo, quandoUsar, entregavel, ambito: lerAmbito(t) };
}
