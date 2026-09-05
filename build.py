import os

BASE = os.path.dirname(os.path.abspath(__file__))

def read(name):
    with open(os.path.join(BASE, name), "r", encoding="utf-8") as f:
        return f.read()

styles = read("styles.css")

data_files = ["data-questions.js", "data-content.js", "data-school.js"]
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
    "app-13-root.jsx",
]

script_blocks = []
for name in data_files + app_files:
    content = read(name)
    script_blocks.append(f'<script type="text/babel" data-presets="react">\n{content}\n</script>')

scripts_html = "\n\n".join(script_blocks)

html = f"""<title>PE Prep</title>
<meta name="description" content="India's dedicated preparation platform for Physical Education examinations.">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
{styles}
</style>

<div id="root"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

{scripts_html}
"""

out_path = os.path.join(BASE, "index.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Wrote", out_path, "-", len(html), "bytes")
