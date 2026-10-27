#!/usr/bin/env node
// Copia o conteúdo da skill (referências, templates, checklists, playbooks, SKILL.md)
// para `mcp-server/content/`, tornando o pacote MCP autossuficiente para publicação npm.
// Corre automaticamente em `npm run build` e `prepublishOnly`.
import { cp, mkdir, rm, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..");                 // .../juridico-pt
const skillRoot = resolve(repoRoot, "skills", "juridico-pt"); // conteúdo da skill
const contentDir = resolve(here, "..", "content");

const COPY = [
  ["references", "references"],
  ["assets/templates", "templates"],
  ["assets/checklists", "checklists"],
  ["playbooks", "playbooks"],
  ["assets/modelos", "modelos"],
  ["assets/redacao", "redacao"],
  ["assets/fichas", "fichas"],
];

// Das fichas, o servidor só lê o índice e os ficheiros das áreas; os dados do importador
// (traduções, revisão e relatório de citações, sobreposições) ficam só no skill.
const SO_NO_SKILL = new Set(["citacoes.json", "traducoes-en.json", "revisao-citacoes.json", "sobreposicoes.json"]);

async function main() {
  await rm(contentDir, { recursive: true, force: true });
  await mkdir(contentDir, { recursive: true });

  for (const [src, dst] of COPY) {
    const from = resolve(skillRoot, src);
    if (!existsSync(from)) {
      console.warn(`(aviso) origem não encontrada: ${from}`);
      continue;
    }
    await cp(from, resolve(contentDir, dst), {
      recursive: true,
      filter: (f) => dst !== "fichas" || !SO_NO_SKILL.has(basename(f)),
    });
  }

  // SKILL.md (persona/fluxo) — usado para o prompt MCP.
  const skill = resolve(skillRoot, "SKILL.md");
  if (existsSync(skill)) {
    await cp(skill, resolve(contentDir, "SKILL.md"));
  }

  // Índice simples do conteúdo, para diagnóstico.
  const stamp = process.env.BUNDLE_STAMP || "build";
  await writeFile(
    resolve(contentDir, "BUNDLE.json"),
    JSON.stringify({ bundledFrom: "juridico-pt skill", stamp }, null, 2)
  );

  console.log(`Conteúdo empacotado em ${contentDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
