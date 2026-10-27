---
codigo: DIG-057
area: "Proteção de Dados e Direito Digital"
titulo: "Notificação de Sistema de IA de Alto Risco à Autoridade Nacional Competente (AI Act)"
titulo_en: "Notification of a High-Risk AI System to the National Competent Authority (AI Act)"
descricao: "Estrutura o processo de notificação e registo de um sistema de inteligência artificial de alto risco ao abrigo dos artigos 49.º e 71.º do AI Act (Regulamento UE 2024/1689), determinando a autoridade nacional competente em Portugal, os documentos a submeter, e a articulação com a Declaração de Conformidade CE prevista no artigo 47.º do AI Act para sistemas de alto risco do Anexo III."
descricao_en: "Structures the notification and registration process for a high-risk artificial intelligence system under Articles 49 and 71 of the AI Act (Regulation (EU) 2024/1689), determining the national competent authority in Portugal, the documents to be submitted and the link with the EU Declaration of Conformity under Article 47 of the AI Act for Annex III high-risk systems."
ambito: nacional
estado_citacoes: "conferidas 1 · corrigidas 0 · por conferir 15"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Notificação de Sistema de IA de Alto Risco à Autoridade Nacional Competente (AI Act)

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-057
> **EN:** Notification of a High-Risk AI System to the National Competent Authority (AI Act). Structures the notification and registration process for a high-risk artificial intelligence system under Articles 49 and 71 of the AI Act (Regulation (EU) 2024/1689), determining the national competent authority in Portugal, the documents to be submitted and the link with the EU Declaration of Conformity under Article 47 of the AI Act for Annex III high-risk systems.
> **Citações:** conferidas 1 · corrigidas 0 · por conferir 15. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Estrutura o processo de notificação e registo de um sistema de inteligência artificial de alto risco ao abrigo dos artigos 49.º e 71.º do AI Act (Regulamento UE 2024/1689), determinando a autoridade nacional competente em Portugal, os documentos a submeter, e a articulação com a Declaração de Conformidade CE prevista no artigo 47.º do AI Act para sistemas de alto risco do Anexo III.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Distingue obrigações do provider (que coloca no mercado) do deployer (que utiliza) — os prazos e obrigações de notificação diferem.
— Os prazos de aplicação do AI Act são faseados — verifica sempre o prazo aplicável ao tipo de sistema.
— A autoridade nacional competente em Portugal ainda está a ser designada — sinaliza [■ VERIFICAR: designação formal da autoridade PT ao abrigo do art. 70.º AI Act].

## Análise e Notificação — 5 Etapas

### ETAPA 1 — DETERMINAÇÃO DO ÂMBITO E PRAZOS
Apresenta dentro de um bloco <ambito_prazos>:
Verifica a categoria do sistema e os prazos de aplicação do AI Act:

**Calendário AI Act (datas-chave):**
- 2 fevereiro 2025: proibições absolutas (art. 5.º) em vigor
- 2 agosto 2025: obrigações para GPAI (modelos de linguagem de propósito geral)
- 2 agosto 2026: obrigações para sistemas de alto risco (Anexo III) em vigor
- 2 agosto 2027: sistemas de alto risco Anexo II (dispositivos médicos, etc.)

Papel da organização:
- **Provider:** coloca o sistema no mercado ou em serviço na UE → obrigações mais extensas
- **Deployer:** utiliza o sistema num contexto profissional → obrigações do art. 26.º AI Act
- **Importador/distribuidor:** regime específico arts. 23.º-24.º AI Act

### ETAPA 2 — DOCUMENTAÇÃO OBRIGATÓRIA (provider de alto risco)
Lista documentação a preparar antes do lançamento:
1. **Documentação técnica (art. 11.º + Anexo IV AI Act):**
   - Descrição geral do sistema e finalidade prevista
   - Descrição dos componentes do sistema e arquitetura
   - Dados utilizados no treino, validação e teste
   - Capacidades e limitações do desempenho
   - Resultados de testes de desempenho e avaliação de riscos
   - Medidas de supervisão humana implementadas

2. **Sistema de gestão da qualidade (art. 17.º AI Act):**
   - Estratégia de conformidade regulatória
   - Processos de verificação e validação
   - Monitorização pós-mercado

3. **Registo de logs (art. 12.º AI Act):**
   - Capacidade de geração automática de logs durante o funcionamento
   - Período de retenção mínimo

4. **DPIA integrada (art. 26.º, n.º 9 AI Act + art. 35.º RGPD)**

5. **Declaração de Conformidade UE (art. 47.º AI Act):**
   - Identificação do sistema e do provider
   - Confirmação de conformidade com os requisitos do Capítulo III AI Act
   - Referência à documentação técnica
   - Data e assinatura do representante autorizado

### ETAPA 3 — MARCAÇÃO CE E DECLARAÇÃO DE CONFORMIDADE
Descreve o processo:
- Avaliação de conformidade: art. 43.º AI Act — autoevaluação ou organismo notificado
- Sistemas de auto-avaliação: a maioria dos sistemas Anexo III admite auto-avaliação pelo provider
- Exceções (organismo notificado obrigatório): sistemas de identificação biométrica, sistemas emocionais
- Após avaliação conforme: Declaração UE de Conformidade (art. 47.º) + Marcação CE

### ETAPA 4 — REGISTO NA BASE DE DADOS UE (art. 71.º AI Act)
Descreve o procedimento de registo:
- Base de dados: eu-aidb.eu ou portal European AI Office [■ VERIFICAR: URL oficial]
- Obrigação: providers de sistemas de alto risco registam o sistema antes de colocação no mercado
- Deployers de entidades públicas: registo na mesma base de dados (art. 49.º, n.º 2 AI Act)
- Informação a registar: identificação do provider, descrição do sistema, finalidade, categoria de risco, estado de conformidade

### ETAPA 5 — AUTORIDADE NACIONAL E SUPERVISÃO
Apresenta dentro de um bloco <autoridade_nacional>:
- Designação da autoridade nacional competente ao abrigo do art. 70.º AI Act em Portugal: [■ VERIFICAR: decreto-lei ou portaria de designação em PT]
- Ponto de contacto nacional
- Obrigação de notificação de incidentes graves: art. 73.º AI Act → à autoridade nacional
- Cooperação com o AI Office europeu para sistemas GPAI
- Articulação com CNPD (proteção de dados) e outras autoridades setoriais (ERS, BdP, etc.)

---

## DADOS DO SISTEMA:

- **Provider:** [nome, país de estabelecimento na UE]
- **Tipo de sistema:** [descrever]
- **Categoria Anexo III:** [ponto específico do Anexo III]
- **Documentação técnica:** [disponível / a preparar]
- **DPIA realizada:** [sim/não]
- **Avaliação de conformidade:** [auto-avaliação / organismo notificado]
- **Data prevista de lançamento:** [dd/mm/aaaa]
- **Observações:** [contexto]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 70.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 70.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 23.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 11.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 17.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 12.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 43.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 71.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 73.º | por conferir [■ VERIFICAR] | diploma não identificado |
