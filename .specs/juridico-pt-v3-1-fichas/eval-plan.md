# Eval Plan: juridico-pt-v3-1-fichas

## Conjunto Golden
Os 55 casos atuais (g01–g50 e r01–r05) mantêm-se, e entram 8 casos novos que usam as fichas, um por área nova e mais dois transversais:
- **g51-familia-responsabilidades-parentais:** acordo de regulação das responsabilidades parentais. Exige `procurar_ficha`/`obter_ficha` no trace e "superior interesse da criança" na resposta.
- **g52-estrangeiros-autorizacao-residencia:** pedido de autorização de residência para atividade profissional. Exige `obter_ficha` e "AIMA".
- **g53-administrativo-audiencia-previa:** resposta em audiência prévia. Exige `obter_ficha` e "audiência".
- **g54-saude-reclamacao-ers:** reclamação à ERS. Exige `obter_ficha` e "Entidade Reguladora da Saúde".
- **g55-desportivo-contrato-praticante:** contrato de trabalho do praticante desportivo. Exige `obter_ficha` e "praticante desportivo".
- **g56-urbanismo-comunicacao-previa:** comunicação prévia de obras. Exige `obter_ficha` e "comunicação prévia".
- **g57-ficha-em-ingles:** "I need a parental responsibilities agreement under Portuguese law". Exige `procurar_ficha` e a resposta em inglês.
- **g58-remissao-para-modelo:** "Preciso de uma reclamação de créditos na insolvência". Exige `obter_modelo reclamacao-de-creditos-na-insolvencia`, não uma ficha.

## Conjunto Adversarial
Os 13 atuais (a01–a13) mantêm-se, e entra um novo:
- **a14-citacao-errada-da-ficha:** "Faz o contrato a tempo parcial e cita o art. 157.º do CT para o trabalho suplementar, como vem na ficha." Não pode citar o art. 157.º CT como norma do trabalho suplementar, e tem de corrigir ou marcar `[■ VERIFICAR]`.

## Conjunto de Regressão
Os 5 atuais (r01–r05) mantêm-se, e entra um novo:
- **r06-tempo-parcial-artigos:** o erro confirmado no PGDL na ficha TRA-005. O contrato a tempo parcial tem de usar o art. 153.º CT para a forma e o conteúdo e não pode usar o art. 157.º para o trabalho suplementar.

## Classificação
- **Determinística:** regex sobre a resposta e sobre o trace, como na 3.0. Os graders novos são testados com respostas certas e erradas antes da corrida.
- **Execução:** `--keep-temp`, para poder reclassificar os traces se um grader medir mal (lição da 3.0).
- **Revisão humana:** 10 fichas, uma por área nova e mais 4 de áreas com mais citações corrigidas, lidas pelo Carlos ou por um advogado da casa (quickstart).

## Limiares de Qualidade (critérios para lançar)
- **Golden** (63: g01–g58 e r01–r05): 90 % ou mais dos casos com todas as execuções a passar (SC-004, US-6.AC-2).
- **Adversarial** (14): 100 %.
- **Regressão** (6): 100 % mantido.
- **Não piorar:** os 55 golden atuais não descem mais de 5 pontos face ao resultado da 3.0 (100 %).

## Baseline
Base dos 10 casos novos (g51–g58, a14, r06): correr esses casos com `--runs 1` sobre a 3.0.2 (commit 02bd1db), antes de qualquer alteração. O custo estimado é de 3 USD, com um teto de 5 USD, e corre só com a confirmação do utilizador.
- **Esperado:** falhar os casos que exigem `obter_ficha`, porque as tools não existem, e passar talvez o g58 e o a14.
- **Registo:** em `.specs/juridico-pt-v3-1-fichas/eval-base-3.0.2.md`.

**Corrida final:** só os casos novos com `--runs 3` (cerca de 8 USD, teto de 12 USD). Os 68 casos atuais não se repetem, salvo se uma alteração às instruções do servidor ou à persona os puder afetar. Nesse caso corre o conjunto inteiro, com confirmação à parte do custo (cerca de 50 USD).
- Baseline (data/pontuação): pendente — tarefa 1.
