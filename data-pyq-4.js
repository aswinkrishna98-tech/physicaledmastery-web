// Past-paper registry. Built from the questions added in data-pyq*.js.
// Counts are computed, never typed, so the page can never overstate what is in the bank.
const OFFICIAL_PAPERS = [
  {
    id: "paper-a", keyType: "provisional", examId: "state-psc", examTag: "State PSC",
    title: "UP Higher — Physical Education Paper II (booklet 5322-C)",
    short: "UP Higher PE paper",
    year: null,
    code: "Booklet code 5322-C",
    originalQuestions: 150,
    scope: "Paper II, Q1–150",
    note: "The pages supplied do not show the exam name, year, duration or marking scheme, so none is claimed here. Questions that depend on one state's current affairs, or whose answer could not be settled, are left out.",
    questions: PYQ_PAPER_QUESTIONS.A,
  },
  {
    id: "paper-b", keyType: "provisional", examId: "state-psc", examTag: "State PSC",
    title: "UPHESC 2026 — Physical Education section",
    short: "UPHESC 2026 PE section",
    year: 2026,
    code: "Questions 31–100 of the booklet",
    originalQuestions: 70,
    scope: "Physical Education section, Q31–100",
    note: "Only the Physical Education section of the booklet is included (general-awareness questions are not). Marking scheme and duration were not on the pages supplied.",
    questions: PYQ_PAPER_QUESTIONS.B,
  },
  {
    id: "paper-c", keyType: "official", examId: "state-psc", examTag: "State PSC",
    title: "Instructor in Physical Education — Technical Education (Govt. Polytechnics), 2023",
    short: "Instructor in PE 2023",
    year: 2023,
    code: "Paper code 17/2023/OL · test date 03-04-2023",
    originalQuestions: 100,
    scope: "Full paper, Q1–100",
    note: "Answers follow the published final answer key. Five questions the key marks as cancelled are left out. The key has no explanations, so each explanation only states the keyed answer. Duration and marking scheme were not on the pages supplied.",
    questions: PYQ_PAPER_QUESTIONS.C,
  },
  {
    id: "paper-d", keyType: "provisional", examId: "state-psc", examTag: "State PSC",
    title: "UP Assistant Professor (Pre) 2026 — Physical Education section",
    short: "UP Asst. Prof. 2026 PE section",
    year: 2026,
    code: "Questions 31–120 of the booklet",
    originalQuestions: 90,
    scope: "Physical Education section, Q31–120",
    note: "Only the Physical Education section of the booklet is included (Q1–30 are general knowledge and are not). One question (Q55, a current-affairs item) is left out because it could not be checked. Marking scheme and duration were not on the pages supplied.",
    questions: PYQ_PAPER_QUESTIONS.D,
  },
  // UGC NET Paper II booklets (2009–2013), defined in data-pyq-6.js
  ...NET_PAPER_ENTRIES,
];
OFFICIAL_PAPERS.forEach(p => { p.included = p.questions.length; });
// Total questions on the site = practice bank + every past-paper question included. Computed, never typed.
const PAST_PAPER_QUESTION_COUNT = OFFICIAL_PAPERS.reduce((n, p) => n + p.included, 0);
const TOTAL_QUESTION_COUNT = QUESTION_BANK.length + PAST_PAPER_QUESTION_COUNT;
