---
description: Obtém um modelo conferido ou um template de documento pelo nome. Fetches a verified model or a document template by name.
argument-hint: "[nome, ex.: contrato-de-honorarios ou nda-bilingue]"
---

Segue o fluxo de redação do skill `juridico-pt` (`assets/redacao/redator.md`) com o documento indicado em $ARGUMENTS.

- **Modelo conferido** (ver `listar_modelos`): abre-o com `obter_modelo` (`nome`, ex.: `contrato-de-honorarios`; por defeito as secções 1, 2, 3 e 7).
- **Template** (ver `listar_templates`): usa `obter_template` (`nome`, ex.: `requerimento-injuncao`, `nda-bilingue`). Os nomes dos templates substituídos na 3.0 continuam a funcionar e abrem o modelo que os substitui.
- **Sem MCP:** lê o ficheiro em `assets/modelos/` ou `assets/templates/`.

Se o nome não existir, lista os disponíveis. Preenche as variáveis com os dados do caso, marca o que faltar com `[■ CONFIRMAR: …]` e gera o Word com `exportar_documento`.

**EN:** Follow the drafting flow of the `juridico-pt` skill (`assets/redacao/redator.md`) with the document named in $ARGUMENTS: a verified model via `obter_modelo` (see `listar_modelos`) or a template via `obter_template` (see `listar_templates`; an old name replaced in 3.0 opens the replacing model). Without MCP, read `assets/modelos/` or `assets/templates/`. Fill the variables, mark what is missing with `[■ CONFIRMAR: …]` and export with `exportar_documento`.

*Exemplos · Examples: "dá-me o modelo do contrato de honorários", "fetch the requerimento-injuncao template".*
