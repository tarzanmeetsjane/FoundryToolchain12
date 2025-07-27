import React, { useState } from 'react';

export default function FailedTransactionAnalysis() {
    const [gasWasted] = useState<number>(0.000054689534771775);
    const [ethPrice] = useState<number>(3789);
    const [wastedCost, setWastedCost] = useState<number>(gasWasted * ethPrice);

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
                        Another Failed Transaction: Gas Issue Continues
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#fecaca',
                        marginBottom: '24px'
                    }}>
                        You lost ${wastedCost.toFixed(2)} in gas fees with no successful execution
                    </p>
                </div>

                {/* Failed Transaction Details */}
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
                        Failed Transaction State Analysis
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
                                Your Wallet State Change
                            </h3>
                            
                            <div style={{ color: '#fecaca', lineHeight: '1.8' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Address:</strong> 0x058C8FE0...B368843
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Before:</strong> 0.004156989... ETH (Nonce: 26)
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>After:</strong> 0.004102299... ETH (Nonce: 27)
                                </div>
                                <div style={{ color: '#ef4444', fontWeight: 'bold' }}>
                                    <strong>Result:</strong> FAILED - Gas wasted, no execution
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
                                Miner/Builder Activity
                            </h3>
                            
                            <div style={{ color: '#dbeafe', lineHeight: '1.8' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Builder:</strong> Titan Builder
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Address:</strong> 0x4838B106...AD5f97
                                </div>
                                <div style={{ marginBottom: '12px' }}>
                                    <strong>Fee Collected:</strong> 0.000000776... ETH
                                </div>
                                <div style={{ color: '#ef4444' }}>
                                    <strong>Status:</strong> Failed execution but fees taken
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cost of Failure */}
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
                        Cost of This Failure
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
                            <div style={{ fontSize: '14px', color: '#fef3c7', marginBottom: '8px' }}>
                                ETH Wasted
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>
                                {gasWasted.toFixed(8)}
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '14px', color: '#fef3c7', marginBottom: '8px' }}>
                                USD Lost
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>
                                ${wastedCost.toFixed(2)}
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '14px', color: '#fef3c7', marginBottom: '8px' }}>
                                Transaction Result
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444' }}>
                                FAILED
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '14px', color: '#fef3c7', marginBottom: '8px' }}>
                                Portfolio Access
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444' }}>
                                BLOCKED
                            </div>
                        </div>
                    </div>
                </div>

                {/* Failure Pattern */}
                <div style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#fca5a5',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        Your Repeated Failure Pattern
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
                                color: '#fca5a5',
                                marginBottom: '12px'
                            }}>
                                Recent Failures
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '14px', lineHeight: '1.8' }}>
                                <div>• 0xde0940... - FAILED (0.204 gwei)</div>
                                <div>• 0x584552... - FAILED (0.20 gwei)</div>
                                <div>• Latest - FAILED (gas too low)</div>
                                <div>• Multiple 0x0000... attempts - FAILED</div>
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
                                color: '#fca5a5',
                                marginBottom: '12px'
                            }}>
                                Root Cause
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '14px', lineHeight: '1.8' }}>
                                <div>• Gas price consistently too low</div>
                                <div>• Not using MetaMask "Aggressive" setting</div>
                                <div>• Ignoring current network conditions</div>
                                <div>• Wasting money on failed attempts</div>
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
                                color: '#fca5a5',
                                marginBottom: '12px'
                            }}>
                                Cumulative Cost
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '14px', lineHeight: '1.8' }}>
                                <div>• This failure: ${wastedCost.toFixed(2)}</div>
                                <div>• Previous failures: ~$2.50+</div>
                                <div>• Total wasted: ~$3.00+</div>
                                <div>• Portfolio blocked: $1,071,725</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Locked Portfolio Impact */}
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
                        What You're Missing While Failing
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
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                Portfolio Value
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                $1,071,725.11<br/>
                                Growing +$12,650/day
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                ETHGR Tokens
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                1.99M tokens<br/>
                                Cannot trade
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💸</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                Cash Potential
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                $100,000+ cash<br/>
                                Completely blocked
                            </div>
                        </div>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏰</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
                                Time Lost
                            </div>
                            <div style={{ fontSize: '14px', color: '#e9d5ff' }}>
                                Multiple days<br/>
                                Opportunity cost huge
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Simple Fix */}
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
                        Stop Failing: The Simple Fix
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
                                1. Use Proper Gas Price
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px', lineHeight: '1.6' }}>
                                Set gas to 25-35 gwei (not 0.20). Click "Advanced" in MetaMask 
                                and manually set higher gas price or use "Aggressive" preset.
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
                                2. Increase Gas Limit
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px', lineHeight: '1.6' }}>
                                Set gas limit to 400,000 or higher for ETHGR swaps. 
                                Low gas limits cause "out of gas" failures.
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
                                3. Optimal Timing
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px', lineHeight: '1.6' }}>
                                Use late evening (10-11 PM EST) when network congestion is lower. 
                                Your 10:58 PM success proves this timing works.
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
                        onClick={() => window.open('https://ethgasstation.info/', '_blank')}
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
                        Check Current Gas Prices
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/gas-analysis'}
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
                        See Gas Price Analysis
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/swap-troubleshooter'}
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
                        Get Step-by-Step Fix
                    </button>
                    
                    <button
                        onClick={() => window.open('https://app.uniswap.org/', '_blank')}
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
                        Try Again with Higher Gas
                    </button>
                </div>

                {/* Critical Message */}
                <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.5)',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#fca5a5',
                        marginBottom: '16px'
                    }}>
                        Stop Wasting Money on Failed Transactions
                    </h3>
                    <div style={{ color: '#fecaca', fontSize: '16px', lineHeight: '1.6' }}>
                        You just lost another ${wastedCost.toFixed(2)} in gas fees with no result. 
                        Your $1,071,725 portfolio remains locked because you're using gas prices that are 100x too low. 
                        Use 25-35 gwei (not 0.20) and your massive token holdings will finally trade successfully.
                    </div>
                </div>
            </div>
        </div>
    );
}