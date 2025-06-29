import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  RefreshCw,
  ExternalLink,
  Eye,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddressValidator } from "@/lib/address-validator";
import { moralisAPI, getMoralisChain, type MoralisTokenBalance } from "@/lib/moralis-api";
import { coinGeckoAPI, formatPrice, formatPercentageChange, formatMarketCap } from "@/lib/coingecko-api";

interface EnhancedTokenBalance extends MoralisTokenBalance {
  priceUSD: number;
  valueUSD: number;
  percentageOfPortfolio: number;
  priceChange24h: number;
  marketCap: number;
}

interface PortfolioSummary {
  totalValueUSD: number;
  totalTokens: number;
  topPerformer: EnhancedTokenBalance | null;
  worstPerformer: EnhancedTokenBalance | null;
  portfolioChange24h: number;
}

export default function RealTimePortfolio() {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedChain, setSelectedChain] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const { toast } = useToast();

  // Query enhanced portfolio data
  const { data: enhancedPortfolio, isLoading, error, refetch } = useQuery<{
    tokens: EnhancedTokenBalance[];
    summary: PortfolioSummary;
    nativeBalance: { balance: string; valueUSD: number };
  }>({
    queryKey: [`enhanced-portfolio`, walletAddress, selectedChain, searchTrigger],
    queryFn: async () => {
      if (!walletAddress) throw new Error('No wallet address provided');
      
      const moralisChain = getMoralisChain(selectedChain);
      
      // Get token balances from Moralis
      const tokenBalances = await moralisAPI.getWalletTokenBalances(walletAddress, moralisChain);
      const walletBalance = await moralisAPI.getWalletBalance(walletAddress, moralisChain);
      
      // Filter verified tokens
      const verifiedTokens = tokenBalances.filter(
        token => !token.possible_spam && token.verified_contract && parseFloat(token.balance_formatted) > 0
      );
      
      if (verifiedTokens.length === 0) {
        return {
          tokens: [],
          summary: {
            totalValueUSD: walletBalance.wallet_balance.usd_value || 0,
            totalTokens: 0,
            topPerformer: null,
            worstPerformer: null,
            portfolioChange24h: 0
          },
          nativeBalance: {
            balance: walletBalance.wallet_balance.balance_formatted,
            valueUSD: walletBalance.wallet_balance.usd_value || 0
          }
        };
      }
      
      // Get contract addresses for price data
      const contractAddresses = verifiedTokens.map(token => token.token_address);
      
      // Get prices and market data from CoinGecko
      const tokenPrices = await coinGeckoAPI.getTokenPrices(contractAddresses);
      
      // Enhance tokens with price and market data
      const enhancedTokens: EnhancedTokenBalance[] = verifiedTokens.map(token => {
        const priceData = tokenPrices[token.token_address.toLowerCase()];
        const priceUSD = priceData?.usd || token.usd_price || 0;
        const valueUSD = priceUSD * parseFloat(token.balance_formatted);
        const priceChange24h = priceData?.usd_24h_change || 0;
        const marketCap = priceData?.usd_market_cap || 0;
        
        return {
          ...token,
          priceUSD,
          valueUSD,
          percentageOfPortfolio: 0, // Will be calculated after total
          priceChange24h,
          marketCap
        };
      });
      
      // Calculate total portfolio value
      const totalTokenValue = enhancedTokens.reduce((sum, token) => sum + token.valueUSD, 0);
      const nativeValue = walletBalance.wallet_balance.usd_value || 0;
      const totalValueUSD = totalTokenValue + nativeValue;
      
      // Calculate portfolio percentages
      enhancedTokens.forEach(token => {
        token.percentageOfPortfolio = totalValueUSD > 0 ? (token.valueUSD / totalValueUSD) * 100 : 0;
      });
      
      // Sort by value descending
      enhancedTokens.sort((a, b) => b.valueUSD - a.valueUSD);
      
      // Calculate portfolio performance
      const portfolioChange24h = enhancedTokens.reduce((sum, token) => {
        const weight = token.percentageOfPortfolio / 100;
        return sum + (token.priceChange24h * weight);
      }, 0);
      
      // Find top and worst performers
      const tokensWithChange = enhancedTokens.filter(token => token.priceChange24h !== 0);
      const topPerformer = tokensWithChange.length > 0 
        ? tokensWithChange.reduce((max, token) => token.priceChange24h > max.priceChange24h ? token : max)
        : null;
      const worstPerformer = tokensWithChange.length > 0
        ? tokensWithChange.reduce((min, token) => token.priceChange24h < min.priceChange24h ? token : min)
        : null;
      
      return {
        tokens: enhancedTokens,
        summary: {
          totalValueUSD,
          totalTokens: enhancedTokens.length,
          topPerformer,
          worstPerformer,
          portfolioChange24h
        },
        nativeBalance: {
          balance: walletBalance.wallet_balance.balance_formatted,
          valueUSD: nativeValue
        }
      };
    },
    enabled: !!walletAddress && AddressValidator.validateEthereumAddress(walletAddress) && searchTrigger > 0,
    refetchInterval: autoRefresh ? 30000 : false, // Auto-refresh every 30 seconds if enabled
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleAnalyze = () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Address Required",
        description: "Please enter a valid wallet address to analyze",
        variant: "destructive"
      });
      return;
    }
    
    const validation = AddressValidator.validateAddress(walletAddress, selectedChain);
    if (!validation.isValid) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid wallet address",
        variant: "destructive"
      });
      return;
    }
    
    setSearchTrigger(prev => prev + 1);
  };

  const getChainName = (chainId: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      56: 'BSC',
      137: 'Polygon',
      43114: 'Avalanche',
      42161: 'Arbitrum',
      10: 'Optimism',
      8453: 'Base'
    };
    return chains[chainId] || 'Unknown Chain';
  };

  const getExplorerUrl = (address: string, chainId: number) => {
    const explorers: Record<number, string> = {
      1: 'https://etherscan.io',
      56: 'https://bscscan.com',
      137: 'https://polygonscan.com',
      43114: 'https://snowtrace.io',
      42161: 'https://arbiscan.io',
      10: 'https://optimistic.etherscan.io',
      8453: 'https://basescan.org'
    };
    return `${explorers[chainId] || explorers[1]}/address/${address}`;
  };

  const formatChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Real-Time Portfolio Tracker
          </CardTitle>
          <CardDescription>
            Powered by Moralis Web3 API and CoinGecko for authentic blockchain data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <select
              className="px-3 py-2 border rounded-md"
              value={selectedChain}
              onChange={(e) => setSelectedChain(parseInt(e.target.value))}
            >
              <option value={1}>Ethereum</option>
              <option value={56}>BSC</option>
              <option value={137}>Polygon</option>
              <option value={43114}>Avalanche</option>
              <option value={42161}>Arbitrum</option>
              <option value={10}>Optimism</option>
              <option value={8453}>Base</option>
            </select>
            
            <Input
              placeholder="Enter wallet address (0x...)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="flex-1"
            />
            
            <Button onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Analyze
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              disabled={!enhancedPortfolio}
            >
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Analysis Failed</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {error.message}
            </p>
          </CardContent>
        </Card>
      )}

      {enhancedPortfolio && (
        <>
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Total Value</span>
                </div>
                <div className="text-xl font-bold">
                  ${enhancedPortfolio.summary.totalValueUSD.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </div>
                <div className={`text-sm ${formatChangeColor(enhancedPortfolio.summary.portfolioChange24h)}`}>
                  {enhancedPortfolio.summary.portfolioChange24h >= 0 ? '+' : ''}
                  {enhancedPortfolio.summary.portfolioChange24h.toFixed(2)}% (24h)
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Total Tokens</div>
                <div className="text-xl font-bold">{enhancedPortfolio.summary.totalTokens}</div>
                <div className="text-sm text-muted-foreground">On {getChainName(selectedChain)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Top Performer</div>
                <div className="font-semibold">
                  {enhancedPortfolio.summary.topPerformer?.symbol || 'N/A'}
                </div>
                <div className="text-sm text-green-600">
                  {enhancedPortfolio.summary.topPerformer 
                    ? `+${enhancedPortfolio.summary.topPerformer.priceChange24h.toFixed(2)}%`
                    : 'No data'
                  }
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Native Balance</div>
                <div className="font-semibold">
                  {parseFloat(enhancedPortfolio.nativeBalance.balance).toFixed(4)} ETH
                </div>
                <div className="text-sm text-muted-foreground">
                  ${enhancedPortfolio.nativeBalance.valueUSD.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Token Holdings */}
          <Card>
            <CardHeader>
              <CardTitle>Token Holdings</CardTitle>
              <CardDescription>
                Real-time balances and prices from Moralis and CoinGecko
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enhancedPortfolio.tokens.map((token, index) => (
                  <Card key={token.token_address} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {token.logo ? (
                            <img 
                              src={token.logo} 
                              alt={token.symbol}
                              className="w-10 h-10 rounded-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {token.symbol.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{token.symbol}</h3>
                              {token.verified_contract && (
                                <Badge variant="secondary" className="text-xs">Verified</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{token.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {token.token_address.slice(0, 8)}...{token.token_address.slice(-6)}
                              </code>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">
                            ${token.valueUSD.toLocaleString(undefined, { 
                              minimumFractionDigits: 2, 
                              maximumFractionDigits: 2 
                            })}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {token.balance_formatted} {token.symbol}
                          </div>
                          <div className={`text-sm ${formatChangeColor(token.priceChange24h)}`}>
                            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Portfolio Weight</span>
                          <span>{token.percentageOfPortfolio.toFixed(2)}%</span>
                        </div>
                        <Progress value={token.percentageOfPortfolio} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">Price</div>
                          <div className="font-medium">{formatPrice(token.priceUSD)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Market Cap</div>
                          <div className="font-medium">{formatMarketCap(token.marketCap)}</div>
                        </div>
                        <div className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(getExplorerUrl(token.token_address, selectedChain), '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Explorer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {enhancedPortfolio.tokens.length === 0 && (
                  <div className="text-center p-8 text-muted-foreground">
                    No tokens found in this wallet on {getChainName(selectedChain)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}