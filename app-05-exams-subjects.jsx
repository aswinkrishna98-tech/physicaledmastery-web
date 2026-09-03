// ============================================================================
// PE PREP — EXAMS LIST / DETAIL, SUBJECTS BROWSER
// ============================================================================

function ExamsPage(){
  return React.createElement("div",{className:"container", style:{padding:"40px 24px 64px"}},
    React.createElement(SectionHeading,{eyebrow:"Exams", title:"Choose Your Exam", lede:"Every exam has a customized dashboard, question set and mock-test pattern matched to its real syllabus."}),
    React.createElement("div",{className:"grid grid-4"}, EXAMS.map(ex=>React.createElement(ExamCard,{key:ex.id, exam:ex})))
  );
}

function ExamDetailPage(){
  const {routeParams, goto} = useApp();
  const exam = EXAMS.find(e=>e.id===routeParams.id) || EXAMS[0];
  const relatedQuestions = QUESTION_BANK.filter(q=>q.exam.some(e=>exam.name.toLowerCase().includes(e.toLowerCase().split(" ")[0])));
  return React.createElement("div",{className:"container", style:{padding:"40px 24px 64px"}},
    React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/exams")}, React.createElement(Icon,{name:"chevronLeft",size:14}), "All Exams"),
    React.createElement("div",{className:"flex items-center gap-16", style:{margin:"18px 0"}},
      React.createElement("div",{className:"exam-swatch", style:{width:60,height:60,fontSize:20,background:"var(--ink)"}}, exam.short.slice(0,2)),
      React.createElement("div",null,
        React.createElement("h1",{className:"h1"}, exam.name),
        React.createElement("p",{className:"small muted"}, exam.body)
      )
    ),
    React.createElement("div",{className:"grid grid-4", style:{marginBottom:28}},
      React.createElement(StatTile,{label:"Mock Tests", value:exam.tests}),
      React.createElement(StatTile,{label:"Question Bank", value:exam.questions.toLocaleString()+"+"}),
      React.createElement(StatTile,{label:"Difficulty", value:exam.difficulty}),
      React.createElement(StatTile,{label:"Pattern", value:exam.pattern.split("·")[0].trim()})
    ),
    React.createElement("div",{className:"grid grid-2"},
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Syllabus Coverage"),
        React.createElement("div",{className:"chip-select"}, exam.syllabus.map(s=>React.createElement("span",{key:s,className:"chip"}, s))),
        React.createElement("div",{className:"lane-divider", style:{margin:"18px 0"}}),
        React.createElement("h3",{className:"h3", style:{marginBottom:10}}, "Test Pattern"),
        React.createElement("p",{className:"small muted"}, exam.pattern)
      ),
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Get Started"),
        React.createElement("div",{className:"flex-col gap-12"},
          React.createElement("button",{className:"btn btn-primary btn-block", onClick:()=>goto("/question-bank",{exam:exam.name})}, "Practice "+exam.short+" Questions"),
          React.createElement("button",{className:"btn btn-outline btn-block", onClick:()=>goto("/mock-test-setup",{examId:exam.id})}, "Take a Full Mock Test"),
          React.createElement("button",{className:"btn btn-ghost btn-block", onClick:()=>goto("/previous-papers",{exam:exam.short})}, "View Previous Year Papers")
        )
      )
    ),
    relatedQuestions.length>0 && React.createElement("div",{style:{marginTop:32}},
      React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Sample Questions for "+exam.short),
      React.createElement("div",{className:"flex-col gap-10"},
        relatedQuestions.slice(0,3).map(q=>React.createElement("div",{key:q.id,className:"card card-pad small"},
          React.createElement("div",{className:"flex justify-between", style:{marginBottom:6}},
            React.createElement("span",{className:"pill pill-info"}, q.subject), React.createElement(DifficultyPill,{level:q.difficulty})),
          q.question.split("\n")[0]
        ))
      )
    )
  );
}

function SubjectsPage(){
  const {goto} = useApp();
  const liveCounts = useMemo(()=>{
    const c = {};
    QUESTION_BANK.forEach(q=>{ c[q.subject] = (c[q.subject]||0)+1; });
    return c;
  },[]);
  const groups = useMemo(()=>{
    const g = {};
    SUBJECTS.forEach(s=>{ g[s.group] = g[s.group]||[]; g[s.group].push(s); });
    return g;
  },[]);
  return React.createElement("div",{className:"container", style:{padding:"40px 24px 64px"}},
    React.createElement(SectionHeading,{eyebrow:"Subject Taxonomy", title:SUBJECTS.length+" Physical Education Subject Categories", lede:"The full PE curriculum, organized into groups so you always know what to study next."}),
    Object.entries(groups).map(([group,list])=>React.createElement("div",{key:group},
      React.createElement("div",{className:"subject-group-label"}, group),
      React.createElement("div",{className:"grid grid-4"},
        list.map(s=>{
          const liveCount = liveCounts[s.name]||0;
          return React.createElement("div",{key:s.id, className:"subject-card card card-hover", onClick:()=>goto("/question-bank",{subject:s.name})},
            React.createElement("h3",{className:"h3"}, s.name),
            React.createElement("span",{className:"small muted"}, liveCount+" question"+(liveCount===1?"":"s")+" in bank"),
            React.createElement("span",{className:"tiny muted", style:{display:"block", marginTop:2}}, "Full syllabus weight: "+s.count+"+ expected")
          );
        })
      )
    ))
  );
}
