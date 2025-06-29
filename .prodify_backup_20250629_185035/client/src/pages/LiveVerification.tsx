import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Copy, ArrowRight, Zap, Target } from "lucide-react";
import { useState } from "react";

export default function LiveVerification() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  
  const contractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ETHG Recovery Token
 * @dev ERC20 Token for victim assistance and fund recovery
 */

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ETHGRecovery is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    uint256 private _totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;
    address public owner;
    
    bool public mintingEnabled = true;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event MintingDisabled();
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        name = "ETHG Recovery";
        symbol = "ETHGR";
        decimals = 18;
        owner = msg.sender;
        
        // Initial mint to contract deployer
        _mint(msg.sender, 1990000 * 10**decimals);
    }
    
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
    
    function allowance(address tokenOwner, address spender) public view override returns (uint256) {
        return _allowances[tokenOwner][spender];
    }
    
    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, currentAllowance - amount);
        
        return true;
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(_balances[sender] >= amount, "ERC20: transfer amount exceeds balance");
        
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
    
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");
        
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
    
    function _approve(address tokenOwner, address spender, uint256 amount) internal {
        require(tokenOwner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        
        _allowances[tokenOwner][spender] = amount;
        emit Approval(tokenOwner, spender, amount);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(mintingEnabled, "Minting is disabled");
        _mint(to, amount);
    }
    
    function disableMinting() public onlyOwner {
        mintingEnabled = false;
        emit MintingDisabled();
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
    
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Urgent Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <Badge className="px-4 py-2 text-sm bg-green-600 text-white">
              CONTRACT DEPLOYED - VERIFY NOW
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Contract Deployed Successfully!
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Contract {contractAddress} with 1,990,000 ETHGR tokens ready for Etherscan verification
          </p>
        </div>

        {/* Success Status */}
        <Alert className="border-green-300 bg-green-100">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>DEPLOYMENT SUCCESS:</strong> Your contract is live on Ethereum mainnet. Remix shows 1,990,000 ETHGR tokens minted to your wallet. Now verify on Etherscan to fix the "N/A" price display.
          </AlertDescription>
        </Alert>

        {/* Direct Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Step 1: Open Etherscan */}
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 text-xl flex items-center space-x-2">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">1</span>
                <span>Open Etherscan Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-red-700">Click to open the verification form with your contract address pre-filled</p>
              
              <div className="p-3 bg-white rounded-lg border">
                <strong>Contract:</strong>
                <div className="font-mono text-sm mt-1 break-all">{contractAddress}</div>
              </div>
              
              <Button 
                onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractAddress}`, '_blank')}
                className="w-full bg-red-600 hover:bg-red-700 text-lg py-4"
              >
                OPEN ETHERSCAN NOW <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Step 2: Settings */}
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 text-xl flex items-center space-x-2">
                <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">2</span>
                <span>Enter These Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="p-2 bg-white rounded border">
                  <strong>Compiler:</strong> v0.8.19+commit.7dd6d404
                </div>
                <div className="p-2 bg-white rounded border">
                  <strong>License:</strong> MIT License
                </div>
                <div className="p-2 bg-white rounded border">
                  <strong>Optimization:</strong> Yes (200 runs)
                </div>
                <div className="p-2 bg-white rounded border border-red-300 bg-red-50">
                  <strong>Constructor Args:</strong> LEAVE EMPTY
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Source Code Section */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-green-800 text-xl flex items-center space-x-2">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">3</span>
              <span>Copy Source Code</span>
            </CardTitle>
            <Button
              onClick={() => copyToClipboard(contractSource)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "COPIED!" : "COPY CODE"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-300 bg-green-100">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                Copy this source code and paste it into the "Enter the Solidity Contract Code" field on Etherscan
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-80">
              <pre className="text-sm whitespace-pre-wrap">
                <code>{contractSource}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Submit Action */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 text-xl flex items-center space-x-2">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">4</span>
              <span>Submit Verification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">5 min</div>
                <div className="text-sm text-blue-700">Submit time</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">1-3 days</div>
                <div className="text-sm text-purple-700">Processing</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">$ VALUE</div>
                <div className="text-sm text-green-700">Price appears</div>
              </div>
            </div>
            
            <Alert className="border-blue-300 bg-blue-100">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                Click "Verify and Publish" on Etherscan after pasting the source code and settings
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center space-y-4">
          <Button 
            onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractAddress}`, '_blank')}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xl py-6 px-12"
          >
            VERIFY CONTRACT NOW <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
          
          <p className="text-lg text-gray-600">
            This will solve your "N/A" price display and show the actual value of your 1.99M ETHGR tokens
          </p>
        </div>

      </div>
    </div>
  );
}