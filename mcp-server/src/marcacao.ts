// Marcação Redator (o formato intermédio entre o modelo e o .docx): parser puro, texto -> blocos.
// Regras em skills/juridico-pt/assets/redacao/marcacao.md. As duas primeiras linhas são
// @@PERFIL e @@TIPO; linhas @@ são comandos; o resto é corpo. Os resíduos ([[IA:, [[INÍCIO/FIM
// VARIANTE, {{variável}}) não chegam ao ficheiro: exportar.ts recusa-o. O lado Python é
// skills/juridico-pt/scripts/gerar_docx.py, com o mesmo resultado (fixtures/redator/).

export type PerfilDoc = "juridico" | "contabil";
export type TipoDoc = "peticao" | "contrato" | "carta" | "memoria-calculo" | "parecer" | "ata" | "recibo";

export const PERFIS: PerfilDoc[] = ["juridico", "contabil"];
export const TIPOS_DOC: TipoDoc[] = ["peticao", "contrato", "carta", "memoria-calculo", "parecer", "ata", "recibo"];

type Simples = "titulo" | "subtitulo" | "enderecamento" | "secao" | "clausula" | "centro" | "direita" | "data" | "nota" | "citacao" | "corpo";

export type Bloco =
  | { k: Simples; texto: string; linha: number }
  | { k: "sub"; rotulo: string; texto: string; linha: number }
  | { k: "alinea"; texto: string; linha: number }
  | { k: "item"; n: number; texto: string; linha: number }
  | { k: "assinaturas" | "testemunhas"; pares: Array<[string, string]>; linha: number }
  | { k: "tabela"; bordas: boolean; linhas: string[][]; linha: number }
  | { k: "quebra" | "espaco"; linha: number };

export interface DocumentoRedator {
  perfil: PerfilDoc;
  tipo: TipoDoc;
  /** @@RECUO: sim|nao — sobrepõe-se ao padrão do tipo. */
  recuo?: boolean;
  cabecalho?: string;
  rodape?: string;
  blocos: Bloco[];
}

export interface Residuo {
  linha: number;
  tipo: "ia" | "variante" | "variavel";
  trecho: string;
}

export interface ErroMarcacao {
  linha: number;
  msg: string;
}

export interface Marcador {
  tipo: "CONFIRMAR" | "VERIFICAR";
  texto: string;
  /** Última @@CLAUSULA ou @@SECAO antes do marcador, ou "preâmbulo". */
  onde: string;
  linha: number;
}

const SIMPLES: Record<string, Simples> = {
  TITULO: "titulo",
  SUBTITULO: "subtitulo",
  ENDERECAMENTO: "enderecamento",
  SECAO: "secao",
  CLAUSULA: "clausula",
  CENTRO: "centro",
  DIREITA: "direita",
  DATA: "data",
  NOTA: "nota",
  CITACAO: "citacao",
};

const RESIDUOS: Array<[Residuo["tipo"], RegExp]> = [
  ["ia", /\[\[IA:[^\]]*\]?\]?/],
  ["variante", /\[\[(?:INÍCIO|INICIO) VARIANTE[^\]]*\]?\]?|\[\[FIM VARIANTE\]?\]?/],
  ["variavel", /\{\{[^{}]*\}\}/],
];

/** Marcas internas que não podem chegar ao documento, por linha e, na mesma linha, por tipo. */
export function encontrarResiduos(texto: string): Residuo[] {
  const out: Residuo[] = [];
  texto
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .forEach((l, i) => {
      for (const [tipo, re] of RESIDUOS) {
        const m = re.exec(l);
        if (m) out.push({ linha: i + 1, tipo, trecho: m[0].slice(0, 80) });
      }
    });
  return out;
}

const pares = (v: string): Array<[string, string]> =>
  v.split(";;").map((b) => {
    const [a, q = ""] = b.split("|").map((x) => x.trim());
    return [a, q];
  });

const linhasTabela = (v: string): string[][] => v.split(";;").map((r) => r.split("|").map((c) => c.trim()));

/** Lê a Marcação Redator. `doc` é null quando há erros de formato; os resíduos vêm à parte. */
export function analisarMarcacao(texto: string): { doc: DocumentoRedator | null; residuos: Residuo[]; erros: ErroMarcacao[] } {
  const linhas = String(texto ?? "").replace(/\r\n?/g, "\n").split("\n");
  const erros: ErroMarcacao[] = [];
  const residuos = encontrarResiduos(texto);
  const cab = (n: number, nome: string) => new RegExp(`^@@${nome}:\\s*(.*?)\\s*$`).exec(linhas[n] ?? "")?.[1];

  const perfil = cab(0, "PERFIL");
  if (perfil === undefined) erros.push({ linha: 1, msg: "a 1.ª linha tem de ser @@PERFIL: juridico | contabil" });
  else if (!(PERFIS as string[]).includes(perfil)) erros.push({ linha: 1, msg: `@@PERFIL inválido: '${perfil}' (juridico | contabil)` });
  const tipo = cab(1, "TIPO");
  if (tipo === undefined) erros.push({ linha: 2, msg: `a 2.ª linha tem de ser @@TIPO: ${TIPOS_DOC.join(" | ")}` });
  else if (!(TIPOS_DOC as string[]).includes(tipo)) erros.push({ linha: 2, msg: `@@TIPO inválido: '${tipo}' (${TIPOS_DOC.join(" | ")})` });

  const doc: DocumentoRedator = { perfil: (perfil ?? "juridico") as PerfilDoc, tipo: (tipo ?? "carta") as TipoDoc, blocos: [] };
  let item = 0;
  for (let i = 2; i < linhas.length; i++) {
    const linha = i + 1;
    const l = linhas[i].trim();
    if (!l) continue;
    if (!l.startsWith("@@")) {
      doc.blocos.push({ k: "corpo", texto: l.replace(/^\[MENÇÃO\]\s*/, ""), linha });
      continue;
    }
    const m = /^@@([A-Z-]+)(?::\s*(.*))?$/.exec(l);
    const nome = m?.[1] ?? "";
    const valor = (m?.[2] ?? "").trim();
    if (SIMPLES[nome]) {
      doc.blocos.push({ k: SIMPLES[nome], texto: valor, linha });
      if (nome === "SECAO") item = 0;
    } else if (nome === "SUB") {
      const i2 = valor.indexOf("|");
      if (i2 < 0) erros.push({ linha, msg: "@@SUB precisa de 'Rótulo. | texto'" });
      else doc.blocos.push({ k: "sub", rotulo: valor.slice(0, i2).trim(), texto: valor.slice(i2 + 1).trim(), linha });
    } else if (nome === "ALINEA") doc.blocos.push({ k: "alinea", texto: valor, linha });
    else if (nome === "ITEM") doc.blocos.push({ k: "item", n: ++item, texto: valor, linha });
    else if (nome === "ASSINATURAS" || nome === "TESTEMUNHAS") {
      doc.blocos.push({ k: nome === "ASSINATURAS" ? "assinaturas" : "testemunhas", pares: pares(valor), linha });
    } else if (nome === "TABELA" || nome === "TABELA-SEM-BORDA") {
      doc.blocos.push({ k: "tabela", bordas: nome === "TABELA", linhas: linhasTabela(valor), linha });
    } else if (nome === "QUEBRA" || nome === "ESPACO") doc.blocos.push({ k: nome === "QUEBRA" ? "quebra" : "espaco", linha });
    else if (nome === "CABECALHO") doc.cabecalho = valor;
    else if (nome === "RODAPE") doc.rodape = valor;
    else if (nome === "RECUO") {
      if (valor === "sim" || valor === "nao") doc.recuo = valor === "sim";
      else erros.push({ linha, msg: "@@RECUO: sim | nao" });
    } else if (nome === "PERFIL" || nome === "TIPO") erros.push({ linha, msg: `@@${nome} só nas duas primeiras linhas` });
    else erros.push({ linha, msg: `comando desconhecido: @@${nome || l.slice(2)}` });
  }
  return { doc: erros.length ? null : doc, residuos, erros };
}

const RE_MARCADOR = /\[■ (CONFIRMAR|VERIFICAR)\b[^\]]*\]/g;

/** Marcadores [■ CONFIRMAR/VERIFICAR: …] por ordem, com a cláusula ou secção onde estão. */
export function marcadoresDe(doc: DocumentoRedator): Marcador[] {
  const out: Marcador[] = [];
  let onde = "preâmbulo";
  for (const b of doc.blocos) {
    if (b.k === "clausula" || b.k === "secao") onde = b.texto;
    const textos =
      "texto" in b ? [("rotulo" in b ? b.rotulo + " " : "") + b.texto] : "pares" in b ? b.pares.flat() : "linhas" in b ? b.linhas.flat() : [];
    for (const t of textos) {
      for (const m of t.matchAll(RE_MARCADOR)) out.push({ tipo: m[1] as Marcador["tipo"], texto: m[0], onde, linha: b.linha });
    }
  }
  return out;
}
