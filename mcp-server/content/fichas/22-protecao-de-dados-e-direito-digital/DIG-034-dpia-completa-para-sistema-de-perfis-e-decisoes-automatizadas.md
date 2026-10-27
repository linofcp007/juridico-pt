---
codigo: DIG-034
area: "Proteção de Dados e Direito Digital"
titulo: "DPIA Completa para Sistema de Perfis e Decisões Automatizadas"
titulo_en: "Full DPIA for a Profiling and Automated Decision-Making System"
descricao: "Elabora uma Avaliação de Impacto sobre a Proteção de Dados (AIPD/DPIA) completa para sistemas de profiling e decisões automatizadas, seguindo a metodologia do artigo 35.º do RGPD, as Orientações WP248 do CEPD e a metodologia CNIL PIA, com identificação e mitigação de riscos e registo dos resultados para efeitos de responsabilização (art. 5.º, n.º 2 RGPD)."
descricao_en: "Prepares a complete Data Protection Impact Assessment (DPIA/AIPD) for profiling and automated decision-making systems, following the methodology of Article 35 of the GDPR, the EDPB WP248 Guidelines and the CNIL PIA methodology, identifying and mitigating risks and recording the results for accountability purposes (Art. 5(2) GDPR)."
ambito: nacional
estado_citacoes: "conferidas 6 · corrigidas 0 · por conferir 2"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# DPIA Completa para Sistema de Perfis e Decisões Automatizadas

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-034
> **EN:** Full DPIA for a Profiling and Automated Decision-Making System. Prepares a complete Data Protection Impact Assessment (DPIA/AIPD) for profiling and automated decision-making systems, following the methodology of Article 35 of the GDPR, the EDPB WP248 Guidelines and the CNIL PIA methodology, identifying and mitigating risks and recording the results for accountability purposes (Art. 5(2) GDPR).
> **Citações:** conferidas 6 · corrigidas 0 · por conferir 2. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Elabora uma Avaliação de Impacto sobre a Proteção de Dados (AIPD/DPIA) completa para sistemas de profiling e decisões automatizadas, seguindo a metodologia do artigo 35.º do RGPD, as Orientações WP248 do CEPD e a metodologia CNIL PIA, com identificação e mitigação de riscos e registo dos resultados para efeitos de responsabilização (art. 5.º, n.º 2 RGPD).

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Cita artigos reais do RGPD e do AI Act.
— Identifica riscos concretos, não genéricos.
— Cada medida de mitigação deve ser específica e implementável.
— Nunca declares risco residual aceitável sem fundamentação.

## Metodologia DPIA — 7 Etapas

### ETAPA 1 — CONTEXTO E DESCRIÇÃO SISTEMÁTICA
Apresenta dentro de um bloco <contexto_tratamento>:
- Descrição funcional do sistema (o que faz, como funciona)
- Fluxo de dados (recolha → tratamento → saída → conservação → eliminação)
- Responsável, subcontratantes e responsáveis conjuntos
- Base jurídica (art. 6.º e/ou art. 9.º RGPD) e fundamento do interesse legítimo (se aplicável)
- Necessidade e proporcionalidade do tratamento

### ETAPA 2 — CONSULTA AO DPO E PARTES INTERESSADAS
Apresenta dentro de um bloco <consulta_dpo>:
- Parecer do DPO (art. 35.º, n.º 2 RGPD) — [a preencher com input real]
- Necessidade de consulta a titulares ou representantes
- Resultado das consultas realizadas

### ETAPA 3 — DIREITOS DOS TITULARES
Avalia para cada direito (arts. 12.º a 22.º RGPD):
- Mecanismo de exercício disponível
- Prazo de resposta garantido (1 mês, art. 12.º, n.º 3 RGPD)
- Direito específico do art. 22.º (não sujeição a decisão exclusivamente automatizada): como garantido
- Risco de não conformidade identificado

### ETAPA 4 — IDENTIFICAÇÃO DE RISCOS
Para cada risco, preenche a tabela:
| Risco | Probabilidade (1-3) | Gravidade (1-3) | Nível (P×G) | Tipo de titulares afetados |
|-------|--------------------|-----------------|-----------|--------------------------|
| Discriminação algorítmica (viés nos dados de treino) | | | | |
| Decisão errada por falha do modelo | | | | |
| Acesso não autorizado a dados de perfis | | | | |
| Falta de transparência / impossibilidade de contestação | | | | |
| Retenção excessiva de dados de perfis | | | | |
| [outros riscos específicos do sistema] | | | | |

### ETAPA 5 — MEDIDAS DE MITIGAÇÃO
Para cada risco de nível ≥4 (alto):
- Medida técnica específica (ex: auditoria de viés, explainability, cifração)
- Medida organizacional (ex: revisão humana, política de retenção, formação)
- Responsável pela implementação e prazo
- Risco residual após mitigação (nível)

### ETAPA 6 — DECISÃO FINAL
Apresenta dentro de um bloco <decisao_dpia>:
- Risco residual global: ACEITÁVEL / ELEVADO
- Se ELEVADO: obrigação de consulta prévia à CNPD (art. 36.º RGPD) antes de iniciar tratamento
- Condições para inicio do tratamento
- Data de revisão da DPIA (no máximo 2 anos ou quando houver alteração significativa)

### ETAPA 7 — REGISTO E APROVAÇÃO
Apresenta dentro de um bloco <registo_dpia>:
- Data de elaboração
- Versão do documento
- Aprovação do responsável pelo tratamento
- Parecer final do DPO
- Arquivo no registo de tratamentos (art. 30.º RGPD)

---

## DADOS DO SISTEMA A AVALIAR:

- **Nome do sistema/projeto:** [designação]
- **Responsável pelo tratamento:** [organização]
- **DPO:** [nome e contacto]
- **Descrição funcional:** [como o sistema funciona]
- **Dados de entrada (input):** [tipos de dados utilizados]
- **Dados de saída (output/decisão):** [o que o sistema produz]
- **Titulares afetados:** [categorias e volume]
- **Base jurídica:** [artigo RGPD aplicável]
- **Subcontratantes / fornecedores de IA:** [listar]
- **Transferências internacionais:** [sim/não]
- **Medidas técnicas já implementadas:** [listar]
- **Medidas organizacionais já implementadas:** [listar]
- **Consultas realizadas:** [DPO, titulares, outros]
- **Observações:** [qualquer contexto relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 35.º, n.º 2 RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| arts. 12.º a 22.º RGPD | conferida (epígrafe) — Transparência das informações, das comunicações e das regras para exercício dos direitos d |  |
| art. 12.º, n.º 3 RGPD | conferida (epígrafe) — Transparência das informações, das comunicações e das regras para exercício dos direitos d |  |
| art. 22.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 36.º RGPD | conferida (epígrafe) — Consulta prévia |  |
| art. 30.º RGPD | conferida (epígrafe) — Registos das atividades de tratamento |  |
