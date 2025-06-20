import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator,
  ExternalLink,
  TrendingUp,
  DollarSign,
  Droplets,
  Target
} from "lucide-react";

export default function LiquidityPlanning() {
  const currentETH = 0.0144;
  const ethPrice = 2500;
  const currentETHValue = currentETH * ethPrice;
  const ethgrTokens = 1990000;

  // Liquidity scenarios
  const scenarios = [
    {
      name: "Minimal Start",
      ethAmount: 0.1,
      ethgrAmount: 50000,
      ethValue: 0.1 * ethPrice,
      description: "Start small to test market reception",
      advantages: ["Low risk", "Test market", "Easy to manage"],
      disadvantages: ["Limited trading volume", "Higher slippage"]
    },
    {
      name: "Balanced Approach",
      ethAmount: 0.5,
      ethgrAmount: 250000,
      ethValue: 0.5 * ethPrice,
      description: "Moderate liquidity for steady trading",
      advantages: ["Good trading volume", "Moderate slippage", "Balanced risk"],
      disadvantages: ["Requires more ETH investment"]
    },
    {
      name: "Strong Launch",
      ethAmount: 2.0,
      ethgrAmount: 1000000,
      ethValue: 2.0 * ethPrice,
      description: "Deep liquidity for professional trading",
      advantages: ["Low slippage", "High volume capacity", "Strong market presence"],
      disadvantages: ["High ETH requirement", "Significant investment"]
    }
  ];

  const ethPurchaseOptions = [
    {
      amount: 0.1,
      cost: 0.1 * ethPrice,
      purpose: "Minimal liquidity pool"
    },
    {
      amount: 0.5,
      cost: 0.5 * ethPrice,
      purpose: "Balanced liquidity pool"
    },
    {
      amount: 2.0,
      cost: 2.0 * ethPrice,
      purpose: "Deep liquidity pool"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">💧</div>
        <h1 className="text-4xl font-bold text-blue-600">LIQUIDITY POOL PLANNING</h1>
        <p className="text-xl text-muted-foreground">
          Plan ETH requirements for ETHGR liquidity provision
        </p>
      </div>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <Target className="h-5 w-5" />
            Current Situation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentETH}</div>
              <div className="text-sm text-muted-foreground">ETH Available</div>
              <div className="text-xs text-muted-foreground">${currentETHValue.toFixed(0)} (for gas)</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{ethgrTokens.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">ETHGR Tokens</div>
              <div className="text-xs text-muted-foreground">Ready for liquidity</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-muted-foreground">ETH for Liquidity</div>
              <div className="text-xs text-muted-foreground">Need to acquire</div>
            </div>
          </div>

          <Alert className="border-orange-500 bg-orange-50">
            <Calculator className="h-4 w-4" />
            <AlertDescription>
              <strong>Liquidity Need:</strong> You have gas ETH but need additional ETH to pair with ETHGR tokens for liquidity provision.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Liquidity Scenarios</CardTitle>
          <CardDescription>
            Different approaches to providing ETHGR/ETH liquidity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {scenarios.map((scenario, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-lg">{scenario.name}</div>
                <Badge variant={index === 1 ? "default" : "outline"}>
                  {index === 1 ? "Recommended" : "Option"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">{scenario.ethAmount} ETH</div>
                  <div className="text-xs text-muted-foreground">ETH Required</div>
                  <div className="text-xs text-muted-foreground">${scenario.ethValue.toFixed(0)}</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">{scenario.ethgrAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">ETHGR Tokens</div>
                  <div className="text-xs text-muted-foreground">{((scenario.ethgrAmount / ethgrTokens) * 100).toFixed(1)}% of supply</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">${(scenario.ethValue * 2).toFixed(0)}</div>
                  <div className="text-xs text-muted-foreground">Total Pool Value</div>
                  <div className="text-xs text-muted-foreground">ETH + ETHGR</div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground mb-3">{scenario.description}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-green-600 mb-1">Advantages:</div>
                  <ul className="text-xs space-y-1">
                    {scenario.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-orange-600 mb-1">Considerations:</div>
                  <ul className="text-xs space-y-1">
                    {scenario.disadvantages.map((dis, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-orange-600 rounded-full"></div>
                        {dis}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                variant={index === 1 ? "default" : "outline"}
                className="w-full"
                onClick={() => window.open('https://www.coinbase.com/price/ethereum', '_blank')}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Buy {scenario.ethAmount} ETH (${scenario.ethValue.toFixed(0)})
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Potential
          </CardTitle>
          <CardDescription>
            Estimated returns from liquidity provision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold mb-2">Trading Fees</div>
              <div className="text-sm text-muted-foreground">
                Earn 0.3% of all trades in the pool
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold mb-2">Arbitrage Activity</div>
              <div className="text-sm text-muted-foreground">
                ETHGR recovery story may drive trading volume
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="font-bold mb-2">Community Growth</div>
              <div className="text-sm text-muted-foreground">
                First successful recovery attracts attention
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Execution Strategy</CardTitle>
          <CardDescription>
            Step-by-step approach to launch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</div>
              <div>
                <div className="font-medium">Create ETHGR/ETH Pair</div>
                <div className="text-sm text-muted-foreground">Use current 0.0144 ETH for gas fees</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
              <div>
                <div className="font-medium">Purchase Liquidity ETH</div>
                <div className="text-sm text-muted-foreground">Buy 0.1-2.0 ETH based on chosen scenario</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">3</div>
              <div>
                <div className="font-medium">Add Liquidity</div>
                <div className="text-sm text-muted-foreground">Provide ETHGR + ETH to establish trading market</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">4</div>
              <div>
                <div className="font-medium">Monitor & Grow</div>
                <div className="text-sm text-muted-foreground">Track performance and adjust strategy</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <div className="text-lg font-medium">
          Ready to proceed with pair creation first?
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.open('/execute-ethgr-eth', '_self')}
          >
            <Droplets className="h-4 w-4 mr-2" />
            Create Pair First
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('https://www.coinbase.com/price/ethereum', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Buy ETH for Liquidity
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Recommended: Create pair first, then purchase ETH for liquidity provision
        </div>
      </div>
    </div>
  );
}