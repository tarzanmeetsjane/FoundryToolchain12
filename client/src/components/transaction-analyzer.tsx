import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ExternalLink,
  Copy,
  AlertTriangle,
  CheckCircle,
  Clock,
  Coins
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

interface TransactionDetails {
  hash: string;
  blockNumber: string;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
  status: string;
  contractAddress?: string;
  tokenTransfers?: TokenTransfer[];
  methodId?: string;
  functionName?: string;
  input?: string;
  stateChanges?: StateChange[];
}

interface StateChange {
  address: string;
  name?: string;
  before: string;
  after: string;
  difference: string;
  nonceBefore?: number;
  nonceAfter?: number;
  type: 'ETH' | 'TOKEN' | 'NONCE';
}

interface TokenTransfer {
  from: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  contractAddress: string;
}

export function TransactionAnalyzer() {
  const [txHash, setTxHash] = useState("");
  const [contractAddress, setContractAddress] = useState("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"); // UNI token
  const { toast } = useToast();

  // Fetch transaction details
  const { data: txDetails, isLoading: txLoading, refetch: refetchTx } = useQuery({
    queryKey: ['/api/transaction', txHash],
    queryFn: async () => {
      if (!txHash || txHash.length !== 66) return null;
      
      const response = await fetch(`/api/transaction/${txHash}`);
      if (!response.ok) throw new Error('Failed to fetch transaction');
      return response.json();
    },
    enabled: !!txHash && txHash.length === 66
  });

  // Fetch contract information
  const { data: contractInfo, isLoading: contractLoading } = useQuery({
    queryKey: ['/api/contract/verify-status', contractAddress],
    queryFn: async () => {
      if (!contractAddress || contractAddress.length !== 42) return null;
      
      const response = await fetch(`/api/contract/verify-status/${contractAddress}`);
      if (!response.ok) throw new Error('Failed to fetch contract info');
      return response.json();
    },
    enabled: !!contractAddress && contractAddress.length === 42
  });

  const analyzeTx = () => {
    if (!txHash || txHash.length !== 66) {
      toast({
        title: "Invalid Transaction Hash",
        description: "Please enter a valid transaction hash (0x...)",
        variant: "destructive"
      });
      return;
    }
    refetchTx();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Content copied to clipboard"
    });
  };

  const openInEtherscan = (type: 'tx' | 'address', value: string) => {
    const baseUrl = 'https://etherscan.io';
    const url = type === 'tx' ? `${baseUrl}/tx/${value}` : `${baseUrl}/address/${value}`;
    window.open(url, '_blank');
  };

  const formatValue = (value: string, decimals: string = "18") => {
    const divisor = Math.pow(10, parseInt(decimals));
    const formatted = parseFloat(value) / divisor;
    return formatted.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const getMethodName = (methodId: string) => {
    const methods: Record<string, string> = {
      '0xa9059cbb': 'transfer',
      '0x095ea7b3': 'approve',
      '0x23b872dd': 'transferFrom',
      '0x': 'ETH Transfer'
    };
    return methods[methodId] || 'Unknown Method';
  };

  const isLargeApproval = (value: string, decimals: string = "18") => {
    const amount = parseFloat(value) / Math.pow(10, parseInt(decimals));
    return amount > 1000000000; // 1 billion threshold
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Transaction Analyzer
        </CardTitle>
        <CardDescription>
          Analyze Ethereum transactions, token approvals, and contract interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="transaction" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transaction">Transaction Analysis</TabsTrigger>
            <TabsTrigger value="contract">Contract Info</TabsTrigger>
          </TabsList>

          <TabsContent value="transaction" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Transaction hash (0x...)"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button onClick={analyzeTx} disabled={txLoading}>
                  {txLoading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Example: Large UNI token approval transaction
              </div>
            </div>

            {txDetails && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Transaction Details
                      <Badge variant={txDetails.status === "1" ? "default" : "destructive"}>
                        {txDetails.status === "1" ? (
                          <><CheckCircle className="w-3 h-3 mr-1" /> Success</>
                        ) : (
                          <><AlertTriangle className="w-3 h-3 mr-1" /> Failed</>
                        )}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">Hash</div>
                        <div className="font-mono text-xs flex items-center gap-2">
                          {txDetails.hash.slice(0, 10)}...{txDetails.hash.slice(-8)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(txDetails.hash)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openInEtherscan('tx', txDetails.hash)}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">Block</div>
                        <div className="text-sm">{parseInt(txDetails.blockNumber).toLocaleString()}</div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">From</div>
                        <div className="font-mono text-xs flex items-center gap-2">
                          {txDetails.from.slice(0, 6)}...{txDetails.from.slice(-4)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openInEtherscan('address', txDetails.from)}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">To</div>
                        <div className="font-mono text-xs flex items-center gap-2">
                          {txDetails.to.slice(0, 6)}...{txDetails.to.slice(-4)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openInEtherscan('address', txDetails.to)}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">Value</div>
                        <div className="text-sm">{formatValue(txDetails.value)} ETH</div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">Gas Used</div>
                        <div className="text-sm">{parseInt(txDetails.gasUsed).toLocaleString()}</div>
                      </div>
                    </div>

                    {txDetails.methodId && (
                      <div>
                        <div className="text-sm font-medium">Method</div>
                        <Badge variant="outline">
                          {getMethodName(txDetails.methodId)}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {txDetails.tokenTransfers && txDetails.tokenTransfers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Coins className="w-5 h-5" />
                        Token Transfers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {txDetails.tokenTransfers.map((transfer: any, index: number) => {
                          const isLarge = isLargeApproval(transfer.value, transfer.tokenDecimal);
                          return (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{transfer.tokenName}</span>
                                    <Badge variant="outline">{transfer.tokenSymbol}</Badge>
                                    {isLarge && (
                                      <Badge variant="destructive">
                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                        Large Amount
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    From: {transfer.from.slice(0, 6)}...{transfer.from.slice(-4)} → 
                                    To: {transfer.to.slice(0, 6)}...{transfer.to.slice(-4)}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    {formatValue(transfer.value, transfer.tokenDecimal)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {transfer.tokenSymbol}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      State Changes Analysis
                    </CardTitle>
                    <CardDescription>
                      ETH balance changes and nonce updates from your transaction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-3">Example from your UNI transaction:</h4>
                        <div className="space-y-3 text-sm">
                          <div className="grid grid-cols-4 gap-2 font-medium border-b pb-2">
                            <span>Address</span>
                            <span>Before</span>
                            <span>After</span>
                            <span>Difference</span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2">
                            <span className="font-mono text-xs">0x1f9840a8...984 (UNI)</span>
                            <span>Producer fees</span>
                            <span>Updated</span>
                            <span className="text-green-600">+fees</span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2">
                            <span className="font-mono text-xs">0x95222290...fe5</span>
                            <span>8.529156907 ETH</span>
                            <span>8.529208035 ETH</span>
                            <span className="text-green-600">+0.000051127 ETH</span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2">
                            <span className="font-mono text-xs">0xc46eB376...630 (You)</span>
                            <span>0.014736356 ETH</span>
                            <span>0.014573871 ETH</span>
                            <span className="text-red-600">-0.000162485 ETH</span>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2">
                            <span className="font-mono text-xs">Nonce Change</span>
                            <span>1</span>
                            <span>2</span>
                            <span className="text-blue-600">+1</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• Your wallet paid ~0.000162 ETH in gas fees</p>
                        <p>• The builder/validator received the gas fees</p>
                        <p>• Your nonce increased from 1 → 2 (next transaction number)</p>
                        <p>• UNI contract state was updated with your approval</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contract" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Contract address (0x...)"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button 
                  onClick={() => openInEtherscan('address', contractAddress)}
                  disabled={!contractAddress}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Pre-loaded: UNI Token Contract (0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984)
              </div>
            </div>

            {contractInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contract Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Verification Status</div>
                      <Badge variant={contractInfo.isVerified ? "default" : "secondary"}>
                        {contractInfo.isVerified ? "Verified" : "Not Verified"}
                      </Badge>
                    </div>

                    {contractInfo.isVerified && (
                      <>
                        <div>
                          <div className="text-sm font-medium">Contract Name</div>
                          <div className="text-sm">{contractInfo.contractName}</div>
                        </div>

                        <div>
                          <div className="text-sm font-medium">Compiler Version</div>
                          <div className="text-sm font-mono">{contractInfo.compilerVersion}</div>
                        </div>

                        <div>
                          <div className="text-sm font-medium">Optimization</div>
                          <Badge variant="outline">
                            {contractInfo.optimization ? `Enabled (${contractInfo.runs} runs)` : 'Disabled'}
                          </Badge>
                        </div>

                        {contractInfo.proxy && (
                          <div>
                            <div className="text-sm font-medium">Contract Type</div>
                            <Badge variant="default">Proxy Contract</Badge>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}