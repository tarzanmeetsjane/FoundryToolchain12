import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUpDown, Info, Zap, Shield, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChainOption {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  chainId: number;
}

interface TokenOption {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
}

const SUPPORTED_CHAINS: ChainOption[] = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "⟠", chainId: 1 },
  { id: "bsc", name: "BNB Chain", symbol: "BNB", icon: "⟡", chainId: 56 },
  { id: "polygon", name: "Polygon", symbol: "MATIC", icon: "⬟", chainId: 137 },
  { id: "arbitrum", name: "Arbitrum", symbol: "ARB", icon: "◆", chainId: 42161 },
  { id: "optimism", name: "Optimism", symbol: "OP", icon: "●", chainId: 10 },
  { id: "avalanche", name: "Avalanche", symbol: "AVAX", icon: "▲", chainId: 43114 }
];

const POPULAR_TOKENS: Record<string, TokenOption[]> = {
  ethereum: [
    { address: "0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f", symbol: "USDC", name: "USD Coin", decimals: 6, logoURI: "" },
    { address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", symbol: "USDT", name: "Tether USD", decimals: 6, logoURI: "" },
    { address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", symbol: "WETH", name: "Wrapped Ether", decimals: 18, logoURI: "" }
  ],
  bsc: [
    { address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", symbol: "USDC", name: "USD Coin", decimals: 18, logoURI: "" },
    { address: "0x55d398326f99059fF775485246999027B3197955", symbol: "USDT", name: "Tether USD", decimals: 18, logoURI: "" },
    { address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", symbol: "WBNB", name: "Wrapped BNB", decimals: 18, logoURI: "" }
  ],
  polygon: [
    { address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", symbol: "USDC", name: "USD Coin", decimals: 6, logoURI: "" },
    { address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", symbol: "USDT", name: "Tether USD", decimals: 6, logoURI: "" },
    { address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", symbol: "WMATIC", name: "Wrapped Matic", decimals: 18, logoURI: "" }
  ]
};

export function CrossChainSwap() {
  const [fromChain, setFromChain] = useState<string>("ethereum");
  const [toChain, setToChain] = useState<string>("bsc");
  const [fromToken, setFromToken] = useState<string>("USDC");
  const [toToken, setToToken] = useState<string>("USDT");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [swapQuote, setSwapQuote] = useState<any>(null);
  const [slippage, setSlippage] = useState<string>("0.5");
  
  const { toast } = useToast();

  const getSwapQuote = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    
    setIsLoading(true);
    try {
      // Simulate Symbiosis API call for quote
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockQuote = {
        fromAmount: fromAmount,
        toAmount: (parseFloat(fromAmount) * 0.998).toFixed(6), // 0.2% fee simulation
        route: [fromChain, toChain],
        estimatedTime: "2-5 minutes",
        fees: {
          networkFee: "$2.50",
          protocolFee: "0.1%",
          totalFeeUSD: "$4.20"
        },
        priceImpact: "0.05%",
        guaranteedRefund: true
      };
      
      setSwapQuote(mockQuote);
      setToAmount(mockQuote.toAmount);
    } catch (error) {
      toast({
        title: "Quote Error",
        description: "Failed to get swap quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const executeSwap = async () => {
    if (!swapQuote) return;
    
    setIsLoading(true);
    try {
      // Simulate cross-chain swap execution
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Swap Initiated",
        description: `Cross-chain swap from ${fromToken} on ${fromChain} to ${toToken} on ${toChain} has been initiated.`,
      });
      
      // Reset form
      setFromAmount("");
      setToAmount("");
      setSwapQuote(null);
    } catch (error) {
      toast({
        title: "Swap Failed",
        description: "Failed to execute cross-chain swap. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const swapChains = () => {
    const tempChain = fromChain;
    setFromChain(toChain);
    setToChain(tempChain);
    
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
  };

  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      const timeoutId = setTimeout(getSwapQuote, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [fromAmount, fromChain, toChain, fromToken, toToken]);

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            <CardTitle>Cross-Chain Swap</CardTitle>
          </div>
          <CardDescription>
            Swap tokens across different blockchains in a single transaction using Symbiosis Finance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* From Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">From</label>
              <Badge variant="outline" className="text-xs">
                Balance: 1,250.50 {fromToken}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Select value={fromChain} onValueChange={setFromChain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      <div className="flex items-center gap-2">
                        <span>{chain.icon}</span>
                        <span>{chain.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_TOKENS[fromChain]?.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="text-right"
              />
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapChains}
              className="rounded-full"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* To Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">To</label>
              <Badge variant="outline" className="text-xs">
                Balance: 890.25 {toToken}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Select value={toChain} onValueChange={setToChain}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      <div className="flex items-center gap-2">
                        <span>{chain.icon}</span>
                        <span>{chain.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_TOKENS[toChain]?.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="text-right bg-gray-50 dark:bg-gray-900"
              />
            </div>
          </div>

          {/* Slippage Settings */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Slippage Tolerance</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-16 text-center"
                step="0.1"
                min="0.1"
                max="5"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>

          <Separator />

          {/* Quote Information */}
          {swapQuote && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Info className="w-4 h-4" />
                Swap Details
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span>1 {fromToken} = {(parseFloat(swapQuote.toAmount) / parseFloat(swapQuote.fromAmount)).toFixed(6)} {toToken}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price Impact</span>
                  <span className="text-green-600">{swapQuote.priceImpact}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span>{swapQuote.fees.networkFee}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protocol Fee</span>
                  <span>{swapQuote.fees.protocolFee}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <div className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    <span>{swapQuote.estimatedTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-green-100 dark:bg-green-900/20 rounded text-xs">
                <Shield className="w-3 h-3 text-green-600" />
                <span className="text-green-700 dark:text-green-300">
                  Guaranteed refund in USDC if swap fails
                </span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={executeSwap}
            disabled={!swapQuote || isLoading || !fromAmount}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              "Processing..."
            ) : swapQuote ? (
              `Swap ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`
            ) : (
              "Enter amount to get quote"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Cross-Chain Swaps?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <Zap className="w-8 h-8 mx-auto text-blue-500" />
              <h3 className="font-medium">One-Click Swaps</h3>
              <p className="text-sm text-muted-foreground">
                Swap across chains in a single transaction
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <Shield className="w-8 h-8 mx-auto text-green-500" />
              <h3 className="font-medium">Guaranteed Refunds</h3>
              <p className="text-sm text-muted-foreground">
                Get USDC refund if your swap fails
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <Timer className="w-8 h-8 mx-auto text-orange-500" />
              <h3 className="font-medium">Fast Execution</h3>
              <p className="text-sm text-muted-foreground">
                Complete swaps in 2-5 minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}