// ============================================================================
// PE PREP — USER DASHBOARD + GAMIFICATION
// ============================================================================

function greeting(){
  const h = new Date().getHours();
  return h<12 ? "Good Morning" : h<17 ? "Good Afternoon" : "Good Evening";
}

function DashboardPage(){
  const {profile, setProfile, setPreferredExam, accuracy, subjectStats, goto, wrongLog, bookmarks, mockHistory, isPro, isLoggedIn, requestLogout} = useApp();
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
              "Signed in — your XP, streak and plan follow you to any device; practice history stays on this device. ",
              React.createElement("a",{href:"#", onClick:e=>{e.preventDefault(); requestLogout();}}, "Sign out"))
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
// ---- Daily challenge: the same 10 questions for everyone on a given day, 5 minutes,
// a day streak, and a shareable result card. Uses the user's LOCAL date so the
// day rolls over at midnight in India, not at 05:30. State lives in dailyState.challenge.
const DAILY_QUESTIONS = 10;
const DAILY_SECONDS = 300;
function localDayStr(d=new Date()){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function yesterdayStr(){ const d=new Date(); d.setDate(d.getDate()-1); return localDayStr(d); }
function seededRandom(seedStr){ let h=1779033703^seedStr.length; for(let i=0;i<seedStr.length;i++){ h=Math.imul(h^seedStr.charCodeAt(i),3432918353); h=(h<<13)|(h>>>19); } let a=h>>>0; return ()=>{ a|=0; a=(a+0x6D2B79F5)|0; let t=Math.imul(a^(a>>>15),1|a); t=(t+Math.imul(t^(t>>>7),61|t))^t; return ((t^(t>>>14))>>>0)/4294967296; }; }
function dailyQuestionSet(day){
  const pool = QUESTION_BANK.filter(q=>!isSchoolQuestion(q)).slice().sort((x,y)=>x.id<y.id?-1:1);
  const rnd = seededRandom("pe-daily-"+day);
  for(let i=pool.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
  return pool.slice(0, DAILY_QUESTIONS);
}
function challengeStreak(ch, day){
  // A streak is alive if the last completion was today or yesterday.
  if(!ch || !ch.streak) return 0;
  return (ch.lastDay===day || ch.lastDay===yesterdayStr()) ? ch.streak : 0;
}
function drawResultCard({score,total,streak,day,seconds}){
  const c = document.createElement("canvas"); c.width=1080; c.height=1080; const g=c.getContext("2d");
  const grad=g.createLinearGradient(0,0,1080,1080); grad.addColorStop(0,"#0b1f3a"); grad.addColorStop(1,"#1d2f5c");
  g.fillStyle=grad; g.fillRect(0,0,1080,1080);
  g.fillStyle="#fff"; g.font="bold 54px system-ui,Arial,sans-serif"; g.fillText("PE Prep",90,130);
  g.fillStyle="#ffb703"; g.font="bold 44px system-ui,Arial,sans-serif"; g.fillText("Today's PE Challenge",90,260);
  g.fillStyle="#cfd8ee"; g.font="36px system-ui,Arial,sans-serif"; g.fillText(day,90,320);
  g.fillStyle="#fff"; g.font="bold 260px system-ui,Arial,sans-serif"; g.fillText(score+"/"+total,90,600);
  g.fillStyle="#cfd8ee"; g.font="40px system-ui,Arial,sans-serif";
  g.fillText("Finished in "+Math.floor(seconds/60)+"m "+String(seconds%60).padStart(2,"0")+"s",90,690);
  g.fillStyle="#ff6b35"; g.font="bold 64px system-ui,Arial,sans-serif"; g.fillText(streak+"-day streak",90,820);
  g.fillStyle="#cfd8ee"; g.font="38px system-ui,Arial,sans-serif"; g.fillText("Can you beat my score?",90,930);
  g.fillStyle="#fff"; g.font="bold 42px system-ui,Arial,sans-serif"; g.fillText("physicaledmastery.com",90,1000);
  return c;
}
function ChallengeShare({result, streak}){
  const {notify} = useApp();
  const text = "I scored "+result.score+"/"+result.total+" on today's PE Challenge on PE Prep ("+streak+"-day streak). Can you beat it? https://physicaledmastery.com/#/daily-challenge";
  async function share(){
    trackEvent("share_challenge_result",{score:result.score});
    try{
      const canvas = drawResultCard({...result, streak});
      const blob = await new Promise(r=>canvas.toBlob(r,"image/png"));
      const file = new File([blob],"pe-challenge.png",{type:"image/png"});
      if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({files:[file], text}); return; }
      if(navigator.share){ await navigator.share({text}); return; }
      const url = URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="pe-challenge.png"; a.click(); setTimeout(()=>URL.revokeObjectURL(url),2000);
      try{ await navigator.clipboard.writeText(text); notify("Result card saved. Caption copied - paste it with the image."); }catch(e){ notify("Result card saved."); }
    }catch(e){ if(e && e.name==="AbortError") return; notify("Could not share from this browser."); }
  }
  return React.createElement("div",{className:"flex gap-10 wrap", style:{justifyContent:"center", marginTop:16}},
    React.createElement("button",{className:"btn btn-primary", onClick:share}, "Share result card"),
    React.createElement("a",{className:"btn btn-outline", href:"https://wa.me/?text="+encodeURIComponent(text), target:"_blank", rel:"noopener noreferrer", onClick:()=>trackEvent("share_challenge_result",{via:"whatsapp"})}, "WhatsApp")
  );
}

function DailyChallengePage(){
  const {dailyState, setDailyState, recordAttempt, notify, goto} = useApp();
  const day = localDayStr();
  const ch = dailyState.challenge || {};
  const questions = useMemo(()=>dailyQuestionSet(day),[day]);
  const [now,setNow] = useState(()=>Date.now());
  const run = ch.run && ch.run.day===day ? ch.run : null;
  const doneToday = ch.lastDay===day && ch.last && ch.last.day===day;
  const streak = challengeStreak(ch, day);

  function start(){
    setDailyState(s=>({...s, challenge:{...(s.challenge||{}), run:{day, idx:0, answers:[], endsAt:Date.now()+DAILY_SECONDS*1000}}}));
    trackEvent("start_daily_challenge");
  }
  function finish(answers, endsAt){
    const score = questions.reduce((n,q,i)=>n+(answers[i]===q.correctIndex?1:0),0);
    const used = Math.min(DAILY_SECONDS, Math.max(1, DAILY_SECONDS - Math.max(0, Math.round((endsAt-Date.now())/1000))));
    setDailyState(s=>{
      const c = s.challenge||{};
      const newStreak = c.lastDay===day ? (c.streak||1) : (c.lastDay===yesterdayStr() ? (c.streak||0)+1 : 1);
      return {...s, lastCompleted: todayStr(), challenge:{...c, run:null, lastDay:day, streak:newStreak, best:Math.max(c.best||0,newStreak), last:{day, score, total:questions.length, seconds:used}}};
    });
    trackEvent("complete_daily_challenge",{score});
    notify("Daily challenge complete!");
  }
  // countdown + auto-finish
  useEffect(()=>{
    if(!run) return;
    const t = setInterval(()=>{ setNow(Date.now()); if(Date.now()>=run.endsAt) finish(run.answers, run.endsAt); },500);
    return ()=>clearInterval(t);
    // eslint-disable-next-line
  },[run && run.endsAt, run && run.answers.length]);

  function answer(i){
    if(!run || run.answers[run.idx]!==undefined) return;
    const q = questions[run.idx];
    recordAttempt(q, i, 0);
    const answers = [...run.answers]; answers[run.idx]=i;
    setDailyState(s=>({...s, challenge:{...s.challenge, run:{...run, answers}}}));
  }
  function next(){
    if(run.idx+1>=questions.length){ finish(run.answers, run.endsAt); return; }
    setDailyState(s=>({...s, challenge:{...s.challenge, run:{...run, idx:run.idx+1}}}));
  }

  const wrap = (children)=>React.createElement("div",{className:"container", style:{padding:"36px 24px 72px", maxWidth:680}}, children);

  if(run){
    const q = questions[run.idx]; const picked = run.answers[run.idx]; const left = Math.max(0, Math.ceil((run.endsAt-now)/1000));
    return wrap(React.createElement("div",{className:"card card-pad"},
      React.createElement("div",{className:"flex justify-between items-center", style:{marginBottom:14}},
        React.createElement("span",{className:"pill pill-info"}, "Question "+(run.idx+1)+"/"+questions.length),
        React.createElement("span",{className:"timer-badge"+(left<60?" low":"")}, React.createElement(Icon,{name:"clock",size:14}), fmtTime(left))),
      React.createElement("p",{className:"qtext"}, q.question),
      React.createElement("div",{className:"options", role:"radiogroup", "aria-label":"Answer options"},
        q.options.map((opt,i)=>{
          let cls="option";
          if(picked!==undefined){ if(i===q.correctIndex) cls+=" correct"; else if(i===picked) cls+=" wrong"; }
          return React.createElement("div",{key:i, className:cls, role:"radio", "aria-checked":picked===i, tabIndex:0, onClick:()=>answer(i), onKeyDown:e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); answer(i); } }},
            React.createElement("span",{className:"option-letter"}, letters(i)), React.createElement("span",null, opt));
        })),
      picked!==undefined && React.createElement("div",{style:{marginTop:16, textAlign:"right"}},
        React.createElement("button",{className:"btn btn-primary", onClick:next}, run.idx+1>=questions.length ? "Finish" : "Next question"))
    ));
  }

  if(doneToday){
    const r = ch.last;
    return wrap(React.createElement("div",{className:"card card-pad", style:{textAlign:"center"}},
      React.createElement("div",{style:{fontSize:40}}, "🔥"),
      React.createElement("h2",{className:"h1", style:{margin:"12px 0 6px"}}, "You scored "+r.score+" / "+r.total),
      React.createElement("p",{className:"muted small"}, "Finished in "+Math.floor(r.seconds/60)+"m "+String(r.seconds%60).padStart(2,"0")+"s · "+streak+"-day streak"+((ch.best||0)>streak?" · best "+ch.best:"")),
      React.createElement("p",{className:"small", style:{marginTop:12}}, "Come back tomorrow for a new set. Missed questions are saved in My Mistakes."),
      React.createElement(ChallengeShare,{result:r, streak}),
      React.createElement("div",{className:"flex gap-10 wrap", style:{justifyContent:"center", marginTop:12}},
        React.createElement("button",{className:"btn btn-ghost", onClick:()=>goto("/my-mistakes")}, "Review my mistakes"))
    ));
  }

  return wrap(React.createElement("div",{className:"card card-pad", style:{textAlign:"center"}},
    React.createElement("div",{style:{fontSize:40}}, "🔥"),
    React.createElement("h2",{className:"h1", style:{margin:"12px 0 6px"}}, "Today's PE Challenge"),
    React.createElement("p",{className:"muted small"}, DAILY_QUESTIONS+" Questions · 5 Minutes · same set for everyone today"),
    streak>0 && React.createElement("div",{className:"pill pill-gold", style:{margin:"14px auto 0"}}, streak+"-day streak"),
    React.createElement("button",{className:"btn btn-primary", style:{marginTop:22}, onClick:start}, "Start Challenge")
  ));
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
