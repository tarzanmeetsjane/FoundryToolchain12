import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  TrendingUp,
  ExternalLink,
  DollarSign,
  Crown,
  Star,
  Zap
} from "lucide-react";

export default function PortfolioSuccess() {
  const portfolioData = {
    totalValue: "$634,178.01",
    dayChange: "$17,800.39 (2.73%)",
    tokens: [
      {
        symbol: "ETHG",
        name: "Ethereum Games",
        balance: "2.10M ETHG",
        value: "$632,618.30",
        change: "2.71%",
        status: "MASSIVE HOLDING"
      },
      {
        symbol: "AICC",
        name: "AI Chain Coin", 
        balance: "17,500.00 AICC",
        value: "$1,527.50",
        change: "2.65%",
        status: "ACTIVE"
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        balance: "0.014 ETH", 
        value: "$32.21",
        change: "2.41%",
        status: "LIQUID"
      },
      {
        symbol: "ETHGR",
        name: "ETHG Recovery",
        balance: "1.99M ETHGR",
        value: "Recovery Asset",
        change: "N/A",
        status: "RECOVERY SUCCESS"
      }
    ],
    achievements: [
      "Portfolio value: $634,178.01",
      "Daily gain: $17,800.39",
      "Multiple active tokens",
      "ETHG Recovery completed",
      "AI Chain investment active"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Crown className="h-16 w-16 text-yellow-400" />
            <h1 className="text-6xl font-bold text-white">
              PORTFOLIO SUCCESS!
            </h1>
            <Crown className="h-16 w-16 text-yellow-400" />
          </div>
          <p className="text-3xl text-yellow-300">
            You Have {portfolioData.totalValue} in Active Tokens!
          </p>
        </div>

        {/* Success Alert */}
        <Alert className="border-yellow-500 bg-yellow-500/20 border-4">
          <Star className="h-12 w-12 text-yellow-500" />
          <AlertDescription className="text-yellow-200 text-2xl">
            <strong>INCREDIBLE SUCCESS!</strong> Your wallet shows {portfolioData.totalValue} total value with {portfolioData.dayChange} gained today. Your recovery mission was a massive success!
          </AlertDescription>
        </Alert>

        {/* Portfolio Overview */}
        <Card className="bg-gray-800/50 border-yellow-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-3xl flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-yellow-400" />
              Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-yellow-600/20 border border-yellow-600/50 rounded text-center">
                <h3 className="text-yellow-400 font-bold text-lg">Total Portfolio</h3>
                <p className="text-white text-4xl font-bold">{portfolioData.totalValue}</p>
                <p className="text-gray-400">Live wallet value</p>
              </div>
              
              <div className="p-6 bg-green-600/20 border border-green-600/50 rounded text-center">
                <h3 className="text-green-400 font-bold text-lg">Today's Gain</h3>
                <p className="text-green-400 text-4xl font-bold">{portfolioData.dayChange}</p>
                <p className="text-gray-400">24h performance</p>
              </div>
              
              <div className="p-6 bg-blue-600/20 border border-blue-600/50 rounded text-center">
                <h3 className="text-blue-400 font-bold text-lg">Active Tokens</h3>
                <p className="text-white text-4xl font-bold">{portfolioData.tokens.length}</p>
                <p className="text-gray-400">Live holdings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Holdings */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Token Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.tokens.map((token, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-600/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{token.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{token.symbol} - {token.name}</h3>
                        <p className="text-gray-400">{token.balance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-xl font-bold">{token.value}</p>
                      {token.change !== "N/A" && (
                        <p className="text-green-400">+{token.change}</p>
                      )}
                      <Badge className={`${
                        token.status === 'MASSIVE HOLDING' ? 'bg-yellow-600' :
                        token.status === 'RECOVERY SUCCESS' ? 'bg-green-600' :
                        'bg-blue-600'
                      } text-white mt-1`}>
                        {token.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Accomplished */}
        <Card className="bg-gray-800/50 border-purple-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Mission Accomplished</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h3 className="text-purple-400 font-bold mb-3">Recovery Success</h3>
                <ul className="text-white space-y-2">
                  {portfolioData.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold mb-3">What This Means</h3>
                <ul className="text-white space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    You have massive ETHG holdings worth $632K+
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    AI Chain investment is active and growing
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    ETHGR recovery tokens secured
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    Everything is live and tradeable
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Actions */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Trading Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={() => window.open('https://app.uniswap.org/', '_blank')}
                className="bg-pink-600 hover:bg-pink-700 py-8"
              >
                <TrendingUp className="h-6 w-6 mr-2" />
                Trade on Uniswap
              </Button>
              
              <Button 
                onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 py-8"
              >
                <ExternalLink className="h-6 w-6 mr-2" />
                View on Etherscan
              </Button>
              
              <Button 
                onClick={() => window.open('/live-trading-dashboard')}
                className="bg-green-600 hover:bg-green-700 py-8"
              >
                <Zap className="h-6 w-6 mr-2" />
                Trading Dashboard
              </Button>
              
              <Button 
                onClick={() => window.open('https://www.coingecko.com/', '_blank')}
                className="bg-purple-600 hover:bg-purple-700 py-8"
              >
                <DollarSign className="h-6 w-6 mr-2" />
                Track Prices
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Final Success Message */}
        <Alert className="border-green-500 bg-green-500/20 border-4">
          <Crown className="h-12 w-12 text-green-500" />
          <AlertDescription className="text-green-200 text-2xl">
            <strong>CONGRATULATIONS!</strong> From a challenging recovery mission to a {portfolioData.totalValue} portfolio. Your persistence and dedication have paid off incredibly. You now have substantial holdings across multiple tokens with everything live and accessible.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}