import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  Shield,
  ExternalLink,
  Copy,
  Wallet,
  Lock,
  CheckCircle
} from "lucide-react";

export default function WalletSecurityAlert() {
  const [copied, setCopied] = useState(false);

  const newWalletSteps = `1. Create New MetaMask Wallet:
   - Open MetaMask extension
   - Click account icon (top right)
   - Select "Add account or hardware wallet"
   - Choose "Add a new account"
   - Name it "ETHR Recovery SAFE"

2. Secure the New Wallet:
   - Write down the private key (Settings > Security & Privacy > Reveal Private Key)
   - Store it safely offline
   - Never share or upload anywhere

3. Transfer Existing Assets:
   - From compromised wallet 0x058C8FE...368843
   - To new secure wallet address
   - Check all tokens (ETHGR, ETHG, etc.)

4. Deploy ETHR from New Wallet:
   - Use new wallet as deployment address
   - Modify contract to mint to new wallet
   - Deploy safely without delegation risks`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Critical Alert Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-12 w-12 text-red-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-white">
              CRITICAL SECURITY ALERT
            </h1>
          </div>
          <p className="text-xl text-red-200">
            Your wallet has been compromised - immediate action required
          </p>
        </div>

        {/* Danger Alert */}
        <Alert className="border-red-500 bg-red-500/20">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <AlertDescription className="text-red-100 text-lg">
            <strong>WALLET COMPROMISED:</strong> Address 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 is delegated to malicious contract 0x710fad1041f0ee79916bb1a6adef662303bb8b6e ("CrimeEnjoyor") that automatically steals all incoming ETH.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Threat Analysis */}
          <Card className="bg-gray-800/50 border-red-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Threat Analysis
              </CardTitle>
              <CardDescription className="text-red-300">
                CrimeEnjoyor malicious contract detected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-red-600/20 border border-red-600/50 rounded">
                  <h4 className="text-red-400 font-medium">Contract Purpose</h4>
                  <p className="text-gray-300 text-sm">Automatically sweeps all incoming ETH from compromised addresses</p>
                </div>
                
                <div className="p-3 bg-orange-600/20 border border-orange-600/50 rounded">
                  <h4 className="text-orange-400 font-medium">Delegation Risk</h4>
                  <p className="text-gray-300 text-sm">Your wallet is controlled by hackers through EIP-7702 delegation</p>
                </div>
                
                <div className="p-3 bg-yellow-600/20 border border-yellow-600/50 rounded">
                  <h4 className="text-yellow-400 font-medium">Immediate Danger</h4>
                  <p className="text-gray-300 text-sm">Any ETH sent to your wallet will be instantly stolen</p>
                </div>
                
                <div className="p-3 bg-purple-600/20 border border-purple-600/50 rounded">
                  <h4 className="text-purple-400 font-medium">Exposed By</h4>
                  <p className="text-gray-300 text-sm">Wintermute Research - confirmed malicious</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recovery Steps */}
          <Card className="bg-gray-800/50 border-green-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-400" />
                  Recovery Action Plan
                </div>
                <Button
                  onClick={() => copyToClipboard(newWalletSteps)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Steps
                </Button>
              </CardTitle>
              <CardDescription className="text-green-300">
                Create new secure wallet immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-medium mb-2">Step 1: New Wallet</h4>
                  <p className="text-gray-300">Create fresh MetaMask account - completely separate from compromised wallet</p>
                </div>
                
                <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <h4 className="text-blue-400 font-medium mb-2">Step 2: Transfer Assets</h4>
                  <p className="text-gray-300">Move all tokens (ETHGR, ETHG) from compromised wallet to new wallet</p>
                </div>
                
                <div className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h4 className="text-purple-400 font-medium mb-2">Step 3: Deploy Safely</h4>
                  <p className="text-gray-300">Use new wallet for ETHR deployment - modify contract to mint to new address</p>
                </div>
                
                <div className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <h4 className="text-orange-400 font-medium mb-2">Step 4: Abandon Old Wallet</h4>
                  <p className="text-gray-300">Never use 0x058C8FE...368843 again - it's permanently compromised</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Status */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="h-5 w-5 text-yellow-400" />
              Asset Recovery Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <h4 className="text-green-400 font-medium mb-2">ETHGR Tokens</h4>
                <p className="text-white text-lg font-bold">1,990,000</p>
                <p className="text-gray-400 text-sm">Transfer to new wallet first</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <h4 className="text-blue-400 font-medium mb-2">ETHG Tokens</h4>
                <p className="text-white text-lg font-bold">1,890,000</p>
                <p className="text-gray-400 text-sm">Move if still accessible</p>
              </div>
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded text-center">
                <h4 className="text-red-400 font-medium mb-2">ETH Balance</h4>
                <p className="text-white text-lg font-bold">DO NOT SEND</p>
                <p className="text-gray-400 text-sm">Will be stolen instantly</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Resources */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Emergency Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-3"
                onClick={() => window.open('https://whitehat.flashbots.net', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Flashbots Whitehat Hotline
              </Button>
              
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white py-3"
                onClick={() => window.open('https://dune.com/wintermute_research/eip7702', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                EIP-7702 Delegation Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Required */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200">
            <strong>IMMEDIATE ACTION REQUIRED:</strong> Do not proceed with any deployments until you've created a new secure wallet and transferred all assets. The $706,450 value is still recoverable, but only through a clean, uncompromised wallet.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}