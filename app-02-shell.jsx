// ============================================================================
// PE PREP — APP SHELL: TopNav, MobileNav, GlobalSearch, Toast, Layout
// ============================================================================

const NAV_ITEMS = [
  {path:"/", label:"Home", icon:"home"},
  {path:"/exams", label:"Exams", icon:"exam"},
  {path:"/practice", label:"Practice", icon:"practice"},
  {path:"/mock-tests", label:"Mock Tests", icon:"mock"},
  {path:"/study-material", label:"Study Material", icon:"material"},
  {path:"/school", label:"School (11/12)", icon:"book"},
  {path:"/current-affairs", label:"Current Affairs", icon:"affairs"},
  {path:"/dashboard", label:"Performance", icon:"performance"},
  {path:"/pricing", label:"Pricing", icon:"pricing"},
];
const MOBILE_NAV = [
  {path:"/", label:"Home", icon:"home"},
  {path:"/practice", label:"Practice", icon:"practice"},
  {path:"/mock-tests", label:"Tests", icon:"mock"},
  {path:"/study-material", label:"Learn", icon:"material"},
  {path:"/dashboard", label:"Profile", icon:"user"},
];

function isActive(route, path){
  if(path==="/") return route==="/" || route==="";
  return route.startsWith(path);
}

function GlobalSearchModal({open, onClose}){
  const {goto} = useApp();
  const [q,setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(()=>{ if(open){ setTimeout(()=>inputRef.current?.focus(),30); } else setQ(""); },[open]);
  const results = useMemo(()=>{
    if(q.trim().length<2) return null;
    const term = q.trim().toLowerCase();
    const qs = QUESTION_BANK.filter(x=>x.question.toLowerCase().includes(term)||x.topic.toLowerCase().includes(term)).slice(0,5)
      .map(x=>({type:"Question", label:x.question.slice(0,80), sub:x.subject, action:()=>goto("/question-detail",{id:x.id})}));
    const notes = STUDY_NOTES.filter(x=>x.title.toLowerCase().includes(term)||x.subject.toLowerCase().includes(term)).slice(0,4)
      .map(x=>({type:"Note", label:x.title, sub:x.subject, action:()=>goto("/study-material",{})}));
    const flash = FLASHCARDS.filter(x=>x.front.toLowerCase().includes(term)).slice(0,4)
      .map(x=>({type:"Flashcard", label:x.front, sub:x.subject, action:()=>goto("/flashcards",{})}));
    const rules = SPORTS_RULES_DB.filter(x=>x.sport.toLowerCase().includes(term)).slice(0,3)
      .map(x=>({type:"Sport Rules", label:x.sport, sub:"Know Your Sport", action:()=>goto("/sports-rules",{sport:x.sport})}));
    const formulas = FORMULAS.filter(x=>x.name.toLowerCase().includes(term)).slice(0,3)
      .map(x=>({type:"Formula", label:x.name, sub:x.category, action:()=>goto("/formula-hub",{})}));
    const subs = SUBJECTS.filter(x=>x.name.toLowerCase().includes(term)).slice(0,3)
      .map(x=>({type:"Subject", label:x.name, sub:x.group, action:()=>goto("/question-bank",{subject:x.name})}));
    return [...qs,...notes,...flash,...rules,...formulas,...subs];
  },[q,goto]);

  if(!open) return null;
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(10,15,25,.5)",zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"12vh 16px"}, onClick:onClose},
    React.createElement("div",{className:"card", style:{width:"100%",maxWidth:560,padding:0,overflow:"hidden"}, onClick:e=>e.stopPropagation()},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",borderBottom:"1px solid var(--border)"}},
        React.createElement(Icon,{name:"search",size:18}),
        React.createElement("input",{ref:inputRef, className:"input", style:{border:"none",flex:1,padding:"6px 0"}, placeholder:"Search questions, notes, flashcards, sports rules, formulas…", value:q, onChange:e=>setQ(e.target.value)}),
        React.createElement("span",{className:"kbd"},"Esc")
      ),
      React.createElement("div",{style:{maxHeight:380,overflowY:"auto"}},
        results===null ? React.createElement("div",{className:"empty-state small"},"Type at least 2 characters to search across the whole platform.") :
        results.length===0 ? React.createElement("div",{className:"empty-state small"},"No results found for “"+q+"”.") :
        results.map((r,i)=>React.createElement("div",{key:i, onClick:()=>{r.action(); onClose();}, style:{padding:"12px 18px",display:"flex",justifyContent:"space-between",gap:12,cursor:"pointer",borderBottom:"1px solid var(--border)"},
          onMouseEnter:e=>e.currentTarget.style.background="var(--surface-2)", onMouseLeave:e=>e.currentTarget.style.background="transparent"},
          React.createElement("div",null,
            React.createElement("div",{className:"small",style:{fontWeight:600}}, r.label),
            React.createElement("div",{className:"tiny muted"}, r.sub)
          ),
          React.createElement("span",{className:"pill pill-info"}, r.type)
        ))
      )
    )
  );
}

function ThemeToggle(){
  const {theme,setTheme} = useApp();
  const next = theme==="dark" ? "light" : theme==="light" ? "system" : "dark";
  const icon = theme==="dark" ? "moon" : theme==="light" ? "sun" : "sun";
  return React.createElement("button",{className:"btn btn-ghost btn-icon", title:"Theme: "+theme, onClick:()=>setTheme(next)},
    React.createElement(Icon,{name:icon,size:17}));
}

// Dismissible promotional strip shown above the top nav for non-Pro visitors
// (guests and free-plan users alike) — the "LIVE / N+ exams / CTA" banner
// pattern used by the big Indian exam-prep platforms. Dismissal is
// remembered per-browser via usePersistentState so it doesn't reappear on
// every page load once closed, but a fresh browser/device sees it again.
function PromoBanner(){
  const {goto, isPro} = useApp();
  const [dismissed, setDismissed] = usePersistentState("pep_promo_dismissed_v1", false);
  if(dismissed || isPro) return null;
  return React.createElement("div",{className:"promo-banner"},
    React.createElement("div",{className:"promo-banner-inner"},
      React.createElement("span",{className:"promo-banner-live"}, "🔴 LIVE"),
      React.createElement("span",{className:"small", style:{fontWeight:600}},
        "50,000+ questions, full mock tests & previous year papers for 13+ PE exams — go Pro today."),
      React.createElement("button",{className:"btn btn-sm promo-banner-cta", onClick:()=>goto("/pricing")}, "Explore Plans"),
      React.createElement("button",{className:"promo-banner-close", "aria-label":"Dismiss", onClick:()=>setDismissed(true)},
        React.createElement(Icon,{name:"close", size:16}))
    )
  );
}

// Account button + dropdown shown at the right of the top nav. A guest sees
// a plain "Sign In" button (unchanged); a signed-in user sees their name
// with a small menu (Dashboard / Sign Out) so signing out is reachable from
// any page, not just by opening the dashboard and finding the text link.
function AccountMenu(){
  const {isLoggedIn, profile, goto, logout} = useApp();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(()=>{
    if(!open) return;
    function onDocClick(e){ if(boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); }
    function onKey(e){ if(e.key==="Escape") setOpen(false); }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return ()=>{ document.removeEventListener("mousedown", onDocClick); document.removeEventListener("keydown", onKey); };
  },[open]);

  if(!isLoggedIn){
    return React.createElement("button",{className:"btn btn-primary btn-sm", onClick:()=>goto("/login")},
      "Get Started");
  }

  return React.createElement("div",{ref:boxRef, style:{position:"relative"}},
    React.createElement("button",{className:"btn btn-outline btn-sm", onClick:()=>setOpen(o=>!o), "aria-expanded":open},
      React.createElement(Icon,{name:"user",size:15}), profile.name, React.createElement(Icon,{name:"chevronDown",size:13})),
    open && React.createElement("div",{className:"card", style:{position:"absolute", right:0, top:"calc(100% + 8px)", minWidth:200, padding:8, zIndex:150}},
      React.createElement("div",{className:"tiny muted", style:{padding:"4px 10px 8px", marginBottom:4, borderBottom:"1px solid var(--border)"}}, profile.name),
      React.createElement("button",{className:"btn btn-ghost btn-sm btn-block", style:{justifyContent:"flex-start", gap:8},
        onClick:()=>{ setOpen(false); goto("/dashboard"); }}, React.createElement(Icon,{name:"performance",size:14}), "Dashboard"),
      React.createElement("button",{className:"btn btn-ghost btn-sm btn-block", style:{justifyContent:"flex-start", gap:8, color:"var(--danger)"},
        onClick:()=>{ setOpen(false); logout(); }}, React.createElement(Icon,{name:"close",size:14}), "Sign Out")
    )
  );
}

function TopNav(){
  const {route, goto} = useApp();
  const [searchOpen,setSearchOpen] = useState(false);
  useEffect(()=>{
    function onKey(e){
      if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); setSearchOpen(true); }
      if(e.key==="Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return ()=>window.removeEventListener("keydown", onKey);
  },[]);
  return React.createElement(React.Fragment,null,
    React.createElement("div",{className:"topnav"},
      React.createElement("div",{className:"topnav-inner"},
        React.createElement("a",{href:"#/", className:"brand", onClick:e=>{e.preventDefault();goto("/");}},
          React.createElement("span",{className:"brand-mark"},"PE"),
          React.createElement("span",null,"PE Prep")
        ),
        React.createElement("nav",{className:"navlinks"},
          NAV_ITEMS.map(item=>React.createElement("a",{key:item.path, href:"#"+item.path, className:"navlink"+(isActive(route,item.path)?" active":""),
            onClick:e=>{e.preventDefault(); goto(item.path);}}, item.label))
        ),
        React.createElement("div",{className:"navcta"},
          React.createElement("button",{className:"btn btn-ghost btn-icon", title:"Search (Ctrl+K)", onClick:()=>setSearchOpen(true)}, React.createElement(Icon,{name:"search"})),
          React.createElement(ThemeToggle,null),
          React.createElement("button",{className:"btn btn-ghost btn-icon", title:"Bookmarks", onClick:()=>goto("/bookmarks")}, React.createElement(Icon,{name:"bookmark"})),
          React.createElement(AccountMenu,null)
        )
      )
    ),
    React.createElement(GlobalSearchModal,{open:searchOpen, onClose:()=>setSearchOpen(false)})
  );
}

// The "Profile" tab in the mobile bottom bar: a guest taps straight through
// to the dashboard (unchanged) since it already shows a "Sign in" link for
// guests; a signed-in user instead gets a small menu (Dashboard / Sign Out)
// that opens upward from the bar, so signing out doesn't require opening the
// dashboard page first.
function MobileAccountItem({item, active}){
  const {goto, isLoggedIn, logout} = useApp();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(()=>{
    if(!open) return;
    function onDocClick(e){ if(boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDocClick);
    return ()=>document.removeEventListener("mousedown", onDocClick);
  },[open]);

  if(!isLoggedIn){
    return React.createElement("a",{href:"#"+item.path, className:active?"active":"",
      onClick:e=>{e.preventDefault(); goto(item.path);}},
      React.createElement(Icon,{name:item.icon,size:20}), React.createElement("span",null,item.label));
  }

  return React.createElement("div",{ref:boxRef, style:{position:"relative"}},
    React.createElement("a",{href:"#"+item.path, className:active?"active":"",
      onClick:e=>{e.preventDefault(); setOpen(o=>!o);}},
      React.createElement(Icon,{name:item.icon,size:20}), React.createElement("span",null,item.label)),
    open && React.createElement("div",{className:"card", style:{position:"absolute", bottom:"calc(100% + 12px)", right:-10, minWidth:170, padding:8, zIndex:150}},
      React.createElement("button",{className:"btn btn-ghost btn-sm btn-block", style:{justifyContent:"flex-start", gap:8},
        onClick:()=>{ setOpen(false); goto("/dashboard"); }}, React.createElement(Icon,{name:"performance",size:14}), "Dashboard"),
      React.createElement("button",{className:"btn btn-ghost btn-sm btn-block", style:{justifyContent:"flex-start", gap:8, color:"var(--danger)"},
        onClick:()=>{ setOpen(false); logout(); }}, React.createElement(Icon,{name:"close",size:14}), "Sign Out")
    )
  );
}

function MobileNav(){
  const {route, goto} = useApp();
  return React.createElement("div",{className:"mobilebar"},
    React.createElement("div",{className:"mobilebar-inner"},
      MOBILE_NAV.map(item=> item.path==="/dashboard"
        ? React.createElement(MobileAccountItem,{key:item.path, item, active:isActive(route,item.path)})
        : React.createElement("a",{key:item.path, href:"#"+item.path, className:isActive(route,item.path)?"active":"",
            onClick:e=>{e.preventDefault(); goto(item.path);}},
            React.createElement(Icon,{name:item.icon,size:20}),
            React.createElement("span",null,item.label)
          )
      )
    )
  );
}

function Toast(){
  const {toast} = useApp();
  if(!toast) return null;
  return React.createElement("div",{className:"toast"}, React.createElement(Icon,{name:"check",size:15}), toast);
}

function Footer(){
  const {goto} = useApp();
  return React.createElement("footer",{className:"footer"},
    React.createElement("div",{className:"container flex justify-between wrap gap-24"},
      React.createElement("div",{style:{maxWidth:320}},
        React.createElement("div",{className:"brand", style:{fontSize:17,marginBottom:8}},
          React.createElement("span",{className:"brand-mark",style:{width:26,height:26,fontSize:12}},"PE"), "PE Prep"),
        React.createElement("p",{className:"small muted"}, "India's dedicated preparation platform for Physical Education examinations. Prepare. Practice. Perform.")
      ),
      React.createElement("div",{className:"flex gap-24 wrap"},
        React.createElement("div",{className:"flex-col gap-8"},
          React.createElement("span",{className:"small",style:{fontWeight:700}},"Platform"),
          ["Exams","Question Bank","Mock Tests","Previous Year Papers","Leaderboard"].map((t,i)=>React.createElement("a",{key:t,className:"small muted",href:"#/",onClick:e=>{e.preventDefault();goto(["/exams","/question-bank","/mock-tests","/previous-papers","/leaderboard"][i]);}},t))
        ),
        React.createElement("div",{className:"flex-col gap-8"},
          React.createElement("span",{className:"small",style:{fontWeight:700}},"Resources"),
          ["Sports Rules DB","Formula Hub","Current Affairs","Flashcards","Quick Revision","Question of the Day"].map((t,i)=>React.createElement("a",{key:t,className:"small muted",href:"#/",onClick:e=>{e.preventDefault();goto(["/sports-rules","/formula-hub","/current-affairs","/flashcards","/quick-revision","/question-of-the-day"][i]);}},t))
        ),
        React.createElement("div",{className:"flex-col gap-8"},
          React.createElement("span",{className:"small",style:{fontWeight:700}},"Company"),
          ["Pricing","Admin"].map((t,i)=>React.createElement("a",{key:t,className:"small muted",href:"#/",onClick:e=>{e.preventDefault();goto(["/pricing","/admin"][i]);}},t))
        )
      )
    ),
    React.createElement("div",{className:"container",style:{marginTop:28}},
      React.createElement("div",{className:"lane-divider",style:{marginBottom:18}}),
      React.createElement("p",{className:"tiny muted"}, "Demo prototype. Question data, user stats and leaderboard rows are representative sample data. © 2026 PE Prep.")
    )
  );
}

function Layout({children}){
  return React.createElement("div",{className:"app-shell"},
    React.createElement(PromoBanner,null),
    React.createElement(TopNav,null),
    React.createElement("main",{className:"app-main", style:{flex:1}}, children),
    React.createElement(Footer,null),
    React.createElement(MobileNav,null),
    React.createElement(Toast,null)
  );
}

/* ------------------------------ Reusable bits ----------------------------- */
function StatTile({label, value, sub, subClass}){
  return React.createElement("div",{className:"stat-tile"},
    React.createElement("div",{className:"stat-label"}, label),
    React.createElement("div",{className:"stat-value num"}, value),
    sub ? React.createElement("div",{className:"stat-sub "+(subClass||"muted")}, sub) : null
  );
}
function SectionHeading({eyebrow, title, lede, right}){
  return React.createElement("div",{className:"flex justify-between wrap gap-16", style:{marginBottom:24, alignItems:"flex-end"}},
    React.createElement("div",null,
      eyebrow && React.createElement("div",{className:"eyebrow", style:{marginBottom:8}}, eyebrow),
      React.createElement("h2",{className:"h1"}, title),
      lede && React.createElement("p",{className:"lede", style:{marginTop:8}}, lede)
    ),
    right || null
  );
}
function DifficultyPill({level}){
  const map = {Easy:"pill-success",Moderate:"pill-warning",Hard:"pill-danger",Expert:"pill-danger"};
  return React.createElement("span",{className:"pill "+(map[level]||"pill-info")}, level);
}
function BookmarkButton({type,id}){
  const {bookmarks, toggleBookmark} = useApp();
  const active = (bookmarks[type]||[]).includes(id);
  return React.createElement("button",{className:"btn btn-ghost btn-icon", title:"Bookmark", onClick:()=>toggleBookmark(type,id)},
    React.createElement(Icon,{name:"bookmark", size:16, style:{fill: active?"var(--accent)":"none", stroke: active?"var(--accent)":"currentColor"}}));
}

function PlanBadge(){
  const {isPro, profile} = useApp();
  if(!isPro) return React.createElement("span",{className:"pill pill-warning"}, "Free Plan");
  return React.createElement("span",{className:"pill pill-gold"}, (profile.plan==="proplus"?"Pro+":"Pro")+" Member");
}

// Shown in place of a mock-test / full-paper attempt once a free-plan aspirant
// has used their one free mock test. The caller doesn't need an onUpgrade
// callback — `isPro`/`mockLocked` are derived from profile.plan, so once a
// real payment (or the demo toggle) actually changes the plan, every screen
// reading mockLocked re-renders unlocked on its own. That matters once real
// payments are live: the paywall must NOT disappear until payment is
// verified, which is asynchronous.
// `examId`/`examShort` are optional — when passed (e.g. from the mock-results
// page), the paywall offers a cheaper single-exam Pass as an alternative to
// full Pro, alongside the existing "Upgrade to Pro" / "Compare Plans" pair.
function MockPaywall({title, desc, examId, examShort}){
  const {goto, upgradePlan, paymentsLive, checkoutBusy} = useApp();
  return React.createElement("div",{className:"card card-pad", style:{textAlign:"center", padding:"48px 28px", background:"linear-gradient(150deg, var(--ink) 0%, var(--info) 160%)", color:"#fff"}},
    React.createElement("div",{style:{fontSize:34, marginBottom:10}}, "🔒"),
    React.createElement("h3",{className:"h1", style:{color:"#fff"}}, title || "You've used your free mock test"),
    React.createElement("p",{className:"small", style:{color:"rgba(255,255,255,.8)", margin:"10px auto 24px", maxWidth:440}},
      desc || "Free plan includes one full-length mock test to try the experience. Upgrade to Pro for unlimited mock tests, previous year papers, and full performance analytics."),
    React.createElement("div",{className:"flex gap-12 wrap", style:{justifyContent:"center"}},
      React.createElement("button",{className:"btn btn-primary", disabled:checkoutBusy, onClick:()=>upgradePlan("pro")}, checkoutBusy?"Opening secure checkout…":"Upgrade to Pro"),
      examId && React.createElement("button",{className:"btn btn-outline", style:{borderColor:"rgba(255,255,255,.5)", color:"#fff"}, disabled:checkoutBusy,
        onClick:()=>upgradePlan("exampass", examId)}, "Get "+(examShort||"this")+" Pass · ₹"+EXAM_PASS_PRICE_INR),
      React.createElement("button",{className:"btn btn-outline", style:{borderColor:"rgba(255,255,255,.5)", color:"#fff"}, onClick:()=>goto("/pricing")}, "Compare Plans")
    ),
    !paymentsLive && React.createElement("p",{className:"tiny", style:{color:"rgba(255,255,255,.65)", marginTop:16}}, "Demo mode — no real payment gateway is connected yet.")
  );
}

// Compact inline paywall shown in place of a question's explanation/concept
// notes once a free user has spent their per-subject practice quota. Kept
// separate from MockPaywall (which is a full-page block) since this renders
// inline, once per locked question, inside the practice runner.
function PracticeContentLock({subject}){
  const {goto, upgradePlan, paymentsLive, checkoutBusy} = useApp();
  return React.createElement("div",{className:"card card-pad", style:{textAlign:"center", padding:"28px 22px", background:"linear-gradient(150deg, var(--ink) 0%, var(--info) 160%)", color:"#fff"}},
    React.createElement("div",{style:{fontSize:26, marginBottom:6}}, "🔒"),
    React.createElement("h4",{className:"h3", style:{color:"#fff"}}, "Free quota used in "+subject),
    React.createElement("p",{className:"tiny", style:{color:"rgba(255,255,255,.8)", margin:"6px auto 16px", maxWidth:400}},
      "You've unlocked the free explanation for 5 questions in this subject. Upgrade to Pro for unlimited detailed explanations, concept notes and related questions across all 40+ subjects."),
    React.createElement("div",{className:"flex gap-10 wrap", style:{justifyContent:"center"}},
      React.createElement("button",{className:"btn btn-primary btn-sm", disabled:checkoutBusy, onClick:()=>upgradePlan("pro")}, checkoutBusy?"Opening secure checkout…":"Upgrade to Pro"),
      React.createElement("button",{className:"btn btn-outline btn-sm", style:{borderColor:"rgba(255,255,255,.5)", color:"#fff"}, onClick:()=>goto("/pricing")}, "Compare Plans")
    ),
    !paymentsLive && React.createElement("p",{className:"tiny", style:{color:"rgba(255,255,255,.65)", marginTop:10}}, "Demo mode — no real payment gateway is connected yet.")
  );
}
