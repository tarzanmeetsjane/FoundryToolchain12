import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  Copy,
  ExternalLink,
  CheckCircle
} from "lucide-react";

export default function QuickPairExecution() {
  const ETHG_TOKEN = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h1 className="text-4xl font-bold">EXECUTE STANDARD CREATEPAIR</h1>
        <p className="text-xl text-muted-foreground">
          Use the 2-parameter function only
        </p>
      </div>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Standard Uniswap V2 createPair
          </CardTitle>
          <CardDescription>
            Function signature: createPair(address tokenA, address tokenB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenA</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {ETHG_TOKEN}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">ETHG Original</Badge>
                <Button size="sm" variant="ghost" onClick={() => copyText(ETHG_TOKEN)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenB</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {ETHGR_TOKEN}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">ETHGR Recovery</Badge>
                <Button size="sm" variant="ghost" onClick={() => copyText(ETHGR_TOKEN)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Alert className="border-blue-500 bg-blue-50">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              Look for the createPair function with exactly 2 address parameters. Ignore functions with fee parameters.
            </AlertDescription>
          </Alert>

          <div className="text-center space-y-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => copyText(`${ETHG_TOKEN}\n${ETHGR_TOKEN}`)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Both Addresses
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Execution Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</div>
              <span className="text-sm">Find createPair function with 2 parameters</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
              <span className="text-sm">Paste tokenA: {ETHG_TOKEN.slice(0, 10)}...</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</div>
              <span className="text-sm">Paste tokenB: {ETHGR_TOKEN.slice(0, 10)}...</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">4</div>
              <span className="text-sm">Click Write and confirm transaction</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>After Successful Execution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-lg">Transaction will create ETHG/ETHGR pair</div>
            <div className="text-sm text-muted-foreground">
              You'll receive a pair contract address enabling Step 4: Add Liquidity
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/execution-status', '_self')}
            >
              Track Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}