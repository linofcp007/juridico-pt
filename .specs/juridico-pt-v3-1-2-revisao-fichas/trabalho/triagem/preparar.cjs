// Uso: node preparar.cjs — lotes de triagem (~40 fichas, por área) com as fichas ainda sem revisão técnica.
const fs = require("fs");
const path = require("path");
const REPO = "C:/Users/Administrator/Desktop/CLAUDE SKILLS/juridico-pt";
const F = path.join(REPO, "skills/juridico-pt/assets/fichas");
const indice = JSON.parse(fs.readFileSync(path.join(F, "indice.json"), "utf8"));
const revistas = new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(F, "correcoes-conteudo.json"), "utf8"))));
const porArea = {};
for (const e of indice.fichas) {
  if (!e.ficheiro || revistas.has(e.codigo)) continue;
  (porArea[e.pasta] ||= []).push({ codigo: e.codigo, titulo: e.titulo, ficheiro: path.join(F, e.ficheiro).replace(/\\/g, "/") });
}
const lotes = [];
for (const [pasta, fichas] of Object.entries(porArea).sort()) {
  // Lotes de ~40 por área (uma área grande parte-se em pedaços iguais).
  const n = Math.ceil(fichas.length / 45);
  const tam = Math.ceil(fichas.length / n);
  for (let i = 0; i < fichas.length; i += tam) lotes.push({ id: `t${String(lotes.length + 1).padStart(2, "0")}`, area: pasta, fichas: fichas.slice(i, i + tam) });
}
fs.mkdirSync(path.join(__dirname, "lotes"), { recursive: true });
for (const l of lotes) fs.writeFileSync(path.join(__dirname, "lotes", `${l.id}.json`), JSON.stringify(l, null, 1));
console.log(`${lotes.reduce((s, l) => s + l.fichas.length, 0)} fichas em ${lotes.length} lotes`);
for (const l of lotes) console.log(`  ${l.id} ${l.area} (${l.fichas.length})`);
