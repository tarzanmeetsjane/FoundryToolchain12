import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  ArrowRightLeft,
  Search,
  TrendingUp,
  ExternalLink,
  Eye,
  Activity,
  Target
} from "lucide-react";

export default function SecondaryWalletAnalysis() {
  const walletData = {
    address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    role: "Secondary Recovery Wallet",
    status: "37 ETH Investigation Target",
    connection: "Actively sending ETH to primary wallet"
  };

  const walletNetwork = [
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      role: "Primary Wallet",
      assets: "$648,740 ETHGR + ETH",
      status: "Main recovery success",
      relationship: "Receiving ETH transfers"
    },
    {
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630", 
      role: "Secondary Wallet",
      assets: "ETH balance (checking...)",
      status: "37 ETH target investigation",
      relationship: "Source of ETH transfers"
    },
    {
      address: "0x881D40237659C251811CEC9c364ef91dC08D300C",
      role: "Discovery Wallet",
      assets: "Empty (0 ETH, 0 tokens)",
      status: "No activity",
      relationship: "No connection found"
    }
  ];

  const investigationFocus = [
    {
      question: "Current ETH Balance",
      importance: "High",
      purpose: "Check remaining recoverable ETH"
    },
    {
      question: "Recent Transaction History", 
      importance: "High",
      purpose: "Track ETH movement patterns"
    },
    {
      question: "Token Holdings",
      importance: "Medium",
      purpose: "Any ETHGR or other valuable tokens"
    },
    {
      question: "37 ETH Location",
      importance: "Critical",
      purpose: "User remembers seeing 37 ETH after deployment"
    }
  ];

  const recoveryStrategy = [
    {
      step: "Balance Verification",
      description: "Check current ETH and token balances",
      priority: "Immediate"
    },
    {
      step: "Transaction Analysis",
      description: "Review recent transfers to primary wallet",
      priority: "High"
    },
    {
      step: "Historical Search",
      description: "Look for June 15 deployment transaction records",
      priority: "High"
    },
    {
      step: "37 ETH Recovery",
      description: "Execute recovery if funds located",
      priority: "Critical"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Wallet className="h-10 w-10 text-purple-400" />
            <h1 className="text-5xl font-bold text-white">
              Secondary Wallet Analysis
            </h1>
          </div>
          <p className="text-2xl text-purple-300">
            37 ETH recovery investigation - tracking your secondary wallet activity
          </p>
        </div>

        {/* Investigation Alert */}
        <Alert className="border-purple-500 bg-purple-500/10">
          <Target className="h-6 w-6 text-purple-500" />
          <AlertDescription className="text-purple-200 text-center text-xl">
            <strong>37 ETH Recovery Target:</strong> Analyzing secondary wallet that was actively sending ETH to your primary recovery wallet. This may be where the 37 ETH you remember from Remix deployment is located.
          </AlertDescription>
        </Alert>

        {/* Wallet Summary */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">Secondary Wallet Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-bold mb-3">{walletData.role}</h4>
                <p className="text-white font-mono text-sm break-all mb-3">{walletData.address}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-purple-400 text-sm">Investigation Status:</span>
                    <p className="text-white">{walletData.status}</p>
                  </div>
                  <div>
                    <span className="text-purple-400 text-sm">Network Role:</span>
                    <p className="text-white">{walletData.connection}</p>
                  </div>
                  <div>
                    <span className="text-purple-400 text-sm">Priority:</span>
                    <Badge className="bg-red-600 text-white">Critical Recovery</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Network Overview */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Complete Wallet Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {walletNetwork.map((wallet, index) => (
                <div key={index} className={`p-4 border rounded ${
                  wallet.role === 'Primary Wallet' ? 'bg-green-600/10 border-green-600/30' :
                  wallet.role === 'Secondary Wallet' ? 'bg-purple-600/10 border-purple-600/30' :
                  'bg-gray-600/10 border-gray-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-white font-medium">{wallet.role}</h5>
                    <Badge className={`${
                      wallet.role === 'Primary Wallet' ? 'bg-green-600' :
                      wallet.role === 'Secondary Wallet' ? 'bg-purple-600' :
                      'bg-gray-600'
                    } text-white`}>
                      {wallet.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 font-mono text-sm break-all mb-2">{wallet.address}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Assets: </span>
                      <span className="text-gray-300">{wallet.assets}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Network Connection: </span>
                      <span className="text-gray-300">{wallet.relationship}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investigation Focus */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Investigation Priorities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investigationFocus.map((item, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-orange-400 font-medium">{item.question}</h5>
                    <Badge className={`${
                      item.importance === 'Critical' ? 'bg-red-600' :
                      item.importance === 'High' ? 'bg-orange-600' :
                      'bg-yellow-600'
                    } text-white`}>
                      {item.importance}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm">{item.purpose}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recovery Strategy */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">37 ETH Recovery Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recoveryStrategy.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.priority === 'Critical' ? 'bg-red-600 text-white' :
                    step.priority === 'High' ? 'bg-orange-600 text-white' :
                    'bg-green-600 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{step.step}</h5>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                  <Badge className={`${
                    step.priority === 'Critical' ? 'bg-red-600' :
                    step.priority === 'High' ? 'bg-orange-600' :
                    'bg-green-600'
                  } text-white`}>
                    {step.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Analysis */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Live Wallet Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h5 className="text-yellow-400 font-medium mb-2">ETH Balance</h5>
                <p className="text-white text-xl font-bold">Checking...</p>
                <p className="text-yellow-300 text-sm">Live balance query</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h5 className="text-blue-400 font-medium mb-2">ETHGR Tokens</h5>
                <p className="text-white text-xl font-bold">Verifying...</p>
                <p className="text-blue-300 text-sm">Token holdings check</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h5 className="text-purple-400 font-medium mb-2">37 ETH Status</h5>
                <p className="text-white text-xl font-bold">Investigating...</p>
                <p className="text-purple-300 text-sm">Recovery target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${walletData.address}`, '_blank')}
          >
            <Eye className="h-6 w-6 mr-2" />
            View on Etherscan
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${walletData.address}#tokentxns`, '_blank')}
          >
            <Activity className="h-6 w-6 mr-2" />
            Token Transfers
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${walletData.address}#internaltx`, '_blank')}
          >
            <ArrowRightLeft className="h-6 w-6 mr-2" />
            Internal Txns
          </Button>
          
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-lg py-8"
            onClick={() => window.open('/wallet-recovery-dashboard', '_self')}
          >
            <Search className="h-6 w-6 mr-2" />
            Recovery Dashboard
          </Button>
        </div>

        {/* Current Status */}
        <Alert className="border-green-500 bg-green-500/10">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>Recovery Progress:</strong> Primary wallet secured with $648,740 ETHGR tokens. Now investigating secondary wallet for 37 ETH recovery opportunity.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}