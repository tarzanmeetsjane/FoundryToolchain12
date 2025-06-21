import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wallet,
  Code,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function RemixWalletInvestigation() {
  const [investigating, setInvestigating] = useState(false);

  // Get Remix wallet analysis
  const { data: remixData, isLoading, refetch } = useQuery({
    queryKey: ['/api/eth-recovery/remix-wallet-analysis'],
    refetchInterval: false
  });

  const remixWallet = "0xc46eB37677360EfDc011F4097621F15b792fa630";
  const walletData = remixData?.success ? remixData.data : null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">37 ETH Remix Wallet Investigation</h1>
          <p className="text-muted-foreground">
            Analyzing wallet where 37 ETH was last seen during contract deployment
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => refetch()} disabled={isLoading}>
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? "Analyzing..." : "Refresh Analysis"}
          </Button>
        </div>
      </div>

      <Alert className="border-yellow-500 bg-yellow-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>CRITICAL LEAD:</strong> User remembers seeing 37 ETH in bottom left of Remix IDE after contract deployment.
          This wallet may hold the key to recovering the trapped funds.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Remix Wallet Analysis
          </CardTitle>
          <CardDescription>
            Wallet: {remixWallet}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 animate-spin" />
              Analyzing wallet transactions and contract deployments...
            </div>
          )}

          {walletData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-700">Current Balance</div>
                  <div className="text-2xl font-bold">{walletData.currentBalance.toFixed(6)} ETH</div>
                  <div className="text-sm text-muted-foreground">${walletData.balanceUSD.toFixed(2)}</div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-700">Contract Deployments</div>
                  <div className="text-2xl font-bold">{walletData.deploymentTransactions}</div>
                  <div className="text-sm text-muted-foreground">Total deployments</div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-700">Large Transactions</div>
                  <div className="text-2xl font-bold">{walletData.largeTransactions}</div>
                  <div className="text-sm text-muted-foreground">Over 10 ETH</div>
                </div>
              </div>

              {walletData.currentBalance > 30 && (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>MAJOR DISCOVERY:</strong> This wallet contains {walletData.currentBalance.toFixed(6)} ETH! 
                    This could be your missing 37 ETH or a significant portion of it.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Recent Contract Deployments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {walletData.recentDeployments.length > 0 ? (
                      <div className="space-y-3">
                        {walletData.recentDeployments.slice(0, 5).map((tx: any, index: number) => (
                          <div key={index} className="p-3 bg-gray-50 rounded">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-mono text-xs">{tx.hash}</div>
                                <div className="text-sm text-muted-foreground">
                                  Block: {tx.blockNumber} | Gas: {parseInt(tx.gasUsed).toLocaleString()}
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        No contract deployments found
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Large ETH Movements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {walletData.largeTxHistory.length > 0 ? (
                      <div className="space-y-3">
                        {walletData.largeTxHistory.slice(0, 5).map((tx: any, index: number) => (
                          <div key={index} className="p-3 bg-gray-50 rounded">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-semibold">
                                  {parseFloat(tx.value / 1e18).toFixed(4)} ETH
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {tx.from === remixWallet.toLowerCase() ? 'Sent' : 'Received'}
                                </div>
                                <div className="font-mono text-xs">{tx.hash}</div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        No large transactions found
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold mb-2">Analysis Summary:</div>
                <div className="text-sm">{walletData.analysis}</div>
              </div>
            </div>
          )}

          {remixData && !remixData.success && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Failed to analyze Remix wallet: {remixData.error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recovery Strategy</CardTitle>
          <CardDescription>Next steps based on wallet analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold text-blue-700 mb-2">If ETH Found in This Wallet:</div>
              <div className="text-sm space-y-1">
                <div>• Check if you have private key access</div>
                <div>• Verify wallet control in MetaMask</div>
                <div>• Execute immediate transfer to secure wallet</div>
                <div>• Document recovery for legal purposes</div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              <div className="font-semibold text-yellow-700 mb-2">If ETH Moved from This Wallet:</div>
              <div className="text-sm space-y-1">
                <div>• Trace transaction history to destination</div>
                <div>• Check for contract interactions</div>
                <div>• Analyze gas usage patterns</div>
                <div>• Look for reversal opportunities</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
              <Button 
                variant="outline" 
                className="h-auto p-3 flex-col gap-1"
                onClick={() => window.open(`https://etherscan.io/address/${remixWallet}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                <span>View on Etherscan</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto p-3 flex-col gap-1"
                onClick={() => window.open('/eth-recovery-analyzer', '_blank')}
              >
                <Search className="h-4 w-4" />
                <span>Recovery Tools</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto p-3 flex-col gap-1"
                onClick={() => window.open('/sales-execution', '_blank')}
              >
                <DollarSign className="h-4 w-4" />
                <span>Continue Sales</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}