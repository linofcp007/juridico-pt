---
codigo: DIG-037
area: "Proteção de Dados e Direito Digital"
titulo: "Transferência Internacional de Dados — Análise de Salvaguardas Pós-Schrems II"
titulo_en: "International Data Transfers — Post-Schrems II Safeguards Analysis"
descricao: "Analisa a legalidade de uma transferência internacional de dados pessoais para países terceiros à luz dos artigos 44.º a 49.º do RGPD, tendo em conta o impacto do Acórdão Schrems II (C-311/18) do TJUE, as Orientações CEPD 05/2021 sobre transferências, o EU-US Data Privacy Framework (Decisão de Adequação de 2023), as Cláusulas Contratuais-Tipo (SCCs) aprovadas pela Decisão da Comissão 2021/914, e a avaliação do nível de proteção do país de destino (Transfer Impact Assessment — TIA)."
descricao_en: "Analyses the lawfulness of an international transfer of personal data to third countries in light of Articles 44 to 49 of the GDPR, taking into account the impact of the CJEU's Schrems II judgment (C-311/18), EDPB Guidelines 05/2021 on transfers, the EU-US Data Privacy Framework (2023 Adequacy Decision), the Standard Contractual Clauses (SCCs) approved by Commission Decision 2021/914, and the assessment of the level of protection in the destination country (Transfer Impact Assessment — TIA)."
ambito: nacional
estado_citacoes: "conferidas 6 · corrigidas 0 · por conferir 1"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Transferência Internacional de Dados — Análise de Salvaguardas Pós-Schrems II

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-037
> **EN:** International Data Transfers — Post-Schrems II Safeguards Analysis. Analyses the lawfulness of an international transfer of personal data to third countries in light of Articles 44 to 49 of the GDPR, taking into account the impact of the CJEU's Schrems II judgment (C-311/18), EDPB Guidelines 05/2021 on transfers, the EU-US Data Privacy Framework (2023 Adequacy Decision), the Standard Contractual Clauses (SCCs) approved by Commission Decision 2021/914, and the assessment of the level of protection in the destination country (Transfer Impact Assessment — TIA).
> **Citações:** conferidas 6 · corrigidas 0 · por conferir 1. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Analisa a legalidade de uma transferência internacional de dados pessoais para países terceiros à luz dos artigos 44.º a 49.º do RGPD, tendo em conta o impacto do Acórdão Schrems II (C-311/18) do TJUE, as Orientações CEPD 05/2021 sobre transferências, o EU-US Data Privacy Framework (Decisão de Adequação de 2023), as Cláusulas Contratuais-Tipo (SCCs) aprovadas pela Decisão da Comissão 2021/914, e a avaliação do nível de proteção do país de destino (Transfer Impact Assessment — TIA).

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Nunca afirmes que uma transferência é legal com base apenas na presença de SCCs sem TIA.
— Distingue entre decisão de adequação, SCCs, BCRs, derrogações e outras salvaguardas.
— Sinaliza [■ VERIFICAR] quando a informação sobre a legislação do país de destino for incompleta.

## Análise de Transferência Internacional — 5 Etapas

### ETAPA 1 — MAPEAMENTO DA TRANSFERÊNCIA
Apresenta dentro de um bloco <mapeamento_transferencia>:
- Países de origem e destino dos dados
- Entidades envolvidas (responsável, subcontratante, destinatário)
- Dados pessoais transferidos (categorias, volume, frequência)
- Finalidade da transferência
- Base jurídica do tratamento subjacente (art. 6.º RGPD)
- Existência de acesso remoto vs. transferência formal (distinção relevante pós-Schrems II)

### ETAPA 2 — MECANISMO DE TRANSFERÊNCIA APLICÁVEL
Avalia pela hierarquia do RGPD:

**A) Decisão de Adequação (art. 45.º RGPD):**
- Países com adequação plena: [listar países com decisão vigente — Reino Unido, Suíça, Japão, Coreia, Nova Zelândia, EUA (DPF — apenas para empresas certificadas), etc.]
- Para EUA: verificar se a empresa destinatária está certificada no EU-US DPF (https://www.dataprivacyframework.gov)
- Limitações da adequação (ex: adequação parcial por setores)

**B) Salvaguardas Adequadas (art. 46.º RGPD):**
- SCCs 2021 (Decisão 2021/914): módulo aplicável (C→C, C→Sub, Sub→C, Sub→Sub)
- Regras Vinculativas de Empresas (BCRs, art. 47.º RGPD)
- Código de conduta aprovado + garantias do destinatário
- Mecanismo de certificação aprovado

**C) Derrogações para situações específicas (art. 49.º RGPD):**
- Consentimento explícito e informado do titular
- Necessidade contratual
- Razões de interesse público
- Interesse vital do titular
- [Apenas para transferências não repetitivas e em casos excecionais]

### ETAPA 3 — TRANSFER IMPACT ASSESSMENT (TIA)
Avalia o nível de proteção no país de destino:
- Legislação de vigilância/acesso governamental (ex: FISA 702, EO 14086 para EUA; NSL)
- Direitos dos titulares reconhecidos no país de destino
- Existência de APD independente e recursos efetivos
- Historial de pedidos de acesso governamental no setor
- Natureza dos dados (dados mais sensíveis exigem análise mais aprofundada)

**Resultado TIA:** ADEQUADO / ADEQUADO COM MEDIDAS SUPLEMENTARES / INADEQUADO

### ETAPA 4 — MEDIDAS SUPLEMENTARES (se TIA = adequado com medidas)
Categorias de medidas conforme Orientações CEPD 05/2021:
- **Técnicas:** cifração ponta-a-ponta com chaves detidas pelo exportador, pseudonimização, acesso apenas a dados cifrados
- **Contratuais:** cláusulas de notificação de pedidos de acesso governamental, direito de auditoria, obrigação de contestar pedidos excessivos
- **Organizacionais:** políticas de minimização de dados, limitação de acessos, formação

### ETAPA 5 — CONCLUSÃO E DOCUMENTAÇÃO
Apresenta dentro de um bloco <conclusao_tia>:
- Mecanismo de transferência legal identificado
- TIA resultado e medidas suplementares adotadas
- Documentação a arquivar (contrato SCCs assinado, TIA, registo de transferências)
- Obrigação de atualização periódica da TIA
- Referência ao registo de transferências (art. 30.º RGPD)

---

## DADOS DA TRANSFERÊNCIA:

- **Organização exportadora:** [nome, país]
- **Destinatário:** [nome, país de destino, tipo de entidade]
- **Dados transferidos:** [categorias e volume]
- **Finalidade:** [descrever]
- **Mecanismo já em vigor:** [SCCs / adequação / BCRs / nenhum]
- **País de destino:** [país]
- **Existe DPF / adequação para o país:** [sim/não/parcial]
- **Dados de categorias especiais (art. 9.º)?** [sim/não]
- **Frequência da transferência:** [contínua / pontual / regular]
- **Observações:** [qualquer contexto relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 6.º RGPD | conferida (índice) |  |
| art. 45.º RGPD | conferida (epígrafe) — Transferências com base numa decisão de adequação |  |
| art. 46.º RGPD | conferida (epígrafe) — Transferências sujeitas a garantias adequadas |  |
| art. 47.º RGPD | conferida (epígrafe) — Regras vinculativas aplicáveis às empresas |  |
| art. 49.º RGPD | conferida (epígrafe) — Derrogações para situações específicas |  |
| art. 30.º RGPD | conferida (epígrafe) — Registos das atividades de tratamento |  |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
