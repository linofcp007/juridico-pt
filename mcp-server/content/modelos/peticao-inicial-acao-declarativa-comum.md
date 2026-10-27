# Petição Inicial de Ação Declarativa de Condenação (processo comum e ação especial para cumprimento de obrigações pecuniárias)
> slug: peticao-inicial-acao-declarativa-comum | categoria: peticoes-iniciais | entregável: docx | prioridade: 5 | versão: 1.3 | revisto em: 2026-10-27
> Âmbito: nacional

## 1. Quando usar

Use para pedir ao tribunal a condenação do réu no pagamento de quantia certa que ficou por pagar: preço de compra e venda ou de prestação de serviços, faturas de fornecimento entre empresas, prestações vencidas de um contrato, indemnização por facto ilícito já quantificada. A secção 4 traz duas peças, e a IA escolhe uma: a petição articulada do processo comum, com os requisitos do artigo 552.º do Código de Processo Civil, e a petição sucinta da ação especial para cumprimento de obrigações pecuniárias emergentes de contratos (AECOP), do regime anexo ao Decreto-Lei n.º 269/98, de 1 de setembro, reservada a crédito contratual de valor não superior a 15.000,00 € (artigo 1.º do diploma preambular).

Quando NÃO usar: crédito já titulado por sentença, por injunção com força executiva ou por outro título executivo segue para a execução, e este conjunto de modelos não tem requerimento executivo; quem quer o título sem discutir o crédito em tribunal pode preferir o procedimento de injunção do mesmo regime anexo ao Decreto-Lei n.º 269/98, que este modelo não cobre [VERIFICAR: pressupostos e tramitação do procedimento de injunção, não lidos nesta pesquisa]; para esse caminho, o plugin tem o template `requerimento-injuncao`, o playbook `cliente-nao-paga` e a calculadora `calc_custas_injuncao`. Facto ilícito não cabe na AECOP, que é só para crédito emergente de contrato. Para responder a uma petição, use o modelo `contestacao`. Despejo, reclamação de créditos na insolvência, ação laboral e pedido de indemnização civil em processo penal têm regime próprio e ficam fora daqui.

## 2. Perguntas ao utilizador

Primeira ronda, no máximo 12 perguntas, todas numa mensagem. Corte as que o utilizador já respondeu no pedido.

Partes
1. (obrigatória) Autor: nome completo ou denominação social, morada ou sede, NIF ou NIPC. Sendo pessoa singular, o número de identificação civil, a profissão e o local de trabalho, que a lei exige quanto ao Autor (artigo 552.º, n.º 1, alínea a), do Código de Processo Civil): o que faltar sai no preâmbulo com [■ CONFIRMAR]; Autor reformado, desempregado ou estudante diz essa condição, que entra no lugar da profissão. O estado civil é opcional e só entra se o informar. Sendo pessoa coletiva, o tipo de sociedade e, se quiser que conste, a conservatória e o número de matrícula. Quem assinou a procuração e em que qualidade.
2. (obrigatória) Réu: nome ou denominação, morada ou sede onde vai ser citado e NIF ou NIPC; sem o NIF ou NIPC, o texto sai com [■ CONFIRMAR]. Sendo pessoa singular, junte o número de identificação civil, a profissão e o local de trabalho do Réu, se os souber: a lei pede-os "sempre que possível" (artigo 552.º, n.º 1, alínea a), do Código de Processo Civil), e o que não souber fica de fora sem marcador. A morada indicada é o domicílio convencionado no contrato para a citação? Dado que não tem: diga qual, e o texto sai com [■ CONFIRMAR].

Objeto
3. (obrigatória) Factos por ordem cronológica: que contrato ou negócio foi celebrado e em que data; o que o Autor prestou e quando; o que o Réu devia pagar e até quando; o que ficou por pagar. Sendo facto ilícito: o que aconteceu, onde, quando, qual foi a conduta do Réu e que danos causou, com o valor de cada um.
4. (obrigatória) Documentos, um por linha, na ordem em que vão ser juntos e com o facto que cada um prova. A procuração é sempre o documento n.º 1 e o comprovativo da taxa de justiça, o n.º 2. Outros meios de prova que queira requerer (depoimento de parte do Réu, perícia, inspeção) e sobre que factos.

Valores e prazos
5. (obrigatória) Capital em dívida: valor e data de vencimento de cada fatura ou prestação. Pagamentos parciais recebidos, com valor e data, ou "nenhum".
6. (obrigatória) O Réu foi interpelado para pagar antes da ação? Data, forma (carta registada com aviso de receção, correio eletrónico, notificação por advogado) e data em que a recebeu. Não havendo, responda "não". Sem prazo certo de pagamento e sem interpelação, a mora só se constitui com a citação, e a peça diz isso.
7. (opcional, padrão: juros legais civis à taxa fixada em portaria, com o valor em vigor em `references/valores-2026.md` (ler_referencia 'valores-2026'), sem taxa convencionada, calculados até à data da entrada da petição) Taxa de juro escrita no contrato e cláusula que a prevê. Sendo faturas entre empresas, a taxa de cada semestre do período de mora e o aviso que a publica estão em `references/valores-2026.md`; confirme-os ou indique outra fonte oficial que tenha lido. Data até à qual quer os juros vencidos calculados e o valor apurado, ou peça a conta, que a IA faz com `calc_juros_mora` (várias faturas: `calc_juros_lote`) e apresenta para conferir antes de a pôr na peça.

Formalidades
8. (obrigatória, sem padrão: sem resposta vira [■ CONFIRMAR: tribunal e juízo competentes]) Tribunal Judicial da Comarca e juízo (local cível ou central cível, com o número do juízo, se houver) onde a ação dá entrada. Se quiser que a peça justifique a competência territorial, diga o fundamento e o preceito; a IA não escolhe o juízo pelo valor da causa nem afirma a regra de competência de memória.
9. (obrigatória) Mandatário que assina: nome, cédula profissional e domicílio profissional. A procuração forense já está assinada?
10. (obrigatória) Taxa de justiça: já paga? Valor, número e data do documento único de cobrança (DUC). Ou apoio judiciário: modalidade, data do requerimento e se já há decisão, com a data.
11. (obrigatória, sem padrão: testemunha sem indicação sai com [■ CONFIRMAR: a apresentar pela parte ou a notificar pelo tribunal]) Rol de testemunhas: nome completo, morada e, para cada uma, se é apresentada pelo Autor ou se pede a notificação pelo tribunal. Não havendo testemunhas, responda "sem testemunhas".

Opções, correspondem às variantes da secção 3
12. (opcional, padrão: processo comum; crédito de contrato civil; Autor pessoa singular; Réu pessoa singular; mora pelo vencimento; juros legais; sem designação para a citação; taxa de justiça paga) Responda em bloco, uma palavra por item: forma (comum ou AECOP); natureza do crédito (contrato civil, faturas entre empresas ou facto ilícito); Autor (singular ou coletiva); Réu (singular ou coletiva); citação (sem designação, mandatário ou agente de execução); taxa de justiça (paga ou apoio judiciário).

Rondas seguintes, no máximo 4 perguntas cada, só sobre o que a escolha anterior abriu. Diga numa linha porque voltou. Não repita nada já respondido.

Se a forma for a AECOP
13. (obrigatória) Confirme que o crédito emerge de contrato e indique o valor do crédito e o valor da causa (capital mais juros vencidos): o regime vale para obrigações de valor não superior a 15.000,00 € (artigo 1.º do diploma preambular do Decreto-Lei n.º 269/98), e o valor da causa decide o prazo de contestação (regime anexo, artigo 1.º, n.º 2: 15 dias até à alçada da 1.ª instância, 5.000,00 €, fixada no artigo 44.º, n.º 1, da Lei n.º 62/2013; 20 dias acima). A morada de citação do Réu é o domicílio convencionado no contrato? Sim ou não.

Se o crédito for de faturas entre empresas
14. (obrigatória) Para cada fatura: número, data de emissão, data de vencimento e valor. Notas de crédito ou pagamentos por conta, fatura a fatura.
15. (obrigatória, padrão: as taxas e os avisos de `references/valores-2026.md`; semestre sem taxa conhecida sai com [■ VERIFICAR] e o valor dos juros desse período com [■ CONFIRMAR]) Confirme a taxa de juros comerciais de cada semestre do período de mora e o aviso semestral que a publica no Diário da República, ou indique outra fonte oficial que tenha lido. A conta faz-se com `calc_juros_mora`.

Se o crédito vier de facto ilícito
16. (obrigatória) Facto, data, local e conduta do Réu; danos, um a um, com valor e documento; seguradora envolvida ou participação às autoridades, se houve. Base legal que pretende invocar para a responsabilidade, só se for diferente do princípio geral: sem indicação, a peça funda-se no artigo 483.º, n.º 1, do Código Civil (responsabilidade por factos ilícitos); base diferente entra como a escrever, com [■ VERIFICAR], porque não foi lida.

Se o Autor ou o Réu for pessoa coletiva
17. (obrigatória) Denominação completa, tipo de sociedade, sede e NIPC. Para o Autor, quem assinou a procuração e em que qualidade (gerente, administrador, procurador): serve para conferir o documento n.º 1 e não entra no texto da petição.

Se houver apoio judiciário
18. (obrigatória) Modalidade requerida (dispensa de taxa de justiça e demais encargos com o processo, ou outra), data do requerimento e decisão, se já existe (data e sentido). Junte o comprovativo do requerimento ou da decisão.

Se a citação for por agente de execução
19. (obrigatória) Nome, cédula e domicílio profissional do agente de execução designado.

Variáveis que cada pergunta preenche
P1: {{nome_autor}}, {{estado_civil_autor}}, {{nic_autor}}, {{nif_autor}}, {{profissao_autor}}, {{local_trabalho_autor}}, {{morada_autor}}; pessoa coletiva: {{tipo_sociedade_autor}}, {{sede_autor}}, {{nipc_autor}}, {{conservatoria_autor}}, {{matricula_autor}}
P2: {{nome_reu}}, {{nif_reu}}, {{morada_citacao_reu}} e, se conhecidos, {{nic_reu}}, {{profissao_reu}}, {{local_trabalho_reu}}; pessoa coletiva: {{tipo_sociedade_reu}}, {{sede_reu}}, {{nipc_reu}}; AECOP: {{domicilio_convencionado}}
P3: {{atividade_autor}}, {{data_contrato}}, {{descricao_contrato}}, {{prestacao_autor}}, {{contrapartida}}, {{prazo_pagamento}}, {{descricao_cumprimento}}, {{data_cumprimento}}; facto ilícito: {{data_facto}}, {{local_facto}}, {{descricao_facto}}, {{conduta_reu}}, {{descricao_danos}}, {{diligencias_previas}}
P4: {{doc_contrato}}, {{doc_cumprimento}}, {{doc_interpelacao}}, {{doc_calculo}}, {{doc_facto}}, {{docs_faturas}}, {{lista_documentos}}, {{numero_documentos}}, {{numero_documentos_restantes}}, {{outros_meios_prova}}
P5: {{valor_capital}}, {{valor_capital_extenso}}, {{data_vencimento}}, {{pagamentos_parciais}}, {{valor_capital_liquido}}, {{valor_capital_liquido_extenso}}
P6: {{data_interpelacao}}, {{forma_interpelacao}}, {{data_rececao_interpelacao}}
P7: {{taxa_juros}}, {{clausula_juros}}, {{data_inicio_juros}}, {{data_calculo_juros}}, {{valor_juros_vencidos}}, {{valor_juros_vencidos_extenso}}, {{valor_total}}, {{valor_total_extenso}} e, derivados destes, {{valor_causa}}, {{valor_causa_extenso}}
P8: {{juizo}}, {{comarca}}, {{fundamento_competencia}}
P9: {{nome_advogado}}, {{cedula_profissional}}, {{domicilio_profissional}}, {{localidade}}, {{data_por_extenso}}
P10: {{valor_taxa_justica}}, {{valor_taxa_justica_extenso}}, {{numero_duc}}, {{data_duc}}
P11: {{nome_testemunha}}, {{morada_testemunha}}, {{regime_testemunha}} (uma linha por testemunha)
P12: etiquetas das variantes da secção 3
P14: {{tabela_faturas}}, {{soma_faturas}}, {{soma_faturas_extenso}}
P15: {{taxa_juros_comerciais}}, {{fonte_taxa_comercial}}
P16: {{base_legal_indicada}} e as variáveis de facto ilícito de P3
P17: as variáveis de pessoa coletiva de P1 e P2
P18: {{modalidade_apoio}}, {{data_requerimento_apoio}}, {{data_decisao_apoio}}
P19: {{nome_agente_execucao}}, {{cedula_agente}}, {{domicilio_agente}}

## 3. Variantes

Nomes entre parênteses são as etiquetas dos blocos [[INÍCIO VARIANTE: ...]] da secção 4. Escolha uma etiqueta de forma, uma de natureza do crédito, uma para cada parte, uma de mora, uma de juros, uma de citação e uma de taxa de justiça. As etiquetas comum, credito-contratual, autor-singular, reu-singular, mora-vencimento, juros-legais, citacao-geral e taxa-paga são a redação padrão e não têm bloco próprio: escolhê-las é deixar o texto como está. Aplicadas as variantes, renumere os artigos do documento A em sequência contínua, do primeiro ao último, e confira que as remissões ("artigos 2.º a 7.º") apontam para os números certos.

Forma do processo, escolha exatamente uma
1. Processo comum (comum). Documento A da secção 4: petição articulada, com os factos e o direito em artigos numerados, como os juízos esperam, e cada requisito do artigo 552.º, n.º 1, do Código de Processo Civil com lugar fixo no texto.
2. Ação especial para cumprimento de obrigações pecuniárias emergentes de contratos (aecop). Documento B da secção 4: petição sucinta, sem forma articulada (artigo 1.º, n.ºs 1 e 3, do regime anexo ao Decreto-Lei n.º 269/98), com a menção obrigatória sobre o domicílio convencionado para a citação e o parágrafo que justifica a forma pelo teto de 15.000,00 € (artigo 1.º do diploma preambular). Só cabe com crédito emergente de contrato: com a etiqueta facto-ilicito, a IA recusa a combinação numa linha e usa o documento A. O prazo de contestação é de 15 dias se o valor da causa não exceder a alçada do tribunal de 1.ª instância, 5.000,00 € (Lei n.º 62/2013, artigo 44.º, n.º 1), e de 20 dias acima disso (artigo 1.º, n.º 2, do regime anexo): a nota de entrega calcula-o com o {{valor_causa}} e escreve um só prazo. Sem contestação, o juiz confere força executiva à petição (artigo 2.º do regime anexo), e a nota de entrega diz isso.

Natureza do crédito, escolha exatamente uma
3. Crédito de contrato civil (credito-contratual). Redação padrão: contrato, prestação do Autor, quantia não paga, mora e juros; o direito abre com o cumprimento pontual do contrato (artigo 406.º, n.º 1, do Código Civil) e a responsabilidade do devedor que falta culposamente ao cumprimento, com a culpa presumida (artigos 798.º e 799.º, n.º 1).
4. Faturas entre empresas (faturas-empresas). Os factos passam a discriminar as faturas em tabela (número, emissão, vencimento, valor), o capital é a soma das faturas em dívida, e a secção do direito pede juros comerciais em vez dos civis, com o marcador de verificação do regime dos atrasos de pagamento nas transações comerciais (Decreto-Lei n.º 62/2013), que este modelo não leu. A taxa de cada semestre e o aviso que a publica vêm de `references/valores-2026.md` (ler_referencia 'valores-2026') ou do utilizador, e a conta faz-se com `calc_juros_mora`; sem taxa com fonte para algum semestre, o valor dos juros sai [■ CONFIRMAR].
5. Responsabilidade civil por facto ilícito (facto-ilicito). Os factos descrevem o evento, a conduta do Réu e cada dano com o seu valor; a secção do direito troca o incumprimento contratual pela responsabilidade civil por factos ilícitos, fundada no artigo 483.º, n.º 1, do Código Civil (ou na base legal que o utilizador indicar, com marcador, porque não lida), e a mora conta-se desde a citação, nos termos do artigo 805.º, n.º 3, do Código Civil. Saem os artigos da interpelação e dos juros vencidos; o pedido de juros é só de vincendos, desde a citação; o valor da causa é a soma dos danos. Incompatível com aecop.

Partes
6. Autor pessoa singular (autor-singular). Redação padrão: número de identificação civil, NIF, profissão, local de trabalho e morada, exigidos pelo artigo 552.º, n.º 1, alínea a), do Código de Processo Civil, e estado civil, se informado.
7. Autor pessoa coletiva (autor-coletiva). A qualificação passa a tipo de sociedade, sede, NIPC e, se informados, conservatória e matrícula; o artigo 1.º dos factos descreve a atividade.
8. Réu pessoa singular (reu-singular). Redação padrão: NIF e morada de citação; número de identificação civil, profissão e local de trabalho entram quando o utilizador os souber (mesma alínea, "sempre que possível").
9. Réu pessoa coletiva (reu-coletiva). Denominação, tipo de sociedade, sede e NIPC; a citação é na sede.

Constituição em mora, escolha exatamente uma
10. Mora pelo vencimento (mora-vencimento). Redação padrão: obrigação com prazo certo, mora sem interpelação (artigo 805.º, n.º 2, alínea a), do Código Civil), juros desde a data que o utilizador indicar como início. Havendo também interpelação, ela fica nos factos como facto, e a mora continua fundada no vencimento.
11. Mora por interpelação (mora-interpelacao). Não havendo prazo certo, entram os artigos da interpelação nos factos, a secção do direito passa a fundar a mora no artigo 805.º, n.º 1, do Código Civil, e os juros contam-se da interpelação (ou da receção, se o utilizador a informou). Sem prazo certo e sem interpelação, a IA avisa numa linha que a mora só começa com a citação e pede juros só desde então.

Juros, escolha exatamente uma
12. Juros legais (juros-legais). Redação padrão: artigos 806.º, n.º 2, e 559.º, n.º 1, do Código Civil e a taxa anual da Portaria n.º 291/2003, com o valor em vigor em `references/valores-2026.md` (ler_referencia 'valores-2026'), sempre com o marcador de verificação da taxa em vigor.
13. Juros convencionados por escrito (juros-convencionados). Entra o artigo que identifica a cláusula e a taxa acordada, com base nos artigos 806.º, n.º 2, e 559.º, n.º 2, do Código Civil. Taxa combinada só de boca não serve: valem os juros legais, e a IA diz isso ao utilizador numa linha.

Citação, escolha exatamente uma
14. Sem designação (citacao-geral). Redação padrão: a peça nada diz sobre quem promove a citação. Como a alínea g) do n.º 1 do artigo 552.º do Código de Processo Civil manda designar agente de execução ou mandatário, e o regime da citação não foi lido nesta pesquisa, a IA fecha a secção VI com a linha [■ VERIFICAR: se a omissão da designação da alínea g) do n.º 1 do artigo 552.º do Código de Processo Civil é aceite quando a citação fica a cargo da secretaria, ou se o juízo exige menção expressa do agente de execução ou do mandatário responsável pela promoção da citação] e repete o aviso na nota de entrega.
15. Citação promovida pelo mandatário (citacao-mandatario). Entra o parágrafo em que o Autor designa o mandatário subscritor como responsável pela promoção da citação, alínea g) do n.º 1 do artigo 552.º do Código de Processo Civil.
16. Citação por agente de execução (citacao-agente). Entra o parágrafo que designa o agente de execução, com nome, cédula e domicílio profissional, mesma alínea.

Taxa de justiça, escolha exatamente uma
17. Taxa paga (taxa-paga). Redação padrão: comprovativo do pagamento prévio pelo DUC, artigo 552.º, n.º 7, do Código de Processo Civil.
18. Apoio judiciário (apoio-judiciario). O parágrafo da taxa passa a referir a concessão do benefício na modalidade de dispensa, com a decisão junta. Pedido ainda pendente: o parágrafo diz que foi requerido e sai com o marcador de verificação do efeito do pedido pendente (Lei n.º 34/2004, não lida).

Outras, entram quando o caso pede
19. Pagamento parcial (pagamento-parcial). Entra o artigo que regista o pagamento por conta e o capital que ficou em dívida; o pedido e o valor da causa passam a usar o capital líquido.
20. Competência territorial justificada (competencia-justificada). Só quando o utilizador der o fundamento e o preceito: entra o artigo que o afirma, com o marcador de verificação do preceito. Sem esse dado, nada se escreve sobre competência, e o endereçamento basta.

## 4. Texto do documento

[[IA: escolha UM documento: A (processo comum) ou B (AECOP). Nunca junte os dois no mesmo ficheiro. Copie da linha @@PERFIL até à linha @@ASSINATURAS do documento escolhido, aplique as variantes, preencha as variáveis e, no documento A, renumere os artigos em sequência contínua. Género: sendo a parte mulher ou sociedade, escreva "Autora" e "Ré" em todo o texto, "patrocinada" no preâmbulo e "mandatária" quando a advogada for mulher; nunca "Autor/a". Documentos: a procuração é o n.º 1, o comprovativo da taxa de justiça o n.º 2, e os demais seguem a ordem da pergunta 4; cada facto remete ao documento que o prova, dentro do próprio artigo. Nunca escreva "Vara", "Fórum", "OAB" nem qualquer fórmula brasileira.]]

Documento A, processo comum. Para o texto a exportar (`exportar_documento` ou `scripts/gerar_docx.py`), copie o que vem depois desta linha, da linha @@PERFIL até à linha @@ASSINATURAS.

@@PERFIL: juridico
@@TIPO: peticao
@@ENDERECAMENTO: EXMO. SENHOR DOUTOR JUIZ DE DIREITO DO {{juizo}} DO TRIBUNAL JUDICIAL DA COMARCA DE {{comarca}}
@@ESPACO
**{{nome_autor}}**, {{estado_civil_autor}}, titular do número de identificação civil {{nic_autor}}, contribuinte fiscal n.º {{nif_autor}}, {{profissao_autor}}, com local de trabalho em {{local_trabalho_autor}}, residente em {{morada_autor}}, patrocinado pelo mandatário que subscreve, com domicílio profissional em {{domicilio_profissional}}, conforme procuração que junta como documento n.º 1, vem, nos termos do disposto no artigo 552.º do Código de Processo Civil, propor a presente
[[IA: número de identificação civil, profissão e local de trabalho do Autor são obrigatórios pelo artigo 552.º, n.º 1, alínea a), do Código de Processo Civil, tal como o NIF e a morada: cada um que falte sai no seu lugar como [■ CONFIRMAR: número de identificação civil do Autor], [■ CONFIRMAR: profissão do Autor], [■ CONFIRMAR: local de trabalho do Autor], [■ CONFIRMAR: NIF do Autor] ou [■ CONFIRMAR: morada do Autor], nunca apagado em silêncio. Autor reformado, desempregado ou estudante: escreva essa condição no lugar da profissão e apague o trecho "com local de trabalho em {{local_trabalho_autor}},", sem marcador. Só o estado civil, que a alínea não exige, sai do parágrafo sem marcador quando o utilizador não o informa.]]
[[INÍCIO VARIANTE: autor-coletiva]]
[[IA: substitua a qualificação do Autor, do nome até "residente em {{morada_autor}}", pelo que segue; o resto do parágrafo mantém-se.]]
**{{nome_autor}}**, sociedade {{tipo_sociedade_autor}}, com sede em {{sede_autor}}, pessoa coletiva n.º {{nipc_autor}}, matriculada na Conservatória do Registo Comercial de {{conservatoria_autor}} sob o n.º {{matricula_autor}},
[[IA: sem conservatória e número de matrícula, apague o trecho que vai de "matriculada" até ao número de matrícula: sede e NIPC bastam.]]
[[FIM VARIANTE]]
@@CENTRO: AÇÃO DECLARATIVA DE CONDENAÇÃO, SOB A FORMA DE PROCESSO COMUM,
contra **{{nome_reu}}**, titular do número de identificação civil {{nic_reu}}, contribuinte fiscal n.º {{nif_reu}}, {{profissao_reu}}, com local de trabalho em {{local_trabalho_reu}}, residente em {{morada_citacao_reu}}, o que faz nos termos e com os fundamentos seguintes:
[[IA: o NIF do Réu é exigido pelo artigo 552.º, n.º 1, alínea a), do Código de Processo Civil: se o utilizador não o conhece, escreva "contribuinte fiscal n.º [■ CONFIRMAR: NIF do Réu]"; o mesmo vale para a morada de citação. Número de identificação civil, profissão e local de trabalho do Réu são pedidos pela mesma alínea "sempre que possível": entram quando o utilizador os souber, e cada um que ele não souber sai do parágrafo, sem marcador.]]
[[INÍCIO VARIANTE: reu-coletiva]]
[[IA: substitua o parágrafo do Réu pelo que segue.]]
contra **{{nome_reu}}**, sociedade {{tipo_sociedade_reu}}, com sede em {{sede_reu}}, pessoa coletiva n.º {{nipc_reu}}, o que faz nos termos e com os fundamentos seguintes:
[[FIM VARIANTE]]
@@SECAO: I – DOS FACTOS
1.º O Autor {{atividade_autor}}.
[[IA: sendo o Autor sociedade ou empresário em nome individual, este artigo descreve a atividade ("dedica-se, com intuito lucrativo, à atividade de", seguido da atividade); sendo pessoa singular sem atividade relevante para o caso, apague o artigo e renumere.]]
2.º Em {{data_contrato}}, o Autor e o Réu celebraram {{descricao_contrato}} (documento n.º {{doc_contrato}}).
3.º Por esse contrato, o Autor obrigou-se a {{prestacao_autor}}, e o Réu obrigou-se a pagar-lhe {{contrapartida}}, {{prazo_pagamento}}.
4.º O Autor cumpriu a sua prestação: {{descricao_cumprimento}}, em {{data_cumprimento}} (documento n.º {{doc_cumprimento}}).
5.º O Réu recebeu a prestação sem reclamar da quantidade, da qualidade ou do prazo.
[[IA: mantenha o artigo 5.º só se o utilizador confirmar que não houve reclamação; caso contrário, apague-o e renumere.]]
6.º Nos termos acordados, o Réu devia pagar ao Autor a quantia de {{valor_capital}} € ({{valor_capital_extenso}}) até {{data_vencimento}}.
[[INÍCIO VARIANTE: faturas-empresas]]
[[IA: substitua o artigo 6.º pelos dois artigos e pela tabela que seguem; a soma das faturas é o capital do pedido e cada linha da tabela é "número | data de emissão | data de vencimento | valor só em algarismos", separadas por ";;".]]
6.º Pelos fornecimentos referidos, o Autor emitiu ao Réu as faturas seguintes, todas vencidas e não pagas (documentos n.ºs {{docs_faturas}}):
@@TABELA: Fatura | Emissão | Vencimento | Valor (€) ;; {{tabela_faturas}}
7.º As faturas somam {{soma_faturas}} € ({{soma_faturas_extenso}}). O Réu recebeu-as, não as devolveu nem reclamou delas, e não as pagou nas datas de vencimento.
[[FIM VARIANTE]]
7.º O Réu não pagou essa quantia na data do vencimento nem depois.
[[INÍCIO VARIANTE: pagamento-parcial]]
8.º Por conta da dívida, o Réu pagou apenas {{pagamentos_parciais}}, valores que o Autor deduziu ao capital, ficando em dívida {{valor_capital_liquido}} € ({{valor_capital_liquido_extenso}}).
[[IA: se o utilizador quiser imputar o pagamento primeiro aos juros e só depois ao capital, escreva como ele indicar e acrescente ao artigo [■ VERIFICAR: regra de imputação do pagamento, Código Civil, não lida nesta pesquisa]. Daqui em diante, o capital do pedido e do valor da causa é o líquido.]]
[[FIM VARIANTE]]
[[INÍCIO VARIANTE: mora-interpelacao]]
9.º Em {{data_interpelacao}}, o Autor interpelou o Réu para pagar, por {{forma_interpelacao}} (documento n.º {{doc_interpelacao}}).
10.º O Réu recebeu a interpelação em {{data_rececao_interpelacao}} e não pagou nem respondeu.
[[IA: sem data de receção, escreva "O Réu recebeu a interpelação [■ CONFIRMAR: data da receção] e não pagou nem respondeu." Com a etiqueta mora-vencimento e interpelação feita, mantenha estes dois artigos como facto e funde a mora no vencimento, na secção do direito.]]
[[FIM VARIANTE]]
11.º Sobre o capital em dívida venceram-se juros de mora desde {{data_inicio_juros}} até {{data_calculo_juros}}, à taxa de {{taxa_juros}}, no montante de {{valor_juros_vencidos}} € ({{valor_juros_vencidos_extenso}}), conforme cálculo que se junta (documento n.º {{doc_calculo}}).
[[IA: a conta é capital x taxa anual x dias de mora / 365, em juros simples, sem capitalização; escreva-a no documento de cálculo ou num artigo próprio, com as duas datas e o número de dias. Não invente taxa: com "use o padrão", a taxa civil em vigor em `references/valores-2026.md` (ler_referencia 'valores-2026'), e o marcador de verificação da taxa em vigor fica na secção do direito. Faça a conta com `calc_juros_mora` (várias faturas: `calc_juros_lote`) e junte a memória de cálculo como documento. Na variante facto-ilicito, apague este artigo e o 12.º: não há juros vencidos antes da citação.]]
12.º O Réu deve ao Autor, à data de {{data_calculo_juros}}, a quantia total de {{valor_total}} € ({{valor_total_extenso}}), sem prejuízo dos juros que continuarem a vencer-se até integral pagamento.
[[INÍCIO VARIANTE: facto-ilicito]]
[[IA: substitua os artigos 2.º a 12.º pelos que seguem e renumere.]]
2.º Em {{data_facto}}, em {{local_facto}}, {{descricao_facto}}.
3.º {{conduta_reu}} (documento n.º {{doc_facto}}).
[[IA: o artigo 3.º descreve a conduta do Réu em factos concretos (o que fez ou deixou de fazer, que dever violou, que cuidado omitiu), não em conclusões. Um facto por artigo, cada um com o documento que o prova.]]
4.º Em consequência direta dessa conduta, o Autor sofreu os danos seguintes: {{descricao_danos}}.
[[IA: um artigo por dano, com o valor em algarismos e por extenso e o documento que o prova (orçamento, fatura de reparação, recibo, relatório). Some os valores no artigo seguinte.]]
5.º Os danos somam {{valor_capital}} € ({{valor_capital_extenso}}), quantia que o Réu não pagou, apesar de {{diligencias_previas}}.
[[IA: sem diligência prévia (carta, participação, contacto com a seguradora), termine o artigo em "quantia que o Réu não pagou."]]
[[FIM VARIANTE]]
@@SECAO: II – DO DIREITO
13.º O contrato celebrado entre as partes é válido e deve ser pontualmente cumprido, nos termos do artigo 406.º, n.º 1, do Código Civil, pelo que o Réu estava obrigado a pagar ao Autor, no prazo convencionado, o preço acordado. Não o tendo feito, o Réu faltou culposamente ao cumprimento da obrigação e tornou-se responsável pelo prejuízo causado ao Autor, nos termos do artigo 798.º do Código Civil, incumbindo-lhe provar que a falta de cumprimento não procede de culpa sua (artigo 799.º, n.º 1, do mesmo Código).
14.º A obrigação tinha prazo certo, pelo que o Réu se constituiu em mora com o decurso do prazo de pagamento, sem necessidade de interpelação, nos termos do artigo 805.º, n.º 2, alínea a), do Código Civil.
[[INÍCIO VARIANTE: mora-interpelacao]]
[[IA: substitua o artigo 14.º pelo que segue.]]
14.º A obrigação não tinha prazo certo, pelo que o Réu se constituiu em mora com a interpelação de {{data_interpelacao}}, nos termos do artigo 805.º, n.º 1, do Código Civil.
[[FIM VARIANTE]]
15.º Tratando-se de obrigação pecuniária, a indemnização pela mora corresponde aos juros contados desde o dia da constituição em mora, nos termos do artigo 806.º, n.º 1, do Código Civil.
16.º Não tendo as partes estipulado taxa diferente, os juros devidos são os legais, nos termos do artigo 806.º, n.º 2, e do artigo 559.º, n.º 1, ambos do Código Civil, à taxa anual de {{taxa_juros}}, fixada pela Portaria n.º 291/2003, de 8 de abril [■ VERIFICAR: taxa de juros legais civis em vigor à data da petição, sucessoras da Portaria n.º 291/2003].
[[IA: na redação padrão, {{taxa_juros}} é a taxa civil em vigor em `references/valores-2026.md` (ler_referencia 'valores-2026'), em algarismos e por extenso, nunca de memória; o marcador fica sempre. A mesma regra vale para o artigo 15.º da variante facto-ilicito e para o parágrafo do direito do documento B.]]
[[INÍCIO VARIANTE: juros-convencionados]]
[[IA: substitua o artigo 16.º pelo que segue.]]
16.º As partes estipularam por escrito, na cláusula {{clausula_juros}} do contrato, juros de mora à taxa de {{taxa_juros}}, que é a taxa devida nos termos do artigo 806.º, n.º 2, e do artigo 559.º, n.º 2, ambos do Código Civil.
[[FIM VARIANTE]]
[[INÍCIO VARIANTE: faturas-empresas]]
[[IA: substitua o artigo 16.º pelo que segue.]]
16.º Tratando-se de faturas emitidas entre empresas no exercício da sua atividade, os juros de mora devidos são os comerciais, à taxa em vigor em cada semestre do período de mora, de {{taxa_juros_comerciais}}, fixada por {{fonte_taxa_comercial}} [■ VERIFICAR: regime dos atrasos de pagamento nas transações comerciais, Decreto-Lei n.º 62/2013, e taxa de juros comerciais em vigor em cada semestre do período de mora, não lidos nesta pesquisa].
[[IA: {{fonte_taxa_comercial}} é o aviso semestral de cada semestre, tirado de `references/valores-2026.md` ou indicado pelo utilizador na pergunta 15 (número, data e publicação no Diário da República); com vários semestres, enumere as taxas e os avisos, pela ordem, como os devolve `calc_juros_mora`. Sem taxa e sem fonte, escreva "de [■ VERIFICAR: taxa de juros comerciais em vigor em cada semestre do período de mora]" no lugar da taxa e apague o trecho ", fixada por {{fonte_taxa_comercial}}"; o marcador final fica sempre.]]
[[FIM VARIANTE]]
17.º Os juros vencidos até {{data_calculo_juros}} somam {{valor_juros_vencidos}} € ({{valor_juros_vencidos_extenso}}), e continuam a vencer-se juros, à mesma taxa, sobre o capital de {{valor_capital}} € até integral e efetivo pagamento.
[[INÍCIO VARIANTE: facto-ilicito]]
[[IA: substitua os artigos 13.º a 17.º pelos três que seguem. Sem base legal indicada na pergunta 16, ou com o próprio artigo 483.º, n.º 1, indicado, o artigo 13.º sai como está, sem marcador. Com base legal diferente indicada pelo utilizador (por exemplo, responsabilidade pelo risco), substitua o trecho que vai de "do artigo 483.º, n.º 1, do Código Civil" até "resultantes da violação" por {{base_legal_indicada}}, tal como ele a escreveu, seguido de [■ VERIFICAR: base legal indicada pelo mandatário, não lida nesta pesquisa].]]
13.º Com a conduta ilícita e culposa que ficou descrita, o Réu causou ao Autor os danos referidos e está obrigado a indemnizá-los, nos termos do artigo 483.º, n.º 1, do Código Civil, segundo o qual aquele que, com dolo ou mera culpa, violar ilicitamente o direito de outrem fica obrigado a indemnizar o lesado pelos danos resultantes da violação.
14.º Tratando-se de responsabilidade por facto ilícito, o Réu constitui-se em mora desde a citação, nos termos do artigo 805.º, n.º 3, do Código Civil, e desde então são devidos juros de mora sobre o valor da indemnização, nos termos do artigo 806.º, n.ºs 1 e 2, do mesmo Código.
15.º Os juros são os legais, nos termos do artigo 559.º, n.º 1, do Código Civil, à taxa anual de {{taxa_juros}}, fixada pela Portaria n.º 291/2003, de 8 de abril [■ VERIFICAR: taxa de juros legais civis em vigor à data da petição, sucessoras da Portaria n.º 291/2003], e contam-se desde a citação até integral e efetivo pagamento.
[[FIM VARIANTE]]
[[INÍCIO VARIANTE: competencia-justificada]]
18.º Este Tribunal é o territorialmente competente, porque {{fundamento_competencia}}. [■ VERIFICAR: preceito da competência territorial indicado pelo mandatário, Código de Processo Civil, não lido nesta pesquisa]
[[FIM VARIANTE]]
19.º Em cumprimento da alínea c) do n.º 1 do artigo 552.º do Código de Processo Civil, indica-se que a presente ação segue a forma de processo comum.
@@SECAO: III – DO PEDIDO
Nestes termos e nos demais de Direito, que V. Ex.ª doutamente suprirá, deve a presente ação ser julgada procedente, por provada, e, em consequência, ser o Réu condenado a pagar ao Autor:
@@ALINEA: a) a quantia de {{valor_capital}} € ({{valor_capital_extenso}}), a título de capital;
@@ALINEA: b) os juros de mora vencidos desde {{data_inicio_juros}} até {{data_calculo_juros}}, no montante de {{valor_juros_vencidos}} € ({{valor_juros_vencidos_extenso}});
@@ALINEA: c) os juros de mora vincendos, à mesma taxa, sobre o capital em dívida, desde {{data_calculo_juros}} até integral e efetivo pagamento.
Mais requer que o Réu seja condenado nas custas do processo e no pagamento das custas de parte, nos termos do artigo 26.º do Regulamento das Custas Processuais.
[[INÍCIO VARIANTE: facto-ilicito]]
[[IA: substitua as alíneas a) a c) pelas duas que seguem.]]
@@ALINEA: a) a quantia de {{valor_capital}} € ({{valor_capital_extenso}}), a título de indemnização pelos danos descritos;
@@ALINEA: b) os juros de mora, à taxa legal, sobre essa quantia, desde a citação até integral e efetivo pagamento.
[[FIM VARIANTE]]
[[INÍCIO VARIANTE: faturas-empresas]]
[[IA: nas alíneas a) a c), o capital é a soma das faturas e a taxa é a comercial. Se faltar taxa com fonte para algum semestre do período de mora, a alínea b) termina com [■ CONFIRMAR: valor dos juros vencidos à taxa comercial de cada semestre].]]
[[FIM VARIANTE]]
@@SECAO: IV – DO VALOR DA CAUSA
Atribui-se à presente ação o valor de {{valor_causa}} € ({{valor_causa_extenso}}), correspondente à soma do capital em dívida e dos juros vencidos até {{data_calculo_juros}}, nos termos dos artigos 296.º, n.º 1, e 297.º, n.ºs 1 e 2, do Código de Processo Civil.
[[IA: os juros vincendos não entram no valor da causa (artigo 297.º, n.º 2). Na variante facto-ilicito, o valor é a soma dos danos pedidos, sem juros, e o parágrafo diz "correspondente ao valor da indemnização pedida".]]
@@SECAO: V – DA PROVA
Nos termos do artigo 552.º, n.º 6, do Código de Processo Civil, o Autor requer a produção da prova seguinte.
Prova documental: {{numero_documentos}} documentos que junta, a saber:
@@ALINEA: {{lista_documentos}}
[[IA: uma linha @@ALINEA por documento, no formato "Documento n.º 3: contrato de fornecimento de 10 de março de 2026, que prova os artigos 2.º e 3.º;". A procuração é o n.º 1 e o comprovativo da taxa de justiça o n.º 2. O último termina em ponto.]]
Prova testemunhal, rol de testemunhas:
@@ITEM: {{nome_testemunha}}, residente em {{morada_testemunha}}, {{regime_testemunha}}.
[[IA: um @@ITEM por testemunha; o último elemento é "a apresentar pelo Autor" ou "a notificar pelo tribunal", conforme a pergunta 11; sem resposta, [■ CONFIRMAR: a apresentar pela parte ou a notificar pelo tribunal]. Sem testemunhas, apague o rótulo e os itens.]]
Requer ainda {{outros_meios_prova}}.
[[IA: exemplo: "o depoimento de parte do Réu à matéria dos artigos 2.º a 7.º". Sem outros meios, apague a linha.]]
@@SECAO: VI – DA TAXA DE JUSTIÇA
O Autor comprova o pagamento prévio da taxa de justiça devida, no valor de {{valor_taxa_justica}} € ({{valor_taxa_justica_extenso}}), pelo documento único de cobrança n.º {{numero_duc}}, de {{data_duc}}, que junta como documento n.º 2, nos termos do artigo 552.º, n.º 7, do Código de Processo Civil.
[[INÍCIO VARIANTE: apoio-judiciario]]
[[IA: substitua o parágrafo da taxa pelo primeiro que segue, se o apoio já foi concedido, ou pelo segundo, se está pendente; na linha @@SECAO desta secção, troque "DA TAXA DE JUSTIÇA" por "DO APOIO JUDICIÁRIO".]]
Ao Autor foi concedido o benefício de apoio judiciário, na modalidade de {{modalidade_apoio}}, por decisão de {{data_decisao_apoio}}, que junta como documento n.º 2, nos termos do artigo 552.º, n.º 7, do Código de Processo Civil.
O Autor requereu, em {{data_requerimento_apoio}}, o benefício de apoio judiciário na modalidade de {{modalidade_apoio}}, pedido que aguarda decisão, conforme comprovativo que junta como documento n.º 2. [■ VERIFICAR: efeito do pedido de apoio judiciário pendente sobre a exigência de comprovativo da taxa de justiça com a petição, Lei n.º 34/2004, não lida nesta pesquisa]
[[FIM VARIANTE]]
[[INÍCIO VARIANTE: citacao-mandatario]]
[[IA: na linha @@SECAO desta secção, acrescente "E DA CITAÇÃO" ao título; o parágrafo que segue entra no fim da secção.]]
Nos termos da alínea g) do n.º 1 do artigo 552.º do Código de Processo Civil, o Autor designa o mandatário subscritor, com domicílio profissional em {{domicilio_profissional}}, como responsável pela promoção da citação do Réu.
[[FIM VARIANTE]]
[[INÍCIO VARIANTE: citacao-agente]]
[[IA: mesmo ajuste de título da variante anterior.]]
Nos termos da alínea g) do n.º 1 do artigo 552.º do Código de Processo Civil, o Autor designa para efetuar a citação do Réu o agente de execução {{nome_agente_execucao}}, cédula n.º {{cedula_agente}}, com domicílio profissional em {{domicilio_agente}}.
[[FIM VARIANTE]]
[[IA: a linha de marcador que segue fecha a secção VI só com a etiqueta citacao-geral (nem mandatário nem agente de execução designados): a alínea g) do n.º 1 do artigo 552.º manda designar quem promove a citação, e o regime da citação não foi lido nesta pesquisa. Com citacao-mandatario ou citacao-agente, apague a linha: a designação está feita.]]
[■ VERIFICAR: se a omissão da designação da alínea g) do n.º 1 do artigo 552.º do Código de Processo Civil é aceite quando a citação fica a cargo da secretaria, ou se o juízo exige menção expressa do agente de execução ou do mandatário responsável pela promoção da citação]
@@ESPACO
Junta: procuração forense, comprovativo do pagamento da taxa de justiça e {{numero_documentos_restantes}} documentos.
[[IA: {{numero_documentos_restantes}} é o total de documentos menos os dois primeiros. Na variante apoio-judiciario, troque "comprovativo do pagamento da taxa de justiça" por "comprovativo do apoio judiciário".]]
@@DATA: {{localidade}}, {{data_por_extenso}}.
@@ASSINATURAS: {{nome_advogado}} | Advogado, cédula profissional n.º {{cedula_profissional}}

Documento B, ação especial para cumprimento de obrigações pecuniárias emergentes de contratos (AECOP). Para o texto a exportar (`exportar_documento` ou `scripts/gerar_docx.py`), copie o que vem depois desta linha, da linha @@PERFIL até à linha @@ASSINATURAS.

@@PERFIL: juridico
@@TIPO: peticao
@@ENDERECAMENTO: EXMO. SENHOR DOUTOR JUIZ DE DIREITO DO {{juizo}} DO TRIBUNAL JUDICIAL DA COMARCA DE {{comarca}}
@@ESPACO
**{{nome_autor}}**, {{estado_civil_autor}}, titular do número de identificação civil {{nic_autor}}, contribuinte fiscal n.º {{nif_autor}}, {{profissao_autor}}, com local de trabalho em {{local_trabalho_autor}}, residente em {{morada_autor}}, patrocinado pelo mandatário que subscreve, com domicílio profissional em {{domicilio_profissional}}, conforme procuração que junta como documento n.º 1, vem, ao abrigo do regime anexo ao Decreto-Lei n.º 269/98, de 1 de setembro, propor a presente
[[IA: as variantes autor-coletiva e reu-coletiva aplicam-se aqui com o mesmo texto de qualificação do documento A, e valem as mesmas instruções do documento A para a identificação das partes: [■ CONFIRMAR] em cada elemento exigido pelo artigo 552.º, n.º 1, alínea a), do Código de Processo Civil que falte; sem marcador no que é opcional.]]
@@CENTRO: AÇÃO ESPECIAL PARA CUMPRIMENTO DE OBRIGAÇÕES PECUNIÁRIAS EMERGENTES DE CONTRATO
contra **{{nome_reu}}**, titular do número de identificação civil {{nic_reu}}, contribuinte fiscal n.º {{nif_reu}}, {{profissao_reu}}, com local de trabalho em {{local_trabalho_reu}}, residente em {{morada_citacao_reu}}, morada que {{domicilio_convencionado}}, o que faz com os fundamentos seguintes:
[[IA: {{domicilio_convencionado}} é "corresponde ao domicílio convencionado no contrato para a citação" ou "não corresponde a domicílio convencionado no contrato", conforme a pergunta 13. A menção é exigida pelo artigo 1.º, n.º 1, do regime anexo ao Decreto-Lei n.º 269/98 e nunca é omitida.]]
Em {{data_contrato}}, o Autor e o Réu celebraram {{descricao_contrato}} (documento n.º {{doc_contrato}}), pelo qual o Autor se obrigou a {{prestacao_autor}} e o Réu se obrigou a pagar-lhe {{contrapartida}}, {{prazo_pagamento}}.
O Autor cumpriu a sua prestação em {{data_cumprimento}} (documento n.º {{doc_cumprimento}}). O Réu não pagou a quantia de {{valor_capital}} € ({{valor_capital_extenso}}), vencida em {{data_vencimento}}, nem depois de interpelado para o efeito em {{data_interpelacao}}, por {{forma_interpelacao}} (documento n.º {{doc_interpelacao}}).
[[IA: sem interpelação, termine a frase em "vencida em {{data_vencimento}}." Com a variante faturas-empresas, discrimine as faturas em @@TABELA como no documento A e use a soma como capital. Com pagamento parcial, acrescente a frase do capital líquido.]]
O contrato deve ser pontualmente cumprido (artigo 406.º, n.º 1, do Código Civil), e o Réu, ao não pagar, faltou ao cumprimento com culpa que a lei presume e responde pelo prejuízo causado ao Autor (artigos 798.º e 799.º, n.º 1, do mesmo Código). A obrigação tinha prazo certo, pelo que o Réu está em mora desde o decurso desse prazo, sem necessidade de interpelação, nos termos do artigo 805.º, n.º 2, alínea a), do Código Civil, e deve juros de mora desde {{data_inicio_juros}}, nos termos do artigo 806.º, n.ºs 1 e 2, e do artigo 559.º, n.º 1, ambos do Código Civil, à taxa anual de {{taxa_juros}}, fixada pela Portaria n.º 291/2003, de 8 de abril [■ VERIFICAR: taxa de juros legais civis em vigor à data da petição, sucessoras da Portaria n.º 291/2003]. Os juros vencidos até {{data_calculo_juros}} somam {{valor_juros_vencidos}} € ({{valor_juros_vencidos_extenso}}).
[[IA: com a variante mora-interpelacao, a oração que começa por "A obrigação tinha prazo certo" passa a "A obrigação não tinha prazo certo, pelo que o Réu está em mora desde a interpelação de {{data_interpelacao}}, nos termos do artigo 805.º, n.º 1, do Código Civil". Com juros-convencionados ou faturas-empresas, use o texto do artigo 16.º correspondente do documento A, em prosa.]]
Trata-se de obrigação pecuniária emergente de contrato, de valor não superior a 15.000,00 € (quinze mil euros), pelo que a ação segue a forma especial do regime aprovado pelo Decreto-Lei n.º 269/98, de 1 de setembro (artigo 1.º do diploma preambular), sem forma articulada, nos termos do artigo 1.º, n.º 3, do regime anexo.
Nestes termos e nos demais de Direito, requer que o Réu seja citado para contestar, querendo, e que, a final, seja condenado a pagar ao Autor:
@@ALINEA: a) a quantia de {{valor_capital}} € ({{valor_capital_extenso}}), a título de capital;
@@ALINEA: b) os juros de mora vencidos desde {{data_inicio_juros}} até {{data_calculo_juros}}, no montante de {{valor_juros_vencidos}} € ({{valor_juros_vencidos_extenso}});
@@ALINEA: c) os juros de mora vincendos, à mesma taxa, sobre o capital em dívida, desde {{data_calculo_juros}} até integral e efetivo pagamento;
@@ALINEA: d) as custas do processo e as custas de parte, nos termos do artigo 26.º do Regulamento das Custas Processuais.
Valor da causa: {{valor_causa}} € ({{valor_causa_extenso}}), soma do capital e dos juros vencidos até {{data_calculo_juros}}, nos termos dos artigos 296.º, n.º 1, e 297.º, n.ºs 1 e 2, do Código de Processo Civil.
Prova documental: {{numero_documentos}} documentos que junta, a saber:
@@ALINEA: {{lista_documentos}}
Rol de testemunhas:
@@ITEM: {{nome_testemunha}}, residente em {{morada_testemunha}}, {{regime_testemunha}}.
[[IA: mesmas regras do documento A para documentos e testemunhas. Sem testemunhas, apague o rótulo, os itens e o marcador que segue.]]
[■ VERIFICAR: limite do número de testemunhas e momento da sua indicação na ação especial, regime anexo ao Decreto-Lei n.º 269/98, não lido nesta pesquisa]
O Autor comprova o pagamento prévio da taxa de justiça devida, no valor de {{valor_taxa_justica}} € ({{valor_taxa_justica_extenso}}), pelo documento único de cobrança n.º {{numero_duc}}, de {{data_duc}}, que junta como documento n.º 2, nos termos do artigo 552.º, n.º 7, do Código de Processo Civil.
[[IA: variantes apoio-judiciario, citacao-mandatario e citacao-agente: mesmos parágrafos do documento A, sem título de secção. Com citacao-geral, a mesma linha [■ VERIFICAR: ...] do documento A sobre a omissão da designação da alínea g), logo a seguir ao parágrafo da taxa de justiça.]]
@@ESPACO
Junta: procuração forense, comprovativo do pagamento da taxa de justiça e {{numero_documentos_restantes}} documentos.
@@DATA: {{localidade}}, {{data_por_extenso}}.
@@ASSINATURAS: {{nome_advogado}} | Advogado, cédula profissional n.º {{cedula_profissional}}

## 5. Fundamentação permitida

Lista fechada. A IA não cita neste documento nenhuma norma, acórdão ou jurisprudência fora daqui. Pedido de citação externa sai com o marcador [■ VERIFICAR: ...] e aviso na entrega. Os preceitos abaixo foram lidos na fonte oficial em 20/09/2026 (e os itens 14-A, 19-A a 19-E e 29-A em 21/09/2026, na revisão do segundo parecer), nas versões consolidadas da Procuradoria-Geral Distrital de Lisboa e no PDF da portaria, salvo os que trazem a indicação GUIA (conferidos no guia `assets/redacao/seguranca-juridica.md` em 20/09/2026) ou a marca [VERIFICAR] (não lidos: não podem ser citados como certos).

Código de Processo Civil, Lei n.º 41/2013, de 26 de junho, texto consolidado em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1959&tabela=leis
[MENÇÃO] 1. Artigo 552.º, n.º 1, alíneas a) a g), e n.ºs 11 e 12 (texto consolidado lido em 20/09/2026, que, segundo a própria página, contém as alterações do Decreto-Lei n.º 97/2019, de 26 de julho, e do Decreto-Lei n.º 87/2024, de 7 de novembro). Na petição, o autor deve: a) designar o tribunal e respetivo juízo e identificar as partes, "indicando os seus nomes, domicílios ou sedes, número de identificação fiscal ou número de identificação de pessoa coletiva e, obrigatoriamente, no que respeita ao autor, e sempre que possível, relativamente às demais partes, números de identificação civil, profissões e locais de trabalho"; b) indicar o domicílio profissional do mandatário judicial; c) indicar a forma do processo; d) expor os factos essenciais que constituem a causa de pedir e as razões de direito; e) formular o pedido; f) declarar o valor da causa; g) "designar o agente de execução incumbido de efetuar a citação ou o mandatário judicial responsável pela sua promoção". Pelo n.º 11, o agente de execução designado para a alínea g) é inscrito ou registado na comarca ou em comarca limítrofe ou, na sua falta, em outra comarca da área de competência do mesmo tribunal da Relação; pelo n.º 12, a designação fica sem efeito se ele declarar que não a aceita. É a lista de conferência da nota de entrega. Consequências no modelo: número de identificação civil, profissão e local de trabalho do Autor são obrigatórios e saem com [■ CONFIRMAR] quando faltam; os mesmos dados do Réu entram quando o utilizador os souber; o estado civil não consta da alínea e é opcional; sem designação para a citação, a peça sai com o marcador do item 36, porque o regime da citação não foi lido.
2. Artigo 552.º, n.º 6. No final da petição, o autor deve apresentar o rol de testemunhas e requerer outros meios de prova; se o réu contestar, o autor pode alterar o requerimento probatório na réplica ou no prazo de 10 dias a contar da notificação da contestação.
3. Artigo 552.º, n.º 7 (redação com a alteração do Decreto-Lei n.º 87/2024, de 7 de novembro). O autor deve, com a apresentação da petição inicial, comprovar o prévio pagamento da taxa de justiça devida ou a concessão do benefício de apoio judiciário na modalidade de dispensa do mesmo.
4. Artigo 296.º, n.ºs 1 e 2. A toda a causa deve ser atribuído um valor certo, expresso em moeda legal, que representa a utilidade económica imediata do pedido; a esse valor se atende para determinar a competência do tribunal, a forma do processo de execução comum e a relação da causa com a alçada do tribunal.
5. Artigo 297.º, n.º 1. Se pela ação se pretende obter quantia certa em dinheiro, é esse o valor da causa, não sendo atendível impugnação nem acordo em contrário.
6. Artigo 297.º, n.º 2. Cumulando-se vários pedidos, o valor é a soma de todos; quando, como acessório do pedido principal, se pedem juros, rendas e rendimentos já vencidos e os que se vencerem na pendência da causa, atende-se só aos interesses já vencidos. É a razão de o valor da causa não incluir os juros vincendos.
7. Artigo 144.º, n.º 1. Os atos processuais escritos das partes são apresentados a juízo por via eletrónica, valendo como data da prática do ato a da expedição.
8. Artigo 144.º, n.º 10. Quando a peça é apresentada por via eletrónica e o sistema prevê formulários, a informação deve ser indicada no campo respetivo, e, havendo desconformidade entre os formulários e os ficheiros anexos, prevalece a informação dos formulários. O valor da causa, o pedido e a identificação das partes têm de bater entre o Citius e o .docx.
9. Artigo 145.º, n.ºs 1 e 3. Quando a prática de um ato exige o pagamento de taxa de justiça, deve ser comprovado o prévio pagamento ou a concessão de apoio judiciário; segundo a leitura registada na pesquisa, a falta de comprovação, fora da petição inicial, não implica recusa imediata da peça e abre 10 dias para regularizar. Na petição inicial vale a regra do artigo 552.º, n.º 7: não conte com a tolerância.
10. Artigo 40.º, n.º 1. É obrigatória a constituição de advogado nas causas de competência de tribunais com alçada em que seja admissível recurso ordinário, nas causas em que seja sempre admissível recurso independentemente do valor, e nos recursos e causas propostas nos tribunais superiores.
11. Artigo 583.º, n.º 1. A reconvenção deve ser expressamente identificada e deduzida separadamente na contestação, com os fundamentos e o pedido, nos termos das alíneas d) e e) do n.º 1 do artigo 552.º. Não se cita na petição; serve à nota de entrega, para lembrar que a contestação pode trazer pedido reconvencional.
12. Artigo 138.º, n.ºs 1 a 3 (GUIA). O prazo processual é contínuo e suspende-se durante as férias judiciais, salvo prazo igual ou superior a seis meses ou processo urgente; prazo que termina em dia de encerramento dos tribunais transfere-se para o primeiro dia útil seguinte; tolerância de ponto conta como encerramento.
13. Artigo 139.º, n.ºs 3 a 5 (GUIA). O decurso do prazo perentório extingue o direito de praticar o ato; o ato pode ainda ser praticado nos três primeiros dias úteis seguintes, com multa, ou com justo impedimento.
14. Artigo 569.º, n.º 1 (GUIA). O réu contesta no prazo de 30 dias a contar da citação. Vale para o processo comum e entra na nota de entrega em forma condicional.
14-A. Artigo 629.º, n.º 1 (lido em 21/09/2026 em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1959&tabela=leis&artigo_id=1959A0629). "O recurso ordinário só é admissível quando a causa tenha valor superior à alçada do tribunal de que se recorre e a decisão impugnada seja desfavorável ao recorrente em valor superior a metade da alçada desse tribunal, atendendo-se, em caso de fundada dúvida acerca do valor da sucumbência, somente ao valor da causa." Serve à nota de entrega, com o item 29-A: valor da causa acima de 5.000,00 € admite recurso ordinário e torna o patrocínio obrigatório pela alínea a) do n.º 1 do artigo 40.º; não se cita na petição.

Código Civil, Decreto-Lei n.º 47344/66, de 25 de novembro, texto consolidado em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=775&tabela=leis
15. Artigo 805.º, n.ºs 1 e 2. O devedor só fica constituído em mora depois de ter sido judicial ou extrajudicialmente interpelado para cumprir; há, porém, mora independentemente de interpelação se a obrigação tiver prazo certo, se provier de facto ilícito ou se o próprio devedor impedir a interpelação.
16. Artigo 805.º, n.º 3. Se o crédito for ilíquido, não há mora enquanto se não tornar líquido, salvo se a falta de liquidez for imputável ao devedor; tratando-se de responsabilidade por facto ilícito ou pelo risco, o devedor constitui-se em mora desde a citação. Citar só na variante facto-ilicito.
17. Artigo 806.º, n.ºs 1 e 2. Na obrigação pecuniária a indemnização corresponde aos juros a contar do dia da constituição em mora; os juros devidos são os legais, salvo se antes da mora for devido juro mais elevado ou as partes tiverem estipulado juro moratório diferente.
18. Artigo 559.º, n.ºs 1 e 2. Os juros legais e os estipulados sem determinação de taxa são os fixados em portaria conjunta dos Ministros da Justiça e das Finanças; a estipulação de juros a taxa superior deve ser feita por escrito, sob pena de serem apenas devidos os juros legais.
19. Artigo 262.º, n.º 2 (GUIA). A procuração reveste a forma exigida para o negócio que o procurador deva realizar. Serve à conferência da procuração forense junta como documento n.º 1.
19-A. Artigo 406.º, n.º 1 (lido em 21/09/2026; a página de artigo https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=775&tabela=leis&artigo_id=775A0407 mostra-o na redação original de 1966, sem nota de alteração). "O contrato deve ser pontualmente cumprido, e só pode modificar-se ou extinguir-se por mútuo consentimento dos contraentes ou nos casos admitidos na lei." Abre a secção II do documento A na variante credito-contratual e o parágrafo do direito do documento B.
19-B. Artigo 798.º (lido em 21/09/2026 em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=775&tabela=leis&artigo_id=775A0798, redação original, sem nota de alteração). "O devedor que falta culposamente ao cumprimento da obrigação torna-se responsável pelo prejuízo que causa ao credor." É a responsabilidade pelo incumprimento no artigo 13.º do documento A e no documento B.
19-C. Artigo 799.º, n.º 1 (mesma página do item 19-B, sem nota de alteração). "Incumbe ao devedor provar que a falta de cumprimento ou o cumprimento defeituoso da obrigação não procede de culpa sua." Presunção de culpa do devedor no incumprimento contratual: cita-se ao lado do artigo 798.º.
19-D. Artigo 483.º, n.º 1 (lido em 21/09/2026 em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=775&tabela=leis&artigo_id=775A0483, redação original, sem nota de alteração). "Aquele que, com dolo ou mera culpa, violar ilicitamente o direito de outrem ou qualquer disposição legal destinada a proteger interesses alheios fica obrigado a indemnizar o lesado pelos danos resultantes da violação." Princípio geral da responsabilidade por factos ilícitos: é a base do artigo 13.º da variante facto-ilicito quando o utilizador não indica outra. O n.º 2 (responsabilidade independente de culpa só nos casos especificados na lei) foi lido e não se cita: base diferente, indicada pelo utilizador, sai com marcador.
19-E. Artigo 487.º, n.º 1 (mesma página do item 19-D). "É ao lesado que incumbe provar a culpa do autor da lesão, salvo havendo presunção legal de culpa." Não se cita na petição: serve à secção 6, para lembrar que, ao contrário do incumprimento contratual (item 19-C), no facto ilícito a culpa do Réu é o Autor que a prova, e os factos têm de a mostrar.

Decreto-Lei n.º 269/98, de 1 de setembro, e regime anexo (ação especial para cumprimento de obrigações pecuniárias emergentes de contratos), em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=574&tabela=leis
20. Artigo 1.º do diploma preambular. É aprovado o regime dos procedimentos destinados a exigir o cumprimento de obrigações pecuniárias emergentes de contratos de valor não superior a 15.000 €, publicado em anexo. É o teto da variante aecop.
21. Regime anexo, artigo 1.º, n.º 1. Na petição, o autor expõe sucintamente a sua pretensão e os respetivos fundamentos, devendo mencionar se o local indicado para citação do réu é o de domicílio convencionado.
22. Regime anexo, artigo 1.º, n.º 2. O réu é citado para contestar no prazo de 15 dias, se o valor da ação não exceder a alçada do tribunal de 1.ª instância, ou no prazo de 20 dias, nos restantes casos. A alçada é de 5.000,00 € (item 29-A): valor da causa até 5.000,00 €, inclusive, 15 dias; acima, 20 dias.
23. Regime anexo, artigo 1.º, n.º 3. A petição e a contestação não carecem de forma articulada, devendo ser apresentadas em duplicado, nos termos do n.º 1 do artigo 152.º do Código de Processo Civil (remissão do texto de 1998; a apresentação é hoje eletrónica, artigo 144.º, n.º 1).
24. Regime anexo, artigo 2.º. Se o réu, citado pessoalmente, não contestar, o juiz, com valor de decisão condenatória, limita-se a conferir força executiva à petição, a não ser que ocorram, de forma evidente, exceções dilatórias ou que o pedido seja manifestamente improcedente.

Regulamento das Custas Processuais, Decreto-Lei n.º 34/2008, de 26 de fevereiro, texto consolidado em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=967&tabela=leis
25. Artigo 5.º, n.ºs 1 e 2. A taxa de justiça é expressa em unidades de conta processual (UC), atualizada anual e automaticamente de acordo com o indexante dos apoios sociais. O valor da UC de cada ano não está neste modelo: está em `references/valores-2026.md` (ler_referencia 'valores-2026').
26. Artigo 6.º, n.ºs 1 e 2. A taxa de justiça corresponde ao montante devido pelo impulso processual e é fixada em função do valor e da complexidade da causa, pela tabela I-A, salvo disposição especial; nos recursos, pela tabela I-B.
27. Artigo 26.º, n.ºs 2 e 3. As custas de parte são pagas diretamente pela parte vencida à parte credora; a parte vencida é condenada a pagar os valores de taxa de justiça pagos pela vencedora, na proporção do vencimento, os encargos, 50% do somatório das taxas de justiça pagas por ambas, para compensação de honorários, e os honorários de agente de execução. É o fundamento do pedido de custas de parte, sem somar valores.

Portaria n.º 291/2003, de 8 de abril, PDF em https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/diplomas_legislativos/Documents/portaria_291_de_8_de_abril_de_2003_serie_i_b.pdf
28. Ponto 1.º da portaria. Fixa a taxa anual dos juros legais e dos estipulados sem determinação de taxa ou quantitativo; produz efeitos desde 1 de maio de 2003. O valor em vigor está em `references/valores-2026.md` (ler_referencia 'valores-2026') e não se escreve neste modelo. A pesquisa não localizou portaria posterior que a revogue nem confirmou a sua ausência: toda a citação sai com [■ VERIFICAR: taxa de juros legais civis em vigor à data da petição, sucessoras da Portaria n.º 291/2003].

Lei da Organização do Sistema Judiciário, Lei n.º 62/2013, de 26 de agosto, em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1974&tabela=leis
29. Artigos 29.º, n.º 1, e 33.º, n.ºs 1 e 2 (GUIA). Estrutura dos tribunais e divisão do território em 23 comarcas; não fixam competência pelo valor, e o endereçamento sai com o que o utilizador informar.
29-A. Artigo 44.º, n.º 1 (lido em 21/09/2026 em https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1974&tabela=leis&artigo_id=1974A0044). "Em matéria cível, a alçada dos tribunais da Relação é de (euro) 30 000,00 e a dos tribunais de primeira instância é de (euro) 5 000,00." O texto consolidado da página declara alterações até à Lei n.º 37/2026, de 28 de julho, e o artigo não traz nota de alteração. Decide o prazo de contestação da AECOP (item 22) e, com o artigo 629.º, n.º 1, do Código de Processo Civil (item 14-A), a obrigatoriedade do patrocínio. Não se cita na petição; entra na nota de entrega.

Não confirmado nesta pesquisa (não citar como certo; no documento, só com o marcador)
30. [VERIFICAR: Lei n.º 62/2013, artigos 117.º e 130.º, competência dos juízos locais e centrais cíveis pelo valor da causa]
31. [VERIFICAR: Regulamento das Custas Processuais, tabela I-A e valor da UC em vigor]: não lidos neste modelo; a UC e a tabela em vigor estão em `references/valores-2026.md`, e `calc_taxa_justica` faz a conta.
32. [VERIFICAR: Lei n.º 34/2004, apoio judiciário: modalidades, prazo e efeito do pedido pendente sobre a taxa de justiça]
33. [VERIFICAR: Decreto-Lei n.º 62/2013, atrasos de pagamento nas transações comerciais, e aviso semestral da taxa de juros comerciais]: não lidos neste modelo; as taxas e os avisos de cada semestre estão em `references/valores-2026.md`.
34. [VERIFICAR: procedimento de injunção e regras de prova da ação especial, regime anexo ao Decreto-Lei n.º 269/98, artigos não lidos]
35. Jurisprudência: nenhum acórdão foi lido. Argumento que peça acórdão sai sem citação e com [■ VERIFICAR: acórdão a conferir sobre a tese]. Vale em especial para a leitura do teto de 15.000,00 € da AECOP (secção 6, item 14).
36. [VERIFICAR: Código de Processo Civil, regime da citação, não lido nesta pesquisa: se a petição sem a designação da alínea g) do n.º 1 do artigo 552.º é aceite com a citação a cargo da secretaria, ou se o juízo exige menção expressa; na peça, com a etiqueta citacao-geral, o marcador fecha a secção VI]

## 6. Armadilhas e verificações

Prazos, com a regra e a contagem
1. Contestação no processo comum: 30 (trinta) dias a contar da citação, artigo 569.º, n.º 1, do Código de Processo Civil. Prazo processual, contínuo, suspenso nas férias judiciais (artigo 138.º, n.º 1); termo em dia de encerramento dos tribunais passa ao primeiro dia útil seguinte (n.º 2). A IA só faz a conta com a data da citação informada (`calc_prazo`, tipo judicial) e diz sempre se o prazo atravessou férias judiciais; as datas das férias e os feriados saem com [■ VERIFICAR] na entrega.
2. Contestação na AECOP: 15 (quinze) dias se o valor da ação não exceder a alçada do tribunal de 1.ª instância, 20 (vinte) nos restantes casos (regime anexo, artigo 1.º, n.º 2). A alçada da 1.ª instância é de 5.000,00 € (Lei n.º 62/2013, artigo 44.º, n.º 1), e o valor da ação é o valor da causa, capital mais juros vencidos (artigos 296.º, n.º 1, e 297.º, n.ºs 1 e 2, do Código de Processo Civil): até 5.000,00 €, inclusive, 15 dias; de 5.000,01 € para cima, 20 dias. A IA faz a conta com o {{valor_causa}} e a nota de entrega escreve um só prazo, com o valor que o determinou; nunca as duas hipóteses.
3. Alteração do requerimento probatório: na réplica ou em 10 (dez) dias da notificação da contestação (artigo 552.º, n.º 6). Não é motivo para deixar o rol para depois: a petição sai com o rol completo.
4. A regularização da taxa em 10 dias (artigo 145.º, n.º 3) vale fora da petição inicial. Na petição, o comprovativo vai com a peça (artigo 552.º, n.º 7), e sem ele a IA avisa que a peça não está pronta para entrar.
5. Três dias úteis com multa (artigo 139.º, n.º 5): existem, e a IA nunca os trata como prazo normal.
6. Prescrição do crédito: o modelo não a cobre. Há prazos curtos para certos créditos (comerciantes, profissionais liberais, prestações periódicas) que esta pesquisa não leu. Vencimento com mais de um ano à data da petição leva à entrega o marcador [■ VERIFICAR: prazo de prescrição aplicável ao crédito, Código Civil, não lido nesta pesquisa].

Formalidades
7. Os elementos do artigo 552.º, n.º 1, alíneas a) a g): tribunal e juízo; nomes, domicílios ou sedes e NIF ou NIPC das partes; número de identificação civil, profissão e local de trabalho do Autor (obrigatórios) e do Réu (sempre que possível); domicílio profissional do mandatário; forma do processo; factos e razões de direito; pedido; valor da causa; designação de quem promove a citação. Modelo grátis esquece o NIF do réu, a profissão e o local de trabalho do autor, o domicílio profissional do mandatário e a forma do processo. Cada um tem lugar fixo no texto: confira antes de submeter.
8. Citius: o valor da causa, as partes e o pedido lançados nos formulários prevalecem sobre o ficheiro anexo (artigo 144.º, n.º 10). Divergência entre o campo e o .docx é o erro mais barato de evitar e o mais caro de corrigir.
9. Comprovativo da taxa de justiça (DUC) ou da concessão do apoio judiciário vai com a petição (artigo 552.º, n.º 7). O valor da taxa nunca é calculado de cabeça: sai da tabela I-A com a UC do ano (`calc_taxa_justica`, com os valores de `references/valores-2026.md`), conferida pelo mandatário [VERIFICAR: tabela I-A e UC em vigor].
10. Procuração forense junta como documento n.º 1, com a forma que o negócio exige (artigo 262.º, n.º 2, do Código Civil). Patrocínio obrigatório nas causas em que é admissível recurso ordinário (artigo 40.º, n.º 1, alínea a), do Código de Processo Civil), o que, pelo artigo 629.º, n.º 1, do mesmo Código, acontece quando o valor da causa excede a alçada do tribunal de 1.ª instância, 5.000,00 € (Lei n.º 62/2013, artigo 44.º, n.º 1). Até 5.000,00 € o patrocínio não é obrigatório, e a peça sai na mesma assinada pelo mandatário: o modelo não tem versão para a parte pleitear por si.
11. Rol de testemunhas e outros meios de prova no fim da petição (artigo 552.º, n.º 6), com nome e morada de cada testemunha e a indicação de quem a apresenta. "Protesta juntar" e "prova por todos os meios" não são requerimento de prova.
12. Alínea g): sem designação de agente de execução ou de mandatário, a peça nada diz sobre quem promove a citação e fecha a secção VI com a linha [■ VERIFICAR: se a omissão da designação da alínea g) do n.º 1 do artigo 552.º do Código de Processo Civil é aceite quando a citação fica a cargo da secretaria, ou se o juízo exige menção expressa do agente de execução ou do mandatário responsável pela promoção da citação], porque o regime da citação no Código de Processo Civil não foi lido nesta pesquisa. A dúvida nunca fica só neste ficheiro: vai na peça e na nota de entrega.
13. Competência: a IA não escolhe juízo nem comarca. Juízo local cível ou central cível depende do valor da causa, por regra que não foi lida [VERIFICAR: Lei n.º 62/2013, artigos 117.º e 130.º]; o utilizador decide, e o endereçamento sai como ele mandar.

Escolha da forma, o erro que atrasa tudo
14. AECOP só para crédito emergente de contrato de valor não superior a 15.000,00 € (artigo 1.º do diploma preambular). Facto ilícito, enriquecimento sem causa e indemnização extracontratual ficam de fora. Capital até 15.000,00 € e valor da causa (com juros vencidos) acima: a lei não diz por qual dos dois se mede o teto. Na letra, o artigo 1.º do diploma preambular fala em "obrigações pecuniárias emergentes de contratos de valor não superior a (euro) 15 000", o valor da obrigação, e reserva a expressão "valor da acção" para o prazo de contestação (regime anexo, artigo 1.º, n.º 2), o que aponta para o capital; em sentido contrário, o preâmbulo do mesmo diploma liga o regime às ações "que não excedam o valor da alçada dos tribunais de 1.ª instância", e a relação da causa com a alçada mede-se pelo valor da causa (artigo 296.º, n.º 2, do Código de Processo Civil). Nenhum acórdão foi lido. A entrega diz isto em duas linhas e sai com [■ VERIFICAR: jurisprudência sobre se o teto de 15.000,00 € da ação especial se afere pelo capital ou pelo valor da causa com juros vencidos]; a escolha da forma fica com o mandatário.
15. Na AECOP a petição é sucinta e não articulada (regime anexo, artigo 1.º, n.º 3); no processo comum é articulada, por artigos numerados. Trocar o formato é o sinal mais claro de peça montada sem ler o rito. A menção ao domicílio convencionado (artigo 1.º, n.º 1) é obrigatória e cai fora com frequência.
16. Sem contestação na AECOP, o juiz confere força executiva à petição (regime anexo, artigo 2.º): a petição tem de bastar por si, com o pedido líquido e os documentos todos, porque é ela que vai ser executada.
17. Crédito já titulado segue para a execução; propor ação declarativa com título executivo na mão custa taxa de justiça e tempo. Injunção como alternativa: pressupostos não lidos [VERIFICAR: procedimento de injunção, regime anexo ao Decreto-Lei n.º 269/98].

Juros, valor e custas
18. Nunca taxa mensal, taxa anual por hábito nem taxa sem fonte. Sem taxa escrita, juros legais (artigos 806.º, n.º 2, e 559.º, n.º 1, do Código Civil), à taxa da portaria, com o valor de `references/valores-2026.md` e sempre com o marcador da taxa em vigor. Taxa superior à legal só vale por escrito (artigo 559.º, n.º 2); combinada só de boca, valem os juros legais. Limite legal à taxa convencionada: [VERIFICAR: Código Civil, regime da usura, não lido].
19. Termo inicial dos juros: vencimento na obrigação com prazo certo (artigo 805.º, n.º 2, alínea a)); interpelação quando não há prazo (n.º 1); citação no facto ilícito (n.º 3). Trocar um pelo outro muda a conta e dá ao réu uma impugnação fácil.
19-A. Culpa: no incumprimento contratual presume-se (artigo 799.º, n.º 1, do Código Civil) e é o Réu quem tem de a afastar; no facto ilícito é o Autor que a prova (artigo 487.º, n.º 1), salvo presunção legal. Por isso, na variante facto-ilicito, os factos descrevem a conduta concreta do Réu (o que fez, que dever violou, que cuidado omitiu), com documento, e nunca só "agiu com culpa". Base legal diferente do artigo 483.º, n.º 1 (risco, presunções de culpa, acidentes de viação): não lida, sai como o utilizador a indicar e com marcador.
20. Juros comerciais entre empresas: regime não lido neste modelo [VERIFICAR: Decreto-Lei n.º 62/2013 e aviso semestral]. A IA usa a taxa de cada semestre de `references/valores-2026.md`, ou a que o utilizador informar com a fonte, faz a conta com `calc_juros_mora` e deixa em [■ CONFIRMAR] o valor de semestre sem taxa conhecida.
21. Juros de juros: nenhum modelo capitaliza. A conta é simples, sobre o capital, dia a dia. Cláusula penal no contrato: siga o guia `assets/redacao/seguranca-juridica.md` (juros e mora) e não cumule pena e juros pelo mesmo atraso sem marcar.
22. Valor da causa: capital mais juros vencidos até à data do cálculo, sem os vincendos (artigos 296.º, n.º 1, e 297.º, n.ºs 1 e 2). Três números a bater: o capital do artigo dos factos, o da alínea a) do pedido e o do valor da causa (este, com os juros vencidos somados). Divergência entre eles é convite ao aperfeiçoamento.
23. Custas de parte: pedidas nos termos do artigo 26.º do Regulamento das Custas Processuais, sem somar valores. A UC e a tabela mudam todos os anos: os valores em vigor estão em `references/valores-2026.md`.

Proteção de dados e recusa
24. Peça só os dados que o artigo 552.º exige e os que o caso pede. Do Autor, número de identificação civil, profissão e local de trabalho são obrigatórios (alínea a) do n.º 1); o estado civil é opcional. Do Réu, nome, domicílio ou sede e NIF ou NIPC e, só quando o utilizador os souber, número de identificação civil, profissão e local de trabalho, que a mesma alínea pede "sempre que possível": a IA não os procura nem insiste. Nada de dados de saúde, contactos pessoais além da morada de citação ou dados de terceiros que não são parte.
25. Pedido de petição com facto que o utilizador diz ser falso, com documento datado para trás ou com dívida já paga: recusa numa frase e oferta do documento lícito mais próximo.

## 7. Nota de entrega

Confira antes de apresentar em juízo:
1. Requisitos do artigo 552.º, n.º 1, do Código de Processo Civil, um a um: tribunal e juízo no endereçamento; nome, domicílio ou sede e NIF ou NIPC das duas partes no preâmbulo, mais número de identificação civil, profissão e local de trabalho do Autor (obrigatórios pela alínea a)) e do Réu, quando conhecidos; domicílio profissional do mandatário no preâmbulo; forma do processo no título e no último artigo do direito; factos e razões de direito nas secções I e II; pedido na secção III; valor da causa na secção IV; designação para a citação na secção VI, quando escolhida. Sem designação, a alínea g) não foi cumprida na peça: o marcador [■ VERIFICAR] no fim da secção VI lembra que não se conferiu se o juízo aceita a omissão quando a citação fica a cargo da secretaria. Lance no Citius os mesmos nomes e valores: em caso de divergência, prevalecem os formulários (artigo 144.º, n.º 10).
2. Trechos a amarelo: cada [■ CONFIRMAR: ...] é dado que faltou e cada [■ VERIFICAR: ...] é afirmação a conferir na fonte antes de submeter. Fica sempre um: a taxa de juros legais em vigor, sucessora da Portaria n.º 291/2003. Na variante facto-ilicito com base legal indicada pelo mandatário diferente do artigo 483.º, n.º 1, do Código Civil, fica também o marcador dessa base, que o modelo não leu.
3. Juros: termo inicial em [■ CONFIRMAR: data de início dos juros] e taxa de [■ CONFIRMAR: taxa aplicada], conta simples sobre o capital, sem capitalização. Confira que os juros vencidos do artigo dos factos, da alínea b) do pedido e do valor da causa são o mesmo número, e que os vincendos ficaram fora do valor da causa.
4. Prazo de contestação, em forma condicional: processo comum, 30 (trinta) dias a contar da citação (artigo 569.º, n.º 1, do Código de Processo Civil), contínuos e suspensos nas férias judiciais (artigo 138.º, n.º 1); AECOP, com o valor da causa de {{valor_causa}} €: 15 (quinze) dias, por não exceder a alçada do tribunal de 1.ª instância, de 5.000,00 € (regime anexo, artigo 1.º, n.º 2; Lei n.º 62/2013, artigo 44.º, n.º 1), ou 20 (vinte) dias, por a exceder; a IA escreve só a hipótese que resulta do valor da causa, com o valor que usou, nunca as duas. Sem contestação na AECOP, a petição ganha força executiva (regime anexo, artigo 2.º). A conta da data faz-se com `calc_prazo` (tipo judicial) quando houver data de citação. Datas das férias judiciais e feriados do período: [■ VERIFICAR: férias judiciais e feriados no período da contagem]. A contestação pode trazer reconvenção (artigo 583.º, n.º 1), e a alteração do requerimento probatório cabe na réplica ou em 10 (dez) dias da notificação (artigo 552.º, n.º 6).
5. Taxa de justiça e documentos: DUC pago antes da entrada e junto como documento n.º 2 (artigo 552.º, n.º 7), com o valor conferido na tabela I-A e na UC do ano (`calc_taxa_justica`; `references/valores-2026.md`); procuração assinada como documento n.º 1; cada documento numerado bate com a remissão feita no artigo do facto que prova; testemunhas com nome, morada e a indicação de quem as apresenta.
Este documento precisa da sua revisão antes de ser assinado, enviado ou apresentado em juízo.

## 8. Trecho de referência de tom

Dados fictícios, usados apenas como exemplo de registo. Não reaproveite nomes, valores nem datas.

@@SECAO: I – DOS FACTOS
1.º A Autora dedica-se, com intuito lucrativo, ao fabrico e montagem de serralharia civil.
2.º Em 10 de março de 2026, a Autora e o Réu celebraram contrato de fornecimento e montagem de dois portões de correr em ferro para a moradia do Réu, na Rua das Oliveiras, n.º 12, em Leiria (documento n.º 3).
3.º Por esse contrato, a Autora obrigou-se a fabricar e montar os portões até ao fim de abril, e o Réu obrigou-se a pagar-lhe 6.800,00 € (seis mil e oitocentos euros), metade na adjudicação e metade na conclusão da montagem.
4.º A montagem ficou concluída em 28 de abril de 2026. Nesse dia, o Réu assinou o auto de receção dos trabalhos, sem reserva (documento n.º 4).
5.º A segunda prestação, de 3.400,00 € (três mil e quatrocentos euros), venceu-se nessa data e não foi paga.
@@SECAO: II – DO DIREITO
6.º A obrigação tinha prazo certo, pelo que o Réu se constituiu em mora com o decurso do prazo de pagamento, sem necessidade de interpelação, nos termos do artigo 805.º, n.º 2, alínea a), do Código Civil.
7.º Tratando-se de obrigação pecuniária, a indemnização pela mora corresponde aos juros contados desde o dia da constituição em mora, nos termos do artigo 806.º, n.º 1, do Código Civil.
@@SECAO: III – DO PEDIDO
Nestes termos e nos demais de Direito, que V. Ex.ª doutamente suprirá, deve a presente ação ser julgada procedente, por provada, e, em consequência, ser o Réu condenado a pagar à Autora:
@@ALINEA: a) a quantia de 3.400,00 € (três mil e quatrocentos euros), a título de capital;
@@ALINEA: b) os juros de mora vencidos desde 28 de abril de 2026 até 20 de setembro de 2026, no montante de 54,03 € (cinquenta e quatro euros e três cêntimos);
@@ALINEA: c) os juros de mora vincendos, à mesma taxa, sobre o capital em dívida, desde 20 de setembro de 2026 até integral e efetivo pagamento.
