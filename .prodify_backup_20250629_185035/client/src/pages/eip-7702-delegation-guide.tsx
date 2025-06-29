import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle,
  Shield,
  Code,
  ExternalLink,
  Info,
  CheckCircle,
  XCircle,
  Zap
} from "lucide-react";

export default function EIP7702DelegationGuide() {
  const [copied, setCopied] = useState(false);

  const eip7702Info = {
    title: "EIP 7702: Set EOA account code for one transaction",
    description: "Allows Externally Owned Accounts (EOAs) to temporarily act like smart contracts",
    status: "Active on Ethereum Mainnet",
    risks: [
      "Temporary code execution on your wallet",
      "Can override normal wallet behavior",
      "Difficult to remove once set",
      "May persist across transactions"
    ],
    benefits: [
      "Advanced DeFi interactions",
      "Gas optimization",
      "Smart contract functionality",
      "Account abstraction features"
    ]
  };

  const revocationMethods = [
    {
      method: "SetCode to 0x00",
      description: "Use EIP 7702 to set account code back to empty",
      complexity: "HIGH",
      success: "Possible",
      code: `// EIP-7702 Revocation Transaction
{
  "type": "0x04", // EIP-7702 transaction type
  "authorizationList": [{
    "chainId": 1,
    "address": "0x0000000000000000000000000000000000000000", // Set to zero
    "nonce": [current_nonce],
    "yParity": [signature_y],
    "r": [signature_r], 
    "s": [signature_s]
  }]
}`
    },
    {
      method: "Wallet Provider Reset",
      description: "Some wallets may have built-in EIP 7702 management",
      complexity: "LOW",
      success: "Varies",
      code: "Check MetaMask settings for Account Abstraction or Smart Account options"
    },
    {
      method: "Authorization Revocation",
      description: "Revoke the original authorization signature",
      complexity: "MEDIUM", 
      success: "Uncertain",
      code: "Look for 'Authorizations' or 'Delegations' in wallet settings"
    }
  ];

  const immediateActions = [
    {
      priority: "CRITICAL",
      action: "Stop sending ETH to this wallet",
      reason: "EIP-7702 delegation will steal all incoming ETH",
      status: "REQUIRED"
    },
    {
      priority: "HIGH", 
      action: "Transfer tokens to new wallet",
      reason: "Prevent future delegation risks",
      status: "RECOMMENDED"
    },
    {
      priority: "MEDIUM",
      action: "Monitor for EIP-7702 revocation tools",
      reason: "New tools may become available",
      status: "ONGOING"
    }
  ];

  const technicalAnalysis = `EIP-7702 Technical Analysis:

Contract Address: 0x710fad1041f0ee79916bb1a6adef662303bb8b6e
Delegation Type: EIP-7702 Set Account Code
Current Status: Active on wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843

EIP-7702 Mechanism:
1. Your wallet was authorized to execute code from the CrimeEnjoyor contract
2. This makes your EOA (wallet) temporarily act like a smart contract
3. All ETH sent to your wallet triggers the malicious code
4. The code automatically forwards ETH to attacker's address

Removal Challenges:
- EIP-7702 delegations can persist across transactions
- Standard wallet interfaces don't have revocation tools yet
- Requires specialized EIP-7702 transaction to remove
- Few tools currently support EIP-7702 management

Security Impact:
- ETH transfers: BLOCKED (stolen by delegation)
- Token transfers: UNAFFECTED (delegation only affects ETH)
- Existing balances: SAFE (delegation doesn't affect current holdings)
- Future interactions: RISKY (delegation persists)`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Code className="h-8 w-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">
              EIP 7702 Delegation Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Understanding and managing EIP 7702 account code delegation
          </p>
        </div>

        {/* EIP-7702 Explanation */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <Info className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200">
            <strong>EIP 7702 Identified:</strong> Your wallet is using the new Ethereum account abstraction standard. This explains why normal delegation removal methods don't work.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* EIP-7702 Info */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                EIP 7702 Overview
              </CardTitle>
              <CardDescription className="text-gray-400">
                What EIP 7702 delegation means for your wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Purpose</h4>
                <p className="text-gray-300 text-sm">{eip7702Info.description}</p>
              </div>
              
              <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">Status</h4>
                <p className="text-gray-300 text-sm">{eip7702Info.status}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-red-400 font-medium">Security Risks:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  {eip7702Info.risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="h-3 w-3 text-red-400 mt-1 flex-shrink-0" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Removal Methods */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Potential Removal Methods
              </CardTitle>
              <CardDescription className="text-gray-400">
                Experimental approaches to revoke EIP 7702 delegation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {revocationMethods.map((method, index) => (
                <div key={index} className="p-3 bg-gray-700/30 border border-gray-600 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{method.method}</h4>
                    <Badge className={`text-xs ${
                      method.complexity === 'HIGH' ? 'bg-red-600' :
                      method.complexity === 'MEDIUM' ? 'bg-yellow-600' :
                      'bg-green-600'
                    } text-white`}>
                      {method.complexity}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-xs mb-2">{method.description}</p>
                  <p className="text-gray-400 text-xs">Success Rate: {method.success}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Technical Analysis */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-400" />
                Technical Analysis
              </div>
              <Button
                onClick={() => copyToClipboard(technicalAnalysis)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <ExternalLink className="h-4 w-4 mr-2" />}
                Copy Analysis
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={technicalAnalysis}
              readOnly
              className="font-mono text-xs bg-gray-900 border-gray-600 text-gray-300 h-80"
            />
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Immediate Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {immediateActions.map((action, index) => (
                <div key={index} className={`p-4 rounded border ${
                  action.priority === 'CRITICAL' ? 'bg-red-600/10 border-red-600/30' :
                  action.priority === 'HIGH' ? 'bg-orange-600/10 border-orange-600/30' :
                  'bg-yellow-600/10 border-yellow-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      action.priority === 'CRITICAL' ? 'text-red-400' :
                      action.priority === 'HIGH' ? 'text-orange-400' :
                      'text-yellow-400'
                    }`}>
                      {action.action}
                    </h4>
                    <Badge className={`${
                      action.priority === 'CRITICAL' ? 'bg-red-600' :
                      action.priority === 'HIGH' ? 'bg-orange-600' :
                      'bg-yellow-600'
                    } text-white`}>
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{action.reason}</p>
                  <p className="text-gray-400 text-xs">Status: {action.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Value Protection */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Your Protected Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">ETHGR Tokens</h4>
                <p className="text-white text-2xl font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">Safe from EIP-7702</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Current Value</h4>
                <p className="text-white text-2xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">Protected Assets</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-medium mb-2">ETH Risk</h4>
                <p className="text-white text-2xl font-bold">HIGH</p>
                <p className="text-gray-400 text-sm">Avoid ETH transfers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendation */}
        <Alert className="border-blue-500 bg-blue-500/10">
          <Shield className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200">
            <strong>Recommendation:</strong> EIP-7702 removal is complex and experimental. Focus on protecting your $706,450 in existing tokens by either keeping them secure or transferring to a new wallet. Avoid ETH transactions on the compromised wallet.
          </AlertDescription>
        </Alert>

        {/* External Resources */}
        <div className="text-center space-y-4">
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 mr-4"
            onClick={() => window.open('https://eips.ethereum.org/EIPS/eip-7702', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            EIP-7702 Specification
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            onClick={() => window.open('https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7702.md', '_blank')}
          >
            <Code className="h-4 w-4 mr-2" />
            Technical Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}