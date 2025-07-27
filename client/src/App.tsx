import { useState } from "react";
import { useLocation, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Droplets, Target, Wallet, AlertTriangle, CheckCircle, ArrowRight, Atom, Radio, Shield, Search, Menu, X, Database, FileCheck, Code2, DollarSign, ArrowRightLeft, BarChart } from "lucide-react";

import HomePage from "./pages/HomePage";
import BotDashboard from "./pages/BotDashboard";
import QuantumLiquidity from "./pages/QuantumLiquidity";
import MoneyFrequencyTuner from "./pages/MoneyFrequencyTuner";
import BlockchainRescue from "./pages/BlockchainRescue";
import ContractVerification from "./pages/ContractVerification";
import VictimRecovery from "./pages/VictimRecovery";
import HoneypotReversal from "./pages/HoneypotReversal";
import BlacklistReversal from "./pages/BlacklistReversal";
import VerificationProgress from "./pages/VerificationProgress";
import TransactionAnalyzer from "./pages/TransactionAnalyzer";
import StateChangeAnalyzer from "./pages/StateChangeAnalyzer";
import ContractDetails from "./pages/ContractDetails";
import VerificationSuccess from "./pages/VerificationSuccess";
import RecoveryStatus from "./pages/RecoveryStatus";
import ContractSource from "./pages/ContractSource";
import ConstructorArgs from "./pages/ConstructorArgs";
import VerificationWalkthrough from "./pages/VerificationWalkthrough";
import LiveVerification from "./pages/LiveVerification";
import OptimismVerification from "./pages/OptimismVerification";
import DeploymentSuccess from "./pages/DeploymentSuccess";
import ContractDecompiler from "./pages/ContractDecompiler";
import TokenAnalytics from "./pages/TokenAnalytics";
import AirdropSecurityChecker from "./pages/AirdropSecurityChecker";
import TokenValueProjection from "./pages/TokenValueProjection";
import CurrentValueDashboard from "./pages/CurrentValueDashboard";
import WalletIntegration from "./pages/WalletIntegration";
import ExodusImportGuide from "./pages/ExodusImportGuide";
import ERC20ComplianceChecker from "./pages/ERC20ComplianceChecker";
import LivePortfolioStatus from "./pages/LivePortfolioStatus";
import RemixIntegration from "./pages/RemixIntegration";
import OriginalWalletAnalysis from "./pages/OriginalWalletAnalysis";
import MissingETHInvestigation from "./pages/MissingETHInvestigation";
import RealWalletStatus from "./pages/RealWalletStatus";
import LiveBlockchainInvestigation from "./pages/LiveBlockchainInvestigation";
import SwapTroubleshooting from "./pages/SwapTroubleshooting";
import RealPortfolioStatus from "./pages/RealPortfolioStatus";
import SwapHistoryAnalysis from "./pages/SwapHistoryAnalysis";
import ETHGRSwapExecution from "./pages/ETHGRSwapExecution";
import LiveSwapGuide from "./pages/LiveSwapGuide";
import ERC1155TokenAnalysis from "./pages/ERC1155TokenAnalysis";
import PortfolioVolatilityAnalysis from "./pages/PortfolioVolatilityAnalysis";
import RemixContractAnalysis from "./pages/RemixContractAnalysis";
import SourcifyVerification from "./pages/SourcifyVerification";
import ExistingContractVerification from "./pages/ExistingContractVerification";
import MetadataGenerationGuide from "./pages/MetadataGenerationGuide";
import SimpleContractCopy from "./pages/SimpleContractCopy";
import FoundryVerification from "./pages/FoundryVerification";
import ContractVerificationDashboard from "./pages/ContractVerificationDashboard";
import SimpleVerificationGuide from "./pages/SimpleVerificationGuide";
import FoundryOfficialGuide from "./pages/FoundryOfficialGuide";
import BytecodeMatchFix from "./pages/BytecodeMatchFix";
import BytecodeDecompiler from "./pages/BytecodeDecompiler";
import FinalVerificationSteps from "./pages/FinalVerificationSteps";
import ContractComparisonAnalysis from "./pages/ContractComparisonAnalysis";
import DirectVerificationGuide from "./pages/DirectVerificationGuide";
import SuperSimpleVerification from "./pages/SuperSimpleVerification";
import CopyPasteVerification from "./pages/CopyPasteVerification";
import AutomatedVerification from "./pages/AutomatedVerification";
import QuickVerification from "./pages/QuickVerification";
import RemixVerification from "./pages/RemixVerification";
import FinalVerificationSystem from "./pages/FinalVerificationSystem";
import VerificationDashboard from "./pages/VerificationDashboard";
import LiveNetworkStatus from "./pages/LiveNetworkStatus";
import TransactionAnalysis from "./pages/TransactionAnalysis";
import HistoricalWalletTimeline from "./pages/HistoricalWalletTimeline";
import ContractComparison from "./pages/ContractComparison";
import BytecodeVerification from "./pages/BytecodeVerification";
import DeploymentVerification from "./pages/DeploymentVerification";
import HoneypotAnalysis from "./pages/HoneypotAnalysis";
import SolidityAnalyzer from "./pages/SolidityAnalyzer";
import DualContractVerification from "./pages/DualContractVerification";
import OptimismContractFix from "./pages/OptimismContractFix";
import TokenLocationStatus from "./pages/TokenLocationStatus";
import TokenDiscoveryResults from "./pages/TokenDiscoveryResults";
import Interact from './pages/interact';
import LiveBlockchainAnalysis from "./pages/LiveBlockchainAnalysis";
import EthRecoverySystem from "./pages/EthRecoverySystem";
import ContractLookup from "./pages/ContractLookup";
import DownloadAnalyzer from "./pages/DownloadAnalyzer";
import JavaScriptAnalysis from "./pages/JavaScriptAnalysis";
import DelegationAnalysis from "./pages/DelegationAnalysis";
import ActionPlan from "./pages/ActionPlan";
import VerificationHelper from "./pages/VerificationHelper";
import FoundryVerificationGuide from "./pages/FoundryVerificationGuide";
import VerificationFix from "./pages/VerificationFix";
import EthConversion from "./pages/EthConversion";
import MetaMaskSwap from "./pages/MetaMaskSwap";
import DirectEthSwap from "./pages/DirectEthSwap";
import VerificationStatus from "./pages/VerificationStatus";
import TokenTrackingDiscovery from "./pages/TokenTrackingDiscovery";
import WalletDiscoveryAnalysis from "./pages/WalletDiscoveryAnalysis";
import MultiWalletTokenSearch from "./pages/MultiWalletTokenSearch";
import DevelopmentWalletAccess from "./pages/DevelopmentWalletAccess";
import TradingBotAnalysis from "./pages/TradingBotAnalysis";
import ComprehensiveIntegration from "./pages/ComprehensiveIntegration";
import FixValueDisplay from "./pages/FixValueDisplay";
import ImmediateVerificationGuide from "./pages/ImmediateVerificationGuide";
import SourceifyVerification from "./pages/SourceifyVerification";
import SourceifyV2Verification from "./pages/SourceifyV2Verification";
import { Route, Switch } from "wouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(queryKey[0] as string);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
    },
  },
});

function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Target },
    { path: "/contract-verification", label: "Fix $0.00 Value", icon: Shield },
    { path: "/contract-details", label: "Contract Details", icon: FileCheck },
    { path: "/verification-success", label: "Verification Success", icon: CheckCircle },
    { path: "/recovery-status", label: "Recovery Status", icon: TrendingUp },
    { path: "/contract-decompiler", label: "Contract Decompiler", icon: Code2 },
    { path: "/token-analytics", label: "Token Analytics", icon: TrendingUp },
    { path: "/current-values", label: "Current Values", icon: Wallet },
    { path: "/wallet-integration", label: "Wallet Setup", icon: Wallet },
    { path: "/exodus-guide", label: "Exodus Import", icon: Wallet },
    { path: "/erc20-compliance", label: "ERC20 Analysis", icon: AlertTriangle },
    { path: "/live-portfolio", label: "Live Portfolio", icon: TrendingUp },
    { path: "/remix-integration", label: "Remix IDE", icon: Code2 },
    { path: "/original-wallet", label: "Original Wallet", icon: Wallet },
    { path: "/missing-eth", label: "Missing ETH", icon: AlertTriangle },
    { path: "/real-wallet-status", label: "Real Wallet Status", icon: Search },
    { path: "/live-investigation", label: "Live Investigation", icon: CheckCircle },
    { path: "/swap-troubleshooting", label: "Swap Issues", icon: AlertTriangle },
    { path: "/real-portfolio", label: "Real Portfolio", icon: TrendingUp },
    { path: "/swap-history", label: "Trading History", icon: ArrowRightLeft },
    { path: "/transaction-analysis", label: "Failed TX Analysis", icon: Search },
    { path: "/ethgr-swap", label: "Execute ETHGR Swap", icon: TrendingUp },
    { path: "/live-swap-guide", label: "Live Swap Assistant", icon: Wallet },
    { path: "/token-value", label: "Value Projection", icon: DollarSign },
    { path: "/airdrop-security", label: "Airdrop Security", icon: Shield },
    { path: "/transaction-analyzer", label: "Transaction Analysis", icon: Search },
    { path: "/state-analysis", label: "State Change Analysis", icon: Database },
    { path: "/victim-recovery", label: "Victim Recovery", icon: AlertTriangle },
    { path: "/honeypot-reversal", label: "Honeypot Reversal", icon: CheckCircle },
    { path: "/dashboard", label: "Bot Dashboard", icon: TrendingUp },
    { path: "/quantum", label: "Quantum Liquidity", icon: Atom },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-slate-800">ETHGR Foundation</h1>
            <div className="flex space-x-6">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} href={path}>
                  <span className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    location === path 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function LiquidityPoolCreation() {
  const [poolData, setPoolData] = useState({
    tokenA: "ETHGR",
    tokenB: "ETH",
    amountA: "219300",
    amountB: "29.5",
    fee: "0.25%",
    priceImpact: "-0.56%"
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Create Liquidity Pool</h1>
        <p className="text-lg text-gray-600">
          Convert 219,300 ETHGR tokens to $45,000 cash relief
        </p>
      </div>

      {/* Status Alert */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="font-semibold text-green-800 mb-1">
            Contract Deployed Successfully
          </div>
          <div className="text-green-700">
            1,990,000 ETHGR tokens minted to foundation wallet. Ready for conversion.
          </div>
        </AlertDescription>
      </Alert>

      {/* Pool Creation Card */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            ETHGR → ETH Conversion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Input */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600">You're converting</span>
              <Badge variant="secondary">Available: 1,990,000 ETHGR</Badge>
            </div>
            <div className="flex items-center space-x-3">
              <input 
                type="text" 
                value={poolData.amountA}
                onChange={(e) => setPoolData(prev => ({...prev, amountA: e.target.value}))}
                className="text-2xl font-bold bg-transparent border-none outline-none w-full"
              />
              <Badge variant="outline" className="px-3 py-1">ETHGR</Badge>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-slate-400" />
          </div>

          {/* Output Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600">You'll receive</span>
              <Badge variant="secondary">Rate: 1 ETH = 7,433.77 ETHGR</Badge>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-blue-700">{poolData.amountB} ETH</span>
              <Badge variant="outline" className="px-3 py-1">≈ $71,945</Badge>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Network Fee (0.25%)</span>
              <span className="font-medium">≈ $180</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Price Impact</span>
              <span className="font-medium text-amber-600">{poolData.priceImpact}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tax Reserve (40%)</span>
              <span className="font-medium text-amber-600">$28,706</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
              <span>Available Cash</span>
              <span className="text-green-600">$45,000</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => window.open("https://app.uniswap.org/swap?inputCurrency=0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90&outputCurrency=ETH", "_blank")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Execute Conversion on Uniswap
            </Button>

            <Button variant="outline" className="w-full">
              Review Transaction Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Foundation Impact */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Droplets className="w-5 h-5" />
            Foundation Relief Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-green-200 bg-green-50 mb-4">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <div className="font-semibold text-green-800 mb-1">
                $45,000 Target Achieved
              </div>
              <div className="text-green-700">
                Foundation maintains $605,570 reserve while providing victim assistance.
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">11%</div>
              <div className="text-sm text-blue-600">Tokens Converting</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">$605K</div>
              <div className="text-sm text-green-600">Reserve Maintained</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quantum Enhancement Preview */}
      <Card className="max-w-2xl mx-auto border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Atom className="w-5 h-5" />
            Quantum Liquidity Enhancement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Advanced quantum mechanics principles applied to optimize token emissions 
            and liquidity stability using Schrödinger equation modeling.
          </p>
          <Link href="/quantum">
            <Button variant="outline" className="w-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              Explore Quantum Analysis
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50">
        <Navigation />

        <main>
          <Switch>
            <Route path="/" component={OptimismVerification} />
            <Route path="/dashboard" component={BotDashboard} />
            <Route path="/quantum" component={QuantumLiquidity} />
            <Route path="/frequency" component={MoneyFrequencyTuner} />
            <Route path="/rescue" component={BlockchainRescue} />
            <Route path="/verification" component={VerificationProgress} />
            <Route path="/contract-verification" component={ContractVerification} />
            <Route path="/victim-recovery" component={VictimRecovery} />
            <Route path="/honeypot-reversal" component={HoneypotReversal} />
            <Route path="/blacklist-reversal" component={BlacklistReversal} />
            <Route path="/transaction-analyzer" component={TransactionAnalyzer} />
            <Route path="/state-analysis" component={StateChangeAnalyzer} />
            <Route path="/automated-verification" component={AutomatedVerification} />
            <Route path="/contract-details" component={ContractDetails} />
            <Route path="/verification-success" component={VerificationSuccess} />
            <Route path="/recovery-status" component={RecoveryStatus} />
            <Route path="/contract-verification" component={ContractVerification} />
            <Route path="/contract-source" component={ContractSource} />
            <Route path="/constructor-args" component={ConstructorArgs} />
            <Route path="/remix-integration" component={RemixIntegration} />
            <Route path="/verification-walkthrough" component={VerificationWalkthrough} />
            <Route path="/live-verification" component={LiveVerification} />
            <Route path="/optimism-verification" component={OptimismVerification} />
            <Route path="/deployment-success" component={DeploymentSuccess} />
            <Route path="/contract-decompiler" component={ContractDecompiler} />
            <Route path="/token-analytics" component={TokenAnalytics} />
            <Route path="/airdrop-security" component={AirdropSecurityChecker} />
            <Route path="/token-value" component={TokenValueProjection} />
            <Route path="/current-values" component={CurrentValueDashboard} />
            <Route path="/wallet-integration" component={WalletIntegration} />
            <Route path="/exodus-guide" component={ExodusImportGuide} />
            <Route path="/erc20-compliance" component={ERC20ComplianceChecker} />
            <Route path="/live-portfolio" component={LivePortfolioStatus} />
            <Route path="/remix-integration" component={RemixIntegration} />
            <Route path="/original-wallet" component={OriginalWalletAnalysis} />
            <Route path="/missing-eth" component={MissingETHInvestigation} />
            <Route path="/real-wallet-status" component={RealWalletStatus} />
            <Route path="/live-investigation" component={LiveBlockchainInvestigation} />
            <Route path="/swap-troubleshooting" component={SwapTroubleshooting} />
            <Route path="/real-portfolio" component={RealPortfolioStatus} />
            <Route path="/swap-history" component={SwapHistoryAnalysis} />
            <Route path="/transaction-analysis" component={TransactionAnalysis} />
            <Route path="/ethgr-swap" component={ETHGRSwapExecution} />
            <Route path="/live-swap-guide" component={LiveSwapGuide} />
            <Route path="/erc1155-analysis" component={ERC1155TokenAnalysis} />
            <Route path="/portfolio-volatility" component={PortfolioVolatilityAnalysis} />
            <Route path="/remix-analysis" component={RemixContractAnalysis} />
            <Route path="/sourcify-verification" component={SourcifyVerification} />
            <Route path="/existing-contracts" component={ExistingContractVerification} />
            <Route path="/metadata-fix" component={MetadataGenerationGuide} />
            <Route path="/simple-copy" component={SimpleContractCopy} />
            <Route path="/foundry-verification" component={FoundryVerification} />
            <Route path="/verification-dashboard" component={ContractVerificationDashboard} />
            <Route path="/simple-verification" component={SimpleVerificationGuide} />
            <Route path="/foundry-official" component={FoundryOfficialGuide} />
            <Route path="/bytecode-fix" component={BytecodeMatchFix} />
            <Route path="/bytecode-analysis" component={BytecodeDecompiler} />
            <Route path="/final-verification" component={FinalVerificationSteps} />
            <Route path="/contract-comparison" component={ContractComparisonAnalysis} />
            <Route path="/direct-verification" component={DirectVerificationGuide} />
            <Route path="/super-simple" component={SuperSimpleVerification} />
            <Route path="/copy-paste" component={CopyPasteVerification} />
            <Route path="/automated" component={AutomatedVerification} />
            <Route path="/quick" component={QuickVerification} />
            <Route path="/remix" component={RemixVerification} />
            <Route path="/final" component={FinalVerificationSystem} />
            <Route path="/status" component={VerificationStatus} />
            <Route path="/dashboard" component={VerificationDashboard} />
            <Route path="/network" component={LiveNetworkStatus} />
            <Route path="/transaction" component={TransactionAnalysis} />
            <Route path="/timeline" component={HistoricalWalletTimeline} />
            <Route path="/compare" component={ContractComparison} />
            <Route path="/bytecode" component={BytecodeVerification} />
            <Route path="/deploy" component={DeploymentVerification} />
            <Route path="/honeypot" component={HoneypotAnalysis} />
            <Route path="/solidity" component={SolidityAnalyzer} />
            <Route path="/dual" component={DualContractVerification} />
            <Route path="/optimism-fix" component={OptimismContractFix} />
            <Route path="/token-status" component={TokenLocationStatus} />
            <Route path="/discovery" component={TokenDiscoveryResults} />
            <Route path="/live-analysis" component={LiveBlockchainAnalysis} />
            <Route path="/eth-recovery" component={EthRecoverySystem} />
            <Route path="/contract-lookup" component={ContractLookup} />
            <Route path="/download-analysis" component={DownloadAnalyzer} />
            <Route path="/js-analysis" component={JavaScriptAnalysis} />
            <Route path="/delegation" component={DelegationAnalysis} />
            <Route path="/action-plan" component={ActionPlan} />
            <Route path="/verification-fix" component={VerificationHelper} />
            <Route path="/foundry-guide" component={FoundryVerificationGuide} />
            <Route path="/verification-progress" component={VerificationProgress} />
            <Route path="/verification-error" component={VerificationFix} />
            <Route path="/eth-conversion" component={EthConversion} />
            <Route path="/metamask-swap" component={MetaMaskSwap} />
            <Route path="/direct-eth-swap" component={DirectEthSwap} />
            <Route path="/verification-status" component={VerificationStatus} />
            <Route path="/transaction-analyzer" component={TransactionAnalyzer} />
            <Route path="/token-tracking" component={TokenTrackingDiscovery} />
            <Route path="/wallet-discovery" component={WalletDiscoveryAnalysis} />
            <Route path="/multi-wallet-search" component={MultiWalletTokenSearch} />
            <Route path="/development-wallet-access" component={DevelopmentWalletAccess} />
            <Route path="/trading-bot-analysis" component={TradingBotAnalysis} />
            <Route path="/comprehensive-integration" component={ComprehensiveIntegration} />
            <Route path="/fix-value-display" component={FixValueDisplay} />
            <Route path="/immediate-verification" component={ImmediateVerificationGuide} />
            <Route path="/sourcify-verification" component={SourceifyVerification} />
            <Route path="/sourcify-v2" component={SourceifyV2Verification} />
            <Route path="/interact" component={Interact} />

          </Switch>
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}