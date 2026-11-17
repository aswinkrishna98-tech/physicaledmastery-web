// ============================================================================
// PE PREP — LANGUAGE LAYER (English + Hindi)
// ----------------------------------------------------------------------------
// Hindi text is added by people, never machine-translated. A question gets a
// language toggle only when it has an entry in HINDI_TRANSLATIONS below.
//
// Format (key = the question's id in the English bank):
//   "ANA-001": {
//     question:    "मानव शरीर की सबसे लंबी हड्डी कौन सी है?",
//     options:     ["टिबिया", "फीमर", "ह्यूमरस", "फिबुला"],   // same number and ORDER as English
//     explanation: "फीमर (जांघ की हड्डी) ..."                    // optional; falls back to English
//   }
// `question` and `options` are required together; `explanation` is optional.
// An entry whose options count differs from the English question is ignored.
//
// UI_STRINGS holds optional translated interface labels: UI_STRINGS.hi["Start Challenge"] = "...".
// Anything missing falls back to English, so partial translation is safe.
// ============================================================================
const HINDI_TRANSLATIONS = {};
const UI_STRINGS = {hi:{}};

function hindiFor(q){
  const h = HINDI_TRANSLATIONS[q.id];
  if(!h || !h.question || !Array.isArray(h.options) || h.options.length !== q.options.length) return null;
  return h;
}
function hasHindi(q){ return !!hindiFor(q); }
function localizeQ(q, lang){
  const h = lang === "hi" ? hindiFor(q) : null;
  return h ? {...q, question:h.question, options:h.options, explanation:h.explanation || q.explanation} : q;
}
function tr(lang, text){ return (lang === "hi" && UI_STRINGS.hi[text]) || text; }
