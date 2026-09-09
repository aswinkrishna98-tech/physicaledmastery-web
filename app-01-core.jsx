// ============================================================================
// PE PREP — CORE: icons, state management, persistence, utility helpers
// ============================================================================
const {useState,useEffect,useMemo,useRef,useCallback,createContext,useContext,useReducer} = React;

/* ---------------------------------- Icons -------------------------------- */
function Icon({name, size=18, ...props}){
  const s = {width:size,height:size,fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",viewBox:"0 0 24 24"};
  const paths = {
    home:"M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1Z",
    exam:"M9 3h6l1 3H8l1-3ZM6 6h12v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6Zm3 5h6M9 14h6M9 17h4",
    practice:"M4 19.5V5a2 2 0 0 1 2-2h11.5v15H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h13.5M9 7h6M9 10.5h6",
    mock:"M12 22c5 0 9-4 9-9V6l-9-4-9 4v7c0 5 4 9 9 9Zm-3.5-9 2 2 4.5-4.5",
    bank:"M3 10 12 4l9 6v1H3v-1Zm1 1v8h2v-8m4 0v8h2v-8m4 0v8h2v-8m4 0v8h2v-8M2 21h20",
    material:"M4 19.5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14.5M6 3v18M6 8h6M6 12h6",
    affairs:"M4 5h16v13a1 1 0 0 1-1 1H8l-4 3V5Zm3 4h10M7 12h10M7 15h6",
    pyq:"M14 3v5h5M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 10h8m-8 4h5",
    performance:"M4 20V10m6 10V4m6 16v-7m6 7V8",
    leaderboard:"M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Zm-3 2H3v2a4 4 0 0 0 4 4M20 6h1v2a4 4 0 0 1-4 4",
    pricing:"M12 2v20M17 5.5c0-1.7-2-3-5-3s-5 1.3-5 3 2 2.4 5 3 5 1.3 5 3-2 3-5 3-5-1.3-5-3",
    search:"M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-5.5-5.5",
    bookmark:"M6 3.5h12v18l-6-4-6 4v-18Z",
    flame:"M12 2c1.5 4-4 5-4 10a4 4 0 0 0 8 0c0-1.5-1-2-1-3.5 2 1 3 3.5 3 6a6 6 0 1 1-12 0C6 9 9 7 12 2Z",
    star:"M12 2.5 15 9l7 1-5.2 5 1.3 7-6.1-3.4-6.1 3.4 1.3-7L2 10l7-1 3-6.5Z",
    clock:"M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-14v5l3.5 2",
    check:"m5 13 4 4L19 7",
    close:"m6 6 12 12M18 6 6 18",
    chevronRight:"m9 6 6 6-6 6",
    chevronLeft:"m15 6-6 6 6 6",
    chevronDown:"m6 9 6 6 6-6",
    flag:"M6 21V4m0 0h11l-2 4 2 4H6",
    menu:"M4 7h16M4 12h16M4 17h16",
    user:"M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-8 9c1-4.5 4.5-7 8-7s7 2.5 8 7",
    target:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    trophy:"M8 4h8v4a4 4 0 0 1-8 0V4ZM5 5H3v2a4 4 0 0 0 4 3M19 5h2v2a4 4 0 0 1-4 3M10 15h4v3h-4zM8 21h8",
    lightning:"M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
    brain:"M9 3a3 3 0 0 0-3 3v.2A3.5 3.5 0 0 0 4.5 12 3.5 3.5 0 0 0 6 18.7V19a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm6 0a3 3 0 0 1 3 3v.2A3.5 3.5 0 0 1 19.5 12 3.5 3.5 0 0 1 18 18.7V19a3 3 0 0 1-6 0",
    book:"M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h13",
    yoga:"M12 3v4M9 8l3-1 3 1M6 21l3-8 3 3 3-3 3 8M9 13l-3-4M15 13l3-4",
    olympic:"M4 15a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm8 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm4-7 2-4",
    rules:"M9 3h6l3 5-3 4H9L6 8l3-5Zm-3 9h12l-2 9H8l-2-9Z",
    admin:"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-2 9 2 2 4-4",
    plus:"M12 5v14M5 12h14",
    trash:"M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
    edit:"M4 20h4L18.5 9.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 15v5Z",
    sun:"M12 4V2m0 20v-2M4 12H2m20 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4l-1.4 1.4M18.4 5.6l1.4-1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
    moon:"M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z",
    fire2:"M12 2c1.5 4-4 5-4 10a4 4 0 0 0 8 0c0-1.5-1-2-1-3.5 2 1 3 3.5 3 6a6 6 0 1 1-12 0C6 9 9 7 12 2Z",
    lock:"M7 10.5V8a5 5 0 0 1 10 0v2.5M5.5 10.5h13a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1ZM12 14.5v3",
  };
  return React.createElement("svg",{...s,...props}, React.createElement("path",{d:paths[name]||paths.home}));
}

/* ------------------------------ Persistence ------------------------------ */
function safeGet(key, fallback){
  try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }catch(e){ return fallback; }
}
function safeSet(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
}
function usePersistentState(key, initial){
  const [state, setState] = useState(()=>safeGet(key, initial));
  useEffect(()=>{ safeSet(key, state); },[key, state]);
  return [state, setState];
}

/* --------------------------------- Utils --------------------------------- */
function fmtTime(sec){
  sec = Math.max(0, Math.round(sec));
  const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60;
  const pad = n=>String(n).padStart(2,"0");
  return h>0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
function todayStr(d=new Date()){ return d.toISOString().slice(0,10); }
function daysBetween(a,b){ return Math.round((new Date(b)-new Date(a))/86400000); }
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function pick(arr,n){ return shuffle(arr).slice(0,n); }
function byId(arr){ const m={}; arr.forEach(x=>m[x.id]=x); return m; }
const QUESTIONS_BY_ID = byId(QUESTION_BANK);
function clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
function letters(i){ return ["A","B","C","D","E","F"][i]; }

/* ------------------------------ Global state ------------------------------ */
const AppCtx = createContext(null);
function useApp(){ return useContext(AppCtx); }

const DEFAULT_PROFILE = {
  name:"Aspirant", xp: 0, streak: 0, lastActiveDate: null, questionsSolved: 0, accuracySum: 0,
  mockTestsTaken: 0, joined: todayStr(), loggedIn: true, plan: "free", preferredExam: null, examPasses: [],
};
const FREE_MOCK_LIMIT = 1; // free-plan aspirants get one full mock test before the paywall
const FREE_PRACTICE_LIMIT_PER_SUBJECT = 5; // free-plan aspirants get 5 "quality content" reveals (explanation + concept notes) per subject before the paywall

// The Admin Dashboard (question-bank CRUD, contact inbox) is restricted to
// these signed-in accounts only — everyone else is bounced off the /admin
// route the moment they land on it. Match by the email used to sign in.
const ADMIN_EMAILS = ["aswinkrishna98@gmail.com"];

// Question records store exam membership as display names (see AdminPage's
// "Add Question" form), not ids — this bridges that back to an EXAMS id so
// per-exam single-exam-pass access can be checked against a question or a
// Question Bank filter value.
function examIdForName(name){
  if(!name) return null;
  const hit = EXAMS.find(e=>e.name===name || e.short===name);
  return hit ? hit.id : null;
}

// ---------------------------------------------------------------------------
// Real-payments config. Leave backendUrl empty to keep today's behavior: the
// Pricing page's "Upgrade" buttons instantly flip the plan locally with an
// honest "no real payment occurred" toast — this is what runs in the
// published Artifact, since Razorpay's checkout script cannot load there.
// Point backendUrl at a deployed copy of server/ (see server/README.md) to
// switch on the real Razorpay Checkout flow: create-order -> pay -> verify.
// ---------------------------------------------------------------------------
const PAYMENTS = {
  backendUrl: "https://pe-prep-payments.onrender.com", // e.g. "https://pe-prep-api.onrender.com"
};
const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
const PLAN_LABELS = {pro:"Pro", proplus:"Pro+"};
// A single-exam pass — full Pro-level access (unlimited mock tests, full
// result analysis, previous year papers) for ONE exam only, priced well
// below the flat Pro tier. Display-only on the frontend; the backend's own
// EXAM_PASS_PRICE_INR in razorpay.js is what's actually charged.
const EXAM_PASS_PRICE_INR = 149;

// ---------------------------------------------------------------------------
// Real accounts config. AUTH_API reuses the same backend as payments (it now
// also serves /api/auth/*). Set GOOGLE_CLIENT_ID to a Google OAuth Web
// Client ID (from Google Cloud Console) to turn on "Continue with Google" on
// the sign-in page — until then, only email + password accounts are offered.
// Signing in is optional: a guest can keep using the app exactly as before,
// with progress kept in this browser only.
// ---------------------------------------------------------------------------
const AUTH_API = PAYMENTS.backendUrl;
const GOOGLE_CLIENT_ID = ""; // e.g. "1234567890-abc...apps.googleusercontent.com"
const GOOGLE_GSI_SRC = "https://accounts.google.com/gsi/client";

function loadGoogleScript(){
  return new Promise((resolve, reject)=>{
    if(window.google?.accounts?.id){ resolve(); return; }
    const existing = document.querySelector('script[data-google-gsi]');
    if(existing){
      existing.addEventListener("load", ()=>resolve());
      existing.addEventListener("error", ()=>reject(new Error("script-blocked")));
      return;
    }
    const script = document.createElement("script");
    script.src = GOOGLE_GSI_SRC;
    script.setAttribute("data-google-gsi","1");
    script.async = true;
    script.onload = ()=>resolve();
    script.onerror = ()=>reject(new Error("script-blocked"));
    document.head.appendChild(script);
    setTimeout(()=>{ if(!window.google?.accounts?.id) reject(new Error("script-timeout")); }, 6000);
  });
}

function getOrCreateUserId(){
  let id = safeGet("pep_user_id", null);
  if(!id){
    id = "u_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    safeSet("pep_user_id", id);
  }
  return id;
}

function loadRazorpayScript(){
  return new Promise((resolve, reject)=>{
    if(window.Razorpay){ resolve(); return; }
    const existing = document.querySelector('script[data-razorpay-checkout]');
    if(existing){
      existing.addEventListener("load", ()=>resolve());
      existing.addEventListener("error", ()=>reject(new Error("script-blocked")));
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_SRC;
    script.setAttribute("data-razorpay-checkout","1");
    script.onload = ()=>resolve();
    script.onerror = ()=>reject(new Error("script-blocked"));
    document.head.appendChild(script);
    // Belt-and-suspenders timeout in case onerror never fires (e.g. a CSP
    // that silently drops the request rather than erroring it).
    setTimeout(()=>{ if(!window.Razorpay) reject(new Error("script-timeout")); }, 6000);
  });
}

function AppProvider({children}){
  const [route, setRoute] = useState(()=> (location.hash||"#/").replace(/^#/,"") || "/");
  const [routeParams, setRouteParams] = useState({});
  const [theme, setTheme] = usePersistentState("pep_theme","system");
  const [profile, setProfile] = usePersistentState("pep_profile", DEFAULT_PROFILE);
  const [attempts, setAttempts] = usePersistentState("pep_attempts", {}); // qid -> {correct, ts, timeSpent, count}
  const [bookmarks, setBookmarks] = usePersistentState("pep_bookmarks", {questions:[], notes:[], flashcards:[], tests:[]});
  const [wrongLog, setWrongLog] = usePersistentState("pep_wrong", {}); // qid -> count
  const [mockHistory, setMockHistory] = usePersistentState("pep_mock_history", []);
  const [toast, setToast] = useState(null);
  const [dailyState, setDailyState] = usePersistentState("pep_daily", {lastCompleted:null, lastQOTD:null, qotdAnswer:null});
  const [studyPlan, setStudyPlan] = usePersistentState("pep_study_plan", null);
  // qid -> subject, for every question whose full explanation/concept notes
  // ("quality content") a free-plan user has unlocked by checking an answer
  // in practice mode. Once a subject's count hits FREE_PRACTICE_LIMIT_PER_SUBJECT,
  // newly-checked questions in that subject show a paywall instead of the
  // explanation — but anything already in this map stays viewable, so a free
  // user never loses access to content they've already seen.
  const [revealedIds, setRevealedIds] = usePersistentState("pep_practice_revealed", {});
  const [authToken, setAuthToken] = usePersistentState("pep_auth_token", null);
  const [authAccountId, setAuthAccountId] = useState(null);
  const [authEmail, setAuthEmail] = useState(null);
  const [authBusy, setAuthBusy] = useState(false);
  const skipNextSync = useRef(false);

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme==="system" ? "" : theme);
  },[theme]);

  useEffect(()=>{
    function onHash(){ setRoute((location.hash||"#/").replace(/^#/,"")||"/"); }
    window.addEventListener("hashchange", onHash);
    return ()=>window.removeEventListener("hashchange", onHash);
  },[]);

  const goto = useCallback((path, params={})=>{
    setRouteParams(params);
    setRoute(path);
    location.hash = path;
    window.scrollTo({top:0,behavior:"instant" in window ? "instant":"auto"});
  },[]);

  const notify = useCallback((msg, ms=2600)=>{
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(()=>setToast(null), ms);
  },[]);

  const addXp = useCallback((amount)=>{
    setProfile(p=>({...p, xp: p.xp + amount}));
  },[setProfile]);

  const touchStreak = useCallback(()=>{
    setProfile(p=>{
      const today = todayStr();
      if(p.lastActiveDate === today) return p;
      const diff = p.lastActiveDate ? daysBetween(p.lastActiveDate, today) : 1;
      const streak = diff === 1 ? p.streak + 1 : (diff===0 ? p.streak : 1);
      return {...p, streak, lastActiveDate: today};
    });
  },[setProfile]);

  const recordAttempt = useCallback((question, selectedIndex, timeSpent)=>{
    const correct = selectedIndex === question.correctIndex;
    setAttempts(prev=>{
      const existing = prev[question.id];
      return {...prev, [question.id]: {correct, ts: Date.now(), timeSpent: timeSpent||0, count:(existing?.count||0)+1, subject: question.subject, difficulty: question.difficulty}};
    });
    if(!correct){
      setWrongLog(prev=>({...prev, [question.id]: (prev[question.id]||0)+1}));
    } else {
      setWrongLog(prev=>{
        if(!prev[question.id]) return prev;
        const cp = {...prev}; delete cp[question.id]; return cp;
      });
    }
    setProfile(p=>({...p, questionsSolved: p.questionsSolved + 1}));
    addXp(correct ? 10 : 2);
    touchStreak();
    return correct;
  },[setAttempts,setWrongLog,setProfile,addXp,touchStreak]);

  const toggleBookmark = useCallback((type, id)=>{
    setBookmarks(prev=>{
      const list = prev[type]||[];
      const has = list.includes(id);
      const next = has ? list.filter(x=>x!==id) : [...list, id];
      notify(has ? "Removed from bookmarks" : "Bookmarked");
      return {...prev, [type]: next};
    });
  },[setBookmarks,notify]);

  const saveMockResult = useCallback((result)=>{
    setMockHistory(prev=>[result, ...prev].slice(0,30));
    setProfile(p=>({...p, mockTestsTaken: p.mockTestsTaken + 1}));
    addXp(Math.round(result.score * 2));
    touchStreak();
  },[setMockHistory,setProfile,addXp,touchStreak]);

  const isPro = (profile.plan||"free") !== "free";
  const freeMocksUsed = mockHistory.length;
  const mockLocked = !isPro && freeMocksUsed >= FREE_MOCK_LIMIT;

  // True for a full Pro/Pro+ member, OR a free-plan user who bought a
  // cheaper single-exam pass for this specific exam — either way unlocks
  // unlimited mock tests, full result analysis and PYQs for that exam.
  const hasExamAccess = useCallback((examId)=>{
    if(isPro) return true;
    if(!examId) return false;
    return (profile.examPasses||[]).includes(examId);
  },[isPro, profile.examPasses]);

  // How many distinct questions per subject a free user has already unlocked
  // the explanation/concept notes for (see revealedIds above).
  const practicedBySubject = useMemo(()=>{
    const m = {};
    Object.values(revealedIds).forEach(subj=>{ if(subj) m[subj] = (m[subj]||0)+1; });
    return m;
  },[revealedIds]);

  // A question's "quality content" (explanation, concept box, related
  // questions) is locked for a free user once their subject quota is spent —
  // unless this exact question was already unlocked earlier, which stays
  // viewable forever (upgrading never takes away something already shown).
  const isSubjectLocked = useCallback((subject, qid, examNames)=>{
    if(isPro) return false;
    // A single-exam pass unlocks full explanations for that exam's
    // questions too — same "Full Pro access, one exam only" promise the
    // exam pass makes everywhere else.
    if(examNames && examNames.some(n=>hasExamAccess(examIdForName(n)))) return false;
    if(qid && revealedIds[qid]) return false;
    return (practicedBySubject[subject]||0) >= FREE_PRACTICE_LIMIT_PER_SUBJECT;
  },[isPro, revealedIds, practicedBySubject, hasExamAccess]);

  const freeQuestionsLeft = useCallback((subject)=>{
    if(isPro) return Infinity;
    return Math.max(0, FREE_PRACTICE_LIMIT_PER_SUBJECT - (practicedBySubject[subject]||0));
  },[isPro, practicedBySubject]);

  const markRevealed = useCallback((question)=>{
    setRevealedIds(prev=> prev[question.id] ? prev : {...prev, [question.id]: question.subject});
  },[setRevealedIds]);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const paymentsLive = !!PAYMENTS.backendUrl;

  // If a real backend is configured, sync the locally-cached plan with the
  // server's actual entitlement on load — the server, not localStorage, is
  // the source of truth once real payments are switched on. Signed-in users
  // get their plan from /api/auth/me instead (see below), so this only runs
  // for guests.
  useEffect(()=>{
    if(!paymentsLive || authToken) return;
    const userId = getOrCreateUserId();
    fetch(`${PAYMENTS.backendUrl}/api/plan/${userId}`)
      .then(r=>r.ok ? r.json() : null)
      .then(data=>{ if(data?.plan) setProfile(p=>({...p, plan: data.plan, examPasses: data.examPasses||p.examPasses||[]})); })
      .catch(()=>{ /* backend unreachable — keep whatever plan is cached locally */ });
  },[paymentsLive,authToken,setProfile]);

  // ------------------------------- Real accounts -------------------------------
  // A signed-in user's identity (and payment userId) is their account id from
  // the server, not the random localStorage-generated one guests get.
  const applyAccount = useCallback((user)=>{
    skipNextSync.current = true;
    setAuthAccountId(user.id);
    setAuthEmail(user.email || null);
    setProfile(p=>({...p,
      name: user.name ?? p.name,
      xp: user.xp ?? p.xp,
      streak: user.streak ?? p.streak,
      lastActiveDate: user.lastActiveDate ?? p.lastActiveDate,
      questionsSolved: user.questionsSolved ?? p.questionsSolved,
      accuracySum: user.accuracySum ?? p.accuracySum,
      mockTestsTaken: user.mockTestsTaken ?? p.mockTestsTaken,
      plan: user.plan ?? p.plan,
      preferredExam: user.preferredExam ?? p.preferredExam,
      examPasses: user.examPasses ?? p.examPasses ?? [],
    }));
    if(user.revealedIds) setRevealedIds(user.revealedIds);
  },[setProfile,setRevealedIds]);

  // Restore the session on load / whenever the token changes (login, logout).
  useEffect(()=>{
    if(!paymentsLive || !authToken){ setAuthAccountId(null); setAuthEmail(null); return; }
    fetch(`${AUTH_API}/api/auth/me`, {headers:{Authorization:`Bearer ${authToken}`}})
      .then(r=>{ if(!r.ok) throw new Error("session-invalid"); return r.json(); })
      .then(data=>{ if(data?.user) applyAccount(data.user); })
      .catch(()=>{ setAuthToken(null); setAuthAccountId(null); setAuthEmail(null); });
  },[authToken,paymentsLive]); // eslint-disable-line react-hooks/exhaustive-deps

  // Push local profile changes up to the server for a signed-in user, so
  // progress genuinely follows them to their next device — debounced so a
  // burst of quick actions (e.g. finishing a mock test) sends one request.
  useEffect(()=>{
    if(!paymentsLive || !authToken || !authAccountId) return;
    if(skipNextSync.current){ skipNextSync.current = false; return; }
    const t = setTimeout(()=>{
      fetch(`${AUTH_API}/api/profile`, {
        method:"PUT",
        headers:{"Content-Type":"application/json", Authorization:`Bearer ${authToken}`},
        body: JSON.stringify({
          name: profile.name, xp: profile.xp, streak: profile.streak, lastActiveDate: profile.lastActiveDate,
          questionsSolved: profile.questionsSolved, accuracySum: profile.accuracySum, mockTestsTaken: profile.mockTestsTaken,
          preferredExam: profile.preferredExam,
          revealedIds,
        }),
      }).catch(()=>{ /* offline or backend unreachable — local copy stays authoritative until next sync */ });
    }, 800);
    return ()=>clearTimeout(t);
  },[profile,revealedIds,authToken,authAccountId,paymentsLive]);

  const authRequest = useCallback(async (path, body)=>{
    const res = await fetch(`${AUTH_API}${path}`, {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body),
    });
    const data = await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(data.error || "Something went wrong — please try again.");
    return data;
  },[]);

  const signup = useCallback(async (email, password, name, preferredExam)=>{
    setAuthBusy(true);
    try{
      const data = await authRequest("/api/auth/signup", {email, password, name, preferredExam: preferredExam || null});
      setAuthToken(data.token);
      applyAccount(data.user);
      notify("Welcome to PE Prep, "+data.user.name+"! Your progress will now follow you across devices.", 4000);
    } finally { setAuthBusy(false); }
  },[authRequest,applyAccount,notify,setAuthToken]);

  const setPreferredExam = useCallback((examId)=>{
    setProfile(p=>({...p, preferredExam: examId || null}));
  },[setProfile]);

  const login = useCallback(async (email, password)=>{
    setAuthBusy(true);
    try{
      const data = await authRequest("/api/auth/login", {email, password});
      setAuthToken(data.token);
      applyAccount(data.user);
      notify("Welcome back, "+data.user.name+"!", 3000);
    } finally { setAuthBusy(false); }
  },[authRequest,applyAccount,notify,setAuthToken]);

  const googleSignIn = useCallback(async (credential)=>{
    setAuthBusy(true);
    try{
      const data = await authRequest("/api/auth/google", {credential});
      setAuthToken(data.token);
      applyAccount(data.user);
      notify("Welcome, "+data.user.name+"!", 3000);
    } finally { setAuthBusy(false); }
  },[authRequest,applyAccount,notify,setAuthToken]);

  const logout = useCallback(()=>{
    setAuthToken(null);
    setAuthAccountId(null);
    setAuthEmail(null);
    setProfile(DEFAULT_PROFILE);
    notify("Signed out — your progress on this device is cleared. Sign in again anytime to get it back.", 3400);
  },[setAuthToken,setProfile,notify]);

  const isLoggedIn = !!authToken;
  const isAdmin = !!authEmail && ADMIN_EMAILS.includes(authEmail.toLowerCase());

  const upgradePlanDemo = useCallback((plan, examId)=>{
    if(plan === "exampass"){
      const examShort = EXAMS.find(e=>e.id===examId)?.short || "This exam";
      setProfile(p=>({...p, examPasses: p.examPasses?.includes(examId) ? p.examPasses : [...(p.examPasses||[]), examId]}));
      notify(examShort+" Pass unlocked — payment isn't wired up in this prototype, but this exam's mock tests, results and PYQs are now open.", 3800);
      return;
    }
    setProfile(p=>({...p, plan}));
    notify((PLAN_LABELS[plan]||plan)+" unlocked — payment isn't wired up in this prototype, but every gated feature is now open.", 3600);
  },[setProfile,notify]);

  const upgradePlanReal = useCallback(async (plan, examId)=>{
    const userId = authAccountId || getOrCreateUserId();
    const examShort = examId ? (EXAMS.find(e=>e.id===examId)?.short || "Exam") : null;
    setCheckoutBusy(true);
    try{
      const orderRes = await fetch(`${PAYMENTS.backendUrl}/api/create-order`,{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({userId, plan, examId}),
      });
      if(!orderRes.ok){
        const err = await orderRes.json().catch(()=>({}));
        throw new Error(err.error || "Could not start checkout");
      }
      const order = await orderRes.json();

      await loadRazorpayScript();

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "PE Prep",
        description: plan==="exampass" ? (examShort+" Pass") : (PLAN_LABELS[plan]||plan)+" subscription",
        prefill: { name: profile.name || "" },
        theme: { color: "#FF5A36" },
        handler: async (response)=>{
          try{
            const verifyRes = await fetch(`${PAYMENTS.backendUrl}/api/verify-payment`,{
              method:"POST", headers:{"Content-Type":"application/json"},
              body: JSON.stringify({
                userId, plan, examId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if(!verifyRes.ok) throw new Error("Payment could not be verified");
            const result = await verifyRes.json();
            if(plan === "exampass"){
              setProfile(p=>({...p, examPasses: result.examPasses || p.examPasses || []}));
              notify(examShort+" Pass unlocked — payment verified.", 3600);
            } else {
              setProfile(p=>({...p, plan: result.plan}));
              notify((PLAN_LABELS[plan]||plan)+" unlocked — payment verified.", 3600);
            }
          }catch(e){
            notify("Payment succeeded but verification failed — please contact support before retrying.", 5000);
          }finally{
            setCheckoutBusy(false);
          }
        },
        modal: { ondismiss: ()=>setCheckoutBusy(false) },
      });
      rzp.on("payment.failed", ()=>{
        notify("Payment failed or was cancelled — your plan hasn't changed.", 4000);
        setCheckoutBusy(false);
      });
      rzp.open();
    }catch(e){
      setCheckoutBusy(false);
      if(e.message === "script-blocked" || e.message === "script-timeout"){
        notify("Real checkout can't open in this hosting environment (Razorpay's script is blocked here). Deploy the app with server/ per its README to enable real payments.", 6000);
      } else {
        notify(e.message || "Couldn't start checkout — please try again.", 4000);
      }
    }
  },[setProfile,notify,profile.name,authAccountId]);

  const upgradePlan = paymentsLive ? upgradePlanReal : upgradePlanDemo;

  // derived accuracy across attempts — an honest null (not a fabricated
  // baseline) until the user has actually attempted something, so a brand
  // new account never appears to already have progress.
  const accuracy = useMemo(()=>{
    const list = Object.values(attempts);
    if(list.length===0) return null;
    const correct = list.filter(a=>a.correct).length;
    return Math.round((correct/list.length)*100);
  },[attempts]);

  // derived weak/strong subjects from real attempts only — no demo rows are
  // mixed in, so a new user honestly sees an empty state instead of
  // fabricated "weak areas" they never actually got wrong.
  const subjectStats = useMemo(()=>{
    const stats = {};
    Object.values(attempts).forEach(a=>{
      if(!a.subject) return;
      stats[a.subject] = stats[a.subject] || {correct:0,total:0};
      stats[a.subject].total++;
      if(a.correct) stats[a.subject].correct++;
    });
    const rows = Object.entries(stats).map(([subject,s])=>({subject, accuracy: Math.round((s.correct/s.total)*100), total:s.total}));
    return rows.sort((a,b)=>a.accuracy-b.accuracy);
  },[attempts]);

  const value = {
    route, routeParams, goto,
    theme, setTheme,
    profile, setProfile, addXp, touchStreak,
    attempts, recordAttempt, accuracy, subjectStats,
    bookmarks, toggleBookmark,
    wrongLog, setWrongLog,
    mockHistory, saveMockResult,
    toast, notify,
    dailyState, setDailyState,
    studyPlan, setStudyPlan,
    isPro, freeMocksUsed, mockLocked, upgradePlan, paymentsLive, checkoutBusy, hasExamAccess,
    FREE_PRACTICE_LIMIT_PER_SUBJECT, practicedBySubject, isSubjectLocked, freeQuestionsLeft, markRevealed,
    isLoggedIn, authBusy, signup, login, googleSignIn, logout, setPreferredExam,
    authEmail, isAdmin, authToken,
  };
  return React.createElement(AppCtx.Provider,{value}, children);
}
