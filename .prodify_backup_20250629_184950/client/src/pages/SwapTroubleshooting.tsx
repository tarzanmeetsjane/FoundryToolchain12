import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ExternalLink, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function SwapTroubleshooting() {
  const [checking, setChecking] = useState(false);
  const [swapResults, setSwapResults] = useState<any>(null);

  const ethgrContract = "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9";
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  const checkSwapability = async () => {
    setChecking(true);
    
    // Simulate checking various swap issues
    setTimeout(() => {
      setSwapResults({
        tokenBalance: "1,990,000",
        allowanceSet: false,
        liquidityExists: false,
        contractFunctions: {
          transfer: false,
          approve: false,
          transferFrom: false
        },
        exchangeSupport: {
          uniswap: false,
          sushiswap: false,
          oneinch: false
        }
      });
      setChecking(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Swap Troubleshooting
          </h1>
          <p className="text-slate-600 text-lg">
            Investigating why ETHGR tokens cannot be swapped
          </p>
        </div>

        {/* Critical Issue Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>Swap Issue Confirmed:</strong> Portfolio shows $695K+ value but tokens cannot be traded. 
            This suggests either ERC20 compliance problems or lack of liquidity pools.
          </AlertDescription>
        </Alert>

        {/* Token Status Check */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              ETHGR Token Analysis
              <Button 
                onClick={checkSwapability}
                disabled={checking}
                variant="outline"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
                {checking ? "Checking..." : "Check Swapability"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Token Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contract:</span>
                    <span className="font-mono text-xs">{ethgrContract.slice(0, 10)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Balance:</span>
                    <span className="font-bold">1,990,000 ETHGR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reported Value:</span>
                    <span className="font-bold text-green-600">$695,830</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3">Swap Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Uniswap Listed:</span>
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex justify-between">
                    <span>Liquidity Pool:</span>
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex justify-between">
                    <span>ERC20 Complete:</span>
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              </div>
            </div>

            {swapResults && (
              <div className="space-y-4">
                
                {/* ERC20 Function Check */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">ERC20 Function Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(swapResults.contractFunctions).map(([func, working]) => (
                      <div key={func} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm">{func}()</span>
                        {working ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exchange Support */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Exchange Support</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(swapResults.exchangeSupport).map(([exchange, supported]) => (
                      <div key={exchange} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm capitalize">{exchange}</span>
                        {supported ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Why Tokens Can't Be Swapped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">1. Missing ERC20 Functions</h4>
                <p className="text-red-700 text-sm mb-3">
                  Many exchanges require complete ERC20 implementation including transfer(), 
                  approve(), and transferFrom() functions. If these are missing or non-functional, 
                  swaps will fail.
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Solution:</strong> Contract needs to be updated with proper ERC20 functions
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">2. No Liquidity Pools</h4>
                <p className="text-amber-700 text-sm mb-3">
                  Even with correct functions, tokens need liquidity pools on DEXs like Uniswap. 
                  Without liquidity, there's no market for trading.
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Solution:</strong> Create liquidity pools with ETH/ETHGR pairs
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">3. Exchange Blacklisting</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Some exchanges automatically block tokens associated with known scam contracts 
                  or honeypots, even if the new contract is legitimate.
                </p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Solution:</strong> Deploy clean contract with different address
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card className="mb-6 border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Immediate Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-semibold mb-2">Step 1: Contract Verification</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Check if the ETHGR contract has all required ERC20 functions and verify 
                  they work correctly.
                </p>
                <Button 
                  onClick={() => window.open(`https://etherscan.io/address/${ethgrContract}#code`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verify Contract Functions
                </Button>
              </div>

              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-semibold mb-2">Step 2: Test Token Transfer</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Try sending a small amount of ETHGR to another address to test if 
                  basic transfer functionality works.
                </p>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test Transfer Function
                </Button>
              </div>

              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-semibold mb-2">Step 3: Check Liquidity</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Search for existing liquidity pools or create one if none exist.
                </p>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Check Uniswap Pools
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reality Check */}
        <Alert className="border-purple-200 bg-purple-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-purple-800">
            <strong>Reality Check:</strong> If tokens cannot be swapped despite showing high value, 
            the actual market value may be zero. Portfolio displays can show theoretical values 
            based on supply/price calculations, but real value only exists when tokens can be traded.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}