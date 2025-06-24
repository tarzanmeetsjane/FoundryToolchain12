// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token
 * @dev Recovery token for ETHG fraud victims - Foundation managed
 * Contract Address: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
 * Creator: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 * Total Supply: 1,990,000 ETHGR
 * Purpose: Victim assistance foundation asset conversion to $45,000 relief
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Foundation details
    string public constant PURPOSE = "ETHG fraud victim assistance and recovery";
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    uint256 public constant TOTAL_RECOVERY_SUPPLY = 1990000 * 10**18;
    
    // Recovery tracking
    mapping(address => bool) public registeredVictims;
    mapping(address => uint256) public victimAllocations;
    
    uint256 public totalVictimsRegistered;
    uint256 public totalRecoveryAllocated;
    bool public recoveryActive = true;
    
    event VictimRegistered(address indexed victim, uint256 allocation);
    event RecoveryDistributed(address indexed victim, uint256 amount);
    event FoundationConversion(uint256 amount, string purpose);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Mint total supply to foundation wallet for victim assistance
        _mint(FOUNDATION_WALLET, TOTAL_RECOVERY_SUPPLY);
        
        // Transfer ownership to foundation
        if (msg.sender != FOUNDATION_WALLET) {
            _transferOwnership(FOUNDATION_WALLET);
        }
    }
    
    /**
     * @dev Register fraud victim for recovery allocation
     * @param victim Address of verified fraud victim
     * @param allocation Recovery token allocation amount
     */
    function registerVictim(address victim, uint256 allocation) external onlyOwner {
        require(!registeredVictims[victim], "Victim already registered");
        require(allocation > 0, "Allocation must be positive");
        require(totalRecoveryAllocated + allocation <= TOTAL_RECOVERY_SUPPLY, "Exceeds total supply");
        
        registeredVictims[victim] = true;
        victimAllocations[victim] = allocation;
        totalVictimsRegistered++;
        totalRecoveryAllocated += allocation;
        
        emit VictimRegistered(victim, allocation);
    }
    
    /**
     * @dev Distribute recovery tokens to registered victim
     * @param victim Address of registered victim
     */
    function distributeRecovery(address victim) external onlyOwner {
        require(registeredVictims[victim], "Victim not registered");
        require(victimAllocations[victim] > 0, "No allocation available");
        require(recoveryActive, "Recovery distribution paused");
        
        uint256 allocation = victimAllocations[victim];
        victimAllocations[victim] = 0;
        
        _transfer(FOUNDATION_WALLET, victim, allocation);
        
        emit RecoveryDistributed(victim, allocation);
    }
    
    /**
     * @dev Foundation conversion for operational expenses and victim assistance
     * @param amount Amount to convert for foundation operations
     * @param purpose Description of conversion purpose
     */
    function foundationConversion(uint256 amount, string memory purpose) external onlyOwner {
        require(amount > 0, "Amount must be positive");
        require(balanceOf(FOUNDATION_WALLET) >= amount, "Insufficient foundation balance");
        
        // Conversion will be handled externally via DEX trading
        // This function provides transparency for foundation activities
        
        emit FoundationConversion(amount, purpose);
    }
    
    /**
     * @dev Emergency pause recovery distribution
     */
    function pauseRecovery() external onlyOwner {
        recoveryActive = false;
    }
    
    /**
     * @dev Resume recovery distribution
     */
    function resumeRecovery() external onlyOwner {
        recoveryActive = true;
    }
    
    /**
     * @dev Get victim registration status and allocation
     * @param victim Address to check
     * @return registered Whether victim is registered
     * @return allocation Current allocation amount
     */
    function getVictimStatus(address victim) external view returns (bool registered, uint256 allocation) {
        return (registeredVictims[victim], victimAllocations[victim]);
    }
    
    /**
     * @dev Get foundation statistics
     * @return totalSupply Total token supply
     * @return foundationBalance Current foundation balance
     * @return victimsCount Number of registered victims
     * @return recoveryAllocated Total recovery allocated to victims
     */
    function getFoundationStats() external view returns (
        uint256 totalSupply,
        uint256 foundationBalance,
        uint256 victimsCount,
        uint256 recoveryAllocated
    ) {
        return (
            totalSupply(),
            balanceOf(FOUNDATION_WALLET),
            totalVictimsRegistered,
            totalRecoveryAllocated
        );
    }
    
    /**
     * @dev Standard ERC20 transfer with recovery tracking
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        // Allow foundation to manage tokens for victim assistance
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Standard ERC20 transferFrom with recovery tracking
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        // Standard ERC20 functionality for DEX trading
        return super.transferFrom(from, to, amount);
    }
}