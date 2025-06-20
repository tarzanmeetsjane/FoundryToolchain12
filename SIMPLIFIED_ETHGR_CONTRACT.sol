// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Simplified Version
 * @dev Clean, transparent ERC20 token for ETHG recovery
 * @author Deployed by: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
 */
contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Mint the recovered 1,990,000 tokens immediately to deployer
        uint256 recoveredAmount = 1990000 * 10**18;
        _mint(msg.sender, recoveredAmount);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    // Transparent transfer function - no hidden restrictions
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        return super.transferFrom(from, to, amount);
    }
    
    // Emergency ETH withdrawal function
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    // Allow contract to receive ETH
    receive() external payable {}
}