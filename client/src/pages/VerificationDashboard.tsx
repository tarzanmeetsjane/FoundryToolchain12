export default function VerificationDashboard() {
  const contractAddress = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const copyCode = () => {
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

    navigator.clipboard.writeText(contractCode);
    alert("Contract source code copied to clipboard!");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px",
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <h1 style={{
            fontSize: "48px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            ETHGR VERIFICATION COMMAND CENTER
          </h1>
          <div style={{
            background: "#fee2e2",
            border: "3px solid #ef4444",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#7f1d1d", fontWeight: "bold", fontSize: "18px" }}>
              Contract: {contractAddress}
            </div>
            <div style={{ color: "#7f1d1d", fontSize: "16px" }}>
              Value: 1,990,000 ETHGR tokens ($200k-$1.3M)
            </div>
          </div>
          <div style={{
            background: "#fef3c7",
            border: "2px solid #f59e0b",
            padding: "15px",
            borderRadius: "10px",
            display: "inline-block"
          }}>
            <div style={{ color: "#92400e", fontWeight: "bold" }}>
              API Analysis: Multiple verification attempts detected 07/01/2025
            </div>
          </div>
        </div>

        {/* Verification Options */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}>
          
          {/* Status Check */}
          <div style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 15px 30px rgba(16, 185, 129, 0.3)",
            cursor: "pointer",
            transition: "transform 0.3s"
          }}
          onClick={() => window.location.href = '/status'}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>📊</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold" }}>
              VERIFICATION STATUS
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "20px", opacity: "0.9" }}>
              Check current verification status and analyze API logs
            </p>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold"
            }}>
              Real-time status check
            </div>
          </div>

          {/* Final System */}
          <div style={{
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            color: "white",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)",
            cursor: "pointer",
            transition: "transform 0.3s"
          }}
          onClick={() => window.location.href = '/final'}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🚀</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold" }}>
              FINAL VERIFICATION
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "20px", opacity: "0.9" }}>
              Complete verification system with visual guidance
            </p>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold"
            }}>
              Professional interface
            </div>
          </div>

          {/* Quick Verification */}
          <div style={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "white",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 15px 30px rgba(245, 158, 11, 0.3)",
            cursor: "pointer",
            transition: "transform 0.3s"
          }}
          onClick={() => window.location.href = '/quick'}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>⚡</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold" }}>
              QUICK VERIFICATION
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "20px", opacity: "0.9" }}>
              Fast, simple verification with essential tools
            </p>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold"
            }}>
              Lightweight interface
            </div>
          </div>

          {/* Remix Integration */}
          <div style={{
            background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            color: "white",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 15px 30px rgba(139, 92, 246, 0.3)",
            cursor: "pointer",
            transition: "transform 0.3s"
          }}
          onClick={() => window.location.href = '/remix'}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔧</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold" }}>
              REMIX INTEGRATION
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "20px", opacity: "0.9" }}>
              Specialized workflow for Remix IDE users
            </p>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold"
            }}>
              Remix + Etherscan
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          marginBottom: "30px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "32px",
            color: "#1f2937",
            marginBottom: "30px",
            fontWeight: "bold"
          }}>
            IMMEDIATE ACTIONS
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <button
              onClick={copyCode}
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              📋 COPY CONTRACT CODE
            </button>

            <button
              onClick={() => openLink(`https://etherscan.io/verifyContract?a=${contractAddress}`)}
              style={{
                background: "linear-gradient(135deg, #ec4899, #db2777)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              🔗 OPEN ETHERSCAN
            </button>

            <button
              onClick={() => openLink(`https://etherscan.io/address/${contractAddress}`)}
              style={{
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              📈 CHECK CONTRACT
            </button>

            <button
              onClick={() => openLink('https://remix.ethereum.org')}
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              🛠️ OPEN REMIX
            </button>
          </div>
        </div>

        {/* Settings Reference */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "25px",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            VERIFICATION SETTINGS REFERENCE
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              background: "#dbeafe",
              padding: "20px",
              borderRadius: "15px",
              border: "2px solid #3b82f6",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#1e40af", marginBottom: "10px", fontWeight: "bold" }}>
                Compiler Version
              </h4>
              <code style={{
                background: "#93c5fd",
                color: "#1e40af",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                v0.8.30+commit.73712a01
              </code>
            </div>
            
            <div style={{
              background: "#fef3c7",
              padding: "20px",
              borderRadius: "15px",
              border: "2px solid #f59e0b",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#92400e", marginBottom: "10px", fontWeight: "bold" }}>
                Optimization
              </h4>
              <div style={{ color: "#92400e", fontWeight: "bold", fontSize: "16px" }}>
                No optimization
              </div>
            </div>
            
            <div style={{
              background: "#fee2e2",
              padding: "20px",
              borderRadius: "15px",
              border: "3px solid #ef4444",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#991b1b", marginBottom: "10px", fontWeight: "bold" }}>
                Constructor Arguments
              </h4>
              <div style={{ color: "#991b1b", fontWeight: "bold", fontSize: "18px" }}>
                LEAVE EMPTY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}