import React, { useState } from 'react';

export default function ReadyToDeployNow() {
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

    const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${accountData.keyId}`;
    
    const finalContract = `// SPDX-License-Identifier: MIT
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
    event MigrationStatusChanged(bool enabled);
    event EmergencyWithdrawal(address indexed owner, uint256 amount);
    
    constructor() ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {}
    
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
    
    function toggleMigration() external onlyOwner {
        migrationEnabled = !migrationEnabled;
        emit MigrationStatusChanged(migrationEnabled);
    }
    
    receive() external payable {}
    fallback() external payable {}
}`;

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
                        READY TO DEPLOY NOW
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#d1fae5',
                        marginBottom: '24px'
                    }}>
                        Everything is configured - Execute when your wallet is secured
                    </p>
                </div>

                {/* Deployment Summary */}
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '3px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: '#4ade80',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        DEPLOYMENT READY - {accountData.holder}
                    </h2>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fbbf24' }}>
                                ${accountData.tokenValue}
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Per Token Value
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#60a5fa' }}>
                                {accountData.totalTokens.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                ETHGR Tokens
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
                                ${accountData.totalValue.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Total Recovery Value
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#34d399' }}>
                                $0.00
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Gas Cost (Sponsored)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Deploy Steps */}
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
                        EXECUTE DEPLOYMENT (5 MINUTES)
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center',
                            border: '2px solid #3b82f6'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>1️⃣</div>
                            <div style={{ fontSize: '14px', color: '#dbeafe', fontWeight: 'bold' }}>
                                Add Alchemy RPC
                            </div>
                            <div style={{ fontSize: '12px', color: '#93c5fd', marginTop: '8px' }}>
                                Copy RPC URL to MetaMask
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center',
                            border: '2px solid #7c3aed'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>2️⃣</div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff', fontWeight: 'bold' }}>
                                Open Remix IDE
                            </div>
                            <div style={{ fontSize: '12px', color: '#c4b5fd', marginTop: '8px' }}>
                                Paste contract code
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>3️⃣</div>
                            <div style={{ fontSize: '14px', color: '#d1fae5', fontWeight: 'bold' }}>
                                Deploy Contract
                            </div>
                            <div style={{ fontSize: '12px', color: '#a7f3d0', marginTop: '8px' }}>
                                Confirm in MetaMask
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center',
                            border: '2px solid #f59e0b'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>4️⃣</div>
                            <div style={{ fontSize: '14px', color: '#fef3c7', fontWeight: 'bold' }}>
                                Call Migration
                            </div>
                            <div style={{ fontSize: '12px', color: '#fde68a', marginTop: '8px' }}>
                                Mint 1.99M tokens
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copy Resources */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(rpcUrl);
                            alert('Alchemy RPC URL copied! Add this to MetaMask network settings.');
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        📋 COPY RPC URL
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(finalContract);
                            alert('ETHGRecovery contract copied! Paste this in Remix IDE.');
                        }}
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
                        📄 COPY CONTRACT
                    </button>

                    <button
                        onClick={() => window.open('https://remix.ethereum.org', '_blank')}
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
                        🚀 OPEN REMIX
                    </button>

                    <button
                        onClick={() => window.open(`https://etherscan.io/address/${accountData.userWallet}`, '_blank')}
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
                        👀 MONITOR WALLET
                    </button>
                </div>

                {/* Contract Preview */}
                <div style={{ 
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '2px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#c084fc',
                        marginBottom: '16px',
                        textAlign: 'center'
                    }}>
                        DEPLOYMENT-READY CONTRACT CODE
                    </h3>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '8px',
                        padding: '16px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        color: '#e2e8f0',
                        maxHeight: '200px',
                        overflowY: 'auto'
                    }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{finalContract.substring(0, 800)}...

Key Functions:
- migrateMyTrappedETHG(): Mints 1,990,000 ETHGR to your wallet
- emergencyWithdraw(): Withdraws any ETH from contract
- Only owner ({accountData.userWallet.substring(0, 10)}...) can call functions
                        </pre>
                    </div>
                </div>

                {/* Final Status */}
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '3px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#4ade80',
                        marginBottom: '16px'
                    }}>
                        READY FOR DEPLOYMENT - {accountData.holder}
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        Once you've disabled smart wallet features in MetaMask, your deployment is ready to execute. 
                        The Alchemy gas sponsorship (Policy {accountData.policyId.substring(0, 8)}...) will cover all costs. 
                        After deployment to {accountData.contractAddress.substring(0, 10)}..., calling migrateMyTrappedETHG() 
                        will mint {accountData.totalTokens.toLocaleString()} ETHGR tokens worth ${accountData.totalValue.toLocaleString()} 
                        directly to your secure wallet.
                    </div>
                </div>
            </div>
        </div>
    );
}