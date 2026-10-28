// Uso: node fila.cjs [n] — mostra os próximos n lotes por lançar (média e depois baixa, por área) e marca-os como lançados.
const fs = require("fs");
const ORDEM = ["TRA", "IMO", "FIS", "PRC", "INS", "SUC", "FAM", "EST", "COM", "CIV", "CNS", "SAU", "PEN", "DES", "CON", "URB", "AMB", "BAN", "UE", "DIG", "ADM", "PI"];
const lancados = fs.existsSync("lancados.json") ? JSON.parse(fs.readFileSync("lancados.json", "utf8")) : ["mtra1", "mtra2", "mimo1", "mimo2", "mimo3"];
const fila = [];
for (const [f, g] of [["vaga3.json", "medium"], ["vaga4.json", "low"]]) {
  const v = JSON.parse(fs.readFileSync(f, "utf8"));
  const lotes = Object.keys(v).sort((a, b) => ORDEM.indexOf(a.replace(/^[mb]|\d+$/g, "").toUpperCase()) - ORDEM.indexOf(b.replace(/^[mb]|\d+$/g, "").toUpperCase()) || a.localeCompare(b, "pt", { numeric: true }));
  for (const l of lotes) if (!lancados.includes(l)) fila.push({ l, g, area: l.replace(/^[mb]|\d+$/g, "").toUpperCase(), fichas: v[l] });
}
const n = Number(process.argv[2] || 0);
for (const x of fila.slice(0, n)) { console.log(`${x.l} | ${x.area} | ${x.g} | ${x.fichas.join(", ")}`); lancados.push(x.l); }
fs.writeFileSync("lancados.json", JSON.stringify(lancados));
console.log(`(${fila.length - n} por lançar)`);
