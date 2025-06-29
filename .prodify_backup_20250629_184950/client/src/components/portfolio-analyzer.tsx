import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ExternalLink,
  Copy,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TokenHolding {
  contractAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balanceFormatted: string;
  priceUSD: string;
  valueUSD: string;
  logo?: string;
  verified: boolean;
}

interface PortfolioData {
  address: string;
  totalValueUSD: string;
  tokenCount: number;
  nativeBalance: string;
  nativeValueUSD: string;
  tokens: TokenHolding[];
  lastUpdated: string;
}

export function PortfolioAnalyzer() {
  const [walletAddress, setWalletAddress] = useState("0xc46eB37677360EfDc011F4097621F15b792fa630");
  const [selectedChain, setSelectedChain] = useState("eth");
  const { toast } = useToast();

  const { data: portfolioData, isLoading, refetch } = useQuery({
    queryKey: ['/api/wallet', walletAddress, 'portfolio'],
    queryFn: async () => {
      if (!walletAddress || walletAddress.length !== 42) return null;
      
      const chainId = selectedChain === 'eth' ? 1 : selectedChain === 'bsc' ? 56 : 137;
      const response = await fetch(`/api/wallet/${walletAddress}/portfolio?chainId=${chainId}`);
      if (!response.ok) throw new Error('Failed to fetch portfolio data');
      return response.json();
    },
    enabled: !!walletAddress && walletAddress.length === 42,
    refetchInterval: 30000
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Address copied to clipboard"
    });
  };

  const getTotalValue = () => {
    if (!portfolioData?.totalValueUSD) return 0;
    return parseFloat(portfolioData.totalValueUSD);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatNumber = (value: string, decimals: number = 4) => {
    const num = parseFloat(value);
    if (num === 0) return '0';
    if (num < 0.001) return '<0.001';
    return num.toFixed(decimals);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Portfolio Analyzer
        </CardTitle>
        <CardDescription>
          Analyze wallet holdings and token balances across networks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Enter wallet address (0x...)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="font-mono text-sm"
          />
          <Button 
            onClick={() => refetch()} 
            disabled={isLoading}
            size="icon"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {walletAddress && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(walletAddress)}
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <a 
                href={`https://etherscan.io/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading portfolio data...</p>
          </div>
        )}

        {portfolioData?.tokens && (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {formatCurrency(getTotalValue())}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Portfolio Value
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {portfolioData.tokens.length} tokens
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h3 className="font-semibold">Token Holdings</h3>
              {portfolioData.tokens
                .sort((a: TokenHolding, b: TokenHolding) => parseFloat(b.valueUSD) - parseFloat(a.valueUSD))
                .map((token: TokenHolding) => (
                <div key={token.contractAddress} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {token.logo && (
                      <img 
                        src={token.logo} 
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium">{token.name || token.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(token.balanceFormatted)} {token.symbol}
                      </div>
                      {token.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatCurrency(parseFloat(token.valueUSD))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${parseFloat(token.priceUSD).toFixed(6)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {portfolioData.tokens.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tokens found for this address
              </div>
            )}
          </>
        )}

        {!isLoading && !portfolioData && walletAddress.length === 42 && (
          <div className="text-center py-8 text-muted-foreground">
            Unable to load portfolio data. Please check the address and try again.
          </div>
        )}
      </CardContent>
    </Card>
  );
}