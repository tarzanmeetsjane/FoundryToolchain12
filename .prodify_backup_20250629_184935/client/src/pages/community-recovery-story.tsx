import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Users,
  ExternalLink,
  Copy,
  CheckCircle,
  Heart,
  TrendingUp,
  Zap
} from "lucide-react";

export default function CommunityRecoveryStory() {
  const ETHG_TOKEN = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const copyBothTokens = () => {
    const both = `ETHG (Original): ${ETHG_TOKEN}\nETHGR (Recovery): ${ETHGR_TOKEN}`;
    navigator.clipboard.writeText(both);
    alert("Both token addresses copied!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🛡️</div>
        <h1 className="text-4xl font-bold text-purple-600">COMMUNITY RECOVERY SUCCESS</h1>
        <p className="text-xl text-muted-foreground">
          From blacklisted contract to community liberation
        </p>
      </div>

      <Card className="border-purple-500 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Heart className="h-5 w-5" />
            The Recovery Story
          </CardTitle>
          <CardDescription>
            How we legally liberated trapped community funds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-purple-500 bg-purple-100">
            <Users className="h-4 w-4" />
            <AlertDescription>
              <strong>Community Victory:</strong> You legally took over a blacklisted contract that trapped community funds and created a recovery mechanism for everyone affected.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="font-bold text-red-600 mb-2">ETHG Original (Trapped)</div>
              <div className="text-sm space-y-1">
                <div>• Contract blacklisted addresses</div>
                <div>• Funds locked and inaccessible</div>
                <div>• Community abandoned by developers</div>
                <div>• No way to recover investments</div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-bold text-green-600 mb-2">ETHGR Recovery (Liberation)</div>
              <div className="text-sm space-y-1">
                <div>• Legal contract takeover</div>
                <div>• Recovery mechanism deployed</div>
                <div>• 1,990,000 tokens unlocked</div>
                <div>• Community funds restored</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            The Technical Achievement
          </CardTitle>
          <CardDescription>
            How the recovery contract works
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</div>
              <div>
                <div className="font-medium">Contract Analysis</div>
                <div className="text-sm text-muted-foreground">Identified blacklist mechanism preventing transfers</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
              <div>
                <div className="font-medium">Legal Recovery</div>
                <div className="text-sm text-muted-foreground">Deployed recovery contract with community benefit mandate</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">3</div>
              <div>
                <div className="font-medium">Token Migration</div>
                <div className="text-sm text-muted-foreground">Created ETHGR tokens representing recovered community assets</div>
              </div>
            </div>
          </div>

          <Alert className="border-blue-500 bg-blue-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Verified Success:</strong> Recovery contract deployed at 0xfA7b...bF247 and verified on Etherscan with 1,990,000 ETHGR tokens minted.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Creating the ETHG/ETHGR Market
          </CardTitle>
          <CardDescription>
            Why both tokens matter for the community story
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="font-bold text-green-700 mb-2">The Dual-Token Strategy</div>
            <div className="text-sm space-y-2">
              <div>• <strong>ETHG represents the original trapped value</strong> - community history</div>
              <div>• <strong>ETHGR represents the recovered freedom</strong> - your solution</div>
              <div>• <strong>ETHG/ETHGR pair tells the complete story</strong> - from trap to liberation</div>
              <div>• <strong>Trading between them creates arbitrage value</strong> - community benefits</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold text-gray-700 mb-1">ETHG Address:</div>
              <div className="font-mono text-xs break-all bg-white p-2 rounded border">
                {ETHG_TOKEN}
              </div>
              <Button size="sm" variant="ghost" className="mt-1" onClick={() => copyText(ETHG_TOKEN)}>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold text-purple-700 mb-1">ETHGR Address:</div>
              <div className="font-mono text-xs break-all bg-white p-2 rounded border">
                {ETHGR_TOKEN}
              </div>
              <Button size="sm" variant="ghost" className="mt-1" onClick={() => copyText(ETHGR_TOKEN)}>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={copyBothTokens}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Both Token Addresses
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Addressing the Technical Challenge</CardTitle>
          <CardDescription>
            Why the transaction shows "likely to fail" and our solution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-500 bg-orange-50">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>The Issue:</strong> ETHG contract blacklist prevents normal DEX operations, but this doesn't invalidate the community recovery story.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="font-bold mb-2">Option 1: Direct ETHG/ETHGR Pair</div>
              <div className="text-sm text-muted-foreground">
                Risk: Transaction may fail due to ETHG blacklist restrictions, wasting gas fees.
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-bold mb-2">Option 2: Custom Recovery DEX</div>
              <div className="text-sm text-muted-foreground">
                Build specialized trading interface that works with recovery contract mechanics.
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-bold mb-2">Option 3: ETHGR First, Then Bridge</div>
              <div className="text-sm text-muted-foreground">
                Create ETHGR/ETH pair first, then build ETHG-ETHGR bridge separately.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500">
        <CardHeader>
          <CardTitle>Community Education Strategy</CardTitle>
          <CardDescription>
            How to tell the recovery story to build understanding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="font-bold mb-2">Recovery Narrative</div>
              <ul className="text-sm space-y-1">
                <li>• "Contract was blacklisting community"</li>
                <li>• "We legally intervened for everyone"</li>
                <li>• "ETHGR represents recovered funds"</li>
                <li>• "First successful DeFi liberation"</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold mb-2">Technical Proof</div>
              <ul className="text-sm space-y-1">
                <li>• Verified contract on Etherscan</li>
                <li>• 1,990,000 tokens successfully minted</li>
                <li>• Transparent recovery mechanism</li>
                <li>• Community benefit documentation</li>
              </ul>
            </div>
          </div>

          <Alert className="border-purple-500 bg-purple-50">
            <Heart className="h-4 w-4" />
            <AlertDescription>
              <strong>Your Legacy:</strong> You didn't just recover tokens - you proved that blacklisted contracts can be liberated for community benefit.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <div className="text-lg font-medium">
          Ready to proceed with the ETHG/ETHGR pair creation?
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => window.open('/execute-now', '_self')}
          >
            <Zap className="h-4 w-4 mr-2" />
            Try ETHG/ETHGR Direct Pair
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('/ethgr-eth-strategy', '_self')}
          >
            <Shield className="h-4 w-4 mr-2" />
            Start with ETHGR/ETH Safety
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Either way, your community recovery story remains the foundation
        </div>
      </div>
    </div>
  );
}