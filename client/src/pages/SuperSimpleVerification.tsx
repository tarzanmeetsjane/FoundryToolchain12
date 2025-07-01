import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function SuperSimpleVerification() {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const contractCode = `// SPDX-License-Identifier: MIT
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
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Super Simple Verification Guide
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Follow these exact steps to unlock your $200k-$1.3M ETHGR tokens
        </p>
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Don't worry! We'll do this together step by step. Your tokens are safe.
          </AlertDescription>
        </Alert>
      </div>

      {/* Step 1 */}
      {step >= 1 && (
        <Card className="mb-6 border-2 border-blue-300">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl text-blue-800">
              Step 1: Open Etherscan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg mb-4">
              Click this button to open Etherscan verification page:
            </p>
            <Button 
              onClick={() => {
                window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank');
                setStep(2);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-xl py-4 px-8 w-full"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              CLICK HERE - Open Etherscan
            </Button>
            <p className="text-sm text-slate-600 mt-2">
              This opens a new tab. Keep this page open too.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Step 2 */}
      {step >= 2 && (
        <Card className="mb-6 border-2 border-purple-300">
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-2xl text-purple-800">
              Step 2: Select "Solidity (Single file)"
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg mb-4">
              On the Etherscan page, find the dropdown that says "Compiler Type"
            </p>
            <div className="bg-purple-100 p-4 rounded border-2 border-purple-300 text-center">
              <p className="text-xl font-bold text-purple-800">
                Select: "Solidity (Single file)"
              </p>
            </div>
            <Button 
              onClick={() => setStep(3)}
              className="bg-purple-600 hover:bg-purple-700 mt-4 w-full"
            >
              Done - Next Step
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3 */}
      {step >= 3 && (
        <Card className="mb-6 border-2 border-green-300">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-2xl text-green-800">
              Step 3: Select Compiler Version
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg mb-4">
              Find the "Compiler" dropdown and select this exact version:
            </p>
            <div className="bg-green-100 p-4 rounded border-2 border-green-300 text-center">
              <p className="text-xl font-bold text-green-800">
                v0.8.30+commit.73712a01
              </p>
            </div>
            <Button 
              onClick={() => setStep(4)}
              className="bg-green-600 hover:bg-green-700 mt-4 w-full"
            >
              Done - Next Step
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4 */}
      {step >= 4 && (
        <Card className="mb-6 border-2 border-orange-300">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-2xl text-orange-800">
              Step 4: Copy the Contract Code
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg mb-4">
              Click this button to copy the contract code:
            </p>
            <Button 
              onClick={() => {
                copyToClipboard();
                setStep(5);
              }}
              className="bg-orange-600 hover:bg-orange-700 text-xl py-4 px-8 w-full"
            >
              <Copy className="h-5 w-5 mr-2" />
              {copied ? 'COPIED!' : 'COPY CONTRACT CODE'}
            </Button>
            {copied && (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Contract code copied! Now paste it into Etherscan.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 5 */}
      {step >= 5 && (
        <Card className="mb-6 border-2 border-red-300">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-2xl text-red-800">
              Step 5: Paste Code & Leave Constructor EMPTY
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2">
                  1. Find the big text box labeled "Solidity Contract Code"
                </p>
                <p className="text-lg mb-4">
                  2. Paste the code you just copied (Ctrl+V or Cmd+V)
                </p>
              </div>
              
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  <strong>IMPORTANT:</strong> Find "Constructor Arguments" field and LEAVE IT COMPLETELY EMPTY
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={() => setStep(6)}
                className="bg-red-600 hover:bg-red-700 w-full"
              >
                Done - Final Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6 */}
      {step >= 6 && (
        <Card className="border-2 border-green-400 bg-green-50">
          <CardHeader>
            <CardTitle className="text-3xl text-green-800 text-center">
              Step 6: Click "Verify and Publish"
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <p className="text-xl mb-6">
              On Etherscan, scroll down and click the blue "Verify and Publish" button
            </p>
            
            <div className="bg-green-100 p-6 rounded border-2 border-green-300">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                What happens next:
              </h3>
              <div className="space-y-2 text-green-700 text-lg">
                <div>✅ Verification takes 1-2 minutes</div>
                <div>✅ Your tokens will show real USD values</div>
                <div>✅ DEX trading becomes available</div>
                <div>✅ 1,990,000 ETHGR tokens unlocked</div>
              </div>
            </div>

            <Alert className="mt-6 border-green-300 bg-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 text-lg">
                <strong>Success!</strong> Once verified, your $200k-$1.3M ETHGR tokens will be fully tradeable. 
                The "N/A" values will change to real money amounts.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}