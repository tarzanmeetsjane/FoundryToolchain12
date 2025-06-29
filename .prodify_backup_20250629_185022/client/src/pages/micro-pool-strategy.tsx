import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ExternalLink, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Zap,
  Calculator
} from "lucide-react";

export default function MicroPoolStrategy() {
  const [ethAmount, setEthAmount] = useState("0.001");
  const [ethgrAmount, setEthgrAmount] = useState("0.003");

  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const currentSituation = {
    availableETH: "0.004 ETH",
    availableUSD: "$10.08",
    requiredForPool: "0.002 ETH minimum",
    requiredForGas: "0.002 ETH estimated",
    totalNeeded: "0.004 ETH",
    shortfall: "Need more ETH for gas fees"
  };

  const microStrategies = [
    {
      title: "Ultra-Micro Pool (0.001 ETH)",
      description: "Create smallest possible pool to test functionality",
      ethRequired: "0.001 ETH",
      ethgrRequired: "0.003 ETHGR",
      gasReserve: "0.003 ETH",
      totalCost: "0.004 ETH",
      feasible: true,
      pros: ["Uses current balance", "Tests pool creation", "Minimal risk"],
      cons: ["Very low initial liquidity", "High slippage initially"]
    },
    {
      title: "Transfer ETH Between Wallets",
      description: "Move ETH from secondary wallet to main wallet",
      ethRequired: "0.003 ETH from wallet 2",
      ethgrRequired: "0.009 ETHGR",
      gasReserve: "0.001 ETH",
      totalCost: "Gas fees only",
      feasible: true,
      pros: ["Uses existing funds", "Optimal pool size", "No external purchase"],
      cons: ["Requires wallet management"]
    },
    {
      title: "Buy $15 ETH Immediately",
      description: "Quick ETH purchase for optimal pool creation",
      ethRequired: "0.006 ETH total",
      ethgrRequired: "0.018 ETHGR",
      gasReserve: "0.002 ETH",
      totalCost: "$15 + current balance",
      feasible: true,
      pros: ["Optimal liquidity", "Professional setup", "Higher success rate"],
      cons: ["Requires purchase"]
    }
  ];

  const immediateActions = [
    {
      priority: "HIGH",
      title: "Try Ultra-Micro Pool Now",
      description: "Use 0.001 ETH + 0.003 ETHGR with current balance",
      url: `https://app.uniswap.org/#/add/v2/${ETHGR_CONTRACT}/ETH`,
      buttonText: "Create Micro Pool",
      risk: "Low",
      timeframe: "2 minutes"
    },
    {
      priority: "MEDIUM", 
      title: "Transfer from Wallet 2",
      description: "Send 0.003 ETH from 0xc46e...a630 to main wallet",
      url: "#",
      buttonText: "Guide Transfer",
      risk: "None",
      timeframe: "5 minutes"
    },
    {
      priority: "BACKUP",
      title: "Buy ETH via Coinbase",
      description: "Purchase $15 ETH directly to wallet",
      url: "https://www.coinbase.com/buy-ethereum",
      buttonText: "Buy ETH",
      risk: "None", 
      timeframe: "3 minutes"
    }
  ];

  const calculateRatio = () => {
    const eth = parseFloat(ethAmount);
    const ethgr = parseFloat(ethgrAmount);
    if (eth > 0 && ethgr > 0) {
      return (ethgr / eth).toFixed(3);
    }
    return "0.000";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Micro Pool Strategy</h1>
          <p className="text-muted-foreground">
            Create your ETHGR pool with minimal ETH requirements
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">ETH Shortage</div>
          <div className="text-sm text-muted-foreground">Need funding solution</div>
        </div>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Funding Issue:</strong> Pool creation requires ETH for both liquidity and gas fees. 
          Your 0.004 ETH needs to cover both. We have three immediate solutions below.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Current Balance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {Object.entries(currentSituation).map(([key, value]) => (
              <div key={key}>
                <div className="text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="font-medium">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold">Immediate Solutions</h2>
        {immediateActions.map((action, index) => (
          <Card key={index} className={
            action.priority === 'HIGH' ? 'border-green-500 bg-green-50' :
            action.priority === 'MEDIUM' ? 'border-blue-500 bg-blue-50' :
            'border-gray-500 bg-gray-50'
          }>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{action.title}</span>
                <div className="flex gap-2">
                  <Badge variant={action.priority === 'HIGH' ? 'default' : 'outline'}>
                    {action.priority}
                  </Badge>
                  <Badge variant="secondary">{action.timeframe}</Badge>
                </div>
              </CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Risk: {action.risk}</span>
                <span>Time: {action.timeframe}</span>
              </div>
              
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  if (action.url !== '#') {
                    window.open(action.url, '_blank');
                  }
                }}
                variant={action.priority === 'HIGH' ? 'default' : 'outline'}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {action.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Micro Pool Calculator
          </CardTitle>
          <CardDescription>
            Test different amounts within your 0.004 ETH limit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="micro-eth">ETH Amount</Label>
              <Input
                id="micro-eth"
                type="number"
                step="0.0001"
                max="0.002"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                placeholder="0.001"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Max: 0.002 ETH (save 0.002 for gas)
              </div>
            </div>
            <div>
              <Label htmlFor="micro-ethgr">ETHGR Amount</Label>
              <Input
                id="micro-ethgr"
                type="number"
                step="0.001"
                value={ethgrAmount}
                onChange={(e) => setEthgrAmount(e.target.value)}
                placeholder="0.003"
              />
              <div className="text-xs text-muted-foreground mt-1">
                From your 1,990,000 ETHGR
              </div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded">
            <div className="text-sm text-muted-foreground">Calculated Ratio</div>
            <div className="text-lg font-bold">{calculateRatio()} ETHGR = 1 ETH</div>
          </div>
          
          <Button
            className="w-full"
            onClick={() => window.open(
              `https://app.uniswap.org/#/add/v2/${ETHGR_CONTRACT}/ETH`,
              '_blank'
            )}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Create Pool with These Amounts
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {microStrategies.map((strategy, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{strategy.title}</CardTitle>
              <CardDescription>{strategy.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <div><strong>ETH:</strong> {strategy.ethRequired}</div>
                <div><strong>ETHGR:</strong> {strategy.ethgrRequired}</div>
                <div><strong>Gas:</strong> {strategy.gasReserve}</div>
                <div><strong>Total:</strong> {strategy.totalCost}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs">
                  <strong>Pros:</strong>
                  <ul className="list-disc list-inside">
                    {strategy.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs">
                  <strong>Cons:</strong>
                  <ul className="list-disc list-inside">
                    {strategy.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Badge variant={strategy.feasible ? 'default' : 'destructive'} className="w-full justify-center">
                {strategy.feasible ? 'Feasible' : 'Not Feasible'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>Recommended Action:</strong> Try the ultra-micro pool first with 0.001 ETH. 
          If gas fees are too high, transfer 0.003 ETH from your secondary wallet or buy $15 worth of ETH.
        </AlertDescription>
      </Alert>
    </div>
  );
}