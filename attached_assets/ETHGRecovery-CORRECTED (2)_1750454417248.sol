// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR)
 * @dev Fixed version of trapped ETHG tokens with full transfer capability
 * @author Sole Proprietor - Blockchain Recovery Services
 * 
 * Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 * Purpose: Recover 1,990,000 trapped ETHG tokens from honeypot contract
 * Original Contract: 0x3fc29836e84e471a053d2d9e80494a867d670ead (HONEYPOT)
 */
contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens (18 decimals)
    
    // Migration tracking for trapped ETHG holders
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    
    // Original honeypot contract address
    address public constant ORIGINAL_ETHG = 0x3fc29836e84e471a053d2d9e80494a867d670ead;
    
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
     * @dev Mint tokens for contract owner (you)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    /**
     * @dev Migrate your specific trapped ETHG tokens
     * Call this function to recover your 1,990,000 ETHG tokens
     */
    function migrateMyTrappedETHG() external {
        require(msg.sender == owner(), "Only contract owner can migrate");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(migrationEnabled, "Migration disabled");
        
        // Your specific trapped amount: 1,990,000 ETHG
        // Converting to 18 decimals: 1,990,000 * 10**18
        uint256 trappedAmount = 1990000 * 10**18;
        
        // Mark as migrated
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = trappedAmount;
        totalMigrated += trappedAmount;
        
        // Mint recovery tokens 1:1 ratio
        _mint(msg.sender, trappedAmount);
        
        emit TokensMigrated(msg.sender, trappedAmount, trappedAmount);
    }
    
    /**
     * @dev General migration function for other ETHG holders
     */
    function migrateFromETHG(uint256 ethgAmount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(ethgAmount > 0, "Amount must be greater than 0");
        require(ethgAmount <= MAX_SUPPLY, "Amount exceeds max supply");
        
        // Mark as migrated
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = ethgAmount;
        totalMigrated += ethgAmount;
        
        // Mint recovery tokens 1:1 ratio
        _mint(msg.sender, ethgAmount);
        
        emit TokensMigrated(msg.sender, ethgAmount, ethgAmount);
    }
    
    /**
     * @dev Burn tokens
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Toggle migration on/off (owner only)
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationStatusChanged(migrationEnabled);
    }
    
    /**
     * @dev Get migration information for an address
     */
    function getMigrationInfo(address account) external view returns (
        bool migrated,
        uint256 originalBalance,
        uint256 recoveryBalance
    ) {
        return (
            hasMigrated[account],
            originalETHGBalance[account],
            balanceOf(account)
        );
    }
    
    /**
     * @dev Emergency withdrawal (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}