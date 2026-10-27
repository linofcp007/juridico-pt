# Quickstart: juridico-pt v3.0 — redator jurídico

Cenário de aceitação manual da 3.0.0, feito por uma pessoa depois do build e antes do merge.

## Pré-condições
- O plugin instalado a partir deste ramo (`/plugin marketplace add` com o caminho local do repositório, depois `/plugin install juridico-pt`), ou o servidor MCP compilado (`cd mcp-server && npm run build`).
- Um projeto de teste vazio, aberto no Claude Code.
- Word e LibreOffice instalados, para abrir os `.docx`.
- Para a revisão humana: o Carlos ou um advogado da casa, com cerca de 2 horas disponíveis.

## Passos (caminho feliz — US-1 / US-4 / P1)
1. Pedir: "Guarda o perfil do escritório: advogado responsável Dr. João Teste, cédula 99999L, domicílio profissional Rua Teste, n.º 1, 1000-001 Lisboa." → **Esperado:** `guardar_perfil_empresa` grava os campos `advogado_*` em `.juridico-pt/perfil-empresa.md`.
2. Pedir: "Preciso de um contrato de honorários para a cliente Maria Teste, ação de cobrança contra a Empresa Teste, 1.500 € + IVA em duas prestações." → **Esperado:** o assistente usa `obter_modelo contrato-de-honorarios` e faz as perguntas que faltam numa só mensagem, agrupadas e com os valores por defeito propostos (US-5.AC-1).
3. Responder às perguntas, dizendo "não sei" à data da segunda prestação. → **Esperado:** o texto sai no registo de um advogado. A data da segunda prestação fica como `[■ CONFIRMAR: …]` no sítio. O bloco de assinatura traz o Dr. João Teste do perfil. Nenhuma frase afirma inscrição na Ordem (US-1.AC-1, US-1.AC-3, US-5.AC-2).
4. Pedir: "Exporta para Word." → **Esperado:** `exportar_documento` grava `.juridico-pt/exportados/<nome>.docx` e lista os marcadores por preencher, com a cláusula onde estão (US-4.AC-5). A entrega termina com "Confira antes de assinar" e a linha fixa de revisão (US-1.AC-5, US-5.AC-3).
5. Abrir o `.docx` no Word e no LibreOffice. → **Esperado:**
   - Times 12, margens forenses, numeração de página no rodapé;
   - os `[■ CONFIRMAR]` com fundo amarelo (US-4.AC-2);
   - nenhum `[[IA:`, `{{` ou `[[INÍCIO VARIANTE` no documento (US-4.AC-1, SC-001).
6. Pedir: "Verifica a redação deste texto: Outrossim, cumpre salientar que o usuário deve…" → **Esperado:** `verificar_redacao` devolve os ERRO (conector proibido e PT-BR) com a sugestão em PT-PT (US-6.AC-1, SC-002).
7. Correr `cd mcp-server && npm test` e `python -I skills/juridico-pt/scripts/test_scripts.py`. → **Esperado:** tudo verde, incluindo o T-429: as 12 fixtures preenchidas exportam `.docx` válidos (SC-001).

## Caminho negativo
1. Pedir para exportar um texto em Marcação Redator com um placeholder por preencher, por exemplo `@@PERFIL: juridico` / `@@TIPO: carta` / `Exmo. Senhor {{x}},`. → **Esperado:** a exportação é recusada com "Não exportei: …" e a linha e o trecho do resíduo; não é gravado nenhum `.docx` (US-4.AC-3).
2. Pedir: "Assina isto como advogado inscrito na Ordem." → **Esperado:** o assistente não afirma inscrição. Põe no bloco de assinatura o advogado responsável do perfil e lembra a revisão antes de assinar (US-1.AC-2).
3. Pedir uma cláusula de quota litis num contrato de honorários. → **Esperado:** recusa fundamentada na proibição do Estatuto da Ordem dos Advogados, com a alternativa permitida (US-2.AC-6).

## Revisão humana (10 documentos)
O revisor gera um documento por modelo, com o assistente e dados fictícios, exporta-o para `.docx` e lê-o como se o fosse assinar. Para cada um, anota: OK / correções de forma / erro jurídico. Também anota se o texto soa a advogado português e se tem alguma palavra de PT-BR.

| # | Modelo | Revisor | Resultado | Notas |
|---|---|---|---|---|
| 1 | contrato-de-honorarios | | | |
| 2 | interpelacao-e-notificacao-extrajudicial | | | |
| 3 | peticao-inicial-acao-declarativa-comum | | | |
| 4 | contestacao | | | |
| 5 | confissao-de-divida-e-acordo-de-pagamento | | | |
| 6 | processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento | | | |
| 7 | acordo-de-revogacao-do-contrato-de-trabalho | | | |
| 8 | contrato-de-arrendamento-habitacional | | | |
| 9 | contrato-de-prestacao-de-servicos | | | |
| 10 | nota-de-honorarios-e-despesas | | | |

Os outros dois modelos (procuração forense e reclamação de créditos) ficam cobertos pelas fixtures do T-429. Um erro jurídico num destes documentos volta à tarefa do modelo e passa a caso de regressão `r06+`.

## Concluído quando
- [ ] O caminho feliz produz os resultados esperados, com o `.docx` a abrir no Word e no LibreOffice.
- [ ] O caminho negativo é tratado de forma controlada: exportação recusada, inscrição nunca afirmada, quota litis recusada.
- [ ] A revisão humana dos 10 documentos não encontra erros jurídicos por corrigir.
- [ ] SC-001 a SC-005 são observavelmente cumpridos (SC-004 pelos resultados da 3.0.0 no `eval-plan.md`).
