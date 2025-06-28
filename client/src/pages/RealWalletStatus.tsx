import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ExternalLink, Key, Search, DollarSign } from 'lucide-react';

export default function RealWalletStatus() {
  const originalWallet = "0xc46eb37677360efdc011f4097621f15b792fa630";
  const currentWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Real Wallet Investigation
          </h1>
          <p className="text-slate-600 text-lg">
            Verify actual blockchain status vs demo environment
          </p>
        </div>

        {/* API Key Required Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Key className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Etherscan API Key Required:</strong> To investigate your missing 37 ETH 
            (~$88,800), we need real blockchain data access. The demo API responses won't 
            help with your actual wallet analysis.
          </AlertDescription>
        </Alert>

        {/* Critical Status */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Critical Investigation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border-2 border-amber-200">
                  <h4 className="font-semibold text-amber-800 mb-2">Expected Transfer</h4>
                  <div className="text-2xl font-bold text-amber-700">37 ETH</div>
                  <div className="text-amber-600">~$88,800 USD</div>
                  <div className="text-sm text-amber-600 mt-2">From original wallet</div>
                </div>
                
                <div className="p-4 bg-white rounded-lg border-2 border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Contract Shows</h4>
                  <div className="text-2xl font-bold text-red-700">0.00136 ETH</div>
                  <div className="text-red-600">~$3.27 USD</div>
                  <div className="text-sm text-red-600 mt-2">Massive discrepancy</div>
                </div>
              </div>

              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Demo Environment Concern</h4>
                <p className="text-gray-700 text-sm">
                  Your concern about demo environment causing real asset loss is valid. 
                  If smart contract calls were executed in testing mode but affected your 
                  actual wallet addresses, this could result in permanent financial loss.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">Original Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Address:</div>
                  <div className="font-mono text-xs break-all">{originalWallet}</div>
                </div>
                
                <div className="bg-amber-50 p-3 rounded border border-amber-200">
                  <div className="font-semibold text-amber-800">Expected Status:</div>
                  <div className="text-sm text-amber-700">Should show 37 ETH outgoing transaction</div>
                </div>
                
                <Button
                  className="w-full"
                  onClick={() => window.open(`https://etherscan.io/address/${originalWallet}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Etherscan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Current Foundation Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Address:</div>
                  <div className="font-mono text-xs break-all">{currentWallet}</div>
                </div>
                
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <div className="font-semibold text-green-800">Confirmed Status:</div>
                  <div className="text-sm text-green-700">$695,830.24 portfolio value</div>
                </div>
                
                <Button
                  className="w-full"
                  onClick={() => window.open(`https://optimistic.etherscan.io/address/${currentWallet}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Optimism
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investigation Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Required Investigation Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">1. Get Etherscan API Access</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• Visit https://etherscan.io/apis</div>
                  <div>• Create free account</div>
                  <div>• Generate API key</div>
                  <div>• Enable real blockchain data access</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3">2. Transaction History Analysis</h4>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• Query all transactions from original wallet</div>
                  <div>• Look for 37 ETH outgoing transfers</div>
                  <div>• Check transaction timestamps</div>
                  <div>• Identify receiving addresses</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">3. Recovery Assessment</h4>
                <div className="space-y-2 text-sm text-green-700">
                  <div>• Determine if ETH is in recoverable contracts</div>
                  <div>• Check if funds were sent to wrong addresses</div>
                  <div>• Assess if transactions can be reversed</div>
                  <div>• Document findings for potential recovery</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get API Key */}
        <Card className="border-2 border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Key className="w-5 h-5" />
              Start Investigation Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-blue-700">
                Your missing ~$88,800 in ETH needs immediate investigation. With a proper 
                Etherscan API key, we can trace the exact blockchain transactions and 
                determine if your funds are recoverable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1"
                  onClick={() => window.open('https://etherscan.io/apis', '_blank')}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Get Free API Key
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(`https://etherscan.io/address/${originalWallet}`, '_blank')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Manual Check Original Wallet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}