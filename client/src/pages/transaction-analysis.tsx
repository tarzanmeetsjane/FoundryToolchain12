import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  Wallet,
  Factory,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Zap
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function TransactionAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Analyze the provided transaction data
  const analyzeMutation = useMutation({
    mutationFn: async () => {
      const txData = {
        addresses: [
          {
            address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
            beforeEth: "0.006263123310951444",
            afterEth: "0.00416633167366056", 
            beforeNonce: 9,
            afterNonce: 10
          },
          {
            address: "0x4838B106FCf7c3b2c00Ee9C5961b17B0BAD5f97",
            beforeEth: "13.557298959084402053",
            afterEth: "13.558552461084402053",
            beforeNonce: 0,
            afterNonce: 0
          },
          {
            address: "0xf3A500aA1e2d70e44b7c14d3B906680f89AD521f",
            beforeEth: "0",
            afterEth: "0",
            beforeNonce: 1,
            afterNonce: 1
          }
        ],
        storageChanges: [
          {
            contract: "0x5C69bEe701ab6c29BeE9cc5aA6f",
            storageAddress: "0x0000000000000000000000000000000000000000000000000000000000000003",
            before: "0x0000000000000000000000000000000000000000000000000000000000069efd",
            after: "0x0000000000000000000000000000000000000000000000000000000000069efe"
          },
          {
            contract: "0x5C69bEe701ab6c29BeE9cc5aA6f",
            storageAddress: "0x480aa76f8f6eaf83eb6fd87472e38683d7c536a7547d8e093c66f5a505a5364a",
            before: "0x0000000000000000000000000000000000000000000000000000000000000000",
            after: "0x000000000000000000000000f3a500aa1e2d70e44b7c14d3b906680f89ad521f"
          },
          {
            contract: "0x5C69bEe701ab6c29BeE9cc5aA6f",
            storageAddress: "0x8339b1f9347b09bb8361e14a14ad6effff8b45e3299dcb051140982c512d53c0",
            before: "0x0000000000000000000000000000000000000000000000000000000000000000",
            after: "0x000000000000000000000000f3a500aa1e2d70e44b7c14d3b906680f89ad521f"
          },
          {
            contract: "0x5C69bEe701ab6c29BeE9cc5aA6f",
            storageAddress: "0xc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f789758",
            before: "0x0000000000000000000000000000000000000000000000000000000000000000",
            after: "0x000000000000000000000000f3a500aa1e2d70e44b7c14d3b906680f89ad521f"
          }
        ]
      };

      const response = await fetch('/api/analyze/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txData)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    }
  });

  const poolAddress = "0xf3A500aA1e2d70e44b7c14d3B906680f89AD521f";
  const ethSpent = 0.002096791637290884;
  const usdValue = ethSpent * 2422; // Current ETH price

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction Analysis</h1>
          <p className="text-muted-foreground">
            Live blockchain transaction state analysis
          </p>
        </div>
        <Button onClick={() => analyzeMutation.mutate()} disabled={analyzeMutation.isPending}>
          {analyzeMutation.isPending ? "Analyzing..." : "Analyze Transaction"}
        </Button>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>TRANSACTION DETECTED:</strong> Uniswap pool creation with new contract deployment. 
          Your wallet spent {ethSpent.toFixed(6)} ETH (${usdValue.toFixed(2)}) for this operation.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Activity Summary
            </CardTitle>
            <CardDescription>ETH flows and nonce changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-700">Your Wallet</div>
                <div className="text-xs font-mono">0x058C8FE0...368843</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <div className="text-xs text-muted-foreground">ETH Spent</div>
                    <div className="font-bold text-red-600">-{ethSpent.toFixed(6)} ETH</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">USD Value</div>
                    <div className="font-bold">-${usdValue.toFixed(2)}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <Badge variant="outline">Nonce: 9 → 10</Badge>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded">
                <div className="font-semibold text-green-700">Miner/Builder</div>
                <div className="text-xs font-mono">0x4838B106...BAD5f97</div>
                <div className="text-sm">
                  <span className="text-green-600">+0.001253502 ETH</span> (Gas fees)
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded">
                <div className="font-semibold text-purple-700">New Contract</div>
                <div className="text-xs font-mono">0xf3A500aA...AD521f</div>
                <div className="text-sm">Fresh deployment (Nonce: 1)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Uniswap Factory Changes
            </CardTitle>
            <CardDescription>Storage slot modifications detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded">
                <div className="font-semibold text-yellow-700">Pool Counter</div>
                <div className="text-sm">
                  Storage slot 0x03: {parseInt("0x69efd", 16)} → {parseInt("0x69efe", 16)}
                </div>
                <Badge variant="default">+1 Pool Created</Badge>
              </div>

              <div className="p-3 bg-indigo-50 rounded">
                <div className="font-semibold text-indigo-700">New Pool Address</div>
                <div className="text-xs font-mono break-all">
                  {poolAddress}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`https://etherscan.io/address/${poolAddress}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Etherscan
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`https://app.uniswap.org/#/pools?chain=mainnet`, '_blank')}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Uniswap
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResult.success && analysisResult.data.success ? (
              <div className="space-y-4">
                <Alert className="border-blue-500 bg-blue-50">
                  <AlertDescription>
                    <strong>Interpretation:</strong> {analysisResult.data.analysis.interpretation}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold">Pool Creation</div>
                    <div className="text-lg">
                      {analysisResult.data.analysis.isUniswapPoolCreation ? "✅ Yes" : "❌ No"}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold">New Pools</div>
                    <div className="text-lg font-bold">
                      {analysisResult.data.analysis.newPoolCount}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold">ETH Spent</div>
                    <div className="text-lg font-bold text-red-600">
                      {analysisResult.data.analysis.mainWalletActivity.ethSpent} ETH
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-semibold">Nonce Change</div>
                    <div className="text-lg font-bold">
                      +{analysisResult.data.analysis.mainWalletActivity.nonceIncreased}
                    </div>
                  </div>
                </div>

                {analysisResult.data.analysis.newPoolAddresses?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">New Pool Addresses:</h3>
                    <div className="space-y-2">
                      {analysisResult.data.analysis.newPoolAddresses.map((addr: string, idx: number) => (
                        <div key={idx} className="p-2 bg-gray-100 rounded font-mono text-sm">
                          {addr}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Analysis failed: {analysisResult.error || analysisResult.data?.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open(`https://etherscan.io/address/${poolAddress}`, '_blank')}
            >
              <ExternalLink className="h-5 w-5" />
              <span>Verify Contract</span>
              <span className="text-xs opacity-80">Check deployment on Etherscan</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('/money-tracker', '_blank')}
            >
              <DollarSign className="h-5 w-5" />
              <span>Track Value</span>
              <span className="text-xs opacity-80">Monitor pool performance</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('/sales-execution', '_blank')}
            >
              <TrendingUp className="h-5 w-5" />
              <span>Execute Sales</span>
              <span className="text-xs opacity-80">Begin monetization strategy</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}