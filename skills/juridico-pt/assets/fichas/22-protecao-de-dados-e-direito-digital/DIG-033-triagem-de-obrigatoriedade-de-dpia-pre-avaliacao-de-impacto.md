---
codigo: DIG-033
area: "Proteção de Dados e Direito Digital"
titulo: "Triagem de Obrigatoriedade de DPIA (Pré-Avaliação de Impacto)"
titulo_en: "DPIA Requirement Screening (Pre-Impact Assessment)"
descricao: "Determina se um tratamento de dados exige obrigatoriamente uma Avaliação de Impacto sobre a Proteção de Dados (AIPD/DPIA) nos termos do artigo 35.º do RGPD e das orientações WP248 do Comité Europeu para a Proteção de Dados (CEPD), tendo em conta a lista de tipos de tratamentos que exigem DPIA publicada pela CNPD ao abrigo do artigo 35.º, n.º 4 do RGPD."
descricao_en: "Determines whether a processing operation mandatorily requires a Data Protection Impact Assessment (DPIA/AIPD) under Article 35 of the GDPR and the WP248 guidelines of the European Data Protection Board (EDPB/CEPD), taking into account the list of types of processing requiring a DPIA published by the CNPD under Article 35(4) of the GDPR."
ambito: nacional
estado_citacoes: "conferidas 6 · corrigidas 0 · por conferir 0"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Triagem de Obrigatoriedade de DPIA (Pré-Avaliação de Impacto)

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-033
> **EN:** DPIA Requirement Screening (Pre-Impact Assessment). Determines whether a processing operation mandatorily requires a Data Protection Impact Assessment (DPIA/AIPD) under Article 35 of the GDPR and the WP248 guidelines of the European Data Protection Board (EDPB/CEPD), taking into account the list of types of processing requiring a DPIA published by the CNPD under Article 35(4) of the GDPR.
> **Citações:** conferidas 6 · corrigidas 0 · por conferir 0. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Determina se um tratamento de dados exige obrigatoriamente uma Avaliação de Impacto sobre a Proteção de Dados (AIPD/DPIA) nos termos do artigo 35.º do RGPD e das orientações WP248 do Comité Europeu para a Proteção de Dados (CEPD), tendo em conta a lista de tipos de tratamentos que exigem DPIA publicada pela CNPD ao abrigo do artigo 35.º, n.º 4 do RGPD.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Nunca inventes critérios que não constem do WP248 ou da lista da CNPD.
— Cita sempre os artigos do RGPD aplicáveis.
— Se o resultado for ambíguo, recomenda DPIA por precaução.

## Framework de Triagem — 5 Etapas

### ETAPA 1 — DESCRIÇÃO DO TRATAMENTO
Apresenta dentro de um bloco <descricao_tratamento>:
- Finalidade(s) do tratamento
- Categorias de dados envolvidos
- Categorias e número estimado de titulares
- Tecnologias e sistemas utilizados
- Duração prevista do tratamento
- Responsável(eis) e subcontratantes identificados

### ETAPA 2 — NOVE CRITÉRIOS WP248
Avalia cada critério do WP248 como PRESENTE / AUSENTE / INCERTO:
1. Avaliação ou pontuação (scoring, profiling)
2. Decisão automatizada com efeitos jurídicos ou análogos (art. 22.º RGPD)
3. Monitorização sistemática
4. Dados sensíveis ou de natureza altamente pessoal (art. 9.º e 10.º RGPD)
5. Dados tratados em larga escala
6. Cruzamento ou combinação de conjuntos de dados
7. Dados relativos a pessoas vulneráveis (menores, doentes, trabalhadores)
8. Aplicação inovadora ou utilização de nova tecnologia
9. Transferência de dados para fora da UE com risco para titulares

### ETAPA 3 — LISTA CNPD
Verifica se o tratamento consta da lista de tipos publicada pela CNPD (art. 35.º, n.º 4 RGPD):
- Tratamentos por entidades públicas a larga escala
- Videovigilância em espaços públicos
- Dados de localização em larga escala
- Dados biométricos para identificação única
- [outros constantes da lista vigente — [■ VERIFICAR lista atual CNPD]]

### ETAPA 4 — DECISÃO DE TRIAGEM
Apresenta dentro de um bloco <decisao_triagem>:
- **DPIA OBRIGATÓRIA** se: consta da lista CNPD OU dois ou mais critérios WP248 presentes
- **DPIA RECOMENDADA** se: um critério WP248 presente ou situação incerta
- **DPIA DISPENSADA** se: nenhum critério presente e não consta da lista CNPD
- Fundamentação articulada com base nos critérios identificados
- Prazo para realização da DPIA (se obrigatória): antes do início do tratamento

### ETAPA 5 — PRÓXIMOS PASSOS
Apresenta dentro de um bloco <proximos_passos>:
- Se DPIA obrigatória: equipa envolvida, DPO a consultar (art. 35.º, n.º 2 RGPD), metodologia recomendada
- Se dispensada: recomendação de documentar a decisão de dispensa no registo de tratamentos (art. 30.º RGPD)
- Indicação de consulta prévia à CNPD (art. 36.º RGPD) se risco residual elevado após DPIA

---

## DADOS DO TRATAMENTO A AVALIAR:

- **Designação do tratamento:** [nome/título do projeto ou sistema]
- **Responsável pelo tratamento:** [nome da organização]
- **DPO designado:** [nome ou "não aplicável"]
- **Finalidade(s):** [descrever objetivos]
- **Base jurídica prevista:** [consentimento / contrato / obrigação legal / interesse legítimo / etc.]
- **Categorias de dados:** [listar tipos de dados]
- **Categorias de titulares:** [clientes / trabalhadores / menores / público geral / etc.]
- **Volume estimado de titulares:** [número aproximado]
- **Tecnologias utilizadas:** [IA, biometria, videovigilância, app móvel, etc.]
- **Transferências internacionais:** [sim/não — se sim, para onde]
- **Subcontratantes:** [listar ou "nenhum identificado"]
- **Duração do tratamento:** [período]
- **Observações adicionais:** [qualquer dado relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 22.º RGPD | conferida (epígrafe) — Decisões individuais automatizadas, incluindo definição de perfis |  |
| art. 9.º e 10.º RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 35.º, n.º 4 RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 35.º, n.º 2 RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 30.º RGPD | conferida (epígrafe) — Registos das atividades de tratamento |  |
| art. 36.º RGPD | conferida (epígrafe) — Consulta prévia |  |
