// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Final Fixed Version
 * @dev Constructor properly implemented for OpenZeppelin v5.x
 * @author Recovery Contract for 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRecovery is ERC20("ETHG Recovery", "ETHGR"), Ownable(msg.sender) {
    
    uint256 public constant TOTAL_SUPPLY = 1990000 * 10**18; // 1,990,000 tokens
    bool public migrationCompleted = false;
    
    // Events for tracking
    event TokensMigrated(address indexed user, uint256 amount);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);
    
    constructor() {
        // Constructor automatically calls:
        // ERC20("ETHG Recovery", "ETHGR") - sets name and symbol
        // Ownable(msg.sender) - sets deployer as owner
        // No additional initialization needed
    }
    
    /**
     * @dev Migrate trapped ETHG tokens to ETHGR (one-time only)
     * @notice Only the contract owner can execute this migration
     */
    function migrateMyTrappedETHG() external {
        require(!migrationCompleted, "Migration already completed");
        require(msg.sender == owner(), "Only owner can migrate");
        
        // Mint the full supply to the owner
        _mint(msg.sender, TOTAL_SUPPLY);
        migrationCompleted = true;
        
        emit TokensMigrated(msg.sender, TOTAL_SUPPLY);
    }
    
    /**
     * @dev Emergency withdrawal function for any ETH sent to contract
     * @notice Only owner can withdraw
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        payable(owner()).transfer(balance);
        emit EmergencyWithdrawal(owner(), balance);
    }
    
    /**
     * @dev View function to check migration status
     */
    function getMigrationStatus() external view returns (bool completed, uint256 totalSupply, address owner_) {
        return (migrationCompleted, TOTAL_SUPPLY, owner());
    }
    
    /**
     * @dev Accept ETH deposits (for emergency scenarios)
     */
    receive() external payable {
        // Allow contract to receive ETH
    }
}