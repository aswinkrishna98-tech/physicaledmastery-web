// ============================================================================
// PE PREP — EXAM CONFIG (loaded after the question + exam data)
// ----------------------------------------------------------------------------
// One honest source of truth for each exam's mock-test scoring and for the
// numbers shown in the UI. Replaces the previous hard-coded "+1 / −0.25 for
// everything" and the invented "questions available" / "mock tests" counts.
//
//  tag            the label used on questions in QUESTION_BANK (q.exam[])
//  negative       default negative mark per wrong answer (0 = none)
//  negativeKnown  true only where a source supports the figure; otherwise the
//                 mock-test setup tells the aspirant it is a guess and lets
//                 them choose the scheme they expect
//  patternNote    short, honest description of the paper (shown in the UI)
//
// EVERY entry is "verify against the current official notification" — the
// figures below come from secondary prep sites (not the conducting bodies'
// own notifications) and exam patterns change between recruitment cycles.
// ============================================================================
const EXAM_CONFIG = {
  "kvs-pgt":       {tag:"KVS PGT",       negative:0,    negativeKnown:false, patternNote:"Pattern changes by cycle (recent reports: 180 MCQs, 3 hours, no negative marking) — confirm in the current KVS notification."},
  "ugc-net":       {tag:"UGC NET",       negative:0,    negativeKnown:true,  patternNote:"Paper 1 (50Q) + Paper 2 (100Q) · 2 marks each · 3 hours · no negative marking (NTA) — confirm in the current NTA bulletin."},
  "nvs":           {tag:"NVS",           negative:0.25, negativeKnown:true,  patternNote:"Reported: 150 MCQs · 3 hours · −¼ per wrong answer — confirm in the current NVS notification."},
  "dsssb":         {tag:"DSSSB",         negative:0.25, negativeKnown:true,  patternNote:"Reported: −0.25 per wrong answer; question count and duration vary by post — confirm in the DSSSB advertisement."},
  "state-psc":     {tag:"State PSC",     negative:0,    negativeKnown:false, patternNote:"Varies by state and post — check your state commission's notification."},
  "bped":          {tag:"B.P.Ed",        negative:0,    negativeKnown:false, patternNote:"Varies by university/state entrance — check the admission brochure."},
  "mped":          {tag:"M.P.Ed",        negative:0,    negativeKnown:false, patternNote:"Varies by university/state entrance — check the admission brochure."},
  "university":    {tag:null,            negative:0,    negativeKnown:false, patternNote:"Varies by university — check the entrance notification."},
  "set":           {tag:"SET",           negative:0,    negativeKnown:false, patternNote:"Conducted by state agencies; usually Paper 1 + Paper 2 on the UGC-NET model, but varies by state — confirm in the state notification."},
  "ctet":          {tag:"CTET",          negative:0,    negativeKnown:false, patternNote:"CTET itself has no dedicated Physical Education paper (it tests pedagogy and child development) — this track is pedagogy-linked practice. Confirm the current CBSE pattern."},
  "emrs":          {tag:"EMRS",          negative:0,    negativeKnown:false, patternNote:"Pattern not confirmed — check the current NESTS notification."},
  "sainik-school": {tag:"Sainik School", negative:0,    negativeKnown:false, patternNote:"Pattern not confirmed — check the current Sainik School recruitment notification."},
  "awes":          {tag:"AWES",          negative:0,    negativeKnown:false, patternNote:"Pattern not confirmed — check the current AWES notification."},
};

const isSchoolQuestion = (q) => (q.exam||[]).some(e => String(e).startsWith("PAT-"));

// Questions that can honestly be called "for" this exam: tagged with it, and
// not part of the separate School (Physical Activity Trainer) track.
function questionsForExam(examId){
  const cfg = EXAM_CONFIG[examId];
  const nonSchool = QUESTION_BANK.filter(q => !isSchoolQuestion(q));
  if(!cfg || !cfg.tag) return nonSchool;
  return nonSchool.filter(q => q.exam.includes(cfg.tag));
}

// Overwrite the invented figures with real ones.
EXAMS.forEach(ex => {
  const cfg = EXAM_CONFIG[ex.id];
  if(!cfg) return;
  ex.pattern = cfg.patternNote;
  ex.questions = questionsForExam(ex.id).length;   // real count in this bank
  ex.tests = null;                                  // no fixed "N tests" — mocks are generated per attempt
});

// Marking options offered on the mock-test setup screen.
const MARKING_OPTIONS = [
  {id:"none", label:"No negative marking", negative:0},
  {id:"q25",  label:"−0.25 per wrong",     negative:0.25},
  {id:"q33",  label:"−0.33 per wrong",     negative:1/3},
];

// ---------------------------------------------------------------------------
// Pure scoring (unit-tested in tests/scoring.test.js). +1 per correct answer,
// −`negative` per wrong answer, 0 for unanswered. The total is NOT clamped at
// zero: a real paper can end below zero, and hiding that would mislead.
// ---------------------------------------------------------------------------
function computeMockScore(questions, responses, negative){
  const neg = Number.isFinite(negative) && negative > 0 ? negative : 0;
  let correct = 0, incorrect = 0, unattempted = 0;
  questions.forEach(q => {
    const r = (responses && responses[q.id]) || {};
    if(r.selected == null) unattempted++;
    else if(r.selected === q.correctIndex) correct++;
    else incorrect++;
  });
  const round2 = x => Math.round(x * 100) / 100;
  return {
    correct, incorrect, unattempted, attempted: correct + incorrect,
    score: round2(correct - incorrect * neg),
    maxScore: questions.length,
    marksLost: round2(incorrect * neg),
    negative: neg,
  };
}
if(typeof module !== "undefined" && module.exports){ module.exports = { computeMockScore }; }
