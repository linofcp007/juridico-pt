# Classificação: juridico-pt-v3-0-redator

## Modo
Spec. É a fusão do kit próprio `redator-juridico-ia-pt` (feito na empresa com advogados) no plugin, com mudança de persona e de público. Entra numa major: 3.0.0.

## Tracks Ativos
core +tdd +ai +privacy

## Sinais
- **+tdd:** há código novo com regras verificáveis:
  - o exportador `.docx` com formatação forense e a Marcação Redator (TS e Python só com a biblioteca-padrão, com paridade);
  - o verificador de redação como tool MCP;
  - o índice de normas conferidas gerado por script;
  - os testes de estrutura dos modelos e das citações.

  Correção acima de tudo: um documento com um marcador interno esquecido ou um artigo sem lastro chega a um cliente.
- **+ai:** a qualidade do produto é o comportamento do modelo. Entram uma persona nova no registo de advogado, um skill novo (`redator-juridico`) com fluxo de entrevista e entrega, e regras de fundamentação fechada. É domínio regulado (documentos jurídicos para assinar). Avaliação com `claude plugin eval`, como na v2.0: golden, adversarial e regressão.
- **+privacy:** o perfil passa a guardar o advogado responsável (nome, cédula, domicílio profissional). A entrevista recolhe dados das partes (nome, NIF/NIPC, morada) e os `.docx` exportados ficam no disco com esses dados. Aplica-se a regra do kit de pedir só o necessário (RGPD e Lei n.º 58/2019).
- **+sec considerado e rejeitado:** não há fronteira de confiança nova. As escritas reutilizam o `fs-seguro` (1.2.1) e não há credenciais. O conteúdo de modelos e perfis continua a ser dado, não instrução (avaliações a01/a02 existentes).
- **+api considerado e rejeitado:** as 38 tools mantêm nomes e parâmetros. Entram tools novas (`listar_modelos`, `obter_modelo`, `verificar_redacao`) e o `exportar_documento` ganha um formato de entrada, sem quebrar o atual.
- **+ui e +dist rejeitados:** não há interface própria nem dados distribuídos.

## Raio de Impacto
- **Persona errada.** Afirmar a um cliente que a IA é advogado inscrito expõe a empresa à usurpação de funções (art. 358.º CP). Mitigação: avaliação adversarial com tolerância zero.
- **Modelo que substitui um template e cobre menos.** Os utilizadores perdem cláusulas que tinham. Mitigação: comparar cada par no design.
- **Exportador que deixa passar `{{...}}` ou `[[IA:` num `.docx`.** Mitigação: bloqueio com teste.
- **Resíduo de PT-BR.** Prejudica a credibilidade junto de advogados portugueses. Mitigação: teste com lista fechada.
- **Recuperação:** com nova versão. Os templates substituídos ficam acessíveis pelo nome antigo (redirecionamento).

## Nível de Autonomia
Consultivo. O sistema redige e grava ficheiros só a pedido; nada é enviado, assinado nem apresentado sem o utilizador. O advogado responsável revê antes de assinar.

## Projeção de Volume / Custo
- O plugin não chama modelos: usa o modelo e o plano do cliente do utilizador. O custo é o contexto carregado por sessão (persona, instruções MCP, `SKILL.md`).
- Orçamento: cada `SKILL.md` com 500 linhas ou menos, e instruções do servidor MCP sem crescer mais de 20 % face à v2.0.2.
- Volume: baixo (uso local, sem infraestrutura). Custo de infraestrutura: zero.

## Tags de Conformidade
GDPR / RGPD: dados das partes nos documentos exportados e dados do advogado responsável no perfil.

## Tamanho
l. Cadeia completa: toca todas as superfícies (skill, MCP, commands, hooks, CLI, integrações), traz 12 modelos, um skill novo e duas tools novas.

## Decisões da Fase 0 (aprovadas pelo utilizador a 2026-10-27)
- O repositório continua público.
- Público: escritórios de advogados, empresas, particulares e contabilistas.
- Tudo é escrito sempre no registo de um advogado. Cada ponto a adaptar fica marcado no sítio (`[■ CONFIRMAR]` / `[■ VERIFICAR]`) com a nuance.
- Zero PT-BR; o inglês mantém-se (descrições PT+EN, templates bilingues, glossário).
- Branch própria `feature/juridico-pt-v3-0-redator`.

## Resumo
Fundir no plugin juridico-pt o kit próprio redator-juridico-ia-pt:
- 12 modelos conferidos com fundamentação permitida;
- índice de normas conferidas usado pelo verificador de citações;
- guias de segurança jurídica, entrevista, entrega e estilo em PT-PT (mantendo o inglês);
- formatação forense `.docx` portada para o exportador TypeScript;
- verificador de redação como tool MCP;
- segundo skill `redator-juridico`;
- persona unificada no registo de advogado para escritórios, empresas, particulares e contabilistas, sem afirmar inscrição na Ordem dos Advogados.
