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
Desde a 3.1.1, as 10 fichas já tiveram revisão técnica: o regime, os prazos e as entidades foram confirmados na fonte oficial. O que mudou, com a fonte de cada correção, e os pontos para o advogado confirmar estão em `skills/juridico-pt/assets/fichas/revisao-tecnica.md`. O revisor:
1. lê, para cada ficha, a secção do relatório e confirma os pontos indicados (cerca de 2 a 4 por ficha);
2. abre a ficha com `obter_ficha`, pede o documento e lê-o como se o fosse assinar;
3. anota se está OK, se precisa de correções de forma ou se tem um erro jurídico.

| # | Ficha | Revisão técnica (3.1.1) | Revisor | Resultado | Notas |
|---|---|---|---|---|---|
| 1 | FAM-006 — regulação das responsabilidades parentais | corrigida, 11 correções, 4 pontos | | | |
| 2 | EST-003 — autorização de residência para atividade profissional | corrigida, 12 correções, 4 pontos | | | |
| 3 | ADM-002 — exercício do direito de audiência prévia | corrigida, 1 correção, 3 pontos | | | |
| 4 | SAU-003 — reclamação prévia a estabelecimento de saúde | corrigida, 6 correções, 4 pontos | | | |
| 5 | DES-001 — contrato de trabalho desportivo de praticante profissional | corrigida, 22 correções, 4 pontos | | | |
| 6 | URB-002 — comunicação prévia de obras | corrigida, 10 correções, 4 pontos | | | |
| 7 | TRA-005 — contrato a tempo parcial (corrigida: 153.º, 154.º e 227.º CT) | corrigida, 13 correções, 3 pontos | | | |
| 8 | CIV-006 — contrato de comodato (12 citações corrigidas, a CIV com mais) | corrigida, 10 correções, 2 pontos | | | |
| 9 | PEN-029 — crimes económicos: insolvência dolosa (7 corrigidas, artigos deslocados) | corrigida, 11 correções, 3 pontos | | | |
| 10 | DIG-015 — aviso de privacidade para trabalhadores (3 corrigidas, 10 por conferir) | corrigida, 8 correções, 4 pontos | | | |

Um erro jurídico encontrado volta à revisão de citações dessa área e passa a caso de regressão `r07+`.

## Fichas para revisão de fundo (levantadas pela revisão das citações)
A revisão por agentes decidiu o número de cada artigo; nestas fichas o problema era o regime, não o número. **Na 3.1.1 tiveram revisão técnica:** todas foram corrigidas na fonte oficial, e a COM-048 ficou "rever de raiz". O detalhe está em `revisao-tecnica.md`. Falta a confirmação de um advogado da casa, sobretudo na COM-048. Os problemas encontrados foram estes:
- **PI-014, PI-015, PI-028, PI-029, PI-041, PI-055 (software):** tiram o regime do CDADC quando está no DL 252/94, e dão a obra por encomenda ao empregador.
- **PI-018, PI-021, PI-036, PI-037 (CPI):** numeração do CPI de 2003 (338.º-A a 338.º-N, 317.º).
- **TRA-041:** assenta no banco de horas individual, revogado pela Lei 93/2019. **TRA-042:** comunicação da isenção de horário à ACT, regra do CT de 2003.
- **SUC-035:** ignora a renúncia à condição de herdeiro legitimário entre cônjuges (Lei 48/2018). **SUC-001, SUC-035, SUC-037:** figuras do direito brasileiro (inalienabilidade, usufruto vidual).
- **COM-048:** assenta numa preferência legal dos sócios na cessão de quotas que a lei não prevê.
- **INS-012, INS-013, INS-030:** exoneração do passivo restante com o período de cessão de 5 anos (3 desde a Lei 9/2022). **INS-004, 005, 006, 022, 024:** PER/PEAP com a numeração deslocada.
- **URB-002, URB-003, URB-027, URB-040:** RJUE anterior ao DL 136/2014 e ao DL 10/2024 (autorização de utilização). **URB-011, URB-058:** classificação de contraordenações que o art. 98.º RJUE não faz.
- **ADM-052:** silêncio tratado como indeferimento tácito (regime anterior ao CPA de 2015).
- **FIS-033, FIS-037:** RNH dado como em vigor (revogado pela Lei 82/2023).

## Concluído quando
- [ ] O caminho feliz produz os resultados esperados.
- [ ] O caminho negativo é tratado de forma controlada.
- [ ] A revisão humana das 10 fichas não encontra erros jurídicos por corrigir.
- [ ] Os SC-001 a SC-005 são observavelmente cumpridos (o SC-004 pelos resultados da 3.1.0 no `eval-plan.md`).
