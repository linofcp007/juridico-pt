---
description: Arrendamento — referência, contrato habitacional e atualização de renda. Tenancy — reference, residential lease and rent-update letter.
argument-hint: "[questão de arrendamento]"
---

Ativa a skill `juridico-pt` para a questão de arrendamento em $ARGUMENTS.

Lê a referência `arrendamento` (via tool MCP `ler_referencia` com `nome: arrendamento`) — regime do NRAU, prazos, denúncia, oposição à renovação e despejo. Para documentos, usa o modelo conferido `contrato-de-arrendamento-habitacional` (via `obter_modelo`, novo contrato) ou o template `carta-atualizacao-renda` (via `obter_template`) (atualização anual de renda pelo coeficiente do IHRU).

**EN:** Activate the `juridico-pt` skill for the tenancy matter in $ARGUMENTS. Read the `arrendamento` reference (via the `ler_referencia` MCP tool with `nome: arrendamento`) — NRAU regime, deadlines, termination, opposition to renewal and eviction. For documents, use the verified model `contrato-de-arrendamento-habitacional` (via `obter_modelo`, new lease) or the `carta-atualizacao-renda` template (via `obter_template`) (annual rent update by the IHRU coefficient).

*Exemplos · Examples: "o senhorio quer aumentar a renda", "landlord wants to raise the rent".*
