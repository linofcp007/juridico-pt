# Integration Plan: juridico-pt-v3-1-fichas

## Pontos de Integração
- **Conteúdo:** `skills/juridico-pt/assets/fichas/` (novo), `references/epigrafes/` (novo) e `assets/redacao/redator.md` (passo 1).
- **Servidor MCP:**
  - `src/content.ts`: categoria e índice das fichas;
  - `src/tools.ts`: `procurar_ficha` e `obter_ficha`;
  - `src/persona.ts`: instruções do servidor e persona;
  - `scripts/bundle-content.mjs`: cópia das fichas.
- **Scripts de build:** `importar-fichas.mjs`, `gerar-epigrafes.mjs` e `ao90.json` (novos); `gerar-normas.mjs`, que passa a exportar a normalização de diplomas.
- **Skill e agentes:** `SKILL.md` (secção das fichas) e `agents/verificador-citacoes.md` (passo das epígrafes).
- **Pacotes:** `build.py`, sem mudanças de lógica (as fichas já ficam debaixo de `skills/juridico-pt/`), e o `.mcpb` (via `content/`).

## Modificações Necessárias
- **`gerar-normas.mjs`:** exportar `canonDiploma` e `dispositivo`, para o importador usar as mesmas regras (sem mudar a saída do índice).
- **`content.ts`:** carregar `content/fichas/indice.json` uma vez e expor `procurarFichas()` e `lerFicha()`. Sem o ficheiro, as tools dizem que o catálogo não está instalado.
- **`tools.ts`:** registar as 2 tools. O `T-449` (tools da v2.0.2 intactas mais as novas) passa a aceitar as 3 da 3.0 e as 2 da 3.1.
- **`persona.ts`:**
  - `INSTRUCOES_MCP` nomeia `procurar_ficha` e `obter_ficha`, sempre com 2000 caracteres ou menos;
  - a `PERSONA` ganha a ordem modelo → template → ficha.
- **`redator.md` e `SKILL.md`:** a ficha entra no passo 1 e a secção "Fichas do catálogo" explica o uso sem MCP.
- **Testes antigos com contagens** (`T-247` e as contagens de tools no README, INSTALL e `llms-install`): atualizar de 41 para 43 tools.

## Sequenciamento
- **Fase 0:** baseline das avaliações dos casos novos sobre a 3.0.2, com confirmação do custo.
- **Fase 1:** testes a vermelho (`v31.test.mjs`, a fixture e o teste do pacote em Python).
- **Fase 2:** fundações. Lista AO90, epígrafes dos 25 diplomas e mapa de sobreposições revisto.
- **Fase 3:** importador e primeira importação (sobreposições, grafia, persona, citações automáticas e índices).
- **Fase 4:** traduções EN e revisão de citações por área. Volta a importar.
- **Fase 5:** servidor (tools e conteúdo), persona, `SKILL.md`, redator e verificador.
- **Fase 6:** casos de avaliação, corrida final, documentação de manutenção, versão 3.1.0, pacotes e release.

## Riscos e Mitigações
- **Importação errada:** o `--check` e os testes sobre todas as fichas. O rollback é `git revert` do commit da importação.
- **Limite de sessão da conta:** o trabalho por áreas fica gravado em ficheiro (traduções e revisões), por isso uma interrupção não perde nada.
- **Instruções do servidor acima de 2000 caracteres:** encurtar outras linhas, como na 3.0.2; o `T-234` falha se passar.

## Ficheiros Afetados (melhor estimativa)
- `skills/juridico-pt/assets/fichas/**` → novo (cerca de 1250 fichas, 22 `_INDICE.md`, `indice.json`, `citacoes.json`, `sobreposicoes.json`, `traducoes-en.json`, `revisao-citacoes.json` e `README.md`)
- `skills/juridico-pt/references/epigrafes/*.json` → novo (25)
- `mcp-server/scripts/importar-fichas.mjs`, `gerar-epigrafes.mjs` e `ao90.json` → novos
- `mcp-server/scripts/gerar-normas.mjs` → exportações
- `mcp-server/src/content.ts`, `tools.ts`, `persona.ts` e `index.ts` → estendidos
- `mcp-server/scripts/bundle-content.mjs` → copia as fichas
- `skills/juridico-pt/SKILL.md`, `assets/redacao/redator.md` e `agents/verificador-citacoes.md` → secção e passo novos
- `mcp-server/test/v31.test.mjs`, `fixtures/fichas/**` e `skills/juridico-pt/scripts/test_scripts.py` → testes
- `evals/g51…g58`, `a14` e `r06` → casos novos
- `CLAUDE.md`, `README.md`, `INSTALL.md`, `llms-install.md`, `CHANGELOG.md` e os manifestos → documentação e versão 3.1.0
