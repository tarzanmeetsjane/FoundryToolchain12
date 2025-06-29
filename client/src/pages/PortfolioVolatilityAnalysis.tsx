import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingDown, TrendingUp, AlertTriangle, DollarSign, Clock, BarChart3, Info } from 'lucide-react';

export default function PortfolioVolatilityAnalysis() {
  const [timeRange, setTimeRange] = useState('24h');

  // Portfolio data comparison
  const portfolioData = {
    previous: {
      total: 709012.93,
      ethg: 690603.54, // Estimated based on current price
      aicc: 4041.53,
      eth: 20.90,
      ethgr: 0, // Was showing N/A
      timestamp: "Previous Reading"
    },
    current: {
      total: 694665.97,
      ethg: 690603.54,
      aicc: 4041.53,
      eth: 20.90,
      ethgr: 0, // Still showing N/A
      timestamp: "Current Reading"
    }
  };

  const totalChange = portfolioData.current.total - portfolioData.previous.total;
  const percentChange = ((totalChange / portfolioData.previous.total) * 100);

  const volatilityFactors = [
    {
      factor: "ETHG Token Price Fluctuation",
      impact: "High",
      description: "2.10M ETHG tokens sensitive to market price changes",
      color: "red"
    },
    {
      factor: "Crypto Market Conditions", 
      impact: "Medium",
      description: "Overall cryptocurrency market volatility affects all holdings",
      color: "orange"
    },
    {
      factor: "ETHGR Valuation Issues",
      impact: "Unknown",
      description: "3.98M ETHGR tokens showing N/A - potential hidden value",
      color: "gray"
    },
    {
      factor: "AI Chain Coin Performance",
      impact: "Low",
      description: "AICC showing positive 0.50% gain",
      color: "green"
    }
  ];

  const stabilityStrategies = [
    "Diversify across multiple stable cryptocurrencies",
    "Monitor ETHG price movements and market conditions",
    "Resolve ETHGR valuation to unlock potential hidden value",
    "Consider partial profit-taking during high volatility periods",
    "Track trading volume and liquidity for optimal timing"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Portfolio Volatility Analysis
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Understanding Your $694,665.97 Portfolio Fluctuations
        </p>
        <Badge 
          variant="outline" 
          className={`text-lg px-4 py-2 ${totalChange < 0 ? 'bg-red-50 border-red-300 text-red-700' : 'bg-green-50 border-green-300 text-green-700'}`}
        >
          {totalChange < 0 ? '↓' : '↑'} ${Math.abs(totalChange).toLocaleString()} ({percentChange.toFixed(2)}%)
        </Badge>
      </div>

      {/* Portfolio Change Summary */}
      <Card className="mb-8 border-2 border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <TrendingDown className="h-6 w-6 mr-3" />
            Recent Portfolio Changes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-orange-700">Previous Value</h3>
              <div className="text-3xl font-bold text-slate-700">
                ${portfolioData.previous.total.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">
                Documented portfolio value
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-orange-700">Current Value</h3>
              <div className="text-3xl font-bold text-slate-700">
                ${portfolioData.current.total.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">
                Live wallet reading
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Net Change:</span>
              <span className={`text-xl font-bold ${totalChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {totalChange < 0 ? '-' : '+'}${Math.abs(totalChange).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-6 w-6 mr-3" />
            Current Asset Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <span className="font-semibold">ETHG (Ethereum Games)</span>
                <div className="text-sm text-gray-600">2.10M tokens</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-700">$690,603.54</div>
                <div className="text-sm text-gray-600">99.4% of portfolio</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <span className="font-semibold">AICC (AI Chain Coin)</span>
                <div className="text-sm text-gray-600">17,500 tokens</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-700">$4,041.53</div>
                <div className="text-sm text-green-600">+0.50%</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-semibold">ETH (Ethereum)</span>
                <div className="text-sm text-gray-600">0.009 ETH</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-700">$20.90</div>
                <div className="text-sm text-gray-600">Gas reserves</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-2 border-red-200">
              <div>
                <span className="font-semibold">ETHGR Contracts</span>
                <div className="text-sm text-gray-600">3.98M tokens (2 contracts)</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-700">N/A</div>
                <div className="text-sm text-red-600">Valuation needed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Volatility Factors */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Volatility Contributing Factors</CardTitle>
          <CardDescription>
            What's causing your portfolio value to fluctuate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {volatilityFactors.map((factor, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                  factor.color === 'red' ? 'text-red-500' : 
                  factor.color === 'orange' ? 'text-orange-500' :
                  factor.color === 'green' ? 'text-green-500' : 'text-gray-500'
                }`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold">{factor.factor}</h4>
                    <Badge variant={factor.impact === 'High' ? 'destructive' : 
                                  factor.impact === 'Medium' ? 'default' : 'secondary'}>
                      {factor.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stability Strategies */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-green-700">Portfolio Stability Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stabilityStrategies.map((strategy, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700">{strategy}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Action Required */}
      <Alert className="border-2 border-red-300 bg-red-50">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Priority Action:</strong> Your ETHGR contracts showing "N/A" could represent significant hidden value. 
          These 3.98M tokens need immediate verification to determine their contribution to portfolio stability. 
          The ERC-1155 nature of your contracts may require specialized valuation methods.
        </AlertDescription>
      </Alert>
    </div>
  );
}