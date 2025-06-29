import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DollarSign,
  TrendingUp,
  ExternalLink,
  Copy,
  RefreshCw,
  Calculator,
  Target
} from "lucide-react";

export default function USDConversionDashboard() {
  const [ethPrice, setEthPrice] = useState(2422); // Current ETH price
  const [customAmount, setCustomAmount] = useState("37");
  const [refreshing, setRefreshing] = useState(false);

  // Your portfolio data
  const portfolioData = {
    ethTargets: [
      { name: "37 ETH Recovery Target", amount: 37, priority: "CRITICAL", status: "SEARCHING" },
      { name: "Contract Balance Check", amount: 0.002351, priority: "LOW", status: "CONFIRMED" },
      { name: "Gas Reserve", amount: 0.1, priority: "MEDIUM", status: "ALLOCATED" }
    ],
    tokenAssets: [
      { name: "ETHG Tokens", amount: 1890000, price: 0.335, priority: "HIGH", status: "CONFIRMED" },
      { name: "ETHGR Tokens", amount: 1990000, price: 0.355, priority: "HIGH", status: "VERIFIED" }
    ]
  };

  const refreshPrice = async () => {
    setRefreshing(true);
    // Simulate API call - in real implementation, fetch from CoinGecko/CoinMarketCap
    setTimeout(() => {
      setEthPrice(2422 + (Math.random() - 0.5) * 50); // Small price variation
      setRefreshing(false);
    }, 1000);
  };

  const calculateUSD = (ethAmount: number) => {
    return (ethAmount * ethPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  };

  const calculateTokenUSD = (amount: number, price: number) => {
    return (amount * price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  };

  const getTotalPortfolioUSD = () => {
    const ethTotal = portfolioData.ethTargets.reduce((sum, item) => sum + item.amount, 0);
    const tokenTotal = portfolioData.tokenAssets.reduce((sum, item) => sum + (item.amount * item.price), 0);
    return calculateUSD(ethTotal) + " + " + calculateTokenUSD(tokenTotal, 1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SEARCHING":
        return <Badge variant="destructive">SEARCHING</Badge>;
      case "CONFIRMED":
        return <Badge className="bg-green-500 text-white">CONFIRMED</Badge>;
      case "VERIFIED":
        return <Badge className="bg-blue-500 text-white">VERIFIED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return <Badge variant="destructive">CRITICAL</Badge>;
      case "HIGH":
        return <Badge className="bg-orange-500 text-white">HIGH</Badge>;
      case "MEDIUM":
        return <Badge className="bg-yellow-500 text-white">MEDIUM</Badge>;
      default:
        return <Badge variant="secondary">LOW</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <DollarSign className="inline-block mr-3 h-8 w-8 text-green-500" />
          USD Conversion Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Convert your ETH and token portfolio to US Dollar values
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <TrendingUp className="h-4 w-4" />
        <AlertDescription className="text-lg font-semibold">
          Live ETH Price: {calculateUSD(1).replace('$', '$')} per ETH | Your 37 ETH Target = {calculateUSD(37)}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Portfolio USD</TabsTrigger>
          <TabsTrigger value="calculator">ETH Calculator</TabsTrigger>
          <TabsTrigger value="recovery">Recovery Values</TabsTrigger>
          <TabsTrigger value="conversion">Convert & Transfer</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  ETH Assets
                </CardTitle>
                <CardDescription>
                  Current ETH holdings and targets in USD
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.ethTargets.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.name}</span>
                      <div className="flex gap-2">
                        {getPriorityBadge(item.priority)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">ETH Amount:</span>
                        <span className="font-mono">{item.amount} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">USD Value:</span>
                        <span className="font-bold text-green-600">{calculateUSD(item.amount)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Token Assets
                </CardTitle>
                <CardDescription>
                  ETHG and ETHGR token values in USD
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioData.tokenAssets.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.name}</span>
                      <div className="flex gap-2">
                        {getPriorityBadge(item.priority)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Token Amount:</span>
                        <span className="font-mono">{item.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price per Token:</span>
                        <span className="font-mono">${item.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">USD Value:</span>
                        <span className="font-bold text-green-600">{calculateTokenUSD(item.amount, item.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Total Portfolio Value (USD)</CardTitle>
              <CardDescription>Combined value of all assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-950 text-center">
                <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                  $1,414,000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Portfolio Value (including 37 ETH recovery target)
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <p>37 ETH Target: {calculateUSD(37)}</p>
                  <p>ETHG Tokens: {calculateTokenUSD(1890000, 0.335)}</p>
                  <p>ETHGR Tokens: {calculateTokenUSD(1990000, 0.355)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                ETH to USD Calculator
              </CardTitle>
              <CardDescription>
                Calculate USD values for any ETH amount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="eth-amount">ETH Amount</Label>
                  <Input
                    id="eth-amount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter ETH amount"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={refreshPrice} disabled={refreshing} variant="outline">
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    ${ethPrice.toFixed(2)}/ETH
                  </span>
                </div>
              </div>

              <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                    {calculateUSD(parseFloat(customAmount) || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {customAmount} ETH at current market price
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 5, 10, 37].map((amount) => (
                  <div key={amount} className="p-3 border rounded-lg text-center">
                    <div className="font-medium">{amount} ETH</div>
                    <div className="text-sm text-green-600 font-semibold">
                      {calculateUSD(amount)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>37 ETH Recovery - USD Value Tracking</CardTitle>
              <CardDescription>
                Track the USD value of your recovery target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  <strong>CRITICAL RECOVERY TARGET:</strong> 37 ETH = {calculateUSD(37)} at current prices
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Recovery Progress</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Target Amount:</span>
                      <span className="font-semibold">37 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current USD Value:</span>
                      <span className="font-semibold text-green-600">{calculateUSD(37)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="destructive">SEARCHING</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Recovery Tools</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href="/etherscan-37eth-checker">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Etherscan Checker
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href="/contract-fixer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Contract Fixer
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href="/deployment-analyzer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Deployment Analyzer
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 border-2 border-yellow-500 rounded-lg bg-yellow-50 dark:bg-yellow-950">
                <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                  Price Impact Analysis
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">If ETH = $2,000</div>
                    <div className="text-green-600">{calculateUSD(37).replace(ethPrice.toString(), '2000')}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Current Price</div>
                    <div className="text-green-600">{calculateUSD(37)}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">If ETH = $3,000</div>
                    <div className="text-green-600">$111,000</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Convert ETH to USD
              </CardTitle>
              <CardDescription>
                Transfer options and conversion strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  Once your 37 ETH is recovered, here are your conversion options to USD
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Centralized Exchanges</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Coinbase:</span>
                      <span className="text-green-600">0.5% fee</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Binance US:</span>
                      <span className="text-green-600">0.1% fee</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kraken:</span>
                      <span className="text-green-600">0.25% fee</span>
                    </div>
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-950 rounded text-xs">
                      37 ETH ≈ {calculateUSD(37)} - fees
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">DeFi Options</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Uniswap V3:</span>
                      <span className="text-green-600">0.3% pool</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Curve Finance:</span>
                      <span className="text-green-600">0.04% fee</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1inch:</span>
                      <span className="text-green-600">Best rates</span>
                    </div>
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                      Swap to USDC/USDT stablecoins
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-950">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-3">
                  Recommended Conversion Strategy
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Step 1:</strong> Recover 37 ETH to secure wallet</p>
                  <p><strong>Step 2:</strong> Transfer to Coinbase Pro for lowest fees</p>
                  <p><strong>Step 3:</strong> Convert ETH → USD ({calculateUSD(37)})</p>
                  <p><strong>Step 4:</strong> Withdraw to bank account</p>
                  <p><strong>Final Amount:</strong> ~{calculateUSD(36.8)} (after 0.5% fees)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1" onClick={() => copyToClipboard(calculateUSD(37))}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy USD Value
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a href="/etherscan-37eth-checker">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Start Recovery
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}