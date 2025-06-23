import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet,
  Download,
  Import,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  ExternalLink,
  AlertTriangle
} from "lucide-react";

export default function WalletSetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState("");

  const walletOptions = [
    {
      name: "Rainbow Wallet",
      description: "Best for beginners - easy setup and great UX",
      url: "https://rainbow.me/",
      downloadUrl: "https://rainbow.me/download",
      pros: ["Mobile-first design", "Built-in DeFi", "Easy import", "Great support"],
      rating: "Excellent for your needs",
      recommended: true
    },
    {
      name: "Trust Wallet",
      description: "Multi-chain support with built-in DEX",
      url: "https://trustwallet.com/",
      downloadUrl: "https://trustwallet.com/download",
      pros: ["Multi-chain", "Built-in trading", "Mobile & desktop", "Secure"],
      rating: "Great alternative",
      recommended: false
    },
    {
      name: "Coinbase Wallet",
      description: "Enterprise security with easy onramps",
      url: "https://wallet.coinbase.com/",
      downloadUrl: "https://wallet.coinbase.com/downloads",
      pros: ["Bank-grade security", "Easy fiat onramp", "24/7 support", "Insurance"],
      rating: "Most secure option",
      recommended: false
    }
  ];

  const setupSteps = [
    {
      step: 1,
      title: "Choose New Wallet",
      description: "Select a better wallet to replace problematic MetaMask",
      completed: currentStep > 1
    },
    {
      step: 2,
      title: "Download & Install",
      description: "Get the wallet app on your device",
      completed: currentStep > 2
    },
    {
      step: 3,
      title: "Import Your Tokens",
      description: "Transfer your existing wallet using seed phrase",
      completed: currentStep > 3
    },
    {
      step: 4,
      title: "Test Trading",
      description: "Execute a small test trade to verify everything works",
      completed: currentStep > 4
    },
    {
      step: 5,
      title: "Full Trading Access",
      description: "Start trading your $686K+ portfolio with confidence",
      completed: currentStep > 5
    }
  ];

  const progressPercentage = (currentStep / setupSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Wallet Setup Wizard
          </h1>
          <p className="text-2xl text-green-300">
            Let's Get You Trading Without the Hassles
          </p>
        </div>

        {/* Progress Tracker */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Setup Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Step {currentStep} of {setupSteps.length}</span>
                <span className="text-green-400">{progressPercentage.toFixed(0)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {setupSteps.map((step) => (
                  <div key={step.step} className={`p-3 rounded border text-center ${
                    step.completed 
                      ? 'bg-green-600/20 border-green-600' 
                      : step.step === currentStep
                      ? 'bg-blue-600/20 border-blue-600'
                      : 'bg-gray-600/20 border-gray-600'
                  }`}>
                    <div className="flex items-center justify-center mb-2">
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          step.step === currentStep ? 'border-blue-400 text-blue-400' : 'border-gray-400 text-gray-400'
                        }`}>
                          {step.step}
                        </div>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-sm">{step.title}</h3>
                    <p className="text-gray-400 text-xs">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Step Content */}
        {currentStep === 1 && (
          <Card className="bg-gray-800/50 border-blue-500 border-2">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Step 1: Choose Your New Wallet</CardTitle>
              <CardDescription className="text-gray-400">
                Select a wallet that will work better than your current MetaMask setup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {walletOptions.map((wallet, index) => (
                  <div key={index} className={`p-6 rounded border-2 cursor-pointer transition-all ${
                    selectedWallet === wallet.name
                      ? 'bg-blue-600/20 border-blue-500'
                      : wallet.recommended
                      ? 'bg-green-600/10 border-green-600/30 hover:bg-green-600/20'
                      : 'bg-gray-600/10 border-gray-600/30 hover:bg-gray-600/20'
                  }`} onClick={() => setSelectedWallet(wallet.name)}>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Wallet className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{wallet.name}</h3>
                          <p className="text-gray-400">{wallet.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={`${
                          wallet.recommended ? 'bg-green-600' : 'bg-blue-600'
                        } text-white mb-2`}>
                          {wallet.recommended ? 'RECOMMENDED' : 'ALTERNATIVE'}
                        </Badge>
                        <p className="text-yellow-400 text-sm">{wallet.rating}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {wallet.pros.map((pro, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-white text-sm">{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(wallet.url, '_blank');
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(wallet.downloadUrl, '_blank');
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedWallet}
                    className="bg-green-600 hover:bg-green-700 py-6 px-8 text-lg"
                  >
                    Continue with {selectedWallet || "Selected Wallet"}
                    <ArrowRight className="h-6 w-6 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="bg-gray-800/50 border-purple-500 border-2">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Step 2: Download & Install {selectedWallet}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-purple-500 bg-purple-500/20">
                  <Download className="h-6 w-6 text-purple-500" />
                  <AlertDescription className="text-purple-200 text-lg">
                    <strong>Installation Instructions:</strong> Download {selectedWallet} from the official website and complete the installation process.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                    <h3 className="text-purple-400 font-bold mb-3">Mobile Installation</h3>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• Download from App Store/Google Play</li>
                      <li>• Open the app after installation</li>
                      <li>• Choose "Import Existing Wallet"</li>
                      <li>• Have your seed phrase ready</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                    <h3 className="text-blue-400 font-bold mb-3">Desktop Installation</h3>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• Download desktop version</li>
                      <li>• Run installer as administrator</li>
                      <li>• Launch application</li>
                      <li>• Select wallet import option</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="bg-purple-600 hover:bg-purple-700 py-6 px-8 text-lg"
                  >
                    Installation Complete - Continue
                    <ArrowRight className="h-6 w-6 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="bg-gray-800/50 border-yellow-500 border-2">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Step 3: Import Your Existing Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-yellow-500 bg-yellow-500/20">
                  <Import className="h-6 w-6 text-yellow-500" />
                  <AlertDescription className="text-yellow-200 text-lg">
                    <strong>Import Process:</strong> Use your existing seed phrase to import your wallet with all your tokens intact.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                    <h3 className="text-yellow-400 font-bold mb-3">What You'll Need</h3>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• Your 12/24 word seed phrase</li>
                      <li>• Wallet password (optional)</li>
                      <li>• Network selection (Ethereum)</li>
                      <li>• 5-10 minutes of time</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                    <h3 className="text-green-400 font-bold mb-3">Import Steps</h3>
                    <ul className="text-white space-y-2 text-sm">
                      <li>• Select "Import Wallet"</li>
                      <li>• Enter seed phrase carefully</li>
                      <li>• Set new password</li>
                      <li>• Verify wallet address matches</li>
                    </ul>
                  </div>
                </div>

                <Alert className="border-red-500 bg-red-500/20">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <AlertDescription className="text-red-200">
                    <strong>Security Note:</strong> Never share your seed phrase. Make sure you're importing into the official wallet app downloaded from the correct website.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center">
                  <Button
                    onClick={() => setCurrentStep(4)}
                    className="bg-yellow-600 hover:bg-yellow-700 py-6 px-8 text-lg"
                  >
                    Wallet Import Complete
                    <ArrowRight className="h-6 w-6 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep >= 4 && (
          <Card className="bg-gray-800/50 border-green-500 border-2">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Setup Complete - Ready to Trade!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-green-500 bg-green-500/20">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <AlertDescription className="text-green-200 text-xl">
                    <strong>Success!</strong> Your new wallet is ready. You can now trade your $686K+ portfolio without connection issues.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => window.open('https://app.1inch.io/', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 py-8"
                  >
                    <Zap className="h-6 w-6 mr-2" />
                    Start Trading
                  </Button>
                  
                  <Button 
                    onClick={() => window.open('/direct-trading-platform')}
                    className="bg-green-600 hover:bg-green-700 py-8"
                  >
                    <ArrowRight className="h-6 w-6 mr-2" />
                    Trading Platform
                  </Button>
                  
                  <Button 
                    onClick={() => window.open('https://app.uniswap.org/', '_blank')}
                    className="bg-purple-600 hover:bg-purple-700 py-8"
                  >
                    <ExternalLink className="h-6 w-6 mr-2" />
                    Test Uniswap
                  </Button>
                  
                  <Button 
                    onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
                    className="bg-yellow-600 hover:bg-yellow-700 py-8"
                  >
                    <Shield className="h-6 w-6 mr-2" />
                    Verify Wallet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}