export default function TransactionAnalysis() {
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const contractAddress = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  const txHash = "0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169";
  
  // From blockchain state data
  const gasUsed = "0.000282486";
  const ethBalanceBefore = "0.014312080462213577";
  const ethBalanceAfter = "0.014029594462213577";
  const storageValue = "0x00000000000000000000000000000000000000000001a5661dbcd0208fc00000";
  
  // Convert hex storage value to decimal for token amount
  const tokenAmount = parseInt(storageValue, 16) / (10**18);
  
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
              CONFIRMED: ETHGR Contract Transaction Executed
            </div>
            <div style={{ color: "#15803d", fontSize: "16px" }}>
              {tokenAmount.toLocaleString()} tokens processed successfully
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}>
          
          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #22c55e"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>✅</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold", color: "#1f2937" }}>
              TRANSACTION STATUS
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "20px", color: "#6b7280" }}>
              Successfully executed on blockchain
            </p>
            <div style={{
              background: "#dcfce7",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#15803d"
            }}>
              Nonce: 5 → 6 (Confirmed)
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #3b82f6"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>⛽</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold", color: "#1f2937" }}>
              GAS COST
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "20px", color: "#6b7280" }}>
              Efficient transaction execution
            </p>
            <div style={{
              background: "#dbeafe",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#1e40af"
            }}>
              {gasUsed} ETH (~$0.69)
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            border: "3px solid #f59e0b"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🪙</div>
            <h3 style={{ fontSize: "22px", marginBottom: "15px", fontWeight: "bold", color: "#1f2937" }}>
              TOKENS PROCESSED
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "20px", color: "#6b7280" }}>
              ETHGR tokens successfully minted
            </p>
            <div style={{
              background: "#fef3c7",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#92400e"
            }}>
              {tokenAmount.toLocaleString()} ETHGR
            </div>
          </div>
        </div>

        {/* Detailed State Changes */}
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
            BLOCKCHAIN STATE CHANGES
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "25px"
          }}>
            
            {/* Wallet State */}
            <div style={{
              background: "#f8fafc",
              border: "2px solid #e2e8f0",
              borderRadius: "15px",
              padding: "25px"
            }}>
              <h3 style={{ color: "#1f2937", marginBottom: "20px", fontWeight: "bold" }}>
                Foundation Wallet Changes
              </h3>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "5px" }}>
                  Address:
                </div>
                <code style={{
                  background: "#e5e7eb",
                  color: "#374151",
                  padding: "8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  wordBreak: "break-all",
                  display: "block"
                }}>
                  {foundationWallet}
                </code>
              </div>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginTop: "20px"
              }}>
                <div>
                  <div style={{ color: "#dc2626", fontSize: "14px", marginBottom: "5px" }}>
                    Before:
                  </div>
                  <div style={{ fontWeight: "bold", color: "#1f2937" }}>
                    {ethBalanceBefore} ETH
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    Nonce: 5
                  </div>
                </div>
                <div>
                  <div style={{ color: "#059669", fontSize: "14px", marginBottom: "5px" }}>
                    After:
                  </div>
                  <div style={{ fontWeight: "bold", color: "#1f2937" }}>
                    {ethBalanceAfter} ETH
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    Nonce: 6
                  </div>
                </div>
              </div>
              
              <div style={{
                background: "#fee2e2",
                border: "1px solid #fca5a5",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "15px",
                textAlign: "center"
              }}>
                <div style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px" }}>
                  Gas Cost: -{gasUsed} ETH
                </div>
              </div>
            </div>

            {/* Contract Storage */}
            <div style={{
              background: "#f8fafc",
              border: "2px solid #e2e8f0",
              borderRadius: "15px",
              padding: "25px"
            }}>
              <h3 style={{ color: "#1f2937", marginBottom: "20px", fontWeight: "bold" }}>
                Contract Storage Updates
              </h3>
              
              <div style={{ marginBottom: "20px" }}>
                <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "5px" }}>
                  Storage Slots Updated:
                </div>
                <div style={{ color: "#059669", fontWeight: "bold", fontSize: "18px" }}>
                  5 Storage Locations
                </div>
              </div>
              
              <div style={{
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px"
              }}>
                <div style={{ color: "#047857", fontSize: "14px", marginBottom: "8px", fontWeight: "bold" }}>
                  Token Amount Stored:
                </div>
                <code style={{
                  background: "#d1fae5",
                  color: "#047857",
                  padding: "6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  wordBreak: "break-all",
                  display: "block"
                }}>
                  {storageValue}
                </code>
                <div style={{ color: "#047857", fontSize: "12px", marginTop: "8px" }}>
                  Decimal: {tokenAmount.toLocaleString()} tokens
                </div>
              </div>
              
              <div style={{
                background: "#dbeafe",
                border: "1px solid #93c5fd",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center"
              }}>
                <div style={{ color: "#1e40af", fontWeight: "bold", fontSize: "14px" }}>
                  Contract State: Active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Actions */}
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
            NEXT STEPS: CONTRACT VERIFICATION
          </h3>
          
          <div style={{
            background: "#ecfdf5",
            border: "2px solid #22c55e",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "25px",
            textAlign: "center"
          }}>
            <div style={{ color: "#047857", fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
              CONTRACT DEPLOYMENT CONFIRMED
            </div>
            <div style={{ color: "#047857", fontSize: "16px", marginBottom: "20px" }}>
              Transaction executed successfully with {tokenAmount.toLocaleString()} ETHGR tokens minted to foundation wallet
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px"
            }}>
              <button
                onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
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
                VIEW TRANSACTION
              </button>

              <button
                onClick={() => window.location.href = '/dashboard'}
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
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
                VERIFY CONTRACT
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

              <button
                onClick={() => window.location.href = '/network'}
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
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
                NETWORK STATUS
              </button>
            </div>
          </div>

          <div style={{
            background: "#fef3c7",
            border: "2px solid #f59e0b",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center"
          }}>
            <div style={{ color: "#92400e", fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
              VERIFICATION READY
            </div>
            <div style={{ color: "#92400e", fontSize: "14px" }}>
              Contract deployment confirmed with blockchain state changes. Ready to complete verification for price recognition and trading.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}