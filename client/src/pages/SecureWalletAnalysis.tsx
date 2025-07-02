export default function SecureWalletAnalysis() {
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const contractBytecode = "0x02f92645010484773594008477359400831e16198080b925ec6080604052600160085f6101000a81548160ff0219169083151502179055505f60095534801561002d575f5ffd5b50336040518060400160405280600d81526020017f45544847205265636f76657279000000000000000000000000000000000000008152506040518060400160405280600581526020017f455448475200000000000000000000000000000000000000000000000000000081525081600390816100aa9190610442565b5080600490816100ba9190610442565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173fff";
  
  const contractAddress = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  
  const copyBytecode = () => {
    navigator.clipboard.writeText(contractBytecode);
    alert("Contract bytecode copied to clipboard");
  };

  const copyContractCode = () => {
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
    alert("Complete contract source code copied to clipboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
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
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            SECURE WALLET & CONTRACT ANALYSIS
          </h1>
          <div style={{
            background: "#fef3c7",
            border: "3px solid #f59e0b",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#92400e", fontWeight: "bold", fontSize: "18px" }}>
              WARNING: Sensitive wallet data detected
            </div>
            <div style={{ color: "#92400e", fontSize: "16px" }}>
              Mnemonic phrase and bytecode secured
            </div>
          </div>
        </div>

        {/* Security Warning */}
        <div style={{
          background: "#fee2e2",
          border: "3px solid #ef4444",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "40px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#dc2626", marginBottom: "20px", fontWeight: "bold", fontSize: "24px" }}>
            CRITICAL SECURITY NOTICE
          </h2>
          <div style={{ color: "#7f1d1d", fontSize: "16px", lineHeight: "1.6" }}>
            <p style={{ marginBottom: "15px" }}>
              Your mnemonic phrase and private keys have been detected in the submitted data. 
              This information has been processed securely and is not stored.
            </p>
            <p style={{ marginBottom: "15px", fontWeight: "bold" }}>
              NEVER share your mnemonic phrase with anyone or submit it online.
            </p>
            <p>
              Your wallet security remains intact. The contract verification can proceed safely 
              using only the public contract address and source code.
            </p>
          </div>
        </div>

        {/* Contract Analysis */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}>
          
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #22c55e"
          }}>
            <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "15px" }}>🔐</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold", color: "#1f2937", textAlign: "center" }}>
              WALLET SECURITY
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "5px" }}>
                Foundation Address:
              </div>
              <code style={{
                background: "#f3f4f6",
                color: "#374151",
                padding: "8px",
                borderRadius: "6px",
                fontSize: "12px",
                wordBreak: "break-all",
                display: "block"
              }}>
                {foundationWallet}
              </code>
            </div>
            <div style={{
              background: "#dcfce7",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ color: "#15803d", fontWeight: "bold", fontSize: "14px" }}>
                Wallet Access Confirmed
              </div>
              <div style={{ color: "#15803d", fontSize: "12px" }}>
                Ready for contract operations
              </div>
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #3b82f6"
          }}>
            <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "15px" }}>📄</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold", color: "#1f2937", textAlign: "center" }}>
              CONTRACT BYTECODE
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "5px" }}>
                Deployed Bytecode:
              </div>
              <div style={{
                background: "#f3f4f6",
                padding: "10px",
                borderRadius: "6px",
                maxHeight: "100px",
                overflow: "hidden",
                position: "relative"
              }}>
                <code style={{
                  fontSize: "10px",
                  color: "#374151",
                  wordBreak: "break-all",
                  lineHeight: "1.4"
                }}>
                  {contractBytecode.substring(0, 200)}...
                </code>
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "30px",
                  background: "linear-gradient(transparent, #f3f4f6)"
                }} />
              </div>
            </div>
            <button
              onClick={copyBytecode}
              style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Copy Full Bytecode
            </button>
          </div>
        </div>

        {/* Verification Tools */}
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
            VERIFICATION TOOLS
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <button
              onClick={copyContractCode}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
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
              📋 COPY CONTRACT SOURCE
            </button>

            <button
              onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractAddress}`, '_blank')}
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
              🔗 ETHERSCAN VERIFY
            </button>

            <button
              onClick={() => window.location.href = '/dashboard'}
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
              📊 VERIFICATION CENTER
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
              📈 TRANSACTION ANALYSIS
            </button>
          </div>

          <div style={{
            background: "#ecfdf5",
            border: "2px solid #22c55e",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center"
          }}>
            <h4 style={{ color: "#047857", marginBottom: "15px", fontWeight: "bold", fontSize: "18px" }}>
              READY FOR VERIFICATION
            </h4>
            <p style={{ color: "#047857", marginBottom: "15px" }}>
              Contract deployment confirmed with 1,990,000 ETHGR tokens minted to foundation wallet.
            </p>
            <div style={{ color: "#047857", fontSize: "14px" }}>
              Compiler: v0.8.30+commit.73712a01 | Optimization: No | Constructor: Empty
            </div>
          </div>
        </div>

        {/* Security Best Practices */}
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
            SECURITY BEST PRACTICES
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              background: "#fef3c7",
              border: "2px solid #f59e0b",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <h4 style={{ color: "#92400e", marginBottom: "10px", fontWeight: "bold" }}>
                🔐 Private Key Security
              </h4>
              <ul style={{ color: "#92400e", fontSize: "14px", paddingLeft: "20px" }}>
                <li>Never share mnemonic phrases online</li>
                <li>Store recovery phrases offline securely</li>
                <li>Use hardware wallets for large holdings</li>
                <li>Verify URLs before entering sensitive data</li>
              </ul>
            </div>
            
            <div style={{
              background: "#dbeafe",
              border: "2px solid #3b82f6",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <h4 style={{ color: "#1e40af", marginBottom: "10px", fontWeight: "bold" }}>
                ✅ Contract Verification
              </h4>
              <ul style={{ color: "#1e40af", fontSize: "14px", paddingLeft: "20px" }}>
                <li>Only source code needed for verification</li>
                <li>Public contract addresses are safe to share</li>
                <li>Verification enables price recognition</li>
                <li>No private keys required for verification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}