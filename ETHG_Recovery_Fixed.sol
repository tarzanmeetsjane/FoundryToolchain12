// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHGRecovery
 * @dev Fixed contract with proper Solidity syntax for price service recognition
 * @notice This contract replaces the invalid syntax that caused $0.00 display issue
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Total supply: 1,990,000 tokens
    uint256 private constant TOTAL_SUPPLY = 1_990_000 * 10**18;
    
    /**
     * @dev Constructor that mints initial supply to deployer
     * @notice Fixed syntax enables proper metadata parsing by price services
     */
    constructor() ERC20("ETHG Recovery", "ETHGR") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
    
    /**
     * @dev Allows owner to mint additional tokens if needed
     * @param to Address to receive the minted tokens
     * @param amount Amount of tokens to mint (in wei)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Emergency recovery function for trapped tokens
     * @param tokenAddress Address of the token contract to recover
     * @param amount Amount of tokens to recover
     */
    function recoverERC20(address tokenAddress, uint256 amount) public onlyOwner {
        IERC20(tokenAddress).transfer(owner(), amount);
    }
    
    /**
     * @dev Recovery function for trapped ETH
     */
    function recoverETH() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Returns contract version for verification
     */
    function version() public pure returns (string memory) {
        return "1.0.0-fixed";
    }
    
    /**
     * @dev Override to prevent renouncing ownership accidentally
     */
    function renounceOwnership() public view override onlyOwner {
        revert("Ownership cannot be renounced for security");
    }
}