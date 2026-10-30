// Uso: node conciliar.mjs <skill> — retira de revisao-citacoes.json as decisões de citações que as correções
// de conteúdo eliminaram (o importador falha com decisões sem citação correspondente).
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const aqui = dirname(fileURLToPath(import.meta.url));
const [skill] = process.argv.slice(2);
const F = (n) => join(skill, "assets", "fichas", n);
const correcoes = JSON.parse(readFileSync(F("correcoes-conteudo.json"), "utf8"));
const revisao = JSON.parse(readFileSync(F("revisao-citacoes.json"), "utf8"));
const espacos = (s) => s.replace(/\s+/g, " ").trim();
const retiradas = [];
for (const [cod, r] of Object.entries(correcoes)) {
  if (!revisao[cod]) continue;
  let t = readFileSync(join(aqui, "textos", `${cod}.md`), "utf8");
  for (const s of r.substituicoes || []) t = t.replace(s.de, () => s.para);
  const plano = espacos(t);
  // Quantas vezes cada citação ainda aparece: as decisões a mais (por ordem) caem.
  const disponiveis = {};
  const ficam = [];
  for (const d of revisao[cod]) {
    // A citação conta só quando acaba ali ("art. 202.º CP" não pode casar dentro de "art. 202.º CPP").
    const exato = new RegExp(d.citacao.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}\\d])", "gu");
    const n = (disponiveis[d.citacao] ??= (plano.match(exato) || []).length);
    // Como no importador: o contexto tem de estar na mesma linha que a citação.
    const umaVez = new RegExp(exato.source, "u");
    const contextoOk = !d.contexto || t.split("\n").some((l) => espacos(l).includes(espacos(d.contexto)) && umaVez.test(espacos(l)));
    if (n > 0 && contextoOk) { disponiveis[d.citacao]--; ficam.push(d); }
    else retiradas.push(`${cod}: ${d.citacao} (${d.decisao})`);
  }
  if (ficam.length) revisao[cod] = ficam; else delete revisao[cod];
}
// Decisões "verificar" que a correção tornou desatualizadas (o texto já diz o certo) passam a "conferida".
let ajustadas = 0;
for (const [cod, lista] of Object.entries(JSON.parse(readFileSync(join(aqui, "ajustes-decisoes.json"), "utf8")))) {
  for (const a of lista) {
    const casa = (d) => d.citacao === a.citacao && (!a.contexto || (d.contexto || "").includes(a.contexto));
    // "retirar": decisões de linhas que a correção reescreveu sem que o texto da citação desaparecesse.
    if (a.decisao === "retirar") {
      const antes = (revisao[cod] || []).length;
      revisao[cod] = (revisao[cod] || []).filter((d) => !casa(d));
      for (let i = revisao[cod].length; i < antes; i++) retiradas.push(`${cod}: ${a.citacao} (retirada à mão)`);
      if (!revisao[cod].length) delete revisao[cod];
      continue;
    }
    const alvo = (revisao[cod] || []).filter(casa);
    // A decisão pode já ter sido retirada acima (a correção mudou o contexto): nada a ajustar.
    if (!alvo.length) { console.log(`  aviso: ${cod} sem decisão para «${a.citacao}» (já retirada)`); continue; }
    for (const d of alvo) {
      d.decisao = a.decisao;
      if (a.nota) d.nota = a.nota;
      else if (a.decisao === "conferida") delete d.nota;
      ajustadas++;
    }
  }
}
console.log(`${ajustadas} decisões ajustadas`);
// Mesmo formato do ficheiro: uma decisão por linha.
const ord = Object.keys(revisao).sort((a, b) => a.localeCompare(b, "pt", { numeric: true }));
writeFileSync(F("revisao-citacoes.json"), `{\n${ord.map((k) => `  ${JSON.stringify(k)}: [\n${revisao[k].map((e) => `    ${JSON.stringify(e)}`).join(",\n")}\n  ]`).join(",\n")}\n}\n`);
writeFileSync(join(aqui, "decisoes-retiradas.txt"), retiradas.join("\n") + "\n");
console.log(`${retiradas.length} decisões retiradas (citações eliminadas pelas correções)`);
