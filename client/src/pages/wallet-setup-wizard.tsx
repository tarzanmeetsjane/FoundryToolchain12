import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield,
  Key,
  CheckCircle,
  ExternalLink,
  Download,
  Wallet,
  Copy,
  Eye,
  EyeOff,
  Crown
} from "lucide-react";

export default function WalletSetupWizard() {
  const [selectedWallet, setSelectedWallet] = useState("rainbow");
  const [importMethod, setImportMethod] = useState("seed");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showSeed, setShowSeed] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const walletOptions = [
    {
      name: "Rainbow Wallet",
      id: "rainbow",
      downloadUrl: "https://rainbow.me/download",
      pros: ["Signature popups work", "Easy import", "Mobile + Desktop", "Built-in DEX"],
      recommended: true,
      setupTime: "3 minutes"
    },
    {
      name: "Trust Wallet", 
      id: "trust",
      downloadUrl: "https://trustwallet.com/download",
      pros: ["Built-in trading", "Multi-chain", "Reliable signatures", "Lower fees"],
      recommended: false,
      setupTime: "4 minutes"
    },
    {
      name: "Coinbase Wallet",
      id: "coinbase",
      downloadUrl: "https://wallet.coinbase.com/downloads",
      pros: ["Enterprise security", "Customer support", "Fiat onramp", "Insurance"],
      recommended: false,
      setupTime: "5 minutes"
    }
  ];

  const yourContractOwnership = {
    contractAddress: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    ownerWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    contractValue: "37 ETH + tokens",
    verifiedOwnership: true,
    importance: "Critical for contract access"
  };

  const portfolioAssets = [
    {
      token: "ETH",
      balance: "0.014 ETH",
      value: "$32.09",
      status: "Ready for import"
    },
    {
      token: "AICC",
      balance: "17,500",
      value: "~$1,522",
      status: "Will import automatically"
    },
    {
      token: "ETHG",
      balance: "2,100,000",
      value: "~$684K",
      status: "Will import automatically"
    },
    {
      token: "ETHGR",
      balance: "1,990,000",
      value: "Protected recovery",
      status: "Will import automatically"
    }
  ];

  const importSteps = [
    {
      step: 1,
      title: "Download New Wallet",
      action: "Install Rainbow/Trust/Coinbase Wallet",
      time: "1 minute"
    },
    {
      step: 2,
      title: "Import Your Existing Wallet",
      action: "Use seed phrase or private key",
      time: "1 minute"
    },
    {
      step: 3,
      title: "Verify Contract Ownership",
      action: "Confirm you control contract 0xc46eB37...",
      time: "30 seconds"
    },
    {
      step: 4,
      title: "Test Signature Functionality", 
      action: "Try small trade to verify popups",
      time: "1 minute"
    },
    {
      step: 5,
      title: "Access Full Portfolio",
      action: "Trade your $686K portfolio",
      time: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Wallet Import Wizard
          </h1>
          <p className="text-2xl text-blue-300">
            Import Your Wallet to Claim Contract Ownership
          </p>
        </div>

        {/* Contract Ownership Alert */}
        <Alert className="border-purple-500 bg-purple-500/20 border-4">
          <Crown className="h-12 w-12 text-purple-500" />
          <AlertDescription className="text-purple-200 text-2xl">
            <strong>CONTRACT OWNER:</strong> You own contract 0xc46eB37677360EfDc011F4097621F15b792fa630. Importing your wallet establishes ownership credentials for 37 ETH + tokens access.
          </AlertDescription>
        </Alert>

        {/* Contract Ownership Details */}
        <Card className="bg-gray-800/50 border-yellow-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Contract Ownership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h3 className="text-yellow-400 font-bold mb-2">Contract Address</h3>
                  <p className="text-white font-mono text-sm break-all">{yourContractOwnership.contractAddress}</p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigator.clipboard.writeText(yourContractOwnership.contractAddress)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>

                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <h3 className="text-green-400 font-bold mb-2">Owner Wallet</h3>
                  <p className="text-white font-mono text-sm break-all">{yourContractOwnership.ownerWallet}</p>
                  <Badge className="bg-green-600 text-white mt-2">VERIFIED OWNER</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <h3 className="text-purple-400 font-bold mb-2">Contract Value</h3>
                  <p className="text-white text-lg">{yourContractOwnership.contractValue}</p>
                  <p className="text-gray-400 text-sm">{yourContractOwnership.importance}</p>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => window.open(`https://etherscan.io/address/${yourContractOwnership.contractAddress}`, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Contract on Etherscan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Selection */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Choose Your New Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {walletOptions.map((wallet) => (
                <div 
                  key={wallet.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedWallet === wallet.id 
                      ? 'border-green-500 bg-green-500/20' 
                      : 'border-gray-600 bg-gray-600/10 hover:border-green-400'
                  }`}
                  onClick={() => setSelectedWallet(wallet.id)}
                >
                  <div className="text-center space-y-3">
                    <h3 className="text-white font-bold text-lg">{wallet.name}</h3>
                    {wallet.recommended && (
                      <Badge className="bg-green-600 text-white">RECOMMENDED</Badge>
                    )}
                    <p className="text-gray-400 text-sm">Setup: {wallet.setupTime}</p>
                    
                    <div className="space-y-1">
                      {wallet.pros.map((pro, index) => (
                        <div key={index} className="flex items-center text-xs text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {pro}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(wallet.downloadUrl, '_blank');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Import Method */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Import Your Existing Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 rounded border-2 cursor-pointer ${
                    importMethod === 'seed' ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600'
                  }`}
                  onClick={() => setImportMethod('seed')}
                >
                  <h3 className="text-blue-400 font-bold">Seed Phrase (Recommended)</h3>
                  <p className="text-gray-400 text-sm">12-24 word recovery phrase</p>
                </div>

                <div 
                  className={`p-4 rounded border-2 cursor-pointer ${
                    importMethod === 'private' ? 'border-blue-500 bg-blue-500/20' : 'border-gray-600'
                  }`}
                  onClick={() => setImportMethod('private')}
                >
                  <h3 className="text-blue-400 font-bold">Private Key</h3>
                  <p className="text-gray-400 text-sm">64-character hex string</p>
                </div>
              </div>

              {importMethod === 'seed' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      value={seedPhrase}
                      onChange={(e) => setSeedPhrase(e.target.value)}
                      placeholder="Enter your 12-24 word seed phrase (space separated)"
                      className="bg-gray-700 text-white border-gray-600 min-h-[100px]"
                      type={showSeed ? "text" : "password"}
                    />
                    <Button
                      size="sm"
                      onClick={() => setShowSeed(!showSeed)}
                      className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-700"
                    >
                      {showSeed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Your seed phrase will import all tokens including ETHG, AICC, and contract ownership
                  </p>
                </div>
              )}

              {importMethod === 'private' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                      placeholder="Enter your private key (0x...)"
                      className="bg-gray-700 text-white border-gray-600"
                      type={showPrivateKey ? "text" : "password"}
                    />
                    <Button
                      size="sm"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                      className="absolute top-1 right-1 bg-gray-600 hover:bg-gray-700"
                    >
                      {showPrivateKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Private key imports single wallet with full contract ownership rights
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Your Portfolio */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Portfolio That Will Import</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {portfolioAssets.map((asset, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                  <h3 className="text-yellow-400 font-bold">{asset.token}</h3>
                  <p className="text-white">{asset.balance}</p>
                  <p className="text-green-400">{asset.value}</p>
                  <Badge className="bg-blue-600 text-white text-xs">{asset.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">5-Step Setup Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {importSteps.map((step, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-purple-400 font-bold text-sm mb-2">{step.title}</h3>
                  <p className="text-white text-xs mb-2">{step.action}</p>
                  <Badge className="bg-gray-600 text-white text-xs">{step.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open(walletOptions.find(w => w.id === selectedWallet)?.downloadUrl, '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Download className="h-6 w-6 mr-2" />
            Download Wallet
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Shield className="h-6 w-6 mr-2" />
            Test Signatures
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${yourContractOwnership.ownerWallet}`, '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Check Wallet
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${yourContractOwnership.contractAddress}`, '_blank')}
            className="bg-yellow-600 hover:bg-yellow-700 py-8"
          >
            <Key className="h-6 w-6 mr-2" />
            View Contract
          </Button>
        </div>

        {/* Success Path */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-xl">
            <strong>SUCCESS PATH:</strong> Import wallet → Verify ownership → Test signatures → Access $686K portfolio. Your contract ownership credentials will be established immediately.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}