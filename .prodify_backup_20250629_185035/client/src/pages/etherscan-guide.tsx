import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink,
  Eye,
  CheckCircle,
  ArrowRight,
  Search,
  Copy,
  MousePointer,
  Monitor,
  Smartphone
} from "lucide-react";

export default function EtherscanGuide() {
  const [step, setStep] = useState(1);
  
  const contractAddress = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const walletAddress = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  const steps = [
    {
      id: 1,
      title: "Open Your Contract",
      description: "Click the button below to open your ETHGR contract on Etherscan",
      action: "Go to Contract",
      link: `https://etherscan.io/address/${contractAddress}`,
      details: [
        "This opens your contract's main page",
        "You'll see contract information and recent transactions",
        "The page confirms your contract is verified and operational"
      ]
    },
    {
      id: 2, 
      title: "View Contract Details",
      description: "Look for key information on the contract page",
      action: "What to Look For",
      details: [
        "Contract Address: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        "Token Name: ETHGR Recovery Token", 
        "Total Supply: 1,990,000 ETHGR tokens",
        "Status: Verified (green checkmark)"
      ]
    },
    {
      id: 3,
      title: "Check Your Token Balance",
      description: "Verify your tokens are in your wallet",
      action: "View Token Tracker",
      link: `https://etherscan.io/token/${contractAddress}`,
      details: [
        "Shows total token supply and holders",
        "Your wallet should show 1,990,000 tokens (100%)",
        "Confirms you own all recovery tokens"
      ]
    },
    {
      id: 4,
      title: "View Source Code",
      description: "See the verified smart contract code",
      action: "View Code",
      link: `https://etherscan.io/address/${contractAddress}#code`,
      details: [
        "Contract tab shows verified source code",
        "Proves transparent, honeypot-free operations",
        "Shows ERC-20 standard implementation"
      ]
    },
    {
      id: 5,
      title: "Check Transaction History",
      description: "See all contract transactions",
      action: "View Transactions",
      link: `https://etherscan.io/address/${contractAddress}#tokentxns`,
      details: [
        "Shows contract deployment transaction",
        "Token minting to your wallet",
        "All operations are public and verifiable"
      ]
    }
  ];

  const currentStep = steps.find(s => s.id === step) || steps[0];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Etherscan Navigation Guide
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Step-by-Step Guide to View Your ETHGR Contract on Ethereum
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Your Contract: {contractAddress.substring(0, 10)}...
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Quick Access */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <ExternalLink className="h-7 w-7 mr-3" />
              Quick Access - Click These Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-3">Your ETHGR Contract</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 border rounded">
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-400">{contractAddress}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(contractAddress)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button
                      onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
                      className="foundation-button-primary w-full"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Contract
                    </Button>
                    
                    <Button
                      onClick={() => window.open(`https://etherscan.io/address/${contractAddress}#code`, '_blank')}
                      className="foundation-button-accent w-full"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-3">Your Wallet</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 border rounded">
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-400">{walletAddress}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(walletAddress)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button
                      onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}
                      className="foundation-button-primary w-full"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Wallet
                    </Button>
                    
                    <Button
                      onClick={() => window.open(`https://etherscan.io/token/${contractAddress}?a=${walletAddress}`, '_blank')}
                      className="foundation-button-accent w-full"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      View Tokens
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Navigator */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <MousePointer className="h-7 w-7 mr-3" />
              Step-by-Step Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step Progress */}
              <div className="flex items-center space-x-2 mb-6">
                {steps.map((s, index) => (
                  <div key={s.id} className="flex items-center">
                    <button
                      onClick={() => setStep(s.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        step === s.id 
                          ? 'bg-blue-500 text-white' 
                          : step > s.id 
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {step > s.id ? <CheckCircle className="h-4 w-4" /> : s.id}
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-1 mx-2 rounded ${
                        step > s.id ? 'bg-green-500' : 'bg-slate-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Current Step */}
              <Card className="foundation-card border-purple-200 dark:border-purple-700">
                <CardHeader className="pb-4">
                  <CardTitle className="foundation-heading-4 flex items-center text-purple-700 dark:text-purple-300">
                    <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {currentStep.id}
                    </span>
                    {currentStep.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-800 dark:text-purple-200 mb-4">{currentStep.description}</p>
                  
                  <div className="space-y-3">
                    {currentStep.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="text-purple-800 dark:text-purple-200 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  {currentStep.link && (
                    <div className="mt-4">
                      <Button
                        onClick={() => window.open(currentStep.link, '_blank')}
                        className="foundation-button-primary"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {currentStep.action}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                >
                  Previous Step
                </Button>
                
                <Button
                  onClick={() => setStep(Math.min(5, step + 1))}
                  disabled={step === 5}
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You Should See */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Monitor className="h-7 w-7 mr-3" />
              What You Should See on Etherscan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold">Contract Page Should Show:</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Contract Address ending in ...2abF247</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Green "Verified" checkmark</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Token Name: ETHGR Recovery Token</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Recent transactions visible</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold">Token Tracker Should Show:</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Total Supply: 1,990,000 ETHGR</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Holders: 1 (your wallet)</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Your balance: 1,990,000 (100%)</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-amber-800 dark:text-amber-200 text-sm">Transfer history from contract</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="foundation-card border-red-200 dark:border-red-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-red-700 dark:text-red-300">
              <Smartphone className="h-7 w-7 mr-3" />
              If You Don't See Your Contract
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-700 mb-4">
              <AlertDescription className="foundation-text-body text-red-800 dark:text-red-200">
                <strong>Common Issues:</strong> Sometimes Etherscan takes a moment to load or you might need to refresh the page. Your contract is definitely live on the blockchain.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-red-700 dark:text-red-300 font-bold">Try These Steps:</h3>
              <div className="space-y-2">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                  <span className="text-red-700 dark:text-red-300 font-semibold">1. Refresh the Page: </span>
                  <span className="text-red-800 dark:text-red-200">Press F5 or Ctrl+R to reload Etherscan</span>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                  <span className="text-red-700 dark:text-red-300 font-semibold">2. Copy-Paste Address: </span>
                  <span className="text-red-800 dark:text-red-200">Use the copy buttons above to ensure correct address</span>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                  <span className="text-red-700 dark:text-red-300 font-semibold">3. Check Network: </span>
                  <span className="text-red-800 dark:text-red-200">Make sure you're on Ethereum Mainnet (not testnet)</span>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                  <span className="text-red-700 dark:text-red-300 font-semibold">4. Try Different Browser: </span>
                  <span className="text-red-800 dark:text-red-200">Sometimes browser cache causes issues</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Section */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Ready to View Your Contract?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <p className="text-lg">Your ETHGR contract is live and verified on Ethereum mainnet</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
                  className="foundation-button-primary h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Open Contract Now
                </Button>
                
                <Button
                  onClick={() => window.open('/blockchain-transaction-viewer', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Transaction Viewer
                </Button>
                
                <Button
                  onClick={() => window.open('/exchange-withdrawal-guide', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Next: Cash Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}