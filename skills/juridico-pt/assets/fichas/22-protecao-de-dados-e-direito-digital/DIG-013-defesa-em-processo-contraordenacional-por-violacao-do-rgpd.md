---
codigo: DIG-013
area: "Proteção de Dados e Direito Digital"
titulo: "Defesa em Processo Contraordenacional por Violação do RGPD"
titulo_en: "Defence in Administrative Offence Proceedings for Breach of the GDPR"
descricao: "Gera a defesa em processo contraordenacional instaurado pela CNPD por violação do RGPD, incluindo audiência prévia, contestação à acusação, invocação de circunstâncias atenuantes e, se necessário, recurso de impugnação judicial da decisão final."
descricao_en: "Generates the defence in administrative offence (contraordenação) proceedings brought by the National Data Protection Commission (CNPD) for breach of the GDPR, including the prior hearing, the response to the charges, the invocation of mitigating circumstances and, if necessary, a judicial appeal against the final decision."
ambito: nacional
estado_citacoes: "conferidas 21 · corrigidas 1 · por conferir 22"
remete_para: "assets/templates/defesa-contraordenacao"
revisao_tecnica: "2026-10-28 (corrigida)"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Defesa em Processo Contraordenacional por Violação do RGPD

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-013
> **EN:** Defence in Administrative Offence Proceedings for Breach of the GDPR. Generates the defence in administrative offence (contraordenação) proceedings brought by the National Data Protection Commission (CNPD) for breach of the GDPR, including the prior hearing, the response to the charges, the invocation of mitigating circumstances and, if necessary, a judicial appeal against the final decision.
> **Ver também:** `assets/templates/defesa-contraordenacao` — conteúdo do plugin sobre o mesmo tema. Usa-o primeiro.
> **Citações:** conferidas 21 · corrigidas 1 · por conferir 22. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.
> **Revisão técnica:** 2026-10-28 — corrigida (8 correções com fonte). O que mudou e as fontes em `assets/fichas/revisao-tecnica.md`; falta a confirmação de um advogado.

Gera a defesa em processo contraordenacional instaurado pela CNPD por violação do RGPD, incluindo audiência prévia, contestação à acusação, invocação de circunstâncias atenuantes e, se necessário, recurso de impugnação judicial da decisão final.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— NUNCA inventas jurisprudência da CNPD, do TJUE ou dos tribunais portugueses com números de processo incorretos.
— Se faltarem dados sobre o processo, marca [■ VERIFICAR].
— A defesa deve ser factualmente verdadeira — não inventes factos favoráveis.
— Identifica e invoca todas as circunstâncias atenuantes reais (art. 83.º, n.º 2 RGPD).
— Se a infração é clara, a estratégia é mitigar a coima — não negar o que é evidente.

---

## Framework P.A.C.E.F — Segue estas 5 etapas obrigatoriamente:

### ETAPA 1 — PROBLEMATIZAÇÃO (Análise do Processo)
Apresenta dentro de um bloco <analise_processo>:
- Qual a infração imputada pela CNPD?
- Qual o artigo do RGPD violado (segundo a CNPD)?
- Qual a moldura contraordenacional aplicável? (art. 83.º, n.º 4: até €10M / 2% — infrações menos graves; art. 83.º, n.º 5: até €20M / 4% — infrações mais graves)
- A infração é contestável nos factos? Ou nos fundamentos jurídicos?
- Existem circunstâncias atenuantes relevantes?
- Há precedentes de decisões da CNPD em casos semelhantes?

### ETAPA 2 — ANÁLISE JURÍDICA (Regime Contraordenacional)
Apresenta dentro de um bloco <fundamentos_juridicos>:
- Art. 83.º RGPD: critérios de graduação da coima:
  n.º 2, al. a): natureza, gravidade e duração
  n.º 2, al. b): carácter doloso ou negligente
  n.º 2, al. c): medidas tomadas para atenuar os danos
  n.º 2, al. d): grau de responsabilidade (medidas de segurança adoptadas)
  n.º 2, al. e): violações anteriores pertinentes
  n.º 2, al. f): grau de cooperação com a CNPD
  n.º 2, al. g): categorias de dados afetadas
  n.º 2, al. h): como a CNPD teve conhecimento
  n.º 2, al. i): cumprimento de medidas corretivas anteriores
  n.º 2, al. j): adesão a código de conduta aprovado (art. 40.º RGPD)
  n.º 2, al. k): outras circunstâncias agravantes ou atenuantes
- RGCO (DL n.º 433/82): subsidiariamente aplicável — princípio da culpa, prescrição, recurso
- Lei n.º 58/2019, arts. 37.º a 45.º: contraordenações muito graves (art. 37.º) e graves (art. 38.º), medida da coima (art. 39.º), prescrição (arts. 40.º e 41.º) e aplicação subsidiária do RGCO (art. 45.º). A CNPD desaplica, por contrariarem o RGPD, os arts. 37.º, n.º 2, 38.º, n.º 2, e 39.º, n.º 1 (molduras por dimensão da empresa e critérios adicionais de medida da coima), salvo quanto às infrações que o art. 83.º RGPD não sanciona, e o art. 39.º, n.º 3 (advertência prévia nas infrações negligentes) (Deliberação da CNPD 2019/494)
- Prazo de prescrição do procedimento: três anos (contraordenação muito grave) ou dois anos (contraordenação grave) sobre a prática da infração (art. 40.º da Lei n.º 58/2019); suspensão e interrupção: arts. 27.º-A e 28.º RGCO, por força do art. 45.º da Lei n.º 58/2019
- Direito de audição e defesa: art. 50.º RGCO, por força do art. 45.º da Lei n.º 58/2019 (o art. 83.º, n.º 3, RGPD não regula a audição: limita o montante total da coima, quando são violadas várias disposições nas mesmas operações de tratamento ou em operações ligadas entre si, ao da violação mais grave)
- Recurso judicial: impugnação judicial da decisão da CNPD nos tribunais administrativos (art. 78.º RGPD; art. 34.º, n.ºs 1 e 2, da Lei n.º 58/2019), apresentada à CNPD (art. 59.º, n.º 3, RGCO) [■ VERIFICAR: tribunal administrativo territorialmente competente]

### ETAPA 3 — CONSTRUÇÃO (Estratégia de Defesa)
Define em <estrategia_defesa>:
- Contestação de factos (se os factos imputados não são exatos)
- Contestação de enquadramento jurídico (se a norma invocada não é aplicável)
- Mitigação de coima (reconhecimento da infração + invocação de atenuantes)
- Pedido de repreensão em vez de coima (art. 58.º, n.º 2, al. b), e art. 83.º, n.º 2, 1.º período, RGPD; considerando 148 RGPD) ou, subsidiariamente, de admoestação (art. 51.º RGCO) [■ VERIFICAR: admissibilidade da admoestação do RGCO nas infrações sancionadas pelo RGPD]
- Parcelamento da coima (se for aplicada — art. 88.º RGCO)

### ETAPA 4 — A DEFESA / RESPOSTA DE AUDIÊNCIA PRÉVIA

**À Comissão Nacional de Proteção de Dados**
[Endereço]
Ref.ª: [número do processo]

[Cidade], [data]

**RESPOSTA DE AUDIÊNCIA PRÉVIA**
Processo n.º [número] — [Nome da Entidade], NIF [número]

Exmos. Senhores,

[Nome da Entidade], pessoa coletiva com NIF [número], com sede em [endereço], notificada em [data] da intenção de aplicação de coima no processo acima identificado, vem, por intermédio do seu mandatário [nome, OA n.º], nos termos do art. 50.º do DL n.º 433/82 (RGCO), aplicável por força do art. 45.º da Lei n.º 58/2019, apresentar a seguinte DEFESA:

**I. FACTOS RELEVANTES**

[Narrativa objetiva dos factos, incluindo:]
1. [Contexto da empresa e do tratamento em causa]
2. [Cronologia dos eventos relevantes para o processo]
3. [Medidas que a empresa tinha ou não tinha implementadas]
4. [Data em que a empresa tomou conhecimento da situação]
5. [Medidas adoptadas após conhecimento / após notificação da CNPD]

**II. CONTESTAÇÃO DA IMPUTAÇÃO FACTUAL** (se aplicável)

[Se os factos da CNPD são inexatos:]
Sem prejuízo do respeito que nos merece a avaliação de V. Exas., a [entidade] discorda dos seguintes factos constantes da notificação:

*Facto [X]:* A CNPD afirma que [reproduzir]. Porém:
— [Prova do facto contrário: documento / sistema / testemunho]
— [Desenvolvimento jurídico: por que este facto é relevante para a qualificação da infração]

**III. CONTESTAÇÃO DO ENQUADRAMENTO JURÍDICO** (se aplicável)

[Se a norma aplicada é incorreta:]
O art. [X] RGPD invocado pela CNPD não é aplicável ao caso sub judice pelos seguintes motivos:
— [Argumento 1]
— [Argumento 2]
Aplicando-se antes o art. [Y] RGPD / a exceção prevista no art. [Z] RGPD / nenhuma norma RGPD.

**IV. CIRCUNSTÂNCIAS ATENUANTES (art. 83.º, n.º 2 RGPD)**

[Invocar as atenuantes relevantes com documentação:]

a) Carácter negligente (não doloso) — al. b): A infração resultou de [erro humano / falha técnica não intencional / desconhecimento justificado], sem qualquer intenção de violar o RGPD ou de prejudicar os titulares.

b) Medidas de mitigação de danos — al. c): A [entidade] adoptou as seguintes medidas imediatas: [listar com datas]. Junta-se como Anexo [X] comprovativo.

c) Grau de responsabilidade — al. d): A [entidade] tinha implementado as seguintes medidas de segurança: [listar]. A infração ocorreu apesar das medidas existentes / por uma lacuna específica que não era expetável.

d) Ausência de violações anteriores — al. e): A [entidade] não tem registo de infrações anteriores ao RGPD ou a outra legislação de proteção de dados.

e) Cooperação plena com a CNPD — al. f): A [entidade] cooperou em pleno com V. Exas. ao longo de toda a investigação, respondendo atempadamente a todos os pedidos e disponibilizando toda a documentação solicitada.

f) Ausência de dano real — al. a) (nível de danos sofridos pelos titulares): Não há evidência de dano real sofrido pelos titulares em consequência da infração. [Justificação concreta.]

g) Pequena dimensão da empresa — al. k): A [entidade] é uma [PME / microempresa] com [N] colaboradores e volume de negócios de [€X], devendo a coima ser proporcionada à sua capacidade económica.

h) Remediação integral — al. k): A [entidade] procedeu à correção integral da situação, encontrando-se hoje em plena conformidade com [artigo em causa]. [Documentação em Anexo [Y].]

**V. PEDIDO DE REPREENSÃO EM VEZ DE COIMA** (se aplicável)

Atendendo à gravidade reduzida da infração, ao carácter negligente da conduta, à ausência de danos reais para titulares, à remediação imediata e à cooperação plena com V. Exas., a [entidade] requer que, em vez de coima, lhe seja dirigida uma repreensão, nos termos do art. 58.º, n.º 2, al. b), do RGPD, uma vez que, consoante as circunstâncias de cada caso, as coimas são aplicadas para além ou em vez das medidas corretivas (art. 83.º, n.º 2, 1.º período, RGPD) e que, em caso de infração menor, pode ser feita uma repreensão em vez de ser aplicada uma coima (considerando 148 do RGPD). Subsidiariamente, requer que seja proferida admoestação (art. 51.º RGCO, aplicável por força do art. 45.º da Lei n.º 58/2019). [■ VERIFICAR: admissibilidade da admoestação do RGCO nas infrações sancionadas pelo RGPD]

**VI. PEDIDO DE REDUÇÃO DA COIMA** (alternativo ou subsidiário)

Subsidiariamente, caso V. Exas. entendam aplicar coima, solicita-se que:
— A coima seja fixada em montante reduzido, proporcionado às atenuantes invocadas (art. 83.º, n.ºs 1 e 2, RGPD);
— A cooperação com a CNPD e a remediação sejam ponderadas na determinação do montante (art. 83.º, n.º 2, als. c) e f), RGPD).

**VII. DOCUMENTAÇÃO JUNTA**
Anexo A: [descrição]
Anexo B: [descrição]
[...]

Aguardando decisão favorável,

[Nome do Advogado]
Ordem dos Advogados n.º [número]
Em representação de [Nome da Entidade]
[email | telefone | data]

---

**[RECURSO JUDICIAL — Estrutura para uso posterior]**
Se a CNPD aplicar coima: impugnação judicial para os tribunais administrativos (art. 78.º RGPD; art. 34.º, n.ºs 1 e 2, da Lei n.º 58/2019), feita por escrito, com alegações e conclusões, e apresentada à CNPD no prazo de 20 dias após o conhecimento da decisão (art. 59.º, n.º 3, RGCO), prazo que se suspende aos sábados, domingos e feriados (art. 60.º RGCO). [■ VERIFICAR: tribunal administrativo territorialmente competente]

### ETAPA 5 — VALIDAÇÃO
Apresenta dentro de um bloco <checklist_validacao>:
- [ ] Referência do processo e prazo de audiência prévia verificados
- [ ] Infração imputada e moldura contraordenacional identificadas (art. 83.º, n.ºs 4 e 5)
- [ ] Contestação factual fundamentada (se os factos são inexatos)
- [ ] Contestação jurídica fundamentada (se a norma é incorreta)
- [ ] Todas as circunstâncias atenuantes do art. 83.º, n.º 2 invocadas e documentadas
- [ ] Pedido de repreensão (arts. 58.º, n.º 2, al. b), e 83.º, n.º 2, RGPD) ou de redução da coima formulado
- [ ] Documentação probatória identificada e junta como anexos
- [ ] Advogado responsável pela validação e apresentação
- [ ] Pontos [■ VERIFICAR] sinalizados

---

## Dados a recolher (entrevista numa só mensagem)

**ENTIDADE:**
- Nome: [nome], NIF: [número], Dimensão: [microempresa / PME / grande empresa]
- Advogado: [nome, OA n.º]

**PROCESSO CNPD:**
- Número: [número]
- Data da notificação: [data]
- Prazo de resposta: [data]
- Infração imputada: [o que a CNPD diz que a entidade fez/deixou de fazer]
- Artigo RGPD violado (segundo CNPD): [artigo]
- Moldura indicada: [art. 83.º, n.º 4 ou n.º 5 — valor máximo indicado]
- Coima proposta (se indicada): [valor]

**ORIGEM DO PROCESSO:**
- Reclamação de titular? [sim/não — o que alegou]
- Investigação de ofício? [sim/não — contexto]
- Inspeção temática? [sim/não — âmbito]

**SITUAÇÃO DE CONFORMIDADE:**
- A infração é contestável nos factos? [sim/não — justificar]
- A infração é contestável na norma aplicada? [sim/não — justificar]
- Medidas de remediação já implementadas: [listar com datas]
- Dano real para titulares: [sim/não — se sim, descrever]

**ATENUANTES DISPONÍVEIS:**
- Carácter negligente (não doloso): [sim/não]
- Ausência de violações anteriores: [sim/não]
- Cooperação com a CNPD: [sim/não — como]
- Remediação completa: [sim/não]
- Pequena dimensão: [sim/não]
- Outros: [descrever]

**DOCUMENTAÇÃO DISPONÍVEL:**
[Listar documentos probatórios existentes]

**OBSERVAÇÕES:** [qualquer informação relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 83.º, n.º 2 RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 83.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 83.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 83.º, n.º 2 RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 83.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 83.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 83.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 83.º RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 40.º RGPD | conferida (epígrafe) — Códigos de conduta |  |
| art. 40.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 37.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 37.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 37.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 38.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 39.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 39.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 40.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 45.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 45.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 45.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 45.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 45.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 83.º RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| arts. 27.º-A e 28.º RGCO | conferida (epígrafe) — Suspensão da prescrição |  |
| art. 50.º RGCO | conferida (epígrafe) — Direito de audição e defesa do arguido |  |
| art. 83.º, n.º 3, RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 78.º RGPD | conferida (epígrafe) — Direito à ação judicial contra uma autoridade de controlo |  |
| art. 78.º RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
| art. 34.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 34.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 59.º, n.º 3, RGCO | conferida (epígrafe) — Forma e prazo |  |
| art. 59.º, n.º 3, RGCO | conferida (epígrafe) — Forma e prazo |  |
| art. 58.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 83.º, n.º 2, 1.º período, RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 83.º, n.º 2, 1.º período, RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 51.º RGCO | conferida (epígrafe) — Admoestação |  |
| art. 51.º RGCO | conferida (epígrafe) — Admoestação |  |
| art. 88.º RGCO | corrigida — Pagamento da coima | o número citado no catálogo não correspondia à epígrafe |
| art. 50.º do DL n.º 433/82 (RGCO | conferida (epígrafe) — Direito de audição e defesa do arguido |  |
| art. 58.º, n.º 2, al. b), do RGPD | conferida (epígrafe) — Poderes |  |
| art. 83.º, n.ºs 1 e 2, RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 83.º, n.º 2, als. c) e f), RGPD | conferida (epígrafe) — Condições gerais para a aplicação de coimas |  |
| art. 60.º RGCO | conferida (epígrafe) — Contagem do prazo para impugnação |  |
| arts. 58.º, n.º 2, al. b), e 83.º, n.º 2, RGPD | conferida (epígrafe) — Poderes |  |
