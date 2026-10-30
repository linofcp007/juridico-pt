// Uso: node preparar.mjs — escreve, para cada ficha a rever, o texto normalizado ANTES das citações
// (o ponto do importador onde entram as correções de conteúdo) e um resumo das citações já decididas.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const REPO = "C:/Users/Administrator/Desktop/CLAUDE SKILLS/juridico-pt";
const KIT = "C:/Users/Administrator/Downloads/skills-juridicas-pro";
const { normalizarGrafia, remeterGrandezas, aplicarPersona } = await import(pathToFileURL(join(REPO, "mcp-server/scripts/importar-fichas.mjs")).href);
const aqui = dirname(fileURLToPath(import.meta.url));

export const LOTES = {
  pi: ["PI-014", "PI-015", "PI-028", "PI-029", "PI-041", "PI-055", "PI-018", "PI-021", "PI-036", "PI-037"],
  ins: ["INS-012", "INS-013", "INS-030", "INS-004", "INS-005", "INS-006", "INS-022", "INS-024", "COM-048"],
  urb: ["URB-002", "URB-003", "URB-027", "URB-040", "URB-011", "URB-058", "ADM-052", "ADM-002"],
  tra: ["TRA-041", "TRA-042", "TRA-005", "SUC-001", "SUC-035", "SUC-037", "FIS-033", "FIS-037"],
  geral: ["FAM-006", "EST-003", "SAU-003", "DES-001", "CIV-006", "PEN-029", "DIG-015"],
};

const catalogo = JSON.parse(readFileSync(join(KIT, "catalogo.json"), "utf8"));
const indice = JSON.parse(readFileSync(join(REPO, "skills/juridico-pt/assets/fichas/indice.json"), "utf8"));
const citacoes = JSON.parse(readFileSync(join(REPO, "skills/juridico-pt/assets/fichas/citacoes.json"), "utf8"));
mkdirSync(join(aqui, "textos"), { recursive: true });
for (const [lote, cods] of Object.entries(LOTES)) {
  for (const cod of cods) {
    const item = catalogo.find((c) => c.codigo === cod);
    const bruto = readFileSync(join(KIT, item.ficheiro_md), "utf8");
    const corpo = bruto.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
    const i = corpo.search(/^## /m);
    const texto = aplicarPersona(remeterGrandezas(normalizarGrafia(i >= 0 ? corpo.slice(i) : corpo)));
    const e = indice.fichas.find((x) => x.codigo === cod);
    const cit = citacoes.filter((c) => c.codigo === cod).map((c) => `- ${c.texto} — ${c.estado}${c.epigrafe ? ` (epígrafe: ${c.epigrafe})` : ""}${c.nota ? ` — nota: ${c.nota}` : ""}`);
    writeFileSync(join(aqui, "textos", `${cod}.md`), texto);
    writeFileSync(join(aqui, "textos", `${cod}.citacoes.md`), `# ${cod} — ${e.titulo}\nFicha gerada: skills/juridico-pt/assets/fichas/${e.ficheiro}\n\nEstado atual das citações (depois da revisão das citações):\n${cit.join("\n")}\n`);
  }
}
writeFileSync(join(aqui, "lotes.json"), JSON.stringify(LOTES, null, 2));
console.log(Object.values(LOTES).flat().length, "fichas preparadas");
