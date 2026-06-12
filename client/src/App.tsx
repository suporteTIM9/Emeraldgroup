import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const Reports = lazy(() => import("./pages/Reports"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const MissionVision = lazy(() => import("./pages/MissionVision"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/blog"} component={BlogPage} />
        <Route path={"/blog/:slug"} component={ArticlePage} />
        <Route path={"/reports"} component={Reports} />
        <Route path={"/legal"} component={LegalNotice} />
        <Route path={"/about-us"} component={AboutUs} />
        <Route path={"/mission-vision"} component={MissionVision} />
        <Route path={"/terms"} component={TermsOfUse} />
        <Route path={"/privacy"} component={PrivacyPolicy} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
