import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  Fuel,
  DollarSign,
  Zap,
  Upload
} from "lucide-react";

export default function ContractVerificationCenter() {
  const [copied, setCopied] = useState("");
  const [showSourceCode, setShowSourceCode] = useState(false);

  const contractData = {
    address: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    name: "ETHG Recovery Token",
    symbol: "ETHGR",
    decimals: 18,
    totalSupply: "1,990,000",
    compiler: "v0.8.19+commit.7dd6d404",
    optimization: "Yes with 200 runs"
  };

  const gasAnalysis = {
    currentETH: "0.01444535 ETH",
    currentUSD: "$34.93",
    swapGasNeeded: "0.015-0.025 ETH",
    swapGasUSD: "$36-60",
    status: "BORDERLINE - Need more ETH",
    recommendation: "Get 0.01 ETH more for safe trading"
  };

  const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    mapping(address => bool) public hasMigrated;
    
    constructor() ERC20("ETHG Recovery Token", "ETHGR") {}
    
    function migrateMyTrappedETHG() external {
        require(!hasMigrated[msg.sender], "Migration already completed");
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, 1990000 * 10**decimals());
        emit TokensMigrated(msg.sender, 1990000 * 10**decimals());
    }
    
    event TokensMigrated(address indexed user, uint256 amount);
}`;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const verificationSteps = [
    {
      step: 1,
      title: "Go to Etherscan Verification",
      action: () => window.open(`https://etherscan.io/verifyContract?a=${contractData.address}`, '_blank'),
      buttonText: "Open Verification"
    },
    {
      step: 2,
      title: "Select 'Single file'",
      action: null,
      buttonText: null
    },
    {
      step: 3,
      title: "Copy Contract Source Code",
      action: () => copyToClipboard(sourceCode, "source"),
      buttonText: copied === "source" ? "Copied!" : "Copy Source"
    },
    {
      step: 4,
      title: "Submit Verification",
      action: null,
      buttonText: null
    }
  ];

  const gasSolutions = [
    {
      solution: "Bridge ETH from L2",
      description: "Transfer ETH from Polygon/Arbitrum to mainnet",
      cost: "~$5-10 bridge fees",
      timeframe: "10-30 minutes"
    },
    {
      solution: "Buy ETH on Coinbase",
      description: "Purchase 0.02 ETH directly to your wallet",
      cost: "$48 + fees",
      timeframe: "Immediate"
    },
    {
      solution: "Smaller Test Trade",
      description: "Trade 500K tokens instead of full amount",
      cost: "Lower gas, same rate",
      timeframe: "Immediate"
    },
    {
      solution: "Wait for Lower Gas",
      description: "Monitor gas prices and trade during low periods",
      cost: "Current gas varies",
      timeframe: "Few hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Contract Verification & Gas Center
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Verify your ETHGR contract and solve gas fee challenges
          </p>
        </div>

        {/* Critical Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert className="border-orange-500 bg-orange-500/10">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-200">
              <strong>Contract Verification Needed:</strong> Verify on Etherscan for trading confidence and price visibility.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-red-500 bg-red-500/10">
            <Fuel className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-200">
              <strong>Gas Warning:</strong> Current ETH may be insufficient for large trades. Consider smaller amounts or adding ETH.
            </AlertDescription>
          </Alert>
        </div>

        {/* Gas Analysis */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white">Gas Fee Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h5 className="text-blue-400 font-medium mb-2">Your ETH</h5>
                <p className="text-white text-lg font-bold">{gasAnalysis.currentETH}</p>
                <p className="text-blue-300">{gasAnalysis.currentUSD}</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                <h5 className="text-orange-400 font-medium mb-2">Gas Needed</h5>
                <p className="text-white text-lg font-bold">{gasAnalysis.swapGasNeeded}</p>
                <p className="text-orange-300">{gasAnalysis.swapGasUSD}</p>
              </div>
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded text-center">
                <h5 className="text-red-400 font-medium mb-2">Status</h5>
                <p className="text-white text-sm font-bold">{gasAnalysis.status}</p>
                <Badge className="bg-red-600 text-white mt-1">Action Needed</Badge>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h5 className="text-green-400 font-medium mb-2">Solution</h5>
                <p className="text-white text-sm">{gasAnalysis.recommendation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Verification */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Contract Verification Steps</CardTitle>
            <CardDescription className="text-gray-400">
              Verify your ETHGR contract on Etherscan for transparency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{step.title}</h5>
                  </div>
                  {step.action && (
                    <Button 
                      onClick={step.action}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {step.step === 1 ? <ExternalLink className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {step.buttonText}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Details */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Contract Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-3 bg-gray-700/50 rounded">
                  <span className="text-gray-400 text-sm">Contract Address:</span>
                  <p className="text-white font-mono text-sm break-all">{contractData.address}</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded">
                  <span className="text-gray-400 text-sm">Token Name:</span>
                  <p className="text-white">{contractData.name}</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded">
                  <span className="text-gray-400 text-sm">Symbol:</span>
                  <p className="text-white">{contractData.symbol}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-700/50 rounded">
                  <span className="text-gray-400 text-sm">Total Supply:</span>
                  <p className="text-white">{contractData.totalSupply}</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded">
                  <span className="text-gray-400 text-sm">Compiler:</span>
                  <p className="text-white">{contractData.compiler}</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded">
                  <span className="text-gray-400 text-sm">Optimization:</span>
                  <p className="text-white">{contractData.optimization}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Code */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Contract Source Code
              <Button 
                onClick={() => setShowSourceCode(!showSourceCode)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {showSourceCode ? "Hide" : "Show"} Code
              </Button>
            </CardTitle>
          </CardHeader>
          {showSourceCode && (
            <CardContent>
              <Textarea 
                value={sourceCode}
                readOnly
                className="font-mono text-sm h-64 bg-gray-900 text-green-400"
              />
              <Button 
                onClick={() => copyToClipboard(sourceCode, "fullSource")}
                className="mt-3 bg-green-600 hover:bg-green-700"
              >
                {copied === "fullSource" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Full Source
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Gas Solutions */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Gas Fee Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gasSolutions.map((solution, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h5 className="text-yellow-400 font-medium mb-2">{solution.solution}</h5>
                  <p className="text-gray-300 text-sm mb-2">{solution.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-yellow-300">Cost: {solution.cost}</span>
                    <span className="text-yellow-300">Time: {solution.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractData.address}`, '_blank')}
          >
            <Upload className="h-6 w-6 mr-2" />
            Verify Contract
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open('https://www.coinbase.com/price/ethereum', '_blank')}
          >
            <DollarSign className="h-6 w-6 mr-2" />
            Buy ETH
          </Button>
          
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-lg py-8"
            onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
          >
            <Zap className="h-6 w-6 mr-2" />
            Small Test Trade
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={() => window.open('https://etherscan.io/gastracker', '_blank')}
          >
            <Fuel className="h-6 w-6 mr-2" />
            Gas Tracker
          </Button>
        </div>
      </div>
    </div>
  );
}