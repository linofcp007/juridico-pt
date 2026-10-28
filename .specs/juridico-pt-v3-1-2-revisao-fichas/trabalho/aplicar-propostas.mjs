// Uso: node aplicar-propostas.mjs <skill> — passa ajustes-propostos.txt (relatos dos revisores) para ajustes-decisoes.json,
// só quando a decisão existe em revisao-citacoes.json e a citação ainda aparece no texto corrigido.
// Linhas: "COD | citação | conferida|RETIRAR (...)". As marcadas com "?" só entram se a citação ainda existir.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const aqui = dirname(fileURLToPath(import.meta.url));
const [skill] = process.argv.slice(2);
const revisao = JSON.parse(readFileSync(join(skill, "assets/fichas/revisao-citacoes.json"), "utf8"));
const correcoes = JSON.parse(readFileSync(join(skill, "assets/fichas/correcoes-conteudo.json"), "utf8"));
const ajustes = JSON.parse(readFileSync(join(aqui, "ajustes-decisoes.json"), "utf8"));
const espacos = (s) => s.replace(/\s+/g, " ").trim();
const linhas = readFileSync(join(aqui, "ajustes-propostos.txt"), "utf8").split("\n").filter((l) => /^[A-Z]+-\d+ \|/.test(l));
let n = 0;
const ignoradas = [];
for (const l of linhas) {
  const [cod, citacao, resto] = l.split(" | ").map((s) => s.trim());
  const decisao = /^RETIRAR/i.test(resto) ? "retirar" : /^conferida/i.test(resto) ? "conferida" : null;
  if (!decisao) { ignoradas.push(`${l} (sem decisão clara)`); continue; }
  const existentes = (revisao[cod] || []).filter((d) => d.citacao === citacao);
  if (!existentes.length) { ignoradas.push(`${cod} | ${citacao} (sem decisão em revisao-citacoes.json)`); continue; }
  let t = readFileSync(join(aqui, "textos", `${cod}.md`), "utf8");
  for (const s of correcoes[cod]?.substituicoes || []) t = t.replace(s.de, () => s.para);
  if (!espacos(t).includes(citacao)) { ignoradas.push(`${cod} | ${citacao} (a citação já não existe; o conciliar retira-a)`); continue; }
  if (decisao === "conferida" && existentes.every((d) => d.decisao === "conferida")) continue;
  (ajustes[cod] ||= []);
  if (ajustes[cod].some((a) => a.citacao === citacao)) continue;
  ajustes[cod].push({ citacao, decisao });
  n++;
}
writeFileSync(join(aqui, "ajustes-decisoes.json"), JSON.stringify(ajustes, null, 2) + "\n");
console.log(`${n} ajustes acrescentados; ${ignoradas.length} ignorados`);
for (const i of ignoradas) console.log("  - " + i);
