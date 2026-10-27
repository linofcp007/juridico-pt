# Classificação: juridico-pt-v3-1-fichas

## Modo
Spec

## Tracks Ativos
core +tdd +ai

## Sinais
- **+tdd:** a importação é automática e vai sobre 1319 ficheiros. Só testes escritos antes (estrutura, grafia, citações, índice, tools) garantem que nenhuma ficha entra fora das regras da casa, e que uma reimportação não as quebra.
- **+ai:** as fichas mudam o comportamento do assistente. São prompts de trabalho que o modelo segue, e há tools novas no fluxo do redator. Isto mede-se com casos novos no `claude plugin eval` (golden, adversariais e uma regressão da citação errada encontrada).

## Raio de Impacto
- **Se a importação correr mal:** entram fichas com artigos errados ou grafia anterior ao AO90 num plugin público, usado por escritórios. Na amostra lida (TRA-005), 3 das 5 citações estavam erradas, o que foi confirmado no PGDL.
- **Mitigação:** nenhuma citação de ficha entra como conferida sem cruzamento ou conferência. As restantes vão sempre com `[■ VERIFICAR]`.
- **Recuperação:** é rápida. As fichas são conteúdo versionado, e uma versão de correção sai no mesmo dia, como a 3.0.1 e a 3.0.2.

## Nível de Autonomia
Consultivo: o assistente redige e o advogado responsável revê e assina, como na 3.0.

## Projeção de Volume / Custo
- **Repositório e pacotes:** cerca de +8 MB de texto no repositório (mais a cópia em `mcp-server/content/`) e cerca de +2 a 3 MB comprimidos no `.skill` e no `.mcpb`.
- **Por pedido:** uma ficha tem cerca de 6 KB, perto de 1500 tokens, e só é lida a pedido. O contexto fixo cresce apenas pelas 2 tools novas nas instruções do servidor, que continuam com 2000 caracteres ou menos.
- **Avaliações:** cerca de 10 casos novos × 3 execuções, perto de 8 a 12 USD, com confirmação do utilizador antes de correr.

## Tags de Conformidade
Nenhuma nova: as fichas não têm dados pessoais (verificado: só exemplos fictícios).

## Resumo
Integrar as 1319 fichas do catálogo Skills Jurídicas PRO, da própria empresa, no skill `juridico-pt`. As fichas cobrem 22 áreas do direito português e passam a ser servidas a pedido pelas tools `procurar_ficha` e `obter_ficha`, com índice bilingue PT/EN.

Antes de entrar, cada ficha é normalizada:
- PT-PT do Acordo Ortográfico de 1990, sem PT-BR;
- persona no registo de advogado, sem o aviso antigo;
- montantes a remeter para `valores-2026`.

O que já existe no plugin não se duplica: as fichas do mesmo documento que um modelo ou template ficam como remissão. As citações são cruzadas com o índice de normas conferidas e conferidas por área contra as epígrafes oficiais (PGDL). As que ficarem por conferir levam `[■ VERIFICAR]`.

**Decisões do utilizador (2026-10-27):**
- O material é da empresa, que tem os direitos ("é nosso, temos direito disso tudo").
- É para fazer tudo, nas 22 áreas.
- Tudo em PT-PT e em inglês.
