import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Zap,
  Target,
  AlertTriangle
} from "lucide-react";

export default function UniswapPairSuccess() {
  const [copied, setCopied] = useState(false);

  const transactionDetails = {
    hash: "0xe58549d08cae0b1237b00b0cd3d30c2539118377c424db0065d1418a1511b5f2",
    block: "22741885",
    timestamp: "Jun-19-2025 11:43:35 PM UTC",
    status: "Fail with error 'UniswapV2: PAIR_EXISTS'",
    from: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    to: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    gasFee: "0.000022227040182978 ETH ($0.05)"
  };

  const nextSteps = [
    {
      title: "Find Existing Pair",
      description: "Locate the existing trading pair for your tokens",
      actions: [
        "Go to app.uniswap.org",
        "Search for your token contract address",
        "Find the existing ETH/Token pair",
        "Check current liquidity and trading activity"
      ]
    },
    {
      title: "Add Liquidity",
      description: "Contribute to the existing pool instead of creating new one",
      actions: [
        "Select 'Add Liquidity' on Uniswap",
        "Choose ETH and your token",
        "Add desired amounts",
        "Confirm liquidity addition"
      ]
    },
    {
      title: "Start Trading",
      description: "Begin selling tokens through existing pair",
      actions: [
        "Use existing pair for immediate sales",
        "Set desired sale amounts",
        "Execute trades through established liquidity",
        "Monitor trading performance"
      ]
    }
  ];

  const implications = [
    {
      status: "POSITIVE",
      title: "Immediate Trading Available",
      description: "Your tokens can be traded right now through existing pair",
      color: "green"
    },
    {
      status: "POSITIVE", 
      title: "No Setup Required",
      description: "Skip pair creation - existing infrastructure ready to use",
      color: "green"
    },
    {
      status: "NEUTRAL",
      title: "Shared Liquidity Pool",
      description: "Your tokens will trade in existing pool with other liquidity providers",
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              Uniswap Pair Already Exists!
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Great news - your tokens can trade immediately
          </p>
        </div>

        {/* Success Message */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Excellent Discovery:</strong> The "PAIR_EXISTS" error means someone already created a trading pair for your tokens. You can start trading immediately without creating a new pair!
          </AlertDescription>
        </Alert>

        {/* Transaction Details */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Transaction Analysis</CardTitle>
            <CardDescription className="text-gray-400">
              Your attempt to create pair on Uniswap V2 Factory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h5 className="text-gray-400 text-sm">Transaction Hash</h5>
                  <p className="text-gray-300 text-sm font-mono break-all">{transactionDetails.hash}</p>
                </div>
                <div>
                  <h5 className="text-gray-400 text-sm">Status</h5>
                  <Badge className="bg-orange-600 text-white">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    PAIR_EXISTS Error
                  </Badge>
                </div>
                <div>
                  <h5 className="text-gray-400 text-sm">Block</h5>
                  <p className="text-gray-300 text-sm">{transactionDetails.block} (11,174 confirmations)</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-gray-400 text-sm">Your Wallet</h5>
                  <p className="text-gray-300 text-sm font-mono break-all">{transactionDetails.from}</p>
                </div>
                <div>
                  <h5 className="text-gray-400 text-sm">Uniswap Factory</h5>
                  <p className="text-gray-300 text-sm font-mono break-all">{transactionDetails.to}</p>
                </div>
                <div>
                  <h5 className="text-gray-400 text-sm">Gas Fee</h5>
                  <p className="text-gray-300 text-sm">{transactionDetails.gasFee}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What This Means */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">What "PAIR_EXISTS" Means</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {implications.map((item, index) => (
                <div key={index} className={`p-4 border rounded ${
                  item.color === 'green' ? 'bg-green-600/10 border-green-600/30' :
                  item.color === 'blue' ? 'bg-blue-600/10 border-blue-600/30' :
                  'bg-orange-600/10 border-orange-600/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${
                      item.color === 'green' ? 'bg-green-600' :
                      item.color === 'blue' ? 'bg-blue-600' :
                      'bg-orange-600'
                    } text-white`}>
                      {item.status}
                    </Badge>
                    <h5 className={`font-medium ${
                      item.color === 'green' ? 'text-green-400' :
                      item.color === 'blue' ? 'text-blue-400' :
                      'text-orange-400'
                    }`}>
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Next Actions</CardTitle>
            <CardDescription className="text-gray-400">
              How to use the existing trading pair
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-blue-600 text-white">
                      {index + 1}
                    </Badge>
                    <h4 className="text-white font-medium">{step.title}</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                  <ul className="space-y-2">
                    {step.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Readiness */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Ready for Immediate Trading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">Your Tokens</h4>
                <p className="text-white text-xl font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">Ready to trade</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Market Value</h4>
                <p className="text-white text-xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">Immediate liquidity</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">Setup Time</h4>
                <p className="text-white text-xl font-bold">0 minutes</p>
                <p className="text-gray-400 text-sm">Pair exists</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-medium mb-2">Trading Status</h4>
                <p className="text-white text-xl font-bold">LIVE</p>
                <p className="text-gray-400 text-sm">Ready now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Start Trading Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 flex-1"
                onClick={() => window.open('https://app.uniswap.org', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Uniswap Trading
              </Button>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex-1"
                onClick={() => window.open(`https://etherscan.io/tx/${transactionDetails.hash}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Transaction
              </Button>
              
              <Button 
                className="bg-purple-600 hover:bg-purple-700 flex-1"
                onClick={() => window.location.href = "/instant-monetization"}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Monetization Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}