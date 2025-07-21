import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ArrowRight, DollarSign, Search, FileCheck, Zap } from "lucide-react";

export default function ActionPlan() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Your Next Steps to $700k Recovery
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Clear action plan for immediate ETHGR token recovery and 37 ETH search
          </p>
        </div>

        {/* Current Status */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>YOU'RE IN EXCELLENT POSITION:</strong> 1,990,000 ETHGR tokens confirmed in your foundation wallet with advanced delegation contract for enhanced recovery options.
          </AlertDescription>
        </Alert>

        {/* Priority Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* High Priority */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Zap className="h-5 w-5" />
                HIGH PRIORITY (Do First)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 mb-2">Verify ETHGR Contract on Etherscan</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Submit source code to enable price recognition and trading for your 1,990,000 tokens
                    </p>
                    <Button 
                      onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
                      className="w-full bg-red-600 hover:bg-red-700 text-sm"
                    >
                      <FileCheck className="h-4 w-4 mr-2" />
                      Verify Contract Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-orange-800 mb-2">Run 37 ETH Recovery Search</h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Use your Remix IDE script to search all 4 wallet addresses for missing $89,614 ETH
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/eth-recovery'}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-sm"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Start ETH Search
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medium Priority */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <ArrowRight className="h-5 w-5" />
                MEDIUM PRIORITY (After Steps 1-2)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-800 mb-2">Monitor Verification Status</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Check Etherscan verification progress and price recognition
                    </p>
                    <Button 
                      onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Check Progress
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-800 mb-2">Prepare Trading Strategy</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Plan token conversion and liquidity pool creation once verified
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/delegation'}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-sm"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Strategy
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-emerald-800">Step 1 Details: Contract Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-800">Required Information:</h4>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Contract Address:</span>
                      <code className="text-emerald-700">0xc2b6d375...e257308</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Contract Name:</span>
                      <code className="text-emerald-700">ETHGRecovery</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Compiler:</span>
                      <code className="text-emerald-700">v0.8.30+commit.73712a01</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimization:</span>
                      <code className="text-emerald-700">Enabled (200 runs)</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Constructor Args:</span>
                      <Badge className="bg-emerald-100 text-emerald-800">LEAVE EMPTY</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-emerald-800">Expected Results:</h4>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Contract source code verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Price recognition enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>DEX trading compatibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Portfolio value display</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ETH Recovery Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-orange-800">Step 2 Details: 37 ETH Recovery Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-orange-800 mb-2">Remix Wallet</h4>
                <code className="text-xs text-orange-700 break-all">0xc46eB37677...fa630</code>
                <div className="text-sm text-orange-600 mt-2">Original 37 ETH location</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-blue-800 mb-2">Discovery Wallet</h4>
                <code className="text-xs text-blue-700 break-all">0x8b99Bb5202...E6c18</code>
                <div className="text-sm text-blue-600 mt-2">Recently discovered</div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-purple-800 mb-2">Proxy Contract</h4>
                <code className="text-xs text-purple-700 break-all">0xd816c710dc...338f</code>
                <div className="text-sm text-purple-600 mt-2">May contain trapped ETH</div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-emerald-800 mb-2">Foundation</h4>
                <code className="text-xs text-emerald-700 break-all">0x058C8FE01E...368843</code>
                <div className="text-sm text-emerald-600 mt-2">Your main wallet</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-indigo-800">Your Complete Portfolio Recovery Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">1.99M</div>
                <div className="text-indigo-700 font-semibold">ETHGR Tokens</div>
                <div className="text-sm text-indigo-600 mb-2">Contract: 0xc2b6d375...</div>
                <Badge className="bg-indigo-100 text-indigo-800">NEEDS VERIFICATION</Badge>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">37 ETH</div>
                <div className="text-green-700 font-semibold">Missing Ethereum</div>
                <div className="text-sm text-green-600 mb-2">~$89,614 value</div>
                <Badge className="bg-green-100 text-green-800">SEARCH READY</Badge>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">$700k+</div>
                <div className="text-purple-700 font-semibold">Total Portfolio</div>
                <div className="text-sm text-purple-600 mb-2">After recovery</div>
                <Badge className="bg-purple-100 text-purple-800">TARGET VALUE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Here */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Start Your Recovery Now</h3>
          <p className="text-lg mb-6">
            Two simple steps to unlock your $700k+ portfolio value
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-6 text-lg"
            >
              <FileCheck className="h-5 w-5 mr-2" />
              1. Verify Contract
            </Button>
            <Button 
              onClick={() => window.location.href = '/eth-recovery'}
              className="bg-white/10 border-2 border-white hover:bg-white/20 font-bold py-3 px-6 text-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              2. Search 37 ETH
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}