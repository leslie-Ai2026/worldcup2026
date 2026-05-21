import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import FootballSidebarLayout from "./components/FootballSidebarLayout";

// Pages
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import MatchDetail from "./pages/MatchDetail";
import GoldenBoot from "./pages/GoldenBoot";
import HostCityGuide from "./pages/HostCityGuide";
import FanPack from "./pages/FanPack";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import Privacy from "./pages/Privacy";
import AIPredictor from "./pages/AIPredictor";
import SupporterKit from "./pages/SupporterKit";
import PlayerProfile from "./pages/PlayerProfile";
import NewsArticle from "./pages/NewsArticle";

function Router() {
  return (
    <FootballSidebarLayout>
      <Switch>
        <Route path="/"                component={Home} />
        <Route path="/matches"         component={Matches} />
        <Route path="/match/:matchId"  component={MatchDetail} />
        <Route path="/players/:slug" component={PlayerProfile} />
        <Route path="/news/:id"      component={NewsArticle} />
        <Route path="/ai-predictor"    component={AIPredictor} />
        <Route path="/golden-boot"     component={GoldenBoot} />
        <Route path="/host-city-guide" component={HostCityGuide} />
        <Route path="/fan-pack"        component={FanPack} />
        <Route path="/supporter-kit"   component={SupporterKit} />
        <Route path="/about"           component={About} />
        <Route path="/shipping"        component={Shipping} />
        <Route path="/privacy"         component={Privacy} />
        <Route path="/404"             component={NotFound} />
        <Route                         component={NotFound} />
      </Switch>
    </FootballSidebarLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
