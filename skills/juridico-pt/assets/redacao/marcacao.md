# Marcação Redator (formato intermédio entre o redator e o .docx)

> **Âmbito:** nacional

O redator NUNCA formata o .docx "à mão". Escreve o documento inteiro em texto simples com esta marcação e passa-o a um dos dois geradores do plugin, que aplicam a formatação profissional sempre da mesma forma (os dois produzem o mesmo `document.xml`):

- **Tool MCP `exportar_documento`** (TypeScript, no servidor do plugin): `conteudo` com o texto e `nome` só com minúsculas, algarismos e hífens (`2026-09-20-contrato-de-honorarios-maria-sousa`). A tool deteta a Marcação Redator pela primeira linha `@@PERFIL:`; sem ela, trata o texto como Markdown. O ficheiro fica em `.juridico-pt/exportados/<nome>.docx` e a resposta lista os marcadores por preencher, com a cláusula ou secção de cada um.
- **Python, só biblioteca-padrão** (sem instalar nada): grave o texto como `documento.txt` e corra, a partir de `skills/juridico-pt/`, `python scripts/gerar_docx.py documento.txt "AAAA-MM-DD - Tipo - Parte.docx"`.

Sem a tool e sem Python, entra o fallback do `entrega.md`: o documento vai num bloco de código, com as instruções de colagem no Word.

## Regras gerais

- Linhas de comando começam com `@@`. Qualquer outra linha não vazia é um parágrafo de corpo (justificado, espaçamento conforme o perfil).
- Linhas em branco são ignoradas. Para forçar espaço vertical, use `@@ESPACO`.
- Nada de markdown: sem `#`, sem `-` ou `*` de lista, sem tabelas com `|` fora de `@@TABELA`.
- Ênfase inline permitida SÓ: `**texto**` (negrito) para termos definidos ("CLIENTE"), rótulos ("Parágrafo único.") e nomes das partes na identificação; `_texto_` (itálico) para expressões latinas. Nada mais.
- Trechos que o utilizador precisa de completar ficam entre `[■ CONFIRMAR: ... ]` (ou `[■ VERIFICAR: ... ]`). O gerador realça-os a amarelo no .docx para o utilizador os encontrar.
- Instruções internas `[[IA: ...]]`, delimitadores `[[INÍCIO VARIANTE ...]]` / `[[FIM VARIANTE]]` e variáveis `{{...}}` por preencher NUNCA podem chegar ao ficheiro final. Se encontrar qualquer um dos três, o gerador recusa e não grava ficheiro nenhum: a tool responde "Não exportei: o texto ainda tem marcas internas…" com uma linha `L<n> <tipo>: <trecho>` por marca, e o script sai com código 2.
- Uma linha que precise de reproduzir texto de norma com expressão proibida pelo `estilo.md` começa com `[MENÇÃO]`. O verificador salta a linha inteira e o gerador apaga a marca antes de escrever o parágrafo. Use só para transcrição literal, nunca para fugir à regra no texto que redigiu.
- Travessão (U+2014) e meia-risca (U+2013) são proibidos no corpo; o verificador acusa-os (`travessao`) e corrigem-se antes de gerar. A meia-risca é aceite apenas dentro de `@@CLAUSULA` e `@@SECAO` (convenção forense: "CLÁUSULA PRIMEIRA – OBJETO", "I – DOS FACTOS").

## Cabeçalho do ficheiro (obrigatório, nas duas primeiras linhas)

```
@@PERFIL: juridico
@@TIPO: contrato
```

- `@@PERFIL`: `juridico` ou `contabil`. Define tipo de letra, margens e espaçamento (jurídico: Times New Roman 12, margens 3/3/2/2 cm, entrelinha 1,5; contabilístico: Arial 11, margens 2,5 cm, entrelinha 1,15).
- `@@TIPO`: `peticao`, `contrato`, `carta`, `memoria-calculo`, `parecer`, `ata` ou `recibo`.
- O tipo define os padrões de avanço e alinhamento: petição e parecer com avanço de primeira linha de 1,25 cm no corpo; os outros sem avanço. `@@RECUO: sim|nao` sobrepõe-se ao padrão do tipo.
- `@@PERFIL` fora da linha 1, `@@TIPO` fora da linha 2, valor inválido ou comando desconhecido: a tool recusa a exportação e indica a linha (`L<n> …`). Corrija e gere de novo.

## Comandos de estrutura

| Comando | Efeito no .docx |
|---|---|
| `@@CABECALHO: texto` | Cabeçalho de todas as páginas (nome do escritório). Opcional. Tamanho 10, centrado. |
| `@@RODAPE: texto` | Texto de rodapé à esquerda; o número de página vai sempre à direita, tamanho 10, automático. Opcional. |
| `@@TITULO: TEXTO` | Título do documento: centrado, maiúsculas (o gerador força), negrito, mesmo tamanho do corpo, 12 pt antes e depois. |
| `@@SUBTITULO: texto` | Centrado, negrito, sem maiúsculas forçadas. Ex.: "Instrumento Particular". |
| `@@ENDERECAMENTO: TEXTO` | Petições: maiúsculas, negrito, alinhado à esquerda, sem avanço, 24 pt depois. |
| `@@SECAO: TEXTO` | Título de secção de petição ou parecer: negrito, maiúsculas, alinhado à esquerda, 12 pt antes. |
| `@@CLAUSULA: TEXTO` | Título de cláusula de contrato: negrito, maiúsculas, alinhado à esquerda, 12 pt antes, mantido junto do parágrafo seguinte. |
| `@@SUB: Rótulo. \| texto` | Parágrafo de cláusula com rótulo a negrito no início ("Parágrafo único.", "1.", "2."). O separador é a barra vertical. |
| `@@ALINEA: a) texto` | Alínea: avanço esquerdo de 1,25 cm, sem avanço de primeira linha, justificado. |
| `@@ITEM: texto` | Item de pedidos de petição, numerado automaticamente em algarismos ("1.", "2." ...), avanço de 1,25 cm. A numeração reinicia a cada `@@SECAO`. |
| `@@CITACAO: texto` | Citação longa: avanço esquerdo de 4 cm, tamanho um ponto menor do que o corpo, espaçamento simples, 6 pt antes e depois. |
| `@@CENTRO: texto` | Parágrafo centrado. Uso: epígrafe e nome. Não use no preâmbulo do contrato, que é parágrafo de corpo. |
| `@@DIREITA: texto` | Parágrafo alinhado à direita. |
| `@@DATA: Lisboa, 20 de setembro de 2026.` | Linha de local e data: jurídico à direita; contabilístico à esquerda. 24 pt antes. |
| `@@ASSINATURAS: Nome \| Qualificação ;; Nome 2 \| Qualificação 2` | Blocos de assinatura centrados (linha, nome a negrito, qualificação por baixo). Até 2 por linha, em tabela sem limites. `;;` separa signatários. Ex.: `@@ASSINATURAS: Maria Sousa \| CLIENTE ;; João Silva \| ADVOGADO` |
| `@@TESTEMUNHAS: Nome \| NIF ;; Nome \| NIF` | Bloco "TESTEMUNHAS:" com duas colunas, linhas de assinatura, nome e NIF. |
| `@@TABELA: Cab 1 \| Cab 2 ;; c1 \| c2 ;; c1 \| c2` | Tabela com limites finos, primeira linha a negrito com fundo cinzento claro, tamanho 10; da segunda coluna em diante, as células que começam ou terminam com "€" ou que são só número ficam alinhadas à direita ("1.234,56 €" e "€ 1.234,56"); qualquer linha cuja primeira célula começa com "TOTAL" sai a negrito. |
| `@@TABELA-SEM-BORDA: ...` | Mesma sintaxe, sem limites e sem o destaque de cabeçalho (o negrito e o fundo cinzento saem). Uso: identificação das partes lado a lado. |
| `@@QUEBRA` | Quebra de página. |
| `@@ESPACO` | Uma linha em branco. |
| `@@NOTA: texto` | Nota em tamanho 10, itálico, alinhada à esquerda (uso: "Documento assinado com assinatura eletrónica qualificada"). |

## Exemplo mínimo (contrato)

```
@@PERFIL: juridico
@@TIPO: contrato
@@TITULO: Contrato de Honorários
Entre **{{nome_cliente}}**, {{qualificacao_cliente}}, contribuinte fiscal n.º {{nif_cliente}}, residente em {{morada_cliente}}, adiante designado por **CLIENTE**, e **{{nome_advogado}}**, Advogado, portador da cédula profissional n.º {{cedula_profissional}}, com domicílio profissional em {{domicilio_profissional}}, contribuinte fiscal n.º {{nif_advogado}}, adiante designado por **ADVOGADO**, é celebrado o presente contrato de honorários, que os Outorgantes aceitam e se obrigam a cumprir nos termos das cláusulas seguintes.
@@CLAUSULA: CLÁUSULA PRIMEIRA – OBJETO
O ADVOGADO obriga-se a prestar ao CLIENTE os serviços de advocacia relativos a {{assunto_confiado}}.
@@SUB: Parágrafo único. | Não estão incluídos neste contrato os serviços de {{servicos_excluidos}}.
@@CLAUSULA: CLÁUSULA SEGUNDA – HONORÁRIOS
Pelos serviços, o CLIENTE paga ao ADVOGADO honorários no valor de 1.500,00 € (mil e quinhentos euros), acrescido de IVA à taxa legal, na forma seguinte:
@@ALINEA: a) {{prestacao_1}};
@@ALINEA: b) {{prestacao_2}}.
@@DATA: {{cidade}}, {{data_por_extenso}}.
@@ASSINATURAS: {{nome_cliente}} | CLIENTE ;; {{nome_advogado}} | ADVOGADO, cédula profissional n.º {{cedula_profissional}}
@@TESTEMUNHAS: [■ CONFIRMAR: nome da testemunha 1] | NIF [■ CONFIRMAR] ;; [■ CONFIRMAR: nome da testemunha 2] | NIF [■ CONFIRMAR]
```

## Exemplo mínimo (petição)

```
@@PERFIL: juridico
@@TIPO: peticao
@@ENDERECAMENTO: EXMO. SENHOR JUIZ DE DIREITO DO JUÍZO LOCAL CÍVEL DE {{comarca}}, TRIBUNAL JUDICIAL DA COMARCA DE {{comarca}}
@@DIREITA: Processo n.º {{numero_processo}}
@@ESPACO
**{{nome_parte}}**, Autor nos autos à margem referenciados, em que é Ré **{{nome_parte_contraria}}**, vem, nos termos e para os efeitos do disposto no artigo {{artigo_fundamento}}, expor e requerer o seguinte.
@@SECAO: I – DOS FACTOS
{{factos}}
@@SECAO: II – DO PEDIDO
Nestes termos e nos demais de Direito, deve a presente ação ser julgada procedente, por provada, e, em consequência:
@@ITEM: {{pedido_1}};
@@ITEM: {{pedido_2}}.
@@DATA: {{cidade}}, {{data_por_extenso}}.
@@ASSINATURAS: O Advogado | {{nome_advogado}}, cédula profissional n.º {{cedula}}
```

Os dois exemplos mostram o modelo como fica guardado, com `{{...}}`. No documento final todas as variáveis estão preenchidas ou trocadas por `[■ CONFIRMAR: ...]`; de outro modo, o gerador recusa.

## Cálculos e memória de cálculo

O plugin não gera folhas de cálculo. A conta sai das calculadoras (`calc_juros_mora`, `calc_creditos_laborais`, `calc_compensacao_despedimento`, …) e a memória de cálculo em .docx usa esta marcação com o tipo de memória de cálculo do `@@TIPO` (cabeçalho acima), `@@TABELA` para os valores e uma linha "TOTAL". Taxas e índices do ano vêm de `references/valores-2026.md`, nunca de memória.

> Os geradores (`exportar_documento` e `scripts/gerar_docx.py`) são a palavra final sobre a formatação: divergindo desta tabela, vale o que eles fazem. A especificação completa está em `formatacao-docx.md`.
