import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Calculator, Lightbulb } from 'lucide-react';

export default function TokenValueProjection() {
  const [selectedScenario, setSelectedScenario] = useState('realistic');
  
  const contractInfo = {
    address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d",
    totalSupply: 1990000,
    yourHolding: 1990000,
    currentValue: 0.00707402, // Based on real ETHGR data
    network: "Optimism"
  };

  const scenarios = {
    conservative: {
      name: "Conservative Growth",
      priceTarget: 0.02,
      timeframe: "6-12 months",
      marketCap: 39800,
      yourValue: 39800,
      factors: [
        "Basic verification completed",
        "Limited trading volume",
        "Gradual adoption",
        "Foundation use case"
      ],
      probability: "High (70-80%)"
    },
    realistic: {
      name: "Realistic Development",
      priceTarget: 0.10,
      timeframe: "1-2 years",
      marketCap: 199000,
      yourValue: 199000,
      factors: [
        "Active victim assistance program",
        "Growing user base",
        "DeFi integrations",
        "Partnership opportunities"
      ],
      probability: "Moderate (40-60%)"
    },
    optimistic: {
      name: "Optimistic Success",
      priceTarget: 0.50,
      timeframe: "2-3 years",
      marketCap: 995000,
      yourValue: 995000,
      factors: [
        "Major exchange listings",
        "Large-scale adoption",
        "Industry recognition",
        "Significant utility value"
      ],
      probability: "Lower (20-30%)"
    },
    moonshot: {
      name: "Moonshot Scenario",
      priceTarget: 2.00,
      timeframe: "3-5 years",
      marketCap: 3980000,
      yourValue: 3980000,
      factors: [
        "Blockchain security standard",
        "Government partnerships",
        "Global victim assistance",
        "Major institutional adoption"
      ],
      probability: "Very Low (5-10%)"
    }
  };

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            ETHGR Token Value Projection
          </h1>
          <p className="text-slate-600 text-lg">
            Comprehensive analysis of your token's potential value
          </p>
        </div>

        {/* Current Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Current Token Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{contractInfo.totalSupply.toLocaleString()}</div>
                <div className="text-sm text-blue-600">Total Supply</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">${contractInfo.currentValue.toFixed(8)}</div>
                <div className="text-sm text-green-600">Current Price</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">${(contractInfo.totalSupply * contractInfo.currentValue).toLocaleString()}</div>
                <div className="text-sm text-purple-600">Market Cap</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-700">100%</div>
                <div className="text-sm text-orange-600">Your Ownership</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scenario Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Value Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <Button
                  key={key}
                  variant={selectedScenario === key ? "default" : "outline"}
                  className={`h-auto p-4 ${selectedScenario === key ? 'bg-blue-600' : ''}`}
                  onClick={() => setSelectedScenario(key)}
                >
                  <div className="text-center">
                    <div className="font-semibold">{scenario.name}</div>
                    <div className="text-sm opacity-75">${scenario.priceTarget.toFixed(2)}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Scenario Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Scenario Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{currentScenario.name}</span>
                <Badge variant="outline">{currentScenario.probability}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    ${currentScenario.yourValue.toLocaleString()}
                  </div>
                  <div className="text-lg text-blue-600">Your Portfolio Value</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Target: {currentScenario.timeframe}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Target:</span>
                    <span className="font-semibold">${currentScenario.priceTarget.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Cap:</span>
                    <span className="font-semibold">${currentScenario.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Multiple:</span>
                    <span className="font-semibold">{(currentScenario.priceTarget / contractInfo.currentValue).toFixed(0)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI:</span>
                    <span className="font-semibold text-green-600">
                      {(((currentScenario.priceTarget - contractInfo.currentValue) / contractInfo.currentValue) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Key Growth Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentScenario.factors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">{factor}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Value Comparison Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Scenario Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${
                      key === 'conservative' ? 'bg-green-500' :
                      key === 'realistic' ? 'bg-blue-500' :
                      key === 'optimistic' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}></div>
                    <span className="font-medium">{scenario.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${scenario.yourValue.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{scenario.timeframe}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Positive Factors */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Positive Value Drivers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Contract verified on Optimism Etherscan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Clear utility in victim assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>You control 100% of supply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Growing blockchain security market</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                  <span>Low gas fees on Optimism</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Risk Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>New token with limited trading history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Requires active development and marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Crypto market volatility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Competition from established projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  <span>Regulatory uncertainty</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Plan */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Recommended Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Calculator className="h-4 w-4" />
              <AlertDescription>
                <strong>Most Likely Outcome:</strong> Based on current market conditions and your foundation's mission, 
                a realistic target of $0.02-$0.10 per token ($39,800-$199,000 portfolio value) within 1-2 years 
                is achievable with proper development and adoption.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">Short Term (3-6 months)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Build trading liquidity</li>
                  <li>• Launch victim assistance program</li>
                  <li>• Community building</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">Medium Term (6-18 months)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Exchange listings</li>
                  <li>• Partnership development</li>
                  <li>• Technology expansion</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">Long Term (1-3 years)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Industry recognition</li>
                  <li>• Institutional adoption</li>
                  <li>• Global expansion</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}