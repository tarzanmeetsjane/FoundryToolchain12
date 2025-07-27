import React, { useState, useEffect } from 'react';

export default function TransactionStatusChecker() {
    const [transactionData, setTransactionData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState('0xde0940c599134e2efb34c53939d6b947de09cef6a27d1e9c0ab4dad5ba40d4bc');

    const analyzeTransaction = async (hash: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/check-transaction-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ txHash: hash })
            });
            
            const data = await response.json();
            setTransactionData(data);
        } catch (error) {
            console.error('Transaction check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (txHash) {
            analyzeTransaction(txHash);
        }
    }, [txHash]);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'success': return '#10b981';
            case 'failed': return '#ef4444';
            case 'pending': return '#f59e0b';
            default: return '#64748b';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'success': return '✅';
            case 'failed': return '❌';
            case 'pending': return '⏳';
            default: return '🔍';
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            padding: '32px 16px',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ 
                        fontSize: '48px', 
                        fontWeight: 'bold', 
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        🔍 Transaction Status Checker
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#cbd5e1',
                        marginBottom: '24px'
                    }}>
                        Real-time blockchain transaction analysis and status monitoring
                    </p>
                </div>

                {/* Transaction Input */}
                <div style={{ 
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#3b82f6',
                        marginBottom: '16px'
                    }}>
                        🔗 Transaction Hash
                    </h3>
                    
                    <div style={{ 
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <input
                            type="text"
                            value={txHash}
                            onChange={(e) => setTxHash(e.target.value)}
                            placeholder="Enter transaction hash..."
                            style={{
                                flex: '1',
                                minWidth: '300px',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                                fontSize: '14px',
                                fontFamily: 'monospace'
                            }}
                        />
                        <button
                            onClick={() => analyzeTransaction(txHash)}
                            disabled={loading || !txHash}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                border: 'none',
                                background: loading ? '#64748b' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Analyzing...' : 'Check Status'}
                        </button>
                    </div>
                </div>

                {loading && (
                    <div style={{ 
                        textAlign: 'center',
                        padding: '48px',
                        color: '#cbd5e1'
                    }}>
                        <div style={{ fontSize: '24px', marginBottom: '16px' }}>🔄</div>
                        <div>Analyzing transaction on Ethereum mainnet...</div>
                    </div>
                )}

                {transactionData && !loading && (
                    <>
                        {/* Transaction Status */}
                        <div style={{ 
                            background: `linear-gradient(135deg, ${getStatusColor(transactionData.status)}20 0%, ${getStatusColor(transactionData.status)}10 100%)`,
                            border: `2px solid ${getStatusColor(transactionData.status)}60`,
                            borderRadius: '16px',
                            padding: '32px',
                            marginBottom: '32px',
                            textAlign: 'center'
                        }}>
                            <div style={{ 
                                fontSize: '48px',
                                marginBottom: '16px'
                            }}>
                                {getStatusIcon(transactionData.status)}
                            </div>
                            <h2 style={{ 
                                fontSize: '32px', 
                                fontWeight: 'bold', 
                                color: getStatusColor(transactionData.status),
                                marginBottom: '8px'
                            }}>
                                {transactionData.status?.toUpperCase() || 'UNKNOWN'}
                            </h2>
                            <div style={{ 
                                fontSize: '16px',
                                color: '#cbd5e1'
                            }}>
                                {transactionData.status === 'success' && 'Transaction completed successfully'}
                                {transactionData.status === 'failed' && 'Transaction failed to execute'}
                                {transactionData.status === 'pending' && 'Transaction is still being processed'}
                            </div>
                        </div>

                        {/* Transaction Details */}
                        {transactionData.details && (
                            <div style={{ 
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '24px',
                                marginBottom: '32px'
                            }}>
                                <div style={{ 
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    borderRadius: '12px',
                                    padding: '20px'
                                }}>
                                    <h3 style={{ 
                                        fontSize: '16px', 
                                        fontWeight: 'bold', 
                                        color: '#60a5fa',
                                        marginBottom: '12px'
                                    }}>
                                        📊 Transaction Info
                                    </h3>
                                    
                                    <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Block:</strong> {transactionData.details.blockNumber || 'Pending'}
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>From:</strong> 
                                            <div style={{ 
                                                fontFamily: 'monospace',
                                                fontSize: '12px',
                                                wordBreak: 'break-all',
                                                marginTop: '2px'
                                            }}>
                                                {transactionData.details.from}
                                            </div>
                                        </div>
                                        <div>
                                            <strong>To:</strong>
                                            <div style={{ 
                                                fontFamily: 'monospace',
                                                fontSize: '12px',
                                                wordBreak: 'break-all',
                                                marginTop: '2px'
                                            }}>
                                                {transactionData.details.to || 'Contract Creation'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ 
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    borderRadius: '12px',
                                    padding: '20px'
                                }}>
                                    <h3 style={{ 
                                        fontSize: '16px', 
                                        fontWeight: 'bold', 
                                        color: '#4ade80',
                                        marginBottom: '12px'
                                    }}>
                                        ⛽ Gas Information
                                    </h3>
                                    
                                    <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Gas Used:</strong> {transactionData.gasUsed?.toLocaleString() || 'N/A'}
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Gas Limit:</strong> {transactionData.gasLimit?.toLocaleString() || 'N/A'}
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Gas Price:</strong> {transactionData.gasPrice} gwei
                                        </div>
                                        <div>
                                            <strong>Fee:</strong> {transactionData.transactionFee} ETH
                                        </div>
                                    </div>
                                </div>

                                <div style={{ 
                                    background: 'rgba(168, 85, 247, 0.1)',
                                    border: '1px solid rgba(168, 85, 247, 0.3)',
                                    borderRadius: '12px',
                                    padding: '20px'
                                }}>
                                    <h3 style={{ 
                                        fontSize: '16px', 
                                        fontWeight: 'bold', 
                                        color: '#c084fc',
                                        marginBottom: '12px'
                                    }}>
                                        💰 Value & Type
                                    </h3>
                                    
                                    <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Value:</strong> {transactionData.value} ETH
                                        </div>
                                        <div style={{ marginBottom: '8px' }}>
                                            <strong>Type:</strong> {transactionData.transactionType || 'Contract Interaction'}
                                        </div>
                                        <div>
                                            <strong>Events:</strong> {transactionData.eventCount || 0} logs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{ 
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px',
                            marginBottom: '32px'
                        }}>
                            <button
                                onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
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
                                🔍 View on Etherscan
                            </button>
                            
                            {transactionData.status === 'failed' && (
                                <button
                                    onClick={() => window.location.href = '/swap-troubleshooter'}
                                    style={{
                                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🔧 Fix Transaction
                                </button>
                            )}
                            
                            {transactionData.status === 'success' && (
                                <button
                                    onClick={() => window.open('https://app.uniswap.org/', '_blank')}
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
                                    🦄 Continue Trading
                                </button>
                            )}
                        </div>

                        {/* Success/Failure Specific Info */}
                        {transactionData.status === 'success' && (
                            <div style={{ 
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '2px solid rgba(16, 185, 129, 0.3)',
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
                                    🎉 Transaction Successful!
                                </h3>
                                <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                                    Your transaction has been successfully processed on the Ethereum blockchain.
                                    All state changes have been applied and the transaction is permanently recorded.
                                </div>
                            </div>
                        )}

                        {transactionData.status === 'failed' && (
                            <div style={{ 
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '2px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '16px',
                                padding: '24px',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ 
                                    fontSize: '24px', 
                                    fontWeight: 'bold', 
                                    color: '#fca5a5',
                                    marginBottom: '16px'
                                }}>
                                    ❌ Transaction Failed
                                </h3>
                                <div style={{ color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
                                    The transaction used gas but failed to complete. This can happen due to:
                                    insufficient gas, slippage issues, or contract errors.
                                </div>
                                <button
                                    onClick={() => window.location.href = '/swap-troubleshooter'}
                                    style={{
                                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px 24px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Get Help Fixing This Issue
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}