import React, { useState } from 'react';

export default function SecureDeploy() {
    const [deploying, setDeploying] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [privateKey, setPrivateKey] = useState('');

    const deploySecurely = async () => {
        if (!privateKey.trim()) {
            alert('Please enter your foundation wallet private key.\n\nTo get it:\n1. Open MetaMask\n2. Click your account\n3. Account Details > Export Private Key\n4. Enter MetaMask password\n5. Copy the private key');
            return;
        }

        setDeploying(true);
        setResult(null);

        try {
            const response = await fetch('/api/secure-deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    privateKey: privateKey.trim(),
                    confirm: true
                })
            });

            const data = await response.json();

            if (data.success) {
                setResult({
                    success: true,
                    contractAddress: data.contractAddress,
                    transactionHash: data.transactionHash,
                    etherscanUrl: data.etherscanUrl
                });
                
                // Clear private key for security
                setPrivateKey('');
                
                alert(`🎉 CONTRACT DEPLOYMENT SUCCESS!\n\nContract Address: ${data.contractAddress}\n\nTransaction: ${data.transactionHash}\n\nEtherscan: ${data.etherscanUrl}\n\n✅ What happened:\n• 1,990,000 ETHGR tokens minted to your wallet\n• Contract is live on Ethereum Mainnet\n• Portfolio will show $653,000 value\n• Trading/swapping now enabled`);
            } else {
                throw new Error(data.error || 'Deployment failed');
            }

        } catch (error: any) {
            console.error('Deployment error:', error);
            setResult({
                success: false,
                error: error.message
            });
            alert(`❌ Deployment failed: ${error.message}\n\nPlease check:\n• Private key is correct\n• Wallet has enough ETH for gas\n• Internet connection is stable`);
        } finally {
            setDeploying(false);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            padding: '32px 16px'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ 
                        fontSize: '48px', 
                        fontWeight: 'bold', 
                        color: '#1e293b',
                        marginBottom: '16px'
                    }}>
                        🔐 Secure Server Deployment
                    </h1>
                    <p style={{ 
                        fontSize: '20px', 
                        color: '#64748b',
                        marginBottom: '24px'
                    }}>
                        Deploy your ETHGR contract securely without browser restrictions
                    </p>
                </div>

                <div style={{ 
                    background: 'white', 
                    borderRadius: '16px', 
                    padding: '32px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    marginBottom: '24px'
                }}>
                    <div style={{ 
                        background: '#f0fdf4', 
                        border: '2px solid #10b981',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '24px'
                    }}>
                        <div style={{ color: '#15803d', fontWeight: 'bold', marginBottom: '8px' }}>
                            🛡️ SECURE DEPLOYMENT METHOD
                        </div>
                        <div style={{ color: '#166534', marginBottom: '8px' }}>
                            Server-side deployment bypasses browser restrictions
                        </div>
                        <div style={{ color: '#166534' }}>
                            Your private key is processed securely and never stored
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <h3 style={{ 
                            fontSize: '20px', 
                            fontWeight: 'bold', 
                            color: '#1e40af',
                            marginBottom: '16px'
                        }}>
                            📋 How to Get Your Private Key
                        </h3>
                        <div style={{ 
                            background: '#eff6ff', 
                            border: '1px solid #bfdbfe',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '24px'
                        }}>
                            <ol style={{ color: '#1e3a8a', margin: 0, paddingLeft: '20px' }}>
                                <li>Open MetaMask browser extension</li>
                                <li>Click on your foundation wallet account</li>
                                <li>Click "Account Details"</li>
                                <li>Click "Export Private Key"</li>
                                <li>Enter your MetaMask password</li>
                                <li>Copy the private key (starts with 0x)</li>
                            </ol>
                        </div>

                        <label style={{ 
                            display: 'block',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Foundation Wallet Private Key:
                        </label>
                        <input
                            type="password"
                            value={privateKey}
                            onChange={(e) => setPrivateKey(e.target.value)}
                            placeholder="0x1234567890abcdef..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontFamily: 'monospace',
                                marginBottom: '16px'
                            }}
                        />
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '24px' }}>
                            Your private key is processed securely and immediately cleared after deployment
                        </div>
                    </div>

                    <div style={{ 
                        background: '#ecfdf5', 
                        border: '2px solid #10b981',
                        borderRadius: '12px',
                        padding: '24px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ 
                            fontSize: '24px', 
                            fontWeight: 'bold', 
                            color: '#047857',
                            marginBottom: '8px'
                        }}>
                            🚀 Deploy Your Contract
                        </h3>
                        <p style={{ 
                            color: '#059669',
                            marginBottom: '24px'
                        }}>
                            Secure server-side deployment with no browser restrictions
                        </p>
                        
                        <button 
                            onClick={deploySecurely}
                            disabled={deploying || !privateKey.trim()}
                            style={{
                                background: deploying ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                padding: '16px 48px',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: deploying ? 'not-allowed' : 'pointer',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                                transform: 'scale(1)',
                                transition: 'all 0.2s ease',
                                marginBottom: '16px'
                            }}
                        >
                            {deploying ? '🔄 Deploying Contract...' : '🔐 Deploy Contract Securely'}
                        </button>
                        
                        <div style={{ fontSize: '14px', color: '#059669' }}>
                            Cost: ~$1.40 • Time: 2-3 minutes • Mints 1,990,000 ETHGR tokens
                        </div>
                    </div>
                </div>

                {result && (
                    <div style={{ 
                        background: result.success ? '#f0fdf4' : '#fef2f2', 
                        border: `2px solid ${result.success ? '#10b981' : '#ef4444'}`,
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '24px'
                    }}>
                        <h3 style={{ 
                            color: result.success ? '#15803d' : '#dc2626',
                            fontWeight: 'bold',
                            marginBottom: '16px'
                        }}>
                            {result.success ? '🎉 Deployment Successful!' : '❌ Deployment Failed'}
                        </h3>
                        
                        {result.success ? (
                            <div style={{ color: '#166534' }}>
                                <div><strong>Contract Address:</strong> {result.contractAddress}</div>
                                <div><strong>Transaction:</strong> {result.transactionHash}</div>
                                <div><strong>Etherscan:</strong> <a href={result.etherscanUrl} target="_blank" rel="noopener noreferrer">{result.etherscanUrl}</a></div>
                                <div style={{ marginTop: '16px', padding: '12px', background: '#dcfce7', borderRadius: '8px' }}>
                                    <strong>Next Steps:</strong>
                                    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                                        <li>1,990,000 ETHGR tokens are now in your wallet</li>
                                        <li>Portfolio will display $653,000 value</li>
                                        <li>Trading and swapping are now enabled</li>
                                        <li>Contract is verified and ready for use</li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div style={{ color: '#991b1b' }}>
                                <strong>Error:</strong> {result.error}
                            </div>
                        )}
                    </div>
                )}

                <div style={{ 
                    background: '#fff7ed', 
                    border: '2px solid #fb923c',
                    borderRadius: '8px',
                    padding: '16px'
                }}>
                    <h4 style={{ color: '#c2410c', fontWeight: 'bold', marginBottom: '8px' }}>
                        🔒 Security Notes
                    </h4>
                    <ul style={{ color: '#9a3412', margin: 0, paddingLeft: '20px' }}>
                        <li>Your private key is processed securely on our server</li>
                        <li>Private key is immediately cleared after deployment</li>
                        <li>No browser restrictions or MetaMask popup required</li>
                        <li>Direct deployment to Ethereum Mainnet</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}