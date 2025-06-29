import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink,
  Code,
  Zap,
  CheckCircle,
  AlertTriangle,
  Target
} from "lucide-react";

export default function DirectContractExecution() {
  const [ethAmount, setEthAmount] = useState("0.003");
  const [ethgrAmount, setEthgrAmount] = useState("9000");

  // Contract addresses and ABIs
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const UNISWAP_V2_FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
  const UNISWAP_V2_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const WETH_CONTRACT = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const strategies = [
    {
      name: "Direct Pool Creation",
      description: "Call Uniswap Factory directly to create ETHGR/WETH pair",
      method: "createPair()",
      gasEstimate: "~200,000 gas",
      success: "High",
      timeframe: "Immediate"
    },
    {
      name: "Manual Liquidity Addition",
      description: "Add liquidity directly via Router contract",
      method: "addLiquidityETH()",
      gasEstimate: "~150,000 gas",
      success: "High",
      timeframe: "Immediate"
    },
    {
      name: "Direct Transfer Method",
      description: "Transfer tokens directly to pair contract",
      method: "transfer() + sync()",
      gasEstimate: "~100,000 gas",
      success: "Medium",
      timeframe: "Manual"
    }
  ];

  const contractCalls = [
    {
      contract: "ETHGR Token",
      address: ETHGR_CONTRACT,
      function: "approve",
      params: `("${UNISWAP_V2_ROUTER}", "${ethgrAmount}000000000000000000")`,
      description: "Approve router to spend ETHGR tokens"
    },
    {
      contract: "Uniswap Factory",
      address: UNISWAP_V2_FACTORY,
      function: "createPair",
      params: `("${ETHGR_CONTRACT}", "${WETH_CONTRACT}")`,
      description: "Create ETHGR/WETH trading pair"
    },
    {
      contract: "Uniswap Router",
      address: UNISWAP_V2_ROUTER,
      function: "addLiquidityETH",
      params: `("${ETHGR_CONTRACT}", "${ethgrAmount}000000000000000000", "0", "0", "YOUR_ADDRESS", "DEADLINE")`,
      description: "Add initial liquidity to the pool",
      value: ethAmount + " ETH"
    }
  ];

  const directLinks = [
    {
      name: "Etherscan Contract Writer",
      url: `https://etherscan.io/address/${ETHGR_CONTRACT}#writeContract`,
      description: "Direct contract interaction interface"
    },
    {
      name: "Uniswap Factory Writer",
      url: `https://etherscan.io/address/${UNISWAP_V2_FACTORY}#writeContract`,
      description: "Create pair directly on-chain"
    },
    {
      name: "Uniswap Router Writer",
      url: `https://etherscan.io/address/${UNISWAP_V2_ROUTER}#writeContract`,
      description: "Add liquidity with direct contract calls"
    },
    {
      name: "RemixIDE with Injected Web3",
      url: "https://remix.ethereum.org/",
      description: "Full IDE for contract interaction"
    }
  ];

  const manualSteps = [
    "1. Connect wallet to Etherscan contract interface",
    "2. Call approve() on ETHGR contract for router address",
    "3. Call createPair() on Uniswap Factory",
    "4. Call addLiquidityETH() on Uniswap Router with ETH value",
    "5. Confirm transactions and verify pool creation"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h1 className="text-4xl font-bold">DIRECT CONTRACT EXECUTION</h1>
        <p className="text-xl text-muted-foreground">
          Bypass UI limitations with direct blockchain interaction
        </p>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>UI Bypass Strategy:</strong> Since Uniswap interface shows "not enough ETH" 
          despite sufficient balance, we'll interact directly with smart contracts to create the pool.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="strategies" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="contracts">Contract Calls</TabsTrigger>
          <TabsTrigger value="interfaces">Direct Interfaces</TabsTrigger>
          <TabsTrigger value="execution">Execute</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Execution Strategies</CardTitle>
              <CardDescription>Multiple approaches to create ETHGR/ETH pool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategies.map((strategy, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-bold">{strategy.name}</h3>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Method:</span>
                          <code className="bg-muted px-1 rounded">{strategy.method}</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Gas:</span>
                          <span>{strategy.gasEstimate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Success:</span>
                          <Badge variant={strategy.success === "High" ? "default" : "secondary"}>
                            {strategy.success}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Contract Interactions</CardTitle>
              <CardDescription>Exact function calls needed for pool creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractCalls.map((call, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{call.contract}</h3>
                      <Badge variant="outline">{call.function}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{call.description}</p>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      <div>Contract: {call.address}</div>
                      <div>Function: {call.function}{call.params}</div>
                      {call.value && <div className="text-green-600">Value: {call.value}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interfaces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Direct Contract Interfaces</CardTitle>
              <CardDescription>Access blockchain directly through these interfaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {directLinks.map((link, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-bold">{link.name}</h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                      <Button
                        className="w-full"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Interface
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="execution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Execute Pool Creation
              </CardTitle>
              <CardDescription>Configure and execute direct contract calls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eth-amount">ETH Amount</Label>
                  <Input
                    id="eth-amount"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    placeholder="0.003"
                  />
                </div>
                <div>
                  <Label htmlFor="ethgr-amount">ETHGR Amount</Label>
                  <Input
                    id="ethgr-amount"
                    value={ethgrAmount}
                    onChange={(e) => setEthgrAmount(e.target.value)}
                    placeholder="9000"
                  />
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Recommended:</strong> Start with Etherscan contract interface as it provides 
                  the most direct and reliable method for contract interaction.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h3 className="font-bold">Manual Execution Steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {manualSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open(`https://etherscan.io/address/${ETHGR_CONTRACT}#writeContract`, '_blank')}
                >
                  <Code className="h-5 w-5 mr-2" />
                  Start with ETHGR Contract
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('https://remix.ethereum.org/', '_blank')}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Use Remix IDE
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert className="border-green-500 bg-green-50">
        <Target className="h-4 w-4" />
        <AlertDescription>
          <strong>Direct Strategy Advantage:</strong> Contract interfaces bypass UI limitations and 
          provide precise control over gas settings, transaction parameters, and execution timing.
        </AlertDescription>
      </Alert>
    </div>
  );
}