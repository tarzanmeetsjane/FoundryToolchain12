import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  TrendingUp,
  Wallet,
  FileText,
  Hash
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function LiveTransactionAnalyzer() {
  const [txHash, setTxHash] = useState("0x73a526446437912b420b3eda5f68d9204cc5648621f44a2324fe2ebb1cc8412e");
  const [searchHash, setSearchHash] = useState("");

  // Get transaction analysis
  const { data: txData, isLoading, refetch } = useQuery({
    queryKey: ['/api/transaction', txHash],
    enabled: !!txHash && txHash.length === 66,
    refetchInterval: false
  });

  const handleSearch = () => {
    if (searchHash && searchHash.length === 66) {
      setTxHash(searchHash);
    }
  };

  const transaction = txData?.success ? txData.data.transaction : null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Live Transaction Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze any Ethereum transaction in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/instant-monetization', '_blank')}>
            Back to Monetization
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Transaction Search
          </CardTitle>
          <CardDescription>Enter transaction hash to analyze</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="txhash">Transaction Hash</Label>
              <Input
                id="txhash"
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={!searchHash || searchHash.length !== 66}>
                <Search className="h-4 w-4 mr-2" />
                Analyze
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Currently analyzing: <span className="font-mono">{txHash}</span>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Analyzing transaction on Ethereum mainnet...
          </AlertDescription>
        </Alert>
      )}

      {transaction && (
        <>
          <Alert className={transaction.status === 'Success' ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
            {transaction.status === 'Success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <AlertDescription>
              <strong>Transaction Status:</strong> {transaction.status} - {transaction.interpretation}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Transaction Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-700">Status</div>
                    <Badge variant={transaction.status === 'Success' ? 'default' : 'destructive'}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-semibold text-green-700">Block</div>
                    <div className="text-lg font-bold">{transaction.blockNumber}</div>
                  </div>
                </div>

                <div>
                  <div className="font-semibold mb-1">From Address:</div>
                  <div className="font-mono text-sm break-all">{transaction.from}</div>
                </div>

                <div>
                  <div className="font-semibold mb-1">To Address:</div>
                  <div className="font-mono text-sm break-all">{transaction.to || 'Contract Creation'}</div>
                </div>

                {transaction.contractAddress && (
                  <div>
                    <div className="font-semibold mb-1">Contract Created:</div>
                    <div className="font-mono text-sm break-all">{transaction.contractAddress}</div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold">ETH Value</div>
                    <div className="text-lg">{parseFloat(transaction.value).toFixed(6)} ETH</div>
                  </div>
                  <div>
                    <div className="font-semibold">Gas Used</div>
                    <div className="text-lg">{parseInt(transaction.gasUsed).toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold">Gas Price</div>
                    <div className="text-lg">{parseFloat(transaction.gasPrice).toFixed(2)} Gwei</div>
                  </div>
                  <div>
                    <div className="font-semibold">ETH Spent</div>
                    <div className="text-lg">{transaction.ethSpent.toFixed(6)} ETH</div>
                  </div>
                </div>

                <div>
                  <div className="font-semibold mb-1">Timestamp:</div>
                  <div className="text-sm">{transaction.timestamp ? new Date(transaction.timestamp).toLocaleString() : 'Unknown'}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Analysis & Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="font-semibold text-yellow-700 mb-2">Transaction Type</div>
                  <div className="text-sm">{transaction.interpretation}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-semibold">Events Logged</span>
                    <Badge variant="outline">{transaction.logs}</Badge>
                  </div>

                  {parseFloat(transaction.value) > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-semibold">ETH Transferred</span>
                      <span className="font-bold text-green-700">{transaction.value} ETH</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="font-semibold">Transaction Cost</span>
                    <span className="font-bold text-red-700">${(transaction.ethSpent * 2422).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(`https://etherscan.io/tx/${transaction.hash}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View on Etherscan
                  </Button>
                  
                  {transaction.contractAddress && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(`https://etherscan.io/address/${transaction.contractAddress}`, '_blank')}
                    >
                      <Wallet className="h-3 w-3 mr-2" />
                      View Contract
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Relationship to ETHGR Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transaction.from === "0x058C8FE01E5c9eaC6ee19e6673673B549B368843" && (
                  <Alert className="border-blue-500 bg-blue-50">
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Your Wallet Activity:</strong> This transaction was initiated from your ETHGR wallet.
                    </AlertDescription>
                  </Alert>
                )}

                {transaction.to === "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247" && (
                  <Alert className="border-green-500 bg-green-50">
                    <AlertDescription>
                      <strong>ETHGR Contract Interaction:</strong> This transaction interacted with your ETHGR token contract.
                    </AlertDescription>
                  </Alert>
                )}

                {transaction.contractAddress && (
                  <Alert className="border-purple-500 bg-purple-50">
                    <AlertDescription>
                      <strong>New Contract Deployed:</strong> A new smart contract was created. This could be related to pool creation or other DeFi operations.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="p-3 bg-gray-50 rounded">
                  <div className="font-semibold mb-2">Next Steps:</div>
                  <div className="text-sm space-y-1">
                    <div>• Check if this affects your token balance</div>
                    <div>• Verify any new contract functionality</div>
                    <div>• Monitor for follow-up transactions</div>
                    <div>• Update monetization strategy if needed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {txData && !txData.success && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to analyze transaction: {txData.error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}