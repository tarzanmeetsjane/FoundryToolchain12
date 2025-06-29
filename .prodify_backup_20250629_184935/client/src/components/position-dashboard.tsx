import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount, useReadContract } from "wagmi";
import { UNISWAP_V3_ADDRESSES } from "@/lib/wagmi-config";
import { formatUnits } from "viem";
import { ExternalLink, TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";

// Simplified Position Manager ABI for reading positions
const POSITION_MANAGER_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'tokenOfOwnerByIndex',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'positions',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [
      { name: 'nonce', type: 'uint96' },
      { name: 'operator', type: 'address' },
      { name: 'token0', type: 'address' },
      { name: 'token1', type: 'address' },
      { name: 'fee', type: 'uint24' },
      { name: 'tickLower', type: 'int24' },
      { name: 'tickUpper', type: 'int24' },
      { name: 'liquidity', type: 'uint128' },
      { name: 'feeGrowthInside0LastX128', type: 'uint256' },
      { name: 'feeGrowthInside1LastX128', type: 'uint256' },
      { name: 'tokensOwed0', type: 'uint128' },
      { name: 'tokensOwed1', type: 'uint128' }
    ]
  }
] as const;

interface Position {
  tokenId: string;
  token0: string;
  token1: string;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: string;
  tokensOwed0: string;
  tokensOwed1: string;
}

export default function PositionDashboard() {
  const { address, isConnected, chain } = useAccount();
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const positionManagerAddress = chain?.id && UNISWAP_V3_ADDRESSES[chain.id as keyof typeof UNISWAP_V3_ADDRESSES]?.positionManager;

  // Get number of positions owned by user
  const { data: positionCount } = useReadContract({
    address: positionManagerAddress as `0x${string}`,
    abi: POSITION_MANAGER_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!positionManagerAddress
    }
  });

  // Mock position data for demonstration (would fetch real data in production)
  const mockPositions: Position[] = [
    {
      tokenId: "123456",
      token0: "0xA0b86a33E6417d4a4A6e6D86a35F8bb8b6E7F23D", // USDC
      token1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
      fee: 3000,
      tickLower: -276320,
      tickUpper: -276300,
      liquidity: "1234567890123456",
      tokensOwed0: "1500000",
      tokensOwed1: "750000000000000000"
    },
    {
      tokenId: "789012",
      token0: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
      token1: "0xA0b86a33E6417d4a4A6e6D86a35F8bb8b6E7F23D", // USDC
      fee: 500,
      tickLower: -10,
      tickUpper: 10,
      liquidity: "9876543210987654",
      tokensOwed0: "2000000000000000000",
      tokensOwed1: "2000000"
    }
  ];

  const getTokenSymbol = (address: string): string => {
    const tokenMap: Record<string, string> = {
      "0xA0b86a33E6417d4a4A6e6D86a35F8bb8b6E7F23D": "USDC",
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": "WETH",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F": "DAI",
      "0xdAC17F958D2ee523a2206206994597C13D831ec7": "USDT"
    };
    return tokenMap[address] || "UNKNOWN";
  };

  const getFeeLabel = (fee: number): string => {
    return `${fee / 10000}%`;
  };

  const getPositionStatus = (liquidity: string): "active" | "inactive" => {
    return BigInt(liquidity) > 0 ? "active" : "inactive";
  };

  const calculatePriceRange = (tickLower: number, tickUpper: number) => {
    const priceLower = Math.pow(1.0001, tickLower);
    const priceUpper = Math.pow(1.0001, tickUpper);
    return { priceLower, priceUpper };
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Positions</CardTitle>
          <CardDescription>
            Connect your wallet to view your liquidity positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Connect wallet to view positions</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!positionManagerAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unsupported Network</CardTitle>
          <CardDescription>
            Switch to a supported network to view positions
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Liquidity Positions</CardTitle>
          <CardDescription>
            Manage your Uniswap V3 concentrated liquidity positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Total Positions</p>
              <p className="text-2xl font-bold">{mockPositions.length}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Active Positions</p>
              <p className="text-2xl font-bold text-green-600">
                {mockPositions.filter(p => getPositionStatus(p.liquidity) === "active").length}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">$12,450</p>
              <p className="text-sm text-green-600">+2.4% (24h)</p>
            </div>
          </div>

          <div className="space-y-4">
            {mockPositions.map((position) => {
              const token0Symbol = getTokenSymbol(position.token0);
              const token1Symbol = getTokenSymbol(position.token1);
              const { priceLower, priceUpper } = calculatePriceRange(position.tickLower, position.tickUpper);
              const status = getPositionStatus(position.liquidity);

              return (
                <Card key={position.tokenId} className="border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{token0Symbol}/{token1Symbol}</span>
                          <Badge variant="secondary">{getFeeLabel(position.fee)}</Badge>
                          <Badge variant={status === "active" ? "default" : "secondary"}>
                            {status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">NFT ID</p>
                        <p className="font-mono">{position.tokenId}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Price Range</p>
                        <p className="font-medium">
                          {priceLower.toFixed(6)} - {priceUpper.toFixed(6)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {token1Symbol} per {token0Symbol}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Liquidity</p>
                        <p className="font-medium">
                          {formatUnits(BigInt(position.liquidity), 18).slice(0, 8)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Unclaimed Fees</p>
                        <p className="font-medium text-green-600">
                          {formatUnits(BigInt(position.tokensOwed0), 6).slice(0, 6)} {token0Symbol}
                        </p>
                        <p className="font-medium text-green-600">
                          {formatUnits(BigInt(position.tokensOwed1), 18).slice(0, 6)} {token1Symbol}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Add Liquidity
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Remove Liquidity
                      </Button>
                      <Button size="sm" variant="outline">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Collect Fees
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Explorer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {mockPositions.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No liquidity positions found</p>
              <p className="text-sm text-muted-foreground">
                Create your first position to start earning fees
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}