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