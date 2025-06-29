import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Activity,
  Zap,
  TrendingUp,
  Database,
  Wifi,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function LiveDataDashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Live ETHGR data query
  const { data: ethgrData, isLoading: ethgrLoading, refetch: refetchEthgr } = useQuery({
    queryKey: ['/api/ethgr/live-data'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Sales metrics query
  const { data: salesData, isLoading: salesLoading, refetch: refetchSales } = useQuery({
    queryKey: ['/api/ethgr/sales-metrics'],
    refetchInterval: 60000, // Refresh every minute
  });

  // Pool readiness query
  const { data: poolData, isLoading: poolLoading, refetch: refetchPool } = useQuery({
    queryKey: ['/api/ethgr/pool-readiness'],
    refetchInterval: 120000, // Refresh every 2 minutes
  });

  // Manual refresh all data
  const refreshAllData = () => {
    refetchEthgr();
    refetchSales();
    refetchPool();
    setLastUpdated(new Date());
  };

  const isDataStale = () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastUpdated < fiveMinutesAgo;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Live Blockchain Data Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time ETHGR token and blockchain analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isDataStale() ? "destructive" : "default"} className="flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            {isDataStale() ? "Stale Data" : "Live"}
          </Badge>
          <Button onClick={refreshAllData} size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <Database className="h-4 w-4" />
        <AlertDescription>
          <strong>LIVE BLOCKCHAIN INTEGRATION:</strong> All data is fetched directly from Ethereum mainnet 
          and authenticated APIs. No mock or placeholder data is used.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              ETHGR Live Data
            </CardTitle>
            <CardDescription>
              Real-time token and wallet statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ethgrLoading ? (
              <div className="flex items-center justify-center p-8">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : ethgrData?.success ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-bold">Token Balance</div>
                    <div className="text-sm text-muted-foreground">ETHGR in wallet</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">
                      {ethgrData.data.tokenBalanceFormatted}
                    </div>
                    <div className="text-xs">Verified on-chain</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-bold">Portfolio Value</div>
                    <div className="text-sm text-muted-foreground">Market rate calculation</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {ethgrData.data.portfolioValueFormatted}
                    </div>
                    <div className="text-xs">@${ethgrData.data.marketPrice}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-bold">ETH Balance</div>
                    <div className="text-sm text-muted-foreground">Available for gas</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">
                      {ethgrData.data.ethBalance.toFixed(4)} ETH
                    </div>
                    <div className="text-xs">${ethgrData.data.ethBalanceUSD.toFixed(2)}</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(ethgrData.data.lastUpdated).toLocaleTimeString()}
                  <br />
                  Source: {ethgrData.data.dataSource}
                </div>
              </div>
            ) : (
              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to fetch live ETHGR data. Check API connectivity.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales Metrics
            </CardTitle>
            <CardDescription>
              Real-time revenue calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {salesLoading ? (
              <div className="flex items-center justify-center p-8">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : salesData?.success ? (
              <div className="space-y-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Current ETH Price</div>
                  <div className="text-2xl font-bold">${salesData.data.currentETHPrice.toFixed(2)}</div>
                </div>

                {salesData.data.salesPackages.map((pkg: any, index: number) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold">{pkg.name}</div>
                      <div className="font-bold text-green-600">
                        ${pkg.totalValue.toLocaleString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Tokens: {pkg.tokens.toLocaleString()}</div>
                      <div>ETH: {pkg.ethEquivalent.toFixed(3)}</div>
                      <div>Price: ${pkg.pricePerToken}</div>
                      <div>Net: ${pkg.netRevenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}

                <div className="text-xs text-muted-foreground">
                  Block: {salesData.data.currentBlock} • Updated: {new Date(salesData.data.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to fetch sales metrics. Check API connectivity.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Pool Readiness
            </CardTitle>
            <CardDescription>
              Live pool creation analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {poolLoading ? (
              <div className="flex items-center justify-center p-8">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            ) : poolData?.success ? (
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${poolData.data.ready ? 'bg-green-50' : 'bg-orange-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {poolData.data.ready ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    )}
                    <div className="font-bold">
                      {poolData.data.ready ? 'Ready for Pool Creation' : 'Insufficient ETH'}
                    </div>
                  </div>
                  <div className="text-sm">{poolData.data.recommendation}</div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current ETH:</span>
                    <span className="font-bold">{poolData.data.currentETH.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required ETH:</span>
                    <span className="font-bold">{poolData.data.requiredETH}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Gas Cost:</span>
                    <span className="font-bold">{poolData.data.estimatedGas.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens Available:</span>
                    <span className="font-bold">{poolData.data.tokensAvailable.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2 bg-gray-50 rounded text-xs">
                  <div className="font-bold">Suggested Ratio:</div>
                  <div>{poolData.data.suggestedPoolRatio}</div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Updated: {new Date(poolData.data.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Failed to fetch pool readiness data. Check API connectivity.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Data Sources</CardTitle>
          <CardDescription>
            Authenticated blockchain and market data endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold mb-2">Ethereum Mainnet</div>
              <div className="text-sm space-y-1">
                <div>• Direct RPC calls via ethers.js</div>
                <div>• Real-time balance queries</div>
                <div>• Live transaction verification</div>
                <div>• Gas price monitoring</div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold mb-2">Price Feeds</div>
              <div className="text-sm space-y-1">
                <div>• CoinGecko API (primary)</div>
                <div>• Etherscan price API (backup)</div>
                <div>• Coinbase exchange rates</div>
                <div>• Multi-source validation</div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="font-bold mb-2">Token Analytics</div>
              <div className="text-sm space-y-1">
                <div>• ERC20 contract interactions</div>
                <div>• Balance verification</div>
                <div>• Transfer capability checks</div>
                <div>• Smart contract validation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}