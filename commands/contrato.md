---
description: Redige ou revê um contrato a partir do modelo conferido ou do template. Drafts or reviews a contract from a verified model or template.
argument-hint: "[tipo de contrato]"
---

Segue o fluxo de redação do skill `juridico-pt` (`assets/redacao/redator.md`) para redigir ou rever o contrato em $ARGUMENTS.

- **Há modelo conferido** (contrato de honorários, prestação de serviços, arrendamento para habitação, confissão de dívida e acordo de pagamento, acordo de revogação…): vê `listar_modelos` e abre-o com `obter_modelo` (secções 1, 2, 3 e 7 para as perguntas; `[4, 5]` para redigir). Faz todas as perguntas numa só mensagem, redige em Marcação Redator, corre `verificar_redacao` e gera o Word com `exportar_documento`. Só cita a fundamentação da secção 5; o resto leva `[■ VERIFICAR]`.
- **Não há modelo** (ex.: `contrato-prestacao-servicos-ti`, `nda-bilingue`, `contrato-promessa-compra-venda`): parte do template via `obter_template` e diz numa linha o que ele não cobre.
- **Revisão:** aplica a `checklist-revisao-contrato` (via `obter_checklist`) ou o subagente `revisor-contratos`.

A entrega fecha com "Confira antes de assinar" e a linha fixa de revisão.

**EN:** Follow the drafting flow of the `juridico-pt` skill (`assets/redacao/redator.md`) to draft or review the contract in $ARGUMENTS. With a verified model, use `listar_modelos` / `obter_modelo` (sections 1, 2, 3, 7 for the questions; `[4, 5]` to draft), ask everything in one message, draft in Marcação Redator, run `verificar_redacao` and export with `exportar_documento`; cite only the model's section 5. Without a model, start from the template via `obter_template`. For a review, apply `checklist-revisao-contrato` (via `obter_checklist`) or the `revisor-contratos` subagent.

*Exemplos · Examples: "faz um contrato de honorários", "preciso de um NDA para um freelancer", "I need a services agreement".*
