# Technical review of fichas: common instructions

You are doing a technical legal review of drafting guides ("fichas") for a Portuguese law assistant plugin (juridico-pt). Everything you write goes into documents for Portuguese lawyers. Write it in European Portuguese (PT-PT, AO90 spelling), in a lawyer's register, and never use Brazilian forms such as "usuário", "registro", "contato", "fato", "ônus", "patrimônio" or "honorários advocatícios".

## Goal
A previous pass already fixed the article NUMBERS. Your job is the SUBSTANCE: outdated or revoked regimes, wrong deadlines, amounts or competent bodies, institutes that do not exist in Portuguese law (often Brazilian), and wrong statements of what a rule says. Fix what is wrong with minimal, exact text substitutions, each confirmed in an official source.

A cheap first-pass triage flagged your fichas. Its suspicions are in `D/textos/<CODE>.triagem.md`. They were written from memory, without sources: verify each one and do not trust them blindly. In earlier batches about 1 in 5 triage suspicions was itself wrong, and the triage also missed errors, so read the whole ficha.

## Files (D = this folder)
`C:/Users/ADMINI~1/AppData/Local/Temp/claude/c--Users-Administrator-Desktop-CLAUDE-SKILLS-juridico-pt/381925a7-eebd-4683-86a9-3bf5bea0f303/scratchpad/revisao-tecnica`
- **`D/textos/<CODE>.md`:** the ficha text BEFORE citation marking. Your substitutions apply to THIS text.
- **`D/textos/<CODE>.citacoes.md`:** the current state of each citation and the notes from the previous review, plus the path of the generated ficha in the repository (read-only).
- **`D/textos/<CODE>.triagem.md`:** the index title and description (PT and EN) and the triage suspicions.
- **Epígrafes:** official article headings of 25 codes, in `C:/Users/Administrator/Desktop/CLAUDE SKILLS/juridico-pt/skills/juridico-pt/references/epigrafes/<SIGLA>.json`:
  - CC, CCP, CDADC, CE, CIMI, CIRC, CIRE, CIRS, CP, CPA, CPC, CPI, CPP;
  - CPPT, CPTA, CRP, CSC, CT, LAV, LGT, RGCO, RGIT, RGPD, RJUE, TFUE.
- **The house's own references,** for calibration: `C:/Users/Administrator/Desktop/CLAUDE SKILLS/juridico-pt/skills/juridico-pt/references/`. They were checked by a lawyer, so they are a good second opinion, but still confirm in the source. Amounts of the year are in `valores-2026.md`. Read-only.
- **Validator:** `node D/validar.mjs <your batch>`.

## Sources: confirm every legal change in an official source (WebFetch)
- **PGDL, per article:** `https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?artigo_id=<nid>A<article in 4 digits>&nid=<nid>&tabela=leis&pagina=1&ficha=1&so_miolo=&nversao=&`.
  - The trailing `&` avoids a cached "A query falhou!".
  - Known nids:
    - CC 775, CPC 1959, CP 109, CPP 199, CRP 4, CT 1047, CPT 487;
    - CIRE 85, CSC 524, CPI 2979, CDADC 484, NRAU 691, LOSJ 1974;
    - CRPredial 488, CRCivil 682, RGPTC 2428, LPCJP 545, Lei 7/2001 901;
    - Lei 98/2009 1156, Lei 102/2009 1158, Lei 107/2009 1154, Lei 93/2021 3544, CEPMPL 1147, Lei 19/2012 1705, DL 166/2013 2047, Lei 23/2018 2899, Lei 144/2015 2425, LTFP 2171, CPTA 439, CPA 2248, RGCO 166, CPPT 256, ETAF 418.
  - EUR-Lex often blocks automated fetches. The official text of any EU act is also at `https://publications.europa.eu/resource/celex/<CELEX number>` (e.g. 32012R1215).
  - Reforms other reviewers confirmed in official sources in this run:
    - Lei 34/2026 and Lei 37/2026 amended the CPP and the CP;
    - Reg. (UE) 2026/877 replaced the technology-transfer block exemption Reg. 316/2014 from 1/5/2026;
    - Lei 56/2023 renamed the BNA as the BAS (art. 15.º-A NRAU);
    - DL 97/2026 created a 10 % IRS rate for moderate rents (art. 45.º-C EBF).
    - DL 125/2025 (Regime Jurídico da Cibersegurança, PGDL nid 3985) transposed NIS2 and revoked Lei 46/2018 and DL 65/2021.
    - Reg. (UE) 2026/1744 (AI "Omnibus Digital", in force 27/7/2026) moved the AI Act high-risk dates to 2/12/2027 (Annex III) and 2/8/2028 (Annex I).
    - DL 108/2026 (in force 1/10/2026) amended the RJUE again. Lei Orgânica 1/2026 reformed the Lei da Nacionalidade (7/10 years). Lei 61/2025 and Lei 62/2026 amended Lei 23/2007 and the asylum law. The SEF was replaced by the AIMA.
    - If your fichas touch these, confirm them yourself as usual.
  - DRE PDFs can be fetched with `https://diariodarepublica.pt/redirect/LinkFicheiroAntigo.aspx?conteudoId=<id>` (GET).
  - The epígrafes file CE.json is the Código das Expropriações, not the Código da Estrada. Write "Código da Estrada" in full.
  - Whole diploma: `https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=<nid>&tabela=leis&pagina=1&ficha=1&so_miolo=&nversao=`.
  - For any other diploma, find the nid with WebSearch ("pgdlisboa <diploma>").
- **Other official sources:**
  - diariodarepublica.pt;
  - the Portal das Finanças (tax codes);
  - EUR-Lex (EU acts);
  - the official site of the competent body.
- **Unreachable source:** if you cannot reach a source, say so and write `[■ VERIFICAR: …]` instead of asserting.
- **Laws change often.** Read the version in force today (2026), not an older one. If a 2025/2026 reform is reported but you cannot confirm it in an official source, flag it with `[■ VERIFICAR]` rather than assume it.

## Output: `D/revisao-<batch>.json`
A JSON array, one object per ficha:
```
{"codigo": "XXX-000",
 "veredicto": "ok" | "corrigida" | "rever de raiz",
 "resumo": "2 to 4 sentences in PT-PT: what was wrong and what you changed",
 "substituicoes": [{"de": "exact text", "para": "new text", "motivo": "short PT-PT reason", "fonte": "https://… where you confirmed it"}],
 "pontos_para_o_advogado": ["short PT-PT points a lawyer should still confirm"],
 "fontes": ["every URL you consulted"]}
```
- **Optional title and description:** only when the index title or description (in `<CODE>.triagem.md`) itself states the wrong regime, add `"titulo"` + `"titulo_en"` and/or `"descricao"` + `"descricao_en"`, always as PT + EN pairs.

## Substitution rules
- **`de`:**
  - copied EXACTLY from `D/textos/<CODE>.md`;
  - must occur there exactly once, so include enough context to make it unique;
  - substitutions in one ficha must not overlap.
- **`para`:**
  - follows the ficha's markdown style, in PT-PT AO90;
  - placeholders such as `[nome]` stay as they are;
  - a NEW article or regime may be cited only if you confirmed it in the source (put the URL in `fonte`); otherwise use `[■ VERIFICAR: what to confirm]`;
  - always write "[■ VERIFICAR", never "[VERIFICAR".
- **Citation format:**
  - Cite as "art. N.º SIGLA" (e.g. "art. 1083.º, n.º 3, CC") with the sigla of the code when it has one, so the importer can check it against the epígrafes.
  - Where a citation stays correct, keep its exact text.
- **Change only what is wrong.** Keep the structure and the tone. When a whole ficha rests on the wrong regime, rewrite the affected sections; larger `de` blocks are fine.
- **Do not touch the house paragraph** right after "## Método" (it starts "Ficha de trabalho para preparar este documento").
- **Veredicto:**
  - "ok": nothing substantive is wrong;
  - "corrigida": you fixed it;
  - "rever de raiz": there are problems you could not fix safely. Then also add a substitution that puts a short warning paragraph right after that house paragraph, saying what is unreliable.
- **Rigour first:** a wrong correction is worse than a `[■ VERIFICAR]`.

Run the validator until it prints OK. Do not modify any other file in D, and do not touch the repository. You may keep scratch files in a new folder `D/../<batch>-trabalho/`.

## Keep your context lean (cost)
Every turn re-reads your whole conversation, so a long context makes each later step cost more.
- When you need a long text (a whole code, a long article page), save it to a file in your work folder and search it with grep. Do not print it into the conversation.
- Read only the articles you need.
- Build the JSON with a small script, not by pasting it back and forth.
- Be thorough on the law, economical on the tokens.

## Final report (short)
- One line per ficha: the veredicto and the main problem fixed.
- The number of substitutions.
- Anything you could not verify.
- Any citation decision in `<CODE>.citacoes.md` marked "verificar" whose note your correction made obsolete, because the text now describes that article correctly. Name the exact citation text.
