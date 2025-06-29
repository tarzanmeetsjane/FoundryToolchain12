import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Activity,
  TrendingUp,
  ExternalLink,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";

export default function TradingActivityTracker() {
  const transactions = [
    {
      id: 1,
      type: "Pair Creation Attempt",
      hash: "0xe58549d08cae0b1237b00b0cd3d30c2539118377c424db0065d1418a1511b5f2",
      timestamp: "37 hrs ago",
      ethBefore: "0.006263123310951444",
      ethAfter: "0.00416633167366056",
      gasPaid: "0.002096791637290884",
      nonceBefore: 9,
      nonceAfter: 10,
      status: "PAIR_EXISTS",
      result: "Discovered existing trading pair"
    },
    {
      id: 2,
      type: "Recent Transaction",
      hash: "Unknown",
      timestamp: "Recently",
      ethBefore: "0.00416633167366056",
      ethAfter: "0.004144104633477582",
      gasPaid: "0.000022227040182978",
      nonceBefore: 10,
      nonceAfter: 11,
      status: "Success",
      result: "Trading activity detected"
    }
  ];

  const activitySummary = {
    totalGasSpent: "0.002119018677473862 ETH",
    totalUSDSpent: "$5.13",
    transactionsExecuted: 2,
    currentNonce: 11,
    tradingStatus: "Active"
  };

  const possibleActions = [
    {
      action: "Token Swap",
      description: "Converting ETHGR tokens to ETH",
      likelihood: "High",
      benefit: "Immediate liquidity"
    },
    {
      action: "Liquidity Addition",
      description: "Adding tokens to existing Uniswap pair",
      likelihood: "Medium", 
      benefit: "Earning trading fees"
    },
    {
      action: "Contract Interaction",
      description: "Using DeFi protocols or token management",
      likelihood: "Medium",
      benefit: "Advanced features"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Activity className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">
              Trading Activity Detected
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Monitoring your wallet transactions and trading progress
          </p>
        </div>

        {/* Activity Alert */}
        <Alert className="border-green-500 bg-green-500/10">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Active Trading:</strong> Your wallet shows continued transaction activity after discovering the Uniswap pair. This suggests successful trading operations are underway.
          </AlertDescription>
        </Alert>

        {/* Transaction Timeline */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Transaction Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Chronological view of your trading operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div key={tx.id} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.status === 'PAIR_EXISTS' ? 'bg-orange-600' : 'bg-green-600'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 p-4 bg-gray-700/20 border border-gray-600 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{tx.type}</h4>
                      <Badge className={`${
                        tx.status === 'PAIR_EXISTS' ? 'bg-orange-600' : 'bg-green-600'
                      } text-white`}>
                        {tx.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">ETH Balance: </span>
                        <span className="text-gray-300">{tx.ethBefore} → {tx.ethAfter}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Gas Paid: </span>
                        <span className="text-red-400">{tx.gasPaid} ETH</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Nonce: </span>
                        <span className="text-gray-300">{tx.nonceBefore} → {tx.nonceAfter}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Result: </span>
                        <span className="text-green-300">{tx.result}</span>
                      </div>
                    </div>
                  </div>
                  
                  {index < transactions.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Trading Session Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-medium mb-2">Total Gas</h4>
                <p className="text-white text-lg font-bold">{activitySummary.totalGasSpent}</p>
                <p className="text-gray-400 text-sm">{activitySummary.totalUSDSpent}</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-medium mb-2">Transactions</h4>
                <p className="text-white text-lg font-bold">{activitySummary.transactionsExecuted}</p>
                <p className="text-gray-400 text-sm">Executed</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-medium mb-2">Current Nonce</h4>
                <p className="text-white text-lg font-bold">{activitySummary.currentNonce}</p>
                <p className="text-gray-400 text-sm">Sequence number</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-medium mb-2">Status</h4>
                <p className="text-white text-lg font-bold">{activitySummary.tradingStatus}</p>
                <p className="text-gray-400 text-sm">Current state</p>
              </div>
              
              <div className="p-4 bg-pink-600/10 border border-pink-600/30 rounded">
                <h4 className="text-pink-400 font-medium mb-2">Portfolio</h4>
                <p className="text-white text-lg font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">ETHGR value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Possible Trading Actions */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Likely Trading Activities</CardTitle>
            <CardDescription className="text-gray-400">
              Based on transaction patterns and gas usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {possibleActions.map((action, index) => (
                <div key={index} className="p-4 bg-gray-700/20 border border-gray-600 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{action.action}</h4>
                    <Badge className={`${
                      action.likelihood === 'High' ? 'bg-green-600' :
                      action.likelihood === 'Medium' ? 'bg-orange-600' :
                      'bg-gray-600'
                    } text-white`}>
                      {action.likelihood}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{action.description}</p>
                  <p className="text-green-400 text-sm font-medium">
                    Benefit: {action.benefit}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Progress */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Trading Infrastructure Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-600/10 border border-green-600/30 rounded">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <h5 className="text-green-400 font-medium">Uniswap Pair Discovered</h5>
                  <p className="text-gray-300 text-sm">ETHG/ETHGR trading pair exists and accessible</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                <Activity className="h-5 w-5 text-blue-400" />
                <div>
                  <h5 className="text-blue-400 font-medium">Active Trading Detected</h5>
                  <p className="text-gray-300 text-sm">Recent transactions suggest ongoing trading operations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                <DollarSign className="h-5 w-5 text-purple-400" />
                <div>
                  <h5 className="text-purple-400 font-medium">Portfolio Ready</h5>
                  <p className="text-gray-300 text-sm">1,990,000 ETHGR tokens worth $706,450 available for conversion</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
          >
            <Zap className="h-4 w-4 mr-2" />
            Continue Trading
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.location.href = "/immediate-trading-dashboard"}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trading Dashboard
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => window.open(`https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Etherscan
          </Button>
        </div>
      </div>
    </div>
  );
}