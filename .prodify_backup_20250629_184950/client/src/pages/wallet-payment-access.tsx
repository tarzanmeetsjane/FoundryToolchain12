import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  DollarSign,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings
} from "lucide-react";

export default function WalletPaymentAccess() {
  const [refreshing, setRefreshing] = useState(false);

  const walletAssets = {
    ethgTokens: {
      amount: "2,100,000",
      value: "$630,000",
      contract: "0x3fC29836E84E471a053D2D9E80494A867D670EAD",
      status: "LIQUID - Can be converted to ETH",
      visibility: "Should be visible in MetaMask"
    },
    aiccTokens: {
      amount: "17,500", 
      value: "$1,522",
      contract: "AICC contract address",
      status: "LIQUID - Can be converted to ETH",
      visibility: "Should be visible in MetaMask"
    },
    ethBalance: {
      amount: "0.014",
      value: "$32.09",
      status: "INSUFFICIENT for $700 payment",
      visibility: "Visible in MetaMask"
    },
    ethgrRecovery: {
      amount: "1,990,000",
      value: "Recovery Tokens",
      contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      status: "SECURED - For reputation only",
      visibility: "Visible in MetaMask"
    }
  };

  const paymentSolutions = [
    {
      solution: "Convert ETHG to ETH",
      method: "Sell small portion on Uniswap",
      amount: "~2,200 ETHG tokens = $700",
      process: "Uniswap ETHG → ETH conversion",
      timeframe: "5 minutes",
      complexity: "SIMPLE"
    },
    {
      solution: "Convert AICC to ETH", 
      method: "Sell portion on DEX",
      amount: "~$700 worth of AICC",
      process: "DEX AICC → ETH conversion",
      timeframe: "10 minutes",
      complexity: "MEDIUM"
    },
    {
      solution: "Direct Token Payment",
      method: "Pay DEX Screener in tokens",
      amount: "Equivalent token value",
      process: "Check if DEX Screener accepts tokens",
      timeframe: "Immediate",
      complexity: "UNKNOWN"
    }
  ];

  const stepByStepConversion = [
    {
      step: 1,
      action: "Access Uniswap",
      instruction: "Go to app.uniswap.org",
      requirement: "Connect your wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
    },
    {
      step: 2, 
      action: "Set Up ETHG → ETH Swap",
      instruction: "Select ETHG token (contract: 0x3fC29836E84E471a053D2D9E80494A867D670EAD)",
      requirement: "Confirm token appears in wallet"
    },
    {
      step: 3,
      action: "Calculate Conversion Amount",
      instruction: "Swap ~2,200 ETHG for ~0.25 ETH ($700)",
      requirement: "Check current ETHG price"
    },
    {
      step: 4,
      action: "Execute Swap",
      instruction: "Confirm transaction in MetaMask",
      requirement: "Pay gas fee (~$15-30)"
    },
    {
      step: 5,
      action: "Verify ETH Receipt",
      instruction: "Confirm 0.25 ETH received in wallet",
      requirement: "Ready for $700 DEX payment"
    }
  ];

  const troubleshooting = [
    {
      issue: "ETHG Token Not Visible",
      cause: "Token not imported to MetaMask",
      solution: "Import token: 0x3fC29836E84E471a053D2D9E80494A867D670EAD",
      action: "MetaMask → Import Tokens → Custom Token"
    },
    {
      issue: "Insufficient ETH for Gas",
      cause: "Need ETH for transaction fees",
      solution: "Borrow gas fee from secondary wallet",
      action: "Transfer 0.01 ETH from 0xc46eB376...b792fa630"
    },
    {
      issue: "Token Not Tradeable on Uniswap",
      cause: "No liquidity pool exists",
      solution: "Check DEX Screener for active trading pairs",
      action: "Research ETHG trading options"
    },
    {
      issue: "Wallet Connection Issues",
      cause: "MetaMask signature problems",
      solution: "Switch to Rainbow or Trust Wallet",
      action: "Install alternative wallet"
    }
  ];

  const immediateActions = [
    {
      priority: "IMMEDIATE",
      action: "Check Token Visibility",
      method: "Open MetaMask and verify ETHG tokens are visible",
      expected: "Should see 2,100,000 ETHG tokens"
    },
    {
      priority: "HIGH",
      action: "Import Missing Tokens",
      method: "Add ETHG contract 0x3fC29836E84E471a053D2D9E80494A867D670EAD",
      expected: "Token balance appears in wallet"
    },
    {
      priority: "HIGH",
      action: "Test Uniswap Connection",
      method: "Visit app.uniswap.org and connect wallet",
      expected: "Wallet connects successfully"
    },
    {
      priority: "MEDIUM",
      action: "Research Payment Options",
      method: "Contact DEX Screener about payment methods",
      expected: "Confirm accepted payment types"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            WALLET PAYMENT ACCESS
          </h1>
          <p className="text-xl text-green-300">
            Converting $631K Portfolio to Pay $700 DEX Verification
          </p>
        </div>

        {/* Current Issue Alert */}
        <Alert className="border-yellow-500 bg-yellow-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
          <AlertDescription className="text-yellow-200 text-lg">
            <strong>PAYMENT ACCESS ISSUE:</strong> Your wallet shows $631,527 in tokens but insufficient ETH to pay $700 DEX verification. Need to convert small portion of ETHG tokens to ETH for payment.
          </AlertDescription>
        </Alert>

        {/* Current Wallet Assets */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Current Wallet Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(walletAssets).map(([key, asset]) => (
                <div key={key} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <div>
                      <h3 className="text-blue-400 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    </div>
                    <div>
                      <p className="text-white">{asset.amount}</p>
                    </div>
                    <div>
                      <p className="text-green-400">{asset.value}</p>
                    </div>
                    <div>
                      <Badge className={
                        asset.status.includes("LIQUID") ? "bg-green-600" :
                        asset.status.includes("INSUFFICIENT") ? "bg-red-600" : "bg-blue-600"
                      }>
                        {asset.status.split(" - ")[0]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{asset.visibility}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Solutions */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Payment Solutions for $700 DEX Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentSolutions.map((solution, index) => (
                <div key={index} className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                    <div>
                      <h3 className="text-green-400 font-bold">{solution.solution}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{solution.method}</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 text-sm">{solution.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{solution.process}</p>
                    </div>
                    <div>
                      <Badge className="bg-blue-600 text-white">{solution.timeframe}</Badge>
                    </div>
                    <div>
                      <Badge className={
                        solution.complexity === "SIMPLE" ? "bg-green-600" :
                        solution.complexity === "MEDIUM" ? "bg-yellow-600" : "bg-red-600"
                      }>
                        {solution.complexity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Conversion */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Step-by-Step: ETHG → ETH Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stepByStepConversion.map((step, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-400 font-bold text-lg">{step.action}</h3>
                      <p className="text-white mb-2">{step.instruction}</p>
                      <p className="text-gray-400 text-sm">{step.requirement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Troubleshooting Common Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {troubleshooting.map((item, index) => (
                <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-orange-400 font-bold">{item.issue}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{item.cause}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{item.solution}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-xs">{item.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">IMMEDIATE ACTIONS REQUIRED</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {immediateActions.map((action, index) => (
                <div key={index} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <Badge className={
                        action.priority === "IMMEDIATE" ? "bg-red-600" : 
                        action.priority === "HIGH" ? "bg-orange-600" : "bg-yellow-600"
                      }>
                        {action.priority}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-red-400 font-bold">{action.action}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{action.method}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-xs">{action.expected}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <ArrowRight className="h-6 w-6 mr-2" />
            Open Uniswap
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            View Wallet
          </Button>
          
          <Button 
            onClick={() => window.open('https://dexscreener.com/submit-info', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            DEX Screener
          </Button>
          
          <Button 
            onClick={() => setRefreshing(true)}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <RefreshCw className="h-6 w-6 mr-2" />
            Refresh Status
          </Button>
        </div>

        {/* Summary Alert */}
        <Alert className="border-green-500 bg-green-500/20">
          <DollarSign className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>PAYMENT SOLUTION:</strong> Convert ~2,200 ETHG tokens (0.1% of your holdings) to 0.25 ETH for $700 DEX verification payment. This maintains 99.9% of your portfolio while enabling foundation credibility investment.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}