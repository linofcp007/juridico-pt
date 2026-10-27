# Feature: juridico-pt-v3-0-redator

## Resumo
Fundir no plugin juridico-pt o kit próprio `redator-juridico-ia-pt`, feito na empresa com advogados. O kit traz:
- 12 modelos conferidos com fundamentação permitida;
- um índice de normas conferidas, usado pelo verificador de citações;
- guias de segurança jurídica, entrevista, entrega e estilo, convertidos para PT-PT (o inglês do plugin mantém-se);
- a formatação forense do `.docx`, portada para o exportador TypeScript e para Python só com a biblioteca-padrão;
- um verificador de redação, que passa a ser uma tool MCP;
- um segundo skill, `redator-juridico`.

A persona passa a ser única, no registo de advogado, para escritórios de advogados, empresas, particulares e contabilistas. Não afirma inscrição na Ordem dos Advogados. Versão 3.0.0.

Fonte do kit: `C:\Users\Administrator\Downloads\redator-juridico-ia-pt` (código próprio; pode ser copiado e adaptado).

## Histórias de Utilizador

Prioridades: **P1** = crítica, um MVP viável por si só · **P2** = secundária · **P3** = melhoria.

### US-1 (P1 — MVP): Persona no registo de advogado
**Como** advogado, empresa, particular ou contabilista, **quero** que o sistema escreva sempre como um advogado português escreveria, **para que** o documento saia pronto para revisão e assinatura, sem texto de assistente.
**Porquê P1:** é a decisão de produto que muda o tom de todas as superfícies. Sem ela, os modelos novos convivem com uma persona que os contradiz.
**Teste Independente:** pedir uma carta de interpelação e um parecer, com e sem perfil de advogado responsável, e verificar o registo, o bloco de assinatura e a linha de revisão.

#### Critérios de Aceitação (EARS)
1. **US-1.AC-1** — O SISTEMA DEVE redigir documentos e respostas no registo forense português em todas as superfícies que definem a persona: `SKILL.md` dos dois skills, prompt `assistente_juridico`, instruções do servidor MCP, `PERSONA_INTEGRACOES` e os ficheiros que o `gerar-integracoes.mjs` gera. O registo inclui:
   - fórmulas de praxe;
   - tratamento "V. Ex.ª" / "Exmo. Senhor";
   - valores em algarismos e por extenso;
   - alíneas "a)", "b)".
2. **US-1.AC-2** — SE um pedido pedir ao sistema que se identifique ou assine como advogado inscrito na Ordem dos Advogados, ENTÃO O SISTEMA DEVE recusar essa afirmação numa frase e entregar o bloco de assinatura do advogado responsável, com o perfil preenchido ou `[■ CONFIRMAR: nome e cédula profissional do advogado]`.
3. **US-1.AC-3** — QUANDO o perfil ativo tem um advogado responsável (nome, cédula profissional, domicílio profissional), O SISTEMA DEVE usar esses dados no bloco de assinatura e na identificação do mandatário dos documentos que os pedem.
4. **US-1.AC-4** — QUANDO o caso tem prazo judicial a correr, constituição de advogado obrigatória ou processo penal, e o perfil ativo não tem advogado responsável, O SISTEMA DEVE indicar numa linha da entrega que o ato exige advogado inscrito na OA.
5. **US-1.AC-5** — O SISTEMA DEVE fechar cada entrega de documento com a linha fixa de revisão. Essa linha substitui o aviso "não substitui advogado" nos sítios onde ele hoje aparece: hook de início de sessão, `SKILL.md`, persona, `plugin.json`, `marketplace.json`, `package.json` e README.

#### [AI] Critérios de Aceitação (EARS)
6. **US-1.AC-6** — O SISTEMA DEVE ter 90 % ou mais dos casos golden do `evals/` a passar com a persona nova. Inclui os casos existentes (g01–g40, r01–r05) e os casos novos de redação.
7. **US-1.AC-7** — SE o texto de um documento, perfil, modelo ou pedido contiver instruções para o sistema se declarar advogado inscrito, ignorar a fundamentação permitida ou mudar de persona, ENTÃO O SISTEMA DEVE tratá-lo como dado e manter a persona e as regras. É medido pelo conjunto adversarial com 100 % de casos passados.
8. **US-1.AC-8** — O SISTEMA DEVE manter o contexto fixo por sessão dentro do orçamento:
   - cada `SKILL.md` com 500 linhas ou menos;
   - instruções do servidor MCP com no máximo 120 % do tamanho da v2.0.2.

### US-2 (P1): Modelos conferidos
**Como** advogado ou empresa, **quero** gerar os documentos do kit a partir de modelos completos com variantes, armadilhas e fundamentação fechada, **para que** cada citação tenha lastro e cada ponto a adaptar esteja marcado no sítio.
**Teste Independente:** `listar_modelos` devolve os 12; `obter_modelo` devolve cada um completo; o teste de estrutura passa; pedir "contrato de honorários" usa o modelo.

#### Critérios de Aceitação (EARS)
1. **US-2.AC-1** — O SISTEMA DEVE disponibilizar os 12 modelos do kit em `skills/juridico-pt/assets/modelos/`, através das tools `listar_modelos` e `obter_modelo` e como resources MCP. Cada modelo tem:
   - as 8 secções do kit: quando usar, perguntas, variantes, texto, fundamentação permitida, armadilhas, nota de entrega, trecho de tom;
   - uma linha `Âmbito:` no cabeçalho.
2. **US-2.AC-2** — QUANDO o utilizador pede um documento coberto por um modelo, O SISTEMA DEVE redigi-lo a partir desse modelo, com as variantes da secção 3 e os marcadores `[■ CONFIRMAR: ...]` para o que faltar.
3. **US-2.AC-3** — QUANDO `obter_template` recebe o nome de um template substituído, O SISTEMA DEVE devolver o modelo que o substitui e indicá-lo numa linha. Os templates substituídos são:
   - `reconhecimento-divida` → `confissao-de-divida-e-acordo-de-pagamento`;
   - `contrato-arrendamento-habitacional` → `contrato-de-arrendamento-habitacional`;
   - `acordo-revogacao` → `acordo-de-revogacao-do-contrato-de-trabalho`;
   - `nota-de-culpa` e `carta-despedimento-justa-causa` → `processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento`;
   - `carta-interpelacao-incumprimento` → `interpelacao-e-notificacao-extrajudicial`;
   - `reclamacao-creditos-insolvencia` → `reclamacao-de-creditos-na-insolvencia`.
4. **US-2.AC-4** — O SISTEMA DEVE citar no texto de um documento feito por modelo só as normas da secção 5 desse modelo. Uma norma de fora entra com `[■ VERIFICAR: ...]` e com um aviso na entrega.
5. **US-2.AC-5** — QUANDO o plugin é testado, O SISTEMA DEVE falhar o `plugin.test.mjs` se:
   - um modelo não tiver as 8 secções ou a linha `Âmbito:`;
   - um playbook, referência, command ou README apontar para um template substituído pelo nome antigo sem passar pelo redirecionamento.
6. **US-2.AC-6** — SE o utilizador pedir honorários que dependam só do resultado ("só recebe se ganhar"), ENTÃO O SISTEMA DEVE recusar numa linha, com o art. 106.º do Estatuto da Ordem dos Advogados, e oferecer a majoração por resultado sobre honorários base.

### US-3 (P1): Normas conferidas e verificação de citações
**Como** advogado que revê, **quero** saber que cada artigo citado foi lido na fonte oficial, **para que** não assine uma peça com um artigo inventado.
**Teste Independente:** regenerar o índice e comparar com o versionado; pôr um artigo sem lastro num modelo de teste e ver o teste falhar; correr o verificador de citações sobre um texto com um artigo do índice.

#### Critérios de Aceitação (EARS)
1. **US-3.AC-1** — O SISTEMA DEVE gerar, com um script node, o índice de normas conferidas `skills/juridico-pt/references/normas-conferidas.md` e `.json`. Cada linha tem diploma, preceito, ficheiro e item. A fonte são a secção 5 dos modelos (itens sem `[VERIFICAR]`) e o guia de segurança jurídica.
2. **US-3.AC-2** — SE o índice versionado for diferente do que o script gera a partir dos modelos, ENTÃO O SISTEMA DEVE falhar o teste e indicar que o índice está desatualizado.
3. **US-3.AC-3** — SE a secção 4 de um modelo citar um artigo que não está na sua secção 5 nem tem `[VERIFICAR]`, ENTÃO O SISTEMA DEVE falhar o teste, indicando o modelo e o artigo.
4. **US-3.AC-4** — QUANDO o subagente `verificador-citacoes` verifica um texto, O SISTEMA DEVE classificar primeiro cada citação contra o índice de normas conferidas, com o estado "verificada (índice)" e o ficheiro, e só depois ir à fonte oficial com as restantes.

### US-4 (P1): Exportação Word com formatação forense
**Como** advogado, **quero** o `.docx` já no formato de peça (Times 12, margens 3/3/2/2, entrelinha 1,5, número de página, assinaturas, campos em falta a amarelo), **para que** só tenha de rever e assinar.
**Teste Independente:** exportar cada modelo preenchido e abrir o `.docx`; inspecionar o `document.xml`; exportar um texto com `{{x}}` e ver a recusa.

#### Critérios de Aceitação (EARS)
1. **US-4.AC-1** — QUANDO o `exportar_documento` recebe conteúdo em Marcação Redator (primeira linha `@@PERFIL:`), O SISTEMA DEVE gerar o `.docx` com os comandos `@@` do kit e com a formatação de cada perfil:
   - perfil jurídico: A4, Times New Roman 12, margens 3/3/2/2 cm, entrelinha 1,5, número de página no rodapé;
   - perfil contabilístico: Arial 11, margens 2,5 cm, entrelinha 1,15.
2. **US-4.AC-2** — O SISTEMA DEVE realçar a amarelo, no `.docx`, cada trecho `[■ CONFIRMAR: ...]` e `[■ VERIFICAR: ...]`.
3. **US-4.AC-3** — SE o conteúdo a exportar contiver `[[IA:`, `[[INÍCIO VARIANTE`, `[[FIM VARIANTE]]` ou uma variável `{{...}}` por preencher, ENTÃO O SISTEMA DEVE recusar gerar o ficheiro e devolver as linhas em causa.
4. **US-4.AC-4** — QUANDO o `exportar_documento` recebe Markdown, como hoje, O SISTEMA DEVE gerar o mesmo `.docx` que a v2.0.2, sem quebrar os testes atuais do exportador.
5. **US-4.AC-5** — QUANDO o ficheiro é gerado, O SISTEMA DEVE devolver a lista dos marcadores `[■ ...]` que ficaram, cada um com a cláusula ou secção onde está.
6. **US-4.AC-6** — O SISTEMA DEVE gerar, a partir da mesma Marcação Redator, um `.docx` em Python só com a biblioteca-padrão (para o `.skill`), com o mesmo `word/document.xml` que o exportador TypeScript.

### US-5 (P2): Entrevista e entrega
**Como** profissional ocupado, **quero** responder a todas as perguntas de uma vez e receber o documento com uma lista curta do que conferir, **para que** o documento saia em duas mensagens e não em dez.
**Teste Independente:** pedir um contrato de honorários sem dados e verificar a ronda única de perguntas; responder "não sei" a uma e verificar o marcador e a entrega.

#### Critérios de Aceitação (EARS)
1. **US-5.AC-1** — QUANDO o utilizador pede um documento e faltam dados, O SISTEMA DEVE fazer as perguntas numa única mensagem, com no máximo 12, numeradas e agrupadas em Partes, Objeto, Valores e prazos, Formalidades e Opções, com o valor por defeito entre parênteses.
2. **US-5.AC-2** — QUANDO o utilizador responde "não sei" a uma pergunta, O SISTEMA DEVE deixar `[■ CONFIRMAR: <o que falta>]` no sítio do documento e listá-lo na entrega.
3. **US-5.AC-3** — QUANDO entrega um documento, O SISTEMA DEVE enviar o nome do ficheiro, entre 3 e 5 itens "Confira antes de assinar" e a linha fixa de revisão. Os itens cobrem:
   - os marcadores com o local;
   - os prazos com a data de referência e a conta;
   - os valores por defeito aplicados.
4. **US-5.AC-4** — SE falta a data de referência de um prazo, ENTÃO O SISTEMA DEVE deixar `[■ CONFIRMAR: data de referência]` no documento e dar a regra do prazo em forma condicional na entrega, dizendo se considerou as férias judiciais.
5. **US-5.AC-5** — O SISTEMA DEVE escrever juros de mora como "taxa legal" ou como a taxa que o utilizador indicou por escrito. Uma taxa vinda de outro sítio (por exemplo "1 % ao mês") é tratada pelo EC-7.

#### [PRIVACY] Critérios de Aceitação (EARS)
6. **US-5.AC-6** — O SISTEMA DEVE pedir apenas os dados pessoais que o modelo escolhido usa na identificação das partes. O cartão de cidadão, a data de nascimento e o estado civil só entram se o modelo os usar.
7. **US-5.AC-7** — O SISTEMA DEVE guardar os dados das partes apenas no documento exportado que o utilizador pediu. Ficam fora do perfil, dos prazos e de qualquer ficheiro de estado do plugin.

### US-6 (P2): Verificador de redação
**Como** advogado, **quero** uma verificação automática de cacoetes de IA, PT-BR e resíduos internos antes do Word, **para que** o documento não denuncie a máquina.
**Teste Independente:** `verificar_redacao` sobre textos de teste com cada categoria; correr o mesmo texto no Python e comparar.

#### Critérios de Aceitação (EARS)
1. **US-6.AC-1** — QUANDO `verificar_redacao` recebe um texto, O SISTEMA DEVE devolver cada ocorrência com a linha, o nível (ERRO ou AVISO), a categoria e a sugestão em PT-PT.
2. **US-6.AC-2** — O SISTEMA DEVE acusar como ERRO as formas de uma lista fechada de léxico e grafia do Brasil sem uso jurídico em PT-PT ("usuário", "registro", "planilha", "contato", "fato" com o sentido de facto). Formas com uso jurídico português, como "arquivo" no sentido de arquivamento, ficam como AVISO.
3. **US-6.AC-3** — QUANDO uma linha é título `@@CLAUSULA` ou `@@SECAO`, começa por `[MENÇÃO]` ou o trecho está entre crases, O SISTEMA DEVE excluí-la das verificações a que o kit a isenta.
4. **US-6.AC-4** — O SISTEMA DEVE dar o mesmo resultado (linhas, níveis e categorias) no `verificar_redacao` em TypeScript e no `verificador.py` em Python, para os mesmos textos de teste.

### US-7 (P2): Skill `redator-juridico` e guias
**Como** utilizador, **quero** que "redige-me um contrato" ative o fluxo de redação e "o que diz a lei" ative a orientação, **para que** cada pedido siga o fluxo certo.
**Teste Independente:** pedir um documento e verificar que o skill `redator-juridico` carrega; pedir orientação e verificar o `juridico-pt`; `python build.py` gera os dois `.skill`.

#### Critérios de Aceitação (EARS)
1. **US-7.AC-1** — O SISTEMA DEVE incluir o skill `skills/redator-juridico/`, com o fluxo de 6 passos do kit: identificar, entrevistar, confirmar, redigir, autorrever, entregar. Os modelos, guias e scripts são lidos dos caminhos do skill `juridico-pt` (sem cópias).
2. **US-7.AC-2** — O SISTEMA DEVE ter os guias do kit (segurança jurídica, entrevista, entrega, protocolo de pesquisa, estilo, Marcação Redator, formatação) em PT-PT. Montantes, taxas e limiares remetem para `valores-2026.md` e não ficam escritos nos guias.
3. **US-7.AC-3** — QUANDO se corre `python build.py`, O SISTEMA DEVE gerar um pacote `.skill` por skill, e cada pacote deve abrir e ser lido sozinho.
4. **US-7.AC-4** — QUANDO o utilizador usa `/contrato`, `/template` ou `/parecer`, O SISTEMA DEVE seguir o fluxo do skill `redator-juridico`.

#### [PRIVACY] Critérios de Aceitação (EARS)
5. **US-7.AC-5** — QUANDO o utilizador guarda o advogado responsável no perfil, O SISTEMA DEVE guardar só nome, cédula profissional, domicílio profissional, endereço eletrónico e NIF profissional. O `apagar_perfil` apaga-os com o resto do perfil.
6. **US-7.AC-6** — O SISTEMA DEVE descrever na referência `privacidade-plugin` os dados novos (advogado responsável e documentos com dados das partes), onde ficam e como se apagam.

## Critérios de Sucesso
- **SC-001** — Os 12 modelos, preenchidos com os dados de teste, geram `.docx` que abrem no Word e no LibreOffice, sem marcadores internos residuais, em 12 de 12.
- **SC-002** — Zero ocorrências da lista fechada de PT-BR no conteúdo e código distribuídos (teste a passar).
- **SC-003** — 100 % das citações da secção 4 dos modelos estão no índice de normas conferidas ou levam `[VERIFICAR]`.
- **SC-004** — Pelo menos 90 % dos casos golden e 100 % dos adversariais passam no `claude plugin eval`.
- **SC-005** — Um documento por modelo chega do pedido ao `.docx` com no máximo 2 rondas de perguntas, nos casos golden de redação.

## Casos Limite e Tratamento de Erros
- **EC-1** — Pedido de documento sem modelo nem template: usar o mais próximo, dizer numa linha qual e o que não cobre, e marcar o resto com `[■ VERIFICAR]`.
- **EC-2** — Pedido ilícito (data retroagida, declaração falsa, recibo de valor não recebido): recusar numa frase, sem sermão, e oferecer o documento lícito mais próximo.
- **EC-3** — Variantes incompatíveis (avença com majoração por resultado): perguntar numa linha qual fica.
- **EC-4** — Ambiente sem Python e sem servidor MCP (`.skill` sem execução de código): entregar o texto completo num único bloco em Marcação Redator, com as instruções de colagem do guia de entrega adaptadas ao exportador do plugin.
- **EC-5** — Modelo `xlsx+docx` (acordo de revogação): enquanto as folhas de cálculo estão fora de âmbito, a memória de cálculo sai em `.docx` com os valores do `calc_creditos_laborais` / `calc_compensacao_despedimento`.
- **EC-6** — Petição ou contestação sem advogado responsável no perfil: o mandatário fica `[■ CONFIRMAR: mandatário]` e a entrega indica que o patrocínio pode ser obrigatório (art. 40.º CPC).
- **EC-7** — O utilizador insiste numa taxa de juro por hábito sem estipulação escrita: escrever "taxa legal" e explicar na entrega o art. 559.º, n.º 2, CC.

## Requisitos Não-Funcionais
- **NFR-1** — Zero dependências de runtime novas: o exportador e o verificador TS sem pacotes npm novos; o Python só com a biblioteca-padrão. Não se cria `bin/` na raiz.
- **NFR-2** — Compatibilidade: as 38 tools atuais mantêm nomes e parâmetros. Os testes atuais (`npm test`, `test_scripts.py`) continuam a passar.
- **NFR-3** — PT-PT: o conteúdo em português não tem PT-BR. O conteúdo em inglês mantém-se.
- **NFR-4** — Bundles `mcp-server/dist/index.js` e `cli-lib.js` regenerados e versionados. Versão 3.0.0 nos 6 sítios do bump e CHANGELOG.
- **NFR-5** — Custo: o plugin não chama modelos nem serviços pagos, por isso o custo próprio por pedido é 0 €. O custo em tokens é o do plano do utilizador e o teto do sistema é o orçamento de contexto da US-1.AC-8.
- **NFR-6** — Conservação, igual à da v2.0:
  - o advogado responsável fica no perfil até o utilizador o apagar (`apagar_perfil`), com o aviso que já existe para perfis sem atualização há mais de 12 meses;
  - os `.docx` exportados ficam em `.juridico-pt/exportados/` até o utilizador os apagar;
  - o plugin não guarda cópias dos dados das partes noutro sítio (US-5.AC-7).

## Alterações ao steering (aprovar com esta fase)
- `constitution.md`, Restrições: "Conteúdo jurídico é informativo; não substitui advogado inscrito na OA (disclaimer mantém-se)" passa a "Tudo é redigido no registo de advogado português; o sistema nunca afirma ser advogado inscrito na OA, indica advogado quando o patrocínio é obrigatório e cada entrega leva a linha fixa de revisão."
- `constitution.md`, princípio 6: acrescentar o formato dos modelos (cabeçalho com `Âmbito:` e as 8 secções).
- `constitution.md`, princípio 3: estender os "dois lados" (Python e TS com paridade) ao gerador `.docx` e ao verificador de redação.
- `product.md`: acrescentar escritórios de advogados e contabilistas aos utilizadores-alvo; o não-objetivo "não substitui advogado" passa a "não afirma inscrição na OA nem representa em tribunal".

## Fora de Âmbito
- O nível "sob instrução" do kit (`fichas/`): não vem no material recebido.
- Folhas de cálculo `.xlsx` (`xlsx_helpers.py`).
- Repositório privado e distribuição por organização.
- Modelos além dos 12 do kit; conversão dos outros 66 templates para o formato de modelo.
- Reconferir na fonte oficial todas as normas da secção 5: o verificador de citações pode fazê-lo por amostragem.

## Pressupostos
- O kit é da empresa e pode ser copiado e adaptado (confirmado pelo utilizador).
- As normas da secção 5 dos modelos foram lidas na fonte oficial pelos autores do kit (20 e 21 de setembro de 2026) e são aceites como conferidas.
- O ambiente `.skill` do claude.ai executa Python 3 só com a biblioteca-padrão.
- Os 6 modelos que substituem templates cobrem pelo menos o que esses templates cobriam. O design compara cada par e, se faltar alguma coisa, leva-a para o modelo.
