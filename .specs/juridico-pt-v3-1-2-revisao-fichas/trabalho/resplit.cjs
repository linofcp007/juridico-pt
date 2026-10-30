// Uso: node resplit.cjs — parte os lotes ainda por lançar (média e baixa) em lotes de 5 fichas no máximo, na mesma área.
// Atualiza lotes.json (tira os lotes antigos não lançados, junta os novos) e escreve fila2.json (ordem de lançamento).
const fs = require("fs");
const ORDEM = ["TRA", "IMO", "FIS", "PRC", "INS", "SUC", "FAM", "EST", "COM", "CIV", "CNS", "SAU", "PEN", "DES", "CON", "URB", "AMB", "BAN", "UE", "DIG", "ADM", "PI"];
const lancados = JSON.parse(fs.readFileSync("lancados.json", "utf8"));
const lotes = JSON.parse(fs.readFileSync("lotes.json", "utf8"));
const fila = [];
for (const [f, g] of [["vaga3.json", "medium"], ["vaga4.json", "low"]]) {
  const v = JSON.parse(fs.readFileSync(f, "utf8"));
  const area = (l) => l.replace(/^[mb]|\d+$/g, "").toUpperCase();
  const ks = Object.keys(v).filter((l) => !lancados.includes(l)).sort((a, b) => ORDEM.indexOf(area(a)) - ORDEM.indexOf(area(b)) || a.localeCompare(b, "pt", { numeric: true }));
  for (const l of ks) {
    delete lotes[l];
    const fichas = v[l];
    const n = Math.ceil(fichas.length / 5), t = Math.ceil(fichas.length / n);
    for (let i = 0, k = 0; i < fichas.length; i += t, k++) {
      const nome = l + "abcdefgh"[k];
      lotes[nome] = fichas.slice(i, i + t);
      fila.push({ l: nome, g, area: area(l), fichas: lotes[nome] });
    }
  }
}
fs.writeFileSync("lotes.json", JSON.stringify(lotes, null, 2));
fs.writeFileSync("fila2.json", JSON.stringify(fila, null, 1));
console.log(`${fila.length} lotes novos, ${fila.reduce((s, x) => s + x.fichas.length, 0)} fichas`);
