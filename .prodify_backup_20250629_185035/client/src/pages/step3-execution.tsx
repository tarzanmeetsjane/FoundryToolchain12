import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  ArrowRight,
  Zap
} from "lucide-react";

export default function Step3Execution() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard`);
  };

  const ETHG_CONTRACT = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_CONTRACT = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const FACTORY_CONTRACT = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔥</div>
        <h1 className="text-4xl font-bold">STEP 3: CREATE TRADING PAIR</h1>
        <p className="text-xl text-muted-foreground">
          Execute createPair function on Uniswap V2 Factory
        </p>
      </div>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Factory Contract Execution
          </CardTitle>
          <CardDescription>
            You're on the correct contract: 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-blue-500 bg-blue-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Ready to Execute:</strong> You're on the Uniswap V2 Factory contract page. Navigate to "Write Contract" tab.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Function: createPair</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-1">Parameter 1: tokenA</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm bg-white p-2 rounded border flex-1">
                      {ETHG_CONTRACT}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(ETHG_CONTRACT, "ETHG contract address")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">ETHG Token Contract</div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Parameter 2: tokenB</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm bg-white p-2 rounded border flex-1">
                      {ETHGR_CONTRACT}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(ETHGR_CONTRACT, "ETHGR contract address")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">ETHGR Recovery Contract</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700"
                onClick={() => window.open(`https://etherscan.io/address/${FACTORY_CONTRACT}#writeContract`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Write Contract
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => copyToClipboard(`${ETHG_CONTRACT}\n${ETHGR_CONTRACT}`, "Both contract addresses")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All Parameters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Execution Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <div className="font-medium">Navigate to Write Contract Tab</div>
                <div className="text-sm text-muted-foreground">Click "Write Contract" on the Etherscan page</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <div className="font-medium">Connect Your Wallet</div>
                <div className="text-sm text-muted-foreground">Click "Connect to Web3" and select MetaMask</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <div className="font-medium">Find createPair Function</div>
                <div className="text-sm text-muted-foreground">Scroll down to function #3: createPair</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <div className="font-medium">Enter Parameters</div>
                <div className="text-sm text-muted-foreground">
                  tokenA: {ETHG_CONTRACT}<br/>
                  tokenB: {ETHGR_CONTRACT}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
              <div>
                <div className="font-medium">Execute Transaction</div>
                <div className="text-sm text-muted-foreground">Click "Write" and confirm in MetaMask</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle>After Execution</CardTitle>
          <CardDescription>What happens when the pair is created</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Pair Creation:</strong> Creates the first-ever ETHG/ETHGR trading pair on Uniswap V2
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">ETHG/ETHGR</div>
              <div className="text-sm text-muted-foreground">Trading Pair Created</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">Ready</div>
              <div className="text-sm text-muted-foreground">For Liquidity Addition</div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.open('/execution-status', '_self')}
            >
              Return to Execution Status
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contract Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-medium">Uniswap V2 Factory</div>
            <div className="font-mono text-xs bg-muted p-2 rounded">{FACTORY_CONTRACT}</div>
            <Badge variant="outline" className="mt-1">Verified Contract</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">ETHG Token</div>
              <div className="font-mono text-xs bg-muted p-2 rounded">{ETHG_CONTRACT}</div>
            </div>
            <div>
              <div className="text-sm font-medium">ETHGR Recovery</div>
              <div className="font-mono text-xs bg-muted p-2 rounded">{ETHGR_CONTRACT}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}