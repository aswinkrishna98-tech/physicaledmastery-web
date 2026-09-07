// ============================================================================
// PE PREP — SCHOOL TRACK PAGES (Class XI / XII, CBSE "Physical Activity Trainer")
// Landing page (SchoolPage) + per-grade page (SchoolGradePage) with chapter-wise
// unit tests, a full syllabus bank, and a PYQ/practice-pattern pool. Reuses
// TestEngine (mode:"practice") so the existing free-plan paywall, reveal-lock,
// explanations and concept boxes all just work — gating is keyed off each
// question's own `subject` field, already set correctly in data-school.js.
// ============================================================================

function SchoolPage(){
  const {goto} = useApp();
  return React.createElement("div",{className:"container", style:{padding:"40px 24px 64px"}},
    React.createElement(SectionHeading,{
      eyebrow:"School Track · CBSE Skill Subject 845",
      title:"Physical Activity Trainer — Class XI & XII",
      lede:"Chapter-wise tests, full syllabus practice and PYQs for the CBSE Department of Skill Education subject — built unit-by-unit from the official textbooks, curriculum and Class XII Sample Question Paper."
    }),
    React.createElement("div",{className:"grid grid-2"},
      SCHOOL_CLASSES.map(cls=>React.createElement("div",{key:cls.id, className:"card card-pad card-hover", style:{cursor:"pointer"}, onClick:()=>goto("/school-grade",{classId:cls.id})},
        React.createElement("div",{className:"flex justify-between wrap gap-8", style:{marginBottom:10}},
          React.createElement("span",{className:"pill pill-info"}, cls.grade),
          React.createElement("span",{className:"pill"}, cls.totalMarks+" Marks")
        ),
        React.createElement("h3",{className:"h2", style:{marginBottom:6}}, cls.jobRole),
        React.createElement("p",{className:"small muted", style:{marginBottom:16}}, cls.blurb),
        React.createElement("div",{className:"chip-select", style:{marginBottom:16}},
          cls.units.map(u=>React.createElement("span",{key:u.id, className:"chip"}, u.name+" · "+u.marks+" marks"))
        ),
        React.createElement("button",{className:"btn btn-primary btn-block"}, "Open "+cls.grade, React.createElement(Icon,{name:"chevronRight",size:16}))
      ))
    ),
    React.createElement("div",{className:"card card-pad", style:{marginTop:28}},
      React.createElement("h3",{className:"h3", style:{marginBottom:8}}, "About this subject"),
      React.createElement("p",{className:"small muted"}, "“Physical Activity Trainer” (Subject Code 845) is a CBSE Skill Subject developed with PSSCIVE Bhopal and the Sports, Physical Education, Fitness & Leisure Sector Skill Council. Class XI trains a “Physical Education Assistant (Primary Years)” and Class XII a “Primary Years Physical Activity Facilitator” — both roles focused on coaching, assessing and keeping primary-years children (up to 12) safe during play.")
    )
  );
}

function SchoolUnitCard({cls, unit, onStart}){
  const liveCount = useMemo(()=>QUESTION_BANK.filter(q=>q.subject===unit.subject).length,[unit.subject]);
  return React.createElement("div",{className:"card card-pad card-hover", style:{cursor:"pointer"}, onClick:onStart},
    React.createElement("div",{className:"flex justify-between wrap gap-8", style:{marginBottom:8}},
      React.createElement("span",{className:"pill pill-info"}, unit.marks+" Marks"),
      React.createElement("span",{className:"small muted"}, liveCount+" question"+(liveCount===1?"":"s"))
    ),
    React.createElement("h3",{className:"h3", style:{marginBottom:8}}, unit.name),
    React.createElement("ul",{className:"small muted", style:{margin:"0 0 14px 18px", padding:0}},
      unit.subtopics.map(st=>React.createElement("li",{key:st}, st))
    ),
    React.createElement("button",{className:"btn btn-outline btn-block"}, "Start Chapter Test", React.createElement(Icon,{name:"chevronRight",size:14}))
  );
}

function SchoolGradePage(){
  const {routeParams, goto} = useApp();
  const cls = SCHOOL_CLASSES.find(c=>c.id===routeParams.classId) || SCHOOL_CLASSES[0];
  const [engine, setEngine] = useState(null); // {questions, title}

  const unitQuestionsFor = (unit)=> QUESTION_BANK.filter(q=>q.subject===unit.subject);
  const fullBankQuestions = useMemo(()=>{
    const subjects = cls.units.map(u=>u.subject);
    return QUESTION_BANK.filter(q=>subjects.includes(q.subject));
  },[cls]);
  const pyqQuestions = useMemo(()=>QUESTION_BANK.filter(q=>q.subject===cls.pyqSubject),[cls]);

  if(engine){
    return React.createElement(TestEngine,{
      mode:"practice", questions:engine.questions, title:engine.title,
      onExit:()=>setEngine(null)
    });
  }

  return React.createElement("div",{className:"container", style:{padding:"40px 24px 64px"}},
    React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/school")}, React.createElement(Icon,{name:"chevronLeft",size:14}), "School Track"),
    React.createElement("div",{style:{margin:"18px 0 28px"}},
      React.createElement("div",{className:"eyebrow", style:{marginBottom:8}}, "CBSE Physical Activity Trainer · "+cls.grade),
      React.createElement("h1",{className:"h1"}, cls.jobRole),
      React.createElement("p",{className:"lede", style:{marginTop:8}}, cls.blurb)
    ),
    React.createElement("h2",{className:"h2", style:{marginBottom:14}}, "Chapter-wise Tests"),
    React.createElement("div",{className:"grid grid-4", style:{marginBottom:32}},
      cls.units.map(unit=>React.createElement(SchoolUnitCard,{
        key:unit.id, cls, unit,
        onStart:()=>setEngine({questions: shuffle(unitQuestionsFor(unit)), title: cls.grade+" — "+unit.name})
      }))
    ),
    React.createElement("div",{className:"grid grid-2"},
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:8}}, "Full Textbook MCQ Bank"),
        React.createElement("p",{className:"small muted", style:{marginBottom:16}}, "All "+fullBankQuestions.length+" questions across every unit of "+cls.grade+" — a complete syllabus sweep in one test."),
        React.createElement("button",{className:"btn btn-primary btn-block", disabled:fullBankQuestions.length===0, onClick:()=>setEngine({questions: shuffle(fullBankQuestions), title: cls.grade+" — Full Syllabus Practice"})},
          "Practice Full Bank ("+fullBankQuestions.length+")", React.createElement(Icon,{name:"chevronRight",size:14}))
      ),
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:8}}, cls.pyqSubject),
        React.createElement("p",{className:"small muted", style:{marginBottom:16}}, cls.pyqNote),
        React.createElement("button",{className:"btn btn-outline btn-block", disabled:pyqQuestions.length===0, onClick:()=>setEngine({questions: pyqQuestions, title: cls.pyqSubject})},
          "Practice "+(cls.id==="xii"?"Board PYQs":"Practice Set")+" ("+pyqQuestions.length+")", React.createElement(Icon,{name:"chevronRight",size:14}))
      )
    )
  );
}
