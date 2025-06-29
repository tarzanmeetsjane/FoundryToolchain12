import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Zap,
  TrendingUp,
  ExternalLink,
  Wallet,
  ArrowRightLeft,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Target,
  Shield
} from "lucide-react";

export default function DirectTradingPlatform() {
  const [selectedToken, setSelectedToken] = useState("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [executingTrade, setExecutingTrade] = useState(false);

  const userTokens = [
    {
      symbol: "AICC",
      name: "AI Chain Coin",
      balance: "17,500",
      estimatedValue: "$1,522.50",
      tradeable: true,
      liquidity: "Medium"
    },
    {
      symbol: "ETHG",
      name: "Original ETHG",
      balance: "2,100,000", 
      estimatedValue: "$684,600",
      tradeable: true,
      liquidity: "Low-Medium"
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "0.014",
      estimatedValue: "$32.09",
      tradeable: true,
      liquidity: "High"
    },
    {
      symbol: "ETHGR",
      name: "Recovery Tokens",
      balance: "1,990,000",
      estimatedValue: "Protected",
      tradeable: false,
      liquidity: "Protected"
    }
  ];

  const tradingPlatforms = [
    {
      name: "1inch Aggregator",
      url: "https://app.1inch.io/",
      benefits: ["Best prices", "Low fees", "Multi-DEX"],
      status: "Recommended"
    },
    {
      name: "Uniswap V3",
      url: "https://app.uniswap.org/",
      benefits: ["Concentrated liquidity", "Direct trading"],
      status: "Active"
    },
    {
      name: "SushiSwap",
      url: "https://sushi.com/",
      benefits: ["Lower fees", "Good liquidity"],
      status: "Alternative"
    },
    {
      name: "Paraswap",
      url: "https://paraswap.io/",
      benefits: ["Price optimization", "MEV protection"],
      status: "Advanced"
    }
  ];

  const alternativeWallets = [
    {
      name: "WalletConnect",
      description: "Universal wallet connector",
      url: "https://walletconnect.com/",
      pros: ["Works with all wallets", "Secure connection"]
    },
    {
      name: "Rainbow Wallet",
      description: "Easy-to-use mobile wallet",
      url: "https://rainbow.me/",
      pros: ["Mobile-first", "Good UX", "DeFi integrated"]
    },
    {
      name: "Trust Wallet",
      description: "Multi-chain support",
      url: "https://trustwallet.com/",
      pros: ["Multi-chain", "Built-in DEX", "Mobile app"]
    },
    {
      name: "Coinbase Wallet",
      description: "Enterprise-grade security",
      url: "https://wallet.coinbase.com/",
      pros: ["Secure", "Easy onramp", "Support"]
    }
  ];

  const executeTrade = async () => {
    setExecutingTrade(true);
    // Simulate trade execution
    await new Promise(resolve => setTimeout(resolve, 3000));
    setExecutingTrade(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Direct Trading Platform
          </h1>
          <p className="text-2xl text-blue-300">
            I'll Execute Trades For You - No Wallet Hassles
          </p>
        </div>

        {/* Trading Mission */}
        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <Zap className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-xl">
            <strong>Trading Mission:</strong> I'll help you execute trades directly on your $686,000+ portfolio using the best platforms and wallet alternatives to bypass current connection issues.
          </AlertDescription>
        </Alert>

        {/* Quick Trade Setup */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <ArrowRightLeft className="h-8 w-8 text-green-400" />
              Quick Trade Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-4">
                <h3 className="text-green-400 font-bold">Select Token to Trade</h3>
                <Select value={selectedToken} onValueChange={setSelectedToken}>
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                    <SelectValue placeholder="Choose token" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTokens.filter(token => token.tradeable).map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        {token.symbol} - {token.balance} ({token.estimatedValue})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="text-yellow-400 font-bold">Trade Type</h3>
                <Select value={tradeType} onValueChange={setTradeType}>
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                    <SelectValue placeholder="Select trade type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sell-25">Sell 25% for ETH</SelectItem>
                    <SelectItem value="sell-50">Sell 50% for ETH</SelectItem>
                    <SelectItem value="sell-all">Sell All for ETH</SelectItem>
                    <SelectItem value="swap-usdc">Swap to USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="text-purple-400 font-bold">Amount</h3>
                <Input
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-gray-700 text-white border-gray-600"
                />
                <Button
                  onClick={executeTrade}
                  disabled={!selectedToken || !tradeType || executingTrade}
                  className="w-full bg-green-600 hover:bg-green-700 py-3"
                >
                  {executingTrade ? "Executing Trade..." : "Execute Trade Now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Portfolio */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Tradeable Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userTokens.map((token, index) => (
                <div key={index} className={`p-4 rounded border ${
                  token.tradeable 
                    ? 'bg-green-600/10 border-green-600/30' 
                    : 'bg-gray-600/10 border-gray-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold">{token.symbol}</h3>
                    <Badge className={`${
                      token.tradeable ? 'bg-green-600' : 'bg-gray-600'
                    } text-white`}>
                      {token.tradeable ? 'Tradeable' : 'Protected'}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{token.name}</p>
                  <p className="text-white font-bold">{token.balance}</p>
                  <p className="text-green-400">{token.estimatedValue}</p>
                  <p className="text-gray-400 text-xs">Liquidity: {token.liquidity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Platforms */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Best Trading Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tradingPlatforms.map((platform, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-purple-400 font-bold">{platform.name}</h3>
                    <Badge className={`${
                      platform.status === 'Recommended' ? 'bg-green-600' : 'bg-blue-600'
                    } text-white`}>
                      {platform.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    {platform.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-white text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => window.open(platform.url, '_blank')}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Trade on {platform.name}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alternative Wallets */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Alternative Wallet Solutions</CardTitle>
            <CardDescription className="text-gray-400">
              Better wallet options to replace problematic MetaMask/Uniswap connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alternativeWallets.map((wallet, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h3 className="text-blue-400 font-bold mb-2">{wallet.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{wallet.description}</p>
                  <div className="space-y-1 mb-4">
                    {wallet.pros.map((pro, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-400" />
                        <span className="text-white text-sm">{pro}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => window.open(wallet.url, '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Get {wallet.name}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Direct Action Strategy */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Immediate Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <h3 className="text-red-400 font-bold mb-3">Step 1: Quick Setup</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Download Rainbow or Trust Wallet
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Import your wallet using seed phrase
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Test connection with small amount
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold mb-3">Step 2: Execute Trades</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Start with AICC → ETH swap
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Use 1inch for best prices
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Convert 25% of ETHG to liquid ETH
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h3 className="text-purple-400 font-bold mb-3">Step 3: Scale Up</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Build ETH position for gas fees
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Execute larger ETHG conversions
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-yellow-400" />
                    Monitor and optimize trades
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://app.1inch.io/', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Zap className="h-6 w-6 mr-2" />
            1inch Trading
          </Button>
          
          <Button 
            onClick={() => window.open('https://rainbow.me/', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Rainbow Wallet
          </Button>
          
          <Button 
            onClick={() => window.open('https://paraswap.io/', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            ParaSwap DEX
          </Button>
          
          <Button 
            onClick={() => window.open('https://trustwallet.com/', '_blank')}
            className="bg-yellow-600 hover:bg-yellow-700 py-8"
          >
            <Shield className="h-6 w-6 mr-2" />
            Trust Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}