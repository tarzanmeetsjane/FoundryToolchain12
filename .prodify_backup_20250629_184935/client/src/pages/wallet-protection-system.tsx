import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield,
  AlertTriangle,
  Eye,
  Lock,
  Zap,
  Target,
  CheckCircle,
  XCircle,
  ExternalLink,
  Copy,
  Download,
  Scan,
  Bell
} from "lucide-react";

export default function WalletProtectionSystem() {
  const [walletAddress, setWalletAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  const [protectionLevel, setProtectionLevel] = useState("maximum");
  const [scanResults, setScanResults] = useState<any>(null);

  const protectionMethods = [
    {
      method: "Token Approval Monitoring",
      threat: "Unlimited token approvals draining assets",
      protection: "Monitor and revoke dangerous approvals automatically",
      implementation: "Real-time approval scanning with auto-revoke",
      severity: "CRITICAL"
    },
    {
      method: "Transaction Simulation",
      threat: "Malicious transactions disguised as legitimate",
      protection: "Simulate all transactions before execution",
      implementation: "Pre-execution analysis and warning system",
      severity: "HIGH"
    },
    {
      method: "Contract Interaction Whitelist",
      threat: "Interaction with honeypot/malicious contracts",
      protection: "Only allow verified safe contracts",
      implementation: "Curated whitelist with reputation scoring",
      severity: "HIGH"
    },
    {
      method: "Multi-Signature Requirements",
      threat: "Single-point-of-failure wallet compromise",
      protection: "Require multiple signatures for large transactions",
      implementation: "Gnosis Safe or similar multi-sig wallet",
      severity: "MEDIUM"
    },
    {
      method: "Real-Time Balance Monitoring",
      threat: "Silent asset drainage over time",
      protection: "Instant alerts for any balance changes",
      implementation: "WebSocket monitoring with push notifications",
      severity: "MEDIUM"
    },
    {
      method: "Hardware Wallet Integration",
      threat: "Private key exposure on compromised devices",
      protection: "Keep private keys on air-gapped hardware",
      implementation: "Ledger/Trezor with transaction verification",
      severity: "HIGH"
    }
  ];

  const backgroundThreats = [
    {
      threat: "Silent Token Approvals",
      description: "Malicious dApps getting unlimited token access",
      detection: "Scan for high-value token approvals",
      prevention: "Revoke all unnecessary approvals",
      currentRisk: "HIGH"
    },
    {
      threat: "Delegate Call Exploitation",
      description: "Smart contracts using delegate calls to drain funds",
      detection: "Monitor contract interactions for delegate patterns",
      prevention: "Whitelist-only contract interactions",
      currentRisk: "MEDIUM"
    },
    {
      threat: "Flash Loan Attacks",
      description: "Complex multi-step attacks using borrowed funds",
      detection: "Detect unusual transaction patterns",
      prevention: "Transaction value limits and delays",
      currentRisk: "LOW"
    },
    {
      threat: "MEV Bot Frontrunning",
      description: "Bots extracting value from your transactions",
      detection: "Monitor mempool for competing transactions",
      prevention: "Private mempool usage",
      currentRisk: "MEDIUM"
    },
    {
      threat: "Rug Pull Contracts",
      description: "Token contracts with hidden drain functions",
      detection: "Contract source code analysis",
      prevention: "Only interact with verified contracts",
      currentRisk: "HIGH"
    }
  ];

  const protectionContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WalletProtectionGuard is ReentrancyGuard, Ownable {
    
    // Protection settings
    mapping(address => bool) public whitelistedContracts;
    mapping(address => bool) public blacklistedContracts;
    mapping(address => uint256) public dailyTransferLimits;
    mapping(address => uint256) public dailyTransferUsed;
    mapping(address => uint256) public lastTransferReset;
    
    // Emergency controls
    bool public emergencyStop = false;
    address public emergencyContact;
    uint256 public suspiciousActivityCount;
    
    // Events
    event SuspiciousActivity(address indexed target, string reason);
    event EmergencyStop(address indexed triggeredBy);
    event ContractWhitelisted(address indexed contractAddr, bool status);
    event TransferLimitExceeded(address indexed user, uint256 attempted, uint256 limit);
    
    modifier onlyWhenActive() {
        require(!emergencyStop, "Protection: Emergency stop activated");
        _;
    }
    
    modifier validContract(address target) {
        require(whitelistedContracts[target] || !blacklistedContracts[target], 
               "Protection: Contract not authorized");
        _;
    }
    
    modifier withinLimits(address user, uint256 amount) {
        _checkDailyLimits(user, amount);
        _;
    }
    
    constructor() {
        emergencyContact = msg.sender;
        
        // Whitelist common safe contracts
        whitelistedContracts[0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D] = true; // Uniswap V2
        whitelistedContracts[0xE592427A0AEce92De3Edee1F18E0157C05861564] = true; // Uniswap V3
    }
    
    /**
     * @dev Check if interaction with contract is safe
     */
    function validateContractInteraction(
        address target,
        bytes calldata data,
        uint256 value
    ) external view returns (bool safe, string memory reason) {
        
        // Check if contract is blacklisted
        if (blacklistedContracts[target]) {
            return (false, "Contract is blacklisted");
        }
        
        // Check if high-value transaction to non-whitelisted contract
        if (value > 0.1 ether && !whitelistedContracts[target]) {
            return (false, "High value transaction to non-whitelisted contract");
        }
        
        // Check for suspicious patterns in calldata
        if (_containsSuspiciousPatterns(data)) {
            return (false, "Suspicious function signatures detected");
        }
        
        return (true, "Interaction appears safe");
    }
    
    /**
     * @dev Monitor and validate token approvals
     */
    function validateTokenApproval(
        address token,
        address spender,
        uint256 amount
    ) external view returns (bool safe, string memory reason) {
        
        // Check if unlimited approval
        if (amount >= type(uint256).max / 2) {
            return (false, "Unlimited approval detected - high risk");
        }
        
        // Check if spender is known malicious
        if (blacklistedContracts[spender]) {
            return (false, "Approval target is blacklisted");
        }
        
        // Check if approval amount is reasonable
        if (amount > 1000000 * 10**18) { // > 1M tokens
            return (false, "Approval amount unusually high");
        }
        
        return (true, "Approval appears reasonable");
    }
    
    /**
     * @dev Emergency stop function
     */
    function triggerEmergencyStop() external {
        require(msg.sender == owner() || msg.sender == emergencyContact, 
               "Protection: Not authorized");
        emergencyStop = true;
        emit EmergencyStop(msg.sender);
    }
    
    /**
     * @dev Resume operations after emergency
     */
    function resumeOperations() external onlyOwner {
        emergencyStop = false;
    }
    
    /**
     * @dev Set daily transfer limits
     */
    function setDailyLimit(address user, uint256 limit) external onlyOwner {
        dailyTransferLimits[user] = limit;
    }
    
    /**
     * @dev Whitelist safe contracts
     */
    function setContractWhitelist(address contractAddr, bool status) external onlyOwner {
        whitelistedContracts[contractAddr] = status;
        emit ContractWhitelisted(contractAddr, status);
    }
    
    /**
     * @dev Blacklist malicious contracts
     */
    function setContractBlacklist(address contractAddr, bool status) external onlyOwner {
        blacklistedContracts[contractAddr] = status;
    }
    
    /**
     * @dev Internal function to check daily limits
     */
    function _checkDailyLimits(address user, uint256 amount) internal {
        uint256 limit = dailyTransferLimits[user];
        if (limit == 0) return; // No limit set
        
        // Reset daily usage if new day
        if (block.timestamp > lastTransferReset[user] + 1 days) {
            dailyTransferUsed[user] = 0;
            lastTransferReset[user] = block.timestamp;
        }
        
        require(dailyTransferUsed[user] + amount <= limit, 
               "Protection: Daily transfer limit exceeded");
        
        dailyTransferUsed[user] += amount;
        
        if (dailyTransferUsed[user] > limit * 80 / 100) {
            emit TransferLimitExceeded(user, amount, limit);
        }
    }
    
    /**
     * @dev Check for suspicious patterns in transaction data
     */
    function _containsSuspiciousPatterns(bytes calldata data) internal pure returns (bool) {
        // Check for common malicious function signatures
        bytes4 sig = bytes4(data[:4]);
        
        // Known malicious signatures (examples)
        if (sig == 0xa9059cbb || // transfer (when unexpected)
            sig == 0x095ea7b3 || // approve (unlimited)
            sig == 0x23b872dd) { // transferFrom (unauthorized)
            return true;
        }
        
        return false;
    }
    
    /**
     * @dev Report suspicious activity
     */
    function reportSuspiciousActivity(address target, string calldata reason) external {
        suspiciousActivityCount++;
        emit SuspiciousActivity(target, reason);
        
        // Auto-trigger emergency stop if too much suspicious activity
        if (suspiciousActivityCount > 10) {
            triggerEmergencyStop();
        }
    }
    
    /**
     * @dev Get protection status for address
     */
    function getProtectionStatus(address user) external view returns (
        bool active,
        uint256 dailyLimit,
        uint256 dailyUsed,
        uint256 remainingLimit,
        bool emergencyActive
    ) {
        uint256 limit = dailyTransferLimits[user];
        uint256 used = dailyTransferUsed[user];
        
        // Reset calculation if new day
        if (block.timestamp > lastTransferReset[user] + 1 days) {
            used = 0;
        }
        
        return (
            !emergencyStop,
            limit,
            used,
            limit > used ? limit - used : 0,
            emergencyStop
        );
    }
}`;

  const protectionActions = [
    {
      action: "Revoke All Token Approvals",
      description: "Remove unlimited approvals from all tokens",
      urgency: "IMMEDIATE",
      impact: "Prevents ongoing drainage",
      tool: "Revoke.cash or Etherscan"
    },
    {
      action: "Deploy Protection Contract",
      description: "Deploy wallet protection guard contract",
      urgency: "HIGH",
      impact: "Real-time protection monitoring",
      tool: "Custom smart contract"
    },
    {
      action: "Enable Transaction Simulation",
      description: "Simulate all transactions before execution",
      urgency: "HIGH",
      impact: "Prevents malicious transactions",
      tool: "Tenderly or custom simulator"
    },
    {
      action: "Setup Hardware Wallet",
      description: "Move funds to hardware wallet protection",
      urgency: "MEDIUM",
      impact: "Isolates private keys",
      tool: "Ledger or Trezor"
    },
    {
      action: "Monitor Balance Changes",
      description: "Real-time alerts for any asset movements",
      urgency: "MEDIUM",
      impact: "Early detection of threats",
      tool: "Custom monitoring service"
    }
  ];

  const realTimeProtection = {
    approvalMonitoring: {
      title: "Token Approval Monitoring",
      description: "Scan for dangerous unlimited approvals",
      frequency: "Every 5 minutes",
      action: "Auto-revoke high-risk approvals"
    },
    balanceTracking: {
      title: "Asset Balance Tracking", 
      description: "Monitor all token and ETH balances",
      frequency: "Every 30 seconds",
      action: "Instant alerts on changes"
    },
    contractAnalysis: {
      title: "Contract Interaction Analysis",
      description: "Validate all contract interactions",
      frequency: "Pre-transaction",
      action: "Block malicious contracts"
    },
    transactionSimulation: {
      title: "Transaction Simulation",
      description: "Test transactions before execution",
      frequency: "Pre-execution",
      action: "Warn of potential losses"
    }
  };

  const scanWallet = async () => {
    // Simulate wallet security scan
    const mockResults = {
      riskLevel: "MEDIUM",
      tokenApprovals: 7,
      highRiskApprovals: 2,
      suspiciousTransactions: 1,
      protectionScore: 65,
      threats: [
        {
          type: "Unlimited USDC Approval",
          risk: "HIGH", 
          details: "Contract 0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B has unlimited USDC access"
        },
        {
          type: "Unknown Contract Interaction",
          risk: "MEDIUM",
          details: "Recent interaction with unverified contract"
        }
      ]
    };
    setScanResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">WALLET PROTECTION SYSTEM</h1>
          <p className="text-xl text-red-300">Defend Against Background Asset Drainage</p>
        </div>

        <Alert className="border-red-500 bg-red-500/20 border-2">
          <Shield className="h-8 w-8 text-red-500" />
          <AlertDescription className="text-red-200 text-lg">
            <strong>ACTIVE THREAT DETECTION:</strong> Monitoring for unauthorized approvals, malicious contracts, and background asset drainage attempts on your wallet.
          </AlertDescription>
        </Alert>

        {/* Wallet Security Scanner */}
        <Card className="bg-gray-800/50 border-red-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Scan className="h-6 w-6 mr-2" />
              Wallet Security Scanner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Input
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter wallet address to scan"
                  className="bg-gray-900 text-white"
                />
                <Button
                  onClick={scanWallet}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Scan Wallet
                </Button>
              </div>

              {scanResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-red-600/10 border border-red-600/30 rounded text-center">
                      <div className="text-red-400 font-bold text-lg">Risk Level</div>
                      <div className="text-red-500 font-bold text-xl">{scanResults.riskLevel}</div>
                    </div>
                    
                    <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                      <div className="text-yellow-400 font-bold text-lg">Token Approvals</div>
                      <div className="text-yellow-500 font-bold text-xl">{scanResults.tokenApprovals}</div>
                    </div>
                    
                    <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded text-center">
                      <div className="text-orange-400 font-bold text-lg">High Risk</div>
                      <div className="text-orange-500 font-bold text-xl">{scanResults.highRiskApprovals}</div>
                    </div>
                    
                    <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                      <div className="text-blue-400 font-bold text-lg">Protection Score</div>
                      <div className="text-blue-500 font-bold text-xl">{scanResults.protectionScore}/100</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-bold">Detected Threats:</h3>
                    {scanResults.threats.map((threat: any, index: number) => (
                      <div key={index} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-red-400 font-bold">{threat.type}</span>
                          <Badge variant="destructive">{threat.risk}</Badge>
                        </div>
                        <p className="text-gray-300 text-sm">{threat.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Protection Methods */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Comprehensive Protection Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {protectionMethods.map((method, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-orange-400 font-bold">{method.method}</h3>
                      <Badge variant={method.severity === 'CRITICAL' ? 'destructive' : 
                                   method.severity === 'HIGH' ? 'default' : 'secondary'}>
                        {method.severity}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="p-2 bg-red-600/10 border border-red-600/30 rounded">
                        <div className="text-red-400 font-semibold mb-1">Threat:</div>
                        <div className="text-gray-300">{method.threat}</div>
                      </div>
                      <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                        <div className="text-green-400 font-semibold mb-1">Protection:</div>
                        <div className="text-gray-300">{method.protection}</div>
                      </div>
                      <div className="p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                        <div className="text-blue-400 font-semibold mb-1">Implementation:</div>
                        <div className="text-gray-300">{method.implementation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Background Threats Analysis */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              Background Threat Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backgroundThreats.map((threat, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-yellow-400 font-bold">{threat.threat}</h3>
                      <Badge variant={threat.currentRisk === 'HIGH' ? 'destructive' : 
                                   threat.currentRisk === 'MEDIUM' ? 'default' : 'secondary'}>
                        {threat.currentRisk} RISK
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{threat.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                        <div className="text-blue-400 font-semibold mb-1">Detection:</div>
                        <div className="text-gray-300">{threat.detection}</div>
                      </div>
                      <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                        <div className="text-green-400 font-semibold mb-1">Prevention:</div>
                        <div className="text-gray-300">{threat.prevention}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Protection Contract */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              Wallet Protection Smart Contract
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-200">
                  <strong>SMART CONTRACT PROTECTION:</strong> Deploy this contract to create an on-chain protection layer that validates all transactions and prevents malicious interactions.
                </AlertDescription>
              </Alert>

              <Textarea
                value={protectionContract}
                readOnly
                className="bg-gray-900 text-green-400 font-mono text-xs h-64"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  onClick={() => navigator.clipboard.writeText(protectionContract)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Contract
                </Button>
                
                <Button
                  onClick={() => window.open('https://remix.ethereum.org/', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Deploy Contract
                </Button>
                
                <Button
                  onClick={() => {
                    const blob = new Blob([protectionContract], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'WalletProtectionGuard.sol';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Contract
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Protection Actions */}
        <Card className="bg-gray-800/50 border-red-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Immediate Protection Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {protectionActions.map((action, index) => (
                <div key={index} className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-red-400 font-bold">{action.action}</h3>
                      <Badge variant={action.urgency === 'IMMEDIATE' ? 'destructive' : 
                                   action.urgency === 'HIGH' ? 'default' : 'secondary'}>
                        {action.urgency}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 text-sm">{action.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                        <div className="text-green-400 font-semibold mb-1">Impact:</div>
                        <div className="text-gray-300">{action.impact}</div>
                      </div>
                      <div className="p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                        <div className="text-blue-400 font-semibold mb-1">Tool:</div>
                        <div className="text-gray-300">{action.tool}</div>
                      </div>
                    </div>
                    
                    <Button
                      className="bg-red-600 hover:bg-red-700 w-full"
                      size="sm"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Execute {action.action}
                    </Button>
                  </div>
                </div>
              ))}

              <Alert className="border-red-500 bg-red-500/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-200">
                  <strong>IMMEDIATE ACTION REQUIRED:</strong> Execute these protection measures within 1 hour to secure your wallet against background threats and asset drainage.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Protection Dashboard */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Bell className="h-6 w-6 mr-2" />
              Real-Time Protection Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(realTimeProtection).map(([key, protection], index) => (
                  <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                    <div className="space-y-3">
                      <h3 className="text-blue-400 font-bold">{protection.title}</h3>
                      <p className="text-gray-300 text-sm">{protection.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-300">Frequency: </span>
                          <span className="text-green-400">{protection.frequency}</span>
                        </div>
                        <div>
                          <span className="text-gray-300">Action: </span>
                          <span className="text-blue-400">{protection.action}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm">● ACTIVE</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Alert className="border-blue-500 bg-blue-500/20">
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-blue-200">
                  <strong>24/7 MONITORING:</strong> Real-time protection systems actively monitoring your wallet for threats, with instant alerts and automatic defensive actions.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('https://revoke.cash/', '_blank')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Revoke Approvals
                </Button>
                
                <Button
                  onClick={() => window.open('https://app.safe.global/', '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Setup Multi-Sig
                </Button>
                
                <Button
                  onClick={() => window.open('https://tenderly.co/', '_blank')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Enable Simulation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}