import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wallet, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Network,
  Layers
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NetworkConfig {
  id: number;
  name: string;
  symbol: string;
  explorer: string;
  moralisChain: string;
}

const NETWORKS: NetworkConfig[] = [
  { id: 1, name: "Ethereum", symbol: "ETH", explorer: "https://etherscan.io", moralisChain: "eth" },
  { id: 10, name: "Optimism", symbol: "ETH", explorer: "https://optimistic.etherscan.io", moralisChain: "optimism" },
  { id: 137, name: "Polygon", symbol: "MATIC", explorer: "https://polygonscan.com", moralisChain: "polygon" },
  { id: 56, name: "BSC", symbol: "BNB", explorer: "https://bscscan.com", moralisChain: "bsc" },
  { id: 42161, name: "Arbitrum", symbol: "ETH", explorer: "https://arbiscan.io", moralisChain: "arbitrum" }
];

const PRESET_ADDRESSES = [
  {
    name: "WETH Contract",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    description: "Wrapped Ethereum contract on Ethereum mainnet",
    network: 1
  },
  {
    name: "Optimism WETH",
    address: "0x4200000000000000000000000000000000000006",
    description: "WETH contract on Optimism network",
    network: 10
  },
  {
    name: "Example Wallet",
    address: "0xf32e8ec4ef5ed087267481e1323083a57886b7e8",
    description: "Sample wallet address from recent API call",
    network: 1
  }
];

export default function MultiAddressAnalyzer() {
  const [targetAddress, setTargetAddress] = useState("0x4200000000000000000000000000000000000006");
  const [selectedNetwork, setSelectedNetwork] = useState(10);
  const [analysisTriggered, setAnalysisTriggered] = useState(false);
  const { toast } = useToast();

  const currentNetwork = NETWORKS.find(n => n.id === selectedNetwork) || NETWORKS[0];

  // Analyze address across multiple networks
  const { data: analysisData, isLoading, error } = useQuery({
    queryKey: [`address-analysis`, targetAddress, selectedNetwork],
    queryFn: async () => {
      if (!targetAddress) return null;
      
      const results = {
        address: targetAddress,
        network: currentNetwork,
        tokens: [],
        balance: { native: "0", usd: 0 },
        contractInfo: null,
        nftPositions: [],
        isContract: false
      };

      try {
        // Check if address is a contract
        const contractCheck = await fetch(`/api/address/${targetAddress}/info?chainId=${selectedNetwork}`);
        if (contractCheck.ok) {
          results.contractInfo = await contractCheck.json();
          results.isContract = results.contractInfo?.type === 'contract';
        }

        // Get token balances
        const tokensResponse = await fetch(`/api/wallet/${targetAddress}/tokens?chainId=${selectedNetwork}`);
        if (tokensResponse.ok) {
          const tokensData = await tokensResponse.json();
          results.tokens = tokensData.filter((token: any) => 
            parseFloat(token.balance_formatted) > 0 && !token.possible_spam
          );
        }

        // Get native balance
        const balanceResponse = await fetch(`/api/wallet/${targetAddress}/balance?chainId=${selectedNetwork}`);
        if (balanceResponse.ok) {
          const balanceData = await balanceResponse.json();
          results.balance = {
            native: balanceData.balance || "0",
            usd: balanceData.value || 0
          };
        }

        // Check for V3/V4 positions if on supported networks
        if ([1, 10, 137, 42161].includes(selectedNetwork)) {
          const positionsResponse = await fetch(`/api/positions/v3/${targetAddress}?chainId=${selectedNetwork}`);
          if (positionsResponse.ok) {
            results.nftPositions = await positionsResponse.json();
          }
        }

        return results;
      } catch (error) {
        console.error('Analysis error:', error);
        throw error;
      }
    },
    enabled: analysisTriggered && !!targetAddress,
    refetchOnWindowFocus: false,
  });

  const handleAnalyze = () => {
    if (!targetAddress) {
      toast({
        title: "Missing address",
        description: "Please enter an address to analyze",
        variant: "destructive"
      });
      return;
    }
    setAnalysisTriggered(true);
  };

  const loadPresetAddress = (preset: typeof PRESET_ADDRESSES[0]) => {
    setTargetAddress(preset.address);
    setSelectedNetwork(preset.network);
    setAnalysisTriggered(false);
  };

  const formatBalance = (balance: string, decimals: number = 18) => {
    const num = parseFloat(balance) / Math.pow(10, decimals);
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
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
        <Network className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Multi-Chain Address Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze token ownership and positions across multiple blockchain networks
          </p>
        </div>
      </div>

      {/* Preset Addresses */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRESET_ADDRESSES.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-4 h-auto text-left flex flex-col items-start gap-1"
                onClick={() => loadPresetAddress(preset)}
              >
                <div className="font-semibold">{preset.name}</div>
                <div className="text-xs text-muted-foreground">{preset.description}</div>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {formatAddress(preset.address)}
                </code>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Input */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Enter wallet or contract address..."
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
                className="font-mono"
              />
            </div>
            <Select value={selectedNetwork.toString()} onValueChange={(value) => setSelectedNetwork(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NETWORKS.map((network) => (
                  <SelectItem key={network.id} value={network.id.toString()}>
                    {network.name} ({network.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
            {isLoading ? (
              <AlertCircle className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Analyzing..." : "Analyze Address"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {analysisTriggered && (
        <div className="space-y-4">
          {error && (
            <Card className="border-destructive">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <span>Analysis failed: {error.message}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5 animate-spin" />
                  <span>Analyzing address on {currentNetwork.name}...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {analysisData && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tokens">Tokens ({analysisData.tokens.length})</TabsTrigger>
                <TabsTrigger value="positions">Positions ({analysisData.nftPositions.length})</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Address Analysis - {analysisData.network.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Address Type</div>
                        <Badge variant={analysisData.isContract ? "secondary" : "default"}>
                          {analysisData.isContract ? "Contract" : "Wallet"}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Token Types</div>
                        <div className="font-semibold">{analysisData.tokens.length}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{analysisData.network.symbol} Balance</div>
                        <div className="font-semibold">
                          {parseFloat(analysisData.balance.native).toFixed(4)} {analysisData.network.symbol}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Est. Value</div>
                        <div className="font-semibold">${analysisData.balance.usd.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Full Address</div>
                      <code className="text-sm font-mono break-all">{analysisData.address}</code>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tokens" className="space-y-4">
                {analysisData.tokens.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Token Holdings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisData.tokens.map((token: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {token.logo ? (
                                <img src={token.logo} alt={token.symbol} className="w-8 h-8 rounded-full" />
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
                              onClick={() => window.open(`${analysisData.network.explorer}/token/${token.token_address}`, '_blank')}
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
                        <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="font-semibold mb-2">No Tokens Found</h3>
                        <p>This address does not hold any tokens on {analysisData.network.name}.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="positions" className="space-y-4">
                {analysisData.nftPositions.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Liquidity Positions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisData.nftPositions.map((position: any, index: number) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold">Position #{position.tokenId}</div>
                                <div className="text-sm text-muted-foreground">
                                  {position.token0?.symbol}/{position.token1?.symbol}
                                </div>
                              </div>
                              <Badge variant={position.inRange ? "default" : "secondary"}>
                                {position.inRange ? "In Range" : "Out of Range"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center text-muted-foreground">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="font-semibold mb-2">No Positions Found</h3>
                        <p>This address does not have any liquidity positions on {analysisData.network.name}.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Network</div>
                          <div className="font-medium">{analysisData.network.name}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Chain ID</div>
                          <div className="font-medium">{analysisData.network.id}</div>
                        </div>
                      </div>
                      
                      {analysisData.isContract && analysisData.contractInfo && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                          <h4 className="font-semibold mb-2">Contract Information</h4>
                          <div className="text-sm space-y-1">
                            <div>Type: {analysisData.contractInfo.type}</div>
                            {analysisData.contractInfo.name && (
                              <div>Name: {analysisData.contractInfo.name}</div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => window.open(`${analysisData.network.explorer}/address/${analysisData.address}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Explorer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
}