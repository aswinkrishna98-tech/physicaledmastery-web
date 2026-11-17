import hashlib
import json
import os
import sys

BASE = os.path.dirname(os.path.abspath(__file__))

def read(name):
    with open(os.path.join(BASE, name), "r", encoding="utf-8") as f:
        return f.read()

styles = read("styles.css")

data_files = ["data-questions.js", "data-content.js", "data-school.js", "data-exam-config.js", "data-i18n.js", "data-pyq.js", "data-pyq-2.js", "data-pyq-3.js", "data-pyq-5.js", "data-pyq-6.js", "data-pyq-4.js"]
app_files = [
    "app-01-core.jsx",
    "app-02-shell.jsx",
    "app-03-charts.jsx",
    "app-04-home.jsx",
    "app-05-exams-subjects.jsx",
    "app-06-question-bank.jsx",
    "app-07-test-engine.jsx",
    "app-08-mock.jsx",
    "app-09-dashboard.jsx",
    "app-10-revision.jsx",
    "app-11-remaining.jsx",
    "app-12-school.jsx",
    "app-14-auth.jsx",
    "app-13-root.jsx",
]
sources = data_files + app_files

if "--list-sources" in sys.argv:
    print(json.dumps({"sources": sources}))
    sys.exit(0)

def source_hash():
    h = hashlib.sha256()
    for name in sources:
        h.update((name + "\0" + read(name) + "\0").encode("utf-8"))
    return h.hexdigest()

# Use the precompiled bundle ONLY when it was built from exactly these
# sources (see scripts/compile-bundle.js). Otherwise fall back to compiling
# in the browser with Babel, which is slower but always correct.
use_bundle = False
bundle_path = os.path.join(BASE, "app.bundle.js")
if os.path.exists(bundle_path):
    with open(bundle_path, "r", encoding="utf-8") as f:
        first = f.readline().strip()
    use_bundle = first == "/* src-hash:%s */" % source_hash()

# With the precompiled bundle every script is deferred (parallel download, no render blocking).
# The in-browser-Babel fallback needs React loaded before its inline scripts, so it stays synchronous.
DEFER = " defer" if use_bundle else ""
if use_bundle:
    babel_tag = ""
    scripts_html = '<script src="app.bundle.js" defer></script>'
    print("Using precompiled app.bundle.js")
else:
    babel_tag = '<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>'
    blocks = []
    for name in sources:
        blocks.append('<script type="text/babel" data-presets="react">\n%s\n</script>' % read(name))
    scripts_html = "\n\n".join(blocks)
    print("Bundle missing or stale - using in-browser Babel")

# Real reviews live in testimonials.json (starts empty; the site renders nothing
# for an empty list). They are inlined here so no extra request is needed.
with open(os.path.join(BASE, "testimonials.json"), "r", encoding="utf-8") as f:
    TESTIMONIALS_JSON = json.dumps(json.load(f)).replace("</", "<\\/")

import seo_pages
with open(os.path.join(BASE, "seo-data.json"), "r", encoding="utf-8") as f:
    SEO_DATA = json.load(f)
HOME_FALLBACK = seo_pages.home_fallback(SEO_DATA)
HOME_LD = "".join(seo_pages.jld(x) for x in seo_pages.website_ld())
ANALYTICS = seo_pages.analytics_tag()
# Community channel links are configured with environment variables at build time (set on Render):
#   WHATSAPP_CHANNEL_URL, TELEGRAM_CHANNEL_URL  (https:// links). Empty = no link is shown.
PE_CONFIG_JSON = json.dumps({l.lower(): u for l, u in seo_pages.channel_links()}).replace("</", "<\\/")

SITE = "https://physicaledmastery.com/"
DESC = "Physical Education exam preparation for KVS, NVS, DSSSB, UGC NET, SET, State PSC, B.P.Ed and M.P.Ed: topic-wise practice, timed mock tests with detailed explanations, and performance tracking."

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Physical Ed Mastery - Physical Education Exam Preparation</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#0B1F3A">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" type="image/png" href="/icons/icon-192.png">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
<link rel="canonical" href="{SITE}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Physical Ed Mastery">
<meta property="og:title" content="Physical Ed Mastery - Physical Education Exam Preparation">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{SITE}">
<meta property="og:image" content="{SITE}og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Physical Ed Mastery - Physical Education Exam Preparation">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="{SITE}og-image.png">
{HOME_LD}
{ANALYTICS}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"></noscript>
<style>
{styles}
</style>
</head>
<body>
<div id="root">{HOME_FALLBACK}</div>
<noscript><p style="max-width:860px;margin:0 auto;padding:0 18px">The interactive practice app needs JavaScript. The exam guides and free sample quizzes above and at <a href="/exams/">/exams/</a> work without it.</p></noscript>

<script{DEFER} src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script{DEFER} src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script>window.TESTIMONIALS = {TESTIMONIALS_JSON}; window.PE_CONFIG = {PE_CONFIG_JSON};</script>
{babel_tag}

{scripts_html}
<script>if("serviceWorker" in navigator){{window.addEventListener("load",function(){{navigator.serviceWorker.register("/sw.js").catch(function(){{}});}});}}</script>
</body>
</html>
"""

out_path = os.path.join(BASE, "index.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Wrote", out_path, "-", len(html), "bytes")

# Public output: only these files are meant to be served. Render's static site
# publishes the "dist" folder, so build scripts, sources and internal notes in the
# repo root are not downloadable.
import shutil
DIST = os.path.join(BASE, "dist")
if os.path.isdir(DIST):
    shutil.rmtree(DIST)
os.makedirs(DIST)
for name in ["index.html", "app.bundle.js", "robots.txt", "sitemap.xml", "manifest.webmanifest", "sw.js", "static.css", "quiz.js", "og-image.png"]:
    src = os.path.join(BASE, name)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(DIST, name))
# PWA / Play Store support: icons and the Digital Asset Links file that ties
# the Android app to this domain (written once the app's signing fingerprint is known).
for folder in ["icons", ".well-known"]:
    src = os.path.join(BASE, folder)
    if os.path.isdir(src):
        shutil.copytree(src, os.path.join(DIST, folder))
print("Wrote dist/:", ", ".join(sorted(os.listdir(DIST))))

# Static, crawlable pages (exam / subject / topic guides) + sitemap.xml, rendered from seo-data.json
n_pages, _ = seo_pages.render_all(DIST, os.path.join(BASE, "seo-data.json"))
print("Wrote", n_pages, "static SEO pages + sitemap.xml")
