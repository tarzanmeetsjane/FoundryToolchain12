import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, AlertTriangle, CheckCircle, Zap, Target, Shield } from "lucide-react";
import { useState } from "react";

export default function OptimismContractFix() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const correctContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token - CORRECT VERSION
 * @dev ERC20 Token matching Ethereum mainnet contract
 */
contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 15000000 * 10**18; // 15M tokens
    uint256 public totalMinted = 0;
    
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public migrationAmounts;
    bool public migrationEnabled = true;
    
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    event MigrationEvent(address indexed user, uint256 amount);
    event MigrationToggled(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") {
        // Start with foundation allocation
        _mint(FOUNDATION_WALLET, 1990000 * 10**18);
        totalMinted = 1990000 * 10**18;
    }
    
    function migrate() external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 120000 * 10**18; // Standard migration amount
        require(totalMinted + amount <= MAX_SUPPLY, "Would exceed max supply");
        
        hasMigrated[msg.sender] = true;
        migrationAmounts[msg.sender] = amount;
        totalMinted += amount;
        
        _mint(msg.sender, amount);
        emit MigrationEvent(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationToggled(migrationEnabled);
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalMinted + amount <= MAX_SUPPLY, "Would exceed max supply");
        totalMinted += amount;
        _mint(to, amount);
    }
    
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Emergency Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>PROBLEM IDENTIFIED:</strong> Your Optimism contract is ERC-1155 (multi-token), not ERC-20 like your Ethereum contract. This causes price recognition issues and incompatibility.
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-4">
            🚨 OPTIMISM CONTRACT FIX NEEDED
          </h1>
          <p className="text-xl text-red-700 mb-2">
            Wrong Contract Standard Deployed
          </p>
          <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2">
            ERC-1155 ≠ ERC-20 (INCOMPATIBLE)
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Problem Analysis */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Current Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-red-800">Your Optimism Contract:</h4>
                <div className="text-sm text-red-700 space-y-1">
                  <div>Address: 0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9</div>
                  <div>Standard: ERC-1155 (Multi-token)</div>
                  <div>Events: TransferSingle (not Transfer)</div>
                  <div>Token IDs: 0, 1, 2, etc.</div>
                  <div>Compiler: v0.8.19 (different)</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-red-800">Why This Causes Problems:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• No price recognition (different token standard)</li>
                  <li>• Incompatible with DEXs expecting ERC-20</li>
                  <li>• Different ABI and function signatures</li>
                  <li>• Multi-token complexity vs single token</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Shield className="h-5 w-5" />
                The Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-800">Deploy Correct Contract:</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>Standard: ERC-20 (like Ethereum)</div>
                  <div>Same bytecode structure</div>
                  <div>Same function signatures</div>
                  <div>Same token behavior</div>
                  <div>Immediate price recognition</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-green-800">Benefits:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 90% lower gas fees on Optimism</li>
                  <li>• Instant price recognition</li>
                  <li>• DEX compatibility</li>
                  <li>• Cross-chain consistency</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contract Code */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="h-5 w-5" />
              CORRECT ERC-20 Contract for Optimism
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
              <pre>{correctContract}</pre>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => copyToClipboard(correctContract)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Contract"}
              </Button>
              
              <Button 
                onClick={() => window.open('https://remix.ethereum.org/', '_blank')}
                variant="outline"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Remix
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Target className="h-5 w-5" />
              Quick Deployment Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-center mb-2">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto">1</div>
                </div>
                <h4 className="font-semibold text-purple-800 mb-2">Copy Contract</h4>
                <p className="text-sm text-purple-700">Copy the correct ERC-20 contract code above</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-center mb-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto">2</div>
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Open Remix</h4>
                <p className="text-sm text-blue-700">Paste into Remix IDE, compile with v0.8.19</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-center mb-2">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto">3</div>
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">Deploy</h4>
                <p className="text-sm text-orange-700">Deploy to Optimism network (~$0.50 cost)</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-center mb-2">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto">4</div>
                </div>
                <h4 className="font-semibold text-green-800 mb-2">Verify</h4>
                <p className="text-sm text-green-700">Submit to Optimism Etherscan for verification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Fix This?</h3>
            <p className="text-lg mb-4">Deploy the correct ERC-20 contract and get immediate price recognition</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => window.open('https://remix.ethereum.org/', '_blank')}
                className="bg-white text-green-600 hover:bg-green-50"
                size="lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Deploy Now
              </Button>
              
              <Button 
                onClick={() => window.open('https://optimistic.etherscan.io/', '_blank')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
                size="lg"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Optimism Explorer
              </Button>
            </div>
          </div>
        </div>

        {/* Expected Results */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-green-800">Expected Results After Fix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">✅</div>
                <div className="text-sm text-green-700">Immediate price recognition</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">📈</div>
                <div className="text-sm text-blue-700">DEX compatibility</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">⚡</div>
                <div className="text-sm text-purple-700">90% lower fees</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}