---
codigo: DIG-045
area: "Proteção de Dados e Direito Digital"
titulo: "Pseudonimização e Anonimização — Estratégia Jurídica e Técnica"
titulo_en: "Pseudonymisation and Anonymisation — Legal and Technical Strategy"
descricao: "Analisa a distinção jurídica entre pseudonimização e anonimização para efeitos do RGPD, avalia se um conjunto de dados é genuinamente anónimo (e portanto fora do âmbito do RGPD) à luz dos critérios do Parecer 05/2014 do WP29, e recomenda estratégias de pseudonimização conformes com o artigo 25.º (privacy by design) e o artigo 89.º (tratamento para fins de arquivo, investigação, estatística) do RGPD."
descricao_en: "Analyses the legal distinction between pseudonymisation and anonymisation for GDPR purposes, assesses whether a data set is genuinely anonymous (and therefore outside the scope of the GDPR) in light of the criteria in WP29 Opinion 05/2014, and recommends pseudonymisation strategies compliant with Article 25 (privacy by design) and Article 89 (processing for archiving, research and statistical purposes) of the GDPR."
ambito: nacional
estado_citacoes: "conferidas 3 · corrigidas 0 · por conferir 0"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Pseudonimização e Anonimização — Estratégia Jurídica e Técnica

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-045
> **EN:** Pseudonymisation and Anonymisation — Legal and Technical Strategy. Analyses the legal distinction between pseudonymisation and anonymisation for GDPR purposes, assesses whether a data set is genuinely anonymous (and therefore outside the scope of the GDPR) in light of the criteria in WP29 Opinion 05/2014, and recommends pseudonymisation strategies compliant with Article 25 (privacy by design) and Article 89 (processing for archiving, research and statistical purposes) of the GDPR.
> **Citações:** conferidas 3 · corrigidas 0 · por conferir 0. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Analisa a distinção jurídica entre pseudonimização e anonimização para efeitos do RGPD, avalia se um conjunto de dados é genuinamente anónimo (e portanto fora do âmbito do RGPD) à luz dos critérios do Parecer 05/2014 do WP29, e recomenda estratégias de pseudonimização conformes com o artigo 25.º (privacy by design) e o artigo 89.º (tratamento para fins de arquivo, investigação, estatística) do RGPD.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— A anonimização genuína retira os dados do âmbito do RGPD — mas o ónus da prova é do responsável.
— A pseudonimização é uma medida de segurança, não uma dispensa do RGPD.
— Avalia os três vetores de re-identificação do WP29: singling out, linkability, inference.

## Análise — 5 Etapas

### ETAPA 1 — QUALIFICAÇÃO DO DADO
Apresenta dentro de um bloco <qualificacao_dado>:
- O dado permite identificar diretamente a pessoa? → dado pessoal direto
- O dado permite identificar por combinação com outros dados razoavelmente disponíveis? → dado pessoal indireto
- Após a técnica aplicada, existe risco razoável de re-identificação? → continua a ser dado pessoal

### ETAPA 2 — PSEUDONIMIZAÇÃO vs. ANONIMIZAÇÃO
Explica a distinção:

**Pseudonimização (art. 4.º, n.º 5 RGPD):**
- Substituição de identificadores por pseudónimo
- A chave de re-identificação existe
- Os dados CONTINUAM a ser dados pessoais
- Medida de segurança (arts. 25.º e 32.º RGPD)

**Anonimização genuína (Parecer WP29 05/2014):**
Avalia os três vetores:
1. **Singling out:** é possível isolar um registo de uma pessoa?
2. **Linkability:** é possível ligar dois registos ao mesmo indivíduo?
3. **Inference:** é possível deduzir informação com elevada probabilidade?
Se algum vetor for positivo → dados NÃO são anónimos

### ETAPA 3 — TÉCNICAS DE PSEUDONIMIZAÇÃO
- **Hashing com salt:** SHA-256 + salt único por registo
- **Tokenização:** token aleatório + tabela de lookup separada e segura
- **Cifragem determinística:** reversível com chave
- **Generalização:** valor exato → intervalo
- **Supressão:** eliminar o campo identificador

### ETAPA 4 — TÉCNICAS DE ANONIMIZAÇÃO FORTE
- **k-anonymity:** cada registo indistinguível de k-1 outros
- **l-diversity:** l valores distintos de atributos sensíveis por grupo
- **Differential Privacy:** ruído calibrado para garantir indistinguibilidade
- Recomendação por caso de uso: [analisar]

### ETAPA 5 — RECOMENDAÇÃO E DOCUMENTAÇÃO
Apresenta dentro de um bloco <recomendacao>:
- Conclusão: anónimo / pseudonimizado / dado pessoal sem tratamento
- Técnica recomendada
- Residual re-identification risk
- Documentação de accountability
- Se investigação/estatística: art. 89.º RGPD

---

## Dados a recolher (entrevista numa só mensagem)

- **Dataset:** [descrição]
- **Finalidade após tratamento:** [investigação / teste / partilha / IA / estatística]
- **Campos presentes:** [listar todos]
- **Técnica já aplicada:** [descrever ou "nenhuma"]
- **Destinatário:** [interno / externo / parceiro / público]
- **Dados especiais presentes?** [sim/não]
- **Observações:** [contexto]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 4.º, n.º 5 RGPD | conferida (epígrafe) — Definições |  |
| arts. 25.º e 32.º RGPD | conferida (epígrafe) — Proteção de dados desde a conceção e por defeito |  |
| art. 89.º RGPD | conferida (epígrafe) — Garantias e derrogações relativas ao tratamento para fins de arquivo de interesse público  |  |
