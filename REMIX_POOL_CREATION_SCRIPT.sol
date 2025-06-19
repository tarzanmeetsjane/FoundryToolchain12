// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uniswap V2 Interfaces
interface IUniswapV2Factory {
    function createPair(address tokenA, address tokenB) external returns (address pair);
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

interface IUniswapV2Router02 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);
    
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

/**
 * @title ETHGR Pool Creator
 * @dev Creates ETHGR/ETH liquidity pool and adds initial liquidity
 * @notice This contract bypasses Uniswap UI limitations by direct contract interaction
 */
contract ETHGRPoolCreator {
    
    // Contract addresses on Ethereum mainnet
    address constant ETHGR_TOKEN = 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247;
    address constant UNISWAP_V2_FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    
    // Events
    event PairCreated(address indexed pair, address indexed token0, address indexed token1);
    event LiquidityAdded(address indexed pair, uint256 tokenAmount, uint256 ethAmount, uint256 liquidity);
    
    // Pool creation status
    bool public poolCreated = false;
    address public pairAddress;
    
    /**
     * @dev Creates ETHGR/WETH pair if it doesn't exist
     * @return pair The address of the created or existing pair
     */
    function createETHGRPair() external returns (address pair) {
        IUniswapV2Factory factory = IUniswapV2Factory(UNISWAP_V2_FACTORY);
        
        // Check if pair already exists
        pair = factory.getPair(ETHGR_TOKEN, WETH);
        
        if (pair == address(0)) {
            // Create new pair
            pair = factory.createPair(ETHGR_TOKEN, WETH);
            emit PairCreated(pair, ETHGR_TOKEN, WETH);
        }
        
        pairAddress = pair;
        poolCreated = true;
        
        return pair;
    }
    
    /**
     * @dev Adds liquidity to ETHGR/ETH pool
     * @param tokenAmount Amount of ETHGR tokens to add
     * @param minTokenAmount Minimum ETHGR tokens to add (slippage protection)
     * @param minETHAmount Minimum ETH to add (slippage protection)
     */
    function addLiquidity(
        uint256 tokenAmount,
        uint256 minTokenAmount,
        uint256 minETHAmount
    ) external payable {
        require(msg.value > 0, "Must send ETH");
        require(tokenAmount > 0, "Token amount must be > 0");
        
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        IUniswapV2Router02 router = IUniswapV2Router02(UNISWAP_V2_ROUTER);
        
        // Transfer ETHGR tokens from sender to this contract
        require(
            ethgrToken.transferFrom(msg.sender, address(this), tokenAmount),
            "ETHGR transfer failed"
        );
        
        // Approve router to spend ETHGR tokens
        require(
            ethgrToken.approve(UNISWAP_V2_ROUTER, tokenAmount),
            "ETHGR approval failed"
        );
        
        // Add liquidity
        uint256 deadline = block.timestamp + 300; // 5 minutes
        
        (uint256 amountToken, uint256 amountETH, uint256 liquidity) = router.addLiquidityETH{value: msg.value}(
            ETHGR_TOKEN,
            tokenAmount,
            minTokenAmount,
            minETHAmount,
            msg.sender, // LP tokens go to sender
            deadline
        );
        
        emit LiquidityAdded(pairAddress, amountToken, amountETH, liquidity);
        
        // Refund excess ETH
        if (msg.value > amountETH) {
            payable(msg.sender).transfer(msg.value - amountETH);
        }
    }
    
    /**
     * @dev One-click pool creation and liquidity addition
     * @param tokenAmount Amount of ETHGR tokens to add
     */
    function createPoolAndAddLiquidity(uint256 tokenAmount) external payable {
        // Create pair if it doesn't exist
        if (!poolCreated) {
            createETHGRPair();
        }
        
        // Add liquidity with minimal slippage protection
        addLiquidity(tokenAmount, tokenAmount * 95 / 100, msg.value * 95 / 100);
    }
    
    /**
     * @dev Get pair address for ETHGR/WETH
     */
    function getETHGRPairAddress() external view returns (address) {
        IUniswapV2Factory factory = IUniswapV2Factory(UNISWAP_V2_FACTORY);
        return factory.getPair(ETHGR_TOKEN, WETH);
    }
    
    /**
     * @dev Check if ETHGR/WETH pair exists
     */
    function pairExists() external view returns (bool) {
        return getETHGRPairAddress() != address(0);
    }
    
    /**
     * @dev Emergency function to recover stuck tokens
     */
    function emergencyWithdraw() external {
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        uint256 balance = ethgrToken.balanceOf(address(this));
        if (balance > 0) {
            ethgrToken.transfer(msg.sender, balance);
        }
        
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            payable(msg.sender).transfer(ethBalance);
        }
    }
    
    // Receive function to accept ETH
    receive() external payable {}
}

/**
 * DEPLOYMENT AND EXECUTION INSTRUCTIONS:
 * 
 * 1. Copy this contract into Remix IDE
 * 2. Compile with Solidity 0.8.19+
 * 3. Deploy to Ethereum mainnet (requires ~0.001 ETH gas)
 * 4. Before calling functions, approve ETHGR tokens:
 *    - Go to ETHGR contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
 *    - Call approve(DEPLOYED_CONTRACT_ADDRESS, 9000000000000000000000)
 * 5. Call createPoolAndAddLiquidity(9000000000000000000000) with 0.003 ETH
 * 
 * ALTERNATIVE - Manual Steps:
 * 1. Call createETHGRPair() first (no ETH needed)
 * 2. Approve ETHGR tokens for the deployed contract
 * 3. Call addLiquidity(9000000000000000000000, 8550000000000000000000, 2850000000000000000) with 0.003 ETH
 * 
 * GAS ESTIMATES:
 * - Contract deployment: ~200,000 gas
 * - Create pair: ~100,000 gas  
 * - Add liquidity: ~150,000 gas
 * - Total: ~450,000 gas (~0.0045 ETH at 10 gwei)
 */