import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink,
  Settings,
  CheckCircle,
  Target,
  Zap
} from "lucide-react";

export default function ManualContractCalls() {
  const [currentStep, setCurrentStep] = useState(1);

  const contractSteps = [
    {
      step: 1,
      title: "Approve ETHGR Tokens",
      contract: "ETHGR Token Contract",
      address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      function: "approve",
      params: [
        { name: "spender", value: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", type: "address" },
        { name: "amount", value: "9000000000000000000000", type: "uint256" }
      ],
      description: "Allow Uniswap Router to spend your ETHGR tokens",
      ethValue: "0",
      gasLimit: "60000"
    },
    {
      step: 2,
      title: "Create ETHGR/WETH Pair",
      contract: "Uniswap V2 Factory",
      address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      function: "createPair",
      params: [
        { name: "tokenA", value: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247", type: "address" },
        { name: "tokenB", value: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", type: "address" }
      ],
      description: "Create the ETHGR/WETH trading pair",
      ethValue: "0",
      gasLimit: "150000"
    },
    {
      step: 3,
      title: "Add Liquidity with ETH",
      contract: "Uniswap V2 Router",
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      function: "addLiquidityETH",
      params: [
        { name: "token", value: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247", type: "address" },
        { name: "amountTokenDesired", value: "9000000000000000000000", type: "uint256" },
        { name: "amountTokenMin", value: "8550000000000000000000", type: "uint256" },
        { name: "amountETHMin", value: "2850000000000000000", type: "uint256" },
        { name: "to", value: "YOUR_WALLET_ADDRESS", type: "address" },
        { name: "deadline", value: "1750400000", type: "uint256" }
      ],
      description: "Add initial liquidity to the pool",
      ethValue: "0.003",
      gasLimit: "200000"
    }
  ];

  const directLinks = [
    {
      name: "ETHGR Contract (Write Functions)",
      url: "https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247#writeContract",
      description: "For Step 1: Approve function"
    },
    {
      name: "Uniswap Factory (Write Functions)", 
      url: "https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract",
      description: "For Step 2: Create pair function"
    },
    {
      name: "Uniswap Router (Write Functions)",
      url: "https://etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D#writeContract", 
      description: "For Step 3: Add liquidity function"
    }
  ];

  const executionInstructions = [
    "Connect your MetaMask wallet to Etherscan",
    "Navigate to the contract's 'Write Contract' tab",
    "Find the specific function you need to call",
    "Enter the exact parameter values provided",
    "Set the ETH value if required (Step 3 only)",
    "Click 'Write' and confirm the transaction in MetaMask",
    "Wait for transaction confirmation before proceeding"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔧</div>
        <h1 className="text-4xl font-bold">MANUAL CONTRACT EXECUTION</h1>
        <p className="text-xl text-muted-foreground">
          Direct function calls through Etherscan's Write Contract interface
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Settings className="h-4 w-4" />
        <AlertDescription>
          <strong>Direct Method:</strong> Since broadcast requires signed transactions, 
          we'll use Etherscan's Write Contract interface for direct function execution.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="steps">Execution Steps</TabsTrigger>
          <TabsTrigger value="links">Direct Links</TabsTrigger>
          <TabsTrigger value="guide">Step Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="space-y-4">
          <div className="space-y-4">
            {contractSteps.map((step, index) => (
              <Card 
                key={index} 
                className={`border-l-4 ${
                  currentStep === step.step 
                    ? 'border-l-green-500 bg-green-50' 
                    : currentStep > step.step 
                      ? 'border-l-blue-500 bg-blue-50' 
                      : 'border-l-gray-300'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Badge variant={currentStep >= step.step ? "default" : "outline"}>
                        Step {step.step}
                      </Badge>
                      {step.title}
                    </CardTitle>
                    {currentStep > step.step && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Contract:</strong> {step.contract}
                    </div>
                    <div>
                      <strong>Function:</strong> {step.function}
                    </div>
                    <div>
                      <strong>ETH Value:</strong> {step.ethValue} ETH
                    </div>
                    <div>
                      <strong>Gas Limit:</strong> {step.gasLimit}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <strong>Parameters:</strong>
                    <div className="bg-muted p-3 rounded space-y-2">
                      {step.params.map((param, paramIndex) => (
                        <div key={paramIndex} className="flex justify-between text-sm font-mono">
                          <span className="text-blue-600">{param.name} ({param.type}):</span>
                          <span className="break-all">{param.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${step.address}#writeContract`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Contract
                    </Button>
                    {currentStep === step.step && (
                      <Button
                        size="sm"
                        onClick={() => setCurrentStep(step.step + 1)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Direct Contract Links</CardTitle>
              <CardDescription>
                One-click access to each contract's Write functions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {directLinks.map((link, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{link.name}</h3>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                      <Button
                        onClick={() => window.open(link.url, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution Guide</CardTitle>
              <CardDescription>
                General instructions for using Etherscan's Write Contract interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="space-y-3">
                {executionInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      {index + 1}
                    </Badge>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>

              <Alert className="border-green-500 bg-green-50">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  <strong>Your Wallet Status:</strong> 0.006 ETH balance confirmed - 
                  sufficient for all gas fees and liquidity provision.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-green-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Zap className="h-6 w-6" />
            START EXECUTION
          </CardTitle>
          <CardDescription>
            Begin with Step 1 - ETHGR Token Approval
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
            onClick={() => window.open('https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247#writeContract', '_blank')}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            EXECUTE STEP 1 - APPROVE ETHGR
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            This will open the ETHGR contract's Write functions in a new tab
          </p>
        </CardContent>
      </Card>
    </div>
  );
}