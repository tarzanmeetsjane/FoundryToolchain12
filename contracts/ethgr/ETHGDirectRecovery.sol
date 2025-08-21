// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

/**
 * @title ETHG Direct Recovery Contract
 * @dev Converts trapped ETHG directly to ETH without creating new tokens
 * @author ETHGR Foundation
 * @notice This contract enables direct ETH recovery for ETHG victims
 */
contract ETHGDirectRecovery is Ownable, ReentrancyGuard, Pausable, EIP712 {
    using ECDSA for bytes32;

    // Events
    event ETHRecovered(
        address indexed victim,
        uint256 ethgAmount,
        uint256 ethReceived,
        uint256 recoveryFee
    );

    event VictimRegistered(
        address indexed victim,
        uint256 ethgAmount,
        uint256 recoveryRate
    );

    event RecoveryRateUpdated(
        uint256 oldRate,
        uint256 newRate,
        address indexed updater
    );

    // Constants
    string private constant SIGNING_DOMAIN = "ETHG-DirectRecovery";
    string private constant SIGNATURE_VERSION = "1";
    
    // Recovery rates (basis points: 100 = 1%)
    uint256 public recoveryRate = 8000; // 80% recovery rate
    uint256 public constant MAX_RECOVERY_RATE = 9500; // 95% maximum
    uint256 public constant MIN_RECOVERY_RATE = 5000; // 50% minimum
    
    // Recovery fee (basis points: 100 = 1%)
    uint256 public recoveryFee = 500; // 5% fee
    uint256 public constant MAX_RECOVERY_FEE = 1000; // 10% maximum
    
    // State variables
    mapping(address => bool) public isRegisteredVictim;
    mapping(address => uint256) public victimEthgAmount;
    mapping(address => bool) public hasRecovered;
    mapping(address => uint256) public recoveryNonces;
    
    // Gasless recovery tracking
    bool public gaslessRecoveryEnabled = true;
    
    // Struct for gasless recovery
    struct GaslessRecovery {
        address victim;
        uint256 ethgAmount;
        uint256 nonce;
        uint256 deadline;
        bytes signature;
    }

    constructor() Ownable(msg.sender) EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {}

    /**
     * @dev Register a victim for ETH recovery
     * @param victim The victim's address
     * @param ethgAmount Amount of trapped ETHG
     */
    function registerVictim(address victim, uint256 ethgAmount) external onlyOwner {
        require(victim != address(0), "Invalid victim address");
        require(ethgAmount > 0, "Invalid ETHG amount");
        require(!isRegisteredVictim[victim], "Victim already registered");
        
        isRegisteredVictim[victim] = true;
        victimEthgAmount[victim] = ethgAmount;
        
        emit VictimRegistered(victim, ethgAmount, recoveryRate);
    }

    /**
     * @dev Batch register multiple victims
     * @param victims Array of victim addresses
     * @param amounts Array of ETHG amounts
     */
    function batchRegisterVictims(
        address[] calldata victims,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(victims.length == amounts.length, "Array length mismatch");
        
        for (uint256 i = 0; i < victims.length; i++) {
            if (victims[i] != address(0) && amounts[i] > 0 && !isRegisteredVictim[victims[i]]) {
                isRegisteredVictim[victims[i]] = true;
                victimEthgAmount[victims[i]] = amounts[i];
                emit VictimRegistered(victims[i], amounts[i], recoveryRate);
            }
        }
    }

    /**
     * @dev Execute ETH recovery for registered victim
     * @param victim The victim's address
     */
    function recoverETH(address victim) external nonReentrant whenNotPaused {
        require(isRegisteredVictim[victim], "Not registered victim");
        require(!hasRecovered[victim], "Already recovered");
        require(msg.sender == victim, "Only victim can recover");
        
        uint256 ethgAmount = victimEthgAmount[victim];
        require(ethgAmount > 0, "No ETHG to recover");
        
        // Mark as recovered
        hasRecovered[victim] = true;
        
        // Calculate ETH amount based on recovery rate
        uint256 ethAmount = (ethgAmount * recoveryRate) / 10000;
        
        // Calculate recovery fee
        uint256 fee = (ethAmount * recoveryFee) / 10000;
        uint256 victimReceives = ethAmount - fee;
        
        // Transfer ETH to victim
        require(victimReceives > 0, "Recovery amount too small");
        (bool success, ) = victim.call{value: victimReceives}("");
        require(success, "ETH transfer failed");
        
        emit ETHRecovered(victim, ethgAmount, victimReceives, fee);
    }

    /**
     * @dev Execute gasless ETH recovery
     * @param recovery Gasless recovery data
     */
    function executeGaslessRecovery(
        GaslessRecovery calldata recovery
    ) external nonReentrant whenNotPaused {
        require(gaslessRecoveryEnabled, "Gasless recovery disabled");
        require(isRegisteredVictim[recovery.victim], "Not registered victim");
        require(!hasRecovered[recovery.victim], "Already recovered");
        require(block.timestamp <= recovery.deadline, "Recovery expired");
        require(recovery.victim != address(0), "Invalid victim");

        // Verify signature
        bytes32 structHash = keccak256(
            abi.encode(
                keccak256("GaslessRecovery(address victim,uint256 ethgAmount,uint256 nonce,uint256 deadline)"),
                recovery.victim,
                recovery.ethgAmount,
                recoveryNonces[recovery.victim],
                recovery.deadline
            )
        );
        bytes32 hash = _hashTypedDataV4(structHash);
        address signer = hash.recover(recovery.signature);
        require(signer == recovery.victim, "Invalid signature");

        // Increment nonce
        recoveryNonces[recovery.victim]++;

        // Mark as recovered
        hasRecovered[recovery.victim] = true;

        // Calculate ETH amount
        uint256 ethAmount = (recovery.ethgAmount * recoveryRate) / 10000;
        uint256 fee = (ethAmount * recoveryFee) / 10000;
        uint256 victimReceives = ethAmount - fee;

        // Transfer ETH to victim
        require(victimReceives > 0, "Recovery amount too small");
        (bool success, ) = recovery.victim.call{value: victimReceives}("");
        require(success, "ETH transfer failed");

        emit ETHRecovered(recovery.victim, recovery.ethgAmount, victimReceives, fee);
    }

    /**
     * @dev Get victim recovery status
     * @param victim The victim's address
     */
    function getVictimStatus(address victim) external view returns (
        bool isRegistered,
        bool hasRecoveredStatus,
        uint256 ethgAmount,
        uint256 ethAmount,
        uint256 recoveryFeeAmount,
        uint256 victimReceives,
        bool canRecover
    ) {
        isRegistered = isRegisteredVictim[victim];
        hasRecoveredStatus = this.hasRecovered(victim);
        ethgAmount = victimEthgAmount[victim];
        ethAmount = (ethgAmount * recoveryRate) / 10000;
        recoveryFeeAmount = (ethAmount * this.recoveryFee()) / 10000;
        victimReceives = ethAmount - recoveryFeeAmount;
        canRecover = isRegistered && !this.hasRecovered(victim) && ethgAmount > 0;
    }

    /**
     * @dev Get contract statistics
     */
    function getContractStats() external view returns (
        uint256 totalRegisteredVictims,
        uint256 totalRecoveredVictims,
        uint256 totalEthgAmount,
        uint256 totalEthRecovered,
        uint256 contractBalance,
        uint256 recoveryRateBps,
        uint256 recoveryFeeBps
    ) {
        // This would need to track totals in state variables
        // For now, return basic info
        totalRegisteredVictims = 0; // Would track this
        totalRecoveredVictims = 0; // Would track this
        totalEthgAmount = 0; // Would track this
        totalEthRecovered = 0; // Would track this
        contractBalance = address(this).balance;
        recoveryRateBps = recoveryRate;
        recoveryFeeBps = recoveryFee;
    }

    /**
     * @dev Update recovery rate (owner only)
     * @param newRate New recovery rate in basis points
     */
    function setRecoveryRate(uint256 newRate) external onlyOwner {
        require(newRate >= MIN_RECOVERY_RATE && newRate <= MAX_RECOVERY_RATE, "Invalid rate");
        uint256 oldRate = recoveryRate;
        recoveryRate = newRate;
        emit RecoveryRateUpdated(oldRate, newRate, msg.sender);
    }

    /**
     * @dev Update recovery fee (owner only)
     * @param newFee New recovery fee in basis points
     */
    function setRecoveryFee(uint256 newFee) external onlyOwner {
        require(newFee <= MAX_RECOVERY_FEE, "Fee too high");
        recoveryFee = newFee;
    }

    /**
     * @dev Toggle gasless recovery (owner only)
     */
    function toggleGaslessRecovery() external onlyOwner {
        gaslessRecoveryEnabled = !gaslessRecoveryEnabled;
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
     * @dev Withdraw collected fees (owner only)
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Fee withdrawal failed");
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

// Interface for ERC20
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}
