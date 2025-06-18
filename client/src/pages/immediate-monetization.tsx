import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Calculator,
  Clock,
  Target,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImmediateMonetization() {
  const { toast } = useToast();
  const [ethPrice, setEthPrice] = useState(0);
  const [ethBalance, setEthBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const USER_ADDRESS = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const TOTAL_TOKENS = 1990000;
  const TOKEN_VALUE = 0.335; // Current market reference

  useEffect(() => {
    fetchLiveData();
  }, []);

  const fetchLiveData = async () => {
    try {
      const response = await fetch(`/api/live/pool-data/${USER_ADDRESS}/${ETHGR_CONTRACT}`);
      const data = await response.json();
      
      if (!data.error) {
        setEthPrice(data.ethPrice);
        setEthBalance(data.ethBalance);
      }
    } catch (error) {
      console.error('Data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const monetizationStrategies = [
    {
      strategy: "Immediate Pool Creation",
      timeframe: "15 minutes",
      requirements: "Current ETH balance",
      ethNeeded: parseFloat(ethBalance),
      tokensToUse: Math.floor((parseFloat(ethBalance) * ethPrice) / TOKEN_VALUE),
      expectedValue: Math.floor((parseFloat(ethBalance) * ethPrice) / TOKEN_VALUE) * TOKEN_VALUE,
      description: "Create small pool with current balance, start earning fees immediately"
    },
    {
      strategy: "Optimized Pool Creation", 
      timeframe: "1 hour",
      requirements: "Buy 0.5 ETH",
      ethNeeded: 0.5,
      tokensToUse: Math.floor((0.5 * ethPrice) / TOKEN_VALUE),
      expectedValue: Math.floor((0.5 * ethPrice) / TOKEN_VALUE) * TOKEN_VALUE,
      description: "Create substantial pool, higher trading volume and fees"
    },
    {
      strategy: "Maximum Liquidity Pool",
      timeframe: "2 hours", 
      requirements: "Buy 2-5 ETH",
      ethNeeded: 3,
      tokensToUse: Math.floor((3 * ethPrice) / TOKEN_VALUE),
      expectedValue: Math.floor((3 * ethPrice) / TOKEN_VALUE) * TOKEN_VALUE,
      description: "Dominate ETHG market, capture maximum trading fees"
    }
  ];

  const quickActions = [
    {
      title: "Buy ETH on Coinbase",
      url: "https://www.coinbase.com/buy/ETH",
      description: "Fast ETH purchase with debit card",
      time: "5 minutes"
    },
    {
      title: "Create Uniswap Pool", 
      url: `https://app.uniswap.org/#/add/v2/ETH/${ETHGR_CONTRACT}`,
      description: "Direct pool creation interface",
      time: "10 minutes"
    },
    {
      title: "Start Token Sales",
      url: `https://app.uniswap.org/#/swap?outputCurrency=${ETHGR_CONTRACT}`,
      description: "Begin selling ETHGR for ETH",
      time: "Ongoing"
    }
  ];

  const revenueProjections = [
    {
      scenario: "Conservative (0.3% fees)",
      dailyVolume: 5000,
      dailyFees: 15,
      monthlyFees: 450,
      description: "Low trading activity"
    },
    {
      scenario: "Moderate (0.3% fees)",
      dailyVolume: 25000, 
      dailyFees: 75,
      monthlyFees: 2250,
      description: "Growing market interest"
    },
    {
      scenario: "High (0.3% fees)",
      dailyVolume: 100000,
      dailyFees: 300,
      monthlyFees: 9000,
      description: "Viral token adoption"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Immediate Monetization Plan</h1>
          <p className="text-muted-foreground">
            Convert your 1,990,000 ETHGR tokens to cash quickly
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            ${(TOTAL_TOKENS * TOKEN_VALUE).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Value</div>
        </div>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Current Position
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded border">
            <div className="text-2xl font-bold text-green-600">1,990,000</div>
            <div className="text-xs text-muted-foreground">ETHGR Tokens</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded border">
            <div className="text-2xl font-bold text-blue-600">{ethBalance}</div>
            <div className="text-xs text-muted-foreground">ETH Balance</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded border">
            <div className="text-2xl font-bold text-purple-600">${TOKEN_VALUE}</div>
            <div className="text-xs text-muted-foreground">Market Price</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded border">
            <div className="text-2xl font-bold text-orange-600">
              {loading ? "..." : Math.floor((parseFloat(ethBalance) * ethPrice) / TOKEN_VALUE)}
            </div>
            <div className="text-xs text-muted-foreground">Tokens/Current ETH</div>
          </div>
        </CardContent>
      </Card>

      {/* Monetization Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Monetization Strategies
          </CardTitle>
          <CardDescription>
            Choose your approach based on available capital and time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {monetizationStrategies.map((strategy, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{strategy.strategy}</h4>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  {strategy.timeframe}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium">{strategy.ethNeeded} ETH needed</div>
                  <div className="text-muted-foreground">{strategy.requirements}</div>
                </div>
                <div>
                  <div className="font-medium">{strategy.tokensToUse.toLocaleString()} ETHGR</div>
                  <div className="text-muted-foreground">Tokens for pool</div>
                </div>
                <div>
                  <div className="font-medium">${strategy.expectedValue.toLocaleString()}</div>
                  <div className="text-muted-foreground">Initial pool value</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Direct links to start monetization immediately
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{action.time}</Badge>
                <Button
                  size="sm"
                  onClick={() => window.open(action.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Revenue Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Projections
          </CardTitle>
          <CardDescription>
            Estimated earnings from pool trading fees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {revenueProjections.map((projection, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{projection.scenario}</h4>
                <Badge variant={index === 1 ? "default" : "secondary"}>
                  {projection.description}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold">${projection.dailyVolume.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Daily Volume</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">${projection.dailyFees}</div>
                  <div className="text-xs text-muted-foreground">Daily Fees</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">${projection.monthlyFees.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Monthly Fees</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Immediate Action */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Recommended Next Step:</strong> Buy 0.5-1 ETH on Coinbase, then create your ETHGR/ETH pool. 
          You can start selling tokens and earning fees within 1 hour.
        </AlertDescription>
      </Alert>
    </div>
  );
}

const Wallet = ({ className }: { className?: string }) => (
  <DollarSign className={className} />
);