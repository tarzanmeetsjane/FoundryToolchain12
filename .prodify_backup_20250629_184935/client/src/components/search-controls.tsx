import { useState } from "react";
import { Search, RotateCcw, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import DexPlatformSelector from "@/components/dex-platform-selector";
import AddressValidator from "@/lib/address-validator";
import type { PoolStats } from "@shared/schema";

interface SearchControlsProps {
  selectedPool: string;
  selectedDex: string;
  selectedChain: number;
  onPoolChange: (pool: string) => void;
  onDexChange: (dex: string, chainId: number) => void;
}

export default function SearchControls({ 
  selectedPool, 
  selectedDex, 
  selectedChain, 
  onPoolChange, 
  onDexChange 
}: SearchControlsProps) {
  const [poolAddress, setPoolAddress] = useState(selectedPool);
  const [fromBlock, setFromBlock] = useState("22057075");
  const [toBlock, setToBlock] = useState("22057085");
  const [addressValidation, setAddressValidation] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Validate address in real-time
  const validatePoolAddress = (address: string) => {
    if (address.length < 10) {
      setAddressValidation(null);
      return;
    }
    
    const validation = AddressValidator.validateAddress(address, selectedChain);
    const protocol = AddressValidator.identifyProtocol(address);
    
    setAddressValidation({
      ...validation,
      protocol: protocol !== 'Unknown Protocol' ? protocol : null
    });
  };

  const { data: poolStats } = useQuery<PoolStats>({
    queryKey: [`/api/pools/${selectedPool}/stats`, { dex: selectedDex, chainId: selectedChain }],
    enabled: false, // Disable to prevent automatic requests
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const fetchSwapsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/pools/${poolAddress}/fetch-swaps`, {
        fromBlock: parseInt(fromBlock),
        toBlock: parseInt(toBlock),
        dexPlatform: selectedDex,
        chainId: selectedChain,
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* DEX Platform Selector */}
      <DexPlatformSelector
        selectedPlatform={selectedDex}
        selectedChain={selectedChain}
        onPlatformChange={onDexChange}
      />

      {/* Token Pair Search */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="text-primary mr-2 h-5 w-5" />
            Multi-DEX Token Pair Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="poolAddress" className="text-sm font-medium text-muted-foreground">
                Pool Address
              </Label>
              <div className="mt-2 space-y-2">
                <Input
                  id="poolAddress"
                  type="text"
                  placeholder="0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"
                  value={poolAddress}
                  onChange={(e) => {
                    setPoolAddress(e.target.value);
                    validatePoolAddress(e.target.value);
                  }}
                  className={`${
                    addressValidation?.isValid === false 
                      ? 'border-red-500 focus:border-red-500' 
                      : addressValidation?.isValid === true 
                      ? 'border-green-500 focus:border-green-500' 
                      : ''
                  }`}
                />
                
                {addressValidation && (
                  <div className="space-y-2">
                    {/* Validation Status */}
                    <div className="flex items-center space-x-2">
                      {addressValidation.isValid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <Badge 
                        variant={addressValidation.isValid ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {addressValidation.type.toUpperCase()}
                      </Badge>
                      {addressValidation.confidence && (
                        <Badge variant="secondary" className="text-xs">
                          {addressValidation.confidence}% confidence
                        </Badge>
                      )}
                    </div>

                    {/* Protocol Detection */}
                    {addressValidation.protocol && (
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          Detected: {addressValidation.protocol}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Warnings */}
                    {addressValidation.warnings?.length > 0 && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {addressValidation.warnings.join(', ')}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
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
