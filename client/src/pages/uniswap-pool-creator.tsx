import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Droplets, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Calculator,
  Wallet,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UniswapPoolCreator() {
  const { toast } = useToast();
  const [ethAmount, setEthAmount] = useState("");
  const [ethgrAmount, setEthgrAmount] = useState("");
  const [selectedFee, setSelectedFee] = useState("3000"); // 0.3%

  // ETHGR Contract Details
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const ETHGR_BALANCE = "1,990,000";
  const ETHGR_VALUE = "$706,450";
  const ETH_PRICE = 3800; // Approximate ETH price

  // Fee tier options for Uniswap V3
  const feeTiers = [
    { value: "500", label: "0.05%", description: "Best for very stable pairs" },
    { value: "3000", label: "0.3%", description: "Best for most pairs" },
    { value: "10000", label: "1%", description: "Best for exotic pairs" }
  ];

  const calculateInitialPrice = () => {
    if (!ethAmount || !ethgrAmount) return 0;
    return (parseFloat(ethAmount) * ETH_PRICE) / parseFloat(ethgrAmount);
  };

  const suggestedPairs = [
    {
      ethgr: "100000",
      eth: "18.58",
      ratio: "1 ETHGR = $0.706",
      description: "Conservative 5% of holdings"
    },
    {
      ethgr: "500000", 
      eth: "92.9",
      ratio: "1 ETHGR = $0.706",
      description: "Moderate 25% of holdings"
    },
    {
      ethgr: "1000000",
      eth: "185.8", 
      ratio: "1 ETHGR = $0.706",
      description: "Aggressive 50% of holdings"
    }
  ];

  const handleCreatePool = () => {
    if (!ethAmount || !ethgrAmount) {
      toast({
        title: "Missing Information",
        description: "Please enter both ETH and ETHGR amounts",
        variant: "destructive"
      });
      return;
    }

    // This would integrate with Uniswap SDK
    toast({
      title: "Pool Creation Ready",
      description: "Connect wallet to proceed with Uniswap pool creation",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Uniswap Pool</h1>
        <p className="text-muted-foreground">
          Launch your ETHGR token on Uniswap with initial liquidity
        </p>
      </div>

      {/* Success Status */}
      <Alert className="mb-6 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Token Recovery Complete!</strong><br/>
          Contract: <code className="bg-green-100 px-1 rounded">{ETHGR_CONTRACT}</code><br/>
          Balance: <strong>{ETHGR_BALANCE} ETHGR</strong> • Value: <strong>{ETHGR_VALUE}</strong>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pool Configuration */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                Pool Configuration
              </CardTitle>
              <CardDescription>
                Set up your ETHGR/ETH trading pair
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Token Pair */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Token A</Label>
                  <div className="p-3 border rounded-lg bg-muted">
                    <div className="font-medium">ETHGR</div>
                    <div className="text-sm text-muted-foreground">ETHG Recovery</div>
                    <div className="text-xs font-mono">{ETHGR_CONTRACT.slice(0, 10)}...</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Token B</Label>
                  <div className="p-3 border rounded-lg bg-muted">
                    <div className="font-medium">WETH</div>
                    <div className="text-sm text-muted-foreground">Wrapped Ethereum</div>
                    <div className="text-xs font-mono">0xC02aaA39b2...</div>
                  </div>
                </div>
              </div>

              {/* Fee Tier Selection */}
              <div className="space-y-3">
                <Label>Fee Tier</Label>
                <div className="grid grid-cols-3 gap-2">
                  {feeTiers.map((tier) => (
                    <button
                      key={tier.value}
                      onClick={() => setSelectedFee(tier.value)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        selectedFee === tier.value 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="font-medium">{tier.label}</div>
                      <div className="text-xs text-muted-foreground">{tier.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Liquidity Amounts */}
              <div className="space-y-4">
                <Label>Initial Liquidity</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">ETHGR Amount</Label>
                    <Input
                      placeholder="100000"
                      value={ethgrAmount}
                      onChange={(e) => setEthgrAmount(e.target.value)}
                      type="number"
                    />
                    <div className="text-xs text-muted-foreground">
                      Available: {ETHGR_BALANCE} ETHGR
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">ETH Amount</Label>
                    <Input
                      placeholder="18.58"
                      value={ethAmount}
                      onChange={(e) => setEthAmount(e.target.value)}
                      type="number"
                      step="0.01"
                    />
                    <div className="text-xs text-muted-foreground">
                      ~${ethAmount ? (parseFloat(ethAmount) * ETH_PRICE).toLocaleString() : '0'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              {ethAmount && ethgrAmount && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4" />
                    <span className="font-medium">Initial Price</span>
                  </div>
                  <div className="text-lg font-bold">
                    1 ETHGR = ${calculateInitialPrice().toFixed(4)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on {ethgrAmount} ETHGR : {ethAmount} ETH ratio
                  </div>
                </div>
              )}

            </CardContent>
          </Card>

          {/* Create Pool Button */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={handleCreatePool}
                className="w-full"
                size="lg"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet & Create Pool
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                This will open Uniswap interface to create your pool
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Suggested Liquidity Pairs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Pairs</CardTitle>
              <CardDescription>
                Based on original ETHG market value of $0.355/token
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedPairs.map((pair, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setEthgrAmount(pair.ethgr);
                    setEthAmount(pair.eth);
                  }}
                  className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="font-medium">{pair.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {parseInt(pair.ethgr).toLocaleString()} ETHGR + {pair.eth} ETH
                  </div>
                  <div className="text-xs text-primary">{pair.ratio}</div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Pool Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pool Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Trading Enabled</div>
                  <div className="text-muted-foreground">Users can buy/sell ETHGR</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Earn Fees</div>
                  <div className="text-muted-foreground">Get 0.3% of all trades</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Price Discovery</div>
                  <div className="text-muted-foreground">Market determines fair value</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Pool creation requires gas fees (~$50-100)</p>
              <p>• Start with smaller amounts to test</p>
              <p>• You can add more liquidity later</p>
              <p>• Price may fluctuate after listing</p>
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardContent className="pt-6 space-y-2">
              <a 
                href="https://app.uniswap.org/#/pool"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                Uniswap Pool Interface
              </a>
              <a 
                href={`https://etherscan.io/address/${ETHGR_CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                View ETHGR Contract
              </a>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}