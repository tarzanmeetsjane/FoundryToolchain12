
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  ExternalLink,
  TrendingUp,
  Activity,
  Wallet,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ERC20Transfer {
  id: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  tokenDecimals: number;
  chainId: number;
  chainName: string;
}

export default function RoutescanTransferAnalysis() {
  const [address, setAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");
  const [transfers, setTransfers] = useState<ERC20Transfer[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [foundationData, setFoundationData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load foundation wallet data on component mount
    loadFoundationWalletData();
  }, []);

  const loadFoundationWalletData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/routescan/foundation-wallet-activity');
      const data = await response.json();
      
      if (data.success) {
        setFoundationData(data.data);
        setTransfers(data.data.transfers || []);
        setAnalysis(data.data.analysis || null);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to load foundation wallet data",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load foundation wallet data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeAddress = async () => {
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/routescan/erc20-transfers/${address}`);
      const data = await response.json();
      
      if (data.success) {
        setTransfers(data.transfers || []);
        setAnalysis(data.analysis || null);
        setFoundationData(null); // Clear foundation-specific data
        
        toast({
          title: "Analysis Complete",
          description: `Found ${data.transfers?.length || 0} ERC20 transfers`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to analyze address",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze address",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (transfer: ERC20Transfer) => {
    try {
      const value = parseFloat(transfer.value) / Math.pow(10, transfer.tokenDecimals);
      return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
    } catch {
      return transfer.value;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getExplorerUrl = (chainId: number, txHash: string) => {
    const explorers: Record<number, string> = {
      1: "https://etherscan.io",
      137: "https://polygonscan.com",
      56: "https://bscscan.com",
      10: "https://optimistic.etherscan.io",
      8453: "https://basescan.org"
    };
    
    const explorer = explorers[chainId] || "https://etherscan.io";
    return `${explorer}/tx/${txHash}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Routescan ERC20 Transfer Analysis</h1>
        <p className="text-gray-400">
          Multi-chain ERC20 transfer analysis powered by Routescan API
        </p>
      </div>

      {/* Foundation Wallet Quick Stats */}
      {foundationData && (
        <Alert className="border-blue-500 bg-blue-500/10">
          <CheckCircle className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200">
            <strong>Foundation Wallet Analysis:</strong> {foundationData.analysis?.totalTransfers || 0} total transfers, 
            {foundationData.foundationSpecific?.totalETHGTransfers || 0} ETHG-related transfers found
          </AlertDescription>
        </Alert>
      )}

      {/* Address Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Address Analysis
          </CardTitle>
          <CardDescription>
            Enter any Ethereum address to analyze ERC20 transfers across multiple chains
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Wallet Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="font-mono"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={analyzeAddress} disabled={loading} className="flex-1">
              {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              Analyze Transfers
            </Button>
            <Button onClick={loadFoundationWalletData} variant="outline" disabled={loading}>
              <Wallet className="h-4 w-4 mr-2" />
              Foundation Wallet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{analysis.totalTransfers}</div>
              <div className="text-sm text-gray-400">Total Transfers</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{analysis.uniqueTokens}</div>
              <div className="text-sm text-gray-400">Unique Tokens</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{analysis.uniqueChains}</div>
              <div className="text-sm text-gray-400">Chains</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">
                {analysis.largestTransfer ? formatValue(analysis.largestTransfer) : '0'}
              </div>
              <div className="text-sm text-gray-400">
                {analysis.largestTransfer ? analysis.largestTransfer.tokenSymbol : 'Largest Transfer'}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chain Breakdown */}
      {analysis?.chainBreakdown && Object.keys(analysis.chainBreakdown).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Chain Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(analysis.chainBreakdown).map(([chain, count]) => (
                <Badge key={chain} variant="outline">
                  {chain}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Transfers */}
      {transfers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent ERC20 Transfers
            </CardTitle>
            <CardDescription>
              Latest {transfers.length} transfers found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transfers.map((transfer, index) => (
                <div key={transfer.id || index} className="p-3 bg-gray-800/50 rounded border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{transfer.tokenSymbol}</Badge>
                        <Badge variant="secondary">{transfer.chainName}</Badge>
                        <span className="text-sm text-gray-400">
                          Block {transfer.blockNumber?.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        From: {transfer.from?.slice(0, 6)}...{transfer.from?.slice(-4)} → 
                        To: {transfer.to?.slice(0, 6)}...{transfer.to?.slice(-4)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTimestamp(transfer.timestamp)}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-medium">
                        {formatValue(transfer)} {transfer.tokenSymbol}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(getExplorerUrl(transfer.chainId, transfer.transactionHash), '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ETHG-Specific Data */}
      {foundationData?.ethgTransfers && foundationData.ethgTransfers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              ETHG Token Activity
            </CardTitle>
            <CardDescription>
              ETHG-related transfers detected for foundation wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {foundationData.ethgTransfers.slice(0, 5).map((transfer: ERC20Transfer, index: number) => (
                <div key={index} className="p-3 bg-green-900/20 rounded border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="bg-green-600">{transfer.tokenSymbol}</Badge>
                      <span className="ml-2 text-sm">{transfer.chainName}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-400">
                        {formatValue(transfer)} {transfer.tokenSymbol}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatTimestamp(transfer.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
