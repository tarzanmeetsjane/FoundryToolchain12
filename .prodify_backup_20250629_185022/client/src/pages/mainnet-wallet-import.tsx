import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Network,
  Wallet,
  Key,
  Crown,
  Target,
  ArrowRight
} from "lucide-react";

export default function MainnetWalletImport() {
  const [importMethod, setImportMethod] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const networkIssue = {
    problem: "Rainbow created devnet wallet instead of importing mainnet",
    solution: "Switch to Ethereum Mainnet and import existing wallet",
    impact: "Cannot see real tokens on devnet",
    urgency: "Critical - blocks 37 ETH access"
  };

  const mainnetWallets = [
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      role: "Primary Owner Wallet",
      assets: "ETH, AICC, ETHG, ETHGR tokens",
      priority: "Import this wallet first",
      network: "Ethereum Mainnet"
    },
    {
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
      role: "Contract Owner",
      assets: "37 ETH investigation target",
      priority: "Access after import",
      network: "Ethereum Mainnet"
    }
  ];

  const importSteps = [
    {
      step: 1,
      action: "Switch to Ethereum Mainnet",
      description: "Change network from devnet to mainnet",
      critical: true
    },
    {
      step: 2,
      action: "Import Existing Wallet",
      description: "Use seed phrase or private key",
      critical: true
    },
    {
      step: 3,
      action: "Verify Token Visibility",
      description: "Check ETHG, AICC, ETHGR tokens appear",
      critical: true
    },
    {
      step: 4,
      action: "Test Signature Functionality",
      description: "Try small transaction to verify popups",
      critical: false
    },
    {
      step: 5,
      action: "Access 37 ETH Contract",
      description: "Investigate contract ownership",
      critical: false
    }
  ];

  const alternativeWallets = [
    {
      name: "MetaMask",
      fix: "Switch network to mainnet, import wallet",
      pros: "Familiar interface, direct mainnet access"
    },
    {
      name: "Trust Wallet",
      fix: "Built-in mainnet, import existing wallet",
      pros: "Multi-chain, mainnet default"
    },
    {
      name: "Coinbase Wallet",
      fix: "Mainnet focused, enterprise grade",
      pros: "Bank integration, customer support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            MAINNET WALLET IMPORT
          </h1>
          <p className="text-2xl text-red-300">
            Fix Rainbow Devnet Issue - Access Real Tokens
          </p>
        </div>

        {/* Critical Issue Alert */}
        <Alert className="border-red-500 bg-red-500/20 border-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <AlertDescription className="text-red-200 text-2xl">
            <strong>NETWORK ISSUE:</strong> Rainbow created devnet wallet instead of importing your mainnet wallet. This is why you can't see your real $686K portfolio. Need immediate mainnet import.
          </AlertDescription>
        </Alert>

        {/* Network Problem Breakdown */}
        <Card className="bg-gray-800/50 border-yellow-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Network Problem Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <h3 className="text-red-400 font-bold mb-2">Problem</h3>
                <p className="text-white text-sm">{networkIssue.problem}</p>
              </div>
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold mb-2">Solution</h3>
                <p className="text-white text-sm">{networkIssue.solution}</p>
              </div>
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold mb-2">Impact</h3>
                <p className="text-white text-sm">{networkIssue.impact}</p>
              </div>
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h3 className="text-purple-400 font-bold mb-2">Urgency</h3>
                <p className="text-white text-sm">{networkIssue.urgency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Mainnet Wallets */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Mainnet Wallets to Import</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mainnetWallets.map((wallet, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2">
                      <p className="text-white font-mono text-sm break-all">{wallet.address}</p>
                      <Badge className="bg-green-600 text-white mt-1">{wallet.role}</Badge>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Assets:</p>
                      <p className="text-green-400 text-sm">{wallet.assets}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Network:</p>
                      <p className="text-white text-sm">{wallet.network}</p>
                    </div>
                    <div>
                      <p className="text-yellow-400 text-sm font-bold">{wallet.priority}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Import Process */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Mainnet Import Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {importSteps.map((step, index) => (
                <div key={index} className={`p-4 rounded border text-center ${
                  step.critical ? 'bg-red-600/10 border-red-600/30' : 'bg-blue-600/10 border-blue-600/30'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    step.critical ? 'bg-red-600' : 'bg-blue-600'
                  }`}>
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{step.action}</h3>
                  <p className="text-gray-400 text-xs">{step.description}</p>
                  {step.critical && (
                    <Badge className="bg-red-600 text-white mt-2 text-xs">CRITICAL</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Import Instructions */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Immediate Import Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h3 className="text-purple-400 font-bold text-lg">Method 1: Rainbow Network Switch</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white font-bold">1. Open Rainbow Wallet</p>
                    <p className="text-gray-400 text-sm">Click the network selector (currently showing devnet)</p>
                  </div>
                  <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white font-bold">2. Switch to Ethereum Mainnet</p>
                    <p className="text-gray-400 text-sm">Select "Ethereum" from network list</p>
                  </div>
                  <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                    <p className="text-white font-bold">3. Import Existing Wallet</p>
                    <p className="text-gray-400 text-sm">Use "Import Wallet" option with your seed phrase</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-blue-400 font-bold text-lg">Method 2: Alternative Wallet</h3>
                <div className="space-y-3">
                  {alternativeWallets.map((wallet, index) => (
                    <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                      <p className="text-white font-bold">{wallet.name}</p>
                      <p className="text-gray-400 text-sm">{wallet.fix}</p>
                      <p className="text-green-400 text-xs">{wallet.pros}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-600/20 border border-yellow-600/50 rounded">
              <h3 className="text-yellow-400 font-bold mb-2">Your Wallet Import Data</h3>
              <p className="text-white text-sm mb-2">Use your existing seed phrase or private key to import:</p>
              <p className="text-green-400 text-sm">Target wallet: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843</p>
              <p className="text-gray-400 text-xs">This wallet contains your ETHG, AICC, ETHGR tokens and contract ownership</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://rainbow.me/settings', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Network className="h-6 w-6 mr-2" />
            Rainbow Settings
          </Button>
          
          <Button 
            onClick={() => window.open('https://metamask.io/download/', '_blank')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Get MetaMask
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Crown className="h-6 w-6 mr-2" />
            Check Mainnet
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0xc46eB37677360EfDc011F4097621F15b792fa630', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Target className="h-6 w-6 mr-2" />
            37 ETH Contract
          </Button>
        </div>

        {/* Success Alert */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-xl">
            <strong>SOLUTION READY:</strong> Switch Rainbow to mainnet or use MetaMask to import your existing wallet. Your $686K portfolio will appear immediately on the correct network.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}