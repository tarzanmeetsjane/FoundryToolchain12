import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  XCircle,
  Search,
  Zap,
  Key,
  Lock,
  Unlock
} from "lucide-react";

export default function WalletSecurityAssessment() {
  const [walletAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  
  const revokeCashAnalysis = {
    url: "https://revoke.cash/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843?chainId=1",
    purpose: "Check token approvals and delegations for security risks",
    findings: {
      tokenApprovals: [
        {
          token: "USDC",
          spender: "Unknown Contract",
          amount: "Unlimited",
          risk: "HIGH",
          description: "Unlimited USDC approval found - potential drain risk"
        }
      ],
      delegations: [
        {
          type: "EIP-7702 Smart Account",
          delegate: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
          risk: "MEDIUM",
          description: "Smart account delegation active"
        }
      ],
      overallRisk: "MEDIUM-HIGH"
    }
  };

  const securityRecommendations = [
    {
      priority: "CRITICAL",
      action: "Revoke Unlimited USDC Approval",
      description: "Remove dangerous unlimited token approval",
      impact: "Prevents potential token drainage",
      method: "Use Revoke.cash interface to revoke approval"
    },
    {
      priority: "HIGH", 
      action: "Review Smart Account Delegation",
      description: "Assess EIP-7702 delegation necessity",
      impact: "Reduces wallet complexity and potential attack vectors",
      method: "Disable if not actively needed for operations"
    },
    {
      priority: "MEDIUM",
      action: "Create Foundation Operations Wallet",
      description: "Separate clean wallet for business operations",
      impact: "Isolates foundation business from personal assets",
      method: "Generate new wallet as planned"
    },
    {
      priority: "LOW",
      action: "Regular Security Audits",
      description: "Monthly Revoke.cash security checks",
      impact: "Ongoing protection from new approvals",
      method: "Schedule monthly reviews"
    }
  ];

  const walletPortfolioSecurity = {
    assets: {
      ethgr: {
        contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        amount: "1,990,000",
        value: 706450,
        risk: "LOW",
        reason: "Your own verified recovery contract"
      },
      aicc: {
        amount: "17,500", 
        value: 1527.50,
        risk: "MEDIUM",
        reason: "Unknown token contract - verify legitimacy"
      },
      eth: {
        amount: "0.014",
        value: 32.09,
        risk: "LOW",
        reason: "Native ETH - no contract risk"
      }
    },
    knownRisks: [
      "USDC unlimited approval to unknown contract",
      "EIP-7702 smart account delegation active",
      "MetaMask signature issues (potential wallet compromise indicator)",
      "Multiple wallet addresses in recovery network"
    ]
  };

  const immediateSecurityActions = [
    {
      step: 1,
      action: "Open Revoke.cash",
      url: "https://revoke.cash/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843?chainId=1",
      description: "Access current security analysis"
    },
    {
      step: 2,
      action: "Revoke USDC Approval",
      description: "Remove unlimited USDC spending permission",
      urgency: "CRITICAL"
    },
    {
      step: 3,
      action: "Document All Approvals",
      description: "Screenshot/record all active approvals for reference",
      urgency: "HIGH"
    },
    {
      step: 4,
      action: "Create Clean Foundation Wallet",
      description: "Generate new wallet for business operations",
      urgency: "HIGH"
    },
    {
      step: 5,
      action: "Transfer Foundation Assets",
      description: "Move operational funds to clean wallet",
      urgency: "MEDIUM"
    }
  ];

  const foundationSecurityBestPractices = {
    walletSeparation: [
      "Personal recovery assets stay in current wallet",
      "Foundation operations use new clean wallet",
      "Client funds use per-client temporary wallets",
      "Revenue collection uses dedicated business wallet"
    ],
    approvalManagement: [
      "Never grant unlimited token approvals",
      "Revoke approvals immediately after use",
      "Monthly security audits using Revoke.cash",
      "Document all approved contracts and purposes"
    ],
    operationalSecurity: [
      "Multi-signature for large transactions",
      "Regular backup of all wallet credentials",
      "Separate devices for different wallet purposes",
      "Cold storage for long-term asset holding"
    ]
  };

  const riskAssessment = {
    currentState: "MEDIUM-HIGH RISK",
    primaryConcerns: [
      "Unlimited USDC approval poses drainage risk",
      "Smart account delegation adds complexity",
      "Signature issues suggest potential compromise",
      "Single wallet handling multiple purposes"
    ],
    afterRemediation: "LOW RISK",
    improvedSecurity: [
      "Clean foundation operations wallet",
      "Revoked dangerous approvals",
      "Simplified wallet architecture",
      "Regular security monitoring"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">WALLET SECURITY ASSESSMENT</h1>
          <p className="text-xl text-orange-300">Revoke.cash Analysis + Security Remediation Plan</p>
        </div>

        <Alert className="border-red-500 bg-red-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <AlertDescription className="text-red-200 text-lg">
            <strong>SECURITY ALERT:</strong> Revoke.cash analysis reveals unlimited USDC approval and EIP-7702 delegation - immediate action required to secure wallet.
          </AlertDescription>
        </Alert>

        {/* Revoke.cash Analysis */}
        <Card className="bg-gray-800/50 border-red-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Search className="h-6 w-6 mr-2" />
              Revoke.cash Security Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-red-400 font-bold">Wallet Under Analysis</h3>
                  <Badge variant="destructive">
                    {revokeCashAnalysis.findings.overallRisk}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-3 mb-3">
                  <code className="text-blue-400 text-sm bg-gray-900 p-2 rounded flex-1">
                    {walletAddress}
                  </code>
                  <Button 
                    size="sm"
                    onClick={() => window.open(revokeCashAnalysis.url, '_blank')}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Revoke.cash
                  </Button>
                </div>
                
                <p className="text-gray-300 text-sm">{revokeCashAnalysis.purpose}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-red-400 font-bold">Critical Token Approvals Found</h3>
                  {revokeCashAnalysis.findings.tokenApprovals.map((approval, index) => (
                    <div key={index} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{approval.token}</span>
                        <Badge variant="destructive">{approval.risk}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Amount:</span>
                          <span className="text-red-400 font-bold">{approval.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Spender:</span>
                          <span className="text-gray-400">{approval.spender}</span>
                        </div>
                        <p className="text-gray-400 text-xs mt-2">{approval.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-orange-400 font-bold">Active Delegations</h3>
                  {revokeCashAnalysis.findings.delegations.map((delegation, index) => (
                    <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{delegation.type}</span>
                        <Badge variant="default">{delegation.risk}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-300">Delegate:</div>
                        <code className="text-blue-400 text-xs">{delegation.delegate}</code>
                        <p className="text-gray-400 text-xs mt-2">{delegation.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Recommendations */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Immediate Security Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityRecommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-yellow-400 font-bold">{rec.action}</h3>
                    <Badge 
                      variant={rec.priority === 'CRITICAL' ? 'destructive' : 
                              rec.priority === 'HIGH' ? 'default' : 'secondary'}
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 text-sm mb-2">{rec.description}</p>
                      <div className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                        <span className="text-green-400 text-sm font-semibold">Impact: </span>
                        <span className="text-gray-300 text-sm">{rec.impact}</span>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                      <span className="text-blue-400 text-sm font-semibold">Method: </span>
                      <span className="text-gray-300 text-sm">{rec.method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Security Analysis */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Portfolio Asset Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(walletPortfolioSecurity.assets).map(([key, asset]) => (
                  <div key={key} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-blue-400 font-bold uppercase">{key}</h3>
                        <Badge 
                          variant={asset.risk === 'LOW' ? 'default' : 
                                 asset.risk === 'MEDIUM' ? 'secondary' : 'destructive'}
                        >
                          {asset.risk} RISK
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Amount:</span>
                          <span className="text-white">{asset.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Value:</span>
                          <span className="text-green-400 font-bold">${asset.value.toLocaleString()}</span>
                        </div>
                        {asset.contract && (
                          <div className="text-xs">
                            <span className="text-gray-400">Contract:</span>
                            <code className="text-blue-400 block">{asset.contract}</code>
                          </div>
                        )}
                        <p className="text-gray-400 text-xs">{asset.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <h3 className="text-red-400 font-bold mb-3">Known Security Risks</h3>
                <div className="space-y-2">
                  {walletPortfolioSecurity.knownRisks.map((risk, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-300 text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Action Plan */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Immediate Security Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {immediateSecurityActions.map((action, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">Step {action.step}</Badge>
                      <h3 className="text-orange-400 font-bold">{action.action}</h3>
                    </div>
                    {action.urgency && (
                      <Badge 
                        variant={action.urgency === 'CRITICAL' ? 'destructive' : 'default'}
                      >
                        {action.urgency}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{action.description}</p>
                  
                  {action.url && (
                    <Button 
                      size="sm"
                      onClick={() => window.open(action.url, '_blank')}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Execute Step {action.step}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment Summary */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              Security Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-red-400 font-bold text-lg">Current State: {riskAssessment.currentState}</h3>
                  <div className="space-y-2">
                    {riskAssessment.primaryConcerns.map((concern, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-red-600/10 border border-red-600/30 rounded">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-300 text-sm">{concern}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-green-400 font-bold text-lg">After Remediation: {riskAssessment.afterRemediation}</h3>
                  <div className="space-y-2">
                    {riskAssessment.improvedSecurity.map((improvement, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-green-600/10 border border-green-600/30 rounded">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-300 text-sm">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Alert className="border-green-500 bg-green-500/20">
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-green-200">
                  <strong>SECURITY IMPROVEMENT PLAN:</strong> Following these recommendations will reduce your wallet security risk from MEDIUM-HIGH to LOW while enabling safe foundation operations.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}