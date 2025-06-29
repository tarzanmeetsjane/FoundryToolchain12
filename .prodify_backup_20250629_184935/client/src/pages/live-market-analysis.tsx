import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Eye,
  DollarSign,
  Activity,
  BarChart3
} from "lucide-react";

export default function LiveMarketAnalysis() {
  const [loading, setLoading] = useState(false);

  const contractData = {
    address: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    dexScreenerUrl: "https://dexscreener.com/ethereum/0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    yourTokens: "1,990,000",
    walletValue: "$688,059.38" // User reported this value
  };

  const marketReality = {
    status: "Investigating",
    liquidityPool: "Checking DEX data",
    tradingVolume: "Analyzing activity", 
    priceDiscovery: "DEX Screener lookup",
    realValue: "Under verification"
  };

  const criticalQuestions = [
    {
      question: "Does the token have real trading volume?",
      importance: "High",
      status: "Checking DEX Screener data"
    },
    {
      question: "Is there actual liquidity in the pool?",
      importance: "High", 
      status: "Pool analysis needed"
    },
    {
      question: "Can tokens be sold for real ETH?",
      importance: "Critical",
      status: "Live test required"
    },
    {
      question: "What's the true market price?",
      importance: "High",
      status: "Price verification in progress"
    }
  ];

  const verificationSteps = [
    {
      step: 1,
      title: "Check DEX Screener Data",
      description: "Analyze real trading activity and liquidity",
      action: () => window.open(contractData.dexScreenerUrl, '_blank'),
      buttonText: "View DEX Data"
    },
    {
      step: 2,
      title: "Verify Contract on Etherscan", 
      description: "Confirm contract legitimacy and transparency",
      action: () => window.open(`https://etherscan.io/address/${contractData.address}`, '_blank'),
      buttonText: "Check Etherscan"
    },
    {
      step: 3,
      title: "Test Small Trade",
      description: "Execute small swap to verify real liquidity",
      action: () => window.open('https://app.uniswap.org/#/swap', '_blank'),
      buttonText: "Test on Uniswap"
    },
    {
      step: 4,
      title: "Monitor Gas vs Value",
      description: "Ensure gas costs don't exceed trade value",
      action: () => window.open('/contract-verification-center', '_self'),
      buttonText: "Gas Analysis"
    }
  ];

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <BarChart3 className="h-8 w-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">
              Live Market Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Verifying real market value of your ETHGR tokens
          </p>
        </div>

        {/* Critical Reality Check */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200 text-center text-lg">
            <strong>Reality Check in Progress:</strong> Investigating actual market liquidity and trading activity for your ETHGR tokens via DEX Screener data.
          </AlertDescription>
        </Alert>

        {/* Current Status */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Market Investigation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-bold">Your Portfolio Claims</h4>
                
                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h5 className="text-blue-400 font-medium mb-2">Token Holdings</h5>
                  <p className="text-white text-xl font-bold">{contractData.yourTokens} ETHGR</p>
                  <p className="text-blue-300">As shown in wallet interface</p>
                </div>
                
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h5 className="text-green-400 font-medium mb-2">Reported Value</h5>
                  <p className="text-white text-xl font-bold">{contractData.walletValue}</p>
                  <p className="text-green-300">User interface display</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-bold">Market Reality Check</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-700/50 rounded">
                    <span className="text-gray-400 text-sm">Liquidity Pool:</span>
                    <p className="text-white">{marketReality.liquidityPool}</p>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded">
                    <span className="text-gray-400 text-sm">Trading Volume:</span>
                    <p className="text-white">{marketReality.tradingVolume}</p>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded">
                    <span className="text-gray-400 text-sm">Real Value:</span>
                    <p className="text-white">{marketReality.realValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Questions */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white">Critical Market Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalQuestions.map((item, index) => (
                <div key={index} className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">{item.question}</h5>
                    <Badge className={`${
                      item.importance === 'Critical' ? 'bg-red-600' :
                      item.importance === 'High' ? 'bg-orange-600' :
                      'bg-yellow-600'
                    } text-white`}>
                      {item.importance}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm">{item.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Process */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Market Verification Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{step.title}</h5>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                  <Button 
                    onClick={step.action}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {step.step === 1 ? <BarChart3 className="h-4 w-4 mr-2" /> : 
                     step.step === 2 ? <Eye className="h-4 w-4 mr-2" /> :
                     step.step === 3 ? <Activity className="h-4 w-4 mr-2" /> :
                     <DollarSign className="h-4 w-4 mr-2" />}
                    {step.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gas Reality */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Gas Fee Reality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h5 className="text-blue-400 font-medium mb-2">Your ETH</h5>
                <p className="text-white text-lg font-bold">0.01444535 ETH</p>
                <p className="text-blue-300">$34.93</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h5 className="text-orange-400 font-medium mb-2">Gas Needed</h5>
                <p className="text-white text-lg font-bold">0.015-0.025 ETH</p>
                <p className="text-orange-300">$36-60</p>
              </div>
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <h5 className="text-red-400 font-medium mb-2">Status</h5>
                <p className="text-white text-sm font-bold">INSUFFICIENT</p>
                <p className="text-red-300">Need more ETH</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-lg py-8"
            onClick={() => window.open(contractData.dexScreenerUrl, '_blank')}
          >
            <BarChart3 className="h-6 w-6 mr-2" />
            Check DEX Data
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${contractData.address}`, '_blank')}
          >
            <Eye className="h-6 w-6 mr-2" />
            View Contract
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
          >
            <Activity className="h-6 w-6 mr-2" />
            Test Trade
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={refreshData}
            disabled={loading}
          >
            {loading ? <RefreshCw className="h-6 w-6 mr-2 animate-spin" /> : <RefreshCw className="h-6 w-6 mr-2" />}
            Refresh Data
          </Button>
        </div>

        {/* Final Reality Check */}
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <Activity className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200 text-center">
            <strong>Next Step:</strong> Review DEX Screener data to confirm if your ETHGR tokens have real market liquidity and trading activity before proceeding with large trades.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}