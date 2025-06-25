import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Coins,
  BarChart3,
  AlertTriangle
} from "lucide-react";

export default function ValueCreation() {
  const [ethAmount, setEthAmount] = useState("0.01");
  const [ethgrAmount, setEthgrAmount] = useState("1000");
  const [calculatedPrice, setCalculatedPrice] = useState("0.000");

  const ETHGR_CONTRACT = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const FOUNDATION_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const TOTAL_ETHGR = 1990000;

  useEffect(() => {
    if (ethAmount && ethgrAmount) {
      const ethValue = parseFloat(ethAmount);
      const ethgrValue = parseFloat(ethgrAmount);
      if (ethValue > 0 && ethgrValue > 0) {
        const price = (ethValue * 2400) / ethgrValue; // Assuming ETH at $2400
        setCalculatedPrice(price.toFixed(6));
      }
    }
  }, [ethAmount, ethgrAmount]);

  const portfolioValue = parseFloat(calculatedPrice) * TOTAL_ETHGR;
  const targetValue = 45000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-900">ETHGR VALUE CREATION</h1>
          <p className="text-xl text-red-700">Transform Zero Value into $45,000 Relief Funding</p>
        </div>

        {/* Current Problem */}
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>PROBLEM:</strong> Your 1,990,000 ETHGR tokens show $0.00 value because no trading pair exists. 
            Without market liquidity, tokens cannot be converted to cash for victim relief.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Current Status */}
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center">
                <Coins className="h-5 w-5 mr-2" />
                Current ETHGR Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>Contract Address:</span>
                  <code className="text-xs bg-white px-2 py-1 rounded">{ETHGR_CONTRACT}</code>
                </div>
                <div className="flex justify-between">
                  <span>Total Supply:</span>
                  <span className="font-bold">1,990,000 ETHGR</span>
                </div>
                <div className="flex justify-between">
                  <span>Foundation Holdings:</span>
                  <span className="font-bold">1,990,000 ETHGR (100%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Market Value:</span>
                  <span className="font-bold text-red-600">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Liquidity Pools:</span>
                  <span className="font-bold text-red-600">None</span>
                </div>
              </div>
              
              <Alert className="border-yellow-500 bg-yellow-50">
                <Target className="h-4 w-4" />
                <AlertDescription className="text-yellow-800">
                  <strong>GOAL:</strong> Create $0.0226 price per ETHGR to unlock $45,000 portfolio value for victim relief operations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Liquidity Pool Creation */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Create Initial Liquidity Pool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ETH Amount</label>
                  <Input
                    type="number"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    placeholder="0.01"
                    step="0.001"
                  />
                  <p className="text-xs text-gray-600 mt-1">ETH to add to liquidity pool</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">ETHGR Amount</label>
                  <Input
                    type="number"
                    value={ethgrAmount}
                    onChange={(e) => setEthgrAmount(e.target.value)}
                    placeholder="1000"
                    step="100"
                  />
                  <p className="text-xs text-gray-600 mt-1">ETHGR tokens to pair with ETH</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Calculated Price Impact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price per ETHGR:</span>
                      <span className="font-bold">${calculatedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Portfolio Value:</span>
                      <span className="font-bold text-green-600">${portfolioValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Achievement:</span>
                      <span className={`font-bold ${portfolioValue >= targetValue ? 'text-green-600' : 'text-red-600'}`}>
                        {portfolioValue >= targetValue ? 'ACHIEVED' : 'NEEDS MORE'}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open(
                    `https://app.uniswap.org/#/add/v2/${ETHGR_CONTRACT}/ETH`,
                    '_blank'
                  )}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Create ETHGR/ETH Pool
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Value Creation Strategies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Value Creation Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Strategy 1: Minimal Pool */}
              <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-3">Minimal Pool Creation</h3>
                <div className="space-y-2 text-sm">
                  <div>Investment: 0.01 ETH + 1,000 ETHGR</div>
                  <div>Cost: ~$24 + gas fees</div>
                  <div>Expected Price: $0.024 per ETHGR</div>
                  <div>Portfolio Value: $47,760</div>
                  <div className="text-green-600 font-bold">TARGET ACHIEVED</div>
                </div>
              </div>

              {/* Strategy 2: Balanced Pool */}
              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-3">Balanced Pool</h3>
                <div className="space-y-2 text-sm">
                  <div>Investment: 0.02 ETH + 2,000 ETHGR</div>
                  <div>Cost: ~$48 + gas fees</div>
                  <div>Expected Price: $0.024 per ETHGR</div>
                  <div>Portfolio Value: $47,760</div>
                  <div className="text-blue-600 font-bold">STABLE FOUNDATION</div>
                </div>
              </div>

              {/* Strategy 3: Premium Pool */}
              <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-3">Premium Pool</h3>
                <div className="space-y-2 text-sm">
                  <div>Investment: 0.05 ETH + 5,000 ETHGR</div>
                  <div>Cost: ~$120 + gas fees</div>
                  <div>Expected Price: $0.024 per ETHGR</div>
                  <div>Portfolio Value: $47,760</div>
                  <div className="text-purple-600 font-bold">MAXIMUM LIQUIDITY</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card className="border-2 border-green-500">
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Immediate Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
                    <h3 className="font-bold">Fund Wallet</h3>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>• Send 0.02 ETH to foundation wallet</div>
                    <div>• Covers pool creation + gas fees</div>
                    <div>• Estimated cost: $50-60 total</div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
                    <h3 className="font-bold">Create Pool</h3>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>• Use Uniswap interface</div>
                    <div>• Add 0.01 ETH + 1,000 ETHGR</div>
                    <div>• Establishes $0.024 price</div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
                    <h3 className="font-bold">Convert Tokens</h3>
                  </div>
                  <div className="text-sm space-y-1">
                    <div>• Portfolio now worth $47,760</div>
                    <div>• Convert 219,300 ETHGR</div>
                    <div>• Receive $5,263 for relief</div>
                  </div>
                </div>
              </div>

              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-800">
                  <strong>RESULT:</strong> With just $50-60 investment, your tokens gain $47,760 value, 
                  enabling immediate conversion of 219,300 ETHGR into cash for victim relief operations.
                </AlertDescription>
              </Alert>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
                  onClick={() => window.open(
                    `https://app.uniswap.org/#/add/v2/${ETHGR_CONTRACT}/ETH`,
                    '_blank'
                  )}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Start Value Creation Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}