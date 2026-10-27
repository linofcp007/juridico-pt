# Protocolo de pesquisa e marcação (documento sem modelo, Portugal)

> **Âmbito:** nacional

Vale quando o documento pedido não tem modelo em `assets/modelos/` (tool `listar_modelos`). O plugin não tem fichas: o redator parte do modelo mais próximo ou do template mais próximo (`listar_templates` / `obter_template`) para a estrutura, avisa numa linha qual escolheu e porquê, e trabalha a fundamentação por este protocolo. Quem lê na fonte oficial o que falta é o redator, antes de escrever.

Este nível pressupõe ferramenta de navegação (WebFetch ou equivalente). Sem navegação, o documento sai com marcador em toda a norma que não esteja já conferida: entrega correta, não erro. Errado é o artigo preenchido de memória.

## 1. O que já está conferido cita-se direto

Preceito presente na secção 5 "Fundamentação permitida" de qualquer modelo ou na tabela de fontes do `seguranca-juridica.md` já foi lido na fonte oficial pelos autores dos modelos. Cite-o sem reler, registando-o no `pesquisa.md` como linha INDICE. O índice está em `references/normas-conferidas.md` (e `references/normas-conferidas.json`, gerados por `mcp-server/scripts/gerar-normas.mjs`): procure ali antes de abrir URL. Só o que está fora do índice exige leitura.

## 2. Antes de redigir: abrir a fonte

Para cada norma de que o caso precisa e que não está no índice, abra o URL com a ferramenta de navegação e localize o preceito pelo número ("Artigo 1015.º"); a ferramenta lê a página inteira, sem shell. Leia o artigo completo, com números e alíneas. O que está na mesma página pode ser citado, mesmo que não estivesse na lista inicial. Tente abrir todas antes de redigir.

## 3. Registo obrigatório: `pesquisa.md`

Toda a norma citada tem uma linha em `pesquisa.md`, num destes formatos:

```
LIDO | <diploma canónico> | <preceito> | <URL onde leu> | <trecho literal curto, até 200 caracteres>
NAO_LIDO | <diploma> | <preceito> | <URL tentado> | <motivo>
INDICE | <diploma> | <preceito> | <ficheiro e item do índice onde está conferido>
```

O `pesquisa.md` fica na pasta de trabalho, ao lado do `documento.txt`, ou, sem escrita de ficheiros, na própria conversa. Leva só normas: nenhum dado das partes.

Antes de gerar o Word: confira à mão, linha a linha, todo o "artigo N.º" do documento contra o registo do `pesquisa.md` e aponte a citação sem lastro; corrija ou marque até zerar. A entrega resume o registo. Para uma segunda leitura, o subagente `verificador-citacoes` confere as citações do texto (primeiro no índice, depois na fonte oficial) e devolve o estado de cada uma.

## 4. Só cita o que tem linha LIDO ou INDICE

Artigo, número, alínea, acórdão, prazo, percentagem ou valor: só com linha LIDO ou INDICE. Memória, conversa anterior e resumo de terceiros não contam.

## 5. Redação vigente

Preceito alterado entra com a redação em vigor, a da versão consolidada. A PGD Lisboa indica, no fim de cada artigo, "Contém as alterações dos seguintes diplomas" e a lista de versões anteriores: registe a lei alteradora na linha LIDO. No Código de Processo Civil, o cabeçalho de cada artigo traz a correspondência com o Código de 1961 ("art.º 144.º CPC 1961"): cite sempre a numeração de 2013.

## 6. Acórdãos e jurisprudência uniformizada

Sumário transcrito palavra por palavra da fonte lida; paráfrase é proibida. Tribunal, data e número de processo vêm da página do tribunal (dgsi.pt, ver secção 7) ou do Diário da República, no caso de acórdão de uniformização de jurisprudência. Sem página lida, o argumento vai sem citação e com `[■ VERIFICAR: acórdão a conferir sobre <tese>]`.

## 7. Fontes oficiais e como abri-las

Testado em 20 de setembro de 2026 com `curl -4 -s -A "Mozilla/5.0" -L <URL>` (IPv4 forçado, identificação de navegador). A ferramenta de navegação abre os mesmos URL.

1. Códigos e leis consolidadas: Procuradoria-Geral Distrital de Lisboa, `https://www.pgdlisboa.pt/leis/`. Abre por curl e devolve a página em ISO-8859-1 (converta antes de ler).
   - Um artigo direto, sempre com os parâmetros completos: `https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?artigo_id=<nid>A<artigo com 4 dígitos>&nid=<nid>&tabela=leis&pagina=1&ficha=1&so_miolo=&nversao=`. Sem `&pagina=1&ficha=1&so_miolo=&nversao=`, a página responde "A query falhou!".
   - Por exemplo, o artigo 805.º do Código Civil: `https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?artigo_id=775A0805&nid=775&tabela=leis&pagina=1&ficha=1&so_miolo=&nversao=`.
   - O diploma inteiro: `https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=<nid>&tabela=leis`.
   - Na página de cada artigo, o texto aparece duas vezes: a primeira é o índice lateral (só o título), a segunda é o corpo; leia a segunda.
   - O índice completo dos diplomas está em `lei_main.php`, paginado por `ficha=1, 101, 201...`.
2. Números (`nid`) conferidos na PGD Lisboa:

   | Diploma | nid |
   |---|---|
   | Código Civil | 775 |
   | Código de Processo Civil | 1959 |
   | Código do Trabalho | 1047 |
   | Novo Regime do Arrendamento Urbano | 691 |
   | Regulamento das Custas Processuais | 967 |
   | Código da Insolvência e da Recuperação de Empresas | 85 |
   | Estatuto da Ordem dos Advogados | 2440 |
   | Lei da Organização do Sistema Judiciário | 1974 |
   | Lei da Proteção de Dados Pessoais (Lei n.º 58/2019) | 3118 |
   | Código das Sociedades Comerciais | 524 |
   | Código do Notariado | 457 |
   | Regime Jurídico dos Atos de Advogados e Solicitadores (Lei n.º 10/2024) | 3758 |
   | Injunção e ação especial para obrigações pecuniárias (Decreto-Lei n.º 269/98) | 574 |
   | Atrasos de pagamento nas transações comerciais (Decreto-Lei n.º 62/2013) | 1920 |

3. Diário da República: `https://diariodarepublica.pt`. Fonte oficial de publicação e de texto consolidado, mas a página é montada por JavaScript: por curl devolve só uma casca de 2 KB, sem texto. Abra pela ferramenta de navegação (que executa a página) ou use o PDF da publicação original quando a página o indicar (`files.dre.pt/1s/<ano>/<mês>/<número>/<páginas>.pdf`; o do Estatuto da Ordem dos Advogados é `https://files.dre.pt/1s/2015/09/17600/0728507325.pdf`). Sem navegação e sem PDF, a linha é NAO_LIDO.
4. Ordem dos Advogados: `https://portal.oa.pt`. O Estatuto está em `/ordem/regras-profissionais/estatuto-da-ordem-dos-advogados/` (texto integral, abre por curl, UTF-8). Regulamentos, deliberações e laudos de honorários: procure a partir de `/ordem/regras-profissionais/`; o que não abrir fica `[VERIFICAR]`.
5. Jurisprudência: `http://www.dgsi.pt` (bases do Supremo Tribunal de Justiça, Relações, tribunais administrativos), `https://www.tribunalconstitucional.pt`. `[VERIFICAR: acesso por curl não testado em 20 de setembro de 2026]`. O portal `https://www.tribunais.org.pt` (Conselho Superior da Magistratura, dados dos tribunais e comarcas) não respondeu ao curl nesse dia: abra pela ferramenta de navegação.
6. Fiscal: Autoridade Tributária, `https://info.portaldasfinancas.gov.pt` (códigos tributários consolidados: IVA, IRS, IRC, Imposto do Selo). Abre por curl; o Código do IVA, artigo 18.º, está em `/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva18.aspx`.
7. Fonte fora do domínio oficial (blogues, sítios de escritórios, agregadores de legislação, Wikipédia) não gera linha LIDO.

## 8. Prazo

Prazo em dias só é afirmado quando o preceito que o fixa, a forma de contagem e o termo inicial estão no índice (linha INDICE) ou foram lidos agora (linha LIDO). Fora disso, a conta sai condicional ("se o prazo for de 30 dias a contar da notificação, e sem férias judiciais pelo meio, o termo é 20/10/2026") com `[■ VERIFICAR: prazo e contagem]`. Sem data de referência do utilizador não há conta. Prazo processual é contínuo e suspende-se nas férias judiciais (Código de Processo Civil, artigo 138.º, no índice): a conta diz sempre se as considerou, e pode ser feita com a tool `calc_prazo`. Ressalva de feriado e de tolerância de ponto na entrega.

## 9. Juros e mora

Sem taxa estipulada por escrito: juros legais (Código Civil, artigos 559.º e 806.º, no índice), à taxa fixada em portaria. A taxa do ano está em `references/valores-2026.md` (secção "Juros de Mora") e a conta faz-se com `calc_juros_mora`; citada no documento, a fonte é lida ou fica `[■ VERIFICAR: taxa de juro legal em vigor]`. Proibida qualquer taxa por hábito, mensal ou anual, que o utilizador não tenha estipulado por escrito. Juros de juros só nos termos do artigo 560.º (no índice).

## 10. Sem navegação ou fonte fora do ar

Registe NAO_LIDO, escreva o argumento sem número e insira o marcador no ponto exato: `[■ VERIFICAR: Código Civil, artigo 560.º, condições da capitalização de juros]`. Nunca preencha de memória para o texto "ficar completo".

## 11. Jurisprudência

Acórdão nunca sai de memória. Sem acórdão lido na base oficial, com tribunal, data e número de processo, o argumento vai sem citação e com `[■ VERIFICAR: acórdão a conferir sobre <tese>]`.

## 12. Etiqueta obrigatória

Toda a nota de entrega de documento feito por este protocolo traz esta frase, sem alteração, antes da linha fixa de revisão do `entrega.md`, que continua obrigatória:

"Documento gerado sob instrução. A fundamentação não passou por conferência prévia; confira os marcadores antes de assinar."

## 13. O resto do fluxo não muda

Entrevista (`entrevista.md`), Marcação Redator (`marcacao.md`), autorrevisão (`estilo.md` e a tool `verificar_redacao` ou `scripts/verificador.py`), ficheiro (`exportar_documento` ou `scripts/gerar_docx.py`) e entrega (`entrega.md`): igual ao documento feito por modelo. Sem travessão, meia-risca nem expressões proibidas. Português de Portugal em toda a saída, incluindo o `pesquisa.md`.
