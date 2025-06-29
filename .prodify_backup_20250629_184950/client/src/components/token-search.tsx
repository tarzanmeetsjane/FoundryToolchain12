import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Volume2, 
  DollarSign,
  ExternalLink,
  Star,
  Copy,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uniscanAPI, formatUSDValue, getChainName } from "@/lib/uniscan-api";

interface TokenSearchResult {
  contract_address: string;
  symbol: string;
  name: string;
  decimals: number;
  price_usd: string;
  price_change_24h: string;
  volume_24h: string;
  market_cap: string;
  verified: boolean;
  logo?: string;
}

export default function TokenSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChain, setSelectedChain] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const { toast } = useToast();

  // Search tokens using Uniscan API
  const { data: searchResults, isLoading, error } = useQuery<TokenSearchResult[]>({
    queryKey: [`uniscan-token-search`, searchQuery, selectedChain, searchTrigger],
    queryFn: async (): Promise<TokenSearchResult[]> => {
      if (!searchQuery) return [];
      
      try {
        const results = await uniscanAPI.searchTokens(searchQuery, selectedChain) as TokenSearchResult[];
        return results;
      } catch (apiError: any) {
        throw new Error(`Token search failed: ${apiError?.message || 'Unknown error'}`);
      }
    },
    enabled: !!searchQuery && searchTrigger > 0,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Get top tokens for the selected chain
  const { data: topTokens, isLoading: topTokensLoading } = useQuery<TokenSearchResult[]>({
    queryKey: [`uniscan-top-tokens`, selectedChain],
    queryFn: async (): Promise<TokenSearchResult[]> => {
      try {
        const results = await uniscanAPI.getTopTokens(selectedChain, 20) as TokenSearchResult[];
        return results;
      } catch (apiError: any) {
        throw new Error(`Failed to fetch top tokens: ${apiError?.message || 'Unknown error'}`);
      }
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a token name, symbol, or contract address",
        variant: "destructive"
      });
      return;
    }
    setSearchTrigger(prev => prev + 1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Contract address copied to clipboard",
    });
  };

  const getExplorerUrl = (address: string, chainId: number) => {
    const explorers = {
      1: "https://etherscan.io",
      56: "https://bscscan.com",
      137: "https://polygonscan.com",
      42161: "https://arbiscan.io",
      10: "https://optimistic.etherscan.io",
      8453: "https://basescan.org",
    };
    return `${explorers[chainId as keyof typeof explorers] || explorers[1]}/token/${address}`;
  };

  const formatPriceChange = (change: string) => {
    const changeNum = parseFloat(change);
    const isPositive = changeNum >= 0;
    return {
      value: `${isPositive ? '+' : ''}${changeNum.toFixed(2)}%`,
      isPositive
    };
  };

  const TokenCard = ({ token }: { token: TokenSearchResult }) => {
    const priceChange = formatPriceChange(token.price_change_24h);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              {token.logo && (
                <img 
                  src={token.logo} 
                  alt={token.symbol}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1">
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
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {token.contract_address.slice(0, 8)}...{token.contract_address.slice(-6)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(token.contract_address)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold">
                ${parseFloat(token.price_usd).toFixed(6)}
              </div>
              <div className={`text-sm flex items-center gap-1 ${
                priceChange.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {priceChange.isPositive ? 
                  <TrendingUp className="h-3 w-3" /> : 
                  <TrendingDown className="h-3 w-3" />
                }
                {priceChange.value}
              </div>
            </div>
          </div>
          
          <Separator className="my-3" />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">24h Volume</div>
              <div className="font-medium">{formatUSDValue(token.volume_24h)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Market Cap</div>
              <div className="font-medium">{formatUSDValue(token.market_cap)}</div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.open(getExplorerUrl(token.contract_address, selectedChain), '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Explorer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Add to watchlist functionality
                toast({
                  title: "Added to Watchlist",
                  description: `${token.symbol} has been added to your watchlist`,
                });
              }}
            >
              <Star className="h-3 w-3 mr-1" />
              Watch
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Token Discovery
          </CardTitle>
          <CardDescription>
            Search and discover tokens across multiple blockchains with real-time data from Uniscan.xyz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={selectedChain.toString()} onValueChange={(value) => setSelectedChain(parseInt(value))}>
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
              placeholder="Search tokens by name, symbol, or contract address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <AlertCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Search Error</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {error.message}
            </p>
          </CardContent>
        </Card>
      )}

      {searchResults && searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
            <CardDescription>
              Tokens matching "{searchQuery}" on {getChainName(selectedChain)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {searchResults.map((token) => (
                  <TokenCard key={token.contract_address} token={token} />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {(!searchResults || searchResults.length === 0) && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Tokens on {getChainName(selectedChain)}
            </CardTitle>
            <CardDescription>
              Most traded tokens by 24h volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topTokensLoading ? (
              <div className="flex items-center justify-center p-8">
                <AlertCircle className="h-6 w-6 animate-spin mr-2" />
                Loading top tokens...
              </div>
            ) : topTokens && topTokens.length > 0 ? (
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {topTokens.map((token) => (
                    <TokenCard key={token.contract_address} token={token} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                No token data available for {getChainName(selectedChain)}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}