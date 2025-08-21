// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title ETHGR Recovery Token
 * @dev Official ETHGR token for ETHG recovery victims
 * @author ETHGR Foundation
 * @notice This token represents recovery rights for ETHG victims
 */
contract ETHGRToken is ERC20, Ownable, ReentrancyGuard, Pausable {
    
    // Tokenomics
    uint256 public constant TOTAL_SUPPLY = 1_990_000 * 10**18; // 1,990,000 ETHGR
    uint256 public constant VICTIM_ALLOCATION = 1_500_000 * 10**18; // 1.5M for victims
    uint256 public constant LIQUIDITY_ALLOCATION = 400_000 * 10**18; // 400K for liquidity
    uint256 public constant TEAM_ALLOCATION = 90_000 * 10**18; // 90K for team/development
    
    // State variables
    bool public victimClaimsEnabled = false;
    bool public liquidityLocked = false;
    uint256 public victimClaimDeadline;
    uint256 public constant CLAIM_PERIOD = 365 days;
    
    // Mappings
    mapping(address => bool) public hasClaimed;
    mapping(address => uint256) public victimAllocation;
    mapping(address => bool) public isAuthorizedVictim;
    
    // Events
    event VictimClaimed(address indexed victim, uint256 amount);
    event LiquidityLocked(address indexed locker, uint256 amount);
    event VictimClaimsEnabled(address indexed enabler);
    event VictimAdded(address indexed victim, uint256 allocation);
    
    // Modifiers
    modifier onlyVictim() {
        require(isAuthorizedVictim[msg.sender], "Not authorized victim");
        require(!hasClaimed[msg.sender], "Already claimed");
        _;
    }
    
    modifier onlyBeforeDeadline() {
        require(block.timestamp <= victimClaimDeadline, "Claim period expired");
        _;
    }
    
    constructor() ERC20("ETHG Recovery Token", "ETHGR") Ownable(msg.sender) {
        // Mint initial supply to contract
        _mint(address(this), TOTAL_SUPPLY);
        
        // Set claim deadline
        victimClaimDeadline = block.timestamp + CLAIM_PERIOD;
        
        // Transfer team allocation to owner
        _transfer(address(this), owner(), TEAM_ALLOCATION);
        
        // Lock remaining tokens in contract until claims are enabled
        _transfer(address(this), address(this), VICTIM_ALLOCATION + LIQUIDITY_ALLOCATION);
    }
    
    /**
     * @dev Enable victim claims (owner only)
     */
    function enableVictimClaims() external onlyOwner {
        require(!victimClaimsEnabled, "Claims already enabled");
        victimClaimsEnabled = true;
        emit VictimClaimsEnabled(msg.sender);
    }
    
    /**
     * @dev Add authorized victim with allocation (owner only)
     */
    function addVictim(address victim, uint256 allocation) external onlyOwner {
        require(victim != address(0), "Invalid address");
        require(allocation > 0, "Invalid allocation");
        require(!isAuthorizedVictim[victim], "Already authorized");
        
        isAuthorizedVictim[victim] = true;
        victimAllocation[victim] = allocation;
        
        emit VictimAdded(victim, allocation);
    }
    
    /**
     * @dev Batch add multiple victims (owner only)
     */
    function batchAddVictims(
        address[] calldata victims, 
        uint256[] calldata allocations
    ) external onlyOwner {
        require(victims.length == allocations.length, "Array length mismatch");
        
        for (uint256 i = 0; i < victims.length; i++) {
            if (victims[i] != address(0) && allocations[i] > 0 && !isAuthorizedVictim[victims[i]]) {
                isAuthorizedVictim[victims[i]] = true;
                victimAllocation[victims[i]] = allocations[i];
                emit VictimAdded(victims[i], allocations[i]);
            }
        }
    }
    
    /**
     * @dev Claim victim allocation
     */
    function claimVictimAllocation() external onlyVictim onlyBeforeDeadline nonReentrant {
        require(victimClaimsEnabled, "Claims not enabled");
        
        uint256 allocation = victimAllocation[msg.sender];
        require(allocation > 0, "No allocation");
        
        hasClaimed[msg.sender] = true;
        _transfer(address(this), msg.sender, allocation);
        
        emit VictimClaimed(msg.sender, allocation);
    }
    
    /**
     * @dev Lock liquidity tokens (owner only)
     */
    function lockLiquidity() external onlyOwner {
        require(!liquidityLocked, "Already locked");
        require(victimClaimsEnabled, "Claims not enabled");
        
        liquidityLocked = true;
        
        // Transfer liquidity allocation to a timelock or multisig
        // For now, keep in contract but mark as locked
        emit LiquidityLocked(msg.sender, LIQUIDITY_ALLOCATION);
    }
    
    /**
     * @dev Get victim claim status
     */
    function getVictimStatus(address victim) external view returns (
        bool isVictim,
        bool hasClaimedStatus,
        uint256 allocation,
        bool canClaim
    ) {
        isVictim = isAuthorizedVictim[victim];
        hasClaimedStatus = this.hasClaimed(victim);
        allocation = victimAllocation[victim];
        canClaim = isVictim && !this.hasClaimed(victim) && victimClaimsEnabled && 
                   block.timestamp <= victimClaimDeadline;
    }
    
    /**
     * @dev Get contract statistics
     */
    function getContractStats() external view returns (
        uint256 totalVictimAllocation,
        uint256 claimedAmount,
        uint256 remainingVictimAllocation,
        uint256 liquidityAmount,
        uint256 timeUntilDeadline
    ) {
        totalVictimAllocation = VICTIM_ALLOCATION;
        claimedAmount = 0; // Would need to track this
        remainingVictimAllocation = VICTIM_ALLOCATION; // Would need to track this
        liquidityAmount = LIQUIDITY_ALLOCATION;
        timeUntilDeadline = victimClaimDeadline > block.timestamp ? 
                           victimClaimDeadline - block.timestamp : 0;
    }
    
    /**
     * @dev Emergency pause (owner only)
     */
    function emergencyPause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Emergency unpause (owner only)
     */
    function emergencyUnpause() external onlyOwner {
        _unpause();
    }
    

    
    /**
     * @dev Override approve to respect pause
     */
    function approve(
        address spender,
        uint256 amount
    ) public virtual override whenNotPaused returns (bool) {
        return super.approve(spender, amount);
    }
    
    /**
     * @dev Emergency withdrawal of any stuck tokens (owner only)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        if (token == address(0)) {
            // Withdraw ETH
            (bool success, ) = owner().call{value: amount}("");
            require(success, "ETH withdrawal failed");
        } else {
            // Withdraw ERC20 tokens
            IERC20(token).transfer(owner(), amount);
        }
    }
    
    // Receive ETH
    receive() external payable {}
}


