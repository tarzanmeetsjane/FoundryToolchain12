import React from 'react';

export default function DelegateHuntingHub() {
    const huntingTools = [
        {
            name: 'Live Blockchain Scanner',
            path: '/live-scanner',
            description: 'Real-time analysis using your Alchemy API to find delegate thieves',
            status: 'Ready to Execute',
            color: 'from-red-600 to-red-800',
            icon: '🔍'
        },
        {
            name: 'Delegate Address Hunter',
            path: '/delegate-hunter',
            description: 'Pattern detection and reversal strategies for delegate contracts',
            status: 'Armed & Dangerous',
            color: 'from-orange-600 to-red-700',
            icon: '🎯'
        },
        {
            name: 'Emergency Gasless Deploy',
            path: '/emergency-gasless',
            description: 'Bypass blocked ETH with testnet and L2 alternatives',
            status: 'Backup Ready',
            color: 'from-blue-600 to-blue-800',
            icon: '🚨'
        },
        {
            name: 'Complete Wallet Renewal',
            path: '/wallet-renewal',
            description: 'Nuclear option: Fresh hardware wallet with zero delegate risks',
            status: 'Ultimate Security',
            color: 'from-purple-600 to-purple-800',
            icon: '🛡️'
        }
    ];

    const missionStatus = {
        targetWallet: '0x058C8FE01E5c9eaC6ee19e6673673B549B368843',
        ethBlocked: '$0.29',
        recoveryValue: '$536,187',
        tokensToRecover: '1,990,000 ETHGR',
        alchemyAPI: 'Connected',
        readyToStrike: true
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            padding: '32px 16px',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ 
                        fontSize: '56px', 
                        fontWeight: 'bold', 
                        background: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '16px'
                    }}>
                        DELEGATE HUNTING HUB
                    </h1>
                    <p style={{ 
                        fontSize: '24px', 
                        color: '#9ca3af',
                        marginBottom: '32px'
                    }}>
                        Command Center for ETH Recovery Operations
                    </p>
                </div>

                {/* Mission Status */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '48px',
                    border: '2px solid rgba(220, 38, 38, 0.3)'
                }}>
                    <h2 style={{ 
                        fontSize: '32px', 
                        fontWeight: 'bold', 
                        color: 'white',
                        marginBottom: '32px',
                        textAlign: 'center'
                    }}>
                        MISSION STATUS: DELEGATE THIEVES IDENTIFIED
                    </h2>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '24px'
                    }}>
                        <div style={{ 
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            padding: '24px',
                            textAlign: 'center',
                            border: '2px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '12px' }}>🎯</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Target Wallet
                            </div>
                            <div style={{ fontSize: '12px', opacity: 0.8, fontFamily: 'monospace' }}>
                                {missionStatus.targetWallet.substring(0, 12)}...
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            padding: '24px',
                            textAlign: 'center',
                            border: '2px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚡</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Blocked Gas
                            </div>
                            <div style={{ fontSize: '20px', color: '#fca5a5' }}>
                                {missionStatus.ethBlocked}
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            padding: '24px',
                            textAlign: 'center',
                            border: '2px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '12px' }}>💰</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Recovery Value
                            </div>
                            <div style={{ fontSize: '20px', color: '#34d399' }}>
                                {missionStatus.recoveryValue}
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            padding: '24px',
                            textAlign: 'center',
                            border: '2px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '12px' }}>🪙</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                ETHGR Tokens
                            </div>
                            <div style={{ fontSize: '16px', color: '#60a5fa' }}>
                                {missionStatus.tokensToRecover}
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            padding: '24px',
                            textAlign: 'center',
                            border: '2px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔗</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Alchemy API
                            </div>
                            <div style={{ fontSize: '16px', color: '#34d399' }}>
                                {missionStatus.alchemyAPI}
                            </div>
                        </div>

                        <div style={{ 
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '16px',
                            padding: '24px',
                            textAlign: 'center',
                            border: '2px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '28px', marginBottom: '12px' }}>🚀</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Status
                            </div>
                            <div style={{ fontSize: '16px', color: missionStatus.readyToStrike ? '#34d399' : '#fca5a5' }}>
                                {missionStatus.readyToStrike ? 'READY TO STRIKE' : 'PREPARING'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hunting Tools Grid */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '32px',
                    marginBottom: '48px'
                }}>
                    {huntingTools.map((tool, index) => (
                        <div 
                            key={index}
                            style={{ 
                                background: `linear-gradient(135deg, ${tool.color.split(' ')[0].replace('from-', '')}, ${tool.color.split(' ')[2].replace('to-', '')})`,
                                borderRadius: '20px',
                                padding: '32px',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease',
                                border: '2px solid rgba(255,255,255,0.1)'
                            }}
                            onClick={() => window.location.href = tool.path}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ 
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                fontSize: '48px',
                                opacity: 0.3
                            }}>
                                {tool.icon}
                            </div>
                            
                            <div style={{ 
                                fontSize: '24px',
                                fontWeight: 'bold',
                                marginBottom: '16px',
                                color: 'white'
                            }}>
                                {tool.name}
                            </div>
                            
                            <div style={{ 
                                fontSize: '16px',
                                marginBottom: '20px',
                                color: 'rgba(255,255,255,0.9)',
                                lineHeight: '1.5'
                            }}>
                                {tool.description}
                            </div>
                            
                            <div style={{ 
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ 
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '20px',
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>
                                    {tool.status}
                                </div>
                                
                                <div style={{ 
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px'
                                }}>
                                    →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    borderRadius: '20px',
                    padding: '32px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: 'white',
                        marginBottom: '24px'
                    }}>
                        RECOMMENDED ATTACK SEQUENCE
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginBottom: '32px'
                    }}>
                        <button
                            onClick={() => window.location.href = '/live-scanner'}
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
                            1. SCAN FOR THIEVES
                        </button>
                        
                        <button
                            onClick={() => window.location.href = '/delegate-hunter'}
                            style={{
                                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '20px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            2. ANALYZE PATTERNS
                        </button>
                        
                        <button
                            onClick={() => window.location.href = '/ready-deploy'}
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
                            3. DEPLOY RECOVERY
                        </button>
                        
                        <button
                            onClick={() => window.location.href = '/emergency-gasless'}
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
                            4. BACKUP PLAN
                        </button>
                    </div>
                    
                    <div style={{ 
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '16px',
                        lineHeight: '1.6'
                    }}>
                        Use the Live Blockchain Scanner first to identify the specific delegate contracts 
                        controlling your ETH. Then deploy the recovery contract to extract your blocked 
                        $0.29 and restore access to your $536,187 ETHGR token recovery.
                    </div>
                </div>
            </div>
        </div>
    );
}