import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  TrendingUp,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Zap,
  Users,
  ArrowRight
} from "lucide-react";

export default function ETHGRMonetization() {
  const [strategy, setStrategy] = useState<'direct-sale' | 'community' | 'exchange'>('direct-sale');

  const ethgrData = {
    contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    totalTokens: "1,990,000",
    currentETH: "0.014",
    estimatedValue: "$35"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">ETHGR Monetization Strategies</h1>
        <p className="text-muted-foreground">
          Alternative ways to monetize your 1,990,000 ETHGR tokens without requiring large ETH amounts
        </p>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>ETH SHORTAGE IDENTIFIED:</strong> Current balance {ethgrData.currentETH} ETH ({ethgrData.estimatedValue}) 
          is insufficient for Uniswap pool creation. Exploring alternative monetization strategies.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className={`cursor-pointer border-2 ${strategy === 'direct-sale' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
          onClick={() => setStrategy('direct-sale')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Direct Sales
            </CardTitle>
            <CardDescription>Sell tokens directly to buyers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">Immediate</div>
              <div className="text-sm text-muted-foreground">No ETH required</div>
              <Badge className="bg-green-600">Recommended</Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer border-2 ${strategy === 'community' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
          onClick={() => setStrategy('community')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Building
            </CardTitle>
            <CardDescription>Build token community first</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">Medium-term</div>
              <div className="text-sm text-muted-foreground">Social strategy</div>
              <Badge variant="outline">Growth</Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer border-2 ${strategy === 'exchange' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
          onClick={() => setStrategy('exchange')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              DEX Listing
            </CardTitle>
            <CardDescription>Alternative DEX platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-600">Long-term</div>
              <div className="text-sm text-muted-foreground">Higher fees</div>
              <Badge variant="outline">Professional</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {strategy === 'direct-sale' && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Direct Sales Strategy
            </CardTitle>
            <CardDescription>
              Sell ETHGR tokens directly to interested buyers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>BEST OPTION:</strong> Direct sales require no ETH investment and provide immediate cash flow.
                Your tokens are fully transferable and verified on Etherscan.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Sales Platforms:</div>
                <ul className="text-sm space-y-1">
                  <li>• Telegram crypto trading groups</li>
                  <li>• Discord NFT/token communities</li>
                  <li>• Reddit crypto marketplaces</li>
                  <li>• Direct buyer outreach</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Pricing Strategy:</div>
                <ul className="text-sm space-y-1">
                  <li>• Start at $0.001 per ETHGR token</li>
                  <li>• Offer bulk discounts (500k+ tokens)</li>
                  <li>• Accept ETH, USDT, or USDC</li>
                  <li>• Provide proof of legitimacy</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold">Sales Package Options:</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-bold">Starter Pack</div>
                  <div className="text-sm">100,000 ETHGR</div>
                  <div className="text-green-600 font-bold">$100</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-bold">Whale Pack</div>
                  <div className="text-sm">500,000 ETHGR</div>
                  <div className="text-green-600 font-bold">$450</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-bold">Full Stack</div>
                  <div className="text-sm">1,990,000 ETHGR</div>
                  <div className="text-green-600 font-bold">$1,500</div>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://t.me/ethtrader', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Find Buyers on Telegram
            </Button>
          </CardContent>
        </Card>
      )}

      {strategy === 'community' && (
        <Card className="border-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Building Strategy
            </CardTitle>
            <CardDescription>
              Build token holder community to increase demand
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Phase 1: Foundation</div>
                <ul className="text-sm space-y-1">
                  <li>• Create ETHGR Telegram group</li>
                  <li>• Design token logo and branding</li>
                  <li>• Write whitepaper/tokenomics</li>
                  <li>• Social media presence</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Phase 2: Growth</div>
                <ul className="text-sm space-y-1">
                  <li>• Airdrop campaigns</li>
                  <li>• Influencer partnerships</li>
                  <li>• Community contests</li>
                  <li>• Utility development</li>
                </ul>
              </div>
            </div>

            <Alert className="border-blue-500 bg-blue-50">
              <AlertDescription>
                <strong>TIME INVESTMENT:</strong> Community building takes 2-4 weeks but can significantly 
                increase token value through organic demand creation.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {strategy === 'exchange' && (
        <Card className="border-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Alternative DEX Listing
            </CardTitle>
            <CardDescription>
              Lower-cost DEX alternatives to Uniswap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Low-Cost Options:</div>
                <ul className="text-sm space-y-1">
                  <li>• SushiSwap (lower gas fees)</li>
                  <li>• PancakeSwap (BSC network)</li>
                  <li>• QuickSwap (Polygon network)</li>
                  <li>• 1inch DEX aggregator</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Requirements:</div>
                <ul className="text-sm space-y-1">
                  <li>• Bridge tokens to cheaper networks</li>
                  <li>• Minimum 0.05 ETH for liquidity</li>
                  <li>• Gas fees: $50-200</li>
                  <li>• Technical complexity: Medium</li>
                </ul>
              </div>
            </div>

            <Alert className="border-purple-500 bg-purple-50">
              <AlertDescription>
                <strong>COST ANALYSIS:</strong> Alternative DEXs still require initial ETH investment. 
                Consider direct sales first to generate ETH for later DEX listing.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Immediate Action Plan</CardTitle>
          <CardDescription>
            Recommended next steps based on current situation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Badge variant="secondary">1</Badge>
              <div className="flex-1">
                <div className="font-bold">Direct Sales (Immediate)</div>
                <div className="text-sm text-muted-foreground">
                  Sell 200,000-500,000 ETHGR tokens to generate initial ETH
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Badge variant="secondary">2</Badge>
              <div className="flex-1">
                <div className="font-bold">Reinvest in Liquidity</div>
                <div className="text-sm text-muted-foreground">
                  Use sales proceeds to create proper ETHGR/ETH pool
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Badge variant="secondary">3</Badge>
              <div className="flex-1">
                <div className="font-bold">Scale Operations</div>
                <div className="text-sm text-muted-foreground">
                  Build community and increase remaining token value
                </div>
              </div>
              <Zap className="h-4 w-4 text-purple-600" />
            </div>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>SUCCESS PATH:</strong> Start with direct sales to generate ETH, then reinvest 
              in proper liquidity pools. This creates a sustainable monetization cycle.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}