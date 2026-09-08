// ============================================================================
// PE PREP — SIGN IN / SIGN UP (real accounts, so progress follows a user
// across devices instead of staying stuck in one browser's localStorage)
// ============================================================================

function AuthPage(){
  const {route, goto, signup, login, googleSignIn, authBusy} = useApp();
  const [mode, setMode] = useState(route === "/signup" ? "signup" : "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredExam, setPreferredExam] = useState("");
  const [error, setError] = useState("");
  const googleBtnRef = useRef(null);

  useEffect(()=>{ setMode(route === "/signup" ? "signup" : "login"); },[route]);

  useEffect(()=>{
    if(!GOOGLE_CLIENT_ID) return;
    let cancelled = false;
    loadGoogleScript().then(()=>{
      if(cancelled || !window.google?.accounts?.id || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (resp)=>{
          setError("");
          try{ await googleSignIn(resp.credential); goto("/dashboard"); }
          catch(e){ setError(e.message || "Google sign-in failed"); }
        },
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {theme:"outline", size:"large", width:320});
    }).catch(()=>{ /* Google script blocked or unreachable — email/password still works */ });
    return ()=>{ cancelled = true; };
  },[mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async (e)=>{
    e.preventDefault();
    setError("");
    try{
      if(mode === "signup") await signup(email, password, name, preferredExam);
      else await login(email, password);
      goto("/dashboard");
    }catch(err){
      setError(err.message || "Something went wrong — please try again.");
    }
  };

  return React.createElement("div",{className:"auth-shell"},
    React.createElement("div",{className:"auth-card"},
      // ---- Left: the actual form ----
      React.createElement("div",{className:"auth-card-form"},
        React.createElement("a",{href:"#/", className:"brand", style:{marginBottom:26}, onClick:e=>{e.preventDefault(); goto("/");}},
          React.createElement("span",{className:"brand-mark"},"PE"), React.createElement("span",null,"PE Prep")),
        React.createElement("h1",{className:"h2", style:{marginBottom:6}}, mode==="signup" ? "Get started with PE Prep" : "Welcome back"),
        React.createElement("p",{className:"small muted", style:{marginBottom:22}},
          mode==="signup"
            ? "Create a free account to save your XP, streak and progress so they follow you to any device."
            : "Sign in to pick up right where you left off."
        ),
        GOOGLE_CLIENT_ID && React.createElement(React.Fragment,null,
          React.createElement("div",{ref:googleBtnRef, style:{display:"flex", justifyContent:"center", marginBottom:16}}),
          React.createElement("div",{className:"small muted", style:{textAlign:"center", margin:"4px 0 18px"}}, "or")
        ),
        React.createElement("form",{onSubmit:submit},
          mode==="signup" && React.createElement("input",{className:"input", placeholder:"Your name", value:name,
            onChange:e=>setName(e.target.value), style:{marginBottom:10, width:"100%"}}),
          React.createElement("input",{className:"input", type:"email", required:true, placeholder:"Email", value:email,
            onChange:e=>setEmail(e.target.value), style:{marginBottom:10, width:"100%"}}),
          React.createElement("input",{className:"input", type:"password", required:true, minLength:6,
            placeholder:"Password (min. 6 characters)", value:password, onChange:e=>setPassword(e.target.value),
            style:{marginBottom:14, width:"100%"}}),
          mode==="signup" && React.createElement("div",{style:{marginBottom:14}},
            React.createElement("select",{className:"select", style:{width:"100%"}, value:preferredExam, onChange:e=>setPreferredExam(e.target.value)},
              React.createElement("option",{value:""}, "Which exam are you preparing for? (optional)"),
              EXAMS.map(ex=>React.createElement("option",{key:ex.id, value:ex.id}, ex.short))
            )
          ),
          error && React.createElement("p",{className:"small", style:{color:"var(--danger)", marginBottom:12}}, error),
          React.createElement("button",{className:"btn btn-primary", type:"submit", disabled:authBusy, style:{width:"100%"}},
            authBusy ? "Please wait…" : (mode==="signup" ? "Create account" : "Sign in"))
        ),
        React.createElement("p",{className:"small muted", style:{marginTop:18, textAlign:"center"}},
          mode==="signup" ? "Already have an account? " : "New here? ",
          React.createElement("a",{href:"#", onClick:e=>{ e.preventDefault(); setError(""); goto(mode==="signup" ? "/login" : "/signup"); }},
            mode==="signup" ? "Sign in" : "Create one")
        ),
        React.createElement("p",{className:"small muted", style:{marginTop:8, textAlign:"center"}},
          React.createElement("a",{href:"#/", onClick:e=>{ e.preventDefault(); goto("/"); }}, "Continue as guest")
        )
      ),
      // ---- Right: value-prop panel (Testbook-style colored side panel) ----
      React.createElement("div",{className:"auth-card-promo"},
        React.createElement(TrackCurves,null),
        React.createElement("div",{className:"eyebrow", style:{color:"var(--gold)", position:"relative"}}, "JOIN 12,400+ ASPIRANTS"),
        React.createElement("h2",{className:"h2", style:{color:"#fff", position:"relative"}}, "Everything you need to crack your PE exam"),
        React.createElement("div",{className:"auth-bullets"},
          [
            "50,000+ Physical Education practice questions",
            "13 exams covered — KVS, NET, DSSSB, NVS, PSC & more",
            "Full-length mock tests with detailed performance analysis",
            "Sports current affairs, updated every week",
          ].map(t=>React.createElement("div",{key:t, className:"auth-bullet"}, React.createElement(Icon,{name:"check", size:16}), t))
        ),
        React.createElement("div",{className:"auth-stats"},
          [["50,000+","Questions"],["13","Exams"],["40+","Subjects"]].map(([n,l])=>
            React.createElement("div",{key:l}, React.createElement("b",null,n), React.createElement("span",null,l)))
        )
      )
    )
  );
}
