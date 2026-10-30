---
codigo: DIG-057
area: "Proteção de Dados e Direito Digital"
titulo: "Notificação de Sistema de IA de Alto Risco à Autoridade Nacional Competente (AI Act)"
titulo_en: "Notification of a High-Risk AI System to the National Competent Authority (AI Act)"
descricao: "Estrutura o registo de um sistema de inteligência artificial de alto risco na base de dados da UE ao abrigo dos artigos 49.º e 71.º do AI Act (Regulamento UE 2024/1689), a documentação e a avaliação da conformidade a preparar, a Declaração UE de Conformidade prevista no artigo 47.º do AI Act para sistemas de alto risco do Anexo III, e a autoridade nacional competente em Portugal (designação a confirmar)."
descricao_en: "Structures the registration of a high-risk artificial intelligence system in the EU database under Articles 49 and 71 of the AI Act (Regulation (EU) 2024/1689), the documentation and conformity assessment to prepare, the EU Declaration of Conformity under Article 47 of the AI Act for Annex III high-risk systems, and the national competent authority in Portugal (designation to be confirmed)."
ambito: nacional
estado_citacoes: "conferidas 1 · corrigidas 0 · por conferir 25"
revisao_tecnica: "2026-10-30 (corrigida)"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Notificação de Sistema de IA de Alto Risco à Autoridade Nacional Competente (AI Act)

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-057
> **EN:** Notification of a High-Risk AI System to the National Competent Authority (AI Act). Structures the registration of a high-risk artificial intelligence system in the EU database under Articles 49 and 71 of the AI Act (Regulation (EU) 2024/1689), the documentation and conformity assessment to prepare, the EU Declaration of Conformity under Article 47 of the AI Act for Annex III high-risk systems, and the national competent authority in Portugal (designation to be confirmed).
> **Citações:** conferidas 1 · corrigidas 0 · por conferir 25. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.
> **Revisão técnica:** 2026-10-30 — corrigida (6 correções com fonte). O que mudou e as fontes em `assets/fichas/revisao-tecnica.md`; falta a confirmação de um advogado.

Estrutura o registo de um sistema de inteligência artificial de alto risco na base de dados da UE ao abrigo dos artigos 49.º e 71.º do AI Act (Regulamento UE 2024/1689), a documentação e a avaliação da conformidade a preparar, a Declaração UE de Conformidade prevista no artigo 47.º do AI Act para sistemas de alto risco do Anexo III, e a autoridade nacional competente em Portugal (designação a confirmar).

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
- 2 agosto 2025: obrigações para GPAI (modelos de IA de finalidade geral)
- 2 dezembro 2027: obrigações para sistemas de alto risco do Anexo III (art. 113.º AI Act, na redação do Reg. (UE) 2026/1744 — Omnibus Digital, em vigor desde 27/7/2026; a data inicial era 2 agosto 2026)
- 2 agosto 2028: sistemas de alto risco do Anexo I (produtos regulados: dispositivos médicos, etc.), na mesma redação

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

4. **DPIA a cargo do deployer, que usa as informações fornecidas pelo provider nos termos do art. 13.º AI Act (art. 26.º, n.º 9 AI Act + art. 35.º RGPD)**

5. **Declaração de Conformidade UE (art. 47.º AI Act):**
   - Identificação do sistema e do provider
   - Confirmação de conformidade com os requisitos do Capítulo III AI Act
   - Referência à documentação técnica
   - Data e assinatura do representante autorizado

### ETAPA 3 — MARCAÇÃO CE E DECLARAÇÃO DE CONFORMIDADE
Descreve o processo:
- Avaliação de conformidade: art. 43.º AI Act — controlo interno (anexo VI) ou procedimento com organismo notificado (anexo VII)
- Anexo III, pontos 2 a 8: controlo interno obrigatório pelo provider, sem organismo notificado (art. 43.º, n.º 2 AI Act)
- Anexo III, ponto 1 (biometria, incluindo reconhecimento de emoções): se o provider aplicou normas harmonizadas ou especificações comuns, escolhe entre controlo interno e organismo notificado; o organismo notificado só é obrigatório nos casos do art. 43.º, n.º 1, segundo parágrafo (p. ex., normas inexistentes, não aplicadas ou aplicadas só em parte)
- Anexo I, secção A (produtos regulados): segue-se a avaliação da conformidade prevista na legislação setorial (art. 43.º, n.º 3 AI Act)
- Após avaliação conforme: Declaração UE de Conformidade (art. 47.º) + Marcação CE

### ETAPA 4 — REGISTO NA BASE DE DADOS UE (art. 71.º AI Act)
Descreve o procedimento de registo:
- Base de dados: a base de dados da UE criada e mantida pela Comissão, em colaboração com os Estados-Membros (art. 71.º AI Act) [■ VERIFICAR: endereço oficial de acesso; não usar domínios não confirmados]
- Obrigação: providers (ou mandatários) de sistemas de alto risco do Anexo III registam-se e registam o sistema antes da colocação no mercado ou em serviço (art. 49.º, n.º 1 AI Act); os do Anexo III, ponto 2 (infraestruturas críticas), são registados a nível nacional (art. 49.º, n.º 5 AI Act); regista-se também o sistema que o provider concluiu não ser de alto risco ao abrigo do art. 6.º, n.º 3 (art. 49.º, n.º 2 AI Act)
- Deployers que sejam autoridades públicas ou pessoas que atuem em seu nome: registam-se, selecionam o sistema e registam a sua utilização na mesma base de dados (art. 49.º, n.º 3 AI Act)
- Informação a registar: identificação do provider, descrição do sistema, finalidade, categoria de risco, estado de conformidade

### ETAPA 5 — AUTORIDADE NACIONAL E SUPERVISÃO
Apresenta dentro de um bloco <autoridade_nacional>:
- Designação da autoridade nacional competente ao abrigo do art. 70.º AI Act em Portugal: [■ VERIFICAR: diploma de designação em PT — o Governo anunciou em 19/9/2025 a intenção de designar a ANACOM como autoridade de fiscalização do mercado e ponto de contacto único, mas a designação não estava publicada em outubro de 2026]
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
| art. 113.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 23.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 11.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 17.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 12.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 35.º RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 43.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 43.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 43.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 43.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 71.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 71.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 73.º | por conferir [■ VERIFICAR] | diploma não identificado |
