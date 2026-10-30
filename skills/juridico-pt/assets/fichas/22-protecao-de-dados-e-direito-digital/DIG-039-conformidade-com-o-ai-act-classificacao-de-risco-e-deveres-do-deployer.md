---
codigo: DIG-039
area: "Proteção de Dados e Direito Digital"
titulo: "Conformidade com o AI Act — Classificação de Risco e Deveres do Deployer"
titulo_en: "AI Act Compliance — Risk Classification and Deployer Duties"
descricao: "Analisa a conformidade de um sistema de inteligência artificial com o Regulamento UE 2024/1689 (AI Act), determinando a categoria de risco aplicável, os deveres específicos do deployer (utilizador do sistema AI) ao abrigo dos artigos 26.º e 27.º do AI Act, e as obrigações adicionais decorrentes da conjugação com o RGPD, especialmente para sistemas de alto risco que tratam dados pessoais."
descricao_en: "Analyses the compliance of an artificial intelligence system with Regulation (EU) 2024/1689 (AI Act), determining the applicable risk category, the specific duties of the deployer (user of the AI system) under Articles 26 and 27 of the AI Act, and the additional obligations arising from its interplay with the GDPR, especially for high-risk systems that process personal data."
ambito: nacional
estado_citacoes: "conferidas 5 · corrigidas 0 · por conferir 40"
revisao_tecnica: "2026-10-30 (corrigida)"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Conformidade com o AI Act — Classificação de Risco e Deveres do Deployer

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-039
> **EN:** AI Act Compliance — Risk Classification and Deployer Duties. Analyses the compliance of an artificial intelligence system with Regulation (EU) 2024/1689 (AI Act), determining the applicable risk category, the specific duties of the deployer (user of the AI system) under Articles 26 and 27 of the AI Act, and the additional obligations arising from its interplay with the GDPR, especially for high-risk systems that process personal data.
> **Citações:** conferidas 5 · corrigidas 0 · por conferir 40. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.
> **Revisão técnica:** 2026-10-30 — corrigida (9 correções com fonte). O que mudou e as fontes em `assets/fichas/revisao-tecnica.md`; falta a confirmação de um advogado.

Analisa a conformidade de um sistema de inteligência artificial com o Regulamento UE 2024/1689 (AI Act), determinando a categoria de risco aplicável, os deveres específicos do deployer (utilizador do sistema AI) ao abrigo dos artigos 26.º e 27.º do AI Act, e as obrigações adicionais decorrentes da conjugação com o RGPD, especialmente para sistemas de alto risco que tratam dados pessoais.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Distingue claramente provider (fornecedor) de deployer (utilizador/implementador).
— Não afirmes que um sistema é de "risco mínimo" sem análise das regras de classificação do art. 6.º e dos Anexos I e III do AI Act.
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

**PROIBIDO (art. 5.º AI Act, aplicável desde 2/2/2025):**
- Classificação social (*social scoring*) de pessoas singulares que conduza a tratamento prejudicial ou desfavorável, por entidades públicas ou privadas (n.º 1, al. c))
- Técnicas subliminares, manipuladoras ou enganadoras e exploração de vulnerabilidades (als. a) e b))
- Avaliação do risco de uma pessoa cometer uma infração penal baseada exclusivamente na definição de perfis (al. d))
- Criação ou expansão de bases de dados de reconhecimento facial por recolha aleatória de imagens faciais da Internet ou de televisão em circuito fechado (al. e))
- Inferência de emoções no local de trabalho e nas instituições de ensino, salvo por razões médicas ou de segurança (al. f))
- Categorização biométrica para deduzir raça, opiniões políticas, filiação sindical, convicções religiosas ou filosóficas, vida sexual ou orientação sexual (al. g))
- Identificação biométrica à distância em «tempo real» em espaços acessíveis ao público para efeitos de aplicação da lei, salvo as exceções taxativas da al. h)
- A partir de 2/12/2026: geração ou manipulação não consentida de imagens íntimas realistas de pessoa identificável e de material de abuso sexual de crianças (als. b-A) e b-B), aditadas pelo Reg. (UE) 2026/1744)

**ALTO RISCO (art. 6.º e Anexos I e III AI Act):**
- Componentes de segurança de produtos, ou produtos, abrangidos pela legislação de harmonização do Anexo I e sujeitos a avaliação da conformidade por terceiros (art. 6.º, n.º 1)
- Biometria: identificação biométrica à distância (não a mera verificação de identidade), categorização biométrica por atributos sensíveis ou protegidos e reconhecimento de emoções, quando permitidos (Anexo III, ponto 1)
- Infraestruturas críticas
- Educação e formação profissional (acesso, avaliação)
- Emprego: recrutamento, triagem, avaliação de desempenho, promoção, despedimento
- Serviços essenciais privados e públicos: avaliação de crédito, avaliação de risco e fixação de preços em seguros de vida e de saúde, elegibilidade para prestações públicas, triagem de chamadas de emergência
- Aplicação da lei (identificação, avaliação de risco)
- Migração, asilo e controlo das fronteiras
- Administração da justiça e processos democráticos
- Um sistema do Anexo III não é de risco elevado se não representar risco significativo (art. 6.º, n.º 3), mas é-o sempre que faça a definição de perfis de pessoas singulares

**RISCO ESPECÍFICO DE TRANSPARÊNCIA (art. 50.º AI Act, aplicável desde 2/8/2026):**
- Chatbots e outros sistemas que interagem diretamente com pessoas (o provider assegura que estas sabem que interagem com IA — n.º 1)
- Conteúdos sintéticos: marcação legível por máquina pelo provider (n.º 2; para sistemas colocados no mercado antes de 2/8/2026, até 2/12/2026 — art. 111.º, n.º 4, aditado pelo Reg. (UE) 2026/1744) e divulgação das falsificações profundas (*deep fakes*) pelo deployer (n.º 4)
- Reconhecimento de emoções e categorização biométrica (o deployer informa as pessoas expostas — n.º 3)

**MODELOS DE IA DE FINALIDADE GERAL (GPAI):** não são uma categoria de risco do sistema, mas um regime próprio do fornecedor do modelo (Capítulo V, arts. 51.º a 56.º AI Act, aplicável desde 2/8/2025), com obrigações reforçadas para os modelos com risco sistémico

**RISCO MÍNIMO:**
- Filtros de spam, jogos de IA, ferramentas de recomendação sem impacto significativo

### ETAPA 3 — DEVERES DO DEPLOYER (arts. 26.º e 27.º AI Act)
Para sistemas de ALTO RISCO (aplicáveis a partir de 2/12/2027 aos sistemas do Anexo III e de 2/8/2028 aos do Anexo I — art. 113.º, na redação do Reg. (UE) 2026/1744), avalia conformidade com:
1. Medidas técnicas e organizativas para utilização conforme as instruções do provider (art. 26.º, n.º 1)
2. Supervisão humana efetiva (art. 26.º, n.º 2) — pessoas singulares com as competências, a formação e a autoridade necessárias, e com poderes para suspender
3. Dados de entrada sob controlo do deployer pertinentes e suficientemente representativos (art. 26.º, n.º 4)
4. Monitorização do sistema em operação (art. 26.º, n.º 5) — informar o provider e, se o sistema apresentar risco, suspender a utilização e informar a autoridade de fiscalização do mercado
5. Incidentes graves: informar imediatamente o provider e, em seguida, o importador ou distribuidor e as autoridades de fiscalização do mercado (art. 26.º, n.º 5, e art. 73.º AI Act)
6. Conservação dos registos (logs) gerados automaticamente que estejam sob o seu controlo durante pelo menos seis meses (art. 26.º, n.º 6 AI Act); a capacidade de registo é requisito do sistema, a cargo do provider (art. 12.º AI Act)
7. AIPD: usar as informações do provider (art. 13.º) para cumprir a obrigação de AIPD do art. 35.º RGPD, se for o caso (art. 26.º, n.º 9 AI Act) — o AI Act não cria uma AIPD autónoma
8. Informação prévia aos representantes dos trabalhadores e aos trabalhadores afetados, antes da colocação em serviço no local de trabalho (art. 26.º, n.º 7 AI Act)
9. Informação às pessoas singulares sujeitas a decisões tomadas ou apoiadas por sistemas do Anexo III (art. 26.º, n.º 11 AI Act)
10. Avaliação de impacto sobre os direitos fundamentais (art. 27.º AI Act) — para organismos de direito público, entidades privadas que prestam serviços públicos e deployers de sistemas de avaliação de crédito e de seguros de vida e de saúde (Anexo III, ponto 5, als. b) e c)); pode remeter para a AIPD já feita (art. 27.º, n.º 4, na redação do Reg. (UE) 2026/1744)

Para qualquer sistema de IA: medidas para promover a literacia no domínio da IA do pessoal que o opera (art. 4.º AI Act, na redação do Reg. (UE) 2026/1744)

### ETAPA 4 — CONJUGAÇÃO AI ACT + RGPD
Identifica obrigações cumulativas:
- DPIA exigida pelo art. 35.º RGPD (tratamento suscetível de implicar risco elevado), instruída com as informações do provider (art. 26.º, n.º 9 AI Act) e, quando também seja devida a avaliação de impacto sobre os direitos fundamentais, articulada com esta (art. 27.º, n.º 4 AI Act) → realizar avaliação integrada
- Direito de não sujeição a decisão automatizada (art. 22.º RGPD) vs. supervisão humana (art. 26.º AI Act) → mecanismos alinhados
- Minimização de dados (art. 5.º RGPD) vs. qualidade dos dados (art. 10.º AI Act) → política de dados de treino
- Explicabilidade: informações úteis sobre a lógica subjacente (arts. 13.º, n.º 2, al. f), 14.º, n.º 2, al. g), e 15.º, n.º 1, al. h), RGPD), direito de obter intervenção humana, manifestar o ponto de vista e contestar a decisão (art. 22.º, n.º 3 RGPD) e direito a explicações sobre decisões individuais (art. 86.º AI Act) vs. transparência perante o deployer (art. 13.º AI Act) → mecanismo único de explicação

### ETAPA 5 — CLÁUSULAS A EXIGIR AO PROVIDER
Lista de cláusulas contratuais mínimas para contratos com fornecedores de IA de alto risco:
- Declaração UE de conformidade (art. 47.º AI Act) + documentação técnica acessível (art. 11.º AI Act)
- Instruções de utilização completas (art. 13.º AI Act)
- Fornecimento de logs ao deployer (art. 12.º AI Act)
- Notificação de incidentes e atualizações de segurança
- Assistência na DPIA e nas auditorias de conformidade
- Indicação clara do âmbito de utilização previsto e proibido
- Garantia de conformidade durante o ciclo de vida do sistema

### ETAPA 6 — PLANO DE CONFORMIDADE
Apresenta dentro de um bloco <plano_conformidade>:
- Prazos de aplicação do AI Act para o tipo de sistema (art. 113.º, na redação do Reg. (UE) 2026/1744: práticas proibidas desde 2/2/2025, e as novas als. b-A) e b-B) do art. 5.º, n.º 1, desde 2/12/2026; GPAI desde 2/8/2025; transparência do art. 50.º desde 2/8/2026; alto risco do Anexo III a partir de 2/12/2027 e do Anexo I a partir de 2/8/2028)
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
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 111.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 51.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 113.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 113.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
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
| art. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 35.º RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 27.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 27.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 27.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 4.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 22.º RGPD | conferida (epígrafe) — Decisões individuais automatizadas, incluindo definição de perfis |  |
| art. 5.º RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
| art. 10.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 13.º, n.º 2, al. f), 14.º, n.º 2, al. g), e 15.º, n.º 1, al. h), RGPD | conferida (índice) |  |
| art. 22.º, n.º 3 RGPD | conferida (epígrafe) — Decisões individuais automatizadas, incluindo definição de perfis |  |
| art. 86.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 11.º | por conferir [■ VERIFICAR] | diploma não identificado |
