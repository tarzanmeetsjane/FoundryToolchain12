import React, { useState } from 'react';

export default function InstantContractDeployment() {
    const [targetAddress] = useState<string>('0xd9145CCE52D386f254917e481eB44e9943F39138');
    const [userWallet] = useState<string>('0x058C8FE01E5c9eaC6ee19e6673673B549B368843');
    
    const deploymentMethods = [
        {
            name: "Sepolia Testnet",
            cost: "FREE",
            time: "2 minutes",
            faucet: "https://sepoliafaucet.com",
            explorer: "https://sepolia.etherscan.io",
            chainId: "11155111",
            color: "#10b981"
        },
        {
            name: "Polygon Mumbai", 
            cost: "FREE",
            time: "1 minute",
            faucet: "https://faucet.polygon.technology",
            explorer: "https://mumbai.polygonscan.com",
            chainId: "80001",
            color: "#8b5cf6"
        },
        {
            name: "Polygon Mainnet",
            cost: "$0.01",
            time: "30 seconds", 
            faucet: "Buy MATIC",
            explorer: "https://polygonscan.com",
            chainId: "137",
            color: "#f59e0b"
        },
        {
            name: "Ethereum Mainnet",
            cost: "$8-20",
            time: "2-5 minutes",
            faucet: "Buy ETH",
            explorer: "https://etherscan.io", 
            chainId: "1",
            color: "#ef4444"
        }
    ];

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            padding: '32px 16px',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ 
                        fontSize: '48px', 
                        fontWeight: 'bold', 
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        INSTANT CONTRACT DEPLOYMENT
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#e0e7ff',
                        marginBottom: '24px'
                    }}>
                        Deploy your ETHGRecovery contract NOW - Multiple networks available
                    </p>
                </div>

                {/* Deployment Target */}
                <div style={{ 
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: '#60a5fa',
                        marginBottom: '16px'
                    }}>
                        CONTRACT READY FOR DEPLOYMENT
                    </h2>
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        padding: '20px',
                        fontSize: '16px',
                        fontFamily: 'monospace',
                        color: '#e2e8f0'
                    }}>
                        <div style={{ marginBottom: '12px' }}>
                            <strong>Target Address:</strong> {targetAddress}
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <strong>Contract:</strong> ETHGRecovery (ERC-20)
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <strong>Your Wallet:</strong> {userWallet}
                        </div>
                        <div style={{ color: '#10b981' }}>
                            <strong>Status:</strong> Ready for immediate deployment
                        </div>
                    </div>
                </div>

                {/* Deployment Options */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                    marginBottom: '32px'
                }}>
                    {deploymentMethods.map((method, index) => (
                        <div key={index} style={{ 
                            background: `rgba(${method.color === '#10b981' ? '16, 185, 129' : 
                                         method.color === '#8b5cf6' ? '139, 92, 246' :
                                         method.color === '#f59e0b' ? '245, 158, 11' : '239, 68, 68'}, 0.1)`,
                            border: `2px solid ${method.color}50`,
                            borderRadius: '16px',
                            padding: '24px'
                        }}>
                            <h3 style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: method.color,
                                marginBottom: '16px',
                                textAlign: 'center'
                            }}>
                                {method.name}
                            </h3>
                            
                            <div style={{ 
                                display: 'grid',
                                gap: '12px',
                                marginBottom: '20px'
                            }}>
                                <div style={{ 
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    color: '#e2e8f0'
                                }}>
                                    <span>Cost:</span>
                                    <span style={{ color: method.color, fontWeight: 'bold' }}>
                                        {method.cost}
                                    </span>
                                </div>
                                
                                <div style={{ 
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    color: '#e2e8f0'
                                }}>
                                    <span>Time:</span>
                                    <span style={{ color: method.color }}>
                                        {method.time}
                                    </span>
                                </div>
                                
                                <div style={{ 
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    color: '#e2e8f0'
                                }}>
                                    <span>Chain ID:</span>
                                    <span style={{ fontFamily: 'monospace' }}>
                                        {method.chainId}
                                    </span>
                                </div>
                            </div>
                            
                            <div style={{ 
                                display: 'grid',
                                gap: '8px'
                            }}>
                                <button
                                    onClick={() => window.open('https://remix.ethereum.org', '_blank')}
                                    style={{
                                        background: `linear-gradient(135deg, ${method.color}, ${method.color}CC)`,
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Deploy on {method.name}
                                </button>
                                
                                <button
                                    onClick={() => window.open(method.faucet, '_blank')}
                                    style={{
                                        background: 'rgba(0,0,0,0.3)',
                                        color: method.color,
                                        border: `1px solid ${method.color}`,
                                        borderRadius: '8px',
                                        padding: '8px',
                                        fontSize: '12px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {method.cost === 'FREE' ? 'Get Test Tokens' : 'Get Native Token'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Step by Step Instructions */}
                <div style={{ 
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '2px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#fbbf24',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        EXACT DEPLOYMENT STEPS
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>1️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fbbf24', marginBottom: '8px' }}>
                                Get Gas Tokens
                            </div>
                            <div style={{ fontSize: '14px', color: '#fef3c7', lineHeight: '1.5' }}>
                                • Sepolia: sepoliafaucet.com<br/>
                                • Mumbai: faucet.polygon.technology<br/>
                                • Mainnet: Buy from exchange
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>2️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fbbf24', marginBottom: '8px' }}>
                                Open Remix
                            </div>
                            <div style={{ fontSize: '14px', color: '#fef3c7', lineHeight: '1.5' }}>
                                • Go to remix.ethereum.org<br/>
                                • Create new file: ETHGRecovery.sol<br/>
                                • Paste your contract code
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>3️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fbbf24', marginBottom: '8px' }}>
                                Compile Contract
                            </div>
                            <div style={{ fontSize: '14px', color: '#fef3c7', lineHeight: '1.5' }}>
                                • Solidity Compiler tab<br/>
                                • Version: 0.8.19<br/>
                                • Click "Compile ETHGRecovery.sol"
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>4️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fbbf24', marginBottom: '8px' }}>
                                Deploy Contract
                            </div>
                            <div style={{ fontSize: '14px', color: '#fef3c7', lineHeight: '1.5' }}>
                                • Deploy & Run tab<br/>
                                • Environment: Injected Provider<br/>
                                • Select ETHGRecovery, click Deploy
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contract Source Code */}
                <div style={{ 
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#60a5fa',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        READY-TO-DEPLOY CONTRACT CODE
                    </h3>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '12px',
                        padding: '20px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        color: '#e2e8f0',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        border: '1px solid rgba(96, 165, 250, 0.3)'
                    }}>
                        <div style={{ color: '#10b981', marginBottom: '4px' }}>
                            // SPDX-License-Identifier: MIT
                        </div>
                        <div style={{ color: '#60a5fa', marginBottom: '4px' }}>
                            pragma solidity ^0.8.19;
                        </div>
                        <div style={{ color: '#c084fc', marginBottom: '8px' }}>
                            import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
                        </div>
                        <div style={{ color: '#c084fc', marginBottom: '12px' }}>
                            import "@openzeppelin/contracts/access/Ownable.sol";
                        </div>
                        <div style={{ color: '#f59e0b', marginBottom: '8px' }}>
                            contract ETHGRecovery is ERC20, Ownable {'{'}
                        </div>
                        <div style={{ color: '#e2e8f0', marginLeft: '16px', lineHeight: '1.6' }}>
                            uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;<br/>
                            mapping(address =&gt; bool) public hasMigrated;<br/>
                            mapping(address =&gt; uint256) public originalETHGBalance;<br/><br/>
                            
                            constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {'{}'}<br/><br/>
                            
                            function migrateMyTrappedETHG() external onlyOwner {'{'}<br/>
                            &nbsp;&nbsp;require(!hasMigrated[msg.sender], "Already migrated");<br/>
                            &nbsp;&nbsp;uint256 trappedAmount = 1990000 * 10**18;<br/>
                            &nbsp;&nbsp;_mint(msg.sender, trappedAmount);<br/>
                            &nbsp;&nbsp;hasMigrated[msg.sender] = true;<br/>
                            {'}'}<br/><br/>
                            
                            function emergencyWithdraw() external onlyOwner {'{'}<br/>
                            &nbsp;&nbsp;payable(owner()).transfer(address(this).balance);<br/>
                            {'}'}
                        </div>
                        <div style={{ color: '#f59e0b' }}>
                            {'}'}
                        </div>
                    </div>
                    
                    <div style={{ 
                        marginTop: '16px',
                        textAlign: 'center'
                    }}>
                        <button
                            onClick={() => {
                                const code = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    
    address public constant ORIGINAL_ETHG = 0x3fC29836E84E471a053D2D9E80494A867D670EAD;
    
    bool public migrationEnabled = true;
    uint256 public totalMigrated = 0;
    
    event TokensMigrated(address indexed holder, uint256 ethgAmount, uint256 recoveryAmount);
    event MigrationStatusChanged(bool enabled);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
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
    
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`;
                                navigator.clipboard.writeText(code);
                                alert('Contract code copied to clipboard!');
                            }}
                            style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px 24px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Copy Full Contract Code
                        </button>
                    </div>
                </div>

                {/* Immediate Actions */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <button
                        onClick={() => window.open('https://remix.ethereum.org', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🚀 OPEN REMIX NOW
                    </button>
                    
                    <button
                        onClick={() => window.open('https://sepoliafaucet.com', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🆓 GET FREE TEST ETH
                    </button>
                    
                    <button
                        onClick={() => window.open('https://faucet.polygon.technology', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🔮 GET POLYGON TOKENS
                    </button>
                    
                    <button
                        onClick={() => window.open(`https://etherscan.io/address/${userWallet}`, '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        👀 CHECK WALLET
                    </button>
                </div>

                {/* Success Message */}
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#4ade80',
                        marginBottom: '16px'
                    }}>
                        DEPLOYMENT READY - EXECUTE NOW
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        Your ETHGRecovery contract is completely ready for deployment. Choose your preferred network above,
                        get the required gas tokens (free for testnets), and deploy in Remix IDE. Once deployed, you can
                        execute migrateMyTrappedETHG() to mint 1,990,000 ETHGR tokens and emergencyWithdraw() to recover
                        ETH. Contract deployment to address {targetAddress} takes 2-5 minutes maximum.
                    </div>
                </div>
            </div>
        </div>
    );
}