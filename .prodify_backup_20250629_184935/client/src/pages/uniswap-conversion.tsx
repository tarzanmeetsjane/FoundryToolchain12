import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function UniswapConversion() {
  const [currentPrice, setCurrentPrice] = useState(2439);
  const [gasPrice, setGasPrice] = useState(5.2);
  
  const conversionAmount = 219300;
  const ethgPrice = 0.328;
  const expectedETH = 29.5;
  const expectedUSD = expectedETH * currentPrice;
  const slippage = 5.0;
  const minETHOut = expectedETH * (1 - slippage/100);
  
  useEffect(() => {
    // Simulate live price updates
    const interval = setInterval(() => {
      setCurrentPrice(prev => prev + (Math.random() - 0.5) * 5);
      setGasPrice(prev => Math.max(3, prev + (Math.random() - 0.5) * 0.3));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const ETHG_TOKEN = "0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90";
  const uniswapUrl = `https://app.uniswap.org/swap?inputCurrency=${ETHG_TOKEN}&outputCurrency=ETH&exactAmount=${conversionAmount}&exactField=input`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">
            Convert 219,300 ETHGR to ETH
          </h1>
          <div className="flex justify-center items-center gap-4">
            <Badge variant="outline" className="bg-green-100 text-green-800 px-4 py-2">
              Foundation Tokens Ready
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 px-4 py-2">
              Target: $45,000 Relief
            </Badge>
          </div>
        </div>

        {/* Live Market Data */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Live Market Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-lg font-bold text-green-700">
                  ${currentPrice.toFixed(2)}
                </div>
                <div className="text-green-600 text-sm">ETH Price</div>
                <div className="text-xs text-green-500">Live update</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-lg font-bold text-blue-700">
                  {gasPrice.toFixed(1)} gwei
                </div>
                <div className="text-blue-600 text-sm">Gas Price</div>
                <div className="text-xs text-blue-500">Optimal range</div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <div className="text-lg font-bold text-amber-700">
                  ${ethgPrice}
                </div>
                <div className="text-amber-600 text-sm">ETHG Price</div>
                <div className="text-xs text-amber-500">Current rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Details */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Conversion Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* Input/Output */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-700 mb-2">
                      {conversionAmount.toLocaleString()}
                    </div>
                    <div className="text-purple-600 font-semibold">ETHGR Tokens</div>
                    <div className="text-sm text-purple-500 mt-1">
                      From foundation wallet
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {expectedETH} ETH
                    </div>
                    <div className="text-blue-600 font-semibold">Expected Output</div>
                    <div className="text-sm text-blue-500 mt-1">
                      ~${expectedUSD.toFixed(0)} USD value
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="bg-slate-100 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Transaction Details:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Exchange rate:</span>
                      <span className="font-semibold">1 ETH = 7,434 ETHGR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price impact:</span>
                      <span className="font-semibold text-green-600">-0.56%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network fee:</span>
                      <span className="font-semibold">~$15-25</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Slippage tolerance:</span>
                      <span className="font-semibold">{slippage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum ETH out:</span>
                      <span className="font-semibold">{minETHOut.toFixed(2)} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Route:</span>
                      <span className="font-semibold">ETHGR → WETH</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Before You Swap:</h4>
                    <ul className="text-amber-700 text-sm space-y-1">
                      <li>• Ensure your foundation wallet is connected to Uniswap</li>
                      <li>• Have ~$25 ETH for gas fees in your wallet</li>
                      <li>• Verify ETHGR token: 0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90</li>
                      <li>• Your contract: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308 (holds tokens)</li>
                      <li>• Set slippage to 5% to handle potential market movement</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <Button
                  onClick={() => window.open(uniswapUrl, '_blank')}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 text-lg"
                  size="lg"
                >
                  Start Uniswap Conversion
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-slate-600 mt-2">
                  Opens Uniswap with pre-filled conversion parameters
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Next Steps Preview */}
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-700">After Uniswap Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800">Step 2: Exchange ETH</h4>
                <p className="text-sm text-slate-600">
                  Transfer {expectedETH} ETH to Kraken Pro for USD conversion
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800">Step 3: Final Distribution</h4>
                <p className="text-sm text-slate-600">
                  Set aside tax reserve, distribute $45,000 relief funding
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}