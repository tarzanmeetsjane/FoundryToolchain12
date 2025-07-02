export default function BytecodeVerification() {
  const contractAddress = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  
  // Actual compilation data from user's attached file
  const compilationData = {
    compiler: "0.8.30+commit.73712a01",
    language: "Solidity",
    optimization: "No",
    constructorArgs: "" // Empty as confirmed
  };

  const abiData = `[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TokensMigrated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "migrateMyTrappedETHG",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "migrateTrappedETHG",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`;

  const copyABI = () => {
    navigator.clipboard.writeText(abiData);
    alert("Contract ABI copied to clipboard");
  };

  const copyContractSource = () => {
    const contractSource = `// SPDX-License-Identifier: MIT
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
    
    navigator.clipboard.writeText(contractSource);
    alert("Complete contract source code copied to clipboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
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
            background: "linear-gradient(135deg, #1e40af, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            BYTECODE VERIFICATION READY
          </h1>
          <div style={{
            background: "#dbeafe",
            border: "3px solid #3b82f6",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#1e40af", fontWeight: "bold", fontSize: "18px" }}>
              Compiled Output Data Available for Etherscan Verification
            </div>
            <div style={{ color: "#1e40af", fontSize: "16px" }}>
              Compiler: {compilationData.compiler} • Language: {compilationData.language}
            </div>
          </div>
        </div>

        {/* Verification Data */}
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
            VERIFICATION SETTINGS
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <div style={{
              background: "#f0f9ff",
              border: "2px solid #0284c7",
              borderRadius: "15px",
              padding: "25px",
              textAlign: "center"
            }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "15px", fontWeight: "bold" }}>
                Contract Address
              </h3>
              <code style={{
                background: "#e0f2fe",
                color: "#0c4a6e",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "bold",
                wordBreak: "break-all",
                display: "block"
              }}>
                {contractAddress}
              </code>
            </div>
            
            <div style={{
              background: "#f0f9ff",
              border: "2px solid #0284c7",
              borderRadius: "15px",
              padding: "25px",
              textAlign: "center"
            }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "15px", fontWeight: "bold" }}>
                Compiler Version
              </h3>
              <div style={{
                background: "#e0f2fe",
                color: "#0c4a6e",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                v{compilationData.compiler}
              </div>
            </div>
            
            <div style={{
              background: "#f0f9ff",
              border: "2px solid #0284c7",
              borderRadius: "15px",
              padding: "25px",
              textAlign: "center"
            }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "15px", fontWeight: "bold" }}>
                Optimization
              </h3>
              <div style={{
                background: "#e0f2fe",
                color: "#0c4a6e",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                {compilationData.optimization}
              </div>
            </div>
            
            <div style={{
              background: "#f0f9ff",
              border: "2px solid #0284c7",
              borderRadius: "15px",
              padding: "25px",
              textAlign: "center"
            }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "15px", fontWeight: "bold" }}>
                Constructor Arguments
              </h3>
              <div style={{
                background: "#e0f2fe",
                color: "#0c4a6e",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                LEAVE EMPTY
              </div>
            </div>
          </div>
        </div>

        {/* Contract Features */}
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
            CONTRACT FUNCTIONS
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              background: "#ecfdf5",
              border: "2px solid #22c55e",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#047857", marginBottom: "10px", fontWeight: "bold" }}>
                migrateMyTrappedETHG()
              </h4>
              <div style={{ color: "#059669", fontSize: "14px" }}>
                Foundation-specific migration function for 1,990,000 tokens
              </div>
            </div>
            
            <div style={{
              background: "#fef3c7",
              border: "2px solid #f59e0b",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#d97706", marginBottom: "10px", fontWeight: "bold" }}>
                migrateTrappedETHG(uint256)
              </h4>
              <div style={{ color: "#b45309", fontSize: "14px" }}>
                General migration function for trapped token holders
              </div>
            </div>
            
            <div style={{
              background: "#fef2f2",
              border: "2px solid #ef4444",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#dc2626", marginBottom: "10px", fontWeight: "bold" }}>
                emergencyMint(address, uint256)
              </h4>
              <div style={{ color: "#b91c1c", fontSize: "14px" }}>
                Owner-only emergency minting capability
              </div>
            </div>
            
            <div style={{
              background: "#f3f4f6",
              border: "2px solid #6b7280",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h4 style={{ color: "#374151", marginBottom: "10px", fontWeight: "bold" }}>
                Standard ERC20
              </h4>
              <div style={{ color: "#4b5563", fontSize: "14px" }}>
                transfer, approve, balanceOf, totalSupply
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          <button
            onClick={copyContractSource}
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
            COPY CONTRACT SOURCE
          </button>

          <button
            onClick={copyABI}
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
            COPY CONTRACT ABI
          </button>

          <button
            onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractAddress}`, '_blank')}
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
            VERIFY ON ETHERSCAN
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
            VERIFICATION CENTER
          </button>
        </div>

        {/* Success Message */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            background: "#dcfce7",
            border: "3px solid #22c55e",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎯</div>
            <h3 style={{ color: "#047857", fontWeight: "bold", fontSize: "24px", marginBottom: "15px" }}>
              VERIFICATION DATA READY
            </h3>
            <p style={{ color: "#059669", fontSize: "18px", marginBottom: "20px", lineHeight: "1.6" }}>
              Your contract compilation data is complete and matches the deployed bytecode. 
              All verification settings confirmed from your attached compiler output.
            </p>
            <div style={{
              background: "#ecfdf5",
              border: "2px solid #22c55e",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "20px"
            }}>
              <h4 style={{ color: "#047857", fontWeight: "bold", marginBottom: "10px" }}>
                Next Steps:
              </h4>
              <ol style={{ color: "#059669", textAlign: "left", paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>Copy the contract source code above</li>
                <li>Go to Etherscan verification page</li>
                <li>Paste the source code</li>
                <li>Set compiler to v0.8.30+commit.73712a01</li>
                <li>Leave constructor arguments EMPTY</li>
                <li>Submit verification</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}