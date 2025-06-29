import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAccount, useChainId } from "wagmi";
import { useCreateV3Position, useTokenApproval, useTokenBalance, priceToTick } from "@/lib/uniswap-v3-hooks";
import { COMMON_TOKENS, UNISWAP_V3_ADDRESSES } from "@/lib/wagmi-config";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { formatUnits, parseUnits } from "viem";

interface TokenConfig {
  address: string;
  symbol: string;
  decimals: number;
}

const FEE_TIERS = [
  { value: 500, label: "0.05%", description: "Best for stable pairs" },
  { value: 3000, label: "0.3%", description: "Best for most pairs" },
  { value: 10000, label: "1%", description: "Best for volatile pairs" }
];

export default function V3PositionCreator() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { toast } = useToast();
  
  const [token0, setToken0] = useState<TokenConfig | null>(null);
  const [token1, setToken1] = useState<TokenConfig | null>(null);
  const [feeTier, setFeeTier] = useState<number>(3000);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [slippage, setSlippage] = useState([1]);
  const [isCreating, setIsCreating] = useState(false);

  const { createPosition, isPending: isCreatingPosition } = useCreateV3Position();
  
  // Token balances
  const token0Balance = useTokenBalance(token0?.address || "");
  const token1Balance = useTokenBalance(token1?.address || "");
  
  // Token approvals
  const positionManagerAddress = chainId && UNISWAP_V3_ADDRESSES[chainId as keyof typeof UNISWAP_V3_ADDRESSES]?.positionManager;
  const token0Approval = useTokenApproval(token0?.address || "", positionManagerAddress || "");
  const token1Approval = useTokenApproval(token1?.address || "", positionManagerAddress || "");

  // Get available tokens for current chain
  const getAvailableTokens = (): TokenConfig[] => {
    if (!chainId || !COMMON_TOKENS[chainId as keyof typeof COMMON_TOKENS]) return [];
    
    const tokens = COMMON_TOKENS[chainId as keyof typeof COMMON_TOKENS];
    return Object.entries(tokens).map(([symbol, address]) => ({
      address,
      symbol,
      decimals: 18 // Default to 18, would need to fetch actual decimals in production
    }));
  };

  const availableTokens = getAvailableTokens();

  const handleCreatePosition = async () => {
    if (!token0 || !token1 || !amount0 || !amount1 || !minPrice || !maxPrice) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsCreating(true);

      // Calculate ticks from price range
      const tickLower = priceToTick(parseFloat(minPrice), token0.decimals, token1.decimals);
      const tickUpper = priceToTick(parseFloat(maxPrice), token0.decimals, token1.decimals);

      // Ensure tick spacing is correct for fee tier
      const tickSpacing = feeTier === 500 ? 10 : feeTier === 3000 ? 60 : 200;
      const adjustedTickLower = Math.floor(tickLower / tickSpacing) * tickSpacing;
      const adjustedTickUpper = Math.ceil(tickUpper / tickSpacing) * tickSpacing;

      await createPosition({
        token0Address: token0.address,
        token1Address: token1.address,
        fee: feeTier,
        amount0,
        amount1,
        tickLower: adjustedTickLower,
        tickUpper: adjustedTickUpper,
        slippageTolerance: slippage[0]
      });

    } catch (error) {
      console.error("Position creation failed:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const needsApproval = (tokenAddress: string, amount: string, allowance: bigint | undefined) => {
    if (!allowance || !amount) return false;
    try {
      const amountBigInt = parseUnits(amount, 18);
      return allowance < amountBigInt;
    } catch {
      return false;
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to create Uniswap V3 positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Please connect your wallet to continue</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!chainId || !UNISWAP_V3_ADDRESSES[chainId as keyof typeof UNISWAP_V3_ADDRESSES]) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unsupported Network</CardTitle>
          <CardDescription>
            Uniswap V3 is not available on this network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Please switch to a supported network</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Uniswap V3 Position</CardTitle>
          <CardDescription>
            Provide concentrated liquidity to earn trading fees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Token A</Label>
              <Select onValueChange={(value) => {
                const token = availableTokens.find(t => t.address === value);
                setToken0(token || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select token A" />
                </SelectTrigger>
                <SelectContent>
                  {availableTokens.map((token) => (
                    <SelectItem key={token.address} value={token.address}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {token0 && (
                <p className="text-sm text-muted-foreground">
                  Balance: {token0Balance.formattedBalance} {token0.symbol}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Token B</Label>
              <Select onValueChange={(value) => {
                const token = availableTokens.find(t => t.address === value);
                setToken1(token || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select token B" />
                </SelectTrigger>
                <SelectContent>
                  {availableTokens.map((token) => (
                    <SelectItem key={token.address} value={token.address}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {token1 && (
                <p className="text-sm text-muted-foreground">
                  Balance: {token1Balance.formattedBalance} {token1.symbol}
                </p>
              )}
            </div>
          </div>

          {/* Fee Tier Selection */}
          <div className="space-y-2">
            <Label>Fee Tier</Label>
            <Select value={feeTier.toString()} onValueChange={(value) => setFeeTier(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FEE_TIERS.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value.toString()}>
                    <div className="flex flex-col">
                      <span>{tier.label}</span>
                      <span className="text-xs text-muted-foreground">{tier.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount {token0?.symbol || "A"}</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Amount {token1?.symbol || "B"}</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Price ({token1?.symbol || "B"} per {token0?.symbol || "A"})</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Price ({token1?.symbol || "B"} per {token0?.symbol || "A"})</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Slippage Tolerance */}
          <div className="space-y-2">
            <Label>Slippage Tolerance: {slippage[0]}%</Label>
            <Slider
              value={slippage}
              onValueChange={setSlippage}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Token Approvals */}
          {token0 && amount0 && needsApproval(token0.address, amount0, token0Approval.allowance) && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Approve {token0.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      Allow the position manager to spend your {token0.symbol}
                    </p>
                  </div>
                  <Button
                    onClick={() => token0Approval.approveMax()}
                    disabled={token0Approval.isPending}
                    size="sm"
                  >
                    {token0Approval.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {token1 && amount1 && needsApproval(token1.address, amount1, token1Approval.allowance) && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Approve {token1.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      Allow the position manager to spend your {token1.symbol}
                    </p>
                  </div>
                  <Button
                    onClick={() => token1Approval.approveMax()}
                    disabled={token1Approval.isPending}
                    size="sm"
                  >
                    {token1Approval.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create Position Button */}
          <Button
            onClick={handleCreatePosition}
            disabled={
              isCreating || 
              isCreatingPosition ||
              !token0 || 
              !token1 || 
              !amount0 || 
              !amount1 || 
              !minPrice || 
              !maxPrice ||
              needsApproval(token0?.address || "", amount0, token0Approval.allowance) ||
              needsApproval(token1?.address || "", amount1, token1Approval.allowance)
            }
            className="w-full"
            size="lg"
          >
            {(isCreating || isCreatingPosition) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Create Position
          </Button>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Position creation requires ETH for gas fees</p>
            <p>• Concentrated liquidity positions require active management</p>
            <p>• You will receive an NFT representing your position</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}