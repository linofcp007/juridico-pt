// Uso: node validar.mjs <lote> — confere revisao-<lote>.json antes da entrega.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const aqui = dirname(fileURLToPath(import.meta.url));
const lote = process.argv[2];
const LOTES = JSON.parse(readFileSync(join(aqui, "lotes.json"), "utf8"));
if (!LOTES[lote]) { console.error("lote desconhecido; lotes:", Object.keys(LOTES).join(", ")); process.exit(2); }
const f = join(aqui, `revisao-${lote}.json`);
if (!existsSync(f)) { console.error("falta", f); process.exit(1); }
let r;
try { r = JSON.parse(readFileSync(f, "utf8")); } catch (e) { console.error("JSON inválido:", e.message); process.exit(1); }
const erros = [];
const PTBR = /\b(usuári[oa]s?|registros?|contatos?|fatos?|planilhas?|arquivos?|equipe|ônus|econômic\w*|aluguel|por quê|patrimônio)\b/i;
const AO = /\b(acção|acções|actividade|objecto|efectiv\w*|direcção|sector|excepção|óptimo)\b/i;
const vistos = new Set();
for (const x of r) {
  if (!LOTES[lote].includes(x.codigo)) { erros.push(`${x.codigo}: não é deste lote`); continue; }
  vistos.add(x.codigo);
  if (!["ok", "corrigida", "rever de raiz"].includes(x.veredicto)) erros.push(`${x.codigo}: veredicto «${x.veredicto}»`);
  if (!x.resumo) erros.push(`${x.codigo}: sem resumo`);
  // Título e descrição do índice: só quando descreviam o regime errado, e sempre o par PT + EN.
  for (const [pt, en] of [["titulo", "titulo_en"], ["descricao", "descricao_en"]]) {
    if (!!x[pt] !== !!x[en]) erros.push(`${x.codigo}: "${pt}" e "${en}" vão juntos`);
    if (x[pt] && PTBR.test(x[pt])) erros.push(`${x.codigo}: forma do Brasil em ${pt} «${x[pt].match(PTBR)[0]}»`);
    if (x[pt] && AO.test(x[pt])) erros.push(`${x.codigo}: grafia anterior ao AO90 em ${pt} «${x[pt].match(AO)[0]}»`);
  }
  const texto = readFileSync(join(aqui, "textos", `${x.codigo}.md`), "utf8");
  for (const [i, s] of (x.substituicoes || []).entries()) {
    const id = `${x.codigo} subst. ${i + 1}`;
    if (!s.de || typeof s.para !== "string") { erros.push(`${id}: falta "de" ou "para"`); continue; }
    const n = texto.split(s.de).length - 1;
    if (n !== 1) erros.push(`${id}: o trecho "de" aparece ${n} vezes no texto (tem de aparecer exatamente 1): «${s.de.slice(0, 70)}»`);
    if (!s.motivo) erros.push(`${id}: sem motivo`);
    if (!/^https?:\/\//.test(s.fonte || "") && !/\[■ VERIFICAR/.test(s.para)) erros.push(`${id}: sem fonte (URL) e sem [■ VERIFICAR] no texto novo`);
    if (PTBR.test(s.para)) erros.push(`${id}: forma do Brasil «${s.para.match(PTBR)[0]}»`);
    if (AO.test(s.para)) erros.push(`${id}: grafia anterior ao AO90 «${s.para.match(AO)[0]}»`);
    if (/\[VERIFICAR/.test(s.para)) erros.push(`${id}: marcador sem ■ (usar [■ VERIFICAR: …])`);
  }
  // Os trechos de uma ficha não se podem sobrepor.
  const pos = (x.substituicoes || []).map((s) => ({ a: texto.indexOf(s.de), b: texto.indexOf(s.de) + s.de.length })).filter((p) => p.a >= 0).sort((p, q) => p.a - q.a);
  for (let i = 1; i < pos.length; i++) if (pos[i].a < pos[i - 1].b) erros.push(`${x.codigo}: dois trechos sobrepostos`);
  if (x.veredicto === "corrigida" && !(x.substituicoes || []).length) erros.push(`${x.codigo}: corrigida sem substituições`);
}
for (const c of LOTES[lote]) if (!vistos.has(c)) erros.push(`${c}: sem revisão`);
const subs = r.reduce((n, x) => n + (x.substituicoes || []).length, 0);
console.log(`${r.length} fichas, ${subs} substituições`);
if (erros.length) { console.log(`${erros.length} erros:`); for (const e of erros.slice(0, 40)) console.log("  " + e); process.exit(1); }
console.log("OK");
