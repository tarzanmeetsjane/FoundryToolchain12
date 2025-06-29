import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  Target,
  Calculator,
  ExternalLink,
  Copy
} from "lucide-react";

export default function DirectTokenSales() {
  const [saleAmount, setSaleAmount] = useState(100000);
  const [pricePerToken, setPricePerToken] = useState(0.01);
  const [buyerEmail, setBuyerEmail] = useState("");

  const totalTokens = 1990000;
  const marketPrice = 0.355; // Current ETHG market price
  const revenue = saleAmount * pricePerToken;
  const ethEstimate = revenue / 2500; // ETH at $2500
  const tokensRemaining = totalTokens - saleAmount;

  const pricingTiers = [
    {
      name: "Quick Sale",
      price: 0.001,
      description: "Emergency liquidity - very fast sale",
      minAmount: 50000,
      maxAmount: 200000,
      timeframe: "15 minutes",
      revenue: (amount: number) => amount * 0.001
    },
    {
      name: "Fair Value",
      price: 0.01,
      description: "Reasonable price for bulk sales",
      minAmount: 25000,
      maxAmount: 500000,
      timeframe: "1-2 hours",
      revenue: (amount: number) => amount * 0.01
    },
    {
      name: "Market Rate",
      price: 0.1,
      description: "Closer to market value",
      minAmount: 10000,
      maxAmount: 100000,
      timeframe: "2-6 hours",
      revenue: (amount: number) => amount * 0.1
    },
    {
      name: "Premium",
      price: 0.25,
      description: "High-value targeted sales",
      minAmount: 5000,
      maxAmount: 50000,
      timeframe: "6-24 hours",
      revenue: (amount: number) => amount * 0.25
    }
  ];

  const salesStrategies = [
    {
      strategy: "Crypto Community Direct",
      method: "Discord/Telegram groups",
      price: "$0.01-0.05",
      volume: "50K-200K tokens",
      timeframe: "1-3 hours"
    },
    {
      strategy: "DEX Listing Presale",
      method: "Pre-pool creation sales",
      price: "$0.05-0.15",
      volume: "100K-500K tokens",
      timeframe: "2-6 hours"
    },
    {
      strategy: "Private Investors",
      method: "Direct contact existing holders",
      price: "$0.15-0.30",
      volume: "25K-100K tokens",
      timeframe: "4-12 hours"
    },
    {
      strategy: "OTC Platforms",
      method: "Over-the-counter exchanges",
      price: "$0.20-0.35",
      volume: "10K-50K tokens",
      timeframe: "6-24 hours"
    }
  ];

  const generateSalesContract = () => {
    const contract = `
ETHGR Token Direct Sale Agreement

Seller: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
Token Contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
Token: ETHGR (ETHG Recovery)

Sale Details:
- Amount: ${saleAmount.toLocaleString()} ETHGR tokens
- Price per Token: $${pricePerToken}
- Total Value: $${revenue.toFixed(2)}
- ETH Equivalent: ~${ethEstimate.toFixed(4)} ETH

Buyer Contact: ${buyerEmail || "TBD"}

Terms:
1. Tokens verified as transferable (no honeypot)
2. Payment in ETH or USDC accepted
3. Immediate transfer upon payment confirmation
4. Contract verified on Etherscan

Generated: ${new Date().toLocaleString()}
    `.trim();

    navigator.clipboard.writeText(contract);
    alert("Sales contract copied to clipboard!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Direct ETHGR Token Sales</h1>
        <p className="text-muted-foreground">
          Sell your 1,990,000 ETHGR tokens directly to generate ETH for pool creation
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>STRATEGIC PRICING:</strong> Start with higher prices ($0.01-0.25) rather than $0.001. 
          Your tokens are verified transferable and market-ready - price them accordingly.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing">Smart Pricing</TabsTrigger>
          <TabsTrigger value="calculator">Sales Calculator</TabsTrigger>
          <TabsTrigger value="strategies">Sales Methods</TabsTrigger>
          <TabsTrigger value="execution">Execute Sale</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`${tier.price >= 0.01 ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {tier.name}
                    <Badge variant={tier.price >= 0.01 ? "default" : "secondary"}>
                      ${tier.price}/token
                    </Badge>
                  </CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-bold">Range:</div>
                      <div>{tier.minAmount.toLocaleString()} - {tier.maxAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-bold">Timeframe:</div>
                      <div>{tier.timeframe}</div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded border">
                    <div className="font-bold text-lg text-green-600">
                      ${tier.revenue(100000).toLocaleString()} 
                      <span className="text-sm font-normal text-muted-foreground">
                        (100K tokens)
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ≈ {(tier.revenue(100000) / 2500).toFixed(3)} ETH for pool
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSaleAmount(100000);
                      setPricePerToken(tier.price);
                    }}
                  >
                    <Calculator className="h-4 w-4 mr-1" />
                    Use This Pricing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Sales Revenue Calculator
              </CardTitle>
              <CardDescription>
                Calculate revenue and ETH generation from token sales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sale-amount">Tokens to Sell</Label>
                  <Slider
                    value={[saleAmount]}
                    onValueChange={([value]) => setSaleAmount(value)}
                    max={totalTokens}
                    min={10000}
                    step={5000}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>10K</span>
                    <span className="font-bold">{saleAmount.toLocaleString()} tokens</span>
                    <span>1.99M</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="price-per-token">Price per Token ($)</Label>
                  <Input
                    id="price-per-token"
                    type="number"
                    value={pricePerToken}
                    onChange={(e) => setPricePerToken(parseFloat(e.target.value) || 0)}
                    step="0.001"
                    min="0.001"
                    max="1"
                    className="mt-2"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Market reference: ${marketPrice} (current ETHG price)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-bold text-lg text-green-600">
                    ${revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-bold text-lg text-blue-600">
                    {ethEstimate.toFixed(4)} ETH
                  </div>
                  <div className="text-sm text-muted-foreground">ETH for Pool</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-bold text-lg text-purple-600">
                    {tokensRemaining.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Tokens Remaining</div>
                </div>
              </div>

              <Alert className="border-green-500 bg-green-50">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>RECOMMENDATION:</strong> Sell {saleAmount.toLocaleString()} tokens at ${pricePerToken} each 
                  generates ${revenue.toLocaleString()} ({ethEstimate.toFixed(4)} ETH) for pool creation while keeping {((tokensRemaining/totalTokens)*100).toFixed(1)}% of tokens.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Direct Sales Strategies
              </CardTitle>
              <CardDescription>
                Multiple channels for selling ETHGR tokens directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {salesStrategies.map((strategy, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold">{strategy.strategy}</div>
                      <div className="text-sm text-muted-foreground">{strategy.method}</div>
                    </div>
                    <Badge variant="outline">{strategy.timeframe}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-bold">Price Range:</div>
                      <div>{strategy.price}</div>
                    </div>
                    <div>
                      <div className="font-bold">Volume:</div>
                      <div>{strategy.volume}</div>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3">
                    <Target className="h-4 w-4 mr-1" />
                    Use This Strategy
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="execution">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Execute Token Sale
              </CardTitle>
              <CardDescription>
                Generate sales contract and execute direct sale
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-bold mb-2">Current Sale Configuration</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>Amount: {saleAmount.toLocaleString()} ETHGR</div>
                  <div>Price: ${pricePerToken}/token</div>
                  <div>Revenue: ${revenue.toLocaleString()}</div>
                  <div>ETH Generated: {ethEstimate.toFixed(4)} ETH</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="buyer-email">Buyer Contact (optional)</Label>
                  <Input
                    id="buyer-email"
                    placeholder="buyer@example.com or Discord handle"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={generateSalesContract}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Generate Sales Contract
                </Button>
                <Button 
                  onClick={() => window.open('https://discord.com/channels/@me', '_blank')}
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Open Discord for Sales
                </Button>
              </div>

              <Alert className="border-orange-500 bg-orange-50">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  <strong>EXECUTION PLAN:</strong> Use generated contract to approach buyers directly. 
                  Start with higher prices ($0.05-0.15) in crypto communities before considering emergency pricing.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Why Direct Sales Work Better</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-bold">Immediate Liquidity</div>
                <div className="text-sm text-muted-foreground">Get ETH within hours instead of waiting for pool creation</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-bold">No Gas Fees</div>
                <div className="text-sm text-muted-foreground">Buyers pay gas for transfers, you keep 100% of sale price</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-bold">Better Pricing Control</div>
                <div className="text-sm text-muted-foreground">Set your own prices instead of market rate fluctuations</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}