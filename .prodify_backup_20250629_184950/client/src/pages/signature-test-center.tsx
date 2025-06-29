import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Target,
  Eye,
  ArrowRight,
  Wallet
} from "lucide-react";

export default function SignatureTestCenter() {
  const [testStep, setTestStep] = useState(1);
  const [signatureResult, setSignatureResult] = useState<string>("");

  const testSteps = [
    {
      step: 1,
      title: "Open Trading Platform",
      description: "Launch Uniswap for signature test",
      action: "Click button to open Uniswap"
    },
    {
      step: 2,
      title: "Connect Wallet",
      description: "Connect your MetaMask wallet",
      action: "Click 'Connect Wallet' in Uniswap"
    },
    {
      step: 3,
      title: "Initiate Small Trade",
      description: "Try swapping $5 worth of ETH",
      action: "Set up swap: ETH → USDC"
    },
    {
      step: 4,
      title: "Watch for Signature",
      description: "MetaMask popup should appear",
      action: "Look for signature request popup"
    },
    {
      step: 5,
      title: "Report Results",
      description: "Tell me what happened",
      action: "Did popup appear? Any errors?"
    }
  ];

  const tradingPlatforms = [
    {
      name: "Uniswap V3",
      url: "https://app.uniswap.org/",
      recommended: true,
      purpose: "Primary test platform"
    },
    {
      name: "1inch",
      url: "https://app.1inch.io/",
      recommended: true,
      purpose: "Alternative if Uniswap fails"
    },
    {
      name: "SushiSwap",
      url: "https://www.sushi.com/swap",
      recommended: false,
      purpose: "Backup test platform"
    }
  ];

  const yourAssets = [
    {
      token: "ETH",
      balance: "0.014 ETH",
      value: "$32.09",
      testAmount: "$5-10",
      recommended: true
    },
    {
      token: "AICC",
      balance: "17,500",
      value: "~$1,522",
      testAmount: "100 tokens",
      recommended: false
    }
  ];

  const possibleOutcomes = [
    {
      outcome: "✅ Signature Popup Appears",
      meaning: "MetaMask working correctly",
      nextStep: "Proceed with larger trades",
      color: "green"
    },
    {
      outcome: "❌ No Popup Appears",
      meaning: "MetaMask connection issue",
      nextStep: "Switch to alternative wallet",
      color: "red"
    },
    {
      outcome: "⚠️ Popup Appears But Fails",
      meaning: "Gas or network issue",
      nextStep: "Adjust gas fees or try again",
      color: "yellow"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Signature Test Center
          </h1>
          <p className="text-2xl text-blue-300">
            Let's Test MetaMask Signature Functionality
          </p>
        </div>

        {/* Mission Status */}
        <Alert className="border-blue-500 bg-blue-500/20 border-4">
          <Zap className="h-12 w-12 text-blue-500" />
          <AlertDescription className="text-blue-200 text-2xl">
            <strong>MISSION:</strong> Test if MetaMask shows signature popups when you try to trade. This will solve the mystery of why your $686K portfolio isn't responding to trade attempts.
          </AlertDescription>
        </Alert>

        {/* Test Progress */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Signature Test Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Test Step {testStep} of {testSteps.length}</span>
                <span className="text-green-400">{((testStep / testSteps.length) * 100).toFixed(0)}% Complete</span>
              </div>
              <Progress value={(testStep / testSteps.length) * 100} className="w-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {testSteps.map((step) => (
                  <div key={step.step} className={`p-3 rounded border text-center ${
                    step.step < testStep 
                      ? 'bg-green-600/20 border-green-600' 
                      : step.step === testStep
                      ? 'bg-blue-600/20 border-blue-600'
                      : 'bg-gray-600/20 border-gray-600'
                  }`}>
                    <div className="flex items-center justify-center mb-2">
                      {step.step < testStep ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          step.step === testStep ? 'border-blue-400 text-blue-400' : 'border-gray-400 text-gray-400'
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

        {/* Current Step */}
        <Card className="bg-gray-800/50 border-yellow-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              Step {testStep}: {testSteps[testStep - 1]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold text-xl mb-3">
                  {testSteps[testStep - 1]?.description}
                </h3>
                <p className="text-white text-lg mb-4">
                  Action: {testSteps[testStep - 1]?.action}
                </p>
              </div>

              {testStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tradingPlatforms.map((platform, index) => (
                    <div key={index} className={`p-4 rounded border ${
                      platform.recommended 
                        ? 'bg-green-600/10 border-green-600/30' 
                        : 'bg-gray-600/10 border-gray-600/30'
                    }`}>
                      <h3 className="text-white font-bold mb-2">{platform.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{platform.purpose}</p>
                      <Button
                        onClick={() => {
                          window.open(platform.url, '_blank');
                          setTestStep(2);
                        }}
                        className={`w-full ${
                          platform.recommended 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open {platform.name}
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {testStep >= 2 && (
                <div className="text-center space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                      <h3 className="text-blue-400 font-bold mb-3">What to Look For</h3>
                      <ul className="text-white space-y-2 text-sm text-left">
                        <li>• MetaMask extension icon lights up</li>
                        <li>• Popup window appears</li>
                        <li>• Shows transaction details</li>
                        <li>• Gas fee estimate displayed</li>
                        <li>• "Confirm" and "Reject" buttons</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                      <h3 className="text-red-400 font-bold mb-3">If No Popup</h3>
                      <ul className="text-white space-y-2 text-sm text-left">
                        <li>• Check browser notifications</li>
                        <li>• Look for MetaMask badge</li>
                        <li>• Try clicking MetaMask icon</li>
                        <li>• Refresh page and retry</li>
                        <li>• Report what you see</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={() => setTestStep(Math.min(testStep + 1, testSteps.length))}
                    className="bg-yellow-600 hover:bg-yellow-700 py-4 px-8"
                  >
                    <ArrowRight className="h-6 w-6 mr-2" />
                    Continue to Next Step
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Your Test Assets */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Assets for Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {yourAssets.map((asset, index) => (
                <div key={index} className={`p-4 rounded border ${
                  asset.recommended 
                    ? 'bg-green-600/10 border-green-600/30' 
                    : 'bg-gray-600/10 border-gray-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-lg">{asset.token}</h3>
                    {asset.recommended && (
                      <Badge className="bg-green-600 text-white">RECOMMENDED</Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Balance:</span>
                      <span className="text-white">{asset.balance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Value:</span>
                      <span className="text-green-400">{asset.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Test Amount:</span>
                      <span className="text-yellow-400">{asset.testAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Possible Outcomes */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Expected Test Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {possibleOutcomes.map((outcome, index) => (
                <div key={index} className={`p-4 rounded border bg-${outcome.color}-600/10 border-${outcome.color}-600/30`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className={`text-${outcome.color}-400 font-bold mb-1`}>Outcome</h3>
                      <p className="text-white">{outcome.outcome}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-bold mb-1">Meaning</h3>
                      <p className="text-white text-sm">{outcome.meaning}</p>
                    </div>
                    <div>
                      <h3 className="text-blue-400 font-bold mb-1">Next Step</h3>
                      <p className="text-white text-sm">{outcome.nextStep}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => {
              window.open('https://app.uniswap.org/', '_blank');
              setTestStep(2);
            }}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <Zap className="h-6 w-6 mr-2" />
            Start Test
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.1inch.io/', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Target className="h-6 w-6 mr-2" />
            Try 1inch
          </Button>
          
          <Button 
            onClick={() => window.open('https://rainbow.me/', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Rainbow Backup
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Eye className="h-6 w-6 mr-2" />
            Check Wallet
          </Button>
        </div>

        {/* Ready Alert */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-xl">
            <strong>YOU'RE READY!</strong> Click "Start Test" to open Uniswap and test if MetaMask signature popups appear. This will solve the trading mystery once and for all.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}