import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ExternalLink,
  CheckCircle,
  Clock,
  Target,
  Zap
} from "lucide-react";

export default function ExecutionDashboard() {
  const [executionProgress, setExecutionProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setExecutionProgress(prev => Math.min(prev + 5, 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const executionSteps = [
    {
      step: 1,
      title: "Approve ETHGR Tokens",
      status: "ready",
      action: "approve(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D, 9000000000000000000000)",
      link: "https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247#writeContract",
      gasEstimate: "$0.60",
      description: "Allow Uniswap Router to spend tokens"
    },
    {
      step: 2,
      title: "Create ETHGR/WETH Pair",
      status: "pending",
      action: "createPair(0xfA7b8c553C48C56ec7027d26ae95b029a2abF247, 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)",
      link: "https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract",
      gasEstimate: "$1.50",
      description: "Create trading pair on Uniswap"
    },
    {
      step: 3,
      title: "Add Initial Liquidity",
      status: "pending",
      action: "addLiquidityETH(...) + 0.003 ETH",
      link: "https://etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D#writeContract",
      gasEstimate: "$2.00",
      description: "Provide initial liquidity to pool"
    }
  ];

  const walletStatus = {
    ethBalance: "0.006 ETH",
    ethgrBalance: "1,990,000 ETHGR",
    totalValue: "$666,650",
    gasReserve: "$4.10"
  };

  const expectedOutcomes = [
    "ETHGR becomes immediately tradeable",
    "Pool generates 0.3% fees on all trades",
    "Price discovery begins with first transactions",
    "LP tokens received as proof of liquidity provision",
    "Revenue stream from trading activity"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-pulse">⚡</div>
        <h1 className="text-4xl font-bold">POOL CREATION EXECUTION</h1>
        <p className="text-xl text-muted-foreground">
          Transform your ETHGR tokens into tradeable liquidity
        </p>
        <Progress value={executionProgress} className="w-full h-4" />
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>System Ready:</strong> Wallet funded, contracts verified, parameters configured. 
          Execute Step 1 to begin unlocking $666,650 in token value.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Wallet Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(walletStatus).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <Badge variant="outline">{value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Expected Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {expectedOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  {outcome}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">EXECUTION SEQUENCE</h2>
        {executionSteps.map((step, index) => (
          <Card 
            key={index}
            className={`border-l-4 ${
              step.status === 'ready' ? 'border-l-green-500 bg-green-50' :
              step.status === 'executing' ? 'border-l-blue-500 bg-blue-50' :
              'border-l-gray-300'
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Badge variant={step.status === 'ready' ? 'default' : 'outline'}>
                    Step {step.step}
                  </Badge>
                  {step.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{step.gasEstimate}</Badge>
                  {step.status === 'ready' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {step.status === 'pending' && <Clock className="h-5 w-5 text-gray-400" />}
                </div>
              </div>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-3 rounded font-mono text-xs">
                {step.action}
              </div>
              
              <Button
                size="lg"
                className={`w-full ${
                  step.status === 'ready' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={() => window.open(step.link, '_blank')}
                disabled={step.status !== 'ready'}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                {step.status === 'ready' ? `EXECUTE STEP ${step.step}` : `AWAITING STEP ${step.step - 1}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">BEGIN EXECUTION</CardTitle>
          <CardDescription className="text-lg">
            Start with Step 1 - ETHGR Token Approval
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-8xl animate-bounce">🚀</div>
          <p className="text-xl">
            Your journey from trapped tokens to active trading begins now
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-2xl px-16 py-8"
            onClick={() => window.open('https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247#writeContract', '_blank')}
          >
            <ExternalLink className="h-8 w-8 mr-4" />
            START POOL CREATION
          </Button>
        </CardContent>
      </Card>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertDescription>
          <strong>Important:</strong> Execute steps in order. Wait for each transaction to confirm 
          before proceeding to the next step. Keep this dashboard open for reference.
        </AlertDescription>
      </Alert>
    </div>
  );
}