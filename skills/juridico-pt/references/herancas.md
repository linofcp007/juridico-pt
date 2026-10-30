# Heranças e Sucessões

> **Âmbito:** nacional
>
> 🔗 O **regime de bens** do casamento condiciona a herança — ver `references/familia.md`. Para valores/isenções do imposto do selo, ver `references/valores-2026.md`.

## Legislação Base
- Código Civil: Livro V — Direito das Sucessões (Arts. 2024º-2334º)
- Código do Imposto do Selo (CIS): verba 1.2 da Tabela Geral
- Código do Registo Civil e Código do Notariado

## Tipos de Sucessão
- **Legítima**: segundo a lei, na ausência de testamento
- **Testamentária**: segundo testamento válido
- **Legitimária**: quota indisponível reservada a herdeiros legitimários (cônjuge, descendentes, ascendentes)

## Ordem dos Herdeiros Legítimos (Art. 2133º CC)
1. Cônjuge e descendentes
2. Cônjuge e ascendentes
3. Irmãos e seus descendentes
4. Outros colaterais até 4º grau
5. Estado

## Quota Indisponível (Legítima)
- Cônjuge + filhos: 2/3 da herança
- Cônjuge sem descendentes + ascendentes: 2/3
- Cônjuge sozinho: 1/2
- Filhos sem cônjuge: 1/2 (1 filho), 2/3 (2+ filhos)
- A quota disponível é o restante — livre para testamento

## Procedimentos

### Habilitação de Herdeiros
- Escritura pública (notário) ou procedimento simplificado (IRN — Heranças online)
- Documentos: certidões de óbito, nascimento, casamento, identificação dos herdeiros
- Custo: variável (balcão de heranças IRN ~375€ + registos — ver `references/valores-2026.md`, Emolumentos)

### Partilha
- Por acordo entre todos os herdeiros (escritura de partilha)
- Judicial (inventário): quando não há acordo
- Inventário obrigatório quando não haja acordo de todos os interessados, quando o Ministério Público entenda que o interesse do incapaz a quem a herança é deferida implica aceitação a benefício de inventário, ou quando um herdeiro, por ausência em parte incerta ou incapacidade de facto permanente, não possa intervir na partilha por acordo (art. 2102.º, n.º 2, CC). Haver menores não obriga, por si só, a inventário: a partilha por acordo precisa de autorização (art. 1889.º, n.º 1, al. l), CC), decidida pelo Ministério Público, salvo se o representante também for herdeiro, caso em que é preciso curador especial (DL 272/2001, art. 2.º)

### Aceitação e Repúdio
- Aceitação: expressa ou tácita (praticar atos de herdeiro)
- Aceitação a benefício de inventário: limita responsabilidade ao valor da herança
- Repúdio: tem a forma exigida para a alienação da herança (art. 2063.º CC) — escritura pública ou documento particular autenticado se houver bens cuja alienação exija essa forma (p. ex., imóveis); nos outros casos basta documento particular (art. 2126.º CC). É irrevogável (art. 2066.º CC); por um menor exige autorização (art. 1889.º, n.º 1, al. j), CC)

## Fiscalidade
- **Imposto do selo**: 10% sobre o valor dos bens (verba 1.2 TGIS)
- **Isenção**: cônjuge/unido de facto, descendentes e ascendentes estão ISENTOS
- **Imóveis**: na herança não há o Imposto do Selo de 0,8% (a verba 1.1 só abrange a aquisição onerosa ou por doação); na **doação** de imóveis acresce 0,8% sobre o VPT, mesmo para o cônjuge, descendentes e ascendentes — calcula com `calc_imposto_selo_heranca` (`doacao: true`)
- Declaração Modelo 1 do IS: até ao fim do 3.º mês seguinte ao do óbito (art. 26.º CIS)
- Avaliação de imóveis: VPT (Valor Patrimonial Tributário) das Finanças

## Questões Comuns
- Herança indivisa: gestão conjunta até partilha, qualquer herdeiro pode pedir partilha
- Dívidas do falecido: responsabilidade até ao valor dos bens herdados (aceitação a benefício de inventário)
- Doações em vida: podem ser colacionadas (trazidas à partilha) — Art. 2104º CC
- União de facto: não é herdeiro legítimo, mas pode ter direitos (casa de morada de família, etc.)

## Templates
> Documentos gerados a pedido neste estilo. Os que já existem como ficheiro estão em `assets/templates/` (ver índice); os restantes são redigidos quando pedires.

- Requerimento de habilitação de herdeiros (guião) (a pedido)
- Acordo de partilha extrajudicial — `assets/templates/acordo-partilha-extrajudicial.md`
- Declaração de repúdio de herança (a pedido)
- Procuração para representação em partilha (a pedido)
