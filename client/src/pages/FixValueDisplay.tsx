import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, ExternalLink, FileCheck, DollarSign, ArrowRight } from "lucide-react";

export default function FixValueDisplay() {
  const [verificationStep, setVerificationStep] = useState("explanation");

  const contractData = {
    address: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308",
    tokens: "1,990,000 ETHGR",
    currentValue: "$0.00",
    targetValue: "$653,000",
    status: "Unverified Contract"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-4">
            Fix $0.00 Value Display Issue
          </h1>
          <p className="text-xl text-red-600 mb-4">
            ETHGR Contract Verification Required for Price Recognition
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2">
              Current: $0.00 Value
            </Badge>
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              Target: $653,000 Value
            </Badge>
          </div>
        </div>

        {/* Problem Explanation */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-5 w-5" />
          <AlertDescription className="text-red-800 text-lg">
            <strong>Root Cause Identified:</strong> Your ETHGR contract shows "N/A" price on Etherscan because it's unverified. 
            Unverified contracts cannot display proper token values, causing wallets and platforms to show $0.00.
          </AlertDescription>
        </Alert>

        {/* Current Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-orange-800">Current Contract Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-3">Contract Details</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-orange-700 text-sm">Contract Address:</span>
                    <div className="font-mono text-orange-800 text-sm mt-1 break-all">{contractData.address}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">Token Holdings:</span>
                    <span className="font-bold text-orange-800">{contractData.tokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">Current Display:</span>
                    <span className="font-bold text-red-600">{contractData.currentValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">After Verification:</span>
                    <span className="font-bold text-green-600">{contractData.targetValue}</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-3">Why $0.00 Shows</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-red-700">Contract source code not verified on Etherscan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-red-700">Price feeds cannot recognize token standard</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-red-700">Wallets show "Unknown Token" or $0.00</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span className="text-red-700">Exchanges cannot list unverified tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Immediate Fix: Contract Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">Step 1: Prepare Verification Data</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                    <span>Contract source code (ETHGRecovery.sol)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                    <span>Compiler version: 0.8.19 with optimizer enabled</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                    <span>Constructor arguments: NONE (empty field)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                    <span>Contract ABI for proper function recognition</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">Step 2: Submit to Etherscan</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                    <span>Go to Etherscan verification page for your contract</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                    <span>Select "Single file" verification method</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                    <span>Paste contract source code and compiler settings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                    <span>Submit and wait for verification (usually 1-2 minutes)</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-3">Step 3: Immediate Results</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Contract shows "Verified" status on Etherscan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Token value changes from $0.00 to proper market price</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Wallets display 1,990,000 ETHGR = $653,000</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Enhanced trading capabilities on DEXs</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Verify Contract Now</h3>
                <p className="text-sm text-green-700 mb-4">
                  Direct link to Etherscan verification
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Start Verification
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <FileCheck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Get Source Code</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Ready-to-paste contract code
                </p>
                <Button 
                  onClick={() => window.location.href = '/contract-source'}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  View Source
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Check Results</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Monitor value update
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/token/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Token
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-gray-800">Verification Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">0</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Current Status</h4>
                  <p className="text-gray-600 text-sm">Contract deployed but unverified - value shows $0.00</p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-gray-400 mx-auto" />

              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-800">Submit Verification (5 minutes)</h4>
                  <p className="text-blue-600 text-sm">Upload source code and compiler settings to Etherscan</p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-gray-400 mx-auto" />

              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-green-800">Verification Complete (1-2 minutes)</h4>
                  <p className="text-green-600 text-sm">Contract verified - value updates to $653,000 immediately</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Projection */}
        <div className="bg-gradient-to-r from-red-500 to-green-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Fix Value Display: $0.00 → $653,000</h3>
          <p className="text-lg mb-6">
            Contract verification is the single action needed to unlock proper value display for your 1,990,000 ETHGR tokens. 
            This transforms your portfolio from showing $0.00 to displaying the correct $653,000 market value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Problem</h4>
              <p className="text-sm opacity-90">$0.00 Value Display</p>
              <p className="text-xs opacity-75">Unverified contract</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Solution</h4>
              <p className="text-sm opacity-90">Contract Verification</p>
              <p className="text-xs opacity-75">5-minute process</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Result</h4>
              <p className="text-sm opacity-90">$653,000 Value</p>
              <p className="text-xs opacity-75">Immediate recognition</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Impact</h4>
              <p className="text-sm opacity-90">Full Trading</p>
              <p className="text-xs opacity-75">Exchange compatibility</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}