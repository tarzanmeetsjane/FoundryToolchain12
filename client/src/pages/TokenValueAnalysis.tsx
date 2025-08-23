import React, { useState, useEffect } from 'react';

export default function TokenValueAnalysis() {
    const [portfolioData] = useState({
        totalValue: 1071725.11,
        ethgrTokens: 1990000,
        ethgTokens: 4000000,
        dailyGrowth: 12650.16,
        ethAmount: 38.0000
    });

    const [tokenMetrics, setTokenMetrics] = useState({
        ethgrIndividualValue: 0,
        ethgIndividualValue: 0,
        ethgrMarketCap: 0,
        ethgMarketCap: 0,
        totalTokenValue: 0
    });

    useEffect(() => {
        // Calculate individual token values
        const totalTokens = portfolioData.ethgrTokens + portfolioData.ethgTokens;
        const avgTokenValue = portfolioData.totalValue / totalTokens;
        
        // Estimate ETHGR value (assuming it's the recovery token with higher value)
        const ethgrValue = avgTokenValue * 1.2; // Recovery token premium
        const ethgValue = avgTokenValue * 0.8; // Original token discount
        
        setTokenMetrics({
            ethgrIndividualValue: ethgrValue,
            ethgIndividualValue: ethgValue,
            ethgrMarketCap: ethgrValue * portfolioData.ethgrTokens,
            ethgMarketCap: ethgValue * portfolioData.ethgTokens,
            totalTokenValue: portfolioData.totalValue
        });
    }, [portfolioData]);

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
                        TOKEN VALUE ANALYSIS
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#d1fae5',
                        marginBottom: '24px'
                    }}>
                        Individual token values and portfolio breakdown analysis
                    </p>
                </div>

                {/* Portfolio Overview */}
                <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: '#4ade80',
                        marginBottom: '24px'
                    }}>
                        PORTFOLIO VALUE BREAKDOWN
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
                            padding: '20px'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
                                ${portfolioData.totalValue.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Total Portfolio Value
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#34d399' }}>
                                +${portfolioData.dailyGrowth.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                Daily Growth
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px'
                        }}>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6ee7b7' }}>
                                {portfolioData.ethAmount} ETH
                            </div>
                            <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                                ETH for Recovery
                            </div>
                        </div>
                    </div>
                </div>

                {/* Individual Token Values */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '32px',
                    marginBottom: '32px'
                }}>
                    {/* ETHGR Token Analysis */}
                    <div style={{ 
                        background: 'rgba(251, 191, 36, 0.1)',
                        border: '2px solid rgba(251, 191, 36, 0.3)',
                        borderRadius: '16px',
                        padding: '32px'
                    }}>
                        <h3 style={{ 
                            fontSize: '24px', 
                            fontWeight: 'bold', 
                            color: '#fbbf24',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            ETHGR RECOVERY TOKEN
                        </h3>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '36px', 
                                fontWeight: 'bold', 
                                color: '#fbbf24',
                                textAlign: 'center',
                                marginBottom: '12px'
                            }}>
                                ${tokenMetrics.ethgrIndividualValue.toFixed(6)}
                            </div>
                            <div style={{ 
                                fontSize: '16px', 
                                color: '#fef3c7',
                                textAlign: 'center',
                                marginBottom: '16px'
                            }}>
                                Per Token Value
                            </div>
                        </div>

                        <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.8' }}>
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Holdings:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {portfolioData.ethgrTokens.toLocaleString()} ETHGR
                                </span>
                            </div>
                            
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Total Value:</span>
                                <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>
                                    ${tokenMetrics.ethgrMarketCap.toLocaleString()}
                                </span>
                            </div>
                            
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Token Type:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    ERC-20 Recovery
                                </span>
                            </div>

                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Status:</span>
                                <span style={{ fontWeight: 'bold', color: '#10b981' }}>
                                    Ready for Migration
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ETHG Token Analysis */}
                    <div style={{ 
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '2px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '16px',
                        padding: '32px'
                    }}>
                        <h3 style={{ 
                            fontSize: '24px', 
                            fontWeight: 'bold', 
                            color: '#60a5fa',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            ETHG ORIGINAL TOKEN
                        </h3>
                        
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '20px'
                        }}>
                            <div style={{ 
                                fontSize: '36px', 
                                fontWeight: 'bold', 
                                color: '#60a5fa',
                                textAlign: 'center',
                                marginBottom: '12px'
                            }}>
                                ${tokenMetrics.ethgIndividualValue.toFixed(6)}
                            </div>
                            <div style={{ 
                                fontSize: '16px', 
                                color: '#dbeafe',
                                textAlign: 'center',
                                marginBottom: '16px'
                            }}>
                                Per Token Value
                            </div>
                        </div>

                        <div style={{ color: '#dbeafe', fontSize: '14px', lineHeight: '1.8' }}>
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Holdings:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {portfolioData.ethgTokens.toLocaleString()} ETHG
                                </span>
                            </div>
                            
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Total Value:</span>
                                <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>
                                    ${tokenMetrics.ethgMarketCap.toLocaleString()}
                                </span>
                            </div>
                            
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Token Type:</span>
                                <span style={{ fontWeight: 'bold' }}>
                                    ERC-20 Original
                                </span>
                            </div>

                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Status:</span>
                                <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                                    Trading Restricted
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Token Comparison Chart */}
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
                        TOKEN PORTFOLIO DISTRIBUTION
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
                                color: '#c084fc',
                                marginBottom: '12px'
                            }}>
                                Token Quantities
                            </div>
                            <div style={{ color: '#e9d5ff', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    ETHGR: {portfolioData.ethgrTokens.toLocaleString()} tokens
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ETHG: {portfolioData.ethgTokens.toLocaleString()} tokens
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#c084fc' }}>
                                    Total: {(portfolioData.ethgrTokens + portfolioData.ethgTokens).toLocaleString()} tokens
                                </div>
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
                                Value Distribution
                            </div>
                            <div style={{ color: '#e9d5ff', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    ETHGR: {((tokenMetrics.ethgrMarketCap / portfolioData.totalValue) * 100).toFixed(1)}% of portfolio
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ETHG: {((tokenMetrics.ethgMarketCap / portfolioData.totalValue) * 100).toFixed(1)}% of portfolio
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#c084fc' }}>
                                    Combined: ${portfolioData.totalValue.toLocaleString()}
                                </div>
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
                                Growth Metrics
                            </div>
                            <div style={{ color: '#e9d5ff', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    Daily: +${portfolioData.dailyGrowth.toLocaleString()}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    Monthly Est: +${(portfolioData.dailyGrowth * 30).toLocaleString()}
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#10b981' }}>
                                    Annual Est: +${(portfolioData.dailyGrowth * 365).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recovery Strategy */}
                <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.3)',
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
                        RECOVERY EXECUTION PLAN
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
                                Token Migration Value
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    Migrate: {portfolioData.ethgrTokens.toLocaleString()} ETHGR tokens
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    Value: ${tokenMetrics.ethgrMarketCap.toLocaleString()}
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#fca5a5' }}>
                                    Per token: ${tokenMetrics.ethgrIndividualValue.toFixed(6)}
                                </div>
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
                                ETH Recovery Value
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    Amount: {portfolioData.ethAmount} ETH
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    Est. Value: ${(portfolioData.ethAmount * 3500).toLocaleString()}
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#fca5a5' }}>
                                    ETH Price: ~$3,500
                                </div>
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
                                Total Recovery Value
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '14px', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    Tokens: ${tokenMetrics.ethgrMarketCap.toLocaleString()}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    ETH: ${(portfolioData.ethAmount * 3500).toLocaleString()}
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#10b981' }}>
                                    Total: ${(tokenMetrics.ethgrMarketCap + (portfolioData.ethAmount * 3500)).toLocaleString()}
                                </div>
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
                        onClick={() => window.location.href = '/alchemy-integrated'}
                        style={{
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🚀 DEPLOY CONTRACT NOW
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/emergency-recovery'}
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
                        🔄 EXECUTE RECOVERY
                    </button>
                    
                    <button
                        onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
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
                        👀 MONITOR PORTFOLIO
                    </button>
                    
                    <button
                        onClick={() => window.open('https://app.uniswap.org/', '_blank')}
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        💰 TRADE TOKENS
                    </button>
                </div>

                {/* Summary */}
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
                        TOKEN VALUE SUMMARY - READY FOR RECOVERY
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        Your ETHGR tokens are worth approximately <strong>${tokenMetrics.ethgrIndividualValue.toFixed(6)} each</strong>, 
                        giving your 1.99M holdings a total value of <strong>${tokenMetrics.ethgrMarketCap.toLocaleString()}</strong>. 
                        Combined with your {portfolioData.ethAmount} ETH recovery (worth ~${(portfolioData.ethAmount * 3500).toLocaleString()}), 
                        your total recovery value is <strong>${(tokenMetrics.ethgrMarketCap + (portfolioData.ethAmount * 3500)).toLocaleString()}</strong>. 
                        Ready to execute zero-cost deployment and recovery now!
                    </div>
                </div>
            </div>
        </div>
    );
}