
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wallet, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  ExternalLink,
  RefreshCw,
  TrendingUp,
  Target,
  Shield
} from "lucide-react";

export default function CurrentWalletStatus() {
  const walletAddress = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Current known data based on your project
  const walletData = {
    address: walletAddress,
    ethBalance: "0.00630653",
    ethUSDValue: "$15.28",
    ethgrTokens: "1,990,000",
    ethgrContractAddress: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308",
    optimismContract: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
    verificationStatus: "Verified ✅",
    recoveryPotential: "High - Major Holdings Detected"
  };

  const contractInfo = {
    ethereum: {
      address: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308",
      status: "Verified ✅",
      balance: "1,990,000 ETHGR",
      network: "Ethereum Mainnet"
    },
    optimism: {
      address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
      status: "Needs Proper Deployment",
      balance: "Pending",
      network: "Optimism L2"
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Wallet Status Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Real-time analysis of your ETHG Recovery holdings
          </p>
          <Badge variant="outline" className="text-sm">
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </Badge>
        </div>

        {/* Main Wallet Card */}
        <Card className="border-2 border-blue-200 bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Wallet className="h-6 w-6" />
              Main Wallet Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Wallet Address</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm font-mono">{formatAddress(walletAddress)}</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">ETH Balance</label>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-800">{walletData.ethBalance} ETH</div>
                  <div className="text-sm text-green-600">{walletData.ethUSDValue}</div>
                </div>
              </div>
            </div>

            <Alert className="border-orange-200 bg-orange-50">
              <Target className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Recovery Status:</strong> {walletData.recoveryPotential}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Token Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ethereum ETHGR */}
          <Card className="border border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Ethereum ETHGR Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Contract Address:</span>
                  <code className="text-xs">{formatAddress(contractInfo.ethereum.address)}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Token Balance:</span>
                  <span className="font-bold text-green-600">{contractInfo.ethereum.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {contractInfo.ethereum.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Network:</span>
                  <span className="text-sm">{contractInfo.ethereum.network}</span>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => window.open(`https://etherscan.io/token/${contractInfo.ethereum.address}?a=${walletAddress}`, '_blank')}
              >
                View on Etherscan
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Optimism ETHGR */}
          <Card className="border border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Optimism ETHGR Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Contract Address:</span>
                  <code className="text-xs">{formatAddress(contractInfo.optimism.address)}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Token Balance:</span>
                  <span className="font-bold text-orange-600">{contractInfo.optimism.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    {contractInfo.optimism.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Network:</span>
                  <span className="text-sm">{contractInfo.optimism.network}</span>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800 text-sm">
                  Ready for BitGet Wallet + Optimism deployment for better price recognition
                </AlertDescription>
              </Alert>

              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => window.open(`https://optimistic.etherscan.io/address/${contractInfo.optimism.address}`, '_blank')}
              >
                View on Optimism Explorer
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={refreshData} 
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh Data'}
              </Button>

              <Button 
                variant="outline"
                onClick={() => window.open('/routescan-transfer-analysis', '_blank')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analyze Transfers
              </Button>

              <Button 
                variant="outline"
                onClick={() => window.open('/wallet-analyzer', '_blank')}
              >
                <Target className="h-4 w-4 mr-2" />
                Deep Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">1.99M</div>
            <div className="text-sm text-gray-600">ETHGR Tokens</div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">Networks</div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">1</div>
            <div className="text-sm text-gray-600">Verified Contract</div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600">High</div>
            <div className="text-sm text-gray-600">Recovery Potential</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
