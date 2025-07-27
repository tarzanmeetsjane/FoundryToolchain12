// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ETHGR Recovery Token
 * @dev Enhanced ERC20 token for cryptocurrency recovery operations
 * Contract Address: 0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308
 * This is the EXACT source code for Etherscan verification
 */
contract ETHGRecovery is ERC20, Ownable {
    
    // Recovery and operational parameters
    uint256 public constant INITIAL_SUPPLY = 1990000 * 10**18; // 1,990,000 tokens
    uint256 public constant MAX_SUPPLY = 10000000 * 10**18;    // 10M max supply
    
    // Recovery tracking
    mapping(address => bool) public recoveryAddresses;
    mapping(address => uint256) public recoveryAmounts;
    
    // Events for transparency
    event RecoveryMint(address indexed to, uint256 amount, string reason);
    event RecoveryBurn(address indexed from, uint256 amount);
    event RecoveryAddressAdded(address indexed recoveryAddress);
    
    /**
     * @dev Constructor mints initial supply to deployer
     * NO CONSTRUCTOR ARGUMENTS - Leave constructor args field EMPTY on Etherscan
     */
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
        recoveryAddresses[msg.sender] = true;
        
        emit RecoveryMint(msg.sender, INITIAL_SUPPLY, "Initial deployment");
    }
    
    /**
     * @dev Add authorized recovery address
     */
    function addRecoveryAddress(address _recoveryAddress) external onlyOwner {
        recoveryAddresses[_recoveryAddress] = true;
        emit RecoveryAddressAdded(_recoveryAddress);
    }
    
    /**
     * @dev Emergency recovery mint for verified cases
     */
    function recoveryMint(address to, uint256 amount, string memory reason) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        _mint(to, amount);
        recoveryAmounts[to] += amount;
        
        emit RecoveryMint(to, amount, reason);
    }
    
    /**
     * @dev Burn tokens for deflationary mechanism
     */
    function burn(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        emit RecoveryBurn(msg.sender, amount);
    }
    
    /**
     * @dev Get recovery status for address
     */
    function getRecoveryInfo(address user) external view returns (bool isRecoveryAddress, uint256 recoveredAmount) {
        return (recoveryAddresses[user], recoveryAmounts[user]);
    }
    
    /**
     * @dev Override transfer to add recovery tracking
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Override transferFrom to add recovery tracking
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        return super.transferFrom(from, to, amount);
    }
}