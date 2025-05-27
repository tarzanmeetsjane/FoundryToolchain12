import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import DexPlatformSelector from "@/components/dex-platform-selector";
import type { PoolStats } from "@shared/schema";

interface SearchControlsProps {
  selectedPool: string;
  selectedDex: string;
  selectedChain: number;
  onPoolChange: (pool: string) => void;
  onDexChange: (dex: string, chainId: number) => void;
}

export default function SearchControls({ selectedPool, onPoolChange }: SearchControlsProps) {
  const [poolAddress, setPoolAddress] = useState(selectedPool);
  const [fromBlock, setFromBlock] = useState("22057075");
  const [toBlock, setToBlock] = useState("22057085");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: poolStats } = useQuery<PoolStats>({
    queryKey: [`/api/pools/${selectedPool}/stats`],
    enabled: !!selectedPool,
  });

  const fetchSwapsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/pools/${poolAddress}/fetch-swaps`, {
        fromBlock: parseInt(fromBlock),
        toBlock: parseInt(toBlock),
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
      });
      onPoolChange(poolAddress);
      queryClient.invalidateQueries({ queryKey: ["/api/pools"] });
      queryClient.invalidateQueries({ queryKey: ["/api/swaps"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch swap events",
        variant: "destructive",
      });
    },
  });

  const handleSearch = () => {
    if (!poolAddress || !fromBlock || !toBlock) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (parseInt(fromBlock) >= parseInt(toBlock)) {
      toast({
        title: "Validation Error", 
        description: "From block must be less than to block",
        variant: "destructive",
      });
      return;
    }

    fetchSwapsMutation.mutate();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Token Pair Search */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="text-primary mr-2 h-5 w-5" />
            Token Pair Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="poolAddress" className="text-sm font-medium text-muted-foreground">
                Pool Address
              </Label>
              <Input
                id="poolAddress"
                type="text"
                placeholder="0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"
                value={poolAddress}
                onChange={(e) => setPoolAddress(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Block Range
              </Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  type="number"
                  placeholder="From block"
                  value={fromBlock}
                  onChange={(e) => setFromBlock(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="To block"
                  value={toBlock}
                  onChange={(e) => setToBlock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button
            onClick={handleSearch}
            disabled={fetchSwapsMutation.isPending}
            className="mt-4 bg-primary hover:bg-primary/80 text-primary-foreground"
          >
            {fetchSwapsMutation.isPending ? (
              <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="mr-2 h-4 w-4" />
            )}
            Track Swaps
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Pool Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Volume</span>
              <span className="font-semibold">
                {poolStats ? `$${parseFloat(poolStats.totalVolume).toLocaleString()}` : "--"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">24h Trades</span>
              <span className="font-semibold">
                {poolStats ? poolStats.dailyTrades.toLocaleString() : "--"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Price</span>
              <span className="font-semibold success">
                {poolStats && parseFloat(poolStats.currentPrice) > 0 
                  ? `$${parseFloat(poolStats.currentPrice).toLocaleString()}` 
                  : "--"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
