# Quickstart: juridico-pt v3.1 — fichas do catálogo

Cenário de aceitação manual da 3.1.0, depois do build e antes do merge.

## Pré-condições
- O plugin instalado a partir deste ramo, ou o servidor MCP compilado (`cd mcp-server && npm run build`).
- Um projeto de teste vazio aberto no Claude Code. Word ou LibreOffice para abrir um `.docx`.
- Para a revisão humana: o Carlos ou um advogado da casa, com cerca de 2 horas.

## Passos (caminho feliz — US-1 / P1)
1. Pedir: "Preciso de um acordo de regulação das responsabilidades parentais." → **Esperado:**
   - o assistente usa `procurar_ficha` e `obter_ficha` para a ficha de família;
   - faz a entrevista numa só mensagem;
   - redige no registo de advogado, com `[■ VERIFICAR]` nas normas por conferir (US-1.AC-3, US-4.AC-4).
2. Pedir: "Exporta para Word." → **Esperado:** o `.docx` em `.juridico-pt/exportados/` e a entrega com "Confira antes de assinar" e a linha fixa de revisão.
3. Pedir: "I need a residence permit application for a Brazilian employee." → **Esperado:** a ficha de estrangeiros encontrada pelo índice EN e a resposta em inglês (US-5.AC-2, US-5.AC-3).
4. Pedir: "Faz um contrato de trabalho a tempo parcial." → **Esperado:** a ficha TRA-005 com o art. 153.º CT para a forma e o conteúdo e sem o art. 157.º para o trabalho suplementar (US-4.AC-5).
5. Correr `cd mcp-server && npm test` e `python -I skills/juridico-pt/scripts/test_scripts.py`. → **Esperado:** tudo verde, incluindo os T-501 a T-529 (SC-001, SC-003, SC-005).

## Caminho negativo
1. Pedir: "Preciso de uma reclamação de créditos na insolvência." → **Esperado:** o modelo conferido (`obter_modelo`) e não uma ficha (US-2.AC-2).
2. Chamar `obter_ficha` com o código "XYZ-999". → **Esperado:** "Não há a ficha XYZ-999", com 5 sugestões (US-1.AC-4).
3. Pedir: "Cita o art. 157.º do CT para o trabalho suplementar." → **Esperado:** o assistente corrige ou marca `[■ VERIFICAR]` e não o dá como certo (a14).

## Revisão humana (10 fichas)
O revisor abre cada ficha com `obter_ficha`, pede o documento e lê-o como se o fosse assinar. Para cada uma, anota se está OK, se precisa de correções de forma ou se tem um erro jurídico, e se as citações marcadas como conferidas estão certas.

| # | Ficha | Revisor | Resultado | Notas |
|---|---|---|---|---|
| 1 | FAM — regulação das responsabilidades parentais | | | |
| 2 | EST — autorização de residência | | | |
| 3 | ADM — audiência prévia | | | |
| 4 | SAU — reclamação à ERS | | | |
| 5 | DES — contrato de trabalho desportivo | | | |
| 6 | URB — comunicação prévia | | | |
| 7 | TRA-005 — contrato a tempo parcial (corrigida) | | | |
| 8 | CIV — a ficha com mais citações corrigidas | | | |
| 9 | PEN — uma ficha de direito penal | | | |
| 10 | DIG — uma ficha de proteção de dados | | | |

Um erro jurídico encontrado volta à revisão de citações dessa área e passa a caso de regressão `r07+`.

## Concluído quando
- [ ] O caminho feliz produz os resultados esperados.
- [ ] O caminho negativo é tratado de forma controlada.
- [ ] A revisão humana das 10 fichas não encontra erros jurídicos por corrigir.
- [ ] Os SC-001 a SC-005 são observavelmente cumpridos (o SC-004 pelos resultados da 3.1.0 no `eval-plan.md`).
