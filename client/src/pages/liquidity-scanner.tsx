import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  BarChart3, 
  Shield,
  Zap,
  ExternalLink,
  Target
} from "lucide-react";
import SearchControls from "@/components/search-controls";
import QuantumAnalysisPanel from "@/components/quantum-analysis-panel";
import TokenContractAnalyzer from "@/components/token-contract-analyzer";
import WalletPortfolioAnalyzer from "@/components/wallet-portfolio-analyzer";
import LiveFeed from "@/components/live-feed";
import MarketMetrics from "@/components/market-metrics";
import PriceChart from "@/components/price-chart";
import VolumeChart from "@/components/volume-chart";
import TransactionHistory from "@/components/transaction-history";

export default function LiquidityScanner() {
  const [selectedPool, setSelectedPool] = useState("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640");
  const [selectedDex, setSelectedDex] = useState("uniswap-v3");
  const [selectedChain, setSelectedChain] = useState(1);
  const [scanMode, setScanMode] = useState<"pool" | "token" | "wallet">("pool");

  const quickScanTargets = [
    {
      name: "WETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      type: "token",
      chain: "Ethereum",
      description: "Wrapped Ether - Most liquid token"
    },
    {
      name: "USDC/ETH Pool",
      address: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
      type: "pool",
      chain: "Ethereum",
      description: "Uniswap V3 0.05% fee tier"
    },
    {
      name: "LINK Token",
      address: "0x514910771af9ca656af840dff83e8264ecf986ca",
      type: "token",
      chain: "Ethereum",
      description: "Chainlink - High volume DeFi token"
    }
  ];

  const handleQuickScan = (target: typeof quickScanTargets[0]) => {
    if (target.type === "pool") {
      setSelectedPool(target.address);
      setScanMode("pool");
    } else if (target.type === "token") {
      setScanMode("token");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Liquidity Scanner Pro
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Advanced multi-chain DEX liquidity analysis with real-time insights and quantum metrics
          </p>
        </div>

        {/* Quick Scan Targets */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Scan Targets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickScanTargets.map((target, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleQuickScan(target)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={target.type === "pool" ? "default" : "secondary"}>
                        {target.type.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{target.name}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{target.description}</p>
                  <code className="text-xs bg-muted p-1 rounded block font-mono">
                    {target.address}
                  </code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scan Mode Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analysis Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Button
                variant={scanMode === "pool" ? "default" : "outline"}
                onClick={() => setScanMode("pool")}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Pool Scanner
              </Button>
              <Button
                variant={scanMode === "token" ? "default" : "outline"}
                onClick={() => setScanMode("token")}
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Token Analyzer
              </Button>
              <Button
                variant={scanMode === "wallet" ? "default" : "outline"}
                onClick={() => setScanMode("wallet")}
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Wallet Scanner
              </Button>
            </div>

            {scanMode === "pool" && (
              <SearchControls
                selectedPool={selectedPool}
                selectedDex={selectedDex}
                selectedChain={selectedChain}
                onPoolChange={setSelectedPool}
                onDexChange={(dex, chain) => {
                  setSelectedDex(dex);
                  setSelectedChain(chain);
                }}
              />
            )}
          </CardContent>
        </Card>

        {/* Main Analysis Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quantum">Quantum Analysis</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {scanMode === "pool" && (
              <>
                {/* Real-time Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <LiveFeed poolAddress={selectedPool} />
                  </div>
                  <div className="lg:col-span-2">
                    <MarketMetrics poolAddress={selectedPool} />
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PriceChart poolAddress={selectedPool} />
                  <VolumeChart poolAddress={selectedPool} />
                </div>

                {/* Transaction History */}
                <TransactionHistory poolAddress={selectedPool} />
              </>
            )}

            {scanMode === "token" && (
              <div className="space-y-6">
                <TokenContractAnalyzer />
              </div>
            )}

            {scanMode === "wallet" && (
              <div className="space-y-6">
                <WalletPortfolioAnalyzer />
              </div>
            )}
          </TabsContent>

          <TabsContent value="quantum" className="space-y-6">
            {scanMode === "pool" && (
              <QuantumAnalysisPanel
                poolAddress={selectedPool}
                dexPlatform={selectedDex}
                chainId={selectedChain}
              />
            )}
            {scanMode !== "pool" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Quantum Analysis</h3>
                    <p className="text-muted-foreground">
                      Select a liquidity pool to access advanced quantum metrics and correlation analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <TokenContractAnalyzer />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <WalletPortfolioAnalyzer />
          </TabsContent>
        </Tabs>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <div className="ml-2">
                  <p className="text-sm font-medium">Active Scans</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-blue-500" />
                <div className="ml-2">
                  <p className="text-sm font-medium">Total Volume</p>
                  <p className="text-2xl font-bold">$2.1M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                <div className="ml-2">
                  <p className="text-sm font-medium">Pools Tracked</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-orange-500" />
                <div className="ml-2">
                  <p className="text-sm font-medium">Security Score</p>
                  <p className="text-2xl font-bold">95%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}