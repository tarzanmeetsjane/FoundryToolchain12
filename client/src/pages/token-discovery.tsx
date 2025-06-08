import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  TrendingUp, 
  DollarSign,
  ExternalLink,
  Star,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GeckoPoolAnalyzer } from "@/components/gecko-pool-analyzer";
import { CSVDataAnalyzer } from "@/components/csv-data-analyzer";
import { StarkNetAnalyzer } from "@/components/starknet-analyzer";
import { CairoDevelopment } from "@/components/cairo-dev-complete";
import { PolygonNFTAnalyzer } from "@/components/polygon-nft-analyzer";

export default function TokenDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChain, setSelectedChain] = useState("1");
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a token name, symbol, or contract address",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Uniscan.xyz Integration Required",
      description: "To enable real token search, we need access to Uniscan.xyz API. This will provide authentic token data, prices, and market information.",
    });
  };

  const getChainName = (chainId: string) => {
    const chains: Record<string, string> = {
      "1": "Ethereum",
      "56": "BSC",
      "137": "Polygon",
      "42161": "Arbitrum",
      "10": "Optimism",
      "8453": "Base"
    };
    return chains[chainId] || "Unknown Chain";
  };

  // Load real token data from server using authenticated CoinGecko API
  const { data: topTokens = [], isLoading: tokensLoading } = useQuery({
    queryKey: [`top-tokens`, selectedChain],
    queryFn: async () => {
      const response = await fetch(`/api/market/coins?limit=20&vs_currency=usd`);
      if (!response.ok) {
        throw new Error('Failed to fetch token data');
      }
      return response.json();
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const demoTokens = [
    {
      symbol: "ETH",
      name: "Ethereum",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      price: "$2,680.45",
      change: "+2.34%",
      volume: "$12.5B",
      marketCap: "$322.1B",
      verified: true
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      address: "0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f",
      price: "$1.00",
      change: "+0.01%",
      volume: "$5.2B",
      marketCap: "$42.8B",
      verified: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Search className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Token Discovery</h1>
        <Badge variant="outline">Powered by Uniscan.xyz</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Tokens</CardTitle>
          <CardDescription>
            Discover tokens across multiple blockchains with real-time data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ethereum</SelectItem>
                <SelectItem value="56">BSC</SelectItem>
                <SelectItem value="137">Polygon</SelectItem>
                <SelectItem value="42161">Arbitrum</SelectItem>
                <SelectItem value="10">Optimism</SelectItem>
                <SelectItem value="8453">Base</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              placeholder="Search by name, symbol, or contract address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">API Integration Available</span>
          </div>
          <p className="text-blue-600 dark:text-blue-400 mb-4">
            This feature will provide real-time token search and discovery using Uniscan.xyz API. 
            You'll get authentic price data, trading volume, market caps, and verified token information 
            across all major blockchains.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm text-blue-600 dark:text-blue-400">
            <div>✓ Real-time token prices</div>
            <div>✓ 24h trading volumes</div>
            <div>✓ Market cap data</div>
            <div>✓ Verified token badges</div>
            <div>✓ Multi-chain support</div>
            <div>✓ Contract addresses</div>
          </div>
        </CardContent>
      </Card>

      <GeckoPoolAnalyzer />

      <CSVDataAnalyzer />

      <PolygonNFTAnalyzer />

      <StarkNetAnalyzer />

      <CairoDevelopment />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Tokens on {getChainName(selectedChain)}
          </CardTitle>
          <CardDescription>
            Preview of token data available with API integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoTokens.map((token, index) => (
              <Card key={token.address} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {token.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{token.symbol}</h3>
                          {token.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{token.name}</p>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {token.address.slice(0, 8)}...{token.address.slice(-6)}
                        </code>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">{token.price}</div>
                      <div className={`text-sm ${
                        token.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {token.change}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">24h Volume</div>
                      <div className="font-medium">{token.volume}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Market Cap</div>
                      <div className="font-medium">{token.marketCap}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Explorer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="h-3 w-3 mr-1" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}