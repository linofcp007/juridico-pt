# Alteração: juridico-pt-v3-1-2-revisao-fichas

## Resumo
Revisão técnica de todas as fichas que a triagem apontou, a juntar às 42 da 3.1.1, e quatro correções de fundo que os revisores encontraram pelo caminho.

- **Revisão:** a triagem (Sonnet) leu as 1214 fichas que faltavam e apontou 792 (137 de gravidade alta, 419 média e 236 baixa). Cada uma foi revista a fundo (Opus), com cada correção confirmada na fonte oficial. Com as 42 da 3.1.1 são 834 fichas no relatório; as outras 422 a triagem deu como sem problemas de fundo.
- **Artigos revogados:** a lista de epígrafes da PGDL mantém a epígrafe de um artigo revogado (ex.: art. 315.º CPP, art. 135.º CSC). Só o texto do artigo diz «(Revogado.)». Uma citação desses artigos passava como conferida.
- **Citações sem «º»:** «Art. 246 CSC» escapava ao extrator e, portanto, à conferência.
- **Lista AO90:** faltavam famílias inteiras (adopção, accionista, contra-ordenação, fraccionado, seleccionar, peremptório…).
- **Referências da casa:** 7 afirmações confirmadas como erradas ou desatualizadas na fonte oficial:
  - multas: impugnação rodoviária em 15 dias úteis, na autoridade;
  - retenção e hipoteca depois do DL 48/2024;
  - Convenção da Haia de 1961 e emissão do certificado sucessório europeu;
  - inventário obrigatório e forma do repúdio;
  - demolição e impugnação no RJUE;
  - versões novas do DL 74-A/2017.
- **Tamanho e pedido:** xs, só core. O utilizador pediu «rever tudo até ao fim e só deixas o que não consegues mesmo» (28/10/2026), aprovou o custo («Continuar tudo com Opus») e pediu «continua onde estávamos e termina tudo» (30/10/2026).

## Critérios de Aceitação (EARS)
1. **US-1.AC-1** — O SISTEMA DEVE:
   - ter em `assets/fichas/correcoes-conteudo.json` e no relatório `revisao-tecnica.md` cada ficha que a triagem apontou, com o veredicto, o resumo e os pontos para o advogado;
   - em cada substituição, a fonte oficial (URL) ou `[■ VERIFICAR]` no texto novo;
   - não devolver nas referências da casa as afirmações que a fonte desmentiu (impugnação rodoviária em 20 dias úteis no tribunal, Portugal parte na Convenção da Haia de 1961, inventário obrigatório só por haver menores).
2. **US-1.AC-2** — SE uma ficha citar um artigo que o texto oficial dá como revogado, ENTÃO O SISTEMA DEVE:
   - pôr `[■ VERIFICAR: o artigo N.º SIGLA está revogado; confirmar a norma em vigor]` e não a contar como conferida, salvo se o texto já disser que está revogado;
   - falhar no importador quando uma decisão `corrigir` apontar para um artigo revogado.
3. **US-1.AC-3** — QUANDO uma ficha citar um artigo sem «º» seguido da sigla de um diploma («Art. 246 CSC»), O SISTEMA DEVE conferi-la como as outras, sem apanhar o «Artigo 1 — Objeto» de um contrato; e O SISTEMA NÃO DEVE deixar nas fichas nenhuma forma da lista AO90 alargada.

## Abordagem
- **Epígrafes:** `gerar-epigrafes.mjs` lê também o texto de todos os artigos na PGDL (~100 por página, `ficha=N`) e a marca «[Revogado]» do Portal das Finanças. Grava `revogados` em cada `references/epigrafes/<SIGLA>.json`. O modo `--revogados` só refaz essa lista, sem mexer nas epígrafes (que se atualizam em janeiro).
- **Importador:** `importar-fichas.mjs` marca as citações de revogados e reconhece as citações sem «º» quando a sigla vem logo a seguir, só com números e alíneas pelo meio.
- **AO90:** a lista cresce depois de os revisores acabarem. Os trechos das correções passam pela mesma normalização, no `juntar.mjs`, para continuarem a casar com o texto.
- **Revisão:** os mesmos guiões da 3.1.1 (`trabalho/INSTRUCOES.md`, `AREAS.md`, `validar.mjs`), em lotes de 3 a 5 fichas por área. Integração: `juntar` → `aplicar-propostas` → `conciliar` → importar.
- **Referências da casa:** edições mínimas com a fonte registada em `trabalho/referencias-casa.txt`.
- **Fora do âmbito:**
  - as 422 fichas que a triagem deu como sem problemas de fundo;
  - a confirmação final, que é do advogado (o relatório diz o que confirmar em cada ficha).

## Tarefas
- [x] 1. [US1] Artigos revogados e citações sem «º»:
  - `--revogados` no gerador e a lista nos 25 diplomas;
  - o importador;
  - a fixture TRA-905;
  - a decisão COM-059 (correção para o art. 135.º CSC, revogado pelo DL 76-A/2006) passa a «verificar»;
  - o verificador de citações e o CLAUDE.md;
  - o teste T-533.
  - _Requirements: US-1.AC-2, US-1.AC-3_
  - _Implements: mcp-server/scripts/gerar-epigrafes.mjs, mcp-server/scripts/importar-fichas.mjs, skills/juridico-pt/references/epigrafes/CC.json, skills/juridico-pt/assets/fichas/revisao-citacoes.json, mcp-server/test/v31.test.mjs, mcp-server/test/fixtures/fichas/skill/references/epigrafes/CT.json, mcp-server/test/fixtures/fichas/kit/biblioteca/14-direito-do-trabalho/TRA-905-contrato-de-trabalho-a-tempo-parcial-teste.md, agents/verificador-citacoes.md, CLAUDE.md_
  - _Verify: cd mcp-server && node --test --test-name-pattern "T-533|T-514|T-515|T-516" test/v31.test.mjs_
- [x] 2. [US1] Revisão técnica das 272 fichas que faltavam, lista AO90 alargada (com a normalização dos trechos no `juntar.mjs`) e referências da casa. Inclui a integração, a reimportação e a conciliação das decisões de citações. Testes:
  - T-534: a lista AO90 nova, na fixture e nas fichas;
  - T-535: todas as fichas apontadas pela triagem no relatório, com fonte em cada correção, e as afirmações corrigidas nas referências não voltam.
  - _Requirements: US-1.AC-1, US-1.AC-3_
  - _Implements: skills/juridico-pt/assets/fichas/correcoes-conteudo.json, skills/juridico-pt/assets/fichas/revisao-tecnica.md, skills/juridico-pt/assets/fichas/revisao-citacoes.json, mcp-server/scripts/ao90.json, skills/juridico-pt/references/multas.md, skills/juridico-pt/references/imobiliario.md, skills/juridico-pt/references/sucessorio-internacional.md, skills/juridico-pt/references/herancas.md, skills/juridico-pt/references/licenciamento-setorial.md, skills/juridico-pt/references/bancario.md, skills/juridico-pt/references/insolvencia.md, skills/juridico-pt/playbooks/comprar-imovel.md, mcp-server/test/v31.test.mjs_
  - _Verify: cd mcp-server && npm run build && node scripts/importar-fichas.mjs --origem "C:/Users/Administrator/Downloads/skills-juridicas-pro" --check && node --test --test-name-pattern "T-510|T-514|T-532|T-533|T-534|T-535" test/v31.test.mjs_
- [x] 3. [shared] Versão 3.1.2:
  - os 6 sítios e o lock;
  - o CHANGELOG;
  - os bundles e os pacotes;
  - as suites verdes.
  - _Requirements: US-1.AC-1_
  - _Implements: .claude-plugin/plugin.json, .claude-plugin/marketplace.json, package.json, mcp-server/package.json, mcp-server/src/index.ts, CHANGELOG.md_
  - _Verify: cd mcp-server && npm test && cd .. && python -I skills/juridico-pt/scripts/test_scripts.py_
