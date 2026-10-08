# Regenerates the 1200x630 share-preview cards in assets/og/ from each page's <title> and description.
# Run from the repo root: python3 tools/make-og-cards.py  (needs Python Playwright + Chromium)
# Fonts are embedded as data URIs: loading them from file:// paths is blocked, and the page silently
# falls back to a serif. The width check below fails loudly if that ever happens again.
import html, re, os
from playwright.sync_api import sync_playwright
ROOT=os.getcwd()
def meta(path):
    s=open(path).read()
    t=re.search(r'<title>([^<]*)',s).group(1)
    d=re.search(r'<meta name="description" content="([^"]*)',s).group(1)
    return html.unescape(t), html.unescape(d)
pages=[("index.html","home","Projects"),("aisce/index.html","aisce",None),("local-kb/index.html","local-kb",None),
       ("runtime-detection/index.html","runtime-detection",None),("workflow-automation/index.html","workflow-automation",None),("cv/index.html","cv","Curriculum Vitae")]
tpl='''<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Plex;src:url(data:font/woff2;base64,{f_reg})}}
@font-face{{font-family:Plex;font-weight:700;src:url(data:font/woff2;base64,{f_bold})}}
@font-face{{font-family:PlexMono;src:url(data:font/woff2;base64,{f_mono})}}
html,body{{margin:0}} body{{width:1200px;height:630px;background:#0d1117;color:#e6edf3;font-family:Plex;box-sizing:border-box;padding:64px 72px;display:flex;flex-direction:column}}
.b{{width:760px}} h1{{font-weight:700;font-size:62px;line-height:1.08;margin:56px 0 22px}} p{{font-size:27px;line-height:1.4;color:#9198a1;margin:0;max-width:1000px}}
.u{{margin-top:auto;font-family:PlexMono;font-size:22px;color:#4493f8}}
</style></head><body><img class="b" src="file://{root}/assets/banner-dark.svg"><h1>{title}</h1><p>{desc}</p><div class="u">{url}</div></body></html>'''
import base64
F={k:base64.b64encode(open(f'assets/fonts/{n}','rb').read()).decode() for k,n in [('reg','IBMPlexSans-Regular.woff2'),('bold','IBMPlexSans-Bold.woff2'),('mono','IBMPlexMono-Regular.woff2')]}
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":1200,"height":630})
    for path,slug,override in pages:
        t,d=meta(path); title=override or t.split(" — ")[0]
        if len(d)>150: d=d[:d.rfind(" ",0,150)]+"…"
        url="luispsalas.github.io/portfolio/"+("" if slug=="home" else slug+"/")
        open("/tmp/og.html","w").write(tpl.format(root=ROOT,f_reg=F['reg'],f_bold=F['bold'],f_mono=F['mono'],title=html.escape(title),desc=html.escape(d),url=url))
        pg.goto("file:///tmp/og.html"); pg.evaluate("document.fonts.ready.then(()=>true)")
        ok=pg.evaluate("[document.fonts.check('700 62px Plex'), document.fonts.check('27px Plex'), document.fonts.check('22px PlexMono')]")
        assert all(ok), ("fonts not loaded", ok)
        # positive control: rendered width must differ from the serif fallback, or the font did not apply
        w=pg.evaluate("(()=>{const c=document.createElement('canvas').getContext('2d'); const t='Governed Runtime Detection'; c.font='700 62px Plex'; const a=c.measureText(t).width; c.font='700 62px serif'; const b=c.measureText(t).width; return [a,b]})()")
        assert abs(w[0]-w[1])>5, ('Plex did not apply; widths equal', w)
        pg.screenshot(path=f"assets/og/{slug}.png"); print(slug, title)
    b.close()
os.remove("/tmp/og.html")
