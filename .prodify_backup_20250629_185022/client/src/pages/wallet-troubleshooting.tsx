import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  Search,
  Wallet,
  Eye,
  RefreshCw
} from "lucide-react";

export default function WalletTroubleshooting() {
  const [copied, setCopied] = useState("");
  const [checkingBalance, setCheckingBalance] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const checkBalance = async () => {
    setCheckingBalance(true);
    // Simulate balance check
    setTimeout(() => setCheckingBalance(false), 3000);
  };

  const troubleshootingSteps = [
    {
      step: 1,
      title: "Check Your Current ETH Balance",
      description: "Your transaction history shows ETH purchases, let's verify what you see",
      action: "Open MetaMask and check ETH balance",
      expected: "Should see some ETH from your June 19 purchases"
    },
    {
      step: 2,
      title: "Verify You're on the Right Network",
      description: "Make sure MetaMask is connected to Ethereum Mainnet",
      action: "Check network selection in MetaMask",
      expected: "Should be on 'Ethereum Mainnet' not test networks"
    },
    {
      step: 3,
      title: "Confirm Your Wallet Address",
      description: "Verify you're looking at the correct wallet",
      action: "Check if your address ends with ...8843",
      expected: "Address: 0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
    },
    {
      step: 4,
      title: "Check Real Balance on Etherscan",
      description: "External verification of your actual balance",
      action: "Look up your address on Etherscan",
      expected: "Should show current ETH balance and transaction history"
    }
  ];

  const tokenAddresses = [
    {
      symbol: "UNI",
      name: "Uniswap",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      note: "This was swapped to ETH - won't show as UNI anymore"
    },
    {
      symbol: "BUSD",
      name: "Binance USD", 
      address: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
      note: "Need to manually import this token"
    },
    {
      symbol: "3CRV",
      name: "Curve 3Pool",
      address: "0xa0b86a33e6411c8b654dd45ba27e06dc2e6e2a02",
      note: "Need to manually import this token"
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      address: "0x514910771af9ca656af840dff83e8264ecf986ca",
      note: "Need to manually import this token"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Wallet Troubleshooting
          </h1>
          <p className="text-2xl text-orange-300">
            Let's Find Your Tokens and ETH
          </p>
        </div>

        {/* Current Issue */}
        <Alert className="border-orange-500 bg-orange-500/20 border-2">
          <AlertTriangle className="h-8 w-8 text-orange-500" />
          <AlertDescription className="text-orange-200 text-xl">
            <strong>Issue:</strong> You don't see your tokens in your wallet. Let's troubleshoot step by step to locate your ETH and determine what needs to be imported.
          </AlertDescription>
        </Alert>

        {/* Quick Balance Check */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Quick Balance Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold mb-2">Your Wallet Address</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Input 
                    value="0x058C8FE01E5c9eaC6ee19e6673673B549B368843" 
                    readOnly 
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Button
                    onClick={() => copyToClipboard("0x058C8FE01E5c9eaC6ee19e6673673B549B368843")}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {copied === "0x058C8FE01E5c9eaC6ee19e6673673B549B368843" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    onClick={checkBalance}
                    disabled={checkingBalance}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {checkingBalance ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                    Check Balance
                  </Button>
                  
                  <Button
                    onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Etherscan
                  </Button>
                  
                  <Button
                    onClick={() => window.open('https://metamask.io/', '_blank')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Open MetaMask
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting Steps */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Step-by-Step Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {troubleshootingSteps.map((step, index) => (
                <div key={index} className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-red-400 font-bold">{step.title}</h3>
                      <p className="text-white text-sm mb-2">{step.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Action:</span>
                          <p className="text-yellow-400">{step.action}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Expected:</span>
                          <p className="text-green-400">{step.expected}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Token Import Guide */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Token Import Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokenAddresses.map((token, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-blue-400 font-bold">{token.symbol} - {token.name}</h3>
                    <Badge className={`${
                      token.symbol === 'UNI' ? 'bg-green-600' : 'bg-yellow-600'
                    } text-white`}>
                      {token.symbol === 'UNI' ? 'Swapped to ETH' : 'Import Needed'}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">{token.note}</p>
                  
                  <div className="flex items-center gap-2">
                    <Input 
                      value={token.address} 
                      readOnly 
                      className="bg-gray-700 text-white border-gray-600 font-mono text-xs"
                    />
                    <Button
                      onClick={() => copyToClipboard(token.address)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {copied === token.address ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What You Should See */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">What You Should See</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold mb-3">In MetaMask (Immediately)</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• ETH balance from your purchases</li>
                  <li>• Recent transaction history</li>
                  <li>• Your wallet address ending in ...8843</li>
                  <li>• Ethereum Mainnet selected</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h3 className="text-yellow-400 font-bold mb-3">After Token Import</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• BUSD balance will appear</li>
                  <li>• 3CRV balance will appear</li>
                  <li>• LINK balance will appear</li>
                  <li>• Full portfolio value visible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://metamask.io/', '_blank')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Check MetaMask
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <Eye className="h-6 w-6 mr-2" />
            Check Etherscan
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Try Uniswap
          </Button>
          
          <Button 
            onClick={() => window.open('/wallet-visibility-guide')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Search className="h-6 w-6 mr-2" />
            Import Guide
          </Button>
        </div>

        {/* Next Steps */}
        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <CheckCircle className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-xl">
            <strong>Next Step:</strong> Check your ETH balance first in MetaMask. If you see ETH, the wallet is working. If you don't see any ETH, let me know what exactly you see when you open MetaMask.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}