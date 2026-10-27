# dev-spec upgrade — juridico-pt

<!-- AUTO-GERADO por dev-spec — marca as caixas à medida que avanças; o spec_upgrade {apply: true} (dev-spec upgrade --apply) escreve-o quando migra alguma coisa. -->

> .specs/ atualizado de 1.21.1 para 1.32.0. Por feature: o que as regras da 1.32.0 assinalam, o que fazer e que revisão correr. Trabalha-o com /spec-upgrade (Claude Code) ou dev-spec upgrade; volta a correr a auditoria quando quiseres para ver o estado atual.

**4 feature(s) ativa(s): 3 bloqueada(s) · 1 a precisar de atenção · 0 ok**

- [ ] O dev-guardian está instalado e este projeto tem .guardian/: dev-spec init --guardian (spec_init {guardian: true}) junta o gate dele como a verificação do projeto 'guardian' — o /spec-finish (finish --run) passa a correr o scan do dev-guardian, que demora minutos e precisa dos scanners dele (Semgrep, Gitleaks, Trivy…).

## Migrações

- meta.specVersion: 1.21.1 → 1.32.0

## ⛔ Bloqueadas — o doctor falha

### advogado-pt-v1-1-empresas — fechada · [core +tdd] · concluída · 28/28 tarefas

- [ ] A seguir: Corrige as verificações bloqueantes (traceability) — corre /spec-doctor advogado-pt-v1-1-empresas para detalhes. Nota: o steering mudou depois da aprovação de requirements, design (constitution.md, testing-standards.md) — revê à luz dele e volta a aprovar se continuar válido (dev-spec impact advogado-pt-v1-1-empresas --phase steering).
- [ ] Corrige o que o doctor dá como falha: traceability (ficheiros _Implements:_ que não existem: skills/advogado-pt/assets/templates/carta-cobranca-formal-registada.…)
- [ ] Decide sobre a deriva: 241 ficheiro(s) de implementação alterado(s) desde o fecho — dev-spec drift advogado-pt-v1-1-empresas; /spec-review advogado-pt-v1-1-empresas converge verifica o código critério a critério
- _Não precisa de revisão da spec — todas as tarefas estão feitas_
- _Avisos: tests-in-code, red-green, suite-evidence, steering-changed-since-approval_

### advogado-pt-v1-2-1-correcoes — fechada · [core +tdd +sec] · concluída · 41/41 tarefas

- [ ] A seguir: Corrige as verificações bloqueantes (traceability) — corre /spec-doctor advogado-pt-v1-2-1-correcoes para detalhes. Nota: o steering mudou depois da aprovação de requirements, design (constitution.md, testing-standards.md) — revê à luz dele e volta a aprovar se continuar válido (dev-spec impact advogado-pt-v1-2-1-correcoes --phase steering).
- [ ] Corrige o que o doctor dá como falha: traceability (ficheiros _Implements:_ que não existem: skills/advogado-pt/scripts/test_scripts.py, cli/advogado-pt.mjs, ski…)
- [ ] Decide sobre a deriva: 26 ficheiro(s) de implementação alterado(s) desde o fecho — dev-spec drift advogado-pt-v1-2-1-correcoes; /spec-review advogado-pt-v1-2-1-correcoes converge verifica o código critério a critério
- _Não precisa de revisão da spec — todas as tarefas estão feitas_
- _Avisos: tests-in-code, red-green, suite-evidence, steering-changed-since-approval_

### advogado-pt-v1-2-operacional — fechada · [core +tdd] · concluída · 30/30 tarefas

- [ ] A seguir: Corrige as verificações bloqueantes (traceability) — corre /spec-doctor advogado-pt-v1-2-operacional para detalhes. Nota: o steering mudou depois da aprovação de requirements, design (constitution.md, testing-standards.md) — revê à luz dele e volta a aprovar se continuar válido (dev-spec impact advogado-pt-v1-2-operacional --phase steering).
- [ ] Corrige o que o doctor dá como falha: traceability (ficheiros _Implements:_ que não existem: skills/advogado-pt/references/valores-2026.md, skills/advogado-pt/sc…)
- [ ] Decide sobre a deriva: 136 ficheiro(s) de implementação alterado(s) desde o fecho — dev-spec drift advogado-pt-v1-2-operacional; /spec-review advogado-pt-v1-2-operacional converge verifica o código critério a critério
- _Não precisa de revisão da spec — todas as tarefas estão feitas_
- _Avisos: tests-in-code, red-green, suite-evidence, steering-changed-since-approval_

## ▲ Precisam de atenção

### juridico-pt-v2-0 — fechada · [core +tdd +ai +privacy] · concluída · 38/38 tarefas

- [ ] A seguir: 'juridico-pt-v2-0' está fechada (2026-10-08) — os 177 ficheiro(s) de implementação não mudaram desde então. Nada mais a fazer aqui — /spec-report drift juridico-pt-v2-0 verifica-a depois de alterações futuras.
- _Não precisa de revisão da spec — todas as tarefas estão feitas_
- _Avisos: red-green_

---

Todas as alterações passam pelos gates normais: novas aprovações com spec_approve (/approve), edições da spec depois de uma aprovação com spec_impact (/spec-change <feature> impact), trabalho de seguimento com spec_append_tasks (/spec-review <feature> converge). Nada aqui é aplicado automaticamente.
