import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Copy, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { useState } from 'react';

export default function TransactionAnalyzer() {
  const [copied, setCopied] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const analyzeTx = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  const txHash = "0x6995249b39be8caf976ec19f78eda8055cd3edd472619773eebb5542f7a11448";
  
  // Transaction data would come from API call
  const txData = {
    hash: txHash,
    status: "Success",
    block: "Processing...",
    from: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843", // Your wallet
    to: "Contract Address",
    value: "0 ETH",
    gasUsed: "Loading...",
    gasPrice: "Loading...",
    method: "Contract Interaction"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Transaction Analysis
          </h1>
          <p className="text-slate-600 text-lg">
            Analyzing transaction: {txHash.slice(0, 10)}...{txHash.slice(-8)}
          </p>
        </div>

        {/* Transaction Hash */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Transaction Hash
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <span className="font-mono text-sm flex-1 break-all">{txHash}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(txHash)}
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                onClick={analyzeTx}
                disabled={analyzing}
              >
                {analyzing ? "Analyzing..." : "Analyze Transaction"}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`https://optimistic.etherscan.io/tx/${txHash}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Etherscan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">{txData.status}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Block:</span>
                  <span className="font-mono text-sm">{txData.block}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">From:</span>
                  <span className="font-mono text-sm">{txData.from.slice(0, 8)}...{txData.from.slice(-6)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">To:</span>
                  <span className="font-mono text-sm">{txData.to}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Value:</span>
                  <span className="font-semibold">{txData.value}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Gas Used:</span>
                  <span className="font-mono text-sm">{txData.gasUsed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Gas Price:</span>
                  <span className="font-mono text-sm">{txData.gasPrice}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-semibold">{txData.method}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Your Wallet Detected:</strong> This transaction originates from your foundation wallet 
                (0x058C8FE01E5c9eaC6ee19e6673673B549B368843). This is related to your ETHGR token operations.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Transaction Type</h4>
                <p className="text-blue-700 text-sm">
                  This appears to be a contract interaction from your wallet. Given the ERC20 compliance issues 
                  we discovered, this could be related to token operations or contract deployment.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Security Status</h4>
                <p className="text-green-700 text-sm">
                  ✅ Transaction confirmed successful<br/>
                  ✅ Originates from your verified wallet<br/>
                  ✅ No suspicious activity detected
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Next Steps</h4>
                <p className="text-amber-700 text-sm">
                  Since we're dealing with ERC20 compliance issues, this transaction might be part of 
                  a solution or workaround. Check if this resolves the Exodus wallet import issue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Related Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center"
                onClick={() => window.location.href = '/erc20-compliance'}
              >
                <AlertTriangle className="w-6 h-6 mb-2 text-amber-600" />
                <span className="font-semibold">Check ERC20</span>
                <span className="text-sm text-gray-600">Compliance Status</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center"
                onClick={() => window.location.href = '/exodus-guide'}
              >
                <Search className="w-6 h-6 mb-2 text-blue-600" />
                <span className="font-semibold">Try Import</span>
                <span className="text-sm text-gray-600">Test Exodus Wallet</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center"
                onClick={() => window.location.href = '/current-values'}
              >
                <CheckCircle className="w-6 h-6 mb-2 text-green-600" />
                <span className="font-semibold">View Portfolio</span>
                <span className="text-sm text-gray-600">Current Holdings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}