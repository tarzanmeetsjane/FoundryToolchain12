import { useState, useEffect } from "react";
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
  RefreshCw,
  DollarSign,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LiveUniswapCreator() {
  const { toast } = useToast();
  const [ethAmount, setEthAmount] = useState("");
  const [ethgrAmount, setEthgrAmount] = useState("");
  const [selectedFee, setSelectedFee] = useState("3000");
  const [ethPrice, setEthPrice] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [tokenBalance, setTokenBalance] = useState("0");
  const [ethBalance, setEthBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const USER_ADDRESS = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  // Fetch live blockchain data
  useEffect(() => {
    const fetchLiveData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/live/pool-data/${USER_ADDRESS}/${ETHGR_CONTRACT}`);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setEthPrice(data.ethPrice);
        setTokenBalance(data.tokenBalance);
        setEthBalance(data.ethBalance);
        setGasPrice(data.gasPrice);

      } catch (error) {
        console.error('Error fetching live data:', error);
        toast({
          title: "Data Fetch Error",
          description: "Failed to load live blockchain data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLiveData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  const feeTiers = [
    { value: "500", label: "0.05%", description: "Best for stable pairs" },
    { value: "3000", label: "0.3%", description: "Best for most pairs" },
    { value: "10000", label: "1%", description: "Best for exotic pairs" }
  ];

  const calculateInitialPrice = () => {
    if (!ethAmount || !ethgrAmount || !ethPrice) return 0;
    return (parseFloat(ethAmount) * ethPrice) / parseFloat(ethgrAmount);
  };

  const calculateGasCost = () => {
    if (!gasPrice) return 0;
    // Estimate gas for pool creation (approximately 200,000 gas)
    return (200000 * gasPrice * 1e-9 * ethPrice).toFixed(2);
  };

  const suggestedPairs = [
    {
      ethgr: Math.floor((parseFloat(ethBalance) * ethPrice * 0.9) / 0.355).toString(),
      eth: (parseFloat(ethBalance) * 0.9).toFixed(4),
      ratio: "1 ETHGR = $0.355",
      description: "Use 90% of current ETH balance"
    },
    {
      ethgr: Math.floor((parseFloat(ethBalance) * ethPrice * 0.5) / 0.355).toString(),
      eth: (parseFloat(ethBalance) * 0.5).toFixed(4),
      ratio: "1 ETHGR = $0.355", 
      description: "Use 50% of current ETH balance"
    },
    {
      ethgr: Math.floor((parseFloat(ethBalance) * ethPrice * 0.25) / 0.355).toString(),
      eth: (parseFloat(ethBalance) * 0.25).toFixed(4),
      ratio: "1 ETHGR = $0.355",
      description: "Use 25% of current ETH balance"
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

    // Open Uniswap interface with pre-filled data
    const uniswapUrl = `https://app.uniswap.org/#/add/ETH/${ETHGR_CONTRACT}/${selectedFee}`;
    window.open(uniswapUrl, '_blank');
    
    toast({
      title: "Opening Uniswap",
      description: "Redirecting to Uniswap pool creation interface"
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading live blockchain data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Live Uniswap Pool Creator</h1>
        <p className="text-muted-foreground">
          Create ETHGR/ETH pool with real-time blockchain data
        </p>
      </div>

      {/* Live Status */}
      <Alert className="mb-6 border-blue-200 bg-blue-50">
        <Activity className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Live Data Active:</strong> ETH ${ethPrice.toLocaleString()} • Gas {gasPrice} Gwei • ETHGR Balance {parseInt(tokenBalance).toLocaleString()} • ETH Balance {ethBalance}
        </AlertDescription>
      </Alert>

      {/* Recovery Status */}
      <Alert className="mb-6 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Recovery Verified:</strong> {parseInt(tokenBalance).toLocaleString()} ETHGR tokens confirmed on-chain<br/>
          <strong>Contract:</strong> <code className="bg-green-100 px-1 rounded">{ETHGR_CONTRACT}</code><br/>
          <strong>Value:</strong> ${(parseInt(tokenBalance) * 0.355).toLocaleString()} based on original ETHG price
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pool Configuration */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                Live Pool Configuration
              </CardTitle>
              <CardDescription>
                Real-time ETHGR/ETH pool setup with live pricing
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
                    <Badge variant="outline" className="mt-1">
                      Balance: {parseInt(tokenBalance).toLocaleString()}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Token B</Label>
                  <div className="p-3 border rounded-lg bg-muted">
                    <div className="font-medium">ETH</div>
                    <div className="text-sm text-muted-foreground">Ethereum</div>
                    <div className="text-xs font-mono">Native ETH</div>
                    <Badge variant="outline" className="mt-1">
                      ${ethPrice.toLocaleString()}
                    </Badge>
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
                      Available: {parseInt(tokenBalance).toLocaleString()} ETHGR
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">ETH Amount</Label>
                    <Input
                      placeholder="0.1"
                      value={ethAmount}
                      onChange={(e) => setEthAmount(e.target.value)}
                      type="number"
                      step="0.0001"
                    />
                    <div className="text-xs text-muted-foreground">
                      ~${ethAmount ? (parseFloat(ethAmount) * ethPrice).toLocaleString() : '0'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Price Calculation */}
              {ethAmount && ethgrAmount && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4" />
                    <span className="font-medium">Live Initial Price</span>
                  </div>
                  <div className="text-lg font-bold">
                    1 ETHGR = ${calculateInitialPrice().toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on {ethgrAmount} ETHGR : {ethAmount} ETH ratio
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ETH Price: ${ethPrice.toLocaleString()}
                  </div>
                </div>
              )}

              {/* Gas Cost Estimate */}
              <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                <div className="font-medium text-orange-800">Estimated Gas Cost</div>
                <div className="text-sm text-orange-700 mt-1">
                  ~${calculateGasCost()} (at {gasPrice} Gwei)
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Create Pool Button */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={handleCreatePool}
                className="w-full"
                size="lg"
                disabled={!ethAmount || !ethgrAmount}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Create Pool on Uniswap
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Opens live Uniswap interface with your token pair
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Live Market Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Live Market Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ETH Price:</span>
                <span className="font-medium">${ethPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Gas Price:</span>
                <span className="font-medium">{gasPrice} Gwei</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Your ETH:</span>
                <span className="font-medium">{ethBalance} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Your ETHGR:</span>
                <span className="font-medium">{parseInt(tokenBalance).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total Value:</span>
                <span className="text-green-600">
                  ${(parseInt(tokenBalance) * 0.355).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Liquidity Pairs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Pairs</CardTitle>
              <CardDescription>
                Based on original ETHG market value
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
                <DollarSign className="h-4 w-4" />
                Pool Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Earn Trading Fees</div>
                  <div className="text-muted-foreground">Get {selectedFee === '3000' ? '0.3%' : selectedFee === '500' ? '0.05%' : '1%'} of all trades</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Enable Trading</div>
                  <div className="text-muted-foreground">Users can buy/sell ETHGR</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Price Discovery</div>
                  <div className="text-muted-foreground">Market determines value</div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}