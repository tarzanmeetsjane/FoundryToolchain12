// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner) {
        _transferOwnership(initialOwner);
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal virtual {
        require(to != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), to, amount);

        _totalSupply += amount;
        unchecked {
            _balances[to] += amount;
        }
        emit Transfer(address(0), to, amount);

        _afterTokenTransfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(from, address(0), amount);

        uint256 accountBalance = _balances[from];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[from] = accountBalance - amount;
            _totalSupply -= amount;
        }

        emit Transfer(from, address(0), amount);

        _afterTokenTransfer(from, address(0), amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(address owner, address spender, uint256 amount) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}

    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    
    address public constant ORIGINAL_ETHG = 0x3fC29836E84E471a053D2D9E80494A867D670EAD;
    
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
    }
    
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(balanceOf(msg.sender) >= amount, "ERC20: transfer amount exceeds balance");
        
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(balanceOf(from) >= amount, "ERC20: transfer amount exceeds balance");
        
        return super.transferFrom(from, to, amount);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        _mint(to, amount);
    }
    
    function migrateMyTrappedETHG() external {
        require(msg.sender == owner(), "Only contract owner can migrate");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(migrationEnabled, "Migration disabled");
        
        uint256 trappedAmount = 1990000 * 10**18;
        
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = trappedAmount;
        totalMigrated += trappedAmount;
        
        _mint(msg.sender, trappedAmount);
        
        emit TokensMigrated(msg.sender, trappedAmount, trappedAmount);
    }
    
    function migrateFromETHG(uint256 ethgAmount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(ethgAmount > 0, "Amount must be greater than 0");
        require(ethgAmount <= MAX_SUPPLY, "Amount exceeds max supply");
        
        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = ethgAmount;
        totalMigrated += ethgAmount;
        
        _mint(msg.sender, ethgAmount);
        
        emit TokensMigrated(msg.sender, ethgAmount, ethgAmount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationStatusChanged(migrationEnabled);
    }
    
    function getMigrationInfo(address account) external view returns (
        bool migrated,
        uint256 originalBalance,
        uint256 recoveryBalance
    ) {
        return (
            hasMigrated[account],
            originalETHGBalance[account],
            balanceOf(account)
        );
    }
    
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}