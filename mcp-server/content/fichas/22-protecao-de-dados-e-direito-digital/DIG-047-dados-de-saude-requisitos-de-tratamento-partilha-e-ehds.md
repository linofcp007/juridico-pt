---
codigo: DIG-047
area: "Proteção de Dados e Direito Digital"
titulo: "Dados de Saúde — Requisitos de Tratamento, Partilha e EHDS"
titulo_en: "Health Data — Requirements for Processing, Sharing and the EHDS"
descricao: "Analisa os requisitos específicos para o tratamento de dados de saúde como categoria especial ao abrigo do artigo 9.º do RGPD, do artigo 28.º da Lei n.º 58/2019, da Lei n.º 12/2005 (informação genética e de saúde), e das regras de partilha no contexto do Espaço Europeu de Dados de Saúde (EHDS, Regulamento UE 2025/327), com atenção a plataformas de saúde digital e investigação clínica."
descricao_en: "Analyses the specific requirements for processing health data as a special category under Article 9 of the GDPR, Article 28 of Law No. 58/2019 and Law No. 12/2005 (genetic and health information), and the sharing rules in the context of the European Health Data Space (EHDS, Regulation (EU) 2025/327), with attention to digital health platforms and clinical research."
ambito: nacional
estado_citacoes: "conferidas 5 · corrigidas 0 · por conferir 8"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Dados de Saúde — Requisitos de Tratamento, Partilha e EHDS

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-047
> **EN:** Health Data — Requirements for Processing, Sharing and the EHDS. Analyses the specific requirements for processing health data as a special category under Article 9 of the GDPR, Article 28 of Law No. 58/2019 and Law No. 12/2005 (genetic and health information), and the sharing rules in the context of the European Health Data Space (EHDS, Regulation (EU) 2025/327), with attention to digital health platforms and clinical research.
> **Citações:** conferidas 5 · corrigidas 0 · por conferir 8. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Analisa os requisitos específicos para o tratamento de dados de saúde como categoria especial ao abrigo do artigo 9.º do RGPD, do artigo 28.º da Lei n.º 58/2019, da Lei n.º 12/2005 (informação genética e de saúde), e das regras de partilha no contexto do Espaço Europeu de Dados de Saúde (EHDS, Regulamento UE 2025/327), com atenção a plataformas de saúde digital e investigação clínica.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Dados de saúde são categoria especial — a exceção ao art. 9.º, n.º 1 RGPD deve ser expressamente identificada.
— O segredo médico coexiste com o RGPD — não se substitui por ele.

## Análise — 5 Etapas

### ETAPA 1 — BASE JURÍDICA
Apresenta dentro de um bloco <base_juridica_saude>:
Identifica a exceção ao art. 9.º, n.º 1 RGPD:
- **Al. a) — Consentimento explícito:** revogável; não deve ser a única base para tratamentos críticos
- **Al. c) — Interesses vitais:** emergências
- **Al. h) — Prestação de cuidados de saúde:** diagnóstico, tratamento, gestão de serviços
- **Al. i) — Saúde pública:** vigilância epidemiológica
- **Al. j) — Investigação:** art. 89.º RGPD + art. 28.º Lei 58/2019
- Art. 7.º Lei n.º 12/2005: acesso à informação de saúde pelo titular ou mandatário

### ETAPA 2 — OBRIGAÇÕES ESPECÍFICAS
Avalia conformidade:
1. Segredo profissional: colaboradores vinculados por confidencialidade (art. 9.º, n.º 3 RGPD)
2. Controlos de acesso: need-to-know + logs auditáveis
3. Segurança reforçada: cifração em repouso e em trânsito
4. Pseudonimização para investigação (art. 89.º + art. 28.º, n.º 3 Lei 58/2019)
5. DPIA obrigatória (dados de saúde em larga escala = critérios WP248 presentes)
6. Direito de acesso: Lei 12/2005 + RGPD [■ VERIFICAR prazo de resposta vigente]

### ETAPA 3 — PARTILHA DE DADOS DE SAÚDE
Regimes de partilha:

**Entre prestadores:**
- Base: continuidade de cuidados (art. 9.º, n.º 2, al. h))
- Instrumento: acordo de responsáveis conjuntos (art. 26.º) ou contrato de subcontratação (art. 28.º)

**Com investigadores:**
- Base: art. 89.º RGPD + art. 28.º Lei 58/2019
- Requisitos: parecer de comissão de ética + pseudonimização + acordo de partilha

**EHDS (Regulamento 2025/327) — utilização secundária:**
- Novos direitos de acesso e portabilidade para titulares
- Infraestrutura HealthData@EU para investigação
- Implementação faseada [■ VERIFICAR prazo PT]

### ETAPA 4 — IA EM SAÚDE (AI Act + MDR)
- IA diagnóstica = alto risco AI Act (Anexo III, ponto 5)
- Software dispositivo médico com IA: MDR (Regulamento 2017/745) + AI Act
- DPIA integrada AI Act + RGPD
- Supervisão humana por profissional de saúde qualificado

### ETAPA 5 — RECOMENDAÇÕES OPERACIONAIS
Apresenta dentro de um bloco <recomendacoes_saude>:
- Política de acesso ao processo clínico com perfis definidos
- Plano de resposta a pedidos de acesso
- Template de acordo de partilha com investigadores
- Violações de dados de saúde: risco elevado presumido → comunicação a titulares
- Revisão semestral dos controlos de acesso

---

## DADOS:

- **Organização:** [nome, tipo de prestador]
- **Dados de saúde tratados:** [tipos]
- **Finalidade(s):** [prestação / investigação / saúde pública]
- **Entidades com acesso:** [profissionais / investigadores / seguradoras / outros]
- **Instrumentos de partilha existentes:** [listar]
- **DPIA realizada:** [sim/não]
- **Sistemas de IA:** [sim/não]
- **Observações:** [contexto]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 9.º, n.º 1 RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 9.º, n.º 1 RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 89.º RGPD | conferida (epígrafe) — Garantias e derrogações relativas ao tratamento para fins de arquivo de interesse público  |  |
| art. 89.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 89.º RGPD | conferida (epígrafe) — Garantias e derrogações relativas ao tratamento para fins de arquivo de interesse público  |  |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 7.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º, n.º 3 RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
