// ============================================================================
// PE PREP — TEST ENGINE: shared Practice + Mock Test runner
// ============================================================================

function QuestionPalette({questions, responses, idx, onJump, groupBySubject}){
  const groups = useMemo(()=>{
    if(!groupBySubject) return [{label:null, items: questions.map((q,i)=>i)}];
    const map = {};
    questions.forEach((q,i)=>{ map[q.subject] = map[q.subject]||[]; map[q.subject].push(i); });
    return Object.entries(map).map(([label,items])=>({label,items}));
  },[questions,groupBySubject]);

  function statusOf(i){
    const r = responses[questions[i].id] || {};
    if(r.marked && r.selected!=null) return "review answered";
    if(r.marked) return "review";
    if(r.selected!=null) return "answered";
    if(r.visited) return "visited notvisited";
    return "notvisited";
  }
  return React.createElement("div",{className:"card card-pad", style:{position:"sticky", top:88}},
    React.createElement("h3",{className:"h3", style:{marginBottom:4}}, "Question Palette"),
    React.createElement("p",{className:"tiny muted", style:{marginBottom:14}}, questions.length+" questions total"),
    groups.map(g=>React.createElement("div",{key:g.label||"all", style:{marginBottom:14}},
      g.label && React.createElement("div",{className:"tiny muted", style:{fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:".05em"}}, g.label),
      React.createElement("div",{className:"palette-grid"},
        g.items.map(i=>{
          const st = statusOf(i);
          const cls = "pnode "+(st.includes("review")?"review":st.includes("answered")?"answered":st.includes("notvisited")&&!st.includes("visited ")?"notvisited":"")+(i===idx?" current":"");
          return React.createElement("button",{key:i, className:cls, onClick:()=>onJump(i)}, i+1);
        })
      )
    )),
    React.createElement("div",{className:"lane-divider", style:{margin:"14px 0"}}),
    React.createElement("div",{className:"flex-col gap-8"},
      [["var(--success)","Answered"],["var(--gold)","Marked for Review"],["var(--surface-2)","Not Visited"],["var(--surface)","Not Answered"]].map(([c,l])=>
        React.createElement("div",{key:l,className:"legend-item"}, React.createElement("span",{className:"legend-dot",style:{background:c,border:"1px solid var(--border-strong)"}}), l)
      )
    )
  );
}

function ConceptBox({concept}){
  if(!concept) return null;
  return React.createElement("div",{className:"concept-box"},
    React.createElement("div",{className:"flex items-center gap-8", style:{marginBottom:6}},
      React.createElement(Icon,{name:"brain",size:17}),
      React.createElement("span",{style:{fontWeight:700}}, "Learn the Concept: "+concept.title)
    ),
    React.createElement("p",{className:"small", style:{marginBottom:8}}, concept.definition),
    React.createElement("ul",null, concept.points.map((p,i)=>React.createElement("li",{key:i}, p))),
    React.createElement("p",{className:"small", style:{marginTop:10}}, React.createElement("b",null,"Memory Trick: "), concept.memoryTrick),
    React.createElement("p",{className:"small", style:{marginTop:6}}, React.createElement("b",null,"Sports Relevance: "), concept.sportsRelevance)
  );
}

function TestEngine({mode, questions:initialQuestions, title, examMeta, onExit, onFinish}){
  const {recordAttempt, notify, toggleBookmark, bookmarks, goto, isSubjectLocked, markRevealed} = useApp();
  const [questions,setQuestions] = useState(initialQuestions);
  const [idx,setIdx] = useState(0);
  const [responses,setResponses] = useState(()=>{
    const r = {}; initialQuestions.forEach(q=>r[q.id]={selected:null, checked:false, marked:false, visited:false, timeSpent:0}); return r;
  });
  const [showSummary,setShowSummary] = useState(false);
  const isMock = mode==="mock";
  const durationSec = examMeta ? examMeta.duration*60 : null;
  const [secondsLeft,setSecondsLeft] = useState(durationSec);
  const [secondsElapsed,setSecondsElapsed] = useState(0);
  const startRef = useRef(Date.now());
  const submittedRef = useRef(false);

  const q = questions[idx];
  const resp = responses[q.id] || {selected:null, checked:false, marked:false, visited:false, timeSpent:0};

  useEffect(()=>{
    setResponses(prev=>prev[q.id] ? (prev[q.id].visited? prev : {...prev, [q.id]:{...prev[q.id], visited:true}}) : {...prev, [q.id]:{selected:null,checked:false,marked:false,visited:true,timeSpent:0}});
    startRef.current = Date.now();
    // eslint-disable-next-line
  },[idx, q.id]);

  useEffect(()=>{
    const t = setInterval(()=>{
      if(isMock){
        setSecondsLeft(s=>{
          if(s<=1){ clearInterval(t); if(!submittedRef.current){ submittedRef.current=true; setTimeout(()=>handleSubmit(true),0); } return 0; }
          return s-1;
        });
      } else {
        setSecondsElapsed(s=>s+1);
      }
    },1000);
    return ()=>clearInterval(t);
    // eslint-disable-next-line
  },[]);

  function touchTime(qid){
    const spent = (Date.now()-startRef.current)/1000;
    setResponses(prev=>({...prev, [qid]:{...prev[qid], timeSpent:(prev[qid]?.timeSpent||0)+spent}}));
    startRef.current = Date.now();
  }

  function selectOption(i){
    if(!isMock && resp.checked) return;
    setResponses(prev=>({...prev, [q.id]:{...prev[q.id], selected:i}}));
  }
  function toggleMark(){
    setResponses(prev=>({...prev, [q.id]:{...prev[q.id], marked: !prev[q.id].marked}}));
  }
  function clearResponse(){
    setResponses(prev=>({...prev, [q.id]:{...prev[q.id], selected:null, checked:false}}));
  }
  function checkAnswer(){
    if(resp.selected==null) { notify("Select an option first"); return; }
    touchTime(q.id);
    recordAttempt(q, resp.selected, resp.timeSpent);
    // Only spend a free-plan reveal if this subject isn't already at its
    // quota — a question that's locked still gets marked right/wrong above
    // (the basic practice mechanic stays free), it just won't unlock the
    // explanation/concept notes below (see the render branch further down).
    if(mode==="practice" && !isSubjectLocked(q.subject, q.id)){ markRevealed(q); }
    setResponses(prev=>({...prev, [q.id]:{...prev[q.id], checked:true}}));
  }
  function goNext(){ touchTime(q.id); setIdx(i=>Math.min(questions.length-1, i+1)); }
  function goPrev(){ touchTime(q.id); setIdx(i=>Math.max(0, i-1)); }
  function jump(i){ touchTime(q.id); setIdx(i); }
  function addRelated(rid){
    const rq = QUESTIONS_BY_ID[rid];
    if(!rq) return;
    let targetIdx = questions.findIndex(x=>x.id===rid);
    if(targetIdx===-1){
      setQuestions(prev=>[...prev, rq]);
      setResponses(prev=>({...prev, [rq.id]: prev[rq.id]||{selected:null,checked:false,marked:false,visited:false,timeSpent:0}}));
      targetIdx = questions.length;
      notify("Added related question to this set");
    }
    touchTime(q.id);
    setIdx(targetIdx);
  }

  function handleSubmit(auto){
    if(mode==="practice"){
      setShowSummary(true);
      return;
    }
    // Mock scoring
    touchTime(q.id);
    const neg = examMeta?.negativeMarking ?? 0.25;
    let correct=0, incorrect=0, unattempted=0;
    const subjectMap = {};
    const diffMap = {};
    let totalTime = 0;
    questions.forEach(qq=>{
      const r = responses[qq.id] || {};
      totalTime += r.timeSpent||0;
      subjectMap[qq.subject] = subjectMap[qq.subject] || {correct:0,total:0};
      subjectMap[qq.subject].total++;
      diffMap[qq.difficulty] = diffMap[qq.difficulty] || {correct:0,total:0};
      diffMap[qq.difficulty].total++;
      if(r.selected==null){ unattempted++; }
      else if(r.selected===qq.correctIndex){ correct++; subjectMap[qq.subject].correct++; diffMap[qq.difficulty].correct++; recordAttempt(qq, r.selected, r.timeSpent); }
      else { incorrect++; recordAttempt(qq, r.selected, r.timeSpent); }
    });
    const score = Math.max(0, correct*1 - incorrect*neg);
    const attempted = correct+incorrect;
    const accuracy = attempted>0 ? Math.round((correct/attempted)*100) : 0;
    const subjectPerf = Object.entries(subjectMap).map(([subject,s])=>({subject, accuracy: s.total? Math.round((s.correct/s.total)*100):0, total:s.total}));
    const diffPerf = Object.entries(diffMap).map(([difficulty,s])=>({difficulty, accuracy: s.total? Math.round((s.correct/s.total)*100):0, total:s.total}));
    const result = {
      id:"mock-"+Date.now(), title: title||"Mock Test", date: new Date().toISOString(),
      totalQuestions: questions.length, correct, incorrect, unattempted, attempted, score: Math.round(score*100)/100,
      maxScore: questions.length, accuracy, totalTime: Math.round(totalTime), avgTimePerQ: attempted? Math.round(totalTime/attempted):0,
      subjectPerf, diffPerf, negativeMarking:neg, auto: !!auto,
    };
    onFinish(result);
  }

  if(showSummary && mode==="practice"){
    const answered = Object.values(responses).filter(r=>r.selected!=null);
    const correct = questions.filter(qq=>responses[qq.id]?.selected===qq.correctIndex).length;
    const wrong = questions.filter(qq=>responses[qq.id]?.checked && responses[qq.id]?.selected!==qq.correctIndex);
    return React.createElement("div",{className:"container", style:{padding:"40px 24px 64px", maxWidth:820}},
      React.createElement("div",{className:"card card-pad", style:{textAlign:"center"}},
        React.createElement(DonutChart,{value: answered.length? Math.round((correct/answered.length)*100):0, size:150, color:"var(--success)"}),
        React.createElement("h2",{className:"h1", style:{marginTop:16}}, "Practice Session Complete"),
        React.createElement("p",{className:"muted small", style:{marginTop:6}}, correct+" correct out of "+answered.length+" attempted ("+questions.length+" total)")
      ),
      React.createElement("div",{className:"grid grid-4", style:{margin:"24px 0"}},
        React.createElement(StatTile,{label:"Attempted", value:answered.length}),
        React.createElement(StatTile,{label:"Correct", value:correct, subClass:"pill-success"}),
        React.createElement(StatTile,{label:"Incorrect", value:answered.length-correct, subClass:"pill-danger"}),
        React.createElement(StatTile,{label:"Time Spent", value:fmtTime(secondsElapsed)})
      ),
      wrong.length>0 && React.createElement("div",{className:"card card-pad", style:{marginBottom:20}},
        React.createElement("h3",{className:"h3", style:{marginBottom:12}}, "Review Your Mistakes"),
        React.createElement("div",{className:"flex-col gap-10"},
          wrong.map(wq=>React.createElement("div",{key:wq.id, className:"small", style:{padding:"10px 0", borderBottom:"1px solid var(--border)"}},
            React.createElement("div",{style:{fontWeight:600, marginBottom:4}}, wq.question.split("\n")[0]),
            React.createElement("div",{className:"muted tiny"}, "Correct answer: "+wq.options[wq.correctIndex])
          ))
        )
      ),
      React.createElement("div",{className:"flex gap-12 wrap"},
        React.createElement("button",{className:"btn btn-primary", onClick:onExit}, "Back to Question Bank"),
        React.createElement("button",{className:"btn btn-outline", onClick:()=>goto("/my-mistakes")}, "Go to My Mistakes"),
        React.createElement("button",{className:"btn btn-outline", onClick:()=>goto("/dashboard")}, "View Dashboard")
      )
    );
  }

  const timeDisplay = isMock ? fmtTime(secondsLeft) : fmtTime(secondsElapsed);
  const low = isMock && secondsLeft < 120;
  const isBookmarked = (bookmarks.questions||[]).includes(q.id);

  return React.createElement("div",{className:"container", style:{padding:"24px 24px 64px"}},
    React.createElement("div",{className:"flex justify-between items-center wrap gap-12", style:{marginBottom:18}},
      React.createElement("div",null,
        React.createElement("h2",{className:"h2"}, title || (isMock ? "Mock Test" : "Practice Session")),
        React.createElement("p",{className:"tiny muted"}, isMock ? "Full-screen exam mode · Negative marking: -"+(examMeta?.negativeMarking??0.25) : "Practice mode · instant explanations")
      ),
      React.createElement("div",{className:"flex items-center gap-10"},
        React.createElement("span",{className:"timer-badge"+(low?" low":"")}, React.createElement(Icon,{name:"clock",size:14}), timeDisplay),
        React.createElement("button",{className:"btn btn-outline btn-sm", onClick:()=>{ if(confirm(isMock?"Submit the test now?":"End this practice session?")) handleSubmit(false); }}, isMock?"Submit Test":"End Practice")
      )
    ),
    React.createElement("div",{className:"practice-shell"},
      React.createElement("div",{className:"card qcard"},
        React.createElement("div",{className:"qmeta"},
          React.createElement("span",{className:"pill pill-info"}, "Question "+(idx+1)+"/"+questions.length),
          React.createElement("span",{className:"pill"}, q.subject),
          React.createElement(DifficultyPill,{level:q.difficulty}),
          React.createElement("span",{className:"pill"}, q.type),
          !isMock && React.createElement("span",{style:{marginLeft:"auto"}}, React.createElement(BookmarkButton,{type:"questions",id:q.id}))
        ),
        React.createElement("p",{className:"qtext"}, q.question),
        React.createElement("div",{className:"options"},
          q.options.map((opt,i)=>{
            let cls="option";
            if(!isMock && resp.checked){
              if(i===q.correctIndex) cls+=" correct";
              else if(i===resp.selected) cls+=" incorrect";
            } else if(resp.selected===i) cls+=" selected";
            return React.createElement("div",{key:i, className:cls, onClick:()=>selectOption(i)},
              React.createElement("span",{className:"option-letter"}, letters(i)),
              React.createElement("span",null, opt)
            );
          })
        ),
        React.createElement("div",{className:"qactions"},
          React.createElement("div",{className:"flex gap-8 wrap"},
            React.createElement("button",{className:"btn btn-outline btn-sm", onClick:goPrev, disabled:idx===0}, React.createElement(Icon,{name:"chevronLeft",size:14}),"Previous"),
            React.createElement("button",{className:"btn btn-outline btn-sm", onClick:toggleMark}, React.createElement(Icon,{name:"flag",size:14}), resp.marked?"Unmark":"Mark for Review"),
            React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:clearResponse}, "Clear Response")
          ),
          React.createElement("div",{className:"flex gap-8 wrap"},
            !isMock && !resp.checked && React.createElement("button",{className:"btn btn-dark btn-sm", onClick:checkAnswer}, "Check Answer"),
            idx<questions.length-1 ?
              React.createElement("button",{className:"btn btn-primary btn-sm", onClick:goNext}, "Next", React.createElement(Icon,{name:"chevronRight",size:14})) :
              React.createElement("button",{className:"btn btn-primary btn-sm", onClick:()=>handleSubmit(false)}, isMock?"Submit Test":"Finish Practice")
          )
        ),
        (!isMock && resp.checked) && (
          isSubjectLocked(q.subject, q.id)
            ? React.createElement("div",{style:{marginTop:4}}, React.createElement(PracticeContentLock,{subject:q.subject}))
            : React.createElement(React.Fragment,null,
                React.createElement("div",{className:"explain-box"},
                  React.createElement("h4",{className:"h3"}, resp.selected===q.correctIndex ? "✅ Correct!" : "❌ Not quite — here's why"),
                  React.createElement("p",{className:"small", style:{marginTop:6}}, q.explanation),
                  React.createElement("p",{className:"tiny muted", style:{marginTop:8}}, "Source: "+q.source)
                ),
                React.createElement(ConceptBox,{concept:q.concept}),
                q.relatedIds?.length>0 && React.createElement("div",{style:{marginTop:14}},
                  React.createElement("span",{className:"label"}, "Related Questions"),
                  React.createElement("div",{className:"flex gap-8 wrap", style:{marginTop:8}},
                    q.relatedIds.map(rid=>{
                      const rq = QUESTIONS_BY_ID[rid];
                      if(!rq) return null;
                      return React.createElement("button",{key:rid, className:"chip", onClick:()=>addRelated(rid)}, rq.topic);
                    })
                  )
                )
              )
        )
      ),
      React.createElement(QuestionPalette,{questions, responses, idx, onJump:jump, groupBySubject:isMock})
    )
  );
}
