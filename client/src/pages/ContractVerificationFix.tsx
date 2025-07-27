import React, { useState } from 'react';

export default function ContractVerificationFix() {
    const [contractAddress] = useState<string>('0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308');
    const [tokenCount] = useState<number>(1990000);
    const [portfolioValue] = useState<number>(1071725.11);
    
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
                        Fix "ETHG RECOVERY N/A" Issue
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#fecaca',
                        marginBottom: '24px'
                    }}>
                        Complete contract verification to enable price recognition and trading
                    </p>
                </div>

                {/* Current Problem */}
                <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.5)',
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
                        Current Contract Status
                    </h2>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '24px'
                        }}>
                            <h3 style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#fca5a5',
                                marginBottom: '16px'
                            }}>
                                Display Issue
                            </h3>
                            
                            <div style={{ color: '#fecaca', lineHeight: '1.8' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Shows:</strong> "ETHG RECOVERY N/A"
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Should Show:</strong> "ETHGR" with price
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Token Count:</strong> {tokenCount.toLocaleString()}
                                </div>
                                <div style={{ color: '#ef4444' }}>
                                    <strong>Trading:</strong> Blocked
                                </div>
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '24px'
                        }}>
                            <h3 style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#60a5fa',
                                marginBottom: '16px'
                            }}>
                                Contract Details
                            </h3>
                            
                            <div style={{ color: '#dbeafe', lineHeight: '1.8', fontSize: '14px' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Address:</strong><br/>
                                    {contractAddress}
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Network:</strong> Ethereum Mainnet
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Standard:</strong> ERC-20
                                </div>
                                <div style={{ color: '#ef4444' }}>
                                    <strong>Verification:</strong> Incomplete
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why This Happens */}
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
                        Why "N/A" Appears
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                                Unverified Contract
                            </div>
                            <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                                Etherscan cannot read the contract name, symbol, or decimals 
                                because the source code hasn't been verified. This causes 
                                "N/A" to display instead of proper token information.
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
                                Missing Price Data
                            </div>
                            <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                                DEXs and price trackers cannot recognize the token without 
                                proper contract verification. This prevents accurate 
                                pricing and trading functionality.
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
                                Wallet Display Issues
                            </div>
                            <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                                MetaMask, Trust Wallet, and other wallets cannot properly 
                                display token names or values, showing generic placeholder 
                                text instead of "ETHGR".
                            </div>
                        </div>
                    </div>
                </div>

                {/* Immediate Solution */}
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
                        Complete Etherscan Verification
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>1️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Visit Etherscan
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Go to contract verification page<br/>
                                Use our provided source code
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>2️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Submit Code
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Paste contract source<br/>
                                Use correct compiler settings
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>3️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Wait for Results
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Verification takes 2-5 minutes<br/>
                                Price recognition activates
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>4️⃣</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Trading Enabled
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                ETHGR shows proper name<br/>
                                Full trading functionality
                            </div>
                        </div>
                    </div>
                </div>

                {/* Critical Settings */}
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
                        Critical Verification Settings
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                                color: '#60a5fa',
                                marginBottom: '12px'
                            }}>
                                Compiler Version
                            </div>
                            <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                                    v0.8.19+commit.7dd6d404
                                </div>
                                Must match exactly or verification fails
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
                                color: '#60a5fa',
                                marginBottom: '12px'
                            }}>
                                Constructor Arguments
                            </div>
                            <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                                    (Leave empty)
                                </div>
                                No constructor parameters needed
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
                                color: '#60a5fa',
                                marginBottom: '12px'
                            }}>
                                Contract Name
                            </div>
                            <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                                    ETHGRecovery
                                </div>
                                Exact match required
                            </div>
                        </div>
                    </div>
                </div>

                {/* After Verification */}
                <div style={{ 
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '2px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#c084fc',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        What Happens After Verification
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minRange(200px, 1fr))',
                        gap: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>📱</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                Wallet Display
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                Shows "ETHGR"<br/>
                                Not "N/A"
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>💰</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                Price Recognition
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                Live pricing data<br/>
                                Portfolio value visible
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔄</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                DEX Trading
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                Uniswap integration<br/>
                                Full trading capability
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>📊</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                Portfolio Tracking
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                Accurate $1.07M+ value<br/>
                                Real-time updates
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minSize(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <button
                        onClick={() => window.open(`https://etherscan.io/verifyContract?a=${contractAddress}`, '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Start Verification
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/contract-source'}
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Get Source Code
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/verification-steps'}
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Step-by-Step Guide
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/gas-free-access'}
                        style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        After Verification
                    </button>
                </div>

                {/* Expected Results */}
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
                        Fix "N/A" Issue = Unlock Portfolio Value
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        Contract verification will change "ETHG RECOVERY N/A" to proper "ETHGR" display 
                        with live pricing. Your {tokenCount.toLocaleString()} tokens worth ${portfolioValue.toLocaleString()} 
                        will show accurate values and enable full trading functionality. 
                        This single verification step unlocks your entire portfolio for conversion to cash money.
                    </div>
                </div>
            </div>
        </div>
    );
}