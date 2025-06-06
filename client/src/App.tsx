import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import WalletSecurity from "@/pages/wallet-security";
import WidgetPage from "@/pages/widget";
import LiquidityScanner from "@/pages/liquidity-scanner";
import AlertsPage from "@/pages/alerts";
import LiquidityManagementPage from "@/pages/liquidity-management";
import AddressAnalyzer from "@/pages/address-analyzer";
import TokenDiscovery from "@/pages/token-discovery";
import FundingTrackerPage from "@/pages/funding-tracker";
import FrequencyTunerPage from "@/pages/frequency-tuner";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/navigation";
import { WalletProvider } from "@/components/wallet-provider";

function Router() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/liquidity-scanner" component={LiquidityScanner} />
        <Route path="/wallet-security" component={WalletSecurity} />
        <Route path="/alerts" component={AlertsPage} />
        <Route path="/liquidity-management" component={LiquidityManagementPage} />
        <Route path="/address-analyzer" component={AddressAnalyzer} />
        <Route path="/token-discovery" component={TokenDiscovery} />
        <Route path="/funding-tracker" component={FundingTrackerPage} />
        <Route path="/frequency-tuner" component={FrequencyTunerPage} />
        <Route path="/widget" component={WidgetPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </WalletProvider>
  );
}

export default App;
