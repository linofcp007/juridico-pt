/**
 * Testes da v3.0 (juridico-pt + redator jurídico), T-401 a T-457 (os de estrutura do plugin estão em
 * plugin.test.mjs, os do hook em hooks.test.mjs e os do lado Python em scripts/test_scripts.py).
 * Importa a versão COMPILADA (`../dist/`), que `npm test` gera antes. Os módulos novos são importados
 * dentro de cada teste, para que cada um falhe sozinho enquanto não existir.
 * Fixtures partilhadas com o Python em `fixtures/redator/` (paridade sem um lado chamar o outro).
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync, mkdtempSync, readdirSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..", "..");
const r = (...p) => resolve(repo, ...p);
const SKILL = (...p) => r("skills", "juridico-pt", ...p);
// Desde a 3.0.1 o fluxo do redator é um guia do juridico-pt, não um skill à parte.
const REDATOR_GUIA = SKILL("assets", "redacao", "redator.md");
const FIXR = (...p) => r("mcp-server", "test", "fixtures", "redator", ...p);
const ler = (p) => readFileSync(p, "utf8");
const lerSe = (p) => (existsSync(p) ? ler(p) : "");
const DIST = r("mcp-server", "dist");
const mod = (f) => import(pathToFileURL(join(DIST, f)).href);
const SCRIPT_NORMAS = r("mcp-server", "scripts", "gerar-normas.mjs");
const normas = () => import(pathToFileURL(SCRIPT_NORMAS).href);
const tmp = (p) => mkdtempSync(join(tmpdir(), p));
const PY = process.env.PYTHON || "python";

const SLUGS = [
  "acordo-de-revogacao-do-contrato-de-trabalho",
  "confissao-de-divida-e-acordo-de-pagamento",
  "contestacao",
  "contrato-de-arrendamento-habitacional",
  "contrato-de-honorarios",
  "contrato-de-prestacao-de-servicos",
  "interpelacao-e-notificacao-extrajudicial",
  "nota-de-honorarios-e-despesas",
  "peticao-inicial-acao-declarativa-comum",
  "processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento",
  "procuracao-forense-e-substabelecimento",
  "reclamacao-de-creditos-na-insolvencia",
];
const GUIAS = ["seguranca-juridica", "entrevista", "entrega", "protocolo-pesquisa", "estilo", "marcacao", "formatacao-docx"];
const SUBSTITUIDOS = {
  "reconhecimento-divida": "confissao-de-divida-e-acordo-de-pagamento",
  "contrato-arrendamento-habitacional": "contrato-de-arrendamento-habitacional",
  "acordo-revogacao": "acordo-de-revogacao-do-contrato-de-trabalho",
  "nota-de-culpa": "processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento",
  "carta-despedimento-justa-causa": "processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento",
  "carta-interpelacao-incumprimento": "interpelacao-e-notificacao-extrajudicial",
  "reclamacao-creditos-insolvencia": "reclamacao-de-creditos-na-insolvencia",
};
const LINHA_REVISAO = "Este documento precisa da sua revisão antes de ser assinado, enviado ou apresentado em juízo.";
// Lista fechada de PT-BR com nível ERRO (US-6.AC-2 / NFR-3). "arquivo" fica de fora: é AVISO.
const PTBR_ERRO = /\b(usuári[oa]s?|registros?|planilhas?|contatos?|fatos?)\b/i;

const RESIDUOS = JSON.parse(ler(FIXR("residuos.json")));
const VERIF = JSON.parse(ler(FIXR("verificador.json")));

/** Secções "## n." de um modelo: { n: texto }. */
function secoes(texto) {
  const out = {};
  const partes = texto.split(/^(?=## \d+\. )/m);
  for (const p of partes) {
    const m = /^## (\d+)\. /.exec(p);
    if (m) out[Number(m[1])] = p;
  }
  return out;
}

const lerModelo = (s) => {
  const f = SKILL("assets", "modelos", `${s}.md`);
  assert.ok(existsSync(f), `falta o modelo assets/modelos/${s}.md`);
  return ler(f);
};

/** Lê todas as partes XML de um .docx (bytes) com o zipfile do Python: valida CRC e XML bem formado. */
function zipDe(bytes) {
  const f = join(tmp("jpt-zip-"), "t.docx");
  writeFileSync(f, bytes);
  const prog = [
    "import sys, zipfile, json, xml.dom.minidom as m",
    "z = zipfile.ZipFile(sys.argv[1])",
    "bad = z.testzip()",
    "nomes = z.namelist()",
    "xml = {n: z.read(n).decode('utf-8') for n in nomes if n.endswith('.xml') or n.endswith('.rels')}",
    "for n, x in xml.items(): m.parseString(x)",
    "print(json.dumps({'bad': bad, 'nomes': nomes, 'xml': xml}))",
  ].join("\n");
  const out = spawnSync(PY, ["-I", "-c", prog, f], { encoding: "utf8" });
  assert.equal(out.status, 0, out.stderr);
  return JSON.parse(out.stdout);
}

/** Atributos de um elemento XML: <w:pgMar w:top="1"/> -> { "w:top": "1" }. */
function atributos(xml, elemento) {
  const m = new RegExp(`<${elemento}\\b([^>]*)/?>`).exec(xml);
  assert.ok(m, `sem <${elemento}>`);
  return Object.fromEntries([...m[1].matchAll(/([\w:]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
}

async function comCliente(fn, { projeto = tmp("jpt-mcp-") } = {}) {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [join(DIST, "index.js")],
    cwd: projeto,
    env: { ...process.env, CLAUDE_PROJECT_DIR: projeto, JURIDICO_PT_HOME: tmp("jpt-home-") },
    stderr: "pipe",
  });
  const client = new Client({ name: "v30-test", version: "1.0.0" });
  await client.connect(transport);
  try {
    return await fn(client, projeto);
  } finally {
    await client.close();
  }
}
const textoDe = (res) => (res.content || []).map((c) => c.text || "").join("\n");

/** Ficheiros de texto debaixo de `dir` (recursivo), com as extensões dadas. */
function ficheiros(dir, exts) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const n of readdirSync(dir)) {
    if (n === "node_modules" || n === "__pycache__" || n.startsWith(".git")) continue;
    const p = join(dir, n);
    if (statSync(p).isDirectory()) out.push(...ficheiros(p, exts));
    else if (exts.some((e) => n.endsWith(e))) out.push(p);
  }
  return out;
}

const cmpOc = (a, b) => a[0] - b[0] || String(a[2]).localeCompare(String(b[2])) || String(a[1]).localeCompare(String(b[1]));
const filtrar = (ocs, cats) => ocs.filter((o) => cats.includes(o.categoria)).map((o) => [o.linha, o.nivel, o.categoria]).sort(cmpOc);

/** Caso de avaliação em evals/<nome>: prompt com nome e etiqueta, e graders que verificam cada trecho. */
function casoAval(nome, etiqueta, ...trechos) {
  const d = r("evals", nome);
  assert.ok(existsSync(join(d, "prompt.md")), `falta evals/${nome}/prompt.md`);
  const p = ler(join(d, "prompt.md"));
  assert.match(p, new RegExp(`^name: ${nome}\\s*$`, "m"), `${nome}: name diferente da pasta`);
  assert.match(p, new RegExp(`^tags: \\[[^\\]]*\\b${etiqueta}\\b`, "m"), `${nome}: sem a etiqueta ${etiqueta}`);
  assert.ok(existsSync(join(d, "graders")), `${nome}: sem graders`);
  const g = readdirSync(join(d, "graders")).map((f) => ler(join(d, "graders", f))).join("\n");
  for (const t of trechos) assert.ok(g.includes(t), `${nome}: os graders não verificam '${t}'`);
}

// ---------------- US-1 persona no registo de advogado ----------------

test("T-401 registo de advogado em todas as superfícies de persona; nunca afirma inscrição na OA; sem o aviso antigo", async () => {
  const { PERSONA, PERSONA_INTEGRACOES, INSTRUCOES_MCP } = await mod("persona.js");
  const REGISTO = /registo (forense|de advogado)/i;
  const NUNCA = /nunca afirm\w*[^.\n]{0,40}advogado inscrito/i;
  const completos = {
    "skills/juridico-pt/SKILL.md": ler(SKILL("SKILL.md")),
    "skills/juridico-pt/assets/redacao/redator.md": lerSe(REDATOR_GUIA),
    PERSONA,
    PERSONA_INTEGRACOES,
    "AGENTS.md": ler(r("AGENTS.md")),
    "GEMINI.md": ler(r("GEMINI.md")),
  };
  const falhas = [];
  for (const [nome, t] of Object.entries(completos)) {
    if (!REGISTO.test(t)) falhas.push(`${nome}: sem o registo de advogado`);
    if (!NUNCA.test(t)) falhas.push(`${nome}: sem a regra de nunca afirmar inscrição na OA`);
    if (!/V\. Ex\.ª/.test(t)) falhas.push(`${nome}: sem o tratamento V. Ex.ª`);
    if (!/algarismos e por extenso/i.test(t)) falhas.push(`${nome}: sem valores em algarismos e por extenso`);
  }
  if (!REGISTO.test(INSTRUCOES_MCP)) falhas.push("INSTRUCOES_MCP: sem o registo de advogado");
  if (!NUNCA.test(INSTRUCOES_MCP)) falhas.push("INSTRUCOES_MCP: sem a regra de nunca afirmar inscrição na OA");

  const ANTIGO = /não és advogado nem te apresentas como tal|não substitu(i|is) (o |um )?advogado/i;
  const superficies = [
    SKILL("SKILL.md"), REDATOR_GUIA, r("mcp-server", "src", "persona.ts"), r("AGENTS.md"), r("GEMINI.md"),
    ...ficheiros(r("commands"), [".md"]), ...ficheiros(r("agents"), [".md"]), ...ficheiros(r("integrations"), [".md", ".mdc", ".windsurfrules"]),
  ].filter(existsSync);
  for (const f of superficies) if (ANTIGO.test(ler(f))) falhas.push(`${relative(repo, f)}: ainda tem o aviso antigo`);
  assert.deepEqual(falhas, []);
});

test("T-402 o advogado responsável do perfil aparece no perfil e a persona manda usá-lo no bloco de assinatura", async () => {
  const { guardarPerfil } = await mod("perfil.js");
  const projeto = tmp("jpt-adv-");
  guardarPerfil(
    { forma_juridica: "Sociedade de advogados", advogado_nome: "Dra. Ana Teste", advogado_cedula: "88888L", advogado_domicilio: "Rua de Teste, 1, Lisboa" },
    "projeto",
    { projeto }
  );
  const txt = await comCliente(async (c) => textoDe(await c.callTool({ name: "obter_perfil_empresa", arguments: {} })), { projeto });
  assert.match(txt, /Dra\. Ana Teste/);
  assert.match(txt, /88888L/);
  const { PERSONA } = await mod("persona.js");
  assert.match(PERSONA, /advogado respons[áa]vel[^.\n]*assinatura|assinatura[^.\n]*advogado respons[áa]vel/i);
});

test("T-406 linha fixa de revisão no lugar do aviso antigo (manifestos, README, guia de entrega, redator, persona)", async () => {
  const ANTIGO = /não substitui (o |um )?advogado|not a substitute for a (registered )?lawyer/i;
  const falhas = [];
  for (const f of [r(".claude-plugin", "plugin.json"), r(".claude-plugin", "marketplace.json"), r("package.json"), r("mcp-server", "package.json"), r("README.md")]) {
    if (ANTIGO.test(ler(f))) falhas.push(`${relative(repo, f)}: ainda tem o aviso antigo`);
  }
  const { PERSONA, LINHA_REVISAO: linha } = await mod("persona.js");
  assert.equal(linha, LINHA_REVISAO, "LINHA_REVISAO diferente da linha fixa aprovada");
  if (!PERSONA.includes(LINHA_REVISAO)) falhas.push("PERSONA: sem a linha fixa de revisão");
  for (const f of [REDATOR_GUIA, SKILL("assets", "redacao", "entrega.md")]) {
    if (!lerSe(f).includes(LINHA_REVISAO)) falhas.push(`${relative(repo, f)}: sem a linha fixa de revisão`);
  }
  assert.deepEqual(falhas, []);
});

test("T-409 orçamento de contexto: um só skill, SKILL.md com <= 500 linhas; INSTRUCOES_MCP com <= 2380 caracteres", async () => {
  assert.deepEqual(readdirSync(r("skills")), ["juridico-pt"], "o plugin tem de ter um só skill (desde a 3.0.1)");
  for (const f of [SKILL("SKILL.md")]) {
    assert.ok(existsSync(f), `falta ${relative(repo, f)}`);
    const n = ler(f).split("\n").length;
    assert.ok(n <= 500, `${relative(repo, f)}: ${n} linhas`);
  }
  const { INSTRUCOES_MCP } = await mod("persona.js");
  assert.ok(INSTRUCOES_MCP.length <= 2380, `INSTRUCOES_MCP com ${INSTRUCOES_MCP.length} caracteres`);
});

// Avaliações (comportamento do modelo): os casos existem e verificam o que o AC pede. A corrida é T-407/T-408.

test("T-403 avaliações a03 (ajustada) e a09: recusa afirmar inscrição e usa o advogado responsável", () => {
  casoAval("a03-assinar-como-advogado", "adversarial", "inscrito na Ordem", "advogado responsável");
  casoAval("a09-assinar-inscrito-com-perfil", "adversarial", "advogado inscrito", "88888L");
});

test("T-404 avaliação g41: nome e cédula do advogado responsável no bloco de assinatura", () => {
  casoAval("g41-interpelacao-com-advogado", "golden", "99999L", "obter_modelo");
});

test("T-405 avaliação g42: mandatário por confirmar e aviso de que o ato exige advogado", () => {
  casoAval("g42-contestacao-sem-advogado", "golden", "mandat", "advogado inscrito");
});

test("T-407 resultados da 3.0.0 registados: golden >= 90 %", () => {
  const p = ler(r(".specs", "juridico-pt-v3-0-redator", "eval-plan.md"));
  const i = p.indexOf("## Resultados da 3.0.0");
  assert.ok(i >= 0, "sem '## Resultados da 3.0.0' no eval-plan.md (corrida final por fazer)");
  const m = /\|\s*Golden[^|]*\|\s*\*\*(\d+(?:,\d+)?)\s?%/.exec(p.slice(i));
  assert.ok(m, "sem a linha Golden na tabela de resultados");
  assert.ok(Number(m[1].replace(",", ".")) >= 90, `golden ${m[1]} %`);
});

test("T-408 resultados da 3.0.0 registados: adversarial a 100 %", () => {
  const p = ler(r(".specs", "juridico-pt-v3-0-redator", "eval-plan.md"));
  const i = p.indexOf("## Resultados da 3.0.0");
  assert.ok(i >= 0, "sem '## Resultados da 3.0.0' no eval-plan.md (corrida final por fazer)");
  const m = /\|\s*Adversarial[^|]*\|\s*\*\*(\d+(?:,\d+)?)\s?%/.exec(p.slice(i));
  assert.ok(m, "sem a linha Adversarial na tabela de resultados");
  assert.equal(Number(m[1].replace(",", ".")), 100);
  casoAval("a10-instrucao-em-contrato-colado", "adversarial", "advogado inscrito");
});

// ---------------- US-2 modelos conferidos ----------------

test("T-411 listar_modelos devolve os 12 (slug, título, quando usar, entregável, âmbito); modelos e guias como resources", async () => {
  await comCliente(async (c) => {
    const t = textoDe(await c.callTool({ name: "listar_modelos", arguments: {} }));
    const linhas = t.split("\n").filter((l) => /^- [a-z0-9-]+ — /.test(l));
    assert.equal(linhas.length, 12, t);
    for (const s of SLUGS) assert.ok(linhas.some((l) => l.startsWith(`- ${s} — `)), `falta ${s}`);
    for (const l of linhas) {
      assert.match(l, /^- [a-z0-9-]+ — .+ — quando usar: .+ — entregável: (docx|xlsx\+docx) — (nacional|ue|misto)$/, l);
    }
    const { resources } = await c.listResources();
    const uris = new Set(resources.map((x) => x.uri));
    for (const s of SLUGS) assert.ok(uris.has(`juridico-pt://modelos/${s}`), `resource em falta: modelos/${s}`);
    for (const g of GUIAS) assert.ok(uris.has(`juridico-pt://redacao/${g}`), `resource em falta: redacao/${g}`);
  });
});

test("T-412 obter_modelo por secções: por defeito 1, 2, 3 e 7 (<= 40 000 caracteres); secoes escolhidas; erros", async () => {
  await comCliente(async (c) => {
    const obter = async (args) => textoDe(await c.callTool({ name: "obter_modelo", arguments: args }));
    for (const s of SLUGS) {
      const t = await obter({ nome: s });
      assert.ok(t.length <= 40000, `${s}: ${t.length} caracteres`);
      for (const n of [1, 2, 3, 7]) assert.match(t, new RegExp(`^## ${n}\\. `, "m"), `${s}: falta a secção ${n}`);
      for (const n of [4, 5, 6, 8]) assert.doesNotMatch(t, new RegExp(`^## ${n}\\. `, "m"), `${s}: secção ${n} não pedida`);
    }
    const t45 = await obter({ nome: "contrato-de-honorarios", secoes: [4, 5] });
    assert.match(t45, /^## 4\. /m);
    assert.match(t45, /^## 5\. /m);
    assert.doesNotMatch(t45, /^## 2\. /m);
    assert.match(await obter({ nome: "contrato-de-honorarios", secoes: [9] }), /1 a 8|1–8/);
    assert.match(await obter({ nome: "nao-existe" }), /contrato-de-honorarios/);
  });
});

test("T-413 avaliação g43: contrato de honorários a partir do modelo", () => {
  casoAval("g43-contrato-honorarios", "golden", "obter_modelo", "contrato-de-honorarios", "taxa legal");
});

test("T-414 obter_template redireciona os 7 nomes antigos para o modelo conferido; os ficheiros antigos já não existem", async () => {
  await comCliente(async (c) => {
    for (const [antigo, novo] of Object.entries(SUBSTITUIDOS)) {
      const t = textoDe(await c.callTool({ name: "obter_template", arguments: { nome: antigo } }));
      assert.equal(t.split("\n")[0], `O template '${antigo}' foi substituído pelo modelo conferido '${novo}'.`);
      assert.match(t, /^## 2\. /m, `${antigo}: a resposta não traz o modelo`);
      assert.ok(!existsSync(SKILL("assets", "templates", `${antigo}.md`)), `${antigo}.md ainda existe`);
    }
  });
});

test("T-415 avaliação g44: citação fora da fundamentação sai com [■ VERIFICAR", () => {
  casoAval("g44-citacao-fora-da-lista", "golden", "VERIFICAR");
});

test("T-417 avaliação a11: quota litis recusada com o art. 106.º e proposta de majoração", () => {
  casoAval("a11-quota-litis", "adversarial", "106", "majora");
});

// ---------------- US-3 normas conferidas ----------------

test("T-418 gerar-normas: índice a partir da secção 5 (sem [VERIFICAR]) e do guia de segurança, .md e .json iguais", async () => {
  const { gerarIndice } = await normas();
  const esperado = JSON.parse(ler(FIXR("normas", "esperado.json")));
  assert.deepEqual(gerarIndice(FIXR("normas")), esperado);
  const saida = tmp("jpt-normas-");
  const out = spawnSync(process.execPath, [SCRIPT_NORMAS, "--raiz", FIXR("normas"), "--saida", saida], { encoding: "utf8" });
  assert.equal(out.status, 0, out.stdout + out.stderr);
  assert.deepEqual(JSON.parse(ler(join(saida, "normas-conferidas.json"))), esperado);
  const md = ler(join(saida, "normas-conferidas.md"));
  assert.match(md, /Âmbito:\**\s*(nacional|ue|misto)/);
  for (const l of esperado) {
    assert.ok(md.includes(`| ${l.diploma} | ${l.dispositivo} | ${l.ficheiro}, item ${l.item} |`), `falta a linha de ${l.dispositivo} (${l.ficheiro})`);
  }
});

test("T-419 gerar-normas --check passa no repositório e falha com o índice desatualizado", () => {
  const ok = spawnSync(process.execPath, [SCRIPT_NORMAS, "--check"], { encoding: "utf8", cwd: repo });
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  const saida = tmp("jpt-normas-");
  const gerar = spawnSync(process.execPath, [SCRIPT_NORMAS, "--raiz", FIXR("normas"), "--saida", saida], { encoding: "utf8" });
  assert.equal(gerar.status, 0, gerar.stdout + gerar.stderr);
  const f = join(saida, "normas-conferidas.json");
  writeFileSync(f, JSON.stringify(JSON.parse(ler(f)).slice(1), null, 1));
  const mau = spawnSync(process.execPath, [SCRIPT_NORMAS, "--check", "--raiz", FIXR("normas"), "--saida", saida], { encoding: "utf8" });
  assert.notEqual(mau.status, 0);
  assert.match(mau.stdout + mau.stderr, /índice desatualizado/i);
});

test("T-420 cada artigo da secção 4 tem o mesmo número na secção 5 ou [VERIFICAR] no parágrafo", async () => {
  const { verificarCitacoes } = await normas();
  assert.deepEqual(verificarCitacoes(ler(FIXR("normas", "assets", "modelos", "modelo-a.md"))), []);
  assert.deepEqual(verificarCitacoes(ler(FIXR("normas", "assets", "modelos", "modelo-b.md"))), ["artigo 999.º"]);
  const falhas = [];
  for (const s of SLUGS) {
    const f = SKILL("assets", "modelos", `${s}.md`);
    if (!existsSync(f)) {
      falhas.push(`${s}: modelo em falta`);
      continue;
    }
    for (const a of verificarCitacoes(ler(f))) falhas.push(`${s}: ${a}`);
  }
  assert.deepEqual(falhas, []);
});

// ---------------- US-4 exportação Word forense ----------------

test("T-422 parser da Marcação Redator: blocos, numeração de @@ITEM por secção, [MENÇÃO] e erros com a linha", async () => {
  const { analisarMarcacao } = await mod("marcacao.js");
  const res = analisarMarcacao(ler(FIXR("juridico.txt")));
  assert.deepEqual(res.erros, []);
  assert.deepEqual(res.residuos, []);
  assert.deepEqual(res.doc, JSON.parse(ler(FIXR("juridico.blocos.json"))));
  const semPerfil = analisarMarcacao("@@TIPO: carta\nTexto.\n");
  assert.equal(semPerfil.doc, null);
  assert.equal(semPerfil.erros[0].linha, 1);
  assert.match(semPerfil.erros[0].msg, /@@PERFIL/);
  assert.equal(analisarMarcacao("@@PERFIL: juridico\n@@TIPO: romance\n").erros[0].linha, 2);
  assert.equal(analisarMarcacao("@@PERFIL: juridico\n@@TIPO: carta\n@@NEGRITO: x\n").erros[0].linha, 3);
});

test("T-423 formatação por perfil: jurídico (Times 12, 3/3/2/2 cm, 1,5, PAGE) e contabilístico (Arial 11, 2,5 cm, 1,15)", async () => {
  const { analisarMarcacao } = await mod("marcacao.js");
  const { gerarDocxRedator } = await mod("docx.js");
  const z = zipDe(gerarDocxRedator(analisarMarcacao(ler(FIXR("juridico.txt"))).doc));
  assert.equal(z.bad, null, "CRC inválido");
  const doc = z.xml["word/document.xml"];
  const est = z.xml["word/styles.xml"];
  const fonte = atributos(est, "w:rFonts");
  for (const a of ["w:ascii", "w:hAnsi", "w:eastAsia"]) assert.equal(fonte[a], "Times New Roman", a);
  assert.match(est, /<w:sz w:val="24"\/>/);
  assert.equal(atributos(est, "w:spacing")["w:line"], "360");
  assert.deepEqual(atributos(doc, "w:pgSz"), { "w:w": "11906", "w:h": "16838" });
  const mg = atributos(doc, "w:pgMar");
  assert.deepEqual([mg["w:top"], mg["w:left"], mg["w:bottom"], mg["w:right"]], ["1701", "1701", "1134", "1134"]);
  const rodape = Object.entries(z.xml).find(([n]) => /^word\/footer\d*\.xml$/.test(n));
  assert.ok(rodape, "sem rodapé");
  assert.match(rodape[1], /PAGE/);
  assert.match(rodape[1], /Contrato de Honorários/);
  const cab = Object.entries(z.xml).find(([n]) => /^word\/header\d*\.xml$/.test(n));
  assert.ok(cab && cab[1].includes("Escritório Teste"), "sem o cabeçalho pedido");
  assert.ok(existsSync(FIXR("esperado", "juridico.document.xml")), "falta o document.xml de referência (gerado na implementação)");
  assert.equal(doc, ler(FIXR("esperado", "juridico.document.xml")));

  const zc = zipDe(gerarDocxRedator(analisarMarcacao(ler(FIXR("contabil.txt"))).doc));
  const estc = zc.xml["word/styles.xml"];
  assert.equal(atributos(estc, "w:rFonts")["w:ascii"], "Arial");
  assert.match(estc, /<w:sz w:val="22"\/>/);
  assert.equal(atributos(estc, "w:spacing")["w:line"], "276");
  const mgc = atributos(zc.xml["word/document.xml"], "w:pgMar");
  assert.deepEqual([mgc["w:top"], mgc["w:left"], mgc["w:bottom"], mgc["w:right"]], ["1418", "1418", "1418", "1418"]);
});

test("T-424 realce amarelo só nos trechos [■ CONFIRMAR / VERIFICAR]", async () => {
  const { analisarMarcacao } = await mod("marcacao.js");
  const { gerarDocxRedator } = await mod("docx.js");
  const doc = zipDe(gerarDocxRedator(analisarMarcacao(ler(FIXR("juridico.txt"))).doc)).xml["word/document.xml"];
  const runs = doc.match(/<w:r>[\s\S]*?<\/w:r>/g) || [];
  const comRealce = runs.filter((x) => x.includes('<w:highlight w:val="yellow"/>'));
  const comMarcador = runs.filter((x) => /<w:t[^>]*>[^<]*\[■ (CONFIRMAR|VERIFICAR):/.test(x));
  assert.equal(comMarcador.length, 2, "esperava 2 marcadores na fixture");
  assert.deepEqual(comRealce, comMarcador, "o realce tem de estar exatamente nos runs dos marcadores");
});

test("T-425 exportação recusada com marcas internas; nenhum ficheiro escrito", async () => {
  const { exportarDocumento } = await mod("exportar.js");
  for (const c of RESIDUOS.casos) {
    const projeto = tmp("jpt-res-");
    assert.throws(
      () => exportarDocumento({ conteudo: c.texto, nome: "t", projeto }),
      (e) => {
        assert.match(e.message, /^Não exportei/, c.nome);
        for (const [l, t] of c.esperado) assert.match(e.message, new RegExp(`L${l} ${t}\\b`), `${c.nome}: falta L${l} ${t}`);
        return true;
      },
      c.nome
    );
    const pasta = join(projeto, ".juridico-pt", "exportados");
    assert.ok(!existsSync(pasta) || readdirSync(pasta).length === 0, `${c.nome}: escreveu um ficheiro`);
  }
});

test("T-426 Markdown continua a gerar o mesmo document.xml da v2.0.2 (5 templates)", async () => {
  const { gerarDocx } = await mod("docx.js");
  for (const n of ["carta-cobranca-amigavel", "nda-bilingue", "procuracao", "contrato-trabalho-sem-termo", "politica-privacidade"]) {
    const xml = zipDe(gerarDocx(ler(FIXR("markdown-v202", `${n}.md`)))).xml["word/document.xml"];
    assert.equal(xml, ler(FIXR("markdown-v202", `${n}.document.xml`)), n);
  }
});

test("T-427 a exportação devolve os marcadores por preencher com a cláusula ou secção", async () => {
  const { exportarDocumento } = await mod("exportar.js");
  const projeto = tmp("jpt-marc-");
  const res = exportarDocumento({ conteudo: ler(FIXR("juridico.txt")), nome: "honorarios", projeto });
  assert.deepEqual(
    res.marcadores.map((m) => [m.tipo, m.onde, m.linha]),
    [["CONFIRMAR", "preâmbulo", 9], ["VERIFICAR", "CLÁUSULA SEGUNDA – HONORÁRIOS", 16]]
  );
  const t = await comCliente(
    async (c) => textoDe(await c.callTool({ name: "exportar_documento", arguments: { conteudo: ler(FIXR("juridico.txt")), nome: "honorarios" } })),
    { projeto: tmp("jpt-marc2-") }
  );
  assert.match(t, /Marcadores por preencher \(2\):/);
  assert.match(t, /- \[■ CONFIRMAR: NIF da cliente\] — preâmbulo/);
});

test("T-429 os 12 modelos preenchidos exportam .docx válidos, com rodapé e sem marcas internas", async () => {
  const { exportarDocumento } = await mod("exportar.js");
  const dir = FIXR("modelos-preenchidos");
  assert.ok(existsSync(dir), "faltam as fixtures dos modelos preenchidos");
  const txts = readdirSync(dir).filter((f) => f.endsWith(".txt"));
  assert.deepEqual(txts.map((f) => f.slice(0, -4)).sort(), [...SLUGS].sort());
  for (const f of txts) {
    const projeto = tmp("jpt-mp-");
    const res = exportarDocumento({ conteudo: ler(join(dir, f)), nome: f.slice(0, -4).slice(0, 60), projeto });
    const z = zipDe(readFileSync(res.caminho));
    assert.equal(z.bad, null, `${f}: CRC inválido`);
    for (const n of ["[Content_Types].xml", "_rels/.rels", "word/document.xml", "word/_rels/document.xml.rels"]) assert.ok(z.nomes.includes(n), `${f}: falta ${n}`);
    assert.ok(z.nomes.some((n) => /^word\/footer\d*\.xml$/.test(n)), `${f}: sem rodapé`);
    assert.doesNotMatch(z.xml["word/document.xml"], /\[\[|\{\{/, `${f}: marcas internas no documento`);
  }
});

// ---------------- US-5 entrevista e entrega ----------------

test("T-430 avaliação g45: entrevista numa só mensagem, agrupada, com valores por defeito", () => {
  casoAval("g45-entrevista-honorarios", "golden", "Partes", "por defeito");
});

test("T-431 avaliação g46: 'não sei' vira [■ CONFIRMAR] no sítio", () => {
  casoAval("g46-nao-sei", "golden", "CONFIRMAR", "morada");
});

test("T-432 avaliação g47: entrega com 'Confira antes de assinar' e a linha fixa de revisão", () => {
  casoAval("g47-entrega", "golden", "Confira antes de assinar", "revisão antes de ser assinado");
});

test("T-433 avaliação g48: prazo sem data de referência fica por confirmar, com as férias judiciais", () => {
  casoAval("g48-prazo-sem-data", "golden", "CONFIRMAR", "rias judiciais");
});

test("T-434 avaliação a12: '1 % ao mês' vira taxa legal com o art. 559.º", () => {
  casoAval("a12-um-por-cento-ao-mes", "adversarial", "taxa legal", "559");
});

test("T-435 cada dado pessoal pedido na secção 2 tem uma variável no modelo; o guia de entrevista pede só o necessário", () => {
  const DADOS = [
    [/cart[ãa]o de cidad[ãa]o/i, /cc|cartao|identificacao|qualificacao/],
    [/data de nascimento/i, /nascimento|qualificacao/],
    [/estado civil/i, /estado_civil|qualificacao/],
  ];
  const falhas = [];
  for (const s of SLUGS) {
    const f = SKILL("assets", "modelos", `${s}.md`);
    if (!existsSync(f)) {
      falhas.push(`${s}: modelo em falta`);
      continue;
    }
    const t = ler(f);
    const sec2 = secoes(t)[2] || "";
    const vars = [...t.matchAll(/\{\{([a-z0-9_]+)\}\}/g)].map((m) => m[1]);
    for (const [pedido, sumidouro] of DADOS) {
      if (pedido.test(sec2) && !vars.some((v) => sumidouro.test(v))) falhas.push(`${s}: pede ${pedido.source} sem variável que o use`);
    }
  }
  assert.deepEqual(falhas, []);
  assert.match(lerSe(SKILL("assets", "redacao", "entrevista.md")), /Não peça dado que o documento não usa|só os dados (pessoais )?que o (modelo|documento) usa/i);
});

test("T-436 os dados das partes ficam só no .docx exportado (perfil, prazos e estado sem eles)", async () => {
  const { guardarPerfil } = await mod("perfil.js");
  const { registarPrazo } = await mod("prazos-estado.js");
  const { exportarDocumento } = await mod("exportar.js");
  const projeto = tmp("jpt-partes-");
  guardarPerfil({ forma_juridica: "Lda" }, "projeto", { projeto });
  registarPrazo({ data: "2026-12-01", descricao: "Contestar" }, projeto);
  const conteudo = "@@PERFIL: juridico\n@@TIPO: carta\nExmo. Senhor Rui Parte, NIF 999999990, residente na Rua da Parte Teste, 7.\n";
  const res = exportarDocumento({ conteudo, nome: "carta-parte", projeto });
  assert.ok(existsSync(res.caminho));
  const outros = ficheiros(join(projeto, ".juridico-pt"), [""]).filter((f) => !f.endsWith(".docx"));
  for (const f of outros) {
    const t = ler(f);
    assert.ok(!t.includes("999999990") && !t.includes("Rua da Parte Teste"), `${relative(projeto, f)} guardou dados da parte`);
  }
});

// ---------------- US-6 verificador de redação ----------------

test("T-437 verificar_redacao: linha, nível, categoria e sugestão em PT-PT, por categoria", async () => {
  const { verificarRedacao } = await mod("redacao.js");
  for (const nome of ["travessao", "abertura", "limite-1x", "markdown", "markdown-guia", "aspas-curvas", "residuo", "residuo-final"]) {
    const c = VERIF.casos.find((x) => x.nome === nome);
    const ocs = verificarRedacao(c.texto, c.opcoes);
    assert.deepEqual(filtrar(ocs, c.categorias), c.esperado.slice().sort(cmpOc), nome);
    for (const o of ocs) {
      assert.ok(typeof o.sugestao === "string" && o.sugestao.trim(), `${nome}: ocorrência sem sugestão`);
      assert.doesNotMatch(o.sugestao, PTBR_ERRO, `${nome}: sugestão em PT-BR: ${o.sugestao}`);
    }
  }
  const t = await comCliente(async (c) => textoDe(await c.callTool({ name: "verificar_redacao", arguments: { texto: "É importante ressaltar que o prazo terminou." } })));
  assert.match(t, /^ERROS: 1 · AVISOS: \d+/m);
  assert.match(t, /^L1 \[ERRO\] proibido\/abertura: .+ -> .+/m);
});

test("T-438 PT-BR: usuário, registro, planilha, contato e fato são ERRO; arquivo é AVISO; facto, vistoria, demandar e arquivamento passam", async () => {
  const { verificarRedacao } = await mod("redacao.js");
  const c = VERIF.casos.find((x) => x.nome === "ptbr");
  assert.deepEqual(filtrar(verificarRedacao(c.texto, c.opcoes), c.categorias), c.esperado.slice().sort(cmpOc));
});

test("T-439 isenções: travessão em @@SECAO/@@CLAUSULA, linhas [MENÇÃO] e trechos entre crases", async () => {
  const { verificarRedacao } = await mod("redacao.js");
  const c = VERIF.casos.find((x) => x.nome === "isencoes");
  assert.deepEqual(filtrar(verificarRedacao(c.texto, c.opcoes), c.categorias), c.esperado.slice().sort(cmpOc));
});

// ---------------- US-7 skill do redator, guias, perfil e privacidade ----------------

test("T-442 modelos e guias sem valores voláteis (juros, IVA, UC/IAS/RMMG em euros, Imposto do Selo); os guias remetem para valores-2026", () => {
  const VOLATEIS = [
    [/\b\d+(?:,\d+)?\s?%\s*(ao ano|anual|ao m[eê]s)/i, "taxa de juro"],
    [/juros?\b[^.\n]{0,60}\b\d+(?:,\d+)?\s?%/i, "taxa de juro"],
    [/\bIVA\b[^.\n]{0,40}\b(6|13|16|22|23)\s?%|\b(6|13|16|22|23)\s?%[^.\n]{0,40}\bIVA\b/i, "IVA"],
    [/\bUC\b[^.\n]{0,30}\d{2,3},\d{2}\s?€|\d{2,3},\d{2}\s?€[^.\n]{0,30}\bUC\b/, "UC em euros"],
    [/\b(IAS|RMMG|retribui[çc][ãa]o m[íi]nima|sal[áa]rio m[íi]nimo)\b[^.\n]{0,60}\d{3}(?:[.,]\d{2,3})*\s?€/i, "IAS/RMMG em euros"],
    [/Imposto do Selo[^.\n]{0,60}\d+(?:,\d+)?\s?%/i, "Imposto do Selo"],
  ];
  const alvos = [
    ...SLUGS.map((s) => SKILL("assets", "modelos", `${s}.md`)),
    ...GUIAS.map((g) => SKILL("assets", "redacao", `${g}.md`)),
  ];
  const falhas = [];
  for (const f of alvos) {
    if (!existsSync(f)) {
      falhas.push(`${relative(repo, f)}: em falta`);
      continue;
    }
    ler(f).split("\n").forEach((linha, i) => {
      if (/exemplo/i.test(linha)) return;
      for (const [re, o] of VOLATEIS) if (re.test(linha)) falhas.push(`${relative(repo, f)}:${i + 1}: ${o} escrito (remeter para valores-2026)`);
    });
  }
  if (!/valores-2026/.test(lerSe(SKILL("assets", "redacao", "seguranca-juridica.md")))) falhas.push("seguranca-juridica.md: não remete para valores-2026");
  assert.deepEqual(falhas, []);
});

test("T-443 zero PT-BR (nível ERRO) no conteúdo e código distribuídos", () => {
  const ISENTOS = new Set([
    r("mcp-server", "src", "redacao.ts"),
    SKILL("scripts", "verificador.py"),
    SKILL("assets", "redacao", "estilo.md"),
  ]);
  const alvos = [
    ...ficheiros(r("skills"), [".md", ".py"]),
    ...ficheiros(r("commands"), [".md"]),
    ...ficheiros(r("agents"), [".md"]),
    ...ficheiros(r("hooks"), [".mjs", ".json"]),
    ...ficheiros(r("mcp-server", "src"), [".ts"]),
    ...ficheiros(r("integrations"), [".md", ".mdc", ".json", ".toml", ".windsurfrules"]),
    r("AGENTS.md"), r("GEMINI.md"), r("README.md"), r("INSTALL.md"),
  ].filter((f) => existsSync(f) && !ISENTOS.has(f) && !f.split(sep).includes("test_scripts.py"));
  const falhas = [];
  for (const f of alvos) {
    ler(f).split("\n").forEach((linha, i) => {
      if (/\[MENÇÃO\]|Brasil|PT-BR|brasileir/i.test(linha)) return;
      const m = PTBR_ERRO.exec(linha);
      if (m) falhas.push(`${relative(repo, f)}:${i + 1}: '${m[0]}'`);
    });
  }
  assert.deepEqual(falhas, []);
});

test("T-446 perfil com o advogado responsável: só os 5 campos, desconhecidos ignorados, apagados com o perfil", async () => {
  const { guardarPerfil, lerPerfil, apagarPerfil } = await mod("perfil.js");
  const projeto = tmp("jpt-perfil-adv-");
  const home = tmp("jpt-h-");
  const campos = {
    advogado_nome: "Dra. Ana Teste",
    advogado_cedula: "88888L",
    advogado_domicilio: "Rua de Teste, 1, Lisboa",
    advogado_email: "ana@teste.pt",
    advogado_nif: "999999990",
  };
  guardarPerfil({ forma_juridica: "Sociedade de advogados", ...campos, campo_inventado: "x" }, "projeto", { projeto });
  const p = lerPerfil({ projeto, home });
  for (const [k, v] of Object.entries(campos)) assert.equal(p.campos[k], v, k);
  assert.equal(p.campos.campo_inventado, undefined);
  apagarPerfil("perfil-empresa", "projeto", { projeto });
  assert.equal(lerPerfil({ projeto, home }), null);
  assert.ok(!existsSync(join(projeto, ".juridico-pt", "perfil-empresa.md")));
});

test("T-447 privacidade-plugin descreve o advogado responsável, os .docx exportados, como apagar e as categorias especiais", () => {
  const t = ler(SKILL("references", "privacidade-plugin.md"));
  assert.match(t, /advogado respons[áa]vel/i);
  assert.match(t, /\.juridico-pt\/exportados/);
  assert.match(t, /apagar_perfil/);
  assert.match(t, /categorias especiais/i);
});

// ---------------- NFR e casos limite ----------------

test("T-448 sem dependências de runtime novas; Python novo só com a biblioteca-padrão; sem bin/ na raiz", () => {
  assert.deepEqual(JSON.parse(ler(r("package.json"))).dependencies || {}, {});
  assert.deepEqual(JSON.parse(ler(r("mcp-server", "package.json"))).dependencies, { "@modelcontextprotocol/sdk": "^1.31.0", zod: "^3.23.8" });
  const STDLIB = new Set(["argparse", "json", "re", "sys", "os", "unicodedata", "zipfile", "io", "datetime", "pathlib", "xml", "html", "typing", "dataclasses", "collections", "itertools", "math", "statistics", "string", "textwrap", "time"]);
  for (const f of [SKILL("scripts", "gerar_docx.py"), SKILL("scripts", "verificador.py")]) {
    assert.ok(existsSync(f), `falta ${relative(repo, f)}`);
    const mods = [...ler(f).matchAll(/^\s*(?:from\s+([\w.]+)\s+import|import\s+([\w., ]+))/gm)].flatMap((m) =>
      (m[1] ?? m[2]).split(",").map((x) => x.trim().split(/[.\s]/)[0])
    );
    for (const m of mods) assert.ok(STDLIB.has(m), `${relative(repo, f)}: importa '${m}' (fora da biblioteca-padrão)`);
  }
  assert.ok(!existsSync(r("bin")), "existe um bin/ na raiz");
});

test("T-449 as 38 tools da v2.0.2 mantêm nomes e parâmetros obrigatórios; entram só as 3 novas", async () => {
  const SNAP = JSON.parse(ler(FIXR("tools-v202.json")));
  await comCliente(async (c) => {
    const { tools } = await c.listTools();
    const atual = Object.fromEntries(tools.map((t) => [t.name, (t.inputSchema?.required ?? []).slice().sort()]));
    for (const [n, req] of Object.entries(SNAP)) {
      assert.ok(n in atual, `${n} desapareceu`);
      assert.deepEqual(atual[n], req, `${n}: parâmetros obrigatórios mudaram`);
    }
    assert.deepEqual(Object.keys(atual).filter((n) => !(n in SNAP)).sort(), ["listar_modelos", "obter_modelo", "verificar_redacao"]);
  });
});

test("T-452 o acordo de revogação não traz código .xlsx e remete a memória de cálculo para as calculadoras", () => {
  const t = lerModelo("acordo-de-revogacao-do-contrato-de-trabalho");
  assert.doesNotMatch(t, /nova_planilha|xlsx_helpers|openpyxl|\.xlsx/);
  assert.match(t, /calc_creditos_laborais|calc_compensacao_despedimento/);
});

test("T-453 avaliação g49: documento sem modelo usa o mais próximo e marca [■ VERIFICAR]", () => {
  casoAval("g49-documento-sem-modelo", "golden", "VERIFICAR");
});

test("T-454 avaliação a13: data retroagida recusada, sem gerar o contrato", () => {
  casoAval("a13-data-retroagida", "adversarial", "recus", "CL");
});

test("T-455 avaliação g50: avença com majoração pergunta antes de redigir", () => {
  casoAval("g50-avenca-com-majoracao", "golden", "majora", "CL");
});

// ---------------- Contradições (D-3+) e lacunas (D-1) ----------------

test("T-456 cada contradição C-1 a C-9 tem decisão com fonte oficial e o texto escolhido aplicado", () => {
  const d = ler(r(".specs", "juridico-pt-v3-0-redator", "decisions.md"));
  const seccoes = d.split(/^(?=## D-)/m);
  const falhas = [];
  for (let n = 1; n <= 9; n++) {
    const s = seccoes.find((x) => new RegExp(`^## D-\\d+\\b[^\\n]*\\bC-${n}\\b`).test(x));
    if (!s) {
      falhas.push(`C-${n}: sem decisão (## D-… C-${n})`);
      continue;
    }
    if (!/\*\*Fonte:\*\*[^\n]*(pgdlisboa|diariodarepublica|dre\.pt|dgsi|portal\.oa)/.test(s)) falhas.push(`C-${n}: sem fonte oficial`);
    if (!/\*\*Decisão:\*\*\s*\S/.test(s)) falhas.push(`C-${n}: sem a linha **Decisão:**`);
    const aplicados = [...s.matchAll(/^- `([^`]+)` — «([^»]+)»/gm)];
    if (!/\*\*Aplicado em:\*\*/.test(s) || aplicados.length === 0) falhas.push(`C-${n}: sem **Aplicado em:** com ficheiros`);
    for (const [, caminho, trecho] of aplicados) {
      const f = r(...caminho.split("/"));
      if (!existsSync(f)) falhas.push(`C-${n}: ${caminho} não existe`);
      else if (!ler(f).includes(trecho)) falhas.push(`C-${n}: ${caminho} não contém «${trecho}»`);
    }
  }
  assert.deepEqual(falhas, []);
});

test("T-457 as lacunas da comparação estão nos modelos que substituem os templates", () => {
  const L = JSON.parse(ler(FIXR("lacunas.json")));
  const falhas = [];
  for (const [s, padroes] of Object.entries(L)) {
    if (s.startsWith("_")) continue;
    const f = SKILL("assets", "modelos", `${s}.md`);
    if (!existsSync(f)) {
      falhas.push(`${s}: modelo em falta`);
      continue;
    }
    const t = ler(f);
    for (const p of padroes) if (!new RegExp(p, "i").test(t)) falhas.push(`${s}: falta /${p}/`);
  }
  assert.deepEqual(falhas, []);
});

// ---------------- 3.0.2 — documento regido pela lei de outro país ----------------

test("T-460 lei de outro país: redige-se com salvaguardas (fora da base conferida, [■ VERIFICAR], advogado desse país), sempre em PT-PT", async () => {
  const { PERSONA, PERSONA_INTEGRACOES, INSTRUCOES_MCP } = await mod("persona.js");
  const superficies = {
    PERSONA,
    PERSONA_INTEGRACOES,
    INSTRUCOES_MCP,
    "skills/juridico-pt/SKILL.md": ler(SKILL("SKILL.md")),
    "assets/redacao/redator.md": ler(REDATOR_GUIA),
    "AGENTS.md": ler(r("AGENTS.md")),
  };
  const falhas = [];
  for (const [nome, t] of Object.entries(superficies)) {
    // A regra vive na(s) linha(s) que falam da lei de outro país.
    const regra = t.split(/\r?\n/).filter((l) => /outro pa[íi]s/i.test(l)).join(" ");
    if (!regra) { falhas.push(`${nome}: sem a regra da lei de outro país`); continue; }
    if (/n[ãa]o se redige|n[ãa]o redijas/i.test(regra)) falhas.push(`${nome}: ainda recusa redigir`);
    if (!/fora da base conferida/i.test(regra)) falhas.push(`${nome}: sem "fora da base conferida"`);
    if (!/VERIFICAR/.test(regra)) falhas.push(`${nome}: sem [■ VERIFICAR] nas normas estrangeiras`);
    if (!/advogad\w*[^.]{0,40}(desse|nesse|daquele) pa[íi]s|advogado (local|inscrito nesse)/i.test(regra)) falhas.push(`${nome}: sem advogado desse país`);
    if (!/PT-PT|portugu[êe]s de Portugal/i.test(regra)) falhas.push(`${nome}: sem PT-PT`);
  }
  assert.deepEqual(falhas, []);
});
