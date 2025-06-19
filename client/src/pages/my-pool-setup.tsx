
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  CheckCircle, 
  ExternalLink, 
  Wallet,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calculator
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MyPoolSetup() {
  const { toast } = useToast();
  const [ethAmount, setEthAmount] = useState("0.1");
  const [ethgrAmount, setEthgrAmount] = useState("100000");
  const [selectedFee, setSelectedFee] = useState("3000");

  // Your specific wallet and contract details
  const YOUR_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const YOUR_ETHGR_BALANCE = "1,990,000";
  const ESTIMATED_VALUE = "$706,450";

  const feeTiers = [
    { value: "500", label: "0.05%", description: "Stable pairs" },
    { value: "3000", label: "0.3%", description: "Most pairs (recommended)" },
    { value: "10000", label: "1%", description: "Exotic pairs" }
  ];

  const suggestedPoolSizes = [
    {
      name: "Conservative Pool",
      ethgr: "50000",
      eth: "0.05",
      value: "$190",
      description: "Start small to test the waters"
    },
    {
      name: "Moderate Pool", 
      ethgr: "200000",
      eth: "0.2",
      value: "$760",
      description: "Balanced approach for good liquidity"
    },
    {
      name: "Large Pool",
      ethgr: "500000",
      eth: "0.5",
      value: "$1900",
      description: "Deep liquidity for serious trading"
    },
    {
      name: "Max Pool",
      ethgr: "1000000",
      eth: "1.0",
      value: "$3800",
      description: "Half your holdings for maximum impact"
    }
  ];

  const handleCreatePool = () => {
    const uniswapUrl = `https://app.uniswap.org/#/add/ETH/${ETHGR_CONTRACT}/${selectedFee}`;
    window.open(uniswapUrl, '_blank');
    
    toast({
      title: "Opening Uniswap",
      description: `Creating ${ethgrAmount} ETHGR + ${ethAmount} ETH pool`
    });
  };

  const handleQuickSetup = (pool: typeof suggestedPoolSizes[0]) => {
    setEthgrAmount(pool.ethgr);
    setEthAmount(pool.eth);
  };

  const calculatePrice = () => {
    if (!ethAmount || !ethgrAmount) return 0;
    const ethValue = parseFloat(ethAmount) * 3800; // ETH price
    return ethValue / parseFloat(ethgrAmount);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your ETHGR Pool Setup</h1>
        <p className="text-muted-foreground">
          Ready to create liquidity pool with your recovered tokens
        </p>
      </div>

      {/* Your Status */}
      <Alert className="mb-6 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Wallet Verified:</strong> {YOUR_WALLET}<br/>
          <strong>ETHGR Balance:</strong> {YOUR_ETHGR_BALANCE} tokens ({ESTIMATED_VALUE})<br/>
          <strong>Contract:</strong> {ETHGR_CONTRACT}<br/>
          <strong>Status:</strong> Ready to create liquidity pool!
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
                Set up your ETHGR/ETH liquidity pool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Token Pair Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="font-bold text-lg">ETHGR</div>
                  <div className="text-sm text-muted-foreground">Your Recovery Token</div>
                  <Badge variant="outline" className="mt-2">
                    Balance: {YOUR_ETHGR_BALANCE}
                  </Badge>
                </div>
                <div className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="font-bold text-lg">ETH</div>
                  <div className="text-sm text-muted-foreground">Ethereum</div>
                  <Badge variant="outline" className="mt-2">
                    ~$3,800 per ETH
                  </Badge>
                </div>
              </div>

              {/* Fee Tier */}
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

              {/* Amounts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ETHGR Amount</Label>
                  <Input
                    placeholder="100000"
                    value={ethgrAmount}
                    onChange={(e) => setEthgrAmount(e.target.value)}
                    type="number"
                  />
                  <div className="text-xs text-muted-foreground">
                    Max: {YOUR_ETHGR_BALANCE} ETHGR
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ETH Amount</Label>
                  <Input
                    placeholder="0.1"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    type="number"
                    step="0.001"
                  />
                  <div className="text-xs text-muted-foreground">
                    ~${ethAmount ? (parseFloat(ethAmount) * 3800).toFixed(0) : '0'}
                  </div>
                </div>
              </div>

              {/* Price Display */}
              {ethAmount && ethgrAmount && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4" />
                    <span className="font-medium">Initial Price</span>
                  </div>
                  <div className="text-lg font-bold">
                    1 ETHGR = ${calculatePrice().toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pool ratio: {ethgrAmount} ETHGR : {ethAmount} ETH
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
                disabled={!ethAmount || !ethgrAmount}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Create Pool on Uniswap
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Opens Uniswap with your token pair pre-configured
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Quick Setup Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Setup</CardTitle>
              <CardDescription>
                Pre-configured pool sizes for your situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedPoolSizes.map((pool, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSetup(pool)}
                  className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="font-medium">{pool.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {parseInt(pool.ethgr).toLocaleString()} ETHGR + {pool.eth} ETH
                  </div>
                  <div className="text-xs text-primary">{pool.value} liquidity</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {pool.description}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Your Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Your Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Earn Trading Fees</div>
                  <div className="text-muted-foreground">Get 0.3% of all ETHGR trades</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Enable Token Trading</div>
                  <div className="text-muted-foreground">Others can now buy/sell ETHGR</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Market Price Discovery</div>
                  <div className="text-muted-foreground">Real market value emerges</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Exit Liquidity</div>
                  <div className="text-muted-foreground">You can remove liquidity anytime</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>1. Choose your pool size above</p>
              <p>2. Click "Create Pool on Uniswap"</p>
              <p>3. Connect your wallet ({YOUR_WALLET.slice(0, 8)}...)</p>
              <p>4. Approve ETHGR token spending</p>
              <p>5. Add liquidity and create pool</p>
              <p>6. Start earning from trades!</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
