// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title ETHG Recovery Token (ETHGR) - Secure Production Version
 * @dev Security-hardened version addressing Etherscan vulnerabilities
 * @author Quantum Secure Trader Platform
 */
contract ETHGRecoverySecure is ERC20, Ownable, ReentrancyGuard, Pausable {
    
    // Constants
    uint256 public constant MAX_SUPPLY = 2000000 * 10**18; // 2M max supply
    address public constant AUTHORIZED_MIGRATOR = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    // Migration tracking with enhanced security
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public migrationAmount;
    mapping(address => bool) public authorizedMigrators;
    
    // Security controls
    bool public migrationEnabled = true;
    bool public emergencyMigrationLocked = false;
    uint256 public totalMigrated = 0;
    uint256 public migrationDeadline;
    
    // Events
    event TokensMigrated(address indexed holder, uint256 amount, string migrationType);
    event MigrationStatusChanged(bool enabled);
    event AuthorizedMigratorAdded(address indexed migrator);
    event AuthorizedMigratorRemoved(address indexed migrator);
    event EmergencyMigrationLocked();
    
    // Modifiers
    modifier onlyAuthorizedMigrator() {
        require(authorizedMigrators[msg.sender] || msg.sender == AUTHORIZED_MIGRATOR, "Unauthorized migrator");
        _;
    }
    
    modifier migrationActive() {
        require(migrationEnabled, "Migration disabled");
        require(block.timestamp <= migrationDeadline, "Migration deadline passed");
        require(!emergencyMigrationLocked, "Emergency migration locked");
        _;
    }
    
    modifier validMigrationAmount(uint256 amount) {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= 10000000 * 10**18, "Amount exceeds reasonable limit");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _;
    }
    
    constructor() ERC20("ETHG Recovery Secure", "ETHGRS") Ownable(msg.sender) {
        // Set migration deadline to 90 days from deployment
        migrationDeadline = block.timestamp + 90 days;
        
        // Authorize the original wallet
        authorizedMigrators[AUTHORIZED_MIGRATOR] = true;
        emit AuthorizedMigratorAdded(AUTHORIZED_MIGRATOR);
    }
    
    /**
     * @dev Secure migration for authorized wallet - FIXED VERSION
     * Amount: 1,990,000 ETHG tokens
     */
    function migrateAuthorizedETHG() external onlyAuthorizedMigrator migrationActive nonReentrant {
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18; // 1,990,000 tokens
        
        // Update state before minting (CEI pattern)
        hasMigrated[msg.sender] = true;
        migrationAmount[msg.sender] = amount;
        totalMigrated += amount;
        
        // Mint tokens
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount, "Authorized");
    }
    
    /**
     * @dev Secure general migration with strict controls
     */
    function migrateVerifiedETHG(uint256 amount, bytes calldata proof) 
        external 
        migrationActive 
        nonReentrant 
        validMigrationAmount(amount) 
    {
        require(!hasMigrated[msg.sender], "Already migrated");
        require(authorizedMigrators[msg.sender], "Must be pre-authorized");
        require(_verifyMigrationProof(msg.sender, amount, proof), "Invalid migration proof");
        
        // Update state before minting (CEI pattern)
        hasMigrated[msg.sender] = true;
        migrationAmount[msg.sender] = amount;
        totalMigrated += amount;
        
        // Mint tokens
        _mint(msg.sender, amount);
        
        emit TokensMigrated(msg.sender, amount, "Verified");
    }
    
    /**
     * @dev Add authorized migrator (owner only)
     */
    function addAuthorizedMigrator(address migrator) external onlyOwner {
        require(migrator != address(0), "Invalid address");
        require(!authorizedMigrators[migrator], "Already authorized");
        
        authorizedMigrators[migrator] = true;
        emit AuthorizedMigratorAdded(migrator);
    }
    
    /**
     * @dev Remove authorized migrator (owner only)
     */
    function removeAuthorizedMigrator(address migrator) external onlyOwner {
        require(authorizedMigrators[migrator], "Not authorized");
        require(migrator != AUTHORIZED_MIGRATOR, "Cannot remove primary migrator");
        
        authorizedMigrators[migrator] = false;
        emit AuthorizedMigratorRemoved(migrator);
    }
    
    /**
     * @dev Toggle migration status (owner only)
     */
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationStatusChanged(migrationEnabled);
    }
    
    /**
     * @dev Permanently lock emergency migration (owner only, irreversible)
     */
    function lockEmergencyMigration() external onlyOwner {
        emergencyMigrationLocked = true;
        emit EmergencyMigrationLocked();
    }
    
    /**
     * @dev Emergency pause (owner only)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause (owner only)
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override transfer to include pause functionality
     */
    function transfer(address to, uint256 amount) public virtual override whenNotPaused returns (bool) {
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Override transferFrom to include pause functionality
     */
    function transferFrom(address from, address to, uint256 amount) 
        public 
        virtual 
        override 
        whenNotPaused 
        returns (bool) 
    {
        return super.transferFrom(from, to, amount);
    }
    
    /**
     * @dev Burn tokens (anyone can burn their own tokens)
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Get migration info for an address
     */
    function getMigrationInfo(address account) external view returns (
        bool migrated,
        uint256 amount,
        bool authorized,
        uint256 balance
    ) {
        return (
            hasMigrated[account],
            migrationAmount[account],
            authorizedMigrators[account],
            balanceOf(account)
        );
    }
    
    /**
     * @dev Get contract status
     */
    function getContractStatus() external view returns (
        bool migrationActive,
        uint256 deadline,
        uint256 totalMigrated_,
        uint256 maxSupply,
        bool emergencyLocked
    ) {
        return (
            migrationEnabled && block.timestamp <= migrationDeadline && !emergencyMigrationLocked,
            migrationDeadline,
            totalMigrated,
            MAX_SUPPLY,
            emergencyMigrationLocked
        );
    }
    
    /**
     * @dev Verify migration proof (placeholder - implement actual verification)
     */
    function _verifyMigrationProof(address, uint256, bytes calldata) internal pure returns (bool) {
        // Implement actual proof verification logic here
        // For now, return false to prevent unauthorized migrations
        return false;
    }
    
    /**
     * @dev Emergency withdrawal (owner only, for any accidentally sent ETH)
     */
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}