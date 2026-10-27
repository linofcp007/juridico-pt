---
codigo: DIG-053
area: "Proteção de Dados e Direito Digital"
titulo: "Dados de Localização e Rastreio de Dispositivos — ePrivacy e RGPD"
titulo_en: "Location Data and Device Tracking — ePrivacy and GDPR"
descricao: "Analisa os requisitos de conformidade para o tratamento de dados de localização de dispositivos e de rastreio de utilizadores (cookies, device fingerprinting, SDK móvel) ao abrigo da Lei n.º 41/2004 (transposição da Diretiva ePrivacy em Portugal), do RGPD, e das orientações do CEPD sobre cookies (Guidelines 05/2020) e dados de localização (Guidelines 04/2021), com foco no requisito de consentimento prévio e informado."
descricao_en: "Analyses the compliance requirements for processing device location data and tracking users (cookies, device fingerprinting, mobile SDKs) under Law No. 41/2004 (Portugal's transposition of the ePrivacy Directive), the GDPR, and EDPB guidance on cookies (Guidelines 05/2020) and location data (Guidelines 04/2021), focusing on the requirement of prior informed consent."
ambito: nacional
estado_citacoes: "conferidas 0 · corrigidas 0 · por conferir 3"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Dados de Localização e Rastreio de Dispositivos — ePrivacy e RGPD

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-053
> **EN:** Location Data and Device Tracking — ePrivacy and GDPR. Analyses the compliance requirements for processing device location data and tracking users (cookies, device fingerprinting, mobile SDKs) under Law No. 41/2004 (Portugal's transposition of the ePrivacy Directive), the GDPR, and EDPB guidance on cookies (Guidelines 05/2020) and location data (Guidelines 04/2021), focusing on the requirement of prior informed consent.
> **Citações:** conferidas 0 · corrigidas 0 · por conferir 3. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.

Analisa os requisitos de conformidade para o tratamento de dados de localização de dispositivos e de rastreio de utilizadores (cookies, device fingerprinting, SDK móvel) ao abrigo da Lei n.º 41/2004 (transposição da Diretiva ePrivacy em Portugal), do RGPD, e das orientações do CEPD sobre cookies (Guidelines 05/2020) e dados de localização (Guidelines 04/2021), com foco no requisito de consentimento prévio e informado.

## Método

Ficha de trabalho para preparar este documento. As regras da casa prevalecem sobre a ficha: registo de advogado, nunca afirmar inscrição na Ordem dos Advogados, citar só normas conferidas ou com `[■ VERIFICAR]`, e seguir o fluxo de `assets/redacao/redator.md`.

## Regras obrigatórias
— O consentimento para cookies não essenciais deve ser prévio ao armazenamento/acesso — não é válido carregar cookies antes de obter consentimento.
— Pré-marcar caixas de consentimento ou usar scroll como consentimento implícito é inválido.
— A rejeição deve ser tão fácil quanto a aceitação (sem dark patterns).

## Análise — 5 Etapas

### ETAPA 1 — MAPEAMENTO DE TECNOLOGIAS DE RASTREIO
Apresenta dentro de um bloco <mapeamento_cookies>:
- Cookies e tecnologias de rastreio presentes: nome, fornecedor, duração, finalidade
- Classificação por categoria:
  - **Estritamente necessários:** sessão, autenticação, cesto de compras → isentos de consentimento
  - **Funcionais:** preferências de idioma, acessibilidade → isentos de consentimento se não identificativos
  - **Analíticos:** Google Analytics, Matomo → consentimento necessário (salvo anonimização efetiva)
  - **Publicitários/de rastreio:** Meta Pixel, Google Ads, DSPs → consentimento obrigatório
  - **De redes sociais:** botões de partilha → consentimento obrigatório

### ETAPA 2 — VALIDADE DO CONSENTIMENTO (art. 4.º Lei 41/2004 + art. 7.º RGPD)
Avalia a validade do consentimento obtido:
- **Prévio:** os cookies não essenciais só são carregados após consentimento?
- **Informado:** o banner identifica categorias de cookies e fornecedores?
- **Livre:** existe botão de rejeição tão acessível quanto o de aceitação? (dark patterns)
- **Específico:** o consentimento é granular por categoria?
- **Revogável:** é possível alterar as preferências após o consentimento inicial?
- **Registado:** existe log do consentimento com timestamp, versão do banner e escolhas?

### ETAPA 3 — DADOS DE LOCALIZAÇÃO (Orientações CEPD 04/2021)
Avalia requisitos específicos para dados de localização:
- Localização precisa (GPS <100m) vs. localização aproximada (IP, rede) → diferentes níveis de risco
- Base jurídica: consentimento (art. 7.º RGPD + opt-in explícito no dispositivo) OU interesse legítimo (uso muito restrito para localização precisa)
- Finalidades legítimas: navegação, entrega ao domicílio, alertas de emergência
- Finalidades que exigem consentimento reforçado: publicidade baseada em localização, monitorização de movimentos
- Partilha com terceiros (SDKs de publicidade): cada SDK é um responsável separado → consentimento deve ser individual por SDK

### ETAPA 4 — GOOGLE ANALYTICS E PIXEL CONFIGURAÇÃO CONFORME
Recomenda configuração específica para ferramentas comuns:

**Google Analytics 4:**
- Modo de consentimento (Consent Mode v2): obrigatório na UE desde março 2024
- Configurar: ad_storage=denied, analytics_storage=denied por defeito
- Ativar só após consentimento explícito
- Google Signals: desativar para utilizadores sem consentimento

**Meta Pixel:**
- Modo de consentimento limitado: ativar para carregar pixel sem cookies de rastreio antes do consentimento
- Eventos de compra sem rastreio: só após consentimento
- Advanced Matching: só com consentimento

**Server-side tracking:** pode reduzir dependência de cookies de terceiros mas exige DPIA e avaliação de base jurídica própria

### ETAPA 5 — CONFORMIDADE DO BANNER
Apresenta dentro de um bloco <conformidade_banner>:
- Avaliação do banner existente (ou recomendações para o novo)
- 1.ª camada: opções de aceitar, rejeitar e gerir preferências com igual destaque
- 2.ª camada: lista detalhada por categoria com toggles granulares
- Nenhuma categoria pré-marcada por defeito (exceto essenciais)
- Registo de consentimento: implementação de Consent Management Platform (CMP) certificada
- Revalidação periódica do consentimento (recomendado: 12 meses)

---

## Dados a recolher (entrevista numa só mensagem)

- **Website/App:** [nome e URL]
- **Tecnologias de rastreio presentes:** [listar ferramentas]
- **Banner de cookies existente:** [sim/não — se sim, descrever]
- **Consentimento pré-ativado:** [sim/não]
- **Botão de rejeição na 1.ª camada:** [sim/não]
- **Dados de localização recolhidos:** [sim/não — se sim, precisão]
- **Fornecedores de publicidade programática:** [listar]
- **Observações:** [contexto]

## Citações desta ficha

| Citação | Estado | Nota |
|---|---|---|
| art. 4.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 7.º RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
| art. 7.º RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
