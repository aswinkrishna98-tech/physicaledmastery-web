// Precompiles the JSX/JS sources into one plain-JS file (app.bundle.js) so
// visitors' browsers don't have to download and run Babel (~3 MB) on every
// page load. Run:  npm run bundle   (then commit app.bundle.js)
// build.py only uses the bundle if its source hash matches the current
// sources; otherwise it falls back to in-browser Babel, so a stale bundle can
// never ship by accident.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const babel = require("@babel/core");

const root = path.join(__dirname, "..");
const cfg = JSON.parse(require("child_process").execFileSync("python3", [path.join(root, "build.py"), "--list-sources"], { cwd: root }).toString());
let hash = crypto.createHash("sha256");
let out = "";
for (const f of cfg.sources) {
  const src = fs.readFileSync(path.join(root, f), "utf8");
  hash.update(f + "\0" + src + "\0");
  const { code } = babel.transformSync(src, { presets: [require.resolve("@babel/preset-react")], filename: f, compact: false, comments: false });
  out += `\n/* ---- ${f} ---- */\n${code}\n`;
}
const digest = hash.digest("hex");
fs.writeFileSync(path.join(root, "app.bundle.js"), `/* src-hash:${digest} */\n${out}`);
console.log("app.bundle.js written", out.length, "bytes, hash", digest.slice(0, 12));
