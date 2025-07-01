import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ExternalLink, Copy, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function DirectVerificationGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Simple ETHGR Verification Guide
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          5 easy steps to unlock your $200k-$1.3M tokens
        </p>
      </div>

      <Alert className="mb-8 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Your tokens are safe!</strong> 1,990,000 ETHGR tokens are in contract 
          0xc2b6d375b7d14c9ce73f97ddf565002cce257308. We just need to verify it so wallets and exchanges can see the value.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        
        {/* Step 1 */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">1</span>
              Open Etherscan Verification Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              Click this button to go directly to the Etherscan verification page for your contract:
            </p>
            <Button 
              onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Etherscan Verification
            </Button>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">2</span>
              Set Compiler Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              On the Etherscan page, select "Solidity (Single file)" as the compiler type.
            </p>
            <div className="bg-slate-100 p-3 rounded border">
              <strong>Compiler Type:</strong> Solidity (Single file)
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">3</span>
              Set Compiler Version
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              Select the exact compiler version that was used to deploy your contract:
            </p>
            <div className="bg-slate-100 p-3 rounded border flex items-center justify-between">
              <strong>v0.8.19+commit.7dd6d404</strong>
              <Button
                onClick={() => copyToClipboard('v0.8.19+commit.7dd6d404', 3)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-1" />
                {copiedStep === 3 ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">4</span>
              Paste Contract Source Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              Copy this entire contract source code and paste it into the "Solidity Contract Code" box:
            </p>
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>IMPORTANT:</strong> Etherscan requires flattened code with NO import statements. 
                The code below has all OpenZeppelin contracts included directly.
              </AlertDescription>
            </Alert>
            <div className="bg-slate-100 p-4 rounded border text-xs overflow-x-auto mb-4 max-h-96 overflow-y-auto">
              <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }
    
    modifier onlyOwner() {
        _checkOwner();
        _;
    }
    
    function owner() public view virtual returns (address) {
        return _owner;
    }
    
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }
    
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
    
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }
    
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    error OwnableInvalidOwner(address owner);
    error OwnableUnauthorizedAccount(address account);
}

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

interface IERC20Errors {
    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);
    error ERC20InvalidSender(address sender);
    error ERC20InvalidReceiver(address receiver);
    error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed);
    error ERC20InvalidApprover(address approver);
    error ERC20InvalidSpender(address spender);
}

abstract contract ERC20 is Context, IERC20, IERC20Metadata, IERC20Errors {
    mapping(address account => uint256) private _balances;
    mapping(address account => mapping(address spender => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }
    
    function name() public view virtual returns (string memory) { return _name; }
    function symbol() public view virtual returns (string memory) { return _symbol; }
    function decimals() public view virtual returns (uint8) { return 18; }
    function totalSupply() public view virtual returns (uint256) { return _totalSupply; }
    function balanceOf(address account) public view virtual returns (uint256) { return _balances[account]; }
    
    function transfer(address to, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }
    
    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
    
    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) revert ERC20InvalidSender(address(0));
        if (to == address(0)) revert ERC20InvalidReceiver(address(0));
        _update(from, to, value);
    }
    
    function _update(address from, address to, uint256 value) internal virtual {
        if (from == address(0)) {
            _totalSupply += value;
        } else {
            uint256 fromBalance = _balances[from];
            if (fromBalance < value) revert ERC20InsufficientBalance(from, fromBalance, value);
            unchecked { _balances[from] = fromBalance - value; }
        }
        if (to == address(0)) {
            unchecked { _totalSupply -= value; }
        } else {
            unchecked { _balances[to] += value; }
        }
        emit Transfer(from, to, value);
    }
    
    function _mint(address account, uint256 value) internal {
        if (account == address(0)) revert ERC20InvalidReceiver(address(0));
        _update(address(0), account, value);
    }
    
    function _approve(address owner, address spender, uint256 value) internal {
        _approve(owner, spender, value, true);
    }
    
    function _approve(address owner, address spender, uint256 value, bool emitEvent) internal virtual {
        if (owner == address(0)) revert ERC20InvalidApprover(address(0));
        if (spender == address(0)) revert ERC20InvalidSpender(address(0));
        _allowances[owner][spender] = value;
        if (emitEvent) emit Approval(owner, spender, value);
    }
    
    function _spendAllowance(address owner, address spender, uint256 value) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) revert ERC20InsufficientAllowance(spender, currentAllowance, value);
            unchecked { _approve(owner, spender, currentAllowance - value, false); }
        }
    }
}

contract ETHGRecovery is ERC20, Ownable {
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled;
    uint256 public totalMigrated;
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        migrationEnabled = true;
        totalMigrated = 0;
    }
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Only foundation");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        uint256 amount = 1990000 * 10**18;
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Amount must be positive");
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be positive");
        _mint(to, amount);
    }
}`}</pre>
            </div>
            <Button
              onClick={() => copyToClipboard(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }
    
    modifier onlyOwner() {
        _checkOwner();
        _;
    }
    
    function owner() public view virtual returns (address) {
        return _owner;
    }
    
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }
    
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
    
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }
    
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    error OwnableInvalidOwner(address owner);
    error OwnableUnauthorizedAccount(address account);
}

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

interface IERC20Errors {
    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);
    error ERC20InvalidSender(address sender);
    error ERC20InvalidReceiver(address receiver);
    error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed);
    error ERC20InvalidApprover(address approver);
    error ERC20InvalidSpender(address spender);
}

abstract contract ERC20 is Context, IERC20, IERC20Metadata, IERC20Errors {
    mapping(address account => uint256) private _balances;
    mapping(address account => mapping(address spender => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }
    
    function name() public view virtual returns (string memory) { return _name; }
    function symbol() public view virtual returns (string memory) { return _symbol; }
    function decimals() public view virtual returns (uint8) { return 18; }
    function totalSupply() public view virtual returns (uint256) { return _totalSupply; }
    function balanceOf(address account) public view virtual returns (uint256) { return _balances[account]; }
    
    function transfer(address to, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }
    
    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
    
    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) revert ERC20InvalidSender(address(0));
        if (to == address(0)) revert ERC20InvalidReceiver(address(0));
        _update(from, to, value);
    }
    
    function _update(address from, address to, uint256 value) internal virtual {
        if (from == address(0)) {
            _totalSupply += value;
        } else {
            uint256 fromBalance = _balances[from];
            if (fromBalance < value) revert ERC20InsufficientBalance(from, fromBalance, value);
            unchecked { _balances[from] = fromBalance - value; }
        }
        if (to == address(0)) {
            unchecked { _totalSupply -= value; }
        } else {
            unchecked { _balances[to] += value; }
        }
        emit Transfer(from, to, value);
    }
    
    function _mint(address account, uint256 value) internal {
        if (account == address(0)) revert ERC20InvalidReceiver(address(0));
        _update(address(0), account, value);
    }
    
    function _approve(address owner, address spender, uint256 value) internal {
        _approve(owner, spender, value, true);
    }
    
    function _approve(address owner, address spender, uint256 value, bool emitEvent) internal virtual {
        if (owner == address(0)) revert ERC20InvalidApprover(address(0));
        if (spender == address(0)) revert ERC20InvalidSpender(address(0));
        _allowances[owner][spender] = value;
        if (emitEvent) emit Approval(owner, spender, value);
    }
    
    function _spendAllowance(address owner, address spender, uint256 value) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) revert ERC20InsufficientAllowance(spender, currentAllowance, value);
            unchecked { _approve(owner, spender, currentAllowance - value, false); }
        }
    }
}

contract ETHGRecovery is ERC20, Ownable {
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled;
    uint256 public totalMigrated;
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        migrationEnabled = true;
        totalMigrated = 0;
    }
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Only foundation");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        uint256 amount = 1990000 * 10**18;
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Amount must be positive");
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be positive");
        _mint(to, amount);
    }
}`, 4)}
              className="bg-orange-600 hover:bg-orange-700 w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copiedStep === 4 ? 'Copied to Clipboard!' : 'Copy Contract Source Code'}
            </Button>
          </CardContent>
        </Card>

        {/* Step 5 */}
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">5</span>
              Leave Constructor Arguments EMPTY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-700">
              This is important! Leave the "Constructor Arguments ABI-encoded" field completely empty:
            </p>
            <div className="bg-red-50 border-2 border-red-200 p-4 rounded">
              <strong className="text-red-800">Constructor Arguments: LEAVE EMPTY</strong>
              <p className="text-red-700 text-sm mt-2">
                Your contract has no constructor parameters, so this field must be empty for verification to succeed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Final Step */}
        <Card className="border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Submit Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-green-700">
              After completing all 5 steps above, click "Verify and Publish" on Etherscan.
            </p>
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Verification usually takes 1-2 minutes
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Once verified, your tokens will show proper USD values
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                DEX trading will become available immediately
              </div>
            </div>
            
            <Alert className="mt-4 border-green-300 bg-green-100">
              <AlertDescription className="text-green-800">
                <strong>After verification succeeds:</strong> Your 1,990,000 ETHGR tokens will be tradeable 
                on Uniswap and other DEXs. The "N/A" values will change to real USD amounts.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button 
          onClick={() => window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank')}
          className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          Start Verification Now
        </Button>
        <p className="text-slate-600 mt-2">
          This will unlock your $200k-$1.3M token value
        </p>
      </div>
    </div>
  );
}