import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Fuel,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  DollarSign,
  Zap,
  Send,
  RefreshCw,
  Target,
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function GasFeeSolutionCenter() {
  const [copied, setCopied] = useState("");
  
  const primaryWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const secondaryWallet = "0xc46eB37677360EfDc011F4097621F15b792fa630";

  const { data: primaryBalance, isLoading: primaryLoading, refetch: refetchPrimary } = useQuery({
    queryKey: ['/api/wallet/balance', primaryWallet],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/balance/${primaryWallet}`);
      if (!response.ok) throw new Error('Failed to fetch balance');
      return response.json();
    },
    refetchInterval: 30000
  });

  const { data: secondaryBalance, refetch: refetchSecondary } = useQuery({
    queryKey: ['/api/wallet/balance', secondaryWallet],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/balance/${secondaryWallet}`);
      if (!response.ok) throw new Error('Failed to fetch balance');
      return response.json();
    },
    refetchInterval: 30000
  });

  const { data: tokenData } = useQuery({
    queryKey: ['/api/wallet/tokens', primaryWallet],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/tokens/${primaryWallet}`);
      if (!response.ok) throw new Error('Failed to fetch tokens');
      return response.json();
    }
  });

  const weiToEth = (wei: string) => {
    if (!wei || wei === "0") return "0.000000";
    const ethValue = parseFloat(wei) / 1000000000000000000;
    return ethValue.toFixed(6);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const currentETH = primaryBalance ? parseFloat(weiToEth(primaryBalance.eth)) : 0;
  const secondaryETH = secondaryBalance ? parseFloat(weiToEth(secondaryBalance.eth)) : 0;
  const ethPrice = 2420;

  // Gas fee estimates
  const gasNeeded = {
    tokenTransfer: { gwei: 21000, eth: 0.0021, usd: 5.08 },
    uniswapSwap: { gwei: 150000, eth: 0.015, usd: 36.30 },
    poolCreation: { gwei: 500000, eth: 0.05, usd: 121.00 },
    contractDeploy: { gwei: 2000000, eth: 0.2, usd: 484.00 }
  };

  const solutions = [
    {
      title: "Immediate ETH Purchase",
      description: "Buy ETH directly to your wallet for immediate operations",
      cost: "$50-100",
      time: "5-10 minutes",
      success: "High",
      steps: [
        "Use Coinbase/Kraken to buy ETH",
        "Send directly to " + primaryWallet,
        "Wait for confirmation",
        "Execute token operations"
      ],
      links: [
        { name: "Coinbase", url: "https://www.coinbase.com/price/ethereum" },
        { name: "Kraken", url: "https://www.kraken.com/prices/ethereum" }
      ]
    },
    {
      title: "Secondary Wallet Transfer",
      description: "Transfer ETH from secondary wallet if available",
      cost: "Gas fee only",
      time: "1-2 minutes", 
      success: secondaryETH > 0.005 ? "High" : "Low",
      steps: [
        "Check secondary wallet balance",
        "Send 0.02-0.05 ETH to primary wallet",
        "Use transferred ETH for operations",
        "Continue with token management"
      ],
      available: secondaryETH > 0.005
    },
    {
      title: "Direct Token Sale",
      description: "Find buyer for direct token purchase (no gas needed)",
      cost: "Escrow fee (~5%)",
      time: "1-24 hours",
      success: "Medium",
      steps: [
        "List tokens on OTC platforms",
        "Use escrow service",
        "Buyer pays in ETH",
        "Tokens transferred via smart contract"
      ],
      links: [
        { name: "WhaleX", url: "https://whalex.io/" },
        { name: "CoinList OTC", url: "https://coinlist.co/otc" }
      ]
    },
    {
      title: "Gas Station Networks",
      description: "Use meta-transactions (gas paid by relay)",
      cost: "Token fee (2-5%)",
      time: "5-15 minutes",
      success: "Medium",
      steps: [
        "Connect to Biconomy/OpenGSN",
        "Submit meta-transaction",
        "Relay pays gas fee",
        "Fee deducted from token transfer"
      ],
      technical: true
    },
    {
      title: "DEX Aggregator Support",
      description: "Some DEXs offer gas-free swaps for large holders",
      cost: "Higher slippage",
      time: "Variable",
      success: "Low",
      steps: [
        "Contact 1inch/Paraswap support",
        "Request special handling",
        "Provide token details",
        "Execute through their interface"
      ],
      longshot: true
    }
  ];

  const immediateActions = [
    {
      action: "Buy 0.1 ETH ($242)",
      result: "Covers all operations + buffer",
      priority: "Recommended",
      timeline: "10 minutes"
    },
    {
      action: "Transfer from secondary wallet",
      result: `${secondaryETH.toFixed(4)} ETH available`,
      priority: secondaryETH > 0.005 ? "Immediate" : "Not viable",
      timeline: "2 minutes"
    },
    {
      action: "Find OTC buyer",
      result: "Sell tokens for ETH directly",
      priority: "Alternative",
      timeline: "1-24 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Gas Fee Solution Center
          </h1>
          <p className="text-2xl text-red-300">
            Solving "Value of Zero When It Cost Actual Money" Problem
          </p>
        </div>

        {/* Current Status */}
        <Alert className="border-yellow-500 bg-yellow-500/10 border-2">
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
          <AlertDescription className="text-yellow-200 text-center text-xl">
            <strong>Problem Identified:</strong> You have valuable tokens (1,990,000 ETHGR) but insufficient ETH ({currentETH.toFixed(6)} ETH = ${(currentETH * ethPrice).toFixed(2)}) to pay gas fees for moving/trading them.
          </AlertDescription>
        </Alert>

        {/* Current Balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl">Primary Wallet Balance</CardTitle>
              <CardDescription className="text-gray-400 font-mono text-sm">{primaryWallet}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">ETH Balance:</span>
                    <span className="text-white font-bold">{currentETH.toFixed(6)} ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">USD Value:</span>
                    <span className="text-red-400 font-bold">${(currentETH * ethPrice).toFixed(2)}</span>
                  </div>
                </div>
                
                {tokenData?.tokens?.map((token, index) => (
                  <div key={index} className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold">{token.symbol}</span>
                      <span className="text-white">{token.balance}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{token.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-xl">Gas Fee Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(gasNeeded).map(([operation, cost], index) => (
                  <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-yellow-400 font-medium capitalize">{operation.replace(/([A-Z])/g, ' $1')}</span>
                      <Badge className={`${currentETH >= cost.eth ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                        {currentETH >= cost.eth ? 'Affordable' : 'Need More ETH'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{cost.eth} ETH</span>
                      <span className="text-white">${cost.usd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solution Options */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Gas Fee Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solutions.map((solution, index) => (
                <div key={index} className={`p-4 border rounded ${
                  solution.success === 'High' ? 'border-green-600 bg-green-600/10' :
                  solution.success === 'Medium' ? 'border-yellow-600 bg-yellow-600/10' :
                  'border-red-600 bg-red-600/10'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold">{solution.title}</h3>
                    <Badge className={`${
                      solution.success === 'High' ? 'bg-green-600' :
                      solution.success === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                    } text-white`}>
                      {solution.success} Success
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{solution.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                    <div>
                      <span className="text-gray-400">Cost:</span>
                      <p className="text-white">{solution.cost}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Time:</span>
                      <p className="text-white">{solution.time}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <p className={`${solution.available === false ? 'text-red-400' : solution.available ? 'text-green-400' : 'text-yellow-400'}`}>
                        {solution.available === false ? 'Not Available' : solution.available ? 'Available' : 'Possible'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3">
                    {solution.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="text-xs text-gray-400">
                        {stepIndex + 1}. {step}
                      </div>
                    ))}
                  </div>

                  {solution.links && (
                    <div className="flex gap-2">
                      {solution.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          onClick={() => window.open(link.url, '_blank')}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-xs"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {link.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Action Plan */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Immediate Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {immediateActions.map((action, index) => (
                <div key={index} className={`p-4 border rounded ${
                  action.priority === 'Recommended' ? 'border-green-600 bg-green-600/10' :
                  action.priority === 'Immediate' ? 'border-blue-600 bg-blue-600/10' :
                  action.priority === 'Not viable' ? 'border-red-600 bg-red-600/10' :
                  'border-yellow-600 bg-yellow-600/10'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold">{action.action}</h3>
                      <p className="text-gray-300 text-sm">{action.result}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        action.priority === 'Recommended' ? 'bg-green-600' :
                        action.priority === 'Immediate' ? 'bg-blue-600' :
                        action.priority === 'Not viable' ? 'bg-red-600' : 'bg-yellow-600'
                      } text-white mb-1`}>
                        {action.priority}
                      </Badge>
                      <p className="text-gray-400 text-xs">{action.timeline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => refetchPrimary()}
            disabled={primaryLoading}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <RefreshCw className={`h-6 w-6 mr-2 ${primaryLoading ? 'animate-spin' : ''}`} />
            Refresh Balances
          </Button>
          
          <Button 
            onClick={() => window.open('https://www.coinbase.com/price/ethereum', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <DollarSign className="h-6 w-6 mr-2" />
            Buy ETH Now
          </Button>
          
          <Button 
            onClick={() => copyToClipboard(primaryWallet)}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            {copied === primaryWallet ? <CheckCircle className="h-6 w-6 mr-2" /> : <Copy className="h-6 w-6 mr-2" />}
            Copy Wallet
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${primaryWallet}`, '_blank')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View Etherscan
          </Button>
        </div>

        {/* Success Criteria */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Target className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Success Target:</strong> Acquire 0.05-0.1 ETH ($121-242) to unlock your $706,450 worth of ETHGR tokens for trading, selling, or pool creation. This solves the "value of zero when it costs actual money" problem permanently.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}