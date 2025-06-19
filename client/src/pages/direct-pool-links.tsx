import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  AlertTriangle,
  CheckCircle,
  Copy,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DirectPoolLinks() {
  const { toast } = useToast();

  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const USER_ADDRESS = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  const poolLinks = [
    {
      platform: "Uniswap V2 Pool Creation",
      url: `https://app.uniswap.org/#/add/v2/ETH/${ETHGR_CONTRACT}`,
      description: "Create ETHGR/ETH liquidity pool (recommended)",
      priority: "high"
    },
    {
      platform: "Uniswap V3 Pool Creation", 
      url: `https://app.uniswap.org/#/add/ETH/${ETHGR_CONTRACT}`,
      description: "Create concentrated liquidity pool",
      priority: "medium"
    },
    {
      platform: "ETHGR Token Swap Interface",
      url: `https://app.uniswap.org/#/swap?outputCurrency=${ETHGR_CONTRACT}`,
      description: "Direct swap interface (pool must exist first)",
      priority: "low"
    }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Direct Pool Creation Links</h1>
          <p className="text-muted-foreground">
            Immediate access to Uniswap pool creation for ETHGR
          </p>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>IMPORTANT:</strong> No ETHGR pool exists yet! You need to CREATE the pool first before anyone can trade ETHGR tokens.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4">
        {poolLinks.map((link, index) => (
          <Card key={index} className={link.priority === 'high' ? 'border-green-500 bg-green-50' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{link.platform}</span>
                <Badge variant={link.priority === 'high' ? 'default' : 'secondary'}>
                  {link.priority === 'high' ? 'RECOMMENDED' : link.priority.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-muted rounded text-xs break-all">
                  {link.url}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(link.url, "Pool link")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                className="w-full"
                size="lg"
                onClick={() => window.open(link.url, '_blank')}
                variant={link.priority === 'high' ? 'default' : 'outline'}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {link.priority === 'high' ? 'CREATE POOL NOW' : 'Open Link'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Pool Creation Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">What You Need:</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  ETHGR tokens (you have 1,990,000)
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-orange-600" />
                  ETH for pairing (you need to get this)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  MetaMask wallet connected
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-orange-600" />
                  Gas fees for transactions
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">After Pool Creation:</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  ETHGR becomes tradeable
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  You earn 0.3% fees on trades
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Can swap ETHGR for ETH anytime
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Pool appears on all DEX aggregators
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Your Contract Details:</strong><br />
          ETHGR Token: {ETHGR_CONTRACT}<br />
          Your Wallet: {USER_ADDRESS}<br />
          Tokens Ready: 1,990,000 ETHGR
        </AlertDescription>
      </Alert>
    </div>
  );
}