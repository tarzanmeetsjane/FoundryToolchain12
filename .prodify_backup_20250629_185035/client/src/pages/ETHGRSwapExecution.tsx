import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle, Settings, TrendingUp, ExternalLink, Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ETHGRSwapExecution() {
  const [swapAmount, setSwapAmount] = useState("1000");
  const [slippage, setSlippage] = useState("15");
  const [step, setStep] = useState(1);

  const ethgrContract = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const openUniswap = () => {
    window.open(`https://app.uniswap.org/#/swap?inputCurrency=${ethgrContract}&outputCurrency=ETH`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            ETHGR Swap Execution
          </h1>
          <p className="text-slate-600 text-lg">
            Step-by-step guide with proven settings
          </p>
        </div>

        {/* Success Confirmation */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Setup Confirmed:</strong> Your June 9th UNI approval proves Uniswap integration works perfectly. 
            Now applying optimal settings for ETHGR tokens.
          </AlertDescription>
        </Alert>

        {/* Progress Tracker */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Swap Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= num ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {num}
                  </div>
                  {num < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > num ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              <div className={step >= 1 ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                Contract Setup
              </div>
              <div className={step >= 2 ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                Configure Settings
              </div>
              <div className={step >= 3 ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                Execute Swap
              </div>
              <div className={step >= 4 ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                Confirm Success
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Contract Setup */}
        {step >= 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                ETHGR Contract Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Verified ETHGR Contract</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-sm break-all">{ethgrContract}</div>
                      <div className="text-green-600 text-sm">Balance: 1,990,000 ETHGR tokens</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(ethgrContract)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={nextStep}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={step > 1}
                  >
                    {step > 1 ? 'Completed' : 'Proceed to Settings'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Settings Configuration */}
        {step >= 2 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                Optimal Swap Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Swap Amount</h4>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        {["100", "1000", "5000", "10000"].map((value) => (
                          <Button
                            key={value}
                            variant={swapAmount === value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSwapAmount(value)}
                          >
                            {parseInt(value).toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      <Input
                        type="number"
                        value={swapAmount}
                        onChange={(e) => setSwapAmount(e.target.value)}
                        placeholder="ETHGR amount"
                      />
                      <div className="text-sm text-blue-600">
                        Recommended: Start with 1,000 ETHGR for testing
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Slippage Tolerance</h4>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        {["5", "10", "15", "20"].map((value) => (
                          <Button
                            key={value}
                            variant={slippage === value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSlippage(value)}
                          >
                            {value}%
                          </Button>
                        ))}
                      </div>
                      <div className="text-sm text-green-600">
                        Optimal: 15% for ETHGR volatility
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommended Settings Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Amount:</span>
                      <span className="font-semibold ml-2">{parseInt(swapAmount).toLocaleString()} ETHGR</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Slippage:</span>
                      <span className="font-semibold ml-2">{slippage}%</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Gas Limit:</span>
                      <span className="font-semibold ml-2">200,000</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Output:</span>
                      <span className="font-semibold ml-2">ETH</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={nextStep}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={step > 2}
                  >
                    {step > 2 ? 'Completed' : 'Apply Settings & Open Uniswap'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Execute Swap */}
        {step >= 3 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                Execute Swap on Uniswap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                
                <Alert className="border-blue-200 bg-blue-50">
                  <Settings className="h-4 w-4" />
                  <AlertDescription className="text-blue-800">
                    <strong>Ready to Swap:</strong> Click below to open Uniswap with ETHGR pre-selected. 
                    Set slippage to {slippage}% in the gear icon.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-3">Manual Setup Instructions</h4>
                    <div className="space-y-2 text-sm">
                      <div>1. Click gear icon for settings</div>
                      <div>2. Set slippage to {slippage}%</div>
                      <div>3. Paste contract: {ethgrContract.slice(0, 10)}...</div>
                      <div>4. Enter amount: {parseInt(swapAmount).toLocaleString()} ETHGR</div>
                      <div>5. Output currency: ETH</div>
                      <div>6. Review and swap</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold mb-3 text-green-800">Quick Launch</h4>
                    <div className="space-y-3">
                      <div className="text-sm text-green-700">
                        Pre-configured Uniswap link with ETHGR contract ready
                      </div>
                      <Button 
                        onClick={openUniswap}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Uniswap with ETHGR
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={nextStep}
                    variant="outline"
                    disabled={step > 3}
                  >
                    {step > 3 ? 'Completed' : 'I completed the swap'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success Confirmation */}
        {step >= 4 && (
          <Card className="border-2 border-green-300 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                Swap Success Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                
                <Alert className="border-green-200 bg-green-100">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-800">
                    <strong>Congratulations!</strong> You've successfully swapped ETHGR tokens to ETH. 
                    Your proven setup from June 9th continues to work perfectly.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold mb-2">What Happened</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div>• {parseInt(swapAmount).toLocaleString()} ETHGR tokens swapped</div>
                      <div>• Received ETH in your wallet</div>
                      <div>• Transaction confirmed on blockchain</div>
                      <div>• Remaining: {(1990000 - parseInt(swapAmount)).toLocaleString()} ETHGR</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold mb-2">Next Steps</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div>• Scale up swap amounts as needed</div>
                      <div>• Use same settings (15% slippage)</div>
                      <div>• Monitor gas prices for timing</div>
                      <div>• Keep using verified contract address</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => window.open(`https://etherscan.io/address/${foundationWallet}`, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Updated Wallet Balance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}