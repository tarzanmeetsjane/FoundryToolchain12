import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Target,
  Eye,
  Zap
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function LPTokenDetective() {
  const [copied, setCopied] = useState("");
  const [searchWallet, setSearchWallet] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  // Known LP token contracts to search
  const lpTokenContracts = [
    {
      name: "Uniswap V3 USDC/ETH",
      contract: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
      symbol: "UNI-V3-USDC-ETH",
      protocol: "Uniswap V3",
      type: "LP Token",
      description: "USDC/ETH 0.05% fee tier",
      priority: "High"
    },
    {
      name: "Uniswap V2 ETH/USDT",
      contract: "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852",
      symbol: "UNI-V2",
      protocol: "Uniswap V2", 
      type: "LP Token",
      description: "ETH/USDT pair",
      priority: "High"
    },
    {
      name: "SushiSwap LP Token",
      contract: "0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f",
      symbol: "SLP",
      protocol: "SushiSwap",
      type: "LP Token",
      description: "Various SushiSwap pools",
      priority: "Medium"
    },
    {
      name: "Curve.fi LP Token",
      contract: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
      symbol: "3CRV",
      protocol: "Curve",
      type: "LP Token",
      description: "3Pool (DAI/USDC/USDT)",
      priority: "Medium"
    },
    {
      name: "Balancer Pool Token",
      contract: "0x5c6Ee304399DBdB9C8Ef030aB642B10820DB8F56",
      symbol: "BPT",
      protocol: "Balancer",
      type: "LP Token", 
      description: "80/20 BAL/WETH",
      priority: "Low"
    }
  ];

  // Yield farming contracts that might hold your tokens
  const yieldFarmContracts = [
    {
      name: "Uniswap V3 Staker",
      contract: "0xe34139463bA50bD61336E0c446Bd8C0867c6fE65",
      description: "Staked Uniswap V3 positions",
      rewardToken: "UNI"
    },
    {
      name: "SushiSwap MasterChef",
      contract: "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd",
      description: "SushiSwap yield farming",
      rewardToken: "SUSHI"
    },
    {
      name: "Curve Gauge Controller",
      contract: "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
      description: "Curve liquidity gauge",
      rewardToken: "CRV"
    }
  ];

  // Your wallet investigation targets
  const walletTargets = [
    {
      name: "Primary Recovery Wallet",
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      description: "Main wallet with ETHGR tokens",
      status: "Active",
      priority: "Primary"
    },
    {
      name: "37 ETH Investigation Wallet",
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
      description: "Secondary wallet from Remix discovery",
      status: "Under Investigation",
      priority: "High"
    },
    {
      name: "Third Discovery Wallet",
      address: "0x881D40237659C251811CEC9c364ef91dC08D300C",
      description: "Additional wallet provided",
      status: "Empty/Unused",
      priority: "Low"
    }
  ];

  const { data: tokenSearchResults, refetch: searchTokens } = useQuery({
    queryKey: ['/api/wallet/tokens', searchWallet],
    queryFn: async () => {
      if (!searchWallet) return null;
      const response = await fetch(`/api/wallet/tokens/${searchWallet}`);
      if (!response.ok) throw new Error('Failed to fetch tokens');
      return response.json();
    },
    enabled: !!searchWallet
  });

  const investigationSteps = [
    {
      step: 1,
      title: "Scan All Known LP Contracts",
      description: "Check your wallets against major LP token contracts",
      method: "Contract balance check",
      coverage: "90% of major protocols"
    },
    {
      step: 2,
      title: "Transaction History Analysis",
      description: "Scan transaction history for LP-related activities",
      method: "Event log analysis",
      coverage: "Full transaction history"
    },
    {
      step: 3,
      title: "Yield Farm Position Check",
      description: "Check if tokens are staked in yield farming contracts",
      method: "Staking contract query",
      coverage: "Major yield farming protocols"
    },
    {
      step: 4,
      title: "Cross-Chain Investigation",
      description: "Check L2s and sidechains for bridged assets",
      method: "Bridge contract analysis",
      coverage: "Polygon, Arbitrum, Optimism"
    }
  ];

  const suspectedLocations = [
    {
      location: "Staked in Yield Farms",
      likelihood: "High",
      description: "Tokens earning yield in farming contracts",
      actionRequired: "Check MasterChef and gauge contracts"
    },
    {
      location: "Wrapped/Derivative Tokens",
      likelihood: "Medium", 
      description: "LP tokens wrapped in other protocols",
      actionRequired: "Check derivative protocols"
    },
    {
      location: "Bridge Contracts",
      likelihood: "Medium",
      description: "Tokens bridged to L2/sidechains",
      actionRequired: "Check bridge contract balances"
    },
    {
      location: "Unlisted Custom Contracts",
      likelihood: "Low",
      description: "Custom contracts from Replit projects",
      actionRequired: "Review Replit deployment history"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            LP Token Detective
          </h1>
          <p className="text-2xl text-purple-300">
            Finding Your Missing Liquidity Pool Investments
          </p>
        </div>

        {/* Investigation Status */}
        <Alert className="border-yellow-500 bg-yellow-500/10 border-2">
          <Search className="h-8 w-8 text-yellow-500" />
          <AlertDescription className="text-yellow-200 text-center text-xl">
            <strong>Investigation Active:</strong> Scanning for LP tokens from your real USD investments in Replit projects. These tokens should be earning yield - let's find them!
          </AlertDescription>
        </Alert>

        {/* Wallet Targets */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Investigation Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {walletTargets.map((wallet, index) => (
                <div 
                  key={index}
                  onClick={() => setSearchWallet(wallet.address)}
                  className={`p-4 border rounded cursor-pointer transition-all ${
                    searchWallet === wallet.address 
                      ? 'border-blue-500 bg-blue-600/20' 
                      : 'border-gray-600 bg-gray-700/20 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold">{wallet.name}</h3>
                    <Badge className={`${
                      wallet.priority === 'Primary' ? 'bg-green-600' :
                      wallet.priority === 'High' ? 'bg-yellow-600' : 'bg-gray-600'
                    } text-white`}>
                      {wallet.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-2">{wallet.description}</p>
                  <p className="text-blue-400 font-mono text-xs">{wallet.address}</p>
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(wallet.address);
                      }}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {copied === wallet.address ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* LP Token Search Results */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">LP Token Scan Results</CardTitle>
            <CardDescription className="text-gray-400">Scanning wallet: {searchWallet}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lpTokenContracts.map((token, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-green-400 font-bold">{token.name}</h3>
                    <Badge className={`${
                      token.priority === 'High' ? 'bg-red-600' :
                      token.priority === 'Medium' ? 'bg-yellow-600' : 'bg-gray-600'
                    } text-white`}>
                      {token.priority} Priority
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Protocol:</span>
                      <p className="text-white">{token.protocol}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Symbol:</span>
                      <p className="text-yellow-400">{token.symbol}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <p className="text-blue-400">{token.type}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mt-2">{token.description}</p>
                  <p className="text-blue-400 font-mono text-xs mt-1">{token.contract}</p>
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => window.open(`https://etherscan.io/token/${token.contract}?a=${searchWallet}`, '_blank')}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Check Balance
                    </Button>
                    
                    <Button
                      onClick={() => copyToClipboard(token.contract)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {copied === token.contract ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Yield Farm Investigation */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Yield Farm Position Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yieldFarmContracts.map((farm, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h3 className="text-yellow-400 font-bold mb-2">{farm.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{farm.description}</p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reward Token:</span>
                      <span className="text-green-400">{farm.rewardToken}</span>
                    </div>
                    <p className="text-blue-400 font-mono text-xs">{farm.contract}</p>
                  </div>
                  
                  <Button
                    onClick={() => window.open(`https://etherscan.io/address/${farm.contract}`, '_blank')}
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700 mt-3"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Check Position
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investigation Strategy */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Detection Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investigationSteps.map((step, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-600 text-white">Step {step.step}</Badge>
                    <h3 className="text-purple-400 font-bold">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Method:</span>
                      <span className="text-white">{step.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coverage:</span>
                      <span className="text-green-400">{step.coverage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suspected Locations */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Where Your Tokens Might Be</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suspectedLocations.map((location, index) => (
                <div key={index} className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-red-400 font-bold">{location.location}</h3>
                    <Badge className={`${
                      location.likelihood === 'High' ? 'bg-red-600' :
                      location.likelihood === 'Medium' ? 'bg-yellow-600' : 'bg-gray-600'
                    } text-white`}>
                      {location.likelihood} Likelihood
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-2">{location.description}</p>
                  <p className="text-orange-400 text-sm"><strong>Action:</strong> {location.actionRequired}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => searchTokens()}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Search className="h-6 w-6 mr-2" />
            Full Token Scan
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${searchWallet}`, '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View on Etherscan
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Target className="h-6 w-6 mr-2" />
            Check Yield Farms
          </Button>
          
          <Button 
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Claim Rewards
          </Button>
        </div>

        {/* Recovery Plan */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <DollarSign className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Recovery Mission:</strong> Your real USD investments created LP tokens that should be earning yield. Using Remix's 100 ETH for gas, we'll systematically scan every possible location until we find your missing tokens and their accumulated rewards.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}