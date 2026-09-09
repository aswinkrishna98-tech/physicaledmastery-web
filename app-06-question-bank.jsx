// ============================================================================
// PE PREP — QUESTION BANK: filters + practice launcher
// ============================================================================

const DIFFICULTIES = ["Easy","Moderate","Hard","Expert"];
const QUESTION_TYPES = ["MCQ","Assertion & Reason","Match the Following","Statement-based","Multiple Correct","Case-based"];

function FilterChipGroup({label, options, value, onChange, multi}){
  return React.createElement("div",{className:"field"},
    React.createElement("span",{className:"label"}, label),
    React.createElement("div",{className:"chip-select"},
      options.map(opt=>{
        const active = multi ? value.includes(opt) : value===opt;
        return React.createElement("button",{key:opt, type:"button", className:"chip"+(active?" active":""), onClick:()=>{
          if(multi){ onChange(active ? value.filter(v=>v!==opt) : [...value, opt]); }
          else{ onChange(active ? null : opt); }
        }}, opt);
      })
    )
  );
}

function QuestionBankPage(){
  const {routeParams, goto, isPro, hasExamAccess} = useApp();
  const [exam,setExam] = useState(routeParams.exam || null);
  const [subject,setSubject] = useState(routeParams.subject || null);
  const [difficulty,setDifficulty] = useState([]);
  const [qtype,setQtype] = useState([]);
  const [count,setCount] = useState(20);
  const [engine,setEngine] = useState(null); // {questions,title}

  const examNames = EXAMS.map(e=>e.name);
  const subjectNames = useMemo(()=>[...new Set(QUESTION_BANK.map(q=>q.subject))].sort(),[]);

  const filtered = useMemo(()=>{
    return QUESTION_BANK.filter(q=>{
      if(exam && !q.exam.some(e=>exam.toLowerCase().includes(e.toLowerCase())||e.toLowerCase().includes(exam.toLowerCase().split(" ")[0]))) return false;
      if(subject && q.subject!==subject) return false;
      if(difficulty.length && !difficulty.includes(q.difficulty)) return false;
      if(qtype.length && !qtype.includes(q.type)) return false;
      return true;
    });
  },[exam,subject,difficulty,qtype]);

  // Question Bank / Practice is Pro-only. A free-plan user with a single-exam
  // pass still gets in, but only once they've filtered down to that exam —
  // otherwise there's no way to keep "some questions" out of a bank that
  // isn't itself exam-partitioned. Mock Tests (a separate page) are the one
  // feature that stays available to everyone on the free plan.
  const examObj = exam ? EXAMS.find(e=>e.name===exam) : null;
  const unlocked = isPro || (examObj && hasExamAccess(examObj.id));

  if(engine){
    return React.createElement(TestEngine,{
      mode:"practice", questions:engine.questions, title:engine.title,
      onExit:()=>setEngine(null)
    });
  }

  if(!unlocked){
    return React.createElement("div",{className:"container", style:{padding:"36px 24px 64px"}},
      React.createElement(SectionHeading,{eyebrow:"Question Bank", title:"Build your own practice set", lede:"Question Bank and Practice are a Pro feature — Mock Tests stay free to try."}),
      React.createElement(MockPaywall,{
        title:"Practice is a Pro feature",
        desc:"Upgrade to Pro for unlimited practice across every subject and exam, or grab a single-exam pass for just the exam you're preparing for. Mock tests remain free to try.",
      }),
      React.createElement("div",{className:"card card-pad", style:{marginTop:16}},
        React.createElement("span",{className:"label"}, "Already hold a single-exam pass? Pick your exam to unlock it"),
        React.createElement("select",{className:"select", style:{marginTop:8}, value:exam||"", onChange:e=>setExam(e.target.value||null)},
          React.createElement("option",{value:""},"Choose your exam…"),
          examNames.map(n=>React.createElement("option",{key:n,value:n},n))
        )
      )
    );
  }

  const sliderMax = Math.max(5,filtered.length);

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 64px"}},
    React.createElement(SectionHeading,{eyebrow:"Question Bank", title:"Build your own practice set", lede:"Filter by exam, subject, difficulty and question type — then start practising with instant explanations."}),
    React.createElement("div",{className:"practice-shell", style:{gridTemplateColumns:"300px 1fr"}},
      React.createElement("div",{className:"card card-pad", style:{position:"sticky", top:88}},
        React.createElement("h3",{className:"h3", style:{marginBottom:16}}, "Filters"),
        React.createElement("div",{className:"flex-col gap-16"},
          React.createElement("div",{className:"field"},
            React.createElement("span",{className:"label"},"Exam"),
            React.createElement("select",{className:"select", value:exam||"", onChange:e=>setExam(e.target.value||null)},
              React.createElement("option",{value:""},"All Exams"),
              examNames.map(n=>React.createElement("option",{key:n,value:n},n))
            )
          ),
          React.createElement("div",{className:"field"},
            React.createElement("span",{className:"label"},"Subject"),
            React.createElement("select",{className:"select", value:subject||"", onChange:e=>setSubject(e.target.value||null)},
              React.createElement("option",{value:""},"All Subjects"),
              subjectNames.map(n=>React.createElement("option",{key:n,value:n},n))
            )
          ),
          React.createElement(FilterChipGroup,{label:"Difficulty", options:DIFFICULTIES, value:difficulty, onChange:setDifficulty, multi:true}),
          React.createElement(FilterChipGroup,{label:"Question Type", options:QUESTION_TYPES, value:qtype, onChange:setQtype, multi:true}),
          React.createElement("div",{className:"field"},
            React.createElement("span",{className:"label"}, "Number of Questions: "+Math.min(count,sliderMax)),
            React.createElement("input",{type:"range", min:Math.min(5,sliderMax), max:sliderMax, value:Math.min(count,sliderMax), onChange:e=>setCount(+e.target.value)})
          ),
          React.createElement("button",{className:"btn btn-outline btn-sm", onClick:()=>{setExam(null);setSubject(null);setDifficulty([]);setQtype([]);}}, "Clear Filters")
        )
      ),
      React.createElement("div",null,
        React.createElement("div",{className:"card card-pad", style:{marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14}},
          React.createElement("div",null,
            React.createElement("div",{className:"h2"}, filtered.length+" questions match your filters"),
            React.createElement("div",{className:"small muted"}, "Ready to practice "+Math.min(count,filtered.length||0)+" questions now")
          ),
          React.createElement("button",{className:"btn btn-primary", disabled:filtered.length===0, onClick:()=>setEngine({questions: pick(filtered, Math.min(count,filtered.length)), title: subject||exam||"Custom Practice Set"})},
            "Start Practice", React.createElement(Icon,{name:"chevronRight",size:16}))
        ),
        filtered.length===0 ? React.createElement("div",{className:"empty-state card"}, React.createElement(Icon,{name:"search",size:34}), React.createElement("p",{style:{marginTop:10}},"No questions match these filters yet. Try widening your selection — the architecture supports thousands more once the full bank is loaded.")) :
        React.createElement("div",{className:"flex-col gap-10"},
          filtered.slice(0,12).map(q=>React.createElement("div",{key:q.id, className:"card card-pad card-hover", style:{cursor:"pointer"}, onClick:()=>setEngine({questions:[q, ...pick(filtered.filter(x=>x.id!==q.id),Math.min(9,filtered.length-1))], title:q.subject})},
            React.createElement("div",{className:"flex justify-between wrap gap-8", style:{marginBottom:8}},
              React.createElement("div",{className:"flex gap-8 wrap"},
                React.createElement("span",{className:"pill pill-info"}, q.subject),
                React.createElement(DifficultyPill,{level:q.difficulty}),
                React.createElement("span",{className:"pill"}, q.type)
              ),
              React.createElement(BookmarkButton,{type:"questions", id:q.id})
            ),
            React.createElement("p",{className:"small", style:{fontWeight:500}}, q.question.split("\n")[0])
          )),
          filtered.length>12 && React.createElement("p",{className:"small muted", style:{textAlign:"center", padding:12}}, "+ "+(filtered.length-12)+" more questions in this filter — start practice to work through the full set.")
        )
      )
    )
  );
}
