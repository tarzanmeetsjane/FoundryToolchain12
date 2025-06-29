import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Wallet,
  Target,
  ArrowRight,
  ExternalLink,
  Crown
} from "lucide-react";

export default function WalletSwitchingGuide() {
  const [switchStep, setSwitchStep] = useState(0);

  const correctWallet = {
    address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    role: "Primary Owner Wallet",
    portfolio: "$686K+ (ETHG, AICC, ETHGR)",
    ethBalance: "Confirmed ETH transfers",
    status: "YOUR MAIN WALLET"
  };

  const wrongWallets = [
    {
      address: "0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb",
      status: "Under Investigation",
      issue: "Unclear if yours"
    },
    {
      address: "Unknown/New Address",
      status: "Wrong Connection",
      issue: "Not your main portfolio"
    }
  ];

  const switchingSteps = [
    {
      step: 1,
      action: "Disconnect Current Wallet",
      description: "Disconnect the wrong wallet from SushiSwap",
      details: [
        "Go to sushi.com",
        "Click connected wallet address (top right)",
        "Click 'Disconnect'",
        "Confirm disconnection"
      ]
    },
    {
      step: 2,
      action: "Open MetaMask",
      description: "Access your MetaMask extension",
      details: [
        "Click MetaMask extension icon",
        "Enter password if locked",
        "Check current account",
        "Verify account list"
      ]
    },
    {
      step: 3,
      action: "Switch to Correct Account",
      description: "Select your primary wallet",
      details: [
        "Click account dropdown in MetaMask",
        "Look for 0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
        "Click to select this account",
        "Verify address matches exactly"
      ]
    },
    {
      step: 4,
      action: "Reconnect to SushiSwap",
      description: "Connect with correct wallet",
      details: [
        "Go back to sushi.com",
        "Click 'Connect Wallet'",
        "Select MetaMask",
        "Approve connection"
      ]
    },
    {
      step: 5,
      action: "Verify Portfolio",
      description: "Confirm your tokens appear",
      details: [
        "Check portfolio section",
        "Look for ETHG (2.1M tokens)",
        "Look for AICC (17.5K tokens)",
        "Look for ETHGR (1.99M tokens)"
      ]
    }
  ];

  const troubleshooting = [
    {
      problem: "Don't see correct wallet in MetaMask",
      solution: "Import wallet using seed phrase or private key",
      urgent: true
    },
    {
      problem: "Wallet connects but no tokens visible",
      solution: "Add token contracts manually",
      urgent: false
    },
    {
      problem: "SushiSwap keeps connecting to wrong wallet",
      solution: "Clear browser cache and cookies",
      urgent: false
    },
    {
      problem: "MetaMask shows different account",
      solution: "Switch account in MetaMask first, then connect",
      urgent: true
    }
  ];

  const tokenContracts = [
    {
      symbol: "ETHG",
      contract: "0x3fC29836E84E471a053D2D9E80494A867D670EAD",
      amount: "2,100,000",
      value: "$632,618.30"
    },
    {
      symbol: "ETHGR", 
      contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      amount: "1,990,000",
      value: "Recovery tokens"
    },
    {
      symbol: "AICC",
      contract: "Contract ID needed",
      amount: "17,500",
      value: "$1,527.50"
    }
  ];

  const verificationChecks = [
    {
      check: "Wallet Address Match",
      expected: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      critical: true
    },
    {
      check: "ETHG Balance",
      expected: "2,100,000 tokens visible",
      critical: true
    },
    {
      check: "ETH Balance",
      expected: "Some ETH visible (for gas)",
      critical: false
    },
    {
      check: "Transaction History",
      expected: "Recent transactions including 0xf8ce43ec...677c29",
      critical: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            WALLET SWITCHING GUIDE
          </h1>
          <p className="text-xl text-orange-300">
            Connect to Your Correct $686K Portfolio Wallet
          </p>
        </div>

        {/* Problem Alert */}
        <Alert className="border-red-500 bg-red-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <AlertDescription className="text-red-200 text-lg">
            <strong>WRONG WALLET CONNECTED:</strong> SushiSwap is connected to the wrong wallet. You need to switch to your primary wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 to access your $686K portfolio.
          </AlertDescription>
        </Alert>

        {/* Correct vs Wrong Wallet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-green-500 border-2">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">CORRECT WALLET ✓</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold">Primary Address</h3>
                  <p className="text-white font-mono text-sm break-all">{correctWallet.address}</p>
                  <Badge className="bg-green-600 text-white mt-2">{correctWallet.status}</Badge>
                </div>
                
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold">Portfolio Value</h3>
                  <p className="text-white text-xl font-bold">{correctWallet.portfolio}</p>
                  <p className="text-gray-400 text-sm">ETHG, AICC, ETHGR tokens</p>
                </div>
                
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold">ETH Status</h3>
                  <p className="text-white">{correctWallet.ethBalance}</p>
                  <p className="text-gray-400 text-sm">Transaction 0xf8ce43ec...677c29</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-red-500 border-2">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl">WRONG WALLETS ✗</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wrongWallets.map((wallet, index) => (
                  <div key={index} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                    <h3 className="text-red-400 font-bold">{wallet.address}</h3>
                    <p className="text-white text-sm">{wallet.issue}</p>
                    <Badge className="bg-red-600 text-white mt-1">{wallet.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Switching */}
        <Card className="bg-gray-800/50 border-orange-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Step-by-Step Wallet Switching</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {switchingSteps.map((step, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-orange-400 font-bold text-lg mb-2">{step.action}</h3>
                      <p className="text-white mb-3">{step.description}</p>
                      <div className="space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <p className="text-gray-400 text-sm">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Token Contracts for Verification */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Expected Token Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tokenContracts.map((token, index) => (
                <div key={index} className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-purple-400 font-bold">{token.symbol}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{token.amount} tokens</p>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold">{token.value}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-mono">{token.contract}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Checklist */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Connection Verification Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {verificationChecks.map((check, index) => (
                <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold">{check.check}</h3>
                      <p className="text-gray-400 text-sm">{check.expected}</p>
                    </div>
                    <Badge className={check.critical ? "bg-red-600" : "bg-blue-600"}>
                      {check.critical ? "CRITICAL" : "VERIFY"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Troubleshooting Common Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {troubleshooting.map((issue, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-yellow-400 font-bold">{issue.problem}</h3>
                      <p className="text-white text-sm">{issue.solution}</p>
                    </div>
                    <Badge className={issue.urgent ? "bg-red-600" : "bg-blue-600"}>
                      {issue.urgent ? "URGENT" : "OPTIONAL"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://sushi.com/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Open SushiSwap
          </Button>
          
          <Button 
            onClick={() => window.open('chrome://extensions/', '_blank')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Open MetaMask
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${correctWallet.address}`, '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Crown className="h-6 w-6 mr-2" />
            Verify Wallet
          </Button>
          
          <Button 
            onClick={() => navigator.clipboard.writeText(correctWallet.address)}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            Copy Address
          </Button>
        </div>

        {/* Success Path */}
        <Alert className="border-green-500 bg-green-500/20">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>SUCCESS PATH:</strong> Disconnect wrong wallet → Switch to 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 in MetaMask → Reconnect to SushiSwap → Verify $686K portfolio appears → Continue ETH recovery operations.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}