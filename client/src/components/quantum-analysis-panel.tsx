import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, TrendingDown, Activity, Zap, Shield, Target } from "lucide-react";
import QuantumLiquidityAnalyzer, { type PoolAnalysis } from "@/lib/quantum-liquidity";
import type { PoolStats, SwapEvent } from "@shared/schema";

interface QuantumAnalysisPanelProps {
  poolAddress: string;
  dexPlatform: string;
  chainId: number;
}

export default function QuantumAnalysisPanel({ 
  poolAddress, 
  dexPlatform, 
  chainId 
}: QuantumAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<PoolAnalysis | null>(null);

  const { data: poolStats } = useQuery<PoolStats>({
    queryKey: [`/api/pools/${poolAddress}/stats`, { dex: dexPlatform, chainId }],
    enabled: false, // Disable to prevent automatic requests
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const { data: swapEvents } = useQuery<SwapEvent[]>({
    queryKey: [`/api/pools/${poolAddress}/swaps`, { dex: dexPlatform, chainId }],
    enabled: false, // Disable to prevent automatic requests
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!poolStats || !swapEvents) return;

    // Generate mock price and volume history for demonstration
    const priceHistory = Array.from({ length: 24 }, (_, i) => 
      parseFloat(poolStats.currentPrice) * (0.95 + Math.random() * 0.1)
    );
    
    const volumeHistory = Array.from({ length: 24 }, (_, i) => 
      Math.random() * parseFloat(poolStats.totalVolume) * 0.1
    );

    const analysisData = QuantumLiquidityAnalyzer.analyzePool({
      poolAddress,
      dexPlatform,
      chainId,
      priceHistory,
      volumeHistory,
      volume24h: parseFloat(poolStats.dailyVolume || "0"),
      tvl: parseFloat(poolStats.totalVolume),
      totalTrades: poolStats.dailyTrades,
      uniqueTraders: Math.floor(poolStats.dailyTrades * 0.7), // Estimate
      currentPrice: parseFloat(poolStats.currentPrice),
      crossPlatformPrices: [
        { platform: "Uniswap", price: parseFloat(poolStats.currentPrice) },
        { platform: "SushiSwap", price: parseFloat(poolStats.currentPrice) * 1.002 },
        { platform: "PancakeSwap", price: parseFloat(poolStats.currentPrice) * 0.998 }
      ]
    });

    setAnalysis(analysisData);
  }, [poolStats, swapEvents, poolAddress, dexPlatform, chainId]);

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="text-primary mr-2 h-5 w-5" />
            Quantum Liquidity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            Loading quantum analysis...
          </div>
        </CardContent>
      </Card>
    );
  }

  const { metrics, recommendations, riskLevel } = analysis;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-green-500/20 text-green-500';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-500';
      case 'HIGH': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Main Quantum Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="text-primary mr-2 h-5 w-5" />
              Quantum Liquidity Score
            </div>
            <Badge className={getRiskColor(riskLevel)}>
              {riskLevel} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor(metrics.quantumScore)}`}>
              {metrics.quantumScore.toFixed(1)}
            </div>
            <Progress 
              value={metrics.quantumScore} 
              className="w-full h-3"
            />
            <div className="text-sm text-muted-foreground">
              Overall pool efficiency and trading conditions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="text-primary mr-2 h-5 w-5" />
            Detailed Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Correlation Ratio</span>
                <span className={`font-semibold ${getScoreColor(metrics.correlationRatio)}`}>
                  {metrics.correlationRatio.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.correlationRatio} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Volume Efficiency</span>
                <span className={`font-semibold ${getScoreColor(metrics.volumeEfficiency)}`}>
                  {metrics.volumeEfficiency.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.volumeEfficiency} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Participation Rate</span>
                <span className={`font-semibold ${getScoreColor(metrics.participationRate)}`}>
                  {metrics.participationRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.participationRate} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Liquidity Depth</span>
                <span className={`font-semibold ${getScoreColor(metrics.liquidityDepth)}`}>
                  {metrics.liquidityDepth.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.liquidityDepth} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Price Stability</span>
                <span className={`font-semibold ${getScoreColor(metrics.priceStability)}`}>
                  {metrics.priceStability.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.priceStability} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Arbitrage Score</span>
                <span className={`font-semibold ${getScoreColor(100 - metrics.arbitrageScore)}`}>
                  {metrics.arbitrageScore.toFixed(1)}%
                </span>
              </div>
              <Progress value={metrics.arbitrageScore} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="text-primary mr-2 h-5 w-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <Alert key={index}>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  {recommendation}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}