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
  ArrowRight,
  Wallet
} from "lucide-react";

export default function MetaMaskDirectExecution() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contractDetails = {
    ethgr: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  };

  const steps = [
    {
      title: "Open MetaMask Extension",
      description: "Click the MetaMask fox icon in your browser",
      action: "Access wallet interface",
      status: "ready"
    },
    {
      title: "Navigate to Activity Tab",
      description: "Click 'Activity' in the bottom navigation",
      action: "Find contract interaction option",
      status: "pending"
    },
    {
      title: "Select Contract Interaction",
      description: "Look for 'Contract Interaction' or 'Send' option",
      action: "Enable direct contract calls",
      status: "pending"
    },
    {
      title: "Enter Contract Address",
      description: "Input ETHGR contract address",
      action: "Connect to ETHGR token contract",
      status: "pending"
    },
    {
      title: "Execute Approve Function",
      description: "Call approve with Uniswap Router parameters",
      action: "Allow token spending",
      status: "pending"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🦊</div>
        <h1 className="text-4xl font-bold">METAMASK DIRECT EXECUTION</h1>
        <p className="text-xl text-muted-foreground">
          Use MetaMask's built-in contract interaction feature
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Direct Method:</strong> MetaMask allows direct contract interaction without 
          external interfaces. This bypasses all Etherscan limitations.
        </AlertDescription>
      </Alert>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Contract Information</CardTitle>
          <CardDescription>Copy these addresses for MetaMask interaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(contractDetails).map(([key, address]) => (
            <div key={key} className="space-y-2">
              <Label className="text-sm font-bold capitalize">{key} Contract</Label>
              <div className="flex gap-2">
                <Input 
                  value={address} 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(address, key)}
                >
                  <Copy className="h-3 w-3" />
                  {copiedField === key ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Execution</CardTitle>
          <CardDescription>Follow these exact steps in MetaMask</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded">
              <Badge variant={currentStep >= index + 1 ? "default" : "outline"}>
                {index + 1}
              </Badge>
              <div className="flex-1">
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                <p className="text-xs text-blue-600">{step.action}</p>
              </div>
              {currentStep === index + 1 && (
                <ArrowRight className="h-5 w-5 text-blue-600 animate-pulse" />
              )}
              {currentStep > index + 1 && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Function Parameters for MetaMask</CardTitle>
          <CardDescription>Use these exact values in the approve function</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="font-bold">Function Name</Label>
              <div className="flex gap-2">
                <Input value="approve" readOnly className="font-mono" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("approve", "function")}
                >
                  <Copy className="h-3 w-3" />
                  {copiedField === "function" ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold">spender (Uniswap Router)</Label>
              <div className="flex gap-2">
                <Input 
                  value="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", "spender")}
                >
                  <Copy className="h-3 w-3" />
                  {copiedField === "spender" ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold">amount (9,000 ETHGR tokens)</Label>
              <div className="flex gap-2">
                <Input 
                  value="9000000000000000000000" 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("9000000000000000000000", "amount")}
                >
                  <Copy className="h-3 w-3" />
                  {copiedField === "amount" ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">EXECUTE IN METAMASK</CardTitle>
          <CardDescription>
            Open MetaMask extension and follow the steps above
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl animate-bounce">🚀</div>
          <p className="text-lg">
            MetaMask contract interaction provides the most direct path to execute your approval
          </p>
          <div className="space-y-2">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setCurrentStep(2)}
            >
              <Wallet className="h-5 w-5 mr-2" />
              START METAMASK EXECUTION
            </Button>
            <p className="text-xs text-muted-foreground">
              This will guide you through the MetaMask interface
            </p>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          <strong>After Approval Success:</strong> You'll proceed to create the pair using Uniswap Factory contract, 
          then add liquidity using Uniswap Router contract with your 0.003 ETH.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(1)}
        >
          Reset Steps
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open('/alternative-solutions', '_self')}
        >
          View Other Methods
        </Button>
      </div>
    </div>
  );
}