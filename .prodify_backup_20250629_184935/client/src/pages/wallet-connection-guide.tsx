import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  Copy,
  CheckCircle,
  AlertTriangle,
  Shield,
  Key,
  ExternalLink,
  Zap
} from "lucide-react";

export default function WalletConnectionGuide() {
  const [copied, setCopied] = useState("");

  const primaryWallet = {
    address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    name: "Primary Recovery Wallet",
    assets: [
      "1,990,000 ETHGR tokens ($648,740)",
      "Contract ownership rights",
      "Recovery token control",
      "All liquidation assets"
    ],
    status: "REQUIRED FOR ALL TRADING"
  };

  const connectionSteps = [
    {
      step: 1,
      platform: "MetaMask",
      action: "Import Wallet",
      description: "Use your private key or seed phrase",
      critical: true
    },
    {
      step: 2,
      platform: "Uniswap",
      action: "Connect Wallet",
      description: "Connect the recovery wallet for pool creation",
      critical: true
    },
    {
      step: 3,
      platform: "1inch",
      action: "Connect Wallet", 
      description: "For LP token liquidation",
      critical: false
    },
    {
      step: 4,
      platform: "Telegram OTC",
      action: "Verify Ownership",
      description: "Sign message to prove wallet ownership",
      critical: true
    }
  ];

  const tradingPlatforms = [
    {
      platform: "Uniswap V2",
      url: "https://app.uniswap.org/",
      purpose: "Create ETHGR/ETH liquidity pool",
      walletRequired: "Primary wallet connected",
      funds: "Need 5-10 ETH for liquidity"
    },
    {
      platform: "1inch Exchange",
      url: "https://app.1inch.io/",
      purpose: "Best rates for LP token swaps",
      walletRequired: "Primary wallet connected",
      funds: "Gas fees only"
    },
    {
      platform: "Telegram @DefiOTC",
      url: "https://t.me/DefiOTC",
      purpose: "Direct ETHGR sales to buyers",
      walletRequired: "Ownership verification",
      funds: "No upfront cost"
    },
    {
      platform: "Coinbase Pro",
      url: "https://pro.coinbase.com/",
      purpose: "Buy ETH for liquidity pools",
      walletRequired: "Any funding wallet",
      funds: "Credit card or bank"
    }
  ];

  const securityChecklist = [
    {
      item: "Private key stored securely",
      status: "Critical",
      description: "Never share your private key"
    },
    {
      item: "Seed phrase backed up",
      status: "Critical", 
      description: "Write down and store safely"
    },
    {
      item: "Wallet verified on Etherscan",
      status: "Complete",
      description: "ETHGR tokens confirmed in wallet"
    },
    {
      item: "No malicious approvals",
      status: "Monitor",
      description: "Check revoke.cash regularly"
    }
  ];

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Wallet className="h-12 w-12 text-green-400" />
            <h1 className="text-5xl font-bold text-white">
              WALLET CONNECTION GUIDE
            </h1>
          </div>
          <p className="text-2xl text-green-300">
            Connect Your Primary Recovery Wallet for Liquidation
          </p>
        </div>

        {/* Critical Wallet Alert */}
        <Alert className="border-red-500 bg-red-500/20 border-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <AlertDescription className="text-red-200 text-center text-2xl">
            <strong>CRITICAL:</strong> You MUST use wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 for ALL liquidation activities. This wallet contains your $648,740 ETHGR tokens.
          </AlertDescription>
        </Alert>

        {/* Primary Wallet Info */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">YOUR PRIMARY RECOVERY WALLET</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-green-600/10 border border-green-600/30 rounded">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-green-400 font-bold text-xl">{primaryWallet.name}</h5>
                <Badge className="bg-red-600 text-white text-lg">{primaryWallet.status}</Badge>
              </div>
              
              <div className="mb-4">
                <label className="text-gray-400 text-sm">Wallet Address:</label>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-white font-mono text-lg bg-gray-700 p-3 rounded flex-1">
                    {primaryWallet.address}
                  </p>
                  <Button 
                    onClick={() => copyToClipboard(primaryWallet.address, "primary")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {copied === "primary" ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Assets in This Wallet:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {primaryWallet.assets.map((asset, idx) => (
                    <div key={idx} className="p-2 bg-green-600/20 border border-green-600/50 rounded">
                      <p className="text-green-300 text-sm">• {asset}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Steps */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">WALLET CONNECTION STEPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectionSteps.map((step) => (
                <div key={step.step} className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                    step.critical ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-blue-400 font-bold text-lg">{step.platform}</h5>
                    <p className="text-white font-medium">{step.action}</p>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>
                  <div>
                    {step.critical && (
                      <Badge className="bg-red-600 text-white">CRITICAL</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Platforms */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">TRADING PLATFORMS - WALLET REQUIREMENTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tradingPlatforms.map((platform, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-purple-400 font-bold text-lg">{platform.platform}</h5>
                    <Button 
                      onClick={() => window.open(platform.url, '_blank')}
                      className="bg-purple-600 hover:bg-purple-700 p-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Purpose: </span>
                      <span className="text-white">{platform.purpose}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Wallet: </span>
                      <span className="text-blue-400 font-medium">{platform.walletRequired}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Funding: </span>
                      <span className="text-green-400 font-medium">{platform.funds}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Checklist */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">SECURITY CHECKLIST</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityChecklist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex-1">
                    <h6 className="text-yellow-400 font-medium">{item.item}</h6>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                  <Badge className={`${
                    item.status === 'Critical' ? 'bg-red-600' :
                    item.status === 'Complete' ? 'bg-green-600' :
                    'bg-orange-600'
                  } text-white`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open('https://metamask.io/', '_blank')}
          >
            <Wallet className="h-6 w-6 mr-2" />
            MetaMask Setup
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
          >
            <Zap className="h-6 w-6 mr-2" />
            Connect Uniswap
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={() => window.open('https://etherscan.io/address/' + primaryWallet.address, '_blank')}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View on Etherscan
          </Button>
          
          <Button 
            className="bg-red-600 hover:bg-red-700 text-lg py-8"
            onClick={() => copyToClipboard(primaryWallet.address, "final")}
          >
            {copied === "final" ? <CheckCircle className="h-6 w-6 mr-2" /> : <Copy className="h-6 w-6 mr-2" />}
            Copy Address
          </Button>
        </div>

        {/* Final Instructions */}
        <Alert className="border-green-500 bg-green-500/10">
          <Shield className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>READY TO TRADE:</strong> Once connected to wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843, you can execute all liquidation strategies. Your 1,990,000 ETHGR tokens worth $648,740 are ready for conversion to ETH and USD.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}