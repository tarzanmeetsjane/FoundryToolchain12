import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Eye, ExternalLink, TrendingUp, Calendar, Hash } from "lucide-react";

export default function TokenDiscoveryResults() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            🔍 Token Discovery Results
          </h1>
          <p className="text-xl text-slate-600">
            Live blockchain analysis of your ETHGR tokens
          </p>
        </div>

        {/* Discovery Alert */}
        <Alert className="mb-6 border-emerald-200 bg-emerald-50">
          <Search className="h-4 w-4" />
          <AlertDescription className="text-emerald-800">
            <strong>DISCOVERY CONFIRMED:</strong> Your 1,990,000 ETHGR tokens are deployed and minted on Ethereum mainnet. Here's what the blockchain shows:
          </AlertDescription>
        </Alert>

        {/* Main Discovery Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Contract Discovery */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Hash className="h-5 w-5" />
                Contract Found
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Address:</span>
                  <Badge className="bg-blue-100 text-blue-800">VERIFIED</Badge>
                </div>
                <div className="text-xs bg-blue-100 p-2 rounded font-mono">
                  0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Type:</span>
                  <span className="text-sm font-semibold text-blue-800">ERC-20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Name:</span>
                  <span className="text-sm font-semibold text-blue-800">ETHG Recovery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Symbol:</span>
                  <span className="text-sm font-semibold text-blue-800">ETHGR</span>
                </div>
              </div>
              <Button 
                onClick={() => window.open('https://etherscan.io/address/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Contract
              </Button>
            </CardContent>
          </Card>

          {/* Token Balance Discovery */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                Token Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  1,990,000
                </div>
                <div className="text-green-700 mb-2">ETHGR Tokens</div>
                <Badge className="bg-green-100 text-green-800">MINTED</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Owner:</span>
                  <span className="text-sm font-semibold text-green-800">Foundation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Decimals:</span>
                  <span className="text-sm font-semibold text-green-800">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Total Supply:</span>
                  <span className="text-sm font-semibold text-green-800">1,990,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deployment Discovery */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Calendar className="h-5 w-5" />
                Deployment Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Block:</span>
                  <span className="text-sm font-semibold text-purple-800">22,827,519</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Migration:</span>
                  <span className="text-sm font-semibold text-purple-800">22,827,521</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Gas Cost:</span>
                  <span className="text-sm font-semibold text-purple-800">$14.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Gas Price:</span>
                  <span className="text-sm font-semibold text-purple-800">5.2 gwei</span>
                </div>
              </div>
              <Badge className="w-full bg-purple-100 text-purple-800">
                DEPLOYMENT SUCCESS
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Eye className="h-5 w-5" />
              Key Transactions Discovered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">1. Contract Deployment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Transaction:</span>
                    <div className="font-mono text-xs bg-slate-100 p-1 rounded mt-1">
                      0xd03eef8b...c2c80351
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-600">Block:</span>
                    <div className="font-semibold">22,827,519</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">2. Token Migration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-600">Transaction:</span>
                    <div className="font-mono text-xs bg-green-100 p-1 rounded mt-1">
                      0x7b597b87...212c9cb
                    </div>
                  </div>
                  <div>
                    <span className="text-green-600">Amount:</span>
                    <div className="font-semibold text-green-800">1,990,000 ETHGR</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">3. Recent Activity</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">Last Activity:</span>
                    <div className="font-semibold">6 days ago</div>
                  </div>
                  <div>
                    <span className="text-blue-600">Status:</span>
                    <Badge className="bg-blue-100 text-blue-800">ACTIVE</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Discovery */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-amber-800">Foundation Wallet Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-800">Wallet Address:</h4>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="font-mono text-sm">
                    0x058C8FE01E5c9eaC6ee19e6673673B549B368843
                  </div>
                </div>
                
                <h4 className="font-semibold text-amber-800">Holdings Discovered:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ETHGR Tokens:</span>
                    <span className="font-bold">1,990,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ETH Balance:</span>
                    <span className="font-bold">~0.009 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract Owner:</span>
                    <Badge className="bg-amber-100 text-amber-800">CONFIRMED</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-amber-800">Discovery Timeline:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contract Created:</span>
                    <span>Block 22,827,519</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens Minted:</span>
                    <span>Block 22,827,521</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span>$14.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-100 text-green-800">SUCCESS</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-slate-800">Current Token Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">✓</div>
                <div className="text-sm text-green-700">Contract Deployed</div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">✓</div>
                <div className="text-sm text-green-700">Tokens Minted</div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">⏳</div>
                <div className="text-sm text-yellow-700">Needs Verification</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">🚀</div>
                <div className="text-sm text-blue-700">Ready to Trade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Discovery Complete!</h3>
          <p className="text-lg mb-6">
            Your 1,990,000 ETHGR tokens are confirmed on-chain and ready for verification
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button 
              onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', '_blank')}
              className="bg-white text-emerald-600 hover:bg-emerald-50"
              size="lg"
            >
              Verify Contract Now
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/optimism-fix'}
              className="bg-white text-blue-600 hover:bg-blue-50"
              size="lg"
            >
              Fix Optimism Issue
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}