"""Renders the static, crawlable SEO pages (exam / subject / topic / index pages),
the sitemap and the homepage's server-rendered fallback from seo-data.json.
build.py calls render_all(dist, site). Nothing here is typed by hand: counts,
topics, concepts and questions all come from the real data (see
scripts/export-seo-data.js)."""
import html, json, os

SITE = "https://physicaledmastery.com"
BRAND = "PE Prep"
OG_IMAGE = SITE + "/og-image.png"
CAVEAT = ("Exam patterns change between recruitment cycles. Treat this as a guide and confirm the "
          "details in the current official notification before you plan your preparation.")

def esc(s): return html.escape(str(s), quote=True)
def jld(obj): return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False).replace("</", "<\\/") + "</script>"
def letter(i): return "ABCDEFGH"[i]

def analytics_tag():
    """Cookie-free analytics (Plausible or Umami), enabled only when configured via environment variables."""
    dom = os.environ.get("PLAUSIBLE_DOMAIN")
    if dom:
        src = os.environ.get("PLAUSIBLE_SRC", "https://plausible.io/js/script.tag-events.js")
        return '<script defer data-domain="%s" src="%s"></script>' % (esc(dom), esc(src))
    uid, usrc = os.environ.get("UMAMI_WEBSITE_ID"), os.environ.get("UMAMI_SRC")
    if uid and usrc:
        return '<script defer src="%s" data-website-id="%s"></script>' % (esc(usrc), esc(uid))
    return ""

def head(title, desc, path, extra_ld=()):
    url = SITE + path
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="theme-color" content="#0B1F3A">
<link rel="canonical" href="{url}">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" type="image/png" href="/icons/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{BRAND}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{OG_IMAGE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{OG_IMAGE}">
<link rel="stylesheet" href="/static.css">
{''.join(jld(x) for x in extra_ld)}
{analytics_tag()}
</head>
<body>
<header class="site-h"><div class="wrap">
<a class="logo" href="/"><span class="mark">PE</span> {BRAND}</a>
<nav aria-label="Main"><a href="/exams/">Exams</a><a href="/subjects/">Subjects</a><a href="/#/previous-papers">Past papers</a><a href="/#/pricing">Pricing</a>{''.join(f'<a href="{esc(u)}" rel="noopener">{l}</a>' for l, u in channel_links())}<a class="cta-sm" href="/#/mock-tests">Free mock test</a></nav>
</div></header>
<main class="wrap">
"""

def foot(data):
    ex = "".join(f'<a href="/{e["slug"]}/">{esc(e["short"])}</a>' for e in data["exams"])
    return f"""</main>
<footer class="site-f"><div class="wrap">
<p><b>{BRAND}</b> — exam preparation for Physical Education aspirants. Practice questions, mock tests and past papers.</p>
<p class="links">{ex}</p>
<p class="links">{''.join(f'<a href="{esc(u)}" rel="noopener">{l} channel</a>' for l, u in channel_links())}<a href="/updates/">Updates</a><a href="/#/about">About</a><a href="/#/contact">Contact</a><a href="/#/terms">Terms</a><a href="/#/privacy">Privacy</a><a href="/#/refund-policy">Refund policy</a></p>
</div></footer>
<script src="/quiz.js" defer></script>
</body></html>
"""

def crumbs(items):
    """items: [(label, path)], last one is the current page."""
    ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + p} for i, (n, p) in enumerate(items)]}
    h = '<nav class="crumbs" aria-label="Breadcrumb">' + " › ".join(
        (f'<a href="{p}">{esc(n)}</a>' if i < len(items) - 1 else f"<span>{esc(n)}</span>") for i, (n, p) in enumerate(items)) + "</nav>"
    return h, ld

def quiz_html(qids, data, title="Free sample quiz"):
    qs = [data["questions"][i] for i in qids if i in data["questions"]]
    if not qs: return ""
    out = [f'<section class="quiz" id="quiz" data-total="{len(qs)}"><h2>{esc(title)}</h2>',
           f'<p class="muted">{len(qs)} questions, no login needed. Pick an option to see the answer and explanation.</p><ol class="qs">']
    for n, q in enumerate(qs):
        opts = "".join(
            f'<li><label><input type="radio" name="q{n}" value="{j}"> <span><b>{letter(j)}.</b> {esc(o)}</span></label></li>'
            for j, o in enumerate(q["o"]))
        out.append(
            f'<li class="qz" data-c="{q["c"]}"><p class="qt">{esc(q["q"])}</p><ul class="opts">{opts}</ul>'
            f'<details><summary>Answer and explanation</summary><p><b>Answer: {letter(q["c"])}. {esc(q["o"][q["c"]])}</b></p><p>{esc(q["e"])}</p></details></li>')
    out.append('</ol><div class="score" id="score" hidden></div></section>')
    return "".join(out)

def faq_html(faqs):
    h = '<section><h2>Frequently asked questions</h2>' + "".join(
        f'<details class="faq"><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q, a in faqs) + "</section>"
    ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]}
    return h, ld

def exam_page(e, data):
    path = f"/{e['slug']}/"
    cr, cr_ld = crumbs([("Home", "/"), ("Exams", "/exams/"), (e["short"], path)])
    n = e["count"]
    intro = (f"PE Prep currently has {n} practice questions tagged for {e['short']}, with explanations, plus timed mock tests and past papers where available."
             if n else f"The {e['short']} question set is still being built. You can browse the general Physical Education bank in the meantime.")
    subj = "".join(f'<li><a href="/subjects/{s["slug"]}/">{esc(s["name"])}</a> — {s["n"]} question{"s" if s["n"] != 1 else ""}</li>' for s in e["subjects"])
    papers = ""
    if e["papers"]:
        rows = "".join(f'<li>{esc(p["title"])} — {p["included"]} questions, {"official key" if p["keyType"] == "official" else "provisional key"}</li>' for p in e["papers"])
        papers = f'<section><h2>Previous-year papers</h2><ul>{rows}</ul><p><a class="btn" href="/#/previous-papers">Attempt past papers online</a></p><p class="muted">Papers marked provisional use answers we worked out ourselves where no official key was available.</p></section>'
    if e["passAvailable"]:
        passq = f"A single-exam {e['short']} Pass costs ₹{data['passPrice']} one-time and unlocks unlimited mock tests and full result analysis for this exam. The first full mock test is free."
        cta = f'<a class="btn" href="/#/mock-tests">Take the free mock test</a> <a class="btn ghost" href="/#/pricing">See the {esc(e["short"])} Pass</a>'
    else:
        passq = f"A single-exam {e['short']} Pass is launching soon, once the question set reaches {data['minForPass']} questions. Pro unlocks every exam today, and the first full mock test is free."
        cta = '<a class="btn" href="/#/mock-tests">Take the free mock test</a> <a class="btn ghost" href="/#/pricing">Get launch alerts</a>'
    faqs = [
        (f"What is the {e['short']} exam pattern?", (e["patternNote"] or "The pattern varies; check the official notification.") + " " + CAVEAT),
        (f"Is there a free way to practise for {e['short']}?", f"Yes. The sample quiz on this page needs no login, and your first full mock test on PE Prep is free. {passq}"),
        (f"How many {e['short']} questions does PE Prep have?", f"{n} practice questions are tagged for {e['short']} right now. The number is read live from the question bank and grows as more are added."),
        ("Are the answers official?", "Practice questions are written by the PE Prep team from standard syllabi and textbooks. Past papers are labelled \"Official key\" or \"Provisional key\" so you can tell which answers come from a published key."),
    ]
    fh, fld = faq_html(faqs)
    title = f"{e['short']} Preparation: Syllabus, Exam Pattern and Free Practice Questions | {BRAND}"
    desc = f"{e['name']} ({e['body']}): typical syllabus areas, exam pattern notes and a free 10-question sample quiz. {n} tagged practice questions."[:158]
    course = {"@context": "https://schema.org", "@type": "Course", "name": f"{e['name']} preparation",
              "description": desc, "provider": {"@type": "Organization", "name": BRAND, "sameAs": SITE}}
    body = f"""{cr}
<h1>{esc(e['name'])} Preparation</h1>
<p class="lede">{esc(intro)}</p>
<p>{cta}</p>
<section><h2>{esc(e['short'])} syllabus: typical subject areas</h2>
<ul class="cols">{''.join(f'<li>{esc(s)}</li>' for s in e['syllabus'])}</ul>
<p class="muted">These are typical subject areas, not the official syllabus. {esc(CAVEAT)}</p>
{('<h3>Covered by our question bank</h3><ul>' + subj + '</ul>') if subj else ''}
</section>
<section><h2>{esc(e['short'])} exam pattern</h2>
<p>{esc(e['patternNote'] or 'The pattern varies by recruitment cycle.')}</p>
<p class="muted">{esc(CAVEAT)} Conducting body: {esc(e['body'])}.</p></section>
{quiz_html(e['sample'], data, f"Free {e['short']} sample quiz")}
{papers}
<section><h2>How to prepare</h2><ol>
<li>Learn each syllabus area from your textbooks and the <a href="/#/study-material">study material</a>.</li>
<li>Practise topic by topic in the <a href="/#/question-bank">question bank</a>, reading every explanation.</li>
<li>Attempt a timed <a href="/#/mock-tests">mock test</a> and review the result by subject.</li>
<li>Revise your <a href="/#/my-mistakes">wrong answers</a> and use <a href="/#/flashcards">flashcards</a> for facts you forget.</li></ol></section>
{fh}
<section class="cta-box"><h2>Ready to start?</h2><p>{cta}</p></section>
"""
    return path, head(title, desc, path, [cr_ld, fld, course]) + body + foot(data)

def concept_html(concepts):
    if not concepts: return ""
    items = []
    for c in concepts:
        pts = "".join(f"<li>{esc(p)}</li>" for p in c["points"])
        trick = f'<p class="muted"><b>Memory aid:</b> {esc(c["trick"])}</p>' if c["trick"] else ""
        items.append(f'<article class="concept"><h3>{esc(c["title"])}</h3><p>{esc(c["definition"])}</p><ul>{pts}</ul>{trick}</article>')
    return '<section><h2>Key concepts</h2>' + "".join(items) + "</section>"

def subject_page(s, data):
    path = f"/subjects/{s['slug']}/"
    cr, cr_ld = crumbs([("Home", "/"), ("Subjects", "/subjects/"), (s["name"], path)])
    tl = ""
    for t in s["topics"]:
        name = esc(t["name"])
        link = f'<a href="/topics/{s["slug"]}/{t["slug"]}/">{name}</a>' if t["n"] >= 3 else name
        tl += f'<li>{link} — {t["n"]}</li>'
    exl = ", ".join(f'{esc(x["tag"])} ({x["n"]})' for x in s["exams"])
    faqs = [(f"How many {s['name']} practice questions are there?", f"{s['n']} practice questions on PE Prep, each with an explanation. The number is read live from the question bank."),
            (f"Which exams include {s['name']}?", f"Our {s['name']} questions are tagged for: {', '.join(x['tag'] for x in s['exams'])}. Check each exam's official syllabus for what it actually covers.")]
    fh, fld = faq_html(faqs)
    title = f"{s['name']} Practice Questions and Key Concepts for PE Exams | {BRAND}"
    desc = f"{s['n']} {s['name']} practice questions with explanations for KVS, UGC NET, SET and other Physical Education exams. Free sample quiz."[:158]
    body = f"""{cr}
<h1>{esc(s['name'])}: Practice Questions and Key Concepts</h1>
<p class="lede">{s['n']} practice questions with explanations, used in Physical Education exam preparation. Tagged for: {exl}.</p>
<p><a class="btn" href="/#/question-bank">Practise all {esc(s['name'])} questions</a></p>
<section><h2>Topics</h2><ul>{tl}</ul></section>
{quiz_html(s['sample'], data, f"Free {s['name']} sample quiz")}
{concept_html(s['concepts'])}
{fh}
"""
    return path, head(title, desc, path, [cr_ld, fld]) + body + foot(data)

def topic_page(t, data):
    path = f"/topics/{t['subjectSlug']}/{t['slug']}/"
    cr, cr_ld = crumbs([("Home", "/"), ("Subjects", "/subjects/"), (t["subject"], f"/subjects/{t['subjectSlug']}/"), (t["name"], path)])
    title = f"{t['name']} ({t['subject']}): Practice Questions and Notes | {BRAND}"
    desc = f"{t['n']} practice questions on {t['name']} in {t['subject']}, with explanations and key concepts, for Physical Education exams."[:158]
    body = f"""{cr}
<h1>{esc(t['name'])}: Practice Questions and Notes</h1>
<p class="lede">{t['n']} questions on {esc(t['name'])} from the {esc(t['subject'])} syllabus, each with an explanation.</p>
<p><a class="btn" href="/subjects/{t['subjectSlug']}/">All {esc(t['subject'])} questions</a> <a class="btn ghost" href="/#/question-bank">Practise in the app</a></p>
{quiz_html(t['sample'], data, f"{t['name']} quiz")}
{concept_html(t['concepts'])}
"""
    return path, head(title, desc, path, [cr_ld]) + body + foot(data)

def exams_index(data):
    path = "/exams/"
    cr, cr_ld = crumbs([("Home", "/"), ("Exams", path)])
    cards = "".join(f'<li><a href="/{e["slug"]}/"><b>{esc(e["name"])}</b></a> — {esc(e["body"])}. {e["count"]} tagged practice questions.</li>' for e in data["exams"])
    title = f"Physical Education Exams in India: KVS, UGC NET, NVS, DSSSB, SET and More | {BRAND}"
    desc = "Guides to every major Physical Education recruitment and eligibility exam in India, with syllabus areas, pattern notes and free sample quizzes."
    body = f"{cr}<h1>Physical Education exams</h1><p class=\"lede\">Pick your exam for syllabus areas, pattern notes and a free sample quiz.</p><ul class=\"list\">{cards}</ul>"
    return path, head(title, desc, path, [cr_ld]) + body + foot(data)

def subjects_index(data):
    path = "/subjects/"
    cr, cr_ld = crumbs([("Home", "/"), ("Subjects", path)])
    items = "".join(f'<li><a href="/subjects/{s["slug"]}/">{esc(s["name"])}</a> — {s["n"]} questions</li>' for s in data["subjects"])
    title = f"Physical Education Subjects: Practice Questions by Subject | {BRAND}"
    desc = "Subject-wise Physical Education practice questions: anatomy, physiology, sports training, psychology, yoga, rules and more."
    body = f"{cr}<h1>Physical Education subjects</h1><p class=\"lede\">Subject-wise practice questions with explanations.</p><ul class=\"list\">{items}</ul>"
    return path, head(title, desc, path, [cr_ld]) + body + foot(data)

# ---------------- Updates (Markdown posts) ----------------
import re

def _inline(t):
    t = esc(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<em>\1</em>", t)
    t = re.sub(r"`(.+?)`", r"<code>\1</code>", t)
    def link(m):
        url = html.unescape(m.group(2))
        if not re.match(r"^(https?://|/|#)", url): return m.group(0)
        return f'<a href="{esc(url)}" rel="noopener">{m.group(1)}</a>'
    return re.sub(r"\[(.+?)\]\((.+?)\)", link, t)

def markdown_to_html(md):
    out, para, items = [], [], []
    def flush_p():
        if para: out.append("<p>" + _inline(" ".join(para)) + "</p>"); para.clear()
    def flush_l():
        if items: out.append("<ul>" + "".join(f"<li>{_inline(i)}</li>" for i in items) + "</ul>"); items.clear()
    for line in md.splitlines():
        if not line.strip(): flush_p(); flush_l(); continue
        m = re.match(r"^(#{2,3})\s+(.*)", line)
        if m:
            flush_p(); flush_l(); lvl = len(m.group(1)); out.append(f"<h{lvl}>{_inline(m.group(2))}</h{lvl}>"); continue
        if re.match(r"^[-*]\s+", line): flush_p(); items.append(re.sub(r"^[-*]\s+", "", line)); continue
        flush_l(); para.append(line.strip())
    flush_p(); flush_l()
    return "\n".join(out)

def load_updates(folder):
    posts = []
    if not os.path.isdir(folder): return posts
    for fn in sorted(os.listdir(folder)):
        if not fn.endswith(".md") or fn.startswith("_"): continue
        raw = open(os.path.join(folder, fn), encoding="utf-8").read()
        meta, body = {}, raw
        m = re.match(r"^---\n(.*?)\n---\n(.*)$", raw, re.S)
        if m:
            for l in m.group(1).splitlines():
                if ":" in l: k, v = l.split(":", 1); meta[k.strip()] = v.strip()
            body = m.group(2)
        if not meta.get("title") or not meta.get("date"): continue  # incomplete posts are never published
        posts.append({"slug": fn[:-3], "title": meta["title"], "date": meta["date"], "category": meta.get("category", "Update"),
                      "summary": meta.get("summary", ""), "body": markdown_to_html(body)})
    posts.sort(key=lambda x: x["date"], reverse=True)
    return posts

def updates_pages(posts, data):
    pages = []
    items = "".join(f'<li><a href="/updates/{p["slug"]}/"><b>{esc(p["title"])}</b></a> <span class="muted">· {esc(p["date"])} · {esc(p["category"])}</span><br>{esc(p["summary"])}</li>' for p in posts)
    cr, cr_ld = crumbs([("Home", "/"), ("Updates", "/updates/")])
    body = f'{cr}<h1>Exam updates</h1><p class="lede">Notifications, dates and current-affairs notes for Physical Education aspirants.</p>' + (f'<ul class="list">{items}</ul>' if posts else '<p>No updates have been published yet.</p>')
    idx = head("Physical Education Exam Updates and Notifications | " + BRAND, "Exam notifications, key dates and current-affairs notes for Physical Education aspirants.", "/updates/", [cr_ld])
    if not posts: idx = idx.replace('<meta name="theme-color"', '<meta name="robots" content="noindex">\n<meta name="theme-color"', 1)
    pages.append(("/updates/", idx + body + foot(data)))
    for p in posts:
        path = f"/updates/{p['slug']}/"
        cr, cr_ld = crumbs([("Home", "/"), ("Updates", "/updates/"), (p["title"], path)])
        art = {"@context": "https://schema.org", "@type": "Article", "headline": p["title"], "datePublished": p["date"], "publisher": {"@type": "Organization", "name": BRAND}}
        pages.append((path, head(p["title"] + " | " + BRAND, p["summary"] or p["title"], path, [cr_ld, art]) +
                      f'{cr}<article><h1>{esc(p["title"])}</h1><p class="muted">{esc(p["date"])} · {esc(p["category"])}</p>{p["body"]}</article>' + foot(data)))
    return pages

def channel_links():
    out = []
    for env, label in (("WHATSAPP_CHANNEL_URL", "WhatsApp"), ("TELEGRAM_CHANNEL_URL", "Telegram")):
        u = os.environ.get(env, "").strip()
        if u.startswith("https://"): out.append((label, u))
    return out

def home_fallback(data):
    """Real text + links placed inside #root in index.html. React replaces it on load,
    so visitors see the app while crawlers and no-JS clients get actual content."""
    ex = "".join(f'<li><a href="/{e["slug"]}/">{esc(e["name"])}</a></li>' for e in data["exams"])
    return (f'<div class="ssr"><h1>Master Physical Education. Crack your exam.</h1>'
            f'<p>{BRAND} is an exam-preparation platform built only for Physical Education aspirants: {data["total"]} practice questions with explanations, '
            f'{data["papers"]} past papers, timed mock tests and performance tracking for KVS, NVS, DSSSB, UGC NET, SET, State PSC, B.P.Ed and M.P.Ed.</p>'
            f'<h2>Exams</h2><ul>{ex}</ul><p><a href="/subjects/">Browse by subject</a> · <a href="/exams/">All exams</a></p></div>')

def website_ld():
    return [{"@context": "https://schema.org", "@type": "WebSite", "name": BRAND, "url": SITE + "/"},
            {"@context": "https://schema.org", "@type": "Organization", "name": BRAND, "url": SITE + "/", "logo": SITE + "/icons/icon-512.png"}]

def render_all(dist, data_path):
    with open(data_path, encoding="utf-8") as f: data = json.load(f)
    pages = [exams_index(data), subjects_index(data)]
    pages += [exam_page(e, data) for e in data["exams"]]
    pages += [subject_page(s, data) for s in data["subjects"]]
    pages += [topic_page(t, data) for t in data["topics"]]
    posts = load_updates(os.path.join(os.path.dirname(os.path.abspath(data_path)), "updates"))
    pages += updates_pages(posts, data)
    for path, content in pages:
        d = os.path.join(dist, path.strip("/"))
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f: f.write(content)
    urls = ["/"] + [p for p, _ in pages if not (p == "/updates/" and not posts)]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        sm.append(f"  <url><loc>{SITE}{u}</loc><lastmod>{data['generated']}</lastmod></url>")
    sm.append("</urlset>")
    with open(os.path.join(dist, "sitemap.xml"), "w", encoding="utf-8") as f: f.write("\n".join(sm) + "\n")
    return len(pages), data
