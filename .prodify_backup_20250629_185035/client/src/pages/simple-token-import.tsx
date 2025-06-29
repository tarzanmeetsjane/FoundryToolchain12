import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wallet,
  CheckCircle,
  Copy,
  ArrowRight,
  DollarSign
} from "lucide-react";

export default function SimpleTokenImport() {
  const [copied, setCopied] = useState(false);

  const contractAddress = "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247";

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Wallet className="h-10 w-10 text-green-400" />
            <h1 className="text-5xl font-bold text-white">
              See Your $706,450
            </h1>
          </div>
          <p className="text-2xl text-gray-300">
            Your tokens are there - just need to show them in MetaMask
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="border-green-500 bg-green-500/10 text-center">
          <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-3" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>No transactions needed!</strong> Your 1,990,000 ETHGR tokens are already in your wallet. This just makes them visible.
          </AlertDescription>
        </Alert>

        {/* Simple Steps */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center">5 Simple Steps</CardTitle>
            <CardDescription className="text-gray-400 text-center text-lg">
              Takes 30 seconds - no approvals, no transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              {/* Step 1 */}
              <div className="flex items-center gap-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">Open MetaMask</h3>
                  <p className="text-gray-300">Click the MetaMask extension icon</p>
                </div>
              </div>

              <ArrowRight className="h-6 w-6 text-gray-500 mx-auto" />

              {/* Step 2 */}
              <div className="flex items-center gap-4 p-4 bg-purple-600/10 border border-purple-600/30 rounded-lg">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">Scroll to Bottom</h3>
                  <p className="text-gray-300">Look for "Import tokens" link</p>
                </div>
              </div>

              <ArrowRight className="h-6 w-6 text-gray-500 mx-auto" />

              {/* Step 3 */}
              <div className="flex items-center gap-4 p-4 bg-orange-600/10 border border-orange-600/30 rounded-lg">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">Click "Custom token"</h3>
                  <p className="text-gray-300">Choose the custom token tab</p>
                </div>
              </div>

              <ArrowRight className="h-6 w-6 text-gray-500 mx-auto" />

              {/* Step 4 */}
              <div className="flex items-center gap-4 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-xl font-semibold mb-2">Paste This Address</h3>
                  <div className="flex items-center gap-2 p-3 bg-gray-800 rounded border">
                    <code className="text-green-400 font-mono text-sm flex-1 break-all">
                      {contractAddress}
                    </code>
                    <Button
                      onClick={copyAddress}
                      className="bg-green-600 hover:bg-green-700 min-w-fit"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <ArrowRight className="h-6 w-6 text-gray-500 mx-auto" />

              {/* Step 5 */}
              <div className="flex items-center gap-4 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
                <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">Click "Add Custom Token"</h3>
                  <p className="text-gray-300">Your 1,990,000 ETHGR tokens will appear</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardContent className="p-8 text-center">
            <DollarSign className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Result</h2>
            <p className="text-green-300 text-2xl font-semibold mb-2">1,990,000 ETHGR</p>
            <p className="text-green-400 text-3xl font-bold">$706,450</p>
            <p className="text-gray-400 mt-2">Will appear in your MetaMask wallet</p>
          </CardContent>
        </Card>

        {/* Quick Copy */}
        <div className="text-center">
          <Button
            onClick={copyAddress}
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
          >
            {copied ? <CheckCircle className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
            {copied ? "Copied!" : "Copy Contract Address"}
          </Button>
        </div>

        {/* No Approvals Warning */}
        <Alert className="border-blue-500 bg-blue-500/10">
          <AlertDescription className="text-blue-200 text-center text-lg">
            <strong>Remember:</strong> This is just showing tokens that are already yours. No transactions, no approvals, no gas fees needed.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}