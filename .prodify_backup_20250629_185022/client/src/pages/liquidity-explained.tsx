import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  ArrowRight,
  Droplets,
  Coins,
  TrendingUp,
  ExternalLink
} from "lucide-react";

export default function LiquidityExplained() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            What "Liquid" Means
          </h1>
          <p className="text-2xl text-blue-300">
            Understanding Your Portfolio Status
          </p>
        </div>

        {/* Quick Definition */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Droplets className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-xl">
            <strong>"Already liquid in your wallet"</strong> means your UNI tokens were converted to ETH, which is immediately spendable, tradeable, and visible in your wallet without any additional steps.
          </AlertDescription>
        </Alert>

        {/* Liquid vs Non-Liquid Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Liquid Assets */}
          <Card className="bg-gray-800/50 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">Liquid Assets (Ready to Use)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <h4 className="text-green-400 font-bold">Your ETH (0.96 ETH)</h4>
                  <p className="text-white text-sm">From UNI swap - $2,520 value</p>
                  <ul className="text-gray-300 text-xs mt-2 space-y-1">
                    <li>• Instantly visible in MetaMask</li>
                    <li>• Immediately tradeable on Uniswap</li>
                    <li>• Can be sent to any wallet</li>
                    <li>• No import steps needed</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-green-600 text-white">100% Ready</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Non-Liquid Assets */}
          <Card className="bg-gray-800/50 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-xl">Token Assets (Need Import)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <h4 className="text-yellow-400 font-bold">BUSD, 3CRV, LINK</h4>
                  <p className="text-white text-sm">$6,600 total value</p>
                  <ul className="text-gray-300 text-xs mt-2 space-y-1">
                    <li>• Need manual import to MetaMask</li>
                    <li>• Require contract addresses</li>
                    <li>• Fully tradeable once imported</li>
                    <li>• Same trading power as ETH</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-yellow-600 text-white">Import Required</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Portfolio Breakdown */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Portfolio Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* ETH - Liquid */}
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-6 w-6 text-green-400" />
                    <h3 className="text-green-400 font-bold">ETH Balance</h3>
                  </div>
                  <Badge className="bg-green-600 text-white">LIQUID</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Amount:</span>
                    <p className="text-white font-bold">0.96 ETH</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Value:</span>
                    <p className="text-green-400 font-bold">$2,520</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <p className="text-green-400">Immediately usable</p>
                  </div>
                </div>
              </div>

              {/* Other Tokens */}
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Coins className="h-6 w-6 text-yellow-400" />
                    <h3 className="text-yellow-400 font-bold">Token Holdings</h3>
                  </div>
                  <Badge className="bg-yellow-600 text-white">IMPORT NEEDED</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">BUSD:</span>
                    <p className="text-white font-bold">$1,200</p>
                  </div>
                  <div>
                    <span className="text-gray-400">3CRV:</span>
                    <p className="text-white font-bold">$3,600</p>
                  </div>
                  <div>
                    <span className="text-gray-400">LINK:</span>
                    <p className="text-white font-bold">$1,800</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Process Explanation */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">What Happened to Your UNI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <div className="text-center">
                  <h4 className="text-blue-400 font-bold">Before</h4>
                  <p className="text-white">6,757 UNI tokens</p>
                  <p className="text-gray-400 text-sm">$2,400 value</p>
                  <Badge className="bg-red-600 text-white mt-2">Illiquid</Badge>
                </div>
                
                <ArrowRight className="h-8 w-8 text-purple-400" />
                
                <div className="text-center">
                  <h4 className="text-green-400 font-bold">After</h4>
                  <p className="text-white">0.96 ETH</p>
                  <p className="text-gray-400 text-sm">$2,520 value (+$120)</p>
                  <Badge className="bg-green-600 text-white mt-2">Liquid</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                <h4 className="text-blue-400 font-bold mb-2">What Changed:</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>• UNI tokens were swapped for ETH on Uniswap</li>
                  <li>• ETH is the native currency - always visible</li>
                  <li>• Generated $120 profit in the process</li>
                  <li>• Now you have maximum flexibility for trading</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Options Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h4 className="text-green-400 font-bold mb-2">With Your Liquid ETH</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>• Trade immediately on any DEX</li>
                  <li>• Send to other wallets</li>
                  <li>• Use as gas for transactions</li>
                  <li>• Convert to any other token</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                <h4 className="text-yellow-400 font-bold mb-2">With Your Other Tokens</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>• Import to see in MetaMask</li>
                  <li>• Trade on specific platforms</li>
                  <li>• Earn yields on Curve (3CRV)</li>
                  <li>• Stake LINK for rewards</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://app.uniswap.org/', '_blank')}
            className="bg-pink-600 hover:bg-pink-700 py-8"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Trade ETH
          </Button>
          
          <Button 
            onClick={() => window.open('https://metamask.io/', '_blank')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            Open MetaMask
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <CheckCircle className="h-6 w-6 mr-2" />
            View Wallet
          </Button>
          
          <Button 
            onClick={() => window.open('/wallet-visibility-guide')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Coins className="h-6 w-6 mr-2" />
            Import Guide
          </Button>
        </div>

        {/* Summary */}
        <Alert className="border-blue-500 bg-blue-500/20 border-2">
          <CheckCircle className="h-8 w-8 text-blue-500" />
          <AlertDescription className="text-blue-200 text-xl">
            <strong>Bottom Line:</strong> Your 0.96 ETH is "liquid" because it's immediately usable without any setup. Your other tokens need import but are equally valuable once you add them to MetaMask.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}