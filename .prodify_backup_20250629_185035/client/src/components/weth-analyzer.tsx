import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, DollarSign, Info, ExternalLink, Copy, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

interface WETHData {
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  totalSupply: string;
  holders: number;
  transfers24h: number;
}

interface WETHTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  type: 'wrap' | 'unwrap' | 'transfer';
}

export default function WETHAnalyzer() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();

  // Fetch WETH price data from CoinGecko
  const { data: priceData, isLoading: priceLoading } = useQuery({
    queryKey: ['weth-price'],
    queryFn: async () => {
      const response = await fetch('/api/market/coins?ids=ethereum&vs_currency=usd&include_24hr_change=true');
      if (!response.ok) throw new Error('Failed to fetch WETH price data');
      const data = await response.json();
      return data[0]; // Ethereum data (WETH tracks ETH price)
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch WETH token data from Moralis
  const { data: tokenData, isLoading: tokenLoading } = useQuery({
    queryKey: ['weth-token-data'],
    queryFn: async () => {
      const response = await fetch(`/api/tokens/${WETH_ADDRESS}/metadata?chainId=1`);
      if (!response.ok) throw new Error('Failed to fetch WETH token data');
      return response.json();
    },
    refetchInterval: 60000, // Refresh every minute
  });

  // Fetch recent WETH transactions
  const { data: transactions = [], isLoading: txLoading } = useQuery({
    queryKey: ['weth-transactions'],
    queryFn: async () => {
      const response = await fetch(`/api/tokens/${WETH_ADDRESS}/transactions?limit=20&chainId=1`);
      if (!response.ok) throw new Error('Failed to fetch WETH transactions');
      return response.json();
    },
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Address copied successfully",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Code className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">WETH Contract Analyzer</h1>
          <p className="text-muted-foreground">
            Real-time analysis of Wrapped Ethereum (WETH) contract
          </p>
        </div>
      </div>

      {/* Contract Address Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Contract Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">Contract Address</div>
                <code className="text-sm font-mono">{WETH_ADDRESS}</code>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(WETH_ADDRESS)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://etherscan.io/address/${WETH_ADDRESS}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Token Name</div>
                <div className="font-medium">Wrapped Ether</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Symbol</div>
                <div className="font-medium">WETH</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="price">Price Data</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold">
                      {priceLoading ? "Loading..." : `$${priceData?.current_price?.toFixed(2) || "0.00"}`}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <p className={`text-2xl font-bold ${
                      (priceData?.price_change_percentage_24h || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {priceLoading ? "Loading..." : `${(priceData?.price_change_percentage_24h || 0).toFixed(2)}%`}
                    </p>
                  </div>
                  {(priceData?.price_change_percentage_24h || 0) >= 0 ? (
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-red-600" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="text-2xl font-bold">
                      {priceLoading ? "Loading..." : formatNumber(priceData?.total_volume || 0)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-2xl font-bold">
                      {priceLoading ? "Loading..." : formatNumber(priceData?.market_cap || 0)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="price" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Information</CardTitle>
            </CardHeader>
            <CardContent>
              {priceLoading ? (
                <div className="text-center py-8">Loading price data...</div>
              ) : priceData ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Price</div>
                    <div className="text-xl font-bold">${priceData.current_price?.toFixed(6)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Market Cap Rank</div>
                    <div className="text-xl font-bold">#{priceData.market_cap_rank}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">All Time High</div>
                    <div className="text-xl font-bold">${priceData.ath?.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">All Time Low</div>
                    <div className="text-xl font-bold">${priceData.atl?.toFixed(2)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No price data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {txLoading ? (
                <div className="text-center py-8">Loading transaction data...</div>
              ) : transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.slice(0, 10).map((tx: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">
                          {tx.value && parseFloat(tx.value) > 0 ? 'Transfer' : 'Contract'}
                        </Badge>
                        <div>
                          <div className="font-mono text-sm">
                            {formatAddress(tx.hash || `tx_${index}`)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp || Date.now()).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No transaction data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WETH Contract Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-semibold mb-2">What is WETH?</h3>
                  <p className="text-sm text-muted-foreground">
                    WETH (Wrapped Ethereum) is an ERC-20 token that represents Ether (ETH) in a 1:1 ratio. 
                    It allows ETH to be used in DeFi protocols that require ERC-20 tokens.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 1:1 backing with ETH</li>
                    <li>• Fully decentralized and trustless</li>
                    <li>• Most liquid ERC-20 token</li>
                    <li>• Essential for DeFi ecosystems</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Contract Type</div>
                    <div className="font-medium">ERC-20 Token</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Decimals</div>
                    <div className="font-medium">18</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}