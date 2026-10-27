---
codigo: DIG-046
area: "Proteção de Dados e Direito Digital"
titulo: "Privacy by Design — Implementação em Sistemas e Produtos Digitais"
titulo_en: "Privacy by Design — Implementation in Digital Systems and Products"
descricao: "Guião para implementação dos princípios de privacy by design e privacy by default nos termos do artigo 25.º do RGPD, com aplicação prática ao desenvolvimento de software, identificação de dark patterns proibidos ao abrigo das Orientações CEPD 03/2022, integração no ciclo de desenvolvimento ágil e documentação para accountability."
descricao_en: "Guide to implementing the principles of privacy by design and privacy by default under Article 25 of the GDPR, with practical application to software development, identification of dark patterns prohibited under EDPB Guidelines 03/2022, integration into the agile development cycle and documentation for accountability."
ambito: nacional
estado_citacoes: "conferidas 2 · corrigidas 0 · por conferir 2"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Privacy by Design — Implementação em Sistemas e Produtos Digitais

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-046
> **EN:** Privacy by Design — Implementation in Digital Systems and Products. Guide to implementing the principles of privacy by design and privacy by default under Article 25 of the GDPR, with practical application to software development, identification of dark patterns prohibited under EDPB Guidelines 03/2022, integration into the agile development cycle and documentation for accountability.
> **Citações:** conferidas 2 · corrigidas 0 · por conferir 2. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Guião para implementação dos princípios de privacy by design e privacy by default nos termos do artigo 25.º do RGPD, com aplicação prática ao desenvolvimento de software, identificação de dark patterns proibidos ao abrigo das Orientações CEPD 03/2022, integração no ciclo de desenvolvimento ágil e documentação para accountability.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Privacy by default exige que as definições mais protetoras sejam as predefinições — não apenas opções disponíveis.
— Dark patterns que manipulem o utilizador para consentir violam o art. 7.º RGPD.
— Documenta as decisões de design com impacto na privacidade.

## Framework PbD — 5 Etapas

### ETAPA 1 — INVENTÁRIO DE PRIVACIDADE
Apresenta dentro de um bloco <inventario_privacidade>:
- Mapeamento de fluxos de dados pessoais no sistema
- Pontos de recolha (formulários, APIs, cookies, sensores)
- Dados recolhidos vs. dados estritamente necessários (minimização art. 5.º, n.º 1, al. c) RGPD)
- Terceiros que recebem dados (analytics, CDN, publicidade, suporte)
- Períodos de retenção definidos vs. necessários

### ETAPA 2 — SETE PRINCÍPIOS PbD
Avalia conformidade para cada princípio:
1. Proativo, não reativo
2. Privacidade como definição predeterminada (art. 25.º, n.º 2 RGPD)
3. Privacidade incorporada no design (não add-on)
4. Funcionalidade total — privacidade + funcionalidade
5. Segurança de ponta a ponta
6. Visibilidade e transparência
7. Respeito pela privacidade dos utilizadores

### ETAPA 3 — AUDITORIA DE DARK PATTERNS (Orientações CEPD 03/2022)
Identifica e avalia:
- **Overloading:** pedidos de consentimento repetidos até o utilizador ceder
- **Skipping:** design que induz a ignorar definições de privacidade
- **Stirring:** elementos visuais/emocionais para influenciar escolhas
- **Obstructing:** dificuldade artificial para exercer direitos ou retirar consentimento
- **Fickle:** interface inconsistente sobre definições de privacidade
- **Left in the dark:** informação propositadamente obscura

Para cada dark pattern: descreve o problema e a alternativa conforme.

### ETAPA 4 — INTEGRAÇÃO NO SDLC
- **Requisitos:** privacy requirements (LINDDUN threat modeling)
- **Design:** privacy threat modeling — Linkability, Identifiability, Non-repudiation, Detectability, Disclosure, Unawareness, Non-compliance
- **Desenvolvimento:** secure coding + code review com componente de privacidade
- **Testes:** sem dados pessoais reais em ambientes de teste; testar eliminação correta de dados
- **Deploy:** verificação de configurações antes do lançamento
- **Manutenção:** revisão periódica da DPIA; gestão de patches

### ETAPA 5 — DOCUMENTAÇÃO
Apresenta dentro de um bloco <documentacao_pbd>:
- Privacy Design Record: decisões de design e justificação
- Ligação à DPIA
- Registo no RAT (art. 30.º RGPD)
- Cláusulas de PbD em contratos com developers externos

---

## DADOS DO SISTEMA:

- **Designação:** [nome]
- **Tipo:** [app móvel / plataforma web / sistema interno / API]
- **Fase:** [requisitos / design / desenvolvimento / produção]
- **Dados pessoais:** [listar]
- **Funcionalidades com impacto na privacidade:** [listar]
- **Terceiros integrados:** [analytics, publicidade, pagamentos, etc.]
- **Dark patterns suspeitos:** [descrever ou "a avaliar"]
- **Observações:** [contexto]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 7.º RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
| art. 5.º, n.º 1, al. c) RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
| art. 25.º, n.º 2 RGPD | conferida (epígrafe) — Proteção de dados desde a conceção e por defeito |  |
| art. 30.º RGPD | conferida (epígrafe) — Registos das atividades de tratamento |  |
