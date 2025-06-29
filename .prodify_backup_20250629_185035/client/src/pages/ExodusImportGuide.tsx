import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle, ArrowRight, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function ExodusImportGuide() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const contracts = [
    {
      name: "ETHG Recovery #1",
      address: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
      symbol: "ETHGR",
      decimals: 18,
      balance: "1,990,000"
    },
    {
      name: "ETHG Recovery #2", 
      address: "0x828e614715BA6bbD32464E4aF5529a1263FB914d",
      symbol: "ETHGR",
      decimals: 18,
      balance: "1,990,000"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Import ETHGR to Exodus Wallet
          </h1>
          <p className="text-slate-600 text-lg">
            Step-by-step guide to add your verified tokens
          </p>
        </div>

        {/* Quick Steps Overview */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Quick Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                <div className="text-sm font-medium">Open Settings</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                <div className="text-sm font-medium">Add Asset</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                <div className="text-sm font-medium">Select Optimism</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                <div className="text-sm font-medium">Paste Address</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detailed Import Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-2">Open Exodus Settings</h3>
                  <p className="text-gray-600">Click the gear icon (⚙️) in the top-right corner of Exodus</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-2">Navigate to Assets</h3>
                  <p className="text-gray-600">Go to: Settings → Assets → "Add more assets"</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-2">Select Custom Token</h3>
                  <p className="text-gray-600">Look for "Add custom asset" or "Custom token" option</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold mb-2">Choose Optimism Network</h3>
                  <p className="text-gray-600">Select "Optimism" from the network dropdown</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-semibold mb-2">Paste Contract Address</h3>
                  <p className="text-gray-600 mb-3">Copy and paste one of your contract addresses below:</p>
                  <div className="space-y-2">
                    {contracts.map((contract, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                        <span className="font-mono text-xs flex-1">{contract.address}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(contract.address, `exodus-${index}`)}
                        >
                          {copied === `exodus-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                <div>
                  <h3 className="font-semibold mb-2">Auto-Fill Details</h3>
                  <p className="text-gray-600">Token details should automatically populate from verified contracts</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-semibold mb-2">Save & Repeat</h3>
                  <p className="text-gray-600">Save the first token, then repeat steps 3-6 for the second contract</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Details for Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {contracts.map((contract, index) => (
            <Card key={index} className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center justify-between">
                  <span>{contract.name}</span>
                  <Badge className="bg-green-100 text-green-800">VERIFIED</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Symbol:</span>
                    <span className="font-semibold">{contract.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Decimals:</span>
                    <span className="font-semibold">{contract.decimals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Balance:</span>
                    <span className="font-semibold">{contract.balance}</span>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Contract Address:</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                      <span className="font-mono text-xs flex-1">{contract.address}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(contract.address, `card-${index}`)}
                      >
                        {copied === `card-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What to Expect */}
        <Alert className="border-green-200 bg-green-50 mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>What to expect:</strong> Since your contracts are verified on Optimism Etherscan, 
            Exodus should automatically recognize the token name ("ETHG Recovery"), symbol ("ETHGR"), 
            and decimals (18). Your balance of 1,990,000 tokens per contract should display correctly.
          </AlertDescription>
        </Alert>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-amber-700">If Optimism network is missing:</h4>
                <p className="text-sm text-gray-600">Update Exodus to the latest version for full Optimism support</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700">If token details don't auto-fill:</h4>
                <p className="text-sm text-gray-600">Manually enter: Symbol "ETHGR", Decimals "18"</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-700">If balance shows zero:</h4>
                <p className="text-sm text-gray-600">Ensure you're importing to the same wallet address that owns the tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}