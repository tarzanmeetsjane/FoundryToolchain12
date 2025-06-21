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
import ExecutionStatus from "@/pages/execution-status";
import Step3Execution from "@/pages/step3-execution";
import PairCreationNow from "@/pages/pair-creation-now";
import FeeAddressCheck from "@/pages/fee-address-check";
import CorrectFeeInfo from "@/pages/correct-fee-info";
import CreatePairClarification from "@/pages/createpair-clarification";
import QuickPairExecution from "@/pages/quick-pair-execution";
import GasSponsoredExecution from "@/pages/gas-sponsored-execution";
import AlternativeExecution from "@/pages/alternative-execution";
import GasCheck from "@/pages/gas-check";
import ExecuteNow from "@/pages/execute-now";
import PairExistenceCheck from "@/pages/pair-existence-check";
import EthgrEthStrategy from "@/pages/ethgr-eth-strategy";
import ExecuteEthgrEth from "@/pages/execute-ethgr-eth";
import CommunityRecoveryStory from "@/pages/community-recovery-story";
import LiquidityPlanning from "@/pages/liquidity-planning";
import ETHRecoveryCheck from "@/pages/eth-recovery-check";
import RemixETHRecovery from "@/pages/remix-eth-recovery";
import SolRecoveryEmergency from "@/pages/sol-recovery-emergency";
import ExactWithdrawalRecovery from "@/pages/exact-withdrawal-recovery";
import WalletConnectFirst from "@/pages/wallet-connect-first";
import DirectWalletImport from "@/pages/direct-wallet-import";
import FinalRecoverySummary from "@/pages/final-recovery-summary";
import ETHGRPoolCreation from "@/pages/ethgr-pool-creation";
import ETHGRMonetization from "@/pages/ethgr-monetization";
import ETHRecoveryTracker from "@/pages/eth-recovery-tracker";
import ComprehensiveRecovery from "@/pages/comprehensive-recovery";
import ImmediateETHRecovery from "@/pages/immediate-eth-recovery";
import AddressFinder from "@/pages/address-finder";
import FinalETHSolution from "@/pages/final-eth-solution";
import June15Analysis from "@/pages/june15-analysis";
import TransactionAnalyzer from "@/pages/transaction-analyzer";
import DirectTokenSales from "@/pages/direct-token-sales";
import EmergencyRecovery from "@/pages/emergency-recovery";
import SuccessDashboard from "@/pages/success-dashboard";
import SalesExecution from "@/pages/sales-execution";
import AutomatedSalesAssistant from "@/pages/automated-sales-assistant";
import CommunityTargets from "@/pages/community-targets";
import LiquidityScannerIntegration from "@/pages/liquidity-scanner-integration";
import CryptoWidget from "@/pages/crypto-widget";
import TransactionVerification from "@/pages/transaction-verification";
import MoneyTracker from "@/pages/money-tracker";
import LiveDataDashboard from "@/pages/live-data-dashboard";
import BlockchainTestSuite from "@/pages/blockchain-test-suite";
import ETHRecoveryAnalyzer from "@/pages/eth-recovery-analyzer";
import WalletRecoveryDashboard from "@/pages/wallet-recovery-dashboard";
import TransactionAnalysis from "@/pages/transaction-analysis";
import ETHGRSuccessDashboard from "@/pages/ethgr-success-dashboard";
import InstantMonetization from "@/pages/instant-monetization";
import TokenTransferTool from "@/pages/token-transfer-tool";
import LiveTransactionAnalyzer from "@/pages/live-transaction-analyzer";
import RemixIntegration from "@/pages/remix-integration";
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
        <Route path="/execution-status" component={ExecutionStatus} />
        <Route path="/step3-execution" component={Step3Execution} />
        <Route path="/pair-creation-now" component={PairCreationNow} />
        <Route path="/fee-address-check" component={FeeAddressCheck} />
        <Route path="/correct-fee-info" component={CorrectFeeInfo} />
        <Route path="/createpair-clarification" component={CreatePairClarification} />
        <Route path="/gas-sponsored-execution" component={GasSponsoredExecution} />
        <Route path="/alternative-execution" component={AlternativeExecution} />
        <Route path="/gas-check" component={GasCheck} />
        <Route path="/execute-now" component={ExecuteNow} />
        <Route path="/pair-existence-check" component={PairExistenceCheck} />
        <Route path="/ethgr-eth-strategy" component={EthgrEthStrategy} />
        <Route path="/execute-ethgr-eth" component={ExecuteEthgrEth} />
        <Route path="/community-recovery-story" component={CommunityRecoveryStory} />
        <Route path="/liquidity-planning" component={LiquidityPlanning} />
        <Route path="/eth-recovery-check" component={ETHRecoveryCheck} />
        <Route path="/remix-eth-recovery" component={RemixETHRecovery} />
        <Route path="/sol-recovery-emergency" component={SolRecoveryEmergency} />
        <Route path="/exact-withdrawal-recovery" component={ExactWithdrawalRecovery} />
        <Route path="/wallet-connect-first" component={WalletConnectFirst} />
        <Route path="/direct-wallet-import" component={DirectWalletImport} />
        <Route path="/final-recovery-summary" component={FinalRecoverySummary} />
        <Route path="/ethgr-pool-creation" component={ETHGRPoolCreation} />
        <Route path="/ethgr-monetization" component={ETHGRMonetization} />
        <Route path="/eth-recovery-tracker" component={ETHRecoveryTracker} />
        <Route path="/comprehensive-recovery" component={ComprehensiveRecovery} />
        <Route path="/immediate-eth-recovery" component={ImmediateETHRecovery} />
        <Route path="/address-finder" component={AddressFinder} />
        <Route path="/final-eth-solution" component={FinalETHSolution} />
        <Route path="/june15-analysis" component={June15Analysis} />
        <Route path="/transaction-analyzer" component={TransactionAnalyzer} />
        <Route path="/direct-token-sales" component={DirectTokenSales} />
        <Route path="/emergency-recovery" component={EmergencyRecovery} />
        <Route path="/success-dashboard" component={SuccessDashboard} />
        <Route path="/sales-execution" component={SalesExecution} />
        <Route path="/automated-sales-assistant" component={AutomatedSalesAssistant} />
        <Route path="/community-targets" component={CommunityTargets} />
        <Route path="/liquidity-scanner-integration" component={LiquidityScannerIntegration} />
        <Route path="/crypto-widget" component={CryptoWidget} />
        <Route path="/transaction-verification" component={TransactionVerification} />
        <Route path="/money-tracker" component={MoneyTracker} />
        <Route path="/live-data-dashboard" component={LiveDataDashboard} />
        <Route path="/blockchain-test-suite" component={BlockchainTestSuite} />
        <Route path="/eth-recovery-analyzer" component={ETHRecoveryAnalyzer} />
        <Route path="/wallet-recovery-dashboard" component={WalletRecoveryDashboard} />
        <Route path="/transaction-analysis" component={TransactionAnalysis} />
        <Route path="/ethgr-success-dashboard" component={ETHGRSuccessDashboard} />
        <Route path="/instant-monetization" component={InstantMonetization} />
        <Route path="/token-transfer-tool" component={TokenTransferTool} />
        <Route path="/live-transaction-analyzer" component={LiveTransactionAnalyzer} />
        <Route path="/remix-integration" component={RemixIntegration} />
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