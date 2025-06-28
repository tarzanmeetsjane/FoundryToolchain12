import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { CheckCircle, Copy, ExternalLink, Settings, ArrowRight, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LiveSwapGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState('');
  const [waitingForUser, setWaitingForUser] = useState(false);

  const ethgrContract1 = "0x3E7C77514f884E0954d1F1C3a9765665cE1D76E9"; // Active 3 days ago
  const ethgrContract2 = "0xc2b6d375b7d14c9ce73f97ddf565002cce257308"; // Foundation contract
  const ethgrContract3 = "0xfa7de122f5fba7123cdb4fe6bf75821c2b937c90"; // Alternative contract
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const [selectedContract, setSelectedContract] = useState(ethgrContract1);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    setWaitingForUser(false);
  };

  const waitForUser = () => {
    setWaitingForUser(true);
  };

  const steps = [
    {
      title: "Open Uniswap",
      action: "Click to open Uniswap V3 in new tab",
      buttonText: "Open Uniswap",
      url: `https://app.uniswap.org/#/swap?inputCurrency=${selectedContract}&outputCurrency=ETH`
    },
    {
      title: "Connect Your Wallet",
      action: "Click 'Connect Wallet' and select your wallet",
      instruction: "Choose MetaMask, WalletConnect, or your preferred wallet"
    },
    {
      title: "Access Swap Settings",
      action: "Click the gear ⚙️ icon in the top right of the swap interface",
      instruction: "This opens the transaction settings"
    },
    {
      title: "Set Slippage Tolerance",
      action: "Change slippage tolerance to 15%",
      instruction: "This is critical for ETHGR swaps to succeed",
      value: "15"
    },
    {
      title: "Select Input Token",
      action: "Click 'Select token' on the FROM field",
      instruction: "We'll paste the ETHGR contract address"
    },
    {
      title: "Paste ETHGR Contract",
      action: "Paste this contract address in the search field",
      instruction: "Choose from your verified ETHGR contracts",
      copyValue: selectedContract
    },
    {
      title: "Confirm ETHGR Token",
      action: "Click on ETHGR token when it appears",
      instruction: "Verify it shows your balance of ~1,990,000 tokens"
    },
    {
      title: "Set Output to ETH",
      action: "Click 'Select token' on the TO field and choose ETH",
      instruction: "ETH should be in the common tokens list"
    },
    {
      title: "Enter Swap Amount",
      action: "Enter 1000 in the ETHGR amount field",
      instruction: "Start with a small test amount first",
      value: "1000"
    },
    {
      title: "Review Swap Details",
      action: "Check the swap preview shows reasonable ETH output",
      instruction: "Should show approximately 0.1-0.5 ETH output"
    },
    {
      title: "Execute Swap",
      action: "Click 'Swap' button and confirm in your wallet",
      instruction: "Your wallet will ask you to confirm the transaction"
    },
    {
      title: "Success Confirmation",
      action: "Wait for transaction confirmation",
      instruction: "You'll see 'Transaction confirmed' message"
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Live ETHGR Swap Guide
          </h1>
          <p className="text-slate-600 text-lg">
            Follow along step-by-step with copy-paste assistance
          </p>
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 inline-block">
            <div className="text-green-800 font-semibold">✅ Recent Activity Confirmed!</div>
            <div className="text-green-700 text-sm">ETHGR transactions working 3 days ago</div>
          </div>
        </div>

        {/* Contract Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select ETHGR Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedContract === ethgrContract1 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedContract(ethgrContract1)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Recent Activity ⭐</h4>
                  {selectedContract === ethgrContract1 && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
                <div className="text-sm text-gray-600 font-mono break-all mb-2">
                  {ethgrContract1}
                </div>
                <div className="text-sm text-green-600 font-semibold">Used 3 days ago!</div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedContract === ethgrContract2 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedContract(ethgrContract2)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Foundation</h4>
                  {selectedContract === ethgrContract2 && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
                <div className="text-sm text-gray-600 font-mono break-all mb-2">
                  {ethgrContract2}
                </div>
                <div className="text-sm text-blue-600">1,990,000 ETHGR</div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedContract === ethgrContract3 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedContract(ethgrContract3)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Alternative</h4>
                  {selectedContract === ethgrContract3 && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
                <div className="text-sm text-gray-600 font-mono break-all mb-2">
                  {ethgrContract3}
                </div>
                <div className="text-sm text-blue-600">Check wallet</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <div className="text-sm text-blue-800">
                <strong>Selected Contract:</strong> {
                  selectedContract === ethgrContract1 ? 'Recent Activity (Used 3 days ago)' :
                  selectedContract === ethgrContract2 ? 'Foundation (1.99M tokens)' : 
                  'Alternative Contract'
                }
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step Card */}
        <Card className="mb-6 border-2 border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {currentStep}
              </div>
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* Step Action */}
              <Alert className="border-blue-200 bg-blue-50">
                <Settings className="h-4 w-4" />
                <AlertDescription className="text-blue-800">
                  <strong>Action:</strong> {currentStepData.action}
                </AlertDescription>
              </Alert>

              {/* Step Instructions */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <p className="text-gray-700">{currentStepData.instruction}</p>
              </div>

              {/* Copy Value if Available */}
              {currentStepData.copyValue && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Copy This Value:</h4>
                  <div className="flex items-center gap-2">
                    <Input
                      value={currentStepData.copyValue}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(currentStepData.copyValue!, 'contract')}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied === 'contract' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <div className="text-sm text-green-700 mt-2">
                    Contract: {selectedContract === ethgrContract1 ? 'Recent Activity (Used 3 days ago)' : 
                              selectedContract === ethgrContract2 ? 'Foundation (1.99M ETHGR)' : 
                              'Alternative ETHGR'}
                  </div>
                </div>
              )}

              {/* Number Value if Available */}
              {currentStepData.value && !currentStepData.copyValue && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Enter This Value:</h4>
                  <div className="flex items-center gap-2">
                    <Input
                      value={currentStepData.value}
                      readOnly
                      className="font-mono text-lg font-bold w-24"
                    />
                    <span className="text-purple-700">
                      {currentStepData.value === "15" ? "%" : "ETHGR"}
                    </span>
                  </div>
                </div>
              )}

              {/* URL Button if Available */}
              {currentStepData.url && (
                <div className="text-center">
                  <Button
                    onClick={() => {
                      window.open(currentStepData.url, '_blank');
                      waitForUser();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {currentStepData.buttonText}
                  </Button>
                </div>
              )}

              {/* Next Step Button */}
              <div className="text-center pt-4">
                {waitingForUser && currentStep === 1 && (
                  <div className="mb-4 p-3 bg-amber-50 rounded border border-amber-200">
                    <p className="text-amber-800">Uniswap should now be open in a new tab. Ready to proceed?</p>
                  </div>
                )}
                
                <Button
                  onClick={nextStep}
                  disabled={currentStep >= steps.length}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  {currentStep >= steps.length ? 'Complete!' : 'I completed this step'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-semibold mb-1">Selected ETHGR Contract:</div>
                <div className="font-mono text-xs break-all">{selectedContract}</div>
                <div className="text-xs text-blue-600 mb-2">
                  {selectedContract === ethgrContract1 ? 'Recent activity (3 days ago)' : 
                   selectedContract === ethgrContract2 ? '1,990,000 ETHGR tokens' : 
                   'Alternative contract'}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => copyToClipboard(selectedContract, 'reference')}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {copied === 'reference' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-semibold mb-1">Settings:</div>
                <div>Slippage: 15%</div>
                <div>Amount: 1,000 ETHGR (test)</div>
                <div>Output: ETH</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        {currentStep > steps.length && (
          <Card className="border-2 border-green-300 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Swap Complete!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-100">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-800">
                    <strong>Congratulations!</strong> You've successfully swapped ETHGR tokens. 
                    Your wallet should now show the received ETH.
                  </AlertDescription>
                </Alert>
                
                <div className="text-center">
                  <Button
                    onClick={() => window.open(`https://etherscan.io/address/${foundationWallet}`, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Your Wallet on Etherscan
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