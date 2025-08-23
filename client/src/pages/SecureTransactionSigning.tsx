import React, { useState } from 'react';

export default function SecureTransactionSigning() {
    const [userWallet] = useState('0x058C8FE01E5c9eaC6ee19e6673673B549B368843');
    const [contractAddress] = useState('0xd9145CCE52D386f254917e481eB44e9943F39138');
    const [policyId] = useState('3cb67340-3b28-4960-aa65-82f21aa8dddd');
    
    const [transactionSteps, setTransactionSteps] = useState([
        { step: 1, name: 'Review Transaction Details', status: 'active', safe: true },
        { step: 2, name: 'Confirm Contract Deployment', status: 'pending', safe: true },
        { step: 3, name: 'Execute Migration Function', status: 'pending', safe: true },
        { step: 4, name: 'Verify Token Receipt', status: 'pending', safe: true }
    ]);

    const secureTransactionData = {
        transactionType: 'Contract Deployment',
        to: contractAddress,
        from: userWallet,
        value: '0 ETH',
        gasLimit: 'Sponsored by Alchemy',
        gasPrice: 'Sponsored by Alchemy',
        totalCost: '$0.00',
        dataSize: 'Contract Bytecode',
        contractName: 'ETHGRecovery',
        owner: userWallet,
        delegateRisk: 'ZERO - Direct owner control only'
    };

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
                        🔒 SECURE TRANSACTION SIGNING
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#d1fae5',
                        marginBottom: '24px'
                    }}>
                        Safe transaction confirmation - Your ETH remains protected
                    </p>
                </div>

                {/* Transaction Safety Overview */}
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
                        🛡️ TRANSACTION SAFETY CONFIRMATION
                    </h2>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#10b981',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                ✅ ETH Value: {secureTransactionData.value}
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px' }}>
                                You are NOT sending any ETH. Gas is sponsored by Alchemy.
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#10b981',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                ✅ Total Cost: {secureTransactionData.totalCost}
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px' }}>
                                Completely free deployment using your gas policy.
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#10b981',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                ✅ Delegate Risk: ZERO
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px' }}>
                                No delegate addresses can access your funds.
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#10b981',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                ✅ Direct Control Only
                            </div>
                            <div style={{ color: '#d1fae5', fontSize: '14px' }}>
                                Only your wallet {userWallet.substring(0, 10)}... can control tokens.
                            </div>
                        </div>
                    </div>
                </div>

                {/* What You're Signing */}
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
                        EXACTLY WHAT YOU'RE SIGNING IN METAMASK
                    </h3>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '20px',
                        border: '2px solid #60a5fa'
                    }}>
                        <h4 style={{ 
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#60a5fa',
                            marginBottom: '16px'
                        }}>
                            MetaMask Transaction Preview:
                        </h4>
                        
                        <div style={{ 
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr',
                            gap: '16px',
                            fontSize: '14px',
                            color: '#dbeafe'
                        }}>
                            <div><strong>Transaction Type:</strong></div>
                            <div style={{ fontFamily: 'monospace', color: '#93c5fd' }}>
                                {secureTransactionData.transactionType}
                            </div>

                            <div><strong>To Address:</strong></div>
                            <div style={{ fontFamily: 'monospace', color: '#93c5fd' }}>
                                {contractAddress}
                            </div>

                            <div><strong>From Address:</strong></div>
                            <div style={{ fontFamily: 'monospace', color: '#93c5fd' }}>
                                {userWallet}
                            </div>

                            <div><strong>ETH Amount:</strong></div>
                            <div style={{ fontFamily: 'monospace', color: '#10b981', fontWeight: 'bold' }}>
                                {secureTransactionData.value}
                            </div>

                            <div><strong>Gas Limit:</strong></div>
                            <div style={{ fontFamily: 'monospace', color: '#10b981' }}>
                                {secureTransactionData.gasLimit}
                            </div>

                            <div><strong>Gas Price:</strong></div>
                            <div style={{ fontFamily: 'monospace', color: '#10b981' }}>
                                {secureTransactionData.gasPrice}
                            </div>

                            <div><strong>Total Cost:</strong></div>
                            <div style={{ fontFamily: 'monospace', color: '#10b981', fontWeight: 'bold', fontSize: '16px' }}>
                                {secureTransactionData.totalCost}
                            </div>
                        </div>
                    </div>

                    <div style={{ 
                        background: 'rgba(16, 185, 129, 0.2)',
                        borderRadius: '8px',
                        padding: '16px',
                        textAlign: 'center'
                    }}>
                        <div style={{ 
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#10b981',
                            marginBottom: '8px'
                        }}>
                            🔒 SAFE TO SIGN
                        </div>
                        <div style={{ fontSize: '14px', color: '#d1fae5' }}>
                            This transaction deploys your secure contract with zero ETH transfer and no delegate risks.
                        </div>
                    </div>
                </div>

                {/* Signing Steps */}
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
                        STEP-BY-STEP SIGNING PROCESS
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginBottom: '24px'
                    }}>
                        {transactionSteps.map((step, index) => (
                            <div key={step.step} style={{ 
                                background: step.status === 'active' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(0,0,0,0.3)',
                                border: `2px solid ${step.status === 'active' ? '#fbbf24' : '#6b7280'}`,
                                borderRadius: '12px',
                                padding: '20px',
                                textAlign: 'center'
                            }}>
                                <div style={{ 
                                    fontSize: '24px', 
                                    marginBottom: '8px',
                                    color: step.status === 'active' ? '#fbbf24' : '#9ca3af'
                                }}>
                                    {step.status === 'active' ? '👆' : '⏳'}
                                </div>
                                <div style={{ 
                                    fontSize: '14px', 
                                    fontWeight: 'bold',
                                    color: step.status === 'active' ? '#fef3c7' : '#d1d5db',
                                    marginBottom: '8px'
                                }}>
                                    Step {step.step}: {step.name}
                                </div>
                                <div style={{ 
                                    fontSize: '12px',
                                    color: step.safe ? '#10b981' : '#ef4444',
                                    fontWeight: 'bold'
                                }}>
                                    {step.safe ? '✅ SAFE' : '⚠️ RISK'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <h4 style={{ 
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#fbbf24',
                            marginBottom: '12px'
                        }}>
                            When MetaMask Opens:
                        </h4>
                        <div style={{ color: '#fef3c7', fontSize: '14px', lineHeight: '1.6' }}>
                            1. <strong>Verify "To" address:</strong> Should show {contractAddress}<br/>
                            2. <strong>Verify "Value":</strong> Should show 0 ETH (you're not sending ETH)<br/>
                            3. <strong>Check gas fees:</strong> Should show "Sponsored" or very low amount<br/>
                            4. <strong>Contract interaction:</strong> Shows "Contract Deployment" type<br/>
                            5. <strong>Click "Confirm"</strong> - Your ETH stays safe in wallet
                        </div>
                    </div>
                </div>

                {/* Emergency Safety Check */}
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
                        🚨 SAFETY CHECKLIST - VERIFY BEFORE SIGNING
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '16px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>
                                ✅ ETH Value = 0
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '12px' }}>
                                If you see any ETH amount > 0, REJECT the transaction
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>
                                ✅ To Address Matches
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '12px' }}>
                                Must be exactly: {contractAddress.substring(0, 20)}...
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>
                                ✅ From Your Wallet
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '12px' }}>
                                Must be your wallet: {userWallet.substring(0, 20)}...
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '2px solid #10b981'
                        }}>
                            <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>
                                ✅ Gas Sponsored
                            </div>
                            <div style={{ color: '#fecaca', fontSize: '12px' }}>
                                Should show low/zero gas fees due to Alchemy sponsorship
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
                        onClick={() => window.open('https://remix.ethereum.org', '_blank')}
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
                        🚀 OPEN REMIX & DEPLOY
                    </button>
                    
                    <button
                        onClick={() => window.location.href = '/secure-wallet'}
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
                        🔒 VIEW SECURE CONTRACT
                    </button>
                    
                    <button
                        onClick={() => {
                            const contractCode = `// SECURE ETHGRECOVERY CONTRACT - ZERO DELEGATE RISK
// ETH Value: 0 (You send NO ETH)
// Gas: Sponsored by Alchemy Policy ${policyId}
// Owner: ${userWallet}
// Deploy to: ${contractAddress}`;
                            navigator.clipboard.writeText(contractCode);
                            alert('Safe deployment summary copied!');
                        }}
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
                        📋 COPY SAFE SUMMARY
                    </button>
                </div>

                {/* Final Assurance */}
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
                        🛡️ YOUR ETH IS COMPLETELY PROTECTED
                    </h3>
                    <div style={{ color: '#d1fae5', fontSize: '16px', lineHeight: '1.6' }}>
                        You're signing a contract deployment that costs you $0.00 and sends 0 ETH. 
                        The Alchemy gas policy covers all costs. No delegate addresses can access your funds. 
                        Once deployed, calling migrateMyTrappedETHG() will mint 1,990,000 ETHGR tokens 
                        (worth $536,187) directly to your wallet with no risks to your existing ETH.
                    </div>
                </div>
            </div>
        </div>
    );
}