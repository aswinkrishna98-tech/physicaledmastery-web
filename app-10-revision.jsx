// ============================================================================
// PE PREP — REVISION TOOLS: Flashcards, Quick Revision, Formula Hub, Sports Rules
// ============================================================================

// Leitner-style scheduling: "I Know This" moves a card up one box and pushes its
// next review further out; "Need Revision" drops it to box 0 and brings it back
// within minutes. Cards due for review are always shown first, then new cards.
const FLASHCARD_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
const FLASHCARD_RETRY_MS = 10*60*1000;
function flashcardState(raw){
  if(!raw) return null;
  if(typeof raw === "string") return {box: raw==="know" ? 1 : 0, due: 0}; // older saved format
  return raw;
}
function FlashcardsPage(){
  const {toggleBookmark, bookmarks, notify} = useApp();
  const [flipped,setFlipped] = useState(false);
  const [status,setStatus] = usePersistentState("pep_flashcard_status", {});
  const [subjectFilter,setSubjectFilter] = useState("All");
  const [now,setNow] = useState(()=>Date.now());
  const subjects = ["All", ...new Set(FLASHCARDS.map(f=>f.subject))];
  const deck = useMemo(()=>{
    const d = subjectFilter==="All" ? FLASHCARDS : FLASHCARDS.filter(f=>f.subject===subjectFilter);
    const rank = f=>{ const st = flashcardState(status[f.id]); if(!st) return [1,0,0]; return st.due<=now ? [0,st.box,st.due] : [2,st.due,0]; };
    return [...d].sort((a,b)=>{ const ra=rank(a), rb=rank(b); return ra[0]-rb[0] || ra[1]-rb[1] || ra[2]-rb[2]; });
  },[subjectFilter,status,now]);
  const card = deck[0];
  if(!card) return null;
  const states = FLASHCARDS.map(f=>flashcardState(status[f.id]));
  const dueNow = deck.filter(f=>{ const st = flashcardState(status[f.id]); return st && st.due<=now; }).length;
  const fresh = deck.filter(f=>!status[f.id]).length;
  const learned = states.filter(st=>st && st.box>=3).length;

  function mark(kind){
    const prev = flashcardState(status[card.id]) || {box:0, due:0};
    const t = Date.now();
    const next = kind==="know"
      ? {box:Math.min(prev.box+1, FLASHCARD_INTERVAL_DAYS.length-1), due:0}
      : {box:0, due:t+FLASHCARD_RETRY_MS};
    if(kind==="know") next.due = t + FLASHCARD_INTERVAL_DAYS[next.box]*86400000;
    setStatus(p=>({...p,[card.id]:next}));
    setFlipped(false);
    setNow(t);
  }

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px", maxWidth:680}},
    React.createElement(SectionHeading,{eyebrow:"Flashcards", title:"PE Flashcards", lede:"Flip, self-assess, and let the scheduler bring cards back at growing intervals: missed cards return within minutes, known cards come back after 1, 3, 7, 14 and 30 days."}),
    React.createElement("div",{className:"chip-select", style:{marginBottom:18}},
      subjects.map(s=>React.createElement("button",{key:s, className:"chip"+(subjectFilter===s?" active":""), onClick:()=>{setSubjectFilter(s);setFlipped(false);}}, s))
    ),
    React.createElement("div",{className:"flex justify-between small muted", style:{marginBottom:10}},
      React.createElement("span",null, dueNow>0 ? dueNow+" due for review" : fresh>0 ? "No reviews due — showing new cards" : "All caught up — showing the next card due"),
      React.createElement("span",null, fresh+" new · "+learned+" learned")
    ),
    React.createElement("div",{className:"flip-card"+(flipped?" flipped":""), onClick:()=>setFlipped(f=>!f)},
      React.createElement("div",{className:"flip-inner"},
        React.createElement("div",{className:"flip-face"},
          React.createElement("div",null,
            React.createElement("span",{className:"pill pill-info", style:{marginBottom:12}}, card.subject),
            React.createElement("h3",{className:"h1"}, card.front),
            React.createElement("p",{className:"tiny muted", style:{marginTop:14}}, "Tap to flip")
          )
        ),
        React.createElement("div",{className:"flip-face flip-back"},
          React.createElement("p",{className:"small"}, card.back)
        )
      )
    ),
    React.createElement("div",{className:"flex gap-10 wrap", style:{marginTop:20, justifyContent:"center"}},
      React.createElement("button",{className:"btn btn-outline btn-sm", onClick:(e)=>{e.stopPropagation(); toggleBookmark("flashcards",card.id);}},
        React.createElement(Icon,{name:"bookmark",size:14}), (bookmarks.flashcards||[]).includes(card.id)?"Bookmarked":"Bookmark"),
      React.createElement("button",{className:"btn btn-outline btn-sm", style:{borderColor:"var(--warning)",color:"var(--warning)"}, onClick:()=>mark("revise")}, "Need Revision"),
      React.createElement("button",{className:"btn btn-primary btn-sm", onClick:()=>mark("know")}, "I Know This")
    )
  );
}

function QuickRevisionPage(){
  const facts = useMemo(()=>pick(QUESTION_BANK,25).map(q=>({q:q.question.split("\n")[0], a:q.options[q.correctIndex]})),[]);
  const [i,setI] = useState(0);
  const [reveal,setReveal] = useState(false);
  const [seconds,setSeconds] = useState(300);
  useEffect(()=>{ const t=setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000); return ()=>clearInterval(t); },[]);
  const f = facts[i%facts.length];
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px", maxWidth:680}},
    React.createElement("div",{className:"flex justify-between items-center", style:{marginBottom:20}},
      React.createElement(SectionHeading,{eyebrow:"Quick Revision", title:"5-Minute Rapid Fire"}),
      React.createElement("span",{className:"timer-badge"+(seconds<60?" low":"")}, React.createElement(Icon,{name:"clock",size:14}), fmtTime(seconds))
    ),
    React.createElement("div",{className:"card card-pad", style:{textAlign:"center", minHeight:220, display:"flex",flexDirection:"column",justifyContent:"center"}},
      React.createElement("div",{className:"eyebrow", style:{marginBottom:14}}, "Fact "+((i%facts.length)+1)+" / "+facts.length),
      React.createElement("h3",{className:"h2"}, f.q),
      reveal && React.createElement("p",{className:"small", style:{marginTop:16, color:"var(--success)", fontWeight:600}}, f.a)
    ),
    React.createElement("div",{className:"flex gap-10 wrap", style:{marginTop:20, justifyContent:"center"}},
      !reveal ? React.createElement("button",{className:"btn btn-outline", onClick:()=>setReveal(true)}, "Reveal Answer") :
      React.createElement("button",{className:"btn btn-primary", onClick:()=>{setReveal(false); setI(i+1);}}, "Next Fact", React.createElement(Icon,{name:"chevronRight",size:15}))
    )
  );
}

function FormulaHubPage(){
  const [q,setQ] = useState("");
  const filtered = FORMULAS.filter(f=>f.name.toLowerCase().includes(q.toLowerCase())||f.category.toLowerCase().includes(q.toLowerCase()));
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Formula & Facts Hub", title:"PE Quick Facts", lede:"Every measurement formula used across PE exams, in one searchable place."}),
    React.createElement("input",{className:"input", placeholder:"Search formulas (e.g. BMI, Karvonen, VO2)…", value:q, onChange:e=>setQ(e.target.value), style:{marginBottom:22, maxWidth:420}}),
    React.createElement("div",{className:"grid grid-2"},
      filtered.map(f=>React.createElement("div",{key:f.id, className:"card card-pad"},
        React.createElement("span",{className:"pill pill-info", style:{marginBottom:10}}, f.category),
        React.createElement("h3",{className:"h3"}, f.name),
        React.createElement("div",{className:"num", style:{background:"var(--surface-2)", padding:"12px 14px", borderRadius:10, margin:"10px 0", fontSize:15, fontWeight:600}}, f.formula),
        React.createElement("p",{className:"tiny muted"}, f.note)
      ))
    )
  );
}

function SportsRulesPage(){
  const {routeParams} = useApp();
  const [selected,setSelected] = useState(routeParams.sport || SPORTS_RULES_DB[0].sport);
  const sport = SPORTS_RULES_DB.find(s=>s.sport===selected) || SPORTS_RULES_DB[0];
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Know Your Sport", title:"Sports Rules Database", lede:"Dimensions, scoring, officials and recent rule changes for every major sport in the PE syllabus."}),
    React.createElement("div",{className:"chip-select", style:{marginBottom:22}},
      SPORTS_RULES_DB.map(s=>React.createElement("button",{key:s.sport, className:"chip"+(selected===s.sport?" active":""), onClick:()=>setSelected(s.sport)}, s.sport))
    ),
    React.createElement("div",{className:"card card-pad"},
      React.createElement("h3",{className:"h1", style:{marginBottom:18}}, sport.sport),
      React.createElement("div",{className:"grid grid-3", style:{marginBottom:20}},
        React.createElement(StatTile,{label:"Players", value:sport.players}),
        React.createElement(StatTile,{label:"Dimensions", value:sport.dimensions}),
        React.createElement(StatTile,{label:"Scoring", value:sport.scoring})
      ),
      React.createElement("div",{className:"grid grid-2"},
        React.createElement("div",null,
          React.createElement("div",{className:"label", style:{marginBottom:8}}, "Equipment"), React.createElement("p",{className:"small muted",style:{marginBottom:16}}, sport.equipment),
          React.createElement("div",{className:"label", style:{marginBottom:8}}, "Officials"), React.createElement("p",{className:"small muted",style:{marginBottom:16}}, sport.officials),
          React.createElement("div",{className:"label", style:{marginBottom:8}}, "Recent Rule Changes"), React.createElement("p",{className:"small muted"}, sport.recentChanges)
        ),
        React.createElement("div",null,
          React.createElement("div",{className:"label", style:{marginBottom:8}}, "Common Fouls"),
          React.createElement("ul",{style:{margin:"0 0 16px 18px", padding:0}}, sport.fouls.map((f,i)=>React.createElement("li",{key:i,className:"small muted",style:{marginBottom:4}},f))),
          React.createElement("div",{className:"label", style:{marginBottom:8}}, "Key Terminology"),
          React.createElement("div",{className:"chip-select"}, sport.terminology.map(t=>React.createElement("span",{key:t,className:"chip"}, t)))
        )
      )
    )
  );
}

function CurrentAffairsPage(){
  const [cat,setCat] = useState("All");
  const cats = ["All", ...new Set(CURRENT_AFFAIRS.map(c=>c.category))];
  const filtered = cat==="All"?CURRENT_AFFAIRS:CURRENT_AFFAIRS.filter(c=>c.category===cat);
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Sports Current Affairs", title:"September 2026 Sports Current Affairs Capsule", lede:"Daily updates across Olympics, Indian sports, awards, and government schemes — with a weekly quiz and monthly revision PDF."}),
    React.createElement("div",{className:"flex justify-between wrap gap-16", style:{marginBottom:20}},
      React.createElement("div",{className:"chip-select"}, cats.map(c=>React.createElement("button",{key:c,className:"chip"+(cat===c?" active":""), onClick:()=>setCat(c)}, c))),
      React.createElement("div",{className:"flex gap-8"},
        React.createElement("button",{className:"btn btn-outline btn-sm"}, "Weekly Quiz"),
        React.createElement("button",{className:"btn btn-outline btn-sm"}, "Download Monthly PDF")
      )
    ),
    React.createElement("div",{className:"flex-col gap-14"},
      filtered.map(c=>React.createElement("div",{key:c.id, className:"card card-pad"},
        React.createElement("div",{className:"flex justify-between wrap gap-8", style:{marginBottom:8}},
          React.createElement("span",{className:"pill pill-info"}, c.category),
          React.createElement("span",{className:"tiny muted"}, new Date(c.date).toLocaleDateString())
        ),
        React.createElement("h3",{className:"h3"}, c.title),
        React.createElement("p",{className:"small muted", style:{marginTop:6}}, c.summary)
      ))
    )
  );
}
