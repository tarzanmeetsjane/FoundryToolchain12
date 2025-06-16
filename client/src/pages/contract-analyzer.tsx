import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Shield, AlertTriangle, CheckCircle, Download, Users, Activity, Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ContractAnalyzerPage() {
  const [contractAddress, setContractAddress] = useState("0xd9145CCE52D386f254917e481eB44e9943F39138");
  const [activeTab, setActiveTab] = useState("analysis");

  // Contract analysis query
  const { data: contractAnalysis, isLoading: isAnalyzing, refetch: refetchAnalysis } = useQuery({
    queryKey: [`/api/uniscan/contract/${contractAddress}`],
    queryFn: async () => {
      const response = await fetch(`/api/uniscan/contract/${contractAddress}`);
      if (!response.ok) throw new Error('Failed to analyze contract');
      return response.json();
    },
    enabled: false
  });

  // Holders analysis query
  const { data: holdersAnalysis, isLoading: isLoadingHolders, refetch: refetchHolders } = useQuery({
    queryKey: [`/api/uniscan/holders/${contractAddress}`],
    queryFn: async () => {
      const response = await fetch(`/api/uniscan/holders/${contractAddress}`);
      if (!response.ok) throw new Error('Failed to analyze holders');
      return response.json();
    },
    enabled: false
  });

  // Transaction analysis query
  const { data: transactionAnalysis, isLoading: isLoadingTx, refetch: refetchTransactions } = useQuery({
    queryKey: [`/api/uniscan/transactions/${contractAddress}`],
    queryFn: async () => {
      const response = await fetch(`/api/uniscan/transactions/${contractAddress}`);
      if (!response.ok) throw new Error('Failed to analyze transactions');
      return response.json();
    },
    enabled: false
  });

  const handleAnalyze = async () => {
    if (!contractAddress) return;
    
    await Promise.all([
      refetchAnalysis(),
      refetchHolders(),
      refetchTransactions()
    ]);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Contract Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Advanced honeypot detection and recovery assessment powered by Uniscan.xyz
        </p>
      </div>

      {/* Analysis Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Contract Analysis
          </CardTitle>
          <CardDescription>
            Enter a contract address to analyze security risks, honeypot patterns, and recovery potential
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="contract">Contract Address</Label>
              <Input
                id="contract"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleAnalyze}
                disabled={!contractAddress || isAnalyzing || isLoadingHolders || isLoadingTx}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing || isLoadingHolders || isLoadingTx ? 'Analyzing...' : 'Analyze Contract'}
              </Button>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setContractAddress("0xd9145CCE52D386f254917e481eB44e9943F39138")}
            >
              ETHG (Honeypot)
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setContractAddress("0xfA7b8c553C48C56ec7027d26ae95b029a2abF247")}
            >
              ETHGR (Recovery)
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setContractAddress("0xA0b86a33E6B1a7bE6bc7f3e2F3b9A6A2Cd4F3a5E")}
            >
              USDT (Safe)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {contractAnalysis && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Security Analysis</TabsTrigger>
            <TabsTrigger value="holders">Token Holders</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{contractAnalysis.securityScore}/100</div>
                  <Progress value={contractAnalysis.securityScore} className="mb-2" />
                  <Badge className={getRiskColor(contractAnalysis.riskLevel)}>
                    {contractAnalysis.riskLevel.toUpperCase()} RISK
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Honeypot Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {contractAnalysis.honeypotAnalysis?.isHoneypot ? 'HONEYPOT' : 'SAFE'}
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Can Sell: {contractAnalysis.honeypotAnalysis?.canSell ? '✅' : '❌'}</div>
                    <div>Can Transfer: {contractAnalysis.honeypotAnalysis?.canTransfer ? '✅' : '❌'}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Recovery Potential
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2 capitalize">
                    {contractAnalysis.recoveryPotential}
                  </div>
                  <Badge variant={contractAnalysis.recoveryPotential === 'high' ? 'default' : 'secondary'}>
                    {contractAnalysis.recoveryPotential === 'high' ? 'Recoverable' : 'Limited Options'}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recovery Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contractAnalysis.recommendations?.map((rec: string, index: number) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{rec}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holders" className="space-y-6">
            {holdersAnalysis && (
              <>
                {/* Holders Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Total Holders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{holdersAnalysis.totalHolders}</div>
                      <p className="text-sm text-gray-600">Active addresses</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Recovery Eligible</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-600">
                        {holdersAnalysis.recoveryStats?.eligibleHolders || 0}
                      </div>
                      <p className="text-sm text-gray-600">Trapped holders</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Trapped Tokens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">
                        {holdersAnalysis.recoveryStats?.trappedTokens?.toLocaleString() || 0}
                      </div>
                      <p className="text-sm text-gray-600">Total trapped</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Holders List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Token Holders</CardTitle>
                    <CardDescription>Addresses with significant token balances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {holdersAnalysis.holders?.slice(0, 10).map((holder: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="font-mono text-sm">
                              {holder.address.slice(0, 6)}...{holder.address.slice(-4)}
                              <Button variant="ghost" size="sm" className="ml-2">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <Badge variant={holder.status === 'recovered' ? 'default' : 'secondary'}>
                              {holder.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{holder.balanceFormatted}</div>
                            <div className="text-sm text-gray-600">{holder.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {transactionAnalysis && (
              <>
                {/* Transaction Patterns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Total Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{transactionAnalysis.totalTransactions}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Failed Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">
                        {transactionAnalysis.patterns?.failedTransactions || 0}
                      </div>
                      <p className="text-sm text-gray-600">Potential honeypot attempts</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Contract Interactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">
                        {transactionAnalysis.patterns?.contractInteractions || 0}
                      </div>
                      <p className="text-sm text-gray-600">Smart contract calls</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest blockchain activity for this contract</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {transactionAnalysis.transactions?.slice(0, 10).map((tx: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="font-mono text-sm">
                              {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-6)}
                            </div>
                            <Badge variant={tx.status === 'success' ? 'default' : 'destructive'}>
                              {tx.status}
                            </Badge>
                            <Badge variant={tx.riskLevel === 'high' ? 'destructive' : 'secondary'}>
                              {tx.riskLevel} risk
                            </Badge>
                          </div>
                          <div className="text-right text-sm">
                            <div>Block: {tx.blockNumber}</div>
                            <div className="text-gray-600">Gas: {tx.gasUsed}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Recovery Contract Generator
                </CardTitle>
                <CardDescription>
                  Generate a custom recovery contract based on the analysis results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contractAnalysis?.honeypotAnalysis?.isHoneypot && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Honeypot Detected:</strong> This contract restricts token transfers. 
                      A recovery contract can bypass these restrictions.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Recovery Strategy</h4>
                  <div className="space-y-2 text-sm">
                    <div>✅ Deploy custom recovery contract</div>
                    <div>✅ Mint equivalent tokens to affected holders</div>
                    <div>✅ Establish market liquidity on Uniswap</div>
                    <div>✅ Notify community of recovery completion</div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Recovery Contract
                </Button>

                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Contract will be customized for this specific honeypot pattern</p>
                  <p>• Includes emergency functions for token recovery</p>
                  <p>• Verified source code provided for transparency</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}