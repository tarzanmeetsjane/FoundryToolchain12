// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHGRDelegatedRecovery
 * @dev Enhanced ETHGR recovery contract with delegation signature support
 * Enables gas-free recovery operations through EIP-712 signatures
 */
contract ETHGRDelegatedRecovery is EIP712, Ownable {
    using ECDSA for bytes32;

    IERC20 public immutable ethgrToken;
    
    // Delegation typehash for EIP-712
    bytes32 public constant DELEGATION_TYPEHASH = keccak256(
        "Delegation(address beneficiary,uint256 amount,uint256 nonce,uint256 deadline)"
    );
    
    // Nonces for replay protection
    mapping(address => uint256) public nonces;
    
    // Recovery events
    event RecoveryExecuted(address indexed beneficiary, uint256 amount);
    event DelegatedRecoveryExecuted(address indexed signer, address indexed beneficiary, uint256 amount);
    
    constructor(
        address _ethgrToken,
        address _owner
    ) EIP712("ETHGRDelegatedRecovery", "1") {
        ethgrToken = IERC20(_ethgrToken);
        _transferOwnership(_owner);
    }
    
    /**
     * @dev Execute recovery with delegation signature
     * @param beneficiary Address receiving the recovered tokens
     * @param amount Amount of tokens to recover
     * @param deadline Signature expiration timestamp
     * @param v Recovery parameter
     * @param r ECDSA signature parameter
     * @param s ECDSA signature parameter
     */
    function executeRecoveryWithDelegation(
        address beneficiary,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(block.timestamp <= deadline, "Signature expired");
        require(beneficiary != address(0), "Invalid beneficiary");
        require(amount > 0, "Amount must be positive");
        
        // Construct delegation hash
        bytes32 structHash = keccak256(
            abi.encode(
                DELEGATION_TYPEHASH,
                beneficiary,
                amount,
                nonces[beneficiary],
                deadline
            )
        );
        
        bytes32 hash = _hashTypedDataV4(structHash);
        address signer = hash.recover(v, r, s);
        
        require(signer == owner(), "Invalid signature");
        
        // Increment nonce for replay protection
        nonces[beneficiary]++;
        
        // Execute recovery
        require(
            ethgrToken.transfer(beneficiary, amount),
            "Token transfer failed"
        );
        
        emit DelegatedRecoveryExecuted(signer, beneficiary, amount);
    }
    
    /**
     * @dev Standard recovery function (requires direct transaction)
     * @param beneficiary Address receiving the recovered tokens
     * @param amount Amount of tokens to recover
     */
    function executeRecovery(address beneficiary, uint256 amount) external onlyOwner {
        require(beneficiary != address(0), "Invalid beneficiary");
        require(amount > 0, "Amount must be positive");
        
        require(
            ethgrToken.transfer(beneficiary, amount),
            "Token transfer failed"
        );
        
        emit RecoveryExecuted(beneficiary, amount);
    }
    
    /**
     * @dev Emergency withdrawal function
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(
            ethgrToken.transfer(owner(), amount),
            "Token transfer failed"
        );
    }
    
    /**
     * @dev Get current nonce for an address
     * @param account Address to check nonce for
     * @return Current nonce value
     */
    function getNonce(address account) external view returns (uint256) {
        return nonces[account];
    }
    
    /**
     * @dev Get contract's ETHGR token balance
     * @return Current token balance
     */
    function getBalance() external view returns (uint256) {
        return ethgrToken.balanceOf(address(this));
    }
    
    /**
     * @dev Get domain separator for EIP-712
     * @return Domain separator hash
     */
    function getDomainSeparator() external view returns (bytes32) {
        return _domainSeparatorV4();
    }
}