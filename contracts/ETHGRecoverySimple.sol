// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ETHGRecoverySimple {
    string public name = "ETHG Recovery V2";
    string public symbol = "ETHGRV2";
    uint8 public decimals = 18;
    uint256 private _totalSupply;
    address public owner;
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled = true;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event TokensMigrated(address indexed holder, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(_balances[msg.sender] >= value, "Insufficient balance");
        require(to != address(0), "Invalid address");
        
        _balances[msg.sender] -= value;
        _balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(_allowances[from][msg.sender] >= value, "Allowance exceeded");
        require(_balances[from] >= value, "Insufficient balance");
        require(to != address(0), "Invalid address");
        
        _balances[from] -= value;
        _balances[to] += value;
        _allowances[from][msg.sender] -= value;
        
        emit Transfer(from, to, value);
        return true;
    }
    
    function mint(address to, uint256 amount) internal {
        require(to != address(0), "Invalid address");
        _totalSupply += amount;
        _balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function migrateMyTokens() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Only foundation wallet");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18; // 1,990,000 tokens
        hasMigrated[msg.sender] = true;
        
        mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }
    
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        mint(to, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }
}