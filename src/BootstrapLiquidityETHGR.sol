
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IUniswapV2Router {
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    
    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
    function WETH() external pure returns (address);
}

/**
 * @title Bootstrap Liquidity for ETHGR
 * @dev Creates initial ETHGR/ETH liquidity pool from zero
 */
contract BootstrapLiquidityETHGR is Ownable, ReentrancyGuard {
    
    address public constant ETHGR_TOKEN = 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308;
    address public constant UNISWAP_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    bool public liquidityBootstrapped = false;
    uint256 public totalETHRaised = 0;
    
    mapping(address => uint256) public contributions;
    mapping(address => bool) public hasWithdrawn;
    
    event ETHContributed(address indexed contributor, uint256 amount);
    event LiquidityBootstrapped(uint256 ethgrAmount, uint256 ethAmount, uint256 liquidityTokens);
    event TokensWithdrawn(address indexed contributor, uint256 ethgrAmount);
    
    constructor() Ownable(FOUNDATION_WALLET) {}
    
    /**
     * @dev Step 1: Contributors send ETH to bootstrap liquidity
     */
    function contributeETH() external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");
        require(!liquidityBootstrapped, "Liquidity already bootstrapped");
        
        contributions[msg.sender] += msg.value;
        totalETHRaised += msg.value;
        
        emit ETHContributed(msg.sender, msg.value);
    }
    
    /**
     * @dev Step 2: Foundation creates initial liquidity pool
     * @param ethgrAmount Amount of ETHGR tokens to add to pool
     */
    function bootstrapLiquidity(uint256 ethgrAmount) external onlyOwner nonReentrant {
        require(!liquidityBootstrapped, "Already bootstrapped");
        require(totalETHRaised > 0, "No ETH contributed");
        require(ethgrAmount > 0, "Must provide ETHGR tokens");
        
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        IUniswapV2Router router = IUniswapV2Router(UNISWAP_ROUTER);
        
        // Transfer ETHGR from foundation to this contract
        require(
            ethgrToken.transferFrom(FOUNDATION_WALLET, address(this), ethgrAmount),
            "ETHGR transfer failed"
        );
        
        // Approve router to spend ETHGR
        require(
            ethgrToken.approve(UNISWAP_ROUTER, ethgrAmount),
            "ETHGR approval failed"
        );
        
        // Create initial liquidity pool
        (uint amountToken, uint amountETH, uint liquidity) = router.addLiquidityETH{
            value: totalETHRaised
        }(
            ETHGR_TOKEN,
            ethgrAmount,
            ethgrAmount * 95 / 100, // 5% slippage tolerance
            totalETHRaised * 95 / 100,
            FOUNDATION_WALLET, // LP tokens go to foundation
            block.timestamp + 300
        );
        
        liquidityBootstrapped = true;
        
        emit LiquidityBootstrapped(amountToken, amountETH, liquidity);
    }
    
    /**
     * @dev Step 3: Contributors can withdraw proportional ETHGR tokens
     */
    function withdrawETHGRTokens() external nonReentrant {
        require(liquidityBootstrapped, "Liquidity not bootstrapped yet");
        require(contributions[msg.sender] > 0, "No contribution found");
        require(!hasWithdrawn[msg.sender], "Already withdrawn");
        
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        uint256 contractBalance = ethgrToken.balanceOf(address(this));
        
        // Calculate proportional share
        uint256 contributorShare = (contributions[msg.sender] * contractBalance) / totalETHRaised;
        
        hasWithdrawn[msg.sender] = true;
        
        require(
            ethgrToken.transfer(msg.sender, contributorShare),
            "ETHGR transfer failed"
        );
        
        emit TokensWithdrawn(msg.sender, contributorShare);
    }
    
    /**
     * @dev Emergency function to return ETH if bootstrap fails
     */
    function emergencyWithdrawETH() external nonReentrant {
        require(!liquidityBootstrapped, "Liquidity already bootstrapped");
        require(contributions[msg.sender] > 0, "No contribution found");
        
        uint256 contribution = contributions[msg.sender];
        contributions[msg.sender] = 0;
        totalETHRaised -= contribution;
        
        (bool success, ) = msg.sender.call{value: contribution}("");
        require(success, "ETH transfer failed");
    }
    
    /**
     * @dev Check if liquidity pool exists and is tradeable
     */
    function isPoolTradeable() external view returns (bool) {
        return liquidityBootstrapped;
    }
    
    /**
     * @dev Get contributor information
     */
    function getContributorInfo(address contributor) external view returns (
        uint256 contribution,
        bool withdrawn,
        uint256 potentialTokens
    ) {
        contribution = contributions[contributor];
        withdrawn = hasWithdrawn[contributor];
        
        if (liquidityBootstrapped && !withdrawn && totalETHRaised > 0) {
            IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
            uint256 contractBalance = ethgrToken.balanceOf(address(this));
            potentialTokens = (contribution * contractBalance) / totalETHRaised;
        }
    }
    
    // Receive ETH
    receive() external payable {
        contributeETH();
    }
}
