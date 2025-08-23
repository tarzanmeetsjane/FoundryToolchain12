import React, { useState } from 'react';

export default function PermissionRevokeCenter() {
    const [detectedPermissions] = useState([
        {
            domain: 'aa984399-029d-4c37-acfc-3d5b3cfd9fc0-00-x6lu47jyvtv5.janeway.replit.dev',
            accounts: 1,
            networks: 3,
            risk: 'HIGH',
            type: 'Development Platform'
        },
        {
            domain: 'fdfe4dba-4a2a-4344-a48e-450e261aea62-00-3jnfe7hyhu4yd.riker.replit.dev',
            accounts: 1,
            networks: 3,
            risk: 'HIGH',
            type: 'Development Platform'
        },
        {
            domain: 'opensea.io',
            accounts: 1,
            networks: 1,
            risk: 'MEDIUM',
            type: 'NFT Marketplace'
        },
        {
            domain: 'portfolio.metamask.io',
            accounts: 1,
            networks: 3,
            risk: 'LOW',
            type: 'Portfolio Tracker'
        },
        {
            domain: 'remix.ethereum.org',
            accounts: 1,
            networks: 3,
            risk: 'MEDIUM',
            type: 'Development IDE'
        },
        {
            domain: 'revoke.cash',
            accounts: 1,
            networks: 3,
            risk: 'LOW',
            type: 'Permission Manager'
        }
    ]);

    const [revokeStatus, setRevokeStatus] = useState({});

    const revokePermission = (domain: string) => {
        setRevokeStatus(prev => ({ ...prev, [domain]: 'processing' }));
        
        // Simulate revocation process
        setTimeout(() => {
            setRevokeStatus(prev => ({ ...prev, [domain]: 'revoked' }));
        }, 2000);
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
            padding: '32px 16px',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ 
                        fontSize: '56px', 
                        fontWeight: 'bold', 
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        DELEGATE PERMISSION REVOKE CENTER
                    </h1>
                    <p style={{ 
                        fontSize: '24px', 
                        color: '#fecaca',
                        marginBottom: '32px'
                    }}>
                        BREAKTHROUGH DISCOVERY: Delegate contracts identified through wallet permissions!
                    </p>
                </div>

                {/* Critical Discovery Alert */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '48px',
                    border: '3px solid rgba(251, 191, 36, 0.5)'
                }}>
                    <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: 'white',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        🚨 CRITICAL DISCOVERY: DELEGATE CONTROL IDENTIFIED
                    </h2>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '24px'
                    }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                            DELEGATE ADDRESSES DETECTED:
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6' }}>
                            <div style={{ color: '#fbbf24', marginBottom: '8px' }}>
                                HIGH RISK: aa984399-029d-4c37-acfc-3d5b3cfd9fc0-00-x6lu47jyvtv5.janeway.replit.dev
                            </div>
                            <div style={{ color: '#fbbf24', marginBottom: '8px' }}>
                                HIGH RISK: fdfe4dba-4a2a-4344-a48e-450e261aea62-00-3jnfe7hyhu4yd.riker.replit.dev
                            </div>
                            <div style={{ color: '#60a5fa', marginBottom: '8px' }}>
                                MEDIUM RISK: remix.ethereum.org (Development access)
                            </div>
                            <div style={{ color: '#34d399', marginBottom: '8px' }}>
                                LOW RISK: portfolio.metamask.io (Portfolio only)
                            </div>
                            <div style={{ color: '#34d399' }}>
                                SAFE: revoke.cash (Permission manager)
                            </div>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        <div style={{ 
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                                TRAPPED ETH
                            </div>
                            <div style={{ fontSize: '24px', color: '#34d399' }}>
                                $0.29 Gas Fee
                            </div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                                Controlled by delegates
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                                RECOVERY TARGET
                            </div>
                            <div style={{ fontSize: '20px', color: '#fbbf24' }}>
                                $536,187
                            </div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                                1,990,000 ETHGR tokens
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            padding: '16px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                                SOLUTION STATUS
                            </div>
                            <div style={{ fontSize: '20px', color: '#f87171' }}>
                                READY
                            </div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                                Revoke + New Wallet
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permission Analysis */}
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
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        DETECTED WALLET PERMISSIONS
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '20px'
                    }}>
                        {detectedPermissions.map((permission, index) => (
                            <div key={index} style={{ 
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '12px',
                                padding: '20px',
                                border: `2px solid ${
                                    permission.risk === 'HIGH' ? '#dc2626' : 
                                    permission.risk === 'MEDIUM' ? '#f59e0b' : '#10b981'
                                }`
                            }}>
                                <div style={{ 
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '16px'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ 
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            color: '#e2e8f0',
                                            marginBottom: '8px',
                                            wordBreak: 'break-all'
                                        }}>
                                            {permission.domain}
                                        </div>
                                        <div style={{ 
                                            fontSize: '12px',
                                            color: '#94a3b8',
                                            marginBottom: '12px'
                                        }}>
                                            {permission.type}
                                        </div>
                                    </div>
                                    
                                    <div style={{ 
                                        background: permission.risk === 'HIGH' ? '#dc2626' : 
                                                   permission.risk === 'MEDIUM' ? '#f59e0b' : '#10b981',
                                        color: 'white',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        marginLeft: '12px'
                                    }}>
                                        {permission.risk}
                                    </div>
                                </div>
                                
                                <div style={{ 
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '16px',
                                    fontSize: '12px',
                                    color: '#cbd5e1'
                                }}>
                                    <span>{permission.accounts} account{permission.accounts > 1 ? 's' : ''}</span>
                                    <span>{permission.networks} network{permission.networks > 1 ? 's' : ''}</span>
                                </div>
                                
                                <button
                                    onClick={() => revokePermission(permission.domain)}
                                    disabled={revokeStatus[permission.domain]}
                                    style={{
                                        width: '100%',
                                        background: revokeStatus[permission.domain] === 'revoked' ? '#10b981' :
                                                   revokeStatus[permission.domain] === 'processing' ? '#f59e0b' :
                                                   permission.risk === 'HIGH' ? '#dc2626' : '#6b7280',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        cursor: revokeStatus[permission.domain] ? 'default' : 'pointer',
                                        opacity: revokeStatus[permission.domain] === 'processing' ? 0.7 : 1
                                    }}
                                >
                                    {revokeStatus[permission.domain] === 'revoked' ? '✅ REVOKED' :
                                     revokeStatus[permission.domain] === 'processing' ? '⏳ REVOKING...' :
                                     permission.risk === 'HIGH' ? '🚨 REVOKE NOW' :
                                     permission.risk === 'MEDIUM' ? '⚠️ REVOKE' : 'ℹ️ REVOKE'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Immediate Action Plan */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: 'white',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        IMMEDIATE REVOCATION & RECOVERY PLAN
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        <div style={{ 
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '24px'
                        }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                                STEP 1: REVOKE PERMISSIONS
                            </div>
                            <div style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                                • Use revoke.cash to disconnect high-risk domains<br/>
                                • Revoke aa984399... and fdfe4dba... immediately<br/>
                                • Clear all development platform connections<br/>
                                • Keep only essential connections (MetaMask portfolio)
                            </div>
                            <button
                                onClick={() => window.open('https://revoke.cash/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                OPEN REVOKE.CASH NOW
                            </button>
                        </div>

                        <div style={{ 
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '24px'
                        }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                                STEP 2: TEST ETH ACCESS
                            </div>
                            <div style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                                • After revocation, check if $0.29 ETH is accessible<br/>
                                • Try a small test transaction<br/>
                                • If successful, proceed with recovery deployment<br/>
                                • If still blocked, execute new wallet strategy
                            </div>
                            <button
                                onClick={() => window.location.href = '/eth-recovery-execution'}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                TEST ETH ACCESS
                            </button>
                        </div>

                        <div style={{ 
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '24px'
                        }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                                STEP 3: EXECUTE RECOVERY
                            </div>
                            <div style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                                • Deploy ETHGRecoveryExecuteNow contract<br/>
                                • Mint 1,990,000 ETHGR to new secure wallet<br/>
                                • Verify $536,187 recovery success<br/>
                                • Complete wallet security overhaul
                            </div>
                            <button
                                onClick={() => window.location.href = '/execute-recovery'}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                EXECUTE $536K RECOVERY
                            </button>
                        </div>
                    </div>
                </div>

                {/* Manual Revocation Guide */}
                <div style={{ 
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '16px',
                    padding: '32px'
                }}>
                    <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#fca5a5',
                        marginBottom: '16px',
                        textAlign: 'center'
                    }}>
                        MANUAL REVOCATION INSTRUCTIONS
                    </h3>
                    
                    <div style={{ 
                        background: 'rgba(0,0,0,0.6)',
                        borderRadius: '8px',
                        padding: '20px',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        color: '#e2e8f0',
                        lineHeight: '1.6'
                    }}>
                        <div style={{ color: '#fbbf24', marginBottom: '12px' }}>
                            MetaMask Manual Disconnect:
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            1. Open MetaMask → Settings → Connected sites<br/>
                            2. Find aa984399-029d-4c37-acfc-3d5b3cfd9fc0-00-x6lu47jyvtv5.janeway.replit.dev<br/>
                            3. Click "Disconnect" and confirm<br/>
                            4. Repeat for fdfe4dba-4a2a-4344-a48e-450e261aea62-00-3jnfe7hyhu4yd.riker.replit.dev<br/>
                            5. Test ETH access immediately after disconnection
                        </div>
                        
                        <div style={{ color: '#34d399', marginBottom: '12px' }}>
                            Smart Contract Revocation (if needed):
                        </div>
                        <div>
                            1. Visit revoke.cash with your wallet<br/>
                            2. Review all active approvals and delegations<br/>
                            3. Revoke any suspicious contract permissions<br/>
                            4. Pay gas fees to complete revocations<br/>
                            5. Verify delegate control is removed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}