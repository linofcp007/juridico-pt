// Markdown (subconjunto) -> .docx (OOXML), sem dependências: títulos (#, ##, ###), parágrafos com as
// quebras de linha do texto, listas (-, *, 1.), caixas [ ], citações (>), tabelas (| a | b |), negrito
// e itálico. O que estiver fora do subconjunto passa a texto simples; o ficheiro é sempre válido.
// Os comentários HTML (cabeçalhos dos templates) e a secção "Antes de enviar — verificar" não entram.
// Também gera o .docx forense da Marcação Redator (gerarDocxRedator, no fim do ficheiro).
// Puro: devolve os bytes do ZIP (zip.ts).
import { criarZip } from "./zip.js";
import type { Bloco, DocumentoRedator } from "./marcacao.js";

const NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';

/** Escapa texto para XML e retira caracteres de controlo inválidos em XML 1.0. */
function xml(s: string): string {
  return s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface Run {
  texto: string;
  negrito?: boolean;
  italico?: boolean;
}

/** Negrito (**x** ou __x__), itálico (*x* ou _x_) e código (`x`, como texto). */
function inline(texto: string): Run[] {
  const runs: Run[] = [];
  const re = /\*\*(.+?)\*\*|__(.+?)__|(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])|(?<![\w])_(?!\s)(.+?)(?<!\s)_(?![\w])|`([^`]+)`/g;
  let ultimo = 0;
  for (const m of texto.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > ultimo) runs.push({ texto: texto.slice(ultimo, i) });
    if (m[1] !== undefined || m[2] !== undefined) {
      for (const r of inline(m[1] ?? m[2] ?? "")) runs.push({ ...r, negrito: true });
    } else if (m[3] !== undefined || m[4] !== undefined) {
      for (const r of inline(m[3] ?? m[4] ?? "")) runs.push({ ...r, italico: true });
    } else runs.push({ texto: m[5] ?? "" });
    ultimo = i + m[0].length;
  }
  if (ultimo < texto.length) runs.push({ texto: texto.slice(ultimo) });
  return runs.filter((r) => r.texto !== "");
}

function runsXml(linhas: string[]): string {
  const out: string[] = [];
  linhas.forEach((linha, n) => {
    if (n > 0) out.push("<w:r><w:br/></w:r>");
    for (const r of inline(linha)) {
      const props = (r.negrito ? "<w:b/>" : "") + (r.italico ? "<w:i/>" : "");
      out.push(`<w:r>${props ? `<w:rPr>${props}</w:rPr>` : ""}<w:t xml:space="preserve">${xml(r.texto)}</w:t></w:r>`);
    }
  });
  return out.join("");
}

function paragrafo(linhas: string[], opts: { estilo?: string; recuo?: number; prefixo?: string } = {}): string {
  const pPr =
    (opts.estilo ? `<w:pStyle w:val="${opts.estilo}"/>` : "") +
    (opts.recuo ? `<w:ind w:left="${opts.recuo}" w:hanging="284"/>` : "");
  const conteudo = opts.prefixo ? [opts.prefixo + (linhas[0] ?? ""), ...linhas.slice(1)] : linhas;
  return `<w:p>${pPr ? `<w:pPr>${pPr}</w:pPr>` : ""}${runsXml(conteudo)}</w:p>`;
}

function celulas(linha: string): string[] {
  return linha.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function tabela(linhas: string[]): string {
  const linhasDados = linhas.filter((l) => !/^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l));
  const rows = linhasDados.map(celulas);
  if (rows.length === 0) return "";
  const ncol = Math.max(1, ...rows.map((r) => r.length));
  const borda = (lado: string) => `<w:${lado} w:val="single" w:sz="4" w:space="0" w:color="808080"/>`;
  const tblPr =
    `<w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${["top", "left", "bottom", "right", "insideH", "insideV"]
      .map(borda)
      .join("")}</w:tblBorders></w:tblPr>`;
  const grid = `<w:tblGrid>${Array.from({ length: ncol }, () => `<w:gridCol w:w="${Math.floor(9000 / ncol)}"/>`).join("")}</w:tblGrid>`;
  const trs = rows
    .map((r, i) => {
      const tcs = Array.from({ length: ncol }, (_, c) => {
        const t = r[c] ?? "";
        return `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/></w:tcPr>${paragrafo([i === 0 && t ? `**${t.replace(/\*\*/g, "")}**` : t])}</w:tc>`;
      });
      return `<w:tr>${tcs.join("")}</w:tr>`;
    })
    .join("");
  return `<w:tbl>${tblPr}${grid}${trs}</w:tbl><w:p/>`;
}

/** Retira comentários HTML e a secção "Antes de enviar — verificar" (até ao próximo título do mesmo nível ou superior). */
export function limparMarkdown(md: string): string {
  const semComentarios = md.replace(/\r\n?/g, "\n").replace(/<!--[\s\S]*?-->/g, "");
  const out: string[] = [];
  let corte: number | null = null;
  for (const linha of semComentarios.split("\n")) {
    const h = /^(#{1,6})\s+(.*)$/.exec(linha);
    if (corte !== null) {
      if (h && h[1].length <= corte) corte = null;
      else continue;
    }
    if (h && /^Antes de enviar\b/i.test(h[2].trim())) {
      corte = h[1].length;
      continue;
    }
    out.push(linha);
  }
  return out.join("\n");
}

function corpo(md: string): string {
  const linhas = limparMarkdown(md).split("\n");
  const blocos: string[] = [];
  let par: string[] = [];
  const fechar = () => {
    if (par.length) blocos.push(paragrafo(par));
    par = [];
  };
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].replace(/\s+$/, "");
    if (!linha.trim()) {
      fechar();
      continue;
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(linha);
    if (h) {
      fechar();
      blocos.push(paragrafo([h[2].replace(/\s+#+\s*$/, "")], { estilo: `Heading${Math.min(3, h[1].length)}` }));
      continue;
    }
    if (/^\s*\|/.test(linha)) {
      fechar();
      const t: string[] = [];
      while (i < linhas.length && /^\s*\|/.test(linhas[i])) t.push(linhas[i++]);
      i--;
      blocos.push(tabela(t));
      continue;
    }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(linha)) {
      fechar();
      blocos.push("<w:p/>");
      continue;
    }
    const li = /^(\s*)[-*+]\s+(?:\[([ xX])\]\s+)?(.*)$/.exec(linha);
    if (li) {
      fechar();
      const nivel = Math.min(4, Math.floor(li[1].replace(/\t/g, "  ").length / 2));
      const prefixo = li[2] === undefined ? "• " : li[2] === " " ? "☐ " : "☒ ";
      blocos.push(paragrafo([li[3]], { recuo: 567 + nivel * 425, prefixo }));
      continue;
    }
    const ol = /^(\s*)(\d{1,3})[.)]\s+(.*)$/.exec(linha);
    if (ol) {
      fechar();
      const nivel = Math.min(4, Math.floor(ol[1].length / 2));
      blocos.push(paragrafo([ol[3]], { recuo: 567 + nivel * 425, prefixo: `${ol[2]}. ` }));
      continue;
    }
    const q = /^\s*>\s?(.*)$/.exec(linha);
    if (q) {
      fechar();
      blocos.push(paragrafo([q[1]], { estilo: "Quote" }));
      continue;
    }
    par.push(linha.trim());
  }
  fechar();
  return blocos.join("");
}

const ESTILOS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles ${NS}>
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri" w:eastAsia="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="pt-PT"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/><w:jc w:val="both"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="120"/><w:jc w:val="left"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="200" w:after="100"/><w:jc w:val="left"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="160" w:after="80"/><w:jc w:val="left"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:sz w:val="23"/><w:szCs w:val="23"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="567"/></w:pPr><w:rPr><w:i/></w:rPr></w:style>
</w:styles>`;

const TIPOS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
</Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
</Relationships>`;

const DOC_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

function core(titulo: string, quando: Date): string {
  const t = quando.toISOString().replace(/\.\d{3}Z$/, "Z");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:title>${xml(titulo)}</dc:title><dc:creator>juridico-pt</dc:creator>
<dcterms:created xsi:type="dcterms:W3CDTF">${t}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${t}</dcterms:modified>
</cp:coreProperties>`;
}

/** Converte Markdown num .docx (bytes). */
export function gerarDocx(md: string, opts: { titulo?: string; quando?: Date } = {}): Uint8Array {
  const quando = opts.quando ?? new Date();
  const titulo = opts.titulo ?? (/^#\s+(.+)$/m.exec(limparMarkdown(md))?.[1] ?? "Documento").trim();
  const documento =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document ${NS}><w:body>${corpo(md)}` +
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1418" w:right="1418" w:bottom="1418" w:left="1418" w:header="709" w:footer="709" w:gutter="0"/></w:sectPr>` +
    `</w:body></w:document>`;
  return criarZip(
    [
      { nome: "[Content_Types].xml", dados: TIPOS },
      { nome: "_rels/.rels", dados: RELS },
      { nome: "docProps/core.xml", dados: core(titulo, quando) },
      { nome: "word/document.xml", dados: documento },
      { nome: "word/styles.xml", dados: ESTILOS },
      { nome: "word/_rels/document.xml.rels", dados: DOC_RELS },
    ],
    quando
  );
}

// ---------------------------------------------------------------------------------------------
// Marcação Redator -> .docx forense (perfis jurídico e contabilístico). O lado Python
// (skills/juridico-pt/scripts/gerar_docx.py) gera o mesmo word/document.xml: qualquer mudança
// aqui muda lá e na fixture mcp-server/test/fixtures/redator/esperado/juridico.document.xml.
// ---------------------------------------------------------------------------------------------

const NS_R = 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';

interface PerfilFormato {
  fonte: string;
  tamanho: number; // meios-pontos
  titulo: number;
  margens: { top: number; right: number; bottom: number; left: number }; // twips
  linha: number; // 240 = simples
  data: "right" | "left";
}

const PERFIS_FORMATO: Record<DocumentoRedator["perfil"], PerfilFormato> = {
  juridico: { fonte: "Times New Roman", tamanho: 24, titulo: 24, margens: { top: 1701, right: 1134, bottom: 1134, left: 1701 }, linha: 360, data: "right" },
  contabil: { fonte: "Arial", tamanho: 22, titulo: 24, margens: { top: 1418, right: 1418, bottom: 1418, left: 1418 }, linha: 276, data: "left" },
};
const TIPOS_COM_RECUO = ["peticao", "parecer"];
const RECUO = 709; // 1,25 cm
const RECUO_CITACAO = 2268; // 4 cm
const MIUDO = 20; // 10 pt: tabelas, notas, cabeçalho e rodapé
const LINHA_ASSINATURA = "_______________________";
const RE_INLINE = /(\[■[^\]]*\]|\*\*.+?\*\*|(?<![0-9A-Za-zÀ-ÿ_])_(?=[^\s_])[^_\n]+?(?<=[^\s_])_(?![0-9A-Za-zÀ-ÿ_]))/g;

interface Estilo {
  negrito?: boolean;
  italico?: boolean;
  tamanho?: number;
}

function runR(texto: string, e: Estilo & { realce?: boolean } = {}): string {
  const rPr =
    (e.negrito ? "<w:b/>" : "") +
    (e.italico ? "<w:i/>" : "") +
    (e.tamanho ? `<w:sz w:val="${e.tamanho}"/><w:szCs w:val="${e.tamanho}"/>` : "") +
    (e.realce ? '<w:highlight w:val="yellow"/>' : "");
  return `<w:r>${rPr ? `<w:rPr>${rPr}</w:rPr>` : ""}<w:t xml:space="preserve">${xml(texto)}</w:t></w:r>`;
}

/** Texto com **negrito**, _itálico_ e [■ …] (realce amarelo) em runs. */
function inlineR(texto: string, base: Estilo = {}): string {
  const out: string[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(RE_INLINE)) {
    const i = m.index ?? 0;
    if (i > ultimo) out.push(runR(texto.slice(ultimo, i), base));
    const t = m[0];
    if (t.startsWith("[■")) out.push(runR(t, { ...base, realce: true }));
    else if (t.startsWith("**")) out.push(runR(t.slice(2, -2), { ...base, negrito: true }));
    else out.push(runR(t.slice(1, -1), { ...base, italico: true }));
    ultimo = i + t.length;
  }
  if (ultimo < texto.length) out.push(runR(texto.slice(ultimo), base));
  return out.join("");
}

interface Paragrafo {
  jc?: "both" | "center" | "left" | "right";
  antes?: number;
  depois?: number;
  linha?: number;
  esquerda?: number;
  primeira?: number;
  manter?: boolean;
}

function pR(runs: string, o: Paragrafo = {}): string {
  const espaco =
    o.antes !== undefined || o.depois !== undefined || o.linha !== undefined
      ? `<w:spacing${o.antes !== undefined ? ` w:before="${o.antes}"` : ""}${o.depois !== undefined ? ` w:after="${o.depois}"` : ""}${o.linha !== undefined ? ` w:line="${o.linha}" w:lineRule="auto"` : ""}/>`
      : "";
  const ind =
    o.esquerda !== undefined || o.primeira !== undefined
      ? `<w:ind${o.esquerda !== undefined ? ` w:left="${o.esquerda}"` : ""}${o.primeira !== undefined ? ` w:firstLine="${o.primeira}"` : ""}/>`
      : "";
  const pPr = (o.manter ? "<w:keepNext/>" : "") + espaco + ind + (o.jc ? `<w:jc w:val="${o.jc}"/>` : "");
  return `<w:p>${pPr ? `<w:pPr>${pPr}</w:pPr>` : ""}${runs}</w:p>`;
}

/** Célula alinhada à direita: só números (com €, %, pontos e vírgulas) ou que começa/acaba em €. */
const numerica = (c: string) => /^[\s()€%\d.,+-]*\d[\s()€%\d.,+-]*$/.test(c) || /^€|€$/.test(c.trim());

function tabelaR(linhas: string[][], bordas: boolean): string {
  const ncol = Math.max(1, ...linhas.map((l) => l.length));
  const largura = Math.floor(9000 / ncol);
  const lados = ["top", "left", "bottom", "right", "insideH", "insideV"];
  const limites = bordas
    ? `<w:tblBorders>${lados.map((l) => `<w:${l} w:val="single" w:sz="4" w:space="0" w:color="808080"/>`).join("")}</w:tblBorders>`
    : `<w:tblBorders>${lados.map((l) => `<w:${l} w:val="nil"/>`).join("")}</w:tblBorders>`;
  const grid = `<w:tblGrid>${Array.from({ length: ncol }, () => `<w:gridCol w:w="${largura}"/>`).join("")}</w:tblGrid>`;
  const trs = linhas.map((r, i) => {
    const cabecalho = bordas && i === 0;
    const total = /^TOTAL\b/i.test(r[0] ?? "");
    const tcs = Array.from({ length: ncol }, (_, c) => {
      const t = r[c] ?? "";
      const jc = cabecalho ? "center" : c > 0 && numerica(t) ? "right" : "left";
      const sombra = cabecalho ? '<w:shd w:val="clear" w:color="auto" w:fill="D9D9D9"/>' : "";
      return `<w:tc><w:tcPr><w:tcW w:w="${largura}" w:type="dxa"/>${sombra}</w:tcPr>${pR(inlineR(t, { tamanho: MIUDO, negrito: cabecalho || total }), { jc, depois: 0 })}</w:tc>`;
    });
    return `<w:tr>${tcs.join("")}</w:tr>`;
  });
  return `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/>${limites}</w:tblPr>${grid}${trs.join("")}</w:tbl>`;
}

function assinaturasR(pares: Array<[string, string]>, tamanho?: number): string {
  const linhas: Array<Array<[string, string]>> = [];
  for (let i = 0; i < pares.length; i += 2) linhas.push(pares.slice(i, i + 2));
  const ncol = Math.min(2, Math.max(1, pares.length));
  const largura = Math.floor(9000 / ncol);
  const sem = ["top", "left", "bottom", "right", "insideH", "insideV"].map((l) => `<w:${l} w:val="nil"/>`).join("");
  const trs = linhas.map((par) => {
    const tcs = Array.from({ length: ncol }, (_, c) => {
      const p = par[c];
      const conteudo = p
        ? pR(runR(LINHA_ASSINATURA, { tamanho }), { jc: "center", antes: 480, depois: 0 }) +
          pR(inlineR(p[0], { negrito: true, tamanho }), { jc: "center", depois: 0 }) +
          (p[1] ? pR(inlineR(p[1], { tamanho }), { jc: "center", depois: 0 }) : "")
        : "<w:p/>";
      return `<w:tc><w:tcPr><w:tcW w:w="${largura}" w:type="dxa"/></w:tcPr>${conteudo}</w:tc>`;
    });
    return `<w:tr>${tcs.join("")}</w:tr>`;
  });
  const grid = `<w:tblGrid>${Array.from({ length: ncol }, () => `<w:gridCol w:w="${largura}"/>`).join("")}</w:tblGrid>`;
  return `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${sem}</w:tblBorders></w:tblPr>${grid}${trs.join("")}</w:tbl>`;
}

function blocoR(b: Bloco, f: PerfilFormato, recuo: boolean): string {
  const tituloTam = f.titulo !== f.tamanho ? f.titulo : undefined;
  switch (b.k) {
    case "corpo":
      return pR(inlineR(b.texto), { jc: "both", primeira: recuo ? RECUO : undefined });
    case "titulo":
      return pR(inlineR(b.texto.toUpperCase(), { negrito: true, tamanho: tituloTam }), { jc: "center", antes: 240, depois: 240, manter: true });
    case "subtitulo":
      return pR(inlineR(b.texto, { negrito: true }), { jc: "center", manter: true });
    case "enderecamento":
      return pR(inlineR(b.texto.toUpperCase(), { negrito: true }), { jc: "left", depois: 480 });
    case "secao":
    case "clausula":
      return pR(inlineR(b.texto.toUpperCase(), { negrito: true }), { jc: "left", antes: 240, manter: true });
    case "sub":
      return pR(runR(b.rotulo, { negrito: true }) + runR(" ") + inlineR(b.texto), { jc: "both" });
    case "alinea":
      return pR(inlineR(b.texto), { jc: "both", esquerda: RECUO, primeira: 0 });
    case "item":
      return pR(inlineR(`${b.n}. ${b.texto}`), { jc: "both", esquerda: RECUO, primeira: 0 });
    case "citacao":
      return pR(inlineR(b.texto, { tamanho: f.tamanho - 2 }), { jc: "both", esquerda: RECUO_CITACAO, antes: 120, depois: 120, linha: 240 });
    case "centro":
      return pR(inlineR(b.texto), { jc: "center" });
    case "direita":
      return pR(inlineR(b.texto), { jc: "right" });
    case "data":
      return pR(inlineR(b.texto), { jc: f.data, antes: 480 });
    case "nota":
      return pR(inlineR(b.texto, { italico: true, tamanho: MIUDO }), { jc: "left" });
    case "tabela":
      return tabelaR(b.linhas, b.bordas) + "<w:p/>";
    case "assinaturas":
      return assinaturasR(b.pares) + "<w:p/>";
    case "testemunhas":
      return pR(runR("TESTEMUNHAS:", { negrito: true }), { jc: "left", antes: 240 }) + assinaturasR(b.pares, f.tamanho - 2) + "<w:p/>";
    case "espaco":
      return "<w:p/>";
    case "quebra":
      return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
  }
}

function estilosR(f: PerfilFormato): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles ${NS}>
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="${f.fonte}" w:hAnsi="${f.fonte}" w:cs="${f.fonte}" w:eastAsia="${f.fonte}"/><w:color w:val="000000"/><w:sz w:val="${f.tamanho}"/><w:szCs w:val="${f.tamanho}"/><w:lang w:val="pt-PT"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="${f.linha}" w:lineRule="auto"/><w:jc w:val="both"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
</w:styles>`;
}

const RUN_CAMPO = (filho: string) => `<w:r><w:rPr><w:sz w:val="${MIUDO}"/><w:szCs w:val="${MIUDO}"/></w:rPr>${filho}</w:r>`;

function rodapeR(f: PerfilFormato, texto?: string): string {
  const largura = 11906 - f.margens.left - f.margens.right;
  const campo =
    RUN_CAMPO('<w:fldChar w:fldCharType="begin"/>') +
    RUN_CAMPO('<w:instrText xml:space="preserve"> PAGE </w:instrText>') +
    RUN_CAMPO('<w:fldChar w:fldCharType="separate"/>') +
    runR("1", { tamanho: MIUDO }) +
    RUN_CAMPO('<w:fldChar w:fldCharType="end"/>');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr ${NS} ${NS_R}><w:p><w:pPr><w:tabs><w:tab w:val="right" w:pos="${largura}"/></w:tabs><w:spacing w:after="0"/><w:jc w:val="left"/></w:pPr>${texto ? inlineR(texto, { tamanho: MIUDO }) : ""}<w:r><w:tab/></w:r>${campo}</w:p></w:ftr>`;
}

function cabecalhoR(texto: string): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr ${NS} ${NS_R}>${pR(inlineR(texto, { tamanho: MIUDO }), { jc: "center", depois: 0 })}</w:hdr>`;
}

/** word/document.xml da Marcação Redator (exportado para os testes de paridade com o Python). */
export function documentoXmlRedator(doc: DocumentoRedator): string {
  const f = PERFIS_FORMATO[doc.perfil];
  const recuo = doc.recuo ?? TIPOS_COM_RECUO.includes(doc.tipo);
  const corpoXml = doc.blocos.map((b) => blocoR(b, f, recuo)).join("");
  const m = f.margens;
  const sect =
    `<w:sectPr>${doc.cabecalho ? '<w:headerReference w:type="default" r:id="rId3"/>' : ""}<w:footerReference w:type="default" r:id="rId2"/>` +
    `<w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="${m.top}" w:right="${m.right}" w:bottom="${m.bottom}" w:left="${m.left}" w:header="709" w:footer="709" w:gutter="0"/></w:sectPr>`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document ${NS} ${NS_R}><w:body>${corpoXml}${sect}</w:body></w:document>`;
}

/** Converte um documento em Marcação Redator (já analisado) num .docx forense (bytes). */
export function gerarDocxRedator(doc: DocumentoRedator, opts: { titulo?: string; quando?: Date } = {}): Uint8Array {
  const quando = opts.quando ?? new Date();
  const f = PERFIS_FORMATO[doc.perfil];
  const primeiroTitulo = doc.blocos.find((b) => b.k === "titulo") as { texto: string } | undefined;
  const titulo = opts.titulo ?? primeiroTitulo?.texto ?? "Documento";
  const tipos = TIPOS.replace(
    "</Types>",
    '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>\n' +
      (doc.cabecalho ? '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>\n' : "") +
      "</Types>"
  );
  const rels =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>\n` +
    `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>\n` +
    (doc.cabecalho ? `<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>\n` : "") +
    `</Relationships>`;
  const entradas = [
    { nome: "[Content_Types].xml", dados: tipos },
    { nome: "_rels/.rels", dados: RELS },
    { nome: "docProps/core.xml", dados: core(titulo, quando) },
    { nome: "word/document.xml", dados: documentoXmlRedator(doc) },
    { nome: "word/styles.xml", dados: estilosR(f) },
    { nome: "word/footer1.xml", dados: rodapeR(f, doc.rodape) },
    { nome: "word/_rels/document.xml.rels", dados: rels },
  ];
  if (doc.cabecalho) entradas.push({ nome: "word/header1.xml", dados: cabecalhoR(doc.cabecalho) });
  return criarZip(entradas, quando);
}
