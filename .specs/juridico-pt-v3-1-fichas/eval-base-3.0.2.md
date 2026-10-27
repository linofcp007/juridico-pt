# Base das avaliações: os 10 casos novos sobre a 3.0.2

**Execução:**
- **Quando:** 2026-10-27, por volta das 19h20.
- **Onde:** num worktree isolado no commit 02bd1db (v3.0.2), com os 10 casos copiados para `evals-novos/`.
- **Ferramenta:** Claude Code 2.1.311, com o modelo por defeito da conta.
- **Parâmetros:** `--runs 1`, `--ablation none`, `--keep-temp`.
- **Custo:** 3,78 USD (teto de 5).

**Comando:**
```
claude plugin eval . --eval-dir evals-novos --ablation none --mocks off --allow-tools "mcp__plugin_juridico-pt_juridico-pt__*" --runs 1 -j 4 --max-cost-usd 5 --trust-plugin --no-publish --keep-temp --json base-302.json
```

## Resultado

| Conjunto | Com a 3.0.2 |
|---|---|
| Golden (g51–g58) | 1/8 (12,5 %): só passa o g58, que já usa o modelo conferido |
| Adversarial (a14) | 1/1 (100 %) |
| Regressão (r06) | 1/1 (100 %) |

## Leitura
- **g51–g57:** falham todos no grader `01-ficha`, porque as tools `procurar_ficha` e `obter_ficha` ainda não existem. Os graders das respostas (área, AIMA, Lei n.º 54/2017, inglês) dizem se o modelo já sabe o essencial sem as fichas. O ganho da 3.1 mede-se no uso das fichas e nas citações.
- **g58:** a remissão para o modelo conferido já funciona na 3.0.2. Tem de se manter com as fichas, sem que a ficha INS-008 tome o lugar do modelo.
- **a14 e r06:** passam sem fichas, porque o modelo não usa o art. 157.º CT para o trabalho suplementar quando não o lê em lado nenhum. O risco que estes casos guardam é a ficha TRA-005 por corrigir: com ela no catálogo, o modelo podia copiar o erro. Têm de continuar a passar depois da importação.
