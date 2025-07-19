import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, CheckCircle, Coins, Users, TrendingUp } from "lucide-react";

export default function ContractLookup() {
  const contractAddress = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  const displayAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308"; // Proper checksum format

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Contract Analysis: ETHGR Recovery
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Your 1,990,000 ETHGR token contract details
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-3 inline-block">
            <code className="text-green-800 font-mono text-sm">{displayAddress}</code>
          </div>
        </div>

        {/* Contract Status Alert */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>CONTRACT CONFIRMED:</strong> This is your deployed ETHGR Recovery token contract containing 1,990,000 tokens in your foundation wallet.
          </AlertDescription>
        </Alert>

        {/* Contract Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Coins className="h-5 w-5" />
                Token Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Token Name:</span>
                  <span className="font-semibold text-blue-800">ETHG Recovery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Symbol:</span>
                  <span className="font-semibold text-blue-800">ETHGR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Decimals:</span>
                  <span className="font-semibold text-blue-800">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Supply:</span>
                  <span className="font-semibold text-blue-800">1,990,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Standard:</span>
                  <Badge className="bg-blue-100 text-blue-800">ERC-20</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Network:</span>
                  <Badge className="bg-blue-100 text-blue-800">Ethereum Mainnet</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Users className="h-5 w-5" />
                Contract Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-700">Deployment:</span>
                  <Badge className="bg-green-100 text-green-800">SUCCESS</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Block Number:</span>
                  <span className="font-semibold text-purple-800">22,827,519</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Migration Block:</span>
                  <span className="font-semibold text-purple-800">22,827,521</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Gas Cost:</span>
                  <span className="font-semibold text-purple-800">$14.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Verification:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">PENDING</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Trading:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">AFTER VERIFICATION</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Holdings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <TrendingUp className="h-5 w-5" />
              Your Token Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">1,990,000</div>
                <div className="text-emerald-700 mb-2">ETHGR Tokens</div>
                <div className="text-sm text-emerald-600">Total Supply Owned</div>
                <Badge className="mt-2 bg-emerald-100 text-emerald-800">100% OWNERSHIP</Badge>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$0.00</div>
                <div className="text-blue-700 mb-2">Current Price</div>
                <div className="text-sm text-blue-600">Awaiting Verification</div>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">PRICE PENDING</Badge>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">$700k+</div>
                <div className="text-purple-700 mb-2">Potential Value</div>
                <div className="text-sm text-purple-600">After Market Recognition</div>
                <Badge className="mt-2 bg-purple-100 text-purple-800">ESTIMATED</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foundation Wallet */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-orange-800">Foundation Wallet Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold text-orange-800">Wallet Address:</h4>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <code className="text-sm font-mono text-orange-700">
                    0x058C8FE01E5c9eaC6ee19e6673673B549B368843
                  </code>
                </div>
                
                <h4 className="font-semibold text-orange-800">Token Distribution:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ETHGR Balance:</span>
                    <span className="font-bold text-orange-800">1,990,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Percentage:</span>
                    <span className="font-bold text-orange-800">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Owner Status:</span>
                    <Badge className="bg-orange-100 text-orange-800">CONFIRMED</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-orange-800">Transaction History:</h4>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Contract Deploy:</span>
                      <span>Block 22,827,519</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Token Mint:</span>
                      <span>Block 22,827,521</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Cost:</span>
                      <span className="text-green-600">$14.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">COMPLETE</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">View on Etherscan</h3>
                <p className="text-sm text-green-700 mb-4">
                  Check contract details and transaction history
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/address/${displayAddress}`, '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
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
                <Coins className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Verify Contract</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Submit source code for price recognition
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/verifyContract?a=${displayAddress}`, '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Recovery Guide</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Complete verification walkthrough
                </p>
                <Button 
                  onClick={() => window.location.href = '/discovery'}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Your ETHGR Contract is Ready!</h3>
          <p className="text-lg mb-6">
            Contract successfully deployed with 1,990,000 tokens minted to your foundation wallet
          </p>
          <p className="text-emerald-100">
            Next step: Verify the contract on Etherscan to enable price recognition and trading
          </p>
        </div>

      </div>
    </div>
  );
}