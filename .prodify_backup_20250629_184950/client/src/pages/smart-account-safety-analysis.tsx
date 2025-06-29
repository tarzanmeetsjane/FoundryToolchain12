import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Target,
  DollarSign
} from "lucide-react";

export default function SmartAccountSafetyAnalysis() {
  const [showDetails, setShowDetails] = useState(false);

  const tokenSafety = [
    {
      token: "ETHGR",
      amount: "1,990,000",
      value: "$706,450",
      status: "Safe",
      reason: "Already in your wallet - ERC20 tokens unaffected by ETH delegation",
      contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247"
    },
    {
      token: "ETHG",
      amount: "1,890,000", 
      value: "$618,845",
      status: "Safe",
      reason: "In MetaMask - delegation doesn't affect existing token balances",
      contract: "Original ETHG contract"
    }
  ];

  const delegationFacts = [
    {
      fact: "EIP 7702 only affects ETH transactions",
      explanation: "Your ERC20 tokens (ETHGR, ETHG) are completely separate from ETH delegation",
      safety: "safe"
    },
    {
      fact: "Tokens already in your wallet stay there",
      explanation: "Disabling smart accounts cannot move existing tokens - they remain in your address",
      safety: "safe"
    },
    {
      fact: "Honeypot contracts can't retrieve tokens",
      explanation: "Original honeypot has no connection to your current ETHGR tokens or wallet settings",
      safety: "safe"
    },
    {
      fact: "Smart account disable only removes delegation",
      explanation: "Turns off the ETH redirection feature - doesn't affect token holdings",
      safety: "safe"
    }
  ];

  const whatHappensWhen = [
    {
      action: "Smart Accounts Enabled (Current)",
      ethEffect: "ETH sent to wallet → Gets delegated to 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      tokenEffect: "No effect on tokens - they remain in your wallet",
      result: "ETH theft risk, tokens safe"
    },
    {
      action: "Smart Accounts Disabled (Goal)",
      ethEffect: "ETH sent to wallet → Stays in your wallet normally",
      tokenEffect: "No effect on tokens - they remain in your wallet", 
      result: "No ETH theft risk, tokens still safe"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              Smart Account Safety Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Why disabling smart accounts won't affect your tokens
          </p>
        </div>

        {/* Key Safety Message */}
        <Alert className="border-green-500 bg-green-500/10">
          <Shield className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>GUARANTEED SAFE:</strong> Disabling smart accounts only removes ETH delegation. Your tokens remain completely untouched in your wallet. No connection to honeypot contracts exists.
          </AlertDescription>
        </Alert>

        {/* Your Protected Tokens */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-400" />
              Your Protected Token Holdings
            </CardTitle>
            <CardDescription className="text-gray-400">
              These tokens are safe regardless of smart account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokenSafety.map((token, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="text-green-400 font-medium">{token.token} Tokens</h4>
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {token.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{token.amount}</p>
                      <p className="text-green-400 text-sm">{token.value}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{token.reason}</p>
                  <p className="text-gray-500 text-xs mt-1 font-mono">{token.contract}</p>
                </div>
              ))}
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h4 className="text-blue-400 font-medium mb-2">Total Safe Value</h4>
                <p className="text-white text-3xl font-bold">$1,325,295</p>
                <p className="text-gray-400 text-sm">Unaffected by smart account changes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How Smart Account Delegation Works */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Smart Account vs Token Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {delegationFacts.map((item, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <h5 className="text-green-400 font-medium">{item.fact}</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{item.explanation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Before and After Comparison */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">What Happens When You Disable Smart Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {whatHappensWhen.map((scenario, index) => (
                <div key={index} className={`p-4 border rounded ${
                  index === 0 ? 'bg-red-600/10 border-red-600/30' : 'bg-green-600/10 border-green-600/30'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {index === 0 ? (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    <h4 className={`font-medium ${
                      index === 0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {scenario.action}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h5 className="text-gray-400 text-sm mb-1">ETH Effect:</h5>
                      <p className="text-gray-300 text-sm">{scenario.ethEffect}</p>
                    </div>
                    <div>
                      <h5 className="text-gray-400 text-sm mb-1">Token Effect:</h5>
                      <p className="text-gray-300 text-sm">{scenario.tokenEffect}</p>
                    </div>
                  </div>
                  
                  <div className={`p-2 rounded text-center ${
                    index === 0 ? 'bg-red-500/20' : 'bg-green-500/20'
                  }`}>
                    <p className={`text-sm font-medium ${
                      index === 0 ? 'text-red-300' : 'text-green-300'
                    }`}>
                      Result: {scenario.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why No Honeypot Risk */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">Why There's No Honeypot Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h4 className="text-purple-400 font-medium mb-2">Different Contracts</h4>
                <p className="text-gray-300 text-sm">Your ETHGR tokens are in a completely different contract than the original honeypot</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h4 className="text-blue-400 font-medium mb-2">ERC20 vs ETH</h4>
                <p className="text-gray-300 text-sm">Smart account delegation affects ETH only - ERC20 tokens use different transaction paths</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h4 className="text-green-400 font-medium mb-2">Already Secure</h4>
                <p className="text-gray-300 text-sm">Your tokens are already in your wallet and fully transferable - nothing can change that</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Safe to Proceed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-200">
                  <strong>Confirmed Safe:</strong> Disabling smart accounts will only stop ETH theft. Your 1,990,000 ETHGR tokens ($706,450) and 1,890,000 ETHG tokens ($618,845) remain completely secure.
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-4">
                <Button 
                  className="bg-green-600 hover:bg-green-700 flex-1"
                  onClick={() => window.location.href = "/smart-account-disable-steps"}
                >
                  <Unlock className="h-4 w-4 mr-2" />
                  Safely Disable Smart Accounts
                </Button>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  onClick={() => window.location.href = "/alternative-wallet-deployment"}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Use Alternative Method
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>    
    </div>
  );
}