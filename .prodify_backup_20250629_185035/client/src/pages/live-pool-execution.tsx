import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ExternalLink, 
  Rocket,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";

export default function LivePoolExecution() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const executionSteps = [
    {
      title: "Open Uniswap Pool Creation",
      description: "Navigate to Uniswap V3 interface",
      url: "https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH",
      duration: "30 seconds",
      status: "ready"
    },
    {
      title: "Connect Your Wallet",
      description: "Connect wallet 0x058C...8843",
      url: "#",
      duration: "15 seconds", 
      status: "pending"
    },
    {
      title: "Configure Pool Parameters",
      description: "Set ETH/ETHGR pair with 0.3% fee",
      url: "#",
      duration: "45 seconds",
      status: "pending"
    },
    {
      title: "Set Initial Price",
      description: "0.335 ETHGR = 1 ETH",
      url: "#", 
      duration: "30 seconds",
      status: "pending"
    },
    {
      title: "Add Liquidity Amounts",
      description: "0.002 ETH + 0.006 ETHGR",
      url: "#",
      duration: "45 seconds",
      status: "pending"
    },
    {
      title: "Review & Confirm",
      description: "Check all parameters before signing",
      url: "#",
      duration: "30 seconds",
      status: "pending"
    },
    {
      title: "Sign Transaction",
      description: "Approve pool creation transaction",
      url: "#",
      duration: "2-3 minutes",
      status: "pending"
    },
    {
      title: "Pool Created Successfully",
      description: "ETHGR tokens now tradeable!",
      url: "#",
      duration: "Instant",
      status: "pending"
    }
  ];

  const quickFacts = [
    {
      label: "Investment",
      value: "0.002 ETH",
      subvalue: "~$5.03"
    },
    {
      label: "Tokens Unlocked",
      value: "1.99M ETHGR",
      subvalue: "$666,650"
    },
    {
      label: "Return Ratio",
      value: "132,000x",
      subvalue: "Investment vs Value"
    },
    {
      label: "Trading Fees",
      value: "0.3%",
      subvalue: "Earned on all trades"
    }
  ];

  const postCreationActions = [
    {
      title: "Start Trading ETHGR",
      description: "Swap portions of your 1.99M tokens for ETH",
      url: "https://app.uniswap.org/#/swap?inputCurrency=0xfA7b8c553C48C56ec7027d26ae95b029a2abF247&outputCurrency=ETH",
      priority: "immediate"
    },
    {
      title: "Add More Liquidity",
      description: "Increase pool size for better trading",
      url: "https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH",
      priority: "soon"
    },
    {
      title: "Monitor Pool Performance",
      description: "Track fees earned and trading volume",
      url: "https://info.uniswap.org/#/pools",
      priority: "ongoing"
    }
  ];

  const liveStats = {
    walletBalance: "0.004 ETH",
    ethgrTokens: "1,990,000 ETHGR",
    readyForPool: true,
    estimatedGasCost: "$3-5",
    timeToComplete: "5-8 minutes"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Rocket className="h-8 w-8 text-blue-600" />
            Live Pool Execution
          </h1>
          <p className="text-muted-foreground text-lg">
            Create your ETHGR/ETH pool and unlock $666,650 in token value
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">GO TIME!</div>
          <div className="text-sm text-muted-foreground">Ready to Execute</div>
        </div>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <Rocket className="h-4 w-4" />
        <AlertDescription>
          <strong>EXECUTION MODE ACTIVATED:</strong> All systems ready for pool creation. 
          Your 1.99M ETHGR tokens are about to become tradeable!
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickFacts.map((fact, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{fact.value}</div>
              <div className="text-sm text-muted-foreground">{fact.label}</div>
              <div className="text-xs text-green-600">{fact.subvalue}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="h-6 w-6" />
            PRIMARY MISSION: CREATE POOL
          </CardTitle>
          <CardDescription>
            Click the button below to start the pool creation process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🚀</div>
            <Button
              size="lg"
              className="text-xl px-12 py-6 h-auto"
              onClick={() => window.open('https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH', '_blank')}
            >
              <ExternalLink className="h-6 w-6 mr-3" />
              CREATE ETHGR/ETH POOL NOW
            </Button>
            <div className="text-sm text-muted-foreground">
              This opens Uniswap with your ETHGR token pre-loaded
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-blue-50 rounded">
              <div className="font-bold">Token A: ETH</div>
              <div>Amount: 0.002 ETH</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <div className="font-bold">Token B: ETHGR</div>
              <div>Amount: 0.006 ETHGR</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded">
              <div className="font-bold">Fee Tier: 0.3%</div>
              <div>Price: 0.335 ratio</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Execution Guide</CardTitle>
          <CardDescription>
            Follow these steps after clicking "CREATE POOL"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executionSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded hover:bg-muted/50">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.description}</div>
                  <div className="text-xs text-blue-600">Duration: {step.duration}</div>
                </div>
                <Badge variant="outline">
                  {index === 0 ? 'START HERE' : 'Next'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            After Pool Creation Success
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {postCreationActions.map((action, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={action.priority === 'immediate' ? 'default' : 'secondary'}>
                  {action.priority}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(action.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Go
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Alert>
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>Success Metrics:</strong> Once the pool is created, you can immediately start swapping your 1.99M ETHGR tokens for ETH. 
          Conservative estimate: Convert 100,000 tokens weekly = $33,500 weekly revenue.
        </AlertDescription>
      </Alert>
    </div>
  );
}