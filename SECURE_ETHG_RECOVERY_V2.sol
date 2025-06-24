// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ETHG Recovery Token V2
 * @dev Secure recovery token with proper burn mechanisms and decentralization
 * Contract Address: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
 * Enhanced with burn functionality and security measures
 */
contract ETHGRecoveryV2 is ERC20, Ownable, ReentrancyGuard {
    
    // Foundation and burn addresses
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    address public constant BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    
    // Token economics
    uint256 public constant TOTAL_RECOVERY_SUPPLY = 1990000 * 10**18;
    uint256 public constant FOUNDATION_RESERVE = 605570 * 10**18; // Victim assistance reserve
    uint256 public constant RELIEF_CONVERSION = 219300 * 10**18;  // $45,000 relief conversion
    
    // Burn tracking
    uint256 public totalBurned;
    mapping(address => uint256) public burnHistory;
    
    // Recovery tracking
    mapping(address => bool) public registeredVictims;
    mapping(address => uint256) public victimAllocations;
    
    uint256 public totalVictimsRegistered;
    uint256 public totalRecoveryDistributed;
    bool public recoveryActive = true;
    
    // Security features
    uint256 public maxTransferAmount = 100000 * 10**18; // Prevent large dumps
    mapping(address => bool) public exemptFromLimits;
    
    event TokensBurned(address indexed burner, uint256 amount, string reason);
    event VictimRegistered(address indexed victim, uint256 allocation);
    event RecoveryDistributed(address indexed victim, uint256 amount);
    event FoundationConversion(uint256 amount, string purpose);
    event TransferLimitUpdated(uint256 newLimit);
    
    constructor() ERC20("ETHG Recovery V2", "ETHGR") Ownable(msg.sender) {
        // Mint foundation reserve for victim assistance
        _mint(FOUNDATION_WALLET, FOUNDATION_RESERVE);
        
        // Mint relief conversion amount to foundation for $45,000 conversion
        _mint(FOUNDATION_WALLET, RELIEF_CONVERSION);
        
        // Burn remaining supply to prevent centralization
        uint256 remainingSupply = TOTAL_RECOVERY_SUPPLY - FOUNDATION_RESERVE - RELIEF_CONVERSION;
        if (remainingSupply > 0) {
            _mint(address(this), remainingSupply);
            _burn(address(this), remainingSupply);
            totalBurned += remainingSupply;
            emit TokensBurned(address(this), remainingSupply, "Initial supply burn for decentralization");
        }
        
        // Set foundation wallet as exempt from transfer limits
        exemptFromLimits[FOUNDATION_WALLET] = true;
        exemptFromLimits[address(this)] = true;
        
        // Transfer ownership to foundation
        if (msg.sender != FOUNDATION_WALLET) {
            _transferOwnership(FOUNDATION_WALLET);
        }
    }
    
    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     * @param reason Reason for burning tokens
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
     * @dev Foundation burn function for supply management
     * @param amount Amount to burn from foundation holdings
     * @param reason Purpose of burn
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
     * @param amount Amount to send to burn address
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
     * @dev Register fraud victim for recovery allocation
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
     * @dev Distribute recovery tokens to registered victim
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
     * @dev Foundation conversion for relief operations
     */
    function foundationConversion(uint256 amount, string memory purpose) external onlyOwner {
        require(amount > 0, "Amount must be positive");
        require(balanceOf(FOUNDATION_WALLET) >= amount, "Insufficient foundation balance");
        
        emit FoundationConversion(amount, purpose);
    }
    
    /**
     * @dev Update maximum transfer amount
     */
    function updateTransferLimit(uint256 newLimit) external onlyOwner {
        maxTransferAmount = newLimit;
        emit TransferLimitUpdated(newLimit);
    }
    
    /**
     * @dev Set address exemption from transfer limits
     */
    function setExemptFromLimits(address account, bool exempt) external onlyOwner {
        exemptFromLimits[account] = exempt;
    }
    
    /**
     * @dev Override transfer to implement security limits
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        if (!exemptFromLimits[msg.sender] && to != BURN_ADDRESS) {
            require(amount <= maxTransferAmount, "Transfer amount exceeds limit");
        }
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Override transferFrom with security limits
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        if (!exemptFromLimits[from] && to != BURN_ADDRESS) {
            require(amount <= maxTransferAmount, "Transfer amount exceeds limit");
        }
        return super.transferFrom(from, to, amount);
    }
    
    /**
     * @dev Get burn statistics
     */
    function getBurnStats() external view returns (
        uint256 totalBurnedAmount,
        uint256 burnAddressBalance,
        uint256 circulatingSupply
    ) {
        return (
            totalBurned,
            balanceOf(BURN_ADDRESS),
            totalSupply() - balanceOf(BURN_ADDRESS)
        );
    }
    
    /**
     * @dev Get foundation statistics
     */
    function getFoundationStats() external view returns (
        uint256 foundationBalance,
        uint256 victimsCount,
        uint256 recoveryDistributed,
        uint256 reserveRemaining
    ) {
        return (
            balanceOf(FOUNDATION_WALLET),
            totalVictimsRegistered,
            totalRecoveryDistributed,
            FOUNDATION_RESERVE - totalRecoveryDistributed
        );
    }
    
    /**
     * @dev Emergency functions for security
     */
    function pauseRecovery() external onlyOwner {
        recoveryActive = false;
    }
    
    function resumeRecovery() external onlyOwner {
        recoveryActive = true;
    }
}