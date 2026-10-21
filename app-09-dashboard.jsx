// ============================================================================
// PE PREP — USER DASHBOARD + GAMIFICATION
// ============================================================================

function greeting(){
  const h = new Date().getHours();
  return h<12 ? "Good Morning" : h<17 ? "Good Afternoon" : "Good Evening";
}

function DashboardPage(){
  const {profile, setProfile, setPreferredExam, accuracy, subjectStats, goto, wrongLog, bookmarks, mockHistory, isPro, isLoggedIn, logout} = useApp();
  const editName = ()=>{
    const next = window.prompt("What should we call you?", profile.name);
    if(next && next.trim()) setProfile(p=>({...p, name: next.trim().slice(0,40)}));
  };
  const weak = subjectStats.slice(0,3);
  const strong = [...subjectStats].sort((a,b)=>b.accuracy-a.accuracy).slice(0,2);
  const mistakesCount = Object.keys(wrongLog).length;
  const level = Math.floor(profile.xp/1000)+1;
  const levelProgress = (profile.xp%1000)/10;
  const recommendedExam = EXAMS.find(e=>e.id===profile.preferredExam) || EXAMS.find(e=>e.id==="kvs-pgt") || EXAMS[0];

  const recommended = [
    weak[0] && {t:weak[0].subject+" Practice Set", d:"20 questions targeting your weakest area", action:()=>goto("/question-bank",{subject:weak[0].subject})},
    {t:recommendedExam.short+" Mock Test", d:"Full-length simulation with negative marking", action:()=>goto("/mock-test-setup",{examId:recommendedExam.id})},
    weak[1] && {t:weak[1].subject+" Revision", d:"Quick facts and flashcards", action:()=>goto("/flashcards")},
    {t:"Today's PE Challenge", d:"10 questions · 5 minutes", action:()=>goto("/daily-challenge")},
  ].filter(Boolean);

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement("div",{className:"flex justify-between wrap gap-16", style:{marginBottom:26, alignItems:"flex-end"}},
      React.createElement("div",null,
        React.createElement("h1",{className:"h1", style:{display:"flex", alignItems:"center", gap:10}},
          greeting()+", "+profile.name+" 👋",
          React.createElement("button",{className:"btn btn-ghost btn-icon", title:"Change your name", onClick:editName, style:{width:28,height:28}}, React.createElement(Icon,{name:"edit",size:14}))
        ),
        React.createElement("p",{className:"small muted", style:{marginTop:6}}, "Your Preparation Overview"),
        isLoggedIn
          ? React.createElement("p",{className:"small muted", style:{marginTop:4}},
              "Signed in — your progress follows you to any device. ",
              React.createElement("a",{href:"#", onClick:e=>{e.preventDefault(); logout();}}, "Sign out"))
          : React.createElement("p",{className:"small muted", style:{marginTop:4}},
              "Browsing as a guest — progress stays on this device only. ",
              React.createElement("a",{href:"#/login", onClick:e=>{e.preventDefault(); goto("/login");}}, "Sign in to save it")),
        React.createElement("div",{className:"flex items-center gap-8", style:{marginTop:8}},
          React.createElement("span",{className:"small muted"}, "Preparing for:"),
          React.createElement("select",{className:"select", style:{padding:"6px 10px", fontSize:13}, value: profile.preferredExam||"",
            onChange:e=>setPreferredExam(e.target.value)},
            React.createElement("option",{value:""}, "Not set — showing general content"),
            EXAMS.map(ex=>React.createElement("option",{key:ex.id, value:ex.id}, ex.short))
          )
        )
      ),
      React.createElement("div",{className:"flex items-center gap-10"},
        React.createElement(PlanBadge,null),
        React.createElement("div",{className:"pill pill-gold"}, "Level "+level+" · "+profile.xp.toLocaleString()+" XP"),
        !isPro && React.createElement("button",{className:"btn btn-primary btn-sm", onClick:()=>goto("/pricing")}, "Upgrade")
      )
    ),
    !isPro && mockHistory.length>0 && React.createElement("div",{className:"card card-pad", style:{marginBottom:20, borderColor:"var(--warning)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12}},
      React.createElement("div",null,
        React.createElement("span",{className:"pill pill-warning", style:{marginBottom:6}}, "Free Plan"),
        React.createElement("p",{className:"small muted"}, "Your mock test scores are always free. Upgrade to Pro to unlock rank, percentile, subject-wise breakdowns and full previous-year papers.")),
      React.createElement("button",{className:"btn btn-outline btn-sm", onClick:()=>goto("/pricing")}, "View Plans")
    ),
    React.createElement("div",{className:"grid grid-4", style:{marginBottom:12}},
      React.createElement(StatTile,{label:"Questions Solved", value:profile.questionsSolved.toLocaleString()}),
      React.createElement(StatTile,{label:"Accuracy", value: accuracy==null ? "—" : accuracy+"%"}),
      React.createElement(StatTile,{label:"Mock Tests", value:profile.mockTestsTaken}),
      React.createElement(StatTile,{label:"Study Streak", value:profile.streak+" days", sub:"🔥 keep it going", subClass:"pill-warning"})
    ),
    React.createElement("div",{className:"card card-pad", style:{marginBottom:28}},
      React.createElement("div",{className:"flex justify-between small", style:{marginBottom:6}},
        React.createElement("span",null,"Level "+level+" progress"), React.createElement("span",{className:"num"}, (profile.xp%1000)+" / 1000 XP")),
      React.createElement("div",{className:"progress-track"}, React.createElement("div",{className:"progress-fill",style:{width:levelProgress+"%"}}))
    ),

    React.createElement("div",{className:"grid grid-2", style:{marginBottom:28, alignItems:"start"}},
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Your Weak Areas"),
        weak.length===0 ? React.createElement("p",{className:"small muted"},"Attempt a few practice sets to see personalized weak-area analysis.") :
        weak.map(w=>React.createElement(HBarRow,{key:w.subject, label:w.subject, value:w.accuracy})),
        React.createElement("button",{className:"btn btn-outline btn-sm", style:{marginTop:6}, onClick:()=>goto("/dashboard-analytics")}, "View Full Analytics")
      ),
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Recommended For You"),
        React.createElement("div",{className:"flex-col gap-10"},
          recommended.map((r,i)=>React.createElement("div",{key:i, className:"flex justify-between items-center", style:{padding:"10px 0", borderBottom: i<recommended.length-1?"1px solid var(--border)":"none"}, onClick:r.action, role:"button"},
            React.createElement("div",null, React.createElement("div",{className:"small",style:{fontWeight:600}}, (i+1)+". "+r.t), React.createElement("div",{className:"tiny muted"}, r.d)),
            React.createElement(Icon,{name:"chevronRight",size:16})
          ))
        )
      )
    ),

    React.createElement("div",{className:"grid grid-3", style:{marginBottom:28}},
      React.createElement("div",{className:"card card-pad card-hover", onClick:()=>goto("/my-mistakes")},
        React.createElement(Icon,{name:"brain",size:20}), React.createElement("h3",{className:"h3",style:{margin:"10px 0 4px"}}, "My Mistakes"),
        React.createElement("p",{className:"small muted"}, mistakesCount+" questions to revise")),
      React.createElement("div",{className:"card card-pad card-hover", onClick:()=>goto("/bookmarks")},
        React.createElement(Icon,{name:"bookmark",size:20}), React.createElement("h3",{className:"h3",style:{margin:"10px 0 4px"}}, "Bookmarks"),
        React.createElement("p",{className:"small muted"}, (bookmarks.questions?.length||0)+" saved questions")),
      React.createElement("div",{className:"card card-pad card-hover", onClick:()=>goto("/study-planner")},
        React.createElement(Icon,{name:"target",size:20}), React.createElement("h3",{className:"h3",style:{margin:"10px 0 4px"}}, "Study Planner"),
        React.createElement("p",{className:"small muted"}, "Build your personalized schedule"))
    ),

    React.createElement("div",{className:"card card-pad"},
      React.createElement("div",{className:"flex justify-between items-center", style:{marginBottom:16}},
        React.createElement("h3",{className:"h3"}, "Your Badges"),
        React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/leaderboard")}, "View Leaderboard", React.createElement(Icon,{name:"chevronRight",size:14}))
      ),
      React.createElement("div",{className:"grid grid-4"},
        BADGES.map(b=>{
          const earned = isBadgeEarned(b.id, {profile, mockHistory});
          return React.createElement("div",{key:b.id, className:"badge-tile"+(earned?"":" locked")},
            React.createElement("div",{className:"badge-icon"}, b.icon),
            React.createElement("div",{className:"small", style:{fontWeight:600, marginTop:6}}, b.name),
            React.createElement("div",{className:"tiny muted"}, b.desc)
          );
        })
      )
    )
  );
}

function DashboardAnalyticsPage(){
  const {subjectStats, mockHistory, goto} = useApp();
  const trend = [...mockHistory].slice(0,8).reverse().map((m,i)=>({label:"Mock "+(i+1), value:m.accuracy}));
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px"}},
    React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/dashboard")}, React.createElement(Icon,{name:"chevronLeft",size:14}),"Dashboard"),
    React.createElement(SectionHeading,{eyebrow:"Performance", title:"Full Performance Analytics", lede:"Deep dive into your subject-wise strengths, weaknesses and progress over time."}),
    React.createElement("div",{className:"grid grid-2", style:{marginBottom:24}},
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Subject-wise Accuracy"),
        React.createElement(BarChart,{data: subjectStats.map(s=>({label:s.subject, value:s.accuracy}))})
      ),
      React.createElement("div",{className:"card card-pad"},
        React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "Mock Test Accuracy Trend"),
        trend.length>0 ? React.createElement(LineChart,{points:trend}) : React.createElement("p",{className:"small muted"},"Take a mock test to start tracking your trend.")
      )
    ),
    React.createElement("div",{className:"card card-pad"},
      React.createElement("h3",{className:"h3", style:{marginBottom:14}}, "All Subjects — Ranked by Accuracy"),
      React.createElement("div",{className:"overflow-x"},
        React.createElement("table",{className:"datatable"},
          React.createElement("thead",null, React.createElement("tr",null, React.createElement("th",null,"Subject"), React.createElement("th",null,"Accuracy"), React.createElement("th",null,"Questions Attempted"), React.createElement("th",null,"Action"))),
          React.createElement("tbody",null, [...subjectStats].sort((a,b)=>b.accuracy-a.accuracy).map(s=>React.createElement("tr",{key:s.subject},
            React.createElement("td",null, s.subject),
            React.createElement("td",{className:"num"}, s.accuracy+"%"),
            React.createElement("td",{className:"num"}, s.total),
            React.createElement("td",null, React.createElement("button",{className:"btn btn-ghost btn-sm", onClick:()=>goto("/question-bank",{subject:s.subject})},"Practice"))
          )))
        )
      )
    )
  );
}

/* ------------------------------- Leaderboard ------------------------------ */
function LeaderboardPage(){
  // HONESTY NOTE: the previous version ranked invented names with made-up XP.
  // A real leaderboard needs every learner's XP stored on the server (only a
  // few counters sync today), so until that exists we show the learner's own
  // real numbers and say plainly that rankings are not live yet.
  const {profile, accuracy, isLoggedIn, goto} = useApp();
  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px", maxWidth:760}},
    React.createElement(SectionHeading,{eyebrow:"Leaderboard", title:"Your progress", lede:"Nationwide rankings are not live yet — we only show a leaderboard once it is based on real learners. Here are your own numbers."}),
    React.createElement("div",{className:"grid grid-4", style:{marginBottom:24}},
      React.createElement(StatTile,{label:"XP", value:(profile.xp||0).toLocaleString()}),
      React.createElement(StatTile,{label:"Study streak", value:(profile.streak||0)+" days"}),
      React.createElement(StatTile,{label:"Questions solved", value:(profile.questionsSolved||0).toLocaleString()}),
      React.createElement(StatTile,{label:"Accuracy", value:(accuracy||0)+"%"})
    ),
    React.createElement("div",{className:"card card-pad"},
      React.createElement("h3",{className:"h3", style:{marginBottom:8}}, "When will rankings appear?"),
      React.createElement("p",{className:"small muted"}, "Once enough signed-in aspirants are practising, daily / weekly / all-time boards will be switched on, ranked by XP, accuracy and streak. Sign in so your progress counts from day one."),
      !isLoggedIn && React.createElement("button",{className:"btn btn-primary btn-sm", style:{marginTop:14}, onClick:()=>goto("/login")}, "Sign in")
    )
  );
}

/* ---------------------------- Daily Challenge ------------------------------ */
function DailyChallengePage(){
  const {dailyState, setDailyState, notify, goto} = useApp();
  const [engine,setEngine] = useState(null);
  const already = dailyState.lastCompleted === todayStr();

  if(engine) return React.createElement(TestEngine,{mode:"practice", questions:engine, title:"Daily PE Challenge",
    onExit:()=>{ setDailyState(s=>({...s,lastCompleted:todayStr()})); notify("Daily streak updated! 🔥"); goto("/dashboard"); }});

  return React.createElement("div",{className:"container", style:{padding:"48px 24px 72px", maxWidth:640}},
    React.createElement("div",{className:"card card-pad", style:{textAlign:"center"}},
      React.createElement("div",{style:{fontSize:40}}, "🔥"),
      React.createElement("h2",{className:"h1", style:{margin:"12px 0 6px"}}, "Today's PE Challenge"),
      React.createElement("p",{className:"muted small"}, "10 Questions · 5 Minutes · Mixed Difficulty"),
      already ? React.createElement("div",{className:"pill pill-success", style:{margin:"18px auto"}}, "Completed today — come back tomorrow!") :
      React.createElement("button",{className:"btn btn-primary", style:{marginTop:22}, onClick:()=>setEngine(pick(QUESTION_BANK,10))}, "Start Challenge")
    )
  );
}

/* --------------------------- Question of the Day --------------------------- */
function seedIndexForDate(len){ const d=todayStr(); let h=0; for(const c of d) h=(h*31+c.charCodeAt(0))>>>0; return h%len; }
function QuestionOfTheDayPage(){
  const {dailyState, setDailyState, recordAttempt} = useApp();
  const qotd = QUESTION_BANK[seedIndexForDate(QUESTION_BANK.length)];
  const answered = dailyState.lastQOTD===todayStr();
  const [selected,setSelected] = useState(answered ? dailyState.qotdAnswer : null);
  function submit(i){
    setSelected(i);
    recordAttempt(qotd, i, 0);
    setDailyState(s=>({...s, lastQOTD:todayStr(), qotdAnswer:i}));
  }

  return React.createElement("div",{className:"container", style:{padding:"36px 24px 72px", maxWidth:680}},
    React.createElement(SectionHeading,{eyebrow:"Question of the Day", title:new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})}),
    React.createElement("div",{className:"card card-pad"},
      React.createElement("div",{className:"qmeta"}, React.createElement("span",{className:"pill pill-info"}, qotd.subject), React.createElement(DifficultyPill,{level:qotd.difficulty}), React.createElement(BookmarkButton,{type:"questions",id:qotd.id})),
      React.createElement("p",{className:"qtext"}, qotd.question),
      React.createElement("div",{className:"options"},
        qotd.options.map((opt,i)=>{
          let cls="option";
          if(selected!=null){ if(i===qotd.correctIndex) cls+=" correct"; else if(i===selected) cls+=" incorrect"; }
          return React.createElement("div",{key:i, className:cls, style:{position:"relative",overflow:"hidden"}, onClick:()=>selected==null && submit(i)},
            React.createElement("span",{className:"option-letter",style:{position:"relative"}}, letters(i)),
            React.createElement("span",{style:{position:"relative",flex:1}}, opt),
            null
          );
        })
      ),
      selected!=null && React.createElement("div",{className:"explain-box"}, React.createElement("p",{className:"small"}, qotd.explanation)),
    )
  );
}
