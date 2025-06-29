import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink
} from "lucide-react";

export default function CreatePairClarification() {
  const ETHG_TOKEN = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-4xl font-bold">CREATEPAIR FUNCTION CLARIFICATION</h1>
        <p className="text-xl text-muted-foreground">
          Use the correct function with only 2 parameters
        </p>
      </div>

      <Card className="border-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Wrong Function Detected
          </CardTitle>
          <CardDescription>
            You're looking at a function with fee parameters - that's not the standard createPair
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-500 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> The standard Uniswap V2 createPair function only takes 2 parameters: tokenA and tokenB. 
              The function you're seeing with _feeTo and _feeToSetter parameters is a different function.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-sm font-bold text-red-600 mb-2">WRONG FUNCTION</div>
              <div className="text-xs font-mono bg-white p-2 rounded border">
                createPair(tokenA, tokenB, _feeTo, _feeToSetter)
              </div>
              <div className="text-xs text-muted-foreground mt-1">4 parameters - NOT standard Uniswap V2</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm font-bold text-green-600 mb-2">CORRECT FUNCTION</div>
              <div className="text-xs font-mono bg-white p-2 rounded border">
                createPair(tokenA, tokenB)
              </div>
              <div className="text-xs text-muted-foreground mt-1">2 parameters - Standard Uniswap V2</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Correct Parameters for createPair
          </CardTitle>
          <CardDescription>
            Use ONLY these 2 parameters in the standard createPair function
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Parameter 1: tokenA</div>
              <div className="flex items-center gap-2">
                <div className="font-mono text-xs bg-white p-2 rounded border flex-1">
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
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold mb-2">Parameter 2: tokenB</div>
              <div className="flex items-center gap-2">
                <div className="font-mono text-xs bg-white p-2 rounded border flex-1">
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
            </div>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>That's it!</strong> The createPair function only needs these 2 token addresses. 
              Fee settings are managed separately by the factory contract.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Find the Correct Function</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <div className="font-medium">Scroll through the Write Contract functions</div>
                <div className="text-sm text-muted-foreground">Look for the function labeled just "createPair"</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <div className="font-medium">Verify it has only 2 parameters</div>
                <div className="text-sm text-muted-foreground">tokenA (address) and tokenB (address)</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <div className="font-medium">Ignore functions with fee parameters</div>
                <div className="text-sm text-muted-foreground">Those are for different contract types or custom implementations</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Ready for Execution</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-lg font-medium">
            Find the standard createPair function with 2 parameters only
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
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
              Open Factory Contract
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Look for the createPair function with exactly 2 address parameters
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why This Matters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              The Uniswap V2 Factory contract has a standard createPair function that only requires the two token addresses. 
              Fee management is handled separately by the factory's governance system.
            </p>
            <p>
              If you're seeing a function with fee parameters, you might be looking at a different contract or 
              a custom implementation. For the standard Uniswap V2 pair creation, use only the 2-parameter version.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}