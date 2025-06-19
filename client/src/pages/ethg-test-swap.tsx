import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  ArrowRight,
  Zap
} from "lucide-react";

export default function ETHGTestSwap() {
  const ORIGINAL_ETHG = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const RECOVERY_ETHGR = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const testSwaps = [
    {
      title: "Test Small ETHG Swap (Original Contract)",
      description: "Try swapping 10 ETHG from the original contract",
      url: `https://app.uniswap.org/#/swap?inputCurrency=${ORIGINAL_ETHG}&outputCurrency=ETH&exactAmount=10`,
      amount: "10 ETHG",
      expectedValue: "$3.35",
      risk: "Low",
      purpose: "Test if honeypot is fixed"
    },
    {
      title: "Test Medium ETHG Swap",
      description: "Try swapping 100 ETHG if small test works",
      url: `https://app.uniswap.org/#/swap?inputCurrency=${ORIGINAL_ETHG}&outputCurrency=ETH&exactAmount=100`,
      amount: "100 ETHG",
      expectedValue: "$33.50",
      risk: "Medium",
      purpose: "Confirm reliable trading"
    },
    {
      title: "Test ETHGR Swap (Recovery Contract)",
      description: "Compare with your recovery contract",
      url: `https://app.uniswap.org/#/swap?inputCurrency=${RECOVERY_ETHGR}&outputCurrency=ETH&exactAmount=10`,
      amount: "10 ETHGR",
      expectedValue: "$3.35",
      risk: "Low",
      purpose: "Compare both contracts"
    }
  ];

  const quickLinks = [
    {
      title: "Check Original ETHG Pool",
      url: "https://info.uniswap.org/#/pools/0x0890f93a1fd344b3437ec10c1c14d1a581142c5f",
      description: "View the existing ETHG/WETH pool data"
    },
    {
      title: "ETHG Token Page",
      url: `https://etherscan.io/token/${ORIGINAL_ETHG}`,
      description: "Verify original contract status"
    },
    {
      title: "Your ETHGR Contract",
      url: `https://etherscan.io/token/${RECOVERY_ETHGR}`,
      description: "Compare with recovery contract"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ETHG Test Swap</h1>
          <p className="text-muted-foreground">
            Test if your original ETHG tokens are now tradeable
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">$678,495</div>
          <div className="text-sm text-muted-foreground">Wallet Shows Value</div>
        </div>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>MAJOR DISCOVERY:</strong> Your wallet shows 1.99M ETHG tokens worth $678,495! 
          This suggests the original ETHG may now be working. Let's test small swaps to confirm.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4">
        {testSwaps.map((swap, index) => (
          <Card key={index} className={index === 0 ? 'border-green-500 bg-green-50' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{swap.title}</span>
                <Badge variant={swap.risk === 'Low' ? 'secondary' : 'outline'}>
                  {swap.risk} Risk
                </Badge>
              </CardTitle>
              <CardDescription>{swap.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium">{swap.amount}</div>
                  <div className="text-muted-foreground">Test amount</div>
                </div>
                <div>
                  <div className="font-medium text-green-600">{swap.expectedValue}</div>
                  <div className="text-muted-foreground">Expected ETH</div>
                </div>
                <div>
                  <div className="font-medium">{swap.purpose}</div>
                  <div className="text-muted-foreground">Purpose</div>
                </div>
              </div>
              
              <Button
                className="w-full"
                size="lg"
                onClick={() => window.open(swap.url, '_blank')}
                variant={index === 0 ? 'default' : 'outline'}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {index === 0 ? 'TEST NOW (RECOMMENDED)' : 'Test This Swap'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Analysis Links
          </CardTitle>
          <CardDescription>
            Verify the status of both contracts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickLinks.map((link, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">{link.title}</div>
                <div className="text-sm text-muted-foreground">{link.description}</div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(link.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Check
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">If ETHG Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">You have $678k in tradeable tokens</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Existing pool with $57k liquidity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Can sell tokens immediately</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">No need to create new pool</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">If ETHG Still Honeypot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Use ETHGR recovery contract</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Create new pool as planned</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Your tokens still recoverable</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Establish new market</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>Recommended Next Step:</strong> Click "TEST NOW" above to try swapping 10 ETHG for ETH. 
          This small test will immediately tell us if the original honeypot issue is resolved.
        </AlertDescription>
      </Alert>
    </div>
  );
}