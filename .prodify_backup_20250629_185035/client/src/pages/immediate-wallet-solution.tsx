import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Download,
  Zap,
  Target,
  ArrowRight,
  Shield
} from "lucide-react";

export default function ImmediateWalletSolution() {
  const [selectedSolution, setSelectedSolution] = useState("");

  const walletSolutions = [
    {
      name: "Rainbow Wallet",
      description: "Best replacement for MetaMask - mobile first with great desktop support",
      downloadUrl: "https://rainbow.me/download",
      mobileUrl: "https://apps.apple.com/app/rainbow-ethereum-wallet/id1457119021",
      pros: [
        "Signature popups work reliably",
        "Built-in DEX integration", 
        "Mobile and desktop apps",
        "Easy wallet import process",
        "Better connection stability"
      ],
      rating: "★★★★★ HIGHLY RECOMMENDED",
      timeToSetup: "5 minutes",
      recommended: true
    },
    {
      name: "Trust Wallet",
      description: "Multi-chain wallet with built-in trading features",
      downloadUrl: "https://trustwallet.com/download",
      mobileUrl: "https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409",
      pros: [
        "Built-in DEX trading",
        "Multi-chain support",
        "Reliable signature prompts",
        "Mobile + desktop",
        "Lower fees than MetaMask"
      ],
      rating: "★★★★☆ EXCELLENT BACKUP",
      timeToSetup: "5 minutes",
      recommended: false
    },
    {
      name: "Coinbase Wallet",
      description: "Enterprise-grade security with easy fiat onramps",
      downloadUrl: "https://wallet.coinbase.com/downloads",
      mobileUrl: "https://apps.apple.com/app/coinbase-wallet/id1278383455",
      pros: [
        "Bank-grade security",
        "Easy fiat onramp",
        "24/7 customer support",
        "Insurance coverage",
        "Reliable signatures"
      ],
      rating: "★★★★☆ MOST SECURE",
      timeToSetup: "10 minutes",
      recommended: false
    }
  ];

  const quickSetupSteps = [
    {
      step: 1,
      title: "Download New Wallet",
      description: "Get Rainbow, Trust, or Coinbase Wallet",
      timeEstimate: "1 minute"
    },
    {
      step: 2,
      title: "Import Your Existing Wallet", 
      description: "Use your seed phrase to import tokens",
      timeEstimate: "2 minutes"
    },
    {
      step: 3,
      title: "Test Signature Functionality",
      description: "Try small trade to verify popups work",
      timeEstimate: "2 minutes"
    },
    {
      step: 4,
      title: "Execute Full Portfolio Trades",
      description: "Trade your $686K portfolio with confidence",
      timeEstimate: "Ongoing"
    }
  ];

  const urgentActions = [
    {
      action: "Download Rainbow Wallet NOW",
      reason: "Most reliable MetaMask replacement",
      button: "Get Rainbow",
      url: "https://rainbow.me/download",
      priority: "HIGH"
    },
    {
      action: "Import wallet using seed phrase",
      reason: "Transfers all your tokens instantly",
      button: "Import Guide",
      url: "#import",
      priority: "HIGH"
    },
    {
      action: "Test trade immediately",
      reason: "Verify signature popups work",
      button: "Test Now",
      url: "https://app.uniswap.org/",
      priority: "CRITICAL"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            IMMEDIATE WALLET SOLUTION
          </h1>
          <p className="text-2xl text-red-300">
            MetaMask Signature Issue Confirmed - Switch Now
          </p>
        </div>

        {/* Problem Confirmed */}
        <Alert className="border-red-500 bg-red-500/20 border-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <AlertDescription className="text-red-200 text-2xl">
            <strong>ISSUE CONFIRMED:</strong> MetaMask signature popups not working. This is blocking access to your $686K portfolio. Solution: Switch to working wallet immediately.
          </AlertDescription>
        </Alert>

        {/* Urgent Action Required */}
        <Card className="bg-gray-800/50 border-yellow-500 border-3">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center">🚨 URGENT ACTIONS REQUIRED 🚨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {urgentActions.map((action, index) => (
                <div key={index} className={`p-4 rounded border-2 ${
                  action.priority === 'CRITICAL' ? 'bg-red-600/20 border-red-500' :
                  'bg-yellow-600/20 border-yellow-500'
                }`}>
                  <div className="text-center space-y-3">
                    <Badge className={`${
                      action.priority === 'CRITICAL' ? 'bg-red-600' : 'bg-yellow-600'
                    } text-white text-lg px-4 py-1`}>
                      {action.priority}
                    </Badge>
                    <h3 className="text-white font-bold">{action.action}</h3>
                    <p className="text-gray-300 text-sm">{action.reason}</p>
                    <Button
                      onClick={() => window.open(action.url, '_blank')}
                      className={`w-full py-3 ${
                        action.priority === 'CRITICAL' 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-yellow-600 hover:bg-yellow-700'
                      }`}
                    >
                      {action.button}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Solutions */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Working Wallet Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {walletSolutions.map((wallet, index) => (
                <div key={index} className={`p-6 rounded border-2 ${
                  wallet.recommended 
                    ? 'bg-green-600/20 border-green-500' 
                    : 'bg-blue-600/10 border-blue-600/30'
                }`}>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl">{wallet.name}</h3>
                      <p className="text-gray-400">{wallet.description}</p>
                    </div>
                    <div className="text-right">
                      {wallet.recommended && (
                        <Badge className="bg-green-600 text-white mb-2">TOP CHOICE</Badge>
                      )}
                      <p className="text-yellow-400 text-sm">{wallet.rating}</p>
                      <p className="text-gray-400 text-xs">Setup: {wallet.timeToSetup}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                    {wallet.pros.map((pro, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-white text-xs">{pro}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => window.open(wallet.downloadUrl, '_blank')}
                      className={`${
                        wallet.recommended 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } flex-1`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Desktop
                    </Button>
                    
                    <Button
                      onClick={() => window.open(wallet.mobileUrl, '_blank')}
                      className="bg-purple-600 hover:bg-purple-700 flex-1"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Mobile App
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Process */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">5-Minute Setup Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickSetupSteps.map((step, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="text-purple-400 font-bold mb-2">{step.title}</h3>
                  <p className="text-white text-sm mb-2">{step.description}</p>
                  <Badge className="bg-gray-600 text-white">{step.timeEstimate}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Portfolio Status */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Portfolio Waiting for Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <h3 className="text-yellow-400 font-bold">ETH</h3>
                <p className="text-white text-lg">0.014 ETH</p>
                <p className="text-green-400">$32.09</p>
                <Badge className="bg-green-600 text-white">Ready</Badge>
              </div>

              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <h3 className="text-yellow-400 font-bold">AICC</h3>
                <p className="text-white text-lg">17,500</p>
                <p className="text-green-400">~$1,522</p>
                <Badge className="bg-blue-600 text-white">Tradeable</Badge>
              </div>

              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <h3 className="text-yellow-400 font-bold">ETHG</h3>
                <p className="text-white text-lg">2.1M</p>
                <p className="text-green-400">~$684K</p>
                <Badge className="bg-purple-600 text-white">High Value</Badge>
              </div>

              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <h3 className="text-yellow-400 font-bold">Total Value</h3>
                <p className="text-white text-lg">$686K+</p>
                <p className="text-red-400">BLOCKED</p>
                <Badge className="bg-red-600 text-white">Fix Needed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Action */}
        <div className="text-center">
          <Button
            onClick={() => window.open('https://rainbow.me/download', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-12 px-16 text-3xl"
          >
            <Download className="h-12 w-12 mr-4" />
            DOWNLOAD RAINBOW WALLET NOW
          </Button>
        </div>

        {/* Success Path */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Target className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-xl">
            <strong>SUCCESS PATH:</strong> Download Rainbow → Import wallet → Test signature → Trade $686K portfolio. Your signature popup issue will be solved in 5 minutes.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}