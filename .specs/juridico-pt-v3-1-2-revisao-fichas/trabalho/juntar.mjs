// Uso: node juntar.mjs <correcoes-conteudo.json do skill> [data] — junta as revisao-<lote>.json no ficheiro do importador.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const aqui = dirname(fileURLToPath(import.meta.url));
// O importador aplica as correções ao texto já normalizado (AO90): os trechos passam pela mesma normalização, para
// continuarem a casar quando a lista ao90.json cresce.
const { normalizarGrafia } = await import(pathToFileURL(join(aqui, "..", "..", "..", "mcp-server", "scripts", "importar-fichas.mjs")).href);
const [destino, data = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);
const out = {};
// As fichas já revistas guardam a data da sua revisão; só as novas levam a data de hoje.
const anterior = existsSync(destino) ? JSON.parse(readFileSync(destino, "utf8")) : {};
// As revisões integradas estão em revisoes/; as novas ficam em D enquanto o validar.mjs as confere.
const ficheiros = [aqui, join(aqui, "revisoes")].flatMap((d) => readdirSync(d).filter((x) => /^revisao-[a-z0-9]+\.json$/.test(x)).map((x) => join(d, x)));
for (const f of ficheiros.sort()) {
  for (const r of JSON.parse(readFileSync(f, "utf8"))) {
    if (out[r.codigo]) throw new Error(`${r.codigo} repetido (${f})`);
    out[r.codigo] = {
      revisto_em: anterior[r.codigo]?.revisto_em ?? data,
      veredicto: r.veredicto,
      resumo: r.resumo,
      substituicoes: (r.substituicoes || []).map(({ de, para, motivo, fonte }) => ({ de: normalizarGrafia(de), para: normalizarGrafia(para), motivo, ...(fonte ? { fonte } : {}) })),
      pontos_para_o_advogado: r.pontos_para_o_advogado || [],
      fontes: [...new Set(r.fontes || [])],
      // Títulos e descrições corrigidos pelo revisor, quando o índice descrevia o regime antigo.
      ...Object.fromEntries(["titulo", "descricao", "titulo_en", "descricao_en"].filter((k) => r[k]).map((k) => [k, k.endsWith("_en") ? r[k] : normalizarGrafia(r[k])])),
    };
  }
}
// Títulos e descrições reescritos à mão quando o índice ainda descrevia o regime antigo.
for (const [cod, t] of Object.entries(JSON.parse(readFileSync(join(aqui, "titulos.json"), "utf8")))) {
  if (!out[cod]) throw new Error(`titulos.json: ${cod} sem revisão`);
  out[cod] = { ...out[cod], ...t };
}
const ord = Object.fromEntries(Object.keys(out).sort((a, b) => a.localeCompare(b, "pt", { numeric: true })).map((k) => [k, out[k]]));
writeFileSync(destino, JSON.stringify(ord, null, 2) + "\n");
const v = {};
for (const r of Object.values(ord)) v[r.veredicto] = (v[r.veredicto] || 0) + 1;
console.log(`${Object.keys(ord).length} fichas, ${Object.values(ord).reduce((n, r) => n + r.substituicoes.length, 0)} substituições`, v);
