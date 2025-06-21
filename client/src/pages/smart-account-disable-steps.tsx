import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Settings,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Shield,
  Wallet,
  DollarSign,
  Target
} from "lucide-react";

export default function SmartAccountDisableSteps() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<string | null>(null);

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const disableSteps = [
    {
      id: 1,
      platform: "MetaMask",
      title: "Disable MetaMask Smart Account",
      instructions: [
        "Click MetaMask extension in browser",
        "Click Settings (gear icon) in top right",
        "Go to 'Experimental' or 'Advanced' tab",
        "Look for 'Smart Account' or 'Account Abstraction'",
        "Toggle OFF smart account features",
        "Close and reopen MetaMask"
      ],
      directLink: "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#settings/experimental",
      fallback: "If no smart account option found, try Settings → Security & Privacy"
    },
    {
      id: 2,
      platform: "Uniswap",
      title: "Disable Uniswap Smart Account",
      instructions: [
        "Go to app.uniswap.org",
        "Connect your wallet (if not connected)",
        "Click profile icon or settings",
        "Look for 'Smart Account' or 'Account Features'",
        "Switch to 'Standard Wallet Mode'",
        "Disconnect and reconnect wallet"
      ],
      directLink: "https://app.uniswap.org",
      fallback: "Try disconnecting wallet entirely and reconnecting normally"
    },
    {
      id: 3,
      platform: "Test",
      title: "Test ETH Transaction",
      instructions: [
        "Send very small ETH amount (0.001 ETH) to your wallet",
        "From: Different wallet or exchange",
        "To: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
        "Monitor if ETH arrives or gets stolen",
        "If ETH arrives: Delegation removed ✓",
        "If ETH stolen: Try additional steps"
      ],
      directLink: null,
      fallback: "Use testnet first if worried about losing real ETH"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Settings className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Smart Account Removal Process
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Step-by-step guide to disable EIP 7702 delegation
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              {disableSteps.map((step) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    completedSteps.includes(step.id) 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`text-sm ${
                    completedSteps.includes(step.id) ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {step.platform}
                  </span>
                  {step.id < disableSteps.length && (
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Instructions */}
        <div className="space-y-6">
          {disableSteps.map((step) => (
            <Card key={step.id} className={`bg-gray-800/50 border-2 ${
              completedSteps.includes(step.id) 
                ? 'border-green-500' 
                : 'border-gray-700'
            }`}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={`${
                      completedSteps.includes(step.id) ? 'bg-green-600' : 'bg-blue-600'
                    } text-white`}>
                      Step {step.id}
                    </Badge>
                    {step.title}
                  </div>
                  {completedSteps.includes(step.id) && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {step.platform} configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {step.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge className="bg-gray-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <p className="text-gray-300 text-sm">{instruction}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {step.directLink && (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(step.directLink, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open {step.platform}
                    </Button>
                  )}
                  
                  <Button 
                    className={`${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => markStepComplete(step.id)}
                  >
                    {completedSteps.includes(step.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </>
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                </div>
                
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h5 className="text-yellow-400 text-sm font-medium mb-1">Alternative:</h5>
                  <p className="text-gray-300 text-xs">{step.fallback}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Results */}
        {completedSteps.includes(3) && (
          <Card className="bg-gray-800/50 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setTestResult("success")}
                  >
                    ETH Arrived Successfully
                  </Button>
                  <Button 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setTestResult("failed")}
                  >
                    ETH Was Still Stolen
                  </Button>
                </div>
                
                {testResult === "success" && (
                  <Alert className="border-green-500 bg-green-500/10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-200">
                      <strong>SUCCESS:</strong> EIP 7702 delegation removed! Your wallet is now secure for ETH transactions and ETHR deployment.
                    </AlertDescription>
                  </Alert>
                )}
                
                {testResult === "failed" && (
                  <Alert className="border-orange-500 bg-orange-500/10">
                    <AlertDescription className="text-orange-200">
                      <strong>Additional Steps Needed:</strong> Try clearing browser cache, restarting MetaMask, or use the bypass deployment method while delegation persists.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Protected Assets Reminder */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Your Protected Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">ETHGR Tokens</h4>
                <p className="text-white text-2xl font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">Safe throughout process</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Current Value</h4>
                <p className="text-white text-2xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">Unaffected by changes</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">Next Step</h4>
                <p className="text-white text-2xl font-bold">ETHR Deploy</p>
                <p className="text-gray-400 text-sm">After delegation removed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Path */}
        {completedSteps.length === 3 && testResult === "success" && (
          <Card className="bg-gray-800/50 border-green-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-green-400" />
                Ready for ETHR Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Excellent! With smart accounts disabled and delegation removed, you can now safely:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Deploy ETHR tokens on mainnet</li>
                  <li>• Receive ETH without theft</li>
                  <li>• Execute normal wallet transactions</li>
                  <li>• Proceed with monetization strategies</li>
                </ul>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  onClick={() => window.location.href = "/mainnet-deployment-final"}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Deploy ETHR Tokens Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}