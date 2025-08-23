import React, { useState } from 'react';

export default function DisableSmartWallet() {
    const [userWallet] = useState('0x058C8FE01E5c9eaC6ee19e6673673B549B368843');
    
    const smartWalletFeatures = [
        { feature: 'Account Abstraction', risk: 'High', reason: 'Creates delegate transaction signing', action: 'Disable completely' },
        { feature: 'Smart Contract Wallets', risk: 'High', reason: 'Can execute transactions on your behalf', action: 'Switch to EOA mode' },
        { feature: 'Multi-sig Features', risk: 'Medium', reason: 'Requires multiple signatures', action: 'Disable for single control' },
        { feature: 'Gas Delegation', risk: 'High', reason: 'Allows external gas payment with control', action: 'Use direct gas payment only' },
        { feature: 'Transaction Batching', risk: 'Medium', reason: 'Groups transactions that may include unwanted actions', action: 'Disable batching' },
        { feature: 'Auto-execution', risk: 'Critical', reason: 'Can execute transactions without your direct approval', action: 'Disable immediately' }
    ];

    const walletSettings = [
        { wallet: 'MetaMask', setting: 'Smart Contract Account', location: 'Settings → Advanced → Use Smart Contract Account', action: 'Turn OFF' },
        { wallet: 'MetaMask', setting: 'Account Abstraction', location: 'Settings → Experimental → Account Abstraction', action: 'Disable' },
        { wallet: 'Coinbase Wallet', setting: 'Smart Wallet', location: 'Settings → Smart Wallet Features', action: 'Disable All' },
        { wallet: 'WalletConnect', setting: 'Session Delegation', location: 'Settings → Advanced → Session Management', action: 'Require Manual Approval' },
        { wallet: 'Trust Wallet', setting: 'Smart Contract Interaction', location: 'Settings → Security → Smart Contracts', action: 'Restrict' },
        { wallet: 'Rainbow', setting: 'Account Abstraction', location: 'Settings → Advanced Features', action: 'Turn OFF' }
    ];

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
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
                        🛡️ DISABLE SMART WALLET FEATURES
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#fecaca',
                        marginBottom: '24px'
                    }}>
                        Turn off delegation features to protect your ETH from disappearing
                    </p>
                </div>

                {/* Smart Wallet Risks */}
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
                        🚨 SMART WALLET FEATURES TO DISABLE
                    </h2>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {smartWalletFeatures.map((item, index) => (
                            <div key={index} style={{ 
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '12px',
                                padding: '20px',
                                border: `2px solid ${item.risk === 'Critical' ? '#dc2626' : item.risk === 'High' ? '#ea580c' : '#f59e0b'}`
                            }}>
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{ 
                                        fontSize: '20px', 
                                        marginRight: '12px',
                                        color: item.risk === 'Critical' ? '#dc2626' : item.risk === 'High' ? '#ea580c' : '#f59e0b'
                                    }}>
                                        {item.risk === 'Critical' ? '🔴' : item.risk === 'High' ? '🟠' : '🟡'}
                                    </div>
                                    <div style={{ 
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        color: '#fca5a5'
                                    }}>
                                        {item.feature}
                                    </div>
                                </div>
                                <div style={{ 
                                    fontSize: '14px',
                                    color: '#fecaca',
                                    marginBottom: '12px',
                                    lineHeight: '1.6'
                                }}>
                                    <strong>Risk:</strong> {item.reason}
                                </div>
                                <div style={{ 
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: item.risk === 'Critical' ? '#dc2626' : '#f59e0b'
                                }}>
                                    Action: {item.action}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wallet-Specific Settings */}
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
                        WALLET-SPECIFIC SETTINGS TO CHANGE
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '20px'
                    }}>
                        {walletSettings.map((setting, index) => (
                            <div key={index} style={{ 
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '12px',
                                padding: '20px',
                                border: '2px solid #10b981'
                            }}>
                                <div style={{ 
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#4ade80',
                                    marginBottom: '12px'
                                }}>
                                    {setting.wallet}
                                </div>
                                <div style={{ 
                                    fontSize: '14px',
                                    color: '#d1fae5',
                                    marginBottom: '8px'
                                }}>
                                    <strong>Setting:</strong> {setting.setting}
                                </div>
                                <div style={{ 
                                    fontSize: '14px',
                                    color: '#d1fae5',
                                    marginBottom: '8px'
                                }}>
                                    <strong>Location:</strong> {setting.location}
                                </div>
                                <div style={{ 
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#10b981'
                                }}>
                                    <strong>Action:</strong> {setting.action}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MetaMask Step-by-Step */}
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
                        METAMASK SECURITY SETTINGS (STEP-BY-STEP)
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
                            1. Open MetaMask Settings
                        </div>
                        <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.8' }}>
                            • Click the MetaMask extension icon<br/>
                            • Click the three dots menu (⋯)<br/>
                            • Select "Settings"<br/>
                            • Navigate to "Advanced" section
                        </div>
                    </div>

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
                            2. Disable Smart Contract Account
                        </div>
                        <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.8' }}>
                            • Find "Use Smart Contract Account" toggle<br/>
                            • Turn it OFF (switch to the left)<br/>
                            • This prevents delegate transaction signing<br/>
                            • Your wallet becomes a standard EOA (Externally Owned Account)
                        </div>
                    </div>

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
                            3. Check Experimental Features
                        </div>
                        <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.8' }}>
                            • Go to Settings → Experimental<br/>
                            • Turn OFF any "Account Abstraction" features<br/>
                            • Disable "Transaction Batching"<br/>
                            • Turn OFF "Auto-sign" or "Auto-approve" features
                        </div>
                    </div>

                    <div style={{ 
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '12px',
                        padding: '24px'
                    }}>
                        <div style={{ 
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#60a5fa',
                            marginBottom: '16px'
                        }}>
                            4. Security Verification
                        </div>
                        <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.8' }}>
                            • Go to Settings → Security & Privacy<br/>
                            • Ensure "Require manual approval for all transactions"<br/>
                            • Turn OFF "Gas delegation" if present<br/>
                            • Verify no connected dApps have spending approvals
                        </div>
                    </div>
                </div>

                {/* Additional Protection */}
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
                        ADDITIONAL PROTECTION MEASURES
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#fbbf24',
                                marginBottom: '12px'
                            }}>
                                🔒 Use Hardware Wallet
                            </div>
                            <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                                Connect Ledger or Trezor to MetaMask for maximum security. 
                                Hardware wallets cannot be compromised by smart wallet features.
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#fbbf24',
                                marginBottom: '12px'
                            }}>
                                🚫 Revoke All Approvals
                            </div>
                            <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                                Visit revoke.cash and remove all token approvals from your wallet {userWallet.substring(0, 10)}... 
                                to prevent delegate spending.
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#fbbf24',
                                marginBottom: '12px'
                            }}>
                                🔍 Monitor All Transactions
                            </div>
                            <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                                Use Etherscan alerts to monitor your wallet. 
                                Set up notifications for any outgoing transactions.
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#fbbf24',
                                marginBottom: '12px'
                            }}>
                                ⚠️ Test Small First
                            </div>
                            <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                                Deploy on Sepolia testnet first to verify no delegate risks 
                                before deploying to mainnet.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <button
                        onClick={() => window.open('https://revoke.cash', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🚫 REVOKE APPROVALS
                    </button>
                    
                    <button
                        onClick={() => window.open(`https://etherscan.io/address/${userWallet}`, '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        👀 MONITOR WALLET
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/secure-wallet'}
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🛡️ SECURE DEPLOYMENT
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/secure-signing'}
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        ✍️ SAFE SIGNING GUIDE
                    </button>
                </div>

                {/* Summary */}
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
                        🛡️ ELIMINATE DELEGATION RISKS COMPLETELY
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        Disabling smart wallet features converts your wallet to a standard EOA (Externally Owned Account) 
                        where only YOU can sign transactions. No delegate addresses, no smart contract control, 
                        no auto-execution. Your private key is the only way to move funds. Combined with the 
                        secure contract deployment, this eliminates all risks that caused your previous ETH loss.
                    </div>
                </div>
            </div>
        </div>
    );
}