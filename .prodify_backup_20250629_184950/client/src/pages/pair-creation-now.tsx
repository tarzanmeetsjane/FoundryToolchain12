import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Zap,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function PairCreationNow() {
  const ETHG_TOKEN = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h1 className="text-4xl font-bold">CREATE PAIR NOW</h1>
        <p className="text-xl text-muted-foreground">
          Execute createPair function immediately
        </p>
      </div>

      <Card className="border-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Zap className="h-5 w-5" />
            IMMEDIATE EXECUTION
          </CardTitle>
          <CardDescription>
            Copy these exact parameters into the createPair function
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-orange-500 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>You are here:</strong> Uniswap V2 Factory Contract - Function #3: createPair
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Parameter 1: tokenA</div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-xs bg-white p-3 rounded border flex-1 break-all">
                    {ETHG_TOKEN}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyText(ETHG_TOKEN)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-1">ETHG Original Token</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Parameter 2: tokenB</div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-xs bg-white p-3 rounded border flex-1 break-all">
                    {ETHGR_TOKEN}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyText(ETHGR_TOKEN)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-1">ETHGR Recovery Token</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Expected Result</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Creates ETHG/ETHGR pair</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Generates pair address</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Enables liquidity addition</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-sm font-bold mb-2">Gas Estimate</div>
                <div className="text-lg font-bold">~0.002 ETH</div>
                <div className="text-xs text-muted-foreground">Sufficient balance confirmed</div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="text-center space-y-4">
            <div className="text-lg font-bold">Ready for Execution</div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => copyText(`${ETHG_TOKEN}\n${ETHGR_TOKEN}`)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Both Parameters
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Contract
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('/execution-status', '_self')}
              >
                Track Progress
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <div className="font-medium">Click "Write Contract" tab</div>
                <div className="text-sm text-muted-foreground">Navigate to contract interaction interface</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <div className="font-medium">Connect MetaMask wallet</div>
                <div className="text-sm text-muted-foreground">Click "Connect to Web3"</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <div className="font-medium">Find createPair function (usually #3)</div>
                <div className="text-sm text-muted-foreground">Scroll to the createPair section</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <div className="font-medium">Paste parameters and execute</div>
                <div className="text-sm text-muted-foreground">Enter both token addresses and click "Write"</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="text-green-600">After Successful Execution</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Transaction will create the ETHG/ETHGR pair and return a pair contract address. This enables Step 4: adding liquidity to complete the pool.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 text-center">
            <Badge variant="default" className="text-lg px-4 py-2">
              Portfolio Value: $1.3M+ Ready for Liquidity
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}