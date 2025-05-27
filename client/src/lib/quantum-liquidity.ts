// Quantum Liquidity Analysis System
export interface LiquidityMetrics {
  correlationRatio: number;
  volumeEfficiency: number;
  participationRate: number;
  liquidityDepth: number;
  priceStability: number;
  arbitrageScore: number;
  quantumScore: number;
}

export interface PoolAnalysis {
  poolAddress: string;
  dexPlatform: string;
  chainId: number;
  metrics: LiquidityMetrics;
  recommendations: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: Date;
}

export class QuantumLiquidityAnalyzer {
  // Calculate correlation ratio between volume and price movements
  static calculateCorrelationRatio(priceData: number[], volumeData: number[]): number {
    if (priceData.length !== volumeData.length || priceData.length < 2) return 0;

    const priceChanges = priceData.slice(1).map((price, i) => 
      ((price - priceData[i]) / priceData[i]) * 100
    );
    const volumeChanges = volumeData.slice(1).map((volume, i) => 
      ((volume - volumeData[i]) / volumeData[i]) * 100
    );

    const correlation = this.pearsonCorrelation(priceChanges, volumeChanges);
    return Math.abs(correlation);
  }

  // Calculate volume efficiency metric
  static calculateVolumeEfficiency(volume24h: number, tvl: number): number {
    if (tvl === 0) return 0;
    const efficiency = (volume24h / tvl) * 100;
    return Math.min(efficiency, 100); // Cap at 100%
  }

  // Calculate participation rate based on unique traders
  static calculateParticipationRate(totalTrades: number, uniqueTraders: number): number {
    if (totalTrades === 0) return 0;
    return (uniqueTraders / totalTrades) * 100;
  }

  // Calculate liquidity depth score
  static calculateLiquidityDepth(bid: number, ask: number, spread: number): number {
    if (spread === 0) return 100;
    const depthScore = ((bid + ask) / 2) / spread;
    return Math.min(depthScore / 10, 100); // Normalize to 0-100
  }

  // Calculate price stability metric
  static calculatePriceStability(priceData: number[]): number {
    if (priceData.length < 2) return 100;

    const volatility = this.calculateVolatility(priceData);
    return Math.max(0, 100 - (volatility * 100));
  }

  // Calculate arbitrage opportunity score
  static calculateArbitrageScore(
    currentPrice: number,
    crossPlatformPrices: { platform: string; price: number }[]
  ): number {
    if (crossPlatformPrices.length === 0) return 0;

    const prices = crossPlatformPrices.map(p => p.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    
    if (minPrice === 0) return 0;
    
    const priceSpread = ((maxPrice - minPrice) / minPrice) * 100;
    return Math.min(priceSpread, 100);
  }

  // Calculate comprehensive quantum score
  static calculateQuantumScore(metrics: Omit<LiquidityMetrics, 'quantumScore'>): number {
    const weights = {
      correlationRatio: 0.2,
      volumeEfficiency: 0.2,
      participationRate: 0.15,
      liquidityDepth: 0.2,
      priceStability: 0.15,
      arbitrageScore: 0.1
    };

    const score = 
      metrics.correlationRatio * weights.correlationRatio +
      metrics.volumeEfficiency * weights.volumeEfficiency +
      metrics.participationRate * weights.participationRate +
      metrics.liquidityDepth * weights.liquidityDepth +
      metrics.priceStability * weights.priceStability +
      metrics.arbitrageScore * weights.arbitrageScore;

    return Math.round(score * 100) / 100;
  }

  // Generate trading recommendations based on analysis
  static generateRecommendations(metrics: LiquidityMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.quantumScore > 80) {
      recommendations.push("Excellent liquidity conditions - optimal for large trades");
    } else if (metrics.quantumScore > 60) {
      recommendations.push("Good liquidity conditions - suitable for moderate trading");
    } else {
      recommendations.push("Consider alternative pools or smaller trade sizes");
    }

    if (metrics.correlationRatio < 30) {
      recommendations.push("Low price-volume correlation - monitor for unusual activity");
    }

    if (metrics.volumeEfficiency > 50) {
      recommendations.push("High volume efficiency - active trading environment");
    }

    if (metrics.arbitrageScore > 20) {
      recommendations.push("Arbitrage opportunities detected across platforms");
    }

    if (metrics.priceStability < 70) {
      recommendations.push("High volatility detected - use limit orders");
    }

    if (metrics.liquidityDepth < 50) {
      recommendations.push("Low liquidity depth - expect higher slippage");
    }

    return recommendations;
  }

  // Determine risk level based on metrics
  static assessRiskLevel(metrics: LiquidityMetrics): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (metrics.quantumScore > 75 && metrics.priceStability > 70) {
      return 'LOW';
    } else if (metrics.quantumScore > 50 && metrics.priceStability > 50) {
      return 'MEDIUM';
    } else {
      return 'HIGH';
    }
  }

  // Complete pool analysis
  static analyzePool(data: {
    poolAddress: string;
    dexPlatform: string;
    chainId: number;
    priceHistory: number[];
    volumeHistory: number[];
    volume24h: number;
    tvl: number;
    totalTrades: number;
    uniqueTraders: number;
    currentPrice: number;
    crossPlatformPrices?: { platform: string; price: number }[];
    bidAsk?: { bid: number; ask: number; spread: number };
  }): PoolAnalysis {
    const metrics: LiquidityMetrics = {
      correlationRatio: this.calculateCorrelationRatio(data.priceHistory, data.volumeHistory),
      volumeEfficiency: this.calculateVolumeEfficiency(data.volume24h, data.tvl),
      participationRate: this.calculateParticipationRate(data.totalTrades, data.uniqueTraders),
      liquidityDepth: data.bidAsk 
        ? this.calculateLiquidityDepth(data.bidAsk.bid, data.bidAsk.ask, data.bidAsk.spread)
        : 75, // Default decent score if no bid/ask data
      priceStability: this.calculatePriceStability(data.priceHistory),
      arbitrageScore: data.crossPlatformPrices 
        ? this.calculateArbitrageScore(data.currentPrice, data.crossPlatformPrices)
        : 0,
      quantumScore: 0 // Will be calculated below
    };

    metrics.quantumScore = this.calculateQuantumScore(metrics);

    return {
      poolAddress: data.poolAddress,
      dexPlatform: data.dexPlatform,
      chainId: data.chainId,
      metrics,
      recommendations: this.generateRecommendations(metrics),
      riskLevel: this.assessRiskLevel(metrics),
      timestamp: new Date()
    };
  }

  // Helper: Pearson correlation coefficient
  private static pearsonCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    if (n === 0) return 0;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  }

  // Helper: Calculate volatility
  private static calculateVolatility(prices: number[]): number {
    if (prices.length < 2) return 0;

    const returns = prices.slice(1).map((price, i) => 
      Math.log(price / prices[i])
    );

    const mean = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }
}

export default QuantumLiquidityAnalyzer;