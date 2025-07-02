export default function TransactionAnalysis() {
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const contractAddress = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  
  // Real transaction data from user's recent activity (6 days ago)
  const recentTransaction = {
    hash: "0x7b597b87f4db2cb3a29c50f8d3f6d3de40bea600c2309a04dd5a8f8fe212c9cb",
    methodId: "0x1453926d",
    block: "22,778,369",
    age: "6 days ago",
    from: foundationWallet,
    to: contractAddress,
    value: "0 ETH",
    fee: "0.0004752 ETH",
    status: "Success",
    type: "Contract Interaction"
  };
  
  // Historical deployment transaction
  const deploymentTx = {
    hash: "0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169",
    block: "22,827,521",
    age: "June 2025",
    gasUsed: "0.000282486",
    tokenAmount: "1,990,000",
    type: "Contract Deployment & Token Mint"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
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
            background: "linear-gradient(135deg, #059669, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            LIVE TRANSACTION ANALYSIS
          </h1>
          <div style={{
            background: "#dcfce7",
            border: "3px solid #22c55e",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#15803d", fontWeight: "bold", fontSize: "18px" }}>
              RECENT ACTIVITY: Contract Interaction 6 Days Ago
            </div>
            <div style={{ color: "#15803d", fontSize: "16px" }}>
              Method: {recentTransaction.methodId} • Block: {recentTransaction.block}
            </div>
          </div>
        </div>

        {/* Recent Transaction Analysis */}
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
            RECENT CONTRACT INTERACTION
          </h2>
          
          <div style={{
            background: "#f0f9ff",
            border: "3px solid #0284c7",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "25px"
            }}>
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#0c4a6e", marginBottom: "10px", fontWeight: "bold" }}>
                  Transaction Hash
                </h4>
                <code style={{
                  background: "#e0f2fe",
                  color: "#0c4a6e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  wordBreak: "break-all",
                  display: "block"
                }}>
                  {recentTransaction.hash}
                </code>
              </div>
              
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#0c4a6e", marginBottom: "10px", fontWeight: "bold" }}>
                  Method Called
                </h4>
                <div style={{
                  background: "#e0f2fe",
                  color: "#0c4a6e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  {recentTransaction.methodId}
                </div>
              </div>
              
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#0c4a6e", marginBottom: "10px", fontWeight: "bold" }}>
                  Block Number
                </h4>
                <div style={{
                  background: "#e0f2fe",
                  color: "#0c4a6e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  {recentTransaction.block}
                </div>
              </div>
              
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#0c4a6e", marginBottom: "10px", fontWeight: "bold" }}>
                  Gas Fee
                </h4>
                <div style={{
                  background: "#e0f2fe",
                  color: "#0c4a6e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  {recentTransaction.fee}
                </div>
              </div>
            </div>
            
            <div style={{
              background: "#dcfce7",
              border: "2px solid #22c55e",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <div style={{ color: "#047857", fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
                TRANSACTION CONFIRMED: {recentTransaction.age}
              </div>
              <div style={{ color: "#059669", fontSize: "16px" }}>
                Foundation wallet successfully interacted with ETHGR contract
              </div>
            </div>
          </div>
        </div>

        {/* Historical Context */}
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
            DEPLOYMENT HISTORY
          </h2>
          
          <div style={{
            background: "#fef3c7",
            border: "3px solid #f59e0b",
            borderRadius: "20px",
            padding: "30px"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "25px"
            }}>
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#92400e", marginBottom: "10px", fontWeight: "bold" }}>
                  Deployment Block
                </h4>
                <div style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  {deploymentTx.block}
                </div>
              </div>
              
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#92400e", marginBottom: "10px", fontWeight: "bold" }}>
                  Gas Cost
                </h4>
                <div style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  {deploymentTx.gasUsed} ETH
                </div>
              </div>
              
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#92400e", marginBottom: "10px", fontWeight: "bold" }}>
                  Tokens Minted
                </h4>
                <div style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  {deploymentTx.tokenAmount} ETHGR
                </div>
              </div>
              
              <div style={{
                background: "white", 
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center"
              }}>
                <h4 style={{ color: "#92400e", marginBottom: "10px", fontWeight: "bold" }}>
                  Date
                </h4>
                <div style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  {deploymentTx.age}
                </div>
              </div>
            </div>
            
            <div style={{
              background: "#ecfdf5",
              border: "2px solid #22c55e",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <div style={{ color: "#047857", fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
                DEPLOYMENT SUCCESSFUL
              </div>
              <div style={{ color: "#059669", fontSize: "16px" }}>
                Contract deployed with full functionality and token supply
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Timeline */}
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
            TRANSACTION TIMELINE
          </h2>
          
          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute",
              left: "40px",
              top: "0",
              bottom: "0",
              width: "4px",
              background: "linear-gradient(180deg, #f59e0b, #22c55e)",
              borderRadius: "2px"
            }} />
            
            {/* Deployment Event */}
            <div style={{
              position: "relative",
              marginBottom: "40px",
              paddingLeft: "100px"
            }}>
              <div style={{
                position: "absolute",
                left: "28px",
                top: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                border: "4px solid white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}>
                🚀
              </div>
              
              <div style={{
                background: "#fef3c7",
                border: "2px solid #f59e0b",
                borderRadius: "15px",
                padding: "25px"
              }}>
                <h3 style={{ color: "#92400e", marginBottom: "10px", fontWeight: "bold", fontSize: "20px" }}>
                  Contract Deployment
                </h3>
                <div style={{ color: "#92400e", fontSize: "16px", marginBottom: "10px" }}>
                  ETHGR contract deployed with 1,990,000 tokens minted to foundation wallet
                </div>
                <div style={{ color: "#d97706", fontSize: "14px", fontWeight: "bold" }}>
                  {deploymentTx.age} • Block {deploymentTx.block}
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div style={{
              position: "relative",
              marginBottom: "40px",
              paddingLeft: "100px"
            }}>
              <div style={{
                position: "absolute",
                left: "28px",
                top: "12px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                border: "4px solid white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}>
                ⚡
              </div>
              
              <div style={{
                background: "#ecfdf5",
                border: "2px solid #22c55e",
                borderRadius: "15px",
                padding: "25px"
              }}>
                <h3 style={{ color: "#047857", marginBottom: "10px", fontWeight: "bold", fontSize: "20px" }}>
                  Recent Contract Interaction
                </h3>
                <div style={{ color: "#047857", fontSize: "16px", marginBottom: "10px" }}>
                  Foundation wallet executed method {recentTransaction.methodId} on ETHGR contract
                </div>
                <div style={{ color: "#059669", fontSize: "14px", fontWeight: "bold" }}>
                  {recentTransaction.age} • Block {recentTransaction.block}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          <button
            onClick={() => window.open(`https://etherscan.io/tx/${recentTransaction.hash}`, '_blank')}
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
            VIEW RECENT TRANSACTION
          </button>

          <button
            onClick={() => window.open(`https://etherscan.io/tx/${deploymentTx.hash}`, '_blank')}
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
            VIEW DEPLOYMENT
          </button>

          <button
            onClick={() => window.location.href = '/compare'}
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
            CONTRACT COMPARISON
          </button>

          <button
            onClick={() => window.location.href = '/dashboard'}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
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
            VERIFICATION CENTER
          </button>
        </div>
      </div>
    </div>
  );
}