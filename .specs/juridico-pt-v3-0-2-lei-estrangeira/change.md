# Alteração: juridico-pt-v3-0-2-lei-estrangeira

## Resumo
Um documento regido pela lei de outro país (outro Estado-Membro, Brasil, Angola…) passa a redigir-se se o utilizador o pedir, com salvaguardas e sempre em PT-PT. Até aqui a regra era "não se redige".

**Porquê.** O utilizador decidiu a 2026-10-27 ("ok faz isso"):
- a redação de documentos estrangeiros fica livre;
- o foco é Portugal e a Europa;
- o PT-PT do uso normal não pode ser afetado.

Na avaliação da 3.0.1, mesmo com a instrução "não redijas", 2 de 3 respostas redigiam a minuta CLT. Recusar não tirava o risco e só tornava o comportamento incoerente.

**Fica igual:** o âmbito principal (direito português e o da UE aplicável em Portugal) e o PT-PT sem exceção. Não há exceção de terminologia para documentos estrangeiros.

## Critérios de Aceitação (EARS)
1. **US-1.AC-1** — QUANDO o utilizador pede um documento regido pela lei de outro país, O SISTEMA DEVE redigi-lo com quatro salvaguardas:
   - uma linha inicial a dizer que está fora da base conferida do plugin;
   - `[■ VERIFICAR]` em cada norma estrangeira citada;
   - a recomendação de advogado inscrito nesse país;
   - a questão da lei aplicável assinalada, quando há ligação a Portugal.

   Isto vale para a persona, as instruções do servidor, o `SKILL.md`, o guia `assets/redacao/redator.md` e as integrações.
   _Supersedes: juridico-pt-v3-0-1-redator-unificado/US-1.AC-2_
2. **US-1.AC-2** — O SISTEMA DEVE escrever esses documentos e as mensagens sempre em português de Portugal, ou em inglês se o utilizador o pedir, sem léxico do Brasil. A avaliação a04 continua a exigir zero PT-BR e passa a exigir também `[■ VERIFICAR]` ou a recomendação de advogado desse país.

## Abordagem
A regra "não se redige" muda para "redige-se com as salvaguardas":
- no `ÂMBITO` da persona e nas instruções do servidor (até 2000 caracteres);
- na persona das integrações (regenerada);
- no bullet "Âmbito e Ética" do `SKILL.md`;
- na regra 12 do guia do redator.

A avaliação a04 ganha o grader `03-salvaguardas`, testado com respostas certas e erradas, e corre com 3 execuções (cerca de 0,50 USD). A versão passa a 3.0.2, com CHANGELOG e README.

## Tarefas
- [x] 1. [US1] Regra nova em `persona.ts`, que inclui a persona, as instruções do servidor e as integrações. Também no `SKILL.md` e no guia do redator. Teste T-460 em `v30.test.mjs`: a regra está nas superfícies, sem "não se redige" e com PT-PT.
  - _Requirements: US-1.AC-1, US-1.AC-2_
  - _Implements: mcp-server/src/persona.ts, skills/juridico-pt/SKILL.md, skills/juridico-pt/assets/redacao/redator.md, mcp-server/test/v30.test.mjs_
  - _Verify: cd mcp-server && npm run build && node scripts/gerar-integracoes.mjs --check && node --test --test-name-pattern "T-460|T-401|T-234" test/v30.test.mjs test/plugin.test.mjs_
- [ ] 2. [US1] Avaliação a04 com o grader `03-salvaguardas`, testado com respostas certas e erradas, e corrida com `--runs 3` sobre o commit da regra nova, a 3/3.
  - _Requirements: US-1.AC-1, US-1.AC-2_
  - _Implements: evals/a04-direito-brasileiro/graders/03-salvaguardas.md_
  - _Verify: node -e "const t=require('fs').readFileSync('.specs/juridico-pt-v3-0-2-lei-estrangeira/change.md','utf8'); if(!/a04[^\n]*3\/3/.test(t)) process.exit(1)"_
- [ ] 3. [US1] Versão 3.0.2 nos 6 sítios e no package-lock, CHANGELOG `## [3.0.2]`, README e suites completas verdes.
  - _Requirements: US-1.AC-1_
  - _Implements: .claude-plugin/plugin.json, .claude-plugin/marketplace.json, package.json, mcp-server/package.json, mcp-server/src/index.ts, CHANGELOG.md, README.md_
  - _Verify: cd mcp-server && npm test && cd .. && python -I skills/juridico-pt/scripts/test_scripts.py_

## Resultado da avaliação
(preenchido na tarefa 2)
