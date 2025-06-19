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
import CrossChainSwapPage from "@/pages/cross-chain-swap";
import PortfolioAnalyticsPage from "@/pages/portfolio-analytics";
import ETHGRecovery from "@/pages/ethg-recovery";
import TokenLaunchPage from "@/pages/token-launch";
import BulkRecoveryPage from "@/pages/bulk-recovery";
import ContractAnalyzerPage from "@/pages/contract-analyzer";
import ContractVerificationPage from "@/pages/contract-verification";
import ContractVerificationAPIPage from "@/pages/contract-verification-api";
import ContractVerificationHelper from "@/pages/contract-verification-helper";
import UniswapPoolCreator from "@/pages/uniswap-pool-creator";
import WalletSecurityChecker from "@/pages/wallet-security-checker";
import ManualVerification from "@/pages/manual-verification";
import LiveUniswapCreator from "@/pages/live-uniswap-creator";
import ETHGRecoveryAnalyzer from "@/pages/ethg-recovery-analyzer";
import ImmediateMonetization from "@/pages/immediate-monetization";
import ZeroCapitalMonetization from "@/pages/zero-capital-monetization";
import DirectPoolLinks from "@/pages/direct-pool-links";
import ETHGTestSwap from "@/pages/ethg-test-swap";
import TokenValidationCenter from "@/pages/token-validation-center";
import EmergencyETHFunding from "@/pages/emergency-eth-funding";
import PoolCreationReady from "@/pages/pool-creation-ready";
import RemixDeploymentCenter from "@/pages/remix-deployment-center";
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
        <Route path="/cross-chain-swap" component={CrossChainSwapPage} />
        <Route path="/portfolio-analytics" component={PortfolioAnalyticsPage} />
        <Route path="/ethg-recovery" component={ETHGRecovery} />
        <Route path="/token-launch" component={TokenLaunchPage} />
        <Route path="/bulk-recovery" component={BulkRecoveryPage} />
        <Route path="/contract-analyzer" component={ContractAnalyzerPage} />
        <Route path="/contract-verification" component={ContractVerificationPage} />
        <Route path="/contract-verification-api" component={ContractVerificationAPIPage} />
        <Route path="/contract-verification-helper" component={ContractVerificationHelper} />
        <Route path="/uniswap-pool-creator" component={UniswapPoolCreator} />
        <Route path="/wallet-security-checker" component={WalletSecurityChecker} />
        <Route path="/manual-verification" component={ManualVerification} />
        <Route path="/live-uniswap-creator" component={LiveUniswapCreator} />
        <Route path="/ethg-recovery-analyzer" component={ETHGRecoveryAnalyzer} />
        <Route path="/immediate-monetization" component={ImmediateMonetization} />
        <Route path="/zero-capital-monetization" component={ZeroCapitalMonetization} />
        <Route path="/direct-pool-links" component={DirectPoolLinks} />
        <Route path="/ethg-test-swap" component={ETHGTestSwap} />
        <Route path="/token-validation-center" component={TokenValidationCenter} />
        <Route path="/emergency-eth-funding" component={EmergencyETHFunding} />
        <Route path="/pool-creation-ready" component={PoolCreationReady} />
        <Route path="/remix-deployment-center" component={RemixDeploymentCenter} />
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