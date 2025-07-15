
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

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
 * @title ETHGR Direct Converter
 * @dev Convert ETHGR tokens directly to ETH via Uniswap
 * @author Foundation Recovery System
 */
contract ETHGRDirectConverter is Ownable, ReentrancyGuard {
    
    // Constants
    address public constant ETHGR_TOKEN = 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308;
    address public constant UNISWAP_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    // Conversion tracking
    mapping(address => uint256) public totalConverted;
    uint256 public globalConversions;
    bool public conversionsEnabled = true;
    
    // Events
    event TokensConverted(
        address indexed user,
        uint256 ethgrAmount,
        uint256 ethReceived,
        uint256 timestamp
    );
    event ConversionsToggled(bool enabled);
    event EmergencyWithdrawal(address indexed token, uint256 amount);
    
    modifier onlyFoundation() {
        require(msg.sender == FOUNDATION_WALLET, "Only foundation can execute");
        _;
    }
    
    constructor() Ownable(FOUNDATION_WALLET) {}
    
    /**
     * @dev Convert ETHGR tokens to ETH for the caller
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
        uint256 ethBefore = address(this).balance;
        
        uint[] memory amounts = router.swapExactTokensForETH(
            ethgrAmount,
            minEthOut,
            path,
            address(this),
            block.timestamp + 300 // 5 minute deadline
        );
        
        uint256 ethReceived = amounts[1];
        
        // Update tracking
        totalConverted[msg.sender] += ethgrAmount;
        globalConversions += ethgrAmount;
        
        // Send ETH to user
        (bool success, ) = msg.sender.call{value: ethReceived}("");
        require(success, "ETH transfer failed");
        
        emit TokensConverted(msg.sender, ethgrAmount, ethReceived, block.timestamp);
    }
    
    /**
     * @dev Get estimated ETH output for ETHGR input
     * @param ethgrAmount Amount of ETHGR to convert
     * @return Estimated ETH amount
     */
    function getEstimatedETH(uint256 ethgrAmount) external view returns (uint256) {
        if (ethgrAmount == 0) return 0;
        
        IUniswapV2Router router = IUniswapV2Router(UNISWAP_ROUTER);
        
        address[] memory path = new address[](2);
        path[0] = ETHGR_TOKEN;
        path[1] = router.WETH();
        
        try router.getAmountsOut(ethgrAmount, path) returns (uint[] memory amounts) {
            return amounts[1];
        } catch {
            return 0;
        }
    }
    
    /**
     * @dev Foundation-only function to convert all ETHGR holdings to ETH
     */
    function convertFoundationETHGR() external onlyFoundation nonReentrant {
        IERC20 ethgrToken = IERC20(ETHGR_TOKEN);
        uint256 balance = ethgrToken.balanceOf(FOUNDATION_WALLET);
        
        require(balance > 0, "No ETHGR balance to convert");
        
        // Transfer from foundation wallet to this contract
        require(
            ethgrToken.transferFrom(FOUNDATION_WALLET, address(this), balance),
            "ETHGR transfer failed"
        );
        
        // Convert to ETH
        _convertToETH(balance, FOUNDATION_WALLET);
    }
    
    /**
     * @dev Internal function to convert ETHGR to ETH
     */
    function _convertToETH(uint256 ethgrAmount, address recipient) internal {
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
        
        emit TokensConverted(recipient, ethgrAmount, amounts[1], block.timestamp);
    }
    
    /**
     * @dev Toggle conversion functionality
     */
    function toggleConversions() external onlyFoundation {
        conversionsEnabled = !conversionsEnabled;
        emit ConversionsToggled(conversionsEnabled);
    }
    
    /**
     * @dev Emergency withdrawal for any stuck tokens
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyFoundation {
        if (token == address(0)) {
            // Withdraw ETH
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
    function getConversionStats(address user) external view returns (
        uint256 userConverted,
        uint256 globalTotal,
        bool enabled
    ) {
        return (
            totalConverted[user],
            globalConversions,
            conversionsEnabled
        );
    }
    
    // Receive ETH
    receive() external payable {}
}
