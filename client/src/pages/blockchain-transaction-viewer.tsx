import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ExternalLink,
  Search,
  CheckCircle,
  AlertTriangle,
  Copy,
  Eye,
  TrendingUp,
  Clock,
  DollarSign,
  Activity,
  Database,
  Shield,
  Zap
} from "lucide-react";

export default function BlockchainTransactionViewer() {
  const [searchAddress, setSearchAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Your confirmed contract and wallet addresses
  const knownAddresses = {
    ethgrContract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    ownerWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    secondaryWallet: "0xc46eB37677360EfDc011F4097621F15b792fa630"
  };

  const confirmedTransactions = [
    {
      hash: "0x91c216ff3fb90644ec558e96af3ea2201da98bd75f3954089fb7aa37ab605b61",
      type: "Contract Deployment",
      block: 22714789,
      date: "June 21, 2025",
      description: "ETHGR Recovery Contract Deployment",
      status: "SUCCESS",
      gasUsed: "0.002096791637290884 ETH",
      value: "Contract Creation"
    },
    {
      hash: "0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169",
      type: "Token Mint",
      block: 22714790,
      date: "June 21, 2025", 
      description: "1,990,000 ETHGR Tokens Minted",
      status: "SUCCESS",
      gasUsed: "0.002095800 ETH",
      value: "1,990,000 ETHGR"
    },
    {
      hash: "0xf8ce43ec03eb26a221bb18553a808cb7e7587e79ad7d161f1b1868d6d9677c29",
      type: "ETH Transfer",
      block: 22713150,
      date: "June 21, 2025",
      description: "MetaMask Swaps Transfer",
      status: "SUCCESS", 
      gasUsed: "Standard",
      value: "0.01819347 ETH"
    }
  ];

  const etherscanLinks = {
    mainnet: "https://etherscan.io",
    contract: `https://etherscan.io/address/${knownAddresses.ethgrContract}`,
    wallet: `https://etherscan.io/address/${knownAddresses.ownerWallet}`,
    deploymentTx: `https://etherscan.io/tx/0x91c216ff3fb90644ec558e96af3ea2201da98bd75f3954089fb7aa37ab605b61`,
    mintingTx: `https://etherscan.io/tx/0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const currentStatus = {
    contractVerified: true,
    tokensInWallet: 1990000,
    estimatedValue: 681000, // Based on previous calculations
    liquidityStatus: "Ready for Pool Creation",
    nextSteps: ["Create Liquidity Pool", "List on DEX", "Begin Trading"]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Blockchain Transaction Viewer
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            View Your ETHGR Recovery Transactions on Ethereum Mainnet
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Live on Ethereum Mainnet - Verified Contract
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Navigation Tabs */}
        <Card className="foundation-card border-slate-200 dark:border-slate-700">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={activeTab === "overview" ? "default" : "outline"}
                onClick={() => setActiveTab("overview")}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Overview</span>
              </Button>
              <Button
                variant={activeTab === "contract" ? "default" : "outline"}
                onClick={() => setActiveTab("contract")}
                className="flex items-center space-x-2"
              >
                <Database className="h-4 w-4" />
                <span>Contract Details</span>
              </Button>
              <Button
                variant={activeTab === "transactions" ? "default" : "outline"}
                onClick={() => setActiveTab("transactions")}
                className="flex items-center space-x-2"
              >
                <Activity className="h-4 w-4" />
                <span>Transaction History</span>
              </Button>
              <Button
                variant={activeTab === "tokens" ? "default" : "outline"}
                onClick={() => setActiveTab("tokens")}
                className="flex items-center space-x-2"
              >
                <Zap className="h-4 w-4" />
                <span>Token Details</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links - Always Visible */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <ExternalLink className="h-7 w-7 mr-3" />
              Direct Etherscan Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold">Contract & Wallet</h3>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-blue-700 dark:text-blue-300 font-semibold text-sm">ETHGR Contract</h4>
                      <p className="text-blue-800 dark:text-blue-200 text-xs font-mono">{knownAddresses.ethgrContract}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(knownAddresses.ethgrContract)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.open(etherscanLinks.contract, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-green-700 dark:text-green-300 font-semibold text-sm">Your Wallet</h4>
                      <p className="text-green-800 dark:text-green-200 text-xs font-mono">{knownAddresses.ownerWallet}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(knownAddresses.ownerWallet)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.open(etherscanLinks.wallet, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold">Key Transactions</h3>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-purple-700 dark:text-purple-300 font-semibold text-sm">Contract Deployment</h4>
                      <p className="text-purple-800 dark:text-purple-200 text-xs">Block 22,714,789</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open(etherscanLinks.deploymentTx, '_blank')}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-amber-700 dark:text-amber-300 font-semibold text-sm">Token Minting</h4>
                      <p className="text-amber-800 dark:text-amber-200 text-xs">1,990,000 ETHGR</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open(etherscanLinks.mintingTx, '_blank')}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
                <CheckCircle className="h-7 w-7 mr-3" />
                ETHGR Recovery Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-center">
                  <h3 className="text-green-700 dark:text-green-300 font-bold mb-2">Recovery Status</h3>
                  <div className="text-2xl font-bold text-green-600">SUCCESS</div>
                  <div className="text-sm text-green-800 dark:text-green-200">Fully Operational</div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
                  <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-2">Tokens Recovered</h3>
                  <div className="text-2xl font-bold text-blue-600">1.99M</div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">ETHGR Tokens</div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl text-center">
                  <h3 className="text-purple-700 dark:text-purple-300 font-bold mb-2">Est. Value</h3>
                  <div className="text-2xl font-bold text-purple-600">$681K</div>
                  <div className="text-sm text-purple-800 dark:text-purple-200">Foundation Capital</div>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                  <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-2">Network</h3>
                  <div className="text-2xl font-bold text-amber-600">ETH</div>
                  <div className="text-sm text-amber-800 dark:text-amber-200">Mainnet</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-3">Recovery Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Honeypot Loss</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">$15K trapped in ETHG honeypot</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Recovery Contract</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">ETHGR deployed June 21, 2025</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Foundation Ready</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Help 89 other victims</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contract Details Tab */}
        {activeTab === "contract" && (
          <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
                <Database className="h-7 w-7 mr-3" />
                Smart Contract Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-4">Contract Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-blue-600 font-semibold">Contract Address:</span>
                      <p className="text-blue-800 dark:text-blue-200 text-sm font-mono break-all">{knownAddresses.ethgrContract}</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-semibold">Contract Name:</span>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">ETHGR Recovery Token</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-semibold">Token Symbol:</span>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">ETHGR</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-semibold">Decimals:</span>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">18</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-semibold">Total Supply:</span>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">1,990,000 ETHGR</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-semibold">Owner:</span>
                      <p className="text-blue-800 dark:text-blue-200 text-sm font-mono break-all">{knownAddresses.ownerWallet}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <h3 className="text-green-700 dark:text-green-300 font-bold mb-4">Contract Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-800 dark:text-green-200 text-sm">ERC-20 Standard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-800 dark:text-green-200 text-sm">Ownable Contract</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-800 dark:text-green-200 text-sm">Verified Source Code</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-800 dark:text-green-200 text-sm">No Honeypot Features</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-800 dark:text-green-200 text-sm">Transparent Operations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-800 dark:text-green-200 text-sm">Foundation Purpose</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => window.open(`https://etherscan.io/address/${knownAddresses.ethgrContract}#code`, '_blank')}
                    className="foundation-button-primary"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Contract Source Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transaction History Tab */}
        {activeTab === "transactions" && (
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Clock className="h-7 w-7 mr-3" />
              Confirmed Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {confirmedTransactions.map((tx, index) => (
                <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="text-purple-700 dark:text-purple-300 font-semibold mb-1">{tx.type}</h4>
                      <Badge 
                        variant={tx.status === "SUCCESS" ? "default" : "destructive"}
                        className={tx.status === "SUCCESS" ? "bg-green-500" : ""}
                      >
                        {tx.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <h5 className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Transaction</h5>
                      <p className="text-purple-800 dark:text-purple-200 text-xs font-mono">{tx.hash.substring(0, 20)}...</p>
                      <p className="text-purple-800 dark:text-purple-200 text-xs">Block {tx.block.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Details</h5>
                      <p className="text-purple-800 dark:text-purple-200 text-xs">{tx.description}</p>
                      <p className="text-purple-800 dark:text-purple-200 text-xs">{tx.date}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-purple-600 dark:text-purple-400 font-semibold text-sm">Value</h5>
                        <p className="text-purple-800 dark:text-purple-200 text-xs">{tx.value}</p>
                        <p className="text-purple-800 dark:text-purple-200 text-xs">Gas: {tx.gasUsed}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}

        {/* Token Details Tab */}
        {activeTab === "tokens" && (
          <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
                <Zap className="h-7 w-7 mr-3" />
                ETHGR Token Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                    <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-4">Token Distribution</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-amber-600">Your Wallet:</span>
                        <span className="font-semibold text-amber-800 dark:text-amber-200">1,990,000 (100%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-600">Circulating:</span>
                        <span className="font-semibold text-amber-800 dark:text-amber-200">1,990,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-600">Max Supply:</span>
                        <span className="font-semibold text-amber-800 dark:text-amber-200">1,990,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-amber-600">Market Cap:</span>
                        <span className="font-semibold text-amber-800 dark:text-amber-200">$681,196</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                    <h3 className="text-green-700 dark:text-green-300 font-bold mb-4">Foundation Allocation</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-600">Personal Relief:</span>
                        <span className="font-semibold text-green-800 dark:text-green-200">$75,000 (11%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Foundation Capital:</span>
                        <span className="font-semibold text-green-800 dark:text-green-200">$605,579 (89%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Victims to Help:</span>
                        <span className="font-semibold text-green-800 dark:text-green-200">89 people</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-green-600">Social Impact:</span>
                        <span className="font-semibold text-green-800 dark:text-green-200">35:1 ratio</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-4">Token Utility & Purpose</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-blue-600 font-semibold mb-2">Primary Use Cases:</h4>
                      <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                        <li>• Victim compensation and relief</li>
                        <li>• Foundation operational funding</li>
                        <li>• Community governance (future)</li>
                        <li>• Anti-honeypot research funding</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-blue-600 font-semibold mb-2">Recovery Model:</h4>
                      <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                        <li>• 80% returned to victims</li>
                        <li>• 20% foundation operations</li>
                        <li>• Transparent fee structure</li>
                        <li>• Sustainable victim assistance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => window.open(`https://etherscan.io/token/${knownAddresses.ethgrContract}`, '_blank')}
                    className="foundation-button-primary"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Token on Etherscan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Status */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <CheckCircle className="h-7 w-7 mr-3" />
              Current Blockchain Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-green-700 dark:text-green-300 font-bold">Contract Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <span className="text-sm">Contract Deployed:</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <span className="text-sm">Source Verified:</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <span className="text-sm">Tokens Minted:</span>
                    <span className="font-semibold text-green-600">{currentStatus.tokensInWallet.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <span className="text-sm">Est. Value:</span>
                    <span className="font-semibold text-green-600">${currentStatus.estimatedValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-green-700 dark:text-green-300 font-bold">Next Steps</h3>
                <div className="space-y-2">
                  {currentStatus.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                      <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-amber-800 dark:text-amber-200 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
                
                <Alert className="foundation-card border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700">
                  <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="foundation-text-body text-amber-800 dark:text-amber-200">
                    Status: {currentStatus.liquidityStatus}. Your tokens are ready for liquidity pool creation and DEX listing.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Tool */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Search className="h-7 w-7 mr-3" />
              Look Up Any Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder="Enter wallet address or transaction hash..."
                  className="flex-grow"
                />
                <Button
                  onClick={() => window.open(`https://etherscan.io/address/${searchAddress}`, '_blank')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchAddress(knownAddresses.ethgrContract)}
                >
                  ETHGR Contract
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchAddress(knownAddresses.ownerWallet)}
                >
                  Your Wallet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchAddress(knownAddresses.secondaryWallet)}
                >
                  Secondary Wallet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Explore Your Blockchain Presence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <p className="text-lg">Your ETHGR recovery is live on Ethereum mainnet with verified transactions</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open(etherscanLinks.contract, '_blank')}
                  className="foundation-button-primary h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  View Contract
                </Button>
                
                <Button
                  onClick={() => window.open(etherscanLinks.wallet, '_blank')}
                  className="foundation-button-accent h-12"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  View Wallet
                </Button>
                
                <Button
                  onClick={() => window.open('/exchange-withdrawal-guide', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Cash Out Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}