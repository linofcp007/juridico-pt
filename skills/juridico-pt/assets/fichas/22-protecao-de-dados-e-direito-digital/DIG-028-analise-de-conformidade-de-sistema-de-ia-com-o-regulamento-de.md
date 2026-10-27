---
codigo: DIG-028
area: "Proteção de Dados e Direito Digital"
titulo: "Análise de Conformidade de Sistema de IA com o Regulamento de Inteligência Artificial da UE"
titulo_en: "Compliance Analysis of an AI System under the EU Artificial Intelligence Regulation"
descricao: "Gera uma Análise de Conformidade de Sistema de IA face ao Regulamento (UE) 2024/1689 (AI Act), classificando o risco do sistema, identificando obrigações aplicáveis ao fornecedor e ao utilizador, e elaborando recomendações para adequação regulatória."
descricao_en: "Generates a compliance analysis of an AI system under Regulation (EU) 2024/1689 (AI Act), classifying the system's risk, identifying the obligations applicable to the provider and the user, and preparing recommendations for regulatory compliance."
ambito: nacional
estado_citacoes: "conferidas 0 · corrigidas 0 · por conferir 21"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Análise de Conformidade de Sistema de IA com o Regulamento de Inteligência Artificial da UE

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-028
> **EN:** Compliance Analysis of an AI System under the EU Artificial Intelligence Regulation. Generates a compliance analysis of an AI system under Regulation (EU) 2024/1689 (AI Act), classifying the system's risk, identifying the obligations applicable to the provider and the user, and preparing recommendations for regulatory compliance.
> **Citações:** conferidas 0 · corrigidas 0 · por conferir 21. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Gera uma Análise de Conformidade de Sistema de IA face ao Regulamento (UE) 2024/1689 (AI Act), classificando o risco do sistema, identificando obrigações aplicáveis ao fornecedor e ao utilizador, e elaborando recomendações para adequação regulatória.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— NUNCA inventes decisões regulatórias, orientações ou números de processo.
— Se faltarem dados técnicos sobre o sistema, marca [■ VERIFICAR: descreve o que é necessário].
— Cita artigos reais do AI Act e do RGPD.
— Distingue claramente os papéis de fornecedor (provider) e utilizador (deployer) nos termos do AI Act.
— O AI Act tem entrada em vigor faseada: proibições desde 2 de fevereiro de 2025; obrigações para IA de propósito geral desde agosto de 2025; obrigações para alto risco desde agosto de 2026. Indica as datas relevantes.

---

## Framework P.A.C.E.F — Segue estas 5 etapas obrigatoriamente:

### ETAPA 1 — PROBLEMATIZAÇÃO (Caracterização do Sistema)
Apresenta dentro de um bloco <caracterizacao_sistema>:
- O que faz o sistema de IA? (classificação, geração de conteúdo, recomendação, reconhecimento, previsão, outro)
- Quem é o fornecedor (desenvolve/comercializa) e quem é o utilizador (deploya em contexto específico)?
- Em que setor/contexto é usado: emprego, crédito, saúde, educação, infraestrutura crítica, aplicação da lei, outros?
- O sistema é de propósito geral (GPAI) ou específico?
- Toma decisões autónomas que afetam pessoas ou apenas apoia decisões humanas?
- Processa dados pessoais? De que categorias?
- É usado em Portugal ou em outro Estado-Membro da UE?

### ETAPA 2 — ANÁLISE JURÍDICA (Classificação de Risco e Obrigações)
Apresenta dentro de um bloco <classificacao_risco>:

*Práticas proibidas (AI Act, art. 5.º — proibidas desde 2 de fev. 2025):*
- Sistemas de pontuação social (social scoring) por entidades públicas
- Manipulação subliminal ou exploração de vulnerabilidades
- Biometria em tempo real em espaços públicos (exceções muito restritas para LE)
- Inferência de emoções no local de trabalho ou estabelecimentos de ensino
- Classificação biométrica por características sensíveis
- Verificar se o sistema se enquadra em alguma destas categorias

*Alto risco (AI Act, Anexo III):*
- Infraestruturas críticas (energia, água, transportes)
- Educação e formação profissional
- Emprego, gestão de trabalhadores, acesso a emprego por conta própria
- Serviços privados e públicos essenciais (crédito, segurança social, seguros)
- Aplicação da lei
- Gestão da migração, asilo e controlo de fronteiras
- Administração da justiça e processos democráticos
- Sistemas de segurança de produtos (Anexo I AI Act)

*IA de propósito geral (GPAI — AI Act, arts. 51.º a 56.º):*
- Obrigações de transparência e documentação técnica
- Respeito pelo direito de autor
- Para modelos de risco sistémico: obrigações reforçadas

*Risco limitado (art. 50.º — transparência):*
- Chatbots: dever de informar o utilizador de que interage com IA
- Deepfakes e conteúdo gerado por IA: marcação obrigatória

*Risco mínimo:* sem obrigações específicas do AI Act

*Obrigações para alto risco (obrigatórias a partir de agosto de 2026):*
- Sistema de gestão de risco (art. 9.º)
- Dados de treino e governança de dados (art. 10.º)
- Documentação técnica (art. 11.º + Anexo IV)
- Registo de eventos (logging automático — art. 12.º)
- Transparência para utilizadores (art. 13.º)
- Supervisão humana (art. 14.º)
- Robustez, precisão e segurança (art. 15.º)
- Avaliação de conformidade e declaração UE de conformidade (arts. 43.º e ss.)
- Registo em base de dados UE (art. 49.º)
- Obrigações do utilizador (deployer — art. 26.º)

### ETAPA 3 — CONSTRUÇÃO ARGUMENTATIVA (Avaliação de Conformidade)
Define em <avaliacao_conformidade>:
- Classificação de risco do sistema (proibido / alto risco / risco limitado / mínimo)
- Papel da empresa (fornecedor / utilizador / ambos)
- Obrigações aplicáveis face à classificação e ao papel
- Prazos de conformidade relevantes (fase de entrada em vigor do AI Act)
- Sobreposição com RGPD: sistemas que tratam dados pessoais têm obrigações cumulativas

### ETAPA 4 — A ANÁLISE DE CONFORMIDADE
Redige o parecer completo com esta estrutura:

**ANÁLISE DE CONFORMIDADE — REGULAMENTO DE INTELIGÊNCIA ARTIFICIAL (UE) 2024/1689**

**I. CARACTERIZAÇÃO DO SISTEMA**
[Nome/designação do sistema], desenvolvido/fornecido por [fornecedor], utilizado por [utilizador] no contexto de [setor/finalidade].
Funcionalidade: [descrição técnica-funcional].
Dados utilizados: [tipo de dados de entrada e saída].

**II. ENQUADRAMENTO NORMATIVO**
- Regulamento (UE) 2024/1689 (AI Act), em vigor desde 1 de agosto de 2024
- RGPD (Regulamento (UE) 2016/679) — se o sistema trata dados pessoais
- [Regulamentação setorial aplicável — p. ex. Diretiva de Solvabilidade II para seguros, CRR para crédito]

**III. CLASSIFICAÇÃO DE RISCO**

*3.1 Verificação de práticas proibidas (art. 5.º AI Act)*
[Análise de cada categoria proibida — conforme / não aplicável]
Conclusão: [o sistema não se enquadra em nenhuma prática proibida / [■ VERIFICAR: identificar categoria de risco]]

*3.2 Classificação de risco*
[Análise face ao Anexo III e art. 6.º do AI Act]
Classificação: [PROIBIDO / ALTO RISCO — Anexo III, ponto X / RISCO LIMITADO / RISCO MÍNIMO]
Justificação: [fundamentação artigo por artigo]

**IV. OBRIGAÇÕES APLICÁVEIS**

*4.1 Para o Fornecedor (art. 16.º e ss.)*
[Lista de obrigações com prazo de entrada em vigor e estado de cumprimento: conforme / não conforme / [■ VERIFICAR]]

*4.2 Para o Utilizador/Deployer (art. 26.º)*
[Lista de obrigações aplicáveis ao utilizador]

*4.3 Interação com o RGPD*
[Análise das obrigações cumulativas se o sistema trata dados pessoais — AIPD, privacy by design, etc.]

**V. PONTOS DE NÃO CONFORMIDADE / RISCO**
[Lista numerada dos problemas identificados, com artigo violado e prazo de regularização]

**VI. RECOMENDAÇÕES**
[Lista numerada de ações, por prioridade e prazo]
1. [Imediato — práticas proibidas]
2. [Antes de agosto de 2026 — obrigações de alto risco]
3. [Boas práticas — mesmo que não obrigatórias no risco mínimo]
[■ VERIFICAR: documentação técnica (Anexo IV) — requerer ao fornecedor se o sistema for adquirido]

**VII. CONCLUSÃO**
O sistema [está / não está / pode estar, com as seguintes condicionantes] em conformidade com o Regulamento de IA da UE. [Resumo das principais ações recomendadas e prazos.]

### ETAPA 5 — VALIDAÇÃO
Apresenta dentro de um bloco <checklist_validacao>:
- [ ] Práticas proibidas verificadas (art. 5.º AI Act — proibições desde fev. 2025)
- [ ] Classificação de risco fundamentada com artigos específicos do AI Act
- [ ] Papel da empresa identificado: fornecedor e/ou utilizador
- [ ] Obrigações do fornecedor listadas com prazo (alto risco: ago. 2026)
- [ ] Obrigações do utilizador/deployer listadas (art. 26.º AI Act)
- [ ] Obrigações de transparência (chatbots, deepfakes — art. 50.º AI Act)
- [ ] Interação com RGPD analisada (se o sistema trata dados pessoais)
- [ ] Documentação técnica (Anexo IV) — existência verificada ou requerida
- [ ] Registo em base de dados UE previsto (se alto risco — art. 49.º)
- [ ] Prazos de conformidade identificados e calendarizados
- [ ] Pontos [■ VERIFICAR] sinalizados para revisão técnica

---

## Dados a recolher (entrevista numa só mensagem)

**O SISTEMA DE IA:**
- Nome/designação: [indicar]
- Descrição funcional: [o que faz, dados de entrada, saída/decisão]
- Tecnologia subjacente: [LLM, visão computacional, classificador, etc. — se souber]
- Desenvolvido internamente ou adquirido a terceiro? [indicar — se adquirido, quem é o fornecedor?]

**CONTEXTO DE UTILIZAÇÃO:**
- Setor: [emprego, crédito, saúde, educação, outro]
- Finalidade específica: [p. ex. triagem de CVs, avaliação de crédito, diagnóstico de apoio, chatbot de atendimento]
- Decisões tomadas: [autónomas / apoio à decisão humana — descrever]
- Utilizadores do sistema: [trabalhadores da empresa, clientes, autoridades, outros]
- Afeta pessoas singulares? [sim/não — de que forma?]

**DADOS PESSOAIS:**
- O sistema processa dados pessoais? [sim/não]
- Que categorias: [identificação, saúde, financeiros, biométricos, localização, outros]
- Há AIPD realizada? [sim/não]

**EMPRESA:**
- Nome e NIF: [nome, NIF]
- Papel: [fornecedor / utilizador / ambos]
- País de estabelecimento: [Portugal / outro EM UE]
- Observações: [qualquer informação relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 51.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 10.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 11.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 12.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 13.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 14.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 15.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 43.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 16.º | por conferir [■ VERIFICAR] | diploma não identificado |
