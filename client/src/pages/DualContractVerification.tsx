export default function DualContractVerification() {
  // Foundation's authentic ETHGR contracts
  const contracts = {
    main: {
      address: "0xc2b6d375b7d14c9ce73f97ddf565002cce257308",
      name: "ETHGR Main Contract",
      tokens: "1,990,000 ETHGR",
      status: "Needs Verification",
      created: "16 days ago",
      type: "ERC-20 Recovery Token"
    },
    recovery: {
      address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      name: "ETHG Recovery Contract",
      tokens: "Active",
      status: "Live on Etherscan",
      created: "16 days ago",
      type: "ERC-20 ETHG Recovery (ETHGR)"
    }
  };

  const foundationWallet = "0x058C8FE0...49B368843";

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    alert(`Copied: ${address}`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px",
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <h1 style={{
            fontSize: "48px",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            DUAL ETHGR CONTRACT VERIFICATION
          </h1>
          <div style={{
            background: "#f3f4f6",
            border: "3px solid #22c55e",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#059669", fontWeight: "bold", fontSize: "18px" }}>
              Foundation Wallet: {foundationWallet}
            </div>
            <div style={{ color: "#047857", fontSize: "16px" }}>
              Creator of both authentic ETHGR recovery contracts
            </div>
          </div>
        </div>

        {/* Contract Comparison */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginBottom: "30px"
        }}>
          {/* Main Contract */}
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #f59e0b"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "48px", marginRight: "15px" }}>🏗️</div>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#d97706", margin: "0" }}>
                MAIN CONTRACT
              </h3>
            </div>
            
            <div style={{
              background: "#fef3c7",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "2px solid #f59e0b"
            }}>
              <div style={{ color: "#92400e", fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
                Contract Address:
              </div>
              <code style={{
                color: "#d97706",
                fontSize: "11px",
                wordBreak: "break-all",
                display: "block",
                cursor: "pointer"
              }}
              onClick={() => copyAddress(contracts.main.address)}>
                {contracts.main.address}
              </code>
            </div>

            <div style={{
              background: "#fffbeb",
              padding: "20px",
              borderRadius: "12px",
              border: "2px solid #fcd34d"
            }}>
              <div style={{ color: "#92400e", fontSize: "14px", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Token Supply:</strong> {contracts.main.tokens}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Status:</strong> {contracts.main.status}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Created:</strong> {contracts.main.created}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Type:</strong> {contracts.main.type}
                </div>
              </div>
            </div>

            <button
              onClick={() => window.open(`https://etherscan.io/address/${contracts.main.address}`, '_blank')}
              style={{
                width: "100%",
                marginTop: "20px",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              VIEW ON ETHERSCAN
            </button>
          </div>

          {/* Recovery Contract */}
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
                RECOVERY CONTRACT
              </h3>
            </div>
            
            <div style={{
              background: "#d1fae5",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "2px solid #22c55e"
            }}>
              <div style={{ color: "#047857", fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
                Contract Address:
              </div>
              <code style={{
                color: "#059669",
                fontSize: "11px",
                wordBreak: "break-all",
                display: "block",
                cursor: "pointer"
              }}
              onClick={() => copyAddress(contracts.recovery.address)}>
                {contracts.recovery.address}
              </code>
            </div>

            <div style={{
              background: "#f0fdf4",
              padding: "20px",
              borderRadius: "12px",
              border: "2px solid #86efac"
            }}>
              <div style={{ color: "#047857", fontSize: "14px", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Token Status:</strong> {contracts.recovery.tokens}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Status:</strong> {contracts.recovery.status}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Created:</strong> {contracts.recovery.created}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Type:</strong> {contracts.recovery.type}
                </div>
              </div>
            </div>

            <button
              onClick={() => window.open(`https://etherscan.io/address/${contracts.recovery.address}`, '_blank')}
              style={{
                width: "100%",
                marginTop: "20px",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              VIEW ON ETHERSCAN
            </button>
          </div>
        </div>

        {/* Verification Strategy */}
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
            VERIFICATION STRATEGY
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px"
          }}>
            <div style={{
              background: "#fef3c7",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #f59e0b"
            }}>
              <h3 style={{ color: "#d97706", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
                MAIN CONTRACT PRIORITY
              </h3>
              <div style={{ color: "#92400e", fontSize: "14px", lineHeight: "1.8" }}>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Focus:</strong> Get 1,990,000 ETHGR tokens price recognition
                </div>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Action:</strong> Submit for Etherscan verification
                </div>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Impact:</strong> Enable trading of recovery tokens
                </div>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Timeline:</strong> Immediate priority
                </div>
              </div>
            </div>

            <div style={{
              background: "#d1fae5",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #22c55e"
            }}>
              <h3 style={{ color: "#059669", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
                RECOVERY CONTRACT STATUS
              </h3>
              <div style={{ color: "#047857", fontSize: "14px", lineHeight: "1.8" }}>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Status:</strong> Already live on Etherscan
                </div>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Function:</strong> Backup recovery system
                </div>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Advantage:</strong> Established blockchain presence
                </div>
                <div style={{ marginBottom: "10px" }}>
                  • <strong>Use:</strong> Cross-reference and validation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          <button
            onClick={() => window.location.href = '/deploy'}
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
            🏗️ VERIFY MAIN CONTRACT
          </button>

          <button
            onClick={() => window.location.href = '/bytecode'}
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
            📄 CONTRACT SOURCE
          </button>

          <button
            onClick={() => window.location.href = '/compare'}
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
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
            🔍 COMPARE CONTRACTS
          </button>

          <button
            onClick={() => window.location.href = '/dashboard'}
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
            📊 VERIFICATION DASHBOARD
          </button>
        </div>

        {/* Foundation Status */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            background: "#f9fafb",
            border: "3px solid #22c55e",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🏛️</div>
            <h3 style={{ color: "#059669", fontWeight: "bold", fontSize: "28px", marginBottom: "20px" }}>
              ETHGR FOUNDATION CONTRACT ECOSYSTEM
            </h3>
            <p style={{ color: "#047857", fontSize: "18px", marginBottom: "25px", lineHeight: "1.6" }}>
              Both contracts are authentic ETHGR Foundation tokens created by wallet {foundationWallet}. 
              The main contract holds 1,990,000 recovery tokens requiring price verification, 
              while the recovery contract provides established blockchain presence for cross-validation.
            </p>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
              marginTop: "25px"
            }}>
              <div style={{
                background: "#dcfce7",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #86efac"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>🔐</div>
                <div style={{ color: "#059669", fontWeight: "bold", fontSize: "14px" }}>
                  SECURE DEPLOYMENT
                </div>
                <div style={{ color: "#047857", fontSize: "12px" }}>
                  Both contracts from verified foundation wallet
                </div>
              </div>
              
              <div style={{
                background: "#dbeafe",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #60a5fa"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>⚖️</div>
                <div style={{ color: "#2563eb", fontWeight: "bold", fontSize: "14px" }}>
                  DUAL VALIDATION
                </div>
                <div style={{ color: "#1d4ed8", fontSize: "12px" }}>
                  Cross-reference between contracts
                </div>
              </div>
              
              <div style={{
                background: "#fef3c7",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #fcd34d"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>💰</div>
                <div style={{ color: "#d97706", fontWeight: "bold", fontSize: "14px" }}>
                  VALUE RECOVERY
                </div>
                <div style={{ color: "#b45309", fontSize: "12px" }}>
                  1,990,000 tokens ready for trading
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}