---
codigo: DIG-036
area: "Proteção de Dados e Direito Digital"
titulo: "Notificação de Violação de Dados à CNPD — Prazo de 72 Horas (Guião Operacional)"
titulo_en: "Data Breach Notification to the CNPD — 72-Hour Deadline (Operational Guide)"
descricao: "Guião operacional passo a passo para gerir e notificar uma violação de dados pessoais à CNPD dentro do prazo de 72 horas estabelecido no artigo 33.º do RGPD, com estruturação dos elementos obrigatórios da notificação, avaliação do risco para os titulares e registo interno do incidente nos termos da Lei n.º 58/2019, de 8 de agosto (lei de execução do RGPD em Portugal)."
descricao_en: "Step-by-step operational guide for managing and notifying a personal data breach to the CNPD within the 72-hour deadline set by Article 33 of the GDPR, structuring the mandatory elements of the notification, the assessment of the risk to data subjects and the internal record of the incident under Law No. 58/2019 of 8 August (Portugal's GDPR implementing law)."
ambito: nacional
estado_citacoes: "conferidas 7 · corrigidas 0 · por conferir 0"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Notificação de Violação de Dados à CNPD — Prazo de 72 Horas (Guião Operacional)

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-036
> **EN:** Data Breach Notification to the CNPD — 72-Hour Deadline (Operational Guide). Step-by-step operational guide for managing and notifying a personal data breach to the CNPD within the 72-hour deadline set by Article 33 of the GDPR, structuring the mandatory elements of the notification, the assessment of the risk to data subjects and the internal record of the incident under Law No. 58/2019 of 8 August (Portugal's GDPR implementing law).
> **Citações:** conferidas 7 · corrigidas 0 · por conferir 0. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Guião operacional passo a passo para gerir e notificar uma violação de dados pessoais à CNPD dentro do prazo de 72 horas estabelecido no artigo 33.º do RGPD, com estruturação dos elementos obrigatórios da notificação, avaliação do risco para os titulares e registo interno do incidente nos termos da Lei n.º 58/2019, de 8 de agosto (lei de execução do RGPD em Portugal).

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— O prazo de 72 horas conta a partir do momento em que o responsável tiver CONHECIMENTO da violação (art. 33.º, n.º 1 RGPD) — não da sua ocorrência.
— Se a notificação não for possível nas 72 horas, deve ser acompanhada de justificação do atraso.
— A notificação pode ser feita em fases (phased notification) se nem todos os elementos estiverem disponíveis.
— Nunca declares "risco improvável para titulares" sem fundamentação — o ónus da prova é do responsável.

## Guião de Gestão de Incidente — 6 Fases

### FASE 1 — CONTENÇÃO IMEDIATA (0-4 horas)
Apresenta dentro de um bloco <contencao_imediata>:
- Medidas de contenção já tomadas ou a tomar (isolar sistema, revogar acessos, preservar logs)
- Equipa de resposta ativada (DPO, TI, jurídico, comunicação)
- Hora e modo de deteção da violação
- Fonte da violação (interna, externa, subcontratante)
- Estimativa inicial de dados e titulares afetados

### FASE 2 — AVALIAÇÃO DO RISCO (4-24 horas)
Apresenta dentro de um bloco <avaliacao_risco>:
- Tipo de violação: confidencialidade / integridade / disponibilidade (ou combinação)
- Categorias de dados comprometidos (incluindo categorias especiais art. 9.º RGPD)
- Volume de titulares afetados (estimativa)
- Probabilidade de utilização indevida dos dados
- Consequências prováveis para os titulares (dano financeiro, discriminação, estigma, etc.)
- Nível de risco: IMPROVÁVEL / PROVÁVEL / ELEVADO

### FASE 3 — DECISÃO DE NOTIFICAÇÃO
Apresenta dentro de um bloco <decisao_notificacao>:
- **Notificação à CNPD obrigatória** (art. 33.º RGPD): sempre, exceto se improvável que resulte risco para titulares
- **Comunicação aos titulares obrigatória** (art. 34.º RGPD): se risco ELEVADO para direitos e liberdades
- Prazo para notificação à CNPD: [calcular 72h a partir da hora de conhecimento]
- Se notificação após 72h: justificação do atraso a incluir obrigatoriamente

### FASE 4 — RASCUNHO DA NOTIFICAÇÃO À CNPD
Redige notificação completa com os elementos do art. 33.º, n.º 3 RGPD:

**NOTIFICAÇÃO DE VIOLAÇÃO DE DADOS PESSOAIS**
**À: Comissão Nacional de Proteção de Dados (CNPD)**
**Via: Portal CNPD ou notificacoes@cnpd.pt [■ VERIFICAR canal atual]**

**1. Natureza da violação:**
[Descrição factual do incidente — o quê, quando, como]

**2. Categorias e número aproximado de titulares:**
[Categorias de pessoas afetadas e estimativa de volume]

**3. Categorias e número aproximado de registos:**
[Tipos de dados comprometidos e estimativa de volume]

**4. Nome e contacto do DPO ou ponto de contacto:**
[Nome, cargo, email, telefone]

**5. Consequências prováveis da violação:**
[Análise de riscos para os titulares]

**6. Medidas tomadas ou propostas:**
[Contenção, mitigação, medidas preventivas futuras]

**Data e hora da notificação:** [dd/mm/aaaa hh:mm]
**Data e hora do conhecimento da violação:** [dd/mm/aaaa hh:mm]
**[Se após 72h] Justificação do atraso:** [fundamentação]

### FASE 5 — COMUNICAÇÃO AOS TITULARES (se necessária)
Redige comunicação aos titulares com os elementos do art. 34.º, n.º 2 RGPD:
- Linguagem clara e simples (não técnica)
- Descrição da natureza da violação
- Contacto do DPO
- Consequências prováveis
- Medidas tomadas e recomendações ao titular

### FASE 6 — REGISTO INTERNO (art. 33.º, n.º 5 RGPD)
Apresenta dentro de um bloco <registo_interno>:
- Modelo de ficha de registo do incidente
- Elementos mínimos: data/hora deteção e conhecimento, descrição, análise de risco, decisão de notificação, documentos enviados, medidas tomadas, data de encerramento
- Arquivo obrigatório mesmo quando a notificação for dispensada

---

## DADOS DO INCIDENTE:

- **Organização:** [nome e setor]
- **DPO:** [nome e contacto]
- **Data/hora de deteção:** [dd/mm/aaaa hh:mm]
- **Data/hora de conhecimento pelo responsável:** [dd/mm/aaaa hh:mm]
- **Descrição do incidente:** [o que aconteceu]
- **Causa provável:** [ataque externo / erro humano / falha técnica / subcontratante / roubo / perda]
- **Dados comprometidos:** [tipos de dados afetados]
- **Titulares afetados:** [categorias e número estimado]
- **Medidas já tomadas:** [listar]
- **Subcontratante envolvido:** [sim/não — se sim, identificar]
- **Notificação do subcontratante recebida:** [sim/não — se sim, quando]
- **Observações:** [qualquer informação relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 33.º, n.º 1 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 9.º RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 33.º RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 34.º RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
| art. 33.º, n.º 3 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 34.º, n.º 2 RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
| art. 33.º, n.º 5 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
