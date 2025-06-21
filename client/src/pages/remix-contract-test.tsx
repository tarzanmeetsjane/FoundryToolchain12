import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code,
  PlayCircle,
  ExternalLink,
  Copy,
  CheckCircle,
  Settings,
  FileText,
  Download
} from "lucide-react";

export default function RemixContractTest() {
  const [copied, setCopied] = useState("");

  const remixCode = `// SPDX-License-Identifier: MIT
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

    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }
        emit Transfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal virtual {
        require(to != address(0), "ERC20: mint to the zero address");
        _totalSupply += amount;
        unchecked {
            _balances[to] += amount;
        }
        emit Transfer(address(0), to, amount);
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

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const testSteps = [
    {
      step: 1,
      title: "Open Remix IDE",
      description: "Go to remix.ethereum.org",
      action: () => window.open('https://remix.ethereum.org', '_blank')
    },
    {
      step: 2,
      title: "Create New File",
      description: "Create 'ETHGRecovery.sol' in contracts folder",
      action: null
    },
    {
      step: 3,
      title: "Paste Contract Code",
      description: "Copy the flattened contract code",
      action: () => copyToClipboard(remixCode, "remix")
    },
    {
      step: 4,
      title: "Set Compiler to 0.8.19",
      description: "Select exact compiler version in Solidity Compiler tab",
      action: null
    },
    {
      step: 5,
      title: "Compile Contract",
      description: "Click compile and check for errors",
      action: null
    },
    {
      step: 6,
      title: "Test Deployment",
      description: "Deploy on JavaScript VM to verify functionality",
      action: null
    }
  ];

  const compilerSettings = {
    version: "0.8.19",
    optimization: false,
    evmVersion: "london",
    license: "MIT"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Code className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Remix Contract Testing
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Test your ETHGR contract in Remix before Etherscan verification
          </p>
        </div>

        {/* Testing Strategy */}
        <Alert className="border-blue-500 bg-blue-500/10">
          <PlayCircle className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200 text-center">
            <strong>Smart Strategy:</strong> Test in Remix first to catch compilation errors before submitting to Etherscan verification.
          </AlertDescription>
        </Alert>

        {/* Compiler Settings */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Remix Compiler Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h5 className="text-green-400 font-medium mb-2">Solidity Version</h5>
                <p className="text-white text-lg font-bold">{compilerSettings.version}</p>
                <Badge className="bg-green-600 text-white mt-2">Required</Badge>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h5 className="text-blue-400 font-medium mb-2">Optimization</h5>
                <p className="text-white text-lg font-bold">{compilerSettings.optimization ? "Yes" : "No"}</p>
                <Badge className="bg-blue-600 text-white mt-2">Disabled</Badge>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                <h5 className="text-purple-400 font-medium mb-2">EVM Version</h5>
                <p className="text-white text-lg font-bold">{compilerSettings.evmVersion}</p>
                <Badge className="bg-purple-600 text-white mt-2">London</Badge>
              </div>
              
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                <h5 className="text-orange-400 font-medium mb-2">License</h5>
                <p className="text-white text-lg font-bold">{compilerSettings.license}</p>
                <Badge className="bg-orange-600 text-white mt-2">Standard</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Steps */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Remix Testing Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{step.title}</h5>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                  {step.action && (
                    <Button 
                      onClick={step.action}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {step.step === 1 ? <ExternalLink className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {step.step === 1 ? "Open Remix" : "Copy Code"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Code */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Contract Code for Remix Testing
              <div className="flex gap-2">
                <Button 
                  onClick={() => copyToClipboard(remixCode, "main")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {copied === "main" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Code
                </Button>
                <Button 
                  onClick={() => downloadFile(remixCode, "ETHGRecovery.sol")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={remixCode}
              readOnly
              className="font-mono text-xs h-96 bg-gray-900 text-green-400"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-xl py-8"
            onClick={() => window.open('https://remix.ethereum.org', '_blank')}
          >
            <Code className="h-6 w-6 mr-2" />
            Open Remix IDE
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-xl py-8"
            onClick={() => copyToClipboard(remixCode, "action")}
          >
            {copied === "action" ? <CheckCircle className="h-6 w-6 mr-2" /> : <FileText className="h-6 w-6 mr-2" />}
            Copy Contract
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-xl py-8"
            onClick={() => window.open('/etherscan-verification-fix', '_self')}
          >
            <Settings className="h-6 w-6 mr-2" />
            Back to Verification
          </Button>
        </div>

        {/* What to Expect */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">What to Expect in Remix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-300">
              <p><strong>✓ Successful Compilation:</strong> No errors, green checkmark in compiler tab</p>
              <p><strong>✓ Contract Size:</strong> Should be within deployment limits</p>
              <p><strong>✓ Function Visibility:</strong> migrateMyTrappedETHG should be visible</p>
              <p><strong>✓ Events:</strong> TokensMigrated event should be listed</p>
              <p><strong>✓ Inheritance:</strong> ERC20 and Ownable functions accessible</p>
              <p><strong>⚠ Gas Estimation:</strong> Check deployment gas requirements</p>
            </div>
          </CardContent>
        </Card>

        {/* Success Path */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>Success Path:</strong> If Remix compiles without errors, the same code should verify successfully on Etherscan with identical compiler settings.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}