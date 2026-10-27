# Entrevista: como perguntar

> **Âmbito:** nacional

Regra única: **uma mensagem, todas as perguntas**. Nada de perguntas em fatias, uma de cada vez. Quem responde é um profissional ocupado: lê a lista inteira, responde de uma vez e recebe o documento.

## Como montar a ronda

1. Leia a secção 2 do modelo escolhido (tool `obter_modelo`, que a devolve nas secções por defeito, ou `assets/modelos/<slug>.md`). Ela já traz as perguntas daquele documento.
2. Corte o que o utilizador já informou no pedido. Não pergunte de novo o que ele acabou de dizer. O que estiver no perfil (`obter_perfil_empresa`), incluindo os dados do advogado responsável, também não se pergunta: confirma-se numa linha, se for preciso.
3. Agrupe o que sobrou nestes cinco blocos, por esta ordem, usando só os blocos que tiverem pergunta: **Partes**, **Objeto**, **Valores e prazos**, **Formalidades**, **Opções**.
4. Numere as perguntas de forma corrida (1, 2, 3...), atravessando os blocos.
5. Ponha o valor por defeito entre parênteses quando o modelo o tiver: "(por defeito: 12 meses)".
6. No máximo 12 perguntas por ronda. Passando disso, pergunte o que trava a redação agora, deixe as restantes para a ronda seguinte quando forem obrigatórias, e o que sobrar vira `[■ CONFIRMAR]` no documento.
7. Feche com uma linha: "Responda pelo número. Pode escrever 'não sei' ou 'use o padrão' em qualquer uma."

O bloco **Opções** corresponde às variantes da secção 3 do modelo. Cada opção sai nomeada, com a consequência prática em meia linha, para o utilizador escolher sem abrir o modelo.

## O que fazer com as respostas

- **"não sei"**: o campo vira `[■ CONFIRMAR: o que falta]` no sítio do documento e entra na lista da entrega.
- **"use o padrão"**: aplique o valor por defeito do modelo e diga na entrega qual foi o que entrou.
- **Resposta incompleta**: use o que veio, marque o resto, siga. Não abra segunda ronda por um pormenor.
- **Resposta que contradiz o pedido inicial**: pergunte só sobre a contradição, numa linha.
- **"vai direto" ou "faça à sua maneira"**: aplique todos os valores por defeito, marque o que faltar e entregue.

Segunda ronda é normal em dois casos, e só nestes dois:

- **O modelo tem mais perguntas do que o teto.** Contrato longo costuma passar de 12. Faça as 12 que travam a redação agora e, na ronda seguinte, pergunte apenas o que ficou de fora. Nunca repita o que já foi respondido e não peça confirmação do que o utilizador escreveu.
- **A resposta abriu um caminho que muda o documento inteiro** (o contrato passou a ter majoração em função do resultado, o arrendamento passou a não habitacional, o cliente passou a pessoa coletiva).

Nos dois casos, no máximo 4 perguntas por ronda depois da primeira, e diga numa linha porque voltou: "A modalidade por hora que escolheu abre quatro pontos que o contrato precisa de fechar."

Terceira ronda só existe quando o modelo tem mais de 16 perguntas obrigatórias. Passando disso, pare de perguntar: o que faltar vira `[■ CONFIRMAR: ...]` no documento e entra na lista da entrega.

## Só os dados que o documento usa

Não peça dado que o documento não usa. Não peça NIF em documento que não qualifica a parte, nem rendimentos em contrato que não trata de rendimentos. Cartão de cidadão, data de nascimento e estado civil só se pedem quando o modelo os usa na identificação das partes (há uma variável `{{...}}` que os recebe). Ao pedir documento anexo, avise: "Envie só a parte usada aqui."

As respostas servem para preencher o documento e ficam nele: não vão para o perfil, para os prazos registados nem para outro ficheiro do plugin.

## Exemplo de ronda, contrato de honorários

> Para montar o contrato, preciso destes pontos:
>
> **Partes**
> 1. Nome completo ou denominação do cliente, NIF ou NIPC, estado civil e profissão (se particular), morada ou sede, endereço eletrónico e telefone. Sendo pessoa coletiva, quem a representa e em que qualidade.
> 2. Advogado em prática individual ou sociedade de advogados: nome, número da cédula profissional, domicílio profissional e NIF; na sociedade, denominação, sede, NIPC e o advogado responsável pelo assunto.
>
> **Objeto**
> 3. Qual é o assunto confiado (ação a propor, defesa, recurso, consultoria, acompanhamento), contra quem, em que tribunal e juízo, e qual o valor do assunto ou o proveito económico estimado.
> 4. O patrocínio cobre recurso? (por defeito: fase declarativa na primeira instância, até à sentença; recurso para a Relação é contratado à parte)
> 5. Fica alguma coisa expressamente de fora? (por defeito: custas, taxa de justiça, despesas e honorários de perito a cargo do cliente)
>
> **Valores e prazos**
> 6. Modalidade: avença mensal, valor fixo por assunto, valor fixo por fase, por hora, ou uma destas com majoração em função do resultado.
> 7. Valor em euros e IVA: o valor indicado inclui o IVA ou é acrescido de IVA à taxa legal? (por defeito: acrescido)
> 8. Forma de pagamento: valor na assinatura, número de prestações, data do primeiro vencimento e dia de vencimento das seguintes, IBAN.
> 9. Havendo majoração em função do resultado: percentagem e sobre o que incide (quantia efetivamente recebida, quantia poupada, valor certo). (por defeito: sobre a quantia efetivamente recebida pelo cliente, por decisão transitada em julgado ou acordo homologado)
> 10. Provisão inicial: valor por conta dos honorários e valor para despesas? (por defeito: com provisão para despesas, reposta quando o saldo descer abaixo de metade)
>
> **Formalidades**
> 11. Local e data da assinatura, e como vai ser assinado: em papel, em dois exemplares, ou com assinatura eletrónica, indicando o meio. (por defeito: papel, dois exemplares)
>
> **Opções**
> 12. Um item por linha: mora à taxa legal ou taxa convencionada por escrito? (por defeito: taxa legal, contada do vencimento, sem interpelação) Provisão só para despesas ou também por conta de honorários? (por defeito: as duas) Em caso de cessação antecipada, honorários pelo trabalho já feito com pré-aviso de 30 dias? (por defeito: entra)
>
> Responda pelo número. Pode escrever "não sei" ou "use o padrão" em qualquer uma.

Doze perguntas, uma mensagem, e o documento sai na resposta seguinte.
