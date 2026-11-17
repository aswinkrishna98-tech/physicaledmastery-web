// Exports the data the static SEO pages need into seo-data.json.
// Run:  npm run seo-data   (then commit seo-data.json). build.py renders the pages
// from it, so Render's build only needs Python. Everything here is computed from
// the real data files - counts, topics and concepts are never typed by hand.
const fs = require("fs"), vm = require("vm"), path = require("path");
const root = path.join(__dirname, "..");
const ctx = {}; vm.createContext(ctx);
const files = ["data-questions.js","data-content.js","data-school.js","data-exam-config.js","data-pyq.js","data-pyq-2.js","data-pyq-3.js","data-pyq-5.js","data-pyq-6.js","data-pyq-4.js"];
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, {filename: f});
vm.runInContext("this.__d = {QUESTION_BANK, EXAMS, EXAM_CONFIG, OFFICIAL_PAPERS, MIN_QUESTIONS_FOR_PASS, EXAM_PASS_PRICE_INR: 149}", ctx);
const {QUESTION_BANK, EXAMS, EXAM_CONFIG, OFFICIAL_PAPERS, MIN_QUESTIONS_FOR_PASS} = ctx.__d;

const slug = s => String(s).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const pub = q => ({id:q.id, q:q.question, o:q.options, c:q.correctIndex, e:q.explanation, s:q.subject, t:q.topic, d:q.difficulty});
const questions = {};
// School-track questions (Class 11/12 PAT papers) are tagged PAT-11/PAT-12 only; they are not part of the exam pages.
const PE = QUESTION_BANK.filter(q => q.exam && q.exam.length && !q.exam.every(e => /^PAT-/.test(e)));
PE.forEach(q => { questions[q.id] = pub(q); });

function roundRobin(list, n){
  const by = {}; list.forEach(q => (by[q.subject] = by[q.subject] || []).push(q));
  const keys = Object.keys(by).sort(); const out = [];
  for (let i = 0; out.length < n; i++){
    let added = false;
    for (const k of keys){ if (by[k][i] && out.length < n){ out.push(by[k][i]); added = true; } }
    if (!added) break;
  }
  return out.map(q => q.id);
}
function concepts(list){
  const seen = new Set(), out = [];
  for (const q of list){
    const c = q.concept; if (!c || !c.title || seen.has(c.title)) continue;
    seen.add(c.title); out.push({title:c.title, definition:c.definition||"", points:c.points||[], trick:c.memoryTrick||""});
  }
  return out;
}
const countBy = (list, f) => { const m = {}; list.forEach(q => { const k = f(q); if (k) m[k] = (m[k]||0)+1; }); return m; };

const exams = EXAMS.map(ex => {
  const cfg = EXAM_CONFIG[ex.id] || {};
  const tagged = cfg.tag ? QUESTION_BANK.filter(q => (q.exam||[]).includes(cfg.tag)) : [];
  return {
    id: ex.id, slug: ex.id + "-physical-education", name: ex.name, short: ex.short, body: ex.body,
    syllabus: ex.syllabus, patternNote: cfg.patternNote || "", negative: cfg.negative||0, negativeKnown: !!cfg.negativeKnown,
    tag: cfg.tag || null, count: tagged.length,
    passAvailable: tagged.length >= MIN_QUESTIONS_FOR_PASS,
    subjects: Object.entries(countBy(tagged, q => q.subject)).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([name,n])=>({name, slug:slug(name), n})),
    sample: roundRobin(tagged, 10),
    papers: OFFICIAL_PAPERS.filter(p => p.examId === ex.id).map(p => ({title:p.title, keyType:p.keyType, year:p.year, shift:p.shift||null, included:p.questions.length})),
  };
});

const subjects = [];
for (const [name, n] of Object.entries(countBy(PE, q => q.subject)).sort()){
  const list = PE.filter(q => q.subject === name);
  const topics = Object.entries(countBy(list, q => q.topic)).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([t,c])=>({name:t, slug:slug(t), n:c}));
  const examCounts = {}; list.forEach(q => (q.exam||[]).forEach(e => examCounts[e] = (examCounts[e]||0)+1));
  subjects.push({name, slug:slug(name), n, topics, exams:Object.entries(examCounts).sort((a,b)=>b[1]-a[1]).map(([e,c])=>({tag:e,n:c})),
    sample: roundRobin(list, 10), concepts: concepts(list).slice(0, 8)});
}
const topics = [];
for (const s of subjects) for (const t of s.topics){
  if (t.n < 3) continue;
  const list = PE.filter(q => q.subject === s.name && q.topic === t.name);
  topics.push({subject:s.name, subjectSlug:s.slug, name:t.name, slug:t.slug, n:t.n,
    sample: list.slice(0,10).map(q=>q.id), concepts: concepts(list).slice(0,6)});
}
const out = {generated: new Date().toISOString().slice(0,10), passPrice: 149, minForPass: MIN_QUESTIONS_FOR_PASS, total: PE.length, papers: OFFICIAL_PAPERS.length, exams, subjects, topics, questions};
fs.writeFileSync(path.join(root, "seo-data.json"), JSON.stringify(out));
console.log("seo-data.json:", exams.length, "exams,", subjects.length, "subjects,", topics.length, "topics,", Object.keys(questions).length, "questions");
