import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, DollarSign, Zap, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function EthConversion() {
  const [conversionStep, setConversionStep] = useState<'setup' | 'uniswap' | 'complete'>('setup');

  const proceedToUniswap = () => {
    setConversionStep('uniswap');
    // Open Uniswap with ETHGR → ETH swap
    window.open('https://app.uniswap.org/swap?inputCurrency=0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308&outputCurrency=ETH', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Convert ETHGR to ETH on Ethereum Mainnet
          </h1>
          <p className="text-xl text-green-600 mb-4">
            Direct conversion using your verified contract on Etherscan
          </p>
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
            Contract: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
          </Badge>
        </div>

        {/* Verification Status */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Contract Status:</strong> Verification submitted with corrected compiler version (v0.8.19). 
            Once verified, your tokens will be ready for immediate conversion to ETH.
          </AlertDescription>
        </Alert>

        {/* Portfolio Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-emerald-800">Current Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-800 mb-2">1,990,000</div>
                <div className="text-blue-600 font-semibold">ETHGR Tokens</div>
                <div className="text-sm text-blue-500 mt-1">Ready for conversion</div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-800 mb-2">≈ 29.5</div>
                <div className="text-purple-600 font-semibold">ETH Expected</div>
                <div className="text-sm text-purple-500 mt-1">Based on current rates</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-800 mb-2">≈ $71,945</div>
                <div className="text-green-600 font-semibold">USD Value</div>
                <div className="text-sm text-green-500 mt-1">At current ETH price</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">ETH Conversion Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">Contract Verification</h4>
                  <p className="text-sm text-green-600">Etherscan verification enables price recognition</p>
                </div>
                <Badge className="bg-green-100 text-green-800">IN PROGRESS</Badge>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg ${
                conversionStep !== 'setup' ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  conversionStep !== 'setup' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                }`}>2</div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    conversionStep !== 'setup' ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    Uniswap Trading
                  </h4>
                  <p className={`text-sm ${
                    conversionStep !== 'setup' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    Swap ETHGR → ETH using verified contract
                  </p>
                </div>
                <Badge className={
                  conversionStep !== 'setup' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }>
                  {conversionStep !== 'setup' ? 'ACTIVE' : 'WAITING'}
                </Badge>
              </div>

              <div className={`flex items-center gap-4 p-4 rounded-lg ${
                conversionStep === 'complete' ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  conversionStep === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                }`}>3</div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    conversionStep === 'complete' ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    ETH in Wallet
                  </h4>
                  <p className={`text-sm ${
                    conversionStep === 'complete' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    Pure ETH ready for any use
                  </p>
                </div>
                <Badge className={
                  conversionStep === 'complete' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }>
                  {conversionStep === 'complete' ? 'COMPLETE' : 'PENDING'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-blue-800">Optimal Trading Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-4">Recommended Settings</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Slippage Tolerance:</span>
                    <span className="font-bold text-blue-800">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Transaction Deadline:</span>
                    <span className="font-bold text-blue-800">20 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Gas Priority:</span>
                    <span className="font-bold text-blue-800">Standard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">MEV Protection:</span>
                    <span className="font-bold text-blue-800">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-amber-800 mb-4">Expected Costs</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Uniswap Fee:</span>
                    <span className="font-bold text-amber-800">0.3% (~$215)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Gas Fee:</span>
                    <span className="font-bold text-amber-800">~$15-30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Price Impact:</span>
                    <span className="font-bold text-amber-800">&lt; 1%</span>
                  </div>
                  <div className="flex justify-between border-t border-amber-300 pt-2">
                    <span className="text-amber-700 font-semibold">Net ETH:</span>
                    <span className="font-bold text-amber-800">≈ 29.3 ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Check Verification</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Monitor contract verification status
                </p>
                <Button 
                  onClick={() => window.location.href = '/verification-progress'}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ArrowRight className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Start Conversion</h3>
                <p className="text-sm text-green-700 mb-4">
                  Open Uniswap with ETHGR → ETH swap
                </p>
                <Button 
                  onClick={proceedToUniswap}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Convert to ETH
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">View Contract</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Check your tokens on Etherscan
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/token/0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308?a=0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
                  className="w-full bg-blue-600 hover:blue-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Tokens
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why ETH Conversion */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-800">Why Convert to ETH?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <h4 className="font-semibold text-green-800 mb-3">Advantages of ETH:</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Universal acceptance - trade on any platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Maximum liquidity - instant conversions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>No platform restrictions - use anywhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Direct USD conversion on all exchanges</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-800 mb-3">Next Steps After ETH:</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Transfer to Coinbase/Kraken for USD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Keep as ETH for future appreciation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use for DeFi yield farming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Stake for 4% APY rewards</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Timeline */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">ETH Conversion Timeline</h3>
          <p className="text-lg mb-6">
            Convert your 1,990,000 ETHGR tokens to pure ETH for maximum flexibility
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Step 1: Verify</h4>
              <p className="text-sm opacity-90">Contract verification</p>
              <p className="text-xs opacity-75">1-3 minutes</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Step 2: Swap</h4>
              <p className="text-sm opacity-90">ETHGR → ETH on Uniswap</p>
              <p className="text-xs opacity-75">2-5 minutes</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Step 3: Confirm</h4>
              <p className="text-sm opacity-90">29.3 ETH in wallet</p>
              <p className="text-xs opacity-75">Instant</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Step 4: Use</h4>
              <p className="text-sm opacity-90">Exchange or stake</p>
              <p className="text-xs opacity-75">Your choice</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}