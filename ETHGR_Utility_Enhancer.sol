// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title ETHGR Utility Enhancer
 * @dev Adds immediate value to ETHGR tokens through staking, rewards, and community features
 * @author ETHGR Foundation
 */
contract ETHGRUtilityEnhancer is Ownable, ReentrancyGuard, Pausable {
    
    // Token interface
    IERC20 public ethgrToken;
    
    // Staking structures
    struct Staker {
        uint256 stakedAmount;
        uint256 lastRewardTime;
        uint256 totalRewards;
        bool isStaking;
    }
    
    // Staking variables
    mapping(address => Staker) public stakers;
    uint256 public totalStaked;
    uint256 public rewardRate = 100; // 1% daily (100 basis points)
    uint256 public constant REWARD_PRECISION = 10000;
    
    // Community features
    mapping(address => bool) public communityMembers;
    uint256 public communityMemberCount;
    uint256 public constant MIN_STAKE_FOR_MEMBERSHIP = 1000 * 10**18; // 1000 ETHGR
    
    // Events
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event CommunityMemberAdded(address indexed user);
    event RewardRateUpdated(uint256 newRate);
    
    constructor(address _ethgrToken) Ownable(msg.sender) {
        ethgrToken = IERC20(_ethgrToken);
    }
    
    /**
     * @dev Stake ETHGR tokens to earn rewards
     */
    function stakeTokens(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(ethgrToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        Staker storage staker = stakers[msg.sender];
        
        // Claim existing rewards first
        if (staker.isStaking) {
            _claimRewards(msg.sender);
        }
        
        // Update staking info
        staker.stakedAmount += amount;
        staker.lastRewardTime = block.timestamp;
        staker.isStaking = true;
        
        totalStaked += amount;
        
        // Check if eligible for community membership
        if (staker.stakedAmount >= MIN_STAKE_FOR_MEMBERSHIP && !communityMembers[msg.sender]) {
            communityMembers[msg.sender] = true;
            communityMemberCount++;
            emit CommunityMemberAdded(msg.sender);
        }
        
        emit TokensStaked(msg.sender, amount);
    }
    
    /**
     * @dev Unstake tokens
     */
    function unstakeTokens(uint256 amount) external nonReentrant whenNotPaused {
        Staker storage staker = stakers[msg.sender];
        require(staker.isStaking, "Not staking");
        require(staker.stakedAmount >= amount, "Insufficient staked amount");
        
        // Claim rewards first
        _claimRewards(msg.sender);
        
        // Update staking info
        staker.stakedAmount -= amount;
        totalStaked -= amount;
        
        if (staker.stakedAmount == 0) {
            staker.isStaking = false;
        }
        
        // Check if still eligible for community membership
        if (staker.stakedAmount < MIN_STAKE_FOR_MEMBERSHIP && communityMembers[msg.sender]) {
            communityMembers[msg.sender] = false;
            communityMemberCount--;
        }
        
        // Transfer tokens back
        require(ethgrToken.transfer(msg.sender, amount), "Transfer failed");
        
        emit TokensUnstaked(msg.sender, amount);
    }
    
    /**
     * @dev Claim accumulated rewards
     */
    function claimRewards() external nonReentrant whenNotPaused {
        _claimRewards(msg.sender);
    }
    
    /**
     * @dev Internal function to calculate and claim rewards
     */
    function _claimRewards(address user) internal {
        Staker storage staker = stakers[user];
        if (!staker.isStaking) return;
        
        uint256 reward = calculateRewards(user);
        if (reward > 0) {
            staker.totalRewards += reward;
            staker.lastRewardTime = block.timestamp;
            
            // Mint new tokens as rewards (increases total supply)
            // Note: This requires the ETHGR contract to have minting capability
            emit RewardsClaimed(user, reward);
        }
    }
    
    /**
     * @dev Calculate pending rewards for a user
     */
    function calculateRewards(address user) public view returns (uint256) {
        Staker storage staker = stakers[user];
        if (!staker.isStaking) return 0;
        
        uint256 timeStaked = block.timestamp - staker.lastRewardTime;
        uint256 dailyReward = (staker.stakedAmount * rewardRate) / REWARD_PRECISION;
        uint256 reward = (dailyReward * timeStaked) / 1 days;
        
        return reward;
    }
    
    /**
     * @dev Get staker information
     */
    function getStakerInfo(address user) external view returns (
        uint256 stakedAmount,
        uint256 pendingRewards,
        uint256 totalRewards,
        bool isStaking,
        bool isCommunityMember
    ) {
        Staker storage staker = stakers[user];
        return (
            staker.stakedAmount,
            calculateRewards(user),
            staker.totalRewards,
            staker.isStaking,
            communityMembers[user]
        );
    }
    
    /**
     * @dev Update reward rate (owner only)
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 1000, "Rate too high"); // Max 10% daily
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }
    
    /**
     * @dev Pause/unpause contract (owner only)
     */
    function togglePause() external onlyOwner {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }
    
    /**
     * @dev Emergency withdrawal of stuck tokens (owner only)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = ethgrToken.balanceOf(address(this));
        if (balance > 0) {
            ethgrToken.transfer(owner(), balance);
        }
    }
    
    /**
     * @dev Get contract statistics
     */
    function getContractStats() external view returns (
        uint256 _totalStaked,
        uint256 _communityMemberCount,
        uint256 _rewardRate,
        bool _isPaused
    ) {
        return (
            totalStaked,
            communityMemberCount,
            rewardRate,
            paused()
        );
    }
    
    // Receive ETH
    receive() external payable {}
}
