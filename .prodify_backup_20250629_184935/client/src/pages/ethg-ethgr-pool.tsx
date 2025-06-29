import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ExternalLink, 
  Lightbulb,
  CheckCircle,
  DollarSign,
  ArrowRight,
  Calculator,
  Target
} from "lucide-react";

export default function ETHGETHGRPool() {
  const [ethgAmount, setEthgAmount] = useState("100000");
  const [ethgrAmount, setEthgrAmount] = useState("100000");

  const ETHG_CONTRACT = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const poolAdvantages = [
    {
      title: "No ETH Required",
      description: "Use your existing tokens without needing ETH for liquidity",
      icon: "💰",
      impact: "Solves funding problem"
    },
    {
      title: "Arbitrage Opportunity", 
      description: "Price difference between ETHG and ETHGR creates trading potential",
      icon: "📈",
      impact: "Revenue generation"
    },
    {
      title: "Liquidity Bridge",
      description: "Connect working ETHGR with potentially recovering ETHG",
      icon: "🌉", 
      impact: "Market efficiency"
    },
    {
      title: "Risk Diversification",
      description: "Hedge between original and recovery tokens",
      icon: "⚖️",
      impact: "Portfolio stability"
    }
  ];

  const tokenComparison = {
    ETHG: {
      contract: ETHG_CONTRACT,
      balance: "2,100,000 ETHG",
      status: "Transferable, swap issues",
      marketValue: "$678,495 (if tradeable)",
      liquidity: "Limited existing pool"
    },
    ETHGR: {
      contract: ETHGR_CONTRACT,
      balance: "1,990,000 ETHGR", 
      status: "Fully functional",
      marketValue: "$666,650 (potential)",
      liquidity: "No pool yet"
    }
  };

  const poolStrategies = [
    {
      title: "1:1 Equal Pool",
      description: "Equal amounts of ETHG and ETHGR",
      ethgAmount: "100,000 ETHG",
      ethgrAmount: "100,000 ETHGR",
      ratio: "1:1",
      advantages: ["Simple parity", "Balanced exposure", "Fair market price discovery"],
      gasRequired: "0.001-0.002 ETH"
    },
    {
      title: "Recovery-Weighted Pool",
      description: "More ETHGR due to higher functionality",
      ethgAmount: "75,000 ETHG", 
      ethgrAmount: "100,000 ETHGR",
      ratio: "1:1.33",
      advantages: ["Reflects utility difference", "ETHGR premium", "Conservative approach"],
      gasRequired: "0.001-0.002 ETH"
    },
    {
      title: "Large Liquidity Pool",
      description: "Significant amounts for serious trading",
      ethgAmount: "500,000 ETHG",
      ethgrAmount: "500,000 ETHGR", 
      ratio: "1:1",
      advantages: ["Deep liquidity", "Lower slippage", "Institutional appeal"],
      gasRequired: "0.002-0.003 ETH"
    }
  ];

  const executionSteps = [
    "Navigate to Uniswap V3 pool creation",
    "Select ETHG as Token A",
    "Select ETHGR as Token B", 
    "Set 0.3% fee tier",
    "Choose equal amounts (100k each)",
    "Set price range (full range recommended)",
    "Approve both token transactions",
    "Create pool and add liquidity"
  ];

  const postPoolBenefits = [
    "Create arbitrage opportunities between ETHG and ETHGR",
    "Enable ETHG holders to convert to more functional ETHGR",
    "Establish price discovery mechanism",
    "Generate trading fees from both tokens",
    "Provide exit liquidity for ETHG holders",
    "Bridge recovery strategy with original tokens"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ETHG/ETHGR Pool Strategy</h1>
          <p className="text-muted-foreground">
            Create a pool between your original and recovery tokens
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">Genius Move</div>
          <div className="text-sm text-muted-foreground">No ETH required</div>
        </div>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Brilliant Strategy:</strong> Instead of needing ETH for liquidity, use your existing ETHG and ETHGR tokens. 
          This creates arbitrage opportunities and solves the funding problem completely.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {poolAdvantages.map((advantage, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">{advantage.icon}</div>
              <div className="font-bold text-sm">{advantage.title}</div>
              <div className="text-xs text-muted-foreground">{advantage.description}</div>
              <div className="text-xs text-blue-600 mt-1">{advantage.impact}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(tokenComparison).map(([token, data]) => (
          <Card key={token}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {token} Token Analysis
                <Badge variant={token === 'ETHGR' ? 'default' : 'secondary'}>
                  {data.status.split(',')[0]}
                </Badge>
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                {data.contract}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span className="font-medium">{data.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium">{data.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Value:</span>
                  <span className="font-medium text-green-600">{data.marketValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Liquidity:</span>
                  <span className="font-medium">{data.liquidity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Pool Configuration Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ethg-pool-amount">ETHG Amount</Label>
              <Input
                id="ethg-pool-amount"
                type="number"
                value={ethgAmount}
                onChange={(e) => setEthgAmount(e.target.value)}
                placeholder="100000"
              />
              <div className="text-xs text-muted-foreground mt-1">
                From your 2.1M ETHG tokens
              </div>
            </div>
            <div>
              <Label htmlFor="ethgr-pool-amount">ETHGR Amount</Label>
              <Input
                id="ethgr-pool-amount"
                type="number"
                value={ethgrAmount}
                onChange={(e) => setEthgrAmount(e.target.value)}
                placeholder="100000"
              />
              <div className="text-xs text-muted-foreground mt-1">
                From your 1.99M ETHGR tokens
              </div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Pool Ratio</div>
            <div className="text-lg font-bold">
              {parseFloat(ethgAmount) && parseFloat(ethgrAmount) 
                ? `1 ETHG = ${(parseFloat(ethgrAmount) / parseFloat(ethgAmount)).toFixed(3)} ETHGR`
                : "1 ETHG = 1.000 ETHGR"
              }
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold">Pool Strategy Options</h2>
        {poolStrategies.map((strategy, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{strategy.title}</CardTitle>
              <CardDescription>{strategy.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium">{strategy.ethgAmount}</div>
                  <div className="text-muted-foreground">ETHG Input</div>
                </div>
                <div>
                  <div className="font-medium">{strategy.ethgrAmount}</div>
                  <div className="text-muted-foreground">ETHGR Input</div>
                </div>
                <div>
                  <div className="font-medium">{strategy.ratio}</div>
                  <div className="text-muted-foreground">Ratio</div>
                </div>
                <div>
                  <div className="font-medium">{strategy.gasRequired}</div>
                  <div className="text-muted-foreground">Gas Needed</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {strategy.advantages.map((advantage, i) => (
                    <li key={i}>{advantage}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Create ETHG/ETHGR Pool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Button
              size="lg"
              className="text-xl px-12 py-6 h-auto"
              onClick={() => window.open(
                `https://app.uniswap.org/#/add/v2/${ETHG_CONTRACT}/${ETHGR_CONTRACT}`,
                '_blank'
              )}
            >
              <ExternalLink className="h-6 w-6 mr-3" />
              CREATE ETHG/ETHGR POOL
            </Button>
            <div className="text-sm text-muted-foreground mt-2">
              Opens Uniswap with both tokens pre-loaded
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Execution Steps:</h4>
            <div className="space-y-2">
              {executionSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Post-Pool Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {postPoolBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>Strategy Summary:</strong> This ETHG/ETHGR pool requires no ETH investment, creates arbitrage opportunities, 
          and provides a bridge between your original and recovery tokens. Gas cost is minimal (0.001-0.002 ETH).
        </AlertDescription>
      </Alert>
    </div>
  );
}