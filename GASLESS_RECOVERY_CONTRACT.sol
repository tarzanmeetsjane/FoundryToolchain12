// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title ETHG Recovery Token with Gasless Transactions
 * @dev Fixed version with meta-transactions for gasless recovery
 * @author Quantum Secure Trader Recovery System
 */
contract ETHGRecoveryGasless is ERC20, Ownable {
    using ECDSA for bytes32;
    
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    
    // Gasless transaction tracking
    mapping(address => uint256) public nonces;
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    
    // Gas sponsor (contract owner pays for all migrations)
    address public gasSponsor;
    
    // Original honeypot contract
    address public constant ORIGINAL_ETHG = 0x3fC29836E84E471a053D2D9E80494A867D670EAD;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount);
    event GaslessTransactionExecuted(address indexed user, uint256 nonce);
    
    constructor() ERC20("ETHG Recovery Gasless", "ETHGR") Ownable(msg.sender) {
        gasSponsor = msg.sender;
        
        // Pre-register your specific migration
        originalETHGBalance[0x058C8FE01E5c9eaC6ee19e6673673B549B368843] = 1990000 * 10**18;
    }
    
    /**
     * @dev Sponsor pays gas for user's token migration
     * User signs a message, sponsor executes the transaction
     */
    function executeGaslessMigration(
        address user,
        uint256 nonce,
        bytes memory signature
    ) external {
        require(msg.sender == gasSponsor, "Only sponsor can execute");
        require(!hasMigrated[user], "Already migrated");
        require(nonces[user] == nonce, "Invalid nonce");
        
        // Verify signature
        bytes32 hash = keccak256(abi.encodePacked(
            "ETHG Migration",
            user,
            nonce,
            address(this)
        ));
        
        bytes32 ethSignedHash = hash.toEthSignedMessageHash();
        address signer = ethSignedHash.recover(signature);
        require(signer == user, "Invalid signature");
        
        // Execute migration
        uint256 amount = originalETHGBalance[user];
        require(amount > 0, "No tokens to migrate");
        
        hasMigrated[user] = true;
        nonces[user]++;
        
        _mint(user, amount);
        
        emit TokensMigrated(user, amount);
        emit GaslessTransactionExecuted(user, nonce);
    }
    
    /**
     * @dev Emergency migration function for specific user
     * Contract owner can directly migrate tokens without signature
     */
    function emergencyMigration(address user) external onlyOwner {
        require(!hasMigrated[user], "Already migrated");
        require(originalETHGBalance[user] > 0, "No tokens to migrate");
        
        uint256 amount = originalETHGBalance[user];
        hasMigrated[user] = true;
        
        _mint(user, amount);
        
        emit TokensMigrated(user, amount);
    }
    
    /**
     * @dev Your specific recovery function - can be called by sponsor
     */
    function recoverTrappedETHG_058C8FE01E5c9eaC6ee19e6673673B549B368843() external {
        require(msg.sender == gasSponsor, "Only sponsor can execute");
        address user = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
        require(!hasMigrated[user], "Already migrated");
        
        uint256 amount = 1990000 * 10**18;
        hasMigrated[user] = true;
        
        _mint(user, amount);
        
        emit TokensMigrated(user, amount);
    }
    
    /**
     * @dev Fund the gas sponsor account
     */
    function fundGasSponsor() external payable {
        require(msg.value > 0, "Must send ETH");
        payable(gasSponsor).transfer(msg.value);
    }
    
    /**
     * @dev Get user's current nonce for gasless transactions
     */
    function getNonce(address user) external view returns (uint256) {
        return nonces[user];
    }
    
    /**
     * @dev Transfer function with no restrictions
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        return super.transfer(to, amount);
    }
    
    /**
     * @dev TransferFrom with no restrictions
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        return super.transferFrom(from, to, amount);
    }
}