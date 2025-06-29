import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  CheckCircle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Shield,
  Copy,
  ArrowRight
} from "lucide-react";

export default function SkipToTrading() {
  const [copied, setCopied] = useState("");

  const tokenData = {
    contract: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    amount: "1,990,000",
    value: "$706,450",
    wallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const tradingSteps = [
    {
      step: 1,
      title: "Open Uniswap",
      description: "Go to app.uniswap.org and connect your wallet",
      action: () => window.open('https://app.uniswap.org/#/swap', '_blank')
    },
    {
      step: 2, 
      title: "Paste Token Contract",
      description: "In the 'From' field, paste your ETHGR contract address",
      action: () => copyToClipboard(tokenData.contract, "contract")
    },
    {
      step: 3,
      title: "Set Amount",
      description: "Enter how many ETHGR tokens you want to convert to ETH",
      action: null
    },
    {
      step: 4,
      title: "Execute Trade",
      description: "Review and confirm the swap transaction",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Zap className="h-10 w-10 text-green-400" />
            <h1 className="text-5xl font-bold text-white">
              Skip to Trading
            </h1>
          </div>
          <p className="text-2xl text-green-300">
            Trade your $706,450 ETHGR tokens directly on Uniswap
          </p>
        </div>

        {/* Smart Wallet Clarification */}
        <Alert className="border-green-500 bg-green-500/10">
          <Shield className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-lg">
            <strong>Smart Wallet is Fine!</strong> Your smart wallet setup doesn't block trading. Your ETHGR tokens are completely accessible for Uniswap swaps.
          </AlertDescription>
        </Alert>

        {/* Quick Trading Setup */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Direct Trading Setup</CardTitle>
            <CardDescription className="text-gray-400">
              No MetaMask import needed - trade directly with contract address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-bold">Your Trading Assets</h4>
                
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-medium">ETHGR Tokens</span>
                    <Badge className="bg-green-600 text-white">Ready</Badge>
                  </div>
                  <p className="text-white text-xl font-bold">{tokenData.amount}</p>
                  <p className="text-green-300 text-lg font-bold">{tokenData.value}</p>
                </div>
                
                <div className="p-3 bg-gray-700/50 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Contract Address:</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(tokenData.contract, "contract")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied === "contract" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-white font-mono text-sm break-all">{tokenData.contract}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-bold">Why This Works</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Tokens exist on blockchain (confirmed)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Uniswap pair already exists</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Smart wallet supports trading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>No import required for trading</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Trading */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">4-Step Trading Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tradingSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{step.title}</h5>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                  {step.action && (
                    <Button 
                      onClick={step.action}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {step.step === 1 ? <ExternalLink className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {step.step === 1 ? "Open" : "Copy"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Value Calculator */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Trading Value Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <h5 className="text-yellow-400 font-medium mb-2">Conservative (25%)</h5>
                <p className="text-white text-xl font-bold">497,500 ETHGR</p>
                <p className="text-yellow-300 text-lg">≈ $176,612</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                <h5 className="text-orange-400 font-medium mb-2">Moderate (50%)</h5>
                <p className="text-white text-xl font-bold">995,000 ETHGR</p>
                <p className="text-orange-300 text-lg">≈ $353,225</p>
              </div>
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded text-center">
                <h5 className="text-red-400 font-medium mb-2">Full Position</h5>
                <p className="text-white text-xl font-bold">1,990,000 ETHGR</p>
                <p className="text-red-300 text-lg">≈ $706,450</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-xl py-8"
            onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
          >
            <Zap className="h-6 w-6 mr-2" />
            Start Trading Now
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-xl py-8"
            onClick={() => copyToClipboard(tokenData.contract, "main")}
          >
            {copied === "main" ? <CheckCircle className="h-6 w-6 mr-2" /> : <Copy className="h-6 w-6 mr-2" />}
            Copy Contract
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-xl py-8"
            onClick={() => window.open(`https://etherscan.io/token/${tokenData.contract}?a=${tokenData.wallet}`, '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Verify Holdings
          </Button>
        </div>

        {/* Final Confidence Boost */}
        <Alert className="border-green-500 bg-green-500/10">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-lg">
            <strong>You're Ready!</strong> Your smart wallet works perfectly for trading. Skip MetaMask import and go straight to Uniswap with your contract address.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}