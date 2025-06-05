import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign,
  ExternalLink,
  AlertCircle,
  TrendingUp,
  Wallet,
  Target,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FundingData {
  drips: {
    ethereum: {
      ownedBy: string;
    };
  };
  opRetro: {
    projectId: string;
  };
}

const FUNDING_CONFIG: FundingData = {
  "drips": {
    "ethereum": {
      "ownedBy": "0x86308c59a6005d012C51Eef104bBc21786aC5D2E"
    }
  },
  "opRetro": {
    "projectId": "0x4562c0630907577f433cad78c7e2cc03349d918b6c14ef982f11a2678f5999ad"
  }
};

export default function FundingTracker() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();

  // Fetch wallet balance for Drips owner
  const { data: dripsBalance, isLoading: dripsLoading } = useQuery({
    queryKey: ['drips-balance', FUNDING_CONFIG.drips.ethereum.ownedBy],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/${FUNDING_CONFIG.drips.ethereum.ownedBy}/balance?chainId=1`);
      if (!response.ok) throw new Error('Failed to fetch Drips balance');
      return response.json();
    },
    refetchInterval: 60000,
  });

  // Fetch token holdings for funding wallet
  const { data: fundingTokens, isLoading: tokensLoading } = useQuery({
    queryKey: ['funding-tokens', FUNDING_CONFIG.drips.ethereum.ownedBy],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/${FUNDING_CONFIG.drips.ethereum.ownedBy}/tokens?chainId=1`);
      if (!response.ok) throw new Error('Failed to fetch funding tokens');
      return response.json();
    },
    refetchInterval: 60000,
  });

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Address copied successfully",
    });
  };

  const formatBalance = (balance: string, decimals: number = 18) => {
    const num = parseFloat(balance) / Math.pow(10, decimals);
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(6);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Project Funding & Rewards</h1>
          <p className="text-muted-foreground">
            Track project funding sources and reward distributions
          </p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drips">Drips Protocol</TabsTrigger>
          <TabsTrigger value="optimism">OP Retro</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">ETH Balance</p>
                    <p className="text-2xl font-bold">
                      {dripsLoading ? "Loading..." : `${parseFloat(dripsBalance?.balance || "0").toFixed(4)} ETH`}
                    </p>
                  </div>
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">USD Value</p>
                    <p className="text-2xl font-bold">
                      {dripsLoading ? "Loading..." : `$${(dripsBalance?.value || 0).toFixed(2)}`}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Token Holdings</p>
                    <p className="text-2xl font-bold">
                      {tokensLoading ? "Loading..." : fundingTokens?.length || 0}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Funding Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Drips Protocol</div>
                      <div className="text-sm text-muted-foreground">Ethereum funding stream</div>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Optimism RetroPGF</div>
                      <div className="text-sm text-muted-foreground">Public goods funding</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Registered</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Drips Protocol Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-semibold mb-2">Funding Wallet</h3>
                  <div className="flex items-center justify-between">
                    <code className="text-sm bg-background px-2 py-1 rounded">
                      {FUNDING_CONFIG.drips.ethereum.ownedBy}
                    </code>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(FUNDING_CONFIG.drips.ethereum.ownedBy)}
                      >
                        Copy
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://etherscan.io/address/${FUNDING_CONFIG.drips.ethereum.ownedBy}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Balance</div>
                    <div className="text-xl font-bold">
                      {dripsLoading ? "Loading..." : `${parseFloat(dripsBalance?.balance || "0").toFixed(6)} ETH`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">USD Value</div>
                    <div className="text-xl font-bold">
                      {dripsLoading ? "Loading..." : `$${(dripsBalance?.value || 0).toFixed(2)}`}
                    </div>
                  </div>
                </div>

                {fundingTokens && fundingTokens.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Token Holdings</h4>
                    <div className="space-y-2">
                      {fundingTokens.slice(0, 5).map((token: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{token.symbol}</span>
                            <span className="text-sm text-muted-foreground">{token.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {formatBalance(token.balance, token.decimals)} {token.symbol}
                            </div>
                            {token.usd_value && (
                              <div className="text-sm text-muted-foreground">
                                ${parseFloat(token.usd_value).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimism" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Optimism RetroPGF
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                  <h3 className="font-semibold mb-2">Project Registration</h3>
                  <div className="flex items-center justify-between">
                    <code className="text-sm bg-background px-2 py-1 rounded break-all">
                      {FUNDING_CONFIG.opRetro.projectId}
                    </code>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(FUNDING_CONFIG.opRetro.projectId)}
                      >
                        Copy ID
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`https://vote.optimism.io/projects/${FUNDING_CONFIG.opRetro.projectId}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Project Impact</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Multi-chain DEX analytics platform</li>
                      <li>• Real-time trading data aggregation</li>
                      <li>• Open-source blockchain tools</li>
                      <li>• Developer-friendly APIs</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Public Good Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Free access to trading insights</li>
                      <li>• Transparent market analysis</li>
                      <li>• Educational resources</li>
                      <li>• Community-driven development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funding Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Platform Value</h4>
                  <p className="text-sm text-muted-foreground">
                    Quantum Secure Trader provides significant value to the DeFi ecosystem through:
                  </p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Real-time cross-chain trading analytics</li>
                    <li>• Authentic blockchain data integration</li>
                    <li>• Advanced liquidity position management</li>
                    <li>• Multi-network compatibility</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">7+</div>
                    <div className="text-sm text-muted-foreground">Networks Supported</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-muted-foreground">Authentic Data</div>
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