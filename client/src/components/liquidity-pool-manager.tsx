import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  Plus, 
  Minus, 
  DollarSign, 
  TrendingUp, 
  Droplets,
  Gift,
  Clock,
  ArrowUpDown,
  ExternalLink,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddressValidator } from "@/lib/address-validator";

interface LiquidityPosition {
  poolAddress: string;
  tokenA: {
    symbol: string;
    address: string;
    amount: string;
    decimals: number;
  };
  tokenB: {
    symbol: string;
    address: string;
    amount: string;
    decimals: number;
  };
  lpTokenBalance: string;
  poolShare: string;
  value: string;
  rewards: {
    pending: string;
    claimed: string;
    apr: string;
  };
  status: 'active' | 'inactive';
}

interface ClaimableReward {
  poolAddress: string;
  rewardToken: string;
  amount: string;
  value: string;
  lastClaim: string;
}

export default function LiquidityPoolManager() {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedPool, setSelectedPool] = useState("");
  const [addAmount1, setAddAmount1] = useState("");
  const [addAmount2, setAddAmount2] = useState("");
  const [removePercentage, setRemovePercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Demo liquidity positions - in production, fetch from blockchain
  const liquidityPositions: LiquidityPosition[] = [
    {
      poolAddress: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
      tokenA: { symbol: "USDC", address: "0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f", amount: "5000.00", decimals: 6 },
      tokenB: { symbol: "ETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", amount: "1.9123", decimals: 18 },
      lpTokenBalance: "98.567",
      poolShare: "0.0234",
      value: "$13,077.50",
      rewards: { pending: "25.67", claimed: "156.33", apr: "12.4" },
      status: 'active'
    },
    {
      poolAddress: "0x5777d92f208679db4b9778590fa3cab3ac9e2168",
      tokenA: { symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", amount: "2500.00", decimals: 18 },
      tokenB: { symbol: "USDC", address: "0xA0b86a33E6441b8435b662c1f8e7b3A8F9C9BF0f", amount: "2500.00", decimals: 6 },
      lpTokenBalance: "156.789",
      poolShare: "0.0156",
      value: "$5,000.00",
      rewards: { pending: "8.92", claimed: "45.21", apr: "8.7" },
      status: 'active'
    }
  ];

  const claimableRewards: ClaimableReward[] = [
    {
      poolAddress: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
      rewardToken: "UNI",
      amount: "25.67",
      value: "$216.14",
      lastClaim: "2024-01-10"
    },
    {
      poolAddress: "0x5777d92f208679db4b9778590fa3cab3ac9e2168",
      rewardToken: "COMP",
      amount: "8.92",
      value: "$534.23",
      lastClaim: "2024-01-08"
    }
  ];

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Web3 wallet",
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
        description: `Connected to ${accounts[0].slice(0, 8)}...${accounts[0].slice(-6)}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddLiquidity = async () => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // In production: interact with smart contracts
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Liquidity Added",
        description: `Added ${addAmount1} USDC and ${addAmount2} ETH to pool`,
      });
      
      setAddAmount1("");
      setAddAmount2("");
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to add liquidity",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLiquidity = async (position: LiquidityPosition) => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // In production: interact with smart contracts
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Liquidity Removed",
        description: `Removed ${removePercentage}% of liquidity from ${position.tokenA.symbol}/${position.tokenB.symbol} pool`,
      });
      
      setRemovePercentage(0);
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to remove liquidity",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimRewards = async (reward: ClaimableReward) => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // In production: interact with smart contracts
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Rewards Claimed",
        description: `Claimed ${reward.amount} ${reward.rewardToken} tokens (${reward.value})`,
      });
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Failed to claim rewards",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimAllRewards = async () => {
    if (!walletAddress) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // In production: batch claim all rewards
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const totalValue = claimableRewards.reduce((sum, reward) => 
        sum + parseFloat(reward.value.replace('$', '')), 0
      );
      
      toast({
        title: "All Rewards Claimed",
        description: `Claimed rewards worth $${totalValue.toFixed(2)}`,
      });
    } catch (error) {
      toast({
        title: "Batch Claim Failed",
        description: "Failed to claim all rewards",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPortfolioValue = liquidityPositions.reduce((sum, pos) => 
    sum + parseFloat(pos.value.replace('$', '').replace(',', '')), 0
  );

  const totalPendingRewards = claimableRewards.reduce((sum, reward) => 
    sum + parseFloat(reward.value.replace('$', '')), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Liquidity Pool Manager</h1>
        </div>
        
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

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
            </div>
            <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-muted-foreground">Pending Rewards</span>
            </div>
            <div className="text-2xl font-bold">${totalPendingRewards.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-muted-foreground">Active Positions</span>
            </div>
            <div className="text-2xl font-bold">{liquidityPositions.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="positions">My Positions</TabsTrigger>
          <TabsTrigger value="add">Add Liquidity</TabsTrigger>
          <TabsTrigger value="rewards">Claim Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <CardTitle>Your Liquidity Positions</CardTitle>
              <CardDescription>
                Manage your active liquidity pool positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liquidityPositions.map((position) => (
                  <Card key={position.poolAddress} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {position.tokenA.symbol.charAt(0)}
                            </div>
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {position.tokenB.symbol.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold">{position.tokenA.symbol}/{position.tokenB.symbol}</h3>
                            <p className="text-sm text-muted-foreground">
                              Pool Share: {position.poolShare}%
                            </p>
                          </div>
                        </div>
                        <Badge variant={position.status === 'active' ? 'default' : 'secondary'}>
                          {position.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Position Value</div>
                          <div className="font-semibold">{position.value}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">LP Tokens</div>
                          <div className="font-semibold">{position.lpTokenBalance}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Pending Rewards</div>
                          <div className="font-semibold">{position.rewards.pending} UNI</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">APR</div>
                          <div className="font-semibold text-green-600">{position.rewards.apr}%</div>
                        </div>
                      </div>

                      <Separator className="mb-4" />

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">{position.tokenA.symbol} Amount</div>
                          <div className="font-medium">{position.tokenA.amount}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{position.tokenB.symbol} Amount</div>
                          <div className="font-medium">{position.tokenB.amount}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label>Remove Liquidity: {removePercentage}%</Label>
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={removePercentage}
                              onChange={(e) => setRemovePercentage(parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-sm w-12">{removePercentage}%</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveLiquidity(position)}
                            disabled={loading || removePercentage === 0}
                          >
                            <Minus className="h-3 w-3 mr-1" />
                            Remove Liquidity
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View on Explorer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Liquidity</CardTitle>
              <CardDescription>
                Provide liquidity to earn trading fees and rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="token1-amount">First Token Amount</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="token1-amount"
                      placeholder="0.0"
                      value={addAmount1}
                      onChange={(e) => setAddAmount1(e.target.value)}
                    />
                    <Select defaultValue="USDC">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="DAI">DAI</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                </div>

                <div>
                  <Label htmlFor="token2-amount">Second Token Amount</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="token2-amount"
                      placeholder="0.0"
                      value={addAmount2}
                      onChange={(e) => setAddAmount2(e.target.value)}
                    />
                    <Select defaultValue="ETH">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="WETH">WETH</SelectItem>
                        <SelectItem value="BTC">BTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Smart Contract Integration Required</span>
                  </div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                    To enable actual liquidity management, this requires integration with DEX smart contracts (Uniswap, SushiSwap, etc.). 
                    The interface is ready - just needs contract addresses and Web3 provider setup.
                  </p>
                </CardContent>
              </Card>

              <Button 
                onClick={handleAddLiquidity} 
                disabled={loading || !addAmount1 || !addAmount2}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "Adding Liquidity..." : "Add Liquidity"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Claimable Rewards</CardTitle>
                  <CardDescription>
                    Claim your earned liquidity mining rewards
                  </CardDescription>
                </div>
                <Button onClick={handleClaimAllRewards} disabled={loading || claimableRewards.length === 0}>
                  <Gift className="h-4 w-4 mr-2" />
                  {loading ? "Claiming..." : "Claim All"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimableRewards.map((reward) => (
                  <Card key={reward.poolAddress} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                            {reward.rewardToken}
                          </div>
                          <div>
                            <h3 className="font-semibold">{reward.rewardToken} Rewards</h3>
                            <p className="text-sm text-muted-foreground">
                              Last claimed: {reward.lastClaim}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">{reward.amount} {reward.rewardToken}</div>
                          <div className="text-sm text-green-600">{reward.value}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          onClick={() => handleClaimRewards(reward)}
                          disabled={loading}
                          className="flex-1"
                        >
                          <Gift className="h-3 w-3 mr-1" />
                          {loading ? "Claiming..." : "Claim Rewards"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Clock className="h-3 w-3 mr-1" />
                          History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {claimableRewards.length === 0 && (
                  <div className="text-center p-8 text-muted-foreground">
                    No rewards available to claim
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}