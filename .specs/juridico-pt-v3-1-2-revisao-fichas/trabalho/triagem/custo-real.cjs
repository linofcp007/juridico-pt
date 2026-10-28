// Uso: node custo-real.cjs — custo equivalente em API, lido dos registos dos subagentes (uso real, com leituras de cache).
const fs = require("fs");
const D = "C:/Users/Administrator/.claude-conta2/projects/c--Users-Administrator-Desktop-CLAUDE-SKILLS-juridico-pt/381925a7-eebd-4683-86a9-3bf5bea0f303/subagents";
const P = { opus: { in: 4, cw5: 5, cw60: 8, cr: 0.2, out: 20 }, sonnet: { in: 2, cw5: 2.5, cw60: 4, cr: 0.2, out: 10 } };
const grupos = {};
let fichasRevistas = 0;
for (const f of fs.readdirSync(D).filter((f) => f.endsWith(".meta.json"))) {
  const meta = JSON.parse(fs.readFileSync(`${D}/${f}`, "utf8"));
  const g = /^Triage fichas t\d+/.test(meta.description) ? "triagem (sonnet)" : /^(Deep review v[12]|Review m[a-z]+\d|Review b[a-z]+\d)/.test(meta.description) ? "revisão a fundo (opus)" : null;
  if (!g) continue;
  const j = `${D}/${f.replace(".meta.json", ".jsonl")}`;
  if (!fs.existsSync(j)) continue;
  const s = { in: 0, cw5: 0, cw60: 0, cr: 0, out: 0 };
  let model = "";
  const seen = new Set();
  for (const l of fs.readFileSync(j, "utf8").split("\n")) {
    if (!l.includes('"usage"')) continue;
    let o; try { o = JSON.parse(l); } catch { continue; }
    const m = o.message;
    if (!m || !m.usage) continue;
    model = m.model || model;
    const k = m.id || o.uuid;
    if (seen.has(k)) continue;
    seen.add(k);
    const u = m.usage, cc = u.cache_creation || {};
    s.in += u.input_tokens || 0; s.cr += u.cache_read_input_tokens || 0; s.out += u.output_tokens || 0;
    if (cc.ephemeral_1h_input_tokens != null || cc.ephemeral_5m_input_tokens != null) { s.cw5 += cc.ephemeral_5m_input_tokens || 0; s.cw60 += cc.ephemeral_1h_input_tokens || 0; }
    else s.cw5 += u.cache_creation_input_tokens || 0;
  }
  const p = P[/sonnet/.test(model) ? "sonnet" : "opus"];
  const usd = (s.in * p.in + s.cw5 * p.cw5 + s.cw60 * p.cw60 + s.cr * p.cr + s.out * p.out) / 1e6;
  (grupos[g] ||= { n: 0, usd: 0 }); grupos[g].n++; grupos[g].usd += usd;
}
let tot = 0;
for (const [g, v] of Object.entries(grupos)) { console.log(`${g}: ${v.n} agentes, ${v.usd.toFixed(2)} USD`); tot += v.usd; }
console.log(`TOTAL ${tot.toFixed(2)} USD (equivalente em API; inclui os agentes ainda a correr até agora)`);
