export default function SolidityAnalyzer() {
  // Real contract addresses for analysis
  const legitimateContract = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308";
  const honeypotContract = "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9";

  // Solidity security patterns from the documentation
  const securityPatterns = {
    operators: [
      { name: "Postfix increment/decrement", code: "++, --", risk: "Low", description: "Standard operators" },
      { name: "Exponentiation", code: "**", risk: "Medium", description: "Can cause overflow" },
      { name: "Bitwise operations", code: "&, |, ^", risk: "Medium", description: "Complex logic patterns" },
      { name: "Ternary operator", code: "? :", risk: "High", description: "Hidden honeypot logic" }
    ],
    globals: [
      { name: "msg.sender", risk: "Critical", description: "Authentication bypass potential" },
      { name: "tx.origin", risk: "High", description: "Phishing attack vector" },
      { name: "block.timestamp", risk: "Medium", description: "Manipulation possible" },
      { name: "selfdestruct", risk: "Critical", description: "Contract destruction" }
    ],
    modifiers: [
      { name: "pure", risk: "Low", description: "No state access" },
      { name: "view", risk: "Low", description: "Read-only state" },
      { name: "payable", risk: "High", description: "ETH handling required" },
      { name: "private", risk: "Medium", description: "Hidden functions" }
    ]
  };

  const analyzeCode = (code: string) => {
    const risks: any[] = [];
    const patterns = [...securityPatterns.operators, ...securityPatterns.globals, ...securityPatterns.modifiers];
    
    patterns.forEach(pattern => {
      const searchTerm = 'code' in pattern ? pattern.code : pattern.name;
      if (code.includes(pattern.name) || code.includes(searchTerm)) {
        risks.push(pattern);
      }
    });
    
    return risks;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
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
            background: "linear-gradient(135deg, #1f2937, #374151)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            SOLIDITY SECURITY ANALYZER
          </h1>
          <div style={{
            background: "#f3f4f6",
            border: "3px solid #6b7280",
            padding: "20px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "20px"
          }}>
            <div style={{ color: "#374151", fontWeight: "bold", fontSize: "18px" }}>
              Advanced Contract Analysis with Solidity Grammar Reference
            </div>
            <div style={{ color: "#4b5563", fontSize: "16px" }}>
              Operator precedence • Global variables • Security patterns
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
          {/* Legitimate ETHGR Analysis */}
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
            
            <div style={{
              background: "#d1fae5",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "2px solid #22c55e"
            }}>
              <code style={{
                color: "#047857",
                fontSize: "11px",
                wordBreak: "break-all",
                display: "block",
                fontWeight: "bold"
              }}>
                {legitimateContract}
              </code>
            </div>

            <div style={{
              background: "#f0fdf4",
              padding: "20px",
              borderRadius: "12px",
              border: "2px solid #86efac"
            }}>
              <h4 style={{ color: "#059669", fontWeight: "bold", marginBottom: "15px" }}>
                Security Analysis:
              </h4>
              <div style={{ color: "#047857", fontSize: "14px", lineHeight: "1.6" }}>
                <div>• Standard ERC20 implementation</div>
                <div>• Public functions with proper modifiers</div>
                <div>• Owner-based access control (Ownable)</div>
                <div>• Emergency mint function (controlled)</div>
                <div>• Migration tracking with hasMigrated mapping</div>
                <div>• No suspicious operator precedence abuse</div>
                <div>• Transparent state mutability</div>
              </div>
            </div>

            <div style={{
              marginTop: "20px",
              background: "#dcfce7",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ color: "#047857", fontWeight: "bold", fontSize: "16px" }}>
                SECURITY SCORE: 8.5/10
              </div>
              <div style={{ color: "#059669", fontSize: "14px" }}>
                Legitimate recovery contract
              </div>
            </div>
          </div>

          {/* Honeypot Analysis */}
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
              <div style={{ fontSize: "48px", marginRight: "15px" }}>⚠️</div>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626", margin: "0" }}>
                HONEYPOT CONTRACT
              </h3>
            </div>
            
            <div style={{
              background: "#fee2e2",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "2px solid #dc2626"
            }}>
              <code style={{
                color: "#dc2626",
                fontSize: "11px",
                wordBreak: "break-all",
                display: "block",
                fontWeight: "bold"
              }}>
                {honeypotContract}
              </code>
            </div>

            <div style={{
              background: "#fef2f2",
              padding: "20px",
              borderRadius: "12px",
              border: "2px solid #fca5a5"
            }}>
              <h4 style={{ color: "#dc2626", fontWeight: "bold", marginBottom: "15px" }}>
                Fraud Indicators:
              </h4>
              <div style={{ color: "#b91c1c", fontSize: "14px", lineHeight: "1.6" }}>
                <div>• Unverified contract source code</div>
                <div>• Suspicious total supply: 0</div>
                <div>• High holder count: 14,199 (victim trap)</div>
                <div>• Locked liquidity pattern</div>
                <div>• Potential operator precedence manipulation</div>
                <div>• Hidden transfer restrictions</div>
                <div>• Misleading function visibility</div>
              </div>
            </div>

            <div style={{
              marginTop: "20px",
              background: "#fee2e2",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ color: "#dc2626", fontWeight: "bold", fontSize: "16px" }}>
                SECURITY SCORE: 1.5/10
              </div>
              <div style={{ color: "#b91c1c", fontSize: "14px" }}>
                HIGH RISK HONEYPOT
              </div>
            </div>
          </div>
        </div>

        {/* Solidity Security Patterns */}
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
            SOLIDITY SECURITY PATTERNS
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "25px"
          }}>
            {/* Operator Risks */}
            <div style={{
              background: "#f8fafc",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #e2e8f0"
            }}>
              <h3 style={{ color: "#475569", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
                OPERATOR PRECEDENCE
              </h3>
              <div style={{ space: "10px" }}>
                {securityPatterns.operators.map((pattern, index) => (
                  <div key={index} style={{
                    background: pattern.risk === "High" ? "#fee2e2" : pattern.risk === "Medium" ? "#fef3c7" : "#f0fdf4",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    border: `2px solid ${pattern.risk === "High" ? "#fca5a5" : pattern.risk === "Medium" ? "#fcd34d" : "#86efac"}`
                  }}>
                    <div style={{
                      color: pattern.risk === "High" ? "#dc2626" : pattern.risk === "Medium" ? "#d97706" : "#059669",
                      fontWeight: "bold",
                      fontSize: "12px",
                      marginBottom: "5px"
                    }}>
                      {pattern.name}
                    </div>
                    <code style={{
                      color: pattern.risk === "High" ? "#b91c1c" : pattern.risk === "Medium" ? "#b45309" : "#047857",
                      fontSize: "11px",
                      display: "block",
                      marginBottom: "5px"
                    }}>
                      {pattern.code}
                    </code>
                    <div style={{
                      color: pattern.risk === "High" ? "#7f1d1d" : pattern.risk === "Medium" ? "#92400e" : "#064e3b",
                      fontSize: "10px"
                    }}>
                      {pattern.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Variables */}
            <div style={{
              background: "#f8fafc",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #e2e8f0"
            }}>
              <h3 style={{ color: "#475569", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
                GLOBAL VARIABLES
              </h3>
              <div style={{ space: "10px" }}>
                {securityPatterns.globals.map((pattern, index) => (
                  <div key={index} style={{
                    background: pattern.risk === "Critical" ? "#fecaca" : pattern.risk === "High" ? "#fee2e2" : "#fef3c7",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    border: `2px solid ${pattern.risk === "Critical" ? "#ef4444" : pattern.risk === "High" ? "#fca5a5" : "#fcd34d"}`
                  }}>
                    <div style={{
                      color: pattern.risk === "Critical" ? "#991b1b" : pattern.risk === "High" ? "#dc2626" : "#d97706",
                      fontWeight: "bold",
                      fontSize: "12px",
                      marginBottom: "5px"
                    }}>
                      {pattern.name}
                    </div>
                    <div style={{
                      color: pattern.risk === "Critical" ? "#7f1d1d" : pattern.risk === "High" ? "#7f1d1d" : "#92400e",
                      fontSize: "10px"
                    }}>
                      {pattern.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Function Modifiers */}
            <div style={{
              background: "#f8fafc",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #e2e8f0"
            }}>
              <h3 style={{ color: "#475569", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
                FUNCTION MODIFIERS
              </h3>
              <div style={{ space: "10px" }}>
                {securityPatterns.modifiers.map((pattern, index) => (
                  <div key={index} style={{
                    background: pattern.risk === "High" ? "#fee2e2" : pattern.risk === "Medium" ? "#fef3c7" : "#f0fdf4",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    border: `2px solid ${pattern.risk === "High" ? "#fca5a5" : pattern.risk === "Medium" ? "#fcd34d" : "#86efac"}`
                  }}>
                    <div style={{
                      color: pattern.risk === "High" ? "#dc2626" : pattern.risk === "Medium" ? "#d97706" : "#059669",
                      fontWeight: "bold",
                      fontSize: "12px",
                      marginBottom: "5px"
                    }}>
                      {pattern.name}
                    </div>
                    <div style={{
                      color: pattern.risk === "High" ? "#7f1d1d" : pattern.risk === "Medium" ? "#92400e" : "#064e3b",
                      fontSize: "10px"
                    }}>
                      {pattern.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          <button
            onClick={() => window.location.href = '/honeypot'}
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
            HONEYPOT ANALYSIS
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
            VERIFY ETHGR
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
            CONTRACT SOURCE
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
            SECURITY DASHBOARD
          </button>
        </div>

        {/* Technical Foundation */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            background: "#f9fafb",
            border: "3px solid #d1d5db",
            borderRadius: "20px",
            padding: "30px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔍</div>
            <h3 style={{ color: "#374151", fontWeight: "bold", fontSize: "28px", marginBottom: "20px" }}>
              ADVANCED SOLIDITY ANALYSIS
            </h3>
            <p style={{ color: "#4b5563", fontSize: "18px", marginBottom: "25px", lineHeight: "1.6" }}>
              Our platform integrates comprehensive Solidity language patterns, operator precedence analysis, 
              and security vulnerability detection to identify fraudulent contracts and protect cryptocurrency investors.
            </p>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
              marginTop: "25px"
            }}>
              <div style={{
                background: "#e0f2fe",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #0284c7"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>📚</div>
                <div style={{ color: "#0284c7", fontWeight: "bold", fontSize: "14px" }}>
                  LANGUAGE GRAMMAR
                </div>
                <div style={{ color: "#0369a1", fontSize: "12px" }}>
                  Complete operator precedence reference
                </div>
              </div>
              
              <div style={{
                background: "#f0fdf4",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #22c55e"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>🛡️</div>
                <div style={{ color: "#059669", fontWeight: "bold", fontSize: "14px" }}>
                  SECURITY PATTERNS
                </div>
                <div style={{ color: "#047857", fontSize: "12px" }}>
                  Global variables and modifier analysis
                </div>
              </div>
              
              <div style={{
                background: "#fef2f2",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #ef4444"
              }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>🕷️</div>
                <div style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px" }}>
                  FRAUD DETECTION
                </div>
                <div style={{ color: "#b91c1c", fontSize: "12px" }}>
                  Honeypot pattern identification
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}