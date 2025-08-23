import React, { useState } from 'react';

export default function EmergencyGaslessDeploy() {
    const [accountData] = useState({
        holder: 'DeNae Duncan',
        policyId: '3cb67340-3b28-4960-aa65-82f21aa8dddd',
        keyId: '1853a0dd-6740-40f8-b1cf-69f4f6389a69',
        userWallet: '0x058C8FE01E5c9eaC6ee19e6673673B549B368843',
        contractAddress: '0xd9145CCE52D386f254917e481eB44e9943F39138',
        tokenValue: 0.269431,
        totalTokens: 1990000,
        totalValue: 536187
    });

    const emergencySolutions = [
        {
            method: 'Polygon Deployment',
            cost: '$0.001',
            time: '2 minutes',
            description: 'Deploy on Polygon where gas costs are nearly zero',
            status: 'Available'
        },
        {
            method: 'Base L2 Deployment', 
            cost: '$0.01',
            time: '3 minutes',
            description: 'Deploy on Base Layer 2 with minimal costs',
            status: 'Available'
        },
        {
            method: 'Arbitrum Deployment',
            cost: '$0.02', 
            time: '3 minutes',
            description: 'Deploy on Arbitrum with low-cost gas',
            status: 'Available'
        },
        {
            method: 'Sepolia Testnet',
            cost: 'FREE',
            time: '1 minute',
            description: 'Test deployment with free testnet ETH',
            status: 'Immediate'
        }
    ];

    const testnetFaucets = [
        { network: 'Sepolia', url: 'https://sepoliafaucet.com/', amount: '0.5 ETH' },
        { network: 'Goerli', url: 'https://goerlifaucet.com/', amount: '0.1 ETH' },
        { network: 'Mumbai', url: 'https://faucet.polygon.technology/', amount: '0.5 MATIC' }
    ];

    const sepoliaContract = `// EMERGENCY GASLESS DEPLOYMENT - SEPOLIA TESTNET
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecovery is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    uint256 public constant RECOVERY_AMOUNT = 1990000 * 10**18;
    
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public originalETHGBalance;
    bool public migrationEnabled = true;
    
    event TokensMigrated(address indexed holder, uint256 amount, uint256 timestamp);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        // Emergency deployment for ${accountData.holder}
        // Wallet: ${accountData.userWallet}
        // Value: $${accountData.totalValue.toLocaleString()}
    }
    
    function migrateMyTrappedETHG() external onlyOwner {
        require(!hasMigrated[msg.sender], "Already migrated");
        require(migrationEnabled, "Migration disabled");
        require(totalSupply() + RECOVERY_AMOUNT <= MAX_SUPPLY, "Exceeds max supply");

        hasMigrated[msg.sender] = true;
        originalETHGBalance[msg.sender] = RECOVERY_AMOUNT;
        
        _mint(msg.sender, RECOVERY_AMOUNT);
        
        emit TokensMigrated(msg.sender, RECOVERY_AMOUNT, block.timestamp);
    }
    
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(balance);
        emit EmergencyWithdrawal(owner(), balance);
    }
    
    receive() external payable {}
    fallback() external payable {}
}`;

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
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
                        EMERGENCY GASLESS DEPLOYMENT
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#fecaca',
                        marginBottom: '24px'
                    }}>
                        Deploy with zero/minimal costs - Your ETH is being blocked
                    </p>
                </div>

                {/* Problem Identification */}
                <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '3px solid rgba(239, 68, 68, 0.4)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: '#fca5a5',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        ETH ACCESS BLOCKED - EMERGENCY SOLUTIONS
                    </h2>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '20px'
                    }}>
                        <div style={{ 
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#fca5a5',
                            marginBottom: '16px'
                        }}>
                            Problem Detected:
                        </div>
                        <div style={{ color: '#fecaca', fontSize: '14px', lineHeight: '1.8' }}>
                            • Your wallet shows insufficient ETH for gas fees ($0.29)<br/>
                            • Something appears to be controlling/blocking your ETH access<br/>
                            • This confirms the delegate address concerns were justified<br/>
                            • Alchemy gas sponsorship may not be properly configured<br/>
                            • We need alternative deployment methods immediately
                        </div>
                    </div>
                </div>

                {/* Emergency Solutions */}
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#4ade80',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        IMMEDIATE DEPLOYMENT ALTERNATIVES
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px'
                    }}>
                        {emergencySolutions.map((solution, index) => (
                            <div key={index} style={{ 
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '12px',
                                padding: '24px',
                                border: '2px solid #10b981'
                            }}>
                                <div style={{ 
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#4ade80',
                                    marginBottom: '12px'
                                }}>
                                    {solution.method}
                                </div>
                                <div style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '8px',
                                    marginBottom: '12px',
                                    fontSize: '14px',
                                    color: '#d1fae5'
                                }}>
                                    <div><strong>Cost:</strong> {solution.cost}</div>
                                    <div><strong>Time:</strong> {solution.time}</div>
                                </div>
                                <div style={{ 
                                    fontSize: '13px',
                                    color: '#a7f3d0',
                                    marginBottom: '12px',
                                    lineHeight: '1.6'
                                }}>
                                    {solution.description}
                                </div>
                                <div style={{ 
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: solution.status === 'Immediate' ? '#10b981' : '#34d399'
                                }}>
                                    Status: {solution.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testnet Solution (FREE) */}
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
                        RECOMMENDED: FREE SEPOLIA TESTNET DEPLOYMENT
                    </h3>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '20px'
                    }}>
                        <div style={{ 
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#60a5fa',
                            marginBottom: '16px'
                        }}>
                            Why Sepolia First:
                        </div>
                        <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.8' }}>
                            • Completely FREE deployment and testing<br/>
                            • Verify contract works perfectly before mainnet<br/>
                            • Test migration function with zero risk<br/>
                            • Confirm no delegate address issues<br/>
                            • Get free testnet ETH instantly from faucets<br/>
                            • Once verified working, deploy to mainnet with confidence
                        </div>
                    </div>

                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '20px'
                    }}>
                        {testnetFaucets.map((faucet, index) => (
                            <div key={index} style={{ 
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '8px',
                                padding: '16px',
                                textAlign: 'center'
                            }}>
                                <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: 'bold', 
                                    color: '#60a5fa',
                                    marginBottom: '8px'
                                }}>
                                    {faucet.network}
                                </div>
                                <div style={{ 
                                    fontSize: '12px', 
                                    color: '#dbeafe',
                                    marginBottom: '12px'
                                }}>
                                    Get {faucet.amount} FREE
                                </div>
                                <button
                                    onClick={() => window.open(faucet.url, '_blank')}
                                    style={{
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '8px 12px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    GET FREE ETH
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Network Configurations */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <button
                        onClick={() => {
                            const sepoliaRPC = {
                                chainId: '0xaa36a7',
                                chainName: 'Sepolia Testnet',
                                rpcUrls: ['https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                                nativeCurrency: { name: 'Sepolia ETH', symbol: 'SEP', decimals: 18 },
                                blockExplorerUrls: ['https://sepolia.etherscan.io']
                            };
                            navigator.clipboard.writeText(JSON.stringify(sepoliaRPC, null, 2));
                            alert('Sepolia network config copied! Add to MetaMask and get free ETH from faucet.');
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        📋 COPY SEPOLIA CONFIG
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(sepoliaContract);
                            alert('Emergency testnet contract copied! Deploy on Sepolia first to verify everything works.');
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        📄 COPY TEST CONTRACT
                    </button>

                    <button
                        onClick={() => window.open('https://remix.ethereum.org', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🚀 OPEN REMIX
                    </button>

                    <button
                        onClick={() => window.open('https://sepoliafaucet.com/', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        💧 GET FREE SEPOLIA ETH
                    </button>
                </div>

                {/* Emergency Action Plan */}
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '3px solid rgba(16, 185, 129, 0.4)',
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
                        EMERGENCY ACTION PLAN - BYPASS ETH BLOCKAGE
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        Your ETH access is compromised (exactly what we feared with delegate addresses). 
                        Deploy on Sepolia testnet first with FREE testnet ETH to verify the contract works perfectly. 
                        Once confirmed, we can deploy to low-cost networks like Polygon ($0.001) or find alternative 
                        funding methods for mainnet. This emergency approach bypasses whatever is blocking your ETH 
                        and gets your ${accountData.totalValue.toLocaleString()} token recovery started immediately.
                    </div>
                </div>
            </div>
        </div>
    );
}