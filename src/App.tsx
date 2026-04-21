import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FreeGoogleAdsCompetitorResearch from "./pages/ai-products/FreeGoogleAdsCompetitorResearch";
import AIProducts from "./pages/AIProducts";
import AiVoiceAgentDentist from "@/pages/AiVoiceAgentDentist";

import CaseStudies from "@/pages/CaseStudies";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ThankYou from "@/pages/ThankYou";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/ai-products" component={AIProducts} />
        <Route path="/ai-voice-agent-dentist" component={AiVoiceAgentDentist} />
      
        <Route path="/case-studies" component={CaseStudies} />
  <Route path="/terms-of-service" component={TermsOfService} />
<Route path="/privacy-policy" component={PrivacyPolicy} />
<Route
  path="/ai-products/free-google-ads-competitor-research"
  component={FreeGoogleAdsCompetitorResearch}
/>        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
       <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
  <ScrollToTop />
  <Router />
</WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
