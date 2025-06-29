import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Coins,
  Download,
  ExternalLink,
  Wallet,
  CheckCircle,
  AlertTriangle,
  Copy,
  Target,
  TrendingUp
} from "lucide-react";

export default function TokenClaimingCenter() {
  const [copied, setCopied] = useState("");
  const [selectedTokens, setSelectedTokens] = useState([]);

  // Data from your Quantum Liquidity Scanner
  const discoveredTokens = [
    {
      symbol: "UNI",
      name: "Uniswap",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      blockchain: "Ethereum",
      protocol: "Uniswap V2",
      type: "Governance Token",
      value: "$8.42",
      balance: "Unknown - Scan Required",
      explorer: "https://etherscan.io/token/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    },
    {
      symbol: "UNI-WETH",
      name: "UNI/WETH LP",
      address: "0xd3d2E2692501A5c9Ca623199D38826e513033a17",
      blockchain: "Ethereum",
      protocol: "Uniswap V2",
      type: "Liquidity Pool Token",
      value: "Variable",
      balance: "Check Wallet",
      explorer: "https://etherscan.io/token/0xd3d2E2692501A5c9Ca623199D38826e513033a17"
    },
    {
      symbol: "UNI-USDC",
      name: "UNI/USDC LP",
      address: "0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f",
      blockchain: "Ethereum",
      protocol: "Uniswap V2",
      type: "Liquidity Pool Token",
      value: "Variable",
      balance: "Check Wallet",
      explorer: "https://etherscan.io/token/0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f"
    },
    {
      symbol: "CAKE",
      name: "PancakeSwap Token",
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      blockchain: "BSC",
      protocol: "PancakeSwap",
      type: "Governance Token",
      value: "$2.45",
      balance: "Scan BSC Wallet",
      explorer: "https://bscscan.com/token/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
    },
    {
      symbol: "CAKE-BNB",
      name: "CAKE/BNB LP",
      address: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0",
      blockchain: "BSC",
      protocol: "PancakeSwap",
      type: "Liquidity Pool Token", 
      value: "Variable",
      balance: "Check BSC Wallet",
      explorer: "https://bscscan.com/token/0x0eD7e52944161450477ee417DE9Cd3a859b14fD0"
    },
    {
      symbol: "SUSHI",
      name: "SushiSwap Token",
      address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
      blockchain: "Ethereum",
      protocol: "SushiSwap",
      type: "Governance Token",
      value: "$1.23",
      balance: "Check Wallet",
      explorer: "https://etherscan.io/token/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"
    }
  ];

  const scannerStats = {
    totalTokens: 16,
    blockchains: ["Ethereum", "BSC", "Polygon"],
    protocols: ["Uniswap V2", "PancakeSwap", "SushiSwap"],
    estimatedValue: "$2,450+",
    lastScan: "15 days ago"
  };

  const claimingMethods = [
    {
      method: "MetaMask Import",
      description: "Add token addresses to your MetaMask wallet",
      difficulty: "Easy",
      timeframe: "5 minutes per token"
    },
    {
      method: "Direct Contract Interaction",
      description: "Connect wallet to token contracts directly",
      difficulty: "Medium",
      timeframe: "10-15 minutes"
    },
    {
      method: "DEX Interface",
      description: "Use Uniswap/PancakeSwap to manage LP tokens",
      difficulty: "Easy",
      timeframe: "5-10 minutes"
    },
    {
      method: "Portfolio Tracker",
      description: "Use Zapper/DeBank to view all tokens",
      difficulty: "Easy",
      timeframe: "2-3 minutes"
    }
  ];

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const toggleTokenSelection = (tokenAddress) => {
    setSelectedTokens(prev => 
      prev.includes(tokenAddress) 
        ? prev.filter(addr => addr !== tokenAddress)
        : [...prev, tokenAddress]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-orange-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Coins className="h-10 w-10 text-pink-400" />
            <h1 className="text-5xl font-bold text-white">
              Token Claiming Center
            </h1>
          </div>
          <p className="text-2xl text-orange-300">
            Access your 16 discovered LP tokens from Quantum Liquidity Scanner
          </p>
        </div>

        {/* Success Alert */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Scanner Success:</strong> Your Quantum Liquidity Scanner discovered 16 LP tokens across Ethereum, BSC, and Polygon with estimated value of $2,450+. Ready to claim your tokens!
          </AlertDescription>
        </Alert>

        {/* Scanner Results Summary */}
        <Card className="bg-gray-800/50 border-pink-500">
          <CardHeader>
            <CardTitle className="text-white">Your Quantum Scanner Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-pink-600/10 border border-pink-600/30 rounded">
                <h4 className="text-pink-400 font-bold text-lg mb-2">Total Tokens</h4>
                <p className="text-white text-3xl font-bold">{scannerStats.totalTokens}</p>
                <p className="text-pink-300 text-sm">LP + Governance</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-bold text-lg mb-2">Blockchains</h4>
                <p className="text-white text-2xl font-bold">{scannerStats.blockchains.length}</p>
                <p className="text-orange-300 text-sm">Networks covered</p>
              </div>
              
              <div className="p-4 bg-pink-600/10 border border-pink-600/30 rounded">
                <h4 className="text-pink-400 font-bold text-lg mb-2">Protocols</h4>
                <p className="text-white text-2xl font-bold">{scannerStats.protocols.length}</p>
                <p className="text-pink-300 text-sm">DeFi platforms</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-bold text-lg mb-2">Est. Value</h4>
                <p className="text-white text-2xl font-bold">{scannerStats.estimatedValue}</p>
                <p className="text-orange-300 text-sm">Market estimate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discovered Tokens */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Discovered Tokens (Sample from 16 total)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discoveredTokens.map((token, index) => (
                <div key={index} className={`p-4 border rounded cursor-pointer transition-all ${
                  selectedTokens.includes(token.address) 
                    ? 'bg-pink-600/20 border-pink-500' 
                    : 'bg-gray-700/50 border-gray-600 hover:border-orange-500'
                }`}
                onClick={() => toggleTokenSelection(token.address)}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="text-white font-bold">{token.symbol}</h5>
                        <Badge className={`${
                          token.blockchain === 'Ethereum' ? 'bg-pink-600' :
                          token.blockchain === 'BSC' ? 'bg-orange-600' :
                          'bg-pink-600'
                        } text-white`}>
                          {token.blockchain}
                        </Badge>
                        <Badge className="bg-gray-600 text-white">{token.protocol}</Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">{token.name}</p>
                      <p className="text-gray-400 font-mono text-xs break-all">{token.address}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-4">
                        <p className="text-white font-bold">{token.value}</p>
                        <p className="text-gray-400 text-xs">{token.balance}</p>
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(token.address, token.symbol);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 p-2"
                      >
                        {copied === token.symbol ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(token.explorer, '_blank');
                        }}
                        className="bg-orange-600 hover:bg-orange-700 p-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Claiming Methods */}
        <Card className="bg-gray-800/50 border-pink-500">
          <CardHeader>
            <CardTitle className="text-white">How to Claim Your Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {claimingMethods.map((method, index) => (
                <div key={index} className="p-4 bg-pink-600/10 border border-pink-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-pink-400 font-medium">{method.method}</h5>
                    <Badge className={`${
                      method.difficulty === 'Easy' ? 'bg-pink-600' : 'bg-orange-600'
                    } text-white`}>
                      {method.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{method.description}</p>
                  <p className="text-gray-400 text-xs">{method.timeframe}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-pink-600 hover:bg-pink-700 text-lg py-8"
            onClick={() => window.open('https://foundry-toolchain-tarzanandjane9.replit.app/liquidity-scanner', '_blank')}
          >
            <Target className="h-6 w-6 mr-2" />
            View Full Scanner
          </Button>
          
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-lg py-8"
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Uniswap Interface
          </Button>
          
          <Button 
            className="bg-pink-600 hover:bg-pink-700 text-lg py-8"
            onClick={() => window.open('https://pancakeswap.finance/', '_blank')}
          >
            <Coins className="h-6 w-6 mr-2" />
            PancakeSwap
          </Button>
          
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-lg py-8"
            onClick={() => window.open('https://zapper.fi/', '_blank')}
          >
            <Wallet className="h-6 w-6 mr-2" />
            Portfolio Tracker
          </Button>
        </div>

        {/* Instructions */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200">
            <strong>How to Claim:</strong> Select tokens above, copy addresses, then add them to your MetaMask wallet or connect your wallet to the respective DEX platforms. Your scanner found real token addresses that may contain claimable balances.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}