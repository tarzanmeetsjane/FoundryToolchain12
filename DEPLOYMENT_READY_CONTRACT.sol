// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token
 * @dev Fixed version allowing specific address to migrate trapped tokens
 */
contract ETHGRecovery is ERC20, Ownable {
    // Constants
    uint256 public constant MAX_SUPPLY = 100000000 * 10**18; // 100M tokens max
    address public constant TRAPPED_USER = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    uint256 public constant TRAPPED_AMOUNT = 1990000 * 10**18; // 1,990,000 tokens
    
    // State variables
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Contract ready for deployment
    }
    
    /**
     * @dev FIXED TRANSFER FUNCTION - No honeypot restrictions
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(balanceOf(msg.sender) >= amount, "ERC20: transfer amount exceeds balance");
        
        // Call parent transfer - NO HONEYPOT BLOCKS
        return super.transfer(to, amount);
    }
    
    /**
     * @dev FIXED TRANSFER FROM - No honeypot restrictions
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(balanceOf(from) >= amount, "ERC20: transfer amount exceeds balance");
        
        // Call parent transferFrom - NO HONEYPOT BLOCKS
        return super.transferFrom(from, to, amount);
    }
    
    /**
     * @dev Mint tokens for contract owner
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    /**
     * @dev CORRECTED: Migrate trapped ETHG tokens for specific user
     * This function allows ONLY the trapped user to migrate their tokens
     */
    function migrateMyTrappedETHG() external {
        require(msg.sender == TRAPPED_USER, "Only trapped user can call this function");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(migrationEnabled, "Migration disabled");
        
        // Mark as migrated
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = TRAPPED_AMOUNT;
        totalMigrated += TRAPPED_AMOUNT;
        
        // Mint recovery tokens 1:1 ratio
        _mint(msg.sender, TRAPPED_AMOUNT);
        
        emit TokensMigrated(msg.sender, TRAPPED_AMOUNT, TRAPPED_AMOUNT);
    }
    
    /**
     * @dev General migration function for other ETHG holders
     */
    function migrateTrappedETHG(uint256 amount) external {
        require(msg.sender != TRAPPED_USER, "Use migrateMyTrappedETHG instead");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(migrationEnabled, "Migration disabled");
        require(amount > 0, "Amount must be greater than 0");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        
        // Mark as migrated
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = amount;
        totalMigrated += amount;
        
        // Mint recovery tokens 1:1 ratio
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount, amount);
    }
    
    /**
     * @dev Toggle migration status (owner only)
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationStatusChanged(migrationEnabled);
    }
    
    /**
     * @dev Emergency mint function (owner only)
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    /**
     * @dev Check if address has migrated
     */
    function checkMigrationStatus(address user) external view returns (bool migrated, uint256 balance, uint256 originalBalance) {
        return (hasMigrated[user], balanceOf(user), originalETHGBalance[user]);
    }
}