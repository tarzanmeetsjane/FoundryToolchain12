import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  ArrowRight,
  ExternalLink,
  Wallet,
  DollarSign,
  Target,
  Calculator
} from "lucide-react";

export default function PoolCreationReady() {
  const [ethAmount, setEthAmount] = useState("0.002");
  const [ethgrAmount, setEthgrAmount] = useState("0.006");
  const [calculatedRatio, setCalculatedRatio] = useState("0.333");

  useEffect(() => {
    const eth = parseFloat(ethAmount);
    const ethgr = parseFloat(ethgrAmount);
    if (eth > 0 && ethgr > 0) {
      setCalculatedRatio((ethgr / eth).toFixed(3));
    }
  }, [ethAmount, ethgrAmount]);

  const walletStatus = {
    mainWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    ethBalance: "0.004 ETH",
    ethgrBalance: "1,990,000 ETHGR",
    ethValue: "$10.08",
    status: "Ready for pool creation"
  };

  const poolParameters = {
    tokenA: "ETH",
    tokenB: "ETHGR", 
    fee: "0.3%",
    initialPrice: "0.335 ETHGR = 1 ETH",
    minLiquidity: "0.001 ETH minimum",
    recommendedLiquidity: "0.003 ETH optimal"
  };

  const creationSteps = [
    {
      step: 1,
      title: "Navigate to Uniswap V3",
      description: "Go to pool creation interface",
      status: "ready",
      action: "Open Uniswap"
    },
    {
      step: 2,
      title: "Select Token Pair",
      description: "ETH + ETHGR (0xfA7b...247)",
      status: "ready",
      action: "Configure"
    },
    {
      step: 3,
      title: "Set Fee Tier",
      description: "Choose 0.3% fee tier",
      status: "ready", 
      action: "Select"
    },
    {
      step: 4,
      title: "Set Initial Price",
      description: "0.335 ETHGR = 1 ETH",
      status: "ready",
      action: "Input"
    },
    {
      step: 5,
      title: "Add Liquidity",
      description: "Deposit your ETH + ETHGR",
      status: "ready",
      action: "Deposit"
    },
    {
      step: 6,
      title: "Confirm Transaction",
      description: "Sign and submit to blockchain",
      status: "pending",
      action: "Sign"
    }
  ];

  const riskAssessment = {
    impermanentLoss: "Low - New token, price discovery phase",
    gasRisk: "~$15-25 total gas costs",
    liquidityRisk: "Low - You control initial liquidity",
    marketRisk: "Medium - New token, untested demand",
    rewardPotential: "High - 0.3% fees on all trades"
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pool Creation Ready</h1>
          <p className="text-muted-foreground">
            Create the first ETHGR/ETH trading pool
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">$666,650</div>
          <div className="text-sm text-muted-foreground">Token Value to Unlock</div>
        </div>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Status:</strong> Your wallet has sufficient ETH and 1.99M ETHGR tokens are confirmed minted. 
          Ready to create the first ETHGR trading pool.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs font-mono text-muted-foreground">
              {walletStatus.mainWallet}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">ETH Balance</div>
                <div className="font-bold">{walletStatus.ethBalance}</div>
                <div className="text-xs text-green-600">{walletStatus.ethValue}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">ETHGR Balance</div>
                <div className="font-bold">{walletStatus.ethgrBalance}</div>
                <div className="text-xs text-green-600">Ready for pool</div>
              </div>
            </div>
            <Badge variant="default" className="w-full justify-center">
              {walletStatus.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Pool Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eth-amount">ETH Amount</Label>
                <Input
                  id="eth-amount"
                  type="number"
                  step="0.001"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  placeholder="0.002"
                />
              </div>
              <div>
                <Label htmlFor="ethgr-amount">ETHGR Amount</Label>
                <Input
                  id="ethgr-amount"
                  type="number"
                  step="0.001"
                  value={ethgrAmount}
                  onChange={(e) => setEthgrAmount(e.target.value)}
                  placeholder="0.006"
                />
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-sm text-muted-foreground">Calculated Ratio</div>
              <div className="font-bold">{calculatedRatio} ETHGR = 1 ETH</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pool Creation Process</CardTitle>
          <CardDescription>
            Step-by-step guide to create your ETHGR/ETH pool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creationSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.description}</div>
                </div>
                <Badge variant={step.status === 'ready' ? 'default' : 'secondary'}>
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pool Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(poolParameters).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(riskAssessment).map(([key, value]) => (
              <div key={key}>
                <div className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </div>
                <div className="text-sm text-muted-foreground">{value}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Button
          className="w-full"
          size="lg"
          onClick={() => window.open('https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Create ETHGR/ETH Pool Now
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => window.open('https://app.uniswap.org/#/pool', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Pool Interface
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(`https://etherscan.io/token/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Verify ETHGR Contract
          </Button>
        </div>
      </div>

      <Alert>
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>Final Step:</strong> Click "Create ETHGR/ETH Pool Now" to begin pool creation. 
          Use 0.002 ETH + 0.006 ETHGR for initial liquidity. This will unlock trading for your 1.99M tokens.
        </AlertDescription>
      </Alert>
    </div>
  );
}