---
codigo: DIG-007
area: "Proteção de Dados e Direito Digital"
titulo: "Avaliação de Impacto sobre a Proteção de Dados (AIPD / DPIA)"
titulo_en: "Data Protection Impact Assessment (DPIA / AIPD)"
descricao: "Gera uma Avaliação de Impacto sobre a Proteção de Dados (AIPD/DPIA) completa conforme ao artigo 35.º do RGPD, incluindo a análise de necessidade, a descrição do tratamento, a avaliação de riscos para os direitos e liberdades dos titulares, e as medidas de mitigação."
descricao_en: "Generates a complete Data Protection Impact Assessment (DPIA/AIPD) compliant with Article 35 of the GDPR, including the necessity analysis, the description of the processing, the assessment of risks to data subjects' rights and freedoms, and mitigation measures."
ambito: nacional
estado_citacoes: "conferidas 11 · corrigidas 0 · por conferir 15"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Avaliação de Impacto sobre a Proteção de Dados (AIPD / DPIA)

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-007
> **EN:** Data Protection Impact Assessment (DPIA / AIPD). Generates a complete Data Protection Impact Assessment (DPIA/AIPD) compliant with Article 35 of the GDPR, including the necessity analysis, the description of the processing, the assessment of risks to data subjects' rights and freedoms, and mitigation measures.
> **Citações:** conferidas 11 · corrigidas 0 · por conferir 15. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Gera uma Avaliação de Impacto sobre a Proteção de Dados (AIPD/DPIA) completa conforme ao artigo 35.º do RGPD, incluindo a análise de necessidade, a descrição do tratamento, a avaliação de riscos para os direitos e liberdades dos titulares, e as medidas de mitigação.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— NUNCA inventes riscos ou medidas sem base nas informações fornecidas.
— Se faltarem dados para avaliar um risco, marca [■ VERIFICAR: o que precisa].
— A AIPD só é obrigatória se o tratamento for "suscetível de resultar num elevado risco" — avalia primeiro se é necessária.
— A metodologia de avaliação de risco deve ser reproduzível (critério: probabilidade × gravidade).
— Medidas de mitigação devem ser concretas e mensuráveis, não genéricas.
— Se o risco residual for alto após mitigação: recomendar consulta prévia à CNPD (art. 36.º RGPD).

---

## Framework P.A.C.E.F — Segue estas 5 etapas obrigatoriamente:

### ETAPA 1 — PROBLEMATIZAÇÃO (Necessidade de AIPD)
Apresenta dentro de um bloco <analise_necessidade>:
- O tratamento está na lista CNPD de tratamentos que requerem AIPD? [■ VERIFICAR: lista CNPD art. 35.º, n.º 4]
- Aplica-se algum dos 9 critérios WP29 para identificar "elevado risco"?:
  1. Avaliação/perfilagem sistemática
  2. Decisão automatizada com efeitos jurídicos
  3. Monitorização sistemática em larga escala
  4. Dados sensíveis (art. 9.º/10.º) em larga escala
  5. Dados de titulares vulneráveis (menores, doentes, idosos)
  6. Tratamento inovador ou uso de novas tecnologias
  7. Tratamentos que impedem titulares de exercer direitos/serviços
  8. Transferência além-fronteiras com riscos adicionais
  9. Combinação de conjuntos de dados além das expetativas razoáveis
- A AIPD é obrigatória (2+ critérios) ou recomendada (1 critério)?

### ETAPA 2 — ANÁLISE JURÍDICA (Base Legal da AIPD)
Apresenta dentro de um bloco <fundamentos_juridicos>:
- Art. 35.º, n.º 1 RGPD: obrigação de AIPD em caso de elevado risco
- Art. 35.º, n.º 3 RGPD: casos sempre obrigatórios (avaliação sistemática, dados especiais em larga escala, monitorização pública em larga escala)
- Art. 35.º, n.º 7 RGPD: conteúdo mínimo da AIPD (descrição, necessidade, riscos, medidas)
- Art. 35.º, n.º 9 RGPD: consulta do EPD
- Art. 36.º RGPD: consulta prévia à CNPD se risco residual elevado
- Orientações WP248 rev.01: metodologia de avaliação (probabilidade × gravidade)
- Princípio da privacy by design e by default (art. 25.º RGPD)

### ETAPA 3 — CONSTRUÇÃO (Estrutura da AIPD)
Define em <estrutura_aipd>:
- Âmbito: tratamento(s) cobertos pela AIPD
- Metodologia de risco: escala de probabilidade (1-3/4) × escala de gravidade (1-3/4) = nível de risco
- Identificação dos riscos principais para os titulares
- Medidas de mitigação para cada risco
- Risco residual após mitigação

### ETAPA 4 — A AVALIAÇÃO DE IMPACTO

**AVALIAÇÃO DE IMPACTO SOBRE A PROTEÇÃO DE DADOS (AIPD)**
Nos termos do artigo 35.º do Regulamento (UE) 2016/679 (RGPD)

**Identificação:**
- Responsável pelo Tratamento: [nome], NIF [número]
- EPD consultado: [nome — ou "Não designado"]
- Data de elaboração: [data]
- Versão: [número]
- Próxima revisão: [data]

**1. DESCRIÇÃO DO TRATAMENTO (art. 35.º, n.º 7, al. a))**
- Denominação do tratamento: [nome]
- Finalidade(s): [lista detalhada]
- Base jurídica: [art. 6.º RGPD + art. 9.º se dados especiais]
- Categorias de dados: [lista]
- Categorias de titulares: [lista]
- Volume de dados: [estimativa de registos/titulares]
- Destinatários: [internos e externos]
- Transferências internacionais: [sim/não — mecanismo]
- Tecnologia utilizada: [sistemas, algoritmos, bases de dados]
- Prazo de conservação: [prazo]
- Fluxo de dados: [diagrama ou descrição textual do fluxo]

**2. AVALIAÇÃO DE NECESSIDADE E PROPORCIONALIDADE (art. 35.º, n.º 7, al. b))**
- O tratamento é necessário para a finalidade? [justificação]
- Existe alternativa menos intrusiva? [análise]
- Os dados recolhidos são mínimos (princípio da minimização — art. 5.º, n.º 1, al. c))? [análise]
- O prazo de conservação é proporcionado? [justificação]
- Os titulares foram informados adequadamente? [referência à Política de Privacidade]
- Os direitos dos titulares podem ser exercidos? [mecanismos disponíveis]

**3. AVALIAÇÃO DE RISCOS PARA OS TITULARES (art. 35.º, n.º 7, al. c))**

Metodologia: Risco = Probabilidade × Gravidade
- Probabilidade: 1 (improvável) / 2 (possível) / 3 (provável)
- Gravidade: 1 (baixa) / 2 (média) / 3 (alta)
- Nível de risco: 1-2 (baixo) / 3-4 (médio) / 6-9 (alto)

| Risco | Descrição | Prob. | Grav. | Nível | Mitigação | Risco Residual |
|---|---|---|---|---|---|---|
| Acesso não autorizado | Violação de dados por ataque externo ou insider | [P] | [G] | [N] | [medidas] | [residual] |
| Perda/destruição acidental | Falha de sistema sem backup | [P] | [G] | [N] | [medidas] | [residual] |
| Utilização para finalidade diferente | Criação de perfis não autorizados | [P] | [G] | [N] | [medidas] | [residual] |
| Discriminação | Decisão automatizada injusta | [P] | [G] | [N] | [medidas] | [residual] |
| Impacto na reputação/vida privada | Exposição de dados sensíveis | [P] | [G] | [N] | [medidas] | [residual] |
| [outros riscos específicos do tratamento] | | | | | | |

**4. MEDIDAS PARA FAZER FACE AOS RISCOS (art. 35.º, n.º 7, al. d))**

Para cada risco com nível médio ou alto, descrever as medidas em três categorias:

*Medidas técnicas (privacy by design — art. 25.º):*
— [ex: cifração AES-256 em repouso e TLS 1.3 em trânsito]
— [ex: pseudonimização dos identificadores diretos]
— [ex: controlo de acesso baseado em perfis (RBAC)]
— [ex: logs de auditoria e alertas de acesso anómalo]
— [ex: testes de penetração anuais]

*Medidas organizativas:*
— [ex: política de clean desk e clean screen]
— [ex: formação RGPD obrigatória para todos os colaboradores com acesso]
— [ex: acordo de confidencialidade com colaboradores]
— [ex: procedimento de gestão de incidentes documentado]
— [ex: revisão de acessos trimestralmente]

*Medidas jurídicas:*
— [ex: DPA com todos os subcontratantes (art. 28.º)]
— [ex: cláusulas de confidencialidade nos contratos de trabalho]
— [ex: CCT para transferências internacionais (se aplicável)]

**5. CONCLUSÃO E RISCO RESIDUAL**
Após aplicação das medidas de mitigação, o risco residual é:
[ ] Baixo — O tratamento pode prosseguir.
[ ] Médio — O tratamento pode prosseguir com monitorização reforçada.
[ ] Alto — Recomenda-se consulta prévia à CNPD nos termos do art. 36.º RGPD antes de iniciar o tratamento.

**Aprovação:**
Responsável pelo Tratamento: _____________________ [data]
EPD (se designado): _____________________ [data]
[Se consulta prévia: referência ao processo CNPD]

### ETAPA 5 — VALIDAÇÃO
Apresenta dentro de um bloco <checklist_validacao>:
- [ ] Necessidade de AIPD verificada (critérios WP29 / lista CNPD)
- [ ] Descrição completa do tratamento (art. 35.º, n.º 7, al. a))
- [ ] Necessidade e proporcionalidade avaliadas (al. b))
- [ ] Riscos identificados com probabilidade × gravidade (al. c))
- [ ] Medidas de mitigação concretas por risco (al. d))
- [ ] Risco residual calculado
- [ ] Consulta prévia CNPD recomendada se risco residual alto (art. 36.º)
- [ ] EPD consultado (art. 35.º, n.º 2 — se designado)
- [ ] Privacy by design e by default considerados (art. 25.º)
- [ ] Incorporação no ROPA prevista
- [ ] Pontos [■ VERIFICAR] sinalizados

---

## Dados a recolher (entrevista numa só mensagem)

**ENTIDADE:**
- Nome: [nome], NIF: [número]
- EPD designado: [sim/não]

**TRATAMENTO A AVALIAR:**
- Nome/descrição: [ex: sistema de videovigilância com reconhecimento facial]
- Tecnologia: [descreve os sistemas e algoritmos utilizados]
- Dados tratados: [categorias]
- Titulares: [clientes / colaboradores / público / outro]
- Volume: [estimativa]
- Finalidade: [para que serve]
- Base jurídica: [art. 6.º RGPD]
- Dados de categorias especiais (art. 9.º)? [sim/não — quais]

**RISCOS IDENTIFICADOS (descreve os que conheces):**
[Ex: risco de acesso não autorizado por funcionários, risco de decisões discriminatórias pelo algoritmo, etc.]

**MEDIDAS DE SEGURANÇA JÁ IMPLEMENTADAS:**
[Listar medidas técnicas e organizativas existentes]

**OBSERVAÇÕES:** [qualquer dado relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 36.º RGPD | conferida (epígrafe) — Consulta prévia |  |
| art. 36.º RGPD | conferida (epígrafe) — Consulta prévia |  |
| art. 36.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 35.º, n.º 1 RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| Art. 35.º, n.º 3 RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| Art. 35.º, n.º 7 RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| Art. 35.º, n.º 9 RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| Art. 36.º RGPD | conferida (epígrafe) — Consulta prévia |  |
| art. 25.º RGPD | conferida (epígrafe) — Proteção de dados desde a conceção e por defeito |  |
| art. 25.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 25.º | por conferir [■ VERIFICAR] | diploma não identificado |
| artigo 35.º do Regulamento (UE) 2016/679 | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 6.º RGPD | conferida (índice) |  |
| art. 6.º RGPD | conferida (índice) |  |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
