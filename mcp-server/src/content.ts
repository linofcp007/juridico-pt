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

// --- Fichas do catálogo (assets/fichas/): pesquisa PT/EN e leitura com o cabeçalho da casa ---

interface EstadoCitacoes {
  conferidas: number;
  corrigidas: number;
  por_conferir: number;
}

export interface EntradaFicha {
  codigo: string;
  area: string;
  pasta: string;
  titulo: string;
  titulo_en: string;
  descricao: string;
  descricao_en: string;
  ficheiro: string | null;
  estado: EstadoCitacoes;
  relacao?: "mesmo-documento" | "complementa";
  remete_para?: string;
  revisao_tecnica?: { data: string; veredicto: "ok" | "corrigida" | "rever de raiz" };
}

interface IndiceFichas {
  total_catalogo: number;
  areas: Array<{ sigla: string; nome: string; pasta: string; total: number; importadas: number }>;
  fichas: EntradaFicha[];
}

interface Pesquisavel {
  e: EntradaFicha;
  titulo: Set<string>;
  descricao: Set<string>;
  tituloPlano: string;
}

const DIR_FICHAS = join(CONTENT_DIR, "fichas");
export const SEM_CATALOGO =
  "O catálogo de fichas não está instalado nesta versão do servidor (falta content/fichas/indice.json). " +
  "Usa os modelos conferidos (listar_modelos) e os templates (listar_templates).";

let cacheFichas: { indice: IndiceFichas; itens: Pesquisavel[]; idf: Map<string, number> } | null | undefined;

const PARAGENS = new Set([
  "de", "da", "do", "das", "dos", "e", "a", "o", "as", "os", "em", "no", "na", "nos", "nas", "um", "uma", "ao", "aos",
  "para", "por", "com", "sem", "sobre", "contra", "pelo", "pela", "que", "of", "the", "an", "and", "for", "to", "in",
  "on", "by", "with", "under", "against", "or", "ou",
]);

const plano = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Palavras reduzidas a 5 letras (PT e EN partilham muitas raízes: "parentais"/"parental", "divórcio"/"divorce"). */
function raizes(s: string): string[] {
  return plano(s)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !PARAGENS.has(w))
    .map((w) => w.slice(0, 5));
}

/** Índice das fichas, lido uma vez por sessão do servidor; null se o catálogo não vier no pacote. */
function catalogo(): NonNullable<typeof cacheFichas> | null {
  if (cacheFichas !== undefined) return cacheFichas;
  const caminho = join(DIR_FICHAS, "indice.json");
  if (!existsSync(caminho)) return (cacheFichas = null);
  const indice = JSON.parse(readFileSync(caminho, "utf8")) as IndiceFichas;
  const itens = indice.fichas.map((e) => ({
    e,
    titulo: new Set(raizes(`${e.titulo} ${e.titulo_en}`)),
    descricao: new Set(raizes(`${e.descricao} ${e.descricao_en}`)),
    tituloPlano: plano(`${e.titulo} / ${e.titulo_en}`),
  }));
  // Peso de cada raiz pela raridade: "contrato" ou "petição" aparecem em centenas de fichas e pouco distinguem.
  const df = new Map<string, number>();
  for (const it of itens) for (const r of new Set([...it.titulo, ...it.descricao])) df.set(r, (df.get(r) ?? 0) + 1);
  const idf = new Map([...df].map(([r, n]) => [r, Math.log((itens.length + 1) / n)]));
  return (cacheFichas = { indice, itens, idf });
}

function textoEstado(s: EstadoCitacoes): string {
  const partes = [`${s.conferidas} conferidas`];
  if (s.corrigidas) partes.push(`${s.corrigidas} corrigidas`);
  partes.push(`${s.por_conferir} por conferir`);
  return partes.join(", ");
}

/** Tool e argumento para abrir o conteúdo do plugin para onde uma ficha remete. */
function comoAbrir(alvo: string): string {
  const nome = alvo.split("/").pop() ?? alvo;
  if (alvo.startsWith("assets/modelos/")) return `modelo conferido: obter_modelo "${nome}"`;
  if (alvo.startsWith("assets/templates/")) return `template: obter_template "${nome}"`;
  if (alvo.startsWith("assets/checklists/")) return `checklist: obter_checklist "${nome}"`;
  if (alvo.startsWith("playbooks/")) return `playbook: obter_playbook "${nome}"`;
  return `ler_referencia "${nome}"`;
}

function linhaFicha(e: EntradaFicha): string {
  if (e.relacao === "mesmo-documento" && e.remete_para) {
    return `- ${e.codigo} → usa ${e.remete_para} (${comoAbrir(e.remete_para)}) — ${e.titulo} / ${e.titulo_en}`;
  }
  return `- ${e.codigo} — ${e.titulo} / ${e.titulo_en} — ${e.area} — citações: ${textoEstado(e.estado)}`;
}

function filtrarArea(itens: Pesquisavel[], area: string): Pesquisavel[] {
  const a = plano(area.trim());
  return itens.filter((it) => plano(it.e.codigo.split("-")[0]) === a || plano(it.e.area).includes(a));
}

/** Pontua as fichas por um termo PT ou EN: raízes em comum pesadas pela raridade, o título a pesar o dobro. */
function pontuar(c: NonNullable<typeof cacheFichas>, itens: Pesquisavel[], termo: string): Pesquisavel[] {
  return pontuarComPeso(c, itens, termo).map((x) => x.it);
}

function pontuarComPeso(c: NonNullable<typeof cacheFichas>, itens: Pesquisavel[], termo: string): Array<{ it: Pesquisavel; p: number }> {
  const q = [...new Set(raizes(termo))];
  const frase = plano(termo).trim();
  const pontos = itens.map((it) => {
    let p = 0;
    let achadas = 0;
    for (const r of q) {
      const w = c.idf.get(r) ?? 0;
      if (it.titulo.has(r)) { p += 2 * w; achadas++; }
      else if (it.descricao.has(r)) { p += w; achadas++; }
    }
    if (frase.length >= 6 && it.tituloPlano.includes(frase)) p += 4;
    // Cobrir todo o pedido vale mais do que repetir uma palavra rara.
    return { it, p: q.length ? p * (0.5 + (0.5 * achadas) / q.length) : 0 };
  });
  return pontos.filter((x) => x.p > 0).sort((a, b) => b.p - a.p || a.it.e.codigo.localeCompare(b.it.e.codigo));
}

/** procurar_ficha: por termo (PT ou EN) e/ou área; sem nada, as 22 áreas com as contagens. */
export function procurarFichas(termo?: string, area?: string): string {
  const c = catalogo();
  if (!c) return SEM_CATALOGO;
  const t = (termo ?? "").trim();
  const a = (area ?? "").trim();
  if (!t && !a) {
    const linhas = c.indice.areas.map(
      (x) => `- ${x.sigla} — ${x.nome} — ${x.importadas} fichas${x.total > x.importadas ? ` (+${x.total - x.importadas} remetem para o plugin)` : ""}`,
    );
    return `Fichas do catálogo por área (${c.indice.fichas.length}). Procura com termo e/ou área (sigla ou nome):${NL}${linhas.join(NL)}`;
  }
  // Um código exato vai direto à ficha.
  const codigo = c.itens.find((it) => it.e.codigo === t.toUpperCase());
  if (codigo) return `Ficha ${codigo.e.codigo} (obter_ficha para a abrir):${NL}${linhaFicha(codigo.e)}`;
  let itens = a ? filtrarArea(c.itens, a) : c.itens;
  if (a && !itens.length) return `Não há a área '${a}'. Áreas: ${c.indice.areas.map((x) => x.sigla).join(", ")}.`;
  if (t) itens = pontuar(c, itens, t).slice(0, 20);
  if (!itens.length) return `Nenhuma ficha para '${t}'${a ? ` na área ${a}` : ""}. Experimenta outras palavras, em PT ou EN, ou só a área.`;
  const cab = t ? `Fichas para '${t}'${a ? ` (área ${a})` : ""}` : `Fichas da área ${itens[0].e.area}`;
  return `${cab} — obter_ficha com o código para abrir; → remete para conteúdo do plugin, que se usa primeiro:${NL}${itens.map((it) => linhaFicha(it.e)).join(NL)}`;
}

/** As fichas mais próximas de um termo, para juntar a outras pesquisas (procurar_conteudo); [] sem catálogo. */
export function fichasParaTermo(termo: string, maximo = 5): string[] {
  const c = catalogo();
  if (!c || !termo.trim()) return [];
  const res = pontuarComPeso(c, c.itens, termo);
  // Só as que ficam perto da melhor: "contrato" sozinho bate em centenas de fichas.
  const corte = (res[0]?.p ?? 0) / 2;
  return res.filter((x) => x.p >= corte).slice(0, maximo).map((x) => linhaFicha(x.it.e));
}

/** Sugestões para um código que não existe: os números mais próximos da mesma área, ou a pesquisa pelo texto. */
function sugestoes(c: NonNullable<typeof cacheFichas>, pedido: string): EntradaFicha[] {
  const m = /^([A-Z]+)-(\d+)$/.exec(pedido);
  if (m) {
    const daArea = c.itens.filter((it) => it.e.codigo.startsWith(`${m[1]}-`));
    if (daArea.length) {
      const n = Number(m[2]);
      return daArea
        .map((it) => ({ e: it.e, d: Math.abs(Number(it.e.codigo.split("-")[1]) - n) }))
        .sort((a, b) => a.d - b.d || a.e.codigo.localeCompare(b.e.codigo))
        .slice(0, 5)
        .map((x) => x.e);
    }
  }
  return pontuar(c, c.itens, pedido).slice(0, 5).map((it) => it.e);
}

/** obter_ficha: a ficha com o cabeçalho da casa (estado das citações, ordem de uso, valores e redator). */
export function lerFicha(codigo: string): string {
  const c = catalogo();
  if (!c) return SEM_CATALOGO;
  const pedido = String(codigo ?? "").trim().toUpperCase();
  const e = c.indice.fichas.find((x) => x.codigo === pedido);
  if (!e) {
    const sug = sugestoes(c, pedido);
    return `Não há a ficha ${pedido || "(sem código)"}. As mais próximas:${NL}${sug.map(linhaFicha).join(NL)}`;
  }
  if (e.relacao === "mesmo-documento" && e.remete_para) {
    return (
      `A ficha ${e.codigo} (${e.titulo} / ${e.titulo_en}) é o mesmo documento que ${e.remete_para}, ` +
      `que o plugin já tem conferido. Usa esse: ${comoAbrir(e.remete_para)}.`
    );
  }
  // O caminho vem do índice (gerado pelo importador); mesmo assim, nada sai de content/fichas.
  if (!e.ficheiro || !/^\d\d-[a-z0-9-]+\/[A-Z]+-\d+-[a-z0-9-]+\.md$/.test(e.ficheiro)) return `A ficha ${e.codigo} não tem ficheiro no pacote.`;
  const caminho = join(DIR_FICHAS, e.ficheiro);
  if (!existsSync(caminho)) return `A ficha ${e.codigo} não está no pacote (${e.ficheiro}).`;
  const corpo = readFileSync(caminho, "utf8").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n+/, "");
  return `${cabecalhoFicha(e)}${NL}${NL}---${NL}${NL}${corpo}`;
}

/** Cabeçalho da casa de obter_ficha: estado das citações, ordem de uso, revisão técnica, valores e redator. */
export function cabecalhoFicha(e: Pick<EntradaFicha, "codigo" | "titulo" | "titulo_en" | "area" | "estado" | "relacao" | "remete_para" | "revisao_tecnica">): string {
  const r = e.revisao_tecnica;
  return [
    `Ficha ${e.codigo} — ${e.titulo} / ${e.titulo_en} (${e.area})`,
    `Citações: ${textoEstado(e.estado)}. As por conferir estão marcadas [■ VERIFICAR] e só entram no documento assim, até serem confirmadas na fonte oficial (dre.pt, EUR-Lex).`,
    "Ordem de uso: modelo conferido (listar_modelos) → template (listar_templates) → ficha. A ficha é um guia de trabalho: serve quando o plugin não tem modelo nem template para este documento.",
    ...(e.relacao === "complementa" && e.remete_para
      ? [`Cruza-se com ${e.remete_para}: usa primeiro esse (${comoAbrir(e.remete_para)}) e esta ficha como complemento.`]
      : []),
    ...(r
      ? [`Revisão técnica: ${r.data} (${r.veredicto}). O que mudou e as fontes estão em assets/fichas/revisao-tecnica.md; falta a confirmação de um advogado, por isso diz ao utilizador que o documento deve ser revisto por quem o assina.`]
      : []),
    'Valores do ano (salário mínimo, IAS, UC, taxas): ler_referencia "valores-2026", nunca os montantes da ficha.',
    "Redação: segue o fluxo de assets/redacao/redator.md (entrevista numa só mensagem, Marcação Redator, verificar_redacao, exportar_documento).",
  ].join(NL);
}

/** Códigos das fichas, para o autocompletar de obter_ficha. */
export function codigosFichas(): string[] {
  return catalogo()?.indice.fichas.map((e) => e.codigo) ?? [];
}
