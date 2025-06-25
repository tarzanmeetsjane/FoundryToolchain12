import { Route, Router, Link, useLocation } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Droplets,
  DollarSign,
  ArrowRight,
  Target,
  Wallet,
  Home,
  TrendingUp
} from "lucide-react";

import ETHExtractionDashboard from './pages/eth-extraction-dashboard';
import DeploymentInterface from './pages/deployment-interface';
import ConversionInterface from './pages/conversion-interface';
import UniswapConversion from './pages/uniswap-conversion';
import ContractVerification from './pages/contract-verification';
import ContractDetails from './pages/contract-details';
import ValueCreation from './pages/value-creation';

function Navigation() {
  const [location] = useLocation();
  
  const navItems = [
    { path: "/value-creation", label: "Create Value", icon: TrendingUp },
    { path: "/", label: "Pool Creation", icon: Droplets },
    { path: "/deploy", label: "Deploy Contract", icon: Target },
    { path: "/extraction", label: "ETH Extraction", icon: Wallet },
  ];

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-sm border-b mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} href={path}>
              <div className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors cursor-pointer ${
                location === path 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}>
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function LiquidityPoolCreation() {
  const [currentStep, setCurrentStep] = useState(0);

  const poolCreationSteps = [
    {
      title: "Gather Required Assets",
      description: "Need both ETHGR tokens AND ETH to create initial liquidity pool",
      details: [
        "✓ 1,990,000 ETHGR tokens (confirmed in wallet)",
        "❌ ETH required for pairing (need to acquire)",
        "Suggested ratio: 10,000 ETHGR + 0.1 ETH for initial pool"
      ],
      action: "Acquire ETH for pool creation"
    },
    {
      title: "Extract ETH from Contract Wallets",
      description: "Recover available ETH from contract addresses for liquidity",
      details: [
        "Contract 0xc46eB37677360EfDc011F4097621F15b792fa630: 0.00136014 ETH",
        "Additional contract addresses to check for ETH balances",
        "Use owner privileges to extract available ETH"
      ],
      action: "Execute ETH extraction scripts"
    },
    {
      title: "Create ETHGR/ETH Pool on Uniswap",
      description: "Establish initial trading pair with extracted ETH",
      details: [
        "Use Uniswap V3 pool creation interface",
        "Set initial price based on desired token valuation",
        "Provide liquidity: 10,000 ETHGR + available ETH"
      ],
      action: "Create pool via Uniswap interface"
    },
    {
      title: "Enable Trading & Conversion",
      description: "Once pool exists, tokens become tradeable for ETH conversion",
      details: [
        "Pool provides price discovery mechanism",
        "Enables ETHGR → ETH → USD conversion path",
        "Foundation can convert remaining tokens gradually"
      ],
      action: "Begin systematic token conversion"
    }
  ];

  const ethExtractionStrategy = {
    primaryContract: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    confirmedEth: "0.00136014 ETH",
    usdValue: "$3.29",
    additionalSources: [
      "Check all contract addresses for ETH balances",
      "Extract from delegation contracts if accessible",
      "Recover from failed transaction gas reserves"
    ]
  };

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Liquidity Pool Creation Required
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          ETHGR tokens need initial liquidity pool before Uniswap trading is possible
        </p>
      </div>

      {/* Critical Issue Alert */}
      <Alert className="max-w-4xl mx-auto mb-8 border-amber-200 bg-amber-50 dark:bg-amber-900/20">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>TRADING BLOCKED:</strong> ETHGR tokens cannot be traded on Uniswap until an initial 
          liquidity pool is created. We need both ETHGR tokens AND ETH to establish the trading pair.
        </AlertDescription>
      </Alert>

      {/* Current Situation */}
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center">
            <Target className="h-8 w-8 mr-3 text-blue-500" />
            Current Asset Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                ✅ ETHGR Tokens Available
              </h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">1,990,000 ETHGR</div>
                <div className="text-green-600 dark:text-green-400">
                  Confirmed in wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
                </div>
                <Badge className="bg-green-500">Ready for Pool</Badge>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                ❌ ETH Required for Pairing
              </h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-700 dark:text-red-300">0.00136014 ETH</div>
                <div className="text-red-600 dark:text-red-400">
                  Available in contract address (needs extraction)
                </div>
                <Badge className="bg-red-500">Needs Recovery</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ETH Extraction Strategy */}
      <Card className="max-w-4xl mx-auto mb-8 border-2 border-blue-200 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700 dark:text-blue-300 flex items-center">
            <Droplets className="h-8 w-8 mr-3" />
            ETH Extraction Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>CONFIRMED ETH SOURCE:</strong> Contract {ethExtractionStrategy.primaryContract} 
              contains {ethExtractionStrategy.confirmedEth} ({ethExtractionStrategy.usdValue}) ready for extraction.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">Target Contract</div>
              <div className="text-sm text-blue-600 dark:text-blue-400 break-all">
                {ethExtractionStrategy.primaryContract}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">Available ETH</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {ethExtractionStrategy.confirmedEth}
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">USD Value</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {ethExtractionStrategy.usdValue}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 dark:text-white">Additional ETH Sources to Check:</h4>
            {ethExtractionStrategy.additionalSources.map((source, index) => (
              <div key={index} className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="w-6 h-6 bg-slate-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <span className="text-slate-700 dark:text-slate-300">{source}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pool Creation Process */}
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700 dark:text-green-300 flex items-center">
            <Droplets className="h-8 w-8 mr-3" />
            Liquidity Pool Creation Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {poolCreationSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${
                    index === 0 ? 'bg-amber-500 text-white' :
                    index === 1 ? 'bg-blue-500 text-white' :
                    index === 2 ? 'bg-green-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div className={`flex-1 rounded-lg p-4 ${
                    index === 0 ? 'bg-amber-50 dark:bg-amber-900/20' :
                    index === 1 ? 'bg-blue-50 dark:bg-blue-900/20' :
                    index === 2 ? 'bg-green-50 dark:bg-green-900/20' :
                    'bg-purple-50 dark:bg-purple-900/20'
                  }`}>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-3">{step.description}</p>
                    <div className="space-y-1 mb-3">
                      {step.details.map((detail, i) => (
                        <div key={i} className="text-sm text-slate-700 dark:text-slate-300">
                          {detail}
                        </div>
                      ))}
                    </div>
                    <Badge className={
                      index === 0 ? 'bg-amber-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-green-500' :
                      'bg-purple-500'
                    }>
                      {step.action}
                    </Badge>
                  </div>
                </div>
                {index < poolCreationSteps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="h-6 w-6 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Center */}
      <Card className="max-w-4xl mx-auto border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-700 dark:text-green-300">
            Execute Pool Creation Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              <strong>NEXT STEPS:</strong> Extract 0.00136014 ETH from contract address, then create 
              ETHGR/ETH pool on Uniswap to enable trading and begin $45,000 conversion process.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Link href="/extraction">
              <Button className="h-16 text-lg bg-blue-600 hover:bg-blue-700 text-white w-full">
                <Wallet className="h-6 w-6 mr-2" />
                Start ETH Extraction
              </Button>
            </Link>
            
            <Button
              onClick={() => {
                const url = 'https://app.uniswap.org/pool';
                navigator.clipboard.writeText(url);
                window.open(url, '_blank');
              }}
              className="h-16 text-lg bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Droplets className="h-6 w-6 mr-2" />
              Uniswap Pool Creation
            </Button>
            
            <Button
              onClick={() => {
                const url = 'https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843';
                navigator.clipboard.writeText(url);
                window.open(url, '_blank');
              }}
              className="h-16 text-lg bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-6 w-6 mr-2" />
              Verify ETHGR Balance
            </Button>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-slate-600 dark:text-slate-400">
              <strong>Process:</strong> ETH Extraction → Pool Creation → Trading Enabled → $45,000 Conversion
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Timeline: Pool creation enables immediate ETHGR → ETH conversion capability
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Navigation />
        
        <Route path="/" component={ContractVerification} />
        <Route path="/value-creation" component={ValueCreation} />
        <Route path="/extraction" component={ETHExtractionDashboard} />
        <Route path="/deployment" component={DeploymentInterface} />
        <Route path="/conversion" component={ConversionInterface} />
        <Route path="/uniswap" component={UniswapConversion} />
        <Route path="/details" component={ContractDetails} />
        <Route path="/liquidity" component={LiquidityPoolCreation} />
      </div>
    </Router>
  );
}