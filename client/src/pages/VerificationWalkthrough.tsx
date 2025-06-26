import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, Copy, ArrowRight, Clock, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function VerificationWalkthrough() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const steps = [
    {
      id: 1,
      title: "Open Etherscan Verification",
      description: "Navigate to the Etherscan contract verification page",
      action: () => window.open(`https://etherscan.io/verifyContract?a=${contractAddress}`, '_blank'),
      status: currentStep >= 1 ? "completed" : "pending"
    },
    {
      id: 2,
      title: "Fill Basic Information",
      description: "Enter contract details and compiler settings",
      status: currentStep >= 2 ? "completed" : "pending"
    },
    {
      id: 3,
      title: "Paste Source Code",
      description: "Copy and paste the complete contract source code",
      status: currentStep >= 3 ? "completed" : "pending"
    },
    {
      id: 4,
      title: "Submit for Verification",
      description: "Review and submit the verification request",
      status: currentStep >= 4 ? "completed" : "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-8 h-8 text-emerald-600" />
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Live Verification Process
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Verify Your ETHGR Contract Now
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow these exact steps to get your 1.99M ETHGR tokens price recognition
          </p>
        </div>

        {/* Current Issue */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-amber-800">
            <strong>Current Issue:</strong> Your wallet shows "N/A" for ETHGR token price because price tracking services haven't recognized contract {contractAddress}
          </AlertDescription>
        </Alert>

        {/* Progress Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <Card key={step.id} className={`relative border-2 ${
              step.status === 'completed' ? 'border-emerald-300 bg-emerald-50' : 
              currentStep === step.id ? 'border-blue-300 bg-blue-50' : 
              'border-gray-200 bg-white'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.status === 'completed' ? 'bg-emerald-600 text-white' :
                    currentStep === step.id ? 'bg-blue-600 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : step.id}
                  </div>
                  {currentStep === step.id && (
                    <Badge className="bg-blue-600 text-xs">Current</Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                {step.action && currentStep === step.id && (
                  <Button 
                    onClick={step.action}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Open Etherscan <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Step 1: Etherscan Form Details */}
        {currentStep >= 1 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Step 1: Etherscan Form Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <strong>Contract Address:</strong>
                    <div className="font-mono text-sm mt-1">{contractAddress}</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg">
                    <strong>Compiler Type:</strong>
                    <div className="text-sm mt-1">Solidity (Single file)</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg">
                    <strong>Compiler Version:</strong>
                    <div className="font-mono text-sm mt-1">v0.8.19+commit.7dd6d404</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <strong>License Type:</strong>
                    <div className="text-sm mt-1">MIT License</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg">
                    <strong>Optimization:</strong>
                    <div className="text-sm mt-1">Yes</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg">
                    <strong>Optimization Runs:</strong>
                    <div className="text-sm mt-1">200</div>
                  </div>
                </div>
              </div>
              
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  <strong>Critical:</strong> Leave "Constructor Arguments ABI-encoded" field completely EMPTY
                </AlertDescription>
              </Alert>
              
              <div className="text-center">
                <Button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Settings Complete - Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Source Code */}
        {currentStep >= 2 && (
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-emerald-800">Step 2: Contract Source Code</CardTitle>
              <Button
                onClick={() => copyToClipboard(contractSource)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy Source Code"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-emerald-200 bg-emerald-100">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-emerald-800">
                  Copy this exact source code and paste it into the "Enter the Solidity Contract Code" field on Etherscan
                </AlertDescription>
              </Alert>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-96">
                <pre className="text-sm whitespace-pre-wrap">
                  <code>{contractSource}</code>
                </pre>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Source Code Copied - Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Submit */}
        {currentStep >= 3 && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Step 3: Submit Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Contract address filled: {contractAddress}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Compiler settings configured (Solidity 0.8.19, MIT, 200 runs)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Constructor arguments left empty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Source code pasted into Etherscan form</span>
                </div>
              </div>
              
              <Alert className="border-green-200 bg-green-100">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-800">
                  Click "Verify and Publish" on Etherscan to submit your contract for verification
                </AlertDescription>
              </Alert>
              
              <div className="text-center">
                <Button 
                  onClick={() => setCurrentStep(4)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Verification Submitted <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Expected Results */}
        {currentStep >= 4 && (
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Expected Results & Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">1-3 Days</div>
                  <div className="text-sm text-purple-700">Etherscan Processing</div>
                  <div className="text-xs text-gray-600 mt-1">Contract verification review</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1-2 Weeks</div>
                  <div className="text-sm text-blue-700">Price Recognition</div>
                  <div className="text-xs text-gray-600 mt-1">CoinGecko/CoinMarketCap indexing</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">Automatic</div>
                  <div className="text-sm text-green-700">Wallet Value Display</div>
                  <div className="text-xs text-gray-600 mt-1">Shows actual $ value</div>
                </div>
              </div>
              
              <Alert className="border-purple-200 bg-purple-100">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-purple-800">
                  <strong>Success!</strong> Once verified, your 1.99M ETHGR tokens will show their actual dollar value instead of "N/A" in your wallet.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractAddress}`, '_blank')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Open Etherscan Verification <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/recovery-status'}
            variant="outline"
          >
            Back to Recovery Status
          </Button>
        </div>

      </div>
    </div>
  );
}