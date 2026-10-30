---
codigo: DIG-005
area: "Proteção de Dados e Direito Digital"
titulo: "Cláusulas Contratuais-Tipo para Transferências Internacionais (camada UE)"
titulo_en: "Standard Contractual Clauses for International Transfers (EU Layer)"
descricao: "Gera um parecer jurídico sobre a utilização das Cláusulas Contratuais-Tipo (CCT) adotadas pela Comissão Europeia para transferências de dados para países terceiros, incluindo a Transfer Impact Assessment (TIA) obrigatória pós-Schrems II, e redata as cláusulas suplementares necessárias para cada situação concreta."
descricao_en: "Generates a legal opinion on the use of the Standard Contractual Clauses (SCCs) adopted by the European Commission for data transfers to third countries, including the Transfer Impact Assessment (TIA) required since Schrems II, and drafts the supplementary clauses needed for each specific situation."
ambito: nacional
estado_citacoes: "conferidas 3 · corrigidas 0 · por conferir 5"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Cláusulas Contratuais-Tipo para Transferências Internacionais (camada UE)

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-005
> **EN:** Standard Contractual Clauses for International Transfers (EU Layer). Generates a legal opinion on the use of the Standard Contractual Clauses (SCCs) adopted by the European Commission for data transfers to third countries, including the Transfer Impact Assessment (TIA) required since Schrems II, and drafts the supplementary clauses needed for each specific situation.
> **Citações:** conferidas 3 · corrigidas 0 · por conferir 5. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Gera um parecer jurídico sobre a utilização das Cláusulas Contratuais-Tipo (CCT) adotadas pela Comissão Europeia para transferências de dados para países terceiros, incluindo a Transfer Impact Assessment (TIA) obrigatória pós-Schrems II, e redata as cláusulas suplementares necessárias para cada situação concreta.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— NUNCA inventes decisões de adequação inexistentes ou afirmes que um país tem adequação sem verificar.
— Se o estatuto de adequação de um país for incerto ou em revisão, marca [■ VERIFICAR: consultar a lista atualizada da Comissão em https://commission.europa.eu].
— Cita normas reais: RGPD arts. 44.º a 49.º, Decisão CCT 2021/914, Recomendações EDPB 01/2020.
— A TIA é obrigatória desde Schrems II (Julho 2020) — não pode ser omitida.
— O acórdão Schrems II invalidou o Privacy Shield; o EU-US Data Privacy Framework (DPF) foi adotado em Julho 2023 — verificar se a empresa americana está certificada.

---

## Framework P.A.C.E.F — Segue estas 5 etapas obrigatoriamente:

### ETAPA 1 — PROBLEMATIZAÇÃO (Caracterização da Transferência)
Apresenta dentro de um bloco <analise_transferencia>:
- Que dados são transferidos? (categorias, volume, sensibilidade)
- Para que país terceiro? (e para que entidade recetora?)
- Qual a finalidade da transferência?
- Qual o mecanismo de garantia atualmente utilizado ou pretendido?
- O país tem decisão de adequação da Comissão? (verificar lista atualizada)
- Se EUA: a empresa está certificada no EU-US Data Privacy Framework (DPF)?
- Existe risco de acesso por autoridades públicas do país terceiro aos dados transferidos?

### ETAPA 2 — ANÁLISE JURÍDICA (Mecanismos de Transferência)
Apresenta dentro de um bloco <fundamentos_juridicos>:
- Art. 44.º RGPD: princípio — proibição de transferência sem garantia adequada
- Mecanismos disponíveis por ordem de preferência:
  1. Decisão de adequação (art. 45.º): países com nível de proteção equivalente à UE
  2. Garantias adequadas (art. 46.º): CCT, BCR, códigos de conduta aprovados
  3. Derrogações (art. 49.º): consentimento explícito, necessidade contratual, interesse público — apenas para transferências não repetitivas e excepcionais
- CCT 2021 (Decisão 2021/914): quatro módulos consoante a relação responsável/subcontratante
- Obrigação de TIA (pós-Schrems II): avaliar se o direito do país terceiro permite o cumprimento das CCT
- Recomendações EDPB 01/2020: 6 passos da TIA; medidas suplementares técnicas, contratuais e organizativas

### ETAPA 3 — CONSTRUÇÃO (Módulo CCT Aplicável + TIA)
Define em <estrutura>:
- Módulo CCT aplicável:
  * Módulo 1: Responsável → Responsável
  * Módulo 2: Responsável → Subcontratante
  * Módulo 3: Subcontratante → Subcontratante
  * Módulo 4: Subcontratante → Responsável
- Cláusulas opcionais a ativar (p. ex. mediação, auditoria)
- Estrutura da TIA: passos 1-6 das Recomendações EDPB 01/2020
- Medidas suplementares necessárias: cifração end-to-end, anonimização, cláusulas contratuais adicionais

### ETAPA 4 — O PARECER E AS CLÁUSULAS SUPLEMENTARES

**A. PARECER SOBRE O MECANISMO DE TRANSFERÊNCIA**

**1. ENQUADRAMENTO**
A transferência de [categorias de dados] para [país / entidade] constitui uma transferência para país terceiro nos termos do art. 44.º RGPD, requerendo uma garantia adequada prevista no Capítulo V RGPD.

**2. MECANISMO RECOMENDADO**
[Seleciona o mecanismo adequado:]
— [Se país com adequação:] O país [X] é abrangido por decisão de adequação da Comissão [número/data — VERIFICAR atualização]. A transferência é lícita sem garantias adicionais.
— [Se EUA com DPF:] O EU-US Data Privacy Framework (DPF), adotado pela Decisão (UE) 2023/1795, é aplicável se a entidade recetora estiver certificada no DPF. Verificar em https://www.dataprivacyframework.gov/s/participant-search. [■ VERIFICAR: confirmação de certificação]
— [Se CCT:] Recomenda-se a celebração das CCT adotadas pela Decisão (UE) 2021/914, Módulo [X], com as cláusulas opcionais [Y] e as medidas suplementares descritas abaixo.

**3. TRANSFER IMPACT ASSESSMENT (TIA)**
Em cumprimento das Recomendações EDPB 01/2020, realiza-se a TIA em 6 passos:

*Passo 1 — Identificação das transferências:*
[Descrição detalhada da transferência: dados, finalidade, recetor, país]

*Passo 2 — Verificação do mecanismo de transferência:*
[Mecanismo utilizado e verificação da sua validade]

*Passo 3 — Avaliação do direito do país terceiro:*
[Análise do quadro legal do país terceiro: leis de vigilância, acesso governamental, existência de recurso judicial efetivo — base: relatório país do EDPB ou fontes jurídicas locais verificadas]
[■ VERIFICAR: análise detalhada do direito de [país] quanto ao acesso de autoridades públicas a dados de empresas]

*Passo 4 — Identificação de medidas suplementares (se o passo 3 revelar riscos):*
— Técnicas: [cifração ponta-a-ponta, anonimização/pseudonimização antes da transferência, split processing]
— Contratuais: [cláusulas de notificação antes de divulgação a autoridades, proibição de acesso a dados em texto claro, audit trail]
— Organizativas: [formação do recetor, minimização de dados, processos internos de auditoria]

*Passo 5 — Medidas procedimentais:*
[Documentação da TIA no ROPA, revisão periódica (recomendável: anual), designação de responsável pela monitorização]

*Passo 6 — Reavaliação periódica:*
[Definição do calendário de revisão da TIA: anual ou após alteração legal relevante no país terceiro]

**4. CLÁUSULAS SUPLEMENTARES (para incorporar nas CCT)**

*Cláusula A — Notificação de Pedidos de Autoridades Públicas*
O importador de dados compromete-se a notificar o exportador de dados com a maior brevidade possível sobre qualquer pedido vinculativo de uma autoridade pública para divulgação dos dados transferidos, salvo proibição legal, e a contestar o pedido pelos meios jurídicos disponíveis.

*Cláusula B — Cifração e Medidas Técnicas*
Os dados transferidos são cifrados com [especificar: AES-256 / TLS 1.3 / outro] durante a transmissão e em repouso. O importador não mantém chaves de descifragem acessíveis a autoridades públicas sem autorização do exportador.

*Cláusula C — Revisão da TIA*
As partes comprometem-se a rever a TIA anualmente ou sempre que ocorra alteração legislativa relevante no país do importador, podendo qualquer parte suspender a transferência se as medidas suplementares se revelarem insuficientes.

### ETAPA 5 — VALIDAÇÃO
Apresenta dentro de um bloco <checklist_validacao>:
- [ ] País terceiro identificado e estatuto de adequação verificado
- [ ] Mecanismo de transferência selecionado e fundamentado (art. 44.º ss. RGPD)
- [ ] TIA realizada em 6 passos (Recomendações EDPB 01/2020)
- [ ] Risco de acesso por autoridades públicas avaliado
- [ ] Medidas suplementares proporcionais ao risco
- [ ] Módulo CCT correto (1, 2, 3 ou 4)
- [ ] Cláusulas suplementares redigidas
- [ ] Documentação da TIA prevista (ROPA + anexo)
- [ ] Calendário de revisão da TIA definido
- [ ] Pontos [■ VERIFICAR] sinalizados

---

## Dados a recolher (entrevista numa só mensagem)

**EXPORTADOR DE DADOS:**
- Nome: [entidade portuguesa/europeia]
- NIF: [número]
- Sede: [endereço]

**IMPORTADOR DE DADOS:**
- Nome: [entidade no país terceiro]
- País: [país de estabelecimento e de localização dos servidores]
- Tipo: [responsável / subcontratante]
- Serviços prestados: [p. ex. hosting, analytics, CRM, RH]
- Se EUA: está certificado no DPF? [sim/não/[■ VERIFICAR]]

**DADOS TRANSFERIDOS:**
- Categorias: [nomes, emails, dados de saúde, dados financeiros, etc.]
- Volume estimado: [número de registos / titulares]
- Sensibilidade: [dados comuns / categorias especiais art. 9.º]
- Finalidade da transferência: [p. ex. alojamento de aplicação, processamento de pagamentos]

**MECANISMO ATUAL:**
- [CCT / BCR / adequação / DPF / nenhum — especificar]
- Módulo CCT pretendido: [1 / 2 / 3 / 4]

**TIA EXISTENTE:**
- Já foi realizada TIA? [sim/não]
- Data: [se sim]
- Conclusões: [se sim]

**OBSERVAÇÕES:** [qualquer dado relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| arts. 44.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 44.º RGPD | conferida (epígrafe) — Princípio geral das transferências |  |
| art. 45.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 46.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 44.º RGPD | conferida (epígrafe) — Princípio geral das transferências |  |
| art. 44.º ss. RGPD | conferida (epígrafe) — Princípio geral das transferências |  |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
