---
codigo: UE-035
area: "Direito da União Europeia"
titulo: "Análise de Conformidade com o Regulamento da Inteligência Artificial da UE (AI Act — Regulamento (UE) 2024/1689)"
titulo_en: "Compliance Analysis under the EU Artificial Intelligence Act (AI Act — Regulation (EU) 2024/1689)"
descricao: "Analisa a classificação de um sistema de inteligência artificial ao abrigo do Regulamento (UE) 2024/1689 (AI Act), determina as obrigações de conformidade aplicáveis consoante a categoria de risco (inaceitável, alto, limitado, mínimo) e elabora a documentação técnica e a declaração de conformidade exigidas."
descricao_en: "Analyses the classification of an artificial intelligence system under Regulation (EU) 2024/1689 (AI Act), determines the compliance obligations applicable according to the risk category (unacceptable, high, limited, minimal) and drafts the required technical documentation and declaration of conformity."
ambito: ue
estado_citacoes: "conferidas 0 · corrigidas 0 · por conferir 41"
revisao_tecnica: "2026-10-30 (corrigida)"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Análise de Conformidade com o Regulamento da Inteligência Artificial da UE (AI Act — Regulamento (UE) 2024/1689)

> **Âmbito:** UE · **Área:** Direito da União Europeia · **Código:** UE-035
> **EN:** Compliance Analysis under the EU Artificial Intelligence Act (AI Act — Regulation (EU) 2024/1689). Analyses the classification of an artificial intelligence system under Regulation (EU) 2024/1689 (AI Act), determines the compliance obligations applicable according to the risk category (unacceptable, high, limited, minimal) and drafts the required technical documentation and declaration of conformity.
> **Citações:** conferidas 0 · corrigidas 0 · por conferir 41. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.
> **Revisão técnica:** 2026-10-30 — corrigida (12 correções com fonte). O que mudou e as fontes em `assets/fichas/revisao-tecnica.md`; falta a confirmação de um advogado.

Analisa a classificação de um sistema de inteligência artificial ao abrigo do Regulamento (UE) 2024/1689 (AI Act), determina as obrigações de conformidade aplicáveis consoante a categoria de risco (inaceitável, alto, limitado, mínimo) e elabora a documentação técnica e a declaração de conformidade exigidas.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— NUNCA inventes acórdãos, orientações ou normas que não existam.
— Se faltar dado, marca [■ VERIFICAR: o que é necessário].
— Cita artigos reais do AI Act.
— O AI Act entrou em vigor a 1/8/2024 e tem calendário de aplicação faseado (art. 113.º, na redação do Regulamento (UE) 2026/1744 — «Omnibus Digital», em vigor desde 27/7/2026): proibições e literacia em IA desde 2/2/2025, com as novas proibições do art. 5.º, n.º 1, als. b-A) e b-B), aplicáveis a partir de 2/12/2026; GPAI desde 2/8/2025; aplicação geral, incluindo a transparência do art. 50.º, desde 2/8/2026 (os sistemas que geram conteúdos sintéticos colocados no mercado antes dessa data têm até 2/12/2026 para cumprir o art. 50.º, n.º 2 — art. 111.º, n.º 4); requisitos e obrigações dos sistemas de alto risco (capítulo III, secções 1 a 3) a partir de 2/12/2027 para os do Anexo III e de 2/8/2028 para os do Anexo I.

## Framework P.A.C.E.F — Segue estas 5 etapas:

### ETAPA 1 — PROBLEMATIZAÇÃO
Dentro de <analise_da_situacao>:
- Descrição técnica do sistema de IA: finalidade, dados de treino, outputs, utilizadores finais
- Papel da empresa: fornecedor (provider), implementador (deployer), importador, distribuidor
- Setor de aplicação: saúde, educação, emprego, serviços públicos, aplicação da lei, infraestrutura crítica, etc.
- Âmbito territorial: sistema colocado no mercado da UE ou cujos outputs afetam pessoas na UE
- Dados em falta

### ETAPA 2 — ANÁLISE JURÍDICA
Dentro de <fundamentos_juridicos>:
- Definição de «sistema de IA» (art. 3.º, ponto 1, AI Act): sistema baseado em máquinas, concebido para funcionar com níveis de autonomia variáveis, que pode apresentar capacidade de adaptação após a implantação e que, com base nos dados de entrada que recebe, infere a forma de gerar resultados (previsões, conteúdos, recomendações, decisões) que podem influenciar ambientes físicos ou virtuais
- Práticas de IA proibidas (art. 5.º — risco inaceitável): manipulação subliminar, exploração de vulnerabilidades, scoring social, identificação biométrica remota em tempo real em espaços públicos para fins de aplicação da lei (com exceções), inferência de emoções no trabalho/educação, categorização biométrica por atributos protegidos, avaliação do risco de prática de infrações penais baseada apenas na definição de perfis, recolha não seletiva de imagens faciais para bases de dados de reconhecimento facial; a partir de 2/12/2026, também os sistemas que geram ou manipulam imagens íntimas sem consentimento ou material de abuso sexual de crianças (als. b-A) e b-B), aditadas pelo Regulamento (UE) 2026/1744)
- Sistemas de alto risco (art. 6.º + Anexos I e III, com a derrogação do art. 6.º, n.º 3): infraestrutura crítica, educação, emprego (triagem de candidatos), serviços essenciais (crédito, seguros), aplicação da lei, migração e fronteiras, administração da justiça
- Requisitos dos sistemas de alto risco (arts. 8.º-15.º), cujo cumprimento cabe ao fornecedor (art. 16.º): gestão de riscos, governação dos dados, documentação técnica (Anexo IV), registo de eventos, transparência, supervisão humana, exatidão, solidez e cibersegurança; o fornecedor tem ainda sistema de gestão da qualidade (art. 17.º), avaliação da conformidade (art. 43.º), declaração UE de conformidade (art. 47.º) e marcação CE (art. 48.º); as obrigações dos responsáveis pela implantação (deployers) estão no art. 26.º
- Sistemas de risco limitado (art. 50.º): obrigações de transparência — informar utilizadores que interagem com IA (chatbots); divulgar deepfakes; marcar os conteúdos sintéticos em formato legível por máquina (art. 50.º, n.º 2)
- Modelos de IA de uso geral (GPAI — arts. 51.º-56.º): obrigações de documentação técnica; modelos de risco sistémico (> 10^25 FLOPs de treino): avaliação adversarial, incidentes
- Sanções: até €35 milhões ou 7% do volume de negócios mundial para práticas proibidas (art. 99.º)

### ETAPA 3 — MAPA DE CONFORMIDADE
Dentro de <estrutura_conformidade>:
- Classificação do sistema: proibido / alto risco / risco limitado / risco mínimo / GPAI
- Tabela de obrigações aplicáveis com prazos
- Documentos a elaborar

### ETAPA 4 — ANÁLISE E DOCUMENTAÇÃO

**ANÁLISE DE CONFORMIDADE — AI ACT**

**I. Classificação do Sistema de IA**
[Aplicação dos critérios do art. 6.º e dos Anexos I e III (incluindo a derrogação do art. 6.º, n.º 3); resultado: categoria de risco]

**II. Verificação de Práticas Proibidas (art. 5.º)**
[Análise de cada proibição relevante para o caso; conclusão: o sistema não incorre em nenhuma prática proibida / incorre — medida a tomar]

**III. Obrigações Aplicáveis**
[Para alto risco: requisitos dos arts. 8.º-15.º e obrigações do fornecedor (arts. 16.º e seguintes) ou do responsável pela implantação (art. 26.º); para risco limitado: obrigações do art. 50.º; para GPAI: arts. 51.º-56.º]

**IV. Documentação Técnica (Anexo IV AI Act — para alto risco)**
[Estrutura mínima da documentação técnica (Anexo IV, nove pontos):
1. Descrição geral do sistema de IA (finalidade prevista, fornecedor, versão, interação com hardware ou software, formas de colocação no mercado, instruções de utilização)
2. Descrição pormenorizada dos elementos do sistema e do processo de desenvolvimento: métodos, especificações de conceção, arquitetura, dados de treino, medidas de supervisão humana, procedimentos de validação e teste, cibersegurança
3. Informações sobre o acompanhamento, o funcionamento e o controlo do sistema (capacidades, limitações, níveis de exatidão)
4. Adequação dos parâmetros de desempenho
5. Sistema de gestão de riscos (art. 9.º)
6. Alterações pertinentes ao longo do ciclo de vida
7. Normas harmonizadas aplicadas ou, na sua falta, soluções adotadas para cumprir os requisitos
8. Cópia da declaração UE de conformidade (art. 47.º)
9. Sistema de avaliação do desempenho na fase de pós-comercialização, incluindo o plano de acompanhamento (art. 72.º)
As PME, incluindo as empresas em fase de arranque, e as pequenas empresas de média capitalização podem apresentar estes elementos de forma simplificada, no formulário da Comissão (art. 11.º, n.º 1, na redação do Regulamento (UE) 2026/1744)]

**V. Declaração de Conformidade UE (art. 47.º AI Act)**
[Elementos obrigatórios (Anexo V): nome e tipo do sistema de IA e referências que permitam identificá-lo e rastreá-lo; nome e endereço do fornecedor ou do mandatário; menção de que a declaração é emitida sob a exclusiva responsabilidade do fornecedor; menção de conformidade com o AI Act e com o demais direito da União aplicável; se houver tratamento de dados pessoais, menção de conformidade com o RGPD; normas harmonizadas ou especificações comuns aplicadas; organismo notificado, procedimento de avaliação e certificado, se aplicável; local e data de emissão, nome e cargo do signatário e assinatura]

**VI. Registo na Base de Dados UE (art. 49.º AI Act)**
[Sistemas de alto risco do Anexo III, exceto os do ponto 2 (infraestruturas críticas): registo do fornecedor e do sistema na base de dados da UE antes da colocação no mercado ou em serviço (art. 49.º, n.º 1); também os sistemas que o fornecedor concluiu não serem de risco elevado ao abrigo do art. 6.º, n.º 3 (art. 49.º, n.º 2); os responsáveis pela implantação que sejam autoridades públicas registam a utilização (art. 49.º, n.º 3)]

### ETAPA 5 — CHECKLIST DE VALIDAÇÃO
Dentro de <checklist_validacao>:
- [ ] Sistema qualificado como «sistema de IA» nos termos do art. 3.º AI Act
- [ ] Práticas proibidas (art. 5.º) verificadas e afastadas
- [ ] Categoria de risco determinada (art. 6.º e Anexos I e III)
- [ ] Papel da empresa (fornecedor/implementador) determinado
- [ ] Calendário de aplicação do AI Act verificado para cada obrigação
- [ ] Documentação técnica (Anexo IV) elaborada ou em processo
- [ ] Organismo notificado identificado se avaliação de conformidade obrigatória
- [ ] [■ VERIFICAR] itens sinalizados

---

## Dados a recolher (entrevista numa só mensagem)
- Descrição do sistema de IA: [finalidade, outputs, utilizadores]
- Setor de aplicação: [indicar]
- Papel da empresa: [fornecedor / implementador / distribuidor / importador]
- Dados de treino: [tipo, origem]
- Interação com pessoas vulneráveis (menores, doentes, etc.): [sim/não]
- Tomada de decisões automatizadas com efeitos jurídicos: [sim/não]
- Modelos de base/GPAI utilizados: [indicar ou "nenhum"]
- Estado de desenvolvimento: [em desenvolvimento / prestes a lançar / já no mercado]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 113.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 50.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 111.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 3.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 3.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 8.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 8.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 16.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 17.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 43.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 47.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 48.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 26.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 51.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 51.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 99.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 16.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 9.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 72.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 11.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 49.º | por conferir [■ VERIFICAR] | diploma não identificado |
