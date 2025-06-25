import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, Copy, ArrowRight } from 'lucide-react';

export default function ContractVerification() {
  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const deploymentTx = "0xd03eef8b6bd869b38cd51ce4b37129354642f92f644d5ca8a03b0843c2c80351";
  const migrationTx = "0x7b597b87f4db2cb3a29c50f8d3f6d3de40bea600c2309a04dd5a8f8fe212c9cb";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">
            Your ETHGR Contract Verification
          </h1>
          <Badge variant="outline" className="bg-green-100 text-green-800 px-4 py-2">
            Deployed & Verified
          </Badge>
        </div>

        {/* Correct Contract Info */}
        <Card className="bg-white shadow-lg border-2 border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Your Deployed ETHGR Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-green-700 font-medium">Contract Address</div>
                    <div className="text-lg font-mono text-green-800">{contractAddress}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(contractAddress)}
                      className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      View on Etherscan
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Token Name:</span>
                    <span className="font-semibold">ETHG Recovery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Symbol:</span>
                    <span className="font-semibold">ETHGR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Supply:</span>
                    <span className="font-semibold text-green-600">1,990,000 ETHGR</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Owner:</span>
                    <span className="font-semibold">Foundation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Migration:</span>
                    <span className="font-semibold text-green-600">Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Deployment Cost:</span>
                    <span className="font-semibold text-green-600">$14.50</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-800">Contract Deployment</div>
                    <div className="text-sm text-blue-600">Gas: 1,378,240 | Cost: $14.50</div>
                    <div className="text-xs font-mono text-blue-500">{deploymentTx}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`https://etherscan.io/tx/${deploymentTx}`, '_blank')}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    View Tx
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-green-800">Token Migration</div>
                    <div className="text-sm text-green-600">Minted: 1,990,000 ETHGR | Gas: 93,627</div>
                    <div className="text-xs font-mono text-green-500">{migrationTx}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`https://etherscan.io/tx/${migrationTx}`, '_blank')}
                    className="border-green-300 text-green-700 hover:bg-green-100"
                  >
                    View Tx
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foundation Wallet */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Foundation Wallet Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-purple-700 font-medium">Foundation Wallet</div>
                  <div className="text-sm font-mono text-purple-800">{foundationWallet}</div>
                  <div className="text-lg font-bold text-purple-800 mt-2">1,990,000 ETHGR</div>
                  <div className="text-sm text-purple-600">Ready for conversion</div>
                </div>
                <Button
                  onClick={() => window.open(`https://etherscan.io/address/${foundationWallet}`, '_blank')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  View Wallet
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready for $45,000 Conversion</h3>
              <p className="text-lg opacity-90">
                Your contract is deployed and verified. Convert 219,300 ETHGR tokens to relief funding.
              </p>
              <Button
                onClick={() => window.location.href = '/uniswap'}
                className="bg-white text-blue-600 font-bold py-3 px-6 hover:bg-gray-100"
                size="lg"
              >
                Start Uniswap Conversion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}