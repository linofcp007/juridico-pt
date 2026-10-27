# Feature: juridico-pt-v3-1-fichas

## Resumo
Integrar no skill `juridico-pt` as 1319 fichas do catálogo Skills Jurídicas PRO, da empresa, que cobrem 22 áreas. As fichas passam a ser servidas a pedido e entram já normalizadas, sem duplicar o que o plugin tem, com as citações cruzadas e conferidas e com um índice bilingue PT/EN.

O que o kit é hoje (lido a 2026-10-27):
- 1319 prompts de trabalho, cada um com um método em 5 etapas, os artigos aplicáveis, a estrutura do documento e um formulário de dados;
- tudo repetido como 1319 `SKILL.md` separados, em `claude-skills/`;
- 14 898 citações de artigos nunca conferidas;
- grafia anterior ao AO90 em 392 ficheiros, formas do Brasil em 12 e o aviso antigo em 870;
- nenhum texto em inglês e nenhum dado pessoal.

## Histórias de Utilizador

### US-1 (P1 — MVP): Fichas a pedido
**Como** advogado, empresa ou contabilista, **quero** encontrar e abrir a ficha de trabalho de um documento das 22 áreas, **para que** o redator tenha a estrutura, as questões e os dados certos onde não há modelo conferido.
**Porquê P1:** é a cobertura nova. Sem ela, o resto não tem onde assentar.
**Teste Independente:** `procurar_ficha "regulação das responsabilidades parentais"` devolve a ficha de família e `obter_ficha` abre-a com o cabeçalho de estado.

#### Critérios de Aceitação (EARS)
1. **US-1.AC-1** — O SISTEMA DEVE disponibilizar as fichas em `skills/juridico-pt/assets/fichas/<NN-área>/<CÓDIGO>-<slug>.md`, uma por documento do catálogo que não seja o mesmo documento de um modelo ou template do plugin. Cada ficha tem um frontmatter com estes campos: `codigo`, `area`, `titulo`, `titulo_en`, `descricao`, `descricao_en`, `ambito` e `estado_citacoes`.
2. **US-1.AC-2** — QUANDO `procurar_ficha` recebe um termo em PT ou EN, e opcionalmente uma área, O SISTEMA DEVE devolver até 20 fichas por relevância. Cada uma vem com o código, os títulos em PT e EN, a área e o estado das citações.
3. **US-1.AC-3** — QUANDO `obter_ficha` recebe um código, O SISTEMA DEVE devolver a ficha precedida de um cabeçalho que diz:
   - a contagem das citações por estado;
   - a ordem de uso: modelo conferido → template → ficha;
   - que os valores do ano estão em `ler_referencia "valores-2026"`;
   - que a redação segue o fluxo de `assets/redacao/redator.md`.
4. **US-1.AC-4** — SE `obter_ficha` receber um código inexistente, ENTÃO O SISTEMA DEVE devolver as 5 fichas de título mais próximo, em vez de um erro sem saída.
5. **US-1.AC-5** — O SISTEMA DEVE ter, por área, um índice `assets/fichas/<NN-área>/_INDICE.md` com o código, o título PT, o título EN e o ficheiro, e uma secção no `SKILL.md` que explica como chegar às fichas sem MCP.

### US-2 (P1): Sem duplicar o que existe
**Como** quem mantém o plugin, **quero** que cada documento tenha um só sítio, **para que** o utilizador não receba duas versões contraditórias do mesmo documento.
**Teste Independente:** `obter_ficha "INS-008"` (reclamação de créditos) devolve a remissão para o modelo conferido e não abre uma ficha.

#### Critérios de Aceitação (EARS)
1. **US-2.AC-1** — O SISTEMA DEVE manter um mapa revisto das sobreposições, `assets/fichas/sobreposicoes.json`. Para cada ficha candidata, o mapa diz a relação (`mesmo-documento` ou `complementa`) e o modelo, template, playbook ou checklist do plugin com que se cruza.
2. **US-2.AC-2** — QUANDO a relação é `mesmo-documento`, O SISTEMA DEVE não importar a ficha. Se o código for pedido a `procurar_ficha` ou a `obter_ficha`, O SISTEMA DEVE devolver a remissão para o conteúdo existente.
3. **US-2.AC-3** — QUANDO a relação é `complementa`, O SISTEMA DEVE importar a ficha com a remissão para o conteúdo existente no cabeçalho.
4. **US-2.AC-4** — O SISTEMA DEVE, no fluxo do redator (`assets/redacao/redator.md`, passo 1), usar esta ordem: modelo conferido → template → ficha → protocolo de pesquisa.

### US-3 (P1): PT-PT, persona e valores
**Como** escritório, **quero** que as fichas falem como o resto do plugin, **para que** nada denuncie outra origem nem quebre as regras da casa.
**Teste Independente:** o teste de grafia corre sobre `assets/fichas/` e não encontra formas anteriores ao AO90, PT-BR nem o aviso antigo.

#### Critérios de Aceitação (EARS)
1. **US-3.AC-1** — O SISTEMA DEVE ter as fichas em PT-PT do Acordo Ortográfico de 1990. Isto significa zero formas da lista fechada `mcp-server/scripts/ao90.json`, zero PT-BR de nível ERRO do verificador e zero "por quê". As formas que o AO90 mantém em Portugal (facto, contacto, impacto, pacto, secção, intelectual) não mudam.
2. **US-3.AC-2** — O SISTEMA DEVE retirar das fichas o aviso "Não substitui o juízo do advogado" e a abertura "És um advogado…". As fichas passam a abrir pelo que o documento é e seguem a persona da casa:
   - registo de advogado;
   - nunca afirmar inscrição na OA;
   - linha fixa de revisão na entrega, dada pelo fluxo do redator.
3. **US-3.AC-3** — O SISTEMA DEVE pôr os marcadores de falta das fichas no formato da casa, `[■ VERIFICAR: …]`.
4. **US-3.AC-4** — SE uma ficha escrever o valor de uma grandeza anual (salário mínimo, IAS, UC), ENTÃO O SISTEMA DEVE substituí-lo pela remissão `[valor do ano em valores-2026]`. Os restantes montantes da ficha ficam como exemplos, e o cabeçalho de `obter_ficha` remete para `valores-2026`.

### US-4 (P1): Citações cruzadas e conferidas
**Como** advogado que vai assinar, **quero** saber que artigos da ficha estão conferidos, **para que** nenhum número errado chegue ao documento como certo.
**Teste Independente:** `obter_ficha "TRA-005"` cita o art. 153.º CT para o conteúdo do contrato e o art. 154.º CT para as condições, e não cita o art. 157.º CT para o trabalho suplementar.

#### Critérios de Aceitação (EARS)
1. **US-4.AC-1** — O SISTEMA DEVE extrair de cada ficha as citações de artigos (diploma e artigo) e registar o estado de cada uma:
   - `conferida (índice)`: está no índice de normas conferidas;
   - `conferida (epígrafe)`: o artigo existe na epígrafe oficial e o assunto corresponde;
   - `corrigida`: o número estava errado e foi substituído pelo artigo cuja epígrafe corresponde;
   - `por conferir`: todos os restantes casos.

   As contagens ficam no frontmatter (`estado_citacoes`) e no relatório `assets/fichas/citacoes.json`.
2. **US-4.AC-2** — O SISTEMA DEVE guardar as epígrafes oficiais dos 25 diplomas mais citados em `skills/juridico-pt/references/epigrafes/<sigla>.json`, com a fonte (PGDL ou EUR-Lex), o URL e a data. Os diplomas são: CC, RGPD, CIRE, CPC, CT, CP, CPP, CSC, RJUE, CPTA, TFUE, CPI, CPA, LGT, CCP, CPPT, RGCO, CDADC, CIRC, CRP, CIRS, RGIT, CE, CIMI e LAV.
3. **US-4.AC-3** — SE uma citação apontar para um artigo inexistente no diploma, ou para um artigo cuja epígrafe não corresponde ao assunto descrito na ficha, ENTÃO O SISTEMA DEVE fazer uma de duas coisas:
   - corrigi-la para o artigo certo, quando as epígrafes do diploma o identificam sem dúvida;
   - marcá-la `[■ VERIFICAR]`, com a nota da divergência.
4. **US-4.AC-4** — QUANDO `obter_ficha` devolve uma ficha, O SISTEMA DEVE apresentar as citações `por conferir` com `[■ VERIFICAR]`.
5. **US-4.AC-5** — O SISTEMA DEVE corrigir a ficha TRA-005 e mantê-la corrigida (regressão do erro confirmado no PGDL a 2026-10-27): art. 153.º CT para a forma e o conteúdo, art. 154.º CT para as condições e a retribuição, e nenhum art. 157.º CT para o trabalho suplementar.

### US-5 (P2): Índice PT/EN
**Como** utilizador que trabalha em inglês, **quero** encontrar as fichas em inglês, **para que** o catálogo sirva também clientes e equipas internacionais.
**Teste Independente:** `procurar_ficha "parental responsibilities"` devolve a ficha de família certa.

#### Critérios de Aceitação (EARS)
1. **US-5.AC-1** — O SISTEMA DEVE ter `titulo_en` e `descricao_en` em todas as fichas importadas, em inglês jurídico. Quando não há equivalente, o termo português vai entre parênteses (ex.: "order for payment procedure (injunção)").
2. **US-5.AC-2** — QUANDO `procurar_ficha` recebe termos em inglês, O SISTEMA DEVE encontrar as fichas pelo título e pela descrição em EN.
3. **US-5.AC-3** — O SISTEMA DEVE manter o corpo das fichas em PT-PT e responder na língua do utilizador.

### US-6 (P2): Distribuição e avaliação
**Como** quem distribui o plugin, **quero** as fichas em todas as superfícies sem rebentar o contexto, **para que** o plugin continue rápido e as avaliações continuem verdes.
**Teste Independente:** o `npm test` e a corrida de avaliações passam com as fichas no pacote.

#### Critérios de Aceitação (EARS)
1. **US-6.AC-1** — O SISTEMA DEVE incluir as fichas no `.skill`, no `.mcpb` e em `mcp-server/content/`, e manter o contexto fixo dentro destes limites:
   - `SKILL.md` com 500 linhas ou menos;
   - `description` com 1024 caracteres ou menos;
   - instruções do servidor com 2000 caracteres ou menos, já com as tools novas.
2. **US-6.AC-2** — O SISTEMA DEVE ter 90 % ou mais dos casos golden e 100 % dos adversariais a passar no `claude plugin eval`, incluindo os casos novos das fichas.
3. **US-6.AC-3** — QUANDO o importador volta a correr sobre a mesma origem, O SISTEMA DEVE produzir os mesmos ficheiros. O modo `--check` falha se o resultado divergir do que está versionado.

## Critérios de Sucesso
- **SC-001** — 100 % das fichas importadas passam nos testes de estrutura, grafia (AO90 e sem PT-BR) e persona.
- **SC-002** — Nenhuma citação é servida como conferida sem estar no índice ou numa epígrafe confirmada. Pelo menos 50 % das citações com sigla reconhecida ficam conferidas ou corrigidas; as restantes saem com `[■ VERIFICAR]`.
- **SC-003** — Zero fichas importadas com relação `mesmo-documento` no mapa de sobreposições.
- **SC-004** — Pelo menos 90 % dos casos golden e 100 % dos adversariais passam no `claude plugin eval`.
- **SC-005** — `procurar_ficha` põe a ficha certa entre as 5 primeiras em 90 % ou mais de 40 pedidos de teste (20 em PT e 20 em EN).

## Casos Limite e Tratamento de Erros
- **EC-1** — Ficha sem citações reconhecíveis: `estado_citacoes` diz `sem citações` e o cabeçalho não inventa nenhuma.
- **EC-2** — Diploma citado por extenso ou por sigla desconhecida: é normalizado como no `gerar-normas`. Se não for reconhecido, a citação fica `por conferir`.
- **EC-3** — PGDL ou EUR-Lex indisponível: o importador usa as epígrafes versionadas e só o `--atualizar-epigrafes` precisa de rede.
- **EC-4** — Código pedido com relação `mesmo-documento`: a resposta é a remissão (US-2.AC-2), não um erro.
- **EC-5** — Artigos com letra (78.º-A) e com número (n.º 2): o artigo é extraído com a letra e conferido como unidade.
- **EC-6** — Palavras inglesas e termos técnicos (opt-out, factoring) não são tocados pela conversão AO90.

## Requisitos Não-Funcionais
- **NFR-1** — `obter_ficha` responde em menos de 50 ms e `procurar_ficha` em menos de 200 ms, sobre todas as fichas.
- **NFR-2** — O contexto fixo fica dentro dos limites da US-6.AC-1.
- **NFR-3** — PT-PT do AO90 em todo o conteúdo. O inglês só entra no índice e nas descrições EN.
- **NFR-4** — O importador e o gerador de epígrafes são scripts node sem dependências novas, reexecutáveis e com `--check`.
- **NFR-5** — O `.skill` fica com 10 MB ou menos.

## Fora de Âmbito
- Traduzir para inglês o corpo das 1319 fichas.
- Promover fichas a modelos conferidos (com texto do documento e secção 5). Fica para versões seguintes, área a área.
- Conferir jurisprudência: os 33 acórdãos citados no kit ficam todos com `[■ VERIFICAR]`.
- Diplomas fora dos 25 principais: as suas citações ficam `por conferir`, salvo se estiverem no índice de normas.

## Pressupostos
- O catálogo é da empresa, que tem os direitos para o publicar no repositório público (confirmado pelo utilizador a 2026-10-27).
- As epígrafes da PGDL e do EUR-Lex de 2026-10-27 servem de referência. Uma alteração legislativa posterior trata-se como qualquer outro conteúdo, na revisão anual.
