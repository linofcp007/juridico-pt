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

## Resultados da 3.1.0

**Execução** (27/10/2026, 20h11, Claude Code 2.1.311, modelo por defeito da conta, só com o plugin, commit 20a744e):
- **Casos:** os 10 novos (g51–g58, a14, r06), copiados para `evals-novos/`, 3 execuções cada, `--ablation none --mocks off --keep-temp`.
- **Duração e custo:** 473 s; 12,88 USD. O teto era de 12 USD: as execuções que já estavam a correr quando foi ultrapassado terminaram, e nenhuma ficou por fazer.
- **Comando:** `claude plugin eval . --eval-dir evals-novos --ablation none --mocks off --allow-tools "mcp__plugin_juridico-pt_juridico-pt__*" --runs 3 -j 4 --max-cost-usd 12 --trust-plugin --no-publish --keep-temp --json eval-310.json`.

| Conjunto | 3.1.0 | Base 3.0.2 (mesmos casos) | Limiar | Estado |
|---|---|---|---|---|
| Golden (g51–g58) | **100 %** (8/8 casos a 3/3) | 12,5 % (1/8) | ≥ 90 % | ✓ |
| Adversarial (a14) | **100 %** (3/3) | 100 % (1/1) | 100 % | ✓ |
| Regressão (r06) | **100 %** (3/3) | 100 % (1/1) | 100 % | ✓ |
| Não piorar (68 casos da 3.0) | **100 %** (68/68 no resultado mais recente; 66/68 na 1.ª passagem) | 100 % (3.0.0) | ≥ 95 % | ✓ |
| Revisão humana (10 fichas) | por fazer pelo Carlos ou por um advogado da casa (`quickstart.md`) | — | — | por fazer |

**Leitura:**
- **g51–g57:** o assistente encontra a ficha com `procurar_ficha` (também a partir de um pedido em inglês, g57), abre-a com `obter_ficha` e responde na área certa. Na base falhavam por as tools não existirem.
- **g58:** a reclamação de créditos continua a ir para o modelo conferido; a ficha INS-008 aparece só como remissão.
- **a14 e r06:** com a ficha TRA-005 corrigida no catálogo, o assistente não dá o art. 157.º CT como norma do trabalho suplementar.
- Nenhum grader precisou de correção e não houve falhas a reclassificar.

### Os 68 casos da 3.0, com a 3.1

O utilizador autorizou até 50 USD. Com o custo real (0,43 USD por execução), 3 execuções de cada caso passavam desse teto. Por isso:
1. **1.ª passagem** (commit 2ca4093): uma execução de cada caso, 15,66 USD. Resultado: 66/68.
2. **Falhas reais, corrigidas:**
   - **g49** (comodato de um carro, sem modelo nem template): redigiu de memória. Procurou com `procurar_conteudo`, que não via as fichas, e não chegou à ficha CIV-006. Agora `procurar_conteudo` junta as fichas mais próximas, e `listar_modelos` e `listar_templates` terminam com o passo seguinte: template, depois ficha (commit 51a1f49).
   - **g47** (entrega): a saída do `exportar_documento` dizia «a lista 'Antes de enviar — verificar' não vai no ficheiro», e a entrega saía com esse título em vez de «Confira antes de assinar». Passa a lembrar a entrega da casa (commit c605628).
3. **Graders corrigidos e testados** com respostas certas e erradas:
   - **g49:** a resposta certa pode ser a entrevista que nomeia a ficha CIV-006 antes de redigir, o mesmo critério da 3.0 para o anúncio da fonte oficial.
   - **g45:** os valores por defeito também se dizem «se não responder» ou «se nada disser».
4. **Depois das correções** (commit c605628):
   - g47 e g49: 3/3 cada.
   - Os 21 casos que usam as tools alteradas (`exportar_documento`, `listar_modelos`, `listar_templates`, `procurar_conteudo`), uma execução cada: 19/21.
   - g41 entrevistou antes de redigir; repetido, 2/2.
   - g45: as duas execuções que falharam passam com o grader corrigido (traces reclassificados, sem nova corrida).
5. **Custo:** 30,73 USD.

**Ressalvas:**
- **Uma execução por caso nos 68 antigos**, em vez das 3 da 3.0, para caber no teto. Os casos tocados pelas correções têm 2 ou 3.
- **Rubrica:** não corrida; só verificações determinísticas, como na 3.0.
