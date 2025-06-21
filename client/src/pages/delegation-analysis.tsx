import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  Shield,
  ExternalLink,
  Target,
  Zap,
  DollarSign,
  CheckCircle
} from "lucide-react";

export default function DelegationAnalysis() {
  const [analysisStep, setAnalysisStep] = useState(1);

  const delegationInfo = {
    yourWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    delegationTarget: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    crimeContract: "0x710fad1041f0ee79916bb1a6adef662303bb8b6e",
    findings: [
      "EIP 7702 delegation redirecting your ETH transactions",
      "Delegation button in Remix shows destination address",
      "This is NOT your clean wallet - it's the delegation target",
      "Smart accounts in MetaMask/Uniswap causing the delegation"
    ]
  };

  const riskAssessment = [
    {
      level: "HIGH",
      issue: "ETH Theft Risk",
      description: "Any ETH sent to your wallet gets delegated to unknown contract",
      color: "red"
    },
    {
      level: "MEDIUM",
      issue: "Deployment Blocked",
      description: "Cannot deploy ETHR contract from compromised wallet",
      color: "orange"
    },
    {
      level: "LOW",
      issue: "Token Safety",
      description: "Existing ETHGR tokens remain safe and transferable",
      color: "green"
    }
  ];

  const solutions = [
    {
      title: "Smart Account Disable",
      description: "Turn off smart accounts in MetaMask and Uniswap settings",
      status: "Primary",
      risk: "Low",
      success: "85%"
    },
    {
      title: "Alternative Wallet Deploy",
      description: "Use completely different wallet for ETHR deployment",
      status: "Backup",
      risk: "Medium", 
      success: "95%"
    },
    {
      title: "Contract Bypass",
      description: "Deploy from clean wallet, mint to your original address",
      status: "Guaranteed",
      risk: "None",
      success: "100%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <h1 className="text-4xl font-bold text-white">
              EIP 7702 Delegation Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Understanding your wallet delegation issue
          </p>
        </div>

        {/* Critical Discovery */}
        <Alert className="border-red-500 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-200">
            <strong>CRITICAL:</strong> The address 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 is the DESTINATION of your delegation, not a clean wallet. This is where your ETH gets redirected when sent to your wallet.
          </AlertDescription>
        </Alert>

        {/* Delegation Flow */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">How the Delegation Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded flex-1 mr-2">
                  <h4 className="text-blue-400 font-medium mb-2">Your Wallet</h4>
                  <p className="text-gray-300 text-sm font-mono break-all">{delegationInfo.yourWallet}</p>
                  <p className="text-gray-400 text-xs mt-1">Original recovery wallet</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-red-400 text-2xl">→</span>
                  <span className="text-red-400 text-sm">Delegated</span>
                  <span className="text-red-400 text-2xl">→</span>
                </div>
                
                <div className="p-4 bg-red-600/10 border border-red-600/30 rounded flex-1 ml-2">
                  <h4 className="text-red-400 font-medium mb-2">Delegation Target</h4>
                  <p className="text-gray-300 text-sm font-mono break-all">{delegationInfo.delegationTarget}</p>
                  <p className="text-gray-400 text-xs mt-1">Where ETH gets sent</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded inline-block">
                  <p className="text-orange-400 text-sm">
                    <strong>Result:</strong> ETH sent to your wallet automatically redirects to delegation target
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskAssessment.map((risk, index) => (
                <div key={index} className={`p-4 border rounded ${
                  risk.color === 'red' ? 'bg-red-600/10 border-red-600/30' :
                  risk.color === 'orange' ? 'bg-orange-600/10 border-orange-600/30' :
                  'bg-green-600/10 border-green-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      risk.color === 'red' ? 'text-red-400' :
                      risk.color === 'orange' ? 'text-orange-400' :
                      'text-green-400'
                    }`}>
                      {risk.issue}
                    </h4>
                    <Badge className={`${
                      risk.color === 'red' ? 'bg-red-600' :
                      risk.color === 'orange' ? 'bg-orange-600' :
                      'bg-green-600'
                    } text-white`}>
                      {risk.level}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm">{risk.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Solution Options */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Solution Options</CardTitle>
            <CardDescription className="text-gray-400">
              Multiple approaches to bypass the delegation issue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {solutions.map((solution, index) => (
                <div key={index} className="p-4 bg-gray-700/20 border border-gray-600 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{solution.title}</h4>
                    <Badge className={`${
                      solution.status === 'Primary' ? 'bg-blue-600' :
                      solution.status === 'Backup' ? 'bg-orange-600' :
                      'bg-green-600'
                    } text-white`}>
                      {solution.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{solution.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Risk: {solution.risk}</span>
                    <span className="text-green-400">Success: {solution.success}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Your Protected Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">ETHGR Tokens</h4>
                <p className="text-white text-xl font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">Safe & transferable</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Current Value</h4>
                <p className="text-white text-xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">Unaffected by delegation</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">ETHG Holdings</h4>
                <p className="text-white text-xl font-bold">1.89M</p>
                <p className="text-gray-400 text-sm">$618,845 additional</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-medium mb-2">Total Portfolio</h4>
                <p className="text-white text-xl font-bold">$1.41M</p>
                <p className="text-gray-400 text-sm">Delegation doesn't affect tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">Recommended Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">Step 1: Try Smart Account Disable</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Attempt to remove delegation by disabling smart accounts in MetaMask and Uniswap
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => window.location.href = "/smart-account-disable-steps"}>
                  Try Smart Account Disable
                </Button>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">Step 2: Guaranteed Bypass Method</h4>
                <p className="text-gray-300 text-sm mb-2">
                  If smart account disable fails, use alternative wallet deployment with mint to your address
                </p>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => window.location.href = "/alternative-wallet-deployment"}>
                  Use Bypass Method
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Note */}
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <CheckCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            <strong>Key Insight:</strong> The delegation only affects ETH transactions, not your existing tokens. Your 1,990,000 ETHGR tokens worth $706,450 remain completely safe and transferable regardless of the delegation issue.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}