
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  ExternalLink,
  ArrowRightLeft,
  Shield,
  Target,
  Zap
} from "lucide-react";

export default function MetaMaskSwap() {
  const [swapStep, setSwapStep] = useState(1);
  const [selectedDex, setSelectedDex] = useState("uniswap");

  const swapDetails = {
    fromToken: "USDC",
    toToken: "ETH",
    fromAmount: "89,814",
    expectedETH: "~37 ETH",
    slippage: "0.5%",
    gasEstimate: "$15-30"
  };

  const dexOptions = [
    {
      id: "uniswap",
      name: "Uniswap V3",
      url: "https://app.uniswap.org/#/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=ETH",
      pros: ["Most liquidity", "Best rates for large amounts", "Trusted protocol"],
      recommended: true
    },
    {
      id: "1inch",
      name: "1inch",
      url: "https://app.1inch.io/#/1/swap/USDC/ETH",
      pros: ["Route optimization", "MEV protection", "Often best rates"],
      recommended: true
    },
    {
      id: "paraswap",
      name: "ParaSwap",
      url: "https://paraswap.io/#/swap/USDC/ETH",
      pros: ["Multi-DEX routing", "Low slippage", "Gas optimization"],
      recommended: false
    }
  ];

  const swapSteps = [
    {
      step: 1,
      title: "Prepare MetaMask",
      description: "Connect your wallet and verify USDC balance",
      actions: [
        "Open MetaMask and connect to Ethereum Mainnet",
        "Verify you can see your USDC balance (~$89,814)",
        "Ensure you have enough ETH for gas fees (~$30-50)"
      ]
    },
    {
      step: 2,
      title: "Choose DEX Platform",
      description: "Select the best platform for your large swap",
      actions: [
        "Recommended: Uniswap V3 for large amounts",
        "Alternative: 1inch for route optimization",
        "Check rates on multiple platforms"
      ]
    },
    {
      step: 3,
      title: "Execute Swap",
      description: "Convert your USDC back to ETH",
      actions: [
        "Enter swap amount: 89,814 USDC → ETH",
        "Set slippage tolerance: 0.5-1%",
        "Review transaction and confirm"
      ]
    },
    {
      step: 4,
      title: "Security Cleanup",
      description: "Revoke dangerous approvals",
      actions: [
        "Visit revoke.cash after successful swap",
        "Revoke unlimited USDC approval to Permit2",
        "Check for other dangerous approvals"
      ]
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <ArrowRightLeft className="inline-block mr-3 h-8 w-8 text-green-500" />
          USDC → ETH Swap Recovery
        </h1>
        <p className="text-xl text-muted-foreground">
          Convert your recovered USDC back to ETH (37 ETH = ~$89,814 USDC)
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>RECOVERY STATUS:</strong> Your 37 ETH has been located as USDC! This guide will help you convert it back to ETH safely.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">DEX Platforms</TabsTrigger>
          <TabsTrigger value="step-by-step">Step by Step</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Swap Overview</CardTitle>
              <CardDescription>Your 37 ETH recovery transaction details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 text-red-600">From (Current)</h4>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">89,814 USDC</div>
                    <div className="text-sm text-muted-foreground">USD Coin (from ETH conversion)</div>
                    <Badge variant="outline">ERC-20 Token</Badge>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 text-green-600">To (Target)</h4>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">~37 ETH</div>
                    <div className="text-sm text-muted-foreground">Ethereum (your original asset)</div>
                    <Badge variant="outline">Native ETH</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-semibold mb-2">Transaction Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Amount:</strong> {swapDetails.fromAmount} USDC</div>
                  <div><strong>Expected:</strong> {swapDetails.expectedETH}</div>
                  <div><strong>Slippage:</strong> {swapDetails.slippage}</div>
                  <div><strong>Gas Fee:</strong> {swapDetails.gasEstimate}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1" onClick={() => window.open(dexOptions[0].url, '_blank')}>
                  <Zap className="h-4 w-4 mr-2" />
                  Start Swap on Uniswap
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => window.open(dexOptions[1].url, '_blank')}>
                  <Target className="h-4 w-4 mr-2" />
                  Compare on 1inch
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          {dexOptions.map((dex) => (
            <Card key={dex.id} className={dex.recommended ? "border-green-500" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    {dex.name}
                  </div>
                  {dex.recommended && <Badge variant="default">RECOMMENDED</Badge>}
                </CardTitle>
                <CardDescription>
                  {dex.recommended ? "Best choice for large USDC→ETH swaps" : "Alternative platform"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Advantages</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {dex.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => window.open(dex.url, '_blank')}
                    className={dex.recommended ? "" : "variant-outline"}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open {dex.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="step-by-step" className="space-y-4">
          {swapSteps.map((stepData) => (
            <Card key={stepData.step} className={swapStep === stepData.step ? "border-blue-500" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    swapStep > stepData.step ? 'bg-green-500' : swapStep === stepData.step ? 'bg-blue-500' : 'bg-gray-400'
                  }`}>
                    {swapStep > stepData.step ? <CheckCircle className="h-4 w-4" /> : stepData.step}
                  </div>
                  {stepData.title}
                </CardTitle>
                <CardDescription>{stepData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {stepData.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{action}</span>
                    </li>
                  ))}
                </ul>
                
                {stepData.step === 2 && (
                  <Button onClick={() => window.open(dexOptions[0].url, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Recommended Platform
                  </Button>
                )}
                
                {stepData.step < 4 && (
                  <Button onClick={() => setSwapStep(stepData.step + 1)}>
                    Mark as Complete
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-500" />
                Security & Cleanup
              </CardTitle>
              <CardDescription>
                Important security steps after successful swap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>CRITICAL:</strong> After your swap, you must revoke the unlimited USDC approval to prevent future unauthorized access.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">1. Revoke USDC Approval</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Remove the unlimited approval to Permit2 contract that enabled the original vulnerability.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="https://revoke.cash" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Revoke.cash
                    </a>
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">2. Security Audit</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Check for other dangerous approvals that could compromise your recovered ETH.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Check all ERC-20 token approvals</li>
                    <li>• Look for unlimited approvals to unknown contracts</li>
                    <li>• Revoke any suspicious permissions</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">3. Wallet Security</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Secure your wallet after successful recovery.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Consider moving ETH to a fresh wallet</li>
                    <li>• Update MetaMask and browser security</li>
                    <li>• Document the recovery process</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="text-green-600">🎉 Recovery Success Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="font-semibold">Found USDC</div>
              <div className="text-xs">$89,814 Located</div>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ArrowRightLeft className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">Swap to ETH</div>
              <div className="text-xs">Current Step</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <div className="font-semibold">Security Cleanup</div>
              <div className="text-xs">Next Step</div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <div className="font-semibold">37 ETH Recovered</div>
              <div className="text-xs">Final Goal</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
