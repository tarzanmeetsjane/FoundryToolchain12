
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Optimism Deployment
 * @dev Corrected ERC-20 token for Optimism with proper price recognition
 * @author Recovery Address: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Migration tracking
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled;
    uint256 public totalMigrated;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        migrationEnabled = true;
        totalMigrated = 0;
        
        // Initial mint to deployer (your wallet)
        _mint(msg.sender, 1990000 * 10**18); // 1,990,000 ETHGR tokens
    }
    
    /**
     * @dev Migrate trapped ETHG tokens for authorized wallet
     * Amount: 1,990,000 ETHG tokens
     */
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Unauthorized");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18; // 1,990,000 tokens
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    /**
     * @dev Emergency migration for other holders
     */
    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Invalid amount");
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    /**
     * @dev Toggle migration (owner only)
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationStatusChanged(migrationEnabled);
    }
    
    /**
     * @dev Emergency mint (owner only)
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Get migration status
     */
    function getMigrationStatus(address account) external view returns (bool migrated, bool enabled) {
        return (hasMigrated[account], migrationEnabled);
    }
}
