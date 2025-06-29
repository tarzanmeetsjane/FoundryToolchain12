import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, AlertTriangle, CheckCircle, Code, Settings } from "lucide-react";

export default function ContractDetails() {
  const [copied, setCopied] = useState(false);

  const contractInfo = {
    address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    name: "ETHG Recovery",
    symbol: "ETHGR",
    totalSupply: "1,990,000",
    compiler: "v0.8.19+commit.7dd6d404",
    license: "MIT"
  };

  const noConstructorCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        _mint(msg.sender, 1990000 * 10**18);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}`;

  const constructorArgsCode = `0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000001a5661dbcd0208fc00000000000000000000000000000000000000000000000000000000000000000d4554484720526563766572790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000545544847520000000000000000000000000000000000000000000000000000000`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Contract Verification Details
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete source code and settings for Etherscan verification of your ETHGR contract
        </p>
      </div>

      {/* Contract Info */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            Contract Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Contract Address:</div>
            <div className="font-mono text-sm bg-white p-2 rounded break-all flex items-center justify-between">
              <span>{contractInfo.address}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(contractInfo.address)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Token Details:</div>
            <div className="font-semibold">{contractInfo.name} ({contractInfo.symbol})</div>
            <div className="text-sm text-gray-600">Total Supply: {contractInfo.totalSupply}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Compiler Version:</div>
            <div className="font-mono text-sm">{contractInfo.compiler}</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">License:</div>
            <div className="font-semibold">{contractInfo.license}</div>
          </div>
        </CardContent>
      </Card>

      {/* Constructor Arguments Error Fix */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription>
          <div className="font-semibold text-amber-800 mb-2">Constructor Arguments Error Detected</div>
          <div className="text-amber-700 text-sm">
            The ABI-encoded constructor arguments in your verification form don't match the actual deployment. 
            Use the corrected version below or the no-constructor approach for easier verification.
          </div>
        </AlertDescription>
      </Alert>

      {/* Source Code Tabs */}
      <Tabs defaultValue="simple" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simple">Simple Verification (Recommended)</TabsTrigger>
          <TabsTrigger value="advanced">With Constructor Arguments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simple" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Simplified Contract Source (No Constructor Arguments)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    <div className="font-semibold text-green-800 mb-1">Recommended Approach</div>
                    <div className="text-green-700 text-sm">
                      This version has fixed parameters and requires no constructor arguments, making verification easier.
                    </div>
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold">Contract Source Code:</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(noConstructorCode)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                  </div>
                  <textarea
                    readOnly
                    className="w-full h-64 p-3 border rounded-lg font-mono text-xs bg-gray-50 resize-none"
                    value={noConstructorCode}
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="font-semibold mb-2">Verification Settings:</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Constructor Arguments:</strong> Leave empty</div>
                    <div><strong>Optimization:</strong> No</div>
                    <div><strong>Runs:</strong> 200</div>
                    <div><strong>License:</strong> MIT License (3)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-600" />
                Advanced Verification with Constructor Arguments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    <div className="font-semibold text-orange-800 mb-1">Advanced Option</div>
                    <div className="text-orange-700 text-sm">
                      Use this if you need the parametrized constructor version. Requires correct ABI encoding.
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <label className="font-semibold">Constructor Arguments (ABI-Encoded):</label>
                  <div className="flex items-center gap-2">
                    <textarea
                      readOnly
                      className="flex-1 p-3 border rounded-lg font-mono text-xs bg-gray-50 h-20 resize-none"
                      value={constructorArgsCode}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(constructorArgsCode)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="font-semibold mb-2">Constructor Parameters:</div>
                  <div className="space-y-1 text-sm">
                    <div><strong>name:</strong> "ETHG Recovery" (string)</div>
                    <div><strong>symbol:</strong> "ETHGR" (string)</div>
                    <div><strong>initialSupply:</strong> 1,990,000 * 10^18 (uint256)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          size="lg"
          onClick={() => window.open('https://etherscan.io/verifyContract', '_blank')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Open Etherscan Verification
        </Button>
        <Button 
          size="lg"
          variant="outline"
          onClick={() => window.open(`https://etherscan.io/address/${contractInfo.address}`, '_blank')}
          className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-4 px-8"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          View Contract on Etherscan
        </Button>
      </div>

      {/* Success Message */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="w-4 h-4" />
        <AlertDescription>
          <div className="font-semibold text-green-800 mb-2">Ready for Verification</div>
          <div className="text-green-700 text-sm space-y-1">
            <div>• Copy the simplified contract source code above</div>
            <div>• Leave constructor arguments empty</div>
            <div>• Set compiler to v0.8.19+commit.7dd6d404</div>
            <div>• Choose MIT License and submit verification</div>
            <div>• Value display will be restored within 6-24 hours</div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}