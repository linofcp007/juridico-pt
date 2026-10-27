// Verificador de redação: cacoetes de texto gerado por IA, léxico do Brasil, pontuação e marcas
// internas num documento (texto ou Marcação Redator). Puro, sem rede. O lado Python é
// skills/juridico-pt/scripts/verificador.py, com as MESMAS listas e regras — qualquer mudança aqui
// muda lá (paridade verificada pelas fixtures de mcp-server/test/fixtures/redator/verificador.json).
// Regras do guia skills/juridico-pt/assets/redacao/estilo.md. Uma ocorrência por linha e por
// categoria; "limite-1x" conta cada repetição a partir da segunda.

export type Nivel = "ERRO" | "AVISO";

export interface Ocorrencia {
  linha: number;
  nivel: Nivel;
  categoria: string;
  trecho: string;
  sugestao: string;
}

export interface OpcoesRedacao {
  /** Documento preenchido: {{variável}} por preencher passa a ERRO. */
  final?: boolean;
  /** Guia ou material de instrução: títulos #, listas com hífen e menções a [[IA: não acusam. */
  guia?: boolean;
}

/** [padrão, nível, sugestão, isenção]: a isenção (opcional) é um padrão que, presente na linha, anula a regra. */
type Regra = [padrao: string, nivel: Nivel, sugestao: string, isencao?: string];

// Padrões sobre o texto "dobrado" (minúsculas, sem acentos).
const PROIBIDOS: Record<string, Regra[]> = {
  abertura: [
    ["e importante (referir|salientar|sublinhar|destacar|realcar|notar|mencionar|ressaltar)( que)?", "ERRO", "corte e vá direto ao facto"],
    ["importa (referir|salientar|sublinhar|destacar|realcar|notar|mencionar|ressaltar)( que)?", "ERRO", "corte e vá direto ao facto"],
    ["cumpre (referir|salientar|sublinhar|destacar|realcar)( que)?", "ERRO", "corte e vá direto ao facto"],
    ["e de (referir|salientar|sublinhar|destacar|notar)( que)?", "ERRO", "corte e vá direto ao facto"],
    ["de referir que", "ERRO", "corte e vá direto ao facto"],
    ["vale a pena (referir|destacar|salientar|ressaltar)", "ERRO", "corte"],
    ["e possivel (observar|verificar|constatar|notar) que", "ERRO", "afirme a constatação diretamente"],
    ["pode-se (afirmar|dizer|concluir|observar) que", "ERRO", "afirme diretamente"],
    ["nos dias de hoje", "ERRO", "corte ou indique a data"],
    ["no (atual|presente) (cenario|panorama)", "ERRO", "corte ou indique o contexto real"],
    ["conforme solicitado", "ERRO", "corte"],
    ["aqui esta (o|a|os|as) ", "ERRO", "comece pelo documento"],
    ["segue abaixo", "ERRO", "corte: o documento já é o documento"],
  ],
  fecho: [
    ["em suma", "ERRO", "corte o anúncio e deixe só a conclusão"],
    ["em resumo", "ERRO", "corte o anúncio e deixe só a conclusão"],
    ["em conclusao", "ERRO", "corte o anúncio e deixe só a conclusão"],
    ["em ultima analise", "ERRO", "corte"],
    ["espero que (isto |isso )?(ajude|tenha ajudado)", "ERRO", "corte: o documento não fala com o leitor"],
    ["espero ter (ajudado|esclarecido)", "ERRO", "corte"],
    ["qualquer duvida,? (estou|fico|ficamos) (a|ao) (sua )?disposi", "ERRO", "\"Ficamos ao dispor para qualquer esclarecimento adicional.\""],
    ["como (um |uma )?(assistente|modelo de linguagem|inteligencia artificial)", "ERRO", "corte a frase inteira"],
  ],
  conector: [
    ["alem disso", "AVISO", "ligue pelo facto anterior ou use \"também\""],
    ["desta forma", "AVISO", "corte"],
    ["dessa forma", "AVISO", "corte"],
    ["deste modo", "AVISO", "corte"],
    ["desse modo", "AVISO", "corte"],
    ["nesse sentido", "AVISO", "conector específico ou referência ao caso"],
    ["neste sentido", "AVISO", "conector específico ou referência ao caso"],
    ["sendo assim", "AVISO", "corte"],
    ["assim sendo", "AVISO", "corte"],
    ["a nivel de", "ERRO", "\"em\" ou \"quanto a\""],
    ["de forma a", "ERRO", "\"para\""],
    ["com o intuito de", "ERRO", "\"para\""],
    ["com o objetivo de", "ERRO", "\"para\""],
  ],
  verbo: [
    ["impact(ar|a|ou|am|ado|ada)\\b", "ERRO", "\"afetar\" ou diga o efeito"],
    ["otimiz(ar|a|ou|acao)", "ERRO", "diga o que melhora"],
    ["alavanc(ar|a|ou)", "ERRO", "\"usar\", \"aproveitar\""],
    ["potencializ(ar|a|ou)", "ERRO", "\"aumentar\", \"reforçar\""],
    ["desempenha um papel", "ERRO", "diga o que a coisa faz"],
    ["garantir que", "ERRO", "nomeie a obrigação: \"obriga-se a\", \"responde por\""],
    ["assegurar que", "ERRO", "nomeie a obrigação e quem responde"],
  ],
  adjetivo: [
    ["robust[oa]s?", "ERRO", "diga o que torna a prova ou o argumento forte"],
    ["crucia(l|is)", "ERRO", "corte ou diga porque importa"],
    ["abrangentes?", "ERRO", "especifique o que está incluído"],
    ["de (suma|extrema|grande) (importancia|relevancia)", "ERRO", "corte ou justifique com o facto"],
    ["fundamenta(l|is)", "AVISO", "corte ou descreva o efeito concreto", "(direito|principio|garantia|liberdade)s? fundamenta"],
  ],
  vago: [
    ["uma serie de", "ERRO", "indique o número ou a lista"],
    ["diversos (fatores|aspetos|elementos)", "ERRO", "liste-os"],
    ["de certa forma", "ERRO", "corte ou seja preciso"],
    ["obviamente", "ERRO", "corte"],
    ["evidentemente", "ERRO", "corte"],
    ["e claro que", "ERRO", "corte o reforço"],
  ],
};

// Registo humano legítimo, mas no máximo uma vez por documento.
const LIMITE_1X = ["outrossim", "ademais", "destarte", "in casu", "pelo exposto", "nao obstante", "em sintese", "consubstancia", "no ambito de", "no que respeita a"];

// Léxico e grafia do Brasil: ERRO sem uso jurídico em PT-PT; AVISO quando há sentido português.
const PTBR_ERRO = "\\b(usuari[oa]s?|registros?|planilhas?|contatos?|fatos?)\\b";
const PTBR_AVISO = "\\b(arquivos?|parcelas?|revisad[oa]s?)\\b";

const TRIADE_SUF = "(?:ivos?|ivas?|entes?|antes?|os[oa]s?|ais|al|veis|vel)";
const TRIADE = `\\b([a-z]+${TRIADE_SUF}), ([a-z]+${TRIADE_SUF}) e ([a-z]+${TRIADE_SUF})\\b`;
const TRIADE_OK = ["certa, liquida e exigivel"];

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

/** Minúsculas e sem acentos (para comparar padrões). */
export function dobrar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

const re = (p: string, f = "") => new RegExp(p, f);
const curto = (s: string) => (s.length > 60 ? s.slice(0, 59) + "…" : s);

/** Verifica um texto; devolve as ocorrências por linha. */
export function verificarRedacao(texto: string, opts: OpcoesRedacao = {}): Ocorrencia[] {
  const out: Ocorrencia[] = [];
  const contagem = new Map<string, number>();
  let repeticao: { chave: string; n: number } = { chave: "", n: 0 };
  const linhas = String(texto ?? "").replace(/\r\n?/g, "\n").split("\n");

  linhas.forEach((original, i) => {
    const linha = i + 1;
    const add = (nivel: Nivel, categoria: string, trecho: string, sugestao: string) =>
      out.push({ linha, nivel, categoria, trecho: curto(trecho.trim()), sugestao });

    if (!original.trim()) return;
    if (/^\s*@@(PERFIL|TIPO):/.test(original) || /^\s*\[MENÇÃO\]/.test(original)) {
      repeticao = { chave: "", n: 0 };
      return;
    }
    const cmd = /^\s*@@([A-Z-]+):?\s*(.*)$/.exec(original);
    const titulo = cmd ? ["CLAUSULA", "SECAO", "TITULO", "SUBTITULO", "ENDERECAMENTO"].includes(cmd[1]) : false;
    const valor = cmd ? cmd[2] : original;
    // Trecho entre crases não conta; {{variável}} só conta como resíduo.
    const visivel = valor.replace(/`[^`]*`/g, (m) => " ".repeat(m.length));
    const semVars = visivel.replace(/\{\{[^{}]*\}\}/g, (m) => " ".repeat(m.length));
    const d = dobrar(semVars);

    // Resíduos internos.
    const res = /\[\[IA:|\[\[(INÍCIO|INICIO) VARIANTE|\[\[FIM VARIANTE/.exec(visivel);
    if (res && !opts.guia) add("ERRO", "residuo", res[0], "apague a instrução interna antes de entregar");
    else if (opts.final && /\{\{[^{}]*\}\}/.test(visivel)) add("ERRO", "residuo", /\{\{[^{}]*\}\}/.exec(visivel)![0], "preencha a variável ou troque por [■ CONFIRMAR: …]");

    // Travessão e meia-risca (aceites em títulos de cláusula e de secção e em linhas só em maiúsculas).
    const soMaiusculas = /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(semVars) && semVars === semVars.toUpperCase();
    const traco = /[—–]/.exec(semVars);
    if (traco && !titulo && !soMaiusculas) add("ERRO", "travessao", semVars.slice(Math.max(0, traco.index - 20), traco.index + 20), "troque por vírgula, parênteses ou ponto");

    // Expressões proibidas, por grupo.
    for (const [grupo, regras] of Object.entries(PROIBIDOS)) {
      for (const [p, nivel, sug, isencao] of regras) {
        const m = re(`(?:^|[^a-z])(${p})(?![a-z])`).exec(d);
        if (m && !(isencao && re(isencao).test(d))) {
          add(nivel, `proibido/${grupo}`, m[1], sug);
          break;
        }
      }
    }

    // Uma vez por documento.
    let limite = false;
    for (const t of LIMITE_1X) {
      for (const m of d.matchAll(re(`(?:^|[^a-z])(${t})(?![a-z])`, "g"))) {
        const n = (contagem.get(t) ?? 0) + 1;
        contagem.set(t, n);
        if (n > 1 && !limite) {
          add("ERRO", "limite-1x", m[1], "já usada antes: corte esta ocorrência");
          limite = true;
        }
      }
    }

    // Markdown, emoji e negrito por fechar.
    if (!opts.guia && !cmd) {
      if (/^\s*#{1,6}\s/.test(semVars)) add("ERRO", "markdown", semVars, "use @@TITULO, @@SECAO ou @@CLAUSULA");
      else if (/^\s*[-*+]\s/.test(semVars)) add("ERRO", "markdown", semVars, "use @@ALINEA: a) ou @@ITEM");
      else if ((semVars.match(/\*\*/g) ?? []).length % 2 === 1) add("ERRO", "markdown", semVars, "feche o **negrito**");
      else if (EMOJI.test(semVars)) add("ERRO", "markdown", semVars, "apague o emoji");
    } else if (!opts.guia && EMOJI.test(semVars)) add("ERRO", "markdown", semVars, "apague o emoji");

    // Pontuação.
    const aspas = /[“”‘’]/.exec(semVars);
    if (aspas) add("ERRO", "pontuacao", aspas[0], "use aspas retas duplas (\")");
    else if (/(?<!\[)(\.\.\.|…)(?!\])/.test(semVars)) add("AVISO", "pontuacao", "...", "reticências só em [...], para corte de citação");

    // Léxico do Brasil.
    const br = re(PTBR_ERRO).exec(d);
    if (br) add("ERRO", "ptbr", br[0], "use a forma de PT-PT (utilizador, registo, folha de cálculo, contacto, facto)");
    else {
      const av = re(PTBR_AVISO).exec(d);
      if (av) add("AVISO", "ptbr", av[0], "confirme o sentido em PT-PT (ficheiro, prestação, revisto)");
    }

    // Paralelismo e tríade.
    const par = /\bnao (so|apenas)\b[^.]{0,80}\bmas tambem\b/.exec(d);
    if (par) add("AVISO", "paralelismo", par[0], "reescreva em frase direta");
    const tri = re(TRIADE).exec(d);
    if (tri && !TRIADE_OK.includes(tri[0])) add("AVISO", "triade", tri[0], "confirme se os três itens existem de verdade");

    // Ritmo e repetição de abertura (só parágrafos de corpo).
    if (!cmd) {
      const frases = semVars.split(/(?<=[.!?])\s+/).map((f) => f.trim()).filter(Boolean);
      if (frases.length >= 4) {
        const tam = frases.map((f) => f.split(/\s+/).length);
        const media = tam.reduce((a, b) => a + b, 0) / tam.length;
        const desvio = Math.sqrt(tam.reduce((a, b) => a + (b - media) ** 2, 0) / tam.length);
        if (desvio < 3) add("AVISO", "ritmo", frases[0], "varie o tamanho das frases");
      }
      const palavras = d.trim().split(/\s+/);
      const rotulo = /^(paragrafo|a\)|b\)|c\)|\d+\.)/.test(d.trim());
      const chave = ["o", "a", "os", "as", "um", "uma"].includes(palavras[0]) ? palavras.slice(0, 2).join(" ") : palavras[0];
      if (rotulo) repeticao = { chave: "", n: 0 };
      else {
        repeticao = repeticao.chave === chave ? { chave, n: repeticao.n + 1 } : { chave, n: 1 };
        if (repeticao.n === 3) add("AVISO", "repeticao-inicio", chave, "varie o começo do parágrafo");
      }
    } else repeticao = { chave: "", n: 0 };
  });
  return out;
}

/** Texto da resposta: "ERROS: n · AVISOS: m" e uma linha por ocorrência. */
export function formatarRedacao(ocs: Ocorrencia[]): string {
  const erros = ocs.filter((o) => o.nivel === "ERRO").length;
  const cab = `ERROS: ${erros} · AVISOS: ${ocs.length - erros}`;
  if (ocs.length === 0) return `${cab}\nSem erros nem avisos.`;
  return [cab, ...(erros === 0 ? ["Sem erros."] : []), ...ocs.map((o) => `L${o.linha} [${o.nivel}] ${o.categoria}: ${o.trecho} -> ${o.sugestao}`)].join("\n");
}
