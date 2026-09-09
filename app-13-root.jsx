// ============================================================================
// PE PREP — ROUTER ROOT + MOUNT
// ============================================================================

function QuestionDetailPage(){
  const {routeParams, goto, isPro, hasExamAccess} = useApp();
  const q = QUESTIONS_BY_ID[routeParams.id];
  if(!q) return React.createElement("div",{className:"container",style:{padding:60}}, "Question not found.");
  const unlocked = isPro || (q.exam||[]).some(n=>hasExamAccess(examIdForName(n)));
  if(!unlocked){
    return React.createElement("div",{className:"container", style:{padding:"36px 24px 64px"}},
      React.createElement(MockPaywall,{
        title:"Practice is a Pro feature",
        desc:"Upgrade to Pro for unlimited practice across every subject and exam, or grab a single-exam pass for just the exam you're preparing for. Mock tests remain free to try.",
      })
    );
  }
  return React.createElement(TestEngine,{mode:"practice", questions:[q], title:q.subject+" · "+q.topic, onExit:()=>goto("/question-bank")});
}

const ROUTES = {
  "/": Home,
  "/exams": ExamsPage,
  "/exam-detail": ExamDetailPage,
  "/subjects": SubjectsPage,
  "/question-bank": QuestionBankPage,
  "/practice": QuestionBankPage,
  "/question-detail": QuestionDetailPage,
  "/mock-tests": MockTestsPage,
  "/mock-test-setup": MockTestSetupPage,
  "/mock-result": MockResultPage,
  "/study-material": StudyMaterialPage,
  "/school": SchoolPage,
  "/school-grade": SchoolGradePage,
  "/current-affairs": CurrentAffairsPage,
  "/previous-papers": PreviousYearPapersPage,
  "/dashboard": DashboardPage,
  "/dashboard-analytics": DashboardAnalyticsPage,
  "/leaderboard": LeaderboardPage,
  "/pricing": PricingPage,
  "/daily-challenge": DailyChallengePage,
  "/question-of-the-day": QuestionOfTheDayPage,
  "/flashcards": FlashcardsPage,
  "/quick-revision": QuickRevisionPage,
  "/formula-hub": FormulaHubPage,
  "/sports-rules": SportsRulesPage,
  "/study-planner": StudyPlannerPage,
  "/my-mistakes": MyMistakesPage,
  "/bookmarks": BookmarksPage,
  "/admin": AdminPage,
  "/contact": ContactPage,
  "/login": AuthPage,
  "/signup": AuthPage,
};

function RouterView(){
  const {route} = useApp();
  const Comp = ROUTES[route] || Home;
  return React.createElement(Comp, {key:route});
}

function App(){
  return React.createElement(AppProvider, null,
    React.createElement(Layout, null, React.createElement(RouterView, null))
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
