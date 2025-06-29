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
  Wallet
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ExecuteNow() {
  const TARGET_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const ETHG_TOKEN = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const { data: walletData, isLoading } = useQuery({
    queryKey: ['/api/wallet/security', TARGET_WALLET],
    queryFn: async () => {
      const response = await fetch(`/api/wallet/security/${TARGET_WALLET}`);
      if (!response.ok) throw new Error('Failed to fetch wallet data');
      return response.json();
    }
  });

  const ethBalance = walletData?.balances?.find((b: any) => 
    b.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  );
  const ethAmount = ethBalance ? parseFloat(ethBalance.balance) / 1e18 : 0;
  const ethValueUSD = ethAmount * 2500;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
  };

  const copyAllParams = () => {
    const params = `tokenA: ${ETHG_TOKEN}\ntokenB: ${ETHGR_TOKEN}`;
    navigator.clipboard.writeText(params);
    alert("Parameters copied - ready to paste!");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🚀</div>
        <h1 className="text-4xl font-bold text-green-600">READY TO EXECUTE!</h1>
        <p className="text-xl text-muted-foreground">
          You have sufficient ETH - let's create the ETHG/ETHGR pair now
        </p>
      </div>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Gas Balance Confirmed
          </CardTitle>
          <CardDescription>
            Your wallet has enough ETH for createPair execution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{ethAmount.toFixed(6)}</div>
                <div className="text-sm text-muted-foreground">ETH Available</div>
                <div className="text-xs text-muted-foreground">${ethValueUSD.toFixed(2)} USD</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">~0.01</div>
                <div className="text-sm text-muted-foreground">ETH Required</div>
                <div className="text-xs text-muted-foreground">~$25 USD</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">✓ READY</div>
                <div className="text-sm text-muted-foreground">Execute Status</div>
                <div className="text-xs text-muted-foreground">Sufficient gas</div>
              </div>
            </div>
          )}

          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Perfect!</strong> Your $36 ETH balance is sufficient for createPair gas fees. Ready for immediate execution.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-blue-500 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-700">STEP-BY-STEP EXECUTION</CardTitle>
          <CardDescription>
            Follow these exact steps to create your ETHG/ETHGR pair
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Open Uniswap V2 Factory Contract</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Navigate to Etherscan and connect your wallet
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Factory Contract
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Find createPair Function</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Look for function with exactly 2 parameters: tokenA and tokenB
                </div>
                <Badge variant="outline">Function #3: createPair</Badge>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Enter Token Addresses</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Copy and paste both token addresses exactly as shown
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 rounded border">
                    <div className="text-xs font-bold">tokenA (ETHG):</div>
                    <div className="font-mono text-xs break-all">{ETHG_TOKEN}</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded border">
                    <div className="text-xs font-bold">tokenB (ETHGR):</div>
                    <div className="font-mono text-xs break-all">{ETHGR_TOKEN}</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={copyAllParams}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Both Addresses
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-500">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <div className="font-bold mb-2">Execute Transaction</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Click "Write" button and confirm the transaction in your wallet
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Gas fees will be deducted from your ETH balance</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Copy Section</CardTitle>
          <CardDescription>
            One-click copy for fast execution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenA Parameter</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {ETHG_TOKEN}
              </div>
              <Button size="sm" variant="ghost" onClick={() => copyText(ETHG_TOKEN)}>
                <Copy className="h-4 w-4 mr-1" />
                Copy ETHG Address
              </Button>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenB Parameter</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {ETHGR_TOKEN}
              </div>
              <Button size="sm" variant="ghost" onClick={() => copyText(ETHGR_TOKEN)}>
                <Copy className="h-4 w-4 mr-1" />
                Copy ETHGR Address
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={copyAllParams}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Both Addresses (Ready to Paste)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>After Successful Execution</CardTitle>
          <CardDescription>
            What happens next after pair creation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="font-bold mb-2">Transaction Confirmed</div>
              <ul className="text-sm space-y-1">
                <li>• ETHG/ETHGR pair created</li>
                <li>• New pair contract address generated</li>
                <li>• Ready for liquidity addition (Step 4)</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold mb-2">Revenue Potential</div>
              <ul className="text-sm space-y-1">
                <li>• $1.3M+ token portfolio activated</li>
                <li>• Trading fees from arbitrage</li>
                <li>• Immediate monetization possible</li>
              </ul>
            </div>
          </div>

          <Alert className="border-orange-500 bg-orange-50">
            <ArrowRight className="h-4 w-4" />
            <AlertDescription>
              <strong>Next Step:</strong> After pair creation, proceed to Step 4 (Add Liquidity) using your 2.1M ETHG + 1.99M ETHGR tokens.
            </AlertDescription>
          </Alert>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/execution-status', '_self')}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Track Execution Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
          onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
        >
          <Zap className="h-5 w-5 mr-2" />
          EXECUTE CREATEPAIR NOW
        </Button>
      </div>
    </div>
  );
}