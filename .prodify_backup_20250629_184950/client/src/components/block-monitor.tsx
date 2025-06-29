
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Clock, 
  Fuel, 
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface BlockData {
  number: string;
  timestamp: string;
  gasUsed: string;
  gasLimit: string;
  baseFeePerGas: string;
  transactions: string[];
  size: string;
  difficulty: string;
}

export default function BlockMonitor() {
  const [currentBlock, setCurrentBlock] = useState<BlockData | null>(null);
  const [gasPrice, setGasPrice] = useState<string>("0");

  // Fetch latest block data
  const { data: blockData, isLoading } = useQuery({
    queryKey: ['latest-block'],
    queryFn: async () => {
      const response = await fetch('/api/ethereum/latest-block');
      if (!response.ok) throw new Error('Failed to fetch block data');
      return response.json();
    },
    refetchInterval: 12000, // Refresh every 12 seconds (average block time)
  });

  // Fetch current gas price
  const { data: gasPriceData } = useQuery({
    queryKey: ['gas-price'],
    queryFn: async () => {
      const response = await fetch('/api/ethereum/gas-price');
      if (!response.ok) throw new Error('Failed to fetch gas price');
      return response.json();
    },
    refetchInterval: 15000,
  });

  useEffect(() => {
    if (blockData) {
      setCurrentBlock(blockData);
    }
    if (gasPriceData) {
      setGasPrice(gasPriceData.gasPrice);
    }
  }, [blockData, gasPriceData]);

  const formatGwei = (wei: string) => {
    return (parseInt(wei, 16) / 1e9).toFixed(2);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 16) * 1000);
    return date.toLocaleTimeString();
  };

  const getGasRecommendation = (baseFee: string) => {
    const gwei = parseFloat(formatGwei(baseFee));
    if (gwei < 5) return { status: 'optimal', message: 'Excellent time for transactions', color: 'green' };
    if (gwei < 15) return { status: 'good', message: 'Good conditions', color: 'blue' };
    if (gwei < 30) return { status: 'moderate', message: 'Moderate fees', color: 'yellow' };
    return { status: 'high', message: 'High fees - consider waiting', color: 'red' };
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 animate-pulse" />
            Block Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Loading block data...</div>
        </CardContent>
      </Card>
    );
  }

  const gasRecommendation = currentBlock ? getGasRecommendation(currentBlock.baseFeePerGas) : null;

  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Ethereum Block Monitor
        </CardTitle>
        <CardDescription>
          Real-time network conditions for optimal transaction timing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentBlock && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  #{parseInt(currentBlock.number, 16).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Latest Block</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {formatGwei(currentBlock.baseFeePerGas)}
                </div>
                <div className="text-sm text-muted-foreground">Base Fee (Gwei)</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {currentBlock.transactions.length}
                </div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {((parseInt(currentBlock.gasUsed, 16) / parseInt(currentBlock.gasLimit, 16)) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Gas Usage</div>
              </div>
            </div>

            {gasRecommendation && (
              <div className={`p-4 rounded-lg border ${
                gasRecommendation.color === 'green' ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' :
                gasRecommendation.color === 'blue' ? 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800' :
                gasRecommendation.color === 'yellow' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800' :
                'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-2">
                  {gasRecommendation.status === 'optimal' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : gasRecommendation.status === 'high' ? (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  ) : (
                    <Fuel className="h-5 w-5 text-blue-600" />
                  )}
                  <span className="font-medium">{gasRecommendation.message}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Time: {formatTimestamp(currentBlock.timestamp)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Size: {(parseInt(currentBlock.size, 16) / 1024).toFixed(1)} KB</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Gas Limit: {(parseInt(currentBlock.gasLimit, 16) / 1e6).toFixed(1)}M</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Block Hash: <code className="text-xs">{currentBlock.number}</code>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`https://etherscan.io/block/${parseInt(currentBlock.number, 16)}`, '_blank')}
                  >
                    View on Etherscan
                  </Button>
                  
                  {gasRecommendation?.status === 'optimal' && (
                    <Button 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.location.href = '/instant-value-realization'}
                    >
                      Execute ETHG Operations
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
