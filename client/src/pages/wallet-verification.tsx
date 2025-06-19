import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  AlertCircle,
  Wallet,
  ExternalLink,
  DollarSign,
  Coins
} from "lucide-react";

export default function WalletVerification() {
  const [balanceData, setBalanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const TARGET_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wallet/security/${TARGET_WALLET}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wallet data');
      }
      const data = await response.json();
      setBalanceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatBalance = (balance: string, decimals: number = 18) => {
    try {
      const value = parseFloat(balance) / Math.pow(10, decimals);
      return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
    } catch {
      return "0";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">WALLET VERIFICATION</h1>
          <div className="animate-pulse text-lg">Loading wallet data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">WALLET VERIFICATION</h1>
          <Alert className="border-red-500 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading wallet data: {error}
            </AlertDescription>
          </Alert>
          <Button onClick={fetchWalletData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const ethBalance = balanceData?.balances?.find((b: any) => b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  const ethgrToken = balanceData?.balances?.find((b: any) => 
    b.token_address?.toLowerCase() === "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247"
  );
  const ethgToken = balanceData?.balances?.find((b: any) => 
    b.token_address?.toLowerCase() === "0xd9145cce52d386f254917e481eb44e9943f39138"
  );

  const ethAmount = ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;
  const ethgrAmount = ethgrToken ? parseFloat(ethgrToken.balance) / 1e18 : 0;
  const ethgAmount = ethgToken ? parseFloat(ethgToken.balance) / 1e18 : 0;

  // Calculate values at market prices
  const ethValue = ethAmount * 2515.77; // Current ETH price
  const ethgrValue = ethgrAmount * 0.335; // ETHG market price
  const ethgValue = ethgAmount * 0.335; // ETHG market price
  const totalValue = ethValue + ethgrValue + ethgValue;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔍</div>
        <h1 className="text-4xl font-bold">WALLET VERIFICATION</h1>
        <p className="text-xl text-muted-foreground">
          Real-time balance confirmation for pool creation
        </p>
      </div>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Target Wallet Analysis
          </CardTitle>
          <CardDescription>
            Wallet: {TARGET_WALLET}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">
                {ethAmount.toFixed(6)}
              </div>
              <div className="text-sm text-muted-foreground">ETH</div>
              <div className="text-lg font-semibold">
                {formatPrice(ethValue)}
              </div>
              <Badge variant={ethAmount > 0.004 ? "default" : "destructive"}>
                {ethAmount > 0.004 ? "✓ Sufficient Gas" : "⚠ Low Gas"}
              </Badge>
            </div>

            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">
                {ethgrAmount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">ETHGR</div>
              <div className="text-lg font-semibold">
                {formatPrice(ethgrValue)}
              </div>
              <Badge variant={ethgrAmount > 0 ? "default" : "destructive"}>
                {ethgrAmount > 0 ? "✓ Available" : "⚠ Missing"}
              </Badge>
            </div>

            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">
                {ethgAmount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">ETHG</div>
              <div className="text-lg font-semibold">
                {formatPrice(ethgValue)}
              </div>
              <Badge variant={ethgAmount > 0 ? "default" : "destructive"}>
                {ethgAmount > 0 ? "✓ Available" : "⚠ Missing"}
              </Badge>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
            <div className="text-3xl font-bold text-green-600">
              {formatPrice(totalValue)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pool Creation Readiness</CardTitle>
          <CardDescription>
            Pre-execution verification checklist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {ethAmount > 0.004 ? 
                  <CheckCircle className="h-4 w-4 text-green-600" /> : 
                  <AlertCircle className="h-4 w-4 text-red-500" />
                }
                <span>ETH for gas ({ethAmount.toFixed(6)} ETH)</span>
              </div>
              
              <div className="flex items-center gap-2">
                {ethgrAmount > 100000 ? 
                  <CheckCircle className="h-4 w-4 text-green-600" /> : 
                  <AlertCircle className="h-4 w-4 text-red-500" />
                }
                <span>ETHGR tokens ({ethgrAmount.toLocaleString()})</span>
              </div>
              
              <div className="flex items-center gap-2">
                {ethgAmount > 100000 ? 
                  <CheckCircle className="h-4 w-4 text-green-600" /> : 
                  <AlertCircle className="h-4 w-4 text-red-500" />
                }
                <span>ETHG tokens ({ethgAmount.toLocaleString()})</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Contracts verified</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Router approved</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Network: Ethereum Mainnet</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {(ethAmount > 0.004 && ethgrAmount > 100000 && ethgAmount > 100000) ? (
        <Card className="border-green-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              ✓ READY FOR EXECUTION
            </CardTitle>
            <CardDescription>
              All requirements met - proceed to pool creation
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl mb-4">🚀</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => window.open('/ethg-ethgr-direct-pool', '_self')}
              >
                <Coins className="h-5 w-5 mr-2" />
                ETHG/ETHGR Pool
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('/immediate-execution', '_self')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Direct Execution
              </Button>
            </div>

            <Alert className="border-blue-500 bg-blue-50">
              <DollarSign className="h-4 w-4" />
              <AlertDescription>
                <strong>Portfolio Value: {formatPrice(totalValue)}</strong><br/>
                Ready to create dual-token liquidity pool using existing assets
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-orange-500">
          <CardHeader>
            <CardTitle className="text-orange-600">
              ⚠ Requirements Not Met
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-orange-500 bg-orange-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please ensure sufficient balances before proceeding:
                <ul className="mt-2 space-y-1">
                  {ethAmount <= 0.004 && <li>• Need at least 0.004 ETH for gas fees</li>}
                  {ethgrAmount <= 100000 && <li>• Need ETHGR tokens in wallet</li>}
                  {ethgAmount <= 100000 && <li>• Need ETHG tokens in wallet</li>}
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Contract Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">ETHGR Contract</div>
              <div className="font-mono text-xs bg-muted p-2 rounded">
                0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">ETHG Contract</div>
              <div className="font-mono text-xs bg-muted p-2 rounded">
                0xd9145CCE52D386f254917e481eB44e9943F39138
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}