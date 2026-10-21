// ============================================================================
// PE PREP — MOCK TESTS: list, setup, results & analytics
// ============================================================================

const TEST_LENGTHS = [
  {id:"quick", label:"Quick", questions:15, minutes:20},
  {id:"standard", label:"Standard", questions:25, minutes:35},
  {id:"full", label:"Full Length", questions:40, minutes:60},
];

function MockTestsPage(){
  const {goto, isPro, profile} = useApp();
  const examsSorted = useMemo(()=>{
    if(!profile.preferredExam) return EXAMS;
    const idx = EXAMS.findIndex(e=>e.id===profile.preferredExam);
    if(idx<=0) return EXAMS;
    const copy = [...EXAMS]; const [pref] = copy.splice(idx,1); copy.unshift(pref); return copy;
  },[profile.preferredExam]);
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 64px"}},
    React.createElement(SectionHeading,{eyebrow:"Mock Tests", title:"Realistic, timed exam simulations", lede:"Timed test mode with a question palette, configurable negative marking and auto-submit. Check each exam's current official pattern — ours is a practice simulation.", right:
      !isPro && React.createElement("span",{className:"pill pill-warning"}, "Free Plan · full result analysis needs Pro")
    }),
    React.createElement("div",{className:"grid grid-4"},
      examsSorted.map(ex=>React.createElement("div",{key:ex.id,className:"card card-pad card-hover"},
        React.createElement("div",{className:"flex justify-between items-center", style:{marginBottom:12}},
          React.createElement("div",{className:"exam-swatch", style:{background:"var(--ink)"}}, ex.short.slice(0,2)),
          ex.id===profile.preferredExam && React.createElement("span",{className:"pill pill-gold", style:{fontSize:10}}, "Your Exam")
        ),
        React.createElement("h3",{className:"h3"}, ex.short),
        React.createElement("p",{className:"tiny muted", style:{margin:"6px 0 12px"}}, ex.pattern),
        React.createElement("button",{className:"btn btn-outline btn-sm btn-block", onClick:()=>goto("/mock-test-setup",{examId:ex.id})}, "Configure Mock Test")
      ))
    )
  );
}

function MockTestSetupPage(){
  // Anyone — free or Pro — can start and complete any mock test. The plan
  // only affects how much of the RESULT they see afterwards (see
  // MockResultPage) — there's no pre-test paywall any more.
  const {routeParams, goto, isPro} = useApp();
  const exam = EXAMS.find(e=>e.id===routeParams.examId) || EXAMS[0];
  const [length,setLength] = useState(TEST_LENGTHS[1]);
  const [engineConfig,setEngineConfig] = useState(null);
  const cfg = EXAM_CONFIG[exam.id] || {negative:0, negativeKnown:false};
  const defaultMarking = (MARKING_OPTIONS.find(m=>Math.abs(m.negative-cfg.negative)<0.001) || MARKING_OPTIONS[0]).id;
  const [markingId,setMarkingId] = useState(defaultMarking);
  const marking = MARKING_OPTIONS.find(m=>m.id===markingId) || MARKING_OPTIONS[0];
  const examPool = useMemo(()=>questionsForExam(exam.id),[exam.id]);
  const generalPool = useMemo(()=>QUESTION_BANK.filter(q=>!isSchoolQuestion(q)),[]);
  const taggedCount = examPool.length;
  const effectiveCount = Math.min(length.questions, generalPool.length);
  const topUp = Math.max(0, effectiveCount - taggedCount);

  if(engineConfig){
    return React.createElement(TestEngine,{
      mode:"mock", questions:engineConfig.questions, title:exam.short+" Mock Test",
      examMeta:{duration:length.minutes, negativeMarking:marking.negative, examName:exam.short},
      onFinish:(result)=>goto("/mock-result",{result:{...result, examShort:exam.short, examId:exam.id}})
    });
  }

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 64px", maxWidth:760}},
    React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/mock-tests")}, React.createElement(Icon,{name:"chevronLeft",size:14}),"All Mock Tests"),
    React.createElement("div",{className:"card card-pad", style:{marginTop:16}},
      React.createElement("div",{className:"flex items-center gap-14", style:{marginBottom:20}},
        React.createElement("div",{className:"exam-swatch", style:{width:52,height:52,background:"var(--ink)"}}, exam.short.slice(0,2)),
        React.createElement("div",null, React.createElement("h2",{className:"h1"}, exam.short+" Mock Test"), React.createElement("p",{className:"small muted"}, exam.pattern))
      ),
      !isPro && React.createElement("div",{className:"pill pill-warning", style:{marginBottom:18}}, "Free Plan · your score is always free — full analysis needs Pro or the "+exam.short+" Pass"),
      React.createElement("div",{className:"field", style:{marginBottom:20}},
        React.createElement("span",{className:"label"}, "Test Length"),
        React.createElement("div",{className:"chip-select", style:{marginTop:8}},
          TEST_LENGTHS.map(l=>React.createElement("button",{key:l.id, className:"chip"+(length.id===l.id?" active":""), onClick:()=>setLength(l)},
            l.label+" · "+l.questions+"Q / "+l.minutes+"min"))
        )
      ),
      React.createElement("div",{className:"field", style:{marginBottom:12}},
        React.createElement("span",{className:"label"}, "Negative marking"),
        React.createElement("div",{className:"chip-select", style:{marginTop:8}},
          MARKING_OPTIONS.map(m=>React.createElement("button",{key:m.id, className:"chip"+(markingId===m.id?" active":""), onClick:()=>setMarkingId(m.id), "aria-pressed": markingId===m.id}, m.label))
        ),
        React.createElement("p",{className:"tiny muted", style:{marginTop:8}}, cfg.negativeKnown
          ? "Default set from reported "+exam.short+" pattern — confirm in the official notification."
          : "The official scheme for "+exam.short+" isn't confirmed here. Pick the one your notification specifies.")
      ),
      React.createElement("div",{className:"grid grid-3", style:{marginBottom:22}},
        React.createElement(StatTile,{label:"Questions", value:effectiveCount}),
        React.createElement(StatTile,{label:"Duration", value:length.minutes+" min"}),
        React.createElement(StatTile,{label:"Negative Marking", value: marking.negative>0 ? "−"+(Math.round(marking.negative*100)/100) : "None"})
      ),
      React.createElement("p",{className:"tiny muted", style:{marginBottom:18}},
        taggedCount===0
          ? "No questions are tagged specifically for "+exam.short+" yet, so this test uses general Physical Education questions ("+generalPool.length+" in the bank)."
          : taggedCount>=effectiveCount
            ? "Questions are drawn from the "+taggedCount+" "+exam.short+"-tagged questions in the bank."
            : "Only "+taggedCount+" questions in the bank are tagged for "+exam.short+"; the other "+topUp+" are general Physical Education questions to fill the test."),
      React.createElement("button",{className:"btn btn-primary btn-block", onClick:()=>{
        const chosen = pick(examPool, Math.min(effectiveCount, examPool.length));
        const have = new Set(chosen.map(q=>q.id));
        const fill = pick(generalPool.filter(q=>!have.has(q.id)), Math.max(0, effectiveCount - chosen.length));
        setEngineConfig({questions: [...chosen, ...fill]});
      }}, "Begin Mock Test", React.createElement(Icon,{name:"chevronRight",size:16}))
    )
  );
}

function CoachInsights({result, weakest, strongest}){
  const lines = [];
  if(strongest) lines.push(`You performed strongly in ${strongest.subject} (${strongest.accuracy}% accuracy) — keep reinforcing it with weekly revision.`);
  if(weakest) lines.push(`Your accuracy in ${weakest.subject} is ${weakest.accuracy}%, noticeably below your average. This should be your next practice priority.`);
  if(result.accuracy < 60) lines.push("Your overall accuracy suggests concepts need reinforcement before attempting another full mock — revisit short notes first.");
  else if(result.avgTimePerQ > 70) lines.push("You're accurate but slower than ideal — timed sectional drills will help build speed without losing accuracy.");
  else lines.push("Your pace and accuracy are well balanced. Focus on consistency across sections in your next attempt.");
  return React.createElement("div",{className:"card card-pad", style:{background:"linear-gradient(120deg, var(--info-100), var(--surface))"}},
    React.createElement("div",{className:"flex items-center gap-10", style:{marginBottom:14}},
      React.createElement("div",{className:"exam-swatch", style:{width:36,height:36,background:"var(--info)"}}, React.createElement(Icon,{name:"brain",size:18})),
      React.createElement("h3",{className:"h3"}, "Your Preparation Coach")
    ),
    React.createElement("div",{className:"flex-col gap-10"}, lines.map((l,i)=>React.createElement("p",{key:i,className:"small"}, "• "+l)))
  );
}

function AnswerReview({review}){
  const [filter,setFilter] = useState("wrong");
  const rows = review.map((r,i)=>({...r, n:i+1, q:QUESTIONS_BY_ID[r.id]})).filter(r=>r.q);
  const status = r => r.selectedText==null ? "skipped" : (r.selectedText===r.correctText ? "right" : "wrong");
  const shown = rows.filter(r=> filter==="all" ? true : filter==="wrong" ? status(r)!=="right" : status(r)===filter);
  return React.createElement("div",{className:"card card-pad", style:{marginBottom:24}},
    React.createElement("div",{className:"flex justify-between items-center wrap gap-12", style:{marginBottom:12}},
      React.createElement("h3",{className:"h3"}, "Answer Review"),
      React.createElement("div",{className:"chip-select"},
        [["wrong","Wrong & skipped"],["right","Correct"],["all","All"]].map(([id,l])=>
          React.createElement("button",{key:id, className:"chip"+(filter===id?" active":""), onClick:()=>setFilter(id), "aria-pressed":filter===id}, l)))
    ),
    shown.length===0 && React.createElement("p",{className:"small muted"}, "Nothing to show for this filter."),
    React.createElement("div",{className:"flex-col gap-10"},
      shown.map(r=>React.createElement("div",{key:r.id, style:{padding:"12px 0", borderBottom:"1px solid var(--border)"}},
        React.createElement("div",{className:"small", style:{fontWeight:600}}, "Q"+r.n+". "+r.q.question.split("\n")[0]),
        React.createElement("div",{className:"tiny", style:{marginTop:6}},
          React.createElement("span",{className:"pill "+(status(r)==="right"?"pill-success":status(r)==="wrong"?"pill-danger":"")}, status(r)==="right"?"Correct":status(r)==="wrong"?"Wrong":"Not attempted"),
          " ", r.selectedText!=null && ("Your answer: "+r.selectedText+" · "), "Correct: "+r.correctText),
        React.createElement("p",{className:"tiny muted", style:{marginTop:6}}, r.q.explanation)
      ))
    )
  );
}

function MockResultPage(){
  // "Let them finish, then lock results": every user — free or Pro — can
  // start and complete any mock test. The score is always shown for free.
  // Everything past that (rank, percentile, subject/difficulty breakdowns,
  // accuracy trend, coach insights, "what to study next") is a Pro-only
  // detailed analysis, gated here rather than before the test begins.
  const {routeParams, goto, mockHistory, saveMockResult, isPro, hasExamAccess, upgradePlan, paymentsLive, checkoutBusy} = useApp();
  const result = routeParams.result;
  const savedRef = useRef(false);
  useEffect(()=>{
    if(result && !savedRef.current){ saveMockResult(result); savedRef.current = true; }
    // eslint-disable-next-line
  },[result]);

  if(!result) return React.createElement("div",{className:"container", style:{padding:60}},
    React.createElement("div",{className:"empty-state"}, "No recent mock test result found.",
      React.createElement("div",{style:{marginTop:14}}, React.createElement("button",{className:"btn btn-primary", onClick:()=>goto("/mock-tests")}, "Take a Mock Test"))));

  // Full Pro unlocks every exam's results; a cheaper single-exam Pass (see
  // Pricing) unlocks the same detailed analysis but only for this exam.
  const unlocked = isPro || hasExamAccess(result.examId);
  const examShort = result.examShort || "this exam";
  const sorted = [...result.subjectPerf].sort((a,b)=>a.accuracy-b.accuracy);
  const weakest = sorted[0], strongest = sorted[sorted.length-1];
  const pctScore = result.maxScore ? Math.round((result.score/result.maxScore)*1000)/10 : 0;
  const trend = [...mockHistory].slice(0,6).reverse().map((m,i)=>({label:"T"+(i+1), value:m.accuracy}));
  if(trend.length===0) trend.push({label:"T1",value:result.accuracy});

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement(SectionHeading,{eyebrow:result.examShort||"Mock Test", title:"Your Result", lede: new Date(result.date).toLocaleString()}),

    React.createElement("div",{className:"card card-pad", style:{textAlign:"center", marginBottom:24, padding:"40px 24px"}},
      React.createElement("div",{className:"stat-label"}, "Your Score"),
      React.createElement("div",{className:"num", style:{fontSize:44, fontWeight:700, margin:"10px 0"}}, result.score+" / "+result.maxScore),
      React.createElement("p",{className:"small muted"}, result.attempted+" of "+result.totalQuestions+" questions attempted · "+result.accuracy+"% accuracy")
    ),

    !unlocked
      ? React.createElement("div",{style:{marginBottom:24}},
          React.createElement(MockPaywall,{
            title:"Unlock Your Full Result Analysis",
            desc:"Your score is always free to see. Upgrade to Pro (unlocks every exam) or get the "+examShort+" Pass — ₹"+EXAM_PASS_PRICE_INR+" for unlimited "+examShort+" mock tests, answer review, subject/difficulty breakdowns, accuracy trend and coaching insights for this exam only.",
            examId: result.examId, examShort,
          })
        )
      : React.createElement(React.Fragment,null,
          React.createElement("div",{className:"grid grid-3", style:{marginBottom:24}},
            React.createElement("div",{className:"card card-pad", style:{textAlign:"center"}},
              React.createElement(DonutChart,{value:result.accuracy, size:90, color:"var(--info)", label:result.accuracy+"%"}),
              React.createElement("div",{className:"tiny muted", style:{marginTop:6}}, "Accuracy")
            ),
            React.createElement(StatTile,{label:"Score %", value:pctScore+"%", sub: result.negativeMarking>0 ? "after −"+(Math.round(result.negativeMarking*100)/100)+" negative marking" : "no negative marking"}),
            React.createElement(StatTile,{label:"Marks lost to wrong answers", value: result.marksLost!=null ? result.marksLost : "—", sub:"Rank & percentile need real cohort data — coming once enough aspirants have tested", subClass:""})
          ),
          React.createElement("div",{className:"grid grid-4", style:{marginBottom:28}},
            React.createElement(StatTile,{label:"Attempted", value:result.attempted+"/"+result.totalQuestions}),
            React.createElement(StatTile,{label:"Correct", value:result.correct, subClass:"pill-success", sub:"correct"}),
            React.createElement(StatTile,{label:"Incorrect", value:result.incorrect, subClass:"pill-danger", sub:"incorrect"}),
            React.createElement(StatTile,{label:"Unattempted", value:result.unattempted})
          ),
          React.createElement("div",{className:"grid grid-2", style:{marginBottom:24}},
            React.createElement("div",{className:"card card-pad"},
              React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Subject-wise Performance"),
              React.createElement(BarChart,{data: result.subjectPerf.map(s=>({label:s.subject,value:s.accuracy}))})
            ),
            React.createElement("div",{className:"card card-pad"},
              React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Difficulty-wise Performance"),
              React.createElement(BarChart,{data: result.diffPerf.map(s=>({label:s.difficulty,value:s.accuracy})), colorFn:()=>"var(--info)"})
            )
          ),
          React.createElement("div",{className:"grid grid-2", style:{marginBottom:24}},
            React.createElement("div",{className:"card card-pad"},
              React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Accuracy Trend (recent mocks)"),
              React.createElement(LineChart,{points:trend})
            ),
            React.createElement("div",{className:"card card-pad"},
              React.createElement("h3",{className:"h3", style:{marginBottom:6}}, "Time Analysis"),
              React.createElement("div",{className:"grid grid-2", style:{marginTop:12}},
                React.createElement(StatTile,{label:"Total Time", value:fmtTime(result.totalTime)}),
                React.createElement(StatTile,{label:"Avg Time / Question", value:result.avgTimePerQ+"s"})
              )
            )
          ),
          React.createElement("div",{className:"grid grid-2", style:{marginBottom:24}},
            React.createElement(CoachInsights,{result, weakest, strongest}),
            weakest && React.createElement("div",{className:"card card-pad"},
              React.createElement("div",{className:"eyebrow", style:{marginBottom:8}}, "What should you study next?"),
              React.createElement("h3",{className:"h1", style:{fontSize:22}}, weakest.subject+" — Needs Improvement"),
              React.createElement("p",{className:"small muted", style:{margin:"8px 0 16px"}}, "Accuracy: "+weakest.accuracy+"%"),
              React.createElement("button",{className:"btn btn-primary", onClick:()=>goto("/question-bank",{subject:weakest.subject})}, "Practice "+weakest.subject)
            )
          ),
          result.review && React.createElement(AnswerReview,{review:result.review})
        ),

    React.createElement("div",{className:"flex gap-12 wrap"},
      React.createElement("button",{className:"btn btn-primary", onClick:()=>goto("/mock-tests")}, "Take Another Mock Test"),
      React.createElement("button",{className:"btn btn-outline", onClick:()=>goto("/dashboard")}, "View Full Dashboard"),
      React.createElement("button",{className:"btn btn-outline", onClick:()=>goto("/my-mistakes")}, "Review Mistakes")
    )
  );
}
