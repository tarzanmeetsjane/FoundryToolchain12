import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ExternalLink,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WalletTokenChecker() {
  const [walletAddress, setWalletAddress] = useState("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { toast } = useToast();

  // Check if wallet owns tokens using Moralis API
  const { data: walletData, isLoading, error } = useQuery({
    queryKey: [`wallet-tokens`, walletAddress],
    queryFn: async () => {
      if (!walletAddress) return null;
      
      // Get token balances
      const response = await fetch(`/api/wallet/${walletAddress}/tokens?chainId=1`);
      if (!response.ok) {
        throw new Error(`Failed to fetch wallet data: ${response.statusText}`);
      }
      
      const tokens = await response.json();
      
      // Get ETH balance
      const ethResponse = await fetch(`/api/wallet/${walletAddress}/balance?chainId=1`);
      const ethData = ethResponse.ok ? await ethResponse.json() : { balance: "0", value: 0 };
      
      return {
        tokens: tokens.filter((token: any) => 
          !token.possible_spam && 
          token.verified_contract && 
          parseFloat(token.balance_formatted) > 0
        ),
        ethBalance: ethData,
        totalTokens: tokens.length,
        address: walletAddress
      };
    },
    enabled: searchTriggered && !!walletAddress,
    refetchOnWindowFocus: false,
  });

  const handleSearch = () => {
    if (!walletAddress) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid wallet address",
        variant: "destructive"
      });
      return;
    }
    setSearchTriggered(true);
  };

  const formatBalance = (balance: string, decimals: number) => {
    const num = parseFloat(balance) / Math.pow(10, decimals);
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(6);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Wallet className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Token Ownership Checker</h1>
          <p className="text-muted-foreground">
            Check if a wallet address owns tokens using authentic blockchain data
          </p>
        </div>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Wallet Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="font-mono"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <AlertCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isLoading ? "Checking..." : "Check Tokens"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {searchTriggered && (
        <div className="space-y-4">
          {error && (
            <Card className="border-destructive">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <span>Error: {error.message}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5 animate-spin" />
                  <span>Checking wallet for token ownership...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {walletData && (
            <div className="space-y-4">
              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Wallet Analysis Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Address</div>
                      <div className="font-mono text-sm">{formatAddress(walletData.address)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Token Types</div>
                      <div className="font-semibold">{walletData.tokens.length}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">ETH Balance</div>
                      <div className="font-semibold">
                        {parseFloat(walletData.ethBalance.balance || "0").toFixed(4)} ETH
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Est. Value</div>
                      <div className="font-semibold">
                        ${(walletData.ethBalance.value || 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Token Holdings */}
              {walletData.tokens.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Token Holdings ({walletData.tokens.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {walletData.tokens.map((token: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {token.logo ? (
                              <img 
                                src={token.logo} 
                                alt={token.symbol}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {token.symbol?.charAt(0) || "?"}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{token.symbol || "Unknown"}</span>
                                {token.verified_contract && (
                                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{token.name || "Unknown Token"}</div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold">
                              {formatBalance(token.balance, token.decimals)} {token.symbol}
                            </div>
                            {token.usd_value && (
                              <div className="text-sm text-muted-foreground">
                                ${parseFloat(token.usd_value).toFixed(2)}
                              </div>
                            )}
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(`https://etherscan.io/token/${token.token_address}`, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="font-semibold mb-2">No Tokens Found</h3>
                      <p>This wallet address does not currently hold any verified ERC-20 tokens.</p>
                      <p className="text-sm mt-2">
                        ETH Balance: {parseFloat(walletData.ethBalance.balance || "0").toFixed(4)} ETH
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Special WETH Check */}
              {walletAddress.toLowerCase() === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" && (
                <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">WETH Contract Address Detected</h3>
                        <p className="text-sm text-muted-foreground">
                          This is the WETH (Wrapped Ethereum) contract address, not a personal wallet.
                          The contract holds all WETH tokens in the ecosystem.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}