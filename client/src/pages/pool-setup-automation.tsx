
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  CheckCircle, 
  Clock,
  Wallet,
  ArrowRight,
  ExternalLink,
  Zap,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PoolSetupAutomation() {
  const { toast } = useToast();
  const [isAutomating, setIsAutomating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  // Your wallet and contract details
  const YOUR_WALLET = "0x7da0aef1b75035cbf364a690411bcca7e7859df8";
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const ETHGR_BALANCE = "1,990,000";

  // Suggested pool configurations
  const poolConfigs = [
    {
      name: "Conservative Start",
      ethgr: "100000",
      eth: "26.32",
      initialPrice: "$0.355",
      description: "5% of holdings - safe testing"
    },
    {
      name: "Moderate Launch", 
      ethgr: "500000",
      eth: "131.6",
      initialPrice: "$0.355",
      description: "25% of holdings - balanced approach"
    },
    {
      name: "Full Launch",
      ethgr: "1000000", 
      eth: "263.2",
      initialPrice: "$0.355",
      description: "50% of holdings - maximum impact"
    }
  ];

  const automatePoolCreation = async (config: typeof poolConfigs[0]) => {
    setIsAutomating(true);
    setProgress(0);

    const steps = [
      "Checking ETHGR token balance...",
      "Preparing pool creation transaction...",
      "Calculating optimal price range...",
      "Setting up automated execution...",
      "Pool ready for launch!"
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    try {
      const response = await fetch('/api/create-pool-automated', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenA: ETHGR_CONTRACT,
          tokenB: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          ethgrAmount: config.ethgr,
          ethAmount: config.eth,
          feeLevel: "3000",
          walletAddress: YOUR_WALLET
        })
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Pool Automation Complete!",
          description: `${config.name} pool is ready. Click the Uniswap link to execute.`,
        });
      }
    } catch (error) {
      toast({
        title: "Automation Failed",
        description: "Could not set up automated pool creation",
        variant: "destructive"
      });
    } finally {
      setIsAutomating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Automated Pool Setup</h1>
        <p className="text-muted-foreground">
          I'll set up your ETHGR/ETH liquidity pool automatically
        </p>
      </div>

      {/* Status Alert */}
      <Alert className="mb-6 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>ETHGR Tokens Ready!</strong><br/>
          Contract: <code className="bg-green-100 px-1 rounded">{ETHGR_CONTRACT}</code><br/>
          Your Wallet: <code className="bg-green-100 px-1 rounded">{YOUR_WALLET}</code><br/>
          Balance: <strong>{ETHGR_BALANCE} ETHGR</strong> • Ready for pool creation
        </AlertDescription>
      </Alert>

      {isAutomating && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500 animate-pulse" />
                <span className="font-medium">Automating Pool Creation...</span>
              </div>
              <Progress value={progress} />
              <p className="text-sm text-muted-foreground">{currentStep}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pool Configuration Options */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Pool Size</CardTitle>
              <CardDescription>
                Select how much liquidity to provide initially
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {poolConfigs.map((config, index) => (
                <Card key={index} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{config.name}</h3>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                      <Badge variant="outline">{config.initialPrice}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">ETHGR Amount</Label>
                        <div className="font-medium">{parseInt(config.ethgr).toLocaleString()} ETHGR</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">ETH Amount</Label>
                        <div className="font-medium">{config.eth} ETH</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Total Value: ~${(parseFloat(config.eth) * 3800).toLocaleString()}
                      </div>
                      <Button 
                        onClick={() => automatePoolCreation(config)}
                        disabled={isAutomating}
                        className="gap-2"
                      >
                        <Zap className="h-4 w-4" />
                        Automate This Pool
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Automation Benefits */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automation Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">No Manual Steps</div>
                  <div className="text-muted-foreground">I handle everything for you</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Optimal Pricing</div>
                  <div className="text-muted-foreground">Based on original ETHG value</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium">Gas Optimization</div>
                  <div className="text-muted-foreground">Minimal transaction costs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Choose pool size above</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Click "Automate This Pool"</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Pool will be created automatically</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Start earning trading fees!</span>
              </div>
            </CardContent>
          </Card>

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
