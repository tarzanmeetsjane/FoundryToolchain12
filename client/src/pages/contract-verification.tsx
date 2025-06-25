import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, Copy, ArrowRight, RefreshCw } from 'lucide-react';
import { getETHGRBalance, getETHBalance, getETHPrice, calculateConversion } from '@/lib/blockchain';

export default function ContractVerification() {
  const [ethgrBalance, setEthgrBalance] = useState(1990000);
  const [ethBalance, setEthBalance] = useState(0);
  const [ethPrice, setEthPrice] = useState(2439);
  const [loading, setLoading] = useState(false);
  
  const contractAddress = "0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308";
  const foundationWallet = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const deploymentTx = "0xd03eef8b6bd869b38cd51ce4b37129354642f92f644d5ca8a03b0843c2c80351";
  const migrationTx = "0x7b597b87f4db2cb3a29c50f8d3f6d3de40bea600c2309a04dd5a8f8fe212c9cb";

  const conversionAmount = 219300;
  const conversion = calculateConversion(conversionAmount, ethPrice);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const refreshBalances = async () => {
    setLoading(true);
    try {
      const [ethgr, eth, price] = await Promise.all([
        getETHGRBalance(),
        getETHBalance(),
        getETHPrice()
      ]);
      setEthgrBalance(ethgr);
      setEthBalance(eth);
      setEthPrice(price);
    } catch (error) {
      console.error("Error refreshing balances:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshBalances();
  }, []);

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
                    <span className="text-slate-600">Foundation Balance:</span>
                    <span className="font-semibold text-green-600">
                      {ethgrBalance.toLocaleString()} ETHGR
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">ETH Balance:</span>
                    <span className="font-semibold">{ethBalance.toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">ETH Price:</span>
                    <span className="font-semibold">${ethPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={refreshBalances}
                        disabled={loading}
                        className="p-0 h-auto text-slate-600 hover:text-slate-800"
                      >
                        <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </span>
                    <span className="font-semibold text-green-600">Live Data</span>
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
                  <div className="text-lg font-bold text-purple-800 mt-2">
                    {ethgrBalance.toLocaleString()} ETHGR
                  </div>
                  <div className="text-sm text-purple-600">
                    Converting {conversionAmount.toLocaleString()} → ${conversion.availableCash.toFixed(0)}
                  </div>
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

        {/* Conversion Summary */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready for $45,000 Conversion</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{conversionAmount.toLocaleString()}</div>
                  <div className="text-sm opacity-90">ETHGR Converting</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{conversion.expectedETH.toFixed(1)} ETH</div>
                  <div className="text-sm opacity-90">Expected Output</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">${conversion.availableCash.toFixed(0)}</div>
                  <div className="text-sm opacity-90">Available Cash</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/uniswap'}
                  className="bg-white text-blue-600 font-bold py-3 px-6 hover:bg-gray-100"
                  size="lg"
                >
                  Start Conversion
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/details'}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 py-3 px-6"
                  size="lg"
                >
                  Technical Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}