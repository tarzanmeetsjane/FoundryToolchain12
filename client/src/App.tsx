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
import LivePoolExecution from "@/pages/live-pool-execution";
import FinalPoolLaunch from "@/pages/final-pool-launch";
import MicroPoolStrategy from "@/pages/micro-pool-strategy";
import ETHGETHGRPool from "@/pages/ethg-ethgr-pool";
import VictoryDashboard from "@/pages/victory-dashboard";
import UrgentExecution from "@/pages/urgent-execution";
import TokenAddressHelper from "@/pages/token-address-helper";
import FinalPoolExecution from "@/pages/final-pool-execution";
import DirectContractExecution from "@/pages/direct-contract-execution";
import EtherscanBroadcast from "@/pages/etherscan-broadcast";
import EtherscanFilterAnalyzer from "@/pages/etherscan-filter-analyzer";
import ManualContractCalls from "@/pages/manual-contract-calls";
import Step1Execution from "@/pages/step1-execution";
import EnhancedContractVerification from "@/pages/enhanced-contract-verification";
import ImmediateExecution from "@/pages/immediate-execution";
import ExecutionDashboard from "@/pages/execution-dashboard";
import AlternativeSolutions from "@/pages/alternative-solutions";
import MetaMaskDirectExecution from "@/pages/metamask-direct-execution";
import ETHGETHGRDirectPool from "@/pages/ethg-ethgr-direct-pool";
import WalletConnection from "@/pages/wallet-connection";
import WalletVerification from "@/pages/wallet-verification";
import SimpleWalletConnect from "@/pages/simple-wallet-connect";
import WalletReady from "@/pages/wallet-ready";
import WalletDashboard from "@/pages/wallet-dashboard";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/navigation";
import { WalletProvider } from "@/components/wallet-provider";
import InstantValueRealization from '@/pages/instant-value-realization';
import { BeaconChainAnalyzer } from './components/beacon-chain-analyzer';
import MyPoolSetup from './pages/my-pool-setup';

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
        <Route path="/live-pool-execution" component={LivePoolExecution} />
        <Route path="/final-pool-launch" component={FinalPoolLaunch} />
        <Route path="/micro-pool-strategy" component={MicroPoolStrategy} />
        <Route path="/ethg-ethgr-pool" component={ETHGETHGRPool} />
        <Route path="/victory-dashboard" component={VictoryDashboard} />
        <Route path="/urgent-execution" component={UrgentExecution} />
        <Route path="/token-address-helper" component={TokenAddressHelper} />
        <Route path="/final-pool-execution" component={FinalPoolExecution} />
        <Route path="/direct-contract-execution" component={DirectContractExecution} />
        <Route path="/etherscan-broadcast" component={EtherscanBroadcast} />
        <Route path="/manual-contract-calls" component={ManualContractCalls} />
        <Route path="/step1-execution" component={Step1Execution} />
        <Route path="/enhanced-verification" component={EnhancedContractVerification} />
        <Route path="/immediate-execution" component={ImmediateExecution} />
        <Route path="/execution-dashboard" component={ExecutionDashboard} />
        <Route path="/alternative-solutions" component={AlternativeSolutions} />
        <Route path="/metamask-direct" component={MetaMaskDirectExecution} />
        <Route path="/ethg-ethgr-direct-pool" component={ETHGETHGRDirectPool} />
        <Route path="/wallet-connection" component={WalletConnection} />
        <Route path="/wallet-verification" component={WalletVerification} />
        <Route path="/simple-wallet-connect" component={SimpleWalletConnect} />
        <Route path="/wallet-ready" component={WalletReady} />
        <Route path="/wallet-dashboard" component={WalletDashboard} />
        <Route path="/widget" component={WidgetPage} />
        <Route path="/etherscan-filter-analyzer" component={EtherscanFilterAnalyzer} />
        <Route path="/instant-value-realization" component={InstantValueRealization} />
        <Route path="/beacon-chain-analyzer" component={BeaconChainAnalyzer} />
        <Route path="/my-pool-setup" component={MyPoolSetup} />
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