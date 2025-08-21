// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

/**
 * @title ETHGRMetaTransaction
 * @dev Meta-transaction contract that allows ETHGR tokens to pay for gas
 * @author ETHGR Foundation
 */
contract ETHGRMetaTransaction is Ownable, EIP712 {
    using ECDSA for bytes32;

    // Events
    event MetaTransactionExecuted(
        address indexed user,
        address indexed relayer,
        uint256 ethgrAmount,
        uint256 ethReceived,
        uint256 gasUsed
    );

    event GaslessSwapExecuted(
        address indexed user,
        uint256 ethgrAmount,
        uint256 ethReceived,
        uint256 gasUsed
    );

    // Constants
    string private constant SIGNING_DOMAIN = "ETHGR-MetaTransaction";
    string private constant SIGNATURE_VERSION = "1";

    // State variables
    address public ethgrToken;
    address public wethAddress;
    address public uniswapRouter;
    uint256 public gasPriceMultiplier = 120; // 120% of current gas price
    uint256 public minEthgrForGas = 1000 * 10**18; // 1000 ETHGR minimum

    // Struct for meta-transaction
    struct MetaTransaction {
        address user;
        uint256 ethgrAmount;
        uint256 nonce;
        uint256 deadline;
        bytes data;
    }

    // Nonce tracking
    mapping(address => uint256) public nonces;

    constructor(
        address _ethgrToken,
        address _wethAddress,
        address _uniswapRouter
    ) Ownable(msg.sender) EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {
        ethgrToken = _ethgrToken;
        wethAddress = _wethAddress;
        uniswapRouter = _uniswapRouter;
    }

    /**
     * @dev Execute a meta-transaction where ETHGR pays for gas
     * @param user The user who signed the transaction
     * @param ethgrAmount Amount of ETHGR to convert for gas
     * @param deadline Transaction deadline
     * @param signature User's signature
     * @param data Encoded function call data
     */
    function executeMetaTransaction(
        address user,
        uint256 ethgrAmount,
        uint256 deadline,
        bytes calldata signature,
        bytes calldata data
    ) external {
        require(block.timestamp <= deadline, "MetaTransaction: expired");
        require(ethgrAmount >= minEthgrForGas, "MetaTransaction: insufficient ETHGR");

        // Verify signature
        bytes32 structHash = keccak256(
            abi.encode(
                keccak256("MetaTransaction(address user,uint256 ethgrAmount,uint256 nonce,uint256 deadline,bytes data)"),
                user,
                ethgrAmount,
                nonces[user],
                deadline,
                keccak256(data)
            )
        );
        bytes32 hash = _hashTypedDataV4(structHash);
        address signer = hash.recover(signature);
        require(signer == user, "MetaTransaction: invalid signature");

        // Increment nonce
        nonces[user]++;

        // Transfer ETHGR from user to this contract
        require(
            IERC20(ethgrToken).transferFrom(user, address(this), ethgrAmount),
            "MetaTransaction: ETHGR transfer failed"
        );

        // Convert ETHGR to ETH for gas
        uint256 ethReceived = _swapEthgrForEth(ethgrAmount);

        // Execute the actual transaction
        uint256 gasStart = gasleft();
        (bool success, ) = address(this).call(data);
        require(success, "MetaTransaction: execution failed");
        uint256 gasUsed = gasStart - gasleft();

        // Calculate gas cost
        uint256 gasCost = gasUsed * tx.gasprice;
        
        // If we received more ETH than needed for gas, refund the difference
        if (ethReceived > gasCost) {
            uint256 refund = ethReceived - gasCost;
            (bool refundSuccess, ) = user.call{value: refund}("");
            require(refundSuccess, "MetaTransaction: refund failed");
        }

        emit MetaTransactionExecuted(user, msg.sender, ethgrAmount, ethReceived, gasUsed);
    }

    /**
     * @dev Execute a gasless swap of ETHGR to ETH
     * @param ethgrAmount Amount of ETHGR to swap
     * @param minEthOut Minimum ETH to receive
     * @param deadline Swap deadline
     */
    function executeGaslessSwap(
        uint256 ethgrAmount,
        uint256 minEthOut,
        uint256 deadline
    ) external {
        require(block.timestamp <= deadline, "GaslessSwap: expired");
        require(ethgrAmount > 0, "GaslessSwap: zero amount");

        // Transfer ETHGR from user
        require(
            IERC20(ethgrToken).transferFrom(msg.sender, address(this), ethgrAmount),
            "GaslessSwap: ETHGR transfer failed"
        );

        // Swap ETHGR for ETH
        uint256 ethReceived = _swapEthgrForEth(ethgrAmount);
        require(ethReceived >= minEthOut, "GaslessSwap: insufficient output");

        // Send ETH to user
        (bool success, ) = msg.sender.call{value: ethReceived}("");
        require(success, "GaslessSwap: ETH transfer failed");

        emit GaslessSwapExecuted(msg.sender, ethgrAmount, ethReceived, gasleft());
    }

    /**
     * @dev Internal function to swap ETHGR for ETH using Uniswap
     * @param ethgrAmount Amount of ETHGR to swap
     * @return ethReceived Amount of ETH received
     */
    function _swapEthgrForEth(uint256 ethgrAmount) internal returns (uint256 ethReceived) {
        // Approve Uniswap router to spend ETHGR
        IERC20(ethgrToken).approve(uniswapRouter, ethgrAmount);

        // Prepare swap parameters
        address[] memory path = new address[](2);
        path[0] = ethgrToken;
        path[1] = wethAddress;

        uint256[] memory amounts = IUniswapV2Router(uniswapRouter).swapExactTokensForETH(
            ethgrAmount,
            0, // Accept any amount of ETH
            path,
            address(this),
            block.timestamp
        );

        ethReceived = amounts[1];
    }

    /**
     * @dev Get the current nonce for a user
     * @param user User address
     * @return Current nonce
     */
    function getNonce(address user) external view returns (uint256) {
        return nonces[user];
    }

    /**
     * @dev Update gas price multiplier (owner only)
     * @param _multiplier New multiplier (in basis points, 100 = 100%)
     */
    function setGasPriceMultiplier(uint256 _multiplier) external onlyOwner {
        require(_multiplier >= 100, "Invalid multiplier");
        gasPriceMultiplier = _multiplier;
    }

    /**
     * @dev Update minimum ETHGR amount for gas (owner only)
     * @param _minAmount New minimum amount
     */
    function setMinEthgrForGas(uint256 _minAmount) external onlyOwner {
        minEthgrForGas = _minAmount;
    }

    /**
     * @dev Emergency withdrawal of ETH (owner only)
     */
    function emergencyWithdrawEth() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "ETH withdrawal failed");
    }

    /**
     * @dev Emergency withdrawal of ETHGR tokens (owner only)
     */
    function emergencyWithdrawEthgr() external onlyOwner {
        uint256 balance = IERC20(ethgrToken).balanceOf(address(this));
        require(balance > 0, "No ETHGR to withdraw");
        
        require(
            IERC20(ethgrToken).transfer(owner(), balance),
            "ETHGR withdrawal failed"
        );
    }

    // Receive ETH
    receive() external payable {}
}

// Interface for Uniswap V2 Router
interface IUniswapV2Router {
    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}











