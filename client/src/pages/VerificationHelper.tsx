import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, AlertTriangle, CheckCircle, FileCode } from "lucide-react";
import { useState } from "react";

export default function VerificationHelper() {
  const [copied, setCopied] = useState(false);

  const contractSource = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title ETHG Recovery Token
 * @dev ERC20 token for cryptocurrency fraud victim assistance
 * @author ETHGR Foundation
 */

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    
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
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        name = "ETHG Recovery";
        symbol = "ETHGR";
        decimals = 18;
        owner = msg.sender;
        _totalSupply = 1990000 * 10**decimals;
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address to, uint256 amount) public override returns (bool) {
        address from = msg.sender;
        _transfer(from, to, amount);
        return true;
    }
    
    function allowance(address tokenOwner, address spender) public view override returns (uint256) {
        return _allowances[tokenOwner][spender];
    }
    
    function approve(address spender, uint256 amount) public override returns (bool) {
        address tokenOwner = msg.sender;
        _approve(tokenOwner, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        address spender = msg.sender;
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
    
    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "Transfer from zero address");
        require(to != address(0), "Transfer to zero address");
        
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "Transfer amount exceeds balance");
        
        _balances[from] = fromBalance - amount;
        _balances[to] += amount;
        
        emit Transfer(from, to, amount);
    }
    
    function _approve(address tokenOwner, address spender, uint256 amount) internal {
        require(tokenOwner != address(0), "Approve from zero address");
        require(spender != address(0), "Approve to zero address");
        
        _allowances[tokenOwner][spender] = amount;
        emit Approval(tokenOwner, spender, amount);
    }
    
    function _spendAllowance(address tokenOwner, address spender, uint256 amount) internal {
        uint256 currentAllowance = allowance(tokenOwner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "Insufficient allowance");
            _approve(tokenOwner, spender, currentAllowance - amount);
        }
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-4">
            Contract Verification Fix
          </h1>
          <p className="text-xl text-red-600 mb-4">
            Fixed ParserError - Ready for Etherscan Verification
          </p>
        </div>

        {/* Error Explanation */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            <strong>ParserError Fixed:</strong> The previous format was JSON metadata. Etherscan needs raw Solidity source code. Use the corrected code below.
          </AlertDescription>
        </Alert>

        {/* Verification Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Step-by-Step Verification Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">1</div>
                  <h4 className="font-semibold text-blue-800 mb-2">Copy Source Code</h4>
                  <p className="text-sm text-blue-700">Copy the corrected Solidity code below</p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">2</div>
                  <h4 className="font-semibold text-purple-800 mb-2">Open Etherscan</h4>
                  <p className="text-sm text-purple-700">Go to contract verification page</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">3</div>
                  <h4 className="font-semibold text-green-800 mb-2">Submit & Verify</h4>
                  <p className="text-sm text-green-700">Paste code and submit for verification</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-3">Verification Settings:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div><strong>Contract Address:</strong> 0xc2b6d375b7d14c9ce73f97ddf565002cce257308</div>
                  <div><strong>Contract Name:</strong> ETHGRecovery</div>
                  <div><strong>Compiler:</strong> v0.8.30+commit.73712a01</div>
                </div>
                <div className="space-y-1">
                  <div><strong>Optimization:</strong> Enabled (200 runs)</div>
                  <div><strong>License:</strong> MIT</div>
                  <div><strong>Constructor Args:</strong> <Badge className="bg-red-100 text-red-800">LEAVE EMPTY</Badge></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Source Code */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <FileCode className="h-5 w-5" />
              Corrected Contract Source Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4 relative">
              <Button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              
              <pre className="text-green-400 text-xs overflow-x-auto pr-20">
                <code>{contractSource}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <ExternalLink className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Start Verification</h3>
                <p className="text-sm text-green-700 mb-4">
                  Open Etherscan verification page with your contract address
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify on Etherscan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">After Verification</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Check your contract status and price recognition
                </p>
                <Button 
                  onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Check Contract Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Indicator */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">ParserError Fixed!</h3>
          <p className="text-lg mb-6">
            Your contract source code is now properly formatted for Etherscan verification
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Correct Format</h4>
              <p className="text-sm opacity-90">Raw Solidity source code ready</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ Proper Pragma</h4>
              <p className="text-sm opacity-90">Solidity ^0.8.30 specified</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">✓ No JSON Metadata</h4>
              <p className="text-sm opacity-90">Clean contract structure</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}