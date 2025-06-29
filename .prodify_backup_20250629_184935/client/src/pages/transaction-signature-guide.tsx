import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Eye,
  Shield,
  Zap,
  Wallet,
  ArrowRight
} from "lucide-react";

export default function TransactionSignatureGuide() {
  const signatureIssues = [
    {
      problem: "MetaMask not showing signature prompts",
      cause: "Extension conflicts or connection bugs",
      solution: "Clear cache, restart browser, check extension"
    },
    {
      problem: "Transactions stuck in pending",
      cause: "Low gas fees or network congestion", 
      solution: "Increase gas fees or use speed up option"
    },
    {
      problem: "Wallet connection timeout",
      cause: "Poor network or wallet sync issues",
      solution: "Switch networks, reconnect wallet"
    },
    {
      problem: "No signature popup appearing",
      cause: "Popup blockers or browser settings",
      solution: "Disable popup blockers, allow notifications"
    }
  ];

  const signatureSteps = [
    {
      step: 1,
      title: "Initiate Trade",
      description: "Click swap/trade on DEX platform",
      action: "Platform sends transaction request"
    },
    {
      step: 2,
      title: "Wallet Signature Request",
      description: "MetaMask popup should appear",
      action: "YOU MUST APPROVE/SIGN the transaction"
    },
    {
      step: 3,
      title: "Transaction Broadcast",
      description: "Signed transaction sent to blockchain",
      action: "Wait for network confirmation"
    },
    {
      step: 4,
      title: "Confirmation",
      description: "Trade completes and tokens update",
      action: "Check wallet for new balances"
    }
  ];

  const walletFixes = [
    {
      wallet: "MetaMask",
      fixes: [
        "Click MetaMask extension icon",
        "Check for pending transactions",
        "Clear transaction queue if stuck",
        "Reset account if necessary",
        "Enable popup notifications"
      ]
    },
    {
      wallet: "Browser Settings",
      fixes: [
        "Disable popup blockers for DEX sites",
        "Allow notifications from wallet sites",
        "Clear browser cache and cookies",
        "Disable ad blockers temporarily",
        "Try incognito/private mode"
      ]
    }
  ];

  const testSignature = () => {
    window.open('https://app.uniswap.org/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Transaction Signature Guide
          </h1>
          <p className="text-2xl text-orange-300">
            The Missing Signature Approval Step
          </p>
        </div>

        {/* Key Discovery */}
        <Alert className="border-orange-500 bg-orange-500/20 border-4">
          <AlertTriangle className="h-12 w-12 text-orange-500" />
          <AlertDescription className="text-orange-200 text-2xl">
            <strong>BREAKTHROUGH!</strong> You're absolutely right - every trade needs your wallet signature approval. If MetaMask isn't showing signature prompts, that's why trades aren't executing!
          </AlertDescription>
        </Alert>

        {/* Signature Process */}
        <Card className="bg-gray-800/50 border-yellow-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">How Transaction Signatures Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {signatureSteps.map((step, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="text-yellow-400 font-bold mb-2">{step.title}</h3>
                  <p className="text-white text-sm mb-2">{step.description}</p>
                  <p className="text-gray-400 text-xs">{step.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Common Signature Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {signatureIssues.map((issue, index) => (
                <div key={index} className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-red-400 font-bold mb-1">Problem</h3>
                      <p className="text-white text-sm">{issue.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-yellow-400 font-bold mb-1">Cause</h3>
                      <p className="text-white text-sm">{issue.cause}</p>
                    </div>
                    <div>
                      <h3 className="text-green-400 font-bold mb-1">Solution</h3>
                      <p className="text-white text-sm">{issue.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Fixes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {walletFixes.map((fix, index) => (
            <Card key={index} className="bg-gray-800/50 border-blue-500">
              <CardHeader>
                <CardTitle className="text-white text-xl">{fix.wallet} Fixes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fix.fixes.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{i + 1}</span>
                      </div>
                      <span className="text-white text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Signature Test */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Test Signature Functionality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="border-green-500 bg-green-500/20">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <AlertDescription className="text-green-200">
                  <strong>Test Plan:</strong> Try a small trade to see if MetaMask signature popup appears. If no popup, we know the issue.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold mb-3">What Should Happen</h3>
                  <ul className="text-white space-y-1 text-sm">
                    <li>• MetaMask popup appears</li>
                    <li>• Shows transaction details</li>
                    <li>• Gas fee estimate</li>
                    <li>• Confirm/Reject buttons</li>
                    <li>• You click "Confirm"</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h3 className="text-yellow-400 font-bold mb-3">If No Popup</h3>
                  <ul className="text-white space-y-1 text-sm">
                    <li>• Check browser extensions</li>
                    <li>• Look for notification icon</li>
                    <li>• Try different browser</li>
                    <li>• Reset MetaMask</li>
                    <li>• Use alternative wallet</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h3 className="text-blue-400 font-bold mb-3">Alternative Solutions</h3>
                  <ul className="text-white space-y-1 text-sm">
                    <li>• Try Rainbow Wallet</li>
                    <li>• Use Trust Wallet</li>
                    <li>• WalletConnect option</li>
                    <li>• Mobile wallet apps</li>
                    <li>• Hardware wallet</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={testSignature}
                  className="bg-green-600 hover:bg-green-700 py-8 px-12 text-xl"
                >
                  <Zap className="h-8 w-8 mr-3" />
                  Test Signature on Uniswap Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Portfolio for Testing */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Portfolio - Ready for Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h3 className="text-purple-400 font-bold">ETH</h3>
                <p className="text-white text-lg">0.014 ETH</p>
                <p className="text-green-400">$32.09</p>
                <Badge className="bg-green-600 text-white">Ready</Badge>
              </div>

              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h3 className="text-purple-400 font-bold">AICC</h3>
                <p className="text-white text-lg">17,500</p>
                <p className="text-yellow-400">~$1,522</p>
                <Badge className="bg-yellow-600 text-white">Test Target</Badge>
              </div>

              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h3 className="text-purple-400 font-bold">ETHG</h3>
                <p className="text-white text-lg">2.1M</p>
                <p className="text-green-400">~$684K</p>
                <Badge className="bg-blue-600 text-white">High Value</Badge>
              </div>

              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h3 className="text-purple-400 font-bold">ETHGR</h3>
                <p className="text-white text-lg">1.99M</p>
                <p className="text-gray-400">Protected</p>
                <Badge className="bg-gray-600 text-white">Recovery</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <Shield className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-xl">
            <strong>Action Plan:</strong> Try a test trade with your ETH or small amount of AICC. Watch for MetaMask signature popup. If no popup appears, we'll switch to a different wallet solution immediately.
          </AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <Zap className="h-6 w-6 mr-2" />
            Test Uniswap
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.1inch.io/', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <ArrowRight className="h-6 w-6 mr-2" />
            Try 1inch
          </Button>
          
          <Button 
            onClick={() => window.open('/wallet-setup-wizard')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Wallet Setup
          </Button>
          
          <Button 
            onClick={() => window.open('https://rainbow.me/', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Rainbow Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}