import { PriceSparkline } from '@/components/PriceSparkline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function TokenAnalytics() {
  const ethgrAddress = "0x828e614715BA6bbD32464E4aF5529a1263FB914d";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                ETHGR Token Analytics
              </h1>
              <p className="text-slate-600">
                Real-time price tracking with emotional market indicators
              </p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="w-4 h-4 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Price Sparkline Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Price Movement & Market Mood</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PriceSparkline tokenAddress={ethgrAddress} />
            </CardContent>
          </Card>

          {/* Token Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Token Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-semibold">$14.08M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Supply</span>
                <span className="font-semibold">1.99M ETHGR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Circulating</span>
                <span className="font-semibold">1.99M ETHGR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Holders</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contract</span>
                <span className="font-mono text-xs">{ethgrAddress.slice(0, 8)}...</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">24h High</p>
                  <p className="text-2xl font-bold text-green-600">$0.00745</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">24h Low</p>
                  <p className="text-2xl font-bold text-red-600">$0.00682</p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-500 rotate-180" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Volume 24h</p>
                  <p className="text-2xl font-bold text-blue-600">$45.2K</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Traders</p>
                  <p className="text-2xl font-bold text-purple-600">23</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Analysis */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Market Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-lg font-semibold text-green-700">Bullish</div>
                <div className="text-sm text-green-600">Strong upward momentum</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-lg font-semibold text-yellow-700">Electric</div>
                <div className="text-sm text-yellow-600">High volatility detected</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-lg font-semibold text-pink-700">Diamond Hands</div>
                <div className="text-sm text-pink-600">Strong holder confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}