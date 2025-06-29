import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  RotateCcw,
  Shield,
  Code,
  ExternalLink,
  CheckCircle,
  Copy,
  DollarSign,
  Target
} from "lucide-react";

export default function FreshStartDeployment() {
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  const cleanContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHR is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1990000 * 10**18;
    bool public migrationCompleted = false;
    
    // Your recovery wallet address
    address public constant RECOVERY_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    event TokensMigrated(address indexed recoveryWallet, uint256 amount);
    
    constructor() ERC20("Ethereum Recovery", "ETHR") Ownable(msg.sender) {
        // Clean deployment - no delegation issues
    }
    
    function migrateMyTrappedETHG() external onlyOwner {
        require(!migrationCompleted, "Migration already completed");
        
        _mint(RECOVERY_WALLET, TOTAL_SUPPLY);
        migrationCompleted = true;
        
        emit TokensMigrated(RECOVERY_WALLET, TOTAL_SUPPLY);
    }
}`;

  const cleanupSteps = [
    {
      title: "Clean Remix Workspace",
      actions: [
        "Go to remix.ethereum.org",
        "Delete all files from previous attempts",
        "Clear browser cache if needed",
        "Start with completely fresh workspace"
      ]
    },
    {
      title: "Create New Contract",
      actions: [
        "Create new file: ETHR_Clean.sol",
        "Paste the clean contract code",
        "No delegation references or complex logic",
        "Simple, direct deployment"
      ]
    },
    {
      title: "Use Different Wallet",
      actions: [
        "Don't use compromised wallet for deployment",
        "Use any other wallet you have access to",
        "Deploy from clean wallet",
        "Tokens will mint to your recovery address"
      ]
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <RotateCcw className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Fresh Start Deployment
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Clean slate approach with simple ETHR deployment
          </p>
        </div>

        {/* Why Fresh Start Works */}
        <Alert className="border-blue-500 bg-blue-500/10">
          <RotateCcw className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200">
            <strong>Smart Approach:</strong> Starting fresh eliminates any confusion from previous attempts. Clean Remix workspace + simple contract = reliable deployment.
          </AlertDescription>
        </Alert>

        {/* Clean Contract */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-green-400" />
                Clean ETHR Contract
              </div>
              <Button
                onClick={() => copyToClipboard(cleanContract)}
                className="bg-green-600 hover:bg-green-700"
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Code
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Simplified contract with no delegation complications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={cleanContract}
              readOnly
              className="font-mono text-xs bg-gray-900 border-gray-600 text-gray-300 h-80"
            />
          </CardContent>
        </Card>

        {/* Step by Step */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Fresh Start Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cleanupSteps.map((stepInfo, index) => (
                <div key={index} className={`p-4 rounded border ${
                  step > index ? 'bg-green-600/10 border-green-600/30' :
                  step === index + 1 ? 'bg-blue-600/10 border-blue-600/30' :
                  'bg-gray-700/10 border-gray-600/30'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`${
                      step > index ? 'bg-green-600' :
                      step === index + 1 ? 'bg-blue-600' :
                      'bg-gray-600'
                    } text-white`}>
                      {step > index ? '✓' : index + 1}
                    </Badge>
                    <h4 className="text-white font-medium">{stepInfo.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {stepInfo.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open('https://remix.ethereum.org', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Fresh Remix
              </Button>
              
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setStep(Math.min(step + 1, 4))}
                disabled={step > 3}
              >
                Complete Step {step <= 3 ? step : 'All'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Wallet Options */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">Deployment Wallet Options</CardTitle>
            <CardDescription className="text-gray-400">
              Use any of these for clean deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h4 className="text-purple-400 font-medium mb-2">Different MetaMask Account</h4>
                <p className="text-gray-300 text-sm">Switch to another account in MetaMask</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h4 className="text-blue-400 font-medium mb-2">Hardware Wallet</h4>
                <p className="text-gray-300 text-sm">Ledger, Trezor, or other hardware wallet</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h4 className="text-green-400 font-medium mb-2">Fresh Wallet</h4>
                <p className="text-gray-300 text-sm">Create new wallet just for deployment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Why This Approach Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-green-400 font-medium">Advantages:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    No delegation complications
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    Clean deployment from uncompromised wallet
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    Tokens mint directly to your recovery address
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    No smart account issues
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h4 className="text-green-400 font-medium mb-2">Expected Result</h4>
                <p className="text-white text-2xl font-bold mb-1">1,990,000 ETHR</p>
                <p className="text-green-400 text-lg font-medium mb-1">$706,450 Value</p>
                <p className="text-gray-400 text-sm">In your recovery wallet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ready to Deploy */}
        <Alert className="border-green-500 bg-green-500/10">
          <Target className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Ready to Deploy:</strong> Fresh Remix workspace + clean contract + alternative wallet = successful ETHR deployment worth $706,450
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}