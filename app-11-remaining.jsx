// ============================================================================
// PE PREP — PYQs, Study Material, Study Planner, My Mistakes, Bookmarks,
// Pricing, Admin Dashboard
// ============================================================================

function PreviousYearPapersPage(){
  const {routeParams, goto, mockLocked, isPro} = useApp();
  const [examFilter,setExamFilter] = useState(routeParams.exam || "All");
  const exams = ["All", ...new Set(PYQ_PAPERS.map(p=>p.exam))];
  const filtered = examFilter==="All" ? PYQ_PAPERS : PYQ_PAPERS.filter(p=>p.exam===examFilter);
  const [engine,setEngine] = useState(null);
  const [showPaywall,setShowPaywall] = useState(false);
  if(engine) return React.createElement(TestEngine,{mode:"mock", questions:engine.questions, title:engine.title,
    examMeta:{duration:engine.duration, negativeMarking:0.25}, onFinish:(r)=>goto("/mock-result",{result:{...r, examShort:engine.title}})});

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Previous Year Papers", title:"Attempt Real Exam Papers", lede:"Select an exam and year to attempt the paper online, view solutions, and get a detailed analysis.", right:
      !isPro && React.createElement("span",{className:"pill "+(mockLocked?"pill-danger":"pill-warning")}, mockLocked?"Free mock test used":"Free Plan · 1 free attempt")
    }),
    // Gated on mockLocked too (not just showPaywall) so the card auto-hides
    // the moment a real payment is verified, rather than waiting on a
    // manual dismiss that could fire before payment actually completes.
    showPaywall && mockLocked && React.createElement("div",{style:{marginBottom:24}}, React.createElement(MockPaywall,{title:"Unlock unlimited previous year papers"})),
    React.createElement("div",{className:"chip-select", style:{marginBottom:20}}, exams.map(e=>React.createElement("button",{key:e,className:"chip"+(examFilter===e?" active":""),onClick:()=>setExamFilter(e)},e))),
    React.createElement("div",{className:"grid grid-3"},
      filtered.map(p=>React.createElement("div",{key:p.id, className:"card card-pad"},
        React.createElement("div",{className:"flex justify-between", style:{marginBottom:8}},
          React.createElement("span",{className:"pill pill-info"}, p.exam), p.tag && React.createElement("span",{className:"pill pill-gold"}, p.tag)),
        React.createElement("h3",{className:"h3"}, p.exam+" — "+p.year),
        React.createElement("p",{className:"tiny muted", style:{margin:"6px 0 14px"}}, p.questions+" Questions · "+p.duration+" minutes"),
        React.createElement("div",{className:"flex-col gap-8"},
          React.createElement("button",{className:"btn btn-primary btn-sm", onClick:()=>{
            if(mockLocked){ setShowPaywall(true); window.scrollTo({top:0,behavior:"smooth"}); return; }
            setEngine({questions: pick(QUESTION_BANK, Math.min(20, QUESTION_BANK.length)), title:p.exam+" "+p.year, duration:Math.min(p.duration,30)});
          }}, mockLocked ? "Unlock to Attempt" : "Attempt Online", mockLocked && React.createElement(Icon,{name:"lock",size:13})),
          React.createElement("div",{className:"flex gap-8"},
            React.createElement("button",{className:"btn btn-outline btn-sm", style:{flex:1}, onClick:()=>goto("/question-bank",{exam:p.exam})}, "View Questions"),
            React.createElement("button",{className:"btn btn-ghost btn-sm", style:{flex:1}}, "Download PDF")
          )
        )
      ))
    )
  );
}

function StudyMaterialPage(){
  const [type,setType] = useState("All");
  const [q,setQ] = useState("");
  const [open,setOpen] = useState(null);
  const types = ["All", ...new Set(STUDY_NOTES.map(n=>n.type))];
  const filtered = STUDY_NOTES.filter(n=> (type==="All"||n.type===type) && (n.title.toLowerCase().includes(q.toLowerCase())||n.subject.toLowerCase().includes(q.toLowerCase())));
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Study Material", title:"Digital PE Library", lede:"Short notes, one-liners, formula sheets, sports rules, yoga charts and more — all searchable."}),
    React.createElement("div",{className:"flex justify-between wrap gap-16", style:{marginBottom:20}},
      React.createElement("input",{className:"input", placeholder:"Search notes…", value:q, onChange:e=>setQ(e.target.value), style:{maxWidth:320}}),
      React.createElement("div",{className:"chip-select"}, types.map(t=>React.createElement("button",{key:t,className:"chip"+(type===t?" active":""),onClick:()=>setType(t)},t)))
    ),
    React.createElement("div",{className:"grid grid-3"},
      filtered.map(n=>React.createElement("div",{key:n.id, className:"card card-pad card-hover", style:{cursor:"pointer"}, onClick:()=>setOpen(open===n.id?null:n.id)},
        React.createElement("span",{className:"pill pill-info", style:{marginBottom:10}}, n.type),
        React.createElement("h3",{className:"h3"}, n.title),
        React.createElement("p",{className:"tiny muted", style:{margin:"6px 0"}}, n.subject),
        React.createElement("p",{className:"small muted"}, n.summary),
        open===n.id && React.createElement("div",{className:"explain-box", style:{marginTop:12}},
          React.createElement("p",{className:"small"}, "This "+n.type.toLowerCase()+" module condenses the highest-yield "+n.subject+" content for fast revision before your exam. In the full platform, this opens a rich, illustrated reader with bookmarking and highlight sync."),
          React.createElement("button",{className:"btn btn-outline btn-sm", style:{marginTop:10}}, "Open Full Note")
        )
      ))
    )
  );
}

const STUDY_PLAN_TASKS = ["Concept Study","Topic-wise MCQs","Quick Revision"];
function generateStudyPlan(examName, days, hoursPerDay){
  const subjectCycle = SUBJECTS.filter(s=>["Sports Science","Coaching","Behavioural Science","Research","Indian Traditions","Sports Events","Sports Rules"].includes(s.group));
  const plan = [];
  for(let d=1; d<=days; d++){
    const subj = subjectCycle[(d-1)%subjectCycle.length];
    const totalMin = Math.round(hoursPerDay*60);
    plan.push({
      day:d, subject:subj.name,
      blocks:[
        {task:"Concept Study — "+subj.name, minutes:Math.round(totalMin*0.45)},
        {task:"Topic-wise MCQs", minutes:Math.round(totalMin*0.35)},
        {task:"Quick Revision", minutes:Math.round(totalMin*0.2)},
      ]
    });
  }
  return {examName, days, hoursPerDay, createdAt:Date.now(), plan};
}

function StudyPlannerPage(){
  const {studyPlan, setStudyPlan, goto} = useApp();
  const [examName,setExamName] = useState(EXAMS[0].name);
  const [examDate,setExamDate] = useState("");
  const [hours,setHours] = useState(2);
  const [level,setLevel] = useState("Beginner");
  const [progress,setProgress] = usePersistentState("pep_plan_progress", {});

  function build(){
    let days = 30;
    if(examDate){
      const diff = daysBetween(todayStr(), examDate);
      if(diff>0) days = clamp(diff, 7, 90);
    }
    setStudyPlan(generateStudyPlan(examName, days, hours));
    setProgress({});
  }

  if(studyPlan){
    const doneCount = Object.values(progress).filter(Boolean).length;
    return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
      React.createElement(SectionHeading,{eyebrow:"Study Planner", title:studyPlan.days+"-Day "+studyPlan.examName+" Preparation Plan", right:
        React.createElement("button",{className:"btn btn-outline btn-sm", onClick:()=>setStudyPlan(null)}, "Rebuild Plan")}),
      React.createElement("div",{className:"card card-pad", style:{marginBottom:22}},
        React.createElement("div",{className:"flex justify-between small", style:{marginBottom:6}}, React.createElement("span",null,"Overall Completion"), React.createElement("span",{className:"num"}, doneCount+" / "+studyPlan.plan.length+" days")),
        React.createElement("div",{className:"progress-track"}, React.createElement("div",{className:"progress-fill success", style:{width:(doneCount/studyPlan.plan.length*100)+"%"}}))
      ),
      React.createElement("div",{className:"flex-col gap-10"},
        studyPlan.plan.map(dayPlan=>React.createElement("div",{key:dayPlan.day, className:"card card-pad", style:{opacity: progress[dayPlan.day]?0.65:1}},
          React.createElement("div",{className:"flex justify-between items-center wrap gap-10"},
            React.createElement("div",null,
              React.createElement("div",{style:{fontWeight:700}}, "Day "+dayPlan.day+": "+dayPlan.subject),
              React.createElement("div",{className:"small muted", style:{marginTop:4}},
                dayPlan.blocks.map(b=>b.task.split(" — ")[0]+" ("+b.minutes+"m)").join(" · "))
            ),
            React.createElement("button",{className:"btn "+(progress[dayPlan.day]?"btn-outline":"btn-primary")+" btn-sm", onClick:()=>setProgress(p=>({...p,[dayPlan.day]:!p[dayPlan.day]}))},
              progress[dayPlan.day] ? "Completed ✓" : "Mark Done")
          )
        ))
      )
    );
  }

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px", maxWidth:640}},
    React.createElement(SectionHeading,{eyebrow:"Study Planner", title:"Build Your Personalized Study Plan"}),
    React.createElement("div",{className:"card card-pad"},
      React.createElement("div",{className:"flex-col gap-16"},
        React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Target Exam"),
          React.createElement("select",{className:"select", value:examName, onChange:e=>setExamName(e.target.value)}, EXAMS.map(e=>React.createElement("option",{key:e.id,value:e.name},e.name)))),
        React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Exam Date (optional)"),
          React.createElement("input",{type:"date", className:"input", value:examDate, onChange:e=>setExamDate(e.target.value)})),
        React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"}, "Daily Available Hours: "+hours),
          React.createElement("input",{type:"range", min:1, max:8, value:hours, onChange:e=>setHours(+e.target.value)})),
        React.createElement(FilterChipGroup,{label:"Current Level", options:["Beginner","Intermediate","Advanced"], value:level, onChange:setLevel}),
        React.createElement("button",{className:"btn btn-primary btn-block", onClick:build}, "Generate My Study Plan")
      )
    )
  );
}

function MyMistakesPage(){
  const {wrongLog, attempts, goto} = useApp();
  const [engine,setEngine] = useState(null);
  const [tab,setTab] = useState("recent");
  const entries = Object.entries(wrongLog).map(([id,count])=>({q:QUESTIONS_BY_ID[id], count, ts:attempts[id]?.ts||0})).filter(e=>e.q);
  const recent = [...entries].sort((a,b)=>b.ts-a.ts);
  const repeated = entries.filter(e=>e.count>1).sort((a,b)=>b.count-a.count);
  const difficult = entries.filter(e=>["Hard","Expert"].includes(e.q.difficulty));
  const tabs = {recent:{label:"Recently Wrong",data:recent}, repeated:{label:"Repeated Mistakes",data:repeated}, difficult:{label:"Most Difficult",data:difficult}, all:{label:"All / Needs Revision",data:entries}};
  const list = tabs[tab].data;

  if(engine) return React.createElement(TestEngine,{mode:"practice", questions:engine, title:"Practice My Mistakes", onExit:()=>setEngine(null)});

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Wrong Answer Notebook", title:"My Mistakes", lede:"Every question you've answered incorrectly, automatically collected here for focused revision.", right:
      entries.length>0 && React.createElement("button",{className:"btn btn-primary", onClick:()=>setEngine(entries.map(e=>e.q))}, "Practice My Mistakes")
    }),
    React.createElement("div",{className:"tabs", style:{marginBottom:20}}, Object.entries(tabs).map(([id,t])=>React.createElement("div",{key:id, className:"tab"+(tab===id?" active":""), onClick:()=>setTab(id)}, t.label+" ("+t.data.length+")"))),
    list.length===0 ? React.createElement("div",{className:"empty-state card"}, React.createElement(Icon,{name:"check",size:32}), React.createElement("p",{style:{marginTop:10}}, "No mistakes in this category yet — keep practicing!")) :
    React.createElement("div",{className:"flex-col gap-10"},
      list.map(e=>React.createElement("div",{key:e.q.id, className:"card card-pad"},
        React.createElement("div",{className:"flex justify-between wrap gap-8", style:{marginBottom:8}},
          React.createElement("div",{className:"flex gap-8 wrap"}, React.createElement("span",{className:"pill pill-info"}, e.q.subject), React.createElement(DifficultyPill,{level:e.q.difficulty}), e.count>1 && React.createElement("span",{className:"pill pill-danger"}, "Wrong "+e.count+"x")),
          React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>setEngine([e.q])}, "Retry")
        ),
        React.createElement("p",{className:"small",style:{fontWeight:500}}, e.q.question.split("\n")[0])
      ))
    )
  );
}

function BookmarksPage(){
  const {bookmarks, toggleBookmark, goto} = useApp();
  const [tab,setTab] = useState("questions");
  const tabs = [["questions","Questions"],["flashcards","Flashcards"],["notes","Notes"],["tests","Tests"]];
  const qs = (bookmarks.questions||[]).map(id=>QUESTIONS_BY_ID[id]).filter(Boolean);
  const fcs = (bookmarks.flashcards||[]).map(id=>FLASHCARDS.find(f=>f.id===id)).filter(Boolean);
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Saved", title:"My Bookmarks"}),
    React.createElement("div",{className:"tabs", style:{marginBottom:20}}, tabs.map(([id,l])=>React.createElement("div",{key:id,className:"tab"+(tab===id?" active":""), onClick:()=>setTab(id)}, l))),
    tab==="questions" && (qs.length===0 ? React.createElement("div",{className:"empty-state card"},"No bookmarked questions yet.") :
      React.createElement("div",{className:"flex-col gap-10"}, qs.map(q=>React.createElement("div",{key:q.id,className:"card card-pad"},
        React.createElement("div",{className:"flex justify-between", style:{marginBottom:8}},
          React.createElement("span",{className:"pill pill-info"}, q.subject),
          React.createElement("button",{className:"btn btn-ghost btn-icon", onClick:()=>toggleBookmark("questions",q.id)}, React.createElement(Icon,{name:"close",size:14}))),
        React.createElement("p",{className:"small"}, q.question.split("\n")[0])
      )))
    ),
    tab==="flashcards" && (fcs.length===0 ? React.createElement("div",{className:"empty-state card"},"No bookmarked flashcards yet.") :
      React.createElement("div",{className:"grid grid-3"}, fcs.map(f=>React.createElement("div",{key:f.id,className:"card card-pad"},
        React.createElement("div",{style:{fontWeight:700,marginBottom:6}}, f.front), React.createElement("p",{className:"small muted"}, f.back))))
    ),
    (tab==="notes"||tab==="tests") && React.createElement("div",{className:"empty-state card"}, "Nothing bookmarked here yet — save items from Study Material or Mock Tests.")
  );
}

/* --------------------------------- Pricing --------------------------------- */
function PricingPage(){
  const {notify, profile, isPro, upgradePlan, freeMocksUsed, paymentsLive, checkoutBusy} = useApp();
  const plan = profile.plan||"free";
  const tiers = [
    {id:"free",name:"Free",price:"₹0",period:"forever",features:["5 daily practice questions","1 full mock test, then upgrade for more","Basic short notes","Limited analytics"],highlight:false},
    {id:"pro",name:"Pro",price:"₹499",period:"/month",features:["Unlimited practice questions","Unlimited full mock tests","Detailed performance analytics","All previous year papers","Full study material & flashcards","Personalized study planner"],highlight:true},
    {id:"proplus",name:"Pro+",price:"₹899",period:"/month",features:["Everything in Pro","Advanced AI preparation coach","Personalized adaptive plan","Exclusive live courses","Premium test series with rank prediction"],highlight:false},
  ];
  const lede = paymentsLive
    ? "Take one full mock test free. Upgrade to Pro for unlimited mock tests and full analytics. Payments are processed securely via Razorpay — your plan unlocks the moment payment is verified."
    : "Take one full mock test free. Upgrade to Pro for unlimited mock tests and full analytics. (Payment processing is not wired up in this prototype — upgrading here applies the plan instantly so you can see what unlocks.)";
  return React.createElement("div",{className:"container", style:{padding:"40px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Pricing", title:"Simple, transparent plans", lede}),
    !isPro && freeMocksUsed>0 && React.createElement("div",{className:"card card-pad", style:{marginBottom:24, borderColor:"var(--warning)"}},
      React.createElement("span",{className:"pill pill-warning", style:{marginBottom:8}}, "Free mock test used"),
      React.createElement("p",{className:"small muted"}, "You've used your one free full mock test. Upgrade to Pro below for unlimited mock tests and previous year papers.")
    ),
    React.createElement("div",{className:"grid grid-3"},
      tiers.map(t=>{
        const isCurrent = plan===t.id;
        const busyThisCard = checkoutBusy && t.id!=="free";
        return React.createElement("div",{key:t.name, className:"card card-pad", style:t.highlight?{border:"2px solid var(--accent)", boxShadow:"var(--shadow-md)", position:"relative"}:{}},
          t.highlight && React.createElement("span",{className:"pill pill-accent", style:{position:"absolute", top:-12, left:20}}, "Most Popular"),
          React.createElement("div",{className:"flex justify-between items-center"},
            React.createElement("h3",{className:"h2"}, t.name),
            isCurrent && React.createElement("span",{className:"pill pill-success"}, "Your Plan")
          ),
          React.createElement("div",{style:{margin:"10px 0 18px"}}, React.createElement("span",{className:"display-2 num"}, t.price), React.createElement("span",{className:"small muted"}, " "+t.period)),
          React.createElement("div",{className:"flex-col gap-10", style:{marginBottom:22}},
            t.features.map(f=>React.createElement("div",{key:f, className:"flex items-center gap-8 small"}, React.createElement(Icon,{name:"check",size:15,style:{color:"var(--success)",flex:"none"}}), f))
          ),
          React.createElement("button",{className:"btn "+(isCurrent?"btn-outline":t.highlight?"btn-primary":"btn-outline")+" btn-block", disabled:isCurrent||checkoutBusy, onClick:()=>{
            if(t.id==="free") return;
            upgradePlan(t.id);
          }}, isCurrent ? "Current Plan" : busyThisCard ? "Opening secure checkout…" : t.id==="free" ? "Downgrade" : "Upgrade to "+t.name)
        );
      })
    ),
    React.createElement("p",{className:"tiny muted", style:{marginTop:18, textAlign:"center"}},
      paymentsLive ? "Secured by Razorpay. Cancel anytime." : "Real payment gateway not connected in this deployment — see server/README.md to enable one.")
  );
}

/* --------------------------------- Admin ----------------------------------- */
const emptyQForm = {question:"",optionA:"",optionB:"",optionC:"",optionD:"",correct:"A",explanation:"",subject:SUBJECTS[0].name,topic:"",difficulty:"Easy",exam:EXAMS[0].name,year:new Date().getFullYear(),negativeMarking:0.25,source:"",tags:""};
function AdminPage(){
  const {notify} = useApp();
  const [tab,setTab] = useState("questions");
  const [adminQuestions,setAdminQuestions] = usePersistentState("pep_admin_questions", []);
  const [form,setForm] = useState(emptyQForm);
  const [search,setSearch] = useState("");
  const allQuestions = [...adminQuestions, ...QUESTION_BANK];
  const filtered = allQuestions.filter(q=>q.question.toLowerCase().includes(search.toLowerCase()));

  function submitForm(e){
    e.preventDefault();
    if(!form.question.trim()){ notify("Question text is required"); return; }
    const newQ = {
      id:"ADMIN-"+Date.now(), exam:[form.exam], subject:form.subject, topic:form.topic||"General", difficulty:form.difficulty,
      type:"MCQ", year:+form.year, question:form.question, options:[form.optionA,form.optionB,form.optionC,form.optionD],
      correctIndex:{A:0,B:1,C:2,D:3}[form.correct], explanation:form.explanation, source:form.source,
      concept:{title:form.topic||"Concept", definition:form.explanation.slice(0,140)||"—", points:[], memoryTrick:"—", sportsRelevance:"—"},
      relatedIds:[], tags: form.tags.split(",").map(t=>t.trim()).filter(Boolean),
    };
    setAdminQuestions(prev=>[newQ, ...prev]);
    notify("Question added to the bank");
    setForm(emptyQForm);
  }

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:"Admin", title:"Admin Dashboard", lede:"Manage the question bank, exams, notes, and view content analytics. Demo scope: question CRUD is functional and stored locally in your browser."}),
    React.createElement("div",{className:"grid grid-4", style:{marginBottom:24}},
      React.createElement(StatTile,{label:"Total Questions", value:allQuestions.length}),
      React.createElement(StatTile,{label:"Exams", value:EXAMS.length}),
      React.createElement(StatTile,{label:"Subjects", value:SUBJECTS.length}),
      React.createElement(StatTile,{label:"Added This Session", value:adminQuestions.length})
    ),
    React.createElement("div",{className:"tabs", style:{marginBottom:20}},
      [["questions","Manage Questions"],["add","Add Question"],["content","Notes & Current Affairs"]].map(([id,l])=>
        React.createElement("div",{key:id,className:"tab"+(tab===id?" active":""), onClick:()=>setTab(id)}, l))
    ),
    tab==="questions" && React.createElement("div",{className:"card card-pad"},
      React.createElement("input",{className:"input", placeholder:"Search questions…", value:search, onChange:e=>setSearch(e.target.value), style:{marginBottom:16, maxWidth:340}}),
      React.createElement("div",{className:"overflow-x"},
        React.createElement("table",{className:"datatable"},
          React.createElement("thead",null, React.createElement("tr",null, ["Question","Subject","Difficulty","Exam(s)","Year",""].map(h=>React.createElement("th",{key:h},h)))),
          React.createElement("tbody",null, filtered.slice(0,30).map(q=>React.createElement("tr",{key:q.id},
            React.createElement("td",{style:{maxWidth:340}}, q.question.split("\n")[0].slice(0,70)+(q.question.length>70?"…":"")),
            React.createElement("td",null, q.subject), React.createElement("td",null, React.createElement(DifficultyPill,{level:q.difficulty})),
            React.createElement("td",null, q.exam.join(", ")), React.createElement("td",{className:"num"}, q.year),
            React.createElement("td",null, React.createElement("div",{className:"flex gap-6"}, React.createElement(Icon,{name:"edit",size:15}), React.createElement(Icon,{name:"trash",size:15}))))))
        )
      )
    ),
    tab==="add" && React.createElement("form",{className:"card card-pad", onSubmit:submitForm, style:{maxWidth:720}},
      React.createElement("div",{className:"flex-col gap-14"},
        React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Question"), React.createElement("textarea",{className:"input",rows:3,value:form.question,onChange:e=>setForm({...form,question:e.target.value})})),
        React.createElement("div",{className:"grid grid-2"},
          ["A","B","C","D"].map(l=>React.createElement("div",{key:l,className:"field"}, React.createElement("span",{className:"label"},"Option "+l), React.createElement("input",{className:"input", value:form["option"+l], onChange:e=>setForm({...form,["option"+l]:e.target.value})})))
        ),
        React.createElement("div",{className:"grid grid-3"},
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Correct Answer"), React.createElement("select",{className:"select",value:form.correct,onChange:e=>setForm({...form,correct:e.target.value})}, ["A","B","C","D"].map(l=>React.createElement("option",{key:l,value:l},l)))),
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Difficulty"), React.createElement("select",{className:"select",value:form.difficulty,onChange:e=>setForm({...form,difficulty:e.target.value})}, DIFFICULTIES.map(d=>React.createElement("option",{key:d,value:d},d)))),
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Year"), React.createElement("input",{type:"number", className:"input",value:form.year,onChange:e=>setForm({...form,year:e.target.value})}))
        ),
        React.createElement("div",{className:"grid grid-2"},
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Subject"), React.createElement("select",{className:"select",value:form.subject,onChange:e=>setForm({...form,subject:e.target.value})}, SUBJECTS.map(s=>React.createElement("option",{key:s.id,value:s.name},s.name)))),
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Topic"), React.createElement("input",{className:"input",value:form.topic,onChange:e=>setForm({...form,topic:e.target.value})}))
        ),
        React.createElement("div",{className:"grid grid-2"},
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Exam"), React.createElement("select",{className:"select",value:form.exam,onChange:e=>setForm({...form,exam:e.target.value})}, EXAMS.map(x=>React.createElement("option",{key:x.id,value:x.name},x.name)))),
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Negative Marking"), React.createElement("input",{type:"number",step:"0.25", className:"input",value:form.negativeMarking,onChange:e=>setForm({...form,negativeMarking:e.target.value})}))
        ),
        React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Explanation"), React.createElement("textarea",{className:"input",rows:2,value:form.explanation,onChange:e=>setForm({...form,explanation:e.target.value})})),
        React.createElement("div",{className:"grid grid-2"},
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Source"), React.createElement("input",{className:"input",value:form.source,onChange:e=>setForm({...form,source:e.target.value})})),
          React.createElement("div",{className:"field"}, React.createElement("span",{className:"label"},"Tags (comma separated)"), React.createElement("input",{className:"input",value:form.tags,onChange:e=>setForm({...form,tags:e.target.value})}))
        ),
        React.createElement("button",{className:"btn btn-primary", type:"submit"}, React.createElement(Icon,{name:"plus",size:15}), "Add Question to Bank")
      )
    ),
    tab==="content" && React.createElement("div",{className:"grid grid-2"},
      React.createElement("div",{className:"card card-pad"}, React.createElement("h3",{className:"h3",style:{marginBottom:10}},"Study Notes"), React.createElement("p",{className:"small muted"}, STUDY_NOTES.length+" notes published across "+new Set(STUDY_NOTES.map(n=>n.subject)).size+" subjects.")),
      React.createElement("div",{className:"card card-pad"}, React.createElement("h3",{className:"h3",style:{marginBottom:10}},"Current Affairs"), React.createElement("p",{className:"small muted"}, CURRENT_AFFAIRS.length+" capsules published this month across "+new Set(CURRENT_AFFAIRS.map(n=>n.category)).size+" categories."))
    )
  );
}
