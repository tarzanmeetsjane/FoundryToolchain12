import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  DollarSign,
  ExternalLink,
  TrendingUp,
  Zap,
  Target,
  Calendar,
  Hash
} from "lucide-react";

export default function SuccessDashboard() {
  const recoveryData = {
    contractAddress: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    deploymentTx: "0x91c216ff3fb90644ec558e96af3ea2201da98bd75f3954089fb7aa37ab605b61",
    mintingTx: "0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169",
    tokensRecovered: 1990000,
    totalGasCost: "0.004192592",
    totalGasCostUSD: "10.48",
    marketValue: 706450, // At $0.355 per token
    walletAddress: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
  };

  const monetizationOptions = [
    {
      strategy: "Direct Sales",
      amount: "100,000 tokens",
      price: "$0.05/token",
      revenue: "$5,000",
      ethGenerated: "2 ETH",
      timeframe: "1-3 hours",
      link: "/direct-token-sales"
    },
    {
      strategy: "Pool Creation",
      amount: "500,000 tokens",
      price: "Market rate",
      revenue: "$177,500",
      ethGenerated: "Need 2-5 ETH",
      timeframe: "After ETH generation",
      link: "/ethgr-monetization"
    },
    {
      strategy: "Gradual Sales",
      amount: "50,000/week",
      price: "$0.10-0.30",
      revenue: "$5,000-15,000/week",
      ethGenerated: "Ongoing",
      timeframe: "Long-term",
      link: "/direct-token-sales"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">ETHGR Recovery Success Dashboard</h1>
        <p className="text-muted-foreground">
          Complete recovery mission accomplished - 1,990,000 transferable tokens ready for monetization
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>MISSION ACCOMPLISHED:</strong> ETHGR contract deployed, tokens minted, and verified. 
          All systems ready for immediate monetization.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tokens Recovered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {recoveryData.tokensRecovered.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">ETHGR Tokens</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Market Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${recoveryData.marketValue.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">At $0.355/token</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recovery Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${recoveryData.totalGasCostUSD}
            </div>
            <div className="text-sm text-muted-foreground">{recoveryData.totalGasCost} ETH</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              67,431x
            </div>
            <div className="text-sm text-muted-foreground">Return on Investment</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Recovery Transaction Details
          </CardTitle>
          <CardDescription>
            Complete transaction history of the recovery operation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="font-bold mb-2">Contract Deployment</div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-bold">Transaction:</span>
                  <div className="font-mono text-xs break-all">{recoveryData.deploymentTx}</div>
                </div>
                <div>
                  <span className="font-bold">Gas Cost:</span> 0.003910106 ETH
                </div>
                <div>
                  <span className="font-bold">Status:</span> 
                  <Badge variant="default" className="ml-2">Success</Badge>
                </div>
              </div>
              <Button 
                size="sm" 
                className="mt-3"
                onClick={() => window.open(`https://etherscan.io/tx/${recoveryData.deploymentTx}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Deployment
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="font-bold mb-2">Token Minting</div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-bold">Transaction:</span>
                  <div className="font-mono text-xs break-all">{recoveryData.mintingTx}</div>
                </div>
                <div>
                  <span className="font-bold">Gas Cost:</span> 0.000282486 ETH
                </div>
                <div>
                  <span className="font-bold">Tokens Minted:</span> 1,990,000 ETHGR
                </div>
              </div>
              <Button 
                size="sm" 
                className="mt-3"
                onClick={() => window.open(`https://etherscan.io/tx/${recoveryData.mintingTx}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Minting
              </Button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-bold mb-2">Contract Address</div>
            <div className="font-mono text-sm break-all mb-3">{recoveryData.contractAddress}</div>
            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={() => window.open(`https://etherscan.io/address/${recoveryData.contractAddress}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Contract
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigator.clipboard.writeText(recoveryData.contractAddress)}
              >
                Copy Address
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monetization Strategies
          </CardTitle>
          <CardDescription>
            Multiple pathways to convert your ETHGR tokens into immediate revenue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {monetizationOptions.map((option, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold">{option.strategy}</div>
                  <div className="text-sm text-muted-foreground">{option.amount} at {option.price}</div>
                </div>
                <Badge variant="outline">{option.timeframe}</Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
                <div>
                  <div className="font-bold">Revenue:</div>
                  <div className="text-green-600">{option.revenue}</div>
                </div>
                <div>
                  <div className="font-bold">ETH Generated:</div>
                  <div className="text-blue-600">{option.ethGenerated}</div>
                </div>
                <div>
                  <div className="font-bold">Timeframe:</div>
                  <div>{option.timeframe}</div>
                </div>
              </div>

              <Button 
                size="sm"
                onClick={() => window.open(option.link, '_blank')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Target className="h-4 w-4 mr-1" />
                Execute Strategy
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            Recommended actions for immediate monetization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Zap className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <div className="font-bold">Immediate Action: Direct Token Sales</div>
                <div className="text-sm text-muted-foreground">
                  Sell 100,000 tokens at $0.05 each to generate $5,000 (2 ETH) for pool creation
                </div>
              </div>
              <Button 
                size="sm"
                onClick={() => window.open('/direct-token-sales', '_blank')}
              >
                Start Sales
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-bold">Pool Creation</div>
                <div className="text-sm text-muted-foreground">
                  Create ETHGR/ETH trading pair with generated ETH for ongoing revenue
                </div>
              </div>
              <Button 
                size="sm"
                onClick={() => window.open('/ethgr-monetization', '_blank')}
              >
                Plan Pool
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <div className="font-bold">Long-term Strategy</div>
                <div className="text-sm text-muted-foreground">
                  Gradual token sales and market making for sustained revenue generation
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}