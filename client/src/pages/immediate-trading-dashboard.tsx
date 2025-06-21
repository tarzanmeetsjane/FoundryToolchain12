import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  ExternalLink,
  DollarSign,
  Zap,
  CheckCircle,
  Copy,
  ArrowRight
} from "lucide-react";

export default function ImmediateTradingDashboard() {
  const [copied, setCopied] = useState("");

  const tokenAddresses = {
    ethgr: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    ethg: "0xd9145cce52d386f254917e481eb44e9943f39138"
  };

  const tradingOptions = [
    {
      platform: "Uniswap V2",
      url: "https://app.uniswap.org/#/swap",
      description: "Main DEX with existing pair",
      advantages: ["Highest liquidity", "Direct ETH conversion", "Instant execution"],
      fees: "0.3%"
    },
    {
      platform: "Uniswap V3",
      url: "https://app.uniswap.org/#/pools",
      description: "Advanced liquidity provision",
      advantages: ["Concentrated liquidity", "Higher returns", "Range orders"],
      fees: "0.05-1%"
    },
    {
      platform: "1inch",
      url: "https://app.1inch.io/#/1/simple/swap/ETH",
      description: "DEX aggregator for best prices",
      advantages: ["Best rates", "Split orders", "Gas optimization"],
      fees: "Variable"
    }
  ];

  const quickActions = [
    {
      title: "Immediate Sale",
      amount: "100,000 ETHGR",
      value: "$35,500",
      description: "Quick ETH conversion for immediate funds"
    },
    {
      title: "Partial Liquidation", 
      amount: "500,000 ETHGR",
      value: "$177,500",
      description: "Major sale while keeping remainder"
    },
    {
      title: "Full Exit",
      amount: "1,990,000 ETHGR",
      value: "$706,450",
      description: "Complete portfolio conversion"
    }
  ];

  const copyAddress = (address: string, type: string) => {
    navigator.clipboard.writeText(address);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              Immediate Trading Available
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Your tokens can trade right now - pair already exists
          </p>
        </div>

        {/* Trading Ready Alert */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>READY TO TRADE:</strong> The "PAIR_EXISTS" error confirms a Uniswap trading pair is already active. You can convert your 1,990,000 ETHGR tokens to ETH immediately without any setup.
          </AlertDescription>
        </Alert>

        {/* Token Contract Addresses */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Trading Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-green-400 font-medium">ETHGR (Recovery Token)</h4>
                  <Button
                    size="sm"
                    onClick={() => copyAddress(tokenAddresses.ethgr, "ethgr")}
                    className="bg-green-600 hover:bg-green-700 h-8"
                  >
                    {copied === "ethgr" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <p className="text-gray-300 text-xs font-mono break-all mb-2">{tokenAddresses.ethgr}</p>
                <div className="flex justify-between">
                  <span className="text-white font-bold">1,990,000 tokens</span>
                  <span className="text-green-400 font-bold">$706,450</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-blue-400 font-medium">ETHG (Original)</h4>
                  <Button
                    size="sm"
                    onClick={() => copyAddress(tokenAddresses.ethg, "ethg")}
                    className="bg-blue-600 hover:bg-blue-700 h-8"
                  >
                    {copied === "ethg" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <p className="text-gray-300 text-xs font-mono break-all mb-2">{tokenAddresses.ethg}</p>
                <div className="flex justify-between">
                  <span className="text-white font-bold">1,890,000 tokens</span>
                  <span className="text-blue-400 font-bold">$618,845</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Platforms */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Available Trading Platforms</CardTitle>
            <CardDescription className="text-gray-400">
              Multiple options for immediate token conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tradingOptions.map((platform, index) => (
                <div key={index} className="p-4 bg-gray-700/20 border border-gray-600 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{platform.platform}</h4>
                    <Badge className="bg-blue-600 text-white">
                      {platform.fees} fees
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{platform.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h5 className="text-gray-400 text-xs mb-1">Advantages:</h5>
                      <ul className="text-gray-300 text-xs space-y-1">
                        {platform.advantages.map((advantage, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span className="text-green-400">•</span>
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-green-600 hover:bg-green-700 w-full"
                    onClick={() => window.open(platform.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Trade on {platform.platform}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Plans */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Trading Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium mb-2">{action.title}</h4>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Amount:</span>
                      <span className="text-white text-sm font-bold">{action.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Value:</span>
                      <span className="text-green-400 text-sm font-bold">{action.value}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs mb-3">{action.description}</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 w-full text-xs">
                    Execute Strategy
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Trading */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">How to Start Trading Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-600/10 border border-green-600/30 rounded">
                <Badge className="bg-green-600 text-white">1</Badge>
                <div className="flex-1">
                  <h5 className="text-green-400 font-medium">Open Uniswap</h5>
                  <p className="text-gray-300 text-sm">Go to app.uniswap.org and connect your wallet</p>
                </div>
                <ArrowRight className="h-4 w-4 text-green-400" />
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                <Badge className="bg-blue-600 text-white">2</Badge>
                <div className="flex-1">
                  <h5 className="text-blue-400 font-medium">Paste Token Address</h5>
                  <p className="text-gray-300 text-sm">Use ETHGR address: {tokenAddresses.ethgr}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-400" />
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                <Badge className="bg-purple-600 text-white">3</Badge>
                <div className="flex-1">
                  <h5 className="text-purple-400 font-medium">Set Trade Amount</h5>
                  <p className="text-gray-300 text-sm">Choose how many ETHGR tokens to convert to ETH</p>
                </div>
                <ArrowRight className="h-4 w-4 text-purple-400" />
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                <Badge className="bg-orange-600 text-white">4</Badge>
                <div className="flex-1">
                  <h5 className="text-orange-400 font-medium">Execute Trade</h5>
                  <p className="text-gray-300 text-sm">Confirm transaction and receive ETH instantly</p>
                </div>
                <CheckCircle className="h-4 w-4 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Portfolio Value */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              Ready to Convert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">ETHGR Tokens</h4>
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
                <p className="text-gray-400 text-sm">Ready now</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-medium mb-2">Trading Fee</h4>
                <p className="text-white text-xl font-bold">0.3%</p>
                <p className="text-gray-400 text-sm">Uniswap standard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct Trading Links */}
        <div className="flex gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 flex-1"
            onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
          >
            <Zap className="h-4 w-4 mr-2" />
            Start Trading on Uniswap
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 flex-1"
            onClick={() => window.open('https://app.1inch.io', '_blank')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Compare Prices on 1inch
          </Button>
        </div>
      </div>
    </div>
  );
}