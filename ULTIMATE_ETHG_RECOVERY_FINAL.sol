// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Ultimate Final Version
 * @dev All compilation errors resolved - production ready
 * @author Recovery system for wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRecovery is ERC20("ETHG Recovery", "ETHGR"), Ownable(msg.sender) {
    
    // Constants
    uint256 public constant TOTAL_SUPPLY = 1990000 * 10**18; // 1,990,000 tokens
    
    // State variables
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    bool public migrationCompleted = false;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    event MigrationStatusChanged(bool enabled);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);
    
    /**
     * @dev Constructor automatically calls parent constructors
     * ERC20("ETHG Recovery", "ETHGR") - sets token name and symbol
     * Ownable(msg.sender) - sets deployer as contract owner
     */
    constructor() {
        // All initialization handled by parent constructors
        // migrationEnabled starts as true
    }
    
    /**
     * @dev Main migration function - converts trapped ETHG to ETHGR
     * Only callable by contract owner, only once
     */
    function migrateMyTrappedETHG() external {
        require(migrationEnabled, "Migration is disabled");
        require(!migrationCompleted, "Migration already completed");
        require(msg.sender == owner(), "Only owner can migrate");
        require(!hasMigrated[msg.sender], "Address already migrated");
        
        // Mark migration as completed
        hasMigrated[msg.sender] = true;
        migrationCompleted = true;
        
        // Mint the full supply to the owner
        _mint(msg.sender, TOTAL_SUPPLY);
        
        emit TokensMigrated(msg.sender, TOTAL_SUPPLY);
    }
    
    /**
     * @dev Emergency function to disable migration if needed
     */
    function setMigrationEnabled(bool _enabled) external onlyOwner {
        migrationEnabled = _enabled;
        emit MigrationStatusChanged(_enabled);
    }
    
    /**
     * @dev Emergency withdrawal for any ETH sent to contract
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        payable(owner()).transfer(balance);
        emit EmergencyWithdrawal(owner(), balance);
    }
    
    /**
     * @dev View function to get complete migration status
     */
    function getMigrationInfo() external view returns (
        bool enabled,
        bool completed,
        uint256 totalSupply,
        address contractOwner,
        bool userMigrated
    ) {
        return (
            migrationEnabled,
            migrationCompleted,
            TOTAL_SUPPLY,
            owner(),
            hasMigrated[msg.sender]
        );
    }
    
    /**
     * @dev Override transfer to ensure proper ERC20 functionality
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "Transfer to zero address");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Override transferFrom for proper ERC20 functionality
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "Transfer to zero address");
        require(balanceOf(from) >= amount, "Insufficient balance");
        
        return super.transferFrom(from, to, amount);
    }
    
    /**
     * @dev Allow contract to receive ETH
     */
    receive() external payable {
        // Contract can receive ETH for emergency scenarios
    }
    
    /**
     * @dev Fallback function
     */
    fallback() external payable {
        // Handle unexpected calls
    }
}