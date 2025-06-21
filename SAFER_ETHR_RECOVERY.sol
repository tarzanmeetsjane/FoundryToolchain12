// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHR is ERC20, Ownable {
    uint256 public constant RECOVERY_AMOUNT = 1990000 * 10**18; // 1,990,000 tokens
    bool public recoveryCompleted = false;
    
    // Specific recovery wallet - only this address can recover
    address public constant RECOVERY_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    event RecoveryExecuted(address indexed recoveryWallet, uint256 amount);
    
    constructor() ERC20("Ethereum Recovery", "ETHR") Ownable(msg.sender) {
        // Safer recovery contract with fixed recovery wallet
    }
    
    function executeRecovery() external {
        require(!recoveryCompleted, "Recovery already completed");
        require(msg.sender == RECOVERY_WALLET, "Only recovery wallet can execute");
        
        // Mint recovery tokens to the specific recovery wallet
        _mint(RECOVERY_WALLET, RECOVERY_AMOUNT);
        recoveryCompleted = true;
        
        emit RecoveryExecuted(RECOVERY_WALLET, RECOVERY_AMOUNT);
    }
    
    // Prevent owner from minting additional tokens
    function renounceOwnership() public override onlyOwner {
        super.renounceOwnership();
    }
}