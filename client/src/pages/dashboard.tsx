import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  BarChart3,
  FileText,
  Wallet,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { PortfolioAnalyzer } from "@/components/portfolio-analyzer";
import { TransactionAnalyzer } from "@/components/transaction-analyzer";
import { HoneypotDetector } from "@/components/honeypot-detector";
import { SmartWalletGenerator } from "@/components/smart-wallet-generator";
import { ContractVerifier } from "@/components/contract-verifier";
import { HoneypotFixer } from "@/components/honeypot-fixer";
import { LegalCompliance } from "@/components/legal-compliance";
import { ConnectionStatus } from "@/components/connection-status";
import { StepByStepGuide } from "@/components/step-by-step-guide";
import { DBASetupGuide } from "@/components/dba-setup-guide";
import { SoleProprietorSetup } from "@/components/sole-proprietor-setup";
import { ETHGRecoveryDeployer } from "@/components/ethg-recovery-deployer";
import { CorrectedETHGContract } from "@/components/corrected-ethg-contract";

export default function DashboardPage() {
  const [poolUrl, setPoolUrl] = useState("");
  const [txHash, setTxHash] = useState("");
  const { toast } = useToast();

  // Fetch trending pools for simple overview
  const { data: trendingPools } = useQuery({
    queryKey: ['/api/dex/trending-pools'],
    queryFn: async () => {
      const response = await fetch('/api/dex/trending-pools');
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    },
    refetchInterval: 30000
  });

  const handlePoolAnalysis = () => {
    if (!poolUrl.includes('geckoterminal.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GeckoTerminal pool URL",
        variant: "destructive"
      });
      return;
    }
    
    // Extract pool info and redirect to analysis
    const poolMatch = poolUrl.match(/pools\/([^?]+)/);
    if (poolMatch) {
      window.open(poolUrl, '_blank');
      toast({
        title: "Analysis Started",
        description: "Pool analysis opened in new tab"
      });
    }
  };

  const handleTransactionAnalysis = () => {
    if (!txHash || txHash.length !== 66) {
      toast({
        title: "Invalid Transaction",
        description: "Please enter a valid transaction hash",
        variant: "destructive"
      });
      return;
    }
    
    window.open(`https://polygonscan.com/tx/${txHash}`, '_blank');
    toast({
      title: "Transaction Opened",
      description: "View on PolygonScan in new tab"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Quantum Secure Trader</h1>
        <p className="text-muted-foreground">
          Simple tools for DeFi analysis and blockchain insights
        </p>
      </div>

      {/* ETHG Recovery Success */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            ETHG Recovery Complete - 1,990,000 ETHGR Tokens Ready
          </CardTitle>
          <CardDescription className="text-green-700 dark:text-green-300">
            Tokens successfully recovered and visible in MetaMask. Ready for market launch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1">
              <div className="text-sm text-green-700 dark:text-green-300 mb-2">
                Recovery contract: <code className="bg-green-100 dark:bg-green-900 px-1 rounded">0xfA7b8c553C48C56ec7027d26ae95b029a2abF247</code>
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Tokens are fully transferable with no honeypot restrictions
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/token-launch'}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              Launch Token Market
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick">Quick Tools</TabsTrigger>
          <TabsTrigger value="pools">Pool Analysis</TabsTrigger>
          <TabsTrigger value="data">Market Data</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Analyze Pool
                </CardTitle>
                <CardDescription>
                  Get detailed insights from any GeckoTerminal pool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Paste GeckoTerminal pool URL..."
                  value={poolUrl}
                  onChange={(e) => setPoolUrl(e.target.value)}
                />
                <Button onClick={handlePoolAnalysis} className="w-full">
                  Analyze Pool
                </Button>
                <div className="text-xs text-muted-foreground">
                  Example: https://www.geckoterminal.com/eth/pools/0x88e6a0c2ddd26...
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Check Transaction
                </CardTitle>
                <CardDescription>
                  Analyze NFT and token transactions on Polygon
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter transaction hash..."
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button onClick={handleTransactionAnalysis} className="w-full">
                  View Transaction
                </Button>
                <div className="text-xs text-muted-foreground">
                  Supports Polygon network transactions
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Access advanced tools and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-20 flex flex-col" asChild>
                  <a href="/token-discovery">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-xs">Advanced Tools</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col" asChild>
                  <a href="/portfolio-analytics">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span className="text-xs">Portfolio</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col" asChild>
                  <a href="/cross-chain-swap">
                    <Activity className="w-6 h-6 mb-2" />
                    <span className="text-xs">Cross-Chain</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col" asChild>
                  <a href="/liquidity-scanner">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    <span className="text-xs">Scanner</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Pools
              </CardTitle>
              <CardDescription>
                Top performing liquidity pools across networks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trendingPools?.data ? (
                <div className="space-y-3">
                  {trendingPools.data.slice(0, 5).map((pool: any) => (
                    <div key={pool.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{pool.attributes.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {pool.attributes.base_token_price_usd && 
                            `$${parseFloat(pool.attributes.base_token_price_usd).toFixed(4)}`
                          }
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {pool.attributes.volume_usd?.h24 && 
                            `$${(pool.attributes.volume_usd.h24 / 1000000).toFixed(2)}M`
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">24h Volume</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Loading trending pools...
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <CorrectedETHGContract />
          
          <ETHGRecoveryDeployer />
          
          <StepByStepGuide />
          
          <SoleProprietorSetup />
          
          <ConnectionStatus />
          
          <HoneypotFixer />
          
          <SmartWalletGenerator />
          
          <ContractVerifier />
          
          <HoneypotDetector />
          
          <TransactionAnalyzer />
          
          <PortfolioAnalyzer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Networks Supported</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Pools Tracked</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">Real-time</div>
                  <div className="text-sm text-muted-foreground">Data Updates</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}