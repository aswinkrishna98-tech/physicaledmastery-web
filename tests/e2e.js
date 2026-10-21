// Browser end-to-end checks. Run:  node tests/e2e.js http://localhost:8765/
// Needs Playwright + a Chromium. (CDN React is vendored locally for the test.)
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "/opt/node-tools/node_modules/playwright");
const BASE = process.argv[2] || "http://localhost:8765/";
const results = [];
const check = (name, ok, detail = "") => { results.push({ name, ok: !!ok, detail }); console.log((ok ? "PASS " : "FAIL ") + name + (detail ? "  [" + detail + "]" : "")); };

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || "/opt/pw-browsers/chromium", args: ["--no-sandbox"] });
  const newPage = async (opts = {}) => {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...opts });
    const page = await ctx.newPage();
    page.errors = [];
    page.on("pageerror", (e) => page.errors.push("pageerror: " + e.message));
    page.on("console", (m) => { if (m.type() === "error" && !/fonts|favicon|ERR_|Failed to load resource/i.test(m.text())) page.errors.push(m.text()); });
    return page;
  };

  // ---- 1. Home: loads, honest claims, head tags ------------------------------
  let page = await newPage();
  await page.goto(BASE); await page.waitForSelector(".hero-stats", { timeout: 15000 });
  const body = await page.innerText("body");
  check("home renders without JS errors", page.errors.length === 0, page.errors.join(" | "));
  check("no fabricated '50,000+' / '12,400+' claims", !/50,000\+|12,400\+|thousands of aspirants/i.test(body));
  const bankSize = await page.evaluate(() => QUESTION_BANK.length);
  check("hero shows the real question count (" + bankSize + ")", body.includes(bankSize.toLocaleString()));
  check("viewport meta present", await page.evaluate(() => !!document.querySelector('meta[name=viewport]')));
  check("html lang + canonical + og:title", await page.evaluate(() => document.documentElement.lang === "en" && !!document.querySelector('link[rel=canonical]') && !!document.querySelector('meta[property="og:title"]')));
  check("title is branded, not 'PE Prep'", (await page.title()).startsWith("Physical Ed Mastery"));

  // ---- 2. Pricing honesty ---------------------------------------------------
  await page.goto(BASE + "#/pricing"); await page.waitForSelector("text=Simple, transparent plans");
  const pricing = await page.innerText("body");
  check("pricing shows one-time, not /month", /one-time/i.test(pricing) && !/\/month/.test(pricing));
  check("pricing does not promise unreleased AI coach/live courses as included", !/Exclusive live courses|Premium test series with rank prediction/.test(pricing));

  // ---- 3. Leaderboard has no invented people --------------------------------
  await page.goto(BASE + "#/leaderboard"); await page.waitForSelector("text=Your progress");
  const lb = await page.innerText("body");
  check("leaderboard shows no fake names", !/Rahul Menon|Anjali Sharma|Arjun Verma/.test(lb));

  // ---- 4. Mock test: setup honesty, scoring, timer auto-submit --------------
  await page.goto(BASE + "#/mock-test-setup"); await page.waitForSelector("text=Negative marking");
  const setupText = await page.innerText("body");
  check("setup page has a negative-marking selector (not hard-coded)", /No negative marking/.test(setupText) && /−0\.25 per wrong/.test(setupText));
  check("setup page says when exam scheme is unconfirmed", /isn't confirmed here|confirm in the official/i.test(setupText));

  await page.clock.install();
  await page.getByRole("button", { name: /^Quick/ }).click();
  await page.getByRole("button", { name: "−0.25 per wrong" }).click();
  await page.getByRole("button", { name: /Begin Mock Test/ }).click();
  await page.waitForSelector(".qtext");

  async function answerCurrent(correct) {
    const info = await page.evaluate(() => {
      const t = document.querySelector(".qtext").textContent;
      const q = QUESTION_BANK.find((x) => x.question === t);
      return { correctText: q.options[q.correctIndex], options: q.options };
    });
    const opts = await page.$$(".option");
    for (const o of opts) {
      const txt = (await o.innerText()).replace(/^[A-D]\s*/, "").trim();
      const isCorrect = txt === info.correctText.trim();
      if (isCorrect === correct) { await o.click(); return; }
    }
    throw new Error("option not found");
  }
  await answerCurrent(true);  await page.getByRole("button", { name: /Next/ }).click();
  await answerCurrent(false); await page.getByRole("button", { name: /Next/ }).click();
  // leave Q3 unanswered, move on
  await page.getByRole("button", { name: /Next/ }).click();
  // Let the countdown run out: Quick = 20 minutes
  await page.clock.runFor("20:05");
  await page.waitForSelector("text=Your Result", { timeout: 10000 });
  const res = await page.innerText("body");
  const m = res.match(/([-\d.]+)\s*\/\s*15/);
  check("timer expiry auto-submits and keeps the answers (expected 0.75 / 15)", m && Math.abs(parseFloat(m[1]) - 0.75) < 1e-9, m ? m[0] : "no score found");
  check("result reports attempted 2 of 15", /2 of 15 questions attempted/.test(res));
  check("no fabricated rank/percentile in result", !/Rank \(demo\)/.test(res));
  check("no JS errors through the mock flow", page.errors.length === 0, page.errors.join(" | "));

  // ---- 5. Manual submit with confirmation dialog, zero negative marking ------
  page = await newPage();
  await page.goto(BASE + "#/mock-test-setup"); await page.waitForSelector("text=Negative marking");
  await page.getByRole("button", { name: /^Quick/ }).click();
  await page.getByRole("button", { name: "No negative marking" }).click();
  await page.getByRole("button", { name: /Begin Mock Test/ }).click();
  await page.waitForSelector(".qtext");
  const opt = (await page.$$(".option"))[0];
  // keyboard: focus + Enter selects
  await opt.focus(); await page.keyboard.press("Enter");
  check("option is keyboard-selectable (Enter) and exposes aria-checked", await opt.getAttribute("aria-checked") === "true");
  check("options are in a radiogroup", !!(await page.$('[role=radiogroup]')));
  await page.getByRole("button", { name: "Submit Test" }).first().click();
  check("submit shows in-app confirmation dialog (not window.confirm)", await page.isVisible('[role=dialog]'));
  await page.getByRole("button", { name: "Submit now" }).click();
  await page.waitForSelector("text=Your Result");
  const r2 = await page.innerText("body");
  const m2 = r2.match(/([-\d.]+)\s*\/\s*15/);
  check("manual submit scores within [0,1] with no negative marking", m2 && parseFloat(m2[1]) >= 0 && parseFloat(m2[1]) <= 1, m2 && m2[0]);

  // ---- 6. Answer-position bias removed in test flows ------------------------
  page = await newPage();
  await page.goto(BASE + "#/mock-test-setup"); await page.waitForSelector("text=Negative marking");
  await page.getByRole("button", { name: /Full Length/ }).click();
  await page.getByRole("button", { name: /Begin Mock Test/ }).click(); await page.waitForSelector(".qtext");
  const positions = [0, 0, 0, 0]; let seen = 0;
  for (let i = 0; i < 40; i++) {
    const idx = await page.evaluate(() => {
      const t = document.querySelector(".qtext").textContent; const q = QUESTION_BANK.find((x) => x.question === t);
      const texts = [...document.querySelectorAll(".option")].map((o) => o.textContent.replace(/^[A-D]/, "").trim());
      return texts.indexOf(q.options[q.correctIndex].trim());
    });
    if (idx >= 0) { positions[idx]++; seen++; }
    const next = page.getByRole("button", { name: /^Next/ });
    if (await next.count()) await next.click(); else break;
  }
  check("correct answers are spread across positions (max slot < 60% of " + seen + ")", Math.max(...positions) / seen < 0.6, JSON.stringify(positions));

  // ---- 7. Mobile: no horizontal overflow ------------------------------------
  const mobile = await newPage({ viewport: { width: 375, height: 800 }, isMobile: true, hasTouch: true });
  for (const r of ["", "#/exams", "#/question-bank", "#/mock-tests", "#/mock-test-setup", "#/pricing", "#/dashboard", "#/previous-papers"]) {
    await mobile.goto(BASE + r); await mobile.waitForTimeout(700);
    const o = await mobile.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    check("mobile 375px no horizontal scroll at /" + r, o.sw <= o.cw + 1, o.sw + " vs " + o.cw);
  }

  await browser.close();
  const failed = results.filter((r) => !r.ok);
  console.log("\n" + (results.length - failed.length) + "/" + results.length + " passed");
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error("E2E crashed:", e); process.exit(2); });
