import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, ExternalLink, Refresh, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  isError: string;
}

interface WalletData {
  balance: string;
  transactions: Transaction[];
}

export default function LiveBlockchainInvestigation() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const originalWallet = "0xc46eb37677360efdc011f4097621f15b792fa630";

  const investigateWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get balance
      const balanceResponse = await fetch(`/api/etherscan/balance/${originalWallet}`);
      const balanceData = await balanceResponse.json();
      
      // Get transactions
      const txResponse = await fetch(`/api/etherscan/transactions/${originalWallet}`);
      const txData = await txResponse.json();
      
      if (balanceData.status === "1" && txData.status === "1") {
        setWalletData({
          balance: balanceData.result,
          transactions: txData.result || []
        });
      } else {
        setError("Failed to fetch wallet data from Etherscan");
      }
    } catch (err) {
      setError("Network error while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const formatETH = (wei: string) => {
    const eth = parseFloat(wei) / 1e18;
    return eth.toFixed(6);
  };

  const formatUSD = (wei: string, ethPrice = 2400) => {
    const eth = parseFloat(wei) / 1e18;
    return (eth * ethPrice).toLocaleString();
  };

  const findLargeTransactions = (transactions: Transaction[]) => {
    return transactions.filter(tx => {
      const ethValue = parseFloat(tx.value) / 1e18;
      return ethValue > 10; // Look for transactions > 10 ETH
    });
  };

  useEffect(() => {
    investigateWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Live Blockchain Investigation
          </h1>
          <p className="text-slate-600 text-lg">
            Real-time analysis of your original wallet: {originalWallet.slice(0, 10)}...
          </p>
        </div>

        {/* Investigation Status */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Search className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <strong>Live Investigation:</strong> Using Etherscan API to trace your missing 37 ETH (~$88,800). 
            This will show real blockchain data, not demo responses.
          </AlertDescription>
        </Alert>

        {/* Wallet Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Original Wallet Analysis
              <Button 
                variant="outline" 
                size="sm"
                onClick={investigateWallet}
                disabled={loading}
              >
                <Refresh className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <div className="text-gray-600">Investigating blockchain...</div>
              </div>
            )}

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {walletData && (
              <div className="space-y-6">
                
                {/* Current Balance */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Current Balance</h4>
                    <div className="text-2xl font-bold text-blue-700">
                      {formatETH(walletData.balance)} ETH
                    </div>
                    <div className="text-blue-600">
                      ${formatUSD(walletData.balance)}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Expected Missing</h4>
                    <div className="text-2xl font-bold text-amber-700">37 ETH</div>
                    <div className="text-amber-600">~$88,800</div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Total Transactions</h4>
                    <div className="text-2xl font-bold text-green-700">
                      {walletData.transactions.length}
                    </div>
                    <div className="text-green-600">All time</div>
                  </div>
                </div>

                {/* Large Transactions */}
                {walletData.transactions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Large Transactions (>10 ETH)</h4>
                    {(() => {
                      const largeTransactions = findLargeTransactions(walletData.transactions);
                      
                      if (largeTransactions.length === 0) {
                        return (
                          <Alert className="border-yellow-200 bg-yellow-50">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-yellow-800">
                              <strong>No Large Transactions Found:</strong> No transactions over 10 ETH detected. 
                              This suggests the 37 ETH may not have been transferred from this wallet, or the 
                              transaction occurred differently than expected.
                            </AlertDescription>
                          </Alert>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          {largeTransactions.map((tx, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <div className="text-xs text-gray-500">Amount</div>
                                  <div className="font-bold text-lg">
                                    {formatETH(tx.value)} ETH
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    ${formatUSD(tx.value)}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-xs text-gray-500">Direction</div>
                                  <div className="font-semibold">
                                    {tx.from.toLowerCase() === originalWallet.toLowerCase() ? 
                                      <span className="text-red-600">Outgoing</span> : 
                                      <span className="text-green-600">Incoming</span>
                                    }
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {tx.from.toLowerCase() === originalWallet.toLowerCase() ? 
                                      `To: ${tx.to.slice(0, 10)}...` : 
                                      `From: ${tx.from.slice(0, 10)}...`
                                    }
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-xs text-gray-500">Date</div>
                                  <div className="text-sm">
                                    {new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString()}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(parseInt(tx.timeStamp) * 1000).toLocaleTimeString()}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-xs text-gray-500">Status</div>
                                  <div className="flex items-center gap-2">
                                    {tx.isError === "0" ? (
                                      <Badge className="bg-green-100 text-green-800">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Success
                                      </Badge>
                                    ) : (
                                      <Badge className="bg-red-100 text-red-800">
                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                        Failed
                                      </Badge>
                                    )}
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-1"
                                    onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Analysis Summary */}
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <h4 className="font-semibold text-slate-800 mb-3">Investigation Summary</h4>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div>• Current wallet balance: {walletData ? formatETH(walletData.balance) : '0'} ETH</div>
                    <div>• Total transaction count: {walletData?.transactions.length || 0}</div>
                    <div>• Large transactions (>10 ETH): {walletData ? findLargeTransactions(walletData.transactions).length : 0}</div>
                    <div>• Expected 37 ETH transfer: {walletData && findLargeTransactions(walletData.transactions).some(tx => 
                      Math.abs(parseFloat(tx.value) / 1e18 - 37) < 1) ? 
                      "FOUND" : "NOT FOUND"}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manual Investigation */}
        <Card className="border-2 border-purple-300 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">Manual Investigation Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-purple-700">
                If the automated analysis doesn't show your 37 ETH transfer, you can manually 
                investigate using these direct links:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => window.open(`https://etherscan.io/address/${originalWallet}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Wallet History
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://etherscan.io/address/${originalWallet}#internaltx`, '_blank')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Check Internal Transactions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}