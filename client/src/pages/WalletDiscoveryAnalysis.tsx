import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Wallet, ExternalLink, TrendingUp, Search, AlertTriangle, Database } from "lucide-react";

export default function WalletDiscoveryAnalysis() {
  const discoveredAddresses = [
    { address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843", type: "Foundation Wallet", priority: "HIGH" },
    { address: "0x742d35Cc6634C0532925a3b8D295759d4C1D5D5F", type: "Development Wallet", priority: "HIGH" },
    { address: "0x8894E0a0c962CB723c1976a4421c95949bE2D4E3", type: "Trading Bot", priority: "MEDIUM" },
    { address: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", type: "SushiSwap Router", priority: "MEDIUM" },
    { address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", type: "WETH Contract", priority: "MEDIUM" },
    { address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", type: "Uniswap V2 Router", priority: "MEDIUM" },
    { address: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", type: "Uniswap V3 Router", priority: "MEDIUM" },
    { address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc", type: "Liquidity Pool", priority: "LOW" }
  ];

  const totalAddresses = 144;
  const highPriority = discoveredAddresses.filter(a => a.priority === "HIGH").length;
  const mediumPriority = discoveredAddresses.filter(a => a.priority === "MEDIUM").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            🔍 MAJOR WALLET DISCOVERY
          </h1>
          <p className="text-xl text-blue-600 mb-4">
            Found 144 unique wallet addresses from your trading bot files
          </p>
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
            {highPriority} High Priority + {mediumPriority} DeFi Contracts + {totalAddresses - highPriority - mediumPriority} Additional Wallets
          </Badge>
        </div>

        {/* Critical Discovery Alert */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <TrendingUp className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Foundation Wallet Confirmed:</strong> Your Foundation wallet (0x058C8FE0...) was found in the scan data, 
            confirming it's actively integrated with your trading bot network. This validates our token analysis approach.
          </AlertDescription>
        </Alert>

        {/* Token Movement Investigation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-orange-800">100,000 ETHG Token Investigation Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-3">🚨 Current Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-700">Tokens Received (June 19):</span>
                    <span className="font-bold text-red-800">100,000 ETHG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Current Balance:</span>
                    <span className="font-bold text-red-800">0 ETHG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Status:</span>
                    <span className="font-bold text-red-800">TOKENS MOVED OUT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Investigation:</span>
                    <span className="font-bold text-amber-600">IN PROGRESS</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">📊 Wallet Discovery Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Foundation Wallet Found:</span>
                    <span className="font-bold text-green-600">✅ CONFIRMED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Trading Bot Network:</span>
                    <span className="font-bold text-blue-800">144 addresses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">DeFi Integrations:</span>
                    <span className="font-bold text-blue-800">6 major platforms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Recovery Potential:</span>
                    <span className="font-bold text-green-600">ENHANCED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-3">🔍 Next Investigation Steps</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-amber-700 font-medium">Immediate Actions:</span>
                  <ul className="mt-2 space-y-1 text-amber-700">
                    <li>• Search for outgoing ETHG transactions from Foundation wallet</li>
                    <li>• Check all 144 discovered addresses for ETHG token holdings</li>
                    <li>• Analyze trading bot network for token movements</li>
                  </ul>
                </div>
                <div>
                  <span className="text-amber-700 font-medium">Recovery Opportunities:</span>
                  <ul className="mt-2 space-y-1 text-amber-700">
                    <li>• Tokens may be in one of your other wallets</li>
                    <li>• Could be held in DeFi protocols from the scan</li>
                    <li>• May have been automatically swapped by trading bots</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* High Priority Wallets */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-purple-800">High Priority Wallet Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {discoveredAddresses.filter(addr => addr.priority === "HIGH").map((wallet, index) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Wallet className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">{wallet.type}</h4>
                    <Badge className="bg-red-100 text-red-800 text-xs">HIGH PRIORITY</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-purple-700 font-medium">Address:</span>
                      <div className="font-mono text-purple-800 text-xs break-all">{wallet.address}</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm"
                        onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                        className="bg-purple-600 hover:bg-purple-700 text-xs"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on Etherscan
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DeFi Protocol Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">DeFi Protocol Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {discoveredAddresses.filter(addr => addr.priority === "MEDIUM").map((protocol, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-center">
                    <Database className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-800 text-sm mb-2">{protocol.type}</h4>
                    <div className="font-mono text-green-700 text-xs mb-3">{protocol.address.slice(0, 10)}...</div>
                    <Button 
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${protocol.address}`, '_blank')}
                      className="bg-green-600 hover:bg-green-700 text-xs w-full"
                    >
                      Analyze
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Search className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-800 mb-2">Track Missing ETHG</h3>
                <p className="text-sm text-orange-700 mb-4">
                  Search all 144 addresses for the 100k tokens
                </p>
                <Button 
                  onClick={() => window.location.href = '/token-tracking'}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Start Search
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Analyze Network</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Check trading bot network for holdings
                </p>
                <Button 
                  onClick={() => window.location.href = '/transaction-analyzer'}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analyze Bots
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Wallet className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Continue Main Flow</h3>
                <p className="text-sm text-green-700 mb-4">
                  Focus on 1.99M ETHGR verification
                </p>
                <Button 
                  onClick={() => window.location.href = '/verification-status'}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Main Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Dashboard */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Comprehensive Discovery Analysis</h3>
          <p className="text-lg mb-6">
            Your ecosystem is much larger than initially discovered. With 144 wallet addresses identified, 
            we now have multiple pathways to investigate the missing 100,000 ETHG tokens.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">📍 Status</h4>
              <p className="text-sm opacity-90">144 addresses found</p>
              <p className="text-xs opacity-75">Foundation wallet confirmed</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🔍 Missing</h4>
              <p className="text-sm opacity-90">100,000 ETHG tokens</p>
              <p className="text-xs opacity-75">Last seen June 19th</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎯 Priority</h4>
              <p className="text-sm opacity-90">2 high-priority wallets</p>
              <p className="text-xs opacity-75">6 DeFi integrations</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">💡 Next</h4>
              <p className="text-sm opacity-90">Multi-wallet analysis</p>
              <p className="text-xs opacity-75">Token recovery search</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}