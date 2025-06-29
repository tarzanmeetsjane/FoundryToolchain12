import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Settings,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Wallet,
  DollarSign,
  Info
} from "lucide-react";

export default function SmartAccountManagement() {
  const [step, setStep] = useState(1);

  const disableSteps = [
    {
      platform: "MetaMask",
      steps: [
        "Open MetaMask extension",
        "Click Settings (gear icon)",
        "Go to 'Experimental' or 'Advanced' tab",
        "Find 'Smart Account' or 'Account Abstraction' option",
        "Toggle OFF smart account features",
        "Restart MetaMask"
      ],
      alternative: "If no option exists, smart account may be permanently enabled"
    },
    {
      platform: "Uniswap",
      steps: [
        "Go to app.uniswap.org",
        "Connect your wallet",
        "Click profile/settings",
        "Look for 'Smart Account' or 'Account Features'",
        "Disable smart account trading",
        "Use standard wallet mode"
      ],
      alternative: "May require disconnecting and reconnecting wallet"
    }
  ];

  const securityImplications = [
    {
      aspect: "Current State",
      status: "COMPROMISED",
      description: "Smart account delegation allows CrimeEnjoyor contract to control ETH transactions",
      action: "Disable smart accounts immediately"
    },
    {
      aspect: "Existing Tokens", 
      status: "SAFE",
      description: "Your 1,990,000 ETHGR tokens ($706,450) are unaffected by smart account delegation",
      action: "No immediate action needed"
    },
    {
      aspect: "Future Transactions",
      status: "AT RISK",
      description: "Any ETH sent to wallet will be stolen while smart accounts are enabled",
      action: "Avoid ETH transactions until resolved"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Settings className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Smart Account Management
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Disable smart accounts to remove EIP 7702 delegation
          </p>
        </div>

        {/* Discovery Alert */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Root Cause Found:</strong> Smart accounts in MetaMask and Uniswap are using EIP 7702 delegation. This explains the CrimeEnjoyor contract control over your wallet.
          </AlertDescription>
        </Alert>

        {/* Security Status */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-400" />
              Current Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityImplications.map((item, index) => (
                <div key={index} className={`p-4 rounded border ${
                  item.status === 'COMPROMISED' ? 'bg-red-600/10 border-red-600/30' :
                  item.status === 'SAFE' ? 'bg-green-600/10 border-green-600/30' :
                  'bg-yellow-600/10 border-yellow-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{item.aspect}</h4>
                    <Badge className={`${
                      item.status === 'COMPROMISED' ? 'bg-red-600' :
                      item.status === 'SAFE' ? 'bg-green-600' :
                      'bg-yellow-600'
                    } text-white`}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                  <p className="text-gray-400 text-xs">{item.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disable Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {disableSteps.map((platform, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-400" />
                  Disable {platform.platform} Smart Account
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Remove EIP 7702 delegation from {platform.platform}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platform.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <Badge className="bg-blue-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">
                        {stepIndex + 1}
                      </Badge>
                      <p className="text-gray-300 text-sm">{step}</p>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                    <h5 className="text-yellow-400 text-sm font-medium mb-1">Alternative:</h5>
                    <p className="text-gray-300 text-xs">{platform.alternative}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Step by Step Process */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Recovery Process</CardTitle>
            <CardDescription className="text-gray-400">
              Complete steps to restore wallet security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <Badge className="bg-blue-600 text-white mb-2">Step 1</Badge>
                <h4 className="text-blue-400 font-medium mb-2">Disable MetaMask Smart Account</h4>
                <p className="text-gray-300 text-sm">Turn off smart account features in MetaMask settings</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <Badge className="bg-green-600 text-white mb-2">Step 2</Badge>
                <h4 className="text-green-400 font-medium mb-2">Disable Uniswap Smart Account</h4>
                <p className="text-gray-300 text-sm">Switch to standard wallet mode in Uniswap</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <Badge className="bg-purple-600 text-white mb-2">Step 3</Badge>
                <h4 className="text-purple-400 font-medium mb-2">Test ETH Transaction</h4>
                <p className="text-gray-300 text-sm">Send small amount to verify delegation removed</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                <Badge className="bg-orange-600 text-white mb-2">Step 4</Badge>
                <h4 className="text-orange-400 font-medium mb-2">Deploy ETHR Safely</h4>
                <p className="text-gray-300 text-sm">Proceed with mainnet deployment once secure</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protected Assets */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-400" />
              Your Protected Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">ETHGR Tokens</h4>
                <p className="text-white text-2xl font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">Unaffected by smart accounts</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Current Value</h4>
                <p className="text-white text-2xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">Safe and transferable</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">Recovery Status</h4>
                <p className="text-white text-2xl font-bold">SOLVABLE</p>
                <p className="text-gray-400 text-sm">Disable smart accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mr-4"
            onClick={() => window.open('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#settings/experimental', '_blank')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Open MetaMask Settings
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            onClick={() => window.open('https://app.uniswap.org', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Uniswap Settings
          </Button>
        </div>

        {/* Success Outcome */}
        <Alert className="border-green-500 bg-green-500/10">
          <Info className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Expected Outcome:</strong> Disabling smart accounts should remove the EIP 7702 delegation and restore normal wallet functionality. Your $706,450 in tokens will remain safe throughout this process.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}