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
  token_address: string;
  name: string;
  symbol: string;
  logo?: string;
  thumbnail?: string;
  decimals: number;
  balance: string;
  balance_formatted: string;
  usd_price?: number;
  usd_value?: number;
  percentage_relative_to_total_supply?: number;
}

interface PortfolioData {
  address: string;
  total_balance: string;
  tokens: TokenHolding[];
}

export function PortfolioAnalyzer() {
  const [walletAddress, setWalletAddress] = useState("0xc46eB37677360EfDc011F4097621F15b792fa630");
  const [selectedChain, setSelectedChain] = useState("eth");
  const { toast } = useToast();

  const { data: portfolioData, isLoading, refetch } = useQuery({
    queryKey: ['/api/wallet', walletAddress, 'tokens'],
    queryFn: async () => {
      if (!walletAddress || walletAddress.length !== 42) return null;
      
      const response = await fetch(`/api/wallet/${walletAddress}/tokens?chain=${selectedChain}`);
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
    if (!portfolioData?.tokens) return 0;
    return portfolioData.tokens.reduce((total: number, token: TokenHolding) => {
      return total + (token.usd_value || 0);
    }, 0);
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
                .sort((a: TokenHolding, b: TokenHolding) => (b.usd_value || 0) - (a.usd_value || 0))
                .map((token: TokenHolding) => (
                <div key={token.token_address} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {token.thumbnail && (
                      <img 
                        src={token.thumbnail} 
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium">{token.name || token.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(token.balance_formatted)} {token.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {token.usd_value ? formatCurrency(token.usd_value) : '-'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {token.usd_price ? `$${token.usd_price.toFixed(4)}` : '-'}
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