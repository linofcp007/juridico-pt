---
codigo: DIG-039
area: "Proteção de Dados e Direito Digital"
titulo: "Conformidade com o AI Act — Classificação de Risco e Deveres do Deployer"
titulo_en: "AI Act Compliance — Risk Classification and Deployer Duties"
descricao: "Analisa a conformidade de um sistema de inteligência artificial com o Regulamento UE 2024/1689 (AI Act), determinando a categoria de risco aplicável, os deveres específicos do deployer (utilizador do sistema AI) ao abrigo dos artigos 26.º e 29.º do AI Act, e as obrigações adicionais decorrentes da conjugação com o RGPD, especialmente para sistemas de alto risco que tratam dados pessoais."
descricao_en: "Analyses the compliance of an artificial intelligence system with Regulation (EU) 2024/1689 (AI Act), determining the applicable risk category, the specific duties of the deployer (user of the AI system) under Articles 26 and 29 of the AI Act, and the additional obligations arising from its interplay with the GDPR, especially for high-risk systems that process personal data."
ambito: nacional
estado_citacoes: "conferidas 3 · corrigidas 0 · por conferir 19"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Conformidade com o AI Act — Classificação de Risco e Deveres do Deployer

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-039
> **EN:** AI Act Compliance — Risk Classification and Deployer Duties. Analyses the compliance of an artificial intelligence system with Regulation (EU) 2024/1689 (AI Act), determining the applicable risk category, the specific duties of the deployer (user of the AI system) under Articles 26 and 29 of the AI Act, and the additional obligations arising from its interplay with the GDPR, especially for high-risk systems that process personal data.
> **Citações:** conferidas 3 · corrigidas 0 · por conferir 19. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Analisa a conformidade de um sistema de inteligência artificial com o Regulamento UE 2024/1689 (AI Act), determinando a categoria de risco aplicável, os deveres específicos do deployer (utilizador do sistema AI) ao abrigo dos artigos 26.º e 29.º do AI Act, e as obrigações adicionais decorrentes da conjugação com o RGPD, especialmente para sistemas de alto risco que tratam dados pessoais.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Distingue claramente provider (fornecedor) de deployer (utilizador/implementador).
— Não afirmes que um sistema é de "risco mínimo" sem análise dos critérios do Anexo III do AI Act.
— A proibição de sistemas de IA do art. 5.º AI Act é absoluta — sinaliza claramente se aplicável.

## Framework de Conformidade AI Act — 6 Etapas

### ETAPA 1 — IDENTIFICAÇÃO DO SISTEMA DE IA
Apresenta dentro de um bloco <identificacao_sistema>:
- Descrição técnica do sistema (o que faz, como funciona, outputs gerados)
- Papel da organização: PROVIDER (coloca no mercado/serviço) ou DEPLOYER (utiliza em contexto profissional)
- Fornecedor do sistema e declaração de conformidade CE disponível
- Âmbito de utilização (contexto, utilizadores, titulares afetados)

### ETAPA 2 — CLASSIFICAÇÃO DE RISCO
Classifica o sistema numa das 4 categorias:

**PROIBIDO (art. 5.º AI Act):**
- Sistemas de pontuação social por entidades públicas
- Manipulação subliminar ou exploração de vulnerabilidades
- Identificação biométrica remota em tempo real em espaços públicos (com exceções)
- Inferência de emoções no trabalho ou educação
- Categorização biométrica com dados sensíveis (orientação sexual, convicções políticas)

**ALTO RISCO (Anexo III AI Act):**
- Infraestruturas críticas
- Educação e formação profissional (acesso, avaliação)
- Emprego: recrutamento, triagem, avaliação de desempenho, promoção, despedimento
- Serviços essenciais privados e públicos: scoring de crédito, seguro, benefícios sociais
- Aplicação da lei (identificação, avaliação de risco)
- Migração e asilo
- Administração da justiça

**RISCO ESPECÍFICO DE TRANSPARÊNCIA (art. 50.º AI Act):**
- Chatbots (obrigação de revelar natureza artificial)
- Geração de deep fakes (obrigação de marcação)
- Sistemas GPAI com risco sistémico (Secção 5 AI Act)

**RISCO MÍNIMO:**
- Filtros de spam, jogos de IA, ferramentas de recomendação sem impacto significativo

### ETAPA 3 — DEVERES DO DEPLOYER (arts. 26.º e 29.º AI Act)
Para sistemas de ALTO RISCO, avalia conformidade com:
1. Medidas técnicas e organizacionais para utilização conforme as instruções do provider (art. 26.º, n.º 1)
2. Supervisão humana efetiva (art. 26.º, n.º 2) — responsável identificado, capacitado e com poderes para suspender
3. Monitorização do sistema em operação (art. 26.º, n.º 5) — deteção de anomalias e incidentes
4. Notificação de incidentes sérios ao provider e à autoridade nacional (art. 73.º AI Act)
5. Registo de logs pelo período adequado (art. 12.º AI Act — obrigação do provider que o deployer deve exigir)
6. Realização de DPIA (art. 26.º, n.º 9 AI Act — para sistemas de alto risco que tratam dados pessoais)
7. Informação aos trabalhadores afetados (art. 26.º, n.º 7 AI Act — obrigação específica no contexto laboral)

### ETAPA 4 — CONJUGAÇÃO AI ACT + RGPD
Identifica obrigações cumulativas:
- DPIA obrigatória tanto pelo art. 35.º RGPD como pelo art. 26.º, n.º 9 AI Act → realizar DPIA integrada
- Direito de não sujeição a decisão automatizada (art. 22.º RGPD) vs. supervisão humana (art. 26.º AI Act) → mecanismos alinhados
- Minimização de dados (art. 5.º RGPD) vs. qualidade dos dados (art. 10.º AI Act) → política de dados de treino
- Explicabilidade (art. 22.º, n.º 3 RGPD) vs. transparência (art. 13.º AI Act) → mecanismo único de explicação

### ETAPA 5 — CLÁUSULAS A EXIGIR AO PROVIDER
Lista de cláusulas contratuais mínimas para contratos com fornecedores de IA de alto risco:
- Declaração CE de conformidade + documentação técnica acessível (art. 11.º AI Act)
- Instruções de utilização completas (art. 13.º AI Act)
- Fornecimento de logs ao deployer (art. 12.º AI Act)
- Notificação de incidentes e atualizações de segurança
- Assistência na DPIA e nas auditorias de conformidade
- Indicação clara do âmbito de utilização previsto e proibido
- Garantia de conformidade durante o ciclo de vida do sistema

### ETAPA 6 — PLANO DE CONFORMIDADE
Apresenta dentro de um bloco <plano_conformidade>:
- Prazos de aplicação do AI Act para o tipo de sistema
- Gap analysis: obrigações identificadas vs. estado atual de conformidade
- Ações prioritárias (ordenadas por risco)
- Responsáveis e prazos de implementação

---

## DADOS DO SISTEMA:

- **Designação do sistema:** [nome do produto/sistema]
- **Fornecedor (provider):** [empresa, país]
- **Papel da organização:** [deployer / provider / ambos]
- **Descrição funcional:** [o que o sistema faz]
- **Contexto de utilização:** [RH / crédito / saúde / marketing / outro]
- **Outputs do sistema:** [decisão / recomendação / classificação / geração de conteúdo]
- **Trata dados pessoais?** [sim/não — se sim, categorias]
- **Volume de titulares afetados:** [estimativa]
- **Declaração CE disponível:** [sim/não/não aplicável]
- **Medidas já implementadas:** [listar]
- **Observações:** [qualquer contexto relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 73.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 12.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 12.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 22.º RGPD | conferida (epígrafe) — Decisões individuais automatizadas, incluindo definição de perfis |  |
| art. 5.º RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
| art. 10.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 22.º, n.º 3 RGPD | conferida (epígrafe) — Decisões individuais automatizadas, incluindo definição de perfis |  |
| art. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 11.º | por conferir [■ VERIFICAR] | diploma não identificado |
