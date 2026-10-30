---
codigo: DIG-053
area: "Proteção de Dados e Direito Digital"
titulo: "Dados de Localização e Rastreio de Dispositivos — ePrivacy e RGPD"
titulo_en: "Location Data and Device Tracking — ePrivacy and GDPR"
descricao: "Analisa os requisitos de conformidade para o tratamento de dados de localização de dispositivos e de rastreio de utilizadores (cookies, device fingerprinting, SDK móvel) ao abrigo da Lei n.º 41/2004 (transposição da Diretiva ePrivacy em Portugal), do RGPD, e das orientações do CEPD sobre o consentimento (Orientações 05/2020) e sobre o âmbito técnico do art. 5.º, n.º 3, da Diretiva ePrivacy (Orientações 2/2023), com foco no requisito de consentimento prévio e informado."
descricao_en: "Analyses the compliance requirements for processing device location data and tracking users (cookies, device fingerprinting, mobile SDKs) under Law No. 41/2004 (Portugal's transposition of the ePrivacy Directive), the GDPR, and EDPB guidance on consent (Guidelines 05/2020) and on the technical scope of Article 5(3) of the ePrivacy Directive (Guidelines 2/2023), focusing on the requirement of prior informed consent."
ambito: nacional
estado_citacoes: "conferidas 3 · corrigidas 0 · por conferir 9"
revisao_tecnica: "2026-10-30 (corrigida)"
origem: "Skills Jurídicas PRO (catálogo da empresa), importado a 2026-10-27"
---

# Dados de Localização e Rastreio de Dispositivos — ePrivacy e RGPD

> **Âmbito:** nacional · **Área:** Proteção de Dados e Direito Digital · **Código:** DIG-053
> **EN:** Location Data and Device Tracking — ePrivacy and GDPR. Analyses the compliance requirements for processing device location data and tracking users (cookies, device fingerprinting, mobile SDKs) under Law No. 41/2004 (Portugal's transposition of the ePrivacy Directive), the GDPR, and EDPB guidance on consent (Guidelines 05/2020) and on the technical scope of Article 5(3) of the ePrivacy Directive (Guidelines 2/2023), focusing on the requirement of prior informed consent.
> **Citações:** conferidas 3 · corrigidas 0 · por conferir 9. As por conferir entram no documento com `[■ VERIFICAR]`; valores do ano em `references/valores-2026.md`.
> **Revisão técnica:** 2026-10-30 — corrigida (9 correções com fonte). O que mudou e as fontes em `assets/fichas/revisao-tecnica.md`; falta a confirmação de um advogado.

Analisa os requisitos de conformidade para o tratamento de dados de localização de dispositivos e de rastreio de utilizadores (cookies, device fingerprinting, SDK móvel) ao abrigo da Lei n.º 41/2004 (transposição da Diretiva ePrivacy em Portugal), do RGPD, e das orientações do CEPD sobre o consentimento (Orientações 05/2020) e sobre o âmbito técnico do art. 5.º, n.º 3, da Diretiva ePrivacy (Orientações 2/2023), com foco no requisito de consentimento prévio e informado.

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
  - **Funcionais:** preferências de idioma, acessibilidade → isentos de consentimento só se estritamente necessários a um serviço expressamente pedido pelo utilizador (art. 5.º, n.º 2, al. b) Lei 41/2004); caso contrário, consentimento necessário
  - **Analíticos:** Google Analytics, Matomo → consentimento necessário (a Lei 41/2004 não isenta a medição de audiência; anonimizar os dados depois da recolha não dispensa o consentimento para o armazenamento ou o acesso no terminal)
  - **Publicitários/de rastreio:** Meta Pixel, Google Ads, DSPs → consentimento obrigatório
  - **De redes sociais:** botões de partilha → consentimento obrigatório

### ETAPA 2 — VALIDADE DO CONSENTIMENTO (art. 5.º, n.º 1 Lei 41/2004 + art. 7.º RGPD)
Avalia a validade do consentimento obtido:
- **Prévio:** os cookies não essenciais só são carregados após consentimento?
- **Informado:** o banner identifica categorias de cookies e fornecedores?
- **Livre:** existe botão de rejeição tão acessível quanto o de aceitação? (dark patterns)
- **Específico:** o consentimento é granular por categoria?
- **Revogável:** é possível alterar as preferências após o consentimento inicial?
- **Registado:** existe log do consentimento com timestamp, versão do banner e escolhas?

### ETAPA 3 — DADOS DE LOCALIZAÇÃO (arts. 5.º e 7.º Lei 41/2004 + RGPD)
Avalia requisitos específicos para dados de localização:
- Localização precisa (GPS <100m) vs. localização aproximada (IP, rede) → diferentes níveis de risco
- Base jurídica: o acesso à localização guardada ou gerada no terminal (p. ex., GPS lido por app ou SDK e enviado para fora do dispositivo) exige consentimento prévio (art. 5.º, n.º 1 Lei 41/2004), salvo se estritamente necessário ao serviço expressamente pedido pelo utilizador, como a navegação (art. 5.º, n.º 2, al. b) Lei 41/2004); o interesse legítimo não dispensa nem substitui este consentimento. O tratamento posterior tem ainda de ter fundamento de licitude no RGPD (art. 6.º, n.º 1 RGPD)
- Empresas que oferecem redes ou serviços de comunicações eletrónicas: os dados de localização que não sejam dados de tráfego só podem ser tratados anonimizados ou, para serviços de valor acrescentado, com consentimento prévio e expresso (art. 7.º, n.os 1 e 3 Lei 41/2004)
- Finalidades legítimas: navegação, entrega ao domicílio, alertas de emergência
- Finalidades que exigem consentimento reforçado: publicidade baseada em localização, monitorização de movimentos
- Partilha com terceiros (SDKs de publicidade): o fornecedor de cada SDK pode ser responsável autónomo, responsável conjunto (art. 26.º RGPD) ou subcontratante, consoante os factos → o consentimento tem de identificar todos os responsáveis que nele se baseiam e ser granular por finalidade

### ETAPA 4 — GOOGLE ANALYTICS E PIXEL CONFIGURAÇÃO CONFORME
Recomenda configuração específica para ferramentas comuns:

**Google Analytics 4:**
- Modo de consentimento (Consent Mode v2): exigido pela Google, ao abrigo da sua política de consentimento dos utilizadores da UE, para manter a medição e a personalização de anúncios no tráfego do EEE desde março de 2024 — é exigência contratual da Google, não obrigação legal, e não substitui o consentimento
- Configurar: ad_storage=denied, analytics_storage=denied por defeito
- Ativar só após consentimento explícito
- Google Signals: desativar para utilizadores sem consentimento

**Meta Pixel:**
- Não carregar o pixel antes do consentimento: o pixel de rastreio cai no âmbito do art. 5.º, n.º 3, da Diretiva ePrivacy (art. 5.º Lei 41/2004) mesmo sem cookies (Orientações CEPD 2/2023) [■ VERIFICAR: opções de consentimento que a Meta disponibiliza para o pixel]
- Eventos de compra sem rastreio: só após consentimento
- Advanced Matching: só com consentimento

**Server-side tracking:** pode reduzir a dependência de cookies de terceiros, mas não afasta o consentimento quando há armazenamento ou acesso no terminal (Orientações CEPD 2/2023); exige avaliação de base jurídica própria e DPIA se o tratamento for suscetível de implicar risco elevado (art. 35.º RGPD)

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
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 7.º RGPD | por conferir [■ VERIFICAR] | o assunto descrito não coincide com a epígrafe; confirmar |
| art. 7.º | por conferir [■ VERIFICAR] | diploma não identificado |
| arts. 5.º | por conferir [■ VERIFICAR] | diploma não identificado |
| art. 6.º, n.º 1 RGPD | conferida (índice) |  |
| art. 26.º RGPD | conferida (epígrafe) — Responsáveis conjuntos pelo tratamento |  |
| art. 35.º RGPD | conferida (epígrafe) — Avaliação de impacto sobre a proteção de dados |  |
