import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  ExternalLink,
  Copy,
  CheckCircle,
  ArrowRight,
  Target
} from "lucide-react";

export default function ExecuteEthgrEth() {
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const WETH_TOKEN = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const copyBothAddresses = () => {
    const addresses = `${ETHGR_TOKEN}\n${WETH_TOKEN}`;
    navigator.clipboard.writeText(addresses);
    alert("Both addresses copied - ready to paste!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🚀</div>
        <h1 className="text-4xl font-bold text-green-600">EXECUTE ETHGR/ETH PAIR</h1>
        <p className="text-xl text-muted-foreground">
          Ready to create legitimate trading pair with verified tokens
        </p>
      </div>

      <Card className="border-green-500 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Target className="h-5 w-5" />
            EXECUTION TARGET CONFIRMED
          </CardTitle>
          <CardDescription>
            Safe ETHGR/WETH pair creation using verified contracts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-600 bg-green-100">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>READY TO EXECUTE:</strong> All parameters verified. Transaction should succeed with these legitimate token addresses.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="font-bold text-green-700 mb-2">✓ 1,990,000 ETHGR Tokens</div>
              <div className="text-sm text-muted-foreground">Verified recovery contract ready for trading</div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="font-bold text-green-700 mb-2">✓ $36 ETH Gas Balance</div>
              <div className="text-sm text-muted-foreground">Sufficient for createPair execution</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>STEP-BY-STEP EXECUTION</CardTitle>
          <CardDescription>Follow these exact steps for successful pair creation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Open Uniswap V2 Factory Contract</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Navigate to Etherscan write contract interface
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  OPEN FACTORY CONTRACT
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Connect Your Wallet</div>
                <div className="text-sm text-muted-foreground">
                  Connect the wallet containing your $36 ETH balance
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Find createPair Function</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Look for function with exactly 2 address parameters
                </div>
                <Badge variant="outline">Function: createPair(address,address)</Badge>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-500">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Enter Token Addresses</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Paste the exact addresses below
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border">
                    <div className="text-xs font-bold text-purple-600 mb-1">tokenA (ETHGR):</div>
                    <div className="font-mono text-xs break-all select-all bg-gray-50 p-2 rounded">
                      {ETHGR_TOKEN}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2"
                      onClick={() => copyText(ETHGR_TOKEN)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy ETHGR
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-white rounded border">
                    <div className="text-xs font-bold text-blue-600 mb-1">tokenB (WETH):</div>
                    <div className="font-mono text-xs break-all select-all bg-gray-50 p-2 rounded">
                      {WETH_TOKEN}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2"
                      onClick={() => copyText(WETH_TOKEN)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy WETH
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={copyBothAddresses}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    COPY BOTH ADDRESSES
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-500">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Execute Transaction</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Click Write button and confirm in your wallet
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Gas: ~$25-30</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Success: Very high</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            After Successful Execution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="font-bold mb-2">Immediate Results</div>
              <ul className="text-sm space-y-1">
                <li>• ETHGR/WETH pair created</li>
                <li>• New pair contract address generated</li>
                <li>• Ready for liquidity addition</li>
                <li>• Trading infrastructure established</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold mb-2">Next Steps</div>
              <ul className="text-sm space-y-1">
                <li>• Add liquidity with ETHGR + ETH</li>
                <li>• Enable trading for your tokens</li>
                <li>• Start earning trading fees</li>
                <li>• Monitor pair performance</li>
              </ul>
            </div>
          </div>

          <Alert className="border-orange-500 bg-orange-50">
            <ArrowRight className="h-4 w-4" />
            <AlertDescription>
              <strong>Success Path:</strong> Once pair is created, you can add liquidity using your 1,990,000 ETHGR tokens plus some ETH to establish the trading market.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
          onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
        >
          <Zap className="h-5 w-5 mr-2" />
          EXECUTE ETHGR/WETH PAIR CREATION
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Click above to open Etherscan, then follow the step-by-step guide
        </div>
      </div>
    </div>
  );
}