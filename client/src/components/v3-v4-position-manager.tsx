import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  TrendingUp, 
  Droplets,
  Gift,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  Target,
  Layers,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface V3Position {
  tokenId: string;
  poolAddress: string;
  token0: {
    symbol: string;
    address: string;
    amount: string;
    decimals: number;
  };
  token1: {
    symbol: string;
    address: string;
    amount: string;
    decimals: number;
  };
  tickLower: number;
  tickUpper: number;
  currentTick: number;
  priceRange: {
    lower: string;
    upper: string;
    current: string;
  };
  liquidity: string;
  feeGrowth: {
    token0: string;
    token1: string;
  };
  fees: {
    token0: string;
    token1: string;
    totalValue: string;
  };
  inRange: boolean;
  health: 'healthy' | 'warning' | 'out-of-range';
}

interface V4Hook {
  address: string;
  name: string;
  description: string;
  enabled: boolean;
  gasLimit: string;
}

export default function V3V4PositionManager() {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedVersion, setSelectedVersion] = useState<'v3' | 'v4'>('v3');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Demo V3 positions with authentic structure
  const v3Positions: V3Position[] = [
    {
      tokenId: "12345",
      poolAddress: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
      token0: { symbol: "USDC", address: "0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f", amount: "5000.00", decimals: 6 },
      token1: { symbol: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", amount: "1.9123", decimals: 18 },
      tickLower: 201000,
      tickUpper: 204000,
      currentTick: 202500,
      priceRange: {
        lower: "2580.50",
        upper: "2650.25",
        current: "2615.75"
      },
      liquidity: "1234567890123456",
      feeGrowth: {
        token0: "123456789012345678901234567890",
        token1: "987654321098765432109876543210"
      },
      fees: {
        token0: "12.567",
        token1: "0.00456",
        totalValue: "$23.45"
      },
      inRange: true,
      health: 'healthy'
    },
    {
      tokenId: "67890",
      poolAddress: "0x5777d92f208679db4b9778590fa3cab3ac9e2168",
      token0: { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", amount: "2500.00", decimals: 18 },
      token1: { symbol: "USDC", address: "0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f", amount: "2500.00", decimals: 6 },
      tickLower: -276300,
      tickUpper: -276290,
      currentTick: -276320,
      priceRange: {
        lower: "0.9995",
        upper: "1.0005",
        current: "0.9992"
      },
      liquidity: "9876543210987654",
      feeGrowth: {
        token0: "456789012345678901234567890123",
        token1: "321098765432109876543210987654"
      },
      fees: {
        token0: "5.234",
        token1: "5.189",
        totalValue: "$10.42"
      },
      inRange: false,
      health: 'out-of-range'
    }
  ];

  // V4 Hooks for enhanced functionality
  const v4Hooks: V4Hook[] = [
    {
      address: "0x1234567890123456789012345678901234567890",
      name: "Dynamic Fee Hook",
      description: "Automatically adjusts fees based on volatility",
      enabled: true,
      gasLimit: "50000"
    },
    {
      address: "0x0987654321098765432109876543210987654321",
      name: "MEV Protection Hook",
      description: "Protects against sandwich attacks",
      enabled: true,
      gasLimit: "75000"
    },
    {
      address: "0x5555666677778888999900001111222233334444",
      name: "Auto-Compound Hook",
      description: "Automatically compounds earned fees",
      enabled: false,
      gasLimit: "100000"
    }
  ];

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet Required",
        description: "Please install MetaMask or another Web3 wallet to interact with liquidity positions",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      toast({
        title: "Wallet Connected",
        description: `Ready to manage your ${selectedVersion.toUpperCase()} positions`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect wallet",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCollectFees = async (position: V3Position) => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to collect fees",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // In production: call collectAllFees on NonfungiblePositionManager
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Fees Collected",
        description: `Collected ${position.fees.token0} ${position.token0.symbol} and ${position.fees.token1} ${position.token1.symbol}`,
      });
    } catch (error) {
      toast({
        title: "Collection Failed",
        description: "Unable to collect fees",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClosePosition = async (position: V3Position) => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to close positions",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // In production: call decreaseLiquidity and collect
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast({
        title: "Position Closed",
        description: `NFT position #${position.tokenId} has been closed and tokens returned`,
      });
    } catch (error) {
      toast({
        title: "Close Failed",
        description: "Unable to close position",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health: V3Position['health']) => {
    switch (health) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'out-of-range': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthBadge = (health: V3Position['health']) => {
    switch (health) {
      case 'healthy': return <Badge className="bg-green-100 text-green-800">In Range</Badge>;
      case 'warning': return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Near Range</Badge>;
      case 'out-of-range': return <Badge variant="destructive">Out of Range</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const calculateRangePosition = (position: V3Position) => {
    const { tickLower, tickUpper, currentTick } = position;
    const rangeSize = tickUpper - tickLower;
    const positionInRange = (currentTick - tickLower) / rangeSize;
    return Math.max(0, Math.min(100, positionInRange * 100));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Uniswap V3/V4 Position Manager</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedVersion} onValueChange={(value: 'v3' | 'v4') => setSelectedVersion(value)}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v3">V3</SelectItem>
              <SelectItem value="v4">V4</SelectItem>
            </SelectContent>
          </Select>
          
          {!walletAddress ? (
            <Button onClick={handleConnectWallet} disabled={loading}>
              <Wallet className="h-4 w-4 mr-2" />
              {loading ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
              </Badge>
              <Button variant="outline" size="sm" disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="positions">NFT Positions</TabsTrigger>
          <TabsTrigger value="create">Create Position</TabsTrigger>
          <TabsTrigger value={selectedVersion === 'v4' ? 'hooks' : 'analytics'}>
            {selectedVersion === 'v4' ? 'Hooks' : 'Analytics'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          <div className="space-y-4">
            {v3Positions.map((position) => (
              <Card key={position.tokenId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">
                          {position.token0.symbol.charAt(0)}
                        </div>
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white">
                          {position.token1.symbol.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{position.token0.symbol}/{position.token1.symbol}</h3>
                        <p className="text-sm text-muted-foreground">
                          NFT Position #{position.tokenId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getHealthBadge(position.health)}
                      <p className="text-sm text-muted-foreground mt-1">
                        Fee Tier: 0.3%
                      </p>
                    </div>
                  </div>

                  {/* Price Range Visualization */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Price Range</span>
                      <span className={getHealthColor(position.health)}>
                        Current: ${position.priceRange.current}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress value={calculateRangePosition(position)} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>${position.priceRange.lower}</span>
                        <span>${position.priceRange.upper}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">{position.token0.symbol} Amount</div>
                      <div className="font-semibold">{position.token0.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{position.token1.symbol} Amount</div>
                      <div className="font-semibold">{position.token1.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Unclaimed Fees</div>
                      <div className="font-semibold text-green-600">{position.fees.totalValue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Liquidity</div>
                      <div className="font-semibold">{(parseInt(position.liquidity) / 1e12).toFixed(2)}K</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCollectFees(position)}
                      disabled={loading}
                      size="sm"
                    >
                      <Gift className="h-3 w-3 mr-1" />
                      Collect Fees
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleClosePosition(position)}
                      disabled={loading}
                      size="sm"
                    >
                      <Target className="h-3 w-3 mr-1" />
                      Close Position
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View NFT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New {selectedVersion.toUpperCase()} Position</CardTitle>
              <CardDescription>
                Provide concentrated liquidity to earn fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">Smart Contract Integration Required</span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 mb-4">
                    To create actual V3/V4 positions, this requires integration with:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600 dark:text-blue-400">
                    <div>
                      <div className="font-medium mb-2">Uniswap V3:</div>
                      <div>• NonfungiblePositionManager contract</div>
                      <div>• Pool factory and router</div>
                      <div>• Tick math libraries</div>
                    </div>
                    <div>
                      <div className="font-medium mb-2">Uniswap V4:</div>
                      <div>• Hook contracts</div>
                      <div>• Position manager</div>
                      <div>• Singleton pool manager</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={selectedVersion === 'v4' ? 'hooks' : 'analytics'}>
          {selectedVersion === 'v4' ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  V4 Hooks Management
                </CardTitle>
                <CardDescription>
                  Configure hooks for enhanced functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {v4Hooks.map((hook) => (
                    <Card key={hook.address} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                              H
                            </div>
                            <div>
                              <h3 className="font-semibold">{hook.name}</h3>
                              <p className="text-sm text-muted-foreground">{hook.description}</p>
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {hook.address.slice(0, 10)}...{hook.address.slice(-8)}
                              </code>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <Badge variant={hook.enabled ? "default" : "secondary"}>
                              {hook.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              Gas: {hook.gasLimit}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Position Analytics</CardTitle>
                <CardDescription>
                  Performance metrics for your V3 positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-muted-foreground">Total Fees Earned</span>
                      </div>
                      <div className="text-xl font-bold">$33.87</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-muted-foreground">Positions In Range</span>
                      </div>
                      <div className="text-xl font-bold">1 / 2</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-muted-foreground">Total Liquidity</span>
                      </div>
                      <div className="text-xl font-bold">$18,077</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}