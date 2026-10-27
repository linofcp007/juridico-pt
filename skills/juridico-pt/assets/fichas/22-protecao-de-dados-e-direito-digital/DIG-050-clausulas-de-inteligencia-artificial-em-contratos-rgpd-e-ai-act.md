---
codigo: DIG-050
area: "Proteção de Dados e Direito Digital"
titulo: "Cláusulas de Inteligência Artificial em Contratos — RGPD e AI Act"
titulo_en: "Artificial Intelligence Clauses in Contracts — GDPR and AI Act"
descricao: "Estrutura cláusulas contratuais específicas para contratos que envolvam sistemas de inteligência artificial, cobrindo a alocação de responsabilidades entre cliente (deployer) e fornecedor (provider) ao abrigo do AI Act (Regulamento UE 2024/1689) e do RGPD, incluindo cláusulas de auditoria, gestão de incidentes, dados de treino, explicabilidade, supervisão humana e responsabilidade civil."
descricao_en: "Structures specific contractual clauses for contracts involving artificial intelligence systems, covering the allocation of responsibilities between the client (deployer) and the supplier (provider) under the AI Act (Regulation (EU) 2024/1689) and the GDPR, including clauses on audit, incident management, training data, explainability, human oversight and civil liability."
ambito: nacional
estado_citacoes: "conferidas 4 · corrigidas 0 · por conferir 5"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Cláusulas de Inteligência Artificial em Contratos — RGPD e AI Act

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-050
> **EN:** Artificial Intelligence Clauses in Contracts — GDPR and AI Act. Structures specific contractual clauses for contracts involving artificial intelligence systems, covering the allocation of responsibilities between the client (deployer) and the supplier (provider) under the AI Act (Regulation (EU) 2024/1689) and the GDPR, including clauses on audit, incident management, training data, explainability, human oversight and civil liability.
> **Citações:** conferidas 4 · corrigidas 0 · por conferir 5. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Estrutura cláusulas contratuais específicas para contratos que envolvam sistemas de inteligência artificial, cobrindo a alocação de responsabilidades entre cliente (deployer) e fornecedor (provider) ao abrigo do AI Act (Regulamento UE 2024/1689) e do RGPD, incluindo cláusulas de auditoria, gestão de incidentes, dados de treino, explicabilidade, supervisão humana e responsabilidade civil.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— Distingue provider (fornecedor) de deployer (utilizador) — o contrato aloca claramente as responsabilidades.
— O AI Act tem aplicação direta — não pode ser afastado contratualmente em prejuízo dos titulares.
— Para sistemas de alto risco, inclui cláusulas de supervisão humana, auditoria e notificação de incidentes.

## Framework de Cláusulas IA — 6 Módulos

### MÓDULO 1 — IDENTIFICAÇÃO E CLASSIFICAÇÃO
**Cláusula [X.ª] — Identificação do Sistema e Classificação de Risco**

[FORNECEDOR] declara que o Sistema de IA descrito no Anexo [X] se enquadra na categoria de [risco mínimo / transparência / alto risco / GPAI] para efeitos do AI Act (Regulamento UE 2024/1689).

[FORNECEDOR] disponibiliza ao [CLIENTE], antes da implementação, a documentação técnica prevista no artigo 11.º do AI Act, incluindo: descrição geral, capacidades e limitações, dados de treino, resultados de testes e Declaração de Conformidade CE (para sistemas de alto risco).

### MÓDULO 2 — PROTEÇÃO DE DADOS (RGPD)
**Cláusula [X.ª] — Tratamento de Dados Pessoais**

2.1. Na medida em que o Sistema trate dados pessoais do [CLIENTE], [FORNECEDOR] atua como subcontratante (art. 28.º RGPD), regendo-se as condições pelo Anexo de Proteção de Dados.

2.2. [FORNECEDOR] não utilizará os dados pessoais tratados em nome do [CLIENTE] para:
a) Treinar, afinar ou melhorar os seus modelos sem consentimento prévio e expresso do [CLIENTE];
b) Qualquer finalidade não prevista nas instruções documentadas do [CLIENTE].

2.3. Para melhoria do sistema, [FORNECEDOR] utilizará apenas dados anonimizados ou sintéticos, salvo autorização escrita do [CLIENTE] com identificação expressa dos dados e base jurídica.

### MÓDULO 3 — SUPERVISÃO HUMANA E AUDITORIA
**Cláusula [X.ª] — Supervisão Humana e Auditabilidade**

[Para sistemas de alto risco] [FORNECEDOR] garante que o Sistema:
a) Pode ser interrompido pelo [CLIENTE] em qualquer momento;
b) Gera logs auditáveis de decisões com impacto em pessoas, retidos por [período] anos;
c) Fornece explicação compreensível para cada decisão (arts. 13.º e 26.º AI Act, art. 22.º, n.º 3 RGPD).

[CLIENTE] designa supervisor humano qualificado com poderes para anular qualquer decisão do Sistema.

[FORNECEDOR] submete-se a auditoria com pré-aviso de [30 dias], frequência máxima [anual] (art. 28.º, n.º 3, al. h) RGPD + art. 26.º AI Act).

### MÓDULO 4 — GESTÃO DE INCIDENTES
**Cláusula [X.ª] — Incidentes Graves e Anomalias**

[FORNECEDOR] notifica o [CLIENTE] em [24/48] horas de:
a) Incidente grave (art. 3.º, n.º 49 AI Act);
b) Funcionamento anómalo que possa afetar segurança ou direitos fundamentais;
c) Medidas corretivas tomadas.

[FORNECEDOR] reporta incidentes às autoridades competentes (art. 73.º AI Act), notificando simultaneamente o [CLIENTE].

### MÓDULO 5 — RESPONSABILIDADE CIVIL
**Cláusula [X.ª] — Responsabilidade**

[FORNECEDOR] responde por danos resultantes de: incumprimento das obrigações de provider AI Act; deficiências na documentação; falhas de segurança não divulgadas.

[CLIENTE] responde por danos resultantes de: utilização fora do âmbito previsto; falha de supervisão humana; modificações não autorizadas.

Limite de responsabilidade: [definir] | Seguro RC de IA: [FORNECEDOR] mantém apólice com cobertura mínima de [€ X].

### MÓDULO 6 — CESSAÇÃO E PORTABILIDADE
**Cláusula [X.ª] — Cessação**

No final do contrato, [FORNECEDOR] disponibiliza em formato interoperável todos os dados, modelos afínados e configurações desenvolvidas no âmbito do contrato.

[FORNECEDOR] elimina ou devolve todos os dados pessoais (art. 28.º, n.º 3, al. g) RGPD) em [30 dias], com confirmação escrita.

---

## DADOS DO CONTRATO:

- **Tipo de sistema de IA:** [descrever]
- **Fornecedor:** [nome, país]
- **Cliente:** [nome]
- **Categoria de risco AI Act:** [alto / transparência / mínimo / GPAI]
- **Dados pessoais envolvidos:** [sim/não — categorias]
- **Contexto:** [setor, tipo de decisões]
- **Módulos relevantes:** [todos ou selecionar]
- **Contrato existente a rever:** [sim/não]
- **Observações:** [contexto]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| artigo 11.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º RGPD | conferida (índice) |  |
| arts. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 22.º, n.º 3 RGPD | conferida (epígrafe) — Decisões individuais automatizadas, incluindo definição de perfis |  |
| art. 28.º, n.º 3, al. h) RGPD | conferida (índice) |  |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 3.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 73.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 28.º, n.º 3, al. g) RGPD | conferida (índice) |  |
