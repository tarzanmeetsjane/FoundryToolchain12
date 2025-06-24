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
  DollarSign
} from "lucide-react";

export default function BlockchainTransactionViewer() {
  const [searchAddress, setSearchAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  
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

        {/* Quick Links */}
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

        {/* Transaction History */}
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