---
codigo: UE-045
area: "Direito da União Europeia"
titulo: "Acordo de Nível de Serviço e Cláusulas de Conformidade Regulatória UE em Contratos de Cloud Computing"
titulo_en: "Service Level Agreement and EU Regulatory Compliance Clauses in Cloud Computing Contracts"
descricao: "Elabora as cláusulas de conformidade com o direito da UE para contratos de computação em nuvem (cloud), cobrindo o Regulamento DORA (Digital Operational Resilience Act), o RGPD, o AI Act (quando aplicável), as Cláusulas Contratuais-Tipo para transferências internacionais e os requisitos do Regulamento sobre Dados (Data Act — Regulamento (UE) 2023/2854)."
descricao_en: "Drafts the EU law compliance clauses for cloud computing contracts, covering the DORA Regulation (Digital Operational Resilience Act), the GDPR (RGPD), the AI Act (where applicable), the Standard Contractual Clauses for international transfers and the requirements of the Data Act (Regulation (EU) 2023/2854)."
ambito: ue
estado_citacoes: "conferidas 2 · corrigidas 0 · por conferir 16"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Acordo de Nível de Serviço e Cláusulas de Conformidade Regulatória UE em Contratos de Cloud Computing

> **Âmbito:** UE · **Área:** Direito da União Europeia · **Código:** UE-045
> **EN:** Service Level Agreement and EU Regulatory Compliance Clauses in Cloud Computing Contracts. Drafts the EU law compliance clauses for cloud computing contracts, covering the DORA Regulation (Digital Operational Resilience Act), the GDPR (RGPD), the AI Act (where applicable), the Standard Contractual Clauses for international transfers and the requirements of the Data Act (Regulation (EU) 2023/2854).
> **Citações:** conferidas 2 · corrigidas 0 · por conferir 16. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Elabora as cláusulas de conformidade com o direito da UE para contratos de computação em nuvem (cloud), cobrindo o Regulamento DORA (Digital Operational Resilience Act), o RGPD, o AI Act (quando aplicável), as Cláusulas Contratuais-Tipo para transferências internacionais e os requisitos do Regulamento sobre Dados (Data Act — Regulamento (UE) 2023/2854).

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— NUNCA inventes normas ou orientações que não existam.
— Se faltar dado, marca [■ VERIFICAR: o que é necessário].
— Cita artigos reais dos Regulamentos mencionados.
— O DORA aplica-se a entidades financeiras; para setores não financeiros, o RGPD e o Data Act são os instrumentos centrais.

## Framework P.A.C.E.F — Segue estas 5 etapas:

### ETAPA 1 — PROBLEMATIZAÇÃO
Dentro de <analise_da_situacao>:
- Tipo de entidade contratante: financeira (banco, seguradora, gestora — sujeita ao DORA) ou não financeira
- Tipo de serviço de cloud: IaaS, PaaS, SaaS; função crítica ou importante para a entidade financeira (DORA)
- Localização do fornecedor e dos centros de dados (dentro/fora da UE)
- Processamento de dados pessoais: natureza e volume
- Uso de IA no serviço: sim/não
- Dados em falta

### ETAPA 2 — ANÁLISE JURÍDICA
Dentro de <fundamentos_juridicos>:
- DORA (Reg. 2022/2554, aplicável desde 17/01/2025):
  • Art. 28.º: requisitos mínimos de contratos com fornecedores de TIC críticos: descrição completa dos serviços, localizações, direito de auditoria, direito de acesso, planos de saída, disposições sobre segurança
  • Art. 30.º: disposições contratuais adicionais para fornecedores críticos de TIC de terceiros; direitos de auditoria pelas autoridades de supervisão
  • Arts. 31.º-44.º: quadro de supervisão de fornecedores críticos de TIC de terceiros designados pela Comissão
- RGPD (Reg. 2016/679):
  • Art. 28.º: contrato de subcontratação de tratamento de dados; cláusulas obrigatórias
  • Art. 46.º: transferências para países terceiros: Cláusulas Contratuais-Tipo (SCCs) ou outras salvaguardas
- Data Act (Reg. 2023/2854, aplicável desde 12/09/2025):
  • Art. 23.º-31.º: requisitos para contratos de cloud com utilizadores profissionais: portabilidade de dados, direito de mudança de fornecedor (switching), interoperabilidade
  • Art. 29.º: obrigação de portabilidade dos dados do utilizador para outro fornecedor
  • Art. 30.º: taxas de switching — proibição de taxas excessivas de transferência de dados; redução progressiva até eliminação
- AI Act (arts. 8.º-15.º): se o serviço integra sistemas de IA de alto risco, obrigações adicionais para implementadores

### ETAPA 3 — CLÁUSULAS A INCLUIR
Dentro de <estrutura_clausulas>:
- Tabela: regulamento | cláusula obrigatória | conteúdo mínimo | prioridade (DORA obrigatório vs. negociável)

### ETAPA 4 — CLÁUSULAS DE CONFORMIDADE
Redige as cláusulas:

**CLÁUSULAS DE CONFORMIDADE REGULATÓRIA UE — CONTRATO DE CLOUD COMPUTING**

**Cláusula 1.ª — Conformidade com o DORA (Reg. (UE) 2022/2554) [aplicável a entidades financeiras]**
1.1. O Fornecedor compromete-se a cumprir os requisitos aplicáveis aos fornecedores de serviços de TIC de terceiros previstos no Regulamento (UE) 2022/2554 (DORA), nomeadamente os artigos 28.º e 30.º.
1.2. O Fornecedor garante que:
(a) Todos os centros de dados que prestam os serviços abrangidos pelo presente contrato se localizam em [localização — identificar]; qualquer alteração requer consentimento prévio por escrito do Cliente;
(b) O Cliente tem direito a realizar ou a encomendar auditorias anuais ao Fornecedor, presencialmente ou por meios equivalentes, nos termos do art. 28.º, n.º 3, al. f), DORA;
(c) As autoridades de supervisão competentes (Banco de Portugal, CMVM, ASF — conforme aplicável) têm direito de acesso às instalações, sistemas e documentação do Fornecedor relevantes para os serviços contratados, nos termos do art. 30.º, n.º 3, DORA;
(d) O Fornecedor disponibiliza ao Cliente, mediante solicitação, um plano de continuidade documentado e testado para os serviços contratados.

**Cláusula 2.ª — Conformidade com o RGPD (Reg. (UE) 2016/679)**
2.1. Para efeitos do RGPD, o Fornecedor atua como subcontratante (processador de dados) na aceção do art. 28.º do RGPD.
2.2. O Fornecedor:
(a) Trata os dados pessoais apenas mediante instrução documentada do Cliente;
(b) Assegura que as pessoas autorizadas a tratar os dados assumiram compromissos de confidencialidade;
(c) Adota as medidas de segurança adequadas (art. 32.º RGPD);
(d) Não recorre a subcontratante sem autorização prévia por escrito do Cliente;
(e) Presta assistência ao Cliente para resposta a pedidos dos titulares e notificações de violações;
(f) Apaga ou devolve todos os dados no final do contrato.
2.3. Se os dados são transferidos para fora do EEE: o Fornecedor aplica as Cláusulas Contratuais-Tipo aprovadas pela Decisão da Comissão (UE) 2021/914, Módulo 2 (responsável → subcontratante).

**Cláusula 3.ª — Portabilidade e Direito de Mudança (Data Act — Reg. (UE) 2023/2854)**
3.1. Nos termos dos artigos 23.º a 31.º do Regulamento (UE) 2023/2854:
(a) O Fornecedor garante que todos os dados do Cliente podem ser exportados em formato amplamente utilizado e legível por máquina, sem perda de conteúdo, mediante pedido e no prazo de 30 dias;
(b) O Cliente tem o direito de mudar para outro fornecedor de cloud sem encargos excessivos de switching; as taxas de transferência de dados associadas à mudança não podem exceder [os custos efetivos de transferência — em conformidade com o calendário de redução do art. 30.º, n.º 5, Data Act];
(c) O Fornecedor coopera com o novo fornecedor designado pelo Cliente para assegurar portabilidade funcional dos dados e aplicações.

**Cláusula 4.ª — Plano de Saída**
4.1. O Fornecedor desenvolve e mantém um plano de saída documentado que assegura:
(a) Continuidade dos serviços durante período de transição de mínimo [X meses] após denúncia ou extinção do contrato;
(b) Exportação de todos os dados do Cliente no prazo de [30 dias] após a extinção;
(c) Eliminação certificada de todos os dados do Cliente após confirmação de receção pelo Cliente ou pelo novo fornecedor.

### ETAPA 5 — CHECKLIST DE VALIDAÇÃO
Dentro de <checklist_validacao>:
- [ ] Cláusulas DORA incluídas (se entidade financeira) — arts. 28.º e 30.º
- [ ] Contrato de subcontratação RGPD (art. 28.º) incluído ou em anexo
- [ ] Cláusulas Contratuais-Tipo incluídas se transferência para fora do EEE
- [ ] Cláusulas de portabilidade e switching (Data Act) incluídas
- [ ] Plano de saída documentado e com prazo mínimo de transição
- [ ] Localização dos centros de dados identificada e aprovada
- [ ] Direito de auditoria do cliente e das autoridades incluído
- [ ] [■ VERIFICAR] itens sinalizados

---

## Dados a recolher (entrevista numa só mensagem)
- Entidade contratante: [nome, tipo — financeira/não financeira, setor]
- Fornecedor de cloud: [nome, país de estabelecimento, localização dos centros de dados]
- Tipo de serviço: [IaaS / PaaS / SaaS; função crítica para entidade financeira: sim/não]
- Dados pessoais tratados: [tipo, volume, categorias especiais: sim/não]
- Transferência para fora do EEE: [sim/não; países]
- IA integrada no serviço: [sim/não]
- Objetivo: [novo contrato / revisão de contrato existente / auditoria de conformidade]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| Art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 30.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 30.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Arts. 31.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 46.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 23.º | por conferir [■ VERIFICAR] | diploma não identificado |
| Art. 29.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 8.º | por conferir [■ VERIFICAR] | diploma não identificado |
| artigos 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 30.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 30.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º do RGPD | conferida (índice) |  |
| art. 32.º RGPD | conferida (epígrafe) — Segurança do tratamento |  |
| artigos 23.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 28.º | por conferir [■ VERIFICAR] | diploma não identificado |
