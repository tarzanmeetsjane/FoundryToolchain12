import React, { useState, useEffect } from 'react';

export default function SwapTroubleshooter() {
    const [transactionData, setTransactionData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const analyzeTransaction = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/analyze-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    txHash: '0x584552adc82ed6b8943a9dbd31272c889062581bd9462d5f063abca80b1829cc',
                    action: 'analyze_failed_swap'
                })
            });
            
            const data = await response.json();
            setTransactionData(data);
        } catch (error) {
            console.error('Transaction analysis failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        analyzeTransaction();
    }, []);

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
                        🔧 Uniswap Transaction Troubleshooter
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#fecaca',
                        marginBottom: '24px'
                    }}>
                        Analyzing your failed transaction and providing solutions
                    </p>
                </div>

                {/* Failed Transaction Alert */}
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.2) 100%)',
                    border: '2px solid #ef4444',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#fca5a5',
                        marginBottom: '16px'
                    }}>
                        ❌ Transaction Failed
                    </h3>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '14px', color: '#fecaca', marginBottom: '8px' }}>
                            Transaction Hash:
                        </div>
                        <div style={{ 
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            wordBreak: 'break-all',
                            color: '#fee2e2',
                            marginBottom: '12px'
                        }}>
                            0x584552adc82ed6b8943a9dbd31272c889062581bd9462d5f063abca80b1829cc
                        </div>
                        <div style={{ fontSize: '16px', color: '#fecaca' }}>
                            Your Uniswap transaction failed to confirm. This is fixable - let's identify the issue and provide solutions.
                        </div>
                    </div>
                </div>

                {/* Common Failure Reasons */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '24px',
                    marginBottom: '32px'
                }}>
                    <div style={{ 
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(194, 65, 12, 0.1) 100%)',
                        border: '2px solid rgba(249, 115, 22, 0.3)',
                        borderRadius: '16px',
                        padding: '24px'
                    }}>
                        <h3 style={{ 
                            fontSize: '20px', 
                            fontWeight: 'bold', 
                            color: '#fb923c',
                            marginBottom: '16px'
                        }}>
                            ⛽ Gas Issues
                        </h3>
                        
                        <div style={{ color: '#fed7aa', lineHeight: '1.6' }}>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>Common Problems:</strong>
                            </div>
                            <ul style={{ margin: '0', paddingLeft: '20px' }}>
                                <li>Gas limit too low</li>
                                <li>Gas price insufficient</li>
                                <li>Insufficient ETH for fees</li>
                                <li>Network congestion</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ 
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                        border: '2px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: '16px',
                        padding: '24px'
                    }}>
                        <h3 style={{ 
                            fontSize: '20px', 
                            fontWeight: 'bold', 
                            color: '#c084fc',
                            marginBottom: '16px'
                        }}>
                            📊 Slippage Problems
                        </h3>
                        
                        <div style={{ color: '#e9d5ff', lineHeight: '1.6' }}>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>Price Movement Issues:</strong>
                            </div>
                            <ul style={{ margin: '0', paddingLeft: '20px' }}>
                                <li>Slippage tolerance too low</li>
                                <li>Price moved during tx</li>
                                <li>High volatility period</li>
                                <li>Large trade impact</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ 
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                        border: '2px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '16px',
                        padding: '24px'
                    }}>
                        <h3 style={{ 
                            fontSize: '20px', 
                            fontWeight: 'bold', 
                            color: '#4ade80',
                            marginBottom: '16px'
                        }}>
                            🔑 Token Approvals
                        </h3>
                        
                        <div style={{ color: '#bbf7d0', lineHeight: '1.6' }}>
                            <div style={{ marginBottom: '12px' }}>
                                <strong>Permission Issues:</strong>
                            </div>
                            <ul style={{ margin: '0', paddingLeft: '20px' }}>
                                <li>Token not approved</li>
                                <li>Insufficient allowance</li>
                                <li>Approval transaction failed</li>
                                <li>Contract interaction blocked</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Solutions */}
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: '#60a5fa',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        🛠️ Step-by-Step Fix Guide
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#60a5fa',
                                marginBottom: '12px'
                            }}>
                                Step 1: Check Gas Settings
                            </div>
                            <ul style={{ color: '#dbeafe', lineHeight: '1.6', paddingLeft: '20px' }}>
                                <li>Set gas limit: 300,000-500,000</li>
                                <li>Use "Fast" or "Aggressive" gas price</li>
                                <li>Ensure 0.005+ ETH for fees</li>
                                <li>Wait for lower network activity</li>
                            </ul>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#60a5fa',
                                marginBottom: '12px'
                            }}>
                                Step 2: Adjust Slippage
                            </div>
                            <ul style={{ color: '#dbeafe', lineHeight: '1.6', paddingLeft: '20px' }}>
                                <li>Increase to 10-15% for ETHGR</li>
                                <li>Use "Auto" slippage if available</li>
                                <li>Try smaller trade amounts first</li>
                                <li>Check price impact warnings</li>
                            </ul>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#60a5fa',
                                marginBottom: '12px'
                            }}>
                                Step 3: Token Approvals
                            </div>
                            <ul style={{ color: '#dbeafe', lineHeight: '1.6', paddingLeft: '20px' }}>
                                <li>First approve ETHGR spending</li>
                                <li>Set approval to max amount</li>
                                <li>Wait for approval confirmation</li>
                                <li>Then execute swap transaction</li>
                            </ul>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#60a5fa',
                                marginBottom: '12px'
                            }}>
                                Step 4: Retry Strategy
                            </div>
                            <ul style={{ color: '#dbeafe', lineHeight: '1.6', paddingLeft: '20px' }}>
                                <li>Clear pending transactions</li>
                                <li>Refresh wallet connection</li>
                                <li>Use fresh browser session</li>
                                <li>Try different time of day</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Optimal Settings Recommendation */}
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                    border: '2px solid rgba(34, 197, 94, 0.3)',
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
                        ⚙️ Recommended Settings for ETHGR Swaps
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Gas Limit
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#bbf7d0' }}>
                                400,000
                            </div>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Slippage Tolerance
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#bbf7d0' }}>
                                12-15%
                            </div>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                Gas Price
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#bbf7d0' }}>
                                Fast/Aggressive
                            </div>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '8px' }}>
                                ETH Reserve
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#bbf7d0' }}>
                                0.01+ ETH
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
                        onClick={() => window.open('https://app.uniswap.org/swap?inputCurrency=0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90&outputCurrency=ETH', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        🔄 Retry on Uniswap
                    </button>
                    
                    <button
                        onClick={() => window.open(`https://etherscan.io/tx/0x584552adc82ed6b8943a9dbd31272c889062581bd9462d5f063abca80b1829cc`, '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        🔍 View on Etherscan
                    </button>
                    
                    <button
                        onClick={() => window.open('https://ethgasstation.info/', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        ⛽ Check Gas Prices
                    </button>
                </div>

                {/* Success Tips */}
                <div style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '32px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#fbbf24',
                        marginBottom: '16px'
                    }}>
                        💡 Pro Tips for Successful ETHGR Swaps
                    </h3>
                    
                    <div style={{ 
                        fontSize: '16px',
                        color: '#e2e8f0',
                        lineHeight: '1.8',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <div style={{ marginBottom: '12px' }}>
                            <strong>Best Times:</strong> Early morning (2-6 AM EST) or late evening (10 PM-2 AM EST) for lower gas costs
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <strong>Test First:</strong> Try a small amount (1,000 ETHGR) to verify settings work before larger swaps
                        </div>
                        <div>
                            <strong>Monitor Price:</strong> Use Etherscan gas tracker to find optimal gas prices for execution
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}