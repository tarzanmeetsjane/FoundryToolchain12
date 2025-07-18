# ETHGR Contract Verification - Ready for Submission

## Contract Details
- **Address**: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
- **Network**: Ethereum Mainnet
- **Status**: Deployed and ready for verification

## Verification Settings for Etherscan
- **Contract Name**: ETHGRecovery
- **Compiler Version**: v0.8.30+commit.73712a01
- **Optimization**: Enabled (200 runs)
- **Constructor Arguments**: EMPTY (leave blank)
- **License**: MIT

## Direct Link
https://etherscan.io/verifyContract?a=0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308

## Contract Source Code (Copy & Paste)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Production Version
 * @dev Optimized for deployment by 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 * @author Foundation Recovery System
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Migration tracking
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    event TokensMigrated(address indexed holder, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Contract deploys with 0 initial supply
        // Tokens minted through migration process
    }
    
    /**
     * @dev Your specific migration function to recover trapped ETHG
     * Mints 1,990,000 ETHGR tokens to foundation wallet
     */
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Only foundation");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 migrationAmount = 1990000 * 10**18; // 1,990,000 tokens
        hasMigrated[msg.sender] = true;
        
        _mint(msg.sender, migrationAmount);
        emit TokensMigrated(msg.sender, migrationAmount);
    }
    
    /**
     * @dev General migration function for other holders
     */
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Amount must be positive");
        
        hasMigrated[msg.sender] = true;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }
    
    /**
     * @dev Emergency mint for foundation operations
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be positive");
        _mint(to, amount);
    }
    
    /**
     * @dev Toggle migration functionality
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    /**
     * @dev Standard ERC20 transfer - no restrictions
     */
    function transfer(address to, uint256 value) public virtual override returns (bool) {
        return super.transfer(to, value);
    }
    
    /**
     * @dev Standard ERC20 transferFrom - no restrictions
     */
    function transferFrom(address from, address to, uint256 value) public virtual override returns (bool) {
        return super.transferFrom(from, to, value);
    }
}
```

## Step-by-Step Instructions

1. **Click the link above** to go to Etherscan verification
2. **Select "Solidity (Single file)"**
3. **Enter the exact settings** listed above
4. **Paste the contract source code** from above
5. **Submit for verification**

## Expected Results
- Verification completes in 5-10 minutes
- Your 1,990,000 ETHGR tokens will show proper prices
- Tokens become fully tradeable on DEXs
- Portfolio trackers will display correct values

## Next Steps After Verification
1. Visit `/optimism-fix` to deploy correct ERC-20 contract on Optimism
2. Start trading your verified tokens
3. Enjoy 90% lower fees on Optimism after the fix