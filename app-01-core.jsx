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
  name:"Aswin", xp: 8450, streak: 12, lastActiveDate: null, questionsSolved: 2450, accuracySum: 0,
  mockTestsTaken: 24, joined: "2026-04-02", loggedIn: true, plan: "free",
};
const FREE_MOCK_LIMIT = 1; // free-plan aspirants get one full mock test before the paywall

// ---------------------------------------------------------------------------
// Real-payments config. Leave backendUrl empty to keep today's behavior: the
// Pricing page's "Upgrade" buttons instantly flip the plan locally with an
// honest "no real payment occurred" toast — this is what runs in the
// published Artifact, since Razorpay's checkout script cannot load there.
// Point backendUrl at a deployed copy of server/ (see server/README.md) to
// switch on the real Razorpay Checkout flow: create-order -> pay -> verify.
// ---------------------------------------------------------------------------
const PAYMENTS = {
  backendUrl: "", // e.g. "https://pe-prep-api.onrender.com"
};
const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
const PLAN_LABELS = {pro:"Pro", proplus:"Pro+"};

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
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const paymentsLive = !!PAYMENTS.backendUrl;

  // If a real backend is configured, sync the locally-cached plan with the
  // server's actual entitlement on load — the server, not localStorage, is
  // the source of truth once real payments are switched on.
  useEffect(()=>{
    if(!paymentsLive) return;
    const userId = getOrCreateUserId();
    fetch(`${PAYMENTS.backendUrl}/api/plan/${userId}`)
      .then(r=>r.ok ? r.json() : null)
      .then(data=>{ if(data?.plan) setProfile(p=>({...p, plan: data.plan})); })
      .catch(()=>{ /* backend unreachable — keep whatever plan is cached locally */ });
  },[paymentsLive,setProfile]);

  const upgradePlanDemo = useCallback((plan)=>{
    setProfile(p=>({...p, plan}));
    notify((PLAN_LABELS[plan]||plan)+" unlocked — payment isn't wired up in this prototype, but every gated feature is now open.", 3600);
  },[setProfile,notify]);

  const upgradePlanReal = useCallback(async (plan)=>{
    const userId = getOrCreateUserId();
    setCheckoutBusy(true);
    try{
      const orderRes = await fetch(`${PAYMENTS.backendUrl}/api/create-order`,{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({userId, plan}),
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
        description: (PLAN_LABELS[plan]||plan)+" subscription",
        prefill: { name: profile.name || "" },
        theme: { color: "#FF5A36" },
        handler: async (response)=>{
          try{
            const verifyRes = await fetch(`${PAYMENTS.backendUrl}/api/verify-payment`,{
              method:"POST", headers:{"Content-Type":"application/json"},
              body: JSON.stringify({
                userId, plan,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if(!verifyRes.ok) throw new Error("Payment could not be verified");
            const result = await verifyRes.json();
            setProfile(p=>({...p, plan: result.plan}));
            notify((PLAN_LABELS[plan]||plan)+" unlocked — payment verified.", 3600);
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
  },[setProfile,notify,profile.name]);

  const upgradePlan = paymentsLive ? upgradePlanReal : upgradePlanDemo;

  // derived accuracy across attempts
  const accuracy = useMemo(()=>{
    const list = Object.values(attempts);
    if(list.length===0) return 78; // demo baseline before any activity
    const correct = list.filter(a=>a.correct).length;
    return Math.round((correct/list.length)*100);
  },[attempts]);

  // derived weak/strong subjects from real attempts, seeded with demo baseline if empty
  const subjectStats = useMemo(()=>{
    const stats = {};
    Object.values(attempts).forEach(a=>{
      if(!a.subject) return;
      stats[a.subject] = stats[a.subject] || {correct:0,total:0};
      stats[a.subject].total++;
      if(a.correct) stats[a.subject].correct++;
    });
    let rows = Object.entries(stats).map(([subject,s])=>({subject, accuracy: Math.round((s.correct/s.total)*100), total:s.total}));
    if(rows.length < 3){
      const demo = [
        {subject:"Anatomy",accuracy:82,total:40},{subject:"Physiology",accuracy:76,total:35},
        {subject:"Biomechanics",accuracy:52,total:18},{subject:"Test, Measurement & Evaluation",accuracy:58,total:22},
        {subject:"Sports Psychology",accuracy:61,total:26},{subject:"Sports Training",accuracy:71,total:30},
      ];
      const have = new Set(rows.map(r=>r.subject));
      demo.forEach(d=>{ if(!have.has(d.subject)) rows.push(d); });
    }
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
    isPro, freeMocksUsed, mockLocked, upgradePlan, paymentsLive, checkoutBusy,
  };
  return React.createElement(AppCtx.Provider,{value}, children);
}
