import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ExternalLink,
  AlertCircle,
  Activity,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

interface DEXPool {
  id: string;
  attributes: {
    name: string;
    address: string;
    base_token_price_usd: string;
    quote_token_price_usd: string;
    reserve_in_usd: string;
    fdv_usd: string;
    price_change_percentage: {
      h1: string;
      h6: string;
      h24: string;
    };
    volume_usd: {
      h1: string;
      h6: string;
      h24: string;
    };
    transactions: {
      h24: {
        buys: number;
        sells: number;
        buyers: number;
        sellers: number;
      };
    };
  };
  relationships: {
    base_token: { data: { id: string } };
    quote_token: { data: { id: string } };
    dex: { data: { id: string } };
  };
}

const NETWORKS = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
  { id: 'bsc', name: 'BSC', symbol: 'BNB' },
  { id: 'polygon_pos', name: 'Polygon', symbol: 'MATIC' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ETH' },
  { id: 'optimism', name: 'Optimism', symbol: 'ETH' },
  { id: 'base', name: 'Base', symbol: 'ETH' },
  { id: 'avax', name: 'Avalanche', symbol: 'AVAX' }
];

export default function RealTimeDEXDashboard() {
  const [selectedNetwork, setSelectedNetwork] = useState('eth');
  const [selectedSort, setSelectedSort] = useState('h24_volume_usd_desc');

  // Fetch trending pools across all networks
  const { data: trendingPools, isLoading: trendingLoading } = useQuery({
    queryKey: ['trending-pools'],
    queryFn: async () => {
      const response = await fetch('/api/dex/trending-pools');
      if (!response.ok) throw new Error('Failed to fetch trending pools');
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch pools for selected network
  const { data: networkPools, isLoading: poolsLoading } = useQuery({
    queryKey: ['network-pools', selectedNetwork, selectedSort],
    queryFn: async () => {
      const response = await fetch(`/api/dex/${selectedNetwork}/pools?sort=${selectedSort}`);
      if (!response.ok) throw new Error('Failed to fetch network pools');
      return response.json();
    },
    refetchInterval: 30000,
  });

  const formatVolume = (volume: string) => {
    const num = parseFloat(volume);
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (change: string) => {
    const num = parseFloat(change);
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  const getHealthStatus = (pool: DEXPool) => {
    const volume24h = parseFloat(pool.attributes.volume_usd.h24);
    const reserveUsd = parseFloat(pool.attributes.reserve_in_usd);
    const priceChange24h = Math.abs(parseFloat(pool.attributes.price_change_percentage.h24));

    if (volume24h > 100000 && reserveUsd > 500000 && priceChange24h < 15) {
      return { status: 'healthy', color: 'bg-green-500' };
    } else if (volume24h > 10000 && reserveUsd > 50000) {
      return { status: 'warning', color: 'bg-yellow-500' };
    } else {
      return { status: 'risky', color: 'bg-red-500' };
    }
  };

  const PoolCard = ({ pool, tokens }: { pool: DEXPool; tokens: any }) => {
    const health = getHealthStatus(pool);
    const priceChange24h = parseFloat(pool.attributes.price_change_percentage.h24);
    const baseToken = tokens?.find((t: any) => t.id === pool.relationships.base_token.data.id);
    const quoteToken = tokens?.find((t: any) => t.id === pool.relationships.quote_token.data.id);

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${health.color}`} />
              <div className="font-semibold">
                {baseToken?.attributes?.symbol || 'Unknown'}/{quoteToken?.attributes?.symbol || 'Unknown'}
              </div>
              <Badge variant="outline" className="text-xs">
                {pool.relationships.dex.data.id.toUpperCase()}
              </Badge>
            </div>
            <div className={`text-sm font-medium ${
              priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercentage(pool.attributes.price_change_percentage.h24)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">24h Volume</div>
              <div className="font-medium">{formatVolume(pool.attributes.volume_usd.h24)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Liquidity</div>
              <div className="font-medium">{formatVolume(pool.attributes.reserve_in_usd)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Price USD</div>
              <div className="font-medium">${parseFloat(pool.attributes.base_token_price_usd).toFixed(6)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Trades 24h</div>
              <div className="font-medium">
                {(pool.attributes.transactions.h24.buys + pool.attributes.transactions.h24.sells).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t">
            <div className="flex gap-2">
              <Badge variant={health.status === 'healthy' ? 'default' : health.status === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
                {health.status}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`https://www.geckoterminal.com/pools/${pool.id}`, '_blank')}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Real-Time DEX Trading Dashboard</h1>
          <p className="text-muted-foreground">
            Live trading data from GeckoTerminal across multiple networks
          </p>
        </div>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending Pools</TabsTrigger>
          <TabsTrigger value="networks">Network Analysis</TabsTrigger>
          <TabsTrigger value="analytics">Trading Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Trending Pools
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              LIVE
            </div>
          </CardTitle>
            </CardHeader>
            <CardContent>
              {trendingLoading ? (
                <div className="flex items-center justify-center p-8">
                  <AlertCircle className="h-6 w-6 animate-spin mr-2" />
                  Loading trending pools...
                </div>
              ) : trendingPools?.data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingPools.data.slice(0, 9).map((pool: DEXPool) => (
                    <PoolCard 
                      key={pool.id} 
                      pool={pool} 
                      tokens={trendingPools.included} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  No trending pools data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Network-Specific Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Network</label>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NETWORKS.map((network) => (
                        <SelectItem key={network.id} value={network.id}>
                          {network.name} ({network.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="h24_volume_usd_desc">24h Volume (High to Low)</SelectItem>
                      <SelectItem value="h24_volume_usd_asc">24h Volume (Low to High)</SelectItem>
                      <SelectItem value="reserve_in_usd_desc">Liquidity (High to Low)</SelectItem>
                      <SelectItem value="h24_price_change_percentage_desc">Price Change (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {poolsLoading ? (
                <div className="flex items-center justify-center p-8">
                  <AlertCircle className="h-6 w-6 animate-spin mr-2" />
                  Loading {NETWORKS.find(n => n.id === selectedNetwork)?.name} pools...
                </div>
              ) : networkPools?.data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {networkPools.data.slice(0, 12).map((pool: DEXPool) => (
                    <PoolCard 
                      key={pool.id} 
                      pool={pool} 
                      tokens={networkPools.included} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  No pools data available for {NETWORKS.find(n => n.id === selectedNetwork)?.name}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Networks</p>
                    <p className="text-2xl font-bold">{NETWORKS.length}</p>
                  </div>
                  <Activity className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Trending Pools</p>
                    <p className="text-2xl font-bold">{trendingPools?.data?.length || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Network Pools</p>
                    <p className="text-2xl font-bold">{networkPools?.data?.length || 0}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Data Sources</p>
                    <p className="text-2xl font-bold">Live</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Source Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold mb-2">GeckoTerminal API</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time DEX trading data across multiple blockchain networks. 
                    Provides live pool information, trading volumes, and price movements.
                  </p>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Live Data Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Data refreshes every 30 seconds to provide the most current trading insights.
                    All metrics are sourced directly from blockchain networks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}