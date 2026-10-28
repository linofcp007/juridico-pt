// Uso: node fila2.cjs [n] — mostra os próximos n lotes de fila2.json e marca-os como lançados (lancados2.json).
const fs = require("fs");
const fila = JSON.parse(fs.readFileSync("fila2.json", "utf8"));
const lanc = fs.existsSync("lancados2.json") ? JSON.parse(fs.readFileSync("lancados2.json", "utf8")) : [];
const resto = fila.filter((x) => !lanc.includes(x.l));
const n = Number(process.argv[2] || 0);
for (const x of resto.slice(0, n)) { console.log(`${x.l} | ${x.area} | ${x.g} | ${x.fichas.join(", ")}`); lanc.push(x.l); }
fs.writeFileSync("lancados2.json", JSON.stringify(lanc));
console.log(`(${resto.length - Math.min(n, resto.length)} por lançar)`);
