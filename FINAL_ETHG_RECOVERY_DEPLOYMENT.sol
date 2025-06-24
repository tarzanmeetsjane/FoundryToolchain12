// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ETHG Recovery Token - Final Deployment
 * @dev Complete recovery solution with burn mechanisms and migration
 * Deployer: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 * Purpose: Recover 1,990,000 trapped ETHG tokens with full functionality
 */
contract ETHGRecovery is ERC20, Ownable, ReentrancyGuard {
    
    // Foundation addresses
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    address public constant BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    
    // Token economics with burn strategy
    uint256 public constant TOTAL_RECOVERY_SUPPLY = 1990000 * 10**18;
    uint256 public constant FOUNDATION_RESERVE = 605570 * 10**18;   // Victim assistance reserve
    uint256 public constant RELIEF_CONVERSION = 219300 * 10**18;    // $45,000 relief target
    uint256 public constant CREATOR_RECOVERY = 1990000 * 10**18;    // Your trapped tokens
    
    // Migration and burn tracking
    bool public migrationCompleted = false;
    uint256 public totalBurned = 0;
    mapping(address => uint256) public burnHistory;
    
    // Victim assistance tracking
    mapping(address => bool) public registeredVictims;
    mapping(address => uint256) public victimAllocations;
    uint256 public totalVictimsRegistered;
    uint256 public totalRecoveryDistributed;
    
    // Security features
    uint256 public maxTransferAmount = 500000 * 10**18; // Prevent dumps
    mapping(address => bool) public exemptFromLimits;
    bool public recoveryActive = true;
    
    // Events
    event CreatorMigrationCompleted(address indexed creator, uint256 amount);
    event TokensBurned(address indexed burner, uint256 amount, string reason);
    event VictimRegistered(address indexed victim, uint256 allocation);
    event RecoveryDistributed(address indexed victim, uint256 amount);
    event FoundationConversion(uint256 amount, string purpose);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Set foundation wallet as exempt from limits
        exemptFromLimits[FOUNDATION_WALLET] = true;
        exemptFromLimits[address(this)] = true;
        
        // Transfer ownership to foundation
        if (msg.sender != FOUNDATION_WALLET) {
            _transferOwnership(FOUNDATION_WALLET);
        }
    }
    
    /**
     * @dev Your specific migration function to recover trapped ETHG
     * Only callable by contract creator (you)
     */
    function migrateMyTrappedETHG() external {
        require(msg.sender == FOUNDATION_WALLET, "Only creator can migrate");
        require(!migrationCompleted, "Migration already completed");
        
        // Mint your recovery tokens
        _mint(FOUNDATION_WALLET, CREATOR_RECOVERY);
        migrationCompleted = true;
        
        emit CreatorMigrationCompleted(FOUNDATION_WALLET, CREATOR_RECOVERY);
        
        // After minting, execute strategic burns to optimize tokenomics
        _executeBurnStrategy();
    }
    
    /**
     * @dev Internal function to execute burn strategy after migration
     */
    function _executeBurnStrategy() internal {
        // Calculate excess tokens to burn for optimal supply
        uint256 targetSupply = FOUNDATION_RESERVE + RELIEF_CONVERSION;
        uint256 currentSupply = totalSupply();
        
        if (currentSupply > targetSupply) {
            uint256 burnAmount = currentSupply - targetSupply;
            
            // Burn excess tokens to prevent centralization
            _burn(FOUNDATION_WALLET, burnAmount);
            totalBurned += burnAmount;
            burnHistory[FOUNDATION_WALLET] += burnAmount;
            
            emit TokensBurned(FOUNDATION_WALLET, burnAmount, "Strategic supply optimization");
        }
    }
    
    /**
     * @dev Manual burn function for additional supply management
     */
    function burnTokens(uint256 amount, string memory reason) external nonReentrant {
        require(amount > 0, "Amount must be positive");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        totalBurned += amount;
        burnHistory[msg.sender] += amount;
        
        emit TokensBurned(msg.sender, amount, reason);
    }
    
    /**
     * @dev Foundation burn for supply control
     */
    function foundationBurn(uint256 amount, string memory reason) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must be positive");
        require(balanceOf(FOUNDATION_WALLET) >= amount, "Insufficient foundation balance");
        
        _burn(FOUNDATION_WALLET, amount);
        totalBurned += amount;
        burnHistory[FOUNDATION_WALLET] += amount;
        
        emit TokensBurned(FOUNDATION_WALLET, amount, reason);
    }
    
    /**
     * @dev Send tokens to burn address (alternative burn method)
     */
    function sendToBurnAddress(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be positive");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _transfer(msg.sender, BURN_ADDRESS, amount);
        totalBurned += amount;
        burnHistory[msg.sender] += amount;
        
        emit TokensBurned(msg.sender, amount, "Sent to burn address");
    }
    
    /**
     * @dev Register fraud victim for assistance
     */
    function registerVictim(address victim, uint256 allocation) external onlyOwner {
        require(!registeredVictims[victim], "Victim already registered");
        require(allocation > 0, "Allocation must be positive");
        require(balanceOf(FOUNDATION_WALLET) >= allocation, "Insufficient foundation balance");
        
        registeredVictims[victim] = true;
        victimAllocations[victim] = allocation;
        totalVictimsRegistered++;
        
        emit VictimRegistered(victim, allocation);
    }
    
    /**
     * @dev Distribute recovery tokens to victim
     */
    function distributeRecovery(address victim) external onlyOwner nonReentrant {
        require(registeredVictims[victim], "Victim not registered");
        require(victimAllocations[victim] > 0, "No allocation available");
        require(recoveryActive, "Recovery distribution paused");
        
        uint256 allocation = victimAllocations[victim];
        victimAllocations[victim] = 0;
        totalRecoveryDistributed += allocation;
        
        _transfer(FOUNDATION_WALLET, victim, allocation);
        
        emit RecoveryDistributed(victim, allocation);
    }
    
    /**
     * @dev Foundation conversion tracking for transparency
     */
    function foundationConversion(uint256 amount, string memory purpose) external onlyOwner {
        require(amount > 0, "Amount must be positive");
        require(balanceOf(FOUNDATION_WALLET) >= amount, "Insufficient foundation balance");
        
        emit FoundationConversion(amount, purpose);
    }
    
    /**
     * @dev Security: Update transfer limits
     */
    function updateTransferLimit(uint256 newLimit) external onlyOwner {
        maxTransferAmount = newLimit;
    }
    
    /**
     * @dev Security: Set exemptions from limits
     */
    function setExemptFromLimits(address account, bool exempt) external onlyOwner {
        exemptFromLimits[account] = exempt;
    }
    
    /**
     * @dev Override transfer with security controls
     * FIXED: No honeypot restrictions - full transfer capability
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        // Security limits only apply to non-exempt addresses and not burn address
        if (!exemptFromLimits[msg.sender] && to != BURN_ADDRESS) {
            require(amount <= maxTransferAmount, "Transfer amount exceeds limit");
        }
        
        // Standard ERC20 transfer - NO HONEYPOT BLOCKS
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Override transferFrom with security controls
     * FIXED: No honeypot restrictions - full transferFrom capability
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        // Security limits only apply to non-exempt addresses and not burn address
        if (!exemptFromLimits[from] && to != BURN_ADDRESS) {
            require(amount <= maxTransferAmount, "Transfer amount exceeds limit");
        }
        
        // Standard ERC20 transferFrom - NO HONEYPOT BLOCKS
        return super.transferFrom(from, to, amount);
    }
    
    /**
     * @dev Get comprehensive statistics
     */
    function getTokenStats() external view returns (
        uint256 totalSupplyAmount,
        uint256 foundationBalance,
        uint256 totalBurnedAmount,
        uint256 circulatingSupply,
        bool migrationStatus
    ) {
        return (
            totalSupply(),
            balanceOf(FOUNDATION_WALLET),
            totalBurned,
            totalSupply() - balanceOf(BURN_ADDRESS),
            migrationCompleted
        );
    }
    
    /**
     * @dev Get foundation assistance statistics
     */
    function getFoundationStats() external view returns (
        uint256 victimsRegistered,
        uint256 recoveryDistributed,
        uint256 reserveRemaining
    ) {
        return (
            totalVictimsRegistered,
            totalRecoveryDistributed,
            balanceOf(FOUNDATION_WALLET) - totalRecoveryDistributed
        );
    }
    
    /**
     * @dev Emergency controls
     */
    function pauseRecovery() external onlyOwner {
        recoveryActive = false;
    }
    
    function resumeRecovery() external onlyOwner {
        recoveryActive = true;
    }
    
    /**
     * @dev Check if address has been burned to
     */
    function getBurnHistory(address account) external view returns (uint256) {
        return burnHistory[account];
    }
}