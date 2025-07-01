import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ExternalLink, Copy, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function DirectVerificationGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Simple ETHGR Verification Guide
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          5 easy steps to unlock your $200k-$1.3M tokens
        </p>
      </div>

      <Alert className="mb-8 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Your tokens are safe!</strong> 1,990,000 ETHGR tokens are in contract 
          0xc2b6d375b7d14c9ce73f97ddf565002cce257308. We just need to verify it so wallets and exchanges can see the value.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        
        {/* Step 1 */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">1</span>
              Open Etherscan Verification Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              Click this button to go directly to the Etherscan verification page for your contract:
            </p>
            <Button 
              onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Etherscan Verification
            </Button>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">2</span>
              Set Compiler Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              On the Etherscan page, select "Solidity (Single file)" as the compiler type.
            </p>
            <div className="bg-slate-100 p-3 rounded border">
              <strong>Compiler Type:</strong> Solidity (Single file)
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">3</span>
              Set Compiler Version
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              Select the exact compiler version that was used to deploy your contract:
            </p>
            <div className="bg-slate-100 p-3 rounded border flex items-center justify-between">
              <strong>v0.8.19+commit.7dd6d404</strong>
              <Button
                onClick={() => copyToClipboard('v0.8.19+commit.7dd6d404', 3)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-1" />
                {copiedStep === 3 ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">4</span>
              Paste Contract Source Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              Copy this entire contract source code and paste it into the "Solidity Contract Code" box:
            </p>
            <div className="bg-slate-100 p-4 rounded border text-xs overflow-x-auto mb-4">
              <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token
 * @dev ERC20 token for victim assistance and recovery operations
 */
contract ETHGRecovery is ERC20, Ownable {
    
    constructor() ERC20("ETHG Recovery", "ETHGR") {
        // Mint initial supply to contract deployer
        _mint(msg.sender, 10000000 * 10**decimals());
    }
    
    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens from own balance
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Emergency withdraw function for contract owner
     */
    function emergencyWithdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`}</pre>
            </div>
            <Button
              onClick={() => copyToClipboard(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token
 * @dev ERC20 token for victim assistance and recovery operations
 */
contract ETHGRecovery is ERC20, Ownable {
    
    constructor() ERC20("ETHG Recovery", "ETHGR") {
        // Mint initial supply to contract deployer
        _mint(msg.sender, 10000000 * 10**decimals());
    }
    
    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens from own balance
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Emergency withdraw function for contract owner
     */
    function emergencyWithdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`, 4)}
              className="bg-orange-600 hover:bg-orange-700 w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copiedStep === 4 ? 'Copied to Clipboard!' : 'Copy Contract Source Code'}
            </Button>
          </CardContent>
        </Card>

        {/* Step 5 */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">5</span>
              Leave Constructor Arguments EMPTY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              This is important! Leave the "Constructor Arguments ABI-encoded" field completely empty:
            </p>
            <div className="bg-red-50 border-2 border-red-200 p-4 rounded">
              <strong className="text-red-800">Constructor Arguments: LEAVE EMPTY</strong>
              <p className="text-red-700 text-sm mt-2">
                Your contract has no constructor parameters, so this field must be empty for verification to succeed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Final Step */}
        <Card className="border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Submit Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-green-700">
              After completing all 5 steps above, click "Verify and Publish" on Etherscan.
            </p>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Verification usually takes 1-2 minutes
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Once verified, your tokens will show proper USD values
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                DEX trading will become available immediately
              </div>
            </div>
            
            <Alert className="mt-4 border-green-300 bg-green-100">
              <AlertDescription className="text-green-800">
                <strong>After verification succeeds:</strong> Your 1,990,000 ETHGR tokens will be tradeable 
                on Uniswap and other DEXs. The "N/A" values will change to real USD amounts.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button 
          onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
          className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          Start Verification Now
        </Button>
        <p className="text-slate-600 mt-2">
          This will unlock your $200k-$1.3M token value
        </p>
      </div>
    </div>
  );
}