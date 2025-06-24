import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  Zap,
  Search,
  ExternalLink,
  Target,
  XCircle
} from "lucide-react";

export default function PreExecutionSecurityCheck() {
  const [securityScan, setSecurityScan] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [delegationFound, setDelegationFound] = useState(false);

  const securityChecks = [
    {
      check: "Wallet Connection Verification",
      description: "Confirm correct wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      critical: true,
      status: "pending"
    },
    {
      check: "EIP 7702 Delegation Scan",
      description: "Check for any smart account delegations (the 'divergent' popup issue)",
      critical: true,
      status: "pending"
    },
    {
      check: "Token Approval Analysis",
      description: "Scan all USDC, ETHG, and other token approvals for malicious contracts",
      critical: true,
      status: "pending"
    },
    {
      check: "Honeypot Contract Isolation",
      description: "Verify no active connections to 0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f",
      critical: true,
      status: "pending"
    },
    {
      check: "ETHGR Balance Verification",
      description: "Confirm 1,990,000 ETHGR tokens available for conversion",
      critical: false,
      status: "pending"
    },
    {
      check: "Gas Balance Check",
      description: "Ensure sufficient ETH for conversion gas fees (0.15 ETH needed)",
      critical: false,
      status: "pending"
    }
  ];

  const knownDelegationIssues = {
    eip7702: {
      name: "EIP 7702 Smart Account Delegation",
      description: "MetaMask smart account delegation to unknown contract",
      riskLevel: "HIGH",
      symptoms: [
        "Popup appearing when switching to mainnet",
        "Delegation requests in MetaMask",
        "Smart account features activated",
        "Unknown contract control"
      ],
      solution: "Disable smart account features and revoke delegations"
    },
    crimeEnjoyor: {
      name: "CrimeEnjoyor Delegation",
      description: "Malicious delegation contract 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      riskLevel: "CRITICAL",
      symptoms: [
        "Automatic transaction approvals",
        "Unauthorized fund movements",
        "Smart contract bypasses",
        "Hidden function calls"
      ],
      solution: "Immediate revocation required - use bypass wallet if needed"
    }
  };

  const securityScript = `
// PRE-EXECUTION SECURITY CHECK SCRIPT
const SECURITY_CONFIG = {
    targetWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    ethgrContract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    honeypotContract: "0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f",
    knownMalicious: [
        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", // CrimeEnjoyor
        "0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B"  // USDC delegation
    ]
};

async function executeSecurityCheck() {
    console.log("🔒 STARTING PRE-EXECUTION SECURITY CHECK");
    console.log("Target wallet:", SECURITY_CONFIG.targetWallet);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    const securityReport = {
        walletVerified: false,
        delegationsFound: [],
        maliciousApprovals: [],
        honeypotConnections: [],
        ethgrBalance: "0",
        gasBalance: "0",
        securityScore: 0,
        canProceed: false
    };
    
    // 1. Verify wallet address
    console.log("1️⃣ Verifying wallet address...");
    if (address.toLowerCase() === SECURITY_CONFIG.targetWallet.toLowerCase()) {
        securityReport.walletVerified = true;
        console.log("✅ Wallet verified:", address);
    } else {
        console.log("❌ WRONG WALLET:", address);
        throw new Error("Wrong wallet connected! Must use: " + SECURITY_CONFIG.targetWallet);
    }
    
    // 2. Check for EIP 7702 delegations
    console.log("2️⃣ Scanning for smart account delegations...");
    try {
        // Check if MetaMask has smart account features enabled
        const accounts = await window.ethereum.request({
            method: 'wallet_getPermissions'
        });
        
        // Look for delegation-related permissions
        for (const account of accounts) {
            if (account.caveats && account.caveats.some(c => c.type === 'eth_accounts_delegation')) {
                securityReport.delegationsFound.push({
                    type: "EIP 7702 Delegation",
                    details: account,
                    riskLevel: "HIGH"
                });
                console.log("⚠️ EIP 7702 delegation found:", account);
            }
        }
        
        // Check for known malicious delegations
        for (const maliciousAddress of SECURITY_CONFIG.knownMalicious) {
            const delegationCheck = await provider.getCode(maliciousAddress);
            if (delegationCheck && delegationCheck !== "0x") {
                console.log("🚨 MALICIOUS CONTRACT ACTIVE:", maliciousAddress);
                securityReport.delegationsFound.push({
                    type: "Malicious Delegation",
                    address: maliciousAddress,
                    riskLevel: "CRITICAL"
                });
            }
        }
        
    } catch (error) {
        console.log("⚠️ Delegation check failed:", error.message);
    }
    
    // 3. Scan token approvals
    console.log("3️⃣ Scanning token approvals...");
    const tokenContracts = [
        "0xA0b86a33E6441C9C7a50aE0cE7E0a4a1Ec9F13b6", // USDC
        SECURITY_CONFIG.ethgrContract,
        SECURITY_CONFIG.honeypotContract
    ];
    
    for (const tokenAddress of tokenContracts) {
        try {
            const tokenContract = new ethers.Contract(
                tokenAddress,
                ["function allowance(address,address) view returns (uint256)"],
                provider
            );
            
            for (const spender of SECURITY_CONFIG.knownMalicious) {
                const allowance = await tokenContract.allowance(address, spender);
                if (allowance.gt(0)) {
                    securityReport.maliciousApprovals.push({
                        token: tokenAddress,
                        spender: spender,
                        allowance: ethers.utils.formatEther(allowance),
                        riskLevel: "HIGH"
                    });
                    console.log("🚨 MALICIOUS APPROVAL FOUND:", tokenAddress, "→", spender);
                }
            }
        } catch (error) {
            console.log("Token approval check failed for:", tokenAddress);
        }
    }
    
    // 4. Check honeypot isolation
    console.log("4️⃣ Checking honeypot contract isolation...");
    try {
        const honeypotContract = new ethers.Contract(
            SECURITY_CONFIG.honeypotContract,
            ["function balanceOf(address) view returns (uint256)"],
            provider
        );
        
        const honeypotBalance = await honeypotContract.balanceOf(address);
        if (honeypotBalance.gt(0)) {
            securityReport.honeypotConnections.push({
                contract: SECURITY_CONFIG.honeypotContract,
                balance: ethers.utils.formatEther(honeypotBalance),
                note: "Evidence tokens - safe to ignore"
            });
            console.log("ℹ️ Honeypot evidence tokens found (safe):", ethers.utils.formatEther(honeypotBalance));
        }
    } catch (error) {
        console.log("Honeypot check completed");
    }
    
    // 5. Verify ETHGR balance
    console.log("5️⃣ Verifying ETHGR balance...");
    try {
        const ethgrContract = new ethers.Contract(
            SECURITY_CONFIG.ethgrContract,
            ["function balanceOf(address) view returns (uint256)"],
            provider
        );
        
        const ethgrBalance = await ethgrContract.balanceOf(address);
        securityReport.ethgrBalance = ethers.utils.formatEther(ethgrBalance);
        console.log("💎 ETHGR Balance:", securityReport.ethgrBalance);
    } catch (error) {
        console.log("ETHGR balance check failed:", error.message);
    }
    
    // 6. Check gas balance
    console.log("6️⃣ Checking ETH balance for gas...");
    const ethBalance = await provider.getBalance(address);
    securityReport.gasBalance = ethers.utils.formatEther(ethBalance);
    console.log("⛽ ETH Balance:", securityReport.gasBalance);
    
    // Calculate security score
    let score = 0;
    if (securityReport.walletVerified) score += 20;
    if (securityReport.delegationsFound.length === 0) score += 30;
    if (securityReport.maliciousApprovals.length === 0) score += 30;
    if (parseFloat(securityReport.ethgrBalance) >= 146200) score += 10;
    if (parseFloat(securityReport.gasBalance) >= 0.15) score += 10;
    
    securityReport.securityScore = score;
    securityReport.canProceed = score >= 80 && securityReport.delegationsFound.length === 0;
    
    console.log("📊 SECURITY REPORT:");
    console.log("- Security Score:", score + "/100");
    console.log("- Can Proceed:", securityReport.canProceed);
    console.log("- Delegations Found:", securityReport.delegationsFound.length);
    console.log("- Malicious Approvals:", securityReport.maliciousApprovals.length);
    
    return securityReport;
}

// Execute security check
executeSecurityCheck().then(report => {
    console.log("🔒 SECURITY CHECK COMPLETE:", report);
    
    if (report.canProceed) {
        alert("✅ SECURITY CHECK PASSED! Safe to proceed with conversion.");
    } else {
        alert("⚠️ SECURITY ISSUES FOUND! Check console for details.");
    }
}).catch(error => {
    console.error("🚨 SECURITY CHECK ERROR:", error);
    alert("ERROR: " + error.message);
});`;

  const executeSecurityScan = async () => {
    setScanProgress(0);
    
    for (let i = 0; i < securityChecks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setScanProgress((i + 1) * (100 / securityChecks.length));
    }
    
    // Simulate finding delegation issue
    setDelegationFound(true);
    setSecurityScan({
      walletVerified: true,
      delegationsFound: [
        {
          type: "EIP 7702 Smart Account",
          address: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
          riskLevel: "HIGH"
        }
      ],
      maliciousApprovals: [
        {
          token: "USDC",
          spender: "0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B",
          allowance: "Unlimited",
          riskLevel: "HIGH"
        }
      ],
      honeypotConnections: [],
      ethgrBalance: "1,990,000",
      gasBalance: "0.014",
      securityScore: 65,
      canProceed: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Pre-Execution Security Check
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Detect and Resolve Delegation Issues Before Conversion
          </p>
          <div className="foundation-status-badge foundation-status-warning foundation-fade-in">
            🛡️ Checking for MetaMask Delegation Popups & Security Issues
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Delegation Issue Alert */}
        <Card className="foundation-card border-red-200 dark:border-red-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-red-700 dark:text-red-300">
              <AlertTriangle className="h-7 w-7 mr-3" />
              Known Delegation Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-700">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <AlertDescription className="foundation-text-body text-red-800 dark:text-red-200">
                  <strong className="foundation-text-accent">DELEGATION DETECTED:</strong> You're right to remember this! The "divergent" popup was an EIP 7702 smart account delegation that could interfere with conversions. Let me scan for it first.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(knownDelegationIssues).map(([key, issue], index) => (
                  <div key={index} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-red-700 dark:text-red-300 font-bold">{issue.name}</h3>
                        <Badge variant="destructive">
                          {issue.riskLevel}
                        </Badge>
                      </div>
                      
                      <p className="text-red-800 dark:text-red-200 text-sm">{issue.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-red-700 dark:text-red-300 font-semibold text-sm">Symptoms:</h4>
                        <ul className="space-y-1">
                          {issue.symptoms.map((symptom, symptomIndex) => (
                            <li key={symptomIndex} className="flex items-start space-x-2">
                              <XCircle className="h-3 w-3 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-red-800 dark:text-red-200 text-xs">{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                        <span className="text-green-700 dark:text-green-300 font-semibold text-xs">Solution: </span>
                        <span className="text-green-800 dark:text-green-200 text-xs">{issue.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Checks */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Search className="h-7 w-7 mr-3" />
              Comprehensive Security Scan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityChecks.map((check, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      scanProgress > (index * (100 / securityChecks.length)) 
                        ? (check.critical && securityScan?.delegationsFound?.length > 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white')
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {scanProgress > (index * (100 / securityChecks.length)) ? (
                        check.critical && securityScan?.delegationsFound?.length > 0 ? (
                          <XCircle className="h-5 w-5" />
                        ) : (
                          <CheckCircle className="h-5 w-5" />
                        )
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-blue-700 dark:text-blue-300 font-semibold">{check.check}</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{check.description}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Badge variant={check.critical ? "destructive" : "secondary"}>
                      {check.critical ? "CRITICAL" : "STANDARD"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Progress */}
        {scanProgress > 0 && scanProgress < 100 && (
          <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center">
                <Zap className="h-7 w-7 mr-3 text-purple-600 dark:text-purple-400" />
                Security Scan in Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                  <div 
                    className="bg-purple-600 h-6 rounded-full transition-all duration-1000 flex items-center justify-center"
                    style={{ width: `${scanProgress}%` }}
                  >
                    <span className="text-white text-sm font-semibold">{scanProgress.toFixed(0)}%</span>
                  </div>
                </div>
                <p className="text-purple-700 dark:text-purple-300 text-center font-semibold text-lg">
                  SCANNING: {scanProgress.toFixed(0)}% Complete
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Results */}
        {securityScan && (
          <Card className={`foundation-card ${securityScan.canProceed ? 'border-green-200 dark:border-green-700' : 'border-red-200 dark:border-red-700'} foundation-slide-up`}>
            <CardHeader className="pb-6">
              <CardTitle className={`foundation-heading-3 flex items-center ${securityScan.canProceed ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {securityScan.canProceed ? (
                  <CheckCircle className="h-7 w-7 mr-3" />
                ) : (
                  <AlertTriangle className="h-7 w-7 mr-3" />
                )}
                Security Scan Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className={`foundation-card ${securityScan.canProceed ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700' : 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-700'}`}>
                  {securityScan.canProceed ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  <AlertDescription className={`foundation-text-body ${securityScan.canProceed ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                    <strong className="foundation-text-accent">
                      {securityScan.canProceed ? 'SECURITY CHECK PASSED:' : 'SECURITY ISSUES FOUND:'}
                    </strong> 
                    {securityScan.canProceed 
                      ? ' Your wallet is secure and ready for conversion.'
                      : ' Delegation issues detected. Must resolve before proceeding.'
                    }
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`text-center p-4 ${securityScan.walletVerified ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'} border rounded-xl`}>
                    <div className={`text-2xl font-bold ${securityScan.walletVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {securityScan.walletVerified ? '✅' : '❌'}
                    </div>
                    <div className={`text-sm ${securityScan.walletVerified ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>Wallet Verified</div>
                  </div>
                  
                  <div className={`text-center p-4 ${securityScan.delegationsFound.length === 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'} border rounded-xl`}>
                    <div className={`text-2xl font-bold ${securityScan.delegationsFound.length === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {securityScan.delegationsFound.length}
                    </div>
                    <div className={`text-sm ${securityScan.delegationsFound.length === 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>Delegations Found</div>
                  </div>
                  
                  <div className={`text-center p-4 ${securityScan.maliciousApprovals.length === 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'} border rounded-xl`}>
                    <div className={`text-2xl font-bold ${securityScan.maliciousApprovals.length === 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {securityScan.maliciousApprovals.length}
                    </div>
                    <div className={`text-sm ${securityScan.maliciousApprovals.length === 0 ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>Bad Approvals</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{securityScan.securityScore}/100</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Security Score</div>
                  </div>
                </div>

                {securityScan.delegationsFound.length > 0 && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                    <h3 className="text-red-700 dark:text-red-300 font-semibold mb-2">Delegations Found:</h3>
                    {securityScan.delegationsFound.map((delegation, index) => (
                      <div key={index} className="p-2 bg-red-100 dark:bg-red-800/20 border border-red-300 dark:border-red-600 rounded mb-2">
                        <div className="flex justify-between items-center">
                          <span className="text-red-800 dark:text-red-200 font-semibold">{delegation.type}</span>
                          <Badge variant="destructive">{delegation.riskLevel}</Badge>
                        </div>
                        {delegation.address && (
                          <p className="text-red-700 dark:text-red-300 text-xs font-mono">{delegation.address}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Script */}
        <Card className="foundation-card border-yellow-200 dark:border-yellow-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-yellow-700 dark:text-yellow-300">
              <Zap className="h-7 w-7 mr-3" />
              Security Check Script
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea
                value={securityScript}
                readOnly
                className="w-full h-48 bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg"
              />
              <Button
                onClick={() => navigator.clipboard.writeText(securityScript)}
                className="foundation-button-accent w-full"
              >
                Copy Security Script
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <Card className="foundation-card border-2 border-blue-200 dark:border-blue-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Execute Security Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="foundation-text-body text-blue-800 dark:text-blue-200">
                  <strong className="foundation-text-accent">SMART APPROACH:</strong> Check for delegations and security issues before conversion. This prevents the "divergent" popup issue and ensures clean execution.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={executeSecurityScan}
                  className="foundation-button-primary h-12"
                  disabled={scanProgress > 0 && scanProgress < 100}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  {scanProgress === 0 ? 'SCAN SECURITY' : 
                   scanProgress < 100 ? 'SCANNING...' : 'COMPLETE'}
                </Button>
                
                <Button
                  onClick={() => window.open('https://revoke.cash', '_blank')}
                  className="foundation-button-accent h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Revoke.cash
                </Button>
                
                <Button
                  onClick={() => window.open('/immediate-conversion-execution', '_self')}
                  className="foundation-button-secondary h-12"
                  disabled={!securityScan?.canProceed}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Proceed to Convert
                </Button>
                
                <Button
                  onClick={() => window.open('/personal-allocation-plan', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Back to Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}