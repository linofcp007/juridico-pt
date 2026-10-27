# Test Plan: juridico-pt-v3-1-fichas

## Estratégia
- **Test runner:** `node --test`, num ficheiro novo `mcp-server/test/v31.test.mjs` que entra no `npm test`. O teste do pacote vai em `skills/juridico-pt/scripts/test_scripts.py`, porque o `build.py` é Python.
- **Abordagem de mocking:** nenhuma.
  - As tools testam-se pelo cliente MCP real, sobre o `dist/index.js`.
  - O importador corre sobre uma fixture pequena numa pasta temporária.
  - A rede não entra nos testes: usam as epígrafes versionadas e as da fixture.
- **Alvo de cobertura:** cada critério com pelo menos um teste; os testes sobre o conteúdo gerado percorrem todas as fichas.
- **Caminhos críticos com cobertura de ramos a 100 %:**
  - estado das citações: nenhuma `conferida` sem prova;
  - remissão `mesmo-documento`;
  - conversão AO90 com as formas que se mantêm.

## Matriz de Rastreabilidade

| Test ID | Camada | Tipo | Descrição | Cobre (AC IDs) | Ficheiro |
|---------|--------|------|-----------|----------------|----------|
| T-501 | integração | property | Todas as fichas importadas estão em `assets/fichas/<NN-área>/<CÓDIGO>-<slug>.md`, com o frontmatter completo (`codigo`, `area`, `titulo`, `titulo_en`, `descricao`, `descricao_en`, `ambito`, `estado_citacoes`). O total é 1319 menos as `mesmo-documento`. | US-1.AC-1, SC-001 | `mcp-server/test/v31.test.mjs` |
| T-502 | integração | example | `procurar_ficha` com um termo PT, com uma área e sem nada: no máximo 20 linhas com código, títulos PT/EN, área e estado; sem nada, devolve as 22 áreas. Responde em menos de 200 ms. | US-1.AC-2, NFR-1 | `mcp-server/test/v31.test.mjs` |
| T-503 | integração | example | `obter_ficha` devolve o cabeçalho (estado, ordem modelo → template → ficha, `valores-2026`, `redator.md`) e o corpo, em menos de 50 ms. | US-1.AC-3, NFR-1 | `mcp-server/test/v31.test.mjs` |
| T-504 | integração | example | `obter_ficha` com um código inexistente devolve 5 sugestões próximas. | US-1.AC-4 | `mcp-server/test/v31.test.mjs` |
| T-505 | integração | example | `_INDICE.md` em cada uma das 22 pastas, com código, título PT, título EN e ficheiro de todas as fichas da área; o `SKILL.md` tem a secção das fichas com o caminho sem MCP. | US-1.AC-5 | `mcp-server/test/v31.test.mjs` |
| T-506 | unit | property | `sobreposicoes.json`: cada código existe no catálogo, cada alvo existe no plugin e a relação é `mesmo-documento` ou `complementa`. | US-2.AC-1 | `mcp-server/test/v31.test.mjs` |
| T-507 | integração | example | Nenhuma ficha `mesmo-documento` está em `assets/fichas/`; `procurar_ficha` e `obter_ficha` devolvem a remissão para o alvo (INS-008 → modelo de reclamação de créditos). | US-2.AC-2, SC-003, EC-4 | `mcp-server/test/v31.test.mjs` |
| T-508 | integração | example | Uma ficha `complementa` está importada e o cabeçalho de `obter_ficha` nomeia o alvo. | US-2.AC-3 | `mcp-server/test/v31.test.mjs` |
| T-509 | unit | example | `redator.md`, passo 1: a ordem é modelo conferido → template → ficha (`procurar_ficha`/`obter_ficha`) → protocolo de pesquisa. | US-2.AC-4 | `mcp-server/test/v31.test.mjs` |
| T-510 | unit | property | Em todas as fichas: zero formas da lista `ao90.json`, zero PT-BR de nível ERRO e zero "por quê". O importador mantém intactas as formas que o AO90 conserva (facto, contacto, impacto, pacto, secção) e os termos ingleses (opt-out, factoring), verificado com a fixture. | US-3.AC-1, NFR-3, EC-6, SC-001 | `mcp-server/test/v31.test.mjs` |
| T-511 | unit | property | Nenhuma ficha tem o aviso "Não substitui o juízo do advogado", nem "És um advogado", nem a afirmação de inscrição na OA. | US-3.AC-2, SC-001 | `mcp-server/test/v31.test.mjs` |
| T-512 | unit | property | Os marcadores de falta são `[■ VERIFICAR: …]`; não sobra nenhum `[VERIFICAR` sem ■. | US-3.AC-3 | `mcp-server/test/v31.test.mjs` |
| T-513 | unit | example | Nenhuma ficha escreve o valor do salário mínimo, do IAS ou da UC; na fixture, o importador põe a remissão `valores-2026`. | US-3.AC-4 | `mcp-server/test/v31.test.mjs` |
| T-514 | unit | property | `citacoes.json` tem uma entrada por citação extraída, com estado. Nenhuma `conferida (índice)` sem entrada no índice de normas; nenhuma `conferida (epígrafe)` ou `corrigida` sem o artigo nas epígrafes e sem decisão ou correspondência registada. As contagens batem com o frontmatter. | US-4.AC-1, SC-002 | `mcp-server/test/v31.test.mjs` |
| T-515 | unit | example | `references/epigrafes/` tem os 25 diplomas, cada um com fonte, URL, data e artigos não vazios. Os da CT 150.º–157.º coincidem com o PGDL de 2026-10-27. | US-4.AC-2 | `mcp-server/test/v31.test.mjs` |
| T-516 | integração | example | Importador sobre a fixture: o artigo inexistente fica `[■ VERIFICAR]` com nota; a correção só se aplica com a decisão em `revisao-citacoes.json`; o 78.º-A é unidade; o diploma por extenso é reconhecido; a ficha sem citações fica `sem citações`. | US-4.AC-3, EC-1, EC-2, EC-5 | `mcp-server/test/v31.test.mjs` |
| T-517 | integração | example | `obter_ficha` de uma ficha com citações `por conferir` mostra-as com `[■ VERIFICAR]`. | US-4.AC-4 | `mcp-server/test/v31.test.mjs` |
| T-518 | integração | example | TRA-005: art. 153.º CT para a forma e o conteúdo, art. 154.º CT para as condições e nenhum "157.º" a falar de trabalho suplementar. | US-4.AC-5 | `mcp-server/test/v31.test.mjs` |
| T-519 | unit | property | Todas as fichas têm `titulo_en` e `descricao_en` não vazios e diferentes do PT, sem PT-BR. | US-5.AC-1 | `mcp-server/test/v31.test.mjs` |
| T-520 | integração | example | 40 pedidos (20 PT e 20 EN) da fixture `pesquisas.json`: a ficha esperada fica entre as 5 primeiras em pelo menos 36. | US-5.AC-2, SC-005 | `mcp-server/test/v31.test.mjs` |
| T-521 | eval | example | Caso g57: pedido em inglês ("parental responsibilities") encontra a ficha certa e a resposta vem em inglês. | US-5.AC-3 | `evals/g57-ficha-em-ingles` |
| T-522 | integração | example | O `build.py` gera o `juridico-pt.skill` com `assets/fichas/` e os `_INDICE.md`, com 10 MB ou menos. O `content/fichas` existe. `SKILL.md` com 500 linhas ou menos, `description` com 1024 caracteres ou menos e instruções com 2000 caracteres ou menos, com todas as tools. | US-6.AC-1, NFR-2, NFR-5 | `skills/juridico-pt/scripts/test_scripts.py`, `mcp-server/test/v31.test.mjs` |
| T-523 | eval | example | Resultados da 3.1.0 registados: golden 90 % ou mais. | US-6.AC-2, SC-004 | `.specs/juridico-pt-v3-1-fichas/eval-plan.md` |
| T-524 | eval | example | Resultados da 3.1.0 registados: adversarial a 100 %. | US-6.AC-2, SC-004 | `.specs/juridico-pt-v3-1-fichas/eval-plan.md` |
| T-525 | eval | example | Casos g51–g58 existem, com a etiqueta golden e graders que exigem `obter_ficha` no trace e os elementos da área. | US-1.AC-3, US-2.AC-4, US-6.AC-2 | `evals/g51…g58` |
| T-526 | integração | example | `importar-fichas.mjs --check` sobre a origem versionada sai com 0 e sem diferenças, sem rede. Uma alteração numa ficha gerada faz o `--check` falhar. | US-6.AC-3, NFR-4, EC-3 | `mcp-server/test/v31.test.mjs` |
| T-527 | eval | example | Caso a14 (citação errada pedida pelo utilizador): não cita o art. 157.º CT como norma do trabalho suplementar e usa `[■ VERIFICAR]` ou a norma certa. | US-4.AC-3, US-6.AC-2 | `evals/a14-citacao-errada-da-ficha` |
| T-528 | eval | example | Caso r06 (regressão TRA-005): contrato a tempo parcial com o art. 153.º CT e sem art. 157.º para o trabalho suplementar. | US-4.AC-5 | `evals/r06-tempo-parcial-artigos` |
| T-529 | unit | property | Nenhuma ficha tem dados pessoais reais: NIF válido fora de 999999990, emails fora dos domínios de exemplo. | US-3.AC-2 | `mcp-server/test/v31.test.mjs` |

## Verificação de Cobertura
Todos os 24 critérios aparecem em pelo menos uma célula "Cobre". Os casos limite, os NFR e os SC aparecem ao lado do critério que os mede. Lacunas: nenhuma.

## Dados de Teste e Fixtures
`mcp-server/test/fixtures/fichas/`:
- **`catalogo.json` e `biblioteca/`:** 8 fichas fictícias. Cobrem:
  - grafia anterior ao AO90 e PT-BR;
  - aviso antigo;
  - citação certa, citação errada e artigo inexistente;
  - 78.º-A e diploma por extenso;
  - uma ficha sem citações;
  - uma ficha `mesmo-documento` e uma `complementa`;
  - um valor do salário mínimo.
- **`epigrafes/`:** CT 150.º–160.º e CIVA 78.º–78.º-D.
- **`sobreposicoes.json`, `revisao-citacoes.json` e `traducoes-en.json`:** os da fixture.
- **`pesquisas.json`:** os 40 pedidos PT e EN com o código esperado, sobre o catálogo real.

## Fora de Âmbito para Testes
- A correção jurídica de cada uma das 1319 fichas. A revisão por áreas regista as decisões, e os testes verificam a coerência e a regra "sem prova, `[■ VERIFICAR]`", não o mérito de cada ficha.
- A atualização das epígrafes pela rede (`--atualizar`), que é manual e de manutenção.
