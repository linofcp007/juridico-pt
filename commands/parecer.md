---
description: Produz um parecer jurídico estruturado, no registo de advogado. Produces a structured legal opinion in a lawyer's register.
argument-hint: "[descrição da situação]"
---

Segue o skill `redator-juridico` para um parecer sobre a situação em $ARGUMENTS, com a estrutura Da Consulta / Dos Factos / Da Fundamentação / Da Conclusão e o fecho "É este, salvo melhor opinião, o nosso parecer." (formato de parecer do `SKILL.md` do `juridico-pt`: SITUAÇÃO · ENQUADRAMENTO · POSIÇÃO · OPÇÕES · RECOMENDAÇÃO · PRAZOS).

Parte do template `parecer-juridico` (via tool MCP `obter_template` com `nome: parecer-juridico`, ou lê `assets/templates/parecer-juridico.md`). Cita diplomas e artigos com rigor; o que não estiver confirmado leva `[■ VERIFICAR]`. Gera o Word com `exportar_documento` (Marcação Redator, `@@TIPO: parecer`).

**EN:** Follow the `redator-juridico` skill for an opinion on the situation in $ARGUMENTS (Consulta / Factos / Fundamentação / Conclusão, closing "É este, salvo melhor opinião, o nosso parecer."). Start from the `parecer-juridico` template via `obter_template`; cite precisely and mark anything unconfirmed with `[■ VERIFICAR]`; export with `exportar_documento` (`@@TIPO: parecer`).

*Exemplos · Examples: "preciso de um parecer sobre rescindir este contrato", "give me a written legal opinion on this dispute".*
