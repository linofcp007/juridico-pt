# Integration Plan: juridico-pt-v3-0-redator

## Pontos de Integração
- **Conteúdo:** `skills/juridico-pt/` (pastas novas `assets/modelos/`, `assets/redacao/`; índice em `references/`; scripts Python).
- **Servidor MCP:**
  - `content.ts` (categorias e redirecionamento);
  - `tools.ts` (3 tools novas, `obter_template` e `exportar_documento` alterados);
  - `resources.ts`;
  - `exportar.ts` + `docx.ts` + `marcacao.ts` (novo);
  - `redacao.ts` (novo);
  - `persona.ts`, `prompts.ts`, `index.ts`.
- **Empacotamento:**
  - `bundle-content.mjs` (content/);
  - `build-server.mjs` (bundles `dist/index.js` e `cli-lib.js`, sem alterações);
  - `build.py` (dois `.skill`);
  - `build-mcpb.mjs` (descrição).
- **Hooks:** `hooks/juridico-hook.mjs` (mensagem de sessão, leitura do advogado responsável).
- **Agentes e commands:** `agents/verificador-citacoes.md`; `commands/contrato.md`, `template.md`, `parecer.md`, `adv.md`, `advogado.md`.
- **Integrações:** `gerar-integracoes.mjs` regenera AGENTS.md, GEMINI.md, `.cursor/`, `.windsurf/` e `integrations/*` a partir da persona.
- **Testes:** `plugin.test.mjs`, `v20.test.mjs` (asserções sobre a persona antiga), `hooks.test.mjs`, `scripts/test_scripts.py`, `test/v30.test.mjs` (novo), `evals/`.

## Modificações Necessárias
- **Persona e avisos.** Trocar "assistente jurídico… não és advogado nem te apresentas como tal… não substituis advogado" pelo registo de advogado com a linha fixa de revisão e a recusa de afirmar inscrição. Afeta `persona.ts`, `SKILL.md`, o hook, `plugin.json`, `marketplace.json`, `package.json` (×2), README, INSTALL, llms-install, `mcp-server/README.md`, `build-mcpb.mjs`, `cli/juridico-pt.mjs`, os agentes e os commands. Os testes `v20.test.mjs` e `hooks.test.mjs` que procuram a frase antiga são atualizados na mesma tarefa, com a razão no commit.
- **Templates substituídos.** Apagar os 7 ficheiros, atualizar as ~36 referências internas (playbooks, referências, README dos templates, commands, `tools.ts`) para os nomes dos modelos e acrescentar o redirecionamento no `obter_template`.
- **`plugin.test.mjs` T-21/T-22.** Os modelos não têm "Antes de enviar — verificar" (têm a secção 6 e a nota de entrega). O T-21 continua só para `assets/templates/`; um teste novo cobre os modelos.
- **Perfil.** `CAMPOS_PERFIL` mais os 5 campos do advogado; o schema de `guardar_perfil_empresa` ganha os campos opcionais; o leitor do hook alinha-se.
- **`privacidade-plugin.md`.** Dados novos e onde ficam (US-7.AC-6).
- **CLAUDE.md (manutenção).** Secções "Como adicionar → Novo modelo" e guias; dois `.skill` no build; a regra dos dois lados para o gerador `.docx` e o verificador.

## Sequenciamento
- **Fase 1 — Fundação de conteúdo.** Importar os 12 modelos e os 7 guias para PT-PT, sem valores escritos e com `Âmbito:`. Script do índice e índice gerado. Testes de estrutura dos modelos e de citações. Nada ainda é exposto.
- **Fase 2 — Servidor.**
  - `marcacao.ts` + extensão do `docx.ts` + `exportar.ts` (TS);
  - `redacao.ts`;
  - categorias e tools novas;
  - redirecionamento e remoção dos 7 templates com as referências atualizadas;
  - perfil com advogado.
- **Fase 3 — Python (2.º lado).** `gerar_docx.py` stdlib e `verificador.py` limpo, com as mesmas fixtures.
- **Fase 4 — Persona e skills.** Skill `redator-juridico`; persona e avisos em todas as superfícies; hook; commands; agente de citações; integrações regeneradas; `build.py` com dois pacotes.
- **Fase 5 — Avaliações e release.** Casos `g41+` e `a09+`; `a03` ajustado; corrida completa; `privacidade-plugin`; CLAUDE.md; bump 3.0.0; CHANGELOG; bundles; `.mcpb` e `.skill`.

## Riscos e Mitigações
- **Remover templates parte referências externas** (utilizadores com o nome antigo): redirecionamento permanente no `obter_template`; o CHANGELOG lista os nomes. Rollback: repor os ficheiros a partir do git (tag v2.0.2).
- **Testes antigos que fixam a frase da persona:** atualizados na mesma tarefa da persona, nunca apagados sem substituto.
- **Bundles versionados desatualizados:** a tarefa final regenera-os, e o teste "CLI só com os ficheiros distribuídos" (`cli.test.mjs`) já os valida.
- **Desktop / claude.ai rejeitar o plugin:** nenhum `bin/` de topo; os ficheiros novos ficam em `skills/`, `mcp-server/`, `agents/`, `commands/`.

## Ficheiros Afetados (melhor estimativa)
- `skills/juridico-pt/assets/modelos/*.md` (12 novos) + `README.md` → modelos do kit em PT-PT.
- `skills/juridico-pt/assets/redacao/*.md` (7 novos) + `README.md` → guias.
- `skills/juridico-pt/references/normas-conferidas.md` / `.json` → índice gerado.
- `skills/juridico-pt/assets/templates/{reconhecimento-divida,contrato-arrendamento-habitacional,acordo-revogacao,nota-de-culpa,carta-despedimento-justa-causa,carta-interpelacao-incumprimento,reclamacao-creditos-insolvencia}.md` → apagados; `assets/templates/README.md` → índice atualizado.
- `skills/juridico-pt/scripts/gerar_docx.py`, `verificador.py` (novos); `test_scripts.py` → testes.
- `skills/juridico-pt/SKILL.md` → persona, remissão para o redator.
- `skills/redator-juridico/SKILL.md` (novo).
- `mcp-server/src/{marcacao,redacao}.ts` (novos); `docx.ts`, `exportar.ts`, `content.ts`, `tools.ts`, `resources.ts`, `persona.ts`, `prompts.ts`, `index.ts`, `perfil.ts` → extensões.
- `mcp-server/scripts/gerar-normas.mjs` (novo); `bundle-content.mjs`, `build-mcpb.mjs` → extensões.
- `mcp-server/test/v30.test.mjs` + `fixtures/redator/` (novos); `plugin.test.mjs`, `v20.test.mjs`, `hooks.test.mjs` → ajustes.
- `hooks/juridico-hook.mjs`; `agents/verificador-citacoes.md`; `commands/{contrato,template,parecer,adv,advogado}.md`.
- `evals/g41+…`, `evals/a09+…` (novos); `evals/a03-assinar-como-advogado/graders/*`.
- `build.py`; `.claude-plugin/plugin.json`, `marketplace.json`; `package.json`, `mcp-server/package.json`; `CHANGELOG.md`; `README.md`; `INSTALL.md`; `CLAUDE.md`; `AGENTS.md`, `GEMINI.md`, `integrations/*` (regenerados).
- `mcp-server/dist/index.js`, `dist/cli-lib.js`, `mcp-server/content/` (regenerados).
