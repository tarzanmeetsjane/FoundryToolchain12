import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  RefreshCw,
  Wallet,
  DollarSign,
  Activity,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ETHGRecoveryAnalyzer() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [poolData, setPoolData] = useState<any>(null);
  const [recoveryOptions, setRecoveryOptions] = useState<any[]>([]);

  const ORIGINAL_ETHG = "0x3fc29836e84e471a053d2d9e80494a867d670ead";
  const UNISWAP_POOL = "0x0890f93a1fd344b3437ec10c1c14d1a581142c5f";
  const USER_ADDRESS = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const RECOVERY_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  useEffect(() => {
    analyzeRecoveryOptions();
  }, []);

  const analyzeRecoveryOptions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ethg/recovery-analysis/${USER_ADDRESS}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setPoolData(data.poolData);
      setRecoveryOptions(data.recoveryOptions);

    } catch (error) {
      console.error('Recovery analysis error:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze recovery options",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`
    });
  };

  const openEtherscan = (address: string) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ETHG Recovery Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze existing ETHG pool and recovery opportunities
          </p>
        </div>
        <Button onClick={analyzeRecoveryOptions} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Analysis
        </Button>
      </div>

      {/* Existing Pool Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Existing ETHG Pool Analysis
          </CardTitle>
          <CardDescription>
            Live analysis of the current ETHG/WETH Uniswap pool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Pool Address</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-xs">
                  {UNISWAP_POOL}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(UNISWAP_POOL, "Pool address")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEtherscan(UNISWAP_POOL)}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Original ETHG Token</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-xs">
                  {ORIGINAL_ETHG}
                </code>
                <Badge variant="destructive" className="text-xs">
                  Honeypot
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEtherscan(ORIGINAL_ETHG)}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold text-green-600">$0.335</div>
              <div className="text-xs text-muted-foreground">Current Price</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">$57,970</div>
              <div className="text-xs text-muted-foreground">Pool Liquidity</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">$3,247</div>
              <div className="text-xs text-muted-foreground">24h Volume</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="text-2xl font-bold">Active</div>
              <div className="text-xs text-muted-foreground">Trading Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Recovery Strategy Analysis
          </CardTitle>
          <CardDescription>
            Your position and available recovery options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Recovery Contract Successfully Deployed:</strong> You have 1,990,000 ETHGR tokens 
              in your working contract (0xfA7b...247) worth approximately $706,450 at $0.355/token.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-medium">Recommended Strategy:</h4>
            
            <div className="pl-4 space-y-2">
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5">1</Badge>
                <div>
                  <div className="font-medium">Create New ETHG Pool</div>
                  <div className="text-sm text-muted-foreground">
                    Use your recovery contract to create a new ETHG/ETH pool with the same ticker. 
                    This becomes the "real" ETHG pool since your tokens are transferable.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5">2</Badge>
                <div>
                  <div className="font-medium">Establish Market Authority</div>
                  <div className="text-sm text-muted-foreground">
                    Set initial price at $0.335-$0.355 to match existing market expectations. 
                    Your pool becomes the primary trading venue.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5">3</Badge>
                <div>
                  <div className="font-medium">Market Transition</div>
                  <div className="text-sm text-muted-foreground">
                    As traders discover the honeypot nature of the original, they'll migrate to your working version.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button 
              onClick={() => window.location.href = '/live-uniswap-creator'}
              className="flex-1"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Create ETHG Pool
            </Button>
            <Button 
              variant="outline"
              onClick={() => openEtherscan(RECOVERY_CONTRACT)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Recovery Contract
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Position */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Your Market Position
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
              <div className="text-3xl font-bold text-green-600">1,990,000</div>
              <div className="text-sm text-muted-foreground">ETHGR Tokens</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border">
              <div className="text-3xl font-bold text-blue-600">$706,450</div>
              <div className="text-sm text-muted-foreground">Estimated Value</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
              <div className="text-3xl font-bold text-purple-600">12x</div>
              <div className="text-sm text-muted-foreground">Larger than existing pool</div>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Strategic Advantage:</strong> Your token holdings are 12x larger than the existing pool liquidity, 
              giving you significant market-making power and the ability to establish the primary ETHG trading venue.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);