# CLAUDE.md — Guia de Manutenção do plugin `juridico-pt`

Orienta quem (humano ou Claude) **mantém ou desenvolve** o plugin. Não é runtime jurídico — o conteúdo da skill está em `skills/juridico-pt/SKILL.md`.

## O que é

Plugin Claude Code de assessoria jurídica de Portugal, com 4 superfícies sobre o mesmo conteúdo:

- **Skill** (`skills/juridico-pt/`) — `SKILL.md` + `references/`, `assets/modelos/` (12 modelos conferidos), `assets/redacao/` (guias do redator, incluindo o fluxo de redação `redator.md`), `assets/templates/`, `assets/checklists/`, `playbooks/`, `scripts/` (calculadoras Python, `gerar_docx.py`, `verificador.py`).
- **Servidor MCP** (`mcp-server/`, TypeScript) — calculadoras (port TS) + conteúdo como tools/resources + persona como prompt.
- **Slash commands** (`commands/`) — wrappers finos que invocam a skill / tools.
- **Hooks** (`hooks/`) + **CLI** (`cli/juridico-pt.mjs`).
- **Subagentes** (`agents/`) — `verificador-citacoes` e `revisor-contratos`, só com ferramentas de leitura.

Distribuição: plugin via marketplace git (`.claude-plugin/`) + `.skill` (Anthropic Skills) gerado por `build.py`. Um só skill desde a 3.0.1: o redator é o guia `assets/redacao/redator.md`, não um skill à parte. **Sem npm publish e sem CI, por opção** (zero custo).

## Princípios invioláveis

1. **Ponto único de verdade para valores**: todos os montantes/taxas/limiares vivem em `skills/juridico-pt/references/valores-2026.md`. Os outros ficheiros **remetem** para lá. Ao mudar de ano, atualizar e renomear.
2. **Anti-alucinação**: nunca inventar artigos ou jurisprudência. Marcar "(a confirmar)" e verificar em dre.pt/dgsi.pt. Ver "Princípios de Rigor" no `SKILL.md`.
3. **Estilo da casa**: H1; `## Legislação Base`; secções em bullets; `## Para o contexto do utilizador`; `## Templates`. O `.markdownlint.jsonc` já silencia o ruído (MD022/MD032/…) — é estilo intencional.
4. **Cross-refs com nomes reais**: usar caminhos que existem mesmo (o teste `mcp-server/test/plugin.test.mjs` valida commands→tools e conteúdo referenciado).

## Calendário de manutenção (valores mudam!)

| Quando | Rever em `skills/juridico-pt/references/valores-2026.md` |
|---|---|
| **Janeiro** (pós-OE) | IRC, IRS, IAS, salário mínimo, deduções, IMT/IMI, isenções jovem |
| **Janeiro e julho** | juros de mora comerciais do semestre (aviso da ETF) — acrescentar a linha à tabela `TAXAS_SEMESTRAIS` em `scripts/juros_mora.py` **e** `mcp-server/src/calculators/juros.ts` |
| **Outubro** | coeficiente de atualização de rendas (INE) |
| **Janeiro** (e quando um código é alterado) | epígrafes de `references/epigrafes/` (fora do `valores-2026.md`): `node mcp-server/scripts/gerar-epigrafes.mjs --atualizar` e depois reimportar as fichas (abaixo) |

Ao corrigir um valor: atualizar a "Última atualização" no topo do `valores-2026.md` **e** o port TS em `mcp-server/src/calculators/` se for uma taxa usada numa calculadora.

**Aviso de atualidade:** o hook e a tool `verificar_atualidade` leem duas linhas do topo do `valores-2026.md` — `**Próxima revisão:** AAAA-MM-DD` e `**Juros de mora:** taxas oficiais até ao N.º semestre de AAAA`. Ao rever os valores ou acrescentar um semestre de juros, atualizar estas duas linhas (senão o plugin avisa que está desatualizado). A data de revisão do coeficiente das rendas está em `REVISOES_FIXAS` de `mcp-server/src/atualidade.ts`.

## Como adicionar

Caminhos relativos a `skills/juridico-pt/`:

- **Nova área** → `references/nova-area.md` + ligar em `SKILL.md` (Áreas de Competência), no `README.md` e (opcional) um command.
- **Novo template** → `assets/templates/nome.md` (comentário `<!-- Template: -->` com linha `Âmbito: nacional|ue|misto`, placeholders `{{...}}`, `[VERIFICAR]` para o que falta confirmar, e a secção final `## Antes de enviar — verificar` com ≥ 3 itens `- [ ]`) + índice `assets/templates/README.md`. O `plugin.test.mjs` (T-21/T-22) falha se faltar o âmbito ou a verificação final.
- **Nova referência** → também com `> **Âmbito:** …` nas primeiras 15 linhas.
- **Novo modelo conferido** → `assets/modelos/<slug>.md` com o cabeçalho `> slug: … | categoria: … | entregável: docx | …`, `> Âmbito: …` nas primeiras 15 linhas e as 8 secções por ordem (`## 1. Quando usar` … `## 8. Trecho de referência de tom`). A secção 4 é Marcação Redator (`@@…`, `[[IA: …]]`, variantes, `{{…}}`) e só cita normas da secção 5 (ou com `[VERIFICAR]`). Acrescentar ao índice `assets/modelos/README.md` e uma fixture preenchida em `mcp-server/test/fixtures/redator/modelos-preenchidos/<slug>.txt` (dados fictícios «Teste», NIF 999999990). Depois regenerar o índice de normas (abaixo). O `plugin.test.mjs` (T-410) e o `v30.test.mjs` (T-429, citações) falham se faltar alguma destas peças. Se o modelo substitui um template, `git rm` o template e acrescentar o par ao mapa `SUBSTITUIDOS` de `mcp-server/src/content.ts`.
- **Novo guia de redação** → `assets/redacao/nome.md` (com `> **Âmbito:** …`) + índice `assets/redacao/README.md`; se o fluxo `assets/redacao/redator.md` o usar, cita-o pelo caminho a partir da raiz do skill (`assets/redacao/nome.md`).
- **Mudar a Marcação Redator ou o verificador de redação** → **dois lados**, como nas calculadoras: o gerador `.docx` em `mcp-server/src/marcacao.ts` + `docx.ts` **e** `scripts/gerar_docx.py` (têm de produzir o mesmo `word/document.xml`; fixtures partilhadas em `mcp-server/test/fixtures/redator/`, esperado em `esperado/`); o verificador em `mcp-server/src/redacao.ts` **e** `scripts/verificador.py` (mesmas regras; casos em `fixtures/redator/verificador.json`).
- **Fichas do catálogo** (`assets/fichas/`, ~1250 fichas em 22 áreas, do kit Skills Jurídicas PRO da empresa) → **não se editam à mão**: são geradas por `mcp-server/scripts/importar-fichas.mjs` a partir do kit (só leitura; nunca se executa nada dele) e de quatro ficheiros que se mantêm à mão em `assets/fichas/`:
  - `sobreposicoes.json`: fichas que são o mesmo documento de um modelo ou template do plugin (`mesmo-documento`: **não entram**; `procurar_ficha`/`obter_ficha` devolvem a remissão) ou que se cruzam com ele (`complementa`: entram e o cabeçalho nomeia o alvo). O T-506 confere códigos e alvos.
  - `traducoes-en.json`: título e descrição EN de cada ficha (o importador falha se faltar uma).
  - `revisao-citacoes.json`: decisões da revisão das citações, por código (`{citacao, contexto?, decisao: conferida|corrigir|verificar, correto?|artigo_correto?, nota?}`). Uma correção só entra se o artigo de destino existir nas epígrafes; uma decisão sem citação correspondente faz o importador falhar.
  - `mcp-server/scripts/ao90.json`: lista fechada AO90 e PT-BR → PT-PT (e o que se mantém: facto, contacto, secção…).
  - `correcoes-conteudo.json`: a revisão técnica (3.1.1). Para cada ficha tem:
    - substituições `{de, para, motivo, fonte}`, aplicadas ao texto normalizado antes das citações; cada `de` tem de existir exatamente uma vez, senão o importador falha;
    - opcionalmente `titulo`, `descricao`, `titulo_en` e `descricao_en`, para quando o índice descrevia o regime antigo;
    - `veredicto`, `resumo`, `pontos_para_o_advogado` e `fontes`, que geram o relatório `revisao-tecnica.md`.

    Uma correção que elimine uma citação com decisão em `revisao-citacoes.json` obriga a retirar essa decisão. Uma citação escrita pela correção, com `fonte` e com o artigo nas epígrafes, conta como conferida, com o URL como prova. Correção nova só com a fonte oficial lida; senão, `[■ VERIFICAR]`.
- **Reimportar as fichas** (kit novo, epígrafes novas, decisões novas): `node mcp-server/scripts/importar-fichas.mjs --origem <pasta do kit>` e depois `cd mcp-server && npm run build` (copia o índice e as fichas para `content/fichas/`). O `--check` só verifica que está em dia. As citações ficam `conferida (índice)` (no `normas-conferidas`), `conferida (epígrafe)` (o assunto coincide com a epígrafe oficial, por palavras que distinguem o artigo), `corrigida` (por decisão) ou `por conferir` (entram no documento com `[■ VERIFICAR]`); o relatório está em `assets/fichas/citacoes.json` e no `README.md` da pasta.
- **Artigos revogados**: a lista de epígrafes da PGDL mantém a epígrafe de um artigo revogado; só o texto do artigo diz «(Revogado.)». Por isso cada `references/epigrafes/<SIGLA>.json` tem `revogados` (lida no texto de todos os artigos, ~100 por página) e o importador marca com `[■ VERIFICAR]` a citação de um revogado, salvo se o texto já diz que está revogado; uma decisão `corrigir` para um revogado faz o importador falhar. Citações sem «º» («Art. 246 CSC») contam só com a sigla logo a seguir.
- **Rever as citações de uma área**: tirar de `citacoes.json` as `por conferir` com sigla, decidir cada uma contra `references/epigrafes/<SIGLA>.json` (conferida; corrigir só com o artigo certo confirmado pela epígrafe e só se o texto citar um artigo, não um intervalo; senão verificar com uma nota curta em PT-PT, sem jargão interno, que vai para dentro do documento) e acrescentar as decisões ao `revisao-citacoes.json`. Reimportar. A meta (SC-002) é ≥ 50 % das citações com diploma reconhecido conferidas ou corrigidas.
- **Nova calculadora** → **dois lados**: Python em `scripts/nome.py` (stdlib, `argparse`, `formatar_euros`, AVISO) + teste em `scripts/test_scripts.py`; **e** o port TS em `mcp-server/src/calculators/nome.ts` (reexportar em `index.ts`) + teste em `mcp-server/test/calculators.test.mjs` + registar a tool em `mcp-server/src/tools.ts`.
- **Novo command** → `commands/nome.md` (frontmatter `description` PT+EN + `argument-hint`; corpo fino que nomeia a tool/ficheiro real).
- **Novo hook** → registar em `hooks/hooks.json`; manter o dispatcher `hooks/juridico-hook.mjs` dependency-free e fail-open. **Não** declarar `hooks/hooks.json` em `plugin.json` (o caminho padrão é carregado automaticamente pelo Claude Code; declará-lo dá "Duplicate hooks file detected"). O `manifest.hooks` só serve para ficheiros de hooks fora do caminho padrão. O teste `mcp-server/test/plugin.test.mjs` trava esta regressão. **Nunca detetar conteúdo jurídico por léxico**: aqui o vocabulário jurídico é o assunto — as `references/`, os `playbooks/` e até specs de software falam de "contrato" e "cláusula" sem serem contratos. Classificar pela **estrutura** do instrumento (ver `detetarDocumentoJuridico()` e `mcp-server/test/hooks.test.mjs`). Precisão >> recall: um falso positivo é ruído em cada gravação.

## Build, testes e versões

```bash
npm run setup                                    # bootstrap: instala + compila o MCP + doctor
python build.py                                  # gera juridico-pt.skill (empacota skills/juridico-pt/)
npm --prefix mcp-server run build:mcpb           # gera dist/juridico-pt-<versão>.mcpb (Claude Desktop)
cd mcp-server && npm test                        # calculadoras + estrutura do plugin
python skills/juridico-pt/scripts/test_scripts.py  # testes das calculadoras Python
node mcp-server/scripts/gerar-integracoes.mjs      # copia PERSONA_INTEGRACOES (src/persona.ts) para AGENTS.md e integrations/ (--check só verifica)
node mcp-server/scripts/gerar-normas.mjs           # regenera references/normas-conferidas.md/.json a partir da secção 5 dos modelos (--check só verifica)
node mcp-server/scripts/gerar-epigrafes.mjs --atualizar [--so CC,CT]  # epígrafes oficiais dos 25 diplomas e a lista `revogados` (rede: PGDL, Portal das Finanças, Cellar da UE; --revogados só refaz a lista; --check só verifica)
node mcp-server/scripts/importar-fichas.mjs --origem <kit>           # regenera assets/fichas/ (--check só verifica)
```

**Bump de versão**: alterar em SIMULTÂNEO `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` (campo `metadata.version` **e** `plugins[0].version`), `package.json`, `mcp-server/package.json`, `mcp-server/src/index.ts` (versão reportada pelo servidor) e adicionar entrada no `CHANGELOG.md` (Keep a Changelog + SemVer). Depois `cd mcp-server && npm run build` e **committar os bundles** `mcp-server/dist/index.js` e `mcp-server/dist/cli-lib.js` regenerados.

## Distribuição

Plugin: `git push` → `/plugin marketplace add https://github.com/linofcp007/juridico-pt.git` → `/plugin install juridico-pt`. **Não é preciso build após instalar**: o servidor MCP e os módulos do CLI são distribuídos como bundles self-contained versionados (`mcp-server/dist/index.js` e `mcp-server/dist/cli-lib.js`). Noutras IAs: `node cli/juridico-pt.mjs mcp-config <host>`.

**Nunca criar um diretório `bin/` na raiz.** O Claude Desktop / claude.ai não clona o repo: valida-o num serviço remoto da Anthropic, que **rejeita** qualquer plugin com `bin/` de topo (esses ficheiros entram no PATH no CLI mas não são mostrados na superfície de aprovação). O sync falha com `status=failed_content` e a UI mostra só *"Falha na sincronização do marketplace. Verifique a URL do repositório"* — que não tem nada a ver com a causa. Pontos de entrada executáveis vão para `hooks/`, `commands/` ou `mcpServers`; o CLI universal vive em `cli/`. O CLI local (`/plugin marketplace add`) usa `git clone` e **não** aplica esta regra, por isso passa mesmo quando o Desktop falha — não serve de validação.

## Notas técnicas

- Scripts Python e CLI/MCP reconfiguram stdout para UTF-8 (consola cp1252 do Windows); usar `->` em vez de setas unicode nas mensagens.
- `mcp-server/dist/index.js` (servidor) e `mcp-server/dist/cli-lib.js` (o que o CLI usa: calculadoras, calendário, prazos, painel, exportação, atualidade) — bundles self-contained via esbuild — e `mcp-server/content/` são **versionados** — é o que permite o plugin e o CLI funcionarem via marketplace sem `npm install`. O CLI nunca deve importar a saída do `tsc` (não chega a quem instala); o teste "CLI só com os ficheiros distribuídos pelo git" em `mcp-server/test/cli.test.mjs` trava essa regressão. São gerados por `npm run build`; regenerar e committar ao mudar `src/` ou conteúdo. O resto de `mcp-server/dist/` (saída do `tsc`, usada só nos testes) e `node_modules/` ficam ignorados.
- Conteúdo jurídico parcialmente gerado por subagentes; rever citações determinantes antes de confiar.
- **Abrir este repositório no Claude Code**: o `.mcp.json` da raiz é o do *plugin* (usa `${CLAUDE_PLUGIN_ROOT}`) e, lido como servidor de *projeto*, não arranca ("juridico-pt — Connection closed"). Não o alterar (é o caminho padrão do plugin); desativá-lo localmente em `.claude/settings.local.json` com `"disabledMcpjsonServers": ["juridico-pt"]` e testar o servidor com o plugin instalado ou com `node mcp-server/test/smoke-client.mjs`.
- **Perfil da empresa**: o plugin não assume o perfil do utilizador. Vive em `<projeto>/.juridico-pt/perfil-empresa.md` (ou `~/.juridico-pt/perfil-empresa.md`); o leitor existe em dois sítios — `mcp-server/src/perfil.ts` e `hooks/juridico-hook.mjs` (o hook não importa o servidor) — manter os dois alinhados.
