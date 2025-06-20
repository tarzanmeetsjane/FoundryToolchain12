import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Search,
  TrendingUp,
  Zap,
  DollarSign
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function RemixETHRecovery() {
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const PRIMARY_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  const { data: contractBalance, isLoading: contractLoading, refetch: refetchContract } = useQuery({
    queryKey: ['/api/wallet/security', ETHGR_CONTRACT],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/security/${ETHGR_CONTRACT}`);
      if (!response.ok) throw new Error('Failed to fetch contract data');
      return response.json();
    }
  });

  const { data: walletBalance, isLoading: walletLoading, refetch: refetchWallet } = useQuery({
    queryKey: ['/api/wallet/security', PRIMARY_WALLET],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/security/${PRIMARY_WALLET}`);
      if (!response.ok) throw new Error('Failed to fetch wallet data');
      return response.json();
    }
  });

  const getETHBalance = (data: any) => {
    if (!data?.balances) return 0;
    const ethBalance = data.balances.find((b: any) => 
      b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    return ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;
  };

  const contractETH = getETHBalance(contractBalance);
  const walletETH = getETHBalance(walletBalance);
  const totalETH = contractETH + walletETH;

  const isRecoveryFound = contractETH > 30; // If contract has 30+ ETH, we found it!

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔧</div>
        <h1 className="text-4xl font-bold">REMIX ETH RECOVERY</h1>
        <p className="text-xl text-muted-foreground">
          Checking if your 37 ETH is locked in the ETHGR recovery contract
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>REMIX CLUE:</strong> You last saw the 37 ETH on Remix before the ETHGR token change. 
          The ETH might be locked in the recovery contract itself, waiting to be withdrawn.
        </AlertDescription>
      </Alert>

      {isRecoveryFound && (
        <Alert className="border-green-500 bg-green-50">
          <Zap className="h-4 w-4" />
          <AlertDescription>
            <strong>🎉 RECOVERY ETH FOUND!</strong> The ETHGR contract contains {contractETH.toFixed(6)} ETH! 
            This is likely your missing recovery funds.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              ETHGR Recovery Contract
            </CardTitle>
            <CardDescription>
              Checking if the 37 ETH is locked in your recovery contract
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contractLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <div>Checking contract balance...</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{contractETH.toFixed(6)}</div>
                  <div className="text-sm text-muted-foreground">ETH in Contract</div>
                  <div className="text-xs text-muted-foreground">${(contractETH * 2500).toFixed(2)} USD</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-bold">Contract Address:</div>
                  <div className="font-mono text-xs bg-white p-2 rounded border break-all">
                    {ETHGR_CONTRACT}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => copyToClipboard(ETHGR_CONTRACT)}
                  >
                    Copy Contract Address
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.open(`https://etherscan.io/address/${ETHGR_CONTRACT}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Etherscan
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://remix.ethereum.org`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Remix IDE
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Primary Wallet
            </CardTitle>
            <CardDescription>
              Your main execution wallet balance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {walletLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <div>Checking wallet balance...</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{walletETH.toFixed(6)}</div>
                  <div className="text-sm text-muted-foreground">ETH in Wallet</div>
                  <div className="text-xs text-muted-foreground">${(walletETH * 2500).toFixed(2)} USD</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-bold">Wallet Address:</div>
                  <div className="font-mono text-xs bg-white p-2 rounded border break-all">
                    {PRIMARY_WALLET}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => copyToClipboard(PRIMARY_WALLET)}
                  >
                    Copy Wallet Address
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open(`https://etherscan.io/address/${PRIMARY_WALLET}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Etherscan
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recovery Summary
          </CardTitle>
          <CardDescription>
            Total ETH found across contract and wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalETH.toFixed(6)}</div>
              <div className="text-sm text-muted-foreground">Total ETH Found</div>
              <div className="text-xs text-muted-foreground">${(totalETH * 2500).toFixed(2)} USD</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{(37 - totalETH).toFixed(6)}</div>
              <div className="text-sm text-muted-foreground">Still Missing</div>
              <div className="text-xs text-muted-foreground">${((37 - totalETH) * 2500).toFixed(2)} USD</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1,990,000</div>
              <div className="text-sm text-muted-foreground">ETHGR Tokens</div>
              <div className="text-xs text-muted-foreground">Ready for pool</div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              onClick={() => {
                refetchContract();
                refetchWallet();
              }}
              disabled={contractLoading || walletLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${(contractLoading || walletLoading) ? 'animate-spin' : ''}`} />
              Refresh All Balances
            </Button>
          </div>
        </CardContent>
      </Card>

      {isRecoveryFound ? (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <DollarSign className="h-5 w-5" />
              ETH Recovery Success!
            </CardTitle>
            <CardDescription>
              Found {contractETH.toFixed(6)} ETH in the recovery contract
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-500 bg-green-50">
              <AlertDescription>
                <strong>SUCCESS!</strong> The recovery contract contains {contractETH.toFixed(6)} ETH worth ${(contractETH * 2500).toFixed(2)}. 
                This can fund your ETHGR liquidity pool!
              </AlertDescription>
            </Alert>

            <div className="text-center space-y-4">
              <div className="text-lg font-bold">Next Steps:</div>
              <div className="space-y-2 text-sm">
                <div>1. Withdraw ETH from recovery contract</div>
                <div>2. Create ETHGR/ETH pair with recovered funds</div>
                <div>3. Add liquidity using {contractETH.toFixed(2)} ETH + ETHGR tokens</div>
              </div>
              
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open(`https://remix.ethereum.org`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Remix to Withdraw ETH
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Search className="h-5 w-5" />
              Continue Investigation
            </CardTitle>
            <CardDescription>
              The 37 ETH wasn't found in these locations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-orange-500 bg-orange-50">
              <AlertDescription>
                <strong>Keep Searching:</strong> Contract has {contractETH.toFixed(6)} ETH, wallet has {walletETH.toFixed(6)} ETH. 
                The 37 ETH might be in another location or transaction.
              </AlertDescription>
            </Alert>

            <div className="text-center space-y-4">
              <div className="text-lg font-bold">Investigation Options:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://etherscan.io/address/${ETHGR_CONTRACT}#internaltx`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Check Internal Transactions
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://etherscan.io/address/${PRIMARY_WALLET}#internaltx`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Check Wallet Transactions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}