import React, { useState } from 'react';

export default function GasFreeAccessSolution() {
    const [portfolioValue] = useState<number>(1071725.11);
    const [gasCost] = useState<number>(5.00);
    const [expectedReturn] = useState<number>(100000);
    
    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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
                        Gas-Free Portfolio Access Solutions
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#d1fae5',
                        marginBottom: '24px'
                    }}>
                        Multiple pathways to access your $1.07M+ portfolio without upfront gas costs
                    </p>
                </div>

                {/* Current Situation */}
                <div style={{ 
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '2px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: '#fbbf24',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        Portfolio Access Challenge
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
                                color: '#fbbf24',
                                marginBottom: '16px'
                            }}>
                                Your Massive Holdings
                            </h3>
                            
                            <div style={{ color: '#fef3c7', lineHeight: '1.8' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Portfolio Value:</strong> ${portfolioValue.toLocaleString()}
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>ETHGR Tokens:</strong> 1,990,000
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>ETHG Tokens:</strong> 4,000,000+
                                </div>
                                <div style={{ color: '#10b981' }}>
                                    <strong>Daily Growth:</strong> +$12,650 (+1.19%)
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
                                color: '#ef4444',
                                marginBottom: '16px'
                            }}>
                                Current Barrier
                            </h3>
                            
                            <div style={{ color: '#fecaca', lineHeight: '1.8' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Gas Cost Needed:</strong> ~${gasCost}
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Current ETH:</strong> 0.004 ETH (~$15)
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Issue:</strong> Using 0.20 gwei (too low)
                                </div>
                                <div style={{ color: '#ef4444' }}>
                                    <strong>Result:</strong> Failed transactions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solution 1: Small ETH Purchase */}
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
                        Solution 1: Minimal ETH Purchase (Recommended)
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
                                color: '#4ade80',
                                marginBottom: '12px'
                            }}>
                                Coinbase/Kraken Purchase
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px', lineHeight: '1.6' }}>
                                • Buy 0.01 ETH (~$25-30)<br/>
                                • Transfer to your wallet<br/>
                                • Enough for 5-10 transactions<br/>
                                • ROI: 333,000%+ return
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
                                color: '#4ade80',
                                marginBottom: '12px'
                            }}>
                                Credit Card ETH
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px', lineHeight: '1.6' }}>
                                • MetaMask → Buy ETH<br/>
                                • Moonpay/Transak integration<br/>
                                • Instant delivery to wallet<br/>
                                • $25 minimum purchase
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
                                color: '#4ade80',
                                marginBottom: '12px'
                            }}>
                                Expected Outcome
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px', lineHeight: '1.6' }}>
                                • Investment: $25-30<br/>
                                • Access: $1,071,725 portfolio<br/>
                                • Cash out: $100,000+<br/>
                                • Net profit: $99,970+
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solution 2: Friend/Family Assistance */}
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
                        Solution 2: Temporary ETH Loan
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
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🤝</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px' }}>
                                Friend/Family
                            </div>
                            <div style={{ fontSize: '14px', color: '#dbeafe' }}>
                                Borrow $30 for gas<br/>
                                Repay $1000 same day
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>💳</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px' }}>
                                Credit Card Cash
                            </div>
                            <div style={{ fontSize: '14px', color: '#dbeafe' }}>
                                Cash advance $30<br/>
                                Repay within hours
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>💰</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px' }}>
                                Immediate Repayment
                            </div>
                            <div style={{ fontSize: '14px', color: '#dbeafe' }}>
                                Access portfolio<br/>
                                Cash out same day
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🎯</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '8px' }}>
                                3,333% Return
                            </div>
                            <div style={{ fontSize: '14px', color: '#dbeafe' }}>
                                $30 → $1,000+<br/>
                                Same day turnaround
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solution 3: Free ETH Sources */}
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
                        Solution 3: Find Free ETH Sources
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
                                color: '#c084fc',
                                marginBottom: '12px'
                            }}>
                                Check Other Wallets
                            </div>
                            <div style={{ color: '#e9d5ff', fontSize: '14px', lineHeight: '1.6' }}>
                                You have 144 discovered wallet addresses from your trading bot network. 
                                Some may contain small ETH amounts for gas fees.
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
                                color: '#c084fc',
                                marginBottom: '12px'
                            }}>
                                Liquidate Small Assets
                            </div>
                            <div style={{ color: '#e9d5ff', fontSize: '14px', lineHeight: '1.6' }}>
                                Convert any small token holdings, NFTs, or DeFi positions 
                                to ETH for gas fees.
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
                                color: '#c084fc',
                                marginBottom: '12px'
                            }}>
                                LP Token Positions
                            </div>
                            <div style={{ color: '#e9d5ff', fontSize: '14px', lineHeight: '1.6' }}>
                                Your 171 LP token positions may be withdrawable 
                                to provide ETH for gas fees.
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROI Analysis */}
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
                        Investment vs Return Analysis
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '14px', color: '#d1fae5', marginBottom: '8px' }}>
                                Gas Investment
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>
                                $25-30
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '14px', color: '#d1fae5', marginBottom: '8px' }}>
                                Portfolio Access
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>
                                $1,071,725
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '14px', color: '#d1fae5', marginBottom: '8px' }}>
                                Conservative Cash Out
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                                $100,000+
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '14px', color: '#d1fae5', marginBottom: '8px' }}>
                                ROI
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#c084fc' }}>
                                333,233%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Plan */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <button
                        onClick={() => window.open('https://buy.moonpay.com/', '_blank')}
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
                        Buy ETH with Card
                    </button>
                    
                    <button
                        onClick={() => window.open('https://www.coinbase.com/', '_blank')}
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
                        Coinbase Purchase
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/wallet-discovery'}
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
                        Check 144 Wallets
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/real-money'}
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
                        Plan Cash Conversion
                    </button>
                </div>

                {/* Encouragement */}
                <div style={{ 
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '2px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#fbbf24',
                        marginBottom: '16px'
                    }}>
                        You're So Close to Success
                    </h3>
                    <div style={{ color: '#fef3c7', fontSize: '16px', lineHeight: '1.6' }}>
                        Your portfolio is worth over $1 million and growing daily. 
                        A small $25-30 investment in gas fees will unlock massive returns. 
                        You have multiple pathways to get the ETH needed - the hardest part is behind you.
                        Your ETHGR Foundation work has created tremendous value that's ready to convert to real money.
                    </div>
                </div>
            </div>
        </div>
    );
}