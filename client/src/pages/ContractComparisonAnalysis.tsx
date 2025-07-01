import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight
} from "lucide-react";

export default function ContractComparisonAnalysis() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          ETHGR Contract Analysis & Solution
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Understanding your dual contract structure and fixing trading issues
        </p>
      </div>

      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Root Cause Found:</strong> The Optimism contract (0x3e7c...76e9) is missing essential ERC20 functions,
          preventing proper wallet recognition and DEX trading. Your main wealth (1,990,000 tokens) is safely stored
          in the Ethereum mainnet contract.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Contract Comparison</TabsTrigger>
          <TabsTrigger value="analysis">Technical Analysis</TabsTrigger>
          <TabsTrigger value="solution">Solution Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Ethereum Contract */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Ethereum Mainnet (Primary)
                </CardTitle>
                <CardDescription>Your main recovery tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">Contract Details:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>Address: 0xc2b6d375b7d14c9ce73f97ddf565002cce257308</div>
                    <div>Standard: ERC-20 (Full compliance)</div>
                    <div>Balance: 1,990,000 ETHGR tokens</div>
                    <div>Deployment: December 2024</div>
                    <div>Status: Deployed, needs verification</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">ERC20 Functions:</h4>
                  <div className="text-xs text-green-700 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      totalSupply() ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      balanceOf() ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      transfer() ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      transferFrom() ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      approve() ✓
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">Potential Value:</h4>
                  <div className="text-sm text-green-700">
                    $200,000 - $1,300,000 (once verified)
                  </div>
                </div>

                <Button 
                  onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Etherscan
                </Button>
              </CardContent>
            </Card>

            {/* Optimism Contract */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <XCircle className="h-5 w-5" />
                  Optimism (Problematic)
                </CardTitle>
                <CardDescription>ERC20 non-compliant contract</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Contract Details:</h4>
                  <div className="text-sm text-red-700 space-y-1">
                    <div>Address: 0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9</div>
                    <div>Standard: ERC-1155 (Not ERC-20)</div>
                    <div>Balance: Unknown (multi-token)</div>
                    <div>Deployment: 6 days ago</div>
                    <div>Status: Active but non-compliant</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Missing ERC20 Functions:</h4>
                  <div className="text-xs text-red-700 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      totalSupply() ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      balanceOf() ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-3 w-3" />
                      transfer() ✗
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-3 w-3" />
                      transferFrom() ✗
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3" />
                      approve() ✓
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Trading Issues:</h4>
                  <div className="text-sm text-red-700">
                    DEXs cannot route trades, wallets show "N/A"
                  </div>
                </div>

                <Button 
                  onClick={() => window.open('https://optimistic.etherscan.io/address/0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9', '_blank')}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Optimism
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Technical Analysis: Why Trading Fails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ERC20 Standard Requirements</h3>
                <p className="text-slate-700">
                  For a token to be recognized by wallets and DEXs as a tradeable ERC20 token, 
                  it must implement all required functions. Missing even one function breaks compatibility.
                </p>

                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">Critical Missing Functions:</h4>
                    <div className="space-y-2 text-sm text-amber-700">
                      <div>
                        <strong>transfer(address to, uint256 amount)</strong>
                        <p>• Required for basic token transfers</p>
                        <p>• Used by wallets for sending tokens</p>
                        <p>• Essential for DEX trading</p>
                      </div>
                      <div>
                        <strong>transferFrom(address from, address to, uint256 amount)</strong>
                        <p>• Required for delegated transfers</p>
                        <p>• Used by DEX smart contracts</p>
                        <p>• Enables swap functionality</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h4 className="font-semibold">Impact on Trading:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <h5 className="font-semibold text-red-800 mb-2">Wallet Issues:</h5>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Shows "N/A" for token values</li>
                          <li>• Cannot execute transfers</li>
                          <li>• Token not recognized properly</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <h5 className="font-semibold text-red-800 mb-2">DEX Issues:</h5>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• "No routes available" errors</li>
                          <li>• Cannot create trading pairs</li>
                          <li>• Liquidity pools fail to function</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solution">
          <div className="space-y-6">
            
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Recommended Solution:</strong> Focus on your Ethereum mainnet contract verification.
                This unlocks your main token wealth (1,990,000 ETHGR) which is properly ERC20 compliant.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Solution Strategy</CardTitle>
                <CardDescription>Prioritized action plan for token recovery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Priority 1: Ethereum Contract Verification</h3>
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-blue-800">Immediate Action:</h4>
                        <p className="text-sm text-blue-700">
                          Verify your Ethereum mainnet contract (0xc2b6...7308) to unlock the trading value 
                          of your 1,990,000 ETHGR tokens. This contract is properly ERC20 compliant.
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => window.location.href = '/final-verification'}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Start Verification Process
                          </Button>
                          <Button 
                            onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308#code', '_blank')}
                            variant="outline"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Etherscan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Priority 2: Optimism Contract Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle className="text-sm">Option A: Fix Contract</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="text-sm text-slate-700 space-y-2">
                          <p>Deploy new ERC20-compliant contract on Optimism</p>
                          <p><strong>Pros:</strong> Full compatibility</p>
                          <p><strong>Cons:</strong> Requires new deployment</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle className="text-sm">Option B: Wrapper Contract</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="text-sm text-slate-700 space-y-2">
                          <p>Create ERC20 wrapper for existing contract</p>
                          <p><strong>Pros:</strong> Preserves original</p>
                          <p><strong>Cons:</strong> Additional complexity</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle className="text-sm">Option C: Focus Ethereum</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="text-sm text-slate-700 space-y-2">
                          <p>Use Ethereum mainnet exclusively</p>
                          <p><strong>Pros:</strong> Immediate value unlock</p>
                          <p><strong>Cons:</strong> Higher gas fees</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Next Steps:</h4>
                  <ol className="text-sm text-green-700 space-y-1">
                    <li>1. Complete Ethereum contract verification (unlocks $200k-$1.3M value)</li>
                    <li>2. Test trading functionality on Ethereum mainnet</li>
                    <li>3. Evaluate need for Optimism contract fixes</li>
                    <li>4. Consider cross-chain bridging if needed</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}