export default function ContractComparison() {
  const deployedContract = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  
  const copyOriginalContract = () => {
    const originalContract = `// SPDX-License-Identifier: MIT
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
    
    navigator.clipboard.writeText(originalContract);
    alert("Original deployed contract source code copied to clipboard");
  };

  const copyAlternativeContract = () => {
    const alternativeContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds maximum");
        _mint(msg.sender, initialSupply);
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
}`;
    
    navigator.clipboard.writeText(alternativeContract);
    alert("Alternative OpenZeppelin contract copied to clipboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%)",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
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
            background: "linear-gradient(135deg, #4338ca, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            CONTRACT VERSION COMPARISON
          </h1>
          <div style={{
            background: "#ddd6fe",
            border: "3px solid #8b5cf6",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#5b21b6", fontWeight: "bold", fontSize: "18px" }}>
              Deployed vs Alternative Implementation Analysis
            </div>
            <div style={{ color: "#5b21b6", fontSize: "16px" }}>
              Choose the correct contract version for verification
            </div>
          </div>
        </div>

        {/* Contract Comparison */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginBottom: "40px"
        }}>
          
          {/* Deployed Contract */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #22c55e"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "48px", marginRight: "15px" }}>✅</div>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#047857", margin: "0" }}>
                DEPLOYED CONTRACT
              </h2>
            </div>
            
            <div style={{
              background: "#ecfdf5",
              border: "2px solid #22c55e",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <div style={{ color: "#047857", fontWeight: "bold", marginBottom: "10px" }}>
                Contract Address:
              </div>
              <code style={{
                background: "#d1fae5",
                color: "#047857",
                padding: "8px",
                borderRadius: "6px",
                fontSize: "12px",
                wordBreak: "break-all",
                display: "block"
              }}>
                {deployedContract}
              </code>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#047857", marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}>
                Key Features:
              </h3>
              <ul style={{ color: "#059669", paddingLeft: "20px", lineHeight: "1.6" }}>
                <li>Solidity 0.8.30 (native implementation)</li>
                <li>Custom ERC20 with built-in interfaces</li>
                <li>Foundation-specific migration function</li>
                <li>1,990,000 tokens already minted</li>
                <li>Migration tracking system</li>
                <li>Emergency mint capability</li>
              </ul>
            </div>

            <div style={{
              background: "#dcfce7",
              border: "1px solid #a7f3d0",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <div style={{ color: "#047857", fontWeight: "bold", fontSize: "16px" }}>
                STATUS: DEPLOYED & OPERATIONAL
              </div>
              <div style={{ color: "#059669", fontSize: "14px" }}>
                Tokens minted, ready for verification
              </div>
            </div>

            <button
              onClick={copyOriginalContract}
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "white",
                border: "none",
                padding: "15px 25px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
                transition: "transform 0.3s"
              }}
            >
              COPY DEPLOYED CONTRACT
            </button>
          </div>

          {/* Alternative Contract */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #f59e0b"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "48px", marginRight: "15px" }}>🔄</div>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#d97706", margin: "0" }}>
                ALTERNATIVE VERSION
              </h2>
            </div>
            
            <div style={{
              background: "#fef3c7",
              border: "2px solid #f59e0b",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <div style={{ color: "#d97706", fontWeight: "bold", marginBottom: "10px" }}>
                Implementation Type:
              </div>
              <div style={{ color: "#92400e", fontSize: "14px" }}>
                OpenZeppelin-based ERC20 with constructor parameters
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#d97706", marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}>
                Key Features:
              </h3>
              <ul style={{ color: "#b45309", paddingLeft: "20px", lineHeight: "1.6" }}>
                <li>Solidity 0.8.19 (OpenZeppelin imports)</li>
                <li>Standard OpenZeppelin ERC20</li>
                <li>1 billion token maximum supply</li>
                <li>Constructor with parameters</li>
                <li>Mint/burn functionality</li>
                <li>Transparent transfer functions</li>
              </ul>
            </div>

            <div style={{
              background: "#fef3c7",
              border: "1px solid #fbbf24",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <div style={{ color: "#d97706", fontWeight: "bold", fontSize: "16px" }}>
                STATUS: ALTERNATIVE DESIGN
              </div>
              <div style={{ color: "#b45309", fontSize: "14px" }}>
                Different from deployed contract
              </div>
            </div>

            <button
              onClick={copyAlternativeContract}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                border: "none",
                padding: "15px 25px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
                transition: "transform 0.3s"
              }}
            >
              COPY ALTERNATIVE VERSION
            </button>
          </div>
        </div>

        {/* Verification Recommendation */}
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
            VERIFICATION RECOMMENDATION
          </h2>
          
          <div style={{
            background: "#ecfdf5",
            border: "3px solid #22c55e",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            marginBottom: "30px"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎯</div>
            <h3 style={{ color: "#047857", fontWeight: "bold", fontSize: "24px", marginBottom: "15px" }}>
              USE DEPLOYED CONTRACT VERSION
            </h3>
            <p style={{ color: "#059669", fontSize: "18px", marginBottom: "20px", lineHeight: "1.6" }}>
              The deployed contract at <code style={{ background: "#d1fae5", padding: "4px 8px", borderRadius: "4px" }}>{deployedContract}</code> 
              was deployed in June 2025 with 1,990,000 ETHGR tokens already minted to your foundation wallet.
            </p>
            <div style={{
              background: "#dcfce7",
              border: "2px solid #22c55e",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h4 style={{ color: "#047857", fontWeight: "bold", marginBottom: "10px" }}>
                Why Use the Deployed Version:
              </h4>
              <ul style={{ color: "#059669", textAlign: "left", paddingLeft: "20px" }}>
                <li>Already deployed and operational on Ethereum mainnet</li>
                <li>Contains your actual 1,990,000 ETHGR tokens</li>
                <li>Matches the deployed bytecode exactly</li>
                <li>Foundation-specific migration functionality</li>
                <li>Compatible with Solidity 0.8.30 compiler</li>
              </ul>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <button
              onClick={() => window.open(`https://etherscan.io/verifyContract?a=${deployedContract}`, '_blank')}
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
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
              VERIFY DEPLOYED CONTRACT
            </button>

            <button
              onClick={() => window.location.href = '/dashboard'}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
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
              VERIFICATION CENTER
            </button>

            <button
              onClick={() => window.location.href = '/timeline'}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6366f1)",
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
              VIEW TIMELINE
            </button>

            <button
              onClick={() => window.location.href = '/transaction'}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
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
              TRANSACTION DATA
            </button>
          </div>
        </div>

        {/* Technical Details */}
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
            VERIFICATION SETTINGS
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              background: "#f1f5f9",
              border: "2px solid #94a3b8",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#475569", marginBottom: "10px", fontWeight: "bold" }}>
                Compiler Version
              </h4>
              <code style={{
                background: "#e2e8f0",
                color: "#334155",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                v0.8.30+commit.73712a01
              </code>
            </div>
            
            <div style={{
              background: "#f1f5f9",
              border: "2px solid #94a3b8",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#475569", marginBottom: "10px", fontWeight: "bold" }}>
                Optimization
              </h4>
              <div style={{ color: "#475569", fontWeight: "bold", fontSize: "16px" }}>
                No optimization
              </div>
            </div>
            
            <div style={{
              background: "#f1f5f9",
              border: "2px solid #94a3b8",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#475569", marginBottom: "10px", fontWeight: "bold" }}>
                Constructor Arguments
              </h4>
              <div style={{ color: "#475569", fontWeight: "bold", fontSize: "16px" }}>
                LEAVE EMPTY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}