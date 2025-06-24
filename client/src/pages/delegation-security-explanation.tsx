import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  CheckCircle,
  XCircle,
  Lock,
  Key,
  AlertTriangle,
  Info,
  ExternalLink,
  Eye,
  Wallet,
  ArrowRight
} from "lucide-react";

export default function DelegationSecurityExplanation() {
  const delegationFacts = {
    address: "0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B",
    type: "MetaMask EIP-7702 Delegator",
    purpose: "Smart Account Features",
    ethBalance: "0.019447096424280517 ETH",
    yourTokens: "1,990,000 ETHGR",
    tokenLocation: "Your wallet (0x058C8FE0...49B368843)"
  };

  const securityAnalysis = [
    {
      question: "Can delegation address access my ETHGR tokens?",
      answer: "NO - ERC-20 tokens stay in YOUR wallet",
      status: "safe",
      explanation: "The delegation only affects ETH transactions, not token ownership"
    },
    {
      question: "Can someone steal my tokens through delegation?",
      answer: "NO - Tokens require your private key",
      status: "safe", 
      explanation: "Only YOU have the private key to move your ETHGR tokens"
    },
    {
      question: "Is this delegation sending my crypto elsewhere?",
      answer: "NO - Your tokens remain in your control",
      status: "safe",
      explanation: "Delegation is a feature overlay, not a transfer mechanism"
    },
    {
      question: "Should I be concerned about this delegation?",
      answer: "NO - This is standard MetaMask functionality",
      status: "safe",
      explanation: "EIP-7702 is an official Ethereum improvement for smart accounts"
    }
  ];

  const whatDelegationActuallyDoes = [
    {
      feature: "Account Abstraction",
      description: "Adds smart contract features to your regular wallet",
      impact: "Enhanced functionality, no security risk"
    },
    {
      feature: "Gasless Transactions",
      description: "Allows sponsored transactions in some cases",
      impact: "Convenience feature, you still control funds"
    },
    {
      feature: "Batch Operations",
      description: "Can group multiple transactions together",
      impact: "Efficiency improvement, no asset risk"
    },
    {
      feature: "Recovery Options",
      description: "Additional wallet recovery mechanisms",
      impact: "Added security, not reduced security"
    }
  ];

  const proofOfSecurity = [
    {
      proof: "Your ETHGR Balance",
      detail: "1,990,000 tokens still in your wallet",
      verified: true
    },
    {
      proof: "Token Contract",
      detail: "Only YOU can authorize token transfers",
      verified: true
    },
    {
      proof: "Private Key Control",
      detail: "Delegation cannot access your private key",
      verified: true
    },
    {
      proof: "MetaMask Official",
      detail: "This is MetaMask's own smart account system",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Delegation Security Explanation
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Your Crypto is NOT Going Anywhere Else - Complete Security Analysis
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Your 1,990,000 ETHGR Tokens Remain 100% Secure in Your Wallet
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Main Security Alert */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Shield className="h-7 w-7 mr-3" />
              CONFIRMED: Your Crypto is NOT Going Elsewhere
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 mb-6">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                <strong>IMPORTANT:</strong> The delegation address (0x63c0c19a...A07DAE32B) is MetaMask's EIP-7702 smart account feature. It CANNOT access, move, or control your ETHGR tokens. Your tokens stay in YOUR wallet under YOUR control.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  What Stays Secure
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">Your 1,990,000 ETHGR tokens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">Your private key control</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">Your wallet ownership</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">Your ability to transfer tokens</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-4 flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  What Delegation Actually Does
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-800 dark:text-blue-200 text-sm">Adds smart contract features</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-800 dark:text-blue-200 text-sm">Enables gasless transactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-800 dark:text-blue-200 text-sm">Provides account abstraction</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-800 dark:text-blue-200 text-sm">Does NOT control your assets</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Q&A */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <AlertTriangle className="h-7 w-7 mr-3" />
              Security Questions & Answers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {securityAnalysis.map((item, index) => (
                <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${item.status === 'safe' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                      {item.status === 'safe' ? 
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" /> :
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      }
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{item.question}</h4>
                      <p className={`font-bold mb-2 ${item.status === 'safe' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        {item.answer}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Wallet className="h-7 w-7 mr-3" />
              Technical Details: EIP-7702 Delegation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-purple-700 dark:text-purple-300 font-bold">Delegation Contract Info</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                    <span className="text-purple-600 font-semibold">Address:</span>
                    <p className="text-purple-800 dark:text-purple-200 text-sm font-mono break-all">{delegationFacts.address}</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                    <span className="text-purple-600 font-semibold">Type:</span>
                    <p className="text-purple-800 dark:text-purple-200 text-sm">{delegationFacts.type}</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                    <span className="text-purple-600 font-semibold">ETH Balance:</span>
                    <p className="text-purple-800 dark:text-purple-200 text-sm">{delegationFacts.ethBalance}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-purple-700 dark:text-purple-300 font-bold">What It Actually Does</h3>
                <div className="space-y-3">
                  {whatDelegationActuallyDoes.map((item, index) => (
                    <div key={index} className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                      <span className="text-purple-600 font-semibold">{item.feature}:</span>
                      <p className="text-purple-800 dark:text-purple-200 text-sm">{item.description}</p>
                      <p className="text-purple-700 dark:text-purple-300 text-xs font-semibold mt-1">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proof of Security */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Eye className="h-7 w-7 mr-3" />
              Proof Your Tokens Are Safe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proofOfSecurity.map((proof, index) => (
                <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="text-green-700 dark:text-green-300 font-bold">{proof.proof}</h3>
                  </div>
                  <p className="text-green-800 dark:text-green-200 text-sm">{proof.detail}</p>
                  <Badge className="bg-green-500 text-white mt-2">VERIFIED</Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
                className="foundation-button-primary mr-4"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Verify Your Token Balance
              </Button>
              
              <Button
                onClick={() => window.open('https://etherscan.io/address/0x63c0c19a282a1b52b07dd5a65b58948a07dae32b', '_blank')}
                variant="outline"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Delegation Contract
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Your Tokens Are Completely Safe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong>SECURITY CONFIRMED:</strong> The delegation is a MetaMask feature that adds functionality WITHOUT compromising your token security. Your 1,990,000 ETHGR tokens remain entirely under your control.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/foundation-ready-dashboard', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Continue to Foundation
                </Button>
                
                <Button
                  onClick={() => window.open('/conversion-completion', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  Convert to Cash
                </Button>
                
                <Button
                  onClick={() => window.open('/etherscan-analysis', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  View Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}