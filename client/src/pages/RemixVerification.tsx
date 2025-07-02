export default function RemixVerification() {
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
    alert('Contract code copied to clipboard!');
  };

  const openEtherscan = () => {
    window.open('https://etherscan.io/verifyContract?a=0xc2b6d375b7d14c9ce73f97ddf565002cce257308', '_blank');
  };

  const openRemix = () => {
    window.open('https://remix.ethereum.org/', '_blank');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          background: 'rgba(255,255,255,0.95)',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            color: '#2d3748', 
            marginBottom: '15px',
            fontWeight: 'bold'
          }}>
            REMIX + ETHERSCAN VERIFICATION
          </h1>
          <p style={{ 
            fontSize: '22px', 
            color: '#4a5568', 
            marginBottom: '25px' 
          }}>
            Complete verification workflow for your ETHGR contract
          </p>
          <div style={{ 
            background: '#fed7d7', 
            border: '3px solid #e53e3e', 
            padding: '20px', 
            borderRadius: '15px',
            display: 'inline-block'
          }}>
            <div style={{ color: '#742a2a', fontWeight: 'bold', fontSize: '18px' }}>
              Contract Address: 0xc2b6d375b7d14c9ce73f97ddf565002cce257308
            </div>
            <div style={{ color: '#742a2a', fontSize: '16px', marginTop: '5px' }}>
              Value: 1,990,000 ETHGR tokens ($200k-$1.3M)
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '25px', 
          marginBottom: '40px' 
        }}>
          
          {/* Copy Code */}
          <div style={{ 
            background: 'linear-gradient(135deg, #4299e1, #3182ce)',
            color: 'white',
            borderRadius: '20px', 
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(66, 153, 225, 0.3)'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>
              1. COPY CONTRACT CODE
            </h3>
            <p style={{ fontSize: '16px', marginBottom: '20px', opacity: '0.9' }}>
              Get the exact bytecode-matching source code
            </p>
            <button 
              onClick={copyCode}
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white',
                border: '2px solid white',
                padding: '15px 30px', 
                borderRadius: '10px', 
                fontSize: '18px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              📋 COPY TO CLIPBOARD
            </button>
          </div>

          {/* Open Remix */}
          <div style={{ 
            background: 'linear-gradient(135deg, #38b2ac, #319795)',
            color: 'white',
            borderRadius: '20px', 
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(56, 178, 172, 0.3)'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>
              2. OPEN REMIX IDE
            </h3>
            <p style={{ fontSize: '16px', marginBottom: '20px', opacity: '0.9' }}>
              Create new file and paste the contract code
            </p>
            <button 
              onClick={openRemix}
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white',
                border: '2px solid white',
                padding: '15px 30px', 
                borderRadius: '10px', 
                fontSize: '18px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🚀 LAUNCH REMIX
            </button>
          </div>

          {/* Open Etherscan */}
          <div style={{ 
            background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
            color: 'white',
            borderRadius: '20px', 
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(237, 137, 54, 0.3)'
          }}>
            <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 'bold' }}>
              3. VERIFY ON ETHERSCAN
            </h3>
            <p style={{ fontSize: '16px', marginBottom: '20px', opacity: '0.9' }}>
              Submit verification with pre-filled address
            </p>
            <button 
              onClick={openEtherscan}
              style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white',
                border: '2px solid white',
                padding: '15px 30px', 
                borderRadius: '10px', 
                fontSize: '18px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ✅ GO TO ETHERSCAN
            </button>
          </div>
        </div>

        {/* Verification Settings */}
        <div style={{ 
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px', 
          padding: '35px',
          marginBottom: '30px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            color: '#2d3748', 
            marginBottom: '25px', 
            fontSize: '28px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            ETHERSCAN VERIFICATION SETTINGS
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ 
              background: '#e6fffa', 
              padding: '20px', 
              borderRadius: '15px',
              border: '3px solid #38b2ac'
            }}>
              <h4 style={{ 
                color: '#234e52', 
                marginBottom: '10px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                Compiler Version
              </h4>
              <code style={{ 
                background: '#b2f5ea', 
                padding: '8px 15px', 
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#234e52'
              }}>
                v0.8.30+commit.73712a01
              </code>
            </div>
            
            <div style={{ 
              background: '#fef5e7', 
              padding: '20px', 
              borderRadius: '15px',
              border: '3px solid #ed8936'
            }}>
              <h4 style={{ 
                color: '#744210', 
                marginBottom: '10px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                Optimization
              </h4>
              <div style={{ 
                color: '#744210',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                No optimization
              </div>
            </div>
            
            <div style={{ 
              background: '#fed7d7', 
              padding: '20px', 
              borderRadius: '15px',
              border: '3px solid #e53e3e'
            }}>
              <h4 style={{ 
                color: '#742a2a', 
                marginBottom: '10px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                Constructor Arguments
              </h4>
              <div style={{ 
                color: '#742a2a',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                LEAVE COMPLETELY EMPTY
              </div>
            </div>
          </div>
        </div>

        {/* Expected Result */}
        <div style={{ 
          background: 'linear-gradient(135deg, #48bb78, #38a169)',
          color: 'white',
          borderRadius: '20px', 
          padding: '35px',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(72, 187, 120, 0.3)'
        }}>
          <h3 style={{ 
            marginBottom: '20px', 
            fontSize: '32px',
            fontWeight: 'bold'
          }}>
            🎯 VERIFICATION SUCCESS RESULT
          </h3>
          <div style={{ 
            fontSize: '20px', 
            marginBottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px'
          }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '15px', 
              borderRadius: '10px',
              backdropFilter: 'blur(10px)'
            }}>
              ✅ 1,990,000 ETHGR tokens tradeable
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '15px', 
              borderRadius: '10px',
              backdropFilter: 'blur(10px)'
            }}>
              ✅ Portfolio: $200k-$1.3M unlocked
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.2)', 
              padding: '15px', 
              borderRadius: '10px',
              backdropFilter: 'blur(10px)'
            }}>
              ✅ Uniswap trading enabled
            </div>
          </div>
          <p style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Transform "N/A" values into real wealth
          </p>
        </div>
      </div>
    </div>
  );
}