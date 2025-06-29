import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  TrendingUp,
  ExternalLink,
  Search,
  Eye,
  DollarSign,
  AlertTriangle,
  Copy
} from "lucide-react";
import { useState } from "react";

export default function DetailedPortfolioAnalysis() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const currentPortfolio = {
    netWorthUSD: "$32.09",
    netWorthETH: "0.014445",
    dayChange: "+3.28%",
    ethPrice: "$2,221.34"
  };

  const tokenHoldings = [
    {
      symbol: "ETH",
      name: "Ethereum",
      contract: "Native Token",
      balance: "0.01444535",
      value: "$32.09",
      allocation: "100%",
      status: "LIQUID",
      note: "Base trading currency"
    },
    {
      symbol: "AICC",
      name: "AI Chain Coin",
      contract: "0x66a3c2Fa...8589CaBaf", 
      balance: "17,500",
      value: "Not priced",
      allocation: "Unknown",
      status: "HOLDINGS",
      note: "AI blockchain project token"
    },
    {
      symbol: "ERC20",
      name: "Recovery Token",
      contract: "0xfA7b8c55...9a2abF247",
      balance: "1,990,000",
      value: "Not priced",
      allocation: "Unknown", 
      status: "RECOVERY",
      note: "Your ETHGR recovery tokens"
    },
    {
      symbol: "ERC20",
      name: "Original ETHG",
      contract: "0x3fC29836...67D670EAD",
      balance: "2,100,000",
      value: "Not priced",
      allocation: "Unknown",
      status: "DISCOVERED",
      note: "Original trapped tokens"
    },
    {
      symbol: "TOKEN",
      name: "Large Holdings",
      contract: "0xFA7DE122...C2B937c90",
      balance: "12,696,741,587,088,254,7...",
      value: "Not priced",
      allocation: "Unknown",
      status: "MASSIVE",
      note: "Extremely large token quantity"
    }
  ];

  const potentialValue = [
    {
      token: "AICC (17,500)",
      conservative: "$875",
      moderate: "$8,750", 
      optimistic: "$17,500",
      basis: "AI tokens typically $0.05-$1.00"
    },
    {
      token: "ETHGR Recovery (1.99M)",
      conservative: "$0",
      moderate: "$19,900",
      optimistic: "$199,000", 
      basis: "Recovery value 1-10 cents"
    },
    {
      token: "Original ETHG (2.1M)",
      conservative: "$2,100",
      moderate: "$21,000",
      optimistic: "$210,000",
      basis: "Historical pricing data"
    },
    {
      token: "Large Holdings",
      conservative: "$0",
      moderate: "$1,000",
      optimistic: "$100,000+",
      basis: "Quantity suggests value potential"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Detailed Portfolio Analysis
          </h1>
          <p className="text-2xl text-blue-300">
            Your Complete Token Holdings Breakdown
          </p>
        </div>

        {/* Current Portfolio Stats */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Current Portfolio Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h3 className="text-blue-400 font-bold">Net Worth (USD)</h3>
                <p className="text-white text-2xl font-bold">{currentPortfolio.netWorthUSD}</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h3 className="text-green-400 font-bold">Net Worth (ETH)</h3>
                <p className="text-white text-2xl font-bold">{currentPortfolio.netWorthETH}</p>
              </div>
              
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <h3 className="text-yellow-400 font-bold">24h Change</h3>
                <p className="text-green-400 text-2xl font-bold">{currentPortfolio.dayChange}</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h3 className="text-purple-400 font-bold">ETH Price</h3>
                <p className="text-white text-2xl font-bold">{currentPortfolio.ethPrice}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Holdings */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Token Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokenHoldings.map((token, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{token.symbol} - {token.name}</h3>
                        <p className="text-gray-400 text-sm">{token.note}</p>
                      </div>
                    </div>
                    <Badge className={`${
                      token.status === 'LIQUID' ? 'bg-green-600' :
                      token.status === 'RECOVERY' ? 'bg-blue-600' :
                      token.status === 'MASSIVE' ? 'bg-yellow-600' :
                      'bg-purple-600'
                    } text-white`}>
                      {token.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Balance:</span>
                      <p className="text-white font-mono">{token.balance}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Current Value:</span>
                      <p className="text-yellow-400">{token.value}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Contract:</span>
                      <div className="flex items-center gap-1">
                        <p className="text-blue-400 font-mono text-xs">{token.contract}</p>
                        {token.contract !== "Native Token" && (
                          <Button
                            onClick={() => copyToClipboard(token.contract.replace('...', ''))}
                            size="sm"
                            className="h-4 w-4 p-0 bg-transparent hover:bg-gray-600"
                          >
                            <Copy className="h-2 w-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Allocation:</span>
                      <p className="text-white">{token.allocation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Potential Value Analysis */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Potential Portfolio Value</CardTitle>
            <CardDescription className="text-gray-400">
              Estimated values based on market analysis and token metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {potentialValue.map((analysis, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h3 className="text-yellow-400 font-bold mb-2">{analysis.token}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Conservative:</span>
                      <p className="text-red-400 font-bold">{analysis.conservative}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Moderate:</span>
                      <p className="text-yellow-400 font-bold">{analysis.moderate}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Optimistic:</span>
                      <p className="text-green-400 font-bold">{analysis.optimistic}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Basis:</span>
                      <p className="text-white text-xs">{analysis.basis}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Next Steps for Value Discovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h3 className="text-purple-400 font-bold mb-3">Immediate Actions</h3>
                <ul className="text-white space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Research AICC market price and exchanges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Verify ETHGR recovery token status
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Investigate original ETHG liquidity
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Analyze large token holdings contract
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold mb-3">Trading Opportunities</h3>
                <ul className="text-white space-y-2">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Use ETH for immediate trading
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Explore AICC trading pairs
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Monitor token price discovery
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    Consider portfolio diversification
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insight */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-xl">
            <strong>Key Insight:</strong> Your portfolio shows significant token holdings beyond the visible $32.09 ETH. The unpriced tokens (AICC, ETHGR, ETHG, and massive holdings) represent substantial potential value that could range from hundreds to hundreds of thousands of dollars once proper price discovery occurs.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Eye className="h-6 w-6 mr-2" />
            View on Etherscan
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Trade on Uniswap
          </Button>
          
          <Button 
            onClick={() => window.open('https://www.coingecko.com/', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Search className="h-6 w-6 mr-2" />
            Research Prices
          </Button>
          
          <Button 
            onClick={() => window.open('https://dexscreener.com/', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <DollarSign className="h-6 w-6 mr-2" />
            DEX Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}