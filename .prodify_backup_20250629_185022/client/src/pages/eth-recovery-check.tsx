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
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ETHRecoveryCheck() {
  const [checkingWallet, setCheckingWallet] = useState("");
  
  // Your known wallets from the contract recovery operation
  const KNOWN_WALLETS = [
    "0x058C8FE01E5c9eaC6ee19e6673673B549B368843", // Primary execution wallet
    "0xc46eB37677360EfDc011F4097621F15b792fa630", // Secondary wallet with USDC/OpenSea activity
    "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247", // ETHGR Recovery Contract
    "0xd9145CCE52D386f254917e481eB44e9943F39138", // Original ETHG Contract (honeypot)
  ];

  const { data: allWalletData, isLoading, refetch } = useQuery({
    queryKey: ['/api/wallet/multi-check'],
    queryFn: async () => {
      const results = await Promise.all(
        KNOWN_WALLETS.map(async (wallet) => {
          try {
            const response = await fetch(`/api/wallet/security/${wallet}`);
            const data = await response.json();
            return { wallet, data, success: true };
          } catch (error) {
            return { wallet, data: null, success: false };
          }
        })
      );
      return results;
    }
  });

  const { data: customWalletData, refetch: refetchCustom } = useQuery({
    queryKey: ['/api/wallet/security', checkingWallet],
    queryFn: async () => {
      if (!checkingWallet) return null;
      const response = await fetch(`/api/wallet/security/${checkingWallet}`);
      if (!response.ok) throw new Error('Failed to fetch wallet data');
      return response.json();
    },
    enabled: !!checkingWallet
  });

  const getTotalETH = (walletData: any) => {
    if (!walletData?.balances) return 0;
    const ethBalance = walletData.balances.find((b: any) => 
      b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    return ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;
  };

  const totalETHAcrossWallets = allWalletData?.reduce((total, wallet) => {
    return total + (wallet.success ? getTotalETH(wallet.data) : 0);
  }, 0) || 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔍</div>
        <h1 className="text-4xl font-bold">ETH RECOVERY CHECK</h1>
        <p className="text-xl text-muted-foreground">
          Finding your missing 37 ETH - where did it go?
        </p>
      </div>

      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>CONTRACT RECOVERY ETH MISSING:</strong> The 37 ETH from your contract takeover/recovery operation 
          has disappeared! This was perfect liquidity for ETHGR pool. Need to trace where it went after recovery.
        </AlertDescription>
      </Alert>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Multi-Wallet ETH Search
          </CardTitle>
          <CardDescription>
            Checking all your known wallets for the missing 37 ETH
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <div>Searching all wallets...</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{totalETHAcrossWallets.toFixed(6)}</div>
                  <div className="text-sm text-muted-foreground">Total ETH Found</div>
                  <div className="text-xs text-muted-foreground">${(totalETHAcrossWallets * 2500).toFixed(2)} USD</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">37.000</div>
                  <div className="text-sm text-muted-foreground">Missing ETH</div>
                  <div className="text-xs text-muted-foreground">$92,500 USD</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{(37 - totalETHAcrossWallets).toFixed(6)}</div>
                  <div className="text-sm text-muted-foreground">ETH Gap</div>
                  <div className="text-xs text-muted-foreground">Still need to find</div>
                </div>
              </div>

              <div className="space-y-3">
                {allWalletData?.map((wallet, index) => {
                  const ethAmount = wallet.success ? getTotalETH(wallet.data) : 0;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Wallet className="h-4 w-4" />
                        <div>
                          <div className="font-mono text-xs">{wallet.wallet.slice(0, 10)}...{wallet.wallet.slice(-8)}</div>
                          <div className="text-xs text-muted-foreground">
                            {wallet.success ? "Connected" : "Failed to connect"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{ethAmount.toFixed(6)} ETH</div>
                        <div className="text-xs text-muted-foreground">${(ethAmount * 2500).toFixed(2)}</div>
                      </div>
                    </div>
                  );
                })}
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
              Refresh All Wallets
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Wallet Check</CardTitle>
          <CardDescription>
            Check any other wallet address where the 37 ETH might be
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter wallet address to check..."
              value={checkingWallet}
              onChange={(e) => setCheckingWallet(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <Button onClick={() => refetchCustom()}>
              <Search className="h-4 w-4 mr-2" />
              Check
            </Button>
          </div>

          {customWalletData && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold">{getTotalETH(customWalletData).toFixed(6)} ETH</div>
              <div className="text-sm text-muted-foreground">
                ${(getTotalETH(customWalletData) * 2500).toFixed(2)} USD
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
            Recovery Strategy
          </CardTitle>
          <CardDescription>
            If we find the 37 ETH, we can create a massive ETHGR/ETH pool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm font-bold mb-2">With 37 ETH Found:</div>
              <div className="text-lg font-bold text-green-600">$92,500 ETH</div>
              <div className="text-lg font-bold text-purple-600">+ 1,990,000 ETHGR</div>
              <div className="text-sm text-muted-foreground">= Massive liquidity pool</div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Current Situation:</div>
              <div className="text-lg font-bold text-orange-600">$36 ETH</div>
              <div className="text-lg font-bold text-purple-600">+ 1,990,000 ETHGR</div>
              <div className="text-sm text-muted-foreground">= Minimal liquidity</div>
            </div>
          </div>

          <Alert className="border-blue-500 bg-blue-50">
            <AlertDescription>
              <strong>PRIORITY:</strong> Finding that 37 ETH is crucial. It would create a $92,500 + ETHGR pool 
              instead of the current $36 + ETHGR minimal pool. Let's check transaction history to trace where it went.
            </AlertDescription>
          </Alert>

          <div className="text-center space-y-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open('https://etherscan.io/txs', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Check Transaction History on Etherscan
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Search for large ETH transfers from your wallets in recent days
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}