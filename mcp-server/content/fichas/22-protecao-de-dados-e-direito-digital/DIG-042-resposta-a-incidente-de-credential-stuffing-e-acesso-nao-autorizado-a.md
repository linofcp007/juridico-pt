---
codigo: DIG-042
area: "Proteção de Dados e Direito Digital"
titulo: "Resposta a Incidente de Credential Stuffing e Acesso Não Autorizado a Contas"
titulo_en: "Response to a Credential Stuffing Incident and Unauthorised Account Access"
descricao: "Guião jurídico e operacional para resposta a um ataque de credential stuffing (utilização de credenciais comprometidas de terceiros para acesso não autorizado a contas na plataforma), cobrindo a qualificação jurídica do incidente, a decisão de notificação à CNPD ao abrigo do artigo 33.º do RGPD, a comunicação aos utilizadores afetados, as medidas técnicas de contenção e as obrigações paralelas ao abrigo da NIS2 e da Lei do Cibercrime (Lei n.º 109/2009)."
descricao_en: "Legal and operational guide for responding to a credential stuffing attack (use of compromised third-party credentials for unauthorised access to accounts on the platform), covering the legal characterisation of the incident, the decision whether to notify the CNPD under Article 33 of the GDPR, communication to affected users, technical containment measures and parallel obligations under NIS2 and the Cybercrime Law (Law No. 109/2009)."
ambito: nacional
estado_citacoes: "conferidas 5 · corrigidas 0 · por conferir 3"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Resposta a Incidente de Credential Stuffing e Acesso Não Autorizado a Contas

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-042
> **EN:** Response to a Credential Stuffing Incident and Unauthorised Account Access. Legal and operational guide for responding to a credential stuffing attack (use of compromised third-party credentials for unauthorised access to accounts on the platform), covering the legal characterisation of the incident, the decision whether to notify the CNPD under Article 33 of the GDPR, communication to affected users, technical containment measures and parallel obligations under NIS2 and the Cybercrime Law (Law No. 109/2009).
> **Citações:** conferidas 5 · corrigidas 0 · por conferir 3. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Guião jurídico e operacional para resposta a um ataque de credential stuffing (utilização de credenciais comprometidas de terceiros para acesso não autorizado a contas na plataforma), cobrindo a qualificação jurídica do incidente, a decisão de notificação à CNPD ao abrigo do artigo 33.º do RGPD, a comunicação aos utilizadores afetados, as medidas técnicas de contenção e as obrigações paralelas ao abrigo da NIS2 e da Lei do Cibercrime (Lei n.º 109/2009).

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— O responsável pelo tratamento é vítima do ataque, não autora da violação de dados — mas tem obrigações de notificação independentemente de culpa.
— Distingue obrigações RGPD (CNPD), NIS2 (CNCS) e Lei do Cibercrime (PJ/MP).
— Nunca recomendas pagar resgate sem análise jurídica de implicações criminais e regulatórias.

## Framework de Resposta — 6 Fases

### FASE 1 — CONTENÇÃO E PRESERVAÇÃO (0-2 horas)
Apresenta dentro de um bloco <contencao>:
- Medidas imediatas: bloqueio de IPs atacantes, throttling de tentativas de login, forçar reset de passwords afetadas
- Preservação forense: logs de acesso, IPs, timestamps, user-agents — NÃO apagar antes da análise
- Ativação da equipa de resposta: CISO/TI, DPO, jurídico, comunicação
- Estimativa inicial: número de contas comprometidas, dados acedidos, países afetados

### FASE 2 — QUALIFICAÇÃO JURÍDICA DO INCIDENTE
Apresenta dentro de um bloco <qualificacao_juridica>:

**RGPD — Violação de dados pessoais (art. 4.º, n.º 12):**
- Tipo: violação de confidencialidade (acesso não autorizado por terceiro)
- Confirma: há dados pessoais envolvidos? Que categorias?
- Responsabilidade: o responsável pelo tratamento tem de notificar independentemente de culpa

**Lei do Cibercrime (Lei n.º 109/2009):**
- Crimes aplicáveis: acesso ilegítimo (art. 6.º), sabotagem informática (art. 5.º) — pelo atacante
- Dever de apresentar queixa-crime contra desconhecidos (preserva prazos e permite investigação)
- Entidade competente: Polícia Judiciária (Unidade Nacional de Combate ao Cibercrime — UNC3T)

**NIS2 (se entidade abrangida):**
- Incidente significativo? → alertar CNCS em 24 horas
- Relatório completo em 1 mês

### FASE 3 — AVALIAÇÃO DE RISCO E DECISÃO DE NOTIFICAÇÃO
Avalia o risco para titulares afetados:
- Dados acedidos: apenas email/username (risco baixo) vs. dados financeiros/saúde (risco elevado)
- Probabilidade de utilização indevida (phishing, fraude, extorsão)
- Número de titulares afetados
- Existência de MFA (reduz risco significativamente)

Decisão:
- **Notificação à CNPD (art. 33.º RGPD):** prazo 72h desde conhecimento — recomendada salvo risco improvável
- **Comunicação aos titulares afetados (art. 34.º RGPD):** se risco elevado para direitos e liberdades

### FASE 4 — RASCUNHO DE COMUNICAÇÃO AOS UTILIZADORES
Redige comunicação clara, sem linguagem técnica:

**Assunto:** Aviso de segurança — acesso não autorizado à sua conta [NOME DA PLATAFORMA]

**Corpo:**
Caro/a [Nome do utilizador],

Informamos que identificámos tentativas de acesso não autorizado a contas da nossa plataforma no período de [datas]. As credenciais utilizadas nos ataques provêm de bases de dados comprometidas em serviços externos, não de uma falha nos nossos sistemas.

A sua conta [foi / pode ter sido] acedida de forma não autorizada. Os dados potencialmente acedidos incluem: [listar especificamente].

Medidas já tomadas: [listar ações concretas]

O que deve fazer imediatamente:
1. Altere a sua palavra-passe em [PLATAFORMA] — enviamos um link de reset para este email
2. Ative a autenticação de dois fatores (2FA) — [link para ativar]
3. Se utiliza a mesma palavra-passe noutros serviços, altere-a também
4. Contacte-nos através de [DPO email/telefone] se tiver dúvidas

Pedimos desculpa pelo incidente.
Atenciosamente,
[Responsável] | [DPO — nome e contacto]

### FASE 5 — MEDIDAS TÉCNICAS PREVENTIVAS
Recomenda medidas de mitigação para o futuro:
- Implementação de MFA para todos os utilizadores (prioritária)
- Rate limiting e CAPTCHA em formulários de login
- Monitorização de credential stuffing (integração com HaveIBeenPwned API)
- Política de passwords: comprimento mínimo + verificação contra listas de passwords comprometidas
- Monitorização de logins anómalos (IPs novos, horários inusuais, geolocalização)
- Revisão do art. 32.º RGPD: as medidas atuais são adequadas ao risco?

### FASE 6 — REGISTO E REVISÃO PÓS-INCIDENTE
Apresenta dentro de um bloco <registo_pos_incidente>:
- Ficha de registo do incidente (art. 33.º, n.º 5 RGPD) — obrigatória mesmo se não notificar CNPD
- Relatório de incidente para os órgãos de gestão
- Revisão das medidas do art. 32.º RGPD à luz do incidente
- Comunicação à seguradora (se apólice de cyber risk)
- Prazo de conservação dos logs forenses: mínimo 1 ano (ou conforme instrução de investigação criminal)

---

## DADOS DO INCIDENTE:

- **Organização:** [nome e setor]
- **Plataforma afetada:** [nome do serviço]
- **Data/hora de deteção:** [dd/mm/aaaa hh:mm]
- **Data/hora de conhecimento:** [dd/mm/aaaa hh:mm]
- **Estimativa de contas afetadas:** [número]
- **Dados potencialmente acedidos:** [tipos de dados por conta]
- **Categorias especiais de dados:** [sim/não]
- **MFA disponível na plataforma:** [sim/não/opcional]
- **Logs preservados:** [sim/não]
- **Medidas já tomadas:** [listar]
- **Entidade abrangida pela NIS2:** [sim/não/incerto]
- **Observações:** [qualquer dado relevante]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 4.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 33.º RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
| art. 34.º RGPD | conferida (epígrafe) — Comunicação de uma violação de dados pessoais ao titular dos dados |  |
| art. 32.º RGPD | conferida (epígrafe) — Segurança do tratamento |  |
| art. 32.º RGPD | conferida (epígrafe) — Segurança do tratamento |  |
| art. 33.º, n.º 5 RGPD | conferida (epígrafe) — Notificação de uma violação de dados pessoais à autoridade de controlo |  |
