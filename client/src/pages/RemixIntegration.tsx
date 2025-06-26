import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Code2, ExternalLink, Copy, Settings, Link, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function RemixIntegration() {
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Code2 className="w-8 h-8 text-purple-600" />
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Remix IDE Integration
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Remix IDE for Contract Verification
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Set up Remix IDE to work with your deployed ETHGR contract for verification and testing
          </p>
        </div>

        {/* Quick Recommendation */}
        <Alert className="border-emerald-200 bg-emerald-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-emerald-800">
            <strong>Recommended:</strong> For fastest results, use direct Etherscan verification instead of Remix. But Remix is great for testing and future development.
          </AlertDescription>
        </Alert>

        {/* Connection Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center space-x-2">
                <Link className="w-5 h-5" />
                <span>Infura Connection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-blue-700">Connect Remix to Ethereum mainnet via Infura</p>
              <div className="bg-blue-100 p-3 rounded text-xs font-mono">
                https://mainnet.infura.io/v3/YOUR_PROJECT_ID
              </div>
              <Button 
                onClick={() => window.open('https://infura.io/', '_blank')}
                size="sm" 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Get Infura API Key
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center space-x-2">
                <Link className="w-5 h-5" />
                <span>Alchemy Connection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-purple-700">Connect Remix to Ethereum mainnet via Alchemy</p>
              <div className="bg-purple-100 p-3 rounded text-xs font-mono">
                https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
              </div>
              <Button 
                onClick={() => window.open('https://alchemy.com/', '_blank')}
                size="sm" 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Get Alchemy API Key
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Custom RPC</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-green-700">Use any Ethereum mainnet RPC endpoint</p>
              <div className="bg-green-100 p-3 rounded text-xs font-mono">
                https://your-custom-rpc-endpoint.com
              </div>
              <Button 
                onClick={() => window.open('https://chainlist.org/', '_blank')}
                size="sm" 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Find RPC Endpoints
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Remix Setup Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Remix IDE Setup Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <strong>Open Remix IDE</strong>
                    <p className="text-sm text-gray-600">Visit remix.ethereum.org</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <strong>Create Contract File</strong>
                    <p className="text-sm text-gray-600">Create "ETHGRecovery.sol" in contracts folder</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <strong>Set Compiler Version</strong>
                    <p className="text-sm text-gray-600">Use Solidity 0.8.19 with 200 optimization runs</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <strong>Configure Environment</strong>
                    <p className="text-sm text-gray-600">Select "External HTTP Provider" and enter your RPC URL</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <strong>Load Existing Contract</strong>
                    <p className="text-sm text-gray-600">Use "At Address" with: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">6</div>
                  <div>
                    <strong>Verify Contract</strong>
                    <p className="text-sm text-gray-600">Use compilation artifacts for Etherscan verification</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Source Code */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>ETHGR Contract Source Code for Remix</CardTitle>
            <Button
              onClick={() => copyToClipboard(contractSource)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy Source Code"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-96">
              <pre className="text-sm whitespace-pre-wrap">
                <code>{contractSource}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={() => window.open('https://remix.ethereum.org/', '_blank')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Open Remix IDE <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/verifyContract?a=0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308`, '_blank')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Direct Etherscan Verification <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/contract-verification'}
            variant="outline"
          >
            Back to Verification Guide
          </Button>
        </div>

        {/* Important Note */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-800">
            <strong>Note:</strong> While Remix is excellent for development and testing, direct Etherscan verification is the fastest path to solve your "N/A" price display issue. Use Remix for future contract development and testing.
          </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}