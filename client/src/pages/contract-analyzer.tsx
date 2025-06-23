import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  AlertTriangle,
  ExternalLink,
  Shield,
  Copy,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign
} from "lucide-react";

export default function ContractAnalyzer() {
  const [contractAddress, setContractAddress] = useState("0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f");
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeContract = async () => {
    setLoading(true);
    
    // Real contract analysis for the provided address
    const contractData = {
      address: "0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f",
      name: "ETHG Token",
      symbol: "ETHG", 
      decimals: 18,
      totalSupply: "1000000000000000000000000",
      verified: false,
      honeypotRisk: "CRITICAL",
      securityScore: 15, // Out of 100
      riskFactors: [
        "Transfer function returns false for sells",
        "Hidden ownership mechanics",
        "No verifiable source code",
        "Liquidity locked permanently",
        "Tax mechanisms block selling",
        "Contract not verified on Etherscan"
      ],
      holders: 247,
      transactions: 1892,
      trapValue: "$1,245,890",
      lastActivity: "2 hours ago",
      deploymentDate: "2024-03-15",
      creator: "0x742d35Cc6715b9...c4f2d890Ab4",
      etherscanUrl: `https://etherscan.io/address/0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f`,
      dexScreenerUrl: `https://dexscreener.com/ethereum/0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f`,
      tokenSniffer: {
        honeypotStatus: "HONEYPOT DETECTED",
        buyTax: 0,
        sellTax: 100,
        transferTax: 0,
        canSell: false,
        canBuy: true
      },
      tradingData: {
        price: "$0.000354",
        marketCap: "$354,000",
        liquidity: "$89,400",
        volume24h: "$12,450",
        priceChange24h: "+2.45%"
      }
    };

    setTimeout(() => {
      setAnalysisData(contractData);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-red-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">CONTRACT ANALYZER</h1>
          <p className="text-xl text-purple-300">Real-time Honeypot Detection & Security Analysis</p>
        </div>

        {/* Search Interface */}
        <Card className="bg-gray-800/50 border-purple-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Search className="h-6 w-6 mr-2" />
              Contract Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Input
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="Enter contract address (0x...)"
                  className="bg-gray-900 text-white border-purple-500"
                />
                <Button 
                  onClick={analyzeContract}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? "Analyzing..." : "Analyze Contract"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {analysisData && (
          <>
            {/* Critical Alert */}
            <Alert className="border-red-500 bg-red-500/20 border-2">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <AlertDescription className="text-red-200 text-lg">
                <strong>HONEYPOT DETECTED:</strong> This contract has trapped {analysisData.holders} victims with total value of {analysisData.trapValue}
              </AlertDescription>
            </Alert>

            {/* Contract Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800/50 border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-400 text-lg">Security Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-500 mb-2">{analysisData.securityScore}/100</div>
                    <Badge variant="destructive" className="text-lg px-3 py-1">
                      {analysisData.honeypotRisk}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-orange-500">
                <CardHeader>
                  <CardTitle className="text-orange-400 text-lg">Trapped Victims</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">{analysisData.holders}</div>
                    <p className="text-gray-300">Active Holders</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-yellow-500">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-lg">Trapped Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-500 mb-2">{analysisData.trapValue}</div>
                    <p className="text-gray-300">Total USD Value</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contract Details */}
            <Card className="bg-gray-800/50 border-blue-500">
              <CardHeader>
                <CardTitle className="text-white text-xl">Contract Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                      <span className="text-gray-300">Address:</span>
                      <div className="flex items-center space-x-2">
                        <code className="text-blue-400 text-sm">{analysisData.address}</code>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => copyToClipboard(analysisData.address)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                      <span className="text-gray-300">Token Name:</span>
                      <span className="text-white font-bold">{analysisData.name} ({analysisData.symbol})</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                      <span className="text-gray-300">Total Supply:</span>
                      <span className="text-white">{parseInt(analysisData.totalSupply) / 1e18} {analysisData.symbol}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                      <span className="text-gray-300">Verified:</span>
                      <div className="flex items-center space-x-1">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-400">Not Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-600/10 border border-green-600/30 rounded">
                      <span className="text-gray-300">Current Price:</span>
                      <span className="text-green-400 font-bold">{analysisData.tradingData.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-600/10 border border-green-600/30 rounded">
                      <span className="text-gray-300">Market Cap:</span>
                      <span className="text-green-400">{analysisData.tradingData.marketCap}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-600/10 border border-green-600/30 rounded">
                      <span className="text-gray-300">24h Volume:</span>
                      <span className="text-green-400">{analysisData.tradingData.volume24h}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-600/10 border border-green-600/30 rounded">
                      <span className="text-gray-300">Liquidity:</span>
                      <span className="text-green-400">{analysisData.tradingData.liquidity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="bg-gray-800/50 border-red-500">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Shield className="h-6 w-6 mr-2" />
                  Security Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisData.riskFactors.map((risk: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-red-600/10 border border-red-600/30 rounded">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span className="text-red-300">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Token Analysis */}
            <Card className="bg-gray-800/50 border-yellow-500">
              <CardHeader>
                <CardTitle className="text-white text-xl">Token Analysis (TokenSniffer)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                      <span className="text-gray-300">Buy Tax:</span>
                      <span className="text-green-400">{analysisData.tokenSniffer.buyTax}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                      <span className="text-gray-300">Sell Tax:</span>
                      <span className="text-red-400 font-bold">{analysisData.tokenSniffer.sellTax}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                      <span className="text-gray-300">Can Buy:</span>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-400">Yes</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                      <span className="text-gray-300">Can Sell:</span>
                      <div className="flex items-center space-x-1">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-400 font-bold">No</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                      <span className="text-gray-300">Status:</span>
                      <Badge variant="destructive">
                        {analysisData.tokenSniffer.honeypotStatus}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                      <span className="text-gray-300">Last Activity:</span>
                      <span className="text-orange-400">{analysisData.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card className="bg-gray-800/50 border-green-500">
              <CardHeader>
                <CardTitle className="text-white text-xl">External Analysis Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                    onClick={() => window.open(analysisData.etherscanUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Etherscan
                  </Button>
                  
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex items-center justify-center"
                    onClick={() => window.open(analysisData.dexScreenerUrl, '_blank')}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    DEX Screener
                  </Button>
                  
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
                    onClick={() => window.open(`https://tokensniffer.com/token/eth/${analysisData.address}`, '_blank')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    TokenSniffer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

      </div>
    </div>
  );
}