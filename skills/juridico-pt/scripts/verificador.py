#!/usr/bin/env python3
"""Verificador de redação do redator jurídico (juridico-pt).

Aponta, num documento (texto ou Marcação Redator), os cacoetes de texto gerado por IA, o léxico
do Brasil, travessões, aspas curvas, markdown e as marcas internas que não podem chegar ao
ficheiro final. Só biblioteca-padrão, sem rede.

É o 2.º lado de mcp-server/src/redacao.ts (tool verificar_redacao): as MESMAS listas e regras,
com paridade verificada pelas fixtures de mcp-server/test/fixtures/redator/verificador.json.
Regras em assets/redacao/estilo.md. Uma ocorrência por linha e por categoria; "limite-1x" conta
cada repetição a partir da segunda.

Uso:
    python verificador.py documento.txt
    python verificador.py documento.txt --final   (documento preenchido: {{variável}} é erro)
    python verificador.py documento.txt --guia    (guia ou instrução: # e listas não acusam)
    python verificador.py documento.txt --json

Sai com código 1 quando há ERRO. Os avisos não reprovam: pedem uma decisão de quem revê.
"""

import argparse
import json
import math
import re
import sys
import unicodedata

try:
    sys.stdout.reconfigure(encoding="utf-8")
except (AttributeError, ValueError):
    pass

# [padrão, nível, sugestão, isenção]: padrões sobre o texto "dobrado" (minúsculas, sem acentos).
PROIBIDOS = {
    "abertura": [
        ("e importante (referir|salientar|sublinhar|destacar|realcar|notar|mencionar|ressaltar)( que)?", "ERRO", "corte e vá direto ao facto", None),
        ("importa (referir|salientar|sublinhar|destacar|realcar|notar|mencionar|ressaltar)( que)?", "ERRO", "corte e vá direto ao facto", None),
        ("cumpre (referir|salientar|sublinhar|destacar|realcar)( que)?", "ERRO", "corte e vá direto ao facto", None),
        ("e de (referir|salientar|sublinhar|destacar|notar)( que)?", "ERRO", "corte e vá direto ao facto", None),
        ("de referir que", "ERRO", "corte e vá direto ao facto", None),
        ("vale a pena (referir|destacar|salientar|ressaltar)", "ERRO", "corte", None),
        ("e possivel (observar|verificar|constatar|notar) que", "ERRO", "afirme a constatação diretamente", None),
        ("pode-se (afirmar|dizer|concluir|observar) que", "ERRO", "afirme diretamente", None),
        ("nos dias de hoje", "ERRO", "corte ou indique a data", None),
        ("no (atual|presente) (cenario|panorama)", "ERRO", "corte ou indique o contexto real", None),
        ("conforme solicitado", "ERRO", "corte", None),
        ("aqui esta (o|a|os|as) ", "ERRO", "comece pelo documento", None),
        ("segue abaixo", "ERRO", "corte: o documento já é o documento", None),
    ],
    "fecho": [
        ("em suma", "ERRO", "corte o anúncio e deixe só a conclusão", None),
        ("em resumo", "ERRO", "corte o anúncio e deixe só a conclusão", None),
        ("em conclusao", "ERRO", "corte o anúncio e deixe só a conclusão", None),
        ("em ultima analise", "ERRO", "corte", None),
        ("espero que (isto |isso )?(ajude|tenha ajudado)", "ERRO", "corte: o documento não fala com o leitor", None),
        ("espero ter (ajudado|esclarecido)", "ERRO", "corte", None),
        ("qualquer duvida,? (estou|fico|ficamos) (a|ao) (sua )?disposi", "ERRO", "\"Ficamos ao dispor para qualquer esclarecimento adicional.\"", None),
        ("como (um |uma )?(assistente|modelo de linguagem|inteligencia artificial)", "ERRO", "corte a frase inteira", None),
    ],
    "conector": [
        ("alem disso", "AVISO", "ligue pelo facto anterior ou use \"também\"", None),
        ("desta forma", "AVISO", "corte", None),
        ("dessa forma", "AVISO", "corte", None),
        ("deste modo", "AVISO", "corte", None),
        ("desse modo", "AVISO", "corte", None),
        ("nesse sentido", "AVISO", "conector específico ou referência ao caso", None),
        ("neste sentido", "AVISO", "conector específico ou referência ao caso", None),
        ("sendo assim", "AVISO", "corte", None),
        ("assim sendo", "AVISO", "corte", None),
        ("a nivel de", "ERRO", "\"em\" ou \"quanto a\"", None),
        ("de forma a", "ERRO", "\"para\"", None),
        ("com o intuito de", "ERRO", "\"para\"", None),
        ("com o objetivo de", "ERRO", "\"para\"", None),
    ],
    "verbo": [
        ("impact(ar|a|ou|am|ado|ada)\\b", "ERRO", "\"afetar\" ou diga o efeito", None),
        ("otimiz(ar|a|ou|acao)", "ERRO", "diga o que melhora", None),
        ("alavanc(ar|a|ou)", "ERRO", "\"usar\", \"aproveitar\"", None),
        ("potencializ(ar|a|ou)", "ERRO", "\"aumentar\", \"reforçar\"", None),
        ("desempenha um papel", "ERRO", "diga o que a coisa faz", None),
        ("garantir que", "ERRO", "nomeie a obrigação: \"obriga-se a\", \"responde por\"", None),
        ("assegurar que", "ERRO", "nomeie a obrigação e quem responde", None),
    ],
    "adjetivo": [
        ("robust[oa]s?", "ERRO", "diga o que torna a prova ou o argumento forte", None),
        ("crucia(l|is)", "ERRO", "corte ou diga porque importa", None),
        ("abrangentes?", "ERRO", "especifique o que está incluído", None),
        ("de (suma|extrema|grande) (importancia|relevancia)", "ERRO", "corte ou justifique com o facto", None),
        ("fundamenta(l|is)", "AVISO", "corte ou descreva o efeito concreto", "(direito|principio|garantia|liberdade)s? fundamenta"),
    ],
    "vago": [
        ("uma serie de", "ERRO", "indique o número ou a lista", None),
        ("diversos (fatores|aspetos|elementos)", "ERRO", "liste-os", None),
        ("de certa forma", "ERRO", "corte ou seja preciso", None),
        ("obviamente", "ERRO", "corte", None),
        ("evidentemente", "ERRO", "corte", None),
        ("e claro que", "ERRO", "corte o reforço", None),
    ],
}

LIMITE_1X = ["outrossim", "ademais", "destarte", "in casu", "pelo exposto", "nao obstante", "em sintese",
             "consubstancia", "no ambito de", "no que respeita a"]

# Léxico e grafia do Brasil: ERRO sem uso jurídico em PT-PT; AVISO quando há sentido português.
PTBR_ERRO = r"\b(usuari[oa]s?|registros?|planilhas?|contatos?|fatos?)\b"
PTBR_AVISO = r"\b(arquivos?|parcelas?|revisad[oa]s?)\b"

TRIADE_SUF = "(?:ivos?|ivas?|entes?|antes?|os[oa]s?|ais|al|veis|vel)"
TRIADE = rf"\b([a-z]+{TRIADE_SUF}), ([a-z]+{TRIADE_SUF}) e ([a-z]+{TRIADE_SUF})\b"
TRIADE_OK = ["certa, liquida e exigivel"]

EMOJI = re.compile("[\U0001F300-\U0001FAFF☀-➿]")
TITULOS = ("CLAUSULA", "SECAO", "TITULO", "SUBTITULO", "ENDERECAMENTO")


def dobrar(texto):
    """Minúsculas e sem acentos (para comparar padrões)."""
    d = unicodedata.normalize("NFD", texto)
    return "".join(c for c in d if not 0x300 <= ord(c) <= 0x36F).lower()


def _curto(s):
    return s[:59] + "…" if len(s) > 60 else s


def verificar(texto, final=False, guia=False):
    out = []
    contagem = {}
    repeticao = {"chave": "", "n": 0}
    linhas = re.sub(r"\r\n?", "\n", texto or "").split("\n")

    for i, original in enumerate(linhas):
        linha = i + 1

        def add(nivel, categoria, trecho, sugestao):
            out.append({"linha": linha, "nivel": nivel, "categoria": categoria,
                        "trecho": _curto(trecho.strip()), "sugestao": sugestao})

        if not original.strip():
            continue
        if re.match(r"^\s*@@(PERFIL|TIPO):", original) or re.match(r"^\s*\[MENÇÃO\]", original):
            repeticao = {"chave": "", "n": 0}
            continue
        cmd = re.match(r"^\s*@@([A-Z-]+):?\s*(.*)$", original)
        titulo = bool(cmd) and cmd.group(1) in TITULOS
        valor = cmd.group(2) if cmd else original
        visivel = re.sub(r"`[^`]*`", lambda m: " " * len(m.group(0)), valor)
        sem_vars = re.sub(r"\{\{[^{}]*\}\}", lambda m: " " * len(m.group(0)), visivel)
        d = dobrar(sem_vars)

        res = re.search(r"\[\[IA:|\[\[(INÍCIO|INICIO) VARIANTE|\[\[FIM VARIANTE", visivel)
        if res and not guia:
            add("ERRO", "residuo", res.group(0), "apague a instrução interna antes de entregar")
        elif final and re.search(r"\{\{[^{}]*\}\}", visivel):
            add("ERRO", "residuo", re.search(r"\{\{[^{}]*\}\}", visivel).group(0),
                "preencha a variável ou troque por [■ CONFIRMAR: …]")

        so_maiusculas = bool(re.search("[A-ZÁÉÍÓÚÂÊÔÃÕÇ]", sem_vars)) and sem_vars == sem_vars.upper()
        traco = re.search("[—–]", sem_vars)
        if traco and not titulo and not so_maiusculas:
            add("ERRO", "travessao", sem_vars[max(0, traco.start() - 20):traco.start() + 20],
                "troque por vírgula, parênteses ou ponto")

        for grupo, regras in PROIBIDOS.items():
            for padrao, nivel, sug, isencao in regras:
                m = re.search(r"(?:^|[^a-z])(" + padrao + r")(?![a-z])", d)
                if m and not (isencao and re.search(isencao, d)):
                    add(nivel, "proibido/" + grupo, m.group(1), sug)
                    break

        limite = False
        for t in LIMITE_1X:
            for m in re.finditer(r"(?:^|[^a-z])(" + t + r")(?![a-z])", d):
                contagem[t] = contagem.get(t, 0) + 1
                if contagem[t] > 1 and not limite:
                    add("ERRO", "limite-1x", m.group(1), "já usada antes: corte esta ocorrência")
                    limite = True

        if not guia and not cmd:
            if re.match(r"^\s*#{1,6}\s", sem_vars):
                add("ERRO", "markdown", sem_vars, "use @@TITULO, @@SECAO ou @@CLAUSULA")
            elif re.match(r"^\s*[-*+]\s", sem_vars):
                add("ERRO", "markdown", sem_vars, "use @@ALINEA: a) ou @@ITEM")
            elif sem_vars.count("**") % 2 == 1:
                add("ERRO", "markdown", sem_vars, "feche o **negrito**")
            elif EMOJI.search(sem_vars):
                add("ERRO", "markdown", sem_vars, "apague o emoji")
        elif not guia and EMOJI.search(sem_vars):
            add("ERRO", "markdown", sem_vars, "apague o emoji")

        aspas = re.search("[“”‘’]", sem_vars)
        if aspas:
            add("ERRO", "pontuacao", aspas.group(0), "use aspas retas duplas (\")")
        elif re.search(r"(?<!\[)(\.\.\.|…)(?!\])", sem_vars):
            add("AVISO", "pontuacao", "...", "reticências só em [...], para corte de citação")

        br = re.search(PTBR_ERRO, d)
        if br:
            add("ERRO", "ptbr", br.group(0), "use a forma de PT-PT (utilizador, registo, folha de cálculo, contacto, facto)")
        else:
            av = re.search(PTBR_AVISO, d)
            if av:
                add("AVISO", "ptbr", av.group(0), "confirme o sentido em PT-PT (ficheiro, prestação, revisto)")

        par = re.search(r"\bnao (so|apenas)\b[^.]{0,80}\bmas tambem\b", d)
        if par:
            add("AVISO", "paralelismo", par.group(0), "reescreva em frase direta")
        tri = re.search(TRIADE, d)
        if tri and tri.group(0) not in TRIADE_OK:
            add("AVISO", "triade", tri.group(0), "confirme se os três itens existem de verdade")

        if not cmd:
            frases = [f.strip() for f in re.split(r"(?<=[.!?])\s+", sem_vars) if f.strip()]
            if len(frases) >= 4:
                tam = [len(f.split()) for f in frases]
                media = sum(tam) / len(tam)
                desvio = math.sqrt(sum((b - media) ** 2 for b in tam) / len(tam))
                if desvio < 3:
                    add("AVISO", "ritmo", frases[0], "varie o tamanho das frases")
            palavras = d.strip().split()
            rotulo = bool(re.match(r"^(paragrafo|a\)|b\)|c\)|\d+\.)", d.strip()))
            chave = " ".join(palavras[:2]) if palavras and palavras[0] in ("o", "a", "os", "as", "um", "uma") else (palavras[0] if palavras else "")
            if rotulo:
                repeticao = {"chave": "", "n": 0}
            else:
                repeticao = {"chave": chave, "n": repeticao["n"] + 1} if repeticao["chave"] == chave else {"chave": chave, "n": 1}
                if repeticao["n"] == 3:
                    add("AVISO", "repeticao-inicio", chave, "varie o começo do parágrafo")
        else:
            repeticao = {"chave": "", "n": 0}
    return out


def formatar(ocs):
    erros = sum(1 for o in ocs if o["nivel"] == "ERRO")
    cab = f"ERROS: {erros} · AVISOS: {len(ocs) - erros}"
    if not ocs:
        return cab + "\nSem erros nem avisos."
    linhas = [cab] + (["Sem erros."] if erros == 0 else [])
    linhas += [f"L{o['linha']} [{o['nivel']}] {o['categoria']}: {o['trecho']} -> {o['sugestao']}" for o in ocs]
    return "\n".join(linhas)


def main(argv=None):
    p = argparse.ArgumentParser(description="Verificador de redação do redator jurídico (PT-PT).")
    p.add_argument("ficheiro", help="Documento em texto ou Marcação Redator")
    p.add_argument("--final", action="store_true", help="Documento preenchido: {{variável}} é erro")
    p.add_argument("--guia", action="store_true", help="Guia ou instrução: títulos # e listas não acusam")
    p.add_argument("--json", action="store_true", help="Saída em JSON")
    a = p.parse_args(argv)
    with open(a.ficheiro, encoding="utf-8") as fh:
        texto = fh.read().lstrip("﻿")
    ocs = verificar(texto, final=a.final, guia=a.guia)
    print(json.dumps(ocs, ensure_ascii=False, indent=1) if a.json else formatar(ocs))
    return 1 if any(o["nivel"] == "ERRO" for o in ocs) else 0


if __name__ == "__main__":
    sys.exit(main())
