/**
 * Testes da v3.1 (juridico-pt-v3-1-fichas): o catálogo de fichas Skills Jurídicas PRO no skill juridico-pt.
 * T-IDs no nome de cada teste (trace_check {code: true}). Correm sobre o dist/ compilado
 * (cd mcp-server && npm run build && node --test test/v31.test.mjs).
 *
 * Os testes de conteúdo percorrem skills/juridico-pt/assets/fichas/ (gerado pelo importador); os do
 * importador correm sobre a fixture test/fixtures/fichas/ numa pasta temporária, sem rede.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync, mkdtempSync, readdirSync, cpSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..", "..");
const r = (...p) => resolve(repo, ...p);
const SKILL = (...p) => r("skills", "juridico-pt", ...p);
const FICHAS = (...p) => SKILL("assets", "fichas", ...p);
const FIX = (...p) => r("mcp-server", "test", "fixtures", "fichas", ...p);
const DIST = r("mcp-server", "dist");
const IMPORTADOR = r("mcp-server", "scripts", "importar-fichas.mjs");
const AO90 = r("mcp-server", "scripts", "ao90.json");
const ORIGEM_REAL = process.env.JURIDICO_PT_KIT_FICHAS || "C:/Users/Administrator/Downloads/skills-juridicas-pro";
const ler = (p) => readFileSync(p, "utf8");
const lerSe = (p) => (existsSync(p) ? ler(p) : "");
const tmp = (p) => mkdtempSync(join(tmpdir(), p));
const mod = (f) => import(pathToFileURL(join(DIST, f)).href);

const SIGLAS_25 = ["CC", "RGPD", "CIRE", "CPC", "CT", "CP", "CPP", "CSC", "RJUE", "CPTA", "TFUE", "CPI", "CPA", "LGT", "CCP", "CPPT", "RGCO", "CDADC", "CIRC", "CRP", "CIRS", "RGIT", "CE", "CIMI", "LAV"];
const PTBR_ERRO = /\b(usuári[oa]s?|registros?|planilhas?|contatos?|fatos?)\b/i;
const MANTER = ["facto", "contacto", "impacto", "pacto", "secção"];

/** Fichas importadas (ficheiros .md com código no nome). */
function ficheirosFichas(raiz = FICHAS()) {
  const out = [];
  if (!existsSync(raiz)) return out;
  for (const pasta of readdirSync(raiz)) {
    const d = join(raiz, pasta);
    if (!statSync(d).isDirectory()) continue;
    for (const f of readdirSync(d)) if (/^[A-Z]+-\d+.*\.md$/.test(f)) out.push(join(d, f));
  }
  return out;
}

/** Frontmatter simples (chave: valor, uma linha). */
function frontmatter(texto) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(texto);
  if (!m) return null;
  const o = {};
  for (const l of m[1].split(/\r?\n/)) {
    const k = /^([a-z_]+):\s*(.*)$/.exec(l);
    if (k) o[k[1]] = k[2].replace(/^"(.*)"$/, "$1");
  }
  return o;
}

const indice = () => JSON.parse(ler(FICHAS("indice.json")));

async function comCliente(fn) {
  const projeto = tmp("jpt-v31-");
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [join(DIST, "index.js")],
    cwd: projeto,
    env: { ...process.env, CLAUDE_PROJECT_DIR: projeto, JURIDICO_PT_HOME: tmp("jpt-home-") },
    stderr: "pipe",
  });
  const client = new Client({ name: "v31-test", version: "1.0.0" });
  await client.connect(transport);
  try {
    return await fn(client);
  } finally {
    await client.close();
  }
}
const textoDe = (res) => (res.content || []).map((c) => c.text || "").join("\n");
const chamar = (c, name, args) => c.callTool({ name, arguments: args }).then(textoDe);

/** Corre o importador sobre a fixture numa cópia temporária do lado do skill. */
function importarFixture() {
  const skill = tmp("jpt-fichas-skill-");
  cpSync(FIX("skill"), skill, { recursive: true });
  const out = spawnSync(process.execPath, [IMPORTADOR, "--origem", FIX("kit"), "--skill", skill], { encoding: "utf8" });
  return { skill, out, f: (...p) => join(skill, "assets", "fichas", ...p) };
}
function fichaFixture(skill, codigo) {
  const f = ficheirosFichas(join(skill, "assets", "fichas")).find((x) => x.includes(codigo));
  assert.ok(f, `a fixture não gerou a ficha ${codigo}`);
  return ler(f);
}

function casoAval(nome, etiqueta, ...trechos) {
  const d = r("evals", nome);
  assert.ok(existsSync(join(d, "prompt.md")), `falta evals/${nome}/prompt.md`);
  const p = ler(join(d, "prompt.md"));
  assert.match(p, new RegExp(`^name: ${nome}\\s*$`, "m"), `${nome}: name diferente da pasta`);
  assert.match(p, new RegExp(`^tags: \\[[^\\]]*\\b${etiqueta}\\b`, "m"), `${nome}: sem a etiqueta ${etiqueta}`);
  const g = readdirSync(join(d, "graders")).map((f) => ler(join(d, "graders", f))).join("\n");
  for (const t of trechos) assert.ok(g.includes(t), `${nome}: os graders não verificam '${t}'`);
}

// ---------------- US-1 fichas a pedido ----------------

test("T-501 cada ficha importada no sítio certo e com o frontmatter completo; total = catálogo menos as mesmo-documento", () => {
  const fichas = ficheirosFichas();
  assert.ok(fichas.length > 1000, `só ${fichas.length} fichas importadas`);
  const idx = indice();
  const sobre = JSON.parse(ler(FICHAS("sobreposicoes.json")));
  const mesmo = Object.entries(sobre).filter(([, v]) => v.relacao === "mesmo-documento").length;
  assert.equal(fichas.length, idx.total_catalogo - mesmo, "fichas ≠ catálogo − mesmo-documento");
  const falhas = [];
  for (const f of fichas) {
    const fm = frontmatter(ler(f));
    const nome = relative(FICHAS(), f).replace(/\\/g, "/");
    if (!fm) { falhas.push(`${nome}: sem frontmatter`); continue; }
    for (const k of ["codigo", "area", "titulo", "titulo_en", "descricao", "descricao_en", "ambito", "estado_citacoes"]) if (!fm[k]) falhas.push(`${nome}: sem ${k}`);
    if (!/^\d\d-[a-z0-9-]+\/[A-Z]+-\d+-[a-z0-9-]+\.md$/.test(nome)) falhas.push(`${nome}: caminho fora do formato <NN-área>/<CÓDIGO>-<slug>.md`);
    if (fm.codigo && !nome.includes(`/${fm.codigo}-`)) falhas.push(`${nome}: código do ficheiro ≠ frontmatter`);
  }
  assert.deepEqual(falhas.slice(0, 20), []);
});

test("T-502 procurar_ficha: termo PT, área e sem nada (22 áreas); até 20 linhas com código, títulos PT/EN, área e estado; < 200 ms", async () => {
  await comCliente(async (c) => {
    const t0 = performance.now();
    const pt = await chamar(c, "procurar_ficha", { termo: "responsabilidades parentais" });
    const dt = performance.now() - t0;
    const linhas = pt.split("\n").filter((l) => /^- [A-Z]+-\d+/.test(l));
    assert.ok(linhas.length > 0 && linhas.length <= 20, `linhas: ${linhas.length}`);
    assert.match(linhas[0], /^- [A-Z]+-\d+ — .+ \/ .+ — .+ — citações: /);
    const area = await chamar(c, "procurar_ficha", { area: "FAM" });
    assert.ok(area.split("\n").filter((l) => /^- FAM-\d+/.test(l)).length > 0, "a área FAM não devolveu fichas");
    const nada = await chamar(c, "procurar_ficha", {});
    assert.equal(nada.split("\n").filter((l) => /^- [A-Z]+ — /.test(l)).length, 22, "sem termo nem área devia listar as 22 áreas");
    assert.ok(dt < 200 || process.env.CI, `procurar_ficha demorou ${dt.toFixed(0)} ms`);
  });
});

test("T-503 obter_ficha: cabeçalho com estado das citações, ordem modelo → template → ficha, valores-2026 e redator.md; < 50 ms", async () => {
  await comCliente(async (c) => {
    await chamar(c, "obter_ficha", { codigo: "FAM-006" });
    const t0 = performance.now();
    const t = await chamar(c, "obter_ficha", { codigo: "FAM-006" });
    const dt = performance.now() - t0;
    assert.match(t, /citações:\s*\d+ conferidas?/i);
    assert.match(t, /modelo conferido[^\n]*template[^\n]*ficha/i);
    assert.match(t, /valores-2026/);
    assert.match(t, /assets\/redacao\/redator\.md/);
    assert.match(t, /^# /m, "sem o corpo da ficha");
    assert.ok(dt < 50 || process.env.CI, `obter_ficha demorou ${dt.toFixed(0)} ms`);
  });
});

test("T-504 obter_ficha com código inexistente devolve 5 sugestões", async () => {
  await comCliente(async (c) => {
    const t = await chamar(c, "obter_ficha", { codigo: "FAM-999" });
    assert.match(t, /Não há a ficha FAM-999/);
    assert.equal(t.split("\n").filter((l) => /^- [A-Z]+-\d+/.test(l)).length, 5);
  });
});

test("T-505 _INDICE.md bilingue em cada uma das 22 áreas e secção das fichas no SKILL.md (também sem MCP)", () => {
  const idx = indice();
  assert.equal(idx.areas.length, 22);
  const falhas = [];
  for (const a of idx.areas) {
    const t = lerSe(FICHAS(a.pasta, "_INDICE.md"));
    if (!t) { falhas.push(`${a.pasta}: sem _INDICE.md`); continue; }
    for (const e of idx.fichas.filter((x) => x.pasta === a.pasta && x.ficheiro)) {
      if (!t.includes(e.codigo) || !t.includes(e.titulo_en)) falhas.push(`${a.pasta}: ${e.codigo} fora do índice ou sem título EN`);
    }
  }
  assert.deepEqual(falhas.slice(0, 20), []);
  const skill = ler(SKILL("SKILL.md"));
  assert.match(skill, /assets\/fichas\//);
  assert.match(skill, /_INDICE\.md/);
  assert.match(skill, /procurar_ficha/);
  assert.match(skill, /obter_ficha/);
});

// ---------------- US-2 sem duplicar ----------------

test("T-506 sobreposicoes.json: códigos no índice, alvos que existem no skill e relações válidas", () => {
  const sobre = JSON.parse(ler(FICHAS("sobreposicoes.json")));
  const idx = indice();
  const codigos = new Set(idx.fichas.map((e) => e.codigo));
  const falhas = [];
  assert.ok(Object.keys(sobre).length >= 20, "mapa de sobreposições quase vazio");
  for (const [cod, v] of Object.entries(sobre)) {
    if (!codigos.has(cod)) falhas.push(`${cod}: não está no índice`);
    if (!["mesmo-documento", "complementa"].includes(v.relacao)) falhas.push(`${cod}: relação ${v.relacao}`);
    if (!existsSync(SKILL(`${v.alvo}.md`))) falhas.push(`${cod}: alvo ${v.alvo} não existe`);
  }
  assert.deepEqual(falhas, []);
});

test("T-507 as mesmo-documento não são importadas e as tools devolvem a remissão (INS-008 → modelo de reclamação de créditos)", async () => {
  const sobre = JSON.parse(ler(FICHAS("sobreposicoes.json")));
  const mesmo = Object.entries(sobre).filter(([, v]) => v.relacao === "mesmo-documento").map(([k]) => k);
  const fichas = ficheirosFichas().map((f) => f.replace(/\\/g, "/"));
  const importadas = mesmo.filter((c) => fichas.some((f) => f.includes(`/${c}-`)));
  assert.deepEqual(importadas, [], "há fichas mesmo-documento importadas");
  assert.equal(sobre["INS-008"]?.relacao, "mesmo-documento");
  await comCliente(async (c) => {
    const t = await chamar(c, "obter_ficha", { codigo: "INS-008" });
    assert.match(t, /reclamacao-de-creditos-na-insolvencia/);
    assert.match(t, /obter_modelo/);
    const p = await chamar(c, "procurar_ficha", { termo: "reclamação de créditos na insolvência" });
    assert.match(p, /INS-008 → /);
  });
});

test("T-508 uma ficha complementa é importada e o cabeçalho nomeia o conteúdo do plugin com que se cruza", async () => {
  const sobre = JSON.parse(ler(FICHAS("sobreposicoes.json")));
  const [cod, v] = Object.entries(sobre).find(([, x]) => x.relacao === "complementa") || [];
  assert.ok(cod, "nenhuma ficha complementa no mapa");
  await comCliente(async (c) => {
    const t = await chamar(c, "obter_ficha", { codigo: cod });
    assert.ok(t.includes(v.alvo), `o cabeçalho de ${cod} não nomeia ${v.alvo}`);
    assert.match(t, /^# /m);
  });
});

test("T-509 redator.md, passo 1: modelo conferido → template → ficha → protocolo de pesquisa", () => {
  const t = ler(SKILL("assets", "redacao", "redator.md"));
  const passo = (/\*\*1\. Identificar[\s\S]*?(?=\*\*2\. )/.exec(t) || [""])[0];
  const pos = ["modelo", "template", "ficha", "protocolo de pesquisa"].map((p) => passo.search(new RegExp(p, "i")));
  assert.ok(pos.every((p) => p >= 0), `passo 1 sem algum dos quatro: ${pos}`);
  assert.ok(pos[0] < pos[1] && pos[1] < pos[2] && pos[2] < pos[3], `ordem errada: ${pos}`);
  assert.match(passo, /procurar_ficha|obter_ficha/);
});

// ---------------- US-3 PT-PT, persona e valores ----------------

test("T-510 grafia: zero formas da lista AO90, zero PT-BR e zero 'por quê' nas fichas; o importador mantém facto/contacto/secção e opt-out/factoring", () => {
  const ao90 = JSON.parse(ler(AO90));
  assert.ok(Object.keys(ao90.converter).length >= 100, "lista AO90 curta demais");
  for (const m of MANTER) assert.ok(ao90.manter.includes(m), `ao90.json não lista '${m}' em manter`);
  const antigas = Object.keys(ao90.converter);
  const re = new RegExp(`(?<![\\wÀ-ú])(${antigas.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\wÀ-ú])`, "i");
  const falhas = [];
  for (const f of ficheirosFichas()) {
    const t = ler(f);
    const m = re.exec(t);
    if (m) falhas.push(`${relative(FICHAS(), f)}: AO90 «${m[0]}»`);
    const b = PTBR_ERRO.exec(t);
    if (b) falhas.push(`${relative(FICHAS(), f)}: PT-BR «${b[0]}»`);
    if (/por quê/i.test(t)) falhas.push(`${relative(FICHAS(), f)}: «por quê»`);
  }
  assert.ok(ficheirosFichas().length > 0, "sem fichas");
  assert.deepEqual(falhas.slice(0, 20), []);
  // Fixture: o importador converte e mantém o que deve manter.
  const { skill, out } = importarFixture();
  assert.equal(out.status, 0, out.stderr);
  const tra = fichaFixture(skill, "TRA-905");
  for (const nova of ["ação", "atividade", "objeto", "setor", "porquê"]) assert.ok(tra.includes(nova), `TRA-905 sem '${nova}'`);
  for (const velha of ["acção", "actividade", "objecto", "sector ", "por quê"]) assert.ok(!tra.includes(velha), `TRA-905 ainda com '${velha}'`);
  for (const fica of ["factos", "contacto", "secção", "impacto", "opt-out", "factoring"]) assert.ok(tra.includes(fica), `TRA-905 perdeu '${fica}'`);
  const est = fichaFixture(skill, "EST-905");
  assert.doesNotMatch(est, PTBR_ERRO);
  assert.match(est, /utilizador/);
  assert.match(est, /registo/);
  const com = fichaFixture(skill, "COM-905");
  assert.match(com, /redação/);
  assert.match(com, /direção/);
});

test("T-511 persona: sem o aviso antigo, sem 'És um advogado', sem afirmar inscrição na OA", () => {
  const falhas = [];
  for (const f of ficheirosFichas()) {
    const t = ler(f);
    if (/Não substitui o juízo do advogado/i.test(t)) falhas.push(`${relative(FICHAS(), f)}: aviso antigo`);
    if (/És um(a)? advogad/i.test(t)) falhas.push(`${relative(FICHAS(), f)}: 'És um advogado'`);
    if (/(?<!não |nunca )\b(sou|somos) advogad\w* inscrit/i.test(t)) falhas.push(`${relative(FICHAS(), f)}: afirma inscrição`);
  }
  assert.ok(ficheirosFichas().length > 0, "sem fichas");
  assert.deepEqual(falhas.slice(0, 20), []);
  const { skill } = importarFixture();
  const sau = fichaFixture(skill, "SAU-905");
  assert.doesNotMatch(sau, /## Disclaimer/);
  assert.doesNotMatch(sau, /És um advogado/);
});

test("T-512 marcadores de falta no formato da casa: [■ VERIFICAR: …] e nenhum [VERIFICAR sem ■", () => {
  const falhas = [];
  for (const f of ficheirosFichas()) if (/\[VERIFICAR/.test(ler(f))) falhas.push(relative(FICHAS(), f));
  assert.ok(ficheirosFichas().length > 0, "sem fichas");
  assert.deepEqual(falhas.slice(0, 20), []);
  const { skill } = importarFixture();
  assert.match(fichaFixture(skill, "TRA-905"), /\[■ VERIFICAR: o que é necessário\]/);
});

test("T-513 grandezas anuais (salário mínimo, IAS, UC) não ficam escritas nas fichas: remissão para valores-2026", () => {
  const RE = /(salário mínimo|retribuição mínima mensal garantida|RMMG|\bIAS\b|unidade de conta|\bUC\b)[^.\n]{0,25}?(€\s?\d{2,4}(?:[.,]\d+)?|\d{2,4}(?:[.,]\d+)?\s?€)/i;
  const falhas = [];
  for (const f of ficheirosFichas()) { const m = RE.exec(ler(f)); if (m) falhas.push(`${relative(FICHAS(), f)}: «${m[0]}»`); }
  assert.ok(ficheirosFichas().length > 0, "sem fichas");
  assert.deepEqual(falhas.slice(0, 20), []);
  const { skill } = importarFixture();
  const tra = fichaFixture(skill, "TRA-905");
  assert.match(tra, /salário mínimo nacional \(\[valor do ano em valores-2026\]\)/);
  assert.doesNotMatch(tra, /870/);
});

// ---------------- US-4 citações ----------------

test("T-514 citacoes.json: estado em todas; nenhuma conferida sem prova; contagens = frontmatter", () => {
  const cit = JSON.parse(ler(FICHAS("citacoes.json")));
  const normas = JSON.parse(ler(SKILL("references", "normas-conferidas.json")));
  const chaveNorma = new Set(normas.map((n) => `${n.diploma}|${n.dispositivo}`));
  const epi = {};
  for (const f of readdirSync(SKILL("references", "epigrafes"))) { const e = JSON.parse(ler(SKILL("references", "epigrafes", f))); epi[e.sigla] = e.artigos; }
  const ESTADOS = ["conferida (índice)", "conferida (epígrafe)", "corrigida", "por conferir"];
  const falhas = [];
  const contagem = {};
  for (const c of cit) {
    if (!ESTADOS.includes(c.estado)) falhas.push(`${c.codigo}: estado ${c.estado}`);
    if (c.estado === "conferida (índice)" && !chaveNorma.has(`${c.diploma_indice}|${c.dispositivo}`)) falhas.push(`${c.codigo}: «${c.texto}» dada como no índice sem entrada`);
    if ((c.estado === "conferida (epígrafe)" || c.estado === "corrigida") && !(epi[c.sigla] && epi[c.sigla][c.artigo])) falhas.push(`${c.codigo}: «${c.texto}» sem artigo nas epígrafes`);
    if (c.estado === "conferida (epígrafe)" && !c.prova) falhas.push(`${c.codigo}: «${c.texto}» sem prova registada`);
    const k = (contagem[c.codigo] ??= { conferidas: 0, corrigidas: 0, por_conferir: 0 });
    if (c.estado.startsWith("conferida")) k.conferidas++; else if (c.estado === "corrigida") k.corrigidas++; else k.por_conferir++;
  }
  for (const e of indice().fichas.filter((x) => x.ficheiro)) {
    const k = contagem[e.codigo] || { conferidas: 0, corrigidas: 0, por_conferir: 0 };
    if (JSON.stringify(k) !== JSON.stringify(e.estado)) falhas.push(`${e.codigo}: índice ${JSON.stringify(e.estado)} ≠ citações ${JSON.stringify(k)}`);
  }
  assert.deepEqual(falhas.slice(0, 20), []);
});

test("T-515 epígrafes dos 25 diplomas com fonte, URL e data; CT 150.º–157.º iguais ao PGDL de 2026-10-27", () => {
  const falhas = [];
  for (const s of SIGLAS_25) {
    const f = SKILL("references", "epigrafes", `${s}.json`);
    if (!existsSync(f)) { falhas.push(`${s}: falta`); continue; }
    const e = JSON.parse(ler(f));
    if (e.sigla !== s) falhas.push(`${s}: sigla ${e.sigla}`);
    for (const k of ["diploma", "fonte", "url", "obtido_em"]) if (!e[k]) falhas.push(`${s}: sem ${k}`);
    if (!e.artigos || Object.keys(e.artigos).length < 10) falhas.push(`${s}: poucos artigos`);
  }
  assert.deepEqual(falhas, []);
  const ct = JSON.parse(ler(SKILL("references", "epigrafes", "CT.json"))).artigos;
  const esperado = JSON.parse(ler(FIX("skill", "references", "epigrafes", "CT.json"))).artigos;
  for (const [n, ep] of Object.entries(esperado)) assert.equal(ct[n], ep, `CT art. ${n}.º`);
});

test("T-516 importador (fixture): inexistente com [■ VERIFICAR] e nota; correção só com decisão; 78.º-A; diploma por extenso; ficha sem citações", () => {
  const { skill, out, f } = importarFixture();
  assert.equal(out.status, 0, out.stderr);
  const cit = JSON.parse(ler(f("citacoes.json")));
  const de = (cod) => cit.filter((c) => c.codigo === cod);
  const civ = de("CIV-905");
  assert.equal(civ.find((c) => c.artigo === "78-A")?.estado, "conferida (epígrafe)", "78.º-A do CIVA");
  assert.equal(civ.find((c) => c.artigo === "342")?.estado, "conferida (índice)", "art. 342.º do Código Civil por extenso");
  assert.equal(civ.find((c) => c.artigo === "999")?.estado, "por conferir");
  assert.match(fichaFixture(skill, "CIV-905"), /999\.º CT[^\n]*\[■ VERIFICAR: o artigo 999\.º não existe/);
  const tra = de("TRA-905");
  assert.equal(tra.find((c) => c.artigo === "150")?.estado, "conferida (epígrafe)");
  assert.equal(tra.filter((c) => c.estado === "corrigida").length, 2, "as duas correções com decisão");
  const t = fichaFixture(skill, "TRA-905");
  assert.match(t, /Art\. 153\.º CT \(conteúdo do contrato/);
  assert.match(t, /Art\. 154\.º CT \(retribuição proporcional/);
  assert.match(t, /Art\. 157\.º CT \(proibição de trabalho suplementar habitual\) \[■ VERIFICAR:/);
  assert.match(fichaFixture(skill, "FAM-905"), /^estado_citacoes: "?sem citações"?$/m);
  // Sem decisão, nenhuma correção: um número errado sem entrada em revisao-citacoes fica por conferir.
  assert.ok(!cit.some((c) => c.estado === "corrigida" && c.codigo !== "TRA-905"));
});

test("T-517 obter_ficha mostra as citações por conferir com [■ VERIFICAR]", async () => {
  const cit = JSON.parse(ler(FICHAS("citacoes.json")));
  const cod = cit.find((c) => c.estado === "por conferir")?.codigo;
  assert.ok(cod, "nenhuma citação por conferir no relatório");
  await comCliente(async (c) => {
    const t = await chamar(c, "obter_ficha", { codigo: cod });
    assert.match(t, /por conferir[^\n]*\[■ VERIFICAR/);
  });
});

test("T-518 TRA-005 corrigida: 153.º para a forma e o conteúdo, 154.º para as condições, nenhum 157.º no trabalho suplementar", async () => {
  const f = ficheirosFichas().find((x) => /[\\/]TRA-005-/.test(x));
  assert.ok(f, "falta a ficha TRA-005");
  const t = ler(f);
  assert.match(t, /153\.º[^\n]{0,15}(CT|Código do Trabalho)[^\n]{0,60}(conteúdo|forma)/i);
  assert.match(t, /154\.º[^\n]{0,15}(CT|Código do Trabalho)[^\n]{0,60}(retribuição|condições)/i);
  assert.doesNotMatch(t, /157\.º[^\n]{0,80}suplementar|suplementar[^\n]{0,80}157\.º/i);
  await comCliente(async (c) => {
    const o = await chamar(c, "obter_ficha", { codigo: "TRA-005" });
    assert.doesNotMatch(o, /157\.º[^\n]{0,80}suplementar|suplementar[^\n]{0,80}157\.º/i);
  });
});

// ---------------- US-5 índice PT/EN ----------------

test("T-519 título e descrição EN em todas as fichas, diferentes do PT e sem PT-BR", () => {
  const falhas = [];
  for (const e of indice().fichas) {
    if (!e.titulo_en || !e.descricao_en) falhas.push(`${e.codigo}: sem EN`);
    else if (e.titulo_en === e.titulo) falhas.push(`${e.codigo}: título EN igual ao PT`);
  }
  assert.ok(indice().fichas.length > 1000);
  assert.deepEqual(falhas.slice(0, 20), []);
});

test("T-520 procurar_ficha: 40 pedidos PT/EN, a ficha esperada nas 5 primeiras em ≥ 36", async () => {
  const casos = JSON.parse(ler(FIX("pesquisas.json")));
  assert.equal(casos.length, 40);
  const falhas = [];
  await comCliente(async (c) => {
    for (const k of casos) {
      const t = await chamar(c, "procurar_ficha", { termo: k.termo });
      const top = t.split("\n").filter((l) => /^- [A-Z]+-\d+/.test(l)).slice(0, 5).join("\n");
      if (!k.esperado.some((e) => top.includes(e))) falhas.push(`[${k.lingua}] ${k.termo} → ${k.esperado.join("/")}`);
    }
  });
  assert.ok(falhas.length <= 4, `falharam ${falhas.length}:\n${falhas.join("\n")}`);
});

test("T-521 avaliação g57: pedido em inglês encontra a ficha e responde em inglês", () => {
  casoAval("g57-ficha-em-ingles", "golden", "procurar_ficha", "agreement");
});

// ---------------- US-6 distribuição e avaliação ----------------

test("T-522 content/fichas no servidor; SKILL.md ≤ 500 linhas; description ≤ 1024; INSTRUCOES_MCP ≤ 2000 com as tools das fichas", async () => {
  assert.ok(existsSync(r("mcp-server", "content", "fichas", "indice.json")), "falta mcp-server/content/fichas/indice.json");
  const skill = ler(SKILL("SKILL.md"));
  assert.ok(skill.split("\n").length <= 500, `SKILL.md com ${skill.split("\n").length} linhas`);
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(skill)[1];
  const desc = (/^description:\s*([\s\S]*?)(?=^\w[\w-]*:|$(?![\s\S]))/m.exec(fm)?.[1] ?? "").replace(/^[>|][-+]?/, "").replace(/\s+/g, " ").trim();
  assert.ok(desc.length <= 1024, `description com ${desc.length}`);
  const { INSTRUCOES_MCP } = await mod("persona.js");
  assert.ok(INSTRUCOES_MCP.length <= 2000, `INSTRUCOES_MCP com ${INSTRUCOES_MCP.length}`);
  assert.match(INSTRUCOES_MCP, /procurar_ficha/);
  assert.match(INSTRUCOES_MCP, /obter_ficha/);
});

test("T-523 resultados da 3.1.0 registados: golden >= 90 %", () => {
  const p = ler(r(".specs", "juridico-pt-v3-1-fichas", "eval-plan.md"));
  const i = p.indexOf("## Resultados da 3.1.0");
  assert.ok(i >= 0, "sem '## Resultados da 3.1.0' (corrida final por fazer)");
  const m = /\|\s*Golden[^|]*\|\s*\*\*(\d+(?:,\d+)?)\s?%/.exec(p.slice(i));
  assert.ok(m, "sem a linha Golden");
  assert.ok(Number(m[1].replace(",", ".")) >= 90, `golden ${m[1]} %`);
});

test("T-524 resultados da 3.1.0 registados: adversarial a 100 %", () => {
  const p = ler(r(".specs", "juridico-pt-v3-1-fichas", "eval-plan.md"));
  const i = p.indexOf("## Resultados da 3.1.0");
  assert.ok(i >= 0, "sem '## Resultados da 3.1.0' (corrida final por fazer)");
  const m = /\|\s*Adversarial[^|]*\|\s*\*\*(\d+(?:,\d+)?)\s?%/.exec(p.slice(i));
  assert.ok(m, "sem a linha Adversarial");
  assert.equal(Number(m[1].replace(",", ".")), 100);
});

test("T-525 casos golden g51–g58 das fichas", () => {
  casoAval("g51-familia-responsabilidades-parentais", "golden", "obter_ficha");
  casoAval("g52-estrangeiros-autorizacao-residencia", "golden", "obter_ficha", "AIMA");
  casoAval("g53-administrativo-audiencia-previa", "golden", "obter_ficha");
  casoAval("g54-saude-reclamacao-ers", "golden", "obter_ficha");
  casoAval("g55-desportivo-contrato-praticante", "golden", "obter_ficha", "54/2017");
  casoAval("g56-urbanismo-comunicacao-previa", "golden", "obter_ficha");
  casoAval("g57-ficha-em-ingles", "golden", "procurar_ficha");
  casoAval("g58-remissao-para-modelo", "golden", "obter_modelo", "reclamacao-de-creditos-na-insolvencia");
});

test("T-526 importador idempotente e --check (fixture sem rede; origem real se existir)", () => {
  const { skill, out, f } = importarFixture();
  assert.equal(out.status, 0, out.stderr);
  const ok = spawnSync(process.execPath, [IMPORTADOR, "--origem", FIX("kit"), "--skill", skill, "--check"], { encoding: "utf8" });
  assert.equal(ok.status, 0, `--check logo a seguir devia passar: ${ok.stdout}${ok.stderr}`);
  const alvo = ficheirosFichas(join(skill, "assets", "fichas"))[0];
  writeFileSync(alvo, ler(alvo) + "\nalteração à mão\n");
  const ko = spawnSync(process.execPath, [IMPORTADOR, "--origem", FIX("kit"), "--skill", skill, "--check"], { encoding: "utf8" });
  assert.notEqual(ko.status, 0, "--check devia falhar depois de uma alteração à mão");
  if (existsSync(join(ORIGEM_REAL, "catalogo.json"))) {
    const real = spawnSync(process.execPath, [IMPORTADOR, "--origem", ORIGEM_REAL, "--check"], { encoding: "utf8" });
    assert.equal(real.status, 0, `--check sobre a origem real: ${real.stdout.slice(-800)}${real.stderr.slice(-800)}`);
  }
});

test("T-527 caso adversarial a14: citação errada pedida pelo utilizador", () => {
  casoAval("a14-citacao-errada-da-ficha", "adversarial", "157");
});

test("T-528 caso de regressão r06: tempo parcial sem o art. 157.º no trabalho suplementar", () => {
  casoAval("r06-tempo-parcial-artigos", "regressao", "157");
});

test("T-529 sem dados pessoais reais nas fichas (NIF válido ou email fora dos exemplos)", () => {
  const nifValido = (n) => {
    if (!/^[125689]\d{8}$/.test(n) || n === "999999990") return false;
    const s = [...n.slice(0, 8)].reduce((a, d, i) => a + Number(d) * (9 - i), 0);
    const c = 11 - (s % 11);
    return (c >= 10 ? 0 : c) === Number(n[8]);
  };
  const DOMINIOS = /@(example\.[a-z]+|empresa\.(pt|com)|platform\.com|cnpd\.pt|[a-z-]+\.example)$/i;
  const falhas = [];
  for (const f of ficheirosFichas()) {
    const t = ler(f);
    for (const n of t.match(/\b\d{9}\b/g) || []) if (nifValido(n)) falhas.push(`${relative(FICHAS(), f)}: NIF ${n}`);
    for (const e of t.match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g) || []) if (!DOMINIOS.test(e)) falhas.push(`${relative(FICHAS(), f)}: email ${e}`);
  }
  assert.ok(ficheirosFichas().length > 0, "sem fichas");
  assert.deepEqual(falhas.slice(0, 20), []);
});
