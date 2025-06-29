import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  ExternalLink,
  Wallet,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function WalletAnalyzer() {
  const [walletAddress, setWalletAddress] = useState("0x8b99Bb520235F502158bA026A7CfEB59a69E6c18");

  const keyWallets = [
    {
      address: "0x8b99Bb520235F502158bA026A7CfEB59a69E6c18",
      label: "New Discovery Wallet",
      significance: "Recently provided - potential connection to 37 ETH"
    },
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      label: "Main Portfolio Wallet",
      significance: "1.89M ETHG tokens + ETHGR ownership"
    },
    {
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
      label: "Remix Deployment Wallet",
      significance: "Saw 37 ETH here during deployment"
    },
    {
      address: "0xd816c710dc011db6d357e2b1210eafc60177338f",
      label: "Proxy Contract",
      significance: "Potential location of trapped 37 ETH"
    }
  ];

  const analyzeWallet = async (address: string) => {
    try {
      const response = await fetch(`/api/wallet/${address}`);
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      return null;
    }
  };

  const { data: walletData, isLoading, refetch } = useQuery({
    queryKey: ['wallet-analysis', walletAddress],
    queryFn: () => analyzeWallet(walletAddress),
    enabled: !!walletAddress
  });

  const formatBalance = (balance: string) => {
    const eth = parseFloat(balance);
    const usd = eth * 2422; // Current ETH price
    return {
      eth: eth.toFixed(6),
      usd: usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    };
  };

  const checkRecoveryPotential = (address: string, balance: number) => {
    if (balance > 30) {
      return { level: "high", message: "Potential 37 ETH recovery target!" };
    } else if (balance > 5) {
      return { level: "medium", message: "Significant balance worth investigating" };
    } else if (balance > 1) {
      return { level: "low", message: "Some funds present" };
    }
    return { level: "none", message: "Minimal balance" };
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Wallet Recovery Analyzer</h1>
          <p className="text-muted-foreground">
            Analyzing wallet connections for 37 ETH recovery and portfolio management
          </p>
        </div>
        <Button onClick={() => window.open('/remix-recovery-toolkit', '_blank')}>
          Back to Recovery
        </Button>
      </div>

      <Alert className="border-yellow-500 bg-yellow-50">
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>NEW WALLET DISCOVERED:</strong> 0x8b99Bb520235F502158bA026A7CfEB59a69E6c18
          This could be connected to your 37 ETH recovery or deployment operations.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Wallet Analysis</CardTitle>
            <CardDescription>
              Analyze any wallet for ETH balance and transaction history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter wallet address..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="font-mono text-sm"
              />
              <Button onClick={() => refetch()} disabled={isLoading}>
                {isLoading ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>

            {walletData && (
              <div className="space-y-3">
                <div className="p-4 border rounded">
                  <div className="font-semibold mb-2">Balance Analysis</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">ETH Balance</div>
                      <div className="font-bold text-lg">
                        {formatBalance(walletData.balance).eth} ETH
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">USD Value</div>
                      <div className="font-bold text-lg text-green-600">
                        {formatBalance(walletData.balance).usd}
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const recovery = checkRecoveryPotential(walletAddress, parseFloat(walletData.balance));
                    return (
                      <div className={`mt-3 p-2 rounded ${
                        recovery.level === 'high' ? 'bg-green-100 text-green-800' :
                        recovery.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        recovery.level === 'low' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        <strong>Recovery Potential:</strong> {recovery.message}
                      </div>
                    );
                  })()}
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Etherscan
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`/live-transaction-analyzer?address=${walletAddress}`, '_blank')}
                  >
                    <Search className="h-3 w-3 mr-1" />
                    Analyze
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Wallet Summary</CardTitle>
            <CardDescription>
              Portfolio and recovery-related wallet addresses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {keyWallets.map((wallet, index) => (
                <div key={index} className="p-3 border rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-sm">{wallet.label}</div>
                      <div className="font-mono text-xs text-muted-foreground break-all">
                        {wallet.address}
                      </div>
                    </div>
                    <Badge variant={wallet.address === walletAddress ? "default" : "outline"}>
                      {wallet.address === walletAddress ? "Active" : "Check"}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {wallet.significance}
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setWalletAddress(wallet.address)}
                    >
                      Analyze
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Portfolio Recovery Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded">
              <div className="font-semibold text-green-700">Confirmed Assets</div>
              <div className="text-2xl font-bold text-green-800">$1.325M</div>
              <div className="text-sm text-muted-foreground">
                1.89M ETHG + 1.99M ETHGR tokens verified
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded">
              <div className="font-semibold text-yellow-700">Recovery Target</div>
              <div className="text-2xl font-bold text-yellow-800">37 ETH</div>
              <div className="text-sm text-muted-foreground">
                $89,614 potential recovery from Remix deployment
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <div className="font-semibold text-blue-700">Total Potential</div>
              <div className="text-2xl font-bold text-blue-800">$1.41M</div>
              <div className="text-sm text-muted-foreground">
                Complete portfolio value with recovery
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded">
            <div className="font-semibold text-purple-700 mb-2">New Wallet Analysis:</div>
            <div className="text-sm">
              The wallet 0x8b99Bb520235F502158bA026A7CfEB59a69E6c18 you provided could be:
              <ul className="list-disc ml-4 mt-2">
                <li>Connected to your Remix deployment session</li>
                <li>A wallet used during contract creation</li>
                <li>Potential holder of recovered funds</li>
                <li>Related to your transaction hash batch</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <Button onClick={() => window.open('/million-dollar-strategy', '_blank')}>
              Continue Strategy
            </Button>
            <Button variant="outline" onClick={() => window.open('/remix-recovery-toolkit', '_blank')}>
              Recovery Tools
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}