#!/usr/bin/env node
// Epígrafes oficiais dos diplomas mais citados nas fichas (skills/juridico-pt/references/epigrafes/<sigla>.json).
// Servem ao importar-fichas.mjs para conferir citações e ao verificador-citacoes como primeira consulta.
// Fontes: PGDL (pgdlisboa.pt, lista de artigos com epígrafe), Portal das Finanças (índices do CIRC e do CIRS)
// e Serviço de Publicações da UE (Cellar, XHTML do RGPD e do TFUE). Sem dependências (Node >= 18).
//
//   node mcp-server/scripts/gerar-epigrafes.mjs --atualizar            # descarrega todos (rede)
//   node mcp-server/scripts/gerar-epigrafes.mjs --atualizar --so CT,CC # só alguns
//   node mcp-server/scripts/gerar-epigrafes.mjs --revogados [--so CPP] # só a lista dos artigos revogados (rede)
//   node mcp-server/scripts/gerar-epigrafes.mjs --check                # verifica os ficheiros versionados
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const DESTINO = resolve(here, "..", "..", "skills", "juridico-pt", "references", "epigrafes");
const PGDL = (nid) => `https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=${nid}&tabela=leis&pagina=1&ficha=1&so_miolo=&nversao=`;
const PF = (cod) => `https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/${cod}`;
const CELLAR = (celex) => `https://publications.europa.eu/resource/celex/${celex}`;

/**
 * Os 25 diplomas mais citados no catálogo de fichas. `nomes` são as formas por extenso que aparecem nas fichas
 * e no índice de normas conferidas (o importador usa-as para reconhecer o diploma e cruzar com o índice).
 */
export const DIPLOMAS = [
  { sigla: "CC", diploma: "Código Civil (Decreto-Lei n.º 47344/66)", fonte: "PGDL", url: PGDL(775), nomes: ["Código Civil"] },
  { sigla: "RGPD", diploma: "Regulamento (UE) 2016/679 (Regulamento Geral sobre a Proteção de Dados)", fonte: "Serviço de Publicações da UE (Cellar)", url: CELLAR("32016R0679"), nomes: ["Regulamento (UE) 2016/679", "Regulamento Geral sobre a Proteção de Dados", "GDPR"] },
  { sigla: "CIRE", diploma: "Código da Insolvência e da Recuperação de Empresas (Decreto-Lei n.º 53/2004)", fonte: "PGDL", url: PGDL(85), nomes: ["Código da Insolvência e da Recuperação de Empresas"] },
  { sigla: "CPC", diploma: "Código de Processo Civil (Lei n.º 41/2013)", fonte: "PGDL", url: PGDL(1959), nomes: ["Código de Processo Civil"] },
  { sigla: "CT", diploma: "Código do Trabalho (Lei n.º 7/2009)", fonte: "PGDL", url: PGDL(1047), nomes: ["Código do Trabalho"] },
  { sigla: "CP", diploma: "Código Penal (Decreto-Lei n.º 48/95)", fonte: "PGDL", url: PGDL(109), nomes: ["Código Penal"] },
  { sigla: "CPP", diploma: "Código de Processo Penal (Decreto-Lei n.º 78/87)", fonte: "PGDL", url: PGDL(199), nomes: ["Código de Processo Penal"] },
  { sigla: "CSC", diploma: "Código das Sociedades Comerciais (Decreto-Lei n.º 262/86)", fonte: "PGDL", url: PGDL(524), nomes: ["Código das Sociedades Comerciais"] },
  { sigla: "RJUE", diploma: "Regime Jurídico da Urbanização e Edificação (Decreto-Lei n.º 555/99)", fonte: "PGDL", url: PGDL(625), nomes: ["Regime Jurídico da Urbanização e Edificação"] },
  { sigla: "CPTA", diploma: "Código de Processo nos Tribunais Administrativos (Lei n.º 15/2002)", fonte: "PGDL", url: PGDL(439), nomes: ["Código de Processo nos Tribunais Administrativos"] },
  { sigla: "TFUE", diploma: "Tratado sobre o Funcionamento da União Europeia (versão consolidada de 2016)", fonte: "Serviço de Publicações da UE (Cellar)", url: CELLAR("12016E%2FTXT"), nomes: ["Tratado sobre o Funcionamento da União Europeia"], nota: "O TFUE quase não tem epígrafes: guarda-se a primeira frase de cada artigo como assunto." },
  { sigla: "CPI", diploma: "Código da Propriedade Industrial (Decreto-Lei n.º 110/2018)", fonte: "PGDL", url: PGDL(2979), nomes: ["Código da Propriedade Industrial"] },
  { sigla: "CPA", diploma: "Código do Procedimento Administrativo (Decreto-Lei n.º 4/2015)", fonte: "PGDL", url: PGDL(2248), nomes: ["Código do Procedimento Administrativo"] },
  { sigla: "LGT", diploma: "Lei Geral Tributária (Decreto-Lei n.º 398/98)", fonte: "PGDL", url: PGDL(253), nomes: ["Lei Geral Tributária"] },
  { sigla: "CCP", diploma: "Código dos Contratos Públicos (Decreto-Lei n.º 18/2008)", fonte: "PGDL", url: PGDL(2063), nomes: ["Código dos Contratos Públicos"] },
  { sigla: "CPPT", diploma: "Código de Procedimento e de Processo Tributário (Decreto-Lei n.º 433/99)", fonte: "PGDL", url: PGDL(256), nomes: ["Código de Procedimento e de Processo Tributário"] },
  { sigla: "RGCO", diploma: "Regime Geral das Contraordenações (Decreto-Lei n.º 433/82)", fonte: "PGDL", url: PGDL(166), nomes: ["Regime Geral das Contraordenações", "Regime Geral das Contra-Ordenações", "Ilícito de Mera Ordenação Social"] },
  { sigla: "CDADC", diploma: "Código do Direito de Autor e dos Direitos Conexos (Decreto-Lei n.º 63/85)", fonte: "PGDL", url: PGDL(484), nomes: ["Código do Direito de Autor e dos Direitos Conexos"] },
  { sigla: "CIRC", diploma: "Código do IRC (Decreto-Lei n.º 442-B/88)", fonte: "Portal das Finanças", url: PF("CIRC_2R/Pages/circ-codigo-do-irc-indice.aspx"), nomes: ["Código do IRC", "Código do Imposto sobre o Rendimento das Pessoas Coletivas"] },
  { sigla: "CRP", diploma: "Constituição da República Portuguesa", fonte: "PGDL", url: PGDL(4), nomes: ["Constituição da República Portuguesa", "Constituição"] },
  { sigla: "CIRS", diploma: "Código do IRS (Decreto-Lei n.º 442-A/88)", fonte: "Portal das Finanças", url: PF("cirs_rep/Pages/codigo-do-irs-indice.aspx"), nomes: ["Código do IRS", "Código do Imposto sobre o Rendimento das Pessoas Singulares"] },
  { sigla: "RGIT", diploma: "Regime Geral das Infrações Tributárias (Lei n.º 15/2001)", fonte: "PGDL", url: PGDL(259), nomes: ["Regime Geral das Infrações Tributárias"] },
  { sigla: "CE", diploma: "Código das Expropriações (Lei n.º 168/99)", fonte: "PGDL", url: PGDL(477), nomes: ["Código das Expropriações"] },
  { sigla: "CIMI", diploma: "Código do Imposto Municipal sobre Imóveis (Decreto-Lei n.º 287/2003)", fonte: "Portal das Finanças", url: PF("cimi/Pages/codigo-do-imi-indice.aspx"), nomes: ["Código do Imposto Municipal sobre Imóveis", "Código do IMI"] },
  { sigla: "LAV", diploma: "Lei da Arbitragem Voluntária (Lei n.º 63/2011)", fonte: "PGDL", url: PGDL(1579), nomes: ["Lei da Arbitragem Voluntária"] },
];

const entidades = (s) =>
  s.replace(/&#160;|&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const limpo = (s) => entidades(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const chave = (n, letra) => (letra ? `${Number(n)}-${letra.toUpperCase()}` : String(Number(n)));

/**
 * PGDL: <option value="1047A0153">Artigo 153.º<br> Forma e conteúdo …</option>. Variantes: "ARTIGO" (Código Civil),
 * nota antes do <br> ("Artigo 1.º (art.º 1.º CPC 1961)<br>") e epígrafe entre parênteses ("(Desvios)").
 */
export function lerPgdl(html) {
  const out = {};
  // O "º" e o <br> às vezes faltam ("Artigo 394<br>", "Artigo 167.<br>", "Artigo 243.º</option>" sem epígrafe).
  for (const m of html.matchAll(/<option value="\d+A\d+[A-Z]?">\s*Artigo\s+(\d+)\.?\s*º?(?:\s*-\s*([A-Z]))?[^<]*(?:<br>([\s\S]*?))?<\/option>/gi)) {
    const k = chave(m[1], m[2]);
    // Notas da PGDL em itálico no fim ("- [A redação introduzida pela Lei 8/2022…]") não fazem parte da epígrafe.
    const sem = (m[3] ?? "").replace(/\s*-\s*<i>\s*\[[\s\S]*?\]\s*<\/i>\s*$/i, "");
    // Entre parênteses, às vezes sem o de fecho ("(Conteúdo das responsabilidades parentais").
    let ep = limpo(sem).trim();
    if (ep.startsWith("(")) ep = ep.slice(1).replace(/\)$/, "").trim();
    if (!out[k]) out[k] = ep || "(sem epígrafe)";
  }
  return out;
}

/**
 * PGDL, texto dos artigos (página de ~100, a partir da entrada `ficha` da lista): "Artigo 315.º Contestação e rol de
 * testemunhas (Revogado.)" ou "[Revogado]." (RJUE). A lista de epígrafes não marca os revogados; o texto marca. Só conta como cabeçalho o
 * "Artigo N.º" seguido da epígrafe da lista (o decreto que aprova o código também tem artigos 1.º, 2.º…), e vale o último.
 */
export function lerRevogadosPgdl(html, epigrafes) {
  const i = html.lastIndexOf("</option>");
  const t = limpo(i >= 0 ? html.slice(i) : html);
  const igual = (a, b) => a.toLowerCase().startsWith(b.toLowerCase());
  const vistos = new Set();
  const revogados = new Set();
  // "ARTIGO 4.º" na CRP; nota antes da epígrafe no CPC ("Artigo 99.º (art.º 105.º CPC 1961) Efeito da …").
  for (const m of t.matchAll(/\bArtigo\s+(\d+)\.?\s*º(?:\s*-\s*([A-Z]))?\s*(?:\(art\.?º?[^)]{0,40}\)\s*)?/gi)) {
    const k = chave(m[1], m[2]);
    const ep = epigrafes[k];
    if (ep === undefined) continue;
    let resto = t.slice(m.index + m[0].length, m.index + m[0].length + ep.length + 80);
    if (ep !== "(sem epígrafe)") {
      const p = resto.startsWith("(") && !ep.startsWith("(") ? resto.slice(1) : resto;
      if (!igual(p, ep)) continue;
      resto = p.slice(ep.length).replace(/^\s*\)/, "");
    }
    vistos.add(k);
    if (/^\s*[([]?\s*revogad[oa]\b/i.test(resto)) revogados.add(k);
    else revogados.delete(k);
  }
  return { vistos, revogados };
}

/** Portal das Finanças: <td>Artigo 87.º</td> … <a href="…">Taxas</a>; os revogados têm "[Revogado]" a seguir à ligação ou "(Revogado)" nela. */
export const lerPortalFinancas = (html) => indicePortalFinancas(html).artigos;
export const revogadosPortalFinancas = (html) => [...indicePortalFinancas(html).revogados];

function indicePortalFinancas(html) {
  const out = {};
  const revogados = new Set();
  for (const m of html.matchAll(/Artigo(?:\s|&#160;)*(\d+)(?:\s|&#160;)*\.?\s*º(?:\s*-\s*([A-Z]))?[\s\S]{0,500}?<a [^>]*>([\s\S]*?)<\/a>/g)) {
    const k = chave(m[1], m[2]);
    if (out[k]) continue;
    out[k] = limpo(m[3]).replace(/\s*\[Revogado\]\s*$/i, "") || "(sem epígrafe)";
  }
  // Segunda leitura, linha a linha, só para as falhas da primeira: o índice parte às vezes o número com
  // marcação ("Artigo 17<a …></a>.º", "<font>Artig</font><font>o</font> 68.º").
  for (const tr of html.split(/<tr\b[^>]*>/i).slice(1)) {
    const celulas = tr.split(/<\/td>/i);
    const primeira = entidades((celulas[0] ?? "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
    const m = /^Artigo\s*(\d+)\s*\.?\s*º(?:\s*-\s*([A-Z]))?/.exec(primeira);
    if (!m) continue;
    const k = chave(m[1], m[2]);
    if (/\[Revogado\]|^\(?\s*Revogad[oa]\s*\.?\s*\)?$/i.test(limpo(celulas[1] ?? ""))) revogados.add(k);
    if (out[k] && out[k] !== "(sem epígrafe)") continue;
    const ligacoes = [...(celulas[1] ?? "").matchAll(/<a [^>]*>([\s\S]*?)<\/a>/g)].map((x) => limpo(x[1])).filter(Boolean);
    const ep = (ligacoes[0] ?? "").replace(/\s*\[Revogado\]\s*$/i, "");
    if (ep || !out[k]) out[k] = ep || "(sem epígrafe)";
  }
  for (const [k, ep] of Object.entries(out)) if (/^\(?\s*Revogad[oa]\b/i.test(ep)) revogados.add(k);
  return { artigos: out, revogados };
}

/** XHTML do Serviço de Publicações da UE: título do artigo (oj-sti-art) ou, sem ele, a primeira frase. */
export function lerUE(html) {
  const out = {};
  const partes = html.split(/<p[^>]*class="(?:oj-)?ti-art"[^>]*>/).slice(1);
  for (const p of partes) {
    const m = /^\s*Artigo\s+(\d+)\.?\s*(?:<span[^>]*>\s*o\s*<\/span>|º|o)(?:\s*-\s*([A-Z]))?/.exec(p);
    if (!m) continue;
    const k = chave(m[1], m[2]);
    const sti = /class="(?:oj-)?sti-art"[^>]*>([\s\S]*?)<\/p>/.exec(p.slice(0, 1500));
    let txt = sti ? limpo(sti[1]) : "";
    // No TFUE o subtítulo é a correspondência antiga ("(ex-artigo 81.º TCE)"), não uma epígrafe.
    if (/^\(ex-/i.test(txt)) txt = "";
    if (!txt) {
      const par = /<p[^>]*class="(?:oj-)?normal"[^>]*>([\s\S]*?)<\/p>/.exec(p);
      txt = par ? limpo(par[1]).replace(/^\d+\.\s*/, "").slice(0, 160) : "";
    }
    if (!out[k]) out[k] = txt || "(sem epígrafe)";
  }
  return out;
}

async function obter(d, url) {
  const ue = url.includes("publications.europa.eu");
  const res = await fetch(url, {
    headers: ue ? { Accept: "application/xhtml+xml", "Accept-Language": "por" } : { "User-Agent": "Mozilla/5.0 (juridico-pt; gerar-epigrafes)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${d.sigla}: HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  return d.fonte === "PGDL" ? new TextDecoder("latin1").decode(buf) : new TextDecoder("utf-8").decode(buf);
}

async function descarregar(d) {
  const html = await obter(d, d.url);
  const artigos = d.fonte === "PGDL" ? lerPgdl(html) : d.fonte === "Portal das Finanças" ? lerPortalFinancas(html) : lerUE(html);
  if (Object.keys(artigos).length < 10) throw new Error(`${d.sigla}: só ${Object.keys(artigos).length} artigos lidos`);
  return { artigos, revogados: await revogadosDe(d, artigos, html) };
}

/** Artigos revogados: na PGDL lê o texto de todos os artigos, ~100 por página; no Portal das Finanças vem no índice. */
async function revogadosDe(d, artigos, html) {
  if (d.fonte === "Portal das Finanças") return ordenarChaves(revogadosPortalFinancas(html ?? (await obter(d, d.url))));
  if (d.fonte !== "PGDL") return [];
  const vistos = new Set();
  const revogados = new Set();
  const n = Object.keys(artigos).length;
  // A página começa na entrada `ficha` da lista; as do decreto preambular contam, por isso vai-se até n + 100.
  for (let ficha = 1; ficha <= n + 100; ficha += 100) {
    const r = lerRevogadosPgdl(await obter(d, d.url.replace("ficha=1", `ficha=${ficha}`)), artigos);
    for (const k of r.vistos) { vistos.add(k); revogados.delete(k); }
    for (const k of r.revogados) revogados.add(k);
    await new Promise((ok) => setTimeout(ok, 300));
  }
  const faltam = Object.keys(artigos).filter((k) => !vistos.has(k));
  if (faltam.length > n / 20) throw new Error(`${d.sigla}: texto de ${faltam.length} artigos não lido (ex.: ${faltam.slice(0, 5).join(", ")})`);
  return ordenarChaves(revogados);
}

const ordenarChaves = (ks) => [...ks].sort((a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b));
const ordenar = (artigos) => Object.fromEntries(ordenarChaves(Object.keys(artigos)).map((k) => [k, artigos[k]]));

/** Lê os ficheiros versionados (o importador e os testes usam isto). */
export function lerEpigrafes(dir = DESTINO) {
  const out = {};
  for (const d of DIPLOMAS) {
    const f = join(dir, `${d.sigla}.json`);
    if (existsSync(f)) out[d.sigla] = JSON.parse(readFileSync(f, "utf8"));
  }
  return out;
}

async function main(argv) {
  const so = argv.includes("--so") ? argv[argv.indexOf("--so") + 1].split(",") : null;
  // --revogados: só a lista dos revogados, sem mexer nas epígrafes (que se atualizam em janeiro com --atualizar).
  const soRevogados = argv.includes("--revogados");
  if (argv.includes("--atualizar") || soRevogados) {
    mkdirSync(DESTINO, { recursive: true });
    const hoje = new Date().toISOString().slice(0, 10);
    let falhas = 0;
    for (const d of DIPLOMAS.filter((x) => !so || so.includes(x.sigla))) {
      try {
        const f = join(DESTINO, `${d.sigla}.json`);
        const atual = soRevogados ? JSON.parse(readFileSync(f, "utf8")) : null;
        const lido = soRevogados ? { artigos: atual.artigos, revogados: await revogadosDe(d, atual.artigos) } : await descarregar(d);
        const artigos = ordenar(lido.artigos);
        const { nomes, ...meta } = d;
        const obtido_em = soRevogados ? atual.obtido_em : hoje;
        writeFileSync(f, JSON.stringify({ ...meta, nomes, obtido_em, revogados_obtido_em: hoje, revogados: lido.revogados, artigos }, null, 1) + "\n");
        console.log(`OK: ${d.sigla} — ${Object.keys(artigos).length} artigos, ${lido.revogados.length} revogados`);
      } catch (e) {
        falhas++;
        console.error(`ERRO: ${e.message}`);
      }
    }
    process.exit(falhas ? 1 : 0);
  }
  // --check (ou sem argumentos): os 25 ficheiros existem e têm os campos.
  const faltas = [];
  for (const d of DIPLOMAS) {
    const f = join(DESTINO, `${d.sigla}.json`);
    if (!existsSync(f)) { faltas.push(`${d.sigla}: falta`); continue; }
    const e = JSON.parse(readFileSync(f, "utf8"));
    for (const k of ["sigla", "diploma", "fonte", "url", "obtido_em", "artigos"]) if (!e[k]) faltas.push(`${d.sigla}: sem ${k}`);
  }
  if (faltas.length) { console.error(faltas.join("\n")); process.exit(1); }
  console.log(`OK: epígrafes de ${DIPLOMAS.length} diplomas.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main(process.argv.slice(2));
