# Formatação do .docx (especificação e conferência)

> **Âmbito:** nacional

Quem formata é o gerador do plugin, nunca o redator "a olho". O redator escreve o documento na Marcação Redator (`marcacao.md`), gera o ficheiro e entrega-o. Há dois geradores, com o mesmo resultado (paridade verificada por fixtures do `document.xml`):

- a tool MCP `exportar_documento`, em TypeScript, no servidor do plugin;
- `scripts/gerar_docx.py`, em Python, só com a biblioteca-padrão (`zipfile` e XML).

Nenhum dos dois precisa de instalar nada nem usa biblioteca externa. O resultado sai igual em qualquer ambiente.

## 1. Passo a passo que o redator segue

1. Escrever o documento inteiro em texto simples, na Marcação Redator, com `@@PERFIL` na linha 1 e `@@TIPO` na linha 2.
2. Correr o verificador (`verificar_redacao` ou `scripts/verificador.py`, ver `estilo.md`) até zerar os erros.
3. Gerar o ficheiro:
   - com a tool: `exportar_documento` com `conteudo` (o texto) e `nome` (`2026-09-20-contrato-de-honorarios-maria-sousa`, só minúsculas, algarismos e hífens);
   - sem a tool: gravar `documento.txt` e correr, a partir de `skills/juridico-pt/`, `python scripts/gerar_docx.py documento.txt "2026-09-20 - Contrato de Honorários - Maria Sousa.docx"`.
4. Ler o resultado. Três situações:
   - **Recusa por marcas internas** (a tool responde "Não exportei: o texto ainda tem marcas internas…" com `L<n> <tipo>: <trecho>`; o script sai com código 2): o texto ainda tem `[[IA: ...]]`, bloco de variante aberto ou variável `{{...}}` por preencher. Nenhum ficheiro foi gerado. Corrigir e gerar de novo. Dado que não existe passa a `[■ CONFIRMAR: o que falta]`.
   - **Erro de formato** (`@@PERFIL` ou `@@TIPO` em falta, inválidos ou fora das duas primeiras linhas; comando desconhecido; `@@SUB` sem a barra vertical): corrigir a linha indicada e gerar de novo.
   - **Ficheiro gerado**: a tool devolve o caminho, o tamanho e "Marcadores por preencher (n):", com uma linha por marcador e a cláusula ou secção onde está. Seguir para a conferência.
5. Conferir o resultado (secção 9): os marcadores devolvidos são só os `[■ ...]` esperados, e não sobrou nenhuma marca interna.
6. Entregar conforme `entrega.md`, dizendo quantos trechos amarelos o utilizador precisa de preencher.

## 2. Onde fica o ficheiro

| Caminho | Pasta de saída |
|---|---|
| Tool `exportar_documento` (plugin no Claude Code ou no Claude Desktop) | `.juridico-pt/exportados/<nome>.docx`, no projeto (ou no `diretorio` indicado) |
| `scripts/gerar_docx.py` | o caminho dado no segundo argumento |
| Claude com criação de ficheiros (pacote `.skill`) | pasta de saída do ambiente, em geral `/mnt/user-data/outputs` |

O ficheiro é gravado só quando o utilizador pede o documento. Os dados das partes ficam nesse .docx e em mais nenhum ficheiro do plugin.

## 3. Sem gerador

Sem a tool `exportar_documento` e sem Python, entra o fallback, escrito num único lugar: a secção "Fallback" do `entrega.md` (documento num bloco de código e as instruções de colagem no Word). Não escreva outra versão dele.

## 4. Perfis

| | Jurídico | Contabilístico |
|---|---|---|
| Página | A4, 21,0 x 29,7 cm | A4, 21,0 x 29,7 cm |
| Margens | superior 3 cm, esquerda 3 cm, inferior 2 cm, direita 2 cm | 2,5 cm nos quatro lados |
| Tipo de letra | Times New Roman 12, preta | Arial 11, preta |
| Entrelinha | 1,5 | 1,15 |
| Espaço depois do parágrafo | 6 pt | 6 pt |
| Corpo | justificado | justificado |
| Título, subtítulo, secção e cláusula | negrito 12 | negrito 12 |
| Local e data | à direita | à esquerda |

O gerador grava o tipo de letra nas predefinições do documento, incluindo o atributo `eastAsia` do `rFonts`. Sem isso, o Word ignora o tipo de letra em parte do texto e volta ao Calibri.

O idioma de revisão do documento é gravado como português (Portugal), para o corretor ortográfico do Word abrir em pt-PT.

No perfil contabilístico o corpo é 11 e o título é 12, como pede o padrão comercial. No jurídico os dois são 12, e o título sai do mesmo tamanho do corpo.

## 5. Avanço de primeira linha por tipo

`@@TIPO: peticao` e `@@TIPO: parecer` saem com avanço de 1,25 cm na primeira linha de cada parágrafo de corpo. Os outros tipos (contrato, carta, memória de cálculo, ata e recibo) saem sem avanço. `@@RECUO: sim` ou `@@RECUO: nao` sobrepõe-se ao valor por defeito do tipo, e é o que se usa quando o tribunal ou o cliente exige outra coisa.

## 6. Elementos

| Marcação | Como sai |
|---|---|
| parágrafo comum | justificado, entrelinha do perfil, avanço do tipo, 6 pt depois |
| `@@TITULO` | centrado, maiúsculas forçadas, negrito, tamanho 12, 12 pt antes e depois. Vai também para o título nas propriedades do ficheiro |
| `@@SUBTITULO` | centrado, negrito, sem maiúsculas forçadas |
| `@@ENDERECAMENTO` | maiúsculas, negrito, à esquerda, sem avanço, 24 pt depois |
| `@@SECAO` | negrito, maiúsculas, à esquerda, 12 pt antes, colado ao parágrafo seguinte. Reinicia a numeração dos `@@ITEM` |
| `@@CLAUSULA` | igual à secção, e sempre colada ao parágrafo seguinte (o título de cláusula não fica sozinho no fundo da página) |
| `@@SUB` | rótulo em negrito e o texto na sequência, sem avanço de primeira linha |
| `@@ALINEA` | avanço esquerdo de 1,25 cm, sem avanço de primeira linha, justificado |
| `@@ITEM` | numerado em algarismo com ponto, avanço esquerdo de 1,25 cm, reiniciando a cada `@@SECAO` |
| `@@CITACAO` | avanço esquerdo de 4 cm, um ponto menor do que o corpo, espaço simples, 6 pt antes e depois |
| `@@CENTRO` e `@@DIREITA` | parágrafo centrado e à direita, sem avanço |
| `@@DATA` | alinhada conforme o perfil, 24 pt antes |
| `@@ASSINATURAS` | tabela sem limites, até 2 blocos por linha: linha de assinatura, nome em negrito, qualificação por baixo, tudo centrado |
| `@@TESTEMUNHAS` | rótulo "TESTEMUNHAS:" em negrito e a mesma tabela sem limites, um ponto menor |
| `@@TABELA` | limites finos cinzentos, cabeçalho em negrito com fundo cinzento claro e centrado, tamanho 10; célula que começa ou termina com "€" ou que só tem número alinha à direita, da segunda coluna em diante (a primeira é a coluna do rótulo e fica sempre à esquerda); linha que começa por "TOTAL" sai inteira em negrito |
| `@@TABELA-SEM-BORDA` | a mesma tabela sem limites, sem fundo cinzento e sem cabeçalho em negrito. Uso: qualificação lado a lado |
| `@@CABECALHO` | cabeçalho de todas as páginas, centrado, tamanho 10 |
| `@@RODAPE` | texto à esquerda do rodapé, tamanho 10 |
| número de página | sempre presente, à direita do rodapé, tamanho 10, campo `PAGE` que o Word atualiza sozinho |
| `@@QUEBRA` | quebra de página |
| `@@ESPACO` | uma linha em branco |
| `@@NOTA` | tamanho 10, itálico, à esquerda |
| `**negrito**` e `_itálico_` | negrito e itálico dentro do parágrafo |
| `[■ CONFIRMAR: ...]` e `[■ VERIFICAR: ...]` | realce amarelo, para o utilizador encontrar o que falta |

O número de página é um campo `PAGE` no `footer1.xml`, escrito como campo e não como texto: quem alterar o gerador não reescreve o parágrafo do rodapé depois de o campo lá estar, senão o número deixa de atualizar.

O parágrafo do rodapé não usa o estilo Rodapé do Word, mas sim o Normal, porque o estilo Rodapé traz uma tabulação central que puxa o número de página para o meio da página.

## 7. Travessão e marcas internas

Travessão e meia-risca no corpo são proibidos: o verificador acusa-os (`travessao`) e o texto corrige-se antes de gerar. A meia-risca continua nos títulos de `@@CLAUSULA` e `@@SECAO`, que é a convenção forense ("CLÁUSULA PRIMEIRA – DO OBJETO", "I – DOS FACTOS").

O gerador apaga a marca `[MENÇÃO]` do início da linha antes de escrever o parágrafo. Essa marca existe para a transcrição literal de texto de norma que contenha expressão proibida pelo estilo: faz o verificador saltar a linha e não aparece no .docx.

O gerador recusa o texto se encontrar `[[IA:`, `[[INÍCIO VARIANTE`, `[[FIM VARIANTE` ou `{{`. Nenhum ficheiro é gerado nesse caso. É a trava que impede instrução interna e variável por preencher de chegarem ao cliente.

## 8. O que o gerador não faz

| Falta | O que fazer |
|---|---|
| Nota de rodapé verdadeira (numeração automática no fundo da página) | Use `@@NOTA` no fim do documento, ou numere a chamada no corpo com "(1)" e reúna as notas numa secção "Notas" no fim |
| Índice automático | Não há campo de índice. Em parecer longo, escreva o índice à mão com `@@ITEM` na primeira página, sem número de página |
| Imagem, logótipo e papel timbrado | O gerador não insere imagem. O utilizador cola o timbre no cabeçalho do ficheiro gerado, uma vez, e grava-o como modelo do Word |
| Numeração automática de cláusula | O número por extenso é escrito no texto do `@@CLAUSULA`. Inserir ou apagar cláusula exige renumerar: o redator renumera antes de gerar |
| Assinatura eletrónica qualificada (Chave Móvel Digital, Cartão de Cidadão) | Feita fora, no assinador do utilizador ou na plataforma do tribunal |
| Marca de água e registo de alterações | Não são gerados |
| Folha de cálculo (.xlsx) | O plugin não a gera: a conta sai das calculadoras `calc_*` e a memória de cálculo vai em .docx |

## 9. Conferência antes de entregar

Verificar no ficheiro pronto: tamanho da página 21 x 29,7 cm; margens do perfil; tipo de letra e tamanho; cabeçalho e rodapé presentes quando pedidos; número de página no rodapé à direita; realce amarelo só nos trechos `[■ ...]` (a lista de marcadores devolvida pela tool tem de bater com eles); tabelas com o número de linhas esperado; e nenhuma ocorrência de `[[`, `{{` ou travessão no texto.

A página em que cada trecho cai é decidida pelo Word quando abre o ficheiro, e o gerador não controla isso. O que ele assegura é que os títulos de cláusula e de secção levam a marca "manter com o seguinte", pelo que nenhum deles fica sozinho no fundo da página.
