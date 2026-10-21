const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// Load the same data/config files the browser loads, in order, into one context.
const ctx = { console };
vm.createContext(ctx);
for (const f of ["data-questions.js", "data-content.js", "data-school.js", "data-exam-config.js"]) {
  const src = fs.readFileSync(path.join(__dirname, "..", f), "utf8").replace(/^(const|let) /gm, "var ");
  vm.runInContext(src, ctx, { filename: f });
}
const { computeMockScore, QUESTION_BANK, EXAMS, EXAM_CONFIG, MARKING_OPTIONS, questionsForExam, isSchoolQuestion } = ctx;

const qs = [0, 1, 2, 3].map((i) => ({ id: "q" + i, correctIndex: 1 }));

test("all correct / all wrong / all unanswered", () => {
  const right = Object.fromEntries(qs.map((q) => [q.id, { selected: 1 }]));
  assert.deepEqual(pick(computeMockScore(qs, right, 0.25)), { score: 4, correct: 4, incorrect: 0, unattempted: 0 });
  const wrong = Object.fromEntries(qs.map((q) => [q.id, { selected: 0 }]));
  assert.deepEqual(pick(computeMockScore(qs, wrong, 0.25)), { score: -1, correct: 0, incorrect: 4, unattempted: 0 });
  assert.deepEqual(pick(computeMockScore(qs, {}, 0.25)), { score: 0, correct: 0, incorrect: 0, unattempted: 4 });
});
test("mixed answers with configurable negative marking", () => {
  const r = { q0: { selected: 1 }, q1: { selected: 1 }, q2: { selected: 3 }, q3: { selected: null } };
  assert.equal(computeMockScore(qs, r, 0).score, 2);          // no negative marking
  assert.equal(computeMockScore(qs, r, 0.25).score, 1.75);
  assert.equal(computeMockScore(qs, r, 1 / 3).score, 1.67);
  assert.equal(computeMockScore(qs, r, 0.25).marksLost, 0.25);
  assert.equal(computeMockScore(qs, r, 0.25).maxScore, 4);
});
test("missing / invalid negative value is treated as none", () => {
  const r = { q0: { selected: 0 } };
  for (const bad of [undefined, null, NaN, -1, "x"]) assert.equal(computeMockScore(qs, r, bad).score, 0);
});
test("score is not clamped at zero", () => {
  assert.equal(computeMockScore(qs, { q0: { selected: 0 }, q1: { selected: 0 } }, 0.5).score, -1);
});
test("MARKING_OPTIONS include none/0.25/0.33", () => {
  assert.deepEqual(Array.from(MARKING_OPTIONS, (m) => Math.round(m.negative * 100) / 100), [0, 0.25, 0.33]);
});

test("every exam has a config; no exam claims 0.25 without a known source flag mismatch", () => {
  for (const ex of EXAMS) {
    const c = EXAM_CONFIG[ex.id];
    assert.ok(c, "config for " + ex.id);
    if (c.negative > 0) assert.equal(c.negativeKnown, true, ex.id + " has negative marking but is not flagged as sourced");
    assert.equal(typeof ex.questions, "number");
    assert.ok(!/50,000|12,400/.test(ex.pattern));
  }
});
test("exam question counts are real counts from the bank", () => {
  for (const ex of EXAMS) assert.equal(ex.questions, questionsForExam(ex.id).length);
  assert.ok(EXAMS.every((e) => e.questions <= QUESTION_BANK.length));
  assert.ok(questionsForExam("kvs-pgt").every((q) => !isSchoolQuestion(q)));
});

test("question bank integrity", () => {
  const ids = new Set();
  for (const q of QUESTION_BANK) {
    assert.ok(!ids.has(q.id), "duplicate id " + q.id);
    ids.add(q.id);
    assert.ok(Array.isArray(q.options) && q.options.length >= 2, q.id + " options");
    assert.ok(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < q.options.length, q.id + " correctIndex");
    assert.equal(new Set(q.options.map((o) => String(o).trim().toLowerCase())).size, q.options.length, q.id + " duplicate options");
    assert.ok(q.explanation && q.explanation.length > 0, q.id + " explanation");
  }
});

test("relatedIds all resolve", () => {
  const ids = new Set(QUESTION_BANK.map((q) => q.id));
  for (const q of QUESTION_BANK) for (const r of q.relatedIds || []) assert.ok(ids.has(r), q.id + " -> " + r);
});

function pick(r) { return { score: r.score, correct: r.correct, incorrect: r.incorrect, unattempted: r.unattempted }; }
