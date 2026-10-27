#!/usr/bin/env python3
"""Gera o .docx forense de um documento em Marcação Redator (redator jurídico, juridico-pt).

Só biblioteca-padrão (zipfile + XML escrito à mão): corre no .skill e em qualquer Python 3.
É o 2.º lado do gerador TypeScript (mcp-server/src/marcacao.ts e docx.ts, tool
exportar_documento): o mesmo texto dá o mesmo word/document.xml (fixtures de
mcp-server/test/fixtures/redator/). Regras em assets/redacao/marcacao.md e formatacao-docx.md.

Uso:
    python gerar_docx.py documento.txt "AAAA-MM-DD - Tipo do documento - Parte.docx"

Sai com código 2, sem gerar ficheiro, se o texto ainda tiver [[IA:, [[INÍCIO/FIM VARIANTE ou
{{variável}}; com código 1 se a marcação estiver mal formada.

AVISO: o documento gerado é um projeto; precisa da revisão de quem o assina antes de ser
assinado, enviado ou apresentado em juízo.
"""

import argparse
import datetime
import re
import sys
import unicodedata
import zipfile

try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except (AttributeError, ValueError):
    pass

PERFIS = ("juridico", "contabil")
TIPOS_DOC = ("peticao", "contrato", "carta", "memoria-calculo", "parecer", "ata", "recibo")
SIMPLES = {
    "TITULO": "titulo", "SUBTITULO": "subtitulo", "ENDERECAMENTO": "enderecamento", "SECAO": "secao",
    "CLAUSULA": "clausula", "CENTRO": "centro", "DIREITA": "direita", "DATA": "data", "NOTA": "nota",
    "CITACAO": "citacao",
}
RESIDUOS = (
    ("ia", re.compile(r"\[\[IA:[^\]]*\]?\]?")),
    ("variante", re.compile(r"\[\[(?:INÍCIO|INICIO) VARIANTE[^\]]*\]?\]?|\[\[FIM VARIANTE\]?\]?")),
    ("variavel", re.compile(r"\{\{[^{}]*\}\}")),
)
RE_MARCADOR = re.compile(r"\[■ (CONFIRMAR|VERIFICAR)\b[^\]]*\]")

# ---------------------------------------------------------------------------
# Parser (igual a marcacao.ts)
# ---------------------------------------------------------------------------


def _linhas(texto):
    return re.sub(r"\r\n?", "\n", texto or "").split("\n")


def encontrar_residuos(texto):
    out = []
    for i, l in enumerate(_linhas(texto)):
        for tipo, rx in RESIDUOS:
            m = rx.search(l)
            if m:
                out.append({"linha": i + 1, "tipo": tipo, "trecho": m.group(0)[:80]})
    return out


def _pares(v):
    out = []
    for b in v.split(";;"):
        partes = [x.strip() for x in b.split("|")]
        out.append([partes[0], partes[1] if len(partes) > 1 else ""])
    return out


def _tabela(v):
    return [[c.strip() for c in r.split("|")] for r in v.split(";;")]


def analisar_marcacao(texto):
    """Devolve (doc ou None, residuos, erros) — o mesmo que analisarMarcacao em TS."""
    linhas = _linhas(texto)
    erros = []
    residuos = encontrar_residuos(texto)

    def cab(n, nome):
        if n >= len(linhas):
            return None
        m = re.match(r"^@@" + nome + r":\s*(.*?)\s*$", linhas[n])
        return m.group(1) if m else None

    perfil = cab(0, "PERFIL")
    if perfil is None:
        erros.append({"linha": 1, "msg": "a 1.ª linha tem de ser @@PERFIL: juridico | contabil"})
    elif perfil not in PERFIS:
        erros.append({"linha": 1, "msg": f"@@PERFIL inválido: '{perfil}' (juridico | contabil)"})
    tipo = cab(1, "TIPO")
    if tipo is None:
        erros.append({"linha": 2, "msg": "a 2.ª linha tem de ser @@TIPO: " + " | ".join(TIPOS_DOC)})
    elif tipo not in TIPOS_DOC:
        erros.append({"linha": 2, "msg": f"@@TIPO inválido: '{tipo}' (" + " | ".join(TIPOS_DOC) + ")"})

    doc = {"perfil": perfil or "juridico", "tipo": tipo or "carta", "blocos": []}
    item = 0
    for i in range(2, len(linhas)):
        linha = i + 1
        l = linhas[i].strip()
        if not l:
            continue
        if not l.startswith("@@"):
            doc["blocos"].append({"k": "corpo", "texto": re.sub(r"^\[MENÇÃO\]\s*", "", l), "linha": linha})
            continue
        m = re.match(r"^@@([A-Z-]+)(?::\s*(.*))?$", l)
        nome = m.group(1) if m else ""
        valor = ((m.group(2) if m else "") or "").strip()
        if nome in SIMPLES:
            doc["blocos"].append({"k": SIMPLES[nome], "texto": valor, "linha": linha})
            if nome == "SECAO":
                item = 0
        elif nome == "SUB":
            if "|" not in valor:
                erros.append({"linha": linha, "msg": "@@SUB precisa de 'Rótulo. | texto'"})
            else:
                rot, txt = valor.split("|", 1)
                doc["blocos"].append({"k": "sub", "rotulo": rot.strip(), "texto": txt.strip(), "linha": linha})
        elif nome == "ALINEA":
            doc["blocos"].append({"k": "alinea", "texto": valor, "linha": linha})
        elif nome == "ITEM":
            item += 1
            doc["blocos"].append({"k": "item", "n": item, "texto": valor, "linha": linha})
        elif nome in ("ASSINATURAS", "TESTEMUNHAS"):
            doc["blocos"].append({"k": nome.lower(), "pares": _pares(valor), "linha": linha})
        elif nome in ("TABELA", "TABELA-SEM-BORDA"):
            doc["blocos"].append({"k": "tabela", "bordas": nome == "TABELA", "linhas": _tabela(valor), "linha": linha})
        elif nome in ("QUEBRA", "ESPACO"):
            doc["blocos"].append({"k": "quebra" if nome == "QUEBRA" else "espaco", "linha": linha})
        elif nome == "CABECALHO":
            doc["cabecalho"] = valor
        elif nome == "RODAPE":
            doc["rodape"] = valor
        elif nome == "RECUO":
            if valor in ("sim", "nao"):
                doc["recuo"] = valor == "sim"
            else:
                erros.append({"linha": linha, "msg": "@@RECUO: sim | nao"})
        elif nome in ("PERFIL", "TIPO"):
            erros.append({"linha": linha, "msg": f"@@{nome} só nas duas primeiras linhas"})
        else:
            erros.append({"linha": linha, "msg": "comando desconhecido: @@" + (nome or l[2:])})
    return (None if erros else doc), residuos, erros


def marcadores_de(doc):
    out = []
    onde = "preâmbulo"
    for b in doc["blocos"]:
        if b["k"] in ("clausula", "secao"):
            onde = b["texto"]
        if "texto" in b:
            textos = [(b["rotulo"] + " " if "rotulo" in b else "") + b["texto"]]
        elif "pares" in b:
            textos = [x for p in b["pares"] for x in p]
        elif "linhas" in b:
            textos = [x for r in b["linhas"] for x in r]
        else:
            textos = []
        for t in textos:
            for m in RE_MARCADOR.finditer(t):
                out.append({"tipo": m.group(1), "texto": m.group(0), "onde": onde, "linha": b["linha"]})
    return out


# ---------------------------------------------------------------------------
# Gerador (igual a docx.ts, secção "Marcação Redator")
# ---------------------------------------------------------------------------

NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
NS_R = 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
FORMATOS = {
    "juridico": {"fonte": "Times New Roman", "tamanho": 24, "titulo": 24,
                 "margens": {"top": 1701, "right": 1134, "bottom": 1134, "left": 1701}, "linha": 360, "data": "right"},
    "contabil": {"fonte": "Arial", "tamanho": 22, "titulo": 24,
                 "margens": {"top": 1418, "right": 1418, "bottom": 1418, "left": 1418}, "linha": 276, "data": "left"},
}
TIPOS_COM_RECUO = ("peticao", "parecer")
RECUO = 709
RECUO_CITACAO = 2268
MIUDO = 20
LINHA_ASSINATURA = "_______________________"
RE_INLINE = re.compile(
    r"(\[■[^\]]*\]|\*\*.+?\*\*|(?<![0-9A-Za-zÀ-ÿ_])_(?=[^\s_])[^_\n]+?(?<=[^\s_])_(?![0-9A-Za-zÀ-ÿ_]))"
)
RE_NUMERICA = re.compile(r"^[\s()€%\d.,+-]*\d[\s()€%\d.,+-]*$")


def xml(s):
    s = re.sub("[\u0000-\u0008\u000b\u000c\u000e-\u001f￾￿]", "", s)
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def run_r(texto, negrito=False, italico=False, tamanho=None, realce=False):
    rpr = ("<w:b/>" if negrito else "") + ("<w:i/>" if italico else "")
    if tamanho:
        rpr += f'<w:sz w:val="{tamanho}"/><w:szCs w:val="{tamanho}"/>'
    if realce:
        rpr += '<w:highlight w:val="yellow"/>'
    return "<w:r>" + (f"<w:rPr>{rpr}</w:rPr>" if rpr else "") + f'<w:t xml:space="preserve">{xml(texto)}</w:t></w:r>'


def inline_r(texto, negrito=False, italico=False, tamanho=None):
    out = []
    ultimo = 0
    for m in RE_INLINE.finditer(texto):
        i = m.start()
        if i > ultimo:
            out.append(run_r(texto[ultimo:i], negrito, italico, tamanho))
        t = m.group(0)
        if t.startswith("[■"):
            out.append(run_r(t, negrito, italico, tamanho, realce=True))
        elif t.startswith("**"):
            out.append(run_r(t[2:-2], True, italico, tamanho))
        else:
            out.append(run_r(t[1:-1], negrito, True, tamanho))
        ultimo = i + len(t)
    if ultimo < len(texto):
        out.append(run_r(texto[ultimo:], negrito, italico, tamanho))
    return "".join(out)


def p_r(runs, jc=None, antes=None, depois=None, linha=None, esquerda=None, primeira=None, manter=False):
    espaco = ""
    if antes is not None or depois is not None or linha is not None:
        espaco = ("<w:spacing" + (f' w:before="{antes}"' if antes is not None else "")
                  + (f' w:after="{depois}"' if depois is not None else "")
                  + (f' w:line="{linha}" w:lineRule="auto"' if linha is not None else "") + "/>")
    ind = ""
    if esquerda is not None or primeira is not None:
        ind = ("<w:ind" + (f' w:left="{esquerda}"' if esquerda is not None else "")
               + (f' w:firstLine="{primeira}"' if primeira is not None else "") + "/>")
    ppr = ("<w:keepNext/>" if manter else "") + espaco + ind + (f'<w:jc w:val="{jc}"/>' if jc else "")
    return "<w:p>" + (f"<w:pPr>{ppr}</w:pPr>" if ppr else "") + runs + "</w:p>"


def _numerica(c):
    return bool(RE_NUMERICA.match(c)) or bool(re.search(r"^€|€$", c.strip()))


LADOS = ("top", "left", "bottom", "right", "insideH", "insideV")


def tabela_r(linhas, bordas):
    ncol = max([1] + [len(r) for r in linhas])
    largura = 9000 // ncol
    if bordas:
        limites = "<w:tblBorders>" + "".join(
            f'<w:{l} w:val="single" w:sz="4" w:space="0" w:color="808080"/>' for l in LADOS) + "</w:tblBorders>"
    else:
        limites = "<w:tblBorders>" + "".join(f'<w:{l} w:val="nil"/>' for l in LADOS) + "</w:tblBorders>"
    grid = "<w:tblGrid>" + "".join(f'<w:gridCol w:w="{largura}"/>' for _ in range(ncol)) + "</w:tblGrid>"
    trs = []
    for i, r in enumerate(linhas):
        cabecalho = bordas and i == 0
        total = bool(re.match(r"TOTAL\b", r[0] if r else "", re.I))
        tcs = []
        for c in range(ncol):
            t = r[c] if c < len(r) else ""
            jc = "center" if cabecalho else ("right" if c > 0 and _numerica(t) else "left")
            sombra = '<w:shd w:val="clear" w:color="auto" w:fill="D9D9D9"/>' if cabecalho else ""
            tcs.append(f'<w:tc><w:tcPr><w:tcW w:w="{largura}" w:type="dxa"/>{sombra}</w:tcPr>'
                       + p_r(inline_r(t, negrito=cabecalho or total, tamanho=MIUDO), jc=jc, depois=0) + "</w:tc>")
        trs.append("<w:tr>" + "".join(tcs) + "</w:tr>")
    return f'<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/>{limites}</w:tblPr>{grid}' + "".join(trs) + "</w:tbl>"


def assinaturas_r(pares, tamanho=None):
    linhas = [pares[i:i + 2] for i in range(0, len(pares), 2)]
    ncol = min(2, max(1, len(pares)))
    largura = 9000 // ncol
    sem = "".join(f'<w:{l} w:val="nil"/>' for l in LADOS)
    trs = []
    for par in linhas:
        tcs = []
        for c in range(ncol):
            p = par[c] if c < len(par) else None
            if p:
                conteudo = (p_r(run_r(LINHA_ASSINATURA, tamanho=tamanho), jc="center", antes=480, depois=0)
                            + p_r(inline_r(p[0], negrito=True, tamanho=tamanho), jc="center", depois=0)
                            + (p_r(inline_r(p[1], tamanho=tamanho), jc="center", depois=0) if p[1] else ""))
            else:
                conteudo = "<w:p/>"
            tcs.append(f'<w:tc><w:tcPr><w:tcW w:w="{largura}" w:type="dxa"/></w:tcPr>{conteudo}</w:tc>')
        trs.append("<w:tr>" + "".join(tcs) + "</w:tr>")
    grid = "<w:tblGrid>" + "".join(f'<w:gridCol w:w="{largura}"/>' for _ in range(ncol)) + "</w:tblGrid>"
    return (f'<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>{sem}</w:tblBorders></w:tblPr>'
            + grid + "".join(trs) + "</w:tbl>")


def bloco_r(b, f, recuo):
    titulo_tam = f["titulo"] if f["titulo"] != f["tamanho"] else None
    k = b["k"]
    if k == "corpo":
        return p_r(inline_r(b["texto"]), jc="both", primeira=RECUO if recuo else None)
    if k == "titulo":
        return p_r(inline_r(b["texto"].upper(), negrito=True, tamanho=titulo_tam), jc="center", antes=240, depois=240, manter=True)
    if k == "subtitulo":
        return p_r(inline_r(b["texto"], negrito=True), jc="center", manter=True)
    if k == "enderecamento":
        return p_r(inline_r(b["texto"].upper(), negrito=True), jc="left", depois=480)
    if k in ("secao", "clausula"):
        return p_r(inline_r(b["texto"].upper(), negrito=True), jc="left", antes=240, manter=True)
    if k == "sub":
        return p_r(run_r(b["rotulo"], negrito=True) + run_r(" ") + inline_r(b["texto"]), jc="both")
    if k == "alinea":
        return p_r(inline_r(b["texto"]), jc="both", esquerda=RECUO, primeira=0)
    if k == "item":
        return p_r(inline_r(f"{b['n']}. {b['texto']}"), jc="both", esquerda=RECUO, primeira=0)
    if k == "citacao":
        return p_r(inline_r(b["texto"], tamanho=f["tamanho"] - 2), jc="both", esquerda=RECUO_CITACAO, antes=120, depois=120, linha=240)
    if k == "centro":
        return p_r(inline_r(b["texto"]), jc="center")
    if k == "direita":
        return p_r(inline_r(b["texto"]), jc="right")
    if k == "data":
        return p_r(inline_r(b["texto"]), jc=f["data"], antes=480)
    if k == "nota":
        return p_r(inline_r(b["texto"], italico=True, tamanho=MIUDO), jc="left")
    if k == "tabela":
        return tabela_r(b["linhas"], b["bordas"]) + "<w:p/>"
    if k == "assinaturas":
        return assinaturas_r(b["pares"]) + "<w:p/>"
    if k == "testemunhas":
        return (p_r(run_r("TESTEMUNHAS:", negrito=True), jc="left", antes=240)
                + assinaturas_r(b["pares"], f["tamanho"] - 2) + "<w:p/>")
    if k == "espaco":
        return "<w:p/>"
    if k == "quebra":
        return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'
    return ""


def documento_xml(doc):
    f = FORMATOS[doc["perfil"]]
    recuo = doc["recuo"] if "recuo" in doc else doc["tipo"] in TIPOS_COM_RECUO
    corpo = "".join(bloco_r(b, f, recuo) for b in doc["blocos"])
    m = f["margens"]
    sect = ("<w:sectPr>" + ('<w:headerReference w:type="default" r:id="rId3"/>' if doc.get("cabecalho") else "")
            + '<w:footerReference w:type="default" r:id="rId2"/>'
            + f'<w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="{m["top"]}" w:right="{m["right"]}" '
            + f'w:bottom="{m["bottom"]}" w:left="{m["left"]}" w:header="709" w:footer="709" w:gutter="0"/></w:sectPr>')
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            + f"<w:document {NS} {NS_R}><w:body>{corpo}{sect}</w:body></w:document>")


def _estilos(f):
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            f"<w:styles {NS}>\n"
            f'<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="{f["fonte"]}" w:hAnsi="{f["fonte"]}" '
            f'w:cs="{f["fonte"]}" w:eastAsia="{f["fonte"]}"/><w:color w:val="000000"/><w:sz w:val="{f["tamanho"]}"/>'
            f'<w:szCs w:val="{f["tamanho"]}"/><w:lang w:val="pt-PT"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr>'
            f'<w:spacing w:after="120" w:line="{f["linha"]}" w:lineRule="auto"/><w:jc w:val="both"/></w:pPr>'
            "</w:pPrDefault></w:docDefaults>\n"
            '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>\n'
            "</w:styles>")


def _campo(filho):
    return f'<w:r><w:rPr><w:sz w:val="{MIUDO}"/><w:szCs w:val="{MIUDO}"/></w:rPr>{filho}</w:r>'


def _rodape(f, texto):
    largura = 11906 - f["margens"]["left"] - f["margens"]["right"]
    campo = (_campo('<w:fldChar w:fldCharType="begin"/>')
             + _campo('<w:instrText xml:space="preserve"> PAGE </w:instrText>')
             + _campo('<w:fldChar w:fldCharType="separate"/>')
             + run_r("1", tamanho=MIUDO)
             + _campo('<w:fldChar w:fldCharType="end"/>'))
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            f'<w:ftr {NS} {NS_R}><w:p><w:pPr><w:tabs><w:tab w:val="right" w:pos="{largura}"/></w:tabs>'
            '<w:spacing w:after="0"/><w:jc w:val="left"/></w:pPr>'
            + (inline_r(texto, tamanho=MIUDO) if texto else "") + "<w:r><w:tab/></w:r>" + campo + "</w:p></w:ftr>")


def _cabecalho(texto):
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            f"<w:hdr {NS} {NS_R}>" + p_r(inline_r(texto, tamanho=MIUDO), jc="center", depois=0) + "</w:hdr>")


TIPOS_CONTEUDO = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n'
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n'
    '<Default Extension="xml" ContentType="application/xml"/>\n'
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>\n'
    '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>\n'
    '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>\n'
)
RELS = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n'
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>\n'
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>\n'
    "</Relationships>"
)


def gerar_docx(doc, caminho, titulo=None):
    f = FORMATOS[doc["perfil"]]
    cab = doc.get("cabecalho")
    titulo = titulo or next((b["texto"] for b in doc["blocos"] if b["k"] == "titulo"), "Documento")
    quando = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    tipos = (TIPOS_CONTEUDO
             + '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>\n'
             + ('<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>\n' if cab else "")
             + "</Types>")
    rels = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>\n'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>\n'
            + ('<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>\n' if cab else "")
            + "</Relationships>")
    core = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
            '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
            'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" '
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n'
            f"<dc:title>{xml(titulo)}</dc:title><dc:creator>juridico-pt</dc:creator>\n"
            f'<dcterms:created xsi:type="dcterms:W3CDTF">{quando}</dcterms:created>'
            f'<dcterms:modified xsi:type="dcterms:W3CDTF">{quando}</dcterms:modified>\n'
            "</cp:coreProperties>")
    with zipfile.ZipFile(caminho, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", tipos)
        z.writestr("_rels/.rels", RELS)
        z.writestr("docProps/core.xml", core)
        z.writestr("word/document.xml", documento_xml(doc))
        z.writestr("word/styles.xml", _estilos(f))
        z.writestr("word/footer1.xml", _rodape(f, doc.get("rodape")))
        z.writestr("word/_rels/document.xml.rels", rels)
        if cab:
            z.writestr("word/header1.xml", _cabecalho(cab))


def main(argv=None):
    parser = argparse.ArgumentParser(description="Gera o .docx forense de um documento em Marcação Redator.")
    parser.add_argument("entrada", help="Ficheiro de texto em Marcação Redator (1.ª linha @@PERFIL:)")
    parser.add_argument("saida", help='Ficheiro .docx a criar ("AAAA-MM-DD - Tipo - Parte.docx")')
    a = parser.parse_args(argv)
    with open(a.entrada, encoding="utf-8") as fh:
        texto = fh.read().lstrip("﻿")
    doc, residuos, erros = analisar_marcacao(texto.lstrip())
    if residuos:
        print("Não gerei o ficheiro: o texto ainda tem marcas internas que não podem chegar ao documento.")
        for r in residuos:
            print(f"L{r['linha']} {r['tipo']}: {r['trecho']}")
        return 2
    if doc is None:
        print("Marcação Redator inválida:")
        for e in erros:
            print(f"L{e['linha']} {e['msg']}")
        return 1
    gerar_docx(doc, a.saida)
    marcadores = marcadores_de(doc)
    print(f"OK -> {a.saida}")
    if marcadores:
        print(f"Marcadores por preencher ({len(marcadores)}):")
        for m in marcadores:
            print(f"- {m['texto']} -> {m['onde']}")
    print("AVISO: Este documento precisa da sua revisão antes de ser assinado, enviado ou apresentado em juízo.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
