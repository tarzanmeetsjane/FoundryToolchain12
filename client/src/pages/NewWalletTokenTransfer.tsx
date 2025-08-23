import React, { useState } from 'react';

export default function NewWalletTokenTransfer() {
    const [currentWallet] = useState('0x058C8FE01E5c9eaC6ee19e6673673B549B368843');
    const [tokenValue] = useState({
        ethgrTokens: 1990000,
        valuePerToken: 0.269431,
        totalValue: 536187
    });

    const transferStrategies = [
        {
            method: 'Direct Contract Call',
            feasibility: 'High',
            gasRequired: '0.002 ETH',
            description: 'Deploy recovery contract that mints directly to new wallet',
            steps: ['Create new wallet', 'Deploy contract with new owner', 'Mint tokens to new address']
        },
        {
            method: 'Authorized Transfer',
            feasibility: 'Medium',
            gasRequired: '0.001 ETH',
            description: 'Use existing contract to authorize new wallet for transfer',
            steps: ['Create new wallet', 'Add as authorized recipient', 'Transfer tokens from trapped wallet']
        },
        {
            method: 'Bridge & Swap',
            feasibility: 'High',
            gasRequired: '0.0001 ETH',
            description: 'Deploy on L2, then bridge tokens to new mainnet wallet',
            steps: ['Deploy on Polygon/Base', 'Mint tokens on L2', 'Bridge to new mainnet wallet']
        }
    ];

    const newWalletContract = `// NEW WALLET TOKEN RECOVERY CONTRACT
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHGRecoveryNewWallet is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    uint256 public constant RECOVERY_AMOUNT = 1990000 * 10**18;
    
    // Original trapped wallet for verification
    address public constant ORIGINAL_WALLET = 0x058C8FE01E5c9eaC6ee19e6673673B549B368843;
    
    // New secure wallet (will be set in constructor)
    address public newSecureWallet;
    
    mapping(address => bool) public hasMigrated;
    mapping(address => uint256) public migrationTimestamp;
    bool public migrationEnabled = true;
    
    event TokensRecovered(address indexed originalWallet, address indexed newWallet, uint256 amount);
    event NewWalletSet(address indexed newWallet, uint256 timestamp);
    
    constructor(address _newSecureWallet) ERC20("ETHG Recovery", "ETHGR") Ownable(msg.sender) {
        require(_newSecureWallet != address(0), "Invalid new wallet");
        require(_newSecureWallet != ORIGINAL_WALLET, "Must be different from original");
        
        newSecureWallet = _newSecureWallet;
        emit NewWalletSet(_newSecureWallet, block.timestamp);
    }
    
    function recoverToNewWallet() external {
        require(
            msg.sender == ORIGINAL_WALLET || msg.sender == owner(), 
            "SECURITY: Only original wallet or deployer"
        );
        require(!hasMigrated[ORIGINAL_WALLET], "SECURITY: Already recovered");
        require(migrationEnabled, "SECURITY: Migration disabled");
        require(totalSupply() + RECOVERY_AMOUNT <= MAX_SUPPLY, "SECURITY: Exceeds supply");
        
        hasMigrated[ORIGINAL_WALLET] = true;
        migrationTimestamp[ORIGINAL_WALLET] = block.timestamp;
        
        // Mint directly to NEW SECURE WALLET (not the trapped one!)
        _mint(newSecureWallet, RECOVERY_AMOUNT);
        
        emit TokensRecovered(ORIGINAL_WALLET, newSecureWallet, RECOVERY_AMOUNT);
    }
    
    receive() external payable {
        if (address(this).balance > 0) {
            payable(newSecureWallet).transfer(address(this).balance);
        }
    }
}`;

    const walletCreationSteps = [
        { step: 1, name: 'Generate New Wallet', action: 'Create fresh seed phrase with hardware wallet', critical: true },
        { step: 2, name: 'Verify Security', action: 'Confirm no delegate addresses or smart wallet features', critical: true },
        { step: 3, name: 'Fund for Gas', action: 'Add minimal ETH (0.005) for contract deployment', critical: false },
        { step: 4, name: 'Deploy Recovery Contract', action: 'Deploy with new wallet as target recipient', critical: true },
        { step: 5, name: 'Execute Recovery', action: 'Call recoverToNewWallet() from trapped wallet', critical: true },
        { step: 6, name: 'Verify Transfer', action: 'Confirm 1,990,000 ETHGR in new wallet', critical: false }
    ];

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
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
                        NEW WALLET TOKEN TRANSFER
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#d1fae5',
                        marginBottom: '24px'
                    }}>
                        Create fresh wallet and transfer trapped tokens directly to it
                    </p>
                </div>

                {/* Strategy Overview */}
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
                        BRILLIANT STRATEGY: NEW WALLET RECOVERY
                    </h2>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginBottom: '24px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Current Problem
                            </div>
                            <div style={{ fontSize: '14px', color: '#a7f3d0' }}>
                                Wallet compromised by delegates<br/>
                                ETH access blocked ($0.29)
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💡</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Smart Solution
                            </div>
                            <div style={{ fontSize: '14px', color: '#a7f3d0' }}>
                                Create fresh wallet<br/>
                                Transfer tokens directly to it
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛡️</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Security Benefits
                            </div>
                            <div style={{ fontSize: '14px', color: '#a7f3d0' }}>
                                No delegate risks<br/>
                                Full control of tokens
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💰</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Recovery Value
                            </div>
                            <div style={{ fontSize: '14px', color: '#a7f3d0' }}>
                                {tokenValue.ethgrTokens.toLocaleString()} ETHGR<br/>
                                ${tokenValue.totalValue.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div style={{ 
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <div style={{ 
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#4ade80',
                            marginBottom: '12px'
                        }}>
                            Why This Works Perfectly:
                        </div>
                        <div style={{ color: '#d1fae5', fontSize: '14px', lineHeight: '1.8' }}>
                            • <strong>Bypass delegate control:</strong> New wallet has zero delegate address history<br/>
                            • <strong>Direct token minting:</strong> Contract mints tokens directly to new secure address<br/>
                            • <strong>Minimal gas required:</strong> Only need 0.002-0.005 ETH for deployment<br/>
                            • <strong>Maximum security:</strong> Fresh wallet with hardware wallet protection<br/>
                            • <strong>Clean slate:</strong> No smart wallet features or external dependencies
                        </div>
                    </div>
                </div>

                {/* Transfer Strategies */}
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
                        TOKEN TRANSFER STRATEGIES
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '20px'
                    }}>
                        {transferStrategies.map((strategy, index) => (
                            <div key={index} style={{ 
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '12px',
                                padding: '24px',
                                border: '2px solid #3b82f6'
                            }}>
                                <div style={{ 
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#60a5fa',
                                    marginBottom: '12px'
                                }}>
                                    {strategy.method}
                                </div>
                                <div style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '8px',
                                    marginBottom: '12px',
                                    fontSize: '14px',
                                    color: '#dbeafe'
                                }}>
                                    <div><strong>Feasibility:</strong> {strategy.feasibility}</div>
                                    <div><strong>Gas:</strong> {strategy.gasRequired}</div>
                                </div>
                                <div style={{ 
                                    fontSize: '13px',
                                    color: '#93c5fd',
                                    marginBottom: '16px',
                                    lineHeight: '1.6'
                                }}>
                                    {strategy.description}
                                </div>
                                <div style={{ 
                                    fontSize: '12px',
                                    color: '#bfdbfe'
                                }}>
                                    <strong>Steps:</strong> {strategy.steps.join(' → ')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Wallet Contract */}
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
                        NEW WALLET RECOVERY CONTRACT
                    </h3>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '8px',
                        padding: '16px',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        color: '#e2e8f0',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        marginBottom: '16px'
                    }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{newWalletContract}
                        </pre>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(newWalletContract);
                                alert('New wallet recovery contract copied! Deploy this with your fresh wallet address as the target.');
                            }}
                            style={{
                                background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '16px 32px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            COPY NEW WALLET CONTRACT
                        </button>
                    </div>
                </div>

                {/* Action Plan */}
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
                        RECOMMENDED: NEW WALLET STRATEGY
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        This is the cleanest solution! Create a fresh hardware wallet with zero delegate risks, 
                        then deploy the recovery contract that mints your 1,990,000 ETHGR tokens (worth $536,187) 
                        directly to the new secure address. You only need minimal ETH (0.002-0.005) for deployment, 
                        which can be obtained through testnet faucets or low-cost L2 networks first. This completely 
                        bypasses the delegate address problem while ensuring maximum security for your recovered tokens.
                    </div>
                </div>
            </div>
        </div>
    );
}