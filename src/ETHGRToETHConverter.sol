
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

interface IUniswapV2Router {
    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
    function getAmountsOut(uint amountIn, address[] calldata path)
        external view returns (uint[] memory amounts);
    
    function WETH() external pure returns (address);
}

/**
 * @title ETHGR to ETH Converter
 * @dev Convert ETHGR tokens directly to ETH with slippage protection
 * @author Foundation Recovery System
 */
contract ETHGRToETHConverter is ReentrancyGuard, Ownable {
    
    // Contract addresses
    address public constant ETHGR_TOKEN = 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308;
    address public constant UNISWAP_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    // Conversion tracking
    mapping(address => uint256) public totalConverted;
    mapping(address => uint256) public totalETHReceived;
    uint256 public globalConversions;
    uint256 public globalETHDistributed;
    bool public conversionsEnabled = true;
    
    // Fee settings (in basis points, 100 = 1%)
    uint256 public conversionFee = 50; // 0.5% fee
    uint256 public constant MAX_FEE = 500; // 5% max fee
    
    // Events
    event TokensConverted(
        address indexed user,
        uint256 ethgrAmount,
        uint256 ethReceived,
        uint256 feeDeducted,
        uint256 timestamp
    );
    event ConversionsToggled(bool enabled);
    event FeeUpdated(uint256 newFee);
    event EmergencyWithdrawal(address indexed token, uint256 amount);
    
    modifier onlyFoundation() {
        require(msg.sender == FOUNDATION_WALLET, "Only foundation can execute");
        _;
    }
    
    constructor() Ownable(FOUNDATION_WALLET) {}
    
    /**
     * @dev Convert ETHGR tokens to ETH with slippage protection
     * @param ethgrAmount Amount of ETHGR tokens to convert
     * @param minEthOut Minimum ETH to receive (slippage protection)
     */
    function convertETHGRToETH(
        uint256 ethgrAmount,
        uint256 minEthOut
    ) external nonReentrant {
        require(conversionsEnabled, "Conversions are disabled");
        require(ethgrAmount > 0, "Amount must be greater than 0");
        
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        IUniswapV2Router router = IUniswapV2Router(UNISWAP_ROUTER);
        
        // Check user's ETHGR balance
        require(
            ethgrToken.balanceOf(msg.sender) >= ethgrAmount,
            "Insufficient ETHGR balance"
        );
        
        // Transfer ETHGR from user to this contract
        require(
            ethgrToken.transferFrom(msg.sender, address(this), ethgrAmount),
            "ETHGR transfer failed"
        );
        
        // Approve router to spend ETHGR
        require(
            ethgrToken.approve(UNISWAP_ROUTER, ethgrAmount),
            "ETHGR approval failed"
        );
        
        // Set up swap path: ETHGR → WETH
        address[] memory path = new address[](2);
        path[0] = ETHGR_TOKEN;
        path[1] = router.WETH();
        
        // Execute swap
        uint[] memory amounts = router.swapExactTokensForETH(
            ethgrAmount,
            minEthOut,
            path,
            address(this),
            block.timestamp + 300 // 5 minute deadline
        );
        
        uint256 ethReceived = amounts[1];
        
        // Calculate fee
        uint256 fee = (ethReceived * conversionFee) / 10000;
        uint256 ethToUser = ethReceived - fee;
        
        // Update tracking
        totalConverted[msg.sender] += ethgrAmount;
        totalETHReceived[msg.sender] += ethToUser;
        globalConversions += ethgrAmount;
        globalETHDistributed += ethToUser;
        
        // Send ETH to user (minus fee)
        (bool success, ) = msg.sender.call{value: ethToUser}("");
        require(success, "ETH transfer to user failed");
        
        // Send fee to foundation (if any)
        if (fee > 0) {
            (bool feeSuccess, ) = FOUNDATION_WALLET.call{value: fee}("");
            require(feeSuccess, "Fee transfer failed");
        }
        
        emit TokensConverted(msg.sender, ethgrAmount, ethToUser, fee, block.timestamp);
    }
    
    /**
     * @dev Get estimated ETH output for ETHGR input (including fees)
     * @param ethgrAmount Amount of ETHGR to convert
     * @return estimatedETH Estimated ETH amount after fees
     * @return fee Estimated fee amount
     */
    function getEstimatedETH(uint256 ethgrAmount) external view returns (uint256 estimatedETH, uint256 fee) {
        if (ethgrAmount == 0) return (0, 0);
        
        IUniswapV2Router router = IUniswapV2Router(UNISWAP_ROUTER);
        
        address[] memory path = new address[](2);
        path[0] = ETHGR_TOKEN;
        path[1] = router.WETH();
        
        try router.getAmountsOut(ethgrAmount, path) returns (uint[] memory amounts) {
            uint256 totalETH = amounts[1];
            fee = (totalETH * conversionFee) / 10000;
            estimatedETH = totalETH - fee;
        } catch {
            return (0, 0);
        }
    }
    
    /**
     * @dev Foundation bulk conversion - convert all ETHGR holdings to ETH
     */
    function foundationBulkConversion() external onlyFoundation nonReentrant {
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        uint256 balance = ethgrToken.balanceOf(FOUNDATION_WALLET);
        
        require(balance > 0, "No ETHGR balance to convert");
        
        // Transfer from foundation wallet to this contract
        require(
            ethgrToken.transferFrom(FOUNDATION_WALLET, address(this), balance),
            "ETHGR transfer failed"
        );
        
        // Convert to ETH (no fees for foundation)
        _convertToETHNoFee(balance, FOUNDATION_WALLET);
    }
    
    /**
     * @dev Internal function to convert ETHGR to ETH without fees
     */
    function _convertToETHNoFee(uint256 ethgrAmount, address recipient) internal {
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        IUniswapV2Router router = IUniswapV2Router(UNISWAP_ROUTER);
        
        // Approve router
        require(
            ethgrToken.approve(UNISWAP_ROUTER, ethgrAmount),
            "ETHGR approval failed"
        );
        
        // Set up swap path
        address[] memory path = new address[](2);
        path[0] = ETHGR_TOKEN;
        path[1] = router.WETH();
        
        // Execute swap
        uint[] memory amounts = router.swapExactTokensForETH(
            ethgrAmount,
            0, // Accept any amount of ETH
            path,
            recipient,
            block.timestamp + 300
        );
        
        emit TokensConverted(recipient, ethgrAmount, amounts[1], 0, block.timestamp);
    }
    
    /**
     * @dev Update conversion fee (foundation only)
     */
    function updateConversionFee(uint256 newFee) external onlyFoundation {
        require(newFee <= MAX_FEE, "Fee exceeds maximum");
        conversionFee = newFee;
        emit FeeUpdated(newFee);
    }
    
    /**
     * @dev Toggle conversion functionality
     */
    function toggleConversions() external onlyFoundation {
        conversionsEnabled = !conversionsEnabled;
        emit ConversionsToggled(conversionsEnabled);
    }
    
    /**
     * @dev Emergency withdrawal for any stuck tokens or ETH
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyFoundation {
        if (token == address(0)) {
            // Withdraw ETH
            require(address(this).balance >= amount, "Insufficient ETH balance");
            (bool success, ) = FOUNDATION_WALLET.call{value: amount}("");
            require(success, "ETH withdrawal failed");
        } else {
            // Withdraw ERC20 tokens
            IERC20(token).transfer(FOUNDATION_WALLET, amount);
        }
        
        emit EmergencyWithdrawal(token, amount);
    }
    
    /**
     * @dev Get conversion statistics for an address
     */
    function getUserStats(address user) external view returns (
        uint256 userConverted,
        uint256 userETHReceived,
        uint256 globalTotal,
        uint256 globalETHTotal,
        bool enabled
    ) {
        return (
            totalConverted[user],
            totalETHReceived[user],
            globalConversions,
            globalETHDistributed,
            conversionsEnabled
        );
    }
    
    /**
     * @dev Get contract information
     */
    function getContractInfo() external view returns (
        address ethgrToken,
        address uniswapRouter,
        address foundationWallet,
        uint256 currentFee,
        uint256 contractETHBalance,
        bool enabled
    ) {
        return (
            ETHGR_TOKEN,
            UNISWAP_ROUTER,
            FOUNDATION_WALLET,
            conversionFee,
            address(this).balance,
            conversionsEnabled
        );
    }
    
    // Receive ETH
    receive() external payable {}
    fallback() external payable {}
}
