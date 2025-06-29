import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  XCircle,
  CheckCircle,
  ExternalLink,
  DollarSign,
  Activity,
  Shield,
  Target
} from "lucide-react";

export default function MarketRealityDashboard() {
  const findings = {
    dexScreener: "No trading pairs found",
    etherscan: "Contract source not verified",
    realValue: "Unknown - No active market",
    tradingPossible: "Uncertain without liquidity",
    gasRisk: "High - May lose ETH on failed trades"
  };

  const tokenData = {
    contract: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    yourTokens: "1,990,000 ETHGR",
    walletDisplay: "$688,059.38",
    ethBalance: "0.01444535 ETH ($34.93)"
  };

  const criticalIssues = [
    {
      issue: "No DEX Trading Pairs",
      severity: "Critical",
      description: "DEX Screener shows no active trading pairs for ETHGR",
      impact: "Cannot convert tokens to ETH",
      color: "red"
    },
    {
      issue: "Unverified Contract",
      severity: "High",
      description: "Etherscan shows source code not verified",
      impact: "Unknown contract functionality",
      color: "orange"
    },
    {
      issue: "Insufficient Gas ETH",
      severity: "High", 
      description: "Only 0.014 ETH available for transactions",
      impact: "Cannot afford transaction fees",
      color: "orange"
    },
    {
      issue: "Display vs Reality",
      severity: "Medium",
      description: "Wallet shows value but no market exists",
      impact: "Value may be artificial",
      color: "yellow"
    }
  ];

  const nextSteps = [
    {
      step: "Create Liquidity Pool",
      description: "Add ETH to create ETHGR/ETH trading pair",
      requirement: "Need significant ETH investment",
      feasibility: "Difficult with current balance"
    },
    {
      step: "Verify Contract First",
      description: "Submit source code to Etherscan for verification",
      requirement: "No cost, just time",
      feasibility: "Highly recommended"
    },
    {
      step: "Small Test Transaction",
      description: "Try tiny swap to test functionality",
      requirement: "Minimal ETH for gas",
      feasibility: "Possible but risky"
    },
    {
      step: "Get More ETH",
      description: "Purchase additional ETH for trading/liquidity",
      requirement: "$50-100 investment",
      feasibility: "User decision"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-10 w-10 text-red-400" />
            <h1 className="text-5xl font-bold text-white">
              Market Reality Check
            </h1>
          </div>
          <p className="text-2xl text-red-300">
            Critical findings about your ETHGR token market status
          </p>
        </div>

        {/* Critical Alert */}
        <Alert className="border-red-500 bg-red-500/20 animate-pulse">
          <XCircle className="h-6 w-6 text-red-500" />
          <AlertDescription className="text-red-200 text-center text-xl">
            <strong>NO ACTIVE TRADING PAIRS FOUND</strong><br/>
            DEX Screener reports zero trading activity for your ETHGR token
          </AlertDescription>
        </Alert>

        {/* Investigation Results */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white">Market Investigation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-bold">What You Have</h4>
                
                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h5 className="text-blue-400 font-medium mb-2">Token Holdings</h5>
                  <p className="text-white text-lg font-bold">{tokenData.yourTokens}</p>
                  <p className="text-blue-300">Confirmed in wallet</p>
                </div>
                
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h5 className="text-green-400 font-medium mb-2">Wallet Display</h5>
                  <p className="text-white text-lg font-bold">{tokenData.walletDisplay}</p>
                  <p className="text-green-300">Interface calculation</p>
                </div>
                
                <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <h5 className="text-orange-400 font-medium mb-2">Available ETH</h5>
                  <p className="text-white text-lg font-bold">{tokenData.ethBalance}</p>
                  <p className="text-orange-300">For gas fees</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-bold">Market Reality</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-red-700/50 rounded">
                    <span className="text-red-400 text-sm">DEX Screener:</span>
                    <p className="text-white font-bold">{findings.dexScreener}</p>
                  </div>
                  <div className="p-3 bg-red-700/50 rounded">
                    <span className="text-red-400 text-sm">Contract Status:</span>
                    <p className="text-white font-bold">{findings.etherscan}</p>
                  </div>
                  <div className="p-3 bg-red-700/50 rounded">
                    <span className="text-red-400 text-sm">Trading Possible:</span>
                    <p className="text-white font-bold">{findings.tradingPossible}</p>
                  </div>
                  <div className="p-3 bg-red-700/50 rounded">
                    <span className="text-red-400 text-sm">Real Market Value:</span>
                    <p className="text-white font-bold">{findings.realValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Issues */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Critical Issues Identified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalIssues.map((issue, index) => (
                <div key={index} className={`p-4 border rounded ${
                  issue.color === 'red' ? 'bg-red-600/10 border-red-600/30' :
                  issue.color === 'orange' ? 'bg-orange-600/10 border-orange-600/30' :
                  'bg-yellow-600/10 border-yellow-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">{issue.issue}</h5>
                    <Badge className={`${
                      issue.color === 'red' ? 'bg-red-600' :
                      issue.color === 'orange' ? 'bg-orange-600' :
                      'bg-yellow-600'
                    } text-white`}>
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{issue.description}</p>
                  <p className="text-gray-400 text-xs"><strong>Impact:</strong> {issue.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Possible Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h5 className="text-blue-400 font-medium mb-2">{step.step}</h5>
                  <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Requirement: {step.requirement}</span>
                    <span className="text-blue-300">Feasibility: {step.feasibility}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open('/contract-verification-center', '_self')}
          >
            <Shield className="h-6 w-6 mr-2" />
            Verify Contract
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open('https://www.coinbase.com/price/ethereum', '_blank')}
          >
            <DollarSign className="h-6 w-6 mr-2" />
            Buy More ETH
          </Button>
          
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-lg py-8"
            onClick={() => window.open('https://app.uniswap.org/#/add/v2', '_blank')}
          >
            <Activity className="h-6 w-6 mr-2" />
            Create Pool
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${tokenData.contract}`, '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Check Contract
          </Button>
        </div>

        {/* Reality Summary */}
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <Target className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200 text-center">
            <strong>Bottom Line:</strong> Your tokens exist but have no active market. You'll need to create liquidity or find alternative monetization strategies before the displayed value becomes real.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}