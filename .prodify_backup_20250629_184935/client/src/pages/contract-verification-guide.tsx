import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield,
  Copy,
  CheckCircle,
  ExternalLink,
  Upload,
  Code,
  Settings,
  FileText
} from "lucide-react";

export default function ContractVerificationGuide() {
  const [copied, setCopied] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const contractData = {
    address: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    compiler: "v0.8.19+commit.7dd6d404",
    optimization: "Yes",
    runs: "200"
  };

  const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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

  const flattenedCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/IERC20.sol)
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

// OpenZeppelin Contracts v4.9.0 (token/ERC20/extensions/IERC20Metadata.sol)
interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

// OpenZeppelin Contracts v4.9.0 (utils/Context.sol)
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/ERC20.sol)
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

// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)
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
    {
      step: 1,
      title: "Go to Etherscan Verification",
      description: "Open the contract verification page",
      completed: currentStep > 1
    },
    {
      step: 2,
      title: "Enter Contract Details",
      description: "Fill in compiler version and settings",
      completed: currentStep > 2
    },
    {
      step: 3,
      title: "Paste Source Code",
      description: "Copy the flattened contract code",
      completed: currentStep > 3
    },
    {
      step: 4,
      title: "Submit Verification",
      description: "Complete the verification process",
      completed: currentStep > 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Contract Verification Guide
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Step-by-step Etherscan verification for your ETHGR contract
          </p>
        </div>

        {/* Contract Information */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Contract Details for Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-medium">Contract Address:</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(contractData.address, "address")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied === "address" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-white font-mono text-sm break-all">{contractData.address}</p>
                </div>

                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-medium">Compiler Version:</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(contractData.compiler, "compiler")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {copied === "compiler" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-white font-bold">{contractData.compiler}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <span className="text-orange-400 font-medium">Optimization:</span>
                  <p className="text-white font-bold">{contractData.optimization}</p>
                </div>

                <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <span className="text-purple-400 font-medium">Optimizer Runs:</span>
                  <p className="text-white font-bold">{contractData.runs}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Progress */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Verification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationSteps.map((step, index) => (
                <div key={index} className={`flex items-center gap-4 p-4 rounded ${
                  step.completed ? 'bg-green-600/10 border border-green-600/30' :
                  currentStep === step.step ? 'bg-blue-600/10 border border-blue-600/30' :
                  'bg-gray-600/10 border border-gray-600/30'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.completed ? 'bg-green-600 text-white' :
                    currentStep === step.step ? 'bg-blue-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {step.completed ? <CheckCircle className="h-4 w-4" /> : step.step}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{step.title}</h5>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Code */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Flattened Contract Source Code
              <Button 
                onClick={() => copyToClipboard(flattenedCode, "flattened")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {copied === "flattened" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Full Code
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Complete flattened source code with OpenZeppelin dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={flattenedCode}
              readOnly
              className="font-mono text-xs h-96 bg-gray-900 text-green-400"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-xl py-8"
            onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractData.address}`, '_blank')}
          >
            <Upload className="h-6 w-6 mr-2" />
            Start Verification
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-xl py-8"
            onClick={() => copyToClipboard(flattenedCode, "main")}
          >
            {copied === "main" ? <CheckCircle className="h-6 w-6 mr-2" /> : <FileText className="h-6 w-6 mr-2" />}
            Copy Source Code
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-xl py-8"
            onClick={() => window.open(`https://etherscan.io/address/${contractData.address}`, '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View Contract
          </Button>
        </div>

        {/* Instructions */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Verification Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-300">
              <p><strong>1.</strong> Click "Start Verification" to open Etherscan</p>
              <p><strong>2.</strong> Select "Single file" verification method</p>
              <p><strong>3.</strong> Enter compiler version: <code className="bg-gray-700 px-2 py-1 rounded text-green-300">{contractData.compiler}</code></p>
              <p><strong>4.</strong> Set optimization: <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">Yes</code> with <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">200</code> runs</p>
              <p><strong>5.</strong> Paste the flattened source code above</p>
              <p><strong>6.</strong> Submit and wait for verification</p>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <Alert className="border-green-500 bg-green-500/10">
          <Shield className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>Why Verify:</strong> Contract verification makes your ETHGR token transparent and trustworthy, potentially enabling real market activity and proper price discovery.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}