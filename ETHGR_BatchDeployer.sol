// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./ETHGR_Fixed.sol";
import "./ETHGR_LiquidityPool.sol";

/**
 * @title ETHGR Batch Deployer
 * @dev Handles deployment and setup in optimized sequence
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRBatchDeployer is Ownable, ReentrancyGuard {
    using SafeERC20 for ERC20;
    
    // Contract addresses
    address public ethgrToken;
    address public liquidityPool;
    
    // Deployment status
    bool public poolManagerDeployed = false;
    bool public tokensTransferred = false;
    bool public liquidityPoolsCreated = false;
    
    // Events
    event PoolManagerDeployed(address indexed poolManager);
    event TokensTransferred(uint256 amount);
    event LiquidityPoolsCreated();
    event ETHReceived(address indexed sender, uint256 amount);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Step 1: Deploy the liquidity pool manager
     * This requires gas from your wallet
     */
    function deployPoolManager(address ethgrTokenAddress) external onlyOwner {
        require(!poolManagerDeployed, "Pool manager already deployed");
        require(ethgrTokenAddress != address(0), "Invalid ETHGR address");
        
        ethgrToken = ethgrTokenAddress;
        
        // Deploy the liquidity pool manager
        ETHGRLiquidityPool poolManager = new ETHGRLiquidityPool(ethgrToken);
        liquidityPool = address(poolManager);
        
        poolManagerDeployed = true;
        emit PoolManagerDeployed(liquidityPool);
    }
    
    /**
     * @dev Step 2: Transfer ETHGR tokens to pool manager
     * This requires gas from your wallet
     */
    function transferTokensToPool() external onlyOwner {
        require(poolManagerDeployed, "Pool manager not deployed");
        require(!tokensTransferred, "Tokens already transferred");
        
        uint256 tokenBalance = ERC20(ethgrToken).balanceOf(address(this));
        require(tokenBalance >= 995000 * 10**18, "Insufficient ETHGR balance");
        
        // Transfer tokens to pool manager
        ERC20(ethgrToken).safeTransfer(liquidityPool, 995000 * 10**18);
        
        tokensTransferred = true;
        emit TokensTransferred(995000 * 10**18);
    }
    
    /**
     * @dev Step 3: Send ETH to pool manager for liquidity
     * This requires gas from your wallet
     */
    function sendETHToPool() external onlyOwner payable {
        require(poolManagerDeployed, "Pool manager not deployed");
        require(tokensTransferred, "Tokens not transferred yet");
        require(msg.value >= 79.729 ether, "Insufficient ETH amount");
        
        // Send ETH to pool manager
        (bool success, ) = payable(liquidityPool).call{value: msg.value}("");
        require(success, "ETH transfer failed");
    }
    
    /**
     * @dev Step 4: Create liquidity pools (executed by pool manager)
     * This requires gas from your wallet
     */
    function createLiquidityPools() external onlyOwner {
        require(poolManagerDeployed, "Pool manager not deployed");
        require(tokensTransferred, "Tokens not transferred yet");
        require(!liquidityPoolsCreated, "Pools already created");
        
        // Call pool manager to create pools
        ETHGRLiquidityPool(liquidityPool).createETHGRETHPool();
        
        liquidityPoolsCreated = true;
        emit LiquidityPoolsCreated();
    }
    
    /**
     * @dev Get deployment status
     */
    function getDeploymentStatus() external view returns (
        bool _poolManagerDeployed,
        bool _tokensTransferred,
        bool _liquidityPoolsCreated,
        address _ethgrToken,
        address _liquidityPool
    ) {
        return (
            poolManagerDeployed,
            tokensTransferred,
            liquidityPoolsCreated,
            ethgrToken,
            liquidityPool
        );
    }
    
    /**
     * @dev Emergency withdraw ETH (owner only)
     */
    function emergencyWithdrawETH() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "ETH withdrawal failed");
    }
    
    /**
     * @dev Emergency withdraw tokens (owner only)
     */
    function emergencyWithdrawTokens(address token) external onlyOwner nonReentrant {
        uint256 balance = ERC20(token).balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        
        ERC20(token).safeTransfer(owner(), balance);
    }
    
    /**
     * @dev Get total deployment cost estimate
     */
    function getDeploymentCostEstimate() external pure returns (
        uint256 estimatedGas,
        uint256 estimatedCost
    ) {
        // Rough estimates based on current gas prices
        estimatedGas = 500000; // 500k gas total
        estimatedCost = 0.02 ether; // ~$76 at current prices
        return (estimatedGas, estimatedCost);
    }
}
