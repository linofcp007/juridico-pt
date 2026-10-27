---
codigo: DIG-029
area: "Proteção de Dados e Direito Digital"
titulo: "Plano de Resposta a Incidente de Cibersegurança"
titulo_en: "Cybersecurity Incident Response Plan"
descricao: "Gera um Plano de Resposta a Incidente de Cibersegurança (IRP) completo, com procedimentos de deteção, contenção, erradicação, recuperação e lições aprendidas, alinhado com o RGPD (notificação à CNPD em 72h), a Diretiva NIS2 (transposta pela Lei n.º 65/2021) e boas práticas ENISA/NIST."
descricao_en: "Generates a complete cybersecurity Incident Response Plan (IRP), with procedures for detection, containment, eradication, recovery and lessons learned, aligned with the GDPR (notification to the CNPD within 72 hours), the NIS2 Directive (transposed by Law No. 65/2021) and ENISA/NIST good practice."
ambito: nacional
estado_citacoes: "conferidas 13 · corrigidas 0 · por conferir 0"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Plano de Resposta a Incidente de Cibersegurança

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-029
> **EN:** Cybersecurity Incident Response Plan. Generates a complete cybersecurity Incident Response Plan (IRP), with procedures for detection, containment, eradication, recovery and lessons learned, aligned with the GDPR (notification to the CNPD within 72 hours), the NIS2 Directive (transposed by Law No. 65/2021) and ENISA/NIST good practice.
> **Citações:** conferidas 13 · corrigidas 0 · por conferir 0. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Gera um Plano de Resposta a Incidente de Cibersegurança (IRP) completo, com procedimentos de deteção, contenção, erradicação, recuperação e lições aprendidas, alinhado com o RGPD (notificação à CNPD em 72h), a Diretiva NIS2 (transposta pela Lei n.º 65/2021) e boas práticas ENISA/NIST.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— NUNCA inventes decisões regulatórias, acórdãos ou números de processo.
— Se faltarem dados sobre os sistemas ou a equipa de resposta, marca [■ VERIFICAR: descreve o que é necessário].
— Cita artigos reais do RGPD e da legislação portuguesa aplicável.
— O prazo de notificação à CNPD é de 72 horas após tomada de conhecimento da violação (art. 33.º RGPD) — evidencia este prazo em toda a secção de notificação.
— Distingue: violação de dados pessoais (RGPD + CNPD) de incidente de cibersegurança genérico (NIS2 + CNCS).

---

## Framework P.A.C.E.F — Segue estas 5 etapas obrigatoriamente:

### ETAPA 1 — PROBLEMATIZAÇÃO (Diagnóstico da Organização)
Apresenta dentro de um bloco <diagnostico_organizacional>:
- Qual o setor e dimensão da empresa? (PME, grande empresa, operador de serviços essenciais NIS2?)
- Que sistemas críticos existem? (ERP, CRM, dados de clientes, infraestrutura cloud, sistemas de saúde, financeiros)
- Quem é o responsável de IT/segurança? Há CISO, DPO designados?
- A empresa tem obrigações NIS2 (operador de serviços essenciais ou fornecedor digital)?
- Que tipos de incidente são mais prováveis no setor? (ransomware, phishing, acesso indevido, perda de dispositivo, DDoS)
- Há fornecedores críticos de TI cujo comprometimento afetaria a empresa (supply chain risk)?

### ETAPA 2 — ANÁLISE JURÍDICA (Obrigações de Notificação e Reporte)
Apresenta dentro de um bloco <obrigacoes_notificacao>:
- Violação de dados pessoais: art. 33.º RGPD — notificação à CNPD em 72h se risco para os direitos e liberdades das pessoas; art. 34.º RGPD — comunicação aos titulares se risco elevado
- Critérios para avaliar se é notificação obrigatória: probabilidade × impacto × natureza dos dados (dados especiais, financeiros, saúde = risco mais elevado)
- NIS2 / Lei 65/2021: operadores de serviços essenciais e fornecedores digitais devem notificar o CNCS em prazos específicos (alerta precoce: 24h; notificação: 72h; relatório final: 1 mês)
- Obrigação de registo interno de todas as violações (art. 33.º, n.º 5 RGPD), mesmo sem notificação externa
- Responsabilidade civil por violações: art. 82.º RGPD — dever de demonstrar medidas adequadas

### ETAPA 3 — CONSTRUÇÃO (Estrutura do Plano)
Define em <estrutura_plano>:
- Fases do ciclo de vida do incidente: Preparação → Deteção e Análise → Contenção → Erradicação → Recuperação → Pós-Incidente
- Papéis e responsabilidades: CISO, DPO, IT, Jurídico, Comunicação, Gestão
- Critérios de classificação de severidade (P1/P2/P3 ou equivalente)
- Matriz de escalonamento: quem é notificado em que nível de severidade?
- Mecanismo de ativação do plano: quem o ativa e como?

### ETAPA 4 — O PLANO DE RESPOSTA A INCIDENTE
Redige o plano completo com esta estrutura:

**PLANO DE RESPOSTA A INCIDENTE DE CIBERSEGURANÇA**
[Nome da empresa] — versão [n.º] — data: [data]

**1. OBJETIVO E ÂMBITO**
Este plano define os procedimentos de resposta a incidentes de cibersegurança e violações de dados pessoais na [empresa], com o objetivo de minimizar o impacto, cumprir as obrigações legais de notificação e aprender com cada incidente.
Aplica-se a todos os sistemas, dados e colaboradores da [empresa] e aos prestadores de serviços de TI que acedem a sistemas da empresa.

**2. PAPÉIS E RESPONSABILIDADES**

| Papel | Responsável | Contacto | Disponibilidade |
|---|---|---|---|
| Responsável de Segurança (CISO/IT) | [nome] | [email/tel] | 24/7 |
| Encarregado de Proteção de Dados (DPO/EPD) | [nome ou "não designado"] | [email/tel] | Horário laboral + urgência |
| Responsável Jurídico | [nome/advogado externo] | [email/tel] | [disponibilidade] |
| Responsável de Comunicação | [nome] | [email/tel] | [disponibilidade] |
| Gestão de Topo | [nome] | [email/tel] | Incidentes P1 |
| [■ VERIFICAR: adicionar contactos de fornecedores críticos de TI] |

**3. CLASSIFICAÇÃO DE INCIDENTES**

| Nível | Critérios | Exemplos | Tempo de Resposta |
|---|---|---|---|
| P1 — Crítico | Dados pessoais comprometidos em larga escala; sistemas críticos inacessíveis; risco elevado para os titulares | Ransomware com exfiltração de dados de clientes; violação de base de dados de saúde | Imediato (< 2h) |
| P2 — Elevado | Dados pessoais comprometidos em escala limitada; sistemas importantes afetados | Phishing com acesso a email de trabalhador com dados de clientes; perda de portátil cifrado | < 4h |
| P3 — Moderado | Sem dados pessoais comprometidos; impacto operacional limitado | Malware isolado em estação de trabalho; tentativa de acesso falhada | < 24h |

**4. FASE 1 — DETEÇÃO E REPORTE INICIAL**
4.1. Qualquer colaborador que detete ou suspeite de um incidente deve reportar imediatamente ao CISO/IT através de [canal — email, Teams, formulário interno].
4.2. O CISO/IT regista o incidente no Registo Interno de Incidentes (modelo no Anexo A) dentro de [x] horas, independentemente da severidade.
4.3. Informação a recolher no primeiro reporte: data/hora de deteção, sistema afetado, natureza do incidente, dados potencialmente comprometidos, quem detetou e como.

**5. FASE 2 — ANÁLISE E CLASSIFICAÇÃO (T < 4h para P1/P2)**
5.1. O CISO/IT analisa o incidente e classifica a severidade (P1/P2/P3).
5.2. Para P1 e P2: ativar imediatamente a equipa de resposta (CISO + DPO + Jurídico).
5.3. Avaliar se há violação de dados pessoais na aceção do art. 4.º, n.º 12 do RGPD:
— Destruição, perda, alteração, divulgação não autorizada ou acesso a dados pessoais.
— Se sim: iniciar contagem do prazo de 72 horas para notificação à CNPD.
[■ VERIFICAR: criar checklist de avaliação de violação de dados pessoais no Anexo B]

**6. FASE 3 — CONTENÇÃO (T < 6h para P1)**
6.1. Medidas de contenção imediata: [isolamento de sistemas afetados, revogação de credenciais comprometidas, bloqueio de contas, preservação de logs].
6.2. Preservar evidências forenses antes de qualquer medida que as possa alterar (snapshots de VMs, logs, capturas de tráfego).
6.3. Comunicar ao fornecedor de TI/cloud afetado (se aplicável) e ativar SLA de resposta a incidentes.

**7. FASE 4 — NOTIFICAÇÃO (PRAZO CRÍTICO)**

*7.1 Notificação à CNPD — PRAZO: 72 HORAS (art. 33.º RGPD)*
Se a violação de dados pessoais apresentar risco para os direitos e liberdades dos titulares:
— Notificar a CNPD via portal online (www.cnpd.pt) no prazo de 72 horas após a tomada de conhecimento.
— Se a notificação completa não for possível em 72h: enviar notificação parcial com o que se sabe e informar que o restante será fornecido logo que possível (art. 33.º, n.º 4 RGPD).
— Informação obrigatória: natureza da violação, categorias e número aproximado de titulares e registos afetados, consequências prováveis, medidas adoptadas.
— Registar SEMPRE a violação internamente, mesmo que se conclua que não é notificável (art. 33.º, n.º 5 RGPD).

*7.2 Comunicação aos titulares (art. 34.º RGPD)*
Se risco elevado para os direitos e liberdades dos titulares:
— Comunicar a cada titular afetado sem demora injustificada.
— [■ VERIFICAR: se os dados estiverem cifrados ou se o risco for mitigado, a comunicação pode não ser obrigatória — avaliar com o DPO]

*7.3 Notificação ao CNCS (se NIS2 aplicável)*
[■ VERIFICAR: se a empresa for operador de serviços essenciais ou fornecedor digital, verificar obrigações de notificação ao CNCS nos termos da Lei 65/2021]

*7.4 Outras notificações*
— Seguradoras (apólice de ciber-risco — se existir): [prazo contratual]
— Parceiros/fornecedores afetados: [conforme contratos]
— Autoridades policiais (DCIAP, PJ): se houver indícios de crime informático

**8. FASE 5 — ERRADICAÇÃO E RECUPERAÇÃO**
8.1. Eliminar a causa raiz do incidente (malware, vulnerabilidade explorada, acesso indevido).
8.2. Restaurar sistemas a partir de backups verificados; confirmar integridade antes de reativar.
8.3. Reforçar autenticação (forçar reset de passwords, ativar MFA nos sistemas afetados).
8.4. Monitorização intensiva pós-recuperação durante [prazo — p. ex. 30 dias].

**9. FASE 6 — PÓS-INCIDENTE (T < 30 dias)**
9.1. Relatório de incidente: elaborar relatório completo com linha temporal, causa raiz, impacto, ações tomadas e lições aprendidas.
9.2. Revisão do plano: atualizar este plano com base nas lições aprendidas.
9.3. Formação: se o incidente resultou de erro humano, implementar formação específica.
9.4. Comunicar ao órgão de gestão: resumo executivo e recomendações de melhoria.

### ETAPA 5 — VALIDAÇÃO
Apresenta dentro de um bloco <checklist_validacao>:
- [ ] Papéis e responsabilidades definidos com contactos atualizados
- [ ] Critérios de classificação de severidade (P1/P2/P3) claros
- [ ] Registo interno de incidentes estabelecido (art. 33.º, n.º 5 RGPD)
- [ ] Prazo de 72h para notificação à CNPD evidenciado (art. 33.º RGPD)
- [ ] Critérios para comunicação aos titulares definidos (art. 34.º RGPD)
- [ ] Obrigações NIS2/CNCS verificadas (se aplicável)
- [ ] Preservação de evidências forenses prevista antes da contenção
- [ ] Contactos de fornecedores críticos de TI incluídos
- [ ] Procedimento de recuperação a partir de backups verificados
- [ ] Relatório pós-incidente e revisão do plano previstos
- [ ] Plano testado com exercício de simulação (tabletop)
- [ ] Pontos [■ VERIFICAR] sinalizados para revisão

---

## Dados a recolher (entrevista numa só mensagem)

**EMPRESA:**
- Nome e NIF: [nome, NIF]
- Setor: [indicar]
- N.º de trabalhadores: [indicar]
- Sujeita a NIS2 (operador de serviços essenciais / fornecedor digital)? [sim/não]
- DPO/EPD designado? [sim/não — se sim, nome e contacto]
- CISO ou responsável de IT: [nome e contacto]

**SISTEMAS CRÍTICOS:**
- Sistemas mais sensíveis: [ERP, CRM, base de dados de clientes, sistema clínico, etc.]
- Cloud ou on-premise? [indicar para cada sistema]
- Fornecedores de TI críticos: [nome e contacto de emergência]
- Backups: [frequência e localização — online/offline]

**DADOS PESSOAIS:**
- Que categorias de dados pessoais a empresa trata? [identificação, saúde, financeiros, biométricos, menores, outros]
- Volume aproximado de titulares: [n.º de clientes, trabalhadores, outros]

**HISTÓRICO:**
- Já houve incidentes anteriores? [sim/não — descrever brevemente]
- Existe apólice de ciber-risco? [sim/não]
- Observações: [qualquer informação relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 33.º RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 33.º RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 33.º RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 33.º RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 34.º RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
| art. 34.º RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
| art. 34.º RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
| art. 33.º, n.º 5 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 33.º, n.º 5 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 33.º, n.º 5 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 82.º RGPD | conferida (epígrafe) — Direito de indemnização e responsabilidade |  |
| art. 4.º, n.º 12 do RGPD | conferida (epígrafe) — Definições |  |
| art. 33.º, n.º 4 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
