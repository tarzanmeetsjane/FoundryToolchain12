import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, BarChart3, ExternalLink, Search, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PoolData {
  address: string;
  name: string;
  network: string;
  base_token: {
    name: string;
    symbol: string;
    address: string;
  };
  quote_token: {
    name: string;
    symbol: string;
    address: string;
  };
  price_usd: string;
  price_change_24h: string;
  volume_24h: string;
  liquidity_usd: string;
  market_cap_usd: string;
  transactions_24h: number;
  created_at: string;
  dex: {
    name: string;
    identifier: string;
  };
}

export function GeckoPoolAnalyzer() {
  const [poolUrl, setPoolUrl] = useState<string>("");
  const [poolData, setPoolData] = useState<PoolData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const extractPoolInfo = (url: string) => {
    // Extract network and pool address from GeckoTerminal URL
    const match = url.match(/geckoterminal\.com\/pools\/([^_]+)_(.+)/);
    if (match) {
      return {
        network: match[1],
        address: match[2]
      };
    }
    return null;
  };

  const analyzePool = async () => {
    if (!poolUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a GeckoTerminal pool URL",
        variant: "destructive"
      });
      return;
    }

    const poolInfo = extractPoolInfo(poolUrl);
    if (!poolInfo) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GeckoTerminal pool URL",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/dex/${poolInfo.network}/pools/${poolInfo.address}`);
      
      if (response.ok) {
        const data = await response.json();
        const pool = data.data;
        
        const formattedData: PoolData = {
          address: pool.attributes.address,
          name: pool.attributes.name,
          network: poolInfo.network,
          base_token: {
            name: pool.attributes.base_token_name || 'Unknown',
            symbol: pool.attributes.base_token_symbol || 'UNK',
            address: pool.attributes.base_token_address || ''
          },
          quote_token: {
            name: pool.attributes.quote_token_name || 'Unknown',
            symbol: pool.attributes.quote_token_symbol || 'UNK',
            address: pool.attributes.quote_token_address || ''
          },
          price_usd: pool.attributes.base_token_price_usd || '0',
          price_change_24h: pool.attributes.price_change_percentage?.h24 || '0',
          volume_24h: pool.attributes.volume_usd?.h24 || '0',
          liquidity_usd: pool.attributes.reserve_in_usd || '0',
          market_cap_usd: pool.attributes.market_cap_usd || '0',
          transactions_24h: pool.attributes.transactions?.h24 || 0,
          created_at: pool.attributes.pool_created_at || '',
          dex: {
            name: pool.attributes.dex_name || 'Unknown',
            identifier: pool.attributes.dex_id || 'unknown'
          }
        };
        
        setPoolData(formattedData);
        
        toast({
          title: "Pool Analysis Complete",
          description: `Successfully analyzed ${formattedData.name}`,
        });
      } else {
        throw new Error('Pool not found');
      }
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze pool. Please check the URL and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: string | number) => {
    const value = typeof num === 'string' ? parseFloat(num) : num;
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (change: string) => {
    const value = parseFloat(change);
    const isPositive = value >= 0;
    return (
      <span className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            GeckoTerminal Pool Analyzer
          </CardTitle>
          <CardDescription>
            Analyze any pool from GeckoTerminal by pasting its URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://www.geckoterminal.com/pools/eth_0x..."
              value={poolUrl}
              onChange={(e) => setPoolUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={analyzePool} disabled={isLoading}>
              {isLoading ? "Analyzing..." : <Search className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Example: https://www.geckoterminal.com/pools/eth_0xd001ae433f254283fece51d4acce8c53263aa186
          </div>
        </CardContent>
      </Card>

      {poolData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{poolData.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{poolData.network.toUpperCase()}</Badge>
                  <Badge variant="outline">{poolData.dex.name}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={poolUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View on GeckoTerminal
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Token Pair */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Base Token</h4>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="font-medium">{poolData.base_token.symbol}</div>
                  <div className="text-sm text-muted-foreground">{poolData.base_token.name}</div>
                  <div className="text-xs font-mono mt-1">{poolData.base_token.address}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Quote Token</h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
                  <div className="font-medium">{poolData.quote_token.symbol}</div>
                  <div className="text-sm text-muted-foreground">{poolData.quote_token.name}</div>
                  <div className="text-xs font-mono mt-1">{poolData.quote_token.address}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price and Performance */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{formatNumber(poolData.price_usd)}</div>
                <div className="text-sm text-muted-foreground">Price USD</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-medium">
                  {formatPercentage(poolData.price_change_24h)}
                </div>
                <div className="text-sm text-muted-foreground">24h Change</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-medium">{formatNumber(poolData.volume_24h)}</div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-medium">{formatNumber(poolData.liquidity_usd)}</div>
                <div className="text-sm text-muted-foreground">Liquidity</div>
              </div>
            </div>

            <Separator />

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-medium">{formatNumber(poolData.market_cap_usd)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">24h Transactions</span>
                  <span className="font-medium">{poolData.transactions_24h.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pool Address</span>
                  <span className="font-mono text-xs">{poolData.address.slice(0, 6)}...{poolData.address.slice(-4)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">DEX</span>
                  <span className="font-medium">{poolData.dex.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Network</span>
                  <span className="font-medium">{poolData.network.toUpperCase()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {poolData.created_at ? new Date(poolData.created_at).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-sm">Quick Analysis</span>
                </div>
                <div className="text-xs space-y-1">
                  <div>Volume/Liquidity: {((parseFloat(poolData.volume_24h) / parseFloat(poolData.liquidity_usd)) * 100).toFixed(1)}%</div>
                  <div>Avg Trade Size: {formatNumber(parseFloat(poolData.volume_24h) / Math.max(poolData.transactions_24h, 1))}</div>
                  <div className={parseFloat(poolData.price_change_24h) > 0 ? 'text-green-600' : 'text-red-600'}>
                    Trend: {parseFloat(poolData.price_change_24h) > 5 ? 'Strong Bullish' : 
                            parseFloat(poolData.price_change_24h) > 0 ? 'Bullish' :
                            parseFloat(poolData.price_change_24h) > -5 ? 'Bearish' : 'Strong Bearish'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}