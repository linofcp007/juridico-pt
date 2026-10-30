---
codigo: DIG-043
area: "Proteção de Dados e Direito Digital"
titulo: "Tratamento de Dados Biométricos — Conformidade RGPD e Requisitos Específicos"
titulo_en: "Processing of Biometric Data — GDPR Compliance and Specific Requirements"
descricao: "Analisa a conformidade do tratamento de dados biométricos (impressões digitais, reconhecimento facial, voz, geometria da mão) com o artigo 9.º do RGPD (categorias especiais de dados), as orientações WP29 e do CEPD sobre dados biométricos, os requisitos específicos da Lei n.º 58/2019 (artigo 28.º), e as implicações da utilização de sistemas de reconhecimento biométrico ao abrigo do AI Act (Regulamento UE 2024/1689)."
descricao_en: "Analyses the compliance of processing biometric data (fingerprints, facial recognition, voice, hand geometry) with Article 9 of the GDPR (special categories of data), the WP29 and EDPB guidance on biometric data, the specific requirements of Law No. 58/2019 (Article 28), and the implications of using biometric recognition systems under the AI Act (Regulation (EU) 2024/1689)."
ambito: nacional
estado_citacoes: "conferidas 6 · corrigidas 0 · por conferir 9"
revisao_tecnica: "2026-10-30 (corrigida)"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Tratamento de Dados Biométricos — Conformidade RGPD e Requisitos Específicos

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-043
> **EN:** Processing of Biometric Data — GDPR Compliance and Specific Requirements. Analyses the compliance of processing biometric data (fingerprints, facial recognition, voice, hand geometry) with Article 9 of the GDPR (special categories of data), the WP29 and EDPB guidance on biometric data, the specific requirements of Law No. 58/2019 (Article 28), and the implications of using biometric recognition systems under the AI Act (Regulation (EU) 2024/1689).
> **Citações:** conferidas 6 · corrigidas 0 · por conferir 9. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.
> **Revisão técnica:** 2026-10-30 — corrigida (7 correções com fonte). O que mudou e as fontes em `assets/fichas/revisao-tecnica.md`; falta a confirmação de um advogado.

Analisa a conformidade do tratamento de dados biométricos (impressões digitais, reconhecimento facial, voz, geometria da mão) com o artigo 9.º do RGPD (categorias especiais de dados), as orientações WP29 e do CEPD sobre dados biométricos, os requisitos específicos da Lei n.º 58/2019 (artigo 28.º), e as implicações da utilização de sistemas de reconhecimento biométrico ao abrigo do AI Act (Regulamento UE 2024/1689).

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Dados biométricos para identificação única são categoria especial — a proibição de tratamento do art. 9.º, n.º 1 RGPD aplica-se salvo exceção expressamente prevista.
— A exceção mais comum (consentimento) é problemática no contexto laboral — analisa sempre a questão do consentimento livre em relações assimétricas.
— A identificação biométrica à distância em «tempo real» em espaços acessíveis ao público para efeitos de aplicação da lei é proibida pelo AI Act (art. 5.º, n.º 1, al. h)), com exceções muito estritas; fora desse caso, o reconhecimento facial não é proibido em geral, mas fica sujeito ao RGPD e, se for identificação biométrica à distância, ao regime de risco elevado (Anexo III, ponto 1, AI Act).

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
- **Al. b) — Obrigações de direito do trabalho/segurança social:** exige norma de direito da União ou nacional que o preveja; em Portugal, o art. 28.º, n.º 6, da Lei n.º 58/2019 só considera legítimo o tratamento de dados biométricos dos trabalhadores para controlo de assiduidade e de acessos às instalações do empregador, e o art. 18.º, n.º 2, CT exige que os dados sejam necessários, adequados e proporcionais — fica excluída qualquer outra finalidade laboral
- **Al. g) — Interesse público importante:** exige base no direito da União ou nacional, proporcional e com medidas adequadas de salvaguarda; não se limita a entidades públicas, mas pressupõe essa base legal específica
- **Al. h) — Prestação de cuidados de saúde:** para biometria em contexto clínico
- **Art. 28.º, n.º 6, Lei 58/2019:** nas relações laborais, só controlo de assiduidade e de acessos às instalações, usando apenas representações dos dados biométricos (templates) recolhidas por processo que não permita a reversibilidade; o consentimento do trabalhador não é requisito de legitimidade quando o tratamento lhe traga vantagem jurídica ou económica ou seja necessário à execução do contrato (n.º 3)

### ETAPA 3 — DPIA OBRIGATÓRIA
Apresenta dentro de um bloco <dpia_obrigatoria>:
- Tratamento de dados biométricos = critério WP248 n.º 4 (dados sensíveis) → dois critérios presentes se houver monitorização sistemática (n.º 3) → DPIA obrigatória
- Consta da lista CNPD de tratamentos que exigem DPIA [■ VERIFICAR lista vigente]
- Elementos específicos da DPIA para biometria:
  - Riscos de segurança: os dados biométricos são imutáveis — comprometimento é permanente
  - Risco de desvio de finalidade («function creep»): utilização para finalidades além da original
  - Risco de acesso não autorizado ao sistema biométrico
  - Medidas: armazenamento só de templates cifrados (nunca imagem bruta), chaves detidas pelo responsável, isolamento de rede

### ETAPA 4 — AI ACT PARA RECONHECIMENTO BIOMÉTRICO
Avalia a aplicabilidade do AI Act (Regulamento UE 2024/1689):

**PROIBIDO (art. 5.º AI Act, aplicável desde 2/2/2025):**
- Identificação biométrica à distância em **tempo real** em espaços acessíveis ao público para efeitos de aplicação da lei (n.º 1, al. h)), salvo exceções taxativas — busca de vítimas de rapto, tráfico ou exploração sexual e de pessoas desaparecidas; ameaça específica e iminente à vida ou de ataque terrorista; localização de suspeitos de crimes do Anexo II puníveis com pena máxima não inferior a 4 anos — e com autorização prévia de autoridade judiciária ou de autoridade administrativa independente cuja decisão seja vinculativa (n.º 3)
- Categorização biométrica para deduzir raça, opiniões políticas, filiação sindical, convicções religiosas ou filosóficas, vida sexual ou orientação sexual (al. g))
- Criação ou expansão de bases de dados de reconhecimento facial por recolha aleatória de imagens faciais da Internet ou de televisão em circuito fechado (al. e))
- Reconhecimento de emoções no local de trabalho e nas instituições de ensino, salvo por razões médicas ou de segurança (al. f))

**ALTO RISCO (Anexo III, ponto 1 AI Act — aplicável a partir de 2/12/2027, na redação do Reg. (UE) 2026/1744):**
- Sistemas de identificação biométrica à distância, em tempo real (quando permitidos) ou em diferido; a identificação em diferido numa investigação criminal exige autorização prévia, ou no prazo máximo de 48 horas, de autoridade judiciária ou administrativa (art. 26.º, n.º 10)
- Excluída a verificação biométrica com o único propósito de confirmar que a pessoa é quem alega ser (Anexo III, ponto 1, al. a)): não é de risco elevado por esta via, mas continua sujeita ao RGPD e à Lei n.º 58/2019
- Sistemas de categorização biométrica segundo atributos sensíveis ou protegidos, fora dos casos proibidos
- Sistemas de reconhecimento de emoções fora do trabalho e do ensino (aí são proibidos — art. 5.º, n.º 1, al. f))
- Transparência: o deployer de reconhecimento de emoções ou de categorização biométrica informa as pessoas expostas (art. 50.º, n.º 3)

### ETAPA 5 — REQUISITOS OPERACIONAIS
Apresenta dentro de um bloco <requisitos_operacionais>:
- **Minimização:** utilizar apenas o necessário — template vs. imagem bruta; sem retenção além do necessário
- **Segurança técnica:** cifração do template, controlo de acesso estrito, registos de auditoria
- **Alternativa ao tratamento biométrico:** deve existir alternativa disponível para quem não consinta
- **Informação aos titulares:** aviso de privacidade específico para dados biométricos
- **Consulta de trabalhadores/representantes:** o art. 18.º, n.º 4, CT liga à notificação à CNPD o parecer da comissão de trabalhadores [■ VERIFICAR: alcance atual, dado que o RGPD eliminou a notificação prévia]; pedir esse parecer é prudente; se o sistema for de IA de risco elevado, a informação prévia aos representantes dos trabalhadores e aos trabalhadores afetados é obrigatória (art. 26.º, n.º 7, AI Act)
- **Eliminação:** plano de eliminação segura de templates quando o tratamento cessar ou o titular sair; no contexto laboral, os dados biométricos são destruídos na transferência do trabalhador para outro local de trabalho ou na cessação do contrato, e a violação deste dever é contraordenação grave (art. 18.º, n.os 3 e 5, CT)

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
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 18.º, n.º 2, CT | conferida (epígrafe) — Dados biométricos |  |
| Art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 18.º, n.º 4, CT | conferida (epígrafe) — Dados biométricos |  |
| art. 18.º, n.os 3 e 5, CT | conferida (epígrafe) — Dados biométricos |  |
