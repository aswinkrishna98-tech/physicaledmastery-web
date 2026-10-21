import hashlib
import json
import os
import sys

BASE = os.path.dirname(os.path.abspath(__file__))

def read(name):
    with open(os.path.join(BASE, name), "r", encoding="utf-8") as f:
        return f.read()

styles = read("styles.css")

data_files = ["data-questions.js", "data-content.js", "data-school.js", "data-exam-config.js"]
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
<link rel="canonical" href="{SITE}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Physical Ed Mastery">
<meta property="og:title" content="Physical Ed Mastery - Physical Education Exam Preparation">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{SITE}">
<meta name="twitter:card" content="summary">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
{styles}
</style>
</head>
<body>
<div id="root"></div>
<noscript>Physical Ed Mastery needs JavaScript enabled. It is a practice platform for Physical Education exams (KVS, NVS, DSSSB, UGC NET, SET and more).</noscript>

<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
{babel_tag}

{scripts_html}
</body>
</html>
"""

out_path = os.path.join(BASE, "index.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Wrote", out_path, "-", len(html), "bytes")
