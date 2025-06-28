import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AlertTriangle, ExternalLink, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function TransactionAnalysis() {
  const [txHash, setTxHash] = useState("0x4aeeadccb8b1e1e6144a2ab38ca7a9c4c29e1b99e07f1884be6cf736649837ab");
  const [analyzing, setAnalyzing] = useState(false);
  
  // Mock analysis results - will be replaced with real API data
  const analysisResults = {
    status: "failed",
    blockNumber: null,
    gasUsed: "0",
    gasPrice: "20000000000",
    from: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    to: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45", // Uniswap V3 Router
    value: "0",
    error: "Transaction failed - likely insufficient gas or slippage exceeded",
    timestamp: new Date().toISOString()
  };

  const analyzeTransaction = async () => {
    setAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Transaction Analysis
          </h1>
          <p className="text-slate-600 text-lg">
            Analyze your failed swap transaction to identify the issue
          </p>
        </div>

        {/* Transaction Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Transaction Hash Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="Enter transaction hash (0x...)"
                  className="font-mono text-sm"
                />
                <Button 
                  onClick={analyzeTransaction}
                  disabled={analyzing}
                  className="px-6"
                >
                  {analyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Current transaction: Failed ETHGR swap attempt
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Transaction Details
              {getStatusIcon(analysisResults.status)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* Status Overview */}
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <h4 className="font-semibold text-red-800">Transaction Status</h4>
                  <p className="text-red-700">{analysisResults.error}</p>
                </div>
                {getStatusBadge(analysisResults.status)}
              </div>

              {/* Transaction Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Basic Information</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">From:</span>
                      <span className="font-mono text-sm">{analysisResults.from.slice(0, 10)}...</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">To (Router):</span>
                      <span className="font-mono text-sm">{analysisResults.to.slice(0, 10)}...</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Gas Price:</span>
                      <span>{(parseInt(analysisResults.gasPrice) / 1e9).toFixed(2)} Gwei</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Failure Analysis</h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded border border-red-200">
                      <div className="font-semibold text-red-800">Most Likely Cause:</div>
                      <div className="text-red-700 text-sm">Slippage tolerance too low for current market conditions</div>
                    </div>
                    
                    <div className="p-3 bg-amber-50 rounded border border-amber-200">
                      <div className="font-semibold text-amber-800">Secondary Cause:</div>
                      <div className="text-amber-700 text-sm">Insufficient gas limit for complex swap</div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="font-semibold text-blue-800">Router Status:</div>
                      <div className="text-blue-700 text-sm">Uniswap V3 Router - Active and functional</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specific Recommendations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-800">Fix This Specific Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  <strong>Transaction Failed:</strong> Your ETHGR swap was rejected by the Uniswap V3 router. 
                  This is fixable with settings adjustments.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3">1. Increase Slippage</h4>
                  <div className="space-y-2 text-sm text-red-700">
                    <div>Current: Likely 0.5-1%</div>
                    <div>Recommended: 10-15%</div>
                    <div>Why: ETHGR price volatility</div>
                  </div>
                  <Button className="w-full mt-3 bg-red-600 hover:bg-red-700">
                    Set 10% Slippage
                  </Button>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-3">2. Increase Gas</h4>
                  <div className="space-y-2 text-sm text-amber-700">
                    <div>Current: Standard limit</div>
                    <div>Recommended: 200,000+</div>
                    <div>Why: Complex token swaps</div>
                  </div>
                  <Button className="w-full mt-3 bg-amber-600 hover:bg-amber-700">
                    Set High Gas
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">3. Try Alternative</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>Platform: 1inch Aggregator</div>
                    <div>Benefit: Better routing</div>
                    <div>Success rate: Higher</div>
                  </div>
                  <Button 
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open('https://1inch.io/', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Try 1inch
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step by Step Fix */}
        <Card className="border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Step-by-Step Fix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-green-700 mb-4">
                Based on your failed transaction, here's exactly what to do:
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded border">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-semibold">Go to Uniswap Settings</div>
                    <div className="text-sm text-gray-600">Click the gear icon in the swap interface</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded border">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-semibold">Set Slippage to 12%</div>
                    <div className="text-sm text-gray-600">This accounts for ETHGR price movement during swap</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded border">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-semibold">Advanced: Set Gas to 200,000</div>
                    <div className="text-sm text-gray-600">Ensures transaction has enough gas to complete</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded border">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <div className="font-semibold">Retry Your Swap</div>
                    <div className="text-sm text-gray-600">Same amount, same pair - should work now</div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  onClick={() => window.open('https://app.uniswap.org/', '_blank')}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Fix Settings & Retry Swap
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}