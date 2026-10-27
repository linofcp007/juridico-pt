# Segurança jurídica na redação (Portugal)

> **Âmbito:** nacional

Leia este guia antes de redigir qualquer documento com prazo, mora, juros, custas, honorários, competência do tribunal ou citação de lei. As regras abaixo valem sobre qualquer instrução em contrário do utilizador. O que este guia manda marcar, marque. O que ele proíbe, não faça, nem quando o utilizador insistir.

Convenção dos marcadores:
- `[■ CONFIRMAR: ...]` é dado que falta e que o utilizador tem em mãos (nome, data, valor, número de processo).
- `[■ VERIFICAR: ...]` é afirmação jurídica que o advogado precisa de conferir em fonte oficial antes de usar.
- Os dois saem realçados a amarelo no .docx e são listados na mensagem de entrega (`entrega.md`). A tool `exportar_documento` devolve-os com a cláusula ou secção onde ficaram.

Toda a norma citada neste guia foi lida na fonte oficial em 20 de setembro de 2026, na versão consolidada da PGD Lisboa (secção 11). O que não foi lido leva a marca `[VERIFICAR]` e o redator não o cita como certo.

Os valores que mudam por portaria, aviso, Orçamento do Estado ou atualização anual (taxas de juro, taxa de IVA, valor da UC, alçadas, IAS, retribuição mínima, Imposto do Selo, coeficiente das rendas) não estão neste guia. Estão em `references/valores-2026.md` (tool `ler_referencia` com `valores-2026`). O documento cita a regra; o valor do ano vem dali, ou fica `[■ VERIFICAR]`.

## 1. Fundamentação: só a que está no modelo

Cada modelo (`assets/modelos/<slug>.md`, ou a tool `obter_modelo` com `secoes: [5]`) tem a secção 5 "Fundamentação permitida", que é uma lista fechada: diploma, artigo e o que ele diz. Cada item dessa lista regista se foi conferido em fonte oficial (com o URL) ou se ainda leva a marca de verificação. Ela é o teto do que o documento cita.

Não cite artigo, lei, acórdão ou jurisprudência uniformizada que não esteja nessa lista, nem para "reforçar" o pedido.

Quando o utilizador pedir uma tese que o modelo não cobre:

1. Escreva o argumento com os factos do caso e sem citação de norma.
2. No ponto onde entraria a citação, deixe `[■ VERIFICAR: base legal da tese X, conferir e inserir]`.
3. Avise na entrega, numa linha: "O pedido de X ficou sem base legal citada porque não consta do modelo. Confira e insira o preceito antes de apresentar em juízo."

Não invente número de artigo por semelhança. Errar o número em peça assinada é pior do que não citar. Não converta de memória a numeração do Código de Processo Civil de 1961 para a do Código de 2013: a versão consolidada indica a correspondência artigo a artigo, e é lá que se confere.

Documento sem modelo: parte do modelo ou template mais próximo e a fundamentação segue o `protocolo-pesquisa.md`.

## 2. Jurisprudência: só transcrita, nunca inventada

Acórdão de uniformização de jurisprudência, acórdão do Supremo Tribunal de Justiça, das Relações ou do Tribunal Constitucional só entra no documento com o sumário ou o segmento transcrito, palavra por palavra, como está na secção 5 do modelo, com tribunal, data e número de processo. Nunca escreva o sumário de memória e nunca parafraseie ("o STJ entende que").

Não crie sumário, número de processo, relator, data nem tribunal. Nem um deles. Sem acórdão confirmado no modelo, escreva o argumento sem citação e marque `[■ VERIFICAR: acórdão a conferir sobre <tese>]`.

## 3. Prazos: o que o redator nunca faz

O redator nunca afirma um prazo sem três coisas ao mesmo tempo: o preceito que o fixa (na secção 5 do modelo, no índice `references/normas-conferidas.md` ou lido na fonte oficial nesta conversa), a forma de contagem e a data de referência informada pelo utilizador (data da notificação, da citação, da assinatura, da interpelação). Faltando qualquer uma, a conta não é feita: fica `[■ CONFIRMAR: data da notificação]` no documento e a regra do prazo vai na nota de entrega, em forma condicional ("se a notificação ocorreu em 10/09/2026, o prazo de 30 dias termina em 10/10/2026, sem férias judiciais pelo meio").

Com a data de referência, a conta pode ser feita com a tool `calc_prazo` (tipo `judicial` nos processos em tribunal). A nota de entrega mostra a data de referência usada e a conta.

Regras lidas na fonte (Código de Processo Civil, Lei n.º 41/2013, de 26 de junho, versão consolidada):

1. O prazo processual, legal ou fixado pelo juiz, é contínuo e suspende-se durante as férias judiciais, salvo se a sua duração for igual ou superior a seis meses ou se tratar de processo que a lei considere urgente (artigo 138.º, n.º 1). A conta diz sempre se atravessou férias judiciais e se as considerou suspensas.
2. Prazo que termina em dia em que os tribunais estão encerrados transfere-se para o primeiro dia útil seguinte (artigo 138.º, n.º 2); tolerância de ponto conta como encerramento (n.º 3).
3. O decurso do prazo perentório extingue o direito de praticar o ato (artigo 139.º, n.º 3). O ato ainda pode ser praticado nos três primeiros dias úteis seguintes, com multa (artigo 139.º, n.º 5), ou com justo impedimento (artigo 139.º, n.º 4). O redator nunca aconselha a usar os três dias com multa como prazo normal: a nota de entrega menciona a existência da faculdade, e só.
4. Contestação: 30 dias a contar da citação (artigo 569.º, n.º 1). Recurso: 30 dias a contar da notificação da decisão, reduzidos a 15 dias nos processos urgentes e nos casos previstos no n.º 2 do artigo 644.º e no artigo 677.º (artigo 638.º, n.º 1). Outros prazos só com a norma lida.
5. As datas das férias judiciais de cada ano, os feriados e as suspensões de prazo por lei especial não são sabidos de memória: `[■ VERIFICAR: férias judiciais e feriados no período da contagem]` na nota de entrega, sempre.

Prazo substantivo (caducidade, prescrição, denúncia de contrato, pré-aviso) segue a lei do contrato ou do Código Civil que o modelo cita; sem preceito na secção 5, sai `[■ VERIFICAR]`, nunca "o prazo geral".

## 4. Competência do tribunal: o redator não escolhe

O redator nunca decide sozinho em que tribunal ou juízo a ação entra. O endereçamento sai com os dados que o utilizador deu; faltando, `[■ CONFIRMAR: tribunal e juízo competentes]`.

Lido na fonte (Lei da Organização do Sistema Judiciário, Lei n.º 62/2013, de 26 de agosto): além do Tribunal Constitucional, existem o Supremo Tribunal de Justiça e os tribunais judiciais de primeira e de segunda instância, o Supremo Tribunal Administrativo e os demais tribunais administrativos e fiscais, e o Tribunal de Contas (artigo 29.º, n.º 1); os tribunais judiciais de primeira instância incluem os tribunais de competência territorial alargada e os tribunais de comarca, e o território divide-se em 23 comarcas (artigo 33.º, n.os 1 e 2).

Regras de redação:

1. Endereçamento de peça judicial no formato "Exmo. Senhor Juiz de Direito do [Juízo] do Tribunal Judicial da Comarca de [comarca]" ou o que o utilizador indicar. Nunca "Vara", "Fórum", "Comarca de X/UF" nem qualquer fórmula brasileira.
2. Juízo (local cível, central cível, de família e menores, do trabalho, de comércio, de execução, local criminal, central criminal) e competência em razão do valor: `[■ CONFIRMAR]` com o utilizador; o redator não deduz o juízo pelo valor da causa.
3. Patrocínio judiciário: a constituição de advogado é obrigatória nas causas de competência de tribunais com alçada em que seja admissível recurso ordinário, nas causas em que seja sempre admissível recurso independentemente do valor, e nos recursos e causas propostas nos tribunais superiores (Código de Processo Civil, artigo 40.º, n.º 1). Os valores de alçada estão em `references/valores-2026.md` (secção "Custas Judiciais"); a Lei n.º 62/2013, artigo 44.º, não foi lida para este guia: `[VERIFICAR: alçadas dos tribunais]`.
4. Petição inicial: o redator confere que estão presentes os requisitos do artigo 552.º, n.º 1, do Código de Processo Civil (tribunal e juízo; identificação das partes com nome, domicílio ou sede e NIF ou NIPC; domicílio profissional do mandatário; forma do processo; factos da causa de pedir e razões de direito; pedido; valor da causa; agente de execução ou mandatário responsável pela citação). O que faltar sai `[■ CONFIRMAR]`, nunca preenchido por invenção.
5. Tribunal arbitral, julgado de paz, tribunal administrativo, tribunal do trabalho e Tribunal de Contas têm regras próprias que este guia não cobre: o modelo diz o que vale; sem modelo, `[■ VERIFICAR]`.

## 5. Custas, taxa de justiça e apoio judiciário: nunca fixadas de cabeça

O redator nunca escreve um valor de taxa de justiça, de custas de parte ou de multa processual calculado de memória. Onde o documento precisar do valor, fica `[■ CONFIRMAR: taxa de justiça paga, com o comprovativo (DUC)]` ou `[■ VERIFICAR: valor conforme a tabela do Regulamento das Custas Processuais]`. Uma estimativa para a nota de entrega, nunca para o documento, pode sair da tool `calc_taxa_justica`, e é apresentada como estimativa.

Lido na fonte (Regulamento das Custas Processuais, Decreto-Lei n.º 34/2008, de 26 de fevereiro, versão consolidada):

1. A taxa de justiça corresponde ao montante devido pelo impulso processual e é fixada em função do valor e da complexidade da causa, pela tabela I-A, salvo disposição especial; nos recursos, sempre pela tabela I-B (artigo 6.º, n.os 1 e 2). O valor da unidade de conta (UC) do ano está em `references/valores-2026.md` (secção "Custas Judiciais"); as tabelas em vigor conferem-se na fonte: `[VERIFICAR: tabela I em vigor]`.
2. As custas de parte são pagas diretamente pela parte vencida à parte credora, e incluem a taxa de justiça paga pela parte vencedora na proporção do vencimento, os encargos e 50 % do somatório das taxas de justiça pagas por ambas as partes a título de compensação de honorários (artigo 26.º, n.os 2 e 3, alíneas a) a c)). O documento diz "custas de parte nos termos do artigo 26.º do Regulamento das Custas Processuais", sem somar valores por conta própria.
3. Apoio judiciário e dispensa de taxa de justiça: regime da Lei n.º 34/2004 `[VERIFICAR: não lido; conferir antes de citar]`. O redator não afirma que o cliente tem direito a apoio judiciário; pergunta se já foi requerido ou deferido e deixa `[■ CONFIRMAR]`.

## 6. Honorários e Ordem dos Advogados: o que o contrato nunca traz

Lido na fonte (Estatuto da Ordem dos Advogados, Lei n.º 145/2015, de 9 de setembro, versão consolidada com a Lei n.º 6/2024, de 19 de janeiro):

1. Os honorários devem corresponder a uma compensação económica adequada pelos serviços efetivamente prestados, saldada em dinheiro, podendo assumir a forma de retribuição fixa (artigo 105.º, n.º 1). Na falta de convenção prévia reduzida a escrito, o advogado apresenta conta de honorários com discriminação dos serviços (n.º 2). Critérios de fixação: importância dos serviços, dificuldade e urgência do assunto, grau de criatividade intelectual, resultado obtido, tempo despendido, responsabilidades assumidas e usos profissionais (n.º 3). O modelo de contrato de honorários é sempre escrito e discrimina os serviços.
2. Pacto de quota litis é proibido (artigo 106.º, n.º 1): acordo, antes da conclusão definitiva da questão, pelo qual o direito a honorários fique exclusivamente dependente do resultado e o cliente se obrigue a pagar parte do resultado (n.º 2). Não é quota litis a fixação prévia dos honorários, ainda que em percentagem, em função do valor do assunto, nem a majoração em função do resultado acrescida a honorários calculados por outros critérios (n.º 3). O redator nunca redige cláusula em que os honorários dependam só do resultado, nem quando o utilizador pedir "20 % do que o cliente receber e mais nada": oferece a majoração por resultado sobre honorários fixos e avisa na entrega, citando o artigo 106.º.
3. É proibido repartir honorários com quem não seja advogado, advogado estagiário ou solicitador com quem colabore, salvo sociedade multidisciplinar (artigo 107.º). Nenhum modelo prevê comissão de angariação.
4. O advogado tem o dever de informar o cliente sobre os critérios de fixação dos honorários e, sempre que possível, o seu montante total aproximado, e sobre a possibilidade de apoio judiciário (artigo 100.º, n.º 1, alínea a)). O contrato de honorários traz essa informação; a nota de entrega lembra-a.
5. Valores e documentos do cliente: o advogado presta contas de todos os valores recebidos e apresenta nota de honorários e despesas logo que solicitado; cessada a representação, restitui valores, objetos e documentos (artigo 101.º, n.os 1 e 2). O direito de retenção do n.º 3 não é escrito no contrato como cláusula: o modelo diz se e como o menciona.
6. Segredo profissional (artigo 92.º, n.º 1): o advogado guarda segredo sobre todos os factos conhecidos no exercício das funções. Nenhum documento do redator inclui facto de outro cliente como exemplo.
7. Identificação do advogado: nome, cédula profissional, domicílio profissional. Nunca "OAB/UF". Os dados do advogado responsável podem vir do perfil (`advogado_nome`, `advogado_cedula`, `advogado_domicilio`, `advogado_email`, `advogado_nif`); sem eles, `[■ CONFIRMAR]`.
8. O que não foi lido e não pode ser citado como certo: laudo do conselho regional sobre honorários, regulamento de publicidade, regras do estágio, provisão para despesas, seguro de responsabilidade civil. Tudo `[VERIFICAR]`.
9. IVA: os honorários de advogado são prestação de serviços sujeita a IVA. A taxa normal consta do Código do IVA, artigo 18.º, n.º 1, alínea c) (lido no portal da Autoridade Tributária em 20 de setembro de 2026); a taxa do ano está em `references/valores-2026.md` (secção "IVA"). O contrato diz sempre se o valor dos honorários inclui ou não o IVA e remete para a taxa legal em vigor, sem escrever a percentagem. Regiões Autónomas, isenções e regime de pequenas empresas: `[VERIFICAR]`.

## 7. Juros e mora: nunca uma taxa por hábito

Lido na fonte (Código Civil, Decreto-Lei n.º 47344/66, de 25 de novembro, versão consolidada):

1. O devedor só fica constituído em mora depois de interpelado, judicial ou extrajudicialmente, para cumprir; há mora sem interpelação se a obrigação tiver prazo certo, provier de facto ilícito ou se o devedor impedir a interpelação (artigo 805.º, n.os 1 e 2).
2. Na obrigação pecuniária a indemnização corresponde aos juros a contar da constituição em mora; os juros devidos são os legais, salvo juro mais elevado devido antes da mora ou juro moratório diferente estipulado (artigo 806.º, n.os 1 e 2).
3. Os juros legais e os estipulados sem taxa são os fixados em portaria conjunta dos Ministros da Justiça e das Finanças; juro superior ao legal só por escrito, sob pena de valerem os juros legais (artigo 559.º, n.os 1 e 2).
4. As taxas em vigor (civil e comercial) não estão neste guia: estão em `references/valores-2026.md` (secção "Juros de Mora"), e a conta faz-se com a tool `calc_juros_mora` (várias faturas: `calc_juros_lote`). A fonte é a Portaria n.º 291/2003 e o aviso semestral da taxa de juros comerciais: `[VERIFICAR]` quando o documento a citar.
5. O redator nunca escreve uma percentagem mensal ou anual por hábito (por exemplo, "1 % ao mês" ou "12 % ao ano"), nem "juros de mora à taxa de X %" sem estipulação escrita: a cláusula diz "juros de mora à taxa legal" ou a taxa que o utilizador informar por escrito. Se o utilizador insistir, entra a taxa legal e a nota de entrega explica o artigo 559.º, n.º 2.
6. Cláusula penal: as partes podem fixar por acordo o montante da indemnização (artigo 810.º, n.º 1); o credor não pode exigir cumulativamente o cumprimento e a cláusula penal, salvo se esta for para o atraso (artigo 811.º, n.º 1). Cláusula penal e juros de mora pelo mesmo atraso na mesma cláusula: `[■ VERIFICAR: cumulação de cláusula penal com juros de mora]` na entrega.
7. Anatocismo: juros de juros só por convenção posterior ao vencimento ou notificação judicial, e só sobre juros de pelo menos um ano (artigo 560.º, n.os 1 e 2). Nenhum modelo capitaliza juros.
8. Atualização de rendas, correção monetária e coeficientes: nunca de memória. O coeficiente do ano está em `references/valores-2026.md` (secção "Arrendamento"); no documento entra o coeficiente que o utilizador confirmar ou `[■ CONFIRMAR: coeficiente publicado]`.

## 8. Forma, assinatura e reconhecimento

1. A procuração reveste a forma exigida para o negócio que o procurador deva realizar (Código Civil, artigo 262.º, n.º 2). A procuração forense segue o modelo; poderes especiais (confessar, desistir, transigir) só com instrução do utilizador.
2. Contrato de prestação de serviço e mandato: noções dos artigos 1154.º e 1157.º do Código Civil; as disposições do mandato aplicam-se às modalidades de prestação de serviço que a lei não regule (artigo 1156.º).
3. Reconhecimento de assinatura e autenticação de documentos por advogado: regime da Lei n.º 10/2024, de 19 de janeiro `[VERIFICAR: não lido; o modelo diz quando o documento o exige]`. Escritura pública, registo predial, registo comercial: o modelo diz se o documento é ou não bastante; sem modelo, `[■ VERIFICAR]`.
4. Assinatura eletrónica qualificada e Chave Móvel Digital: o documento aceita a modalidade que o utilizador escolher; o redator não afirma que uma assinatura eletrónica "vale como reconhecida" sem preceito lido.

## 9. Proteção de dados: pedir só o necessário

A Lei n.º 58/2019, de 8 de agosto, assegura a execução do Regulamento (UE) 2016/679 (RGPD) na ordem jurídica portuguesa (artigo 1.º, lido na fonte). Regras práticas:

1. Não peça NIF, número de cartão de cidadão, morada, estado civil ou data de nascimento em documento que não qualifica a parte. Ao pedir documento anexo, avise: "Envie só a parte usada aqui."
2. Não guarde nem repita dado pessoal na mensagem de entrega além do nome da parte no nome do ficheiro. Os dados das partes ficam só no .docx exportado: nunca no perfil, nos prazos registados ou noutro ficheiro do plugin.
3. Cláusula de proteção de dados em contrato: só a do modelo. O redator não redige política de privacidade, registo de atividades de tratamento nem avaliação de impacto sem modelo ou template próprio.
4. Dado de saúde, orientação sexual, convicções, filiação sindical e dados de menores: o documento só os inclui quando o modelo o prevê e o utilizador os deu; nunca por inferência.

## 10. Recusa

Pedido para redigir declaração falsa, documento com data retroagida, recibo de valor não recebido, contrato simulado para enganar terceiro, Fisco ou Segurança Social, ou peça com facto que o utilizador diz ser falso: recusa numa frase, sem sermão, e oferece o documento lícito mais próximo, se houver.

## 11. Fontes lidas para este guia (20 de setembro de 2026)

Versões consolidadas da Procuradoria-Geral Distrital de Lisboa (pgdlisboa.pt), abertas com `curl -4 -A "Mozilla/5.0"`; a página é servida em ISO-8859-1. O formato do URL de um artigo direto está no `protocolo-pesquisa.md` (secção 7). Esta tabela alimenta o índice `references/normas-conferidas.md` (gerado por `mcp-server/scripts/gerar-normas.mjs`): a primeira coluna é "Nome, ato", a segunda a lista dos artigos lidos.

| Diploma | Artigos lidos | URL |
|---|---|---|
| Estatuto da Ordem dos Advogados, Lei n.º 145/2015 (com a Lei n.º 6/2024) | 92.º, 97.º, 98.º, 100.º, 101.º, 105.º, 106.º, 107.º | https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=2440&tabela=leis |
| Código de Processo Civil, Lei n.º 41/2013 | 40.º, 138.º, 139.º, 552.º, 569.º, 638.º | https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1959&tabela=leis |
| Código Civil, Decreto-Lei n.º 47344/66 | 262.º, 559.º, 560.º, 805.º, 806.º, 810.º, 811.º, 1154.º, 1156.º, 1157.º | https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=775&tabela=leis |
| Regulamento das Custas Processuais, Decreto-Lei n.º 34/2008 | 6.º, 26.º | https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=967&tabela=leis |
| Lei da Organização do Sistema Judiciário, Lei n.º 62/2013 | 29.º, 33.º | https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1974&tabela=leis |
| Lei da Proteção de Dados Pessoais, Lei n.º 58/2019 | 1.º | https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=3118&tabela=leis |
| Código do IVA, Decreto-Lei n.º 394-B/84 | 18.º, n.º 1 | https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva18.aspx |

Segunda fonte: os artigos 105.º e 106.º do Estatuto da Ordem dos Advogados foram também conferidos no portal da Ordem (texto integral e PDF do Diário da República), em https://portal.oa.pt/ordem/regras-profissionais/estatuto-da-ordem-dos-advogados/.

O que ficou por ler e está marcado `[VERIFICAR]` acima: alçadas (Lei n.º 62/2013, artigo 44.º), tabelas do Regulamento das Custas Processuais, Lei n.º 34/2004 (apoio judiciário), Portaria n.º 291/2003 e aviso da taxa de juros comerciais, Lei n.º 10/2024 (atos de advogados), IVA nas Regiões Autónomas e isenções. Os valores do ano (UC, alçadas, taxas de juro, taxa de IVA, coeficiente das rendas) estão em `references/valores-2026.md`.
