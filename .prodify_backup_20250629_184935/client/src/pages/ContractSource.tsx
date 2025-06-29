import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy, FileText, ExternalLink, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContractSource() {
  const [copied, setCopied] = useState(false);

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

  const verificationDetails = {
    contractAddress: "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308",
    compilerType: "Solidity (Single file)",
    compilerVersion: "v0.8.19+commit.7dd6d404",
    license: "MIT License",
    optimization: "Yes",
    optimizationRuns: "200"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Contract Source Code
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            ETHGR Contract Source Code
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete source code for Etherscan verification of your ETHGR contract
          </p>
        </div>

        {/* Verification Instructions */}
        <Alert className="border-emerald-200 bg-emerald-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Ready for Verification:</strong> Copy this source code and paste it into Etherscan's contract verification form using the compiler settings below.
          </AlertDescription>
        </Alert>

        {/* Compiler Settings */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Verification Settings for Etherscan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Contract Address:</span>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{verificationDetails.contractAddress}</code>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Compiler Type:</span>
                  <span className="text-sm">{verificationDetails.compilerType}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Compiler Version:</span>
                  <span className="text-sm font-mono">{verificationDetails.compilerVersion}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">License Type:</span>
                  <span className="text-sm">{verificationDetails.license}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Optimization:</span>
                  <span className="text-sm">{verificationDetails.optimization}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium">Optimization Runs:</span>
                  <span className="text-sm">{verificationDetails.optimizationRuns}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Code */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Complete Contract Source Code</CardTitle>
            <div className="flex space-x-2">
              <Button
                onClick={() => copyToClipboard(contractSource)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy Source Code"}
              </Button>
              <Button
                onClick={() => window.open(`https://etherscan.io/verifyContract?a=${verificationDetails.contractAddress}`, '_blank')}
                variant="outline"
              >
                Open Etherscan <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap">
                <code>{contractSource}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Step by Step Instructions */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800">Verification Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <strong>Open Etherscan Verification:</strong>
                <p className="text-sm text-gray-600">Click the "Open Etherscan" button above to go directly to the verification page</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <strong>Enter Contract Details:</strong>
                <p className="text-sm text-gray-600">Use the compiler settings shown above (Solidity v0.8.19, MIT License, Optimization: Yes with 200 runs)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <strong>Paste Source Code:</strong>
                <p className="text-sm text-gray-600">Copy the source code above and paste it into the "Enter the Solidity Contract Code" field</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <strong>Submit Verification:</strong>
                <p className="text-sm text-gray-600">Click "Verify and Publish" and wait for Etherscan to process (usually 1-3 days)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expected Outcome */}
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Expected Result:</strong> Once verified, your contract will show "Contract Source Code Verified" on Etherscan, enabling price tracking services to recognize your 1.99M ETHGR tokens and display their actual value in your wallet.
          </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}