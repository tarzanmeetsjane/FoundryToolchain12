import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, AlertTriangle, TrendingDown, Search, Calendar } from "lucide-react";

export default function TokenTrackingDiscovery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-4">
            🚨 CRITICAL TOKEN MOVEMENT DETECTED
          </h1>
          <p className="text-xl text-red-600 mb-4">
            100,000 ETHG tokens received June 19th - but current balance is 0
          </p>
          <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2">
            Tokens Transferred OUT After Receipt
          </Badge>
        </div>

        {/* Critical Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Investigation Required:</strong> Your Foundation wallet received 100,000 ETHG tokens on June 19, 2025, 
            but the current balance shows 0 tokens. This means the tokens were transferred elsewhere after receipt.
          </AlertDescription>
        </Alert>

        {/* Token Movement Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-orange-800">Token Movement Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* Incoming Transaction */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">✅ INCOMING: June 19, 2025</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">From:</span>
                    <div className="font-mono text-green-800 text-xs">0xc46eB37677360EfDc011F4097621F15b792fa630</div>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Amount:</span>
                    <div className="text-green-800 font-bold">100,000 ETHG</div>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Transaction:</span>
                    <div className="font-mono text-green-800 text-xs">0x354648b3...</div>
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">🚨 CURRENT STATUS: Balance = 0</h4>
                </div>
                <div className="text-sm text-red-700">
                  API query result shows <strong>0 ETHG tokens</strong> currently in your Foundation wallet 
                  (contract 0x3fC29836E84E471a053D2D9E80494A867D670EAD). This means the tokens were moved after June 19th.
                </div>
              </div>

              {/* Missing Link */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Search className="h-5 w-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800">❓ MISSING: Outgoing Transaction</h4>
                </div>
                <div className="text-sm text-amber-700">
                  <strong>Investigation Needed:</strong> We need to find the outgoing transaction(s) that moved these 
                  100,000 ETHG tokens from your Foundation wallet. This could reveal:
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• Where the tokens went (another wallet, exchange, contract)</li>
                    <li>• When they were moved (date/time)</li>
                    <li>• Whether this was intentional or unauthorized</li>
                    <li>• If they can be recovered or are still accessible</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-blue-800">ETHG Token Contract Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800 mb-4">Contract Information:</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-blue-700 font-medium">Contract Address:</span>
                      <div className="font-mono text-blue-800 text-xs">0x3fC29836E84E471a053D2D9E80494A867D670EAD</div>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Token Name:</span>
                      <div className="text-blue-800">Ethereum Games (ETHG)</div>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Decimals:</span>
                      <div className="text-blue-800">8 decimals</div>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">Raw Value Received:</span>
                      <div className="text-blue-800">10,000,000,000,000 (100,000 × 10^8)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800 mb-4">Investigation Status:</h4>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Incoming Transaction:</span>
                      <span className="font-bold text-green-600">✅ FOUND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Current Balance:</span>
                      <span className="font-bold text-blue-600">✅ CONFIRMED (0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Outgoing Transaction:</span>
                      <span className="font-bold text-red-600">❌ MISSING</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Token Recovery:</span>
                      <span className="font-bold text-amber-600">⏳ PENDING</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-purple-800">Investigation Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <h4 className="font-semibold text-purple-800 mb-4">🔍 Immediate Investigation:</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Search className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Find Outgoing Transactions:</strong> Search for ETHG transfers from your Foundation wallet after June 19th</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Timeline Analysis:</strong> Determine exact date/time when tokens were moved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Destination Tracking:</strong> Identify where the 100,000 ETHG tokens went</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Security Assessment:</strong> Determine if movement was authorized or unauthorized</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-800 mb-4">🎯 Recovery Options:</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>If in Your Control:</strong> Tokens moved to another wallet you control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingDown className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>If Sold/Swapped:</strong> Tokens converted to ETH or other assets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span><strong>If Unauthorized:</strong> Security breach requiring immediate action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>If Contract Issue:</strong> Smart contract interaction or technical problem</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Search className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-800 mb-2">Find Outgoing TX</h3>
                <p className="text-sm text-orange-700 mb-4">
                  Search for token transfers out
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/token/0x3fc29836e84e471a053d2d9e80494a867d670ead?a=0x058c8fe01e5c9eac6ee19e6673673b549b368843', '_blank')}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Transfers
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">View Full History</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Complete transaction timeline
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/address/0x058c8fe01e5c9eac6ee19e6673673b549b368843', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Full History
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Continue Setup</h3>
                <p className="text-sm text-green-700 mb-4">
                  Focus on main ETHGR tokens
                </p>
                <Button 
                  onClick={() => window.location.href = '/verification-status'}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Main Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Token Movement Investigation Required</h3>
          <p className="text-lg mb-6">
            The 100,000 ETHG tokens you received on June 19th are no longer in your Foundation wallet. 
            We need to trace where they went to determine if they can be recovered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🎯 Status</h4>
              <p className="text-sm opacity-90">100k ETHG received</p>
              <p className="text-xs opacity-75">Current balance: 0</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">🔍 Action</h4>
              <p className="text-sm opacity-90">Find outgoing transaction</p>
              <p className="text-xs opacity-75">Trace token movement</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">💡 Goal</h4>
              <p className="text-sm opacity-90">Locate and recover</p>
              <p className="text-xs opacity-75">100,000 ETHG tokens</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}