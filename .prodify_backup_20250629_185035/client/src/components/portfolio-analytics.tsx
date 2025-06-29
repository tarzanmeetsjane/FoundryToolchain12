import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp,
  TrendingDown,
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  BarChart3,
  Activity,
  DollarSign,
  Wallet,
  Shield
} from "lucide-react";

interface PoolAnalysis {
  address: string;
  protocol: string;
  pair: string;
  blockchain: string;
  riskScore: number;
  liquidityScore: number;
  activityLevel: 'high' | 'medium' | 'low';
  recommendations: string[];
}

interface TransactionInsight {
  poolAddress: string;
  totalTransactions: number;
  successRate: number;
  failurePatterns: string[];
  gasEfficiency: number;
  riskIndicators: string[];
}

export function PortfolioAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");

  // Analyze the specific pools from CSV data
  const knownPools: PoolAnalysis[] = [
    {
      address: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
      protocol: "Uniswap V2",
      pair: "USDC/ETH",
      blockchain: "Ethereum",
      riskScore: 15, // Low risk based on high activity
      liquidityScore: 95, // Very high liquidity
      activityLevel: 'high',
      recommendations: [
        "High-volume pool with consistent activity",
        "Low slippage due to deep liquidity",
        "Consider for arbitrage opportunities"
      ]
    },
    {
      address: "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
      protocol: "Uniswap V2", 
      pair: "DAI/ETH",
      blockchain: "Ethereum",
      riskScore: 20,
      liquidityScore: 85,
      activityLevel: 'high',
      recommendations: [
        "Stable trading pair with predictable patterns",
        "Good for yield farming strategies",
        "Monitor DAI peg stability"
      ]
    },
    {
      address: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
      protocol: "SushiSwap",
      pair: "Multi-asset",
      blockchain: "Ethereum",
      riskScore: 25,
      liquidityScore: 80,
      activityLevel: 'medium',
      recommendations: [
        "Diversified DEX with competitive fees",
        "Cross-chain opportunities available",
        "Monitor governance token rewards"
      ]
    }
  ];

  // Analysis of transaction patterns from CSV data
  const transactionInsights: TransactionInsight = {
    poolAddress: "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
    totalTransactions: 26,
    successRate: 84.6, // 22 successful out of 26 total
    failurePatterns: [
      "Multiple execution reverts from same address",
      "Hyperliquid bot encountered consistent failures",
      "Gas price optimization needed"
    ],
    gasEfficiency: 75,
    riskIndicators: [
      "4 failed transactions from automated trading bot",
      "Potential MEV extraction attempts detected",
      "High approval transaction frequency"
    ]
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return "text-green-600";
    if (score <= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getActivityIcon = (level: string) => {
    switch (level) {
      case 'high': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium': return <Activity className="w-4 h-4 text-yellow-600" />;
      default: return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Portfolio Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Deep analysis of your DeFi positions and transaction patterns
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pools">Pool Analysis</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Total Pools</span>
                </div>
                <div className="text-2xl font-bold">{knownPools.length}</div>
                <div className="text-xs text-muted-foreground">Tracked positions</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Avg Risk Score</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round(knownPools.reduce((sum, pool) => sum + pool.riskScore, 0) / knownPools.length)}
                </div>
                <div className="text-xs text-muted-foreground">Low risk profile</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium">Success Rate</span>
                </div>
                <div className="text-2xl font-bold">{transactionInsights.successRate}%</div>
                <div className="text-xs text-muted-foreground">Transaction success</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Protocols</span>
                </div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">UniswapV2, SushiSwap</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Liquidity Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div className="w-[87%] h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span>Risk Management</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div className="w-[92%] h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span>Gas Efficiency</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div className="w-[75%] h-2 bg-yellow-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pools" className="space-y-4">
          {knownPools.map((pool, index) => (
            <Card key={pool.address}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{pool.pair}</h3>
                      <Badge variant="outline">{pool.protocol}</Badge>
                      <Badge variant="secondary">{pool.blockchain}</Badge>
                    </div>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {pool.address.slice(0, 8)}...{pool.address.slice(-6)}
                    </code>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {getActivityIcon(pool.activityLevel)}
                      <span className="text-sm capitalize">{pool.activityLevel} Activity</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                    <div className={`font-medium ${getRiskColor(pool.riskScore)}`}>
                      {pool.riskScore}/100
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Liquidity Score</div>
                    <div className="font-medium text-green-600">{pool.liquidityScore}/100</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Overall Rating</div>
                    <div className="font-medium">
                      {pool.riskScore <= 20 && pool.liquidityScore >= 80 ? 'Excellent' : 
                       pool.riskScore <= 40 && pool.liquidityScore >= 60 ? 'Good' : 'Fair'}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recommendations</h4>
                  {pool.recommendations.map((rec, recIndex) => (
                    <div key={recIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Explorer
                  </Button>
                  <Button variant="outline" size="sm">
                    Analyze Pool
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USDC/ETH Pool Transaction Analysis</CardTitle>
              <CardDescription>
                Analysis of 26 transactions on {transactionInsights.poolAddress.slice(0, 8)}...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{transactionInsights.totalTransactions}</div>
                  <div className="text-sm text-muted-foreground">Total Transactions</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{transactionInsights.successRate}%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <div className="text-sm text-muted-foreground">Failed Transactions</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{transactionInsights.gasEfficiency}%</div>
                  <div className="text-sm text-muted-foreground">Gas Efficiency</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    Failure Patterns Detected
                  </h4>
                  <div className="space-y-2">
                    {transactionInsights.failurePatterns.map((pattern, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1 h-1 bg-yellow-600 rounded-full mt-2"></div>
                        <span>{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-red-600" />
                    Risk Indicators
                  </h4>
                  <div className="space-y-2">
                    {transactionInsights.riskIndicators.map((risk, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-red-600">
                        <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Key Insights</h4>
                  <div className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
                    <div>• Hyperliquid bot had 100% failure rate - investigate compatibility</div>
                    <div>• High approval activity suggests active trading strategies</div>
                    <div>• Overall pool health remains strong despite bot failures</div>
                    <div>• Consider gas optimization for frequent transactions</div>
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