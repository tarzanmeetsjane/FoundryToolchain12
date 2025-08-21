// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ETHGR Liquidity Pool Manager
 * @dev Creates and manages liquidity pools for ETHGR token
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRLiquidityPool is Ownable, ReentrancyGuard {
    using SafeERC20 for ERC20;
    
    // Token addresses
    address public ethgrToken;
    address public wethToken = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public usdcToken = 0xA0b86a33E6441b8c4C8C1d4Bf8B9a0F7b0D8C1E2;
    
    // Uniswap V2 Router
    address public uniswapRouter = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    
    // Pool addresses (will be set after creation)
    address public ethgrEthPool;
    address public ethgrUsdcPool;
    
    // Events
    event PoolCreated(address indexed pool, string pair);
    event LiquidityAdded(address indexed pool, uint256 ethgrAmount, uint256 pairedAmount);
    event ETHReceived(address indexed sender, uint256 amount);
    
    constructor(address _ethgrToken) Ownable(msg.sender) {
        ethgrToken = _ethgrToken;
    }
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Create ETHGR/ETH liquidity pool
     */
    function createETHGRETHPool() external onlyOwner nonReentrant {
        require(ethgrEthPool == address(0), "Pool already exists");
        
        // Get ETHGR balance
        uint256 ethgrBalance = ERC20(ethgrToken).balanceOf(address(this));
        require(ethgrBalance > 0, "No ETHGR tokens");
        
        // Get ETH balance
        uint256 ethBalance = address(this).balance;
        require(ethBalance > 0, "No ETH for pool");
        
        // Calculate optimal amounts (50/50 split)
        uint256 ethgrForPool = ethgrBalance / 2;
        uint256 ethForPool = ethBalance / 2;
        
        // Approve Uniswap to spend ETHGR
        ERC20(ethgrToken).approve(uniswapRouter, ethgrForPool);
        
        // Create pool logic here (simplified for now)
        // In real implementation, you'd call Uniswap factory
        
        ethgrEthPool = address(1); // Placeholder
        emit PoolCreated(ethgrEthPool, "ETHGR/ETH");
        emit LiquidityAdded(ethgrEthPool, ethgrForPool, ethForPool);
    }
    
    /**
     * @dev Create ETHGR/USDC liquidity pool
     */
    function createETHGRUSDCPool() external onlyOwner nonReentrant {
        require(ethgrUsdcPool == address(0), "Pool already exists");
        
        // Get ETHGR balance
        uint256 ethgrBalance = ERC20(ethgrToken).balanceOf(address(this));
        require(ethgrBalance > 0, "No ETHGR tokens");
        
        // Get USDC balance
        uint256 usdcBalance = ERC20(usdcToken).balanceOf(address(this));
        require(usdcBalance > 0, "No USDC for pool");
        
        // Calculate optimal amounts (50/50 split)
        uint256 ethgrForPool = ethgrBalance / 2;
        uint256 usdcForPool = usdcBalance / 2;
        
        // Approve Uniswap to spend tokens
        ERC20(ethgrToken).approve(uniswapRouter, ethgrForPool);
        ERC20(usdcToken).approve(uniswapRouter, usdcForPool);
        
        // Create pool logic here (simplified for now)
        // In real implementation, you'd call Uniswap factory
        
        ethgrUsdcPool = address(2); // Placeholder
        emit PoolCreated(ethgrUsdcPool, "ETHGR/USDC");
        emit LiquidityAdded(ethgrUsdcPool, ethgrForPool, usdcForPool);
    }
    
    /**
     * @dev Add liquidity to existing pools
     */
    function addLiquidityToPools() external onlyOwner nonReentrant {
        require(ethgrEthPool != address(0) || ethgrUsdcPool != address(0), "No pools exist");
        
        uint256 ethgrBalance = ERC20(ethgrToken).balanceOf(address(this));
        uint256 ethBalance = address(this).balance;
        
        if (ethgrBalance > 0 && ethBalance > 0) {
            // Add to ETH pool
            uint256 ethgrForPool = ethgrBalance / 2;
            uint256 ethForPool = ethBalance / 2;
            
            // Add liquidity logic here
            emit LiquidityAdded(ethgrEthPool, ethgrForPool, ethForPool);
        }
    }
    
    /**
     * @dev Get pool information
     */
    function getPoolInfo() external view returns (
        address _ethgrEthPool,
        address _ethgrUsdcPool,
        uint256 ethgrBalance,
        uint256 ethBalance,
        uint256 usdcBalance
    ) {
        return (
            ethgrEthPool,
            ethgrUsdcPool,
            ERC20(ethgrToken).balanceOf(address(this)),
            address(this).balance,
            ERC20(usdcToken).balanceOf(address(this))
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
}
