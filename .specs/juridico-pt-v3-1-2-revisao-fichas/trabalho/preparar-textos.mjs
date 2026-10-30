// Uso: node preparar-textos.mjs — (re)gera textos/<COD>.md, .citacoes.md e .triagem.md para todas as fichas de lotes.json.
// Os textos não vão para o git (são derivados do kit); o validar.mjs, o conciliar.mjs e o aplicar-propostas.mjs precisam deles.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const aqui = dirname(fileURLToPath(import.meta.url));
const REPO = join(aqui, "..", "..", "..");
const KIT = process.env.KIT || "C:/Users/Administrator/Downloads/skills-juridicas-pro";
const { normalizarGrafia, remeterGrandezas, aplicarPersona } = await import(pathToFileURL(join(REPO, "mcp-server/scripts/importar-fichas.mjs")).href);
const lotes = JSON.parse(readFileSync(join(aqui, "lotes.json"), "utf8"));
const catalogo = JSON.parse(readFileSync(join(KIT, "catalogo.json"), "utf8"));
const F = join(REPO, "skills/juridico-pt/assets/fichas");
const indice = JSON.parse(readFileSync(join(F, "indice.json"), "utf8"));
const citacoes = JSON.parse(readFileSync(join(F, "citacoes.json"), "utf8"));
const triagem = {};
for (const f of readdirSync(join(aqui, "triagem")).filter((x) => /^triagem-t\d+\.json$/.test(x))) {
  for (const x of JSON.parse(readFileSync(join(aqui, "triagem", f), "utf8"))) triagem[x.codigo] = x;
}
mkdirSync(join(aqui, "textos"), { recursive: true });
let n = 0;
for (const cod of new Set(Object.values(lotes).flat())) {
  const item = catalogo.find((c) => c.codigo === cod);
  const e = indice.fichas.find((x) => x.codigo === cod);
  const corpo = readFileSync(join(KIT, item.ficheiro_md), "utf8").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const i = corpo.search(/^## /m);
  writeFileSync(join(aqui, "textos", `${cod}.md`), aplicarPersona(remeterGrandezas(normalizarGrafia(i >= 0 ? corpo.slice(i) : corpo))));
  const cit = citacoes.filter((c) => c.codigo === cod).map((c) => `- ${c.texto} — ${c.estado}${c.epigrafe ? ` (epígrafe: ${c.epigrafe})` : ""}${c.nota ? ` — nota: ${c.nota}` : ""}`);
  writeFileSync(join(aqui, "textos", `${cod}.citacoes.md`), `# ${cod} — ${e.titulo}\nFicha gerada: skills/juridico-pt/assets/fichas/${e.ficheiro}\n\nEstado atual das citações:\n${cit.join("\n")}\n`);
  const t = triagem[cod];
  const motivos = t && t.triagem === "rever" ? t.motivos.map((m) => `- ${m}`).join("\n") : "- (a triagem não apontou nada)";
  writeFileSync(join(aqui, "textos", `${cod}.triagem.md`), `# ${cod} — índice e triagem\n\n- **titulo:** ${e.titulo}\n- **descricao:** ${e.descricao}\n- **titulo_en:** ${e.titulo_en}\n- **descricao_en:** ${e.descricao_en}\n\n## Suspeitas da triagem (gravidade ${t?.gravidade || "-"}; feitas de memória, sem fonte: confirmar, não confiar)\n${motivos}\n`);
  n++;
}
console.log(`${n} fichas com textos gerados`);
