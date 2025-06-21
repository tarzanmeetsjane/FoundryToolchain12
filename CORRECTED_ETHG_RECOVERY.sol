// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Corrected Version
 * @dev Fixed constructor for OpenZeppelin v5.x compatibility
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Migration tracking
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    
    // Fixed constructor with required parameters
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Constructor now properly calls parent constructors
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
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount);
    }
    
    /**
     * @dev Toggle migration (owner only)
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
    
    /**
     * @dev Emergency mint (owner only)
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Check if 37 ETH is present in this contract
     * Useful for recovery verification
     */
    function checkETHBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Emergency ETH withdrawal (owner only)
     * In case 37 ETH is trapped in this contract
     */
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "ETH withdrawal failed");
    }
    
    /**
     * @dev Allow contract to receive ETH
     */
    receive() external payable {}
}