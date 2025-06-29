import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Zap
} from "lucide-react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { useQuery } from "@tanstack/react-query";

export default function WalletConnectFirst() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  const expectedWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const isCorrectWallet = address?.toLowerCase() === expectedWallet.toLowerCase();

  const { data: walletData, isLoading } = useQuery({
    queryKey: ['/api/wallet/security', address],
    queryFn: async () => {
      if (!address) return null;
      const response = await fetch(`/api/wallet/security/${address}`);
      if (!response.ok) throw new Error('Failed to fetch wallet data');
      return response.json();
    },
    enabled: !!address
  });

  const getETHBalance = (data: any) => {
    if (!data?.balances) return 0;
    const ethBalance = data.balances.find((b: any) => 
      b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    return ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;
  };

  const ethBalance = getETHBalance(walletData);
  const hasSignificantETH = ethBalance > 30; // Check if 37 ETH is in this wallet

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔗</div>
        <h1 className="text-4xl font-bold">CONNECT WALLET FIRST</h1>
        <p className="text-xl text-muted-foreground">
          Connect your wallet to see the real 37 ETH balance and execute withdrawal
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>WALLET CONNECTION REQUIRED:</strong> We need to connect your wallet 
          (0x058C8FE...368843) to see the actual ETH balance and execute the emergencyWithdraw function.
        </AlertDescription>
      </Alert>

      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connection Status
          </CardTitle>
          <CardDescription>
            Current connection state and expected wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Connection Status:</div>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Connected</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-red-600">Not Connected</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Expected Wallet:</div>
              <div className="font-mono text-xs break-all">{expectedWallet}</div>
            </div>
          </div>

          {isConnected && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Currently Connected:</div>
                <div className="font-mono text-xs break-all">{address}</div>
                <div className="mt-2">
                  {isCorrectWallet ? (
                    <Badge className="bg-green-600">Correct Wallet</Badge>
                  ) : (
                    <Badge variant="destructive">Wrong Wallet</Badge>
                  )}
                </div>
              </div>

              {isCorrectWallet && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm font-bold mb-2">ETH Balance:</div>
                  {isLoading ? (
                    <div>Loading balance...</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-600">{ethBalance.toFixed(6)} ETH</div>
                      <div className="text-sm text-muted-foreground">${(ethBalance * 2500).toFixed(2)} USD</div>
                      {hasSignificantETH && (
                        <Badge className="bg-green-600">37 ETH Found!</Badge>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="text-center space-y-4">
            {!isConnected ? (
              <div className="space-y-2">
                <ConnectKitButton />
                <div className="text-sm text-muted-foreground">
                  Connect your wallet to proceed with ETH recovery
                </div>
              </div>
            ) : !isCorrectWallet ? (
              <div className="space-y-2">
                <Button 
                  variant="destructive"
                  onClick={() => disconnect()}
                >
                  Disconnect Wrong Wallet
                </Button>
                <div className="text-sm text-muted-foreground">
                  Connect the correct wallet: {expectedWallet.slice(0, 10)}...{expectedWallet.slice(-8)}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Badge className="bg-green-600 text-lg p-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Correct Wallet Connected
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Ready to execute emergencyWithdraw function
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isConnected && isCorrectWallet && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Zap className="h-5 w-5" />
              Ready for ETH Recovery
            </CardTitle>
            <CardDescription>
              Your wallet is connected - proceed with withdrawal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>WALLET CONNECTED:</strong> You can now see your real ETH balance and execute 
                the emergencyWithdraw function to recover the trapped funds.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.location.href = '/exact-withdrawal-recovery'}
              >
                <Zap className="h-4 w-4 mr-2" />
                Proceed to ETH Recovery
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247#writeContract', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Direct Etherscan Withdrawal
              </Button>
            </div>

            {hasSignificantETH && (
              <Alert className="border-blue-500 bg-blue-50">
                <AlertDescription>
                  <strong>37 ETH DETECTED!</strong> Your wallet shows {ethBalance.toFixed(6)} ETH. 
                  The recovery contract likely contains the additional funds.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Next Steps After Connection</CardTitle>
          <CardDescription>
            What happens once your wallet is properly connected
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div>1. Connect wallet {expectedWallet.slice(0, 10)}...{expectedWallet.slice(-8)}</div>
            <div>2. Verify real ETH balance (should show 37+ ETH)</div>
            <div>3. Execute emergencyWithdraw from ETHGR contract</div>
            <div>4. Recover 37 ETH to your wallet</div>
            <div>5. Create massive ETHGR/ETH liquidity pool</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}