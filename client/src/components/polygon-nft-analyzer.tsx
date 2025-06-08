import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Eye,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PolygonNFTAnalyzer() {
  const [transactionHash, setTransactionHash] = useState("0x913dc5460c9b1deb7c889982654a90e7a47358b02863dacb4823aaec9b5c5487");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeTransaction = async () => {
    if (!transactionHash || transactionHash.length !== 66) {
      toast({
        title: "Invalid Transaction Hash",
        description: "Please enter a valid 66-character transaction hash",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Direct call to Polygonscan API since we know your specific transaction
      const polygonscanUrl = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionReceipt&txhash=${transactionHash}&apikey=YourApiKeyToken`;
      
      const response = await fetch(polygonscanUrl);
      const data = await response.json();

      if (data.result && data.result.logs) {
        const receipt = data.result;
        
        // Parse event logs for NFT-related events
        const nftEventSignatures = {
          transfer: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          approval: "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
          approvalForAll: "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
        };

        const parsedEvents = receipt.logs.map((log: any, index: number) => {
          const eventType = Object.entries(nftEventSignatures).find(([_, sig]) => 
            log.topics[0] === sig
          )?.[0] || 'unknown';

          let parsedData = {};
          
          if (eventType === 'transfer' && log.topics.length === 4) {
            // ERC-721 Transfer
            try {
              parsedData = {
                from: '0x' + log.topics[1].slice(26),
                to: '0x' + log.topics[2].slice(26),
                tokenId: BigInt(log.topics[3]).toString(),
                standard: 'ERC-721'
              };
            } catch (e) {
              parsedData = { error: 'Failed to parse transfer' };
            }
          }

          return {
            logIndex: index,
            address: log.address,
            eventType,
            topics: log.topics,
            data: log.data,
            parsed: parsedData,
            blockNumber: parseInt(log.blockNumber, 16)
          };
        });

        const nftTransfers = parsedEvents.filter(e => 
          e.eventType === 'transfer' && e.parsed.standard === 'ERC-721'
        );

        const contractAddresses = [...new Set(nftTransfers.map(e => e.address))];

        const result = {
          transactionHash,
          blockNumber: parseInt(receipt.blockNumber, 16),
          gasUsed: parseInt(receipt.gasUsed, 16),
          status: receipt.status === "0x1" ? "success" : "failed",
          from: receipt.from,
          to: receipt.to,
          nftAnalysis: {
            totalNFTEvents: nftTransfers.length,
            erc721Transfers: nftTransfers.length,
            contractAddresses
          },
          nftTransfers,
          allEvents: parsedEvents,
          network: "polygon",
          explorer: `https://polygonscan.com/tx/${transactionHash}`
        };

        setAnalysisResult(result);
        
        toast({
          title: "Analysis Complete",
          description: `Found ${nftTransfers.length} NFT transfers`
        });
      } else {
        throw new Error("Invalid response from Polygonscan API");
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Analysis Failed",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Polygon NFT Transaction Analyzer
          </CardTitle>
          <CardDescription>
            Analyze your Coinbase Wallet NFT transaction on Polygon with detailed event parsing
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
            <Button onClick={analyzeTransaction} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : <Search className="w-4 h-4 mr-1" />}
              {isAnalyzing ? "" : "Analyze"}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Pre-loaded with your Coinbase Wallet NFT transaction on Polygon
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Error: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="space-y-4">
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
                    {analysisResult.status === "success" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="font-medium capitalize">{analysisResult.status}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Block Number</div>
                  <div className="font-medium">{formatNumber(analysisResult.blockNumber)}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Gas Used</div>
                  <div className="font-medium">{formatNumber(analysisResult.gasUsed)}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">NFT Events</div>
                  <div className="font-medium">{analysisResult.nftAnalysis.totalNFTEvents}</div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">From</div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {formatAddress(analysisResult.from)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(analysisResult.from)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">To</div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {formatAddress(analysisResult.to)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(analysisResult.to)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a 
                    href={analysisResult.explorer} 
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

          {analysisResult.nftTransfers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5" />
                  NFT Transfers ({analysisResult.nftTransfers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.nftTransfers.map((transfer: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          ERC-721
                        </Badge>
                        <code className="text-sm text-muted-foreground">
                          Token ID: {transfer.parsed.tokenId}
                        </code>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Contract</div>
                          <div className="flex items-center gap-2">
                            <code className="bg-muted px-2 py-1 rounded">
                              {formatAddress(transfer.address)}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(transfer.address)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <div className="text-muted-foreground">From</div>
                          <div className="flex items-center gap-2">
                            <code className="bg-muted px-2 py-1 rounded">
                              {formatAddress(transfer.parsed.from)}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(transfer.parsed.from)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <div className="text-muted-foreground">To</div>
                          <div className="flex items-center gap-2">
                            <code className="bg-muted px-2 py-1 rounded">
                              {formatAddress(transfer.parsed.to)}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(transfer.parsed.to)}
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                NFT Contract Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResult.nftAnalysis.contractAddresses.map((contract: string, index: number) => (
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                All Event Logs ({analysisResult.allEvents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {analysisResult.allEvents.map((event: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
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

                    {event.parsed && !event.parsed.error && event.eventType === 'transfer' && (
                      <div className="bg-muted p-2 rounded text-xs">
                        <div>From: {formatAddress(event.parsed.from)}</div>
                        <div>To: {formatAddress(event.parsed.to)}</div>
                        <div>Token ID: {event.parsed.tokenId}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}