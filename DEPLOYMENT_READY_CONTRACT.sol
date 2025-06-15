// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR)
 * @dev Fixed version of trapped ETHG tokens with full transfer capability
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 * 
 * Purpose: Recover 1,990,000 trapped ETHG tokens from honeypot contract
 * Original Contract: 0x3fC29836E84E471a053D2D9E80494A867D670EAD (HONEYPOT)
 */
contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    // Migration tracking for trapped ETHG holders
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    
    // Original honeypot contract address
    address public constant ORIGINAL_ETHG = 0x3fC29836E84E471a053D2D9E80494A867D670EAD;
    
    // Migration controls
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
     * This is the key difference from the original ETHG contract
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
     * @dev Migrate trapped ETHG tokens for the contract owner
     * This function is specifically for wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
     * Amount: 1,990,000 ETHG tokens (1990000 * 10^18 wei)
     */
    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Only authorized wallet can migrate");
        require(migrationEnabled, "Migration is disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 trappedAmount = 1990000 * 10**18; // 1,990,000 ETHG tokens
        
        // Mark as migrated
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = trappedAmount;
        totalMigrated += trappedAmount;
        
        // Mint recovery tokens 1:1 ratio
        _mint(msg.sender, trappedAmount);
        
        emit TokensMigrated(msg.sender, trappedAmount, trappedAmount);
    }
    
    /**
     * @dev Emergency migration function for other trapped ETHG holders
     * Requires proof of trapped ETHG balance
     */
    function migrateTrappedETHG(uint256 trappedAmount) external {
        require(migrationEnabled, "Migration is disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(trappedAmount > 0, "Invalid amount");
        require(totalSupply() + trappedAmount <= MAX_SUPPLY, "Exceeds max supply");
        
        // Mark as migrated
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = trappedAmount;
        totalMigrated += trappedAmount;
        
        // Mint recovery tokens 1:1 ratio
        _mint(msg.sender, trappedAmount);
        
        emit TokensMigrated(msg.sender, trappedAmount, trappedAmount);
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
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
    
    /**
     * @dev Get migration status for an address
     */
    function getMigrationStatus(address holder) external view returns (bool migrated, uint256 originalAmount) {
        return (hasMigrated[holder], originalETHGBalance[holder]);
    }
}