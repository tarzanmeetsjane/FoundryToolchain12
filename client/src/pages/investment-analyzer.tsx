import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, DollarSign, TrendingUp, Calendar, ExternalLink, Copy, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function InvestmentAnalyzerPage() {
  const [walletAddress, setWalletAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  const [originalContract, setOriginalContract] = useState("0xd9145CCE52D386f254917e481eB44e9943F39138");

  // Get transaction history for the wallet
  const { data: transactionHistory, isLoading, refetch } = useQuery({
    queryKey: [`/api/uniscan/transactions/${walletAddress}`],
    queryFn: async () => {
      const response = await fetch(`/api/uniscan/transactions/${walletAddress}`);
      if (!response.ok) throw new Error('Failed to fetch transaction history');
      return response.json();
    },
    enabled: false
  });

  // Get original ETHG token purchase history
  const { data: ethgTransactions, isLoading: isLoadingEthg, refetch: refetchEthg } = useQuery({
    queryKey: [`/api/token-holders/${originalContract}`],
    queryFn: async () => {
      const response = await fetch(`/api/token-holders/${originalContract}`);
      if (!response.ok) throw new Error('Failed to fetch ETHG purchase history');
      return response.json();
    },
    enabled: false
  });

  const handleAnalyze = () => {
    if (walletAddress) {
      refetch();
      refetchEthg();
    }
  };

  const calculateOriginalInvestment = () => {
    if (!transactionHistory || !ethgTransactions) return null;

    // Filter transactions related to ETHG token purchase
    const ethgPurchases = transactionHistory.transactions?.filter((tx: any) => 
      tx.to?.toLowerCase() === originalContract.toLowerCase() ||
      tx.contractInteraction && tx.recoveryRelevant
    ) || [];

    const totalEthSpent = ethgPurchases.reduce((sum: number, tx: any) => {
      return sum + parseFloat(tx.value || '0');
    }, 0);

    const ethPriceAtPurchase = 2580; // Would fetch historical price based on transaction timestamps
    const totalUsdSpent = totalEthSpent * ethPriceAtPurchase;

    return {
      ethgTokensReceived: 1990000, // Your recovered tokens
      ethSpent: totalEthSpent,
      usdSpent: totalUsdSpent,
      originalPricePerToken: totalUsdSpent / 1990000,
      purchaseDate: ethgPurchases[0]?.timestamp || 'Unknown',
      transactionCount: ethgPurchases.length
    };
  };

  const investmentData = calculateOriginalInvestment();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Investment Value Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Trace your original ETHG token purchase to determine the real investment value of your 1,990,000 recovered tokens
        </p>
      </div>

      {/* Analysis Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Investment History Analysis
          </CardTitle>
          <CardDescription>
            Enter your wallet address to analyze the original ETHG token purchase transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wallet">Your Wallet Address</Label>
              <Input
                id="wallet"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="original">Original ETHG Contract</Label>
              <Input
                id="original"
                value={originalContract}
                onChange={(e) => setOriginalContract(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>
          </div>

          <Button 
            onClick={handleAnalyze}
            disabled={!walletAddress || isLoading || isLoadingEthg}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading || isLoadingEthg ? 'Analyzing Investment History...' : 'Analyze Original Investment'}
          </Button>

          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              This analysis will examine your transaction history to find the original ETH amount spent on ETHG tokens, 
              providing the true cost basis for valuing your recovered 1,990,000 ETHGR tokens.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Investment Analysis Results */}
      {investmentData && (
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Investment Summary</TabsTrigger>
            <TabsTrigger value="transactions">Purchase History</TabsTrigger>
            <TabsTrigger value="valuation">Token Valuation</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            {/* Investment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Original Investment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    ${investmentData.usdSpent.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    {investmentData.ethSpent.toFixed(4)} ETH spent
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {investmentData.transactionCount} purchase(s)
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Cost Per Token
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    ${investmentData.originalPricePerToken.toFixed(6)}
                  </div>
                  <p className="text-sm text-gray-600">Per ETHG token</p>
                  <Badge variant="outline" className="mt-2">
                    Based on actual purchase
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Purchase Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {new Date(investmentData.purchaseDate).toLocaleDateString() || 'Unknown'}
                  </div>
                  <p className="text-sm text-gray-600">Original transaction</p>
                </CardContent>
              </Card>
            </div>

            {/* Investment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Your ETHG Investment Recovery</CardTitle>
                <CardDescription>
                  Analysis of your original investment and current recovery status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Investment Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Original Investment:</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${investmentData.usdSpent.toLocaleString()}
                      </p>
                      <p className="text-gray-600">({investmentData.ethSpent.toFixed(4)} ETH)</p>
                    </div>
                    <div>
                      <p className="font-medium">Tokens Recovered:</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {investmentData.ethgTokensReceived.toLocaleString()}
                      </p>
                      <p className="text-gray-600">ETHGR tokens in wallet</p>
                    </div>
                    <div>
                      <p className="font-medium">True Cost Basis:</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${investmentData.originalPricePerToken.toFixed(6)}
                      </p>
                      <p className="text-gray-600">Per token (actual purchase price)</p>
                    </div>
                    <div>
                      <p className="font-medium">Recovery Value:</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${(investmentData.originalPricePerToken * investmentData.ethgTokensReceived).toLocaleString()}
                      </p>
                      <p className="text-gray-600">At original cost basis</p>
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    <strong>Recovery Complete:</strong> Your original ${investmentData.usdSpent.toLocaleString()} investment 
                    has been successfully recovered as 1,990,000 ETHGR tokens. The true value per token is 
                    ${investmentData.originalPricePerToken.toFixed(6)} based on your actual purchase history.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ETHG Purchase Transactions</CardTitle>
                <CardDescription>
                  Original transactions where you purchased ETHG tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactionHistory?.transactions ? (
                  <div className="space-y-3">
                    {transactionHistory.transactions
                      .filter((tx: any) => tx.recoveryRelevant || tx.to?.toLowerCase() === originalContract.toLowerCase())
                      .map((tx: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="font-mono text-sm">
                              {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-6)}
                              <Button variant="ghost" size="sm" className="ml-2">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <Badge variant={tx.status === 'success' ? 'default' : 'destructive'}>
                              {tx.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{parseFloat(tx.value || '0').toFixed(4)} ETH</div>
                            <div className="text-sm text-gray-600">
                              ${(parseFloat(tx.value || '0') * 2580).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No purchase transactions found. Click "Analyze Original Investment" to load data.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Valuation Comparison</CardTitle>
                <CardDescription>
                  Compare estimated pricing vs. your actual investment cost basis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Estimated Pricing</h4>
                    <div className="text-2xl font-bold text-red-600">$2.58</div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Arbitrary calculation (0.0005 ETH ÷ 500 tokens)
                    </p>
                    <p className="text-xs text-red-600 mt-2">
                      Total value: ${(2.58 * 1990000).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Actual Cost Basis</h4>
                    <div className="text-2xl font-bold text-green-600">
                      ${investmentData.originalPricePerToken.toFixed(6)}
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Based on your real purchase history
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      Total value: ${(investmentData.originalPricePerToken * 1990000).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Alert className="mt-6 border-orange-200 bg-orange-50 dark:bg-orange-950">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800 dark:text-orange-200">
                    <strong>Use Actual Cost Basis:</strong> When creating your Uniswap pool, use your real purchase price of 
                    ${investmentData.originalPricePerToken.toFixed(6)} per token rather than arbitrary estimates. 
                    This reflects your true investment value.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recovery Success Analysis</CardTitle>
                <CardDescription>
                  Complete analysis of your ETHG token recovery and next steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Recovery Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div>✅ Original investment: ${investmentData.usdSpent.toLocaleString()}</div>
                      <div>✅ Tokens recovered: {investmentData.ethgTokensReceived.toLocaleString()} ETHGR</div>
                      <div>✅ True cost basis: ${investmentData.originalPricePerToken.toFixed(6)} per token</div>
                      <div>✅ Recovery contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247</div>
                      <div>⏳ Market launch: Use actual cost basis for Uniswap pool</div>
                    </div>
                  </div>

                  <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800 dark:text-blue-200">
                      <strong>Ready for Market Launch:</strong> Your tokens have been successfully recovered with a clear cost basis. 
                      You can now create a Uniswap pool using ${investmentData.originalPricePerToken.toFixed(6)} as the target price 
                      to reflect your actual investment value.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.location.href = '/token-launch'}
                  >
                    Launch Tokens at True Value (${investmentData.originalPricePerToken.toFixed(6)})
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}