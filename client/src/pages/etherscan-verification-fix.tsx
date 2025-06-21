import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle,
  Copy,
  CheckCircle,
  ExternalLink,
  Upload,
  FileText,
  Settings
} from "lucide-react";

export default function EtherscanVerificationFix() {
  const [copied, setCopied] = useState("");

  const errorInfo = {
    issue: "OpenZeppelin imports not found",
    solution: "Use flattened contract without imports",
    compiler: "v0.8.19+commit.7dd6d404",
    optimization: "No (False)",
    runs: "200"
  };

  const correctSourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Context
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// IERC20
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

// IERC20Metadata
interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

// ERC20
contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        _beforeTokenTransfer(from, to, amount);
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }
        emit Transfer(from, to, amount);
        _afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal virtual {
        require(to != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), to, amount);
        _totalSupply += amount;
        unchecked {
            _balances[to] += amount;
        }
        emit Transfer(address(0), to, amount);
        _afterTokenTransfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: burn from the zero address");
        _beforeTokenTransfer(from, address(0), amount);
        uint256 accountBalance = _balances[from];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[from] = accountBalance - amount;
            _totalSupply -= amount;
        }
        emit Transfer(from, address(0), amount);
        _afterTokenTransfer(from, address(0), amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(address owner, address spender, uint256 amount) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}
    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}

// Ownable
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(_msgSender());
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// Main Contract
contract ETHGRecovery is ERC20, Ownable {
    mapping(address => bool) public hasMigrated;
    
    constructor() ERC20("ETHG Recovery Token", "ETHGR") {}
    
    function migrateMyTrappedETHG() external {
        require(!hasMigrated[msg.sender], "Migration already completed");
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, 1990000 * 10**decimals());
        emit TokensMigrated(msg.sender, 1990000 * 10**decimals());
    }
    
    event TokensMigrated(address indexed user, uint256 amount);
}`;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const verificationSteps = [
    "Clear the source code field completely",
    "Set Optimization to 'No' (False)",
    "Paste the corrected flattened code below",
    "Submit verification"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <h1 className="text-4xl font-bold text-white">
              Etherscan Verification Fix
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Fixing OpenZeppelin import errors for successful verification
          </p>
        </div>

        {/* Error Analysis */}
        <Alert className="border-red-500 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-200">
            <strong>Import Error:</strong> Etherscan compiler cannot find OpenZeppelin contracts. Solution: Use flattened code without external imports.
          </AlertDescription>
        </Alert>

        {/* Compiler Settings */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Correct Compiler Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                <h5 className="text-orange-400 font-medium mb-2">Compiler Version</h5>
                <p className="text-white font-mono text-sm">{errorInfo.compiler}</p>
                <Badge className="bg-orange-600 text-white mt-2">Exact Match</Badge>
              </div>
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded text-center">
                <h5 className="text-red-400 font-medium mb-2">Optimization</h5>
                <p className="text-white text-xl font-bold">{errorInfo.optimization}</p>
                <Badge className="bg-red-600 text-white mt-2">Important</Badge>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h5 className="text-blue-400 font-medium mb-2">Optimizer Runs</h5>
                <p className="text-white text-xl font-bold">{errorInfo.runs}</p>
                <Badge className="bg-blue-600 text-white mt-2">Default</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fix Steps */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Verification Fix Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Corrected Source Code */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Corrected Flattened Source Code
              <Button 
                onClick={() => copyToClipboard(correctSourceCode, "corrected")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {copied === "corrected" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Fixed Code
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Complete contract without external imports - ready for Etherscan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={correctSourceCode}
              readOnly
              className="font-mono text-xs h-96 bg-gray-900 text-green-400"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-xl py-8"
            onClick={() => window.open(`https://etherscan.io/verifyContract?a=0xfa7b8c553c48c56ec7027d26ae95b029a2abf247`, '_blank')}
          >
            <Upload className="h-6 w-6 mr-2" />
            Retry Verification
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-xl py-8"
            onClick={() => copyToClipboard(correctSourceCode, "main")}
          >
            {copied === "main" ? <CheckCircle className="h-6 w-6 mr-2" /> : <FileText className="h-6 w-6 mr-2" />}
            Copy Source Code
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-xl py-8"
            onClick={() => window.open(`https://etherscan.io/address/0xfa7b8c553c48c56ec7027d26ae95b029a2abf247`, '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View Contract
          </Button>
        </div>

        {/* Key Changes */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">What Was Fixed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-300">
              <p><strong>✓ Removed imports:</strong> No external OpenZeppelin dependencies</p>
              <p><strong>✓ Inlined contracts:</strong> All required code in single file</p>
              <p><strong>✓ Correct optimization:</strong> Set to 'No' to match bytecode</p>
              <p><strong>✓ Same functionality:</strong> Identical contract behavior</p>
              <p><strong>✓ MIT License:</strong> Added at top of file</p>
            </div>
          </CardContent>
        </Card>

        {/* Success Indicator */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>Ready for Verification:</strong> This flattened code should verify successfully on Etherscan with the correct compiler settings.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}