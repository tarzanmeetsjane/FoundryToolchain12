import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Wallet, DollarSign, TrendingUp, TrendingDown, ExternalLink, RefreshCw } from "lucide-react";
import { AddressValidator } from "@/lib/address-validator";
import { moralisAPI, getMoralisChain, type MoralisTokenBalance } from "@/lib/moralis-api";
import { coinGeckoAPI, formatPrice, formatPercentageChange } from "@/lib/coingecko-api";

interface TokenBalance {
  contractAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balanceFormatted: string;
  priceUSD?: string;
  valueUSD?: string;
  logo?: string;
  verified: boolean;
}

interface WalletPortfolio {
  address: string;
  totalValueUSD: string;
  tokenCount: number;
  nativeBalance: string;
  nativeValueUSD: string;
  tokens: TokenBalance[];
  lastUpdated: string;
}

export default function WalletPortfolioAnalyzer() {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedChain, setSelectedChain] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(0);

  // Query wallet portfolio data using Moralis and CoinGecko APIs
  const { data: portfolio, isLoading, error, refetch } = useQuery<WalletPortfolio>({
    queryKey: [`moralis-wallet`, walletAddress, selectedChain, searchTrigger],
    queryFn: async () => {
      if (!walletAddress) throw new Error('No wallet address provided');
      
      try {
        const moralisChain = getMoralisChain(selectedChain);
        
        // Get token balances from Moralis
        const tokenBalances = await moralisAPI.getWalletTokenBalances(walletAddress, moralisChain);
        
        // Get native balance
        const walletBalance = await moralisAPI.getWalletBalance(walletAddress, moralisChain);
        
        // Get prices from CoinGecko for tokens that have contract addresses
        const contractAddresses = tokenBalances
          .filter(token => !token.possible_spam && token.verified_contract)
          .map(token => token.token_address);
        
        let tokenPrices: any = {};
        if (contractAddresses.length > 0) {
          try {
            tokenPrices = await coinGeckoAPI.getTokenPrices(contractAddresses);
          } catch (priceError) {
            console.warn('CoinGecko price fetch failed, continuing without prices:', priceError);
          }
        }
        
        // Calculate total portfolio value
        let totalValueUSD = parseFloat(walletBalance.wallet_balance.usd_value?.toString() || '0');
        
        // Transform to our interface
        const transformedTokens: TokenBalance[] = tokenBalances
          .filter(token => !token.possible_spam && token.verified_contract)
          .map(token => {
            const price = tokenPrices[token.token_address.toLowerCase()]?.usd || token.usd_price || 0;
            const value = price * parseFloat(token.balance_formatted);
            totalValueUSD += value;
            
            return {
              contractAddress: token.token_address,
              symbol: token.symbol,
              name: token.name,
              decimals: token.decimals,
              balance: token.balance,
              balanceFormatted: token.balance_formatted,
              priceUSD: price.toString(),
              valueUSD: value.toString(),
              logo: token.logo || token.thumbnail,
              verified: token.verified_contract
            };
          });
        
        const transformedPortfolio: WalletPortfolio = {
          address: walletAddress,
          totalValueUSD: totalValueUSD.toString(),
          tokenCount: transformedTokens.length,
          nativeBalance: walletBalance.wallet_balance.balance_formatted,
          nativeValueUSD: walletBalance.wallet_balance.usd_value?.toString() || '0',
          tokens: transformedTokens,
          lastUpdated: new Date().toISOString()
        };
        
        return transformedPortfolio;
      } catch (apiError: any) {
        throw new Error(`Unable to fetch wallet data: ${apiError?.message || 'Unknown error'}`);
      }
    },
    enabled: !!walletAddress && AddressValidator.validateEthereumAddress(walletAddress) && searchTrigger > 0,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleAnalyze = () => {
    if (!walletAddress) return;
    
    const validation = AddressValidator.validateAddress(walletAddress, selectedChain);
    if (!validation.isValid) {
      alert("Please enter a valid wallet address");
      return;
    }
    
    setSearchTrigger(prev => prev + 1);
  };

  const formatValue = (value: string | undefined) => {
    if (!value) return "$0.00";
    const num = parseFloat(value);
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatBalance = (balance: string, decimals: number) => {
    const num = parseFloat(balance) / Math.pow(10, decimals);
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(6);
  };

  const getExplorerUrl = (address: string, chainId: number = 1) => {
    const explorers = {
      1: "https://etherscan.io",
      56: "https://bscscan.com",
      137: "https://polygonscan.com",
      42161: "https://arbiscan.io",
      10: "https://optimistic.etherscan.io",
      8453: "https://basescan.org",
    };
    return `${explorers[chainId as keyof typeof explorers] || explorers[1]}/address/${address}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Portfolio Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter wallet address (0x...)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="flex-1"
            />
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(parseInt(e.target.value))}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value={1}>Ethereum</option>
              <option value={56}>BSC</option>
              <option value={137}>Polygon</option>
              <option value={42161}>Arbitrum</option>
              <option value={10}>Optimism</option>
              <option value={8453}>Base</option>
            </select>
            <Button onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Analyze
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">
                Unable to fetch wallet data. This feature requires an API key for token balance data.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {portfolio && (
        <div className="space-y-6">
          {/* Portfolio Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Portfolio Overview
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(getExplorerUrl(portfolio.address, selectedChain), '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-green-500">
                    {formatValue(portfolio.totalValueUSD)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Token Count</p>
                  <p className="text-2xl font-bold">{portfolio.tokenCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Native Balance</p>
                  <p className="text-lg font-semibold">{portfolio.nativeBalance}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Native Value</p>
                  <p className="text-lg font-semibold text-blue-500">
                    {formatValue(portfolio.nativeValueUSD)}
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Wallet Address</p>
                <p className="font-mono text-sm break-all">{portfolio.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Token Holdings */}
          <Card>
            <CardHeader>
              <CardTitle>Token Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {portfolio.tokens.map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {token.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{token.symbol}</span>
                          {token.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{token.name}</p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {token.contractAddress.slice(0, 8)}...{token.contractAddress.slice(-6)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-medium">
                        {formatBalance(token.balance, token.decimals)} {token.symbol}
                      </p>
                      {token.valueUSD && (
                        <p className="text-sm text-green-500">
                          {formatValue(token.valueUSD)}
                        </p>
                      )}
                      {token.priceUSD && (
                        <p className="text-xs text-muted-foreground">
                          ${parseFloat(token.priceUSD).toFixed(4)} per token
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(getExplorerUrl(token.contractAddress, selectedChain), '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Check Your Specific Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Check Specific Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-2">LINK Token</p>
                  <p className="text-sm text-muted-foreground mb-2">Contract: 0x514910771af9ca656af840dff83e8264ecf986ca</p>
                  {portfolio.tokens.find(t => t.contractAddress.toLowerCase() === "0x514910771af9ca656af840dff83e8264ecf986ca".toLowerCase()) ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="default">✓ Found in wallet</Badge>
                      <span className="text-sm">
                        Balance: {formatBalance(
                          portfolio.tokens.find(t => t.contractAddress.toLowerCase() === "0x514910771af9ca656af840dff83e8264ecf986ca".toLowerCase())?.balance || "0",
                          18
                        )} LINK
                      </span>
                    </div>
                  ) : (
                    <Badge variant="secondary">Not found in wallet</Badge>
                  )}
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-2">WETH Token</p>
                  <p className="text-sm text-muted-foreground mb-2">Contract: 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2</p>
                  {portfolio.tokens.find(t => t.contractAddress.toLowerCase() === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2".toLowerCase()) ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="default">✓ Found in wallet</Badge>
                      <span className="text-sm">
                        Balance: {formatBalance(
                          portfolio.tokens.find(t => t.contractAddress.toLowerCase() === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2".toLowerCase())?.balance || "0",
                          18
                        )} WETH
                      </span>
                    </div>
                  ) : (
                    <Badge variant="secondary">Not found in wallet</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}