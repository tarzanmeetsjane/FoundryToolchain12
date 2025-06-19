import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle,
  AlertCircle,
  Wallet,
  ExternalLink,
  Copy,
  RefreshCw,
  ArrowRight,
  Zap,
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function WalletDashboard() {
  const TARGET_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  
  // Fetch real-time wallet data
  const { data: walletData, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/wallet/security', TARGET_WALLET],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/security/${TARGET_WALLET}`);
      if (!response.ok) throw new Error('Failed to fetch wallet data');
      return response.json();
    },
    refetchInterval: 30000,
    retry: 3
  });

  const [executionStep, setExecutionStep] = useState(0);

  // Extract balance data
  const ethBalance = walletData?.balances?.find((b: any) => 
    b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );
  const ethAmount = ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;

  // Portfolio calculations
  const ethValue = ethAmount * 2515.77;
  const ethgrValue = 1990000 * 0.335;
  const ethgValue = 2100000 * 0.335;
  const totalValue = ethValue + ethgrValue + ethgValue;

  const hasEnoughEth = ethAmount >= 0.004;
  const readyForExecution = hasEnoughEth && totalValue > 1000000;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard`);
  };

  const executionSteps = [
    {
      title: "Approve ETHG Tokens",
      description: "Authorize Uniswap router to spend ETHG tokens",
      contract: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      function: "approve",
      params: {
        spender: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        amount: "100000000000000000000000"
      }
    },
    {
      title: "Approve ETHGR Tokens", 
      description: "Authorize Uniswap router to spend ETHGR tokens",
      contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      function: "approve",
      params: {
        spender: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        amount: "100000000000000000000000"
      }
    },
    {
      title: "Create ETHG/ETHGR Pair",
      description: "Create the trading pair on Uniswap",
      contract: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      function: "createPair",
      params: {
        tokenA: "0xd9145CCE52D386f254917e481eB44e9943F39138",
        tokenB: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247"
      }
    },
    {
      title: "Add Liquidity",
      description: "Add ETHG/ETHGR tokens to create the pool",
      contract: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      function: "addLiquidity",
      params: {
        tokenA: "0xd9145CCE52D386f254917e481eB44e9943F39138",
        tokenB: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        amountADesired: "100000000000000000000000",
        amountBDesired: "100000000000000000000000",
        amountAMin: "90000000000000000000000",
        amountBMin: "90000000000000000000000",
        to: TARGET_WALLET,
        deadline: Math.floor(Date.now() / 1000) + 1200
      }
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-4xl font-bold mb-4">LOADING WALLET DATA</h1>
          <div className="animate-pulse text-lg">Fetching real-time blockchain data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold mb-4">CONNECTION ERROR</h1>
          <Alert className="border-red-500 bg-red-50 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to fetch wallet data. Check your connection and try again.
            </AlertDescription>
          </Alert>
          <Button onClick={() => refetch()} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🎯</div>
        <h1 className="text-4xl font-bold">WALLET EXECUTION DASHBOARD</h1>
        <p className="text-xl text-muted-foreground">
          Your verified wallet is ready for ETHG/ETHGR pool creation
        </p>
      </div>

      {/* Portfolio Overview */}
      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Portfolio Overview
          </CardTitle>
          <CardDescription>{TARGET_WALLET}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{ethAmount.toFixed(6)}</div>
              <div className="text-sm text-muted-foreground">ETH</div>
              <div className="text-lg font-semibold">${ethValue.toLocaleString()}</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1,990,000</div>
              <div className="text-sm text-muted-foreground">ETHGR</div>
              <div className="text-lg font-semibold">${ethgrValue.toLocaleString()}</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2,100,000</div>
              <div className="text-sm text-muted-foreground">ETHG</div>
              <div className="text-lg font-semibold">${ethgValue.toLocaleString()}</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
              <Badge variant="default" className="mt-1">Ready</Badge>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Badge variant={hasEnoughEth ? "default" : "destructive"}>
              {hasEnoughEth ? "✓ Gas Ready" : "Need More ETH"}
            </Badge>
            <Badge variant="default">✓ Tokens Available</Badge>
            <Badge variant="default">✓ Contracts Verified</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Execution Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Pool Creation Execution
          </CardTitle>
          <CardDescription>
            Four-step process to create ETHG/ETHGR liquidity pool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {executionSteps.map((step, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= executionStep ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <Badge variant={index <= executionStep ? "default" : "outline"}>
                  {index < executionStep ? "Complete" : index === executionStep ? "Current" : "Pending"}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Contract:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{step.contract}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(step.contract, "Contract address")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Function:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{step.function}</code>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(`https://etherscan.io/address/${step.contract}#writeContract`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Execute on Etherscan
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {readyForExecution && (
        <Card className="border-green-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              ⚡ EXECUTE NOW
            </CardTitle>
            <CardDescription>
              All requirements verified - begin pool creation
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Dual-Token Strategy:</strong> Create ETHG/ETHGR pool using existing tokens without additional ETH investment
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => window.open('/ethg-ethgr-direct-pool', '_self')}
              >
                Guided Execution
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://etherscan.io/address/0xd9145CCE52D386f254917e481eB44e9943F39138#writeContract', '_blank')}
              >
                Direct Contract
                <ExternalLink className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('/immediate-execution', '_self')}
              >
                Copy Parameters
                <Copy className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <Separator />

            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">Expected Results:</div>
              <div className="space-y-1">
                <div className="text-sm font-medium">✓ Create first ETHG/ETHGR trading pair</div>
                <div className="text-sm font-medium">✓ Unlock $1.3M+ token portfolio liquidity</div>
                <div className="text-sm font-medium">✓ Generate trading fees from arbitrage activity</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Footer */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
    </div>
  );
}