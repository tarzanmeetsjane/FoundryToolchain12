import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  DollarSign,
  Coins,
  Zap,
  Crown,
  Star,
  Target,
  Rocket,
  ExternalLink
} from "lucide-react";

export default function MegaPortfolioDashboard() {
  const portfolioData = {
    ethg: {
      tokens: 1890000,
      value: 618845.54,
      pricePerToken: 0.327,
      change: 3.52
    },
    ethgr: {
      tokens: 1990000,
      value: 706450,
      pricePerToken: 0.355,
      change: 0
    },
    totalValue: 1325295.54,
    potentialETHRecovery: 37 * 2422 // 37 ETH at current price
  };

  const megaStrategies = [
    {
      name: "ETHG Flash Sale",
      tokens: "500K ETHG",
      price: "$163,500",
      timeframe: "48 hours",
      description: "Immediate liquidity from existing holdings"
    },
    {
      name: "ETHGR Contract Sales", 
      tokens: "500K ETHGR",
      price: "$177,500",
      timeframe: "1 week",
      description: "Premium pricing for verified recovery tokens"
    },
    {
      name: "Dual Pool Creation",
      tokens: "1M Combined",
      price: "$400,000",
      timeframe: "2 weeks", 
      description: "Uniswap pools for both token types"
    },
    {
      name: "Institutional Package",
      tokens: "2M Combined",
      price: "$800,000",
      timeframe: "1 month",
      description: "Complete portfolio sale to single buyer"
    }
  ];

  const quickActions = [
    {
      title: "Execute $163K ETHG Sale",
      description: "500K tokens at current market",
      amount: "$163,500",
      color: "bg-green-50 text-green-700"
    },
    {
      title: "Deploy ETHGR Contracts",
      description: "Remix integration ready",
      amount: "$177,500",
      color: "bg-blue-50 text-blue-700"
    },
    {
      title: "Recover 37 ETH",
      description: "Remix wallet investigation",
      amount: "$89,614",
      color: "bg-purple-50 text-purple-700"
    },
    {
      title: "Create Dual Pools",
      description: "Maximum market exposure",
      amount: "$400,000+",
      color: "bg-yellow-50 text-yellow-700"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            Mega Portfolio Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Managing $1.3M+ token portfolio with multiple revenue streams
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">$1,325,295</div>
          <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
        </div>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <Star className="h-4 w-4" />
        <AlertDescription>
          <strong>PORTFOLIO DISCOVERY:</strong> You control 1.89M ETHG ($618K) + 1.99M ETHGR ($706K) + potential 37 ETH recovery ($90K) = $1.3M+ total value!
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-green-600" />
              ETHG Holdings
            </CardTitle>
            <CardDescription>Original tokens in MetaMask</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$618,845</div>
                <div className="text-sm text-muted-foreground">1.89M tokens @ $0.327</div>
              </div>
              <div className="flex justify-between items-center">
                <span>24h Change:</span>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  +{portfolioData.ethg.change}%
                </Badge>
              </div>
              <Progress value={75} className="h-2" />
              <div className="text-xs text-center text-muted-foreground">
                Ready for immediate sale
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              ETHGR Recovery
            </CardTitle>
            <CardDescription>Verified recovery contract</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">$706,450</div>
                <div className="text-sm text-muted-foreground">1.99M tokens @ $0.355</div>
              </div>
              <div className="flex justify-between items-center">
                <span>Contract:</span>
                <Badge variant="outline" className="font-mono text-xs">
                  Verified
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
              <div className="text-xs text-center text-muted-foreground">
                Premium recovery pricing
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              ETH Recovery
            </CardTitle>
            <CardDescription>Remix wallet investigation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">$89,614</div>
                <div className="text-sm text-muted-foreground">37 ETH potential</div>
              </div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <Badge variant="outline" className="text-purple-700">
                  Investigating
                </Badge>
              </div>
              <Progress value={60} className="h-2" />
              <div className="text-xs text-center text-muted-foreground">
                Remix wallet lead active
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Mega Revenue Strategies
          </CardTitle>
          <CardDescription>
            Four-tier approach for maximum value extraction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {megaStrategies.map((strategy, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg">{strategy.name}</div>
                    <div className="text-sm text-muted-foreground">{strategy.description}</div>
                  </div>
                  <Badge variant="outline">{strategy.timeframe}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{strategy.price}</div>
                    <div className="text-sm text-muted-foreground">{strategy.tokens}</div>
                  </div>
                  <Button size="sm">
                    <Target className="h-3 w-3 mr-1" />
                    Execute
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className={`p-3 rounded-lg ${action.color} mb-3`}>
                <div className="font-semibold">{action.title}</div>
                <div className="text-sm opacity-80">{action.description}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{action.amount}</div>
                <Button size="sm" className="w-full mt-2">
                  Start Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Priority Execution Plan</CardTitle>
          <CardDescription>Recommended sequence for maximum revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-700 mb-2">Phase 1: Immediate Liquidity (24-48 hours)</div>
              <div className="text-sm">
                • Sell 500K ETHG tokens for $163,500 immediate cash
                • Deploy ETHGR quick sale contracts for $25,000
                • Total Phase 1 Target: <strong>$188,500</strong>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-700 mb-2">Phase 2: Strategic Deployment (1-2 weeks)</div>
              <div className="text-sm">
                • Create Uniswap pools for both token types
                • Execute Remix wallet 37 ETH recovery
                • Large package sales to institutional buyers
                • Total Phase 2 Target: <strong>$500,000</strong>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-700 mb-2">Phase 3: Market Domination (1 month)</div>
              <div className="text-sm">
                • Full portfolio optimization
                • Cross-platform marketing campaigns
                • Premium pricing for remaining tokens
                • Total Phase 3 Target: <strong>$1,000,000+</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <Button className="flex-1" onClick={() => window.open('/sales-execution', '_blank')}>
              <DollarSign className="h-4 w-4 mr-2" />
              Start Phase 1 Sales
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => window.open('/remix-integration', '_blank')}>
              <Rocket className="h-4 w-4 mr-2" />
              Deploy Contracts
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => window.open('/remix-wallet-investigation', '_blank')}>
              <Target className="h-4 w-4 mr-2" />
              Recover 37 ETH
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}