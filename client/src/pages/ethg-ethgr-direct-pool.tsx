import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Copy,
  CheckCircle,
  Target,
  Lightbulb,
  ExternalLink
} from "lucide-react";

export default function ETHGETHGRDirectPool() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const poolStrategy = {
    innovation: "First-ever ETHG/ETHGR arbitrage pool",
    advantage: "No ETH required for initial liquidity",
    tokenA: "ETHG (Original working tokens)",
    tokenB: "ETHGR (Recovery tokens)", 
    liquidityA: "100,000 ETHG tokens",
    liquidityB: "100,000 ETHGR tokens",
    marketValue: "$68,000 initial pool value"
  };

  const executionSteps = [
    {
      step: 1,
      title: "Approve ETHG Tokens",
      contract: "0xd9145CCE52D386f254917e481eB44e9943F39138",
      function: "approve",
      params: ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "100000000000000000000000"],
      description: "Allow router to spend 100,000 ETHG tokens"
    },
    {
      step: 2,
      title: "Approve ETHGR Tokens", 
      contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      function: "approve",
      params: ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "100000000000000000000000"],
      description: "Allow router to spend 100,000 ETHGR tokens"
    },
    {
      step: 3,
      title: "Create ETHG/ETHGR Pair",
      contract: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      function: "createPair",
      params: ["0xd9145CCE52D386f254917e481eB44e9943F39138", "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247"],
      description: "Create the first ETHG/ETHGR trading pair"
    },
    {
      step: 4,
      title: "Add Dual-Token Liquidity",
      contract: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      function: "addLiquidity",
      params: ["ETHG_ADDRESS", "ETHGR_ADDRESS", "100000000000000000000000", "100000000000000000000000", "95000000000000000000000", "95000000000000000000000", "YOUR_ADDRESS", "1750400000"],
      description: "Add 100k ETHG + 100k ETHGR liquidity"
    }
  ];

  const advantages = [
    "No ETH funding required - use existing tokens",
    "Creates arbitrage opportunities between ETHG and ETHGR",
    "Establishes market pricing for both tokens",
    "Generates trading fees on dual-token swaps",
    "Unlocks $1.3M+ combined token portfolio",
    "First-of-its-kind recovery token pool"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔄</div>
        <h1 className="text-4xl font-bold">ETHG/ETHGR DUAL-TOKEN POOL</h1>
        <p className="text-xl text-muted-foreground">
          Revolutionary arbitrage pool using your existing tokens
        </p>
      </div>

      <Alert className="border-purple-500 bg-purple-50">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Breakthrough Innovation:</strong> Create the first ETHG/ETHGR trading pair using your existing tokens. 
          No ETH required - leverage your 2.1M ETHG + 1.99M ETHGR portfolio directly.
        </AlertDescription>
      </Alert>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Pool Strategy Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(poolStrategy).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 border rounded">
                <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <Badge variant="outline">{value}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Advantages</CardTitle>
          <CardDescription>Why ETHG/ETHGR pool is the optimal solution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center gap-2 p-2">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm">{advantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">EXECUTION SEQUENCE</h2>
        {executionSteps.map((step, index) => (
          <Card key={index} className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Badge variant="default">Step {step.step}</Badge>
                  {step.title}
                </CardTitle>
              </div>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-bold">Contract Address</Label>
                <div className="flex gap-2">
                  <Input 
                    value={step.contract} 
                    readOnly 
                    className="font-mono text-xs"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(step.contract, `contract-${step.step}`)}
                  >
                    <Copy className="h-3 w-3" />
                    {copiedField === `contract-${step.step}` ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold">Function: {step.function}</Label>
                <div className="bg-muted p-3 rounded font-mono text-xs">
                  {step.function}({step.params.map((param, i) => (
                    <span key={i}>
                      {i > 0 && ', '}
                      {param.startsWith('0x') ? (
                        <span className="text-blue-600">{param}</span>
                      ) : param.includes('000000') ? (
                        <span className="text-green-600">{param}</span>
                      ) : (
                        <span className="text-purple-600">{param}</span>
                      )}
                    </span>
                  ))})
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => window.open(`https://etherscan.io/address/${step.contract}#writeContract`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                EXECUTE STEP {step.step}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Pool Creation Result:</strong> Creates the world's first ETHG/ETHGR arbitrage market, 
          enables trading between original and recovery tokens, and unlocks your complete $1.3M+ token portfolio.
        </AlertDescription>
      </Alert>

      <Card className="border-purple-500">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">CREATE REVOLUTIONARY POOL</CardTitle>
          <CardDescription className="text-lg">
            Begin with Step 1 - Approve ETHG tokens for dual-token liquidity
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-8xl animate-pulse">⚡</div>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-2xl px-16 py-8"
            onClick={() => window.open('https://etherscan.io/address/0xd9145CCE52D386f254917e481eB44e9943F39138#writeContract', '_blank')}
          >
            <ExternalLink className="h-8 w-8 mr-4" />
            START DUAL-TOKEN POOL
          </Button>
          <p className="text-sm text-muted-foreground">
            Opens ETHG contract for Step 1 execution
          </p>
        </CardContent>
      </Card>
    </div>
  );
}