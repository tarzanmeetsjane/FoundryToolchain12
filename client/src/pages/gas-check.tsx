import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function GasCheck() {
  const TARGET_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  const { data: walletData, isLoading, refetch } = useQuery({
    queryKey: ['/api/wallet/security', TARGET_WALLET],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/security/${TARGET_WALLET}`);
      if (!response.ok) throw new Error('Failed to fetch wallet data');
      return response.json();
    }
  });

  const ethBalance = walletData?.balances?.find((b: any) => 
    b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );
  const ethAmount = ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;
  const ethValueUSD = ethAmount * 2500; // Approximate ETH price

  // Gas cost estimation
  const gasLimit = 500000; // createPair gas limit
  const gasPrice = 20; // 20 Gwei
  const gasCostETH = (gasLimit * gasPrice) / 1e9;
  const gasCostUSD = gasCostETH * 2500;

  const hasSufficientGas = ethAmount >= gasCostETH;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⛽</div>
        <h1 className="text-4xl font-bold">GAS BALANCE CHECK</h1>
        <p className="text-xl text-muted-foreground">
          Verify if your ETH purchase is sufficient for createPair execution
        </p>
      </div>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Current Wallet Balance
          </CardTitle>
          <CardDescription>
            Your wallet: {TARGET_WALLET.slice(0, 10)}...{TARGET_WALLET.slice(-8)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <div>Checking balance...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{ethAmount.toFixed(6)}</div>
                <div className="text-sm text-muted-foreground">ETH Balance</div>
                <div className="text-xs text-muted-foreground">${ethValueUSD.toFixed(2)} USD</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{gasCostETH.toFixed(6)}</div>
                <div className="text-sm text-muted-foreground">Required Gas</div>
                <div className="text-xs text-muted-foreground">${gasCostUSD.toFixed(2)} USD</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {hasSufficientGas ? "✓" : "✗"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {hasSufficientGas ? "Sufficient" : "Insufficient"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {hasSufficientGas ? "Ready to execute" : "Need more ETH"}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Balance
            </Button>
          </div>
        </CardContent>
      </Card>

      {!isLoading && (
        <>
          {hasSufficientGas ? (
            <Card className="border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Ready for Execution
                </CardTitle>
                <CardDescription>
                  You have sufficient ETH to execute createPair
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Success!</strong> Your ETH balance ({ethAmount.toFixed(6)} ETH) is sufficient for gas fees ({gasCostETH.toFixed(6)} ETH required).
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-bold mb-2">tokenA (ETHG)</div>
                    <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                      0xd9145CCE52D386f254917e481eB44e9943F39138
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => copyText("0xd9145CCE52D386f254917e481eB44e9943F39138")}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm font-bold mb-2">tokenB (ETHGR)</div>
                    <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                      0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => copyText("0xfA7b8c553C48C56ec7027d26ae95b029a2abF247")}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Execute createPair on Etherscan
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Connect your wallet, find createPair function, paste both token addresses
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Insufficient Gas
                </CardTitle>
                <CardDescription>
                  You need more ETH for transaction execution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-500 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Need More ETH:</strong> Current balance ({ethAmount.toFixed(6)} ETH) is below required gas fees ({gasCostETH.toFixed(6)} ETH).
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      {(gasCostETH - ethAmount).toFixed(6)}
                    </div>
                    <div className="text-sm text-muted-foreground">Additional ETH Needed</div>
                    <div className="text-xs text-muted-foreground">
                      ~${((gasCostETH - ethAmount) * 2500).toFixed(2)} USD
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      ${((gasCostETH - ethAmount) * 2500 + 5).toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Recommended Purchase</div>
                    <div className="text-xs text-muted-foreground">
                      Includes safety buffer
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <Button
                    size="lg"
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => window.open('https://www.coinbase.com/price/ethereum', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buy More ETH on Coinbase
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Purchase ${((gasCostETH - ethAmount) * 2500 + 5).toFixed(0)} worth of ETH to ensure sufficient gas
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Gas Cost Breakdown</CardTitle>
          <CardDescription>
            Understanding transaction costs for createPair
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Gas Limit</div>
              <div className="text-lg font-bold">{gasLimit.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Units</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Gas Price</div>
              <div className="text-lg font-bold">{gasPrice}</div>
              <div className="text-xs text-muted-foreground">Gwei</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Total Cost</div>
              <div className="text-lg font-bold">{gasCostETH.toFixed(6)}</div>
              <div className="text-xs text-muted-foreground">ETH</div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Gas prices fluctuate based on network congestion. This estimate uses moderate gas prices for reliable execution.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}