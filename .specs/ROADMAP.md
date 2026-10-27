# Roadmap — juridico-pt

<!-- AUTO-GERADO por dev-spec — não editar à mão. -->

**Progresso: 100%** ▰▰▰▰▰▰▰▰▰▰ · 9/9 features completas · 188/188 tasks feitas

_Velocidade: 29.18 ponto(s)/dia útil — 188 tarefa(s), 496 ponto(s) concluídos desde 2026-10-03 (últimos 28 dias)_

Legenda: ✅ feito · 🟡 em curso · ⛔ bloqueada · 📋 planeada · ⬜ por começar

## ▶ A seguir
Todas as features completas 🎉

## Features

| | Feature | Tracks | Fase | % | Tasks | Deps | Próxima | Previsão |
|---|---|---|---|---|---|---|---|---|
| ✅ | [advogado-pt-v1-1-empresas](./advogado-pt-v1-1-empresas/requirements.md) | core +tdd | concluída | 100% | 28/28 | — | — | — |
| ✅ | [advogado-pt-v1-2-1-correcoes](./advogado-pt-v1-2-1-correcoes/requirements.md) | core +tdd +sec | concluída | 100% | 41/41 | advogado-pt-v1-2-operacional ✓, advogado-pt-v1-1-empresas ✓ | — | — |
| ✅ | [advogado-pt-v1-2-operacional](./advogado-pt-v1-2-operacional/requirements.md) | core +tdd | concluída | 100% | 30/30 | advogado-pt-v1-1-empresas ✓ | — | — |
| ✅ | [juridico-pt-v2-0](./juridico-pt-v2-0/requirements.md) | core +tdd +ai +privacy | concluída | 100% | 38/38 | advogado-pt-v1-2-1-correcoes ✓ | — | — |
| ✅ | [juridico-pt-v3-0-1-redator-unificado](./juridico-pt-v3-0-1-redator-unificado/change.md) | core | concluída | 100% | 3/3 | — | — | — |
| ✅ | [juridico-pt-v3-0-2-lei-estrangeira](./juridico-pt-v3-0-2-lei-estrangeira/change.md) | core | concluída | 100% | 3/3 | — | — | — |
| ✅ | [juridico-pt-v3-0-redator](./juridico-pt-v3-0-redator/requirements.md) | core +tdd +ai +privacy | concluída | 100% | 27/27 | advogado-pt-v1-1-empresas ✓, advogado-pt-v1-2-1-correcoes ✓ | — | — |
| ✅ | [juridico-pt-v3-1-1-revisao-fichas](./juridico-pt-v3-1-1-revisao-fichas/change.md) | core | concluída | 100% | 3/3 | juridico-pt-v3-1-fichas ✓ | — | — |
| ✅ | [juridico-pt-v3-1-fichas](./juridico-pt-v3-1-fichas/requirements.md) | core +tdd +ai | concluída | 100% | 15/15 | advogado-pt-v1-1-empresas ✓, advogado-pt-v1-2-1-correcoes ✓, advogado-pt-v1-2-operacional ✓, juridico-pt-v2-0 ✓, juridico-pt-v3-0-redator ✓, juridico-pt-v3-0-1-redator-unificado ✓, juridico-pt-v3-0-2-lei-estrangeira ✓ | — | — |

## Dependências

```mermaid
graph LR
  f_advogado_pt_v1_2_operacional["advogado-pt-v1-2-operacional"] --> f_advogado_pt_v1_2_1_correcoes["advogado-pt-v1-2-1-correcoes"]
  f_advogado_pt_v1_1_empresas["advogado-pt-v1-1-empresas"] --> f_advogado_pt_v1_2_1_correcoes["advogado-pt-v1-2-1-correcoes"]
  f_advogado_pt_v1_1_empresas["advogado-pt-v1-1-empresas"] --> f_advogado_pt_v1_2_operacional["advogado-pt-v1-2-operacional"]
  f_advogado_pt_v1_2_1_correcoes["advogado-pt-v1-2-1-correcoes"] --> f_juridico_pt_v2_0["juridico-pt-v2-0"]
  f_advogado_pt_v1_1_empresas["advogado-pt-v1-1-empresas"] --> f_juridico_pt_v3_0_redator["juridico-pt-v3-0-redator"]
  f_advogado_pt_v1_2_1_correcoes["advogado-pt-v1-2-1-correcoes"] --> f_juridico_pt_v3_0_redator["juridico-pt-v3-0-redator"]
  f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"] --> f_juridico_pt_v3_1_1_revisao_fichas["juridico-pt-v3-1-1-revisao-fichas"]
  f_advogado_pt_v1_1_empresas["advogado-pt-v1-1-empresas"] --> f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"]
  f_advogado_pt_v1_2_1_correcoes["advogado-pt-v1-2-1-correcoes"] --> f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"]
  f_advogado_pt_v1_2_operacional["advogado-pt-v1-2-operacional"] --> f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"]
  f_juridico_pt_v2_0["juridico-pt-v2-0"] --> f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"]
  f_juridico_pt_v3_0_redator["juridico-pt-v3-0-redator"] --> f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"]
  f_juridico_pt_v3_0_1_redator_unificado["juridico-pt-v3-0-1-redator-unificado"] --> f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"]
  f_juridico_pt_v3_0_2_lei_estrangeira["juridico-pt-v3-0-2-lei-estrangeira"] --> f_juridico_pt_v3_1_fichas["juridico-pt-v3-1-fichas"]
```

## ⚠ Precisa de atenção

_Nada a assinalar ✓_

## Backlog (planeadas, ainda sem spec)

_(vazio)_
