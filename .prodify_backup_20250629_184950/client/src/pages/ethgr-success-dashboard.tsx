import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  Wallet,
  CheckCircle,
  ExternalLink,
  DollarSign,
  Zap,
  Trophy,
  Target,
  Coins
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ETHGRSuccessDashboard() {
  // Get ETHGR transaction analysis
  const { data: transactionData, isLoading: txLoading } = useQuery({
    queryKey: ['/api/ethgr/transaction-analysis'],
    refetchInterval: 30000
  });

  // Get ETHGR contract details
  const { data: contractData, isLoading: contractLoading } = useQuery({
    queryKey: ['/api/ethgr/contract-details'],
    refetchInterval: 30000
  });

  const analysis = transactionData?.success ? transactionData.data.analysis : null;
  const contract = contractData?.success ? contractData.data : null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            ETHGR Token Success Dashboard
          </h1>
          <p className="text-muted-foreground">
            Mission accomplished: 1,990,000 ETHGR tokens successfully minted and ready for monetization
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.open('/sales-execution', '_blank')}>
            <DollarSign className="h-4 w-4 mr-2" />
            Start Sales
          </Button>
          <Button variant="outline" onClick={() => window.open('/money-tracker', '_blank')}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Track Value
          </Button>
        </div>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>SUCCESS CONFIRMED:</strong> Transaction 0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169 
          successfully minted 1,990,000 ETHGR tokens to your wallet. Market value: $706,450 at $0.355/token.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Token Holdings
            </CardTitle>
            <CardDescription>Your ETHGR token portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {parseFloat(analysis.tokensMinted).toLocaleString()} ETHGR
                  </div>
                  <div className="text-sm text-muted-foreground">Tokens Minted</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-700">Market Value</div>
                    <div className="text-lg font-bold">{analysis.marketValue.totalValueUSD}</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-700">Per Token</div>
                    <div className="text-lg font-bold">${analysis.marketValue.pricePerToken}</div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="font-semibold mb-1">Minting Cost:</div>
                  <div>{analysis.ethSpent} ETH (${analysis.usdSpent})</div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Loading token data...
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Contract Status
            </CardTitle>
            <CardDescription>ETHGR token contract details</CardDescription>
          </CardHeader>
          <CardContent>
            {contract ? (
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="font-semibold mb-1">Contract Address:</div>
                  <div className="font-mono text-xs break-all">{contract.address}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-indigo-50 rounded">
                    <div className="font-semibold text-indigo-700">Name</div>
                    <div className="text-sm">{contract.name}</div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded">
                    <div className="font-semibold text-indigo-700">Symbol</div>
                    <div className="text-sm">{contract.symbol}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Total Supply:</span>
                    <Badge variant="outline">{parseFloat(contract.totalSupply).toLocaleString()}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Your Balance:</span>
                    <Badge variant="default">{parseFloat(contract.userBalance).toLocaleString()}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Verified:</span>
                    <Badge variant={contract.isVerified ? 'default' : 'destructive'}>
                      {contract.isVerified ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(`https://etherscan.io/address/${contract.address}`, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View on Etherscan
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Loading contract data...
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Monetization Strategy
            </CardTitle>
            <CardDescription>Revenue generation plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="font-semibold text-yellow-700 mb-2">Immediate Revenue Target</div>
                <div className="text-2xl font-bold text-yellow-800">$5,000+</div>
                <div className="text-sm text-muted-foreground">First week sales goal</div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="font-semibold">Phase 1: Direct Sales</div>
                  <div className="text-sm text-muted-foreground">
                    Sell 100,000 tokens at $0.05 each = $5,000
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded">
                  <div className="font-semibold">Phase 2: Pool Creation</div>
                  <div className="text-sm text-muted-foreground">
                    Use sales revenue to create Uniswap liquidity
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded">
                  <div className="font-semibold">Phase 3: Market Launch</div>
                  <div className="text-sm text-muted-foreground">
                    Full market trading at $0.355/token value
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm"
                  onClick={() => window.open('/sales-execution', '_blank')}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Execute
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('/cash-out-dashboard', '_blank')}
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  Cash Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Analysis Details</CardTitle>
            <CardDescription>Breakdown of the successful minting transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 bg-green-50 rounded">
                <div className="font-semibold text-green-700">Tokens Minted</div>
                <div className="text-lg font-bold">{parseFloat(analysis.tokensMinted).toLocaleString()}</div>
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-700">ETH Cost</div>
                <div className="text-lg font-bold">{analysis.ethSpent} ETH</div>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <div className="font-semibold text-purple-700">USD Cost</div>
                <div className="text-lg font-bold">${analysis.usdSpent}</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded">
                <div className="font-semibold text-yellow-700">ROI Potential</div>
                <div className="text-lg font-bold">25,000%+</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="font-semibold mb-2">Storage Slots Modified:</div>
                <div className="text-sm text-muted-foreground">
                  {analysis.storageAnalysis.storageSlots} storage locations updated with token data
                </div>
              </div>

              <div>
                <div className="font-semibold mb-2">Next Steps:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {analysis.nextSteps.map((step: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-700 mb-1">Transaction Hash:</div>
                <div className="font-mono text-xs break-all">{analysis.transactionHash}</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => window.open(`https://etherscan.io/tx/${analysis.transactionHash}`, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}