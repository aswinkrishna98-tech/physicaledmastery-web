# PE Prep (physicaledmastery.com)

Single-page React app (precompiled to `app.bundle.js`) for Physical Education exam preparation.

    npm run bundle   # compile the .jsx/.js sources into app.bundle.js
    npm run build    # python3 build.py -> index.html + dist/ (what Render publishes)
    npm test         # scoring / data tests

Payments, accounts and the email list live in the separate `pe-prep` backend repo.

## Adding previous-year papers (PYQs)

Nothing is fabricated: a paper appears only when you add its real questions. A paper has two parts.

**1. Questions** (in a `data-pyq-N.js` file that is listed in `build.py`'s `data_files` and `tests/scoring.test.js`):

    {
      id: "net-2013-jun-q01",           // unique, stable
      exam: ["UGC NET"],                 // exam tag, must match EXAM_CONFIG[...].tag
      subject: "Sports Training",
      topic: "Warm-up",
      difficulty: "Moderate", type: "MCQ", // difficulty values used in the bank: Easy | Moderate | Hard | Expert
      year: 2013, paperNo: 1,            // paperNo = question number in the paper
      question: "...",
      options: ["A text", "B text", "C text", "D text"],
      correctIndex: 1,                   // 0-3, from the OFFICIAL key if one exists
      explanation: "...",
      source: "UGC NET Paper II, June 2013",
      tags: ["past-paper", "provisional-key"]   // use "official-key" when keyed by the published key
    }

Use a helper like `pqn(...)` in `data-pyq-6.js` to generate these from compact rows.

**2. Registry entry** in `data-pyq-4.js` (`OFFICIAL_PAPERS`):

    {
      id: "net-2013-jun", examId: "ugc-net", examTag: "UGC NET",
      keyType: "official",               // "official" only if you followed a published final key; else "provisional"
      title: "UGC NET Paper II - June 2013",
      short: "UGC NET Jun 2013",
      year: 2013, shift: "Morning",      // shift is optional; leave out when the exam has none
      code: "Booklet code ...", originalQuestions: 50, scope: "Paper II, Q1-50",
      note: "Anything a candidate should know: cancelled questions, missing key, etc.",
      questions: [...]                   // the questions from step 1
    }

Counts (`included`, totals on the page) are computed from `questions`, never typed.
Answers you worked out yourself must stay `provisional`.

## SEO pages

Exam, subject and topic guides are real static HTML (with a no-login sample quiz, FAQ and JSON-LD),
rendered by `build.py` through `seo_pages.py` from `seo-data.json`. After changing the question bank, exams
or papers run:

    npm run seo-data   # regenerate seo-data.json from the data files (commit it)
    npm run build

`/sitemap.xml` is generated with the pages. The single-page app keeps its `#/` routes, so old links and
the Android app keep working. Set `PLAUSIBLE_DOMAIN` (and optionally `PLAUSIBLE_SRC`) or
`UMAMI_WEBSITE_ID` + `UMAMI_SRC` in the Render build environment to switch on cookie-free analytics.

## Growth hooks

- **Email capture**: `NotifyMeForm` posts to `POST /api/subscribe` (backend repo). Topics: `alerts`, `exam:<id>`. Admin-only list: `GET /api/subscribe`.
- **Channel links** (header, footer, static pages): set `WHATSAPP_CHANNEL_URL` and/or `TELEGRAM_CHANNEL_URL` (https links) in the Render build environment. Nothing shows when they are unset.
- **Referrals (stub)**: `?ref=CODE` in any link, or the optional signup field, is saved in the browser (`pep_ref`) and sent along with email sign-ups. There is no reward logic yet; to add it, store the code against the new account in the backend and credit the referrer after their first paid purchase.
- **Updates** (`/updates/`): add a Markdown file to `updates/` (copy `updates/_TEMPLATE.md`; front matter needs `title` and `date`), then build. Files starting with `_` are never published, and the index stays `noindex` until the first post exists.
- **Analytics**: set `PLAUSIBLE_DOMAIN` (or `UMAMI_WEBSITE_ID` + `UMAMI_SRC`) in the build environment. No cookies. Events sent: `start_free_test`, `complete_test`, `view_pricing`, `click_buy`, `purchase_success`, plus `start_sample_quiz`, `complete_sample_quiz`, `notify_signup`, `start_daily_challenge`, `complete_daily_challenge`, `share_challenge_result`, `click_channel`.
