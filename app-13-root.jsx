// ============================================================================
// PE PREP — ROUTER ROOT + MOUNT
// ============================================================================

function QuestionDetailPage(){
  const {routeParams, goto} = useApp();
  const q = QUESTIONS_BY_ID[routeParams.id];
  if(!q) return React.createElement("div",{className:"container",style:{padding:60}}, "Question not found.");
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
