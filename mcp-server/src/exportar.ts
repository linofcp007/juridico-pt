// Exportação de um documento (Markdown, Marcação Redator ou template) para `.juridico-pt/exportados/<nome>.docx`.
// Escrita via fs-seguro (sem seguir ligações, temporário + renomeação), dentro do projeto.
// A Marcação Redator (1.ª linha `@@PERFIL:`) sai no formato forense; com marcas internas
// ([[IA:, [[INÍCIO/FIM VARIANTE, {{…}}) não se escreve nada.
import { PASTA_DADOS } from "./dados.js";
import { ler } from "./content.js";
import { gerarDocx, gerarDocxRedator } from "./docx.js";
import { dirProjeto, escreverSeguro } from "./fs-seguro.js";
import { analisarMarcacao, marcadoresDe, type Marcador } from "./marcacao.js";

const NOME_RE = /^[a-z0-9][a-z0-9-]{0,60}$/;

export interface PedidoExportacao {
  /** Texto em Markdown ou em Marcação Redator (o documento já preenchido). */
  conteudo?: string;
  /** Ou o nome de um template (assets/templates/<nome>.md), exportado tal como está. */
  template?: string;
  /** Nome do ficheiro, sem extensão: minúsculas, algarismos e hífens. */
  nome: string;
  projeto?: string;
}

export interface ResultadoExportacao {
  caminho: string;
  bytes: number;
  /** Campos {{…}} que ficaram num Markdown (a Marcação Redator recusa-os). */
  placeholders: number;
  /** Marcadores [■ CONFIRMAR/VERIFICAR] da Marcação Redator, com a cláusula ou secção. */
  marcadores: Marcador[];
}

/** Indica se o texto está em Marcação Redator (1.ª linha `@@PERFIL:`). */
export const eMarcacaoRedator = (texto: string) => /^\s*@@PERFIL:/.test(String(texto ?? ""));

export function exportarDocumento(p: PedidoExportacao): ResultadoExportacao {
  const nome = String(p.nome ?? "").trim().toLowerCase().replace(/\.docx$/, "");
  if (!NOME_RE.test(nome)) throw new Error(`Nome de ficheiro inválido: '${p.nome}' (usa letras minúsculas, algarismos e hífens).`);
  if ((p.conteudo === undefined) === (p.template === undefined)) {
    throw new Error("Indica o conteúdo (Markdown ou Marcação Redator) OU o nome de um template — um dos dois.");
  }
  let md = p.conteudo ?? "";
  if (p.template !== undefined) {
    const t = ler("templates", String(p.template).trim());
    if (t === null) throw new Error(`Template não encontrado: '${p.template}' (vê listar_templates).`);
    md = t;
  }
  if (!md.trim()) throw new Error("O documento está vazio.");

  if (eMarcacaoRedator(md)) {
    const { doc, residuos, erros } = analisarMarcacao(md.replace(/^\s+/, ""));
    if (residuos.length) {
      throw new Error(
        "Não exportei: o texto ainda tem marcas internas que não podem chegar ao documento. Corrige estas linhas e volta a exportar:\n" +
          residuos.map((r) => `L${r.linha} ${r.tipo}: ${r.trecho}`).join("\n")
      );
    }
    if (!doc) throw new Error("Marcação Redator inválida:\n" + erros.map((e) => `L${e.linha} ${e.msg}`).join("\n"));
    const bytes = gerarDocxRedator(doc);
    const caminho = escreverSeguro(dirProjeto(p.projeto), [PASTA_DADOS, "exportados", `${nome}.docx`], bytes);
    return { caminho, bytes: bytes.length, placeholders: 0, marcadores: marcadoresDe(doc) };
  }

  const bytes = gerarDocx(md);
  const caminho = escreverSeguro(dirProjeto(p.projeto), [PASTA_DADOS, "exportados", `${nome}.docx`], bytes);
  const placeholders = (md.match(/\{\{[A-Z0-9_]+(?::[^{}]*)?\}\}/g) ?? []).length;
  return { caminho, bytes: bytes.length, placeholders, marcadores: [] };
}
