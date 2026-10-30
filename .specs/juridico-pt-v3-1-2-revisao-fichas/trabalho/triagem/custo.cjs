// Uso: node custo.cjs [<etiqueta> <modelo: sonnet|opus> <tokens>] — regista um agente e mostra o total.
// Estimativa por cima: todos os tokens a preço de entrada sem cache, mais 10 % a preço de saída.
const fs = require("fs");
const path = require("path");
const F = path.join(__dirname, "custo.json");
const PRECO = { sonnet: { in: 2, out: 10 }, opus: { in: 4, out: 20 } }; // USD por milhão (tabela oficial, 2026-10)
const reg = fs.existsSync(F) ? JSON.parse(fs.readFileSync(F, "utf8")) : [];
const [etiqueta, modelo, tokens] = process.argv.slice(2);
if (etiqueta) {
  const p = PRECO[modelo];
  if (!p) throw new Error("modelo: sonnet ou opus");
  const t = Number(tokens);
  const usd = (t * p.in + 0.1 * t * p.out) / 1e6;
  reg.push({ etiqueta, modelo, tokens: t, usd: Number(usd.toFixed(3)) });
  fs.writeFileSync(F, JSON.stringify(reg, null, 1));
}
const tot = reg.reduce((s, r) => s + r.usd, 0);
const porModelo = {};
for (const r of reg) porModelo[r.modelo] = (porModelo[r.modelo] || 0) + r.usd;
console.log(`${reg.length} agentes · total estimado ${tot.toFixed(2)} USD de 240 ·`, Object.entries(porModelo).map(([m, v]) => `${m} ${v.toFixed(2)}`).join(", "));
