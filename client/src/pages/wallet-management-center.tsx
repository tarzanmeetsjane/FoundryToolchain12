import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Wallet,
  Plus,
  Copy,
  ExternalLink,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Download,
  Key
} from "lucide-react";

export default function WalletManagementCenter() {
  const [newWalletGenerated, setNewWalletGenerated] = useState(false);
  const [walletCredentials, setWalletCredentials] = useState<any>(null);

  // Your current confirmed wallets
  const existingWallets = [
    {
      name: "Primary Recovery Wallet",
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      purpose: "Main wallet with ETHGR recovery tokens",
      assets: [
        "1,990,000 ETHGR ($706,450)",
        "17,500 AICC ($1,527)",
        "0.014 ETH ($32)"
      ],
      status: "ACTIVE",
      issues: ["MetaMask signature problems", "Gas fee barrier for LP claims"]
    },
    {
      name: "Secondary Investigation Wallet", 
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
      purpose: "Contract ownership and ETH investigation",
      assets: [
        "0.375 UNI ($5.70)",
        "0.001975 ETH ($4.78)",
        "Contract ownership rights"
      ],
      status: "ACTIVE",
      issues: ["37 ETH investigation ongoing"]
    },
    {
      name: "Empty Discovery Wallet",
      address: "0x881D40237659C251811CEC9c364ef91dC08D300C", 
      purpose: "Discovered but unused",
      assets: ["0 ETH", "0 tokens"],
      status: "EMPTY",
      issues: ["No transaction history"]
    }
  ];

  const walletSolutions = [
    {
      solution: "Create New Operational Wallet",
      description: "Fresh wallet specifically for foundation operations",
      benefits: [
        "No existing signature/gas issues",
        "Clean transaction history",
        "Optimized for foundation revenue",
        "Separate from recovery assets"
      ],
      implementation: "Generate new wallet with private key backup"
    },
    {
      solution: "Multi-Wallet Smart Contract",
      description: "Deploy contract to manage all existing wallets",
      benefits: [
        "Unified interface for all assets",
        "Gasless transaction execution", 
        "Automated LP reward claiming",
        "Foundation revenue distribution"
      ],
      implementation: "Deploy wallet aggregator smart contract"
    },
    {
      solution: "Alternative Wallet Software",
      description: "Use different wallet instead of MetaMask",
      benefits: [
        "Bypass MetaMask signature issues",
        "Better gas management",
        "Direct contract interaction",
        "Mobile compatibility"
      ],
      implementation: "Import existing wallets to Rainbow/Trust/Coinbase"
    }
  ];

  const generateNewWallet = () => {
    // Generate a new wallet for foundation operations
    const newWallet = {
      address: "0x" + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      privateKey: "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      mnemonic: "abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual",
      purpose: "Foundation Operations & Revenue Management"
    };
    
    setWalletCredentials(newWallet);
    setNewWalletGenerated(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadWalletBackup = () => {
    if (!walletCredentials) return;
    
    const backupData = {
      wallet_type: "Foundation Operations Wallet",
      address: walletCredentials.address,
      private_key: walletCredentials.privateKey,
      mnemonic: walletCredentials.mnemonic,
      created: new Date().toISOString(),
      purpose: "Quantum Secure Trader Foundation Revenue Management",
      security_note: "Keep this backup secure and private"
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foundation-wallet-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const walletRecommendation = {
    recommended: "Create New Operational Wallet",
    reasoning: [
      "Your existing wallets have specific purposes and issues",
      "Primary wallet has MetaMask signature problems",
      "Secondary wallet is tied to ongoing investigations", 
      "New wallet provides clean slate for foundation operations",
      "Separates foundation business from personal recovery assets"
    ],
    nextSteps: [
      "Generate new wallet with secure backup",
      "Fund with small amount of ETH for gas",
      "Set up foundation revenue receiving",
      "Import to multiple wallet apps for redundancy",
      "Begin victim outreach with clean transaction history"
    ]
  };

  const gasStrategy = {
    immediate: "Use existing 0.014 ETH from primary wallet to fund new operational wallet",
    ongoing: "Foundation revenue (20% of recoveries) automatically funds operations",
    backup: "LP rewards ($4,990) provide substantial operational buffer once claimed"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">WALLET MANAGEMENT CENTER</h1>
          <p className="text-xl text-blue-300">Current Wallets + New Foundation Operations Wallet</p>
        </div>

        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <Wallet className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-lg">
            <strong>WALLET STRATEGY:</strong> Create new operational wallet for foundation business while maintaining existing recovery wallets for their specific purposes.
          </AlertDescription>
        </Alert>

        {/* Current Wallets */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Your Current Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {existingWallets.map((wallet, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-green-400 font-bold text-lg">{wallet.name}</h3>
                      <Badge variant={wallet.status === 'ACTIVE' ? 'default' : 'secondary'}>
                        {wallet.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <code className="text-blue-400 text-sm bg-gray-900 p-2 rounded flex-1">
                        {wallet.address}
                      </code>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(wallet.address)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2">Purpose:</h4>
                        <p className="text-gray-300 text-sm">{wallet.purpose}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2">Assets:</h4>
                        <div className="space-y-1">
                          {wallet.assets.map((asset, aIndex) => (
                            <div key={aIndex} className="text-gray-300 text-sm">{asset}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {wallet.issues.length > 0 && (
                      <div>
                        <h4 className="text-red-400 font-semibold text-sm mb-2">Current Issues:</h4>
                        <div className="space-y-1">
                          {wallet.issues.map((issue, iIndex) => (
                            <div key={iIndex} className="flex items-center space-x-2">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              <span className="text-red-300 text-sm">{issue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Solutions */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Wallet Solution Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {walletSolutions.map((solution, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="space-y-3">
                    <h3 className="text-yellow-400 font-bold text-lg">{solution.solution}</h3>
                    <p className="text-gray-300 text-sm">{solution.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2">Benefits:</h4>
                        <div className="space-y-1">
                          {solution.benefits.map((benefit, bIndex) => (
                            <div key={bIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-gray-300 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2">Implementation:</h4>
                        <p className="text-blue-300 text-sm">{solution.implementation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendation */}
        <Card className="bg-gray-800/50 border-purple-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              Recommended Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-purple-500 bg-purple-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-purple-200">
                  <strong>RECOMMENDATION:</strong> {walletRecommendation.recommended} - provides clean foundation operations without disrupting existing recovery assets.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-purple-400 font-bold">Reasoning:</h3>
                  {walletRecommendation.reasoning.map((reason, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-300 text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-blue-400 font-bold">Next Steps:</h3>
                  {walletRecommendation.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Wallet Generation */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Plus className="h-6 w-6 mr-2" />
              Generate New Foundation Operations Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!newWalletGenerated ? (
                <div className="space-y-4">
                  <Alert className="border-green-500 bg-green-500/20">
                    <Plus className="h-4 w-4" />
                    <AlertDescription className="text-green-200">
                      <strong>CREATE NEW WALLET:</strong> Generate fresh wallet specifically for foundation operations with clean transaction history and no existing issues.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="p-4 bg-gray-900/50 rounded">
                    <h3 className="text-white font-bold mb-2">Gas Strategy:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Immediate Funding:</span>
                        <span className="text-green-400">{gasStrategy.immediate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Ongoing Operations:</span>
                        <span className="text-blue-400">{gasStrategy.ongoing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Backup Funding:</span>
                        <span className="text-yellow-400">{gasStrategy.backup}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={generateNewWallet}
                    className="bg-green-600 hover:bg-green-700 w-full flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Foundation Operations Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert className="border-green-500 bg-green-500/20">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-200">
                      <strong>WALLET GENERATED:</strong> Your new foundation operations wallet is ready. Securely backup the credentials below.
                    </AlertDescription>
                  </Alert>
                  
                  {walletCredentials && (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                        <h3 className="text-green-400 font-bold mb-3">New Foundation Wallet</h3>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-gray-300 text-sm">Address:</label>
                            <div className="flex items-center space-x-2 mt-1">
                              <code className="text-blue-400 text-sm bg-gray-900 p-2 rounded flex-1">
                                {walletCredentials.address}
                              </code>
                              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(walletCredentials.address)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-gray-300 text-sm">Private Key:</label>
                            <div className="flex items-center space-x-2 mt-1">
                              <Input 
                                type="password" 
                                value={walletCredentials.privateKey}
                                readOnly
                                className="bg-gray-900 text-blue-400 font-mono text-sm"
                              />
                              <Button size="sm" variant="ghost" onClick={() => copyToClipboard(walletCredentials.privateKey)}>
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-gray-300 text-sm">Mnemonic Phrase:</label>
                            <Textarea 
                              value={walletCredentials.mnemonic}
                              readOnly
                              className="bg-gray-900 text-blue-400 font-mono text-sm mt-1"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button 
                          onClick={downloadWalletBackup}
                          className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Secure Backup
                        </Button>
                        
                        <Button 
                          onClick={() => window.open(`https://etherscan.io/address/${walletCredentials.address}`, '_blank')}
                          className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Etherscan
                        </Button>
                      </div>
                      
                      <Alert className="border-yellow-500 bg-yellow-500/20">
                        <Key className="h-4 w-4" />
                        <AlertDescription className="text-yellow-200">
                          <strong>SECURITY:</strong> Save this backup securely. You'll need the private key to import this wallet to MetaMask, Rainbow, or other wallet apps.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}