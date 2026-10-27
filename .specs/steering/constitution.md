# Constituição

Princípios inegociáveis que toda a feature deve cumprir. Mantém-nos poucos, concretos e testáveis.
O `doctor` e o `/prReview` verificam contra eles; um design que viole um princípio é bloqueado.

## Princípios
1. **Ponto único de verdade para valores** — montantes, taxas e limiares vivem em `skills/juridico-pt/references/valores-2026.md`; os outros ficheiros remetem para lá. Uma taxa usada numa calculadora existe também no port TS e no Python, com o mesmo valor.
2. **Anti-alucinação** — nenhum artigo, diploma, prazo ou acórdão inventado. O que não estiver confirmado leva "(a confirmar)" ou `[VERIFICAR]` e remete para dre.pt / dgsi.pt.
3. **Calculadoras e geradores nos dois lados** — cada calculadora existe em Python (`scripts/`, stdlib, `argparse`, `formatar_euros`, AVISO) e em TypeScript (`mcp-server/src/calculators/`), com testes equivalentes nos dois lados e os mesmos resultados. O gerador `.docx` da Marcação Redator e o verificador de redação seguem a mesma regra: mesma entrada dá o mesmo resultado nos dois lados.
4. **Cross-refs com nomes reais** — commands, SKILL.md, READMEs e playbooks só citam ficheiros e tools que existem; o `plugin.test.mjs` valida-o.
5. **Zero custo e zero dependências novas** — sem npm publish, sem CI, sem dependências de runtime novas; o hook continua dependency-free e fail-open; nunca um `bin/` na raiz.
6. **Estilo da casa** — referências: H1, `## Legislação Base`, bullets, `## Para o contexto do utilizador`, `## Templates`; templates: comentário `<!-- Template: -->`, placeholders `{{...}}`; modelos conferidos (`assets/modelos/`): linha `Âmbito:` no cabeçalho e as 8 secções (quando usar, perguntas, variantes, texto, fundamentação permitida, armadilhas, nota de entrega, trecho de tom).

## Restrições
- Node >= 18; Python 3 só com a biblioteca-padrão.
- O bundle `mcp-server/dist/index.js` e `mcp-server/content/` são versionados e regenerados com `npm run build` sempre que `src/` ou o conteúdo mudam.
- Bump de versão em simultâneo em plugin.json, marketplace.json (2 campos), package.json, mcp-server/package.json, mcp-server/src/index.ts + CHANGELOG.
- Tudo é redigido no registo de advogado português; o sistema nunca afirma ser advogado inscrito na OA, indica advogado quando o patrocínio é obrigatório e cada entrega leva a linha fixa de revisão.

## Regras de Decisão
- Rigor jurídico > cobertura: na dúvida, marcar "(a confirmar)" em vez de afirmar.
- Preferir estender um ficheiro/tool existente a criar um novo.
- Precisão > recall nos hooks (um falso positivo é ruído em cada gravação).
