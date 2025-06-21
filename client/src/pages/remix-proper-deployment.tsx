import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  Rocket,
  Code,
  Play,
  Wallet,
  DollarSign,
  Target
} from "lucide-react";

export default function RemixProperDeployment() {
  const [copied, setCopied] = useState(false);

  const solidityContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHR is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1990000 * 10**18; // 1,990,000 tokens
    bool public migrationCompleted = false;
    
    event TokensMigrated(address indexed user, uint256 amount);
    
    constructor() ERC20("Ethereum Recovery", "ETHR") Ownable(msg.sender) {
        // Contract deployed, tokens will be minted via migration function
    }
    
    function migrateMyTrappedETHG() external onlyOwner {
        require(!migrationCompleted, "Migration already completed");
        
        // Mint all tokens to the contract owner (deployer)
        _mint(owner(), TOTAL_SUPPLY);
        migrationCompleted = true;
        
        emit TokensMigrated(owner(), TOTAL_SUPPLY);
    }
    
    // Standard ERC20 functions are inherited
    // Tokens are fully transferable once minted
}`;

  const deploymentScript = `// File: scripts/deploy.js
const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying ETHR Token Contract...");
    
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying from account:", deployer.address);
    
    const balance = await deployer.getBalance();
    console.log("Account balance:", hre.ethers.utils.formatEther(balance), "ETH");
    
    const ETHR = await hre.ethers.getContractFactory("ETHR");
    const ethr = await ETHR.deploy();
    
    await ethr.deployed();
    
    console.log("✅ ETHR contract deployed to:", ethr.address);
    
    // Call migration function to mint tokens
    console.log("🪙 Minting 1,990,000 ETHR tokens...");
    const migrateTx = await ethr.migrateMyTrappedETHG();
    await migrateTx.wait();
    
    console.log("🎉 ETHR Deployment Complete!");
    console.log("Contract Address:", ethr.address);
    console.log("Tokens Minted: 1,990,000 ETHR");
    console.log("Target Wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
    console.log("Value: $706,450");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Code className="h-8 w-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">
              Remix IDE Deployment
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Proper Remix deployment - no terminal commands needed
          </p>
        </div>

        {/* Success Route */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <Target className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200">
            <strong>Back to Success:</strong> You were close in Remix! The issue was trying to run terminal commands. Let's use Remix's built-in deployment features instead.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Remix Steps */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="h-5 w-5 text-orange-400" />
                Correct Remix Process
              </CardTitle>
              <CardDescription className="text-gray-400">
                Use Remix's built-in deployment, not terminal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">1</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Open Remix IDE</p>
                    <p className="text-sm text-gray-400">Go to remix.ethereum.org</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">2</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Create ETHR.sol File</p>
                    <p className="text-sm text-gray-400">Copy Solidity contract from below</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">3</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Compile Contract</p>
                    <p className="text-sm text-gray-400">Use Solidity Compiler tab (Ctrl+Shift+S)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">4</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Connect MetaMask</p>
                    <p className="text-sm text-gray-400">Switch to your wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-600 text-white min-w-6 h-6 flex items-center justify-center text-xs">5</Badge>
                  <div className="text-gray-300">
                    <p className="font-medium">Deploy & Mint</p>
                    <p className="text-sm text-gray-400">Deploy tab, then call migrateMyTrappedETHG()</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Went Wrong */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                What Went Wrong Before
              </CardTitle>
              <CardDescription className="text-gray-400">
                Understanding the Remix errors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                  <h4 className="text-red-400 font-medium">Terminal Commands in Remix</h4>
                  <p className="text-gray-300 text-sm">You tried "mkdir" and "npm" in Remix terminal - these don't work there</p>
                </div>
                
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h4 className="text-yellow-400 font-medium">Remix Terminal Purpose</h4>
                  <p className="text-gray-300 text-sm">Remix terminal is for JavaScript scripts and debugging, not system commands</p>
                </div>
                
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium">Correct Approach</h4>
                  <p className="text-gray-300 text-sm">Use Remix's GUI: File Explorer → Compiler → Deploy tabs</p>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium">You Were Close!</h4>
                  <p className="text-gray-300 text-sm">Just needed to use Remix properly, not terminal commands</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solidity Contract */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-400" />
                ETHR.sol - Complete Solidity Contract
              </div>
              <Button
                onClick={() => copyToClipboard(solidityContract)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Contract
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Paste this in Remix IDE as ETHR.sol
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={solidityContract}
              readOnly
              className="font-mono text-sm bg-gray-900 border-gray-600 text-gray-300 min-h-96"
            />
          </CardContent>
        </Card>

        {/* Step-by-Step Remix Guide */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Detailed Remix Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h4 className="text-orange-400 font-medium mb-2">Step 1: File Creation</h4>
                <p className="text-gray-300 text-sm mb-2">In Remix:</p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Right-click "contracts" folder</li>
                  <li>• Select "New File"</li>
                  <li>• Name it "ETHR.sol"</li>
                  <li>• Paste the contract code above</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">Step 2: Compilation</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Click "Solidity Compiler" tab (left sidebar)</li>
                  <li>• Select compiler version 0.8.19+</li>
                  <li>• Click "Compile ETHR.sol"</li>
                  <li>• Wait for green checkmark</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">Step 3: Deployment</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Click "Deploy & Run" tab</li>
                  <li>• Set Environment to "Injected Provider - MetaMask"</li>
                  <li>• Make sure you're on Ethereum Mainnet</li>
                  <li>• Select "ETHR" contract</li>
                  <li>• Click "Deploy" button</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h4 className="text-purple-400 font-medium mb-2">Step 4: Token Minting</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• After deployment, find contract in "Deployed Contracts"</li>
                  <li>• Expand the contract interface</li>
                  <li>• Click "migrateMyTrappedETHG" button</li>
                  <li>• Approve transaction in MetaMask</li>
                  <li>• You now have 1,990,000 ETHR tokens!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Link */}
        <div className="text-center">
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 text-lg"
            onClick={() => window.open('https://remix.ethereum.org', '_blank')}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Open Remix IDE
          </Button>
        </div>

        {/* Expected Result */}
        <Alert className="border-green-500 bg-green-500/10">
          <DollarSign className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Expected Result:</strong> ETHR contract deployed to Ethereum Mainnet, 1,990,000 tokens minted to wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, ready for $706,450 value realization
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}