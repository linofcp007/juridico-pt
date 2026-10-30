---
codigo: DIG-047
area: "Proteção de Dados e Direito Digital"
titulo: "Dados de Saúde — Requisitos de Tratamento, Partilha e EHDS"
titulo_en: "Health Data — Requirements for Processing, Sharing and the EHDS"
descricao: "Analisa os requisitos específicos para o tratamento de dados de saúde como categoria especial ao abrigo do artigo 9.º do RGPD, dos artigos 29.º e 31.º da Lei n.º 58/2019, da Lei n.º 12/2005 (informação genética e de saúde), e das regras de partilha no contexto do Espaço Europeu de Dados de Saúde (EHDS, Regulamento UE 2025/327), com atenção a plataformas de saúde digital e investigação clínica."
descricao_en: "Analyses the specific requirements for processing health data as a special category under Article 9 of the GDPR, Articles 29 and 31 of Law No. 58/2019 and Law No. 12/2005 (genetic and health information), and the sharing rules in the context of the European Health Data Space (EHDS, Regulation (EU) 2025/327), with attention to digital health platforms and clinical research."
ambito: nacional
estado_citacoes: "conferidas 7 · corrigidas 0 · por conferir 13"
revisao_tecnica: "2026-10-30 (corrigida)"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Dados de Saúde — Requisitos de Tratamento, Partilha e EHDS

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-047
> **EN:** Health Data — Requirements for Processing, Sharing and the EHDS. Analyses the specific requirements for processing health data as a special category under Article 9 of the GDPR, Articles 29 and 31 of Law No. 58/2019 and Law No. 12/2005 (genetic and health information), and the sharing rules in the context of the European Health Data Space (EHDS, Regulation (EU) 2025/327), with attention to digital health platforms and clinical research.
> **Citações:** conferidas 7 · corrigidas 0 · por conferir 13. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.
> **Revisão técnica:** 2026-10-30 — corrigida (9 correções com fonte). O que mudou e as fontes em `assets/fichas/revisao-tecnica.md`; falta a confirmação de um advogado.

Analisa os requisitos específicos para o tratamento de dados de saúde como categoria especial ao abrigo do artigo 9.º do RGPD, dos artigos 29.º e 31.º da Lei n.º 58/2019, da Lei n.º 12/2005 (informação genética e de saúde), e das regras de partilha no contexto do Espaço Europeu de Dados de Saúde (EHDS, Regulamento UE 2025/327), com atenção a plataformas de saúde digital e investigação clínica.

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
- **Al. j) — Investigação:** art. 89.º RGPD + art. 31.º da Lei n.º 58/2019
- Art. 3.º, n.ºs 2 e 3, da Lei n.º 12/2005: acesso à informação de saúde pelo titular ou por terceiro com o seu consentimento [■ VERIFICAR a redação em vigor do n.º 3 quanto à intermediação por médico (alterações da Lei n.º 26/2016)]

### ETAPA 2 — OBRIGAÇÕES ESPECÍFICAS
Avalia conformidade:
1. Segredo profissional: colaboradores vinculados por confidencialidade (art. 9.º, n.º 3 RGPD e art. 29.º, n.ºs 2 e 4, da Lei n.º 58/2019)
2. Controlos de acesso: princípio da necessidade de conhecer (art. 29.º, n.º 1, da Lei n.º 58/2019) + logs auditáveis; o titular deve ser notificado de qualquer acesso aos seus dados (art. 29.º, n.º 6, da Lei n.º 58/2019)
3. Segurança reforçada: cifração em repouso e em trânsito
4. Anonimização ou pseudonimização para investigação, sempre que os fins o permitam (art. 89.º, n.º 1, RGPD + art. 31.º, n.º 1, da Lei n.º 58/2019)
5. DPIA obrigatória (dados de saúde em larga escala = critérios WP248 presentes)
6. Direito de acesso: Lei 12/2005 + RGPD [■ VERIFICAR prazo de resposta vigente]

### ETAPA 3 — PARTILHA DE DADOS DE SAÚDE
Regimes de partilha:

**Entre prestadores:**
- Base: continuidade de cuidados (art. 9.º, n.º 2, al. h))
- Instrumento: acordo de responsáveis conjuntos (art. 26.º) ou contrato de subcontratação (art. 28.º)

**Com investigadores:**
- Base: art. 89.º RGPD + art. 31.º da Lei n.º 58/2019
- Requisitos: parecer de comissão de ética + pseudonimização + acordo de partilha

**EHDS (Regulamento (UE) 2025/327):**
- Aplicação geral a partir de 26/3/2027, com datas escalonadas (art. 105.º)
- Utilização primária: novos direitos de acesso e portabilidade para titulares, a partir de 26/3/2029 ou 26/3/2031, consoante a categoria de dados
- Utilização secundária (capítulo IV, aplicável a partir de 26/3/2029): infraestrutura HealthData@EU para investigação
- [■ VERIFICAR as entidades designadas em Portugal e a legislação nacional de execução]

### ETAPA 4 — IA EM SAÚDE (AI Act + MDR)
- IA diagnóstica que seja dispositivo médico, ou seu componente de segurança, sujeito a avaliação da conformidade por terceiros = risco elevado (art. 6.º, n.º 1, e anexo I do AI Act), com obrigações aplicáveis a partir de 2/8/2028 (redação do Reg. (UE) 2026/1744); o anexo III, ponto 5, só abrange a elegibilidade para cuidados de saúde públicos, os seguros de saúde e a triagem de emergência (a partir de 2/12/2027)
- Software dispositivo médico com IA: MDR (Regulamento 2017/745) + AI Act
- DPIA integrada AI Act + RGPD
- Supervisão humana por profissional de saúde qualificado

### ETAPA 5 — RECOMENDAÇÕES OPERACIONAIS
Apresenta dentro de um bloco <recomendacoes_saude>:
- Política de acesso ao processo clínico com perfis definidos
- Plano de resposta a pedidos de acesso
- Template de acordo de partilha com investigadores
- Violações de dados de saúde: não há presunção legal; avaliar o risco caso a caso, que tende a ser elevado → comunicação a titulares (art. 34.º RGPD), salvo as exceções do art. 34.º, n.º 3
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
| art. 89.º RGPD | conferida (epígrafe) — Garantias e derrogações relativas ao tratamento para fins de arquivo de interesse público  |  |
| art. 31.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 31.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 31.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 3.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º, n.º 3 RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 29.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 29.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 29.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 89.º, n.º 1, RGPD | conferida (epígrafe) — Garantias e derrogações relativas ao tratamento para fins de arquivo de interesse público  |  |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 105.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
