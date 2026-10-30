# Revisão técnica das fichas (3.1.2): onde ficámos e como continuar

> **Concluído a 2026-10-30.**
> - **Lotes:** os 71 que faltavam foram revistos (272 fichas, 2146 correções, todas «corrigida») e integrados. Ao todo, 834 fichas e 7157 correções.
> - **Problemas de fundo resolvidos:**
>   - revogados nas epígrafes: `--revogados`, 325 artigos;
>   - citações sem «º»;
>   - lista AO90: mais 80 formas;
>   - referências da casa: as 7, com as fontes em `trabalho/referencias-casa.txt`.
> - **Versão 3.1.2:** CHANGELOG, README e bundles feitos. As suites passam: MCP 283/283 (2 saltados) e Python 56/56.
> - **Custo real da 2.ª sessão:** 327,36 USD (71 revisores, 323,10 USD, mais o revisor das referências, 4,26 USD). Medido com `triagem/custo-real.cjs <pasta subagents da sessão 98fc68b8…>`. Ao todo, 1067,07 USD.
> - **Falta:** o fecho da spec e a publicação (merge, push, release), que dependem do «sim» explícito do utilizador.
>
> O resto deste ficheiro é o registo de 2026-10-28.

Parado a **2026-10-28**: o limite semanal da conta interrompeu os revisores. O limite repõe a 3/11, às 10h. Branch: `feature/juridico-pt-v3-1-2-revisao-fichas`. Está **commitado localmente**. Não há push, merge nem lançamento.

## O que está feito
- **Triagem:** as 1214 fichas que faltavam passaram pela triagem (Sonnet).
  - ok: 422;
  - gravidade alta: 137;
  - gravidade média: 419;
  - gravidade baixa: 236.
- **Revisão a fundo (Opus), com fonte oficial:** 520 fichas novas, a juntar às 42 da 3.1.1. Ao todo há **562 fichas em `assets/fichas/correcoes-conteudo.json`**, com 5011 substituições: 558 corrigidas e 4 marcadas «rever de raiz».
  - todas as 137 de gravidade alta;
  - 383 das 419 de gravidade média.
- **Já integrado no plugin:**
  - reimportado (`OK: 1256 fichas, 19 138 citações`);
  - as citações com diploma conhecido estão 94,3 % conferidas ou corrigidas;
  - testes MCP 280/280 e Python 56/56.
- **Referência da casa:** em `references/arrendamento.md`, o BNA passou a BAS (art. 15.º-A NRAU, Lei 56/2023, confirmado na PGDL).
- **Importador:** o texto novo das correções passa outra vez por `normalizarGrafia` e `remeterGrandezas` (AO90 e valores do ano).
- **Custo real (equivalente em API, lido nos registos):** 739,71 USD (triagem 76,99 USD; revisão 662,72 USD). Cerca de 1,2 USD por ficha revista a fundo.

## O que falta
1. **71 lotes por rever (272 fichas):** 36 de gravidade média e 236 de gravidade baixa. A lista está em `trabalho/pendentes.json`.
   - 20 destes lotes foram lançados e interrompidos sem resultado: btra1a, bfis1a, bfis1b, mpi1a, mpi1b, mpi2a, mpi2b, bsuc1a, bsuc1b, bimo1a, bimo1b, madm1a, madm1b, madm2a, bins1a, bprc1a, bprc1b, mue2b, mdig2a e mdig2b. Relançam-se de raiz.
   - Custo estimado: cerca de 1,2 USD por ficha, ou seja ≈ 330 USD para as 272.
2. **Ajustes de decisões de citação.** Os já aplicados estão em `trabalho/ajustes-decisoes.json` e os relatados em `trabalho/ajustes-propostos.txt`. Ficaram por decidir as entradas com «?» que o `aplicar-propostas.mjs` ignorou (ver a saída dele).
3. **Referências da casa a confirmar na fonte antes de mexer** (`trabalho/referencias-casa.txt`):
   - `multas.md`: 20 → 15 dias úteis na impugnação rodoviária (art. 181.º Código da Estrada);
   - `imobiliario.md`: direito de retenção depois do DL 48/2024;
   - `sucessorio-internacional.md`: Convenção da Haia de 1961 e quem emite o certificado sucessório europeu;
   - `herancas.md`: casos de inventário obrigatório e forma do repúdio;
   - `licenciamento-setorial.md`: arts. 114.º, n.º 3, e 115.º RJUE (DL 108/2026);
   - `bancario.md`: DL 74-A/2017 e LCS atualizados.
4. **Problemas de fundo encontrados pelos revisores:**
   - **Citações sem «º»:** citações como «Art. 246 CSC» não são apanhadas pelo extrator. Há cerca de 312 no catálogo.
   - **Artigos revogados nas epígrafes:** as epígrafes ainda dão título a artigos revogados (ex.: CPP art. 315.º), por isso uma citação deles passa como conferida.
   - **Lista AO90:** faltam termos em `mcp-server/scripts/ao90.json` (adoptar, adopção, contra-ordenação, accionista). Com o reprocessamento do importador, o texto novo das correções já é normalizado. Falta acrescentar os termos à lista e reimportar.
5. **Lançamento da 3.1.2, sempre com aprovação do utilizador:**
   - spec de alteração (`spec_create`, tamanho xs, `change.md`) e aprovação;
   - teste de regressão para algumas correções (como o T-532);
   - versão 3.1.2 nos 6 sítios, `CHANGELOG`, bundles;
   - push e release.

## Como continuar (comandos)
Pasta de trabalho: `.specs/juridico-pt-v3-1-2-revisao-fichas/trabalho/` (chamada D abaixo).
1. **Gerar os textos** (não vão para o git): `node D/preparar-textos.mjs`. Usa o kit em `C:/Users/Administrator/Downloads/skills-juridicas-pro`, que é só de leitura; muda-se com `KIT=...`.
2. **Lançar os revisores (Opus).** Pôr os ficheiros de saída em D (são do tipo `revisao-*.json`); `juntar.mjs` lê só os que estão em D. O prompt de cada revisor:
   - lê `D/INSTRUCOES.md` e a secção da área em `D/AREAS.md`;
   - indica o lote, as fichas, a saída `D/revisao-<lote>.json` e o validador `node D/validar.mjs <lote>`;
   - nos lotes de gravidade baixa, diz que «ok» é um veredicto válido.
3. **Fila de lotes:** `fila2.cjs` usa `fila2.json`. Os 20 interrompidos têm de sair de `lancados2.json` antes de se relançarem.
4. **Medir o custo real** a cada vaga com `node D/triagem/custo-real.cjs`. A pasta dos subagentes muda de sessão para sessão: atualizar a constante `D` no script.
5. **Integrar**, por esta ordem:
   - `node D/juntar.mjs skills/juridico-pt/assets/fichas/correcoes-conteudo.json <data>`;
   - `node D/aplicar-propostas.mjs skills/juridico-pt`;
   - `node D/conciliar.mjs skills/juridico-pt`;
   - `node mcp-server/scripts/importar-fichas.mjs --origem <kit>`, repetindo o `conciliar` se o importador acusar decisões órfãs;
   - `cd mcp-server && npm run build && npm test`;
   - `python -I skills/juridico-pt/scripts/test_scripts.py`.
6. **Ajustes críticos:** quando um revisor reporta que uma decisão «corrigir» reescreveria texto novo correto, a decisão tem de ser **retirada**. Exemplos já tratados: FIS-028 «ART. 29.º RGIT», TRA-047 «Art. 18.º CT», SAU-052 «art. 38.º, n.º 3, CP».

## Reformas confirmadas por revisores nesta ronda (fonte oficial)
- **Penal e processo penal:** a Lei 34/2026 e a Lei 37/2026 alteraram o CPP e o CP.
- **Imobiliário e urbanismo:** a Lei 56/2023 criou o BAS e o DL 108/2026 alterou o RJUE.
- **Concorrência:** o Reg. (UE) 2026/877 alterou a isenção por categoria da transferência de tecnologia.
- **Digital:**
  - o DL 125/2025 transpôs a diretiva NIS2;
  - o Reg. (UE) 2026/1744 (Omnibus Digital) adiou o regime de alto risco do AI Act.
- **Nacionalidade, estrangeiros e asilo:**
  - a Lei Orgânica 1/2026 alterou a Lei da Nacionalidade (7 ou 10 anos de residência);
  - a Lei 61/2025 e a Lei 62/2026 alteraram a lei de estrangeiros e a do asilo.
- **Fiscal e ambiente:** o DL 97/2026 criou a taxa de 10 % para rendas moderadas; o DL 129/2026 alterou a REN.
- **Saúde:** a Lei 9/2026 regula os ensaios clínicos; a Lei 35/2023 é a nova Lei da Saúde Mental.
