// Past-paper registry. Built from the questions added in data-pyq*.js.
// Counts are computed, never typed, so the page can never overstate what is in the bank.
const OFFICIAL_PAPERS = [
  {
    id: "paper-a", examId: "state-psc", examTag: "State PSC",
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
    id: "paper-b", examId: "state-psc", examTag: "State PSC",
    title: "UPHESC 2026 — Physical Education section",
    short: "UPHESC 2026 PE section",
    year: 2026,
    code: "Questions 31–100 of the booklet",
    originalQuestions: 70,
    scope: "Physical Education section, Q31–100",
    note: "Only the Physical Education section of the booklet is included (general-awareness questions are not). Marking scheme and duration were not on the pages supplied.",
    questions: PYQ_PAPER_QUESTIONS.B,
  },
];
OFFICIAL_PAPERS.forEach(p => { p.included = p.questions.length; });
