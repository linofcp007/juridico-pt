# Tasks: juridico-pt-v3-1-fichas

## Restrições Globais
- PT-PT do Acordo Ortográfico de 1990 em todo o conteúdo, sem PT-BR. O inglês fica só no índice e nas descrições EN.
- Node 20 ou mais, scripts só com a biblioteca-padrão, sem dependências novas. Nunca um `bin/` na raiz.
- Contexto fixo:
  - `SKILL.md` com 500 linhas ou menos;
  - `description` com 1024 caracteres ou menos;
  - `INSTRUCOES_MCP` com 2000 caracteres ou menos, com todas as tools nomeadas.
- Nenhuma citação de ficha marcada como conferida sem entrada no índice de normas ou epígrafe confirmada. O resto vai com `[■ VERIFICAR]`.
- Valores do ano só em `references/valores-2026.md`.
- Avaliações com custo: correm só com a confirmação do utilizador, sempre com `--keep-temp`.
- Origem do kit, só de leitura: `C:\Users\Administrator\Downloads\skills-juridicas-pro`. Nunca correr nada de lá.

## Fase: Base das avaliações
- [x] 1. [shared] Base dos 10 casos novos (g51–g58, a14, r06) sobre a 3.0.2. Corre num worktree isolado em 02bd1db, com os casos copiados, `--runs 1`, teto de 5 USD e confirmação do utilizador. Regista a data, o modelo e a pontuação por conjunto em `eval-base-3.0.2.md`.
  - _Requirements: US-6.AC-2_
  - _Verify: node -e "const t=require('fs').readFileSync('.specs/juridico-pt-v3-1-fichas/eval-base-3.0.2.md','utf8'); if(!/Golden[\s\S]*Adversarial/.test(t)||!/2026-\d\d-\d\d/.test(t)) process.exit(1)"_

## Fase: Fundações
- [x] 2. [US3] Lista fechada `mcp-server/scripts/ao90.json`, com as formas anteriores ao AO90 encontradas no kit e a forma atual. Cada entrada é revista. As formas que se mantêm em PT (facto, contacto, impacto, pacto, secção) ficam listadas à parte como `manter`.
  - _Requirements: US-3.AC-1_
  - _Makes green: T-510_
  - _Implements: mcp-server/scripts/ao90.json_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-510" test/v31.test.mjs_
- [x] 3. [US4] `mcp-server/scripts/gerar-epigrafes.mjs` e as epígrafes versionadas dos 25 diplomas em `skills/juridico-pt/references/epigrafes/`, com a fonte, o URL e a data. Vêm da PGDL e, no caso do RGPD e do TFUE, do EUR-Lex.
  - _Requirements: US-4.AC-2_
  - _Makes green: T-515_
  - _Implements: mcp-server/scripts/gerar-epigrafes.mjs, skills/juridico-pt/references/epigrafes/*.json_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-515" test/v31.test.mjs_
- [x] 4. [US2] Mapa de sobreposições `assets/fichas/sobreposicoes.json`. Parte dos candidatos automáticos por título, revistos um a um (`mesmo-documento` ou `complementa`); os falsos positivos ficam fora.
  - _Requirements: US-2.AC-1_
  - _Makes green: T-506_
  - _Implements: skills/juridico-pt/assets/fichas/sobreposicoes.json_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-506" test/v31.test.mjs_

## Fase: Importação
- [x] 5. [US1] `mcp-server/scripts/importar-fichas.mjs` (`--origem`, `--destino`, `--check`). Faz isto:
  - lê o catálogo e aplica as sobreposições;
  - converte a grafia com o AO90 e o PT-BR;
  - tira a persona antiga e o aviso;
  - põe os marcadores no formato `[■ VERIFICAR]`;
  - troca as grandezas anuais por remissão para `valores-2026`;
  - extrai as citações e atribui-lhes estado (índice, epígrafe com correspondência de palavras, decisões de `revisao-citacoes.json`);
  - junta as traduções EN;
  - escreve as fichas, o `indice.json`, os `_INDICE.md`, o `citacoes.json` e o `README.md`.

  `gerar-normas.mjs` passa a exportar `canonDiploma` e `dispositivo`. Testado sobre a fixture.
  - _Requirements: US-1.AC-1, US-1.AC-5, US-2.AC-2, US-2.AC-3, US-3.AC-1, US-3.AC-2, US-3.AC-3, US-3.AC-4, US-4.AC-1, US-4.AC-3, US-6.AC-3_
  - _Makes green: T-516, T-526_
  - _Implements: mcp-server/scripts/importar-fichas.mjs, mcp-server/scripts/gerar-normas.mjs_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-516|T-526" test/v31.test.mjs_
- [x] 6. [US5] Traduções `assets/fichas/traducoes-en.json`: título e descrição EN de todas as fichas importadas, em inglês jurídico, com o termo português entre parênteses quando não há equivalente. São feitas por área e revistas por amostra.
  - _Requirements: US-5.AC-1_
  - _Makes green: T-519_
  - _Implements: skills/juridico-pt/assets/fichas/traducoes-en.json_
  - _Verify: cd mcp-server && npm run build && node scripts/importar-fichas.mjs --origem "C:/Users/Administrator/Downloads/skills-juridicas-pro" --check && node --test --test-name-pattern "T-519" test/v31.test.mjs_
- [x] 7. [US1] Importação completa para `skills/juridico-pt/assets/fichas/` (22 áreas, menos as `mesmo-documento`), com os índices e o relatório de citações.
  - _Requirements: US-1.AC-1, US-1.AC-5, US-2.AC-2, US-3.AC-1, US-3.AC-2, US-3.AC-3, US-3.AC-4, US-4.AC-1, SC-001, SC-003_
  - _Makes green: T-501, T-505, T-510, T-511, T-512, T-513, T-514, T-529_
  - _Implements: skills/juridico-pt/assets/fichas/**_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-501|T-505|T-510|T-511|T-512|T-513|T-514|T-529" test/v31.test.mjs_
- [x] 8. [US4] Revisão de citações por área. Para cada citação com sigla dos 25 diplomas que a passagem automática não confirmou, decide-se contra as epígrafes: conferida, corrigir (com o artigo certo) ou verificar (com nota). As decisões ficam em `revisao-citacoes.json` e volta a importar-se.

  Inclui a correção da TRA-005. Meta: 50 % ou mais das citações com sigla reconhecida conferidas ou corrigidas (SC-002), com a percentagem registada no `README.md` das fichas.
  - _Requirements: US-4.AC-1, US-4.AC-3, US-4.AC-5, SC-002_
  - _Makes green: T-514, T-518_
  - _Implements: skills/juridico-pt/assets/fichas/revisao-citacoes.json_
  - _Verify: cd mcp-server && npm run build && node scripts/importar-fichas.mjs --origem "C:/Users/Administrator/Downloads/skills-juridicas-pro" --check && node --test --test-name-pattern "T-514|T-518" test/v31.test.mjs_

## Fase: Servidor e superfícies
- [x] 9. [US1] Servidor:
  - `content.ts` com o índice das fichas, `procurarFichas()` e `lerFicha()`, com o cabeçalho e os `[■ VERIFICAR]` nas citações por conferir;
  - tools `procurar_ficha` e `obter_ficha` em `tools.ts`, com remissões, sugestões e "catálogo não instalado";
  - `bundle-content.mjs` a copiar as fichas.
  - _Requirements: US-1.AC-2, US-1.AC-3, US-1.AC-4, US-2.AC-2, US-2.AC-3, US-4.AC-4, US-5.AC-2, NFR-1, SC-005_
  - _Makes green: T-502, T-503, T-504, T-507, T-508, T-517, T-518, T-520_
  - _Implements: mcp-server/src/content.ts, mcp-server/src/tools.ts, mcp-server/scripts/bundle-content.mjs_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-502|T-503|T-504|T-507|T-508|T-517|T-518|T-520" test/v31.test.mjs_
- [x] 10. [US2] Superfícies:
  - `persona.ts`: `INSTRUCOES_MCP` com as 2 tools, com 2000 caracteres ou menos, e a `PERSONA` com a ordem modelo → template → ficha; integrações regeneradas;
  - `SKILL.md`: secção "Fichas do catálogo", também sem MCP;
  - `redator.md`: passo 1 com a ficha;
  - `agents/verificador-citacoes.md`: passo das epígrafes;
  - contagens para 43 tools no README, INSTALL e `llms-install` e nos testes antigos que as contam.
  - _Requirements: US-1.AC-5, US-2.AC-4, US-5.AC-3, US-6.AC-1, NFR-2_
  - _Makes green: T-505, T-509, T-522_
  - _Implements: mcp-server/src/persona.ts, skills/juridico-pt/SKILL.md, skills/juridico-pt/assets/redacao/redator.md, agents/verificador-citacoes.md, README.md, INSTALL.md, llms-install.md, mcp-server/test/plugin.test.mjs, mcp-server/test/v30.test.mjs_
  - _Verify: cd mcp-server && npm run build && node scripts/gerar-integracoes.mjs --check && node --test test/plugin.test.mjs test/v30.test.mjs test/v121.test.mjs && node --test --test-name-pattern "T-505|T-509|T-522" test/v31.test.mjs_
- [x] 11. [US6] Pacote: o `juridico-pt.skill` leva as fichas e os `_INDICE.md` e fica com 10 MB ou menos (teste Python).
  - _Requirements: US-6.AC-1, NFR-5_
  - _Makes green: T-522_
  - _Implements: build.py, skills/juridico-pt/scripts/test_scripts.py_
  - _Verify: python -I skills/juridico-pt/scripts/test_scripts.py TestV31Fichas_

## Fase: Avaliação e fecho
- [ ] 12. [US6] Corrida final dos 10 casos novos, `--runs 3` com `--keep-temp`, teto de 12 USD e confirmação do utilizador. Os graders que medirem mal são corrigidos, testados e os traces reclassificados; as falhas reais voltam à tarefa que as causou. Os resultados ficam na secção "## Resultados da 3.1.0" do `eval-plan.md`.
  - _Requirements: US-6.AC-2, US-5.AC-3, US-4.AC-5, SC-004_
  - _Makes green: T-521, T-523, T-524, T-525, T-527, T-528_
  - _Affects evals: golden, adversarial, regression_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-521|T-523|T-524|T-525|T-527|T-528" test/v31.test.mjs_
- [x] 13. [shared] `CLAUDE.md` (manutenção):
  - como reimportar as fichas;
  - como atualizar as epígrafes, com a revisão anual no calendário;
  - como rever as citações de uma área;
  - a regra de que uma ficha `mesmo-documento` não entra.
  - _Requirements: NFR-4_
  - _Implements: CLAUDE.md_
  - _Verify: node -e "const t=require('fs').readFileSync('CLAUDE.md','utf8'); for (const s of ['importar-fichas','gerar-epigrafes','revisao-citacoes','sobreposicoes']) if(!t.includes(s)) { console.error('falta', s); process.exit(1) }"_
- [ ] 14. [shared] Versão 3.1.0:
  - os 6 sítios e o package-lock;
  - CHANGELOG `## [3.1.0]`, com as áreas, as contagens, a percentagem de citações conferidas e a pontuação das avaliações;
  - README;
  - bundles e `content/` regenerados;
  - `.skill` e `.mcpb` gerados;
  - suites completas verdes.
  - _Requirements: US-6.AC-1, NFR-2_
  - _Implements: .claude-plugin/plugin.json, .claude-plugin/marketplace.json, package.json, mcp-server/package.json, mcp-server/src/index.ts, CHANGELOG.md, README.md, mcp-server/dist/index.js, mcp-server/dist/cli-lib.js_
  - _Verify: cd mcp-server && npm test && cd .. && python -I skills/juridico-pt/scripts/test_scripts.py_
- [ ] 15. [shared] `quickstart.md` com o cenário manual e a revisão humana das 10 fichas.
  - _Requirements: SC-001, SC-005_
  - _Verify: node -e "const t=require('fs').readFileSync('.specs/juridico-pt-v3-1-fichas/quickstart.md','utf8'); if(/\[faz isto\]|\[depois isto\]/.test(t)) process.exit(1)"_
