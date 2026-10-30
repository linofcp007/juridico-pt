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
    // Só o texto em PT: o título e a descrição EN usam palavras inglesas iguais às formas antigas (actual, sector, factor, director).
    const t = ler(f).split("\n").filter((l) => !/^(titulo_en|descricao_en):|^> \*\*EN:\*\*/.test(l)).join("\n");
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
  // Exemplos e caixas institucionais de organismos públicos (cnpd.pt, *.gov.pt), que não são dados pessoais.
  const DOMINIOS = /@(example\.[a-z]+|empresa\.(pt|com)|platform\.com|cnpd\.pt|([a-z-]+\.)?gov\.pt|[a-z-]+\.example)$/i;
  const falhas = [];
  for (const f of ficheirosFichas()) {
    const t = ler(f);
    for (const n of t.match(/\b\d{9}\b/g) || []) if (nifValido(n)) falhas.push(`${relative(FICHAS(), f)}: NIF ${n}`);
    for (const e of t.match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g) || []) if (!DOMINIOS.test(e)) falhas.push(`${relative(FICHAS(), f)}: email ${e}`);
  }
  assert.ok(ficheirosFichas().length > 0, "sem fichas");
  assert.deepEqual(falhas.slice(0, 20), []);
});

// ---------------- 3.1.1 — revisão técnica das fichas (correções de conteúdo) ----------------

test("T-530 importador: aplica as correções de conteúdo antes das citações, marca a ficha e falha sem o trecho", () => {
  const { skill, out, f } = importarFixture();
  assert.equal(out.status, 0, out.stderr);
  const fam = fichaFixture(skill, "FAM-905");
  assert.match(fam, /Identifica os pais, o menor e quem exerce as responsabilidades parentais\./);
  assert.doesNotMatch(fam, /Identifica os pais e o menor\./);
  assert.match(fam, /^revisao_tecnica: "?2026-10-27 \(corrigida\)"?$/m);
  assert.match(fam, /^> \*\*Revisão técnica:\*\* 2026-10-27[^\n]*revisao-tecnica\.md[^\n]*advogado/m);
  assert.match(fam, /^estado_citacoes: "?sem citações"?$/m, "a correção não devia criar citações na FAM-905");
  // Relatório gerado a partir das mesmas decisões, com a fonte de cada correção.
  const rel = ler(f("revisao-tecnica.md"));
  assert.match(rel, /FAM-905/);
  assert.match(rel, /pgdlisboa\.pt/);
  assert.match(rel, /Confirmar a regra no caso concreto/);
  const idx = JSON.parse(ler(f("indice.json")));
  assert.deepEqual(idx.fichas.find((e) => e.codigo === "FAM-905").revisao_tecnica, { data: "2026-10-27", veredicto: "corrigida" });
  // Idempotente.
  const chk = spawnSync(process.execPath, [IMPORTADOR, "--origem", FIX("kit"), "--skill", skill, "--check"], { encoding: "utf8" });
  assert.equal(chk.status, 0, chk.stderr || chk.stdout);
  // Um trecho que não existe faz falhar, sem escrever nada.
  const mau = tmp("jpt-fichas-mau-");
  cpSync(FIX("skill"), mau, { recursive: true });
  const cor = JSON.parse(ler(join(mau, "assets", "fichas", "correcoes-conteudo.json")));
  cor["FAM-905"].substituicoes[0].de = "trecho que não existe na ficha";
  writeFileSync(join(mau, "assets", "fichas", "correcoes-conteudo.json"), JSON.stringify(cor));
  const falha = spawnSync(process.execPath, [IMPORTADOR, "--origem", FIX("kit"), "--skill", mau], { encoding: "utf8" });
  assert.notEqual(falha.status, 0, "devia falhar com um trecho inexistente");
  assert.match(falha.stderr + falha.stdout, /FAM-905/);
  assert.ok(!existsSync(join(mau, "assets", "fichas", "indice.json")), "não devia ter escrito nada");
});

test("T-531 obter_ficha: o cabeçalho de uma ficha revista remete para o relatório e diz que falta o advogado", async () => {
  const { cabecalhoFicha } = await mod("content.js");
  const base = { codigo: "XXX-001", area: "Área", titulo: "T", titulo_en: "T EN", estado: { conferidas: 1, corrigidas: 0, por_conferir: 0 } };
  const revista = cabecalhoFicha({ ...base, revisao_tecnica: { data: "2026-10-27", veredicto: "corrigida" } });
  assert.match(revista, /Revisão técnica: 2026-10-27 \(corrigida\)/);
  assert.match(revista, /assets\/fichas\/revisao-tecnica\.md/);
  assert.match(revista, /confirmação de um advogado/);
  assert.doesNotMatch(cabecalhoFicha(base), /Revisão técnica/);
});

test("T-532 revisão técnica: as 42 fichas no relatório, com fonte em cada correção, e as afirmações corrigidas não voltam", () => {
  const cor = JSON.parse(ler(FICHAS("correcoes-conteudo.json")));
  const AMOSTRA = ["FAM-006", "EST-003", "ADM-002", "SAU-003", "DES-001", "URB-002", "TRA-005", "CIV-006", "PEN-029", "DIG-015"];
  const FUNDO = ["PI-014", "PI-015", "PI-028", "PI-029", "PI-041", "PI-055", "PI-018", "PI-021", "PI-036", "PI-037", "TRA-041", "TRA-042",
    "SUC-001", "SUC-035", "SUC-037", "COM-048", "INS-012", "INS-013", "INS-030", "INS-004", "INS-005", "INS-006", "INS-022", "INS-024",
    "URB-003", "URB-027", "URB-040", "URB-011", "URB-058", "ADM-052", "FIS-033", "FIS-037"];
  const rel = ler(FICHAS("revisao-tecnica.md"));
  const idx = indice();
  const falhas = [];
  for (const c of [...AMOSTRA, ...FUNDO]) {
    if (!cor[c]) { falhas.push(`${c}: sem revisão técnica`); continue; }
    if (!rel.includes(`## ${c}`)) falhas.push(`${c}: fora do relatório`);
    if (!idx.fichas.find((e) => e.codigo === c)?.revisao_tecnica) falhas.push(`${c}: sem revisao_tecnica no índice`);
    for (const s of cor[c].substituicoes) if (!/^https?:\/\//.test(s.fonte || "") && !/\[■ VERIFICAR/.test(s.para)) falhas.push(`${c}: correção sem fonte nem [■ VERIFICAR]`);
  }
  assert.deepEqual(falhas, []);

  // As afirmações que a revisão corrigiu não voltam ao corpo das fichas (o original tinha-as todas).
  const corpo = (c) => {
    const f = ficheirosFichas().find((x) => x.replaceAll("\\", "/").includes(`/${c}-`));
    assert.ok(f, `falta a ficha ${c}`);
    return ler(f).split("## Citações desta ficha")[0];
  };
  const perto = (t, re, neg, n = 150) => [...t.matchAll(new RegExp(re.source, `${re.flags}g`))]
    .some((m) => !neg.test(t.slice(Math.max(0, m.index - n), m.index + m[0].length + n)));
  const ERROS = [
    [["INS-012", "INS-013", "INS-030"], "período de cessão de 5 anos", (t) => /per[íi]odo de cess[ãa]o[^.\n]{0,60}\b(5|cinco)\b\s*(\(cinco\)\s*)?anos|(5|cinco) anos subsequentes ao encerramento/i.test(t)],
    [["TRA-041"], "banco de horas individual em vigor", (t) => perto(t, /banco de horas individual/i, /revog|nenhum|n[ãa]o (existe|h[áa])|deixou/i)],
    [["FIS-033", "FIS-037"], "RNH sem o regime transitório da Lei 82/2023", (t) => !(/82\/2023/.test(t) && /transit[óo]ri/i.test(t))],
    [["COM-048"], "preferência legal dos sócios na cessão de quotas", (t) => perto(t, /(qualquer s[óo]cio|os s[óo]cios)[^.\n]{0,40}(pode|podem|t[êe]m)[^.\n]{0,20}(direito de )?prefer[êe]ncia/i, /n[ãa]o confere|n[ãa]o (existe|h[áa]|prev)|inexist|contrato de sociedade|parassocial|cl[áa]usula/i, 60)],
    [["URB-011", "URB-058"], "coimas leves, graves e muito graves no art. 98.º RJUE", (t) => perto(t, /muito graves?/i, /n[ãa]o (classific|gradu|distingu|faz|divide|prev)|inexist/i)],
    [["DES-001"], "máximo de 8 épocas", (t) => /\b(8|oito)\s*(\(oito\)\s*)?épocas/i.test(t) && !/\b(5|cinco)\s*(\(cinco\)\s*)?épocas/i.test(t)],
    [["URB-002"], "oposição em 20 dias à comunicação prévia", (t) => perto(t, /20 dias/i, /n[ãa]o h[áa]|revog|deixou/i, 80) && /oposi[çc][ãa]o/i.test(t)],
    [["EST-003"], "parecer do IEFP e contingente", (t) => perto(t, /contingente|parecer (favorável )?do IEFP/i, /revog|já não|deixou|n[ãa]o (é|existe|h[áa])/i)],
  ];
  const voltaram = [];
  for (const [cods, nome, erro] of ERROS) for (const c of cods) if (erro(corpo(c))) voltaram.push(`${c}: ${nome}`);
  assert.deepEqual(voltaram, []);
});

test("T-533 artigos revogados e citações sem «º»: as epígrafes guardam os revogados lidos no texto oficial; o importador marca a citação de um revogado e apanha «Art. 151 CT»", async () => {
  const { lerRevogadosPgdl, revogadosPortalFinancas } = await import(pathToFileURL(r("mcp-server", "scripts", "gerar-epigrafes.mjs")).href);
  // PGDL: só o texto do artigo diz "(Revogado.)"; o decreto preambular também tem um "Artigo 3.º"; nota do CPC e "ARTIGO" da CRP.
  const html = `<option value="1A0315">Artigo 315.º<br> Contestação e rol</option></select>` +
    "Artigo 3.º (Revogado pelo Decreto-Lei n.º 17/91) <br>Artigo 3.º Âmbito <br>1 - O código aplica-se… " +
    "Artigo 99.º (art.º 105.º CPC 1961) Efeito da incompetência <br>(Revogado.) ARTIGO 4.º (Cidadania) São cidadãos… " +
    "Artigo 315.º Contestação e rol <br>(Revogado.) Artigo 316.º Revogação da liberdade <br>1 - … Artigo 36.º Prazos <br>[Revogado].";
  const pgdl = lerRevogadosPgdl(html, { 3: "Âmbito", 4: "Cidadania", 36: "Prazos", 99: "Efeito da incompetência", 315: "Contestação e rol", 316: "Revogação da liberdade" });
  assert.deepEqual([...pgdl.revogados].sort(), ["315", "36", "99"]);
  assert.deepEqual([...pgdl.vistos].sort(), ["3", "315", "316", "36", "4", "99"]);
  const pf = '<tr><td>Artigo 2.º-B</td><td><a href="a">Isenção</a>&#160;<em>[Revogado]</em></td></tr>' +
    '<tr><td>Artigo 35.º</td><td><a href="b">(Revogado)</a></td></tr><tr><td>Artigo 36.º</td><td><a href="c">Taxas</a></td></tr>';
  assert.deepEqual(revogadosPortalFinancas(pf).sort(), ["2-B", "35"]);

  // Os 25 diplomas têm a lista; nenhuma citação de um revogado conta como conferida, salvo se o texto diz que está revogado.
  const revogados = {};
  for (const s of SIGLAS_25) {
    const e = JSON.parse(ler(SKILL("references", "epigrafes", `${s}.json`)));
    assert.ok(Array.isArray(e.revogados) && e.revogados_obtido_em, `${s}: sem lista de revogados`);
    revogados[s] = new Set(e.revogados);
  }
  for (const [s, a] of [["CPP", "315"], ["CSC", "135"], ["CT", "208-A"], ["RJUE", "36"]]) assert.ok(revogados[s].has(a), `${s} ${a}.º revogado`);
  const conferidas = JSON.parse(ler(FICHAS("citacoes.json")))
    .filter((c) => revogados[c.sigla]?.has(c.artigo) && c.estado !== "por conferir" && !/revog(?:ad[oa]|ou|a[çc][ãa]o d[oe]s?\s+art)/i.test(c.contexto));
  assert.deepEqual(conferidas.map((c) => `${c.codigo} ${c.texto}`), []);

  const { skill, out, f } = importarFixture();
  assert.equal(out.status, 0, out.stderr);
  const tra = JSON.parse(ler(f("citacoes.json"))).filter((c) => c.codigo === "TRA-905");
  const t = fichaFixture(skill, "TRA-905");
  assert.match(t, /Art\. 208\.º-A CT \(banco de horas individual[^)\n]*\) \[■ VERIFICAR: o artigo 208\.º-A CT está revogado; confirmar a norma em vigor\]/);
  assert.ok(!/\[■ VERIFICAR[^\n]*foi revogado pela Lei|foi revogado pela Lei[^\n]*\[■ VERIFICAR/.test(t), "o texto que já diz que está revogado não leva marcador");
  assert.equal(tra.find((c) => c.texto === "Art. 151 CT")?.estado, "conferida (epígrafe)", "citação sem «º» com a sigla logo a seguir");
  assert.ok(!tra.some((c) => c.artigo === "1"), "«Artigo 1 — Objeto» do contrato não é uma citação");
});

test("T-534 lista AO90 alargada: adopção, accionista, contra-ordenação, peremptório… passam à forma atual nas fichas e na fixture", () => {
  const ao = JSON.parse(ler(AO90)).converter;
  for (const [velha, nova] of [["adopção", "adoção"], ["accionista", "acionista"], ["contra-ordenação", "contraordenação"], ["peremptório", "perentório"], ["fraccionado", "fracionado"], ["seleccionar", "selecionar"]]) {
    assert.equal(ao[velha], nova, `ao90.json: ${velha}`);
  }
  const { skill, out } = importarFixture();
  assert.equal(out.status, 0, out.stderr);
  const t = fichaFixture(skill, "TRA-905");
  assert.match(t, /A contraordenação laboral não se confunde com a adoção de regras pelo acionista; prazo perentório\./);
  const velhas = new RegExp(`(?<![\\p{L}])(${Object.keys(ao).filter((k) => /^(adop|accion|contra-ordena|perempt|fraccion|seleccion)/.test(k)).join("|")})(?![\\p{L}])`, "iu");
  const com = ficheirosFichas().filter((f) => velhas.test(ler(f).split("## Citações desta ficha")[0]));
  assert.deepEqual(com.map((f) => relative(FICHAS(), f)), []);
});

test("T-535 revisão técnica 3.1.2: as 792 fichas que a triagem apontou estão no relatório, com fonte em cada correção, e as referências da casa corrigidas não voltam", () => {
  const cor = JSON.parse(ler(FICHAS("correcoes-conteudo.json")));
  const TRIAGEM = r(".specs", "juridico-pt-v3-1-2-revisao-fichas", "trabalho", "triagem");
  const apontadas = readdirSync(TRIAGEM).filter((f) => /^triagem-t\d+\.json$/.test(f))
    .flatMap((f) => JSON.parse(ler(join(TRIAGEM, f)))).filter((x) => x.triagem === "rever").map((x) => x.codigo);
  assert.equal(apontadas.length, 792);
  const rel = ler(FICHAS("revisao-tecnica.md"));
  const falhas = [];
  for (const c of apontadas) {
    if (!cor[c]) falhas.push(`${c}: sem revisão técnica`);
    else if (!rel.includes(`## ${c}`)) falhas.push(`${c}: fora do relatório`);
  }
  for (const [c, x] of Object.entries(cor)) {
    if (!["ok", "corrigida", "rever de raiz"].includes(x.veredicto) || !x.resumo) falhas.push(`${c}: sem veredicto ou resumo`);
    for (const s of x.substituicoes) if (!/^https?:\/\//.test(s.fonte || "") && !/\[■ VERIFICAR/.test(s.para)) falhas.push(`${c}: correção sem fonte nem [■ VERIFICAR]`);
  }
  assert.deepEqual(falhas, []);

  // Referências da casa: o que a fonte oficial desmentiu não volta.
  const ref = (...p) => ler(SKILL(...p));
  assert.doesNotMatch(ref("references", "multas.md"), /20 dias úteis para tribunal/);
  assert.match(ref("references", "multas.md"), /15 dias úteis após o seu conhecimento[^\n]*art\. 181\.º, n\.º 2, al\. a\), do Código da Estrada/);
  assert.doesNotMatch(ref("references", "sucessorio-internacional.md"), /Haia de 1961[^\n]*— Portugal é parte/);
  assert.doesNotMatch(ref("references", "herancas.md"), /Inventário obrigatório: quando há menores|Repúdio: declaração formal \(notário ou tribunal\)/);
  for (const p of [["references", "imobiliario.md"], ["references", "insolvencia.md"], ["playbooks", "comprar-imovel.md"]]) {
    assert.match(ref(...p), /759\.º[^\n]*DL 48\/2024|DL 48\/2024[^\n]*759\.º/, p.join("/"));
  }
});
