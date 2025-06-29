import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ExternalLink,
  CheckCircle,
  Copy,
  Target,
  AlertCircle
} from "lucide-react";

export default function Step1Execution() {
  const [copied, setCopied] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState("0x058C...8843");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const step1Details = {
    contract: "ETHGR Token Contract",
    address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    function: "approve",
    parameters: {
      spender: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      amount: "9000000000000000000000"
    },
    description: "Approve Uniswap Router to spend 9,000 ETHGR tokens",
    gasEstimate: "~60,000 gas (~$0.60 at current rates)"
  };

  const executeSteps = [
    "Click 'Open ETHGR Contract' below",
    "Connect your MetaMask wallet on Etherscan",
    "Scroll to function #1: 'approve'",
    "Enter the spender address: 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "Enter the amount: 9000000000000000000000",
    "Click 'Write' and confirm in MetaMask",
    "Wait for transaction confirmation"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">1️⃣</div>
        <h1 className="text-4xl font-bold">STEP 1: APPROVE ETHGR TOKENS</h1>
        <p className="text-xl text-muted-foreground">
          Allow Uniswap Router to spend your ETHGR tokens
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Ready to Execute:</strong> Your wallet has 0.006 ETH ($15.90) - 
          sufficient for this transaction and all subsequent pool creation steps.
        </AlertDescription>
      </Alert>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-bold">Contract</Label>
              <div className="text-sm">{step1Details.contract}</div>
            </div>
            <div>
              <Label className="text-sm font-bold">Function</Label>
              <Badge variant="outline">{step1Details.function}</Badge>
            </div>
            <div>
              <Label className="text-sm font-bold">Gas Estimate</Label>
              <div className="text-sm">{step1Details.gasEstimate}</div>
            </div>
            <div>
              <Label className="text-sm font-bold">Purpose</Label>
              <div className="text-sm">{step1Details.description}</div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold">Contract Address</Label>
            <div className="flex items-center gap-2">
              <Input 
                value={step1Details.address} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(step1Details.address, 'address')}
              >
                <Copy className="h-4 w-4" />
                {copied === 'address' ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Function Parameters</CardTitle>
          <CardDescription>
            Exact values to enter in the approve function
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-bold">spender (address)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={step1Details.parameters.spender} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(step1Details.parameters.spender, 'spender')}
                >
                  <Copy className="h-4 w-4" />
                  {copied === 'spender' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Uniswap V2 Router address
              </div>
            </div>

            <div>
              <Label className="text-sm font-bold">amount (uint256)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  value={step1Details.parameters.amount} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(step1Details.parameters.amount, 'amount')}
                >
                  <Copy className="h-4 w-4" />
                  {copied === 'amount' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                9,000 ETHGR tokens (with 18 decimals)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Execution Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {executeSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  {index + 1}
                </Badge>
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> After this transaction confirms, you'll proceed to Step 2 
          (Create Pair) and Step 3 (Add Liquidity). Keep this interface open for the next steps.
        </AlertDescription>
      </Alert>

      <Card className="border-green-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">EXECUTE STEP 1</CardTitle>
          <CardDescription>
            Click below to open ETHGR contract and execute the approve function
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl">🚀</div>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-xl px-12 py-6"
            onClick={() => window.open('https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247#writeContract', '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-3" />
            OPEN ETHGR CONTRACT
          </Button>
          <p className="text-sm text-muted-foreground">
            This opens the Write Contract interface in a new tab
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => window.open('https://etherscan.io/gastracker', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Check Gas Prices
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open('/manual-contract-calls', '_self')}
        >
          View All Steps
        </Button>
      </div>
    </div>
  );
}