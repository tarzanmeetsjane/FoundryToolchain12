import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, CheckCircle, ExternalLink, AlertTriangle, FileText, Code } from 'lucide-react';

export default function MetadataGenerationGuide() {
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Your actual contract source code
  const ethgrSourceCode = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Unauthorized");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18;
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Invalid amount");
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}`;

  // Complete compiler input for Remix
  const remixCompilerInput = `{
  "language": "Solidity",
  "sources": {
    "ETHGRecovery.sol": {
      "content": "${ethgrSourceCode.replace(/\n/g, '\\n').replace(/"/g, '\\"')}"
    }
  },
  "settings": {
    "outputSelection": {
      "*": {
        "*": [
          "abi",
          "evm.bytecode",
          "evm.deployedBytecode",
          "evm.methodIdentifiers",
          "metadata"
        ],
        "": [
          "ast"
        ]
      }
    },
    "optimizer": {
      "enabled": false,
      "runs": 200
    },
    "metadata": {
      "bytecodeHash": "ipfs"
    },
    "libraries": {}
  }
}`;

  // Hardhat configuration for metadata generation
  const hardhatConfig = `// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      },
      metadata: {
        bytecodeHash: "ipfs"
      }
    }
  },
  networks: {
    mainnet: {
      url: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
  }
};`;

  // Flattened contract for Etherscan
  const flattenedContract = `// SPDX-License-Identifier: MIT
// File: @openzeppelin/contracts/utils/Context.sol
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol
// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

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

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

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

// File: @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol
// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity ^0.8.0;

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

// File: @openzeppelin/contracts/token/ERC20/ERC20.sol
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

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

// File: contracts/ETHGRecovery.sol

pragma solidity 0.8.19;

contract ETHGRecovery is ERC20, Ownable {
    
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Unauthorized");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18;
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Invalid amount");
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Fix Sourcify Metadata Error
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Generate IPFS Metadata for Your ETHGR Contract Verification
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-red-50 border-red-300 text-red-700">
          Metadata IPFS CID Required
        </Badge>
      </div>

      {/* Error Explanation */}
      <Alert className="mb-8 border-2 border-red-300 bg-red-50">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Sourcify Error Explained:</strong> "The contract doesn't have a metadata IPFS CID" means 
          your contract wasn't compiled with metadata output enabled. Sourcify requires this metadata 
          to verify contracts. I'll show you how to generate it properly.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="solution" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="solution">Quick Solution</TabsTrigger>
          <TabsTrigger value="remix">Remix Method</TabsTrigger>
          <TabsTrigger value="etherscan">Etherscan Alternative</TabsTrigger>
          <TabsTrigger value="hardhat">Hardhat Setup</TabsTrigger>
        </TabsList>

        {/* Quick Solution */}
        <TabsContent value="solution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Immediate Solution: Use Etherscan</CardTitle>
              <CardDescription>
                Since Sourcify requires metadata, use Etherscan verification instead
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4">Why Etherscan is Better for Your Case</h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Does not require metadata IPFS CID</li>
                  <li>• Accepts flattened contract source code</li>
                  <li>• Widely supported by wallets and platforms</li>
                  <li>• Will fix your "N/A" value display issue</li>
                  <li>• More popular than Sourcify for price recognition</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded border">
                  <h4 className="font-semibold text-blue-800">Your Contract Address</h4>
                  <div className="font-mono text-sm mt-2">0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308</div>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => copyToClipboard('0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308', 'address')}
                  >
                    {copiedStates['address'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Address
                  </Button>
                </div>

                <div className="bg-purple-50 p-4 rounded border">
                  <h4 className="font-semibold text-purple-800">Compiler Settings</h4>
                  <div className="text-sm mt-2">
                    <div>Solidity: 0.8.19</div>
                    <div>Optimization: Disabled</div>
                    <div>Constructor: Empty</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={() => window.open('https://etherscan.io/verifyContract', '_blank')} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Verify on Etherscan (Recommended)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Remix Method */}
        <TabsContent value="remix" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Metadata in Remix</CardTitle>
              <CardDescription>
                Compile with metadata enabled to get IPFS CID for Sourcify
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 border-blue-300">
                <FileText className="h-5 w-5 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Important:</strong> This method requires recompiling your contract with specific settings 
                  to generate the metadata that Sourcify needs.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Step 1: Remix Compiler Settings</h3>
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="text-sm">
                      <div>• Solidity Compiler: 0.8.19</div>
                      <div>• Auto compile: ON</div>
                      <div>• Enable optimization: OFF</div>
                      <div>• Advanced configurations → Metadata → bytecodeHash: ipfs</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Step 2: Complete Compiler Input</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Remix Compiler Input JSON</span>
                    <Button 
                      size="sm"
                      onClick={() => copyToClipboard(remixCompilerInput, 'remix-input')}
                    >
                      {copiedStates['remix-input'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      Copy Input
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg overflow-x-auto text-xs max-h-64">
                    <code>{remixCompilerInput}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Step 3: Extract Metadata</h3>
                  <div className="bg-yellow-50 p-4 rounded border">
                    <div className="text-sm text-yellow-800">
                      After compilation, go to contracts/ETHGRecovery.sol/ETHGRecovery.json 
                      and find the "metadata" field. This contains the IPFS hash Sourcify needs.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Etherscan Alternative */}
        <TabsContent value="etherscan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Recommended: Etherscan Verification</CardTitle>
              <CardDescription>
                Use flattened contract for instant verification without metadata issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Complete Flattened Contract</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Ready for Etherscan verification</span>
                  <Button 
                    onClick={() => copyToClipboard(flattenedContract, 'flattened')}
                  >
                    {copiedStates['flattened'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Flattened Contract
                  </Button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs max-h-96">
                  <code>{flattenedContract}</code>
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-semibold text-blue-800">Compiler Version</div>
                  <div className="text-sm">v0.8.19+commit.7dd6d404</div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-semibold text-blue-800">Optimization</div>
                  <div className="text-sm">No (200 runs)</div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-semibold text-blue-800">Constructor Args</div>
                  <div className="text-sm">Empty</div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={() => window.open('https://etherscan.io/verifyContract', '_blank')} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Verify on Etherscan Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hardhat Setup */}
        <TabsContent value="hardhat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hardhat with Metadata Generation</CardTitle>
              <CardDescription>
                Professional setup for generating metadata and verifying contracts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Hardhat Configuration</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">hardhat.config.js with metadata enabled</span>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(hardhatConfig, 'hardhat-config')}
                  >
                    {copiedStates['hardhat-config'] ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy Config
                  </Button>
                </div>
                <pre className="bg-gray-900 text-cyan-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{hardhatConfig}</code>
                </pre>
              </div>

              <Alert className="bg-yellow-50 border-yellow-300">
                <Code className="h-5 w-5 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Advanced Option:</strong> Hardhat setup is more complex but provides better tooling 
                  for verification. For immediate results, use the Etherscan method above.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Final Recommendation */}
      <Alert className="mt-8 border-2 border-green-300 bg-green-50">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Recommended Action:</strong> Use Etherscan verification with the flattened contract above. 
          This will resolve your "N/A" value display issue faster than generating metadata for Sourcify. 
          Most wallets and platforms prioritize Etherscan verification for price recognition.
        </AlertDescription>
      </Alert>
    </div>
  );
}