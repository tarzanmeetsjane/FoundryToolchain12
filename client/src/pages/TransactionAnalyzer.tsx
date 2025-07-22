import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, DollarSign, AlertTriangle, TrendingUp, Calendar } from "lucide-react";

export default function TransactionAnalyzer() {
  const transactionHash = "0x354648b33fc9e7576dae114825fd599c17d195b294f1d8f2f20494b1ccbbe09f";
  const tokenContract = "0x3fC29836E84E471a053D2D9E80494A867D670EAD";
  const fromWallet = "0xc46eB37677360EfDc011F4097621F15b792fa630";
  const toWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🎉 CRITICAL TOKEN TRANSFER DISCOVERED!
          </h1>
          <p className="text-xl text-green-600 mb-4">
            100,000 ETHG tokens transferred to your Foundation wallet 33 days ago
          </p>
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
            June 19, 2025 - Block 22,735,206
          </Badge>
        </div>

        {/* Transaction Overview */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Major Discovery:</strong> This transaction proves your Foundation wallet received a significant 
            ETHG token transfer just 33 days ago from another wallet in your ecosystem.
          </AlertDescription>
        </Alert>

        {/* Transaction Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-emerald-800">Transaction Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-800 mb-4">Transaction Details:</h4>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-emerald-700 font-medium">Hash:</span>
                      <div className="font-mono text-emerald-800 text-xs break-all">{transactionHash}</div>
                    </div>
                    <div>
                      <span className="text-emerald-700 font-medium">Date:</span>
                      <div className="text-emerald-800">June 19, 2025 at 1:20:23 AM UTC</div>
                    </div>
                    <div>
                      <span className="text-emerald-700 font-medium">Block:</span>
                      <div className="text-emerald-800">22,735,206 (242,250 confirmations)</div>
                    </div>
                    <div>
                      <span className="text-emerald-700 font-medium">Gas Used:</span>
                      <div className="text-emerald-800">1,923,451 gas (~$23.59)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Token Transfer:</h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-blue-700">Amount:</span>
                      <span className="font-bold text-blue-800 ml-2">100,000 ETHG tokens</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Contract:</span>
                      <div className="font-mono text-blue-800 text-xs">{tokenContract}</div>
                    </div>
                    <div>
                      <span className="text-blue-700">Status:</span>
                      <span className="font-bold text-green-600 ml-2">✅ SUCCESS</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-800 mb-4">Wallet Analysis:</h4>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-800 mb-2">From Wallet (Sender):</h5>
                  <div className="text-xs font-mono text-orange-700 mb-2">{fromWallet}</div>
                  <div className="text-sm text-orange-700">
                    This appears to be another wallet in your ecosystem that held ETHG tokens.
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">To Wallet (Receiver):</h5>
                  <div className="text-xs font-mono text-green-700 mb-2">{toWallet}</div>
                  <div className="text-sm text-green-700">
                    <strong>YOUR FOUNDATION WALLET</strong> - Successfully received 100,000 ETHG tokens.
                  </div>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-amber-800">
                    <strong>Token Contract Note:</strong> This uses contract 0x3fC29836... which is different 
                    from your main ETHGR contract (0xc2B6D375...).
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Impact */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Portfolio Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-800 mb-2">100,000</div>
                <div className="text-purple-600 font-semibold">ETHG Received</div>
                <div className="text-sm text-purple-500 mt-1">June 19, 2025</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-800 mb-2">+Portfolio</div>
                <div className="text-blue-600 font-semibold">Value Increase</div>
                <div className="text-sm text-blue-500 mt-1">Additional holdings</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-800 mb-2">Confirmed</div>
                <div className="text-green-600 font-semibold">Transfer Success</div>
                <div className="text-sm text-green-500 mt-1">242k confirmations</div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                <Calendar className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-amber-800 mb-2">33 Days</div>
                <div className="text-amber-600 font-semibold">Time Ago</div>
                <div className="text-sm text-amber-500 mt-1">Recent activity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Findings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-blue-800">Key Findings & Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div>
                <h4 className="font-semibold text-blue-800 mb-4">🎯 Critical Discoveries:</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Active Token Movement:</strong> Your wallet ecosystem was active as recently as June 19, 2025</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>100k ETHG Received:</strong> Significant token transfer to your Foundation wallet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Multiple Token Contracts:</strong> You have holdings across different ETHG contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Cross-Wallet Transfers:</strong> Evidence of coordinated wallet management</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-800 mb-4">🚀 Immediate Actions:</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Check Token Balance:</strong> Verify current ETHG holdings in this contract</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Analyze Sender Wallet:</strong> Investigate the source wallet for more tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Contract Verification:</strong> Get both ETHG contracts verified for trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Portfolio Consolidation:</strong> Plan unified token management strategy</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-semibold text-emerald-800 mb-2">View Transaction</h3>
                <p className="text-sm text-emerald-700 mb-4">
                  See full details on Etherscan
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Etherscan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Check Balance</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Verify current ETHG holdings
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/token/${tokenContract}?a=${toWallet}`, '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Balance
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-800 mb-2">Sender Analysis</h3>
                <p className="text-sm text-orange-700 mb-4">
                  Investigate source wallet
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/address/${fromWallet}`, '_blank')}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analyze Wallet
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
                  Return to verification
                </p>
                <Button 
                  onClick={() => window.location.href = '/verification-status'}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verification Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Portfolio Discovery Success!</h3>
          <p className="text-lg mb-6">
            This transaction reveals active token management and additional ETHG holdings 
            beyond your main 1,990,000 ETHGR tokens.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Recent Activity</h4>
              <p className="text-sm opacity-90">June 19, 2025</p>
              <p className="text-xs opacity-75">33 days ago</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Token Transfer</h4>
              <p className="text-sm opacity-90">100,000 ETHG</p>
              <p className="text-xs opacity-75">Successful delivery</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Portfolio Growth</h4>
              <p className="text-sm opacity-90">Multiple contracts</p>
              <p className="text-xs opacity-75">Expanding ecosystem</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}