---
codigo: DIG-043
area: "Proteção de Dados e Direito Digital"
titulo: "Tratamento de Dados Biométricos — Conformidade RGPD e Requisitos Específicos"
titulo_en: "Processing of Biometric Data — GDPR Compliance and Specific Requirements"
descricao: "Analisa a conformidade do tratamento de dados biométricos (impressões digitais, reconhecimento facial, voz, geometria da mão) com o artigo 9.º do RGPD (categorias especiais de dados), as orientações WP29 e do CEPD sobre dados biométricos, os requisitos específicos da Lei n.º 58/2019 (artigo 28.º), e as implicações da utilização de sistemas de reconhecimento biométrico ao abrigo do AI Act (Regulamento UE 2024/1689)."
descricao_en: "Analyses the compliance of processing biometric data (fingerprints, facial recognition, voice, hand geometry) with Article 9 of the GDPR (special categories of data), the WP29 and EDPB guidance on biometric data, the specific requirements of Law No. 58/2019 (Article 28), and the implications of using biometric recognition systems under the AI Act (Regulation (EU) 2024/1689)."
ambito: nacional
estado_citacoes: "conferidas 3 · corrigidas 0 · por conferir 5"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Tratamento de Dados Biométricos — Conformidade RGPD e Requisitos Específicos

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-043
> **EN:** Processing of Biometric Data — GDPR Compliance and Specific Requirements. Analyses the compliance of processing biometric data (fingerprints, facial recognition, voice, hand geometry) with Article 9 of the GDPR (special categories of data), the WP29 and EDPB guidance on biometric data, the specific requirements of Law No. 58/2019 (Article 28), and the implications of using biometric recognition systems under the AI Act (Regulation (EU) 2024/1689).
> **Citações:** conferidas 3 · corrigidas 0 · por conferir 5. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Analisa a conformidade do tratamento de dados biométricos (impressões digitais, reconhecimento facial, voz, geometria da mão) com o artigo 9.º do RGPD (categorias especiais de dados), as orientações WP29 e do CEPD sobre dados biométricos, os requisitos específicos da Lei n.º 58/2019 (artigo 28.º), e as implicações da utilização de sistemas de reconhecimento biométrico ao abrigo do AI Act (Regulamento UE 2024/1689).

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Dados biométricos para identificação única são categoria especial — a proibição de tratamento do art. 9.º, n.º 1 RGPD aplica-se salvo exceção expressamente prevista.
— A exceção mais comum (consentimento) é problemática no contexto laboral — analisa sempre a questão do consentimento livre em relações assimétricas.
— O reconhecimento facial em tempo real em espaços públicos é proibido pelo AI Act (art. 5.º) com exceções muito estritas.

## Análise de Conformidade — 5 Etapas

### ETAPA 1 — QUALIFICAÇÃO DOS DADOS
Apresenta dentro de um bloco <qualificacao_dados>:
- Tipo de dado biométrico: impressão digital / reconhecimento facial / reconhecimento de voz / geometria da mão / padrão da íris / outro
- Finalidade do tratamento biométrico: identificação única vs. verificação (autenticação)
- Os dados são tratados **para identificar de forma unívoca** uma pessoa? → art. 9.º RGPD aplicável
- Formato dos dados: imagem bruta vs. template matemático (a conversão em template não desqualifica como dado biométrico — WP193)

### ETAPA 2 — EXCEÇÃO HABILITANTE (art. 9.º, n.º 2 RGPD + art. 28.º Lei 58/2019)
Identifica a exceção aplicável:
- **Al. a) — Consentimento explícito:** problemático em contexto laboral (desequilíbrio de poder — WP29/CEPD); inválido se não houver alternativa real ao tratamento biométrico
- **Al. b) — Obrigações de direito do trabalho/segurança social:** exige norma legal específica PT que o preveja — [■ VERIFICAR se existe para biometria laboral]
- **Al. g) — Interesse público:** aplicável a entidades públicas com base jurídica adequada
- **Al. h) — Prestação de cuidados de saúde:** para biometria em contexto clínico
- **Art. 28.º Lei 58/2019:** condições adicionais PT para tratamento de dados biométricos [■ VERIFICAR redação vigente]

### ETAPA 3 — DPIA OBRIGATÓRIA
Apresenta dentro de um bloco <dpia_obrigatoria>:
- Tratamento de dados biométricos = critério WP248 n.º 4 (dados sensíveis) → dois critérios presentes se houver monitorização sistemática (n.º 3) → DPIA obrigatória
- Consta da lista CNPD de tratamentos que exigem DPIA [■ VERIFICAR lista vigente]
- Elementos específicos da DPIA para biometria:
  - Riscos de segurança: os dados biométricos são imutáveis — comprometimento é permanente
  - Risco de missioncreep: utilização para finalidades além da original
  - Risco de acesso não autorizado ao sistema biométrico
  - Medidas: armazenamento só de templates cifrados (nunca imagem bruta), chaves detidas pelo responsável, isolamento de rede

### ETAPA 4 — AI ACT PARA RECONHECIMENTO BIOMÉTRICO
Avalia a aplicabilidade do AI Act (Regulamento UE 2024/1689):

**PROIBIDO (art. 5.º AI Act):**
- Identificação biométrica remota em **tempo real** em espaços públicos para fins de aplicação da lei (com exceções muito estritas: terrorismo, desaparecidos, crimes graves — autorização judicial prévia)
- Categorização biométrica para inferir características sensíveis (raça, orientação sexual, convicções políticas)
- Identificação biométrica remota a **posteriori** por autoridades de aplicação da lei (exceto autorização judicial + casos específicos)

**ALTO RISCO (Anexo III, ponto 1 AI Act):**
- Sistemas de identificação biométrica remota em tempo real (quando permitidos — exceções)
- Sistemas de categorização biométrica
- Reconhecimento de emoções em locais de trabalho ou educação → PROIBIDO (art. 5.º, n.º 1, al. f))

### ETAPA 5 — REQUISITOS OPERACIONAIS
Apresenta dentro de um bloco <requisitos_operacionais>:
- **Minimização:** utilizar apenas o necessário — template vs. imagem bruta; sem retenção além do necessário
- **Segurança técnica:** cifração do template, controlo de acesso estrito, registos de auditoria
- **Alternativa ao tratamento biométrico:** deve existir alternativa disponível para quem não consinta
- **Informação aos titulares:** aviso de privacidade específico para dados biométricos
- **Consulta de trabalhadores/representantes:** recomendada antes de implementar no contexto laboral
- **Eliminação:** plano de eliminação segura de templates quando o tratamento cessar ou o titular sair

---

## DADOS DO SISTEMA:

- **Organização:** [nome e setor]
- **Tipo de dado biométrico:** [impressão digital / facial / voz / outro]
- **Finalidade:** [controlo de acesso / registo de ponto / autenticação app / videovigilância avançada]
- **Contexto:** [laboral / público / saúde / comercial]
- **Número de titulares:** [estimativa]
- **Fornecedor do sistema:** [nome]
- **Dados armazenados:** [imagem bruta / template / ambos]
- **Alternativa disponível:** [sim/não]
- **DPIA realizada:** [sim/não]
- **Observações:** [contexto adicional]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 9.º, n.º 1 RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 9.º, n.º 2 RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
