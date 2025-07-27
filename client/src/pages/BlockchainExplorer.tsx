import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface BlockchainData {
    ethBalance: string;
    ethPrice: number;
    marketData: {
        price: number;
        marketCap: number;
        volume24h: number;
        change24h: number;
    };
    transactions: any[];
    contractVerified: boolean;
    tokenBalance: string;
    timestamp: string;
    network: string;
    apiStatus: {
        etherscan: string;
        coingecko: string;
        alchemy: string;
    };
}

export default function BlockchainExplorer() {
    const [liveData, setLiveData] = useState<BlockchainData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchBlockchainData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/blockchain-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    wallet: '0x058C8FE01E5c9eaC6ee19e6673673B549B368843',
                    contract: '0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90'
                })
            });
            
            const data = await response.json();
            setLiveData(data);
        } catch (error) {
            console.error('Failed to fetch blockchain data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlockchainData();
    }, []);

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '32px 16px',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ 
                        fontSize: '48px', 
                        fontWeight: 'bold', 
                        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        🔗 Live Blockchain Explorer
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#94a3b8',
                        marginBottom: '24px'
                    }}>
                        Real-time verification using Etherscan & CoinGecko APIs
                    </p>
                    
                    <button 
                        onClick={fetchBlockchainData}
                        disabled={loading}
                        style={{
                            background: loading ? '#64748b' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginBottom: '32px'
                        }}
                    >
                        {loading ? '🔄 Loading...' : '🔍 Refresh Live Data'}
                    </button>
                </div>

                {loading && (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '48px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        marginBottom: '24px'
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '16px' }}>🔄</div>
                        <div style={{ color: '#94a3b8' }}>Fetching live blockchain data...</div>
                    </div>
                )}

                {liveData && (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '24px'
                    }}>
                        {/* Foundation Wallet */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '16px',
                            padding: '24px'
                        }}>
                            <h3 style={{ 
                                fontSize: '20px', 
                                fontWeight: 'bold', 
                                color: '#3b82f6',
                                marginBottom: '16px'
                            }}>
                                💰 Foundation Wallet
                            </h3>
                            
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>Address:</div>
                                <div style={{ 
                                    fontFamily: 'monospace', 
                                    fontSize: '12px',
                                    background: 'rgba(0,0,0,0.3)',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    wordBreak: 'break-all'
                                }}>
                                    0x058C8FE01E5c9eaC6ee19e6673673B549B368843
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>ETH Balance:</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {liveData.ethBalance} ETH
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>USD Value:</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                                    ${(parseFloat(liveData.ethBalance) * liveData.ethPrice).toFixed(2)}
                                </div>
                            </div>
                        </div>

                        {/* ETHGR Contract */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '16px',
                            padding: '24px'
                        }}>
                            <h3 style={{ 
                                fontSize: '20px', 
                                fontWeight: 'bold', 
                                color: '#10b981',
                                marginBottom: '16px'
                            }}>
                                🔍 ETHGR Contract
                            </h3>
                            
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>Contract:</div>
                                <div style={{ 
                                    fontFamily: 'monospace', 
                                    fontSize: '12px',
                                    background: 'rgba(0,0,0,0.3)',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    wordBreak: 'break-all'
                                }}>
                                    0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>Verification:</div>
                                <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: 'bold',
                                    color: liveData.contractVerified ? '#10b981' : '#ef4444'
                                }}>
                                    {liveData.contractVerified ? '✅ VERIFIED' : '❌ NOT VERIFIED'}
                                </div>
                            </div>
                            
                            <div>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>Token Balance:</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {parseFloat(liveData.tokenBalance).toLocaleString()} ETHGR
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Market Data */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            borderRadius: '16px',
                            padding: '24px'
                        }}>
                            <h3 style={{ 
                                fontSize: '20px', 
                                fontWeight: 'bold', 
                                color: '#f59e0b',
                                marginBottom: '16px'
                            }}>
                                📈 Live Market Data
                            </h3>
                            
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>ETH Price:</div>
                                <div style={{ 
                                    fontSize: '24px', 
                                    fontWeight: 'bold', 
                                    color: '#f59e0b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    ${liveData.ethPrice.toLocaleString()}
                                    {liveData.marketData?.change24h && (
                                        <span style={{ 
                                            fontSize: '14px',
                                            color: liveData.marketData.change24h > 0 ? '#10b981' : '#ef4444',
                                            background: liveData.marketData.change24h > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            padding: '2px 6px',
                                            borderRadius: '4px'
                                        }}>
                                            {liveData.marketData.change24h > 0 ? '+' : ''}{liveData.marketData.change24h.toFixed(2)}%
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            {liveData.marketData?.marketCap && (
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>Market Cap:</div>
                                    <div style={{ fontSize: '16px' }}>
                                        ${(liveData.marketData.marketCap / 1e9).toFixed(2)}B
                                    </div>
                                </div>
                            )}
                            
                            {liveData.marketData?.volume24h && (
                                <div style={{ marginBottom: '12px' }}>
                                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>24h Volume:</div>
                                    <div style={{ fontSize: '16px' }}>
                                        ${(liveData.marketData.volume24h / 1e9).toFixed(2)}B
                                    </div>
                                </div>
                            )}
                            
                            <div>
                                <div style={{ color: '#94a3b8', fontSize: '14px' }}>Data Source:</div>
                                <div style={{ fontSize: '16px' }}>
                                    CoinGecko Pro API
                                    <span style={{ 
                                        marginLeft: '8px',
                                        fontSize: '12px',
                                        color: '#10b981'
                                    }}>
                                        ✓ LIVE
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div style={{ 
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '16px',
                            padding: '24px',
                            gridColumn: '1 / -1'
                        }}>
                            <h3 style={{ 
                                fontSize: '20px', 
                                fontWeight: 'bold', 
                                color: '#8b5cf6',
                                marginBottom: '16px'
                            }}>
                                📋 Recent Transactions
                            </h3>
                            
                            {liveData.transactions && liveData.transactions.length > 0 ? (
                                <div style={{ display: 'grid', gap: '12px' }}>
                                    {liveData.transactions.slice(0, 5).map((tx: any, i: number) => (
                                        <div key={i} style={{ 
                                            background: 'rgba(0,0,0,0.3)',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            display: 'grid',
                                            gridTemplateColumns: 'auto 1fr auto',
                                            gap: '16px',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                                                {new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString()}
                                            </div>
                                            <div style={{ 
                                                fontFamily: 'monospace', 
                                                fontSize: '12px',
                                                color: '#e2e8f0'
                                            }}>
                                                {tx.hash}
                                            </div>
                                            <div style={{ 
                                                fontSize: '12px',
                                                color: tx.txreceipt_status === '1' ? '#10b981' : '#ef4444'
                                            }}>
                                                {tx.txreceipt_status === '1' ? '✅' : '❌'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ color: '#94a3b8', textAlign: 'center', padding: '24px' }}>
                                    No transaction data available
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* API Status */}
                <div style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginTop: '24px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#94a3b8',
                        marginBottom: '16px'
                    }}>
                        🔗 API Status
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div style={{ 
                            color: liveData?.apiStatus?.etherscan === 'operational' ? '#10b981' : '#ef4444'
                        }}>
                            {liveData?.apiStatus?.etherscan === 'operational' ? '✅' : '❌'} Etherscan API
                        </div>
                        <div style={{ 
                            color: liveData?.apiStatus?.coingecko === 'operational' ? '#10b981' : '#f59e0b'
                        }}>
                            {liveData?.apiStatus?.coingecko === 'operational' ? '✅' : '⚠️'} CoinGecko Pro API
                        </div>
                        <div style={{ 
                            color: liveData?.apiStatus?.alchemy === 'available' ? '#10b981' : '#94a3b8'
                        }}>
                            {liveData?.apiStatus?.alchemy === 'available' ? '✅' : '○'} Alchemy API
                        </div>
                        <div style={{ color: '#10b981' }}>
                            ✅ Real-time Portfolio Tracking
                        </div>
                    </div>
                    
                    {liveData && (
                        <div style={{ 
                            marginTop: '16px',
                            textAlign: 'center',
                            color: '#64748b',
                            fontSize: '14px'
                        }}>
                            Last updated: {new Date(liveData.timestamp).toLocaleString()} • Network: {liveData.network}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}