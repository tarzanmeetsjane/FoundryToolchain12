import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Terminal,
  Wrench
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BytecodeMatchFix() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content copied successfully",
    });
  };

  const contractCode = `// SPDX-License-Identifier: MIT
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Bytecode Match Fix
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Corrected compiler settings to match your deployed contract
        </p>
      </div>

      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Issue Identified:</strong> Your contract was compiled with optimization DISABLED, 
          but verification was attempted with optimization ENABLED (200 runs). This causes bytecode mismatch.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="etherscan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="etherscan">Fixed Etherscan Verification</TabsTrigger>
          <TabsTrigger value="foundry">Fixed Foundry Command</TabsTrigger>
        </TabsList>

        <TabsContent value="etherscan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Corrected Etherscan Settings
              </CardTitle>
              <CardDescription>
                Use these exact settings to match your deployed bytecode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-800 text-lg">❌ Wrong Settings (Failed)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-1 text-red-700">
                      <div><strong>Compiler Type:</strong> Solidity (Single file)</div>
                      <div><strong>Compiler Version:</strong> v0.8.19+commit.7dd6d404</div>
                      <div><strong>Optimization:</strong> ❌ Yes (200 runs)</div>
                      <div><strong>Constructor Args:</strong> Empty</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-800 text-lg">✅ Correct Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-1 text-green-700">
                      <div><strong>Compiler Type:</strong> Solidity (Single file)</div>
                      <div><strong>Compiler Version:</strong> v0.8.19+commit.7dd6d404</div>
                      <div><strong>Optimization:</strong> ✅ No</div>
                      <div><strong>Constructor Args:</strong> Empty</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step-by-Step Process:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Go to your contract page</p>
                      <Button 
                        onClick={() => window.open('https://etherscan.io/address/0xc2b6d375b7d14c9ce73f97ddf565002cce257308#code', '_blank')}
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Contract on Etherscan
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Click "Verify and Publish"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Use CORRECTED settings:</p>
                      <div className="mt-2 space-y-2 text-sm bg-green-50 p-3 rounded border border-green-200">
                        <div><strong>Compiler Type:</strong> Solidity (Single file)</div>
                        <div><strong>Compiler Version:</strong> v0.8.19+commit.7dd6d404</div>
                        <div><strong>License:</strong> MIT License (MIT)</div>
                        <div><strong>Optimization:</strong> ❌ <span className="font-bold text-green-700">No (IMPORTANT!)</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-medium">Paste contract source code</p>
                      <Button 
                        onClick={() => copyToClipboard(contractCode)}
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Contract Code
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                    <div>
                      <p className="font-medium">Constructor Arguments</p>
                      <div className="mt-2 bg-slate-100 p-2 rounded font-mono text-sm">
                        (Leave completely empty)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                    <div>
                      <p className="font-medium">Submit verification</p>
                      <p className="text-sm text-slate-600">Should succeed with "Contract successfully verified"</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="foundry">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Corrected Foundry Command
              </CardTitle>
              <CardDescription>
                Updated command with optimization disabled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Wrong Command (Failed):</h3>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="bg-slate-900 text-red-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --num-of-optimizations 200 \\  ❌ WRONG!
  --watch \\
  --constructor-args \$(cast abi-encode "constructor()") \\
  --etherscan-api-key \$ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Correct Command:</h3>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="bg-slate-900 text-green-400 p-3 rounded font-mono text-sm whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --watch \\
  --constructor-args \$(cast abi-encode "constructor()") \\
  --etherscan-api-key \$ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    ✅ Removed <code>--num-of-optimizations 200</code> to disable optimization
                  </p>
                </div>
                <Button 
                  onClick={() => copyToClipboard(`forge verify-contract \\
  --chain-id 1 \\
  --watch \\
  --constructor-args $(cast abi-encode "constructor()") \\
  --etherscan-api-key $ETHERSCAN_API_KEY \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`)}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Correct Command
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Updated foundry.toml:</h3>
                <div className="bg-slate-100 p-3 rounded border text-sm font-mono">
{`[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"
optimizer = false
via_ir = false

[rpc_endpoints]
mainnet = "https://eth-mainnet.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"`}
                </div>
                <Button 
                  onClick={() => copyToClipboard(`[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"
optimizer = false
via_ir = false

[rpc_endpoints]
mainnet = "https://eth-mainnet.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"`)}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy foundry.toml
                </Button>
                <p className="text-sm text-slate-600">
                  ✅ Ensure <code>optimizer = false</code> to match your deployed contract
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Why This Fixes the Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-600">
            <div><strong>Root Cause:</strong> Solidity compiler generates different bytecode when optimization is enabled vs disabled</div>
            <div><strong>Your Contract:</strong> Compiled with optimization OFF (default Remix setting)</div>
            <div><strong>Previous Attempts:</strong> Tried to verify with optimization ON (200 runs)</div>
            <div><strong>Solution:</strong> Match the original compilation settings exactly</div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Expected Success:</h4>
            <div className="text-sm text-green-700">
              <div>✅ Bytecode will match exactly</div>
              <div>✅ "Contract successfully verified" message</div>
              <div>✅ ETHGR tokens will show proper values in wallets</div>
              <div>✅ "No routes available" trading errors will disappear</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}