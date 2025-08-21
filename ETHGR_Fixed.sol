// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ETHGR Recovery Token - Fixed Version
 * @dev Fixed contract with callback, payable, and fallback functions
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRRecovery is ERC20, Ownable, ReentrancyGuard {
    
    // Migration tracking
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    event ETHReceived(address indexed sender, uint256 amount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Fallback function to accept ETH
     */
    fallback() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Payable function to accept ETH deposits
     */
    function depositETH() external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");
        emit ETHReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Migrate trapped ETHG tokens for authorized wallet
     * Amount: 1,990,000 ETHGR tokens
     */
    function migrateMyTrappedETHG() external nonReentrant {
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
    function migrateTrappedETHG(uint256 amount) external nonReentrant {
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
        emit MigrationStatusChanged(migrationEnabled);
    }
    
    /**
     * @dev Emergency mint (owner only)
     */
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Withdraw ETH from contract (owner only)
     */
    function withdrawETH() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "ETH withdrawal failed");
    }
    
    /**
     * @dev Get contract ETH balance
     */
    function getETHBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Get total contract value (ETH + tokens)
     */
    function getTotalValue() external view returns (uint256 ethBalance, uint256 tokenBalance) {
        ethBalance = address(this).balance;
        tokenBalance = totalSupply();
    }
}

