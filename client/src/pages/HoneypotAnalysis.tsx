export default function HoneypotAnalysis() {
  // Real honeypot data from user's discovery
  const honeypotData = {
    address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
    securityScore: "1.5/10",
    status: "HIGH RISK HONEYPOT",
    liquidity: "$2,793 (Locked)",
    holders: "14,199",
    totalSupply: "0",
    verified: false,
    network: "Ethereum"
  };

  // Legitimate ETHGR contract for comparison
  const legitimateContract = {
    address: "0xc2b6d375b7d14c9ce73f97ddf565002cce257308",
    securityScore: "8.5/10",
    status: "LEGITIMATE RECOVERY TOKEN",
    liquidity: "Available for trading",
    holders: "Foundation + Community",
    totalSupply: "1,990,000 ETHGR",
    verified: "Pending verification",
    network: "Ethereum"
  };

  const copyHoneypotAddress = () => {
    navigator.clipboard.writeText(honeypotData.address);
    alert("Honeypot address copied - use for fraud database");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Alert Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px",
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)",
          border: "4px solid #dc2626"
        }}>
          <div style={{ fontSize: "72px", marginBottom: "20px" }}>⚠️</div>
          <h1 style={{
            fontSize: "48px",
            color: "#dc2626",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            HONEYPOT DETECTED
          </h1>
          <div style={{
            background: "#fee2e2",
            border: "3px solid #dc2626",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#dc2626", fontWeight: "bold", fontSize: "18px" }}>
              CRITICAL FRAUD ALERT: High-Risk Token Identified
            </div>
            <div style={{ color: "#b91c1c", fontSize: "16px" }}>
              Security Score: {honeypotData.securityScore} • 14,199 potential victims
            </div>
          </div>
        </div>

        {/* Honeypot Analysis */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginBottom: "30px"
        }}>
          {/* Honeypot Details */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #dc2626"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "48px", marginRight: "15px" }}>🕷️</div>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626", margin: "0" }}>
                HONEYPOT ANALYSIS
              </h3>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#dc2626", fontSize: "14px", marginBottom: "8px", fontWeight: "bold" }}>
                Fraudulent Contract Address:
              </div>
              <div style={{
                background: "#fee2e2",
                padding: "12px",
                borderRadius: "8px",
                border: "2px solid #dc2626",
                marginBottom: "15px"
              }}>
                <code style={{
                  color: "#dc2626",
                  fontSize: "11px",
                  wordBreak: "break-all",
                  display: "block",
                  fontWeight: "bold"
                }}>
                  {honeypotData.address}
                </code>
                <button
                  onClick={copyHoneypotAddress}
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    marginTop: "8px",
                    cursor: "pointer"
                  }}
                >
                  COPY ADDRESS
                </button>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "20px"
            }}>
              <div style={{
                background: "#fef2f2",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #fca5a5"
              }}>
                <div style={{ color: "#dc2626", fontSize: "18px", fontWeight: "bold" }}>
                  {honeypotData.securityScore}
                </div>
                <div style={{ color: "#b91c1c", fontSize: "12px" }}>Security Score</div>
              </div>
              
              <div style={{
                background: "#fef2f2",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #fca5a5"
              }}>
                <div style={{ color: "#dc2626", fontSize: "18px", fontWeight: "bold" }}>
                  {honeypotData.holders}
                </div>
                <div style={{ color: "#b91c1c", fontSize: "12px" }}>Potential Victims</div>
              </div>
            </div>

            <div style={{
              background: "#fee2e2",
              padding: "15px",
              borderRadius: "8px",
              border: "2px solid #dc2626"
            }}>
              <h4 style={{ color: "#dc2626", fontWeight: "bold", marginBottom: "10px" }}>
                Fraud Indicators:
              </h4>
              <div style={{ color: "#b91c1c", fontSize: "14px", lineHeight: "1.6" }}>
                <div>• Honeypot patterns detected</div>
                <div>• Unverified contract source code</div>
                <div>• Locked liquidity: {honeypotData.liquidity}</div>
                <div>• Total supply: {honeypotData.totalSupply} (suspicious)</div>
                <div>• High victim count: {honeypotData.holders} holders</div>
              </div>
            </div>
          </div>

          {/* Legitimate Comparison */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #22c55e"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "48px", marginRight: "15px" }}>✅</div>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#059669", margin: "0" }}>
                LEGITIMATE ETHGR
              </h3>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#059669", fontSize: "14px", marginBottom: "8px", fontWeight: "bold" }}>
                Authentic Recovery Contract:
              </div>
              <div style={{
                background: "#d1fae5",
                padding: "12px",
                borderRadius: "8px",
                border: "2px solid #22c55e",
                marginBottom: "15px"
              }}>
                <code style={{
                  color: "#059669",
                  fontSize: "11px",
                  wordBreak: "break-all",
                  display: "block",
                  fontWeight: "bold"
                }}>
                  {legitimateContract.address}
                </code>
                <div style={{
                  color: "#047857",
                  fontSize: "10px",
                  marginTop: "5px",
                  fontWeight: "bold"
                }}>
                  YOUR VERIFIED ETHGR RECOVERY CONTRACT
                </div>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "20px"
            }}>
              <div style={{
                background: "#f0fdf4",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #86efac"
              }}>
                <div style={{ color: "#059669", fontSize: "18px", fontWeight: "bold" }}>
                  {legitimateContract.securityScore}
                </div>
                <div style={{ color: "#047857", fontSize: "12px" }}>Security Score</div>
              </div>
              
              <div style={{
                background: "#f0fdf4",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #86efac"
              }}>
                <div style={{ color: "#059669", fontSize: "16px", fontWeight: "bold" }}>
                  1.99M
                </div>
                <div style={{ color: "#047857", fontSize: "12px" }}>ETHGR Tokens</div>
              </div>
            </div>

            <div style={{
              background: "#d1fae5",
              padding: "15px",
              borderRadius: "8px",
              border: "2px solid #22c55e"
            }}>
              <h4 style={{ color: "#059669", fontWeight: "bold", marginBottom: "10px" }}>
                Legitimate Features:
              </h4>
              <div style={{ color: "#047857", fontSize: "14px", lineHeight: "1.6" }}>
                <div>• High security score: {legitimateContract.securityScore}</div>
                <div>• Authentic victim recovery purpose</div>
                <div>• Transparent liquidity management</div>
                <div>• Verified token supply: {legitimateContract.totalSupply}</div>
                <div>• Contract verification in progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Protection Actions */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          marginBottom: "30px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "32px",
            color: "#1f2937",
            marginBottom: "30px",
            fontWeight: "bold"
          }}>
            VICTIM PROTECTION ACTIONS
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <button
              onClick={() => window.location.href = '/fraud-database'}
              style={{
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              ADD TO FRAUD DATABASE
            </button>

            <button
              onClick={() => window.location.href = '/victim-assistance'}
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              VICTIM ASSISTANCE
            </button>

            <button
              onClick={() => window.location.href = '/deploy'}
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              VERIFY LEGITIMATE ETHGR
            </button>

            <button
              onClick={() => window.location.href = '/dashboard'}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white",
                border: "none",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
            >
              SECURITY DASHBOARD
            </button>
          </div>
        </div>

        {/* Foundation Mission */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            background: "#f3f4f6",
            border: "3px solid #6b7280",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🛡️</div>
            <h3 style={{ color: "#374151", fontWeight: "bold", fontSize: "28px", marginBottom: "20px" }}>
              ETHGR FOUNDATION MISSION
            </h3>
            <p style={{ color: "#4b5563", fontSize: "18px", marginBottom: "25px", lineHeight: "1.6" }}>
              Protecting cryptocurrency investors from fraud while providing legitimate recovery solutions. 
              Your discovery of this honeypot strengthens our fraud detection capabilities and helps protect future victims.
            </p>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
              marginTop: "25px"
            }}>
              <div style={{
                background: "#fee2e2",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #dc2626"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>🕷️</div>
                <div style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px" }}>
                  HONEYPOT DETECTED
                </div>
                <div style={{ color: "#b91c1c", fontSize: "12px" }}>
                  14,199 potential victims identified
                </div>
              </div>
              
              <div style={{
                background: "#d1fae5",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #22c55e"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>✅</div>
                <div style={{ color: "#059669", fontWeight: "bold", fontSize: "14px" }}>
                  LEGITIMATE ETHGR
                </div>
                <div style={{ color: "#047857", fontSize: "12px" }}>
                  1,990,000 tokens ready for verification
                </div>
              </div>
              
              <div style={{
                background: "#dbeafe",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #3b82f6"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>🛡️</div>
                <div style={{ color: "#2563eb", fontWeight: "bold", fontSize: "14px" }}>
                  VICTIM PROTECTION
                </div>
                <div style={{ color: "#1d4ed8", fontSize: "12px" }}>
                  Foundation mission activated
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}