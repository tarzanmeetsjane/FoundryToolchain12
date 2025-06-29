import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Network,
  Wallet,
  ArrowRight,
  Settings,
  Import,
  Eye
} from "lucide-react";
import { Link } from "wouter";

export default function RainbowMainnetSwitch() {
  const [currentStep, setCurrentStep] = useState(0);

  const switchSteps = [
    {
      title: "Open Rainbow Settings",
      description: "Click the settings gear in Rainbow wallet",
      action: "Access wallet settings menu",
      critical: true
    },
    {
      title: "Find Network Settings", 
      description: "Look for 'Networks' or 'Network' option",
      action: "Navigate to network configuration",
      critical: true
    },
    {
      title: "Switch from Devnet to Mainnet",
      description: "Change from test network to Ethereum Mainnet",
      action: "Select 'Ethereum' or 'Mainnet'",
      critical: true
    },
    {
      title: "Import Existing Wallet",
      description: "Use 'Import Wallet' or 'Add Account' option",
      action: "Enter your seed phrase or private key",
      critical: true
    },
    {
      title: "Verify Token Visibility",
      description: "Check that ETHG, AICC, ETHGR tokens appear",
      action: "Confirm $686K portfolio visible",
      critical: false
    }
  ];

  const troubleshootingOptions = [
    {
      problem: "Can't find network settings",
      solution: "Try 'Settings' → 'Networks' or look for globe/network icon",
      urgent: true
    },
    {
      problem: "Only see devnet options",
      solution: "Update Rainbow app or try 'Add Custom Network'",
      urgent: false
    },
    {
      problem: "Import wallet option missing",
      solution: "Look for '+' button, 'Add Account', or 'Import'",
      urgent: true
    },
    {
      problem: "Tokens still not showing",
      solution: "May need to manually add token contracts",
      urgent: false
    }
  ];

  const yourTokenContracts = [
    {
      symbol: "ETHG",
      contract: "0x3fC29836E84E471a053D2D9E80494A867D670EAD",
      value: "$632,618.30",
      amount: "2,100,000"
    },
    {
      symbol: "AICC", 
      contract: "0x[contract address needed]",
      value: "$1,527.50",
      amount: "17,500"
    },
    {
      symbol: "ETHGR",
      contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      value: "Recovery tokens",
      amount: "1,990,000"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            RAINBOW MAINNET SWITCH
          </h1>
          <p className="text-xl text-purple-300">
            Fix Devnet Issue - Access Your Real $686K Portfolio
          </p>
        </div>

        {/* Critical Alert */}
        <Alert className="border-red-500 bg-red-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <AlertDescription className="text-red-200 text-lg">
            <strong>DEVNET PROBLEM:</strong> Rainbow created a test network wallet instead of importing your mainnet wallet. Your real tokens are on Ethereum Mainnet, not the test network.
          </AlertDescription>
        </Alert>

        {/* Step by Step Process */}
        <Card className="bg-gray-800/50 border-purple-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Network Switch Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {switchSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded border cursor-pointer transition-all ${
                    currentStep === index 
                      ? 'bg-purple-600/20 border-purple-400' 
                      : 'bg-gray-700/30 border-gray-600'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.critical ? 'bg-red-600' : 'bg-blue-600'
                      }`}>
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 text-sm font-bold">{step.action}</p>
                      {step.critical && (
                        <Badge className="bg-red-600 text-white mt-1">CRITICAL</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Token Contracts */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Mainnet Token Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yourTokenContracts.map((token, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="text-center space-y-2">
                    <h3 className="text-green-400 font-bold text-lg">{token.symbol}</h3>
                    <p className="text-white text-sm font-mono break-all">{token.contract}</p>
                    <p className="text-gray-400 text-sm">{token.amount} tokens</p>
                    <p className="text-green-300 font-bold">{token.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Troubleshooting Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {troubleshootingOptions.map((option, index) => (
                <div key={index} className={`p-4 rounded border ${
                  option.urgent 
                    ? 'bg-red-600/10 border-red-600/30' 
                    : 'bg-yellow-600/10 border-yellow-600/30'
                }`}>
                  <h3 className={`font-bold mb-2 ${
                    option.urgent ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {option.problem}
                  </h3>
                  <p className="text-white text-sm">{option.solution}</p>
                  {option.urgent && (
                    <Badge className="bg-red-600 text-white mt-2">URGENT</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('chrome-extension://ieldiilncjhfkalnemgjbffmpomcaigi/popup.html', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-6"
          >
            <Settings className="h-5 w-5 mr-2" />
            Open Rainbow
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-6"
          >
            <Eye className="h-5 w-5 mr-2" />
            View Mainnet
          </Button>
          
          <Link href="/eth-recovery-tracker">
            <Button className="bg-blue-600 hover:bg-blue-700 py-6 w-full">
              <ArrowRight className="h-5 w-5 mr-2" />
              37 ETH Tracker
            </Button>
          </Link>
          
          <Link href="/signature-test-center">
            <Button className="bg-orange-600 hover:bg-orange-700 py-6 w-full">
              <Import className="h-5 w-5 mr-2" />
              Test Signatures
            </Button>
          </Link>
        </div>

        {/* Navigation to Other Tools */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Access All Recovery Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/uniswap-v4-integration">
                <Button variant="outline" className="w-full">V4 Trading</Button>
              </Link>
              <Link href="/direct-trading-platform">
                <Button variant="outline" className="w-full">Direct Trading</Button>
              </Link>
              <Link href="/wallet-setup-wizard">
                <Button variant="outline" className="w-full">Wallet Setup</Button>
              </Link>
              <Link href="/transaction-signature-guide">
                <Button variant="outline" className="w-full">Signature Guide</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Success Confirmation */}
        <Alert className="border-green-500 bg-green-500/20">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>GOAL:</strong> Once you switch to mainnet and import your wallet, your $686K portfolio (ETHG, AICC, ETHGR) will be visible and accessible for trading.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}