export default function HistoricalWalletTimeline() {
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const contractAddress = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  
  // Historical timeline data from June 15-19, 2025
  const timelineEvents = [
    {
      date: "June 15, 2025",
      time: "20:55:55 UTC",
      event: "Wallet Generation",
      description: "Foundation wallet created with derivation path m/44'/60'/0'/0/0",
      status: "completed",
      icon: "🔐"
    },
    {
      date: "June 16-18, 2025",
      event: "Contract Development",
      description: "ETHG Recovery contract development and testing phase",
      status: "completed",
      icon: "⚙️"
    },
    {
      date: "June 19, 2025",
      event: "Contract Deployment",
      description: "ETHGR contract deployed with 1,990,000 tokens minted to foundation",
      status: "completed",
      icon: "🚀"
    },
    {
      date: "January 2, 2025",
      event: "Verification Pending",
      description: "Contract awaiting Etherscan verification for price recognition",
      status: "pending",
      icon: "⏳"
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
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
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            HISTORICAL WALLET TIMELINE
          </h1>
          <div style={{
            background: "#e0f2fe",
            border: "3px solid #0284c7",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#0c4a6e", fontWeight: "bold", fontSize: "18px" }}>
              Foundation Development: June 15-19, 2025
            </div>
            <div style={{ color: "#0c4a6e", fontSize: "16px" }}>
              Complete wallet and contract deployment history
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "40px",
          marginBottom: "40px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "32px",
            color: "#1f2937",
            marginBottom: "40px",
            fontWeight: "bold"
          }}>
            DEVELOPMENT TIMELINE
          </h2>
          
          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute",
              left: "40px",
              top: "0",
              bottom: "0",
              width: "4px",
              background: "linear-gradient(180deg, #3b82f6, #10b981)",
              borderRadius: "2px"
            }} />
            
            {timelineEvents.map((event, index) => (
              <div key={index} style={{
                position: "relative",
                marginBottom: "40px",
                paddingLeft: "100px"
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  left: "28px",
                  top: "12px",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: event.status === "completed" ? "#22c55e" : "#f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  border: "4px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>
                  {event.icon}
                </div>
                
                {/* Event content */}
                <div style={{
                  background: event.status === "completed" ? "#ecfdf5" : "#fef3c7",
                  border: `2px solid ${event.status === "completed" ? "#22c55e" : "#f59e0b"}`,
                  borderRadius: "15px",
                  padding: "25px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "15px"
                  }}>
                    <h3 style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: event.status === "completed" ? "#047857" : "#92400e",
                      marginBottom: "5px"
                    }}>
                      {event.event}
                    </h3>
                    <div style={{
                      background: event.status === "completed" ? "#22c55e" : "#f59e0b",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}>
                      {event.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <div style={{
                    color: event.status === "completed" ? "#047857" : "#92400e",
                    fontSize: "16px",
                    marginBottom: "10px"
                  }}>
                    {event.description}
                  </div>
                  
                  <div style={{
                    color: event.status === "completed" ? "#059669" : "#d97706",
                    fontSize: "14px",
                    fontWeight: "bold"
                  }}>
                    {event.date} {event.time && `• ${event.time}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}>
          
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #22c55e"
          }}>
            <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "15px" }}>📅</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold", color: "#1f2937", textAlign: "center" }}>
              JUNE 2025 DEPLOYMENT
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
                Wallet Created: June 15, 2025 20:55:55 UTC
              </div>
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
                Development Period: June 16-18, 2025
              </div>
              <div style={{ color: "#6b7280", fontSize: "14px" }}>
                Contract Deployed: June 19, 2025
              </div>
            </div>
            <div style={{
              background: "#dcfce7",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ color: "#15803d", fontWeight: "bold", fontSize: "14px" }}>
                Development Complete
              </div>
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #f59e0b"
          }}>
            <div style={{ fontSize: "48px", textAlign: "center", marginBottom: "15px" }}>🎯</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold", color: "#1f2937", textAlign: "center" }}>
              CURRENT OBJECTIVE
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
                Contract: {contractAddress.substring(0, 20)}...
              </div>
              <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "8px" }}>
                Tokens: 1,990,000 ETHGR minted
              </div>
              <div style={{ color: "#6b7280", fontSize: "14px" }}>
                Status: Awaiting verification
              </div>
            </div>
            <div style={{
              background: "#fef3c7",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ color: "#92400e", fontWeight: "bold", fontSize: "14px" }}>
                Verification Pending
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <h3 style={{
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "25px",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            VERIFICATION PATHWAY
          </h3>
          
          <div style={{
            background: "#f0f9ff",
            border: "2px solid #0284c7",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "25px",
            textAlign: "center"
          }}>
            <div style={{ color: "#0c4a6e", fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
              READY FOR FINAL VERIFICATION
            </div>
            <div style={{ color: "#0c4a6e", fontSize: "16px", marginBottom: "20px" }}>
              Historical development complete. Contract deployed with full functionality.
              Ready to complete Etherscan verification for price recognition.
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px"
            }}>
              <button
                onClick={() => window.location.href = '/dashboard'}
                style={{
                  background: "linear-gradient(135deg, #0284c7, #0369a1)",
                  color: "white",
                  border: "none",
                  padding: "15px 25px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.3s"
                }}
              >
                VERIFICATION CENTER
              </button>

              <button
                onClick={() => window.location.href = '/transaction'}
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  color: "white",
                  border: "none",
                  padding: "15px 25px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.3s"
                }}
              >
                TRANSACTION DATA
              </button>

              <button
                onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                  color: "white",
                  border: "none",
                  padding: "15px 25px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.3s"
                }}
              >
                VIEW CONTRACT
              </button>
            </div>
          </div>

          <div style={{
            background: "#ecfdf5",
            border: "2px solid #22c55e",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ color: "#047857", fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
              FOUNDATION DEVELOPMENT SUCCESS
            </div>
            <div style={{ color: "#047857", fontSize: "14px" }}>
              June 2025 development phase completed successfully. 
              Contract operational with 1,990,000 ETHGR tokens ready for verification and trading.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}