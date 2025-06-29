import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image,
  Search, 
  ExternalLink,
  Copy,
  CheckCircle,
  AlertTriangle,
  ArrowUpDown,
  Hash,
  Wallet,
  FileText,
  TrendingUp,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

interface NFTTransactionData {
  transactionHash: string;
  blockNumber: number;
  gasUsed: number;
  gasPrice: number;
  transactionFee: number;
  status: string;
  from: string;
  to: string;
  nftAnalysis: {
    totalNFTEvents: number;
    erc721Transfers: number;
    erc1155Transfers: number;
    nftContracts: number;
    contractAddresses: string[];
  };
  nftTransfers: Array<{
    contract: string;
    from: string;
    to: string;
    tokenId: string;
    standard: string;
  }>;
  erc1155Transfers: Array<{
    contract: string;
    operator: string;
    from: string;
    to: string;
    tokenId: string;
    value: string;
    standard: string;
  }>;
  allEvents: Array<{
    logIndex: number;
    address: string;
    eventType: string;
    parsed: any;
  }>;
  eventsSummary: Record<string, number>;
  network: string;
  explorer: string;
  timestamp: number;
}

export function NFTTransactionAnalyzer() {
  const [transactionHash, setTransactionHash] = useState("0x913dc5460c9b1deb7c889982654a90e7a47358b02863dacb4823aaec9b5c5487");
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const { data: nftData, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/polygon/nft-transaction', transactionHash],
    queryFn: async () => {
      if (!transactionHash || transactionHash.length !== 66) {
        throw new Error("Invalid transaction hash");
      }
      const response = await fetch(`/api/polygon/nft-transaction/${transactionHash}`);
      if (!response.ok) {
        throw new Error("Failed to analyze transaction");
      }
      const result = await response.json();
      return result.data as NFTTransactionData;
    },
    enabled: !!transactionHash && transactionHash.length === 66
  });

  const handleAnalyze = () => {
    if (!transactionHash || transactionHash.length !== 66) {
      toast({
        title: "Invalid Transaction Hash",
        description: "Please enter a valid 66-character transaction hash",
        variant: "destructive"
      });
      return;
    }
    refetch();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Address copied to clipboard"
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getStandardColor = (standard: string) => {
    switch (standard) {
      case 'ERC-721': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'ERC-1155': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'ERC-20': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            NFT Transaction Analyzer
          </CardTitle>
          <CardDescription>
            Analyze Polygon NFT transactions with detailed event log parsing and transfer tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter transaction hash (0x...)"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              className="font-mono text-sm"
            />
            <Button onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? "Analyzing..." : <Search className="w-4 h-4 mr-1" />}
              {isLoading ? "" : "Analyze"}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Example: Your Coinbase Wallet NFT transaction on Polygon
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Error: {error.message}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {nftData && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transfers">NFT Transfers</TabsTrigger>
            <TabsTrigger value="events">All Events</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Transaction Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="flex items-center gap-2">
                      {nftData.status === "success" ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="font-medium capitalize">{nftData.status}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Block Number</div>
                    <div className="font-medium">{formatNumber(nftData.blockNumber)}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Gas Used</div>
                    <div className="font-medium">{formatNumber(nftData.gasUsed)}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Transaction Fee</div>
                    <div className="font-medium">{nftData.transactionFee.toFixed(6)} MATIC</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">From</div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {formatAddress(nftData.from)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(nftData.from)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">To</div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {formatAddress(nftData.to)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(nftData.to)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">NFT Analysis Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{nftData.nftAnalysis.totalNFTEvents}</div>
                      <div className="text-sm text-muted-foreground">Total NFT Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{nftData.nftAnalysis.erc721Transfers}</div>
                      <div className="text-sm text-muted-foreground">ERC-721 Transfers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{nftData.nftAnalysis.erc1155Transfers}</div>
                      <div className="text-sm text-muted-foreground">ERC-1155 Transfers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{nftData.nftAnalysis.nftContracts}</div>
                      <div className="text-sm text-muted-foreground">NFT Contracts</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <a 
                      href={nftData.explorer} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View on PolygonScan
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-4">
            {nftData.nftTransfers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5" />
                    ERC-721 NFT Transfers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nftData.nftTransfers.map((transfer, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={getStandardColor(transfer.standard)}>
                            {transfer.standard}
                          </Badge>
                          <code className="text-sm text-muted-foreground">
                            Token ID: {transfer.tokenId}
                          </code>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Contract</div>
                            <div className="flex items-center gap-2">
                              <code className="bg-muted px-2 py-1 rounded">
                                {formatAddress(transfer.contract)}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(transfer.contract)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <div className="text-muted-foreground">From</div>
                            <div className="flex items-center gap-2">
                              <code className="bg-muted px-2 py-1 rounded">
                                {formatAddress(transfer.from)}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(transfer.from)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <div className="text-muted-foreground">To</div>
                            <div className="flex items-center gap-2">
                              <code className="bg-muted px-2 py-1 rounded">
                                {formatAddress(transfer.to)}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(transfer.to)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {nftData.erc1155Transfers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    ERC-1155 NFT Transfers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nftData.erc1155Transfers.map((transfer, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={getStandardColor(transfer.standard)}>
                            {transfer.standard}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            Token ID: {transfer.tokenId} | Value: {transfer.value}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Contract</div>
                            <code className="text-xs bg-muted px-2 py-1 rounded block">
                              {formatAddress(transfer.contract)}
                            </code>
                          </div>

                          <div>
                            <div className="text-muted-foreground">Operator</div>
                            <code className="text-xs bg-muted px-2 py-1 rounded block">
                              {formatAddress(transfer.operator)}
                            </code>
                          </div>

                          <div>
                            <div className="text-muted-foreground">From</div>
                            <code className="text-xs bg-muted px-2 py-1 rounded block">
                              {formatAddress(transfer.from)}
                            </code>
                          </div>

                          <div>
                            <div className="text-muted-foreground">To</div>
                            <code className="text-xs bg-muted px-2 py-1 rounded block">
                              {formatAddress(transfer.to)}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {nftData.nftTransfers.length === 0 && nftData.erc1155Transfers.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    No NFT transfers found in this transaction
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  All Transaction Events
                </CardTitle>
                <CardDescription>
                  Complete event log analysis with parsed data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(nftData.eventsSummary).map(([eventType, count]) => (
                      <Badge key={eventType} variant="outline">
                        {eventType}: {count}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {nftData.allEvents.map((event, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Log {event.logIndex}</Badge>
                            <Badge className={
                              event.eventType === 'transfer' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              event.eventType === 'approval' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }>
                              {event.eventType}
                            </Badge>
                          </div>
                          <code className="text-xs text-muted-foreground">
                            {formatAddress(event.address)}
                          </code>
                        </div>

                        {event.parsed && !event.parsed.error && (
                          <div className="bg-muted p-3 rounded text-sm">
                            <pre className="text-xs overflow-x-auto">
                              {JSON.stringify(event.parsed, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  NFT Contract Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nftData.nftAnalysis.contractAddresses.map((contract, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <code className="text-sm font-mono">{contract}</code>
                        <div className="text-xs text-muted-foreground">
                          NFT Contract #{index + 1}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(contract)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a 
                            href={`https://polygonscan.com/address/${contract}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}