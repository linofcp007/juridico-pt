# Alteração: juridico-pt-v3-1-1-revisao-fichas

## Resumo
Revisão técnica de 42 fichas: as 10 da amostra do quickstart e as 32 que a revisão das citações apontou para revisão de fundo.

- **O que se corrige:** o regime, e não só o número do artigo. Por exemplo: regimes revogados, prazos, entidades competentes e figuras que não existem no direito português.
- **Como:** cada correção é confirmada na fonte oficial e fica num ficheiro de correções que o importador aplica.
- **Para o advogado:** um relatório por ficha, para que a confirmação leve cerca de 20 a 30 minutos em vez de 2 horas.
- **Tamanho e pedido:** xs, só core. O utilizador pediu-a em 27/10/2026 («sim faz isso»), depois de lhe ser explicado o que a revisão técnica faz e o que fica para o advogado.

## Critérios de Aceitação (EARS)
1. **US-1.AC-1** — QUANDO uma ficha tem entrada em `assets/fichas/correcoes-conteudo.json`, O SISTEMA DEVE:
   - aplicar cada substituição ao texto normalizado, antes de conferir as citações;
   - falhar sem escrever nada se o trecho a substituir não existir exatamente uma vez;
   - marcar a ficha como revista, com o campo `revisao_tecnica` no frontmatter e uma linha no cabeçalho a dizer que falta a confirmação do advogado.
2. **US-1.AC-2** — O SISTEMA DEVE ter um relatório `assets/fichas/revisao-tecnica.md` com cada ficha revista: o veredicto, o que mudou e porquê, a fonte oficial de cada correção e os pontos que o advogado deve confirmar. O cabeçalho de `obter_ficha` deve remeter para esse relatório nas fichas revistas.
3. **US-1.AC-3** — SE for pedida uma ficha revista, ENTÃO O SISTEMA NÃO DEVE devolver as afirmações que a revisão corrigiu, por exemplo:
   - o período de cessão de 5 anos na exoneração do passivo restante;
   - o banco de horas individual como regime em vigor;
   - o RNH como regime em vigor;
   - uma preferência legal dos sócios na cessão de quotas.

## Abordagem
- **Importador:** `importar-fichas.mjs` ganha um passo, entre a normalização (AO90, persona, grandezas) e as citações, que aplica as substituições de `correcoes-conteudo.json`. As citações novas passam pela mesma conferência que as outras.
- **Revisão:** 5 lotes por área, cada correção com o URL da fonte (PGDL, Portal das Finanças, EUR-Lex). Um validador confere que cada trecho existe uma vez, sem PT-BR nem grafia anterior ao AO90.
- **Relatório:** gerado a partir das mesmas decisões.
- **Fora do âmbito:** as restantes fichas. Continuam com as citações por conferir em `[■ VERIFICAR]`.

## Tarefas
- [ ] 1. [US1] Passo das correções de conteúdo no importador, com a fixture, o campo `revisao_tecnica`, a linha no cabeçalho e o cabeçalho de `obter_ficha`. Testes T-530 (aplica, falha sem o trecho, idempotente) e T-531 (cabeçalho e `obter_ficha`).
  - _Requirements: US-1.AC-1, US-1.AC-2_
  - _Implements: mcp-server/scripts/importar-fichas.mjs, mcp-server/src/content.ts, mcp-server/test/v31.test.mjs, mcp-server/test/fixtures/fichas/skill/assets/fichas/correcoes-conteudo.json_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-530|T-531" test/v31.test.mjs_
- [ ] 2. [US1] Revisão técnica das 42 fichas: `correcoes-conteudo.json`, o relatório `revisao-tecnica.md`, a reimportação e a conciliação das decisões de citações que a correção tornou obsoletas. Teste T-532: o relatório cobre as 42 fichas, com veredicto e fonte, e as afirmações corrigidas não voltam. Caso de avaliação de regressão r07.
  - _Requirements: US-1.AC-2, US-1.AC-3_
  - _Implements: skills/juridico-pt/assets/fichas/correcoes-conteudo.json, skills/juridico-pt/assets/fichas/revisao-tecnica.md, skills/juridico-pt/assets/fichas/revisao-citacoes.json, mcp-server/test/v31.test.mjs, evals/r07-exoneracao-tres-anos/prompt.md_
  - _Verify: cd mcp-server && npm run build && node scripts/importar-fichas.mjs --origem "C:/Users/Administrator/Downloads/skills-juridicas-pro" --check && node --test --test-name-pattern "T-532|T-514|T-510" test/v31.test.mjs_
- [ ] 3. [shared] Versão 3.1.1:
  - os 6 sítios e o lock;
  - o CHANGELOG;
  - o quickstart, a apontar o relatório;
  - o CLAUDE.md, com a regra das correções de conteúdo;
  - os bundles e os pacotes;
  - as suites verdes.
  - _Requirements: US-1.AC-2_
  - _Implements: .claude-plugin/plugin.json, .claude-plugin/marketplace.json, package.json, mcp-server/package.json, mcp-server/src/index.ts, CHANGELOG.md, CLAUDE.md, .specs/juridico-pt-v3-1-fichas/quickstart.md_
  - _Verify: cd mcp-server && npm test && cd .. && python -I skills/juridico-pt/scripts/test_scripts.py_
