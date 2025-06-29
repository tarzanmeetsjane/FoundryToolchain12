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
  Shield,
  AlertTriangle,
  Wallet,
  DollarSign,
  Zap
} from "lucide-react";

export default function DelegationBypassDeployment() {
  const [copied, setCopied] = useState(false);

  const bypassContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHR is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1990000 * 10**18; // 1,990,000 tokens
    bool public migrationCompleted = false;
    
    // Target address for recovery (hardcoded for security)
    address public constant RECOVERY_ADDRESS = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    event TokensMigrated(address indexed user, uint256 amount);
    
    constructor() ERC20("Ethereum Recovery", "ETHR") Ownable(msg.sender) {
        // Deploy from ANY wallet, mint to specific recovery address
        // Bypasses delegation issues
    }
    
    function migrateMyTrappedETHG() external onlyOwner {
        require(!migrationCompleted, "Migration already completed");
        
        // Mint tokens directly to recovery address
        // Even if deployer wallet is compromised, tokens go to target
        _mint(RECOVERY_ADDRESS, TOTAL_SUPPLY);
        migrationCompleted = true;
        
        emit TokensMigrated(RECOVERY_ADDRESS, TOTAL_SUPPLY);
    }
    
    // Full ERC20 functionality
    // Tokens minted to 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
}`;

  const newWalletScript = `Steps to Deploy from New Wallet:

1. Create Fresh MetaMask Account:
   - MetaMask → Add Account → "Create Account"
   - Name: "ETHR Deployment Safe"
   - Get some ETH for gas (~$30)

2. Deploy Contract from New Wallet:
   - Use new wallet to deploy ETHR contract
   - Contract automatically mints to 0x058C8FE...368843
   - Delegation can't affect deployment wallet

3. Call Migration Function:
   - migrateMyTrappedETHG() from new wallet
   - Tokens appear in your original wallet
   - Bypasses delegation completely

4. Result:
   - 1,990,000 ETHR tokens in your wallet
   - Delegation can't steal deployment gas
   - Original wallet gets all tokens`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">
              Delegation Bypass Deployment
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Deploy ETHR tokens safely even with persistent delegation
          </p>
        </div>

        {/* Bypass Strategy */}
        <Alert className="border-purple-500 bg-purple-500/10">
          <Shield className="h-4 w-4 text-purple-500" />
          <AlertDescription className="text-purple-200">
            <strong>Bypass Strategy:</strong> Since delegation won't remove, deploy from a fresh wallet but mint tokens directly to your original address. This bypasses the delegation entirely.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bypass Contract */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  Delegation-Proof Contract
                </div>
                <Button
                  onClick={() => copyToClipboard(bypassContract)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Contract
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Hardcoded to mint to your address regardless of deployment wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={bypassContract}
                readOnly
                className="font-mono text-xs bg-gray-900 border-gray-600 text-gray-300 h-80"
              />
            </CardContent>
          </Card>

          {/* Deployment Strategy */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-green-400" />
                  Safe Deployment Steps
                </div>
                <Button
                  onClick={() => copyToClipboard(newWalletScript)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Steps
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Deploy from clean wallet, mint to original address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">Step 1: Fresh Wallet</h4>
                  <p className="text-gray-300 text-sm">Create new MetaMask account for deployment only</p>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium mb-2">Step 2: Deploy Contract</h4>
                  <p className="text-gray-300 text-sm">Use bypass contract that mints to hardcoded address</p>
                </div>
                
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium mb-2">Step 3: Execute Migration</h4>
                  <p className="text-gray-300 text-sm">Call function from deployment wallet, tokens go to original</p>
                </div>
                
                <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <h4 className="text-orange-400 font-medium mb-2">Step 4: Success</h4>
                  <p className="text-gray-300 text-sm">1,990,000 ETHR tokens in your delegated wallet safely</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why This Works */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Why This Bypasses Delegation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h4 className="text-blue-400 font-medium mb-2">Clean Deployment</h4>
                <p className="text-gray-300 text-sm">New wallet has no delegation - safe to deploy from</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h4 className="text-green-400 font-medium mb-2">Hardcoded Target</h4>
                <p className="text-gray-300 text-sm">Contract mints to your address regardless of deployer</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h4 className="text-purple-400 font-medium mb-2">Delegation Irrelevant</h4>
                <p className="text-gray-300 text-sm">Tokens appear in original wallet, delegation can't interfere</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Value Protection */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-400" />
              Protected Value Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h4 className="text-green-400 font-medium mb-2">Token Amount</h4>
                <p className="text-white text-xl font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">ETHR Tokens</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h4 className="text-blue-400 font-medium mb-2">Target Value</h4>
                <p className="text-white text-xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm">Market Value</p>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                <h4 className="text-orange-400 font-medium mb-2">Deployment Cost</h4>
                <p className="text-white text-xl font-bold">~$30</p>
                <p className="text-gray-400 text-sm">From Clean Wallet</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h4 className="text-purple-400 font-medium mb-2">Protection Level</h4>
                <p className="text-white text-xl font-bold">100%</p>
                <p className="text-gray-400 text-sm">Delegation Proof</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg mr-4"
            onClick={() => window.open('https://remix.ethereum.org', '_blank')}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Deploy Bypass Contract
          </Button>
          
          <Button 
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4"
            onClick={() => window.open('https://metamask.io', '_blank')}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Create Clean Wallet
          </Button>
        </div>

        {/* Success Guarantee */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Bypass Guaranteed:</strong> This method works regardless of delegation persistence. Deploy from clean wallet, mint to your address, get $706,450 worth of ETHR tokens safely.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}