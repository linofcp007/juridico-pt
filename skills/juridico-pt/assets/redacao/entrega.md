# Entrega: a mensagem que acompanha o ficheiro

> **Âmbito:** nacional

A mensagem de entrega tem três partes e acaba. Sem introdução, sem fecho, sem oferta de ajuda.

**1. O ficheiro.** Uma linha com o nome do ficheiro e o que ele é.

**2. "Confira antes de assinar".** De 3 a 5 itens, por esta ordem de prioridade:
- os `[■ CONFIRMAR: ...]` que ficaram no documento, com o local de cada um (cláusula, secção, item); a tool `exportar_documento` devolve-os já com a cláusula ou secção;
- os prazos calculados, com a data de referência usada e a conta;
- os pontos `[■ VERIFICAR: ...]`, dizendo o que conferir e onde;
- a variante ou o valor por defeito que entrou por escolha do redator, quando o utilizador respondeu "use o padrão";
- valores e datas que dependem de conferência do utilizador.

Passando de 5 itens, agrupe os marcadores num item só e liste-os dentro dele.

**3. A linha fixa de revisão**, sempre igual, no fim:

Este documento precisa da sua revisão antes de ser assinado, enviado ou apresentado em juízo.

Nada depois disso. Sem "qualquer coisa, é só dizer", sem "espero que ajude", sem resumo do que foi feito.

Documento feito sem modelo, pelo `protocolo-pesquisa.md`: a etiqueta obrigatória desse protocolo vai antes da linha fixa de revisão, que continua obrigatória.

## Nome do ficheiro

`AAAA-MM-DD - Tipo do documento - Parte.docx`

Data do dia, tipo em linguagem corrente (não o slug), nome da parte principal ou do cliente. Nome com mais de duas palavras fica reduzido ao nome próprio e ao primeiro apelido. O acento no nome do ficheiro pode ficar.

Exemplos:
- `2026-09-20 - Contrato de Honorários - Maria Sousa.docx`
- `2026-09-20 - Interpelação Extrajudicial - Construtora Alfa.docx`
- `2026-09-20 - Memória de Cálculo de Créditos Laborais - João Pereira.docx`

Com a tool `exportar_documento`, o `nome` só aceita minúsculas, algarismos e hífens: use a mesma ordem, sem acentos nem espaços (`2026-09-20-contrato-de-honorarios-maria-sousa`). O ficheiro fica em `.juridico-pt/exportados/` e a linha 1 da entrega dá o caminho que a tool devolveu. Com `scripts/gerar_docx.py`, o nome vai tal como acima, no segundo argumento.

O plugin não gera folhas de cálculo. Num cálculo, a conta sai da calculadora (`calc_juros_mora`, `calc_creditos_laborais`, `calc_compensacao_despedimento`, …) e a memória de cálculo vai num `.docx`, na Marcação Redator com `@@TABELA`.

## Fallback: sem `exportar_documento` e sem Python

Quando não há a tool MCP `exportar_documento` nem Python para correr `scripts/gerar_docx.py`. Este é o texto único do fallback: o redator não escreve outra versão.

1. Entregue o documento inteiro num único bloco de código, na Marcação Redator (`marcacao.md`), sem cortar.
2. Por baixo, a instrução de colagem: "No Word, cole o bloco como texto simples (Colar Especial, Só Texto)."
3. "Aplique negrito ao que está entre `**…**` e itálico ao que está entre `_…_`; depois apague os sinais."
4. "Cada linha que começa com `@@` indica o formato do trecho seguinte (título, cláusula, alínea, tabela, assinaturas): aplique esse formato e apague a linha. Nas tabelas, `|` separa colunas e `;;` separa linhas."
5. "Procure ■ (Localizar, Ctrl + L) e preencha cada trecho antes de assinar."
6. Siga com o "Confira antes de assinar" e com a linha fixa de revisão.

O formato de cada `@@` está na tabela de comandos do `marcacao.md`. Não peça desculpa, não explique a limitação do ambiente, não prometa tentar de novo.

## Exemplo completo

> **2026-09-20 - Contrato de Honorários - Maria Sousa.docx**
> Contrato de honorários com valor fixo e majoração em função do resultado: 3.000,00 € (três mil euros) em três prestações, mais 10 % (dez por cento) sobre a quantia recebida, com IVA acrescido à taxa legal.
>
> **Confira antes de assinar**
> 1. Ficaram quatro campos por completar: NIF e morada da cliente (preâmbulo, identificação da CLIENTE), domicílio profissional do advogado (preâmbulo, identificação do ADVOGADO), IBAN para as transferências (cláusula terceira) e limite máximo da majoração em euros (cláusula quarta, n.º 2). Estão a amarelo no ficheiro.
> 2. A primeira prestação, de 1.000,00 € (mil euros), vence em 30/09/2026: assinatura em 20/09/2026 mais 10 (dez) dias seguidos, como informou. As duas seguintes vencem no dia 30 de outubro e no dia 30 de novembro. Confira se a data da assinatura vai ser mesmo hoje.
> 3. A mora ficou à taxa legal, contada do vencimento e sem interpelação (Código Civil, artigos 805.º e 806.º). Não escrevi percentagem mensal nem anual: a cláusula oitava remete para a taxa fixada por portaria.
> 4. Respondeu "use o padrão" na provisão: entrou a variante com provisão inicial, com provisão para despesas reposta quando o saldo descer abaixo de metade e provisão por conta de honorários imputada na última fatura.
> 5. A majoração de 10 % (dez por cento) incide sobre a quantia que a cliente efetivamente receber, por decisão transitada em julgado ou acordo homologado, e acresce aos 3.000,00 € (três mil euros), que são devidos qualquer que seja o resultado. É esta a construção que o artigo 106.º, n.º 3, do Estatuto da Ordem dos Advogados admite; o pacto de quota litis, em que os honorários dependeriam só do resultado, é proibido. Confira o exemplo numérico da cláusula quarta.
>
> Este documento precisa da sua revisão antes de ser assinado, enviado ou apresentado em juízo.
