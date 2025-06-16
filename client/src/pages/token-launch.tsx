import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, DollarSign, Users, Zap } from "lucide-react";

export default function TokenLaunchPage() {
  const [ethgrPrice, setEthgrPrice] = useState("0.00");
  const [liquidityPool, setLiquidityPool] = useState(null);

  const tokenInfo = {
    address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    symbol: "ETHGR",
    name: "ETHG Recovery",
    totalSupply: "1,990,000",
    holders: 1,
    verified: true
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ETHGR Token Launch Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Add liquidity, establish market value, and create trading opportunities for your recovered tokens
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Token Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${ethgrPrice}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Per ETHGR</p>
            <Badge variant="outline" className="mt-2">Market Cap: $0</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Supply Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,990,000</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Supply</p>
            <Badge variant="secondary" className="mt-2">100% Recovered</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Liquidity Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">$0</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Liquidity</p>
            <Badge variant="destructive" className="mt-2">No Pools Yet</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="uniswap" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="uniswap">Uniswap V3</TabsTrigger>
          <TabsTrigger value="sushiswap">SushiSwap</TabsTrigger>
          <TabsTrigger value="pancake">PancakeSwap</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="uniswap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Uniswap V3 Liquidity Pool</CardTitle>
              <CardDescription>
                Add liquidity to establish market pricing for ETHGR tokens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ethAmount">ETH Amount</Label>
                  <Input id="ethAmount" placeholder="0.1" type="number" step="0.001" />
                  <p className="text-sm text-gray-600 mt-1">Your balance: 0.014 ETH</p>
                </div>
                <div>
                  <Label htmlFor="ethgrAmount">ETHGR Amount</Label>
                  <Input id="ethgrAmount" placeholder="100000" type="number" />
                  <p className="text-sm text-gray-600 mt-1">Your balance: 1,990,000 ETHGR</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Price Calculation</h4>
                <p className="text-sm">Initial price will be: ETH Amount ÷ ETHGR Amount</p>
                <p className="text-sm">Example: 0.1 ETH ÷ 100,000 ETHGR = $0.0026 per ETHGR</p>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => window.open(`https://app.uniswap.org/#/add/ETH/${tokenInfo.address}`, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Create ETHGR/ETH Pool on Uniswap
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sushiswap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SushiSwap Liquidity Pool</CardTitle>
              <CardDescription>
                Alternative platform for establishing ETHGR market presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">SushiSwap Benefits</h4>
                <ul className="text-sm space-y-1">
                  <li>• Lower gas fees than Uniswap</li>
                  <li>• Additional yield farming opportunities</li>
                  <li>• Cross-chain deployment options</li>
                </ul>
              </div>

              <Button 
                className="w-full" 
                variant="outline" 
                size="lg"
                onClick={() => window.open(`https://www.sushi.com/pool/add?token0=ETH&token1=${tokenInfo.address}`, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Create ETHGR/ETH Pool on SushiSwap
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pancake" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Chain Deployment</CardTitle>
              <CardDescription>
                Deploy ETHGR on multiple networks for broader accessibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">BSC Network</h4>
                  <p className="text-sm text-gray-600 mt-1">Lower fees, high volume</p>
                  <Button variant="outline" size="sm" className="mt-2">Deploy on BSC</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Polygon Network</h4>
                  <p className="text-sm text-gray-600 mt-1">Fast transactions, DeFi focus</p>
                  <Button variant="outline" size="sm" className="mt-2">Deploy on Polygon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Analytics</CardTitle>
              <CardDescription>
                Track ETHGR performance and market metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Contract Address:</span>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                    {tokenInfo.address}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Supply:</span>
                  <span className="font-semibold">{tokenInfo.totalSupply} ETHGR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current Holders:</span>
                  <span className="font-semibold">{tokenInfo.holders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Verified Contract:</span>
                  <Badge variant="secondary">✓ Verified</Badge>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://etherscan.io/address/${tokenInfo.address}`, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on Etherscan
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://dexscreener.com/ethereum/${tokenInfo.address}`, '_blank')}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Add to DEX Screener
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Next Steps to Add Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h4 className="font-semibold">Add Liquidity</h4>
              <p className="text-sm text-gray-600">Create trading pairs on DEX platforms</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-600 mb-2">2</div>
              <h4 className="font-semibold">Establish Price</h4>
              <p className="text-sm text-gray-600">Set initial market value through trading</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
              <h4 className="font-semibold">Build Community</h4>
              <p className="text-sm text-gray-600">Attract traders and build token utility</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}