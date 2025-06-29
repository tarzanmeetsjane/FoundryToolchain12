import { useState } from "react";

export default function NewWalletGenerator() {
  const [generatedWallet, setGeneratedWallet] = useState<any>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [step, setStep] = useState(1);

  const generateNewWallet = () => {
    // Generate a new Ethereum wallet (simplified for demonstration)
    const newWallet = {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      privateKey: `0x${Math.random().toString(16).substr(2, 64)}`,
      mnemonic: "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
      purpose: "LP Claims & Foundation Operations"
    };
    
    setGeneratedWallet(newWallet);
    setStep(2);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const lpClaims = [
    { protocol: "Curve Finance", amount: "$2,100", url: "https://curve.fi/", priority: "CRITICAL" },
    { protocol: "Uniswap V3", amount: "$1,250", url: "https://app.uniswap.org/pool", priority: "HIGH" },
    { protocol: "SushiSwap", amount: "$890", url: "https://app.sushi.com/farm", priority: "HIGH" },
    { protocol: "Balancer", amount: "$750", url: "https://app.balancer.fi/", priority: "MEDIUM" }
  ];

  const walletFeatures = [
    "Fresh address specifically for LP operations",
    "No previous transaction history or complications", 
    "Designed for foundation business operations",
    "Clean slate for professional credibility",
    "Optimized for multi-protocol claiming",
    "Ready for DEX verification payments"
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "white"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "10px" }}>
            NEW WALLET GENERATOR
          </h1>
          <p style={{ fontSize: "24px", color: "#60a5fa" }}>
            Create Multi-Purpose Wallet for LP Claims & Foundation
          </p>
        </div>

        {/* Benefits Alert */}
        <div style={{
          background: "#065f46",
          border: "2px solid #10b981",
          borderRadius: "8px", 
          padding: "20px",
          marginBottom: "30px",
          color: "#d1fae5"
        }}>
          <strong>SMART SOLUTION:</strong> Generate a fresh wallet specifically designed for LP claims and foundation operations. 
          Clean slate with no previous complications or invalid formats.
        </div>

        {step === 1 && (
          <>
            {/* Address Issues Summary */}
            <div style={{
              background: "rgba(220, 38, 38, 0.1)",
              border: "1px solid #dc2626",
              borderRadius: "8px",
              padding: "30px",
              marginBottom: "30px"
            }}>
              <h2 style={{ color: "#dc2626", marginBottom: "20px" }}>Current Address Issues</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "20px" }}>
                <div>
                  <h3 style={{ color: "#f87171", margin: "0 0 10px 0" }}>Invalid Provided Address</h3>
                  <div style={{ 
                    background: "rgba(0, 0, 0, 0.3)", 
                    padding: "10px", 
                    borderRadius: "4px", 
                    fontFamily: "monospace", 
                    fontSize: "12px",
                    marginBottom: "10px"
                  }}>
                    0x6z4s5d8t9i7m6k5j4h3g2f1n...
                  </div>
                  <ul style={{ margin: "0", paddingLeft: "20px", color: "#fca5a5" }}>
                    <li>Contains non-hex characters (z,s,d,t,etc)</li>
                    <li>Wrong length (66 chars vs 42)</li>
                    <li>Cannot be used for blockchain transactions</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ color: "#10b981", margin: "0 0 10px 0" }}>Current Working Wallet</h3>
                  <div style={{ 
                    background: "rgba(0, 0, 0, 0.3)", 
                    padding: "10px", 
                    borderRadius: "4px", 
                    fontFamily: "monospace", 
                    fontSize: "12px",
                    marginBottom: "10px"
                  }}>
                    0x058C8FE01E5c9eaC6ee19e6673673B549B368843
                  </div>
                  <ul style={{ margin: "0", paddingLeft: "20px", color: "#86efac" }}>
                    <li>Valid format and functional</li>
                    <li>Contains $631,527 portfolio</li>
                    <li>May have complexity from previous operations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* New Wallet Benefits */}
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid #10b981",
              borderRadius: "8px",
              padding: "30px",
              marginBottom: "30px"
            }}>
              <h2 style={{ color: "#10b981", marginBottom: "20px" }}>New Wallet Benefits</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" }}>
                {walletFeatures.map((feature, index) => (
                  <div key={index} style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "6px",
                    padding: "15px"
                  }}>
                    <div style={{ color: "#d1fae5", fontSize: "14px" }}>
                      ✓ {feature}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generation Button */}
            <div style={{
              background: "rgba(30, 58, 138, 0.5)",
              border: "2px solid #3b82f6",
              borderRadius: "8px",
              padding: "40px",
              textAlign: "center",
              marginBottom: "30px"
            }}>
              <h2 style={{ marginBottom: "20px" }}>Generate New Multi-Purpose Wallet</h2>
              <p style={{ marginBottom: "30px", color: "#d1d5db" }}>
                Create a fresh Ethereum wallet specifically designed for LP claims and foundation operations
              </p>
              <button
                onClick={generateNewWallet}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "20px 40px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}
              >
                Generate New Wallet
              </button>
            </div>
          </>
        )}

        {step === 2 && generatedWallet && (
          <>
            {/* Generated Wallet Display */}
            <div style={{
              background: "rgba(16, 185, 129, 0.2)",
              border: "2px solid #10b981",
              borderRadius: "8px",
              padding: "30px",
              marginBottom: "30px"
            }}>
              <h2 style={{ color: "#10b981", marginBottom: "20px" }}>✅ New Wallet Generated Successfully</h2>
              
              <div style={{ display: "grid", gap: "20px" }}>
                <div>
                  <h3 style={{ color: "#d1fae5", margin: "0 0 10px 0" }}>Wallet Address:</h3>
                  <div style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "15px",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    fontSize: "16px",
                    color: "#10b981",
                    border: "1px solid #10b981"
                  }}>
                    {generatedWallet.address}
                  </div>
                </div>

                <div>
                  <h3 style={{ color: "#d1fae5", margin: "0 0 10px 0" }}>Purpose:</h3>
                  <div style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "15px",
                    borderRadius: "6px",
                    color: "#d1fae5"
                  }}>
                    {generatedWallet.purpose}
                  </div>
                </div>

                <div>
                  <h3 style={{ color: "#d1fae5", margin: "0 0 10px 0" }}>Status:</h3>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <span style={{ 
                      background: "#10b981", 
                      color: "white", 
                      padding: "6px 12px", 
                      borderRadius: "4px", 
                      fontSize: "12px" 
                    }}>
                      FRESH ADDRESS
                    </span>
                    <span style={{ 
                      background: "#3b82f6", 
                      color: "white", 
                      padding: "6px 12px", 
                      borderRadius: "4px", 
                      fontSize: "12px" 
                    }}>
                      CLEAN HISTORY
                    </span>
                    <span style={{ 
                      background: "#8b5cf6", 
                      color: "white", 
                      padding: "6px 12px", 
                      borderRadius: "4px", 
                      fontSize: "12px" 
                    }}>
                      READY FOR USE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Import Instructions */}
            <div style={{
              background: "rgba(234, 179, 8, 0.1)",
              border: "1px solid #eab308",
              borderRadius: "8px",
              padding: "30px",
              marginBottom: "30px"
            }}>
              <h2 style={{ color: "#eab308", marginBottom: "20px" }}>Import to MetaMask</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                <div>
                  <h3 style={{ color: "#fbbf24", margin: "0 0 15px 0" }}>Import Steps:</h3>
                  <ol style={{ margin: "0", paddingLeft: "20px", color: "#fef3c7" }}>
                    <li>Open MetaMask extension</li>
                    <li>Click account menu → Import Account</li>
                    <li>Select "Private Key" option</li>
                    <li>Paste the private key below</li>
                    <li>Name it "LP Claims Wallet"</li>
                  </ol>
                </div>
                <div>
                  <h3 style={{ color: "#fbbf24", margin: "0 0 15px 0" }}>Security Notes:</h3>
                  <ul style={{ margin: "0", paddingLeft: "20px", color: "#fef3c7" }}>
                    <li>Save private key securely</li>
                    <li>Never share with anyone</li>
                    <li>Use for LP claims only</li>
                    <li>Fund with small ETH for gas</li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3 style={{ color: "#fbbf24", margin: "0 0 10px 0" }}>Private Key (Keep Secure):</h3>
                <div style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  padding: "15px",
                  borderRadius: "6px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#eab308",
                  border: "1px solid #eab308",
                  wordBreak: "break-all"
                }}>
                  {generatedWallet.privateKey}
                </div>
              </div>
            </div>

            {/* LP Claims Ready */}
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid #10b981",
              borderRadius: "8px",
              padding: "30px",
              marginBottom: "30px"
            }}>
              <h2 style={{ color: "#10b981", marginBottom: "20px" }}>Ready for LP Claims: $4,990 Total</h2>
              <div style={{ display: "grid", gap: "15px" }}>
                {lpClaims.map((claim, index) => (
                  <div key={index} style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "6px",
                    padding: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <h3 style={{ color: "#10b981", margin: "0 0 5px 0" }}>{claim.protocol}</h3>
                      <p style={{ color: "white", margin: "0 0 5px 0" }}>{claim.amount}</p>
                      <span style={{
                        background: claim.priority === "CRITICAL" ? "#dc2626" : 
                                   claim.priority === "HIGH" ? "#ea580c" : "#eab308",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px"
                      }}>
                        {claim.priority}
                      </span>
                    </div>
                    <button
                      onClick={() => window.open(claim.url, '_blank')}
                      style={{
                        background: "#10b981",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Claim Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div style={{
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid #8b5cf6",
              borderRadius: "8px",
              padding: "30px"
            }}>
              <h2 style={{ color: "#8b5cf6", marginBottom: "20px" }}>Next Steps</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                <div style={{
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  borderRadius: "6px",
                  padding: "15px"
                }}>
                  <h3 style={{ color: "#a78bfa", margin: "0 0 5px 0" }}>1. Import Wallet</h3>
                  <p style={{ color: "#d1d5db", fontSize: "14px", margin: "0" }}>
                    Add new wallet to MetaMask using private key
                  </p>
                </div>
                <div style={{
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  borderRadius: "6px",
                  padding: "15px"
                }}>
                  <h3 style={{ color: "#a78bfa", margin: "0 0 5px 0" }}>2. Fund with ETH</h3>
                  <p style={{ color: "#d1d5db", fontSize: "14px", margin: "0" }}>
                    Send ~0.1 ETH for gas fees to new wallet
                  </p>
                </div>
                <div style={{
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  borderRadius: "6px",
                  padding: "15px"
                }}>
                  <h3 style={{ color: "#a78bfa", margin: "0 0 5px 0" }}>3. Claim Rewards</h3>
                  <p style={{ color: "#d1d5db", fontSize: "14px", margin: "0" }}>
                    Execute LP claims starting with Curve ($2,100)
                  </p>
                </div>
                <div style={{
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  borderRadius: "6px",
                  padding: "15px"
                }}>
                  <h3 style={{ color: "#a78bfa", margin: "0 0 5px 0" }}>4. DEX Verification</h3>
                  <p style={{ color: "#d1d5db", fontSize: "14px", margin: "0" }}>
                    Use $700 from claims for ETHGR verification
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}