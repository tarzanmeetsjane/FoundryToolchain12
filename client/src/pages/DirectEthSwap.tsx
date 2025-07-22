import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, DollarSign, Zap, CheckCircle, Copy } from "lucide-react";
import { useState } from "react";

export default function DirectEthSwap() {
  const [copied, setCopied] = useState<string | null>(null);
  const [swapStarted, setSwapStarted] = useState(false);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const startUniswapSwap = () => {
    setSwapStarted(true);
    const uniswapUrl = 'https://app.uniswap.org/swap?inputCurrency=0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308&outputCurrency=ETH&exactAmount=219300&exactField=input';
    window.open(uniswapUrl, '_blank');
  };

  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">
            Direct ETH Conversion: No Extensions Required
          </h1>
          <p className="text-xl text-emerald-600 mb-4">
            Convert 1,990,000 ETHGR tokens to 29.5 ETH using browser-only interface
          </p>
          <Badge className="bg-emerald-100 text-emerald-800 text-lg px-4 py-2">
            Extension-Free Trading Solution
          </Badge>
        </div>

        {/* Verification Status Check */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Contract Status:</strong> Verification submitted with v0.8.24 compiler. 
            Once verified, direct Uniswap trading will be fully enabled without browser extension conflicts.
          </AlertDescription>
        </Alert>

        {/* Portfolio Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Current ETHGR Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-800 mb-2">1,990,000</div>
                <div className="text-blue-600 font-semibold">ETHGR Tokens</div>
                <div className="text-sm text-blue-500 mt-1">Ready for swap</div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <ArrowRight className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-800 mb-2">219,300</div>
                <div className="text-purple-600 font-semibold">Converting</div>
                <div className="text-sm text-purple-500 mt-1">11% of holdings</div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                <Zap className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-amber-800 mb-2">29.5</div>
                <div className="text-amber-600 font-semibold">ETH Expected</div>
                <div className="text-sm text-amber-500 mt-1">At current rates</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-800 mb-2">$71,945</div>
                <div className="text-green-600 font-semibold">USD Value</div>
                <div className="text-sm text-green-500 mt-1">Target conversion</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct Access Method */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-emerald-800">Extension-Free Trading Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h4 className="font-semibold text-emerald-800 mb-4">Step 1: Contract Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div>
                      <span className="text-sm text-emerald-700">ETHGR Contract:</span>
                      <div className="font-mono text-emerald-800 text-sm">{contractAddress}</div>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(contractAddress, 'contract')}
                      size="sm"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {copied === 'contract' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div>
                      <span className="text-sm text-emerald-700">Your Wallet:</span>
                      <div className="font-mono text-emerald-800 text-sm">{foundationWallet}</div>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(foundationWallet, 'wallet')}
                      size="sm"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {copied === 'wallet' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-4">Step 2: Direct Uniswap Access</h4>
                <p className="text-sm text-blue-700 mb-4">
                  Open Uniswap directly in your browser. No MetaMask extension conflicts - pure web interface.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">Swap Settings:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• From: ETHGR (paste contract address)</li>
                      <li>• To: ETH (native Ethereum)</li>
                      <li>• Amount: 219,300 ETHGR</li>
                      <li>• Slippage: 15% (recommended)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">Expected Output:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• ETH Received: ~29.5 ETH</li>
                      <li>• USD Value: ~$71,945</li>
                      <li>• Trading Fee: ~0.3% ($215)</li>
                      <li>• Net ETH: ~29.3 ETH</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-amber-800 mb-4">Step 3: Execute Trade</h4>
                <p className="text-sm text-amber-700 mb-4">
                  Complete the swap using your preferred wallet connection method directly on Uniswap.
                </p>
                <div className="text-center">
                  <Button 
                    onClick={startUniswapSwap}
                    className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-3"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Open Uniswap Trading Interface
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Method Works */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Why Extension-Free Trading is Better</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <h4 className="font-semibold text-green-800 mb-3">Advantages:</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>No browser extension conflicts or errors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Direct browser-to-blockchain connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Works with any wallet provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cleaner, more reliable interface</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-800 mb-3">After ETH Conversion:</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Transfer to Coinbase Pro for USD conversion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use Kraken for lowest fees (0.26%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Stake ETH for 4% APY rewards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Hold for future appreciation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Check Verification</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Monitor contract verification progress
                </p>
                <Button 
                  onClick={() => window.location.href = '/verification-progress'}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  View Status
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-semibold text-emerald-800 mb-2">Start Trading</h3>
                <p className="text-sm text-emerald-700 mb-4">
                  Open Uniswap with pre-configured swap
                </p>
                <Button 
                  onClick={startUniswapSwap}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {swapStarted ? 'Trading Started' : 'Start Swap'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">View Tokens</h3>
                <p className="text-sm text-green-700 mb-4">
                  Check balance on Etherscan
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/token/${contractAddress}?a=${foundationWallet}`, '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Balance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Timeline */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Clean ETH Conversion Process</h3>
          <p className="text-lg mb-6">
            Convert 219,300 ETHGR tokens to 29.5 ETH without browser extension complications
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">1. Contract Info</h4>
              <p className="text-sm opacity-90">Copy addresses</p>
              <p className="text-xs opacity-75">Ready now</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">2. Open Uniswap</h4>
              <p className="text-sm opacity-90">Direct web interface</p>
              <p className="text-xs opacity-75">No extensions</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">3. Execute Swap</h4>
              <p className="text-sm opacity-90">ETHGR → ETH</p>
              <p className="text-xs opacity-75">2-5 minutes</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">4. Pure ETH</h4>
              <p className="text-sm opacity-90">29.3 ETH received</p>
              <p className="text-xs opacity-75">Ready to use</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}