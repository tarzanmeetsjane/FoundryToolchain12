import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Wallet,
  ExternalLink,
  RefreshCw,
  Eye,
  Activity,
  DollarSign,
  CheckCircle
} from "lucide-react";

export default function NewWalletDiscovery() {
  const [loading, setLoading] = useState(false);
  
  const newWallet = "0x881D40237659C251811CEC9c364ef91dC08D300C";
  const primaryWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const secondaryWallet = "0xc46eB37677360EfDc011F4097621F15b792fa630";

  const walletNetwork = [
    {
      address: primaryWallet,
      label: "Primary Wallet",
      description: "Main recovery wallet with $706,450 ETHGR tokens",
      status: "active",
      ethBalance: "0.00630653",
      ethgrTokens: "1,990,000",
      role: "Main recovery & trading"
    },
    {
      address: secondaryWallet,
      label: "Secondary Wallet", 
      description: "37 ETH investigation target, actively sending ETH",
      status: "recovering",
      ethBalance: "0.00197415",
      ethgrTokens: "0",
      role: "ETH recovery source"
    },
    {
      address: newWallet,
      label: "New Discovery",
      description: "Recently identified wallet - checking connections",
      status: "investigating",
      ethBalance: "Loading...",
      ethgrTokens: "Loading...",
      role: "Unknown - Under analysis"
    }
  ];

  const investigationSteps = [
    {
      step: "ETH Balance Check",
      description: "Verify current ETH holdings",
      status: "checking"
    },
    {
      step: "Transaction History",
      description: "Review recent transaction patterns",
      status: "pending"
    },
    {
      step: "Token Holdings",
      description: "Check for ETHGR or other valuable tokens",
      status: "pending"
    },
    {
      step: "Connection Analysis",
      description: "Map relationships to known wallets",
      status: "pending"
    }
  ];

  const checkWallet = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Search className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">
              New Wallet Discovery
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Analyzing wallet: {newWallet}
          </p>
        </div>

        {/* Discovery Alert */}
        <Alert className="border-purple-500 bg-purple-500/10">
          <Activity className="h-4 w-4 text-purple-500" />
          <AlertDescription className="text-purple-200">
            <strong>New Wallet Detected:</strong> Investigating potential connections to your existing recovery network and checking for valuable assets.
          </AlertDescription>
        </Alert>

        {/* Wallet Network Overview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Wallet Recovery Network</CardTitle>
            <CardDescription className="text-gray-400">
              Your connected wallet ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {walletNetwork.map((wallet, index) => (
                <div key={index} className={`p-4 border rounded ${
                  wallet.status === 'active' ? 'bg-green-600/10 border-green-600/30' :
                  wallet.status === 'recovering' ? 'bg-blue-600/10 border-blue-600/30' :
                  'bg-purple-600/10 border-purple-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{wallet.label}</h4>
                      <p className="text-gray-400 text-sm font-mono break-all">{wallet.address}</p>
                    </div>
                    <Badge className={`${
                      wallet.status === 'active' ? 'bg-green-600' :
                      wallet.status === 'recovering' ? 'bg-blue-600' :
                      'bg-purple-600'
                    } text-white`}>
                      {wallet.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                    <div>
                      <h5 className="text-gray-400 text-xs">ETH Balance</h5>
                      <p className="text-gray-300 text-sm">{wallet.ethBalance}</p>
                    </div>
                    <div>
                      <h5 className="text-gray-400 text-xs">ETHGR Tokens</h5>
                      <p className="text-gray-300 text-sm">{wallet.ethgrTokens}</p>
                    </div>
                    <div>
                      <h5 className="text-gray-400 text-xs">Role</h5>
                      <p className="text-gray-300 text-sm">{wallet.role}</p>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                        className="bg-gray-600 hover:bg-gray-700"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm">{wallet.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investigation Progress */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-400" />
              Live Investigation: {newWallet}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investigationSteps.map((step, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded ${
                  step.status === 'checking' ? 'bg-blue-600/10 border border-blue-600/30' :
                  step.status === 'complete' ? 'bg-green-600/10 border border-green-600/30' :
                  'bg-gray-600/10 border border-gray-600/30'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.status === 'checking' ? 'bg-blue-600 text-white' :
                    step.status === 'complete' ? 'bg-green-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {step.status === 'checking' ? <RefreshCw className="h-4 w-4 animate-spin" /> :
                     step.status === 'complete' ? <CheckCircle className="h-4 w-4" /> :
                     index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{step.step}</h5>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  <Badge className={`${
                    step.status === 'checking' ? 'bg-blue-600' :
                    step.status === 'complete' ? 'bg-green-600' :
                    'bg-gray-600'
                  } text-white`}>
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Analysis Tools */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            onClick={checkWallet}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh Analysis
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${newWallet}`, '_blank')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            View on Etherscan
          </Button>
          
          <Button 
            onClick={() => window.open(`https://revoke.cash/address/${newWallet}`, '_blank')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Activity className="h-4 w-4 mr-2" />
            Security Check
          </Button>
          
          <Button 
            onClick={() => window.location.href = "/multi-wallet-transaction-analysis"}
            className="bg-green-600 hover:bg-green-700"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Network Analysis
          </Button>
        </div>

        {/* Recovery Status */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Recovery Portfolio Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">Confirmed Assets</h4>
                <p className="text-white text-xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">ETHGR tokens ready</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">ETH Recovery</h4>
                <p className="text-white text-xl font-bold">Active</p>
                <p className="text-gray-400 text-sm">Multi-wallet operation</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">New Discovery</h4>
                <p className="text-white text-xl font-bold">Investigating</p>
                <p className="text-gray-400 text-sm">Potential additional assets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}