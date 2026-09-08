// ============================================================================
// PE PREP — HOME PAGE
// ============================================================================

function TrackCurves(){
  // Abstract sports-inspired background motif: running-track lane curves.
  return React.createElement("svg",{className:"hero-track", viewBox:"0 0 900 500", preserveAspectRatio:"none", "aria-hidden":"true"},
    [0,1,2,3,4].map(i=>React.createElement("path",{key:i,
      d:`M -50 ${90+i*70} C 250 ${10+i*70}, 650 ${170+i*70}, 950 ${60+i*70}`,
      style:{fill:"none", stroke:"var(--track-line)", strokeWidth:i===2?2.5:1.4}}))
  );
}

function HeroPreviewCard(){
  const q = QUESTION_BANK[1];
  return React.createElement("div",{className:"card card-pad", style:{position:"relative"}},
    React.createElement("div",{className:"flex justify-between items-center", style:{marginBottom:14}},
      React.createElement("span",{className:"pill pill-info"},"Question 7/50"),
      React.createElement("span",{className:"timer-badge"}, React.createElement(Icon,{name:"clock",size:14}), "18:42")
    ),
    React.createElement("p",{className:"small", style:{fontWeight:600, marginBottom:14}}, q.question),
    React.createElement("div",{className:"flex-col gap-8"},
      q.options.map((o,i)=>React.createElement("div",{key:i, className:"option"+(i===q.correctIndex?" correct":"")},
        React.createElement("span",{className:"option-letter"}, letters(i)),
        React.createElement("span",null, o)
      ))
    ),
    React.createElement("div",{className:"lane-divider", style:{margin:"16px 0"}}),
    React.createElement("div",{className:"grid grid-3"},
      React.createElement(StatTile,{label:"Accuracy", value:"84%", sub:"+6% this week", subClass:"pill-success"}),
      React.createElement(StatTile,{label:"Avg Time/Q", value:"38s"}),
      React.createElement(StatTile,{label:"Rank", value:"#142", sub:"Top 8%", subClass:"pill-gold"})
    )
  );
}

function Home(){
  const {goto, profile} = useApp();
  const preferredExam = EXAMS.find(e=>e.id===profile.preferredExam) || null;
  const featuredExams = useMemo(()=>{
    if(!preferredExam) return EXAMS.slice(0,4);
    return [preferredExam, ...EXAMS.filter(e=>e.id!==preferredExam.id)].slice(0,4);
  },[preferredExam]);
  return React.createElement(React.Fragment,null,
    // ---- HERO ----
    React.createElement("section",{className:"hero"},
      React.createElement(TrackCurves,null),
      React.createElement("div",{className:"container hero-grid"},
        React.createElement("div",null,
          React.createElement("div",{className:"eyebrow", style:{marginBottom:14}},"PREPARE · PRACTICE · PERFORM"),
          React.createElement("h1",{className:"display-1"}, "Master Physical Education. Crack Your Exam."),
          React.createElement("p",{className:"lede", style:{marginTop:18, fontSize:18}},
            "Practice thousands of Physical Education questions, attempt realistic mock tests, revise important concepts and track your preparation — all in one place."),
          React.createElement("div",{className:"flex gap-16 wrap", style:{marginTop:28}},
            React.createElement("button",{className:"btn btn-primary", onClick:()=>goto("/question-bank")}, "Start Practising", React.createElement(Icon,{name:"chevronRight",size:16})),
            React.createElement("button",{className:"btn btn-outline", onClick:()=>goto("/mock-tests")}, "Take a Free Mock Test")
          ),
          preferredExam && React.createElement("p",{className:"small", style:{marginTop:16}},
            "🎯 Preparing for ", React.createElement("b",null, preferredExam.short), " — ",
            React.createElement("a",{href:"#", onClick:e=>{e.preventDefault(); goto("/mock-test-setup",{examId:preferredExam.id});}}, "jump into a mock test")),
          React.createElement("div",{className:"hero-stats"},
            [["50,000+","Practice questions"],["13","Exams covered"],["40+","PE subjects mapped"],["12,400+","Aspirants preparing"]].map(([n,l])=>
              React.createElement("div",{key:l,className:"hero-stat"}, React.createElement("b",null,n), React.createElement("span",{className:"small muted"},l))
            )
          )
        ),
        React.createElement(HeroPreviewCard,null)
      )
    ),

    // ---- WHY CHOOSE US ----
    React.createElement("section",{className:"container", style:{padding:"36px 24px 8px"}},
      React.createElement(SectionHeading,{eyebrow:"Why PE Aspirants Choose Us", title:"Built exclusively for Physical Education exams", lede:"Not a generic quiz app — a specialized ecosystem covering every PE competitive exam in India. (Figures below are illustrative demo data.)"}),
      React.createElement("div",{className:"grid grid-4"},
        [
          {icon:"bank", t:"50,000+ Questions", d:"Curated PE-only question bank, tagged by exam, subject, topic and difficulty."},
          {icon:"target", t:"Exam-Focused Content", d:"Every module maps directly to KVS, NET, DSSSB, NVS, PSC and university syllabi."},
          {icon:"brain", t:"Detailed Explanations", d:"Concept breakdowns, memory tricks and sports relevance for every question."},
          {icon:"performance", t:"Smart Analytics", d:"Track accuracy, speed, and topic-wise strength with your Preparation Coach."},
        ].map(f=>React.createElement("div",{key:f.t,className:"card card-pad card-hover"},
          React.createElement("div",{className:"exam-swatch", style:{background:"var(--ink)",marginBottom:14}}, React.createElement(Icon,{name:f.icon,size:20})),
          React.createElement("h3",{className:"h3", style:{marginBottom:8}}, f.t),
          React.createElement("p",{className:"small muted"}, f.d)
        ))
      )
    ),

    // ---- EXAM SELECTION ----
    React.createElement("section",{className:"container", style:{padding:"48px 24px 8px"}},
      React.createElement(SectionHeading,{eyebrow:"Choose Your Exam", title: preferredExam ? "Picking up where you left off" : "A tailored dashboard for every PE exam", right:
        React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/exams")},"View all exams", React.createElement(Icon,{name:"chevronRight",size:14}))
      }),
      React.createElement("div",{className:"grid grid-4"},
        featuredExams.map(ex=>React.createElement(ExamCard,{key:ex.id, exam:ex}))
      )
    ),

    // ---- LEARNING CYCLE ----
    React.createElement("section",{className:"container", style:{padding:"48px 24px 8px"}},
      React.createElement(SectionHeading,{eyebrow:"The PE Prep Method", title:"One continuous preparation loop"}),
      React.createElement("div",{className:"grid grid-4"},
        [["Learn","Structured concepts, notes & flashcards","book"],["Practice","Topic-wise MCQs with instant explanations","practice"],
         ["Test","Full-length & sectional mock exams","mock"],["Analyze","Subject & difficulty-wise performance","performance"],
         ["Revise","Quick-revision, mistakes notebook, SRS flashcards","flame"],["Improve","Personalized coach recommendations","target"]]
        .map(([t,d,icon],i)=>React.createElement("div",{key:t,className:"card card-pad", style:{position:"relative"}},
          React.createElement("div",{className:"flex items-center gap-12", style:{marginBottom:10}},
            React.createElement("div",{className:"exam-swatch",style:{width:36,height:36,background:"var(--accent)",fontSize:13}}, i+1),
            React.createElement("h3",{className:"h3"}, t)
          ),
          React.createElement("p",{className:"small muted"}, d)
        ))
      )
    ),

    // ---- SUBJECT TAXONOMY PREVIEW ----
    React.createElement("section",{className:"container", style:{padding:"48px 24px 8px"}},
      React.createElement(SectionHeading,{eyebrow:"40+ Subjects Mapped", title:"Every Physical Education subject, organized", right:
        React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/subjects")},"Browse all subjects", React.createElement(Icon,{name:"chevronRight",size:14}))
      }),
      React.createElement("div",{className:"grid grid-4"},
        SUBJECTS.filter(s=>["anatomy","physiology","sports-training","sports-psychology","tme","yoga","olympic-movement","sports-rules"].includes(s.id)).map(s=>
          React.createElement("div",{key:s.id, className:"subject-card card card-hover", onClick:()=>goto("/question-bank",{subject:s.name})},
            React.createElement("span",{className:"pill pill-info", style:{alignSelf:"flex-start"}}, s.group),
            React.createElement("h3",{className:"h3"}, s.name),
            React.createElement("span",{className:"small muted"}, s.count+" questions")
          ))
      )
    ),

    // ---- DAILY CHALLENGE STRIP ----
    React.createElement("section",{className:"container", style:{padding:"48px 24px 8px"}},
      React.createElement("div",{className:"card card-pad", style:{background:"linear-gradient(120deg, var(--ink) 0%, var(--info) 150%)", color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20}},
        React.createElement("div",null,
          React.createElement("div",{className:"eyebrow", style:{color:"var(--gold)"}},"🔥 Today's PE Challenge"),
          React.createElement("h3",{className:"h1", style:{color:"#fff", marginTop:6}}, "10 Questions · 5 Minutes · Mixed Difficulty"),
          React.createElement("p",{className:"small", style:{color:"rgba(255,255,255,.75)", marginTop:6}}, "Keep your streak alive — thousands of aspirants complete this every morning.")
        ),
        React.createElement("button",{className:"btn btn-primary", onClick:()=>goto("/daily-challenge")}, "Start Challenge")
      )
    ),

    // ---- SOCIAL PROOF / FINAL CTA ----
    React.createElement("section",{className:"container", style:{padding:"48px 24px 72px"}},
      React.createElement("div",{className:"card card-pad", style:{textAlign:"center", padding:"48px 24px"}},
        React.createElement("h2",{className:"display-2"}, "The world's most focused prep platform for Physical Education"),
        React.createElement("p",{className:"lede", style:{margin:"14px auto 0"}}, "Join aspirants preparing for KVS, NET, NVS, DSSSB, State PSC, B.P.Ed and M.P.Ed exams."),
        React.createElement("div",{className:"flex gap-16", style:{justifyContent:"center", marginTop:24, flexWrap:"wrap"}},
          React.createElement("button",{className:"btn btn-primary", onClick:()=>goto("/question-bank")}, "Start Practising Free"),
          React.createElement("button",{className:"btn btn-outline", onClick:()=>goto("/pricing")}, "See Pricing")
        )
      )
    )
  );
}

function ExamCard({exam}){
  const {goto} = useApp();
  const colorMap = {navy:"var(--ink)",indigo:"var(--info)",teal:"#0E8F84",maroon:"#8A2A3B",forest:"#2F6B3C",amber:"var(--gold)",plum:"#6B3C7A",slate:"#4B5A70",crimson:"#A6323F",steel:"#2E5E7E",olive:"#5C6B2F",coral:"#C2603E",violet:"#5B4B8A"};
  return React.createElement("div",{className:"card exam-card card-hover"},
    React.createElement("div",{className:"exam-card-top"},
      React.createElement("div",{className:"exam-swatch", style:{background:colorMap[exam.color]||"var(--ink)"}}, exam.short.slice(0,2)),
      React.createElement(DifficultyPill,{level:exam.difficulty.split("–")[0].trim()})
    ),
    React.createElement("h3",{className:"h3"}, exam.name),
    React.createElement("p",{className:"tiny muted"}, exam.body),
    React.createElement("div",{className:"flex gap-16 small", style:{margin:"4px 0"}},
      React.createElement("span",null, React.createElement("b",{className:"num"},exam.tests)," tests"),
      React.createElement("span",null, React.createElement("b",{className:"num"},exam.questions.toLocaleString())," Qs")
    ),
    React.createElement("button",{className:"btn btn-outline btn-sm btn-block", onClick:()=>goto("/exam-detail",{id:exam.id})}, "Explore Exam")
  );
}
