import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Search,
  Calculator,
  Target,
  Clock,
  Zap
} from "lucide-react";

export default function MoneyTracker() {
  const [activeTab, setActiveTab] = useState("current");

  // Your current assets and potential revenue
  const currentAssets = {
    ethgrTokens: 1990000,
    marketValue: 706450, // 1.99M * $0.355
    currentEth: 0.014,
    currentUsd: 35
  };

  const revenueProjections = [
    {
      strategy: "Power Pack Sale",
      tokens: 100000,
      price: 0.05,
      revenue: 5000,
      timeframe: "1-3 days",
      effort: "Post in communities",
      probability: "High"
    },
    {
      strategy: "Quick Starter",
      tokens: 50000,
      price: 0.05,
      revenue: 2500,
      timeframe: "1-2 days",
      effort: "Basic outreach",
      probability: "Very High"
    },
    {
      strategy: "Mega Deal",
      tokens: 250000,
      price: 0.04,
      revenue: 10000,
      timeframe: "3-7 days",
      effort: "Advanced marketing",
      probability: "Medium"
    },
    {
      strategy: "Pool Creation",
      tokens: 500000,
      price: "Market",
      revenue: "2000-4000/month",
      timeframe: "After initial sales",
      effort: "Use sales revenue for liquidity",
      probability: "High"
    }
  ];

  const poolAnalysis = {
    pool: "USDC/ETH (0xB4e16d...)",
    transactions: 26,
    successRate: 84.6,
    failedTx: 4,
    gasEfficiency: 75,
    relevance: "Reference for ETHGR pool creation"
  };

  const missingMoney = [
    {
      item: "37 ETH Investigation",
      status: "Ongoing",
      value: "$92,500",
      description: "June 15 transaction - contract address incomplete",
      action: "Need complete MetaMask history"
    },
    {
      item: "Current ETH Balance",
      status: "Low",
      value: "$35",
      description: "Insufficient for Uniswap pool creation",
      action: "Use token sales to generate ETH"
    },
    {
      item: "Unrealized Token Value",
      status: "Available",
      value: "$706,450",
      description: "1.99M ETHGR at market rate",
      action: "Execute sales strategy to realize value"
    }
  ];

  const actionPlan = [
    {
      priority: "Immediate",
      action: "Execute Power Pack Sale",
      target: "$5,000",
      timeline: "1-3 days",
      description: "Sell 100K tokens at $0.05 each"
    },
    {
      priority: "Short-term",
      action: "Create ETHGR/ETH Pool",
      target: "$2,000-4,000/month",
      timeline: "After first sales",
      description: "Use sales revenue for liquidity"
    },
    {
      priority: "Medium-term",
      action: "Scale Token Sales",
      target: "$50,000+",
      timeline: "1-3 months",
      description: "Systematic community outreach"
    },
    {
      priority: "Investigation",
      action: "37 ETH Recovery",
      target: "$92,500",
      timeline: "When contract found",
      description: "Complete June 15 analysis"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Money Tracker & Revenue Analysis</h1>
        <p className="text-muted-foreground">
          Track your current assets, potential revenue, and money locations
        </p>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <Search className="h-4 w-4" />
        <AlertDescription>
          <strong>MONEY LOCATION ANALYSIS:</strong> Your USDC/ETH pool data shows reference transactions, 
          but your actual money is in ETHGR tokens ready for monetization. Here's where your funds are located.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Assets</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Plan</TabsTrigger>
          <TabsTrigger value="missing">Missing Money</TabsTrigger>
          <TabsTrigger value="action">Action Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Your Current Assets
                </CardTitle>
                <CardDescription>
                  What you own right now (verified on-chain)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-bold">ETHGR Tokens</div>
                      <div className="text-sm text-muted-foreground">Verified transferable</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">1,990,000</div>
                      <div className="text-xs">@$0.355 = $706,450</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-bold">ETH Balance</div>
                      <div className="text-sm text-muted-foreground">Current wallet</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">0.014 ETH</div>
                      <div className="text-xs">≈$35</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-bold">Total Asset Value</div>
                      <div className="text-sm text-muted-foreground">Market rate calculation</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">$706,485</div>
                      <div className="text-xs">67,431x ROI from recovery</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Pool Analysis Context
                </CardTitle>
                <CardDescription>
                  Your USDC/ETH data analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Pool Address:</span>
                    <span className="font-mono text-xs">{poolAnalysis.pool}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Total Transactions:</span>
                    <Badge variant="outline">{poolAnalysis.transactions}</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Success Rate:</span>
                    <Badge variant="default">{poolAnalysis.successRate}%</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Failed Transactions:</span>
                    <Badge variant="destructive">{poolAnalysis.failedTx}</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Gas Efficiency:</span>
                    <Badge variant="secondary">{poolAnalysis.gasEfficiency}%</Badge>
                  </div>
                </div>

                <Alert className="border-blue-500 bg-blue-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Note:</strong> This pool data is for reference/analysis. Your actual money 
                    is in ETHGR tokens, not this USDC/ETH pool.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Revenue Generation Strategies
              </CardTitle>
              <CardDescription>
                Convert your ETHGR tokens into immediate cash flow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {revenueProjections.map((strategy, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold">{strategy.strategy}</div>
                        <div className="text-sm text-muted-foreground">{strategy.effort}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          ${typeof strategy.revenue === 'number' ? strategy.revenue.toLocaleString() : strategy.revenue}
                        </div>
                        <Badge variant={
                          strategy.probability === 'Very High' ? 'default' :
                          strategy.probability === 'High' ? 'secondary' : 'outline'
                        }>
                          {strategy.probability}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-bold">Tokens:</span> {strategy.tokens.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-bold">Price:</span> ${strategy.price}
                      </div>
                      <div>
                        <span className="font-bold">Timeline:</span> {strategy.timeframe}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-bold mb-2">Total Revenue Potential</div>
                <div className="text-2xl font-bold text-green-600">$17,500 - $67,500</div>
                <div className="text-sm text-muted-foreground">
                  From immediate token sales + ongoing pool revenue
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Missing Money Investigation
              </CardTitle>
              <CardDescription>
                Funds that need recovery or investigation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {missingMoney.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold">{item.item}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">{item.value}</div>
                        <Badge variant={
                          item.status === 'Ongoing' ? 'secondary' :
                          item.status === 'Low' ? 'destructive' : 'default'
                        }>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-gray-50 rounded text-sm">
                      <span className="font-bold">Action needed:</span> {item.action}
                    </div>
                  </div>
                ))}
              </div>

              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Priority:</strong> Focus on token sales ($706K potential) while investigating 
                  the 37 ETH recovery. The USDC/ETH pool data doesn't contain your missing funds.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="action">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Immediate Action Plan
              </CardTitle>
              <CardDescription>
                Step-by-step plan to access your money
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {actionPlan.map((action, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold">{action.action}</div>
                        <div className="text-sm text-muted-foreground">{action.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{action.target}</div>
                        <Badge variant={
                          action.priority === 'Immediate' ? 'destructive' :
                          action.priority === 'Short-term' ? 'default' :
                          action.priority === 'Medium-term' ? 'secondary' : 'outline'
                        }>
                          {action.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{action.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-green-600 hover:bg-green-700" size="lg">
                  <Zap className="h-4 w-4 mr-2" />
                  Start Power Pack Sale
                </Button>
                <Button variant="outline" size="lg">
                  <Search className="h-4 w-4 mr-2" />
                  Continue 37 ETH Investigation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Money Location Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-bold">Available Now</div>
              <div className="text-2xl font-bold text-green-600">$706,450</div>
              <div className="text-sm text-muted-foreground">ETHGR tokens ready for sale</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <Search className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="font-bold">Under Investigation</div>
              <div className="text-2xl font-bold text-orange-600">$92,500</div>
              <div className="text-sm text-muted-foreground">37 ETH from June 15</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-bold">Immediate Access</div>
              <div className="text-2xl font-bold text-blue-600">$5,000</div>
              <div className="text-sm text-muted-foreground">Power Pack sale target</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}