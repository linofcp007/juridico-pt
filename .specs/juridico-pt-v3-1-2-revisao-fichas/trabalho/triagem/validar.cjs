// Uso: node validar.cjs <tNN> — confere triagem-<tNN>.json: uma entrada por ficha do lote, campos válidos.
const fs = require("fs");
const path = require("path");
const id = process.argv[2];
const lote = JSON.parse(fs.readFileSync(path.join(__dirname, "lotes", `${id}.json`), "utf8"));
const f = path.join(__dirname, `triagem-${id}.json`);
let r;
try { r = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { console.error("falta ou JSON inválido:", e.message); process.exit(1); }
const esperados = new Set(lote.fichas.map((x) => x.codigo));
const erros = [];
const vistos = new Set();
for (const x of r) {
  if (!esperados.has(x.codigo)) erros.push(`${x.codigo}: não é deste lote`);
  if (vistos.has(x.codigo)) erros.push(`${x.codigo}: repetida`);
  vistos.add(x.codigo);
  if (!["ok", "rever"].includes(x.triagem)) erros.push(`${x.codigo}: triagem «${x.triagem}»`);
  if (x.triagem === "rever") {
    if (!["alta", "media", "baixa"].includes(x.gravidade)) erros.push(`${x.codigo}: gravidade «${x.gravidade}»`);
    if (!Array.isArray(x.motivos) || !x.motivos.length) erros.push(`${x.codigo}: rever sem motivos`);
  }
}
for (const c of esperados) if (!vistos.has(c)) erros.push(`${c}: sem triagem`);
const n = (t, g) => r.filter((x) => x.triagem === t && (!g || x.gravidade === g)).length;
console.log(`${r.length}/${esperados.size} fichas — ok ${n("ok")}, rever ${n("rever")} (alta ${n("rever", "alta")}, média ${n("rever", "media")}, baixa ${n("rever", "baixa")})`);
if (erros.length) { console.log(`${erros.length} erros:`); for (const e of erros.slice(0, 30)) console.log("  " + e); process.exit(1); }
console.log("OK");
