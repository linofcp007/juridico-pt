// Uso: node preparar-vaga.mjs <vaga.json> — vaga.json = {"<lote>": ["COD", …]}. Para cada ficha escreve
// textos/<COD>.md (texto antes das citações), <COD>.citacoes.md e <COD>.triagem.md (índice + suspeitas da
// triagem) e acrescenta os lotes a lotes.json (os lotes antigos ficam, para o juntar.mjs e o validar.mjs).
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const REPO = "C:/Users/Administrator/Desktop/CLAUDE SKILLS/juridico-pt";
const KIT = "C:/Users/Administrator/Downloads/skills-juridicas-pro";
const { normalizarGrafia, remeterGrandezas, aplicarPersona } = await import(pathToFileURL(join(REPO, "mcp-server/scripts/importar-fichas.mjs")).href);
const aqui = dirname(fileURLToPath(import.meta.url));
const TRIAGEM = join(aqui, "triagem");

const vaga = JSON.parse(readFileSync(process.argv[2], "utf8"));
const lotes = JSON.parse(readFileSync(join(aqui, "lotes.json"), "utf8"));
const catalogo = JSON.parse(readFileSync(join(KIT, "catalogo.json"), "utf8"));
const F = join(REPO, "skills/juridico-pt/assets/fichas");
const indice = JSON.parse(readFileSync(join(F, "indice.json"), "utf8"));
const citacoes = JSON.parse(readFileSync(join(F, "citacoes.json"), "utf8"));
const revistas = new Set(Object.keys(JSON.parse(readFileSync(join(F, "correcoes-conteudo.json"), "utf8"))));
const triagem = {};
for (const f of readdirSync(TRIAGEM).filter((x) => /^triagem-t\d+\.json$/.test(x))) {
  for (const x of JSON.parse(readFileSync(join(TRIAGEM, f), "utf8"))) triagem[x.codigo] = x;
}
const jaEmLote = new Set(Object.values(lotes).flat());
mkdirSync(join(aqui, "textos"), { recursive: true });
let n = 0;
for (const [lote, cods] of Object.entries(vaga)) {
  if (!/^[a-z0-9]+$/.test(lote)) throw new Error(`${lote}: nome de lote só com [a-z0-9]`);
  if (lotes[lote]) throw new Error(`${lote}: lote já existe`);
  for (const cod of cods) {
    if (revistas.has(cod) || jaEmLote.has(cod)) throw new Error(`${cod}: já revista ou noutro lote`);
    const item = catalogo.find((c) => c.codigo === cod);
    const e = indice.fichas.find((x) => x.codigo === cod);
    if (!item || !e) throw new Error(`${cod}: não está no catálogo ou no índice`);
    const bruto = readFileSync(join(KIT, item.ficheiro_md), "utf8");
    const corpo = bruto.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
    const i = corpo.search(/^## /m);
    const texto = aplicarPersona(remeterGrandezas(normalizarGrafia(i >= 0 ? corpo.slice(i) : corpo)));
    const cit = citacoes.filter((c) => c.codigo === cod).map((c) => `- ${c.texto} — ${c.estado}${c.epigrafe ? ` (epígrafe: ${c.epigrafe})` : ""}${c.nota ? ` — nota: ${c.nota}` : ""}`);
    writeFileSync(join(aqui, "textos", `${cod}.md`), texto);
    writeFileSync(join(aqui, "textos", `${cod}.citacoes.md`), `# ${cod} — ${e.titulo}\nFicha gerada: skills/juridico-pt/assets/fichas/${e.ficheiro}\n\nEstado atual das citações (depois da revisão das citações):\n${cit.join("\n")}\n`);
    const t = triagem[cod];
    const motivos = t && t.triagem === "rever" ? t.motivos.map((m) => `- ${m}`).join("\n") : "- (a triagem não apontou nada)";
    writeFileSync(join(aqui, "textos", `${cod}.triagem.md`), [
      `# ${cod} — índice e triagem`,
      "",
      `- **titulo:** ${e.titulo}`,
      `- **descricao:** ${e.descricao}`,
      `- **titulo_en:** ${e.titulo_en}`,
      `- **descricao_en:** ${e.descricao_en}`,
      "",
      `## Suspeitas da triagem (gravidade ${t?.gravidade || "-"}; feitas de memória, sem fonte: confirmar, não confiar)`,
      motivos,
      "",
    ].join("\n"));
    n++;
  }
  lotes[lote] = cods;
}
writeFileSync(join(aqui, "lotes.json"), JSON.stringify(lotes, null, 2));
console.log(`${n} fichas preparadas em ${Object.keys(vaga).length} lotes`);
