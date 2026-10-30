#!/usr/bin/env node
// Importa o catálogo de fichas Skills Jurídicas PRO (da empresa) para skills/juridico-pt/assets/fichas/.
// Pipeline: catálogo → sobreposições (as mesmo-documento ficam como remissão) → grafia AO90 e sem PT-BR →
// persona da casa (sem "És um advogado…" nem o aviso antigo) → marcadores [■ VERIFICAR] → grandezas anuais
// remetidas para valores-2026 → citações (índice de normas, epígrafes oficiais e decisões da revisão) →
// traduções EN → fichas, _INDICE.md por área, indice.json, citacoes.json e README.md.
// Sem dependências (Node >= 18). Nunca executa nada da origem: só lê texto.
//
//   node mcp-server/scripts/importar-fichas.mjs --origem <pasta do kit>                 # escreve
//   node mcp-server/scripts/importar-fichas.mjs --origem <pasta do kit> --check         # só compara
//   node mcp-server/scripts/importar-fichas.mjs --origem <kit> --skill <raiz do skill>  # outra raiz (testes)
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DIPLOMAS } from "./gerar-epigrafes.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const SKILL_PADRAO = resolve(here, "..", "..", "skills", "juridico-pt");
const AO90 = JSON.parse(readFileSync(join(here, "ao90.json"), "utf8"));
const LETRA = "A-Za-zÀ-ÖØ-öø-ÿ";

// Diplomas fora dos 25 com epígrafes, só para cruzar com o índice de normas conferidas.
const EXTRA = [
  { sigla: "CIVA", diploma: "Código do IVA", nomes: ["Código do IVA", "Código do Imposto sobre o Valor Acrescentado"] },
  { sigla: "EOA", diploma: "Estatuto da Ordem dos Advogados", nomes: ["Estatuto da Ordem dos Advogados"] },
  { sigla: "NRAU", diploma: "Novo Regime do Arrendamento Urbano", nomes: ["Novo Regime do Arrendamento Urbano"] },
  { sigla: "RCP", diploma: "Regulamento das Custas Processuais", nomes: ["Regulamento das Custas Processuais"] },
  { sigla: "LOSJ", diploma: "Lei da Organização do Sistema Judiciário", nomes: ["Lei da Organização do Sistema Judiciário"] },
];

const PARADAS = new Set(["para", "pelo", "pela", "pelos", "pelas", "como", "sobre", "entre", "artigo", "artigos", "codigo", "regime", "geral", "gerais",
  "direito", "direitos", "prazo", "prazos", "decreto", "contrato", "contratos", "trabalho", "processo", "procedimento", "termos", "caso", "casos",
  "quando", "deve", "devem", "pode", "podem", "este", "esta", "estes", "estas", "outro", "outra", "qualquer", "seus", "suas", "mesmo", "parte", "partes",
  "aplicavel", "aplicaveis", "previsto", "prevista", "nomeadamente", "respetivo", "respetiva", "legal", "legais", "obrigatoria", "obrigatorio"]);

// ---------------- utilitários ----------------

const semAcentos = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const espacos = (s) => s.replace(/\s+/g, " ").trim();
// Os códigos chamam "Noção" ao que as fichas dizem "definição" ou "conceito".
const SINONIMOS = { definicao: "nocao", conceito: "nocao" };
const raizes = (s) =>
  new Set(semAcentos(s.toLowerCase()).split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !PARADAS.has(w)).map((w) => (SINONIMOS[w] || w).slice(0, 5)));
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const slug = (s) => {
  const base = semAcentos(s.toLowerCase()).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (base.length <= 70) return base;
  const corte = base.slice(0, 70);
  return corte.slice(0, corte.lastIndexOf("-") > 40 ? corte.lastIndexOf("-") : 70);
};
const yaml = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
const lerJson = (f, padrao) => (existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : padrao);

/** Substitui palavras (lista fechada) mantendo a capitalização: acção → ação, Acção → Ação, ACÇÃO → AÇÃO. */
function trocarPalavras(texto, mapa) {
  // A forma de destino guarda-se em minúsculas; a capitalização vem do texto encontrado.
  const lower = new Map(Object.entries(mapa).map(([k, v]) => [k.toLowerCase(), v.toLowerCase()]));
  const chaves = [...lower.keys()].sort((a, b) => b.length - a.length).map(escRe);
  if (!chaves.length) return texto;
  const re = new RegExp(`(?<![${LETRA}])(${chaves.join("|")})(?![${LETRA}])`, "giu");
  return texto.replace(re, (m) => {
    const v = lower.get(m.toLowerCase());
    if (m === m.toUpperCase() && m !== m.toLowerCase()) return v.toUpperCase();
    if (m[0] === m[0].toUpperCase()) return v[0].toUpperCase() + v.slice(1);
    return v;
  });
}
export const normalizarGrafia = (t) => trocarPalavras(trocarPalavras(t, AO90.ptbr), AO90.converter);

/** Grandezas anuais escritas com valor → remissão para valores-2026. */
const RE_GRANDEZA = /(salário mínimo|retribuição mínima mensal garantida|RMMG|\bIAS\b|unidade de conta|\bUC\b)([^.\n]{0,25}?)(€\s?\d{2,4}(?:[.,]\d+)?|\d{2,4}(?:[.,]\d+)?\s?€)/gi;
export const remeterGrandezas = (t) => t.replace(RE_GRANDEZA, (_, g, meio) => `${g}${meio}[valor do ano em valores-2026]`);

/** Persona da casa: sem "És um advogado…", sem o aviso antigo nem a secção Disclaimer; marcadores [■ VERIFICAR]. */
export function aplicarPersona(corpo) {
  let t = corpo.replace(/\r\n/g, "\n");
  t = t.replace(/^## Disclaimer\s*\n[\s\S]*?(?=^## |^---\s*$|(?![\s\S]))/m, "");
  t = t.split("\n").filter((l) => !/Não substitui o juízo do advogado|^\s*[-—–*]?\s*Disclaimer\b/i.test(l)).join("\n");
  // A abertura de persona do prompt dá lugar à regra da casa; outras frases "És um(a) …" saem.
  t = t.replace(/^## Prompt\s*\n+(?:És um[^\n]*\n?)+/m, "## Método\n\nFicha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.\n");
  t = t.replace(/^## Prompt\s*$/m, "## Método");
  t = t.replace(/(^|[.!?]\s+)És um(?:a)? [^.\n]*\.\s*/gm, "$1");
  t = t.replace(/^## DADOS DO CASO.*$/gim, "## Dados a recolher (entrevista numa só mensagem)");
  t = t.replace(/^## OUTPUT ESPERADO\s*$/gim, "## Resultado esperado");
  t = marcadores(t);
  return t.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

/** Marcador da casa, igual em PT e EN: [VERIFICAR …] / [VERIFY …] → [■ VERIFICAR …]. */
export const marcadores = (t) => t.replace(/\[(?!■)\s*(?:VERIFICAR|VERIFY)\b/g, "[■ VERIFICAR");

// ---------------- citações ----------------

function registoDiplomas(epigrafes) {
  const reg = [];
  const visto = new Set();
  for (const d of [...DIPLOMAS, ...Object.values(epigrafes), ...EXTRA]) {
    if (visto.has(d.sigla)) continue;
    visto.add(d.sigla);
    // O nome tirado do título só conta com mais de uma palavra: "Regulamento (UE) 2016/679 (…)" daria "Regulamento",
    // que apanhava qualquer regulamento.
    const doTitulo = d.diploma.replace(/\s*\(.*$/, "");
    const nomes = [...new Set([...(d.nomes || []), ...(doTitulo.includes(" ") ? [doTitulo] : [])])];
    reg.push({ sigla: d.sigla, diploma: d.diploma, nomes, epigrafes: epigrafes[d.sigla]?.artigos || null, revogados: new Set(epigrafes[d.sigla]?.revogados || []) });
  }
  return reg;
}

// Siglas que outros diplomas também usam: só valem quando a ficha não fala do outro (Código da Estrada,
// Código do Registo Predial, Código da Publicidade) e, no caso de CE, quando fala de expropriações.
const SIGLAS_AMBIGUAS = [
  { sigla: "CE", vale: (t) => /expropria/i.test(t) && !/C[óo]digo da Estrada/i.test(t) },
  { sigla: "CRP", vale: (t) => !/C[óo]digo do Registo Predial/i.test(t) },
  { sigla: "CP", vale: (t) => !/C[óo]digo da Publicidade/i.test(t) },
];
function registoDaFicha(reg, texto) {
  const fora = new Set(SIGLAS_AMBIGUAS.filter((a) => !a.vale(texto)).map((a) => a.sigla));
  return fora.size ? reg.map((d) => (fora.has(d.sigla) ? { ...d, soNome: true } : d)) : reg;
}

const RE_ART = /\b(art(?:igo)?s?\.?º?)\s*(\d+)\s*\.?\s*[º°](?:\s*-\s*([A-Z])\b)?/gi;
// Sem "º" ("Art. 246 CSC", "art. 6 RGPD"): só conta com o diploma logo a seguir, com números e alíneas pelo meio,
// para não apanhar o "Artigo 1 — Objeto" de um contrato nem o "art. 5 do contrato".
const RE_ART_SEM = /\b(art(?:igo)?s?\.?º?)\s*(\d+)(?![\d/]|\s*\.?\s*[º°]|[.,]\d)(?:\s*-\s*([A-Z])\b)?/gi;
const SO_NUMEROS = /^(?:[\s,;(]|\(\d+\)|\([a-z]\)|n\.?\s*ºs?\s*\d+|al(?:ínea)?s?\.?\s*[a-z]\)|\b(?:do|da|dos|das|e)\b)*$/i;
// Outro diploma nomeado entre o artigo e a sigla: a citação é desse ("art. 98.º da Lei n.º 23/2007 … CPA").
// Com maiúscula, como se escrevem os diplomas: "regime" ou "código" no meio da frase não contam.
const OUTRO_DIPLOMA = /\b(Lei|lei n\.º|Decreto|DL|Diretiva|Directiva|Regulamento|Portaria|Conven[çc][ãa]o|Carta|Despacho|Resolu[çc][ãa]o|Tratado|C[óo]digo|Estatuto|Regime)\b/;
const CONSTITUICAO_ESTRANGEIRA = /^Constitui[çc][ãa]o\s+(?:brasileira|federal|da República Federativa|de Angola|de Moçambique|de Cabo Verde)/i;

/** Há um ")" que fecha um parêntese aberto antes do artigo? ("da LGT (arts. 45.º, 78.º) e do CPPT"). As alíneas "a)" não contam. */
function fechaParentese(s) {
  let nivel = 0;
  for (const ch of s.replace(/\[[^\]]*\]\)/g, "").replace(/\b[a-zA-Z]{1,2}\)/g, "")) {
    if (ch === "(") nivel++;
    else if (ch === ")" && --nivel < 0) return true;
  }
  return false;
}

/** Citações de uma linha: { inicio, fim, texto, artigo, sigla } com o diploma reconhecido até 70 caracteres depois. */
function citacoesDaLinha(linha, reg) {
  const achados = [...linha.matchAll(RE_ART), ...[...linha.matchAll(RE_ART_SEM)].map((m) => Object.assign(m, { semGrau: true }))].sort((a, b) => a.index - b.index);
  const out = [];
  achados.forEach((m, i) => {
    const fimArt = m.index + m[0].length;
    const limite = Math.min(linha.length, fimArt + 70, i + 1 < achados.length ? achados[i + 1].index : Infinity);
    const resto = linha.slice(fimArt, limite);
    let melhor = null;
    for (const d of reg) {
      for (const alvo of d.soNome ? d.nomes : [d.sigla, ...d.nomes]) {
        // Uma sigla depois de "/" é o fim do número de uma diretiva ou de um regulamento ("2008/115/CE").
        const re = alvo === d.sigla ? new RegExp(`(?<![${LETRA}/])${escRe(alvo)}(?![${LETRA}])`) : new RegExp(escRe(alvo), "i");
        const p = resto.search(re);
        if (p < 0 || (melhor && p >= melhor.p)) continue;
        if (CONSTITUICAO_ESTRANGEIRA.test(resto.slice(p))) continue;
        melhor = { p, d, alvo };
      }
    }
    if (melhor) {
      const entre = resto.slice(0, melhor.p);
      // A sigla entre parênteses logo a seguir ao diploma é o nome dele ("Lei n.º 63/2011, de 14 de dezembro (LAV)").
      const definida = melhor.alvo === melhor.d.sigla && /\(\s*$/.test(entre) && !fechaParentese(entre);
      if (!definida && (OUTRO_DIPLOMA.test(entre) || fechaParentese(entre))) melhor = null;
    }
    if (m.semGrau && !(melhor && SO_NUMEROS.test(resto.slice(0, melhor.p)))) return;
    const artigo = m[3] ? `${Number(m[2])}-${m[3].toUpperCase()}` : String(Number(m[2]));
    const texto = melhor ? linha.slice(m.index, fimArt + melhor.p + melhor.alvo.length) : m[0];
    out.push({ inicio: m.index, fim: m.index + texto.length, texto, artigo, d: melhor?.d || null });
  });
  return out;
}

/** Correspondência de assunto entre o contexto da citação e a epígrafe (raízes de 5 letras, sem palavras genéricas). */
const raizesDoDiploma = new WeakMap();

function corresponde(contexto, epigrafe, epigrafes) {
  const a = raizes(contexto);
  // As epígrafes da PGDL ainda têm a grafia antiga em alguns códigos ("Coacção", "efectua").
  const b = raizes(normalizarGrafia(epigrafe));
  const comuns = [...b].filter((x) => a.has(x));
  // Duas raízes em comum; uma só chega quando a epígrafe tem uma única palavra de conteúdo ("Prescrição").
  if (!(comuns.length >= 2 || (comuns.length === 1 && b.size === 1))) return null;
  // E têm de distinguir o artigo: palavras que todas as epígrafes de uma secção partilham ("trabalho a tempo
  // parcial", CT 150.º–156.º) não dizem qual delas é a certa.
  if (!raizesDoDiploma.has(epigrafes)) raizesDoDiploma.set(epigrafes, Object.values(epigrafes).map((e) => raizes(normalizarGrafia(e))));
  const iguais = raizesDoDiploma.get(epigrafes).filter((r) => comuns.every((x) => r.has(x))).length;
  return iguais <= 3 ? comuns : null;
}

function noIndice(normas, d, artigo) {
  if (!d) return null;
  const alvo = `artigo ${artigo.replace(/-(\w)$/, ".º-$1").replace(/^(\d+)$/, "$1.º")}`;
  return normas.find(
    (n) => d.nomes.some((nome) => n.diploma.toLowerCase().startsWith(nome.toLowerCase())) && (n.dispositivo === alvo || n.dispositivo.startsWith(`${alvo},`) || n.dispositivo.startsWith(`${alvo} `)),
  ) || null;
}

/** Aplica o estado a cada citação de uma ficha e devolve o texto corrigido e as citações. */
export function conferirCitacoes(codigo, texto, ctx) {
  const decisoes = ctx.revisao[codigo] || [];
  const usadas = new Set();
  const citacoes = [];
  const linhas = texto.split("\n");
  const registo = registoDaFicha(ctx.reg, texto);
  for (let li = 0; li < linhas.length; li++) {
    let linha = linhas[li];
    if (/^\|/.test(linha)) continue; // tabelas da ficha não têm citações a conferir
    const achadas = citacoesDaLinha(linha, registo);
    // Do fim para o início, para as substituições não deslocarem as posições seguintes.
    for (const c of [...achadas].reverse()) {
      const antes = linha.slice(Math.max(0, c.inicio - 80), c.inicio);
      const depois = linha.slice(c.fim, c.fim + 120);
      const contexto = `${antes} ${depois}`;
      const reg = { codigo, texto: c.texto, sigla: c.d?.sigla || null, diploma: c.d?.diploma || null, artigo: c.artigo, contexto: `${antes}⟨${c.texto}⟩${depois}`.replace(/\s+/g, " ").trim() };
      // Artigo revogado: a epígrafe fica na lista oficial, mas a citação não conta como conferida (salvo se o texto
      // já diz que está revogado).
      const revogado = c.d?.revogados?.has(c.artigo) && !/revog(?:ad[oa]|ou|a[çc][ãa]o d[oe]s?\s+art)/i.test(contexto);
      const marcarRevogado = () => {
        const nota = `o artigo ${c.artigo.replace(/-/, ".º-").replace(/^(\d+)$/, "$1.º")} ${c.d.sigla} está revogado; confirmar a norma em vigor`;
        linha = inserirMarcador(linha, c.fim, nota);
        citacoes.push({ ...reg, estado: "por conferir", nota });
      };
      const di = decisoes.findIndex((x, i) => !usadas.has(i) && x.citacao === c.texto && (!x.contexto || espacos(linha).includes(espacos(x.contexto))));
      if (di >= 0) {
        usadas.add(di);
        const x = decisoes[di];
        if (revogado && x.decisao === "conferida") { marcarRevogado(); continue; }
        if (x.decisao === "corrigir") {
          // A correção vem como texto completo (correto) ou só como número (artigo_correto, ex. "153" ou "78-A").
          if (!x.correto && x.artigo_correto) {
            const [n, l] = String(x.artigo_correto).split("-");
            x.correto = c.texto.replace(/(\d+)\s*\.?\s*([º°])(?:\s*-\s*[A-Z]\b)?/, `${n}.$2${l ? `-${l}` : ""}`);
          }
          const nova = citacoesDaLinha(x.correto, ctx.reg)[0];
          const ep = nova?.d?.epigrafes?.[nova.artigo];
          if (!ep) throw new Error(`${codigo}: a correção «${x.correto}» não está nas epígrafes`);
          if (nova.d.revogados?.has(nova.artigo)) throw new Error(`${codigo}: a correção «${x.correto}» aponta para um artigo revogado`);
          linha = linha.slice(0, c.inicio) + x.correto + linha.slice(c.fim);
          citacoes.push({ ...reg, texto: x.correto, artigo: nova.artigo, sigla: nova.d.sigla, diploma: nova.d.diploma, estado: "corrigida", epigrafe: normalizarGrafia(ep), prova: "revisão", nota: x.nota || "o número citado no catálogo não correspondia à epígrafe" });
          continue;
        }
        if (x.decisao === "conferida") {
          const ep = c.d?.epigrafes?.[c.artigo];
          if (!ep) throw new Error(`${codigo}: «${c.texto}» dada como conferida sem epígrafe`);
          citacoes.push({ ...reg, estado: "conferida (epígrafe)", epigrafe: normalizarGrafia(ep), prova: "revisão" });
          continue;
        }
        // verificar
        linha = inserirMarcador(linha, c.fim, x.nota || "norma por conferir");
        citacoes.push({ ...reg, estado: "por conferir", nota: x.nota || "norma por conferir" });
        continue;
      }
      if (revogado) { marcarRevogado(); continue; }
      const ix = noIndice(ctx.normas, c.d, c.artigo);
      if (ix) {
        citacoes.push({ ...reg, estado: "conferida (índice)", diploma_indice: ix.diploma, dispositivo: ix.dispositivo, prova: ix.ficheiro });
        continue;
      }
      // Citação escrita pela revisão técnica, confirmada na fonte que a correção indica (e sem [■ VERIFICAR] ao lado):
      // conta como conferida se o artigo existir nas epígrafes oficiais.
      const fonteRev = ctx.introduzidas?.get(c.texto);
      const epRev = fonteRev && c.d?.epigrafes?.[c.artigo];
      if (epRev && !/^\s*(\([^()\n]{0,160}\))?\s*\[■ VERIFICAR/.test(linha.slice(c.fim))) {
        citacoes.push({ ...reg, estado: "conferida (epígrafe)", epigrafe: normalizarGrafia(epRev), prova: `revisão técnica: ${fonteRev}` });
        continue;
      }
      const eps = c.d?.epigrafes;
      if (eps) {
        const ep = eps[c.artigo];
        if (!ep) {
          const nota = `o artigo ${c.artigo.replace(/-/, ".º-").replace(/^(\d+)$/, "$1.º")} não existe no ${c.d.diploma.replace(/\s*\(.*$/, "")}; confirmar a norma`;
          linha = inserirMarcador(linha, c.fim, nota);
          citacoes.push({ ...reg, estado: "por conferir", nota });
          continue;
        }
        const comuns = corresponde(contexto, ep, eps);
        if (comuns) {
          citacoes.push({ ...reg, estado: "conferida (epígrafe)", epigrafe: normalizarGrafia(ep), prova: `palavras: ${comuns.join(", ")}` });
          continue;
        }
        citacoes.push({ ...reg, estado: "por conferir", epigrafe: normalizarGrafia(ep), nota: "o assunto descrito não coincide com a epígrafe; confirmar" });
        continue;
      }
      citacoes.push({ ...reg, estado: "por conferir", nota: c.d ? "diploma sem epígrafes locais" : "diploma não identificado" });
    }
    linhas[li] = linha;
  }
  const naoUsadas = decisoes.filter((_, i) => !usadas.has(i));
  if (naoUsadas.length) throw new Error(`${codigo}: decisões sem citação correspondente: ${naoUsadas.map((x) => x.citacao).join("; ")}`);
  // Ordem estável: pela ordem de aparição no texto (o laço percorre cada linha do fim para o início).
  return { texto: linhas.join("\n"), citacoes: ordenarPorAparicao(citacoes, linhas.join("\n")) };
}

/** Põe o marcador depois da citação ou, se ela vier seguida de "(descrição)", depois do parêntese. */
function inserirMarcador(linha, fim, nota) {
  const m = /^\s*\([^()\n]{0,160}\)/.exec(linha.slice(fim));
  const p = m ? fim + m[0].length : fim;
  return linha.slice(0, p) + ` [■ VERIFICAR: ${nota}]` + linha.slice(p);
}

function ordenarPorAparicao(cits, texto) {
  return cits
    .map((c, i) => ({ c, i, p: texto.indexOf(c.texto) }))
    .sort((a, b) => a.p - b.p || a.i - b.i)
    .map((x) => x.c);
}

const contar = (cits) => ({
  conferidas: cits.filter((c) => c.estado.startsWith("conferida")).length,
  corrigidas: cits.filter((c) => c.estado === "corrigida").length,
  por_conferir: cits.filter((c) => c.estado === "por conferir").length,
});
const estadoTexto = (e) => (e.conferidas + e.corrigidas + e.por_conferir === 0 ? "sem citações" : `conferidas ${e.conferidas} · corrigidas ${e.corrigidas} · por conferir ${e.por_conferir}`);

// ---------------- leitura da origem ----------------

function frontmatterKit(texto) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(texto);
  if (!m) return { campos: {}, corpo: texto };
  const campos = {};
  for (const l of m[1].split(/\r?\n/)) {
    const k = /^([a-z_]+):\s*(.*)$/.exec(l);
    if (k) campos[k[1]] = k[2].trim().replace(/^"(.*)"$/, "$1");
  }
  return { campos, corpo: m[2] };
}

/** Corpo útil da ficha: a partir do primeiro "## " (o prompt); o cabeçalho do kit (título, área, descrição) é refeito. */
const corpoUtil = (corpo) => {
  const i = corpo.search(/^## /m);
  return i >= 0 ? corpo.slice(i) : corpo;
};

// ---------------- geração ----------------

export function importar({ origem, skill = SKILL_PADRAO }) {
  const dirFichas = join(skill, "assets", "fichas");
  const catalogo = JSON.parse(readFileSync(join(origem, "catalogo.json"), "utf8"));
  const sobre = lerJson(join(dirFichas, "sobreposicoes.json"), {});
  const traducoes = lerJson(join(dirFichas, "traducoes-en.json"), {});
  const revisao = lerJson(join(dirFichas, "revisao-citacoes.json"), {});
  const correcoes = lerJson(join(dirFichas, "correcoes-conteudo.json"), {});
  const normas = lerJson(join(skill, "references", "normas-conferidas.json"), []);
  const epigrafes = {};
  const dirEp = join(skill, "references", "epigrafes");
  if (existsSync(dirEp)) for (const f of readdirSync(dirEp).filter((x) => x.endsWith(".json"))) { const e = JSON.parse(readFileSync(join(dirEp, f), "utf8")); epigrafes[e.sigla] = e; }
  const ctx = { reg: registoDiplomas(epigrafes), normas, revisao };

  const codigos = new Set(catalogo.map((c) => c.codigo));
  for (const k of Object.keys(sobre)) if (!codigos.has(k)) throw new Error(`sobreposicoes.json: ${k} não está no catálogo`);
  for (const k of Object.keys(revisao)) if (!codigos.has(k)) throw new Error(`revisao-citacoes.json: ${k} não está no catálogo`);
  for (const k of Object.keys(correcoes)) if (!codigos.has(k)) throw new Error(`correcoes-conteudo.json: ${k} não está no catálogo`);

  const ficheiros = new Map();
  const entradas = [];
  const todasCitacoes = [];
  const areas = new Map();
  let importado_em = null;

  for (const item of [...catalogo].sort((a, b) => a.codigo.localeCompare(b.codigo, "pt", { numeric: true }))) {
    const pasta = item.ficheiro_md.split("/")[1];
    const sigla = item.codigo.split("-")[0];
    const area = normalizarGrafia(item.area);
    if (!areas.has(pasta)) areas.set(pasta, { sigla, nome: area, pasta, total: 0, importadas: 0 });
    areas.get(pasta).total++;
    // A revisão técnica pode corrigir também o título e a descrição (PT e EN) quando descrevem um regime antigo.
    const rev = correcoes[item.codigo];
    const titulo = rev?.titulo ?? normalizarGrafia(item.titulo);
    const descricao = rev?.descricao ?? marcadores(remeterGrandezas(normalizarGrafia(item.descricao)));
    const s = sobre[item.codigo];
    const en = rev && (rev.titulo_en || rev.descricao_en)
      ? { ...traducoes[item.codigo], ...(rev.titulo_en ? { titulo_en: rev.titulo_en } : {}), ...(rev.descricao_en ? { descricao_en: rev.descricao_en } : {}) }
      : traducoes[item.codigo];
    const base = { codigo: item.codigo, area, pasta, titulo, titulo_en: en?.titulo_en || "", descricao, descricao_en: marcadores(en?.descricao_en || "") };
    if (s?.relacao === "mesmo-documento") {
      entradas.push({ ...base, ficheiro: null, relacao: s.relacao, remete_para: s.alvo, estado: { conferidas: 0, corrigidas: 0, por_conferir: 0 } });
      continue;
    }
    if (!en?.titulo_en || !en?.descricao_en) throw new Error(`traducoes-en.json: falta a tradução de ${item.codigo}`);
    const bruto = readFileSync(join(origem, item.ficheiro_md), "utf8");
    const { campos, corpo } = frontmatterKit(bruto);
    importado_em ??= campos.extraido_em || null;
    let texto = aplicarPersona(remeterGrandezas(normalizarGrafia(corpoUtil(corpo))));
    // Revisão técnica: as correções de conteúdo entram antes das citações, que as conferem como às outras.
    // O texto novo da revisão passa pelas mesmas regras (AO90, valores do ano remetidos para valores-2026).
    if (rev) texto = remeterGrandezas(normalizarGrafia(aplicarCorrecoes(item.codigo, texto, rev)));
    const conf = conferirCitacoes(item.codigo, texto, rev ? { ...ctx, introduzidas: citacoesIntroduzidas(rev, registoDaFicha(ctx.reg, texto)) } : ctx);
    texto = conf.texto;
    const estado = contar(conf.citacoes);
    todasCitacoes.push(...conf.citacoes);
    const ambito = /União Europeia/.test(area) ? "ue" : "nacional";
    const nome = `${item.codigo}-${slug(titulo)}.md`;
    const fm = [
      "---",
      `codigo: ${item.codigo}`,
      `area: ${yaml(area)}`,
      `titulo: ${yaml(titulo)}`,
      `titulo_en: ${yaml(en.titulo_en)}`,
      `descricao: ${yaml(descricao)}`,
      `descricao_en: ${yaml(base.descricao_en)}`,
      `ambito: ${ambito}`,
      `estado_citacoes: ${yaml(estadoTexto(estado))}`,
      ...(s ? [`remete_para: ${yaml(s.alvo)}`] : []),
      ...(rev ? [`revisao_tecnica: ${yaml(`${rev.revisto_em} (${rev.veredicto})`)}`] : []),
      `origem: ${yaml(`Skills Jurídicas PRO (catálogo da empresa), importado a ${campos.extraido_em || "?"}`)}`,
      "---",
    ];
    const cab = [
      `# ${titulo}`,
      "",
      `> **Âmbito:** ${ambito === "ue" ? "UE" : "nacional"} · **Área:** ${area} · **Código:** ${item.codigo}`,
      `> **EN:** ${en.titulo_en}. ${base.descricao_en}`,
      ...(s ? [`> **Ver também:** \`${s.alvo}\` — ${s.nota || "conteúdo do plugin sobre o mesmo tema"}. Usa-o primeiro.`] : []),
      `> **Citações:** ${estadoTexto(estado)}. As por conferir entram no documento com \`[■ VERIFICAR]\`; valores do ano em \`references/valores-2026.md\`.`,
      ...(rev ? [`> **Revisão técnica:** ${rev.revisto_em} — ${veredictoTexto(rev)}. O que mudou e as fontes em \`assets/fichas/revisao-tecnica.md\`; falta a confirmação de um advogado.`] : []),
      "",
      descricao,
      "",
    ];
    const tabela = conf.citacoes.length
      ? ["", "## Citações desta ficha", "", "| Citação | Estado | Nota |", "|---|---|---|",
        ...conf.citacoes.map((c) => `| ${c.texto.replace(/\|/g, "/")} | ${c.estado === "por conferir" ? "por conferir [■ VERIFICAR]" : c.estado}${c.epigrafe && c.estado !== "por conferir" ? ` — ${c.epigrafe.replace(/\|/g, "/").slice(0, 90)}` : ""} | ${(c.nota || "").replace(/\|/g, "/")} |`)]
      : [];
    ficheiros.set(join(pasta, nome), [...fm, "", ...cab, texto.trimEnd(), ...tabela, ""].join("\n"));
    areas.get(pasta).importadas++;
    entradas.push({
      ...base, ficheiro: `${pasta}/${nome}`, ...(s ? { relacao: s.relacao, remete_para: s.alvo } : {}), estado,
      ...(rev ? { revisao_tecnica: { data: rev.revisto_em, veredicto: rev.veredicto } } : {}),
    });
  }

  // _INDICE.md por área
  for (const a of areas.values()) {
    const daArea = entradas.filter((e) => e.pasta === a.pasta);
    const linhas = [
      `# ${a.nome} — índice das fichas`,
      "",
      `> **Âmbito:** ${/União Europeia/.test(a.nome) ? "UE" : "nacional"} · ${a.importadas} fichas (${a.total} no catálogo; as restantes remetem para conteúdo do plugin)`,
      "",
      "Abre uma ficha com `obter_ficha` (código) ou lê o ficheiro. As citações por conferir entram no documento com `[■ VERIFICAR]`.",
      "",
      "| Código | Ficha | EN | Citações | Ficheiro |",
      "|---|---|---|---|---|",
      ...daArea.filter((e) => e.ficheiro).map((e) => `| ${e.codigo} | ${e.titulo.replace(/\|/g, "/")} | ${e.titulo_en.replace(/\|/g, "/")} | ${e.estado.conferidas + e.estado.corrigidas} conf. · ${e.estado.por_conferir} por conf. | [${e.ficheiro.split("/")[1]}](${e.ficheiro.split("/")[1]}) |`),
    ];
    const rem = daArea.filter((e) => !e.ficheiro);
    if (rem.length) linhas.push("", "## Remissões (documentos que o plugin já tem)", "", ...rem.map((e) => `- ${e.codigo} ${e.titulo} → \`${e.remete_para}\``));
    ficheiros.set(join(a.pasta, "_INDICE.md"), linhas.join("\n") + "\n");
  }

  // indice.json, citacoes.json, README.md
  const areasLista = [...areas.values()].sort((x, y) => x.pasta.localeCompare(y.pasta));
  ficheiros.set("indice.json", JSON.stringify({ origem: "Skills Jurídicas PRO (catálogo da empresa)", importado_em, total_catalogo: catalogo.length, areas: areasLista, fichas: entradas }, null, 1) + "\n");
  ficheiros.set("citacoes.json", JSON.stringify(todasCitacoes, null, 1) + "\n");
  const tot = contar(todasCitacoes);
  const comSigla = todasCitacoes.filter((c) => c.sigla);
  const comSiglaOk = comSigla.filter((c) => c.estado !== "por conferir").length;
  const pct = (n, d) => (d ? `${((100 * n) / d).toFixed(1).replace(".", ",")} %` : "—");
  ficheiros.set("README.md", [
    "# Fichas do catálogo — índice geral",
    "",
    "> **Âmbito:** nacional e UE · origem: Skills Jurídicas PRO (catálogo da empresa), importado a " + (importado_em || "?"),
    "",
    `Fichas de trabalho para ${entradas.filter((e) => e.ficheiro).length} documentos em ${areasLista.length} áreas. Usam-se depois dos modelos conferidos (\`assets/modelos/\`) e dos templates (\`assets/templates/\`), pelo fluxo de \`assets/redacao/redator.md\`: \`procurar_ficha\` e \`obter_ficha\`, ou os \`_INDICE.md\` de cada área. ${entradas.filter((e) => !e.ficheiro).length} documentos do catálogo são o mesmo que um modelo ou template do plugin e ficam como remissão.`,
    "",
    "## Citações",
    "",
    `- Total: ${todasCitacoes.length} (conferidas ${tot.conferidas}, corrigidas ${tot.corrigidas}, por conferir ${tot.por_conferir}).`,
    `- Com o diploma reconhecido: ${comSigla.length}; conferidas ou corrigidas: ${comSiglaOk} (${pct(comSiglaOk, comSigla.length)}).`,
    "- Conferida (índice): está no índice de normas conferidas. Conferida (epígrafe): o artigo existe e o assunto coincide com a epígrafe oficial (`references/epigrafes/`), ou, nas fichas da revisão técnica, foi confirmado na fonte indicada na prova (`revisao-tecnica.md`). Corrigida: o número foi trocado pelo da epígrafe certa, por decisão da revisão (`revisao-citacoes.json`). Por conferir: entra no documento com `[■ VERIFICAR]`.",
    "",
    "## Áreas",
    "",
    "| Área | Fichas | Remissões | Citações conferidas ou corrigidas |",
    "|---|---|---|---|",
    ...areasLista.map((a) => {
      const cs = todasCitacoes.filter((c) => c.codigo.startsWith(a.sigla + "-"));
      const ok = cs.filter((c) => c.estado !== "por conferir").length;
      return `| [${a.nome}](${a.pasta}/_INDICE.md) | ${a.importadas} | ${a.total - a.importadas} | ${ok}/${cs.length} (${pct(ok, cs.length)}) |`;
    }),
    "",
    "Manutenção: `node mcp-server/scripts/importar-fichas.mjs --origem <pasta do kit>` (e `--check`). Ver o CLAUDE.md.",
    "",
  ].join("\n"));
  if (Object.keys(correcoes).length) ficheiros.set("revisao-tecnica.md", relatorioRevisao(correcoes, entradas));
  return { ficheiros, entradas, citacoes: todasCitacoes, dirFichas };
}

// ---------------- revisão técnica (correcoes-conteudo.json) ----------------

/** Aplica as substituições de uma ficha; cada trecho tem de existir exatamente uma vez (senão o kit mudou). */
function aplicarCorrecoes(codigo, texto, rev) {
  if (!["ok", "corrigida", "rever de raiz"].includes(rev.veredicto)) throw new Error(`correcoes-conteudo.json: ${codigo} com veredicto «${rev.veredicto}»`);
  if (!/^\d{4}-\d\d-\d\d$/.test(rev.revisto_em || "")) throw new Error(`correcoes-conteudo.json: ${codigo} sem revisto_em (AAAA-MM-DD)`);
  let t = texto;
  for (const s of rev.substituicoes || []) {
    const n = t.split(s.de).length - 1;
    if (n !== 1) throw new Error(`correcoes-conteudo.json: ${codigo} — o trecho «${s.de.slice(0, 80)}» aparece ${n} vezes (tem de aparecer uma)`);
    t = t.replace(s.de, () => s.para);
  }
  return t;
}

/** Citações que uma correção com fonte acrescentou (estão no texto novo e não no antigo): texto → URL da fonte. */
function citacoesIntroduzidas(rev, registo) {
  const out = new Map();
  for (const s of rev.substituicoes || []) {
    if (!s.fonte) continue;
    const antes = new Set(s.de.split("\n").flatMap((l) => citacoesDaLinha(l, registo).map((c) => c.texto)));
    for (const l of s.para.split("\n")) for (const c of citacoesDaLinha(l, registo)) if (!antes.has(c.texto) && !out.has(c.texto)) out.set(c.texto, s.fonte);
  }
  return out;
}

function veredictoTexto(rev) {
  const n = (rev.substituicoes || []).length;
  if (rev.veredicto === "ok") return "sem correções de fundo";
  if (rev.veredicto === "rever de raiz") return `a rever de raiz: ${n} correções, mas há pontos que a revisão técnica não corrigiu com segurança`;
  return `corrigida (${n} ${n === 1 ? "correção" : "correções"} com fonte)`;
}

/** assets/fichas/revisao-tecnica.md: o que mudou em cada ficha revista, com as fontes, para o advogado confirmar. */
function relatorioRevisao(correcoes, entradas) {
  const curto = (s, n = 400) => {
    const t = s.replace(/\s+/g, " ").trim();
    return t.length > n ? `${t.slice(0, n - 1)}…` : t;
  };
  const cods = Object.keys(correcoes).sort((a, b) => a.localeCompare(b, "pt", { numeric: true }));
  const conta = (v) => cods.filter((c) => correcoes[c].veredicto === v).length;
  const linhas = [
    "# Revisão técnica das fichas",
    "",
    "> **Âmbito:** nacional e UE · gerado por `mcp-server/scripts/importar-fichas.mjs` a partir de `correcoes-conteudo.json`; não editar à mão.",
    "",
    `Revisão técnica de ${cods.length} fichas: ${conta("corrigida")} corrigidas, ${conta("rever de raiz")} a rever de raiz e ${conta("ok")} sem correções de fundo.`,
    "",
    "- **O que se reviu:** o regime, os prazos, as entidades e o que cada norma diz. Os números dos artigos já tinham sido revistos antes (`revisao-citacoes.json`).",
    "- **Fontes:** cada correção foi confirmada na fonte oficial indicada (PGDL, Diário da República, Portal das Finanças, EUR-Lex).",
    "- **Falta o advogado:** confirmar os pontos de cada ficha e assinar a revisão na tabela da amostra (`.specs/juridico-pt-v3-1-fichas/quickstart.md`). Sem essa confirmação, a revisão é técnica e não substitui a de quem assina.",
    "",
    "| Ficha | Veredicto | Correções | Pontos para o advogado |",
    "|---|---|---|---|",
    ...cods.map((c) => {
      const r = correcoes[c];
      return `| [${c}](#${c.toLowerCase()}) | ${r.veredicto} | ${(r.substituicoes || []).length} | ${(r.pontos_para_o_advogado || []).length} |`;
    }),
    "",
  ];
  for (const c of cods) {
    const r = correcoes[c];
    const e = entradas.find((x) => x.codigo === c);
    linhas.push(
      `## ${c}`,
      "",
      `**${e?.titulo ?? c}** · ficheiro \`${e?.ficheiro ?? "?"}\` · revista a ${r.revisto_em} · **${r.veredicto}**`,
      "",
      r.resumo,
      "",
    );
    if ((r.substituicoes || []).length) {
      linhas.push("### Correções", "");
      (r.substituicoes || []).forEach((s, i) => {
        linhas.push(
          `${i + 1}. **${s.motivo}**${s.fonte ? ` — [fonte](${s.fonte})` : ""}`,
          `   - Antes: «${curto(s.de)}»`,
          `   - Depois: «${curto(s.para)}»`,
        );
      });
      linhas.push("");
    }
    if ((r.pontos_para_o_advogado || []).length) linhas.push("### Para o advogado confirmar", "", ...r.pontos_para_o_advogado.map((p) => `- [ ] ${p}`), "");
    if ((r.fontes || []).length) linhas.push(`Fontes consultadas: ${r.fontes.map((u, i) => `[${i + 1}](${u})`).join(" · ")}`, "");
  }
  return linhas.join("\n");
}

/** Escreve (ou compara) os ficheiros gerados. Na escrita, apaga fichas antigas que já não são geradas. */
export function aplicar(res, { check = false } = {}) {
  const diferencas = [];
  for (const [rel, conteudo] of res.ficheiros) {
    const f = join(res.dirFichas, rel);
    const atual = existsSync(f) ? readFileSync(f, "utf8") : null;
    if (atual !== conteudo) {
      diferencas.push(rel);
      if (!check) { mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, conteudo); }
    }
  }
  // Fichas a mais (geradas antes, já não geradas)
  if (existsSync(res.dirFichas)) {
    for (const pasta of readdirSync(res.dirFichas)) {
      const d = join(res.dirFichas, pasta);
      if (!statSync(d).isDirectory()) continue;
      for (const f of readdirSync(d)) {
        const rel = join(pasta, f);
        if ((/^[A-Z]+-\d+-.*\.md$/.test(f) || f === "_INDICE.md") && !res.ficheiros.has(rel)) {
          diferencas.push(`${rel} (a mais)`);
          if (!check) rmSync(join(d, f));
        }
      }
    }
  }
  return diferencas;
}

function main(argv) {
  const arg = (n) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null);
  const origem = arg("--origem");
  if (!origem) { console.error("Uso: importar-fichas.mjs --origem <pasta do kit> [--skill <raiz>] [--check]"); process.exit(2); }
  const check = argv.includes("--check");
  let res;
  try {
    res = importar({ origem: resolve(origem), skill: resolve(arg("--skill") || SKILL_PADRAO) });
  } catch (e) {
    console.error(`ERRO: ${e.message}`);
    process.exit(1);
  }
  const dif = aplicar(res, { check });
  const fichas = res.entradas.filter((e) => e.ficheiro).length;
  if (check) {
    if (dif.length) { console.error(`Desatualizado (${dif.length}): ${dif.slice(0, 15).join(", ")}${dif.length > 15 ? " …" : ""}`); process.exit(1); }
    console.log(`OK: ${fichas} fichas em dia.`);
    return;
  }
  console.log(`OK: ${fichas} fichas, ${res.entradas.length - fichas} remissões, ${res.citacoes.length} citações; ${dif.length} ficheiros escritos ou apagados.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));
