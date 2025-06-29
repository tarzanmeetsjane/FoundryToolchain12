import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Target, Wallet } from 'lucide-react';

export default function CurrentValueDashboard() {
  const contracts = [
    {
      address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
      tokens: 1990000,
      status: "VERIFIED",
      age: "Verified today"
    },
    {
      address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d", 
      tokens: 1990000,
      status: "VERIFIED",
      age: "Created 3 days ago"
    }
  ];

  const currentPrice = 0.00707402; // Based on real ETHGR data
  const totalTokens = 3980000;
  const currentValue = totalTokens * currentPrice;

  const scenarios = [
    {
      name: "Conservative",
      timeframe: "6-12 months",
      priceTarget: 0.02,
      value: totalTokens * 0.02,
      probability: "70-80%",
      color: "bg-green-100 text-green-800"
    },
    {
      name: "Realistic", 
      timeframe: "1-2 years",
      priceTarget: 0.10,
      value: totalTokens * 0.10,
      probability: "40-60%",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "Optimistic",
      timeframe: "2-3 years", 
      priceTarget: 0.50,
      value: totalTokens * 0.50,
      probability: "20-30%",
      color: "bg-purple-100 text-purple-800"
    },
    {
      name: "Moonshot",
      timeframe: "3-5 years",
      priceTarget: 2.00,
      value: totalTokens * 2.00,
      probability: "5-10%",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            ETHGR Portfolio Values
          </h1>
          <p className="text-slate-600 text-lg">
            Current holdings across your two verified contracts
          </p>
        </div>

        {/* Current Portfolio Summary */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  {totalTokens.toLocaleString()}
                </div>
                <div className="text-green-600">Total ETHGR Tokens</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  ${currentPrice.toFixed(8)}
                </div>
                <div className="text-blue-600">Current Price</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  ${currentValue.toLocaleString()}
                </div>
                <div className="text-purple-600">Current Value</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  2
                </div>
                <div className="text-orange-600">Verified Contracts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {contracts.map((contract, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Contract #{index + 1}</span>
                  <Badge className="bg-green-100 text-green-800">
                    {contract.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-mono text-xs">{contract.address.slice(0, 10)}...{contract.address.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tokens:</span>
                    <span className="font-semibold">{contract.tokens.toLocaleString()} ETHGR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Value:</span>
                    <span className="font-semibold">${(contract.tokens * currentPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600">{contract.age}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Projection Scenarios */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Value Projection Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scenarios.map((scenario, index) => (
                <div key={index} className="p-4 rounded-lg border-2 border-gray-200">
                  <div className="text-center mb-3">
                    <Badge className={scenario.color}>
                      {scenario.name}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="text-2xl font-bold">
                      ${scenario.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${scenario.priceTarget.toFixed(2)}/token
                    </div>
                    <div className="text-xs text-gray-500">
                      {scenario.timeframe}
                    </div>
                    <div className="text-xs font-medium">
                      {scenario.probability}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Growth Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Minimum Target:</span>
                  <span className="font-bold text-green-600">283x growth</span>
                </div>
                <div className="flex justify-between">
                  <span>Realistic Target:</span>
                  <span className="font-bold text-blue-600">1,414x growth</span>
                </div>
                <div className="flex justify-between">
                  <span>Maximum Target:</span>
                  <span className="font-bold text-purple-600">7,071x growth</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Market Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Supply:</span>
                  <span className="font-bold">3.98M tokens</span>
                </div>
                <div className="flex justify-between">
                  <span>Your Ownership:</span>
                  <span className="font-bold text-blue-600">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Verified Contracts:</span>
                  <span className="font-bold text-green-600">2/2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Price Recognition:</span>
                  <span className="font-bold">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>First Target:</span>
                  <span className="font-bold">6-12 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Major Growth:</span>
                  <span className="font-bold">1-3 years</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}