---
codigo: DIG-044
area: "Proteção de Dados e Direito Digital"
titulo: "Dados de Menores Online — Conformidade RGPD, Lei 58/2019 e DSA"
titulo_en: "Children's Data Online — Compliance with the GDPR, Law 58/2019 and the DSA"
descricao: "Analisa os requisitos específicos de proteção de dados pessoais de menores em serviços da sociedade de informação, incluindo o regime de consentimento do artigo 8.º do RGPD e do artigo 16.º da Lei n.º 58/2019 (idade mínima de 13 anos em Portugal), as obrigações de verificação de idade, a proibição de publicidade direcionada a menores ao abrigo do DSA (artigo 28.º do Regulamento UE 2022/2065), e as melhores práticas do UK Age Appropriate Design Code como referência de boas práticas."
descricao_en: "Analyses the specific requirements for protecting minors' personal data in information society services, including the consent regime of Article 8 of the GDPR and Article 16 of Law No. 58/2019 (minimum age of 13 in Portugal), age verification obligations, the prohibition of advertising targeted at minors under the DSA (Article 28 of Regulation (EU) 2022/2065), and the UK Age Appropriate Design Code as a benchmark of good practice."
ambito: nacional
estado_citacoes: "conferidas 3 · corrigidas 0 · por conferir 6"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Dados de Menores Online — Conformidade RGPD, Lei 58/2019 e DSA

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-044
> **EN:** Children's Data Online — Compliance with the GDPR, Law 58/2019 and the DSA. Analyses the specific requirements for protecting minors' personal data in information society services, including the consent regime of Article 8 of the GDPR and Article 16 of Law No. 58/2019 (minimum age of 13 in Portugal), age verification obligations, the prohibition of advertising targeted at minors under the DSA (Article 28 of Regulation (EU) 2022/2065), and the UK Age Appropriate Design Code as a benchmark of good practice.
> **Citações:** conferidas 3 · corrigidas 0 · por conferir 6. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Analisa os requisitos específicos de proteção de dados pessoais de menores em serviços da sociedade de informação, incluindo o regime de consentimento do artigo 8.º do RGPD e do artigo 16.º da Lei n.º 58/2019 (idade mínima de 13 anos em Portugal), as obrigações de verificação de idade, a proibição de publicidade direcionada a menores ao abrigo do DSA (artigo 28.º do Regulamento UE 2022/2065), e as melhores práticas do UK Age Appropriate Design Code como referência de boas práticas.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Em Portugal, a idade mínima de consentimento autónomo para serviços da sociedade de informação é **13 anos** (art. 16.º Lei 58/2019).
— Abaixo dos 13 anos: consentimento do titular das responsabilidades parentais é obrigatório.
— O DSA proíbe publicidade direcionada a menores — esta proibição é absoluta, independentemente do consentimento.

## Análise de Conformidade — 5 Etapas

### ETAPA 1 — IDENTIFICAÇÃO DO RISCO
Apresenta dentro de um bloco <risco_menores>:
- O serviço é dirigido especificamente a menores (by design)?
- O serviço é de utilização geral mas suscetível de ser usado por menores?
- Que dados são recolhidos que podem revelar que o utilizador é menor?
- Existe verificação de idade no registo?
- Existem mecanismos de controlo parental?

### ETAPA 2 — REGIME DE CONSENTIMENTO (art. 8.º RGPD + art. 16.º Lei 58/2019)
Apresenta dentro de um bloco <regime_consentimento>:

**Faixas etárias:**
- **Abaixo de 13 anos:** consentimento obrigatório do titular das responsabilidades parentais (art. 16.º, n.º 1 Lei 58/2019)
- **13-15 anos:** consentimento do próprio menor é válido (Portugal fixou 13 anos — art. 16.º, n.º 2 Lei 58/2019)
- **16+ anos:** regime geral de consentimento do adulto

**Verificação de idade e autorização parental:**
- Métodos de verificação de idade: declaração de nascimento (baixo nível), verificação por cartão de crédito, verificação de identidade (alto nível)
- Esforços razoáveis para verificar consentimento parental (art. 8.º, n.º 2 RGPD): proporcional ao risco
- Trade-off: verificação robusta vs. recolha de dados adicional do menor

**Linguagem do consentimento:**
- Informação em linguagem clara e simples, adaptada à faixa etária (art. 12.º RGPD)
- Política de privacidade versão criança (recomendação ICO)

### ETAPA 3 — PUBLICIDADE E PERFILAGEM DE MENORES
Avalia as restrições aplicáveis:
- **DSA (art. 28.º, n.º 2):** proibição absoluta de publicidade direcionada a menores — aplica-se a plataformas online (não apenas VLOPs)
- **RGPD (art. 22.º):** decisões automatizadas / perfilagem de menores — base jurídica e garantias reforçadas
- **ePrivacy / Lei n.º 41/2004:** cookies de rastreio em menores — consentimento reforçado
- Medidas técnicas: deteção de utilizadores menores + bloqueio automático de publicidade direcionada

### ETAPA 4 — DESIGN ADEQUADO À IDADE (Privacy by Design para Menores)
Recomenda medidas de design conforme UK Children's Code (referência internacional):
1. **Best interests of the child:** o interesse superior do menor como princípio orientador
2. **Predefinições de privacidade mais protetoras:** definições mais restritivas por defeito para menores
3. **Minimização de dados:** não recolher dados além do estritamente necessário para o serviço
4. **Sem perfis ocultos ou persistentes:** não construir perfis que o menor não possa ver ou controlar
5. **Sem técnicas de design manipulador (dark patterns):** notificações compulsivas, streak mechanics, sem limites de tempo
6. **Conteúdo impróprio gerado por utilizadores:** moderação adequada à faixa etária
7. **Ferramentas de controlo parental:** robustas e acessíveis sem degradar o serviço

### ETAPA 5 — PLANO DE AÇÃO
Apresenta dentro de um bloco <plano_acao_menores>:
- Gap analysis: medidas existentes vs. requisitos legais
- Política de privacidade — versão adaptada a menores
- Mecanismo de verificação de idade — proposto e nível de verificação
- Ajustes ao sistema de publicidade
- Configurações por defeito mais protetoras para utilizadores menores identificados
- DPIA específica para tratamento de dados de menores (WP248: dados de vulneráveis = critério n.º 7)

---

## DADOS DO SERVIÇO:

- **Designação do serviço:** [nome da plataforma/app]
- **Tipo de serviço:** [rede social / jogo / conteúdos / educação / outro]
- **Faixa etária do público-alvo:** [todas idades / adultos / jovens / crianças]
- **Dados recolhidos no registo:** [listar]
- **Verificação de idade existente:** [sim/não — se sim, método]
- **Controlo parental:** [sim/não]
- **Publicidade na plataforma:** [sim/não — se sim, tipo]
- **Sistemas de recomendação:** [sim/não]
- **Utilizadores menores estimados:** [% ou número]
- **Observações:** [contexto adicional]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 16.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 16.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 16.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 16.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 8.º RGPD | conferida (epígrafe) — Condições aplicáveis ao consentimento de crianças em relação aos serviços da sociedade da  |  |
| art. 8.º, n.º 2 RGPD | conferida (epígrafe) — Condições aplicáveis ao consentimento de crianças em relação aos serviços da sociedade da  |  |
| art. 12.º RGPD | conferida (epígrafe) — Transparência das informações, das comunicações e das regras para exercício dos direitos d |  |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 22.º | por conferir [■ VERIFICAR] | diploma não identificado |
