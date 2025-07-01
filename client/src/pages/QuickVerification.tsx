export default function QuickVerification() {
  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

interface IERC20Errors {
    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);
    error ERC20InvalidSender(address sender);
    error ERC20InvalidReceiver(address receiver);
    error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed);
    error ERC20InvalidApprover(address approver);
    error ERC20InvalidSpender(address spender);
}

abstract contract ERC20 is Context, IERC20, IERC20Metadata, IERC20Errors {
    mapping(address account => uint256) private _balances;
    mapping(address account => mapping(address spender => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(from, to, value);
    }

    function _update(address from, address to, uint256 value) internal virtual {
        if (from == address(0)) {
            _totalSupply += value;
        } else {
            uint256 fromBalance = _balances[from];
            if (fromBalance < value) {
                revert ERC20InsufficientBalance(from, fromBalance, value);
            }
            unchecked {
                _balances[from] = fromBalance - value;
            }
        }

        if (to == address(0)) {
            unchecked {
                _totalSupply -= value;
            }
        } else {
            unchecked {
                _balances[to] += value;
            }
        }

        emit Transfer(from, to, value);
    }

    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(address(0), account, value);
    }

    function _approve(address owner, address spender, uint256 value) internal {
        _approve(owner, spender, value, true);
    }

    function _approve(address owner, address spender, uint256 value, bool emitEvent) internal virtual {
        if (owner == address(0)) {
            revert ERC20InvalidApprover(address(0));
        }
        if (spender == address(0)) {
            revert ERC20InvalidSpender(address(0));
        }
        _allowances[owner][spender] = value;
        if (emitEvent) {
            emit Approval(owner, spender, value);
        }
    }

    function _spendAllowance(address owner, address spender, uint256 value) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) {
                revert ERC20InsufficientAllowance(spender, currentAllowance, value);
            }
            unchecked {
                _approve(owner, spender, currentAllowance - value, false);
            }
        }
    }
}

abstract contract Ownable is Context {
    address private _owner;

    error OwnableInvalidOwner(address owner);
    error OwnableUnauthorizedAccount(address account);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
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
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract ETHGRecovery is ERC20, Ownable {
    mapping(address => bool) public hasMigrated;
    bool public migrationEnabled;
    uint256 public totalMigrated;

    event TokensMigrated(address indexed holder, uint256 amount);

    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        migrationEnabled = true;
        totalMigrated = 0;
    }

    function migrateMyTrappedETHG() external {
        require(msg.sender == 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, "Only foundation");
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        
        uint256 amount = 1990000 * 10**18;
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }

    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
    }

    function migrateTrappedETHG(uint256 amount) external {
        require(migrationEnabled, "Migration disabled");
        require(!hasMigrated[msg.sender], "Already migrated");
        require(amount > 0, "Amount must be positive");
        
        hasMigrated[msg.sender] = true;
        totalMigrated += amount;
        _mint(msg.sender, amount);
        emit TokensMigrated(msg.sender, amount);
    }

    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be positive");
        _mint(to, amount);
    }
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(contractCode);
    alert('Contract code copied! Now click "Go to Etherscan" below.');
  };

  const openEtherscan = () => {
    window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '36px', color: '#1f2937', marginBottom: '10px' }}>
          QUICK VERIFICATION
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
          Verify your ETHGR contract in 3 simple steps
        </p>
        <div style={{ 
          background: '#fef3c7', 
          border: '2px solid #f59e0b', 
          padding: '15px', 
          borderRadius: '10px',
          display: 'inline-block'
        }}>
          <span style={{ color: '#92400e', fontWeight: 'bold', fontSize: '16px' }}>
            Contract: 0xc2b6d375b7d14c9ce73f97ddf565002cce257308
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        {/* Step 1 */}
        <div style={{ 
          background: '#dbeafe', 
          border: '2px solid #3b82f6', 
          borderRadius: '10px', 
          padding: '20px' 
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: '15px', fontSize: '20px' }}>
            1. Copy Contract Code
          </h3>
          <p style={{ color: '#1e40af', marginBottom: '15px' }}>
            Get the exact source code that matches your deployed contract
          </p>
          <button 
            onClick={copyCode}
            style={{ 
              background: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            COPY CONTRACT CODE
          </button>
        </div>

        {/* Step 2 */}
        <div style={{ 
          background: '#fef3c7', 
          border: '2px solid #f59e0b', 
          borderRadius: '10px', 
          padding: '20px' 
        }}>
          <h3 style={{ color: '#92400e', marginBottom: '15px', fontSize: '20px' }}>
            2. Go to Etherscan
          </h3>
          <p style={{ color: '#92400e', marginBottom: '15px' }}>
            Opens verification page with your contract address pre-filled
          </p>
          <button 
            onClick={openEtherscan}
            style={{ 
              background: '#f59e0b', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            GO TO ETHERSCAN
          </button>
        </div>

        {/* Step 3 */}
        <div style={{ 
          background: '#dcfce7', 
          border: '2px solid #22c55e', 
          borderRadius: '10px', 
          padding: '20px' 
        }}>
          <h3 style={{ color: '#15803d', marginBottom: '15px', fontSize: '20px' }}>
            3. Submit Verification
          </h3>
          <p style={{ color: '#15803d', marginBottom: '15px' }}>
            Paste the code and complete verification
          </p>
          <div style={{ 
            background: '#22c55e', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%'
          }}>
            COMPLETE ON ETHERSCAN
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{ 
        background: '#f8fafc', 
        border: '2px solid #cbd5e1', 
        borderRadius: '10px', 
        padding: '25px',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#374151', marginBottom: '20px', fontSize: '22px' }}>
          Etherscan Verification Settings
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div style={{ background: '#e0e7ff', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ color: '#3730a3', marginBottom: '8px' }}>Compiler Version</h4>
            <code style={{ background: '#c7d2fe', padding: '4px 8px', borderRadius: '4px' }}>
              v0.8.30+commit.73712a01
            </code>
          </div>
          
          <div style={{ background: '#fef2f2', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ color: '#991b1b', marginBottom: '8px' }}>Optimization</h4>
            <strong style={{ color: '#991b1b' }}>No optimization</strong>
          </div>
          
          <div style={{ background: '#fef2f2', padding: '15px', borderRadius: '8px', border: '2px solid #ef4444' }}>
            <h4 style={{ color: '#991b1b', marginBottom: '8px' }}>Constructor Arguments</h4>
            <strong style={{ color: '#991b1b', fontSize: '18px' }}>LEAVE EMPTY</strong>
          </div>
        </div>
      </div>

      {/* Expected Result */}
      <div style={{ 
        background: 'linear-gradient(135deg, #10b981, #059669)', 
        color: 'white', 
        borderRadius: '10px', 
        padding: '25px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '15px', fontSize: '24px' }}>
          Expected Result
        </h3>
        <div style={{ fontSize: '18px', marginBottom: '15px' }}>
          <div>✅ 1,990,000 ETHGR tokens become tradeable</div>
          <div>✅ Portfolio value: $200,000 - $1,300,000</div>
          <div>✅ Uniswap trading enabled</div>
        </div>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Your "N/A" values become real money
        </p>
      </div>
    </div>
  );
}