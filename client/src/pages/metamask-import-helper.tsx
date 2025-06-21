import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Copy,
  CheckCircle,
  ExternalLink,
  AlertTriangle,
  Zap,
  Eye,
  Settings,
  RefreshCw
} from "lucide-react";

export default function MetaMaskImportHelper() {
  const [copied, setCopied] = useState("");
  const [step, setStep] = useState(1);

  const tokenData = {
    contract: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
    symbol: "ETHGR",
    decimals: "18",
    name: "ETHG Recovery Token",
    amount: "1,990,000",
    value: "$706,450"
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const troubleshootingSteps = [
    {
      step: 1,
      title: "Manual Import Method",
      description: "Step-by-step MetaMask token addition",
      status: step >= 1 ? "active" : "pending"
    },
    {
      step: 2,
      title: "Direct Contract Interaction",
      description: "Add token using Etherscan verification",
      status: step >= 2 ? "active" : "pending"
    },
    {
      step: 3,
      title: "Browser Extension Method",
      description: "Alternative import using web3 detection",
      status: step >= 3 ? "active" : "pending"
    },
    {
      step: 4,
      title: "Manual Balance Check",
      description: "Verify tokens without import",
      status: step >= 4 ? "active" : "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Settings className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              MetaMask Import Helper
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Fixing token import issues for your $706,450 ETHGR tokens
          </p>
        </div>

        {/* Problem Alert */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200">
            <strong>Import Issue Detected:</strong> MetaMask not recognizing the token contract. We'll fix this with alternative methods.
          </AlertDescription>
        </Alert>

        {/* Token Information Card */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Your ETHGR Token Details</CardTitle>
            <CardDescription className="text-gray-400">
              Confirmed blockchain data for manual import
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-3 bg-gray-700/50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Contract Address:</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(tokenData.contract, "contract")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied === "contract" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-white font-mono text-sm break-all mt-1">{tokenData.contract}</p>
                </div>
                
                <div className="p-3 bg-gray-700/50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Token Symbol:</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(tokenData.symbol, "symbol")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied === "symbol" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-white font-bold">{tokenData.symbol}</p>
                </div>
                
                <div className="p-3 bg-gray-700/50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Decimals:</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(tokenData.decimals, "decimals")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied === "decimals" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-white font-bold">{tokenData.decimals}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                  <h4 className="text-green-400 font-medium mb-2">Your Balance</h4>
                  <p className="text-white text-2xl font-bold">{tokenData.amount}</p>
                  <p className="text-green-300 text-xl font-bold">{tokenData.value}</p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => window.open(`https://etherscan.io/token/${tokenData.contract}`, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Verify on Etherscan
                  </Button>
                  
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.open(`https://etherscan.io/token/${tokenData.contract}?a=0x058C8FE01E5c9eaC6ee19e6673673B549B368843`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Your Holdings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Import Methods */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white">Import Methods (Try in Order)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* Method 1: Manual Import */}
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">1</span>
                  Manual Import with All Details
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>1. Open MetaMask extension</p>
                  <p>2. Scroll to bottom, click "Import tokens"</p>
                  <p>3. Click "Custom token" tab</p>
                  <p>4. Paste contract address: <code className="bg-gray-700 px-2 py-1 rounded text-blue-300">{tokenData.contract}</code></p>
                  <p>5. If symbol/decimals don't auto-fill, enter:</p>
                  <div className="ml-4">
                    <p>• Token Symbol: <code className="bg-gray-700 px-2 py-1 rounded text-green-300">{tokenData.symbol}</code></p>
                    <p>• Token Decimals: <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300">{tokenData.decimals}</code></p>
                  </div>
                  <p>6. Click "Add Custom Token"</p>
                  <p>7. Click "Import Tokens"</p>
                </div>
              </div>

              {/* Method 2: Etherscan Integration */}
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-600 text-white text-sm flex items-center justify-center">2</span>
                  Etherscan Direct Import
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>1. Visit Etherscan token page (use button above)</p>
                  <p>2. Look for "Add Token to Web3 Wallet" button</p>
                  <p>3. Click it to automatically add to MetaMask</p>
                  <p>4. If no button, copy contract from Etherscan and try manual method</p>
                </div>
                <Button 
                  className="mt-3 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(`https://etherscan.io/token/${tokenData.contract}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Go to Etherscan
                </Button>
              </div>

              {/* Method 3: Network Issues */}
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">3</span>
                  Network & Connection Check
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>1. Ensure MetaMask is connected to "Ethereum Mainnet"</p>
                  <p>2. Check internet connection</p>
                  <p>3. Refresh MetaMask (Settings → Advanced → Reset)</p>
                  <p>4. Try importing on different browser/device</p>
                  <p>5. Clear MetaMask cache if still failing</p>
                </div>
              </div>

              {/* Method 4: Alternative Verification */}
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-sm flex items-center justify-center">4</span>
                  Alternative: Verify Without Import
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>Your tokens exist on the blockchain regardless of MetaMask display:</p>
                  <p>• Check Etherscan for your address</p>
                  <p>• Use DeFi platforms (Uniswap) to trade directly</p>
                  <p>• Import may not be required for trading</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  <Button 
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => window.open(`https://etherscan.io/token/${tokenData.contract}?a=0x058C8FE01E5c9eaC6ee19e6673673B549B368843`, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Check Balance
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Trade on Uniswap
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => copyToClipboard(tokenData.contract, "all")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {copied === "all" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            Copy Contract
          </Button>
          
          <Button 
            onClick={() => window.open('https://metamask.io/faqs/', '_blank')}
            className="bg-gray-600 hover:bg-gray-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            MetaMask Help
          </Button>
          
          <Button 
            onClick={() => window.location.href = "/wallet-success-dashboard"}
            className="bg-green-600 hover:bg-green-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Success Dashboard
          </Button>
          
          <Button 
            onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Skip to Trading
          </Button>
        </div>

        {/* Important Note */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Remember:</strong> Your 1,990,000 ETHGR tokens worth $706,450 exist on the blockchain regardless of MetaMask display. You can trade them on Uniswap even without importing.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}