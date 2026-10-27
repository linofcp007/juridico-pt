#!/usr/bin/env node
// Índice de normas conferidas: a secção 5 "Fundamentação permitida" de cada modelo
// (assets/modelos/*.md, itens sem [VERIFICAR]) e a tabela "Fontes lidas" do guia de
// segurança jurídica (assets/redacao/seguranca-juridica.md). Escreve
// references/normas-conferidas.md e .json. `--check` falha se o índice versionado
// estiver desatualizado. Sem dependências (Node >= 18).
//
//   node mcp-server/scripts/gerar-normas.mjs                 # regenera o índice
//   node mcp-server/scripts/gerar-normas.mjs --check         # só verifica
//   node mcp-server/scripts/gerar-normas.mjs --raiz <dir> --saida <dir>
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const RAIZ_SKILL = resolve(here, "..", "..", "skills", "juridico-pt");
const VERIFICAR = /\[(■ )?VERIFICAR/;

/** Texto da secção "## n." de um modelo (até à secção numerada seguinte). */
function secao(texto, n) {
  const i = texto.search(new RegExp(`^## ${n}\\. `, "m"));
  if (i < 0) return "";
  const resto = texto.slice(i + 1);
  const j = resto.search(/^## \d+\. /m);
  return j < 0 ? texto.slice(i) : texto.slice(i, i + 1 + j);
}

/** "Código Civil, Decreto-Lei n.º 47344/66, de 25 de novembro, …" -> "Código Civil (Decreto-Lei n.º 47344/66)". */
export function canonDiploma(linha) {
  const partes = linha.replace(/^\|?\s*/, "").split(",");
  const nome = partes[0].trim();
  const ato = /^((?:Lei Orgânica|Lei|Decreto-Lei|Decreto Regulamentar|Decreto|Portaria)\s+n\.º\s*[\d/A-Za-z-]+)/.exec((partes[1] ?? "").trim());
  return ato ? `${nome} (${ato[1]})` : nome;
}

/** "Artigo 805.º, n.os 1 e 2. O devedor…" -> "artigo 805.º, n.os 1 e 2". */
function dispositivo(texto) {
  const m = /^(.+?)\.\s+(?=[A-ZÀÁÉÍÓÚÂÊÔÃÕÇ"«\[])/.exec(texto);
  // A nota entre parênteses da fonte ("(lido em …)", "(redação dada pela …)") não faz parte do dispositivo.
  const d = (m ? m[1] : texto).replace(/\s+\(.*$/, "").trim();
  if (!/^(artigos?|ponto|anexo|considerando|regra)\b/i.test(d)) return null;
  return d.charAt(0).toLowerCase() + d.slice(1);
}

const numero = (d) => Number((/(\d+)/.exec(d) ?? [0, 0])[1]);
const cmp = (a, b) =>
  a.diploma.localeCompare(b.diploma, "pt") ||
  numero(a.dispositivo) - numero(b.dispositivo) ||
  a.ficheiro.localeCompare(b.ficheiro) ||
  a.item.localeCompare(b.item, "pt", { numeric: true });

/** Linhas do índice para uma raiz com assets/modelos/ e assets/redacao/seguranca-juridica.md. */
export function gerarIndice(raiz = RAIZ_SKILL) {
  const linhas = [];
  const dir = join(raiz, "assets", "modelos");
  const modelos = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md").sort() : [];
  for (const f of modelos) {
    let diploma = null;
    for (const l of secao(readFileSync(join(dir, f), "utf8"), 5).split(/\r?\n/)) {
      const item = /^(\d+(?:-[A-Z])?)\.\s+(.*)$/.exec(l.trim());
      if (item) {
        if (!diploma || VERIFICAR.test(item[2])) continue;
        const d = dispositivo(item[2]);
        if (d) linhas.push({ diploma, dispositivo: d, ficheiro: `assets/modelos/${f}`, item: item[1] });
      } else if (/https?:\/\//.test(l)) {
        diploma = canonDiploma(l.trim());
      }
    }
  }
  const guia = join(raiz, "assets", "redacao", "seguranca-juridica.md");
  if (existsSync(guia)) {
    const t = readFileSync(guia, "utf8");
    const i = t.search(/^## .*Fontes/m);
    if (i >= 0) {
      const j = t.slice(i + 1).search(/^## /m);
      const bloco = j < 0 ? t.slice(i) : t.slice(i, i + 1 + j);
      for (const l of bloco.split(/\r?\n/)) {
        const cel = /^\|(.+)\|\s*$/.exec(l.trim())?.[1].split("|").map((c) => c.trim());
        if (!cel || cel.length < 2 || /^-+$/.test(cel[0]) || /^diploma$/i.test(cel[0])) continue;
        const diploma = canonDiploma(cel[0]);
        for (const a of cel[1].match(/\d+\.º(?:-[A-Z])?/g) ?? []) {
          linhas.push({ diploma, dispositivo: `artigo ${a}`, ficheiro: "assets/redacao/seguranca-juridica.md", item: "fontes" });
        }
      }
    }
  }
  return linhas.sort(cmp);
}

/**
 * Artigos citados na secção 4 de um modelo sem lastro na secção 5: o número do artigo tem de
 * aparecer na secção 5 (em qualquer diploma), ou o parágrafo tem de ter [VERIFICAR].
 * Precisão > recall: não distingue o mesmo número em dois diplomas. As instruções internas
 * `[[IA: …]]` não contam (nunca chegam ao documento e falam dos artigos do próprio articulado).
 */
export function verificarCitacoes(texto) {
  const nums5 = new Set((secao(texto, 5).match(/\d+\.º(?:-[A-Z])?/g) ?? []).map((n) => n.replace(".º", "")));
  const falta = [];
  for (const l of secao(texto, 4).replace(/\[\[IA:[\s\S]*?\]\]/g, "").split(/\r?\n/)) {
    if (VERIFICAR.test(l)) continue;
    for (const m of l.matchAll(/\bart(?:igos?|s?\.)\s+((?:\d+\.º(?:-[A-Z])?(?:,\s*|\s+e\s+|\s+a\s+)?)+)/gi)) {
      for (const n of m[1].match(/\d+\.º(?:-[A-Z])?/g) ?? []) {
        const k = n.replace(".º", "");
        const rotulo = `artigo ${n}`;
        if (!nums5.has(k) && !falta.includes(rotulo)) falta.push(rotulo);
      }
    }
  }
  return falta;
}

function markdown(linhas) {
  const corpo = linhas.map((l) => `| ${l.diploma} | ${l.dispositivo} | ${l.ficheiro}, item ${l.item} |`);
  return [
    "# Normas conferidas",
    "",
    "> **Âmbito:** misto",
    "",
    "Índice gerado por `mcp-server/scripts/gerar-normas.mjs` (não editar à mão). Reúne o que os modelos citam na secção 5",
    "\"Fundamentação permitida\" (só os itens lidos na fonte oficial, sem `[VERIFICAR]`) e as fontes lidas do guia de",
    "segurança jurídica. Serve de lastro ao verificador de citações: o que está aqui foi conferido; o resto precisa de ser",
    "lido na fonte oficial. O que cada preceito diz está no ficheiro e item indicados.",
    "",
    `Total: ${linhas.length} linha(s).`,
    "",
    "| diploma | dispositivo | ficheiro e item |",
    "|---|---|---|",
    ...corpo,
    "",
  ].join("\n");
}

const json = (linhas) => JSON.stringify(linhas, null, 1) + "\n";

function main(argv) {
  const arg = (n) => {
    const i = argv.indexOf(n);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const raiz = resolve(arg("--raiz") ?? RAIZ_SKILL);
  const saida = resolve(arg("--saida") ?? join(raiz, "references"));
  const linhas = gerarIndice(raiz);
  const fJson = join(saida, "normas-conferidas.json");
  const fMd = join(saida, "normas-conferidas.md");
  if (argv.includes("--check")) {
    const iguais =
      existsSync(fJson) && existsSync(fMd) && readFileSync(fJson, "utf8") === json(linhas) && readFileSync(fMd, "utf8") === markdown(linhas);
    if (!iguais) {
      console.error("índice desatualizado: corre `node mcp-server/scripts/gerar-normas.mjs` e versiona o resultado.");
      return 1;
    }
    console.log(`OK: índice de normas em dia (${linhas.length} linhas).`);
    return 0;
  }
  writeFileSync(fJson, json(linhas));
  writeFileSync(fMd, markdown(linhas));
  console.log(`Índice de normas escrito em ${saida} (${linhas.length} linhas).`);
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exit(main(process.argv.slice(2)));
}
