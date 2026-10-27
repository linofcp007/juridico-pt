# Tasks: juridico-pt-v3-0-redator

<!-- Tracks: core +tdd +ai +privacy. Organizado pela sequência do integration-plan.md (conteúdo → servidor →
     Python → persona e skills → avaliações e release), com a história de cada tarefa. Os testes já existem e
     estão a vermelho (fase tests aprovada); cada tarefa diz que testes põe a verde. -->

## Restrições Globais
- Node >= 18. Sem dependências de runtime novas (npm ou pip). O Python dos scripts só usa a biblioteca-padrão. Nunca um `bin/` na raiz.
- Todo o conteúdo em português de Portugal, sem PT-BR (lista fechada do T-443). O inglês que já existe mantém-se.
- Montantes, taxas e limiares que mudam por portaria, aviso, OE ou ano só em `skills/juridico-pt/references/valores-2026.md`; os modelos e guias remetem para lá ou usam `[VERIFICAR]` (design, "Valores escritos nos modelos").
- Nenhum artigo nem acórdão de memória. O que não estiver lido na fonte entra com `[VERIFICAR]` (princípio 2).
- Linha fixa de revisão, literal: "Este documento precisa da sua revisão antes de ser assinado, enviado ou apresentado em juízo."
- O sistema nunca afirma ser advogado inscrito na OA.
- O gerador `.docx` e o verificador de redação existem em TS e em Python e dão o mesmo resultado nas fixtures de `mcp-server/test/fixtures/redator/`.
- Bundles `mcp-server/dist/index.js` e `dist/cli-lib.js` e `mcp-server/content/` regenerados com `npm run build` sempre que `src/` ou o conteúdo mudam.
- Os testes leem `dist/`: cada `_Verify:_` de Node começa por `npm run build`.

## Fase: Setup
- [ ] 1. [shared] Base das avaliações: correr os 15 casos novos sobre a v2.0.2 (worktree isolado em 6d69ffd, `--runs 1`, teto de 8 USD, autorizado pelo utilizador) e registar a data, o modelo e a pontuação por conjunto em `.specs/juridico-pt-v3-0-redator/eval-base-2.0.2.md`
  - _Requirements: US-1.AC-6, US-1.AC-7, SC-004_
  - _Verify: node -e "const t=require('fs').readFileSync('.specs/juridico-pt-v3-0-redator/eval-base-2.0.2.md','utf8'); if(!/Golden[\s\S]*Adversarial/.test(t)||!/2026-\d\d-\d\d/.test(t)) process.exit(1)"_

## Fase: Fundação de conteúdo
- [ ] 2. [shared] Importar os 12 modelos do kit para `skills/juridico-pt/assets/modelos/`, em PT-PT, com o índice `README.md`. Cada modelo leva:
  - cabeçalho com `Âmbito:` e "revisto em";
  - nada de PT-BR;
  - nada de código `.xlsx`; a memória de cálculo remete para as calculadoras (EC-5);
  - nenhum valor volátil escrito (remissão para `valores-2026` ou `[VERIFICAR]`).
  - _Requirements: US-2.AC-1, US-2.AC-5, US-2.AC-6, US-5.AC-6, US-7.AC-2, EC-5, NFR-3_
  - _Makes green: T-410, T-435, T-452_
  - _Implements: skills/juridico-pt/assets/modelos/README.md, skills/juridico-pt/assets/modelos/*.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-410|T-435|T-452" test/plugin.test.mjs test/v30.test.mjs_
- [ ] 3. [shared] Levar as lacunas da comparação (decisions.md, D-1) para os 6 modelos que substituem templates. Cada lacuna entra com o rigor do kit: na secção 5 só o que foi lido na fonte, o resto com `[VERIFICAR]`.
  - _Requirements: US-2.AC-2, US-2.AC-3_
  - _Makes green: T-457_
  - _Implements: skills/juridico-pt/assets/modelos/*.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-457" test/v30.test.mjs_
- [ ] 4. [shared] Aplicar as decisões D-3 a D-11 (C-1 a C-9) nos modelos, no template `oposicao-injuncao`, nos playbooks e nas referências afetadas, e confirmar que a calculadora de compensação não tem modo de taxa única (C-5). Preencher **Aplicado em:** em `decisions.md` com `caminho` e «trecho».
  - _Requirements: US-2.AC-2, US-2.AC-4_
  - _Makes green: T-456_
  - _Implements: skills/juridico-pt/assets/modelos/*.md, skills/juridico-pt/assets/templates/oposicao-injuncao.md, skills/juridico-pt/playbooks/*.md, skills/juridico-pt/references/*.md, .specs/juridico-pt-v3-0-redator/decisions.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-456" test/v30.test.mjs_
- [ ] 5. [shared] Guias de redação em `skills/juridico-pt/assets/redacao/`, em PT-PT, com índice `README.md`:
  - os 7 guias: `seguranca-juridica`, `entrevista`, `entrega`, `protocolo-pesquisa`, `estilo`, `marcacao`, `formatacao-docx`;
  - os valores remetem para `valores-2026`;
  - a linha fixa de revisão vai no guia de entrega;
  - "só os dados que o modelo usa" vai no guia de entrevista;
  - o URL completo da PGDL (D-12) vai no protocolo de pesquisa;
  - a lista anti-IA é refeita com tiques de PT-PT.
  - _Requirements: US-7.AC-2, US-5.AC-1, US-5.AC-2, US-5.AC-3, US-5.AC-4, US-5.AC-5, US-5.AC-6, EC-7, NFR-3_
  - _Makes green: T-442, T-443_
  - _Implements: skills/juridico-pt/assets/redacao/README.md, skills/juridico-pt/assets/redacao/*.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-442|T-443" test/v30.test.mjs_
- [ ] 6. [US3] `mcp-server/scripts/gerar-normas.mjs` (`gerarIndice`, `verificarCitacoes`, `--raiz`, `--saida`, `--check`) e índice gerado em `references/normas-conferidas.md` / `.json`, com `Âmbito:` no `.md`.
  - _Requirements: US-3.AC-1, US-3.AC-2, US-3.AC-3, SC-003_
  - _Makes green: T-418, T-419, T-420_
  - _Implements: mcp-server/scripts/gerar-normas.mjs, skills/juridico-pt/references/normas-conferidas.md, skills/juridico-pt/references/normas-conferidas.json_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-418|T-419|T-420" test/v30.test.mjs_
**Checkpoint:** conteúdo da v3.0 completo, revisto e com as citações rastreadas; ainda não exposto pelas tools.

## Fase: Servidor
- [ ] 7. [US4] Parser `marcacao.ts`: comandos `@@`, blocos tipados, numeração de `@@ITEM` por `@@SECAO`, `[MENÇÃO]`, resíduos e erros com a linha.
  - _Requirements: US-4.AC-1, US-4.AC-3_
  - _Makes green: T-422_
  - _Implements: mcp-server/src/marcacao.ts_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-422" test/v30.test.mjs_
- [ ] 8. [US4] `gerarDocxRedator` no `docx.ts`, com o caminho Markdown igual ao da v2.0.2. Gerar e rever a fixture de referência `fixtures/redator/esperado/juridico.document.xml`. Inclui:
  - perfis jurídico e contabilístico (fonte, margens, entrelinha);
  - cabeçalho e rodapé com o campo PAGE;
  - realce amarelo dos marcadores;
  - tabelas com e sem limites;
  - assinaturas, testemunhas e citação.
  - _Requirements: US-4.AC-1, US-4.AC-2, US-4.AC-4, NFR-1_
  - _Makes green: T-423, T-424, T-426_
  - _Implements: mcp-server/src/docx.ts, mcp-server/test/fixtures/redator/esperado/juridico.document.xml_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-423|T-424|T-426" test/v30.test.mjs_
- [ ] 9. [US4] `exportar.ts` e a tool `exportar_documento`:
  - deteção de `@@PERFIL:`;
  - recusa com resíduos ("Não exportei…", `L<n> <tipo>`), sem escrever nada;
  - lista de marcadores com a cláusula ou secção;
  - dados das partes só no `.docx`.
  - _Requirements: US-4.AC-3, US-4.AC-5, US-5.AC-7, NFR-6_
  - _Makes green: T-425, T-427, T-436_
  - _Implements: mcp-server/src/exportar.ts, mcp-server/src/tools.ts_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-425|T-427|T-436" test/v30.test.mjs_
- [ ] 10. [US4] Fixtures dos 12 modelos preenchidos em Marcação Redator (dados fictícios "Teste", NIF 999999990), uma por modelo.
  - _Requirements: US-4.AC-1, SC-001_
  - _Makes green: T-429_
  - _Implements: mcp-server/test/fixtures/redator/modelos-preenchidos/*.txt_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-429" test/v30.test.mjs_
- [ ] 11. [US6] Verificador `redacao.ts` e a tool `verificar_redacao`:
  - categorias e níveis do kit, com sugestões em PT-PT;
  - lista fechada de PT-BR (ERRO e AVISO);
  - isenções (`@@CLAUSULA` / `@@SECAO`, `[MENÇÃO]`, crases);
  - opções `final` e `guia`.
  - _Requirements: US-6.AC-1, US-6.AC-2, US-6.AC-3_
  - _Makes green: T-437, T-438, T-439_
  - _Implements: mcp-server/src/redacao.ts, mcp-server/src/tools.ts_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-437|T-438|T-439" test/v30.test.mjs_
- [ ] 12. [US2] Conteúdo e tools dos modelos:
  - categorias `modelos` e `redacao` em `content.ts` e no `bundle-content.mjs`;
  - `lerModeloSecoes` e o mapa `SUBSTITUIDOS`;
  - resources;
  - tools `listar_modelos` e `obter_modelo` (secções por defeito 1, 2, 3 e 7);
  - redirecionamento no `obter_template`;
  - as 38 tools da v2.0.2 intactas.
  - _Requirements: US-2.AC-1, US-2.AC-3, NFR-2_
  - _Makes green: T-411, T-412, T-449_
  - _Implements: mcp-server/src/content.ts, mcp-server/scripts/bundle-content.mjs, mcp-server/src/resources.ts, mcp-server/src/tools.ts_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-411|T-412|T-449" test/v30.test.mjs_
- [ ] 13. [US2] Apagar os 7 templates substituídos e atualizar as referências internas para os nomes dos modelos (playbooks, referências, `assets/templates/README.md`, commands, `src/`, testes antigos que os citam).
  - _Requirements: US-2.AC-3, US-2.AC-5_
  - _Makes green: T-414, T-416_
  - _Implements: skills/juridico-pt/assets/templates/README.md, skills/juridico-pt/playbooks/*.md, skills/juridico-pt/references/*.md, commands/*.md, mcp-server/src/tools.ts, mcp-server/test/*.mjs_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-414|T-416" test/v30.test.mjs test/plugin.test.mjs_
- [ ] 14. [US7] Advogado responsável no perfil: os 5 campos em `CAMPOS_PERFIL` (`perfil.ts`) e no leitor do hook, alinhados, e a descrição do `guardar_perfil_empresa`.
  - _Requirements: US-7.AC-5, US-1.AC-3, NFR-6_
  - _Makes green: T-446_
  - _Implements: mcp-server/src/perfil.ts, hooks/juridico-hook.mjs, mcp-server/src/tools.ts_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-446" test/v30.test.mjs test/hooks.test.mjs_
**Checkpoint:** o servidor expõe os modelos, exporta em formato forense e verifica a redação.

## Fase: Python (2.º lado)
- [ ] 15. [US4] `scripts/gerar_docx.py` só com a biblioteca-padrão (zipfile + XML): o mesmo `document.xml` que o TS; código 2 e nenhum ficheiro com resíduos; mensagens em PT-PT com `->`.
  - _Requirements: US-4.AC-6, US-4.AC-3, NFR-1_
  - _Makes green: T-428_
  - _Implements: skills/juridico-pt/scripts/gerar_docx.py_
  - _Verify: python -I skills/juridico-pt/scripts/test_scripts.py TestV30Redator.test_T428_gerar_docx_mesmo_document_xml_que_o_typescript TestV30Redator.test_T428_gerar_docx_recusa_residuos_com_codigo_2_
- [ ] 16. [US6] `scripts/verificador.py` limpo para PT-PT (sugestões, lista de PT-BR), com as mesmas ocorrências que o TS e só biblioteca-padrão.
  - _Requirements: US-6.AC-4, US-6.AC-2, NFR-1_
  - _Makes green: T-440, T-448_
  - _Implements: skills/juridico-pt/scripts/verificador.py_
  - _Verify: python -I skills/juridico-pt/scripts/test_scripts.py TestV30Redator.test_T440_verificador_mesmas_ocorrencias_que_o_typescript && cd mcp-server && npm run build && node --test --test-name-pattern "T-448" test/v30.test.mjs_

## Fase: Persona e skills
- [ ] 17. [US1] Persona no registo de advogado em `persona.ts`:
  - `PERSONA`, `PERSONA_INTEGRACOES` e `INSTRUCOES_MCP` (≤ 2380 caracteres) e a constante `LINHA_REVISAO`;
  - o `prompts.ts`;
  - as integrações regeneradas (`gerar-integracoes.mjs`);
  - a asserção da persona antiga retirada do `v20.test.mjs`, com a razão no commit.
  - _Requirements: US-1.AC-1, US-1.AC-2, US-1.AC-3, US-1.AC-4, US-1.AC-5, US-1.AC-8, NFR-5_
  - _Makes green: T-401, T-402, T-406_
  - _Affects evals: golden, adversarial (a02, a03, a09, a10)_
  - _Implements: mcp-server/src/persona.ts, mcp-server/src/prompts.ts, AGENTS.md, GEMINI.md, integrations/codex/AGENTS.md, integrations/gemini-cli/GEMINI.md, integrations/chatgpt/custom-gpt-instructions.md, mcp-server/test/v20.test.mjs_
  - _Verify: cd mcp-server && npm run build && node scripts/gerar-integracoes.mjs --check && node --test --test-name-pattern "T-401|T-402|T-406" test/v30.test.mjs_
- [ ] 18. [US7] Skill `skills/redator-juridico/SKILL.md` e `skills/juridico-pt/SKILL.md` no registo novo. O redator tem:
  - os 6 passos e as regras absolutas;
  - tools MCP primeiro e caminhos `../juridico-pt/` como recurso;
  - o recurso sem Python nem MCP;
  - quota litis, pedido ilícito, documento sem modelo, variantes incompatíveis e mandatário.

  Cada `SKILL.md` com 500 linhas ou menos.
  - _Requirements: US-7.AC-1, US-1.AC-1, US-1.AC-4, US-1.AC-8, US-2.AC-2, US-2.AC-4, US-2.AC-6, US-5.AC-1, US-5.AC-2, US-5.AC-3, US-5.AC-4, US-5.AC-5, EC-1, EC-2, EC-3, EC-4, EC-6_
  - _Makes green: T-409, T-441, T-451_
  - _Affects evals: golden (g41–g50), adversarial (a09–a13)_
  - _Implements: skills/juridico-pt/assets/redacao/redator.md, skills/juridico-pt/SKILL.md_
  - _Nota (3.0.1): o skill `skills/redator-juridico/` passou a ser o guia `assets/redacao/redator.md` do juridico-pt (alteração juridico-pt-v3-0-1-redator-unificado, que substitui o US-7.AC-1, o US-7.AC-3 e o US-7.AC-4)._
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-401|T-409|T-441|T-451" test/v30.test.mjs test/plugin.test.mjs_
- [ ] 19. [US1] Aviso antigo fora do hook de sessão, dos manifestos e da documentação. Abrange `hooks/juridico-hook.mjs`, `plugin.json`, `marketplace.json`, os dois `package.json`, README, INSTALL, `llms-install.md`, `mcp-server/README.md`, `build-mcpb.mjs`, o CLI e os agentes.
  - _Requirements: US-1.AC-5_
  - _Makes green: T-406_
  - _Implements: hooks/juridico-hook.mjs, .claude-plugin/plugin.json, .claude-plugin/marketplace.json, package.json, mcp-server/package.json, README.md, INSTALL.md, llms-install.md, mcp-server/README.md, mcp-server/scripts/build-mcpb.mjs, cli/juridico-pt.mjs, agents/revisor-contratos.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-406" test/v30.test.mjs test/hooks.test.mjs_
- [ ] 20. [US7] Commands `/contrato`, `/template` e `/parecer` pelo skill `redator-juridico`, com as tools reais; `/adv` e `/advogado` no registo novo.
  - _Requirements: US-7.AC-4_
  - _Makes green: T-445_
  - _Affects evals: golden (g43, g45)_
  - _Implements: commands/contrato.md, commands/template.md, commands/parecer.md, commands/adv.md, commands/advogado.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-445" test/plugin.test.mjs_
- [ ] 21. [US3] Agente `verificador-citacoes`: passo 1, o índice de normas conferidas (estado "verificada (índice)"); URL completo da PGDL (D-12); só leitura.
  - _Requirements: US-3.AC-4_
  - _Makes green: T-421_
  - _Implements: agents/verificador-citacoes.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-421" test/plugin.test.mjs_
- [ ] 22. [US7] `build.py` com os dois pacotes. O do redator copia para `recursos/` os ficheiros citados e reescreve `../juridico-pt/` → `recursos/` no SKILL.md empacotado.
  - _Requirements: US-7.AC-3, EC-4_
  - _Makes green: T-444_
  - _Implements: build.py_
  - _Verify: python -I skills/juridico-pt/scripts/test_scripts.py TestV30Redator.test_T444_build_gera_dois_skill_e_o_redator_abre_sozinho_
- [ ] 23. [US7] Referência `privacidade-plugin.md`: advogado responsável, `.docx` em `.juridico-pt/exportados/`, como apagar cada um, categorias especiais e AIPD.
  - _Requirements: US-7.AC-6, NFR-6_
  - _Makes green: T-447_
  - _Implements: skills/juridico-pt/references/privacidade-plugin.md_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-447" test/v30.test.mjs_
**Checkpoint:** o plugin redige no registo de advogado em todas as superfícies, com os dois skills.

## Fase: Avaliações e release
- [ ] 24. [US1] Corrida final das avaliações (68 casos, `--runs 3`, teto de 45 USD, com confirmação do utilizador antes de correr) e secção "## Resultados da 3.0.0" no `eval-plan.md`, com a tabela Golden / Adversarial / Regressão. Os casos que falharem por graders mal desenhados são corrigidos e repetidos; as falhas reais voltam à tarefa que as causou.
  - _Requirements: US-1.AC-2, US-1.AC-6, US-1.AC-7, US-2.AC-2, US-2.AC-4, US-2.AC-6, US-5.AC-1, US-5.AC-2, US-5.AC-3, US-5.AC-4, US-5.AC-5, EC-1, EC-2, EC-3, EC-6, EC-7, SC-004, SC-005_
  - _Makes green: T-403, T-404, T-405, T-407, T-408, T-413, T-415, T-417, T-430, T-431, T-432, T-433, T-434, T-453, T-454, T-455_
  - _Affects evals: golden, adversarial, regression_
  - _Verify: cd mcp-server && npm run build && node --test --test-name-pattern "T-403|T-404|T-405|T-407|T-408|T-413|T-415|T-417|T-430|T-431|T-432|T-433|T-434|T-453|T-454|T-455" test/v30.test.mjs_
- [ ] 25. [shared] `CLAUDE.md` (manutenção): como adicionar um modelo e um guia; os dois `.skill` no build; os dois lados do gerador `.docx` e do verificador; `gerar-normas --check`.
  - _Requirements: NFR-4_
  - _Implements: CLAUDE.md_
  - _Verify: node -e "const t=require('fs').readFileSync('CLAUDE.md','utf8'); for (const s of ['assets/modelos','gerar-normas','redator-juridico','gerar_docx.py']) if(!t.includes(s)) { console.error('falta', s); process.exit(1) }"_
- [ ] 26. [shared] Versão 3.0.0 nos 6 sítios; CHANGELOG `## [3.0.0]` com os 7 nomes substituídos, a migração e a pontuação das avaliações; bundles e `content/` regenerados; `.mcpb` e os dois `.skill` gerados; suites completas verdes.
  - _Requirements: NFR-2, NFR-3, NFR-4, SC-002_
  - _Makes green: T-450, T-443_
  - _Implements: .claude-plugin/plugin.json, .claude-plugin/marketplace.json, package.json, mcp-server/package.json, mcp-server/src/index.ts, CHANGELOG.md, mcp-server/dist/index.js, mcp-server/dist/cli-lib.js_
  - _Verify: cd mcp-server && npm test && cd .. && python -I skills/juridico-pt/scripts/test_scripts.py_
- [ ] 27. [shared] `quickstart.md` com o cenário de aceitação manual. O caminho feliz é um contrato de honorários do pedido ao `.docx`, aberto no Word e no LibreOffice. O caminho negativo é a exportação recusada com `{{x}}`. Inclui a revisão humana de 10 documentos (um por modelo prioritário) por um advogado da casa ou pelo Carlos.
  - _Requirements: SC-001, SC-005, US-4.AC-1_
  - _Verify: node -e "const t=require('fs').readFileSync('.specs/juridico-pt-v3-0-redator/quickstart.md','utf8'); if(/\[faz isto\]|\[depois isto\]/.test(t)) process.exit(1)"_
