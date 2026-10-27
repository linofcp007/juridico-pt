---
codigo: DIG-010
area: "Proteção de Dados e Direito Digital"
titulo: "Notificação de Violação de Dados Pessoais à CNPD"
titulo_en: "Personal Data Breach Notification to the CNPD"
descricao: "Gera a notificação de violação de dados pessoais à CNPD conforme ao artigo 33.º do RGPD, com análise de risco, descrição do incidente, medidas adoptadas e avaliação da necessidade de comunicação aos titulares afetados, no prazo de 72 horas."
descricao_en: "Generates the personal data breach notification to the National Data Protection Commission (CNPD) under Article 33 of the GDPR, with a risk analysis, a description of the incident, the measures taken and an assessment of whether the affected data subjects must be informed, within 72 hours."
ambito: nacional
estado_citacoes: "conferidas 7 · corrigidas 0 · por conferir 9"
remete_para: "playbooks/data-breach"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Notificação de Violação de Dados Pessoais à CNPD

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-010
> **EN:** Personal Data Breach Notification to the CNPD. Generates the personal data breach notification to the National Data Protection Commission (CNPD) under Article 33 of the GDPR, with a risk analysis, a description of the incident, the measures taken and an assessment of whether the affected data subjects must be informed, within 72 hours.
> **Ver também:** `playbooks/data-breach` — conteúdo do plugin sobre o mesmo tema. Usa-o primeiro.
> **Citações:** conferidas 7 · corrigidas 0 · por conferir 9. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Gera a notificação de violação de dados pessoais à CNPD conforme ao artigo 33.º do RGPD, com análise de risco, descrição do incidente, medidas adoptadas e avaliação da necessidade de comunicação aos titulares afetados, no prazo de 72 horas.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— O prazo de 72 horas é a contar do momento em que o responsável "toma conhecimento" da violação — não do momento em que ocorreu.
— Se a informação é parcial, notifica assim mesmo e atualiza depois (art. 33.º, n.º 4 RGPD).
— NUNCA minimizes a gravidade do incidente sem fundamentação — o critério é se há "risco para os direitos e liberdades" dos titulares.
— Distinguir: violação sem risco (não notifica CNPD mas documenta internamente), violação com risco (notifica CNPD), violação com risco elevado (notifica CNPD + comunica a titulares).
— Se faltarem dados concretos sobre o incidente, marca [■ VERIFICAR].

---

## Framework P.A.C.E.F — Segue estas 5 etapas obrigatoriamente:

### ETAPA 1 — PROBLEMATIZAÇÃO (Análise do Incidente)
Apresenta dentro de um bloco <analise_incidente>:
- O que aconteceu exatamente? (tipo de violação: confidencialidade, disponibilidade, integridade)
- Quando foi detetado? Quando ocorreu (se diferente)?
- Que dados pessoais estão envolvidos? (categorias, volume estimado)
- Que titulares são afetados? (clientes, colaboradores, menores, dados especiais?)
- O acesso/divulgação foi intencional ou acidental?
- A violação está contida ou ainda em curso?
- Qual a probabilidade de dano real para os titulares?

### ETAPA 2 — ANÁLISE JURÍDICA (Obrigação de Notificação)
Apresenta dentro de um bloco <fundamentos_juridicos>:
- Art. 33.º, n.º 1 RGPD: critério de notificação — "suscetível de resultar num risco"
- Três categorias de risco (WP250):
  * Risco negligenciável → não notifica CNPD, documenta internamente
  * Risco (não elevado) → notifica CNPD, não comunica a titulares
  * Risco elevado → notifica CNPD + comunica a titulares (art. 34.º)
- Fatores de avaliação de risco: natureza dos dados, número de titulares, facilidade de identificação, consequências prováveis (dano financeiro, discriminação, dano físico, reputacional)
- Dados de categorias especiais: presumir risco elevado
- Art. 33.º, n.º 4: possibilidade de notificação faseada quando informação incompleta
- Art. 33.º, n.º 5: obrigação de documentação interna independentemente de notificar

### ETAPA 3 — CONSTRUÇÃO (Avaliação do Nível de Risco)
Define em <avaliacao_risco>:
- Nível de risco: negligenciável / risco / risco elevado
- Justificação para a classificação
- Necessidade de comunicação a titulares (art. 34.º)?
- Medidas de mitigação já adoptadas que reduzem o risco

### ETAPA 4 — A NOTIFICAÇÃO À CNPD

**NOTIFICAÇÃO DE VIOLAÇÃO DE DADOS PESSOAIS**
Nos termos do artigo 33.º do Regulamento (UE) 2016/679 (RGPD)
Autoridade de Controlo: Comissão Nacional de Proteção de Dados (CNPD)
[Portal de notificação: www.cnpd.pt]

**SECÇÃO 1 — IDENTIFICAÇÃO DO RESPONSÁVEL**
- Nome: [nome da entidade]
- NIF: [número]
- Sede: [endereço]
- Setor: [atividade]
- Encarregado de Proteção de Dados (EPD): [nome e email — ou "Não designado"]
- Contacto para este processo: [nome, cargo, email, telefone]

**SECÇÃO 2 — DESCRIÇÃO DA VIOLAÇÃO**
- Data e hora da ocorrência: [data/hora — ou "Desconhecida — investigação em curso [■ VERIFICAR]"]
- Data e hora do conhecimento pelo responsável: [data/hora]
- Tipo de violação:
  [ ] Confidencialidade — acesso ou divulgação não autorizados
  [ ] Disponibilidade — perda ou destruição acidental/não autorizada
  [ ] Integridade — alteração não autorizada
- Descrição dos factos: [narrativa objetiva do que aconteceu — quem, o quê, quando, como]
- Causa (se conhecida): [ataque externo / acesso interno não autorizado / erro humano / falha técnica / perda de dispositivo / outro]
- Estado atual: [ ] Violação contida [ ] Violação em curso

**SECÇÃO 3 — DADOS PESSOAIS AFETADOS**
- Categorias de dados: [identificação / contacto / financeiro / saúde / biometria / outro — especificar]
- Dados de categorias especiais (art. 9.º RGPD)? [sim/não — quais]
- Volume aproximado de registos afetados: [número ou estimativa]
- Categorias de titulares: [clientes / colaboradores / menores / outros]
- Número aproximado de titulares afetados: [número ou estimativa]
- Os dados estavam cifrados? [sim/não — nível de cifração]

**SECÇÃO 4 — PROVÁVEL IMPACTO**
- Consequências prováveis para os titulares:
  [ ] Dano financeiro (fraude, roubo de identidade)
  [ ] Dano reputacional
  [ ] Discriminação
  [ ] Dano físico
  [ ] Perda de controlo sobre dados pessoais
  [ ] Outro: [especificar]
- Avaliação do nível de risco:
  [ ] Negligenciável — violação improvável de causar risco para os titulares
  [ ] Risco (não elevado) — risco para os titulares mas não elevado
  [x] Risco elevado — violação suscetível de resultar em risco elevado

**SECÇÃO 5 — MEDIDAS ADOPTADAS E PREVISTAS**
- Medidas imediatas de contenção:
  [ex: bloqueio de acesso, revogação de credenciais, isolamento de sistema, notificação de subcontratante]
- Medidas de remediação em curso:
  [ex: mudança de passwords, análise forense, comunicação a titulares, bloqueio de cartões de crédito]
- Medidas preventivas futuras:
  [ex: reforço de autenticação MFA, revisão de controlos de acesso, formação de colaboradores]

**SECÇÃO 6 — COMUNICAÇÃO AOS TITULARES**
Se risco elevado:
[ ] A comunicação aos titulares está a ser preparada (art. 34.º RGPD) — prazo previsto: [data]
[ ] Não é necessária comunicação pelos seguintes motivos (art. 34.º, n.º 3): [especificar exceção]
Se risco não elevado: comunicação aos titulares não aplicável.

**SECÇÃO 7 — SUBCONTRATANTES ENVOLVIDOS**
[Se o subcontratante notificou o responsável da violação (art. 28.º, n.º 3, al. f)):]
- Nome do subcontratante: [nome]
- Data da notificação pelo subcontratante: [data]
- Referência ao DPA celebrado: [referência]

**DECLARAÇÃO**
Declaro que as informações prestadas são verdadeiras e completas na medida do nosso conhecimento atual. Em caso de informações adicionais, notificaremos a CNPD sem demora injustificada (art. 33.º, n.º 4 RGPD).

[Nome], [Cargo]
[Nome da Entidade] | [data e hora]

---

**REGISTO INTERNO (art. 33.º, n.º 5 RGPD)**
[Documento separado para arquivo interno — complementa a notificação à CNPD:]
- Cronologia detalhada do incidente
- Decisões tomadas e fundamentos
- Comunicações internas e externas
- Cópias de evidências técnicas

### ETAPA 5 — VALIDAÇÃO
Apresenta dentro de um bloco <checklist_validacao>:
- [ ] Prazo de 72 horas verificado desde o momento do conhecimento
- [ ] Avaliação de risco realizada (negligenciável / risco / risco elevado)
- [ ] Tipo de violação identificado (confidencialidade / disponibilidade / integridade)
- [ ] Categorias e volume de dados afetados estimados
- [ ] Consequências prováveis para os titulares identificadas
- [ ] Medidas de contenção e remediação descritas
- [ ] Necessidade de comunicação a titulares avaliada (art. 34.º)
- [ ] Subcontratante notificado (se DPA inclui esta obrigação)
- [ ] Registo interno para arquivo elaborado (art. 33.º, n.º 5)
- [ ] Pontos [■ VERIFICAR] sinalizados

---

## Dados a recolher (entrevista numa só mensagem)

**RESPONSÁVEL:**
- Nome: [nome], NIF: [número], Setor: [setor]
- EPD: [nome e email — ou "Não designado"]
- Contacto responsável pelo incidente: [nome, email, telefone]

**INCIDENTE:**
- O que aconteceu: [descrição objetiva]
- Quando ocorreu: [data/hora — ou "desconhecido"]
- Quando foi detetado: [data/hora]
- Como foi detetado: [sistema de alerta / utilizador / terceiro / CNPD]
- A violação está contida? [sim/não]

**DADOS AFETADOS:**
- Categorias de dados: [listar]
- Dados especiais (art. 9.º)? [sim/não]
- Volume estimado: [nº de registos / titulares]
- Dados cifrados? [sim/não]

**IMPACTO:**
- Consequências prováveis: [fraude / exposição pública / discriminação / outro]
- Estimativa do risco para os titulares: [negligenciável / risco / risco elevado]

**MEDIDAS JÁ TOMADAS:**
[Listar ações imediatas já executadas]

**SUBCONTRATANTE ENVOLVIDO:**
- [sim/não — se sim, qual e quando notificou]

**OBSERVAÇÕES:** [qualquer informação adicional]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 33.º, n.º 4 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 33.º, n.º 4 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 33.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 33.º, n.º 1 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| Art. 33.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 33.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º | por conferir [■ VERIFICAR] | diploma não identificado |
| artigo 33.º do Regulamento (UE) 2016/679 | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 9.º RGPD | conferida (epígrafe) — Tratamento de categorias especiais de dados pessoais |  |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 33.º, n.º 5 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
