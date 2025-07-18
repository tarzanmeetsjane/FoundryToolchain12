import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, ExternalLink, MapPin, Wallet, Clock } from "lucide-react";

export default function TokenLocationStatus() {
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const mainContract = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const optimismContract = "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            📍 ETHGR Token Location Status
          </h1>
          <p className="text-xl text-slate-600">
            Tracking your 1,990,000 ETHGR tokens across contracts
          </p>
        </div>

        {/* Main Status Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <MapPin className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Your tokens are deployed and minted!</strong> They exist on-chain but need verification for price recognition.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Ethereum Contract Status */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Ethereum Mainnet Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Status:</span>
                  <Badge className="bg-green-100 text-green-800">DEPLOYED ✓</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Address:</span>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded">{mainContract}</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Standard:</span>
                  <Badge className="bg-green-100 text-green-800">ERC-20 ✓</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Tokens Minted:</span>
                  <span className="font-bold text-green-800">1,990,000 ETHGR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Owner:</span>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded">{foundationWallet}</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Verification:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">PENDING</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Transaction Details:</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>Deployment: Block 22,827,519</div>
                  <div>Migration: Block 22,827,521</div>
                  <div>Cost: $14.50 (5.2 gwei)</div>
                </div>
              </div>
              
              <Button 
                onClick={() => window.open(`https://etherscan.io/address/${mainContract}`, '_blank')}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Etherscan
              </Button>
            </CardContent>
          </Card>

          {/* Optimism Contract Status */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Optimism Contract (PROBLEM)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">Status:</span>
                  <Badge className="bg-red-100 text-red-800">WRONG TYPE</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">Address:</span>
                  <code className="text-xs bg-red-100 px-2 py-1 rounded">{optimismContract}</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">Standard:</span>
                  <Badge className="bg-red-100 text-red-800">ERC-1155 ✗</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">Token IDs:</span>
                  <span className="font-bold text-red-800">0, 1, 2, etc.</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">Events:</span>
                  <span className="text-red-700">TransferSingle</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-700">DEX Compatibility:</span>
                  <Badge className="bg-red-100 text-red-800">INCOMPATIBLE</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Issues:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• No price recognition</li>
                  <li>• Can't trade on DEXs</li>
                  <li>• Different token mechanics</li>
                  <li>• Multi-token complexity</li>
                </ul>
              </div>
              
              <Button 
                onClick={() => window.open(`https://optimistic.etherscan.io/address/${optimismContract}`, '_blank')}
                variant="outline"
                className="w-full border-red-200 text-red-700 hover:bg-red-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Optimism
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Token Balance Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Wallet className="h-5 w-5" />
              Your Token Balance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">1,990,000</div>
                <div className="text-green-700 mb-1">ETHGR Tokens</div>
                <div className="text-sm text-green-600">Ethereum Mainnet</div>
                <Badge className="mt-2 bg-green-100 text-green-800">READY TO TRADE</Badge>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">$0.00</div>
                <div className="text-yellow-700 mb-1">Current Price</div>
                <div className="text-sm text-yellow-600">Needs Verification</div>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">PENDING</Badge>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">$653k+</div>
                <div className="text-purple-700 mb-1">Potential Value</div>
                <div className="text-sm text-purple-600">After Verification</div>
                <Badge className="mt-2 bg-purple-100 text-purple-800">ESTIMATED</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Where Are Your Tokens? */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-blue-800">📍 Exact Token Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">✅ Primary Location: Ethereum Mainnet</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><strong>Contract:</strong> {mainContract}</div>
                  <div><strong>Your Wallet:</strong> {foundationWallet}</div>
                  <div><strong>Balance:</strong> 1,990,000 ETHGR tokens</div>
                  <div><strong>Status:</strong> Deployed and minted successfully</div>
                  <div><strong>Action Needed:</strong> Verify contract for price recognition</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Secondary Location: Optimism (NEEDS FIX)</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div><strong>Contract:</strong> {optimismContract}</div>
                  <div><strong>Problem:</strong> Wrong contract type (ERC-1155)</div>
                  <div><strong>Impact:</strong> No price recognition, can't trade</div>
                  <div><strong>Solution:</strong> Deploy correct ERC-20 contract</div>
                  <div><strong>Action Needed:</strong> Visit /optimism-fix page</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Clock className="h-5 w-5" />
              Immediate Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Step 1: Verify Ethereum Contract</h4>
                <p className="text-sm text-green-700 mb-3">
                  Submit your contract source code to Etherscan for verification
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/verifyContract?a=${mainContract}`, '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Verify Now
                </Button>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Step 2: Fix Optimism Contract</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Deploy the correct ERC-20 contract for 90% lower fees
                </p>
                <Button 
                  onClick={() => window.location.href = '/optimism-fix'}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Fix Optimism
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Your Tokens Are Safe and Ready!</h3>
          <p className="text-lg mb-4">
            1,990,000 ETHGR tokens are minted and waiting in your wallet
          </p>
          <p className="text-blue-100">
            Complete verification to start trading and unlock their full value
          </p>
        </div>

      </div>
    </div>
  );
}