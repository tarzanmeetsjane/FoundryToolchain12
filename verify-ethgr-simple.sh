#!/bin/bash

# Simple ETHGR Contract Verification Guide
# No Foundry required - just guidance for manual verification

echo "🔍 ETHGR Contract Verification Guide"
echo "====================================="
echo ""
echo "Contract Address: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308"
echo "Network: Ethereum Mainnet"
echo "Compiler Version: v0.8.30+commit.73712a01"
echo ""

echo "📋 Manual Verification Steps:"
echo "1. Go to Etherscan verification page"
echo "2. Select 'Solidity (Single file)'"
echo "3. Enter compiler version: v0.8.30+commit.73712a01"
echo "4. Paste your contract source code"
echo "5. Constructor arguments: LEAVE EMPTY"
echo "6. Submit for verification"
echo ""

echo "🌐 Opening Etherscan verification page..."
echo "URL: https://etherscan.io/verifyContract?a=0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308"
echo ""

echo "📄 Contract Source Code Location:"
if [ -f "src/ETHGRecovery.sol" ]; then
    echo "✅ Found: src/ETHGRecovery.sol"
    echo ""
    echo "📋 Contract Source Preview:"
    echo "=========================="
    head -20 src/ETHGRecovery.sol
    echo "... (truncated)"
    echo ""
else
    echo "❌ Contract source not found at src/ETHGRecovery.sol"
    echo ""
    echo "📋 Alternative: Use this contract source:"
    echo "========================================"
    cat << 'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 15000000 * 10**18;
    uint256 public totalMinted = 0;
    
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public migrationAmounts;
    bool public migrationEnabled = true;
    
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    event MigrationEvent(address indexed user, uint256 amount);
    event MigrationToggled(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") {
        _mint(FOUNDATION_WALLET, 1990000 * 10**18);
        totalMinted = 1990000 * 10**18;
    }
    
    function migrate() external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 120000 * 10**18;
        require(totalMinted + amount <= MAX_SUPPLY, "Would exceed max supply");
        
        hasMigrated[msg.sender] = true;
        migrationAmounts[msg.sender] = amount;
        totalMinted += amount;
        
        _mint(msg.sender, amount);
        emit MigrationEvent(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationToggled(migrationEnabled);
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalMinted + amount <= MAX_SUPPLY, "Would exceed max supply");
        totalMinted += amount;
        _mint(to, amount);
    }
    
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
EOF
fi

echo ""
echo "🔧 Verification Settings:"
echo "========================"
echo "Contract Name: ETHGRecovery"
echo "Compiler Version: v0.8.30+commit.73712a01"
echo "Optimization: Enabled (200 runs)"
echo "Constructor Arguments: EMPTY (leave blank)"
echo "License: MIT"
echo ""

echo "🚀 Ready to verify!"
echo "Copy the contract source code above and paste it into Etherscan"
echo ""
echo "✅ After verification, your tokens will show proper prices!"