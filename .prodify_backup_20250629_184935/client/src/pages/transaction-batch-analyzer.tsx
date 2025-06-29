import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Hash
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function TransactionBatchAnalyzer() {
  const transactionHashes = [
    "0x2c72736010c3bc273f23da8bc782beb1ca007a56b48f5b68e4ddcf163126de84",
    "0xaa1a05e4786df812b12708dd840cf4c1c9291b13d63aafe18301e0d7b29da0b8", 
    "0x3166399fe90fda9b3d8c8e53ed174fdcd08939196c39b7ab9c921fb9cac570fc",
    "0xb3dba152aa637bb1c5e97035d9b1d80509aebdee9af0a0d65692e5cb25e4e180",
    "0xad9029ba937f9c411729c0ba9b4851fee8b6e79edbd69f920f49b0ce2915c4bb"
  ];

  const [analyzingIndex, setAnalyzingIndex] = useState<number | null>(null);

  // Analyze each transaction
  const analyzeTransaction = async (hash: string) => {
    try {
      const response = await fetch(`/api/transaction/${hash}`);
      const data = await response.json();
      return data.success ? data.data.transaction : null;
    } catch (error) {
      return null;
    }
  };

  const checkWalletRelation = (tx: any) => {
    if (!tx) return null;
    
    const userWallets = [
      "0x058C8FE01E5c9eaC6ee19e6673673B549B368843".toLowerCase(),
      "0xc46eB37677360EfDc011F4097621F15b792fa630".toLowerCase()
    ];
    
    const ethgrContract = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247".toLowerCase();
    
    if (userWallets.includes(tx.from?.toLowerCase())) {
      return { type: "sent", wallet: "your wallet" };
    }
    if (userWallets.includes(tx.to?.toLowerCase())) {
      return { type: "received", wallet: "your wallet" };
    }
    if (tx.to?.toLowerCase() === ethgrContract) {
      return { type: "contract", wallet: "ETHGR contract" };
    }
    return null;
  };

  const analyzeLargeValue = (tx: any) => {
    if (!tx) return false;
    const ethValue = parseFloat(tx.value);
    return ethValue > 5; // More than 5 ETH
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction Batch Analysis</h1>
          <p className="text-muted-foreground">
            Analyzing {transactionHashes.length} transactions for portfolio connections
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.open('/million-dollar-strategy', '_blank')}>
            Back to Strategy
          </Button>
        </div>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Hash className="h-4 w-4" />
        <AlertDescription>
          Analyzing batch of {transactionHashes.length} transaction hashes for connections to your $1.41M portfolio, 
          37 ETH recovery, or other significant activities.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {transactionHashes.map((hash, index) => (
          <TransactionCard key={hash} hash={hash} index={index + 1} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-50 rounded">
              <div className="font-semibold text-green-700">Portfolio Related</div>
              <div className="text-sm text-muted-foreground">
                Transactions involving your wallets or ETHGR contract
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-semibold text-blue-700">Large Value Transfers</div>
              <div className="text-sm text-muted-foreground">
                Transactions with significant ETH amounts (>5 ETH)
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <div className="font-semibold text-purple-700">Recovery Clues</div>
              <div className="text-sm text-muted-foreground">
                Potential connections to 37 ETH recovery operation
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TransactionCard({ hash, index }: { hash: string; index: number }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch(`/api/transaction/${hash}`);
      const data = await response.json();
      setTxData(data.success ? data.data.transaction : { error: data.error });
    } catch (error) {
      setTxData({ error: "Failed to analyze transaction" });
    }
    setAnalyzing(false);
  };

  const checkWalletRelation = (tx: any) => {
    if (!tx || tx.error) return null;
    
    const userWallets = [
      "0x058C8FE01E5c9eaC6ee19e6673673B549B368843".toLowerCase(),
      "0xc46eB37677360EfDc011F4097621F15b792fa630".toLowerCase()
    ];
    
    const ethgrContract = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247".toLowerCase();
    
    if (userWallets.includes(tx.from?.toLowerCase())) {
      return { type: "sent", description: "Sent from your wallet", color: "text-red-600" };
    }
    if (userWallets.includes(tx.to?.toLowerCase())) {
      return { type: "received", description: "Received to your wallet", color: "text-green-600" };
    }
    if (tx.to?.toLowerCase() === ethgrContract) {
      return { type: "contract", description: "ETHGR contract interaction", color: "text-blue-600" };
    }
    return null;
  };

  const relation = checkWalletRelation(txData);
  const isLargeValue = txData && !txData.error && parseFloat(txData.value) > 5;

  return (
    <Card className={relation ? "border-green-200" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">TX {index}</Badge>
            <span className="font-mono text-sm">{hash.slice(0, 20)}...</span>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? <Clock className="h-3 w-3 animate-spin" /> : <Search className="h-3 w-3" />}
              {analyzing ? "Analyzing..." : "Analyze"}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open(`https://etherscan.io/tx/${hash}`, '_blank')}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      {txData && (
        <CardContent>
          {txData.error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Failed to analyze: {txData.error}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold">Status</div>
                  <Badge variant={txData.status === 'Success' ? 'default' : 'destructive'}>
                    {txData.status}
                  </Badge>
                </div>
                <div>
                  <div className="font-semibold">Value</div>
                  <div className={isLargeValue ? "font-bold text-green-600" : ""}>
                    {parseFloat(txData.value).toFixed(6)} ETH
                  </div>
                </div>
              </div>

              {relation && (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Portfolio Connection:</strong> 
                    <span className={relation.color}> {relation.description}</span>
                  </AlertDescription>
                </Alert>
              )}

              {isLargeValue && (
                <Alert className="border-yellow-500 bg-yellow-50">
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Large Value Transfer:</strong> This transaction moved significant ETH ({parseFloat(txData.value).toFixed(6)} ETH = ${(parseFloat(txData.value) * 2422).toLocaleString()})
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <div className="font-semibold mb-1">From:</div>
                <div className="font-mono text-xs break-all">{txData.from}</div>
              </div>
              
              <div>
                <div className="font-semibold mb-1">To:</div>
                <div className="font-mono text-xs break-all">{txData.to || "Contract Creation"}</div>
              </div>

              <div>
                <div className="font-semibold mb-1">Interpretation:</div>
                <div className="text-sm">{txData.interpretation}</div>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}