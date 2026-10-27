# Decisões: juridico-pt-v3-0-redator

## D-1 — Comparação dos templates substituídos com os modelos do kit (2026-10-27)

Análise feita só de leitura, par a par. As linhas referem-se a `C:\Users\Administrator\Downloads\redator-juridico-ia-pt\modelos\`. O resumo e as regras estão no design, na secção "Comparação templates → modelos".

### 1. reconhecimento-divida → confissao-de-divida-e-acordo-de-pagamento
- **Lacunas:**
  - interrupção da prescrição (art. 325.º CC; ⏰; `calc_prescricao`), a pôr na cl. 1.ª, n.º 3, e na secção 6;
  - autenticação por notário ou solicitador: a variante `autenticado` (secção 3, item 5) só prevê advogado;
  - `calc_juros_mora` e `valores-2026.md` nas variantes 13–15 e na secção 6, item 2.
- **Contradições:**
  - C-1: l. 130 limita os juros comerciais a pessoas coletivas;
  - C-2: l. 217 dá a exigência imediata pelo art. 781.º, mas o modelo de interpelação do kit (l. 127) exige uma declaração do credor.
- **Valores:**
  - 4 % e os limites de usura +3/+5 %, +7/+9 %: l. 101, 198, 204, 211, 369, 386, 403, 422, 438, 440;
  - Imposto do Selo 0,04–0,60 %: l. 404;
  - exemplos: l. 446, 495.
- **PT-BR:** l. 2 "revisado"; l. 264 e 459 "parcela(s)" (que a l. 478 do próprio modelo proíbe).

### 2. contrato-arrendamento-habitacional → contrato-de-arrendamento-habitacional
- **Lacunas:**
  - comunicação à AT até ao fim do mês seguinte (art. 60.º, n.º 2, CIS; Modelo 2) e liquidação do IS: o modelo (l. 343) só diz "nos prazos legais [VERIFICAR]";
  - rendas na categoria F do IRS;
  - art. 1682.º-A, n.º 1, al. a), e n.º 2, com o art. 1687.º: o modelo (l. 129, 428, 457) dá-o como não lido; deve entrar no item 38 da secção 5;
  - remissões para `valores-2026.md` (coeficiente, caução, IS);
  - cláusula livre: ocupantes, animais.
- **Contradições:** C-3, pequenas reparações: o modelo, l. 288, põe-nas por defeito a cargo do arrendatário.
- **Valores:**
  - 20 % do art. 1041.º: l. 8, 282, 387, 448, 473, 484;
  - duas rendas / dois meses: l. 29, 102, 104, 259, 261, 268, 393, 461, 485, 508;
  - exemplos: l. 472, 520.
- **PT-BR:** l. 2 "revisado". A l. 327 "vistoria conjunta" contra a proibição da l. 472: "vistoria" é PT-PT e a proibição sai.

### 3. acordo-revogacao → acordo-de-revogacao-do-contrato-de-trabalho
- **Lacunas:**
  - art. 337.º, n.º 3, CT (o modelo não o cita; o item 18 da secção 5 dá-o como não lido);
  - comunicação à Segurança Social;
  - art. 2.º, n.º 4, CIRS;
  - Modelo RP 5044-DGSS (l. 181 tem `[VERIFICAR]`);
  - `calc_compensacao_despedimento` e `valores-2026.md` na secção 4-B e na secção 7.
- **Contradições:**
  - C-4: cl. 6.ª, n.º 1, l. 172, "nada mais tendo a receber";
  - C-5: 14 dias em toda a antiguidade (l. 6, 242, 451), contra a l. 135 do `valores-2026.md` e o `calc_compensacao_despedimento`.
- **Valores:**
  - 14 dias: l. 6, 242, 451;
  - 24 dias: l. 39, 98, 452, 501, 539;
  - 20×, 12× e 240× a RMMG: l. 261, 269, 386, 401, 451, 501;
  - 22 dias de férias: l. 238;
  - exemplos: l. 115, 560–563.
- **PT-BR:** l. 2 "revisado"; l. 295 e 434 `nova_planilha` / `salvar` (código `.xlsx`, fora de âmbito).

### 4. nota-de-culpa + carta-despedimento-justa-causa → processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento
- **Lacunas:**
  - art. 128.º CT, al. b), c), e) e f): a l. 222 do modelo proíbe citá-lo por não estar conferido;
  - art. 98.º;
  - CITE e art. 63.º: o modelo só fala da "entidade competente… não lidos" (l. 378, 443);
  - reação judicial com ⏰ de 60 dias (art. 387.º, n.º 2) na decisão final: hoje só está na secção 5;
  - comunicação à Segurança Social e `calc_creditos_laborais`, junto da l. 363.
- **Contradições:**
  - micro e pequena empresa (template) contra só microempresa, art. 358.º (modelo);
  - C-6, parecer da CITE: suspensão preventiva (template) contra decisão de despedimento, art. 381.º, al. d) (modelo).
- **Valores:** limites das sanções, l. 367, 419, 499; exemplo de 40 €, l. 480.
- **PT-BR:** l. 2 "revisado". "recepção" na l. 438 é uma citação literal anterior ao Acordo e fica.

### 5. carta-interpelacao-incumprimento → interpelacao-e-notificacao-extrajudicial
- **Lacunas:** a base da indemnização (arts. 432.º, 801.º e 804.º): a l. 261 reserva a indemnização sem citar.
- **Contradições:**
  - C-8, resolução anunciada na carta (template) contra resolução reservada e feita em declaração separada, art. 436.º (modelo, l. 261);
  - dívidas em dinheiro: o template manda para a `carta-cobranca-formal-registada`, enquanto o modelo (l. 94) junta a interpelação admonitória com a de cobrança.
- **Valores:**
  - 4 %: l. 121, 220, 412, 447, 468, 480, 482;
  - 20 %: l. 97, 104, 107, 296, 305, 312, 335, 385, 433, 456, 489;
  - 15.000 €: l. 8, 319, 457;
  - exemplos: l. 295, 478–490.
- **PT-BR:** l. 2 "revisado".

### 6. reclamacao-creditos-insolvencia → reclamacao-de-creditos-na-insolvencia
- **Lacunas:**
  - PER/PEAP (excluído na l. 8): arts. 17.º-D, n.º 2, e 222.º-D, n.º 2, os 20 dias, a lista provisória com impugnação em 5 dias úteis, o art. 17.º-F, n.º 11, e as negociações;
  - restituição e separação, reserva de propriedade (arts. 104.º, n.º 4; 141.º, n.º 1, al. c); 102.º, n.º 2);
  - compensação, art. 99.º;
  - créditos não vencidos, art. 91.º, n.os 1 e 2;
  - hora da sentença, art. 36.º, n.º 1, al. a), e os juros até à data e hora;
  - garantes, art. 88.º, n.º 1;
  - assembleia de credores, art. 36.º, n.º 1, al. n);
  - endereço para comunicações;
  - `[VERIFICAR]` dos 40 € por fatura;
  - `calc_juros_mora`, `calc_prazo` e `playbooks/cliente-insolvente.md`.
- **Contradições:** C-7, prazo para os 5 maiores credores citados pessoalmente (art. 37.º, n.º 3): l. 15, 160, 452.
- **Valores:**
  - 40,00 €: l. 54, 120, 199;
  - 4 %: l. 118, 235, 421, 461, 484, 498, 507;
  - 2/4 UC acima de 30.000 € e 0,5–5 UC: l. 429, 444, 471 (não estão no `valores-2026.md`);
  - exemplos: l. 131, 177, 496–507.
- **PT-BR:** l. 2 "revisado".

### oposicao-injuncao (template, fica) e contestacao (modelo, variante injuncao)
- **O que o modelo cobre:** 15 dias sem dilação, arts. 12.º, 15.º, 16.º e 20.º, duplicado, art. 14.º-A, multa, prescrição presuntiva e compensação.
- **O que falta no modelo:** entrega no BNI (Portaria 220-A/2008, art. 7.º); DL 62/2013 (transação comercial sem limite, processo comum acima de metade da alçada da Relação, exclusão de consumidores, 40 €); consequências da falta de oposição; `calc_prazo`, `registar_prazo`, `calc_taxa_justica` e `calc_prescricao`.
- **Contradição C-9:** o template diz que a taxa de justiça não se paga com a oposição e sim em 10 dias após a distribuição (RCP, art. 7.º, n.º 6). O modelo (l. 88, 274, 275, 395) junta o comprovativo à peça.

## D-0 — Quem decide as contradições (utilizador, 2026-10-27)
O design foi aprovado. Para C-1 a C-9, Claude lê a fonte oficial e propõe a decisão, e o utilizador aprova. Os advogados do kit não são chamados por defeito.

## Decisões para C-1 a C-9 (aprovadas a 2026-10-27)

**Como se chegou a estas propostas.** Fontes lidas a 2026-10-27 na PGDL (versões consolidadas: CC até à Lei 29/2026; CT até à Lei 32/2025; CIRE até ao DL 87/2024; RCP até à Lei 34/2026; DL 62/2013 sem alterações) e jurisprudência no dgsi.pt. As citações decisivas foram conferidas por Claude nas páginas guardadas. Depois de o utilizador aprovar, cada proposta passa a ter as linhas **Decisão:** e **Aplicado em:**, que o teste T-456 verifica.

## D-3 — C-1 Juros comerciais com empresário em nome individual
- **Fonte:** https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?artigo_id=1920A0003&nid=1920&tabela=leis
  - DL 62/2013, art. 3.º, al. d): «Empresa», uma entidade que, não sendo uma entidade pública, desenvolva uma atividade económica ou profissional autónoma, «incluindo pessoas singulares»;
  - art. 2.º, n.º 2, al. a): exclui os contratos com consumidores.
  - https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?artigo_id=1920A0003&nid=1920&tabela=leis
- **Proposta:** o plugin está certo. O modelo do kit passa a dizer que a taxa comercial se aplica entre empresas, incluindo empresários em nome individual e profissionais independentes, e nunca a consumidores.
- **Confiança:** alta.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/confissao-de-divida-e-acordo-de-pagamento.md` — «Só quando credor e devedor sejam empresas, incluindo empresários em nome individual e profissionais independentes»
- `skills/juridico-pt/assets/modelos/interpelacao-e-notificacao-extrajudicial.md` — «Empresa inclui o empresário em nome individual e o profissional independente»
- `skills/juridico-pt/assets/modelos/nota-de-honorarios-e-despesas.md` — «incluindo empresários em nome individual; nunca com consumidores»

## D-4 — C-2 Art. 781.º CC: vencimento antecipado e interpelação
- **Fonte:** http://www.dgsi.pt/jstj.nsf
  - CC art. 781.º e art. 805.º, n.º 1;
  - STJ 03-10-2024, proc. 16296/20.9T8PRT-A.P2.S1: o art. 781.º «não prescinde da interpelação»;
  - STJ 29-05-2024, proc. 592/22.3T8PRT-A.P2.S1;
  - STJ 28-02-2023, proc. 2578/20.3T8ENT-A.E1.S1: a norma é supletiva e as partes podem acordar o vencimento automático.
  - http://www.dgsi.pt/jstj.nsf
- **Proposta:** a cláusula do modelo de confissão de dívida passa a ter duas variantes.
  - Por defeito: vencimento automático e imediato das vincendas, independentemente de interpelação, por estipulação expressa que afasta o regime supletivo do art. 781.º.
  - Alternativa: faculdade do credor, mediante interpelação escrita.
  - A checklist deixa de dizer "a confirmar" e passa a explicar que, sem cláusula expressa, é preciso interpelar. Não foi verificado o regime próprio do crédito ao consumo e das cláusulas contratuais gerais, que fica `[VERIFICAR]`.
- **Confiança:** alta.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/confissao-de-divida-e-acordo-de-pagamento.md` — «importa o vencimento automático e imediato de todas as prestações restantes, independentemente de interpelação»

## D-5 — C-3 Arrendamento habitacional: pequenas reparações
- **Fonte:** https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=775&tabela=leis
  - CC art. 1043.º, n.º 1 (deteriorações de prudente utilização ressalvadas);
  - CC art. 1073.º;
  - CC art. 1074.º, n.º 1: «Cabe ao senhorio executar todas as obras de conservação […] salvo estipulação em contrário»;
  - CC art. 1108.º: o art. 1111.º só se aplica a fins não habitacionais.
  - https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=775&tabela=leis
- **Proposta:**
  - Por defeito, a conservação cabe ao senhorio.
  - A regra do kit (pequenas reparações a cargo do arrendatário) fica como variante opcional, por estipulação expressa ao abrigo do art. 1074.º, n.º 1, com um limite em euros por intervenção.
  - As deteriorações do art. 1073.º são sempre reparadas pelo arrendatário antes da restituição.
- **Confiança:** alta.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/contrato-de-arrendamento-habitacional.md` — «incluindo as pequenas reparações decorrentes do uso corrente do locado, nos termos do artigo 1074.º»

## D-6 — C-4 Quitação na revogação do contrato de trabalho
- **Fonte:** https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis
  - CT art. 337.º, n.º 3 (Lei 13/2023): o crédito do trabalhador «não é suscetível de extinção por meio de remissão abdicativa, salvo através de transação judicial»;
  - CT art. 349.º, n.º 5;
  - TRG 24-04-2025, proc. 1643/24.2T8BCL.G1;
  - TRP 30-06-2025, proc. 2612/24.8T8VNG.P1.
  - https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis
- **Proposta:** a cláusula "nada mais tendo a receber" sai. Entra uma cláusula de compensação pecuniária global que inclui os créditos vencidos ou exigíveis (art. 349.º, n.º 5, presunção ilidível), com o valor discriminado em anexo. A declaração vale como quitação das quantias recebidas e não como remissão de créditos (art. 337.º, n.º 3).
- **Confiança:** alta.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/acordo-de-revogacao-do-contrato-de-trabalho.md` — «vale como quitação das quantias recebidas e não como remissão de créditos»

## D-7 — C-5 Compensação de referência na revogação
- **Fonte:** https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=3628&tabela=leis
  - CT art. 366.º, n.º 1 (14 dias, na redação da Lei 13/2023);
  - Lei 13/2023, art. 35.º, n.º 2 (os 14 dias só se aplicam ao período desde 01-05-2023);
  - Lei 69/2013, art. 5.º (regimes anteriores);
  - CT art. 349.º (a revogação não impõe compensação legal).
  - https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=3628&tabela=leis
- **Proposta:** a calculadora do plugin está certa para o art. 366.º. O modelo de revogação passa a ter um valor global livremente acordado. Quando usar uma referência, remete para `calc_compensacao_despedimento`, com o cálculo por períodos, e nunca para "14 dias sobre toda a antiguidade". Confirmar que a calculadora não tem nenhum modo de taxa única; se tiver, corrige-se nos dois lados.
- **Confiança:** alta.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/acordo-de-revogacao-do-contrato-de-trabalho.md` — «valor de referência calculado nos termos do art. 366.º CT e dos regimes transitórios»
- `mcp-server/src/tools.ts` — «Sem datas, os 14 dias só valem para a antiguidade desde 1/5/2023»

## D-8 — C-6 Parecer da CITE
- **Fonte:** https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis
  - CT art. 63.º, n.os 1, 3, al. a), 4 e 6 (cópia do processo à CITE depois das diligências probatórias do art. 356.º, n.º 1; 30 dias; parecer desfavorável → só com decisão judicial);
  - CT art. 381.º, al. d) (sem pedido de parecer, o despedimento é ilícito);
  - CT art. 354.º (a suspensão preventiva não refere a CITE).
  - https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis
- **Proposta:** o kit está certo. O processo disciplinar diz que a cópia vai para a CITE depois da instrução e antes da decisão. O plugin deixa de ligar o parecer à suspensão preventiva em todo o conteúdo que o faça (procurar "CITE" nos playbooks e nas referências).
- **Confiança:** alta.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/processo-disciplinar-nota-de-culpa-e-decisao-de-despedimento.md` — «A cópia do processo vai para a CITE depois das diligências probatórias do n.º 1 do artigo 356.º e antes da decisão»

## D-9 — C-7 Início do prazo de reclamação de créditos
- **Fonte:** https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=85&tabela=leis
  - CIRE art. 36.º, n.º 1, al. j);
  - CIRE art. 37.º, n.os 3, 7 e 8 (a dilação de 5 dias após o anúncio é para "os demais credores");
  - CIRE art. 128.º, n.º 1;
  - TRE 10-02-2022, proc. 2171/21.3T8STR-B.E1.
  - Não há acórdão que fixe o termo inicial para os 5 maiores credores citados.
  - https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=85&tabela=leis
- **Proposta:** regra prudente, no modelo e no playbook `cliente-insolvente`: quem foi citado pessoalmente ou por carta registada (art. 37.º, n.º 3) conta o prazo desde essa citação, e em nenhum caso deixa passar o fim do prazo contado do anúncio no Citius mais 5 dias. Vale a data que terminar primeiro. O ponto leva `[VERIFICAR: termo inicial para os credores citados nos termos do art. 37.º, n.º 3, CIRE]`.
- **Confiança:** média quanto ao texto, baixa quanto ao termo inicial.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/reclamacao-de-creditos-na-insolvencia.md` — «faz as duas contas e vale a data que terminar primeiro»
- `skills/juridico-pt/playbooks/cliente-insolvente.md` — «faz as duas contas e vale a data que terminar primeiro»

## D-10 — C-8 Interpelação admonitória e resolução
- **Fonte:** http://www.dgsi.pt/jstj.nsf
  - CC arts. 432.º, 436.º, n.º 1, e 808.º, n.º 1;
  - STJ 14-07-2022, proc. 3220/20.8T8FAR.E1.S1 (o fim do prazo da interpelação admonitória determina o incumprimento definitivo «sem necessidade de expressa declaração resolutiva posterior»);
  - STJ 28-03-2023, proc. 211/21.5T8GMR.G1.S1 (três elementos: intimação, termo perentório, cominação).
  - http://www.dgsi.pt/jstj.nsf
- **Proposta:**
  - Uma carta com os três elementos e uma declaração resolutiva condicional ("findo o prazo sem cumprimento, considera-se o contrato definitivamente incumprido e resolvido, sem necessidade de nova comunicação").
  - Depois do prazo, uma carta curta de confirmação da resolução (art. 436.º, n.º 1), oferecida como variante do mesmo modelo.
- **Confiança:** média (um só acórdão do STJ, sobre um contrato-promessa).
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/interpelacao-e-notificacao-extrajudicial.md` — «considera-se o contrato definitivamente incumprido e resolvido, sem necessidade de nova comunicação»

## D-11 — C-9 Taxa de justiça na oposição à injunção
- **Fonte:** https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=967&tabela=leis
  - RCP art. 7.º, n.º 6: «é devido o pagamento de taxa de justiça pelo autor e pelo réu, no prazo de 10 dias a contar da data da distribuição»;
  - DL 269/98, anexo, art. 20.º;
  - TRP 10-07-2024, proc. 145622/23.0YIPRT.P1, e TRC 27-04-2021, proc. 75109/20.3YIPRT.C1 (depois da distribuição aplicam-se o CPC e o RCP; falta de pagamento → art. 570.º CPC, multa, e não desentranhamento imediato).
  - https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=967&tabela=leis
- **Proposta:** o plugin está certo. A variante `injuncao` do modelo `contestacao` passa a dizer: 10 dias a contar da distribuição (art. 7.º, n.º 6, RCP), juntando o comprovativo; pagar mais cedo não prejudica; a sanção pela falta segue o art. 570.º CPC, segundo a jurisprudência recente, com `[VERIFICAR]` por haver jurisprudência antiga em sentido contrário que não foi lida.
- **Confiança:** alta quanto ao prazo, média quanto à sanção.
- **Decisão:** aprovada pelo utilizador a 2026-10-27, tal como está na Proposta acima.
- **Aplicado em:**
- `skills/juridico-pt/assets/modelos/contestacao.md` — «o Requerido paga-a no prazo de 10 dias a contar da distribuição»

## D-12 — Nota técnica sobre a PGDL (afeta o verificador de citações e o protocolo de pesquisa)
O URL curto `lei_mostra_articulado.php?artigo_id=<nid>A<artigo>&nid=<nid>&tabela=leis` devolve "A query falhou!". Funciona com os parâmetros completos: `&tabela=leis&pagina=1&ficha=1&so_miolo=&nversao=`. O guia `protocolo-pesquisa` e o agente `verificador-citacoes` passam a usar o formato completo.

## D-2 — Regras que saem da comparação
- **Contradições:** nenhum modelo com contradição aberta (C-1 a C-9) é exposto pelas tools. A resolução é lida na fonte oficial e registada aqui como D-3+, com o URL e o trecho literal.
- **Valores:** os que mudam por portaria, aviso, OE ou atualização anual saem para `valores-2026.md`. As grandezas fixadas pela própria norma ficam junto da citação.
- **`oposicao-injuncao`:** não é substituído.
