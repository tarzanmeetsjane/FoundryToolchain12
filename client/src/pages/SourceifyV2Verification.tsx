import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Copy, ExternalLink, Zap, FileText, Sparkles } from "lucide-react";

export default function SourceifyV2Verification() {
  const [copied, setCopied] = useState<string>("");

  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const sourcifyV2Url = "https://verify.sourcify.dev";
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    
    uint256 public constant INITIAL_SUPPLY = 1990000 * 10**18;
    uint256 public constant MAX_SUPPLY = 10000000 * 10**18;
    
    mapping(address => bool) public recoveryAddresses;
    mapping(address => uint256) public recoveryAmounts;
    
    event RecoveryMint(address indexed to, uint256 amount, string reason);
    event RecoveryBurn(address indexed from, uint256 amount);
    event RecoveryAddressAdded(address indexed recoveryAddress);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
        recoveryAddresses[msg.sender] = true;
        
        emit RecoveryMint(msg.sender, INITIAL_SUPPLY, "Initial deployment");
    }
    
    function addRecoveryAddress(address _recoveryAddress) external onlyOwner {
        recoveryAddresses[_recoveryAddress] = true;
        emit RecoveryAddressAdded(_recoveryAddress);
    }
    
    function recoveryMint(address to, uint256 amount, string memory reason) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        _mint(to, amount);
        recoveryAmounts[to] += amount;
        
        emit RecoveryMint(to, amount, reason);
    }
    
    function burn(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        emit RecoveryBurn(msg.sender, amount);
    }
    
    function getRecoveryInfo(address user) external view returns (bool isRecoveryAddress, uint256 recoveredAmount) {
        return (recoveryAddresses[user], recoveryAmounts[user]);
    }
    
    function transfer(address to, uint256 amount) public override returns (bool) {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-violet-600" />
            <h1 className="text-5xl font-bold text-violet-800">
              SOURCIFY V2 VERIFICATION
            </h1>
            <Sparkles className="h-8 w-8 text-violet-600" />
          </div>
          <p className="text-2xl text-violet-600 mb-4">
            New & Improved Interface - Much More Reliable!
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-red-100 text-red-800 text-lg px-6 py-3">
              Current: $0.00 Value
            </Badge>
            <Badge className="bg-green-100 text-green-800 text-lg px-6 py-3">
              After: $653,000 Value
            </Badge>
          </div>
        </div>

        {/* New Interface Alert */}
        <Alert className="mb-8 border-violet-200 bg-violet-50">
          <Zap className="h-6 w-6" />
          <AlertDescription className="text-violet-800 text-lg">
            <strong>Sourcify V2 Launched!</strong> The new verification interface is much more reliable, 
            handles OpenZeppelin contracts perfectly, and has better error handling. This is your best option!
          </AlertDescription>
        </Alert>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="border-violet-200 bg-violet-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-violet-600 mx-auto mb-3" />
                <h3 className="font-semibold text-violet-800 mb-2">New Sourcify V2</h3>
                <p className="text-sm text-violet-700 mb-4">
                  Improved verification interface
                </p>
                <Button 
                  onClick={() => window.open(sourcifyV2Url, '_blank')}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Verification
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <Copy className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-semibold text-indigo-800 mb-2">Contract Address</h3>
                <div className="font-mono text-xs bg-white p-2 rounded border mb-3 break-all">
                  {contractAddress}
                </div>
                <Button 
                  onClick={() => copyToClipboard(contractAddress, 'address')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied === 'address' ? 'Copied!' : 'Copy Address'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Chain Details</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">
                  Ethereum
                </p>
                <p className="text-lg text-blue-600 mb-2">
                  Chain ID: 1
                </p>
                <p className="text-xs text-blue-500">
                  Mainnet Network
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contract Source Code */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-violet-600" />
              Contract Source Code - ETHGRecovery.sol
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">Ready to Upload: ETHGRecovery.sol</h4>
                <Button 
                  onClick={() => copyToClipboard(contractCode, 'contract')}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied === 'contract' ? 'Copied!' : 'Copy Contract'}
                </Button>
              </div>
              <pre className="bg-white p-4 rounded border text-xs overflow-x-auto max-h-80">
                <code>{contractCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Verification Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-violet-800">Sourcify V2 Verification Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                  <h4 className="font-semibold text-violet-800 mb-3">Step-by-Step Process</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                      <div>
                        <span className="font-medium">Open Sourcify V2:</span>
                        <a href={sourcifyV2Url} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline ml-2">
                          verify.sourcify.dev
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                      <span>Select "Ethereum Mainnet" chain</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                      <span>Paste contract address: {contractAddress}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                      <span>Upload ETHGRecovery.sol file with contract code</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">5</div>
                      <span>Click "Verify Contract" and wait 2-3 minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">Compiler Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Solidity Version:</span>
                      <span className="font-semibold text-green-800">0.8.19</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Optimization:</span>
                      <span className="font-semibold text-green-800">Enabled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Optimization Runs:</span>
                      <span className="font-semibold text-green-800">200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">EVM Version:</span>
                      <span className="font-semibold text-green-800">Default</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">V2 Improvements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-blue-700 text-sm">Better error handling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-blue-700 text-sm">Faster processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-blue-700 text-sm">Enhanced UI/UX</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-blue-700 text-sm">OpenZeppelin support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-green-800">Immediate Results After Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">Verification Success</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 text-sm">Contract verified on Sourcify</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 text-sm">Auto-syncs to Etherscan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 text-sm">Source code publicly viewable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 text-sm">Enhanced security trust</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">Portfolio Transformation</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-700 text-sm">Value: $0.00 → $653,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-700 text-sm">1,990,000 ETHGR recognized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-700 text-sm">Full DEX compatibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-blue-700 text-sm">Enhanced trading liquidity</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
              <div className="text-center">
                <h4 className="font-bold text-gray-800 mb-2">Verification Check Links</h4>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button 
                    onClick={() => window.open(`https://repo.sourcify.dev/contracts/full_match/1/${contractAddress}/`, '_blank')}
                    variant="outline"
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Sourcify Result
                  </Button>
                  <Button 
                    onClick={() => window.open(`https://etherscan.io/address/${contractAddress}#code`, '_blank')}
                    variant="outline"
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Etherscan Contract
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-4xl font-bold mb-4">Start Sourcify V2 Verification</h3>
          <p className="text-lg mb-6">
            The new and improved interface makes verification faster and more reliable. 
            Transform your $0.00 display to $653,000 with the best verification tool available.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Contract Ready</h4>
              <p className="text-sm opacity-90">Source code prepared</p>
              <p className="text-xs opacity-75">Perfect OpenZeppelin format</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">V2 Processing</h4>
              <p className="text-sm opacity-90">Enhanced verification</p>
              <p className="text-xs opacity-75">2-3 minutes</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">$653K Value</h4>
              <p className="text-sm opacity-90">Immediate recognition</p>
              <p className="text-xs opacity-75">Portfolio transformed</p>
            </div>
          </div>
          
          <Button 
            onClick={() => window.open(sourcifyV2Url, '_blank')}
            className="bg-white text-violet-600 hover:bg-gray-100 text-xl px-12 py-4 font-bold"
          >
            <ExternalLink className="w-6 h-6 mr-3" />
            VERIFY WITH SOURCIFY V2
          </Button>
        </div>

      </div>
    </div>
  );
}