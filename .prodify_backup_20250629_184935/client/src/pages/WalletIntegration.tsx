import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Wallet, ExternalLink, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function WalletIntegration() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const walletInfo = {
    currentWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    network: "Optimism",
    tokens: [
      {
        contract: "0x3e7c77514f884e0954d1f1c3a9765665ce1d76e9",
        amount: "1,990,000",
        symbol: "ETHGR",
        name: "ETHG Recovery #1"
      },
      {
        contract: "0x828e614715BA6bbD32464E4aF5529a1263FB914d",
        amount: "1,990,000", 
        symbol: "ETHGR",
        name: "ETHG Recovery #2"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Wallet Integration Guide
          </h1>
          <p className="text-slate-600 text-lg">
            Add your ETHGR tokens to Exodus and other wallets
          </p>
        </div>

        {/* Current Wallet Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-600" />
              Current Foundation Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-mono text-sm">{walletInfo.currentWallet}</div>
                  <div className="text-sm text-gray-600">Network: {walletInfo.network}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(walletInfo.currentWallet, 'wallet')}
                >
                  {copied === 'wallet' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exodus Wallet Setup */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img 
                src="data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 0L32 16L16 32L0 16z' fill='%23007BFF'/%3E%3C/svg%3E" 
                alt="Exodus" 
                className="w-6 h-6"
              />
              Exodus Wallet Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Network Support:</strong> Exodus supports Optimism network where your ETHGR tokens are deployed. 
                You can add custom tokens using the contract addresses below.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-700 mb-3">
                Steps to add ETHGR tokens to Exodus:
              </div>
              
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Open Exodus wallet and ensure you're on Optimism network</li>
                <li>Go to Settings → Assets → Add Custom Token</li>
                <li>Select "Optimism" as the network</li>
                <li>Copy and paste the contract addresses below</li>
                <li>Token details will auto-populate from verified contracts</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Token Contract Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {walletInfo.tokens.map((token, index) => (
            <Card key={index} className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center justify-between">
                  <span>{token.name}</span>
                  <Badge className="bg-green-100 text-green-800">VERIFIED</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Symbol:</span>
                    <span className="font-semibold">{token.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">{token.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Decimals:</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Contract Address:</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                      <span className="font-mono text-xs flex-1">{token.contract}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(token.contract, `contract-${index}`)}
                      >
                        {copied === `contract-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(`https://optimistic.etherscan.io/address/${token.contract}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Etherscan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Wallet Support */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Other Wallet Compatibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">MetaMask</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Full Optimism support with custom token import
                </p>
                <Badge className="bg-green-100 text-green-800">✓ Supported</Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Trust Wallet</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Mobile wallet with Optimism network support
                </p>
                <Badge className="bg-green-100 text-green-800">✓ Supported</Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Rainbow Wallet</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Ethereum-focused with L2 support
                </p>
                <Badge className="bg-green-100 text-green-800">✓ Supported</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notes */}
        <Alert className="border-blue-200 bg-blue-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Security Benefits:</strong> Your ETHGR tokens are now verified on Optimism Etherscan, 
            making them recognizable by wallet applications and price tracking services. 
            This enhances security and usability across the ecosystem.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}