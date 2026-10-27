# Alteração: juridico-pt-v3-0-1-redator-unificado

## Resumo
Juntar o skill `redator-juridico` ao `juridico-pt`: fica um só skill e um só `.skill`. O fluxo de redação passa para um guia, lido quando se pede um documento.

**Porquê.** Na 3.0.0, o redator era um segundo skill só com um `SKILL.md`, a apontar para os recursos do `juridico-pt`. Isso obrigava a três coisas:
- manter a persona em dois `SKILL.md`;
- reescrever caminhos no `build.py`;
- distribuir um segundo pacote que duplica os modelos e os guias.

Pedido do utilizador a 2026-10-27 ("era isso que queria"). A release da 3.0.0 no GitHub ainda não foi criada, por isso ninguém instalou o pacote separado a partir dela.

## Critérios de Aceitação (EARS)
1. **US-1.AC-1** — O SISTEMA DEVE ter um só skill, `skills/juridico-pt/`, e o `build.py` DEVE gerar um só pacote, `juridico-pt.skill`, que leva os modelos, os guias e o fluxo de redação. O skill `skills/redator-juridico/` e o pacote `redator-juridico.skill` deixam de existir.
   _Supersedes: juridico-pt-v3-0-redator/US-7.AC-1, juridico-pt-v3-0-redator/US-7.AC-3_
2. **US-1.AC-2** — QUANDO o utilizador pede para redigir um documento, ou usa `/contrato`, `/template` ou `/parecer`, O SISTEMA DEVE seguir o fluxo de redação em 6 passos de `skills/juridico-pt/assets/redacao/redator.md`. Esse fluxo tem as mesmas regras do antigo skill: identificar, entrevistar, confirmar, redigir, autorrever e entregar; regras absolutas 1 a 12; recurso sem Python nem MCP. O `SKILL.md` do `juridico-pt` aponta para ele.
   _Supersedes: juridico-pt-v3-0-redator/US-7.AC-4_
3. **US-1.AC-3** — O SISTEMA DEVE manter o `SKILL.md` do `juridico-pt` com 500 linhas ou menos e a `description` com 1024 caracteres ou menos. A `description` inclui os gatilhos de redação ("faz um contrato", "redige a contestação", "minuta em Word").

## Abordagem
O texto do `skills/redator-juridico/SKILL.md` passa para `assets/redacao/redator.md`:
- os caminhos `../juridico-pt/…` passam a contar da raiz do skill (`assets/…`, `references/…`, `scripts/…`);
- o guia leva a linha `Âmbito:` e entra no índice dos guias.

No resto do repositório:
- **`SKILL.md`:** ganha uma secção curta "Redigir documentos" com os 6 passos e a remissão para o guia, e uma `description` reescrita com os gatilhos de redação.
- **Commands e persona:** os commands, o comentário da persona e o índice dos modelos deixam de nomear o skill antigo.
- **`build.py`:** volta a gerar um só pacote.
- **Testes:** os T-401, T-406, T-409, T-441, T-445, T-450, T-451 e o T-444 (Python) passam a verificar o guia em vez do skill antigo. O T-450 aceita a versão 3.0.x.
- **Versão:** 3.0.1, com CHANGELOG, README e `CLAUDE.md`.

## Tarefas
- [ ] 1. [US1] Fluxo do redator em `assets/redacao/redator.md`. Inclui:
  - apagar `skills/redator-juridico/`;
  - `SKILL.md` com a secção "Redigir documentos" e a `description` com os gatilhos de redação;
  - commands `/advogado`, `/contrato`, `/parecer` e `/template`;
  - índices dos modelos e dos guias e comentário da persona;
  - os testes T-401, T-406, T-409, T-441, T-445 e T-451.
  - _Requirements: US-1.AC-1, US-1.AC-2, US-1.AC-3_
  - _Implements: skills/juridico-pt/assets/redacao/redator.md, skills/juridico-pt/SKILL.md, commands/contrato.md, commands/template.md, commands/parecer.md, commands/advogado.md, mcp-server/test/plugin.test.mjs, mcp-server/test/v30.test.mjs_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-401|T-406|T-409|T-441|T-445|T-451" test/plugin.test.mjs test/v30.test.mjs_
- [ ] 2. [US1] `build.py` com um só pacote. O T-444 (Python) verifica que só sai `juridico-pt.skill`, com `assets/redacao/redator.md` e os modelos dentro.
  - _Requirements: US-1.AC-1_
  - _Implements: build.py, skills/juridico-pt/scripts/test_scripts.py_
  - _Verify: python -I skills/juridico-pt/scripts/test_scripts.py TestV30Redator.test_T444_build_gera_um_skill_com_o_fluxo_do_redator_
- [ ] 3. [US1] Versão 3.0.1 nos 6 sítios e no package-lock, mais:
  - CHANGELOG `## [3.0.1]`, README e `CLAUDE.md`;
  - T-450 a aceitar 3.0.x;
  - bundles e `content/` regenerados;
  - suites completas verdes.
  - _Requirements: US-1.AC-1_
  - _Implements: .claude-plugin/plugin.json, .claude-plugin/marketplace.json, package.json, mcp-server/package.json, mcp-server/src/index.ts, CHANGELOG.md, README.md, CLAUDE.md_
  - _Verify: cd mcp-server && npm test && cd .. && python -I skills/juridico-pt/scripts/test_scripts.py_
