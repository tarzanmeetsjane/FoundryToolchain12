import { useState } from "react";

export default function SimpleClaims() {
  const [connected, setConnected] = useState(false);
  const [claimed, setClaimed] = useState<string[]>([]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setConnected(true);
      } else {
        window.open('https://metamask.io/download/', '_blank');
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const claims = [
    {
      name: "Curve Finance",
      amount: "$2,100 CRV",
      url: "https://curve.fi/",
      priority: "CRITICAL"
    },
    {
      name: "Uniswap V3",
      amount: "$1,250 UNI", 
      url: "https://app.uniswap.org/pool",
      priority: "HIGH"
    },
    {
      name: "SushiSwap",
      amount: "$890 SUSHI",
      url: "https://app.sushi.com/farm",
      priority: "HIGH"
    },
    {
      name: "Balancer",
      amount: "$750 BAL",
      url: "https://app.balancer.fi/",
      priority: "MEDIUM"
    }
  ];

  const totalValue = claims.reduce((sum, claim) => {
    const value = parseInt(claim.amount.replace(/[^0-9]/g, ''));
    return sum + value;
  }, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ 
            fontSize: "48px", 
            color: "white", 
            fontWeight: "bold",
            marginBottom: "10px"
          }}>
            IMMEDIATE LP CLAIMS
          </h1>
          <p style={{ 
            fontSize: "24px", 
            color: "#60a5fa",
            margin: "0"
          }}>
            Claim ${totalValue.toLocaleString()} in LP Rewards
          </p>
        </div>

        {/* Status Alert */}
        <div style={{
          background: "#065f46",
          border: "2px solid #10b981",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
          color: "#d1fae5"
        }}>
          <strong>EXECUTION READY:</strong> Connect wallet and claim rewards directly. 
          Use verified wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
        </div>

        {/* Wallet Connection */}
        <div style={{
          background: "rgba(30, 58, 138, 0.5)",
          border: "2px solid #3b82f6",
          borderRadius: "8px",
          padding: "30px",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>Wallet Connection</h2>
          {!connected ? (
            <>
              <p style={{ color: "#d1d5db", marginBottom: "20px" }}>
                Connect MetaMask with verified wallet address
              </p>
              <button
                onClick={connectWallet}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "15px 30px",
                  fontSize: "18px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => e.target.style.background = "#2563eb"}
                onMouseOut={(e) => e.target.style.background = "#3b82f6"}
              >
                Connect MetaMask
              </button>
            </>
          ) : (
            <div style={{ color: "#10b981", fontSize: "18px", fontWeight: "bold" }}>
              ✓ Wallet Connected - Ready for Claims
            </div>
          )}
        </div>

        {/* LP Claims */}
        <div style={{
          background: "rgba(5, 150, 105, 0.1)",
          border: "1px solid #10b981",
          borderRadius: "8px",
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{ color: "white", marginBottom: "25px" }}>
            LP Rewards ({claimed.length}/4 Complete)
          </h2>
          
          <div style={{ display: "grid", gap: "20px" }}>
            {claims.map((claim, index) => (
              <div key={index} style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "6px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <h3 style={{ 
                    color: "#10b981", 
                    fontSize: "20px", 
                    fontWeight: "bold",
                    margin: "0 0 5px 0"
                  }}>
                    {claim.name}
                  </h3>
                  <p style={{ 
                    color: "white", 
                    fontSize: "16px",
                    margin: "0 0 5px 0"
                  }}>
                    {claim.amount}
                  </p>
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
                
                <div style={{ display: "flex", gap: "10px" }}>
                  {claimed.includes(claim.name) ? (
                    <div style={{ 
                      color: "#10b981", 
                      fontSize: "24px",
                      fontWeight: "bold"
                    }}>
                      ✓
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => window.open(claim.url, '_blank')}
                        disabled={!connected}
                        style={{
                          background: connected ? "#10b981" : "#6b7280",
                          color: "white",
                          padding: "10px 20px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: connected ? "pointer" : "not-allowed"
                        }}
                        onMouseOver={(e) => {
                          if (connected) e.target.style.background = "#059669";
                        }}
                        onMouseOut={(e) => {
                          if (connected) e.target.style.background = "#10b981";
                        }}
                      >
                        Claim Now
                      </button>
                      <button
                        onClick={() => setClaimed(prev => [...prev, claim.name])}
                        style={{
                          background: "transparent",
                          color: "#d1d5db",
                          padding: "10px 15px",
                          border: "1px solid #6b7280",
                          borderRadius: "4px",
                          cursor: "pointer"
                        }}
                      >
                        Mark Done
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {claimed.length > 0 && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              background: "rgba(16, 185, 129, 0.2)",
              borderRadius: "6px",
              color: "#10b981",
              fontWeight: "bold"
            }}>
              Progress: {claimed.length}/4 protocols claimed
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div style={{
          background: "rgba(124, 58, 237, 0.1)",
          border: "1px solid #8b5cf6",
          borderRadius: "8px",
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>Next Steps</h2>
          <div style={{ display: "grid", gap: "15px" }}>
            <div style={{
              padding: "15px",
              background: "rgba(124, 58, 237, 0.1)",
              borderRadius: "6px"
            }}>
              <h3 style={{ color: "#a78bfa", margin: "0 0 5px 0" }}>Convert to ETH</h3>
              <p style={{ color: "#d1d5db", fontSize: "14px", margin: "0 0 10px 0" }}>
                Swap reward tokens for ETH on Uniswap
              </p>
              <button
                onClick={() => window.open('https://app.uniswap.org/swap', '_blank')}
                disabled={claimed.length === 0}
                style={{
                  background: claimed.length > 0 ? "#8b5cf6" : "#6b7280",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: claimed.length > 0 ? "pointer" : "not-allowed"
                }}
              >
                Open Uniswap
              </button>
            </div>
            
            <div style={{
              padding: "15px",
              background: "rgba(16, 185, 129, 0.1)",
              borderRadius: "6px"
            }}>
              <h3 style={{ color: "#10b981", margin: "0 0 5px 0" }}>DEX Verification</h3>
              <p style={{ color: "#d1d5db", fontSize: "14px", margin: "0 0 10px 0" }}>
                Pay $700 for ETHGR token verification
              </p>
              <button
                onClick={() => window.open('https://dexscreener.com/submit-info', '_blank')}
                disabled={claimed.length < 2}
                style={{
                  background: claimed.length >= 2 ? "#10b981" : "#6b7280",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: claimed.length >= 2 ? "pointer" : "not-allowed"
                }}
              >
                DEX Screener
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: "grid",
          gridTemplateColumns: connected ? "repeat(4, 1fr)" : "1fr",
          gap: "15px",
          marginBottom: "30px"
        }}>
          {!connected ? (
            <button
              onClick={connectWallet}
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "30px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              Connect Wallet First
            </button>
          ) : (
            <>
              <button
                onClick={() => window.open('https://curve.fi/', '_blank')}
                style={{
                  background: "#dc2626",
                  color: "white",
                  padding: "30px 15px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Curve $2,100
              </button>
              <button
                onClick={() => window.open('https://app.uniswap.org/pool', '_blank')}
                style={{
                  background: "#7c3aed",
                  color: "white",
                  padding: "30px 15px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Uniswap $1,250
              </button>
              <button
                onClick={() => window.open('https://app.sushi.com/farm', '_blank')}
                style={{
                  background: "#ea580c",
                  color: "white",
                  padding: "30px 15px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Sushi $890
              </button>
              <button
                onClick={() => window.open('https://app.balancer.fi/', '_blank')}
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "30px 15px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Balancer $750
              </button>
            </>
          )}
        </div>

        {/* Final Alert */}
        <div style={{
          background: "rgba(16, 185, 129, 0.2)",
          border: "1px solid #10b981",
          borderRadius: "8px",
          padding: "20px",
          color: "#d1fae5"
        }}>
          <strong>EXECUTION READY:</strong> Use verified wallet (0x058C8FE01E5c9eaC6ee19e6673673B549B368843) 
          to claim $4,990 LP rewards. Connect MetaMask and claim in priority order starting with Curve.
        </div>
      </div>
    </div>
  );
}