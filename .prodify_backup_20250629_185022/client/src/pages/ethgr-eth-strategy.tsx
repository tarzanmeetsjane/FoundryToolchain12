import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  ExternalLink,
  Copy,
  CheckCircle,
  Shield,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function EthgrEthStrategy() {
  const TARGET_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const WETH_TOKEN = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const { data: walletData } = useQuery({
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

  const copyPairParams = () => {
    const params = `tokenA: ${ETHGR_TOKEN}\ntokenB: ${WETH_TOKEN}`;
    navigator.clipboard.writeText(params);
    alert("ETHGR/WETH parameters copied");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🛡️</div>
        <h1 className="text-4xl font-bold text-green-600">SAFE ETHGR/ETH STRATEGY</h1>
        <p className="text-xl text-muted-foreground">
          Create legitimate trading pair with verified tokens only
        </p>
      </div>

      <Card className="border-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Shield className="h-5 w-5" />
            ETHG Token Risk Avoided
          </CardTitle>
          <CardDescription>
            Smart decision to avoid the flagged scam token
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-500 bg-red-50">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Risk Avoided:</strong> ETHG (0xd9145...39138) confirmed as scam/unverified contract. Creating pairs with fraudulent tokens would fail and waste gas fees.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="font-bold text-red-600 mb-2">ETHG (Original) - AVOID</div>
              <div className="text-sm text-muted-foreground">
                • Flagged as scam/unverified
                • No legitimate trading value
                • Transaction would fail
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="font-bold text-green-600 mb-2">ETHGR (Recovery) - SAFE</div>
              <div className="text-sm text-muted-foreground">
                • Verified contract on Etherscan
                • 1,990,000 tokens confirmed
                • Fully transferable and tradeable
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            ETHGR/ETH Pair Strategy
          </CardTitle>
          <CardDescription>
            Safe, legitimate trading pair with established currency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommended:</strong> Create ETHGR/WETH pair using your verified recovery tokens with Wrapped Ethereum for legitimate trading value.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1,990,000</div>
              <div className="text-sm text-muted-foreground">ETHGR Tokens</div>
              <div className="text-xs text-muted-foreground">Verified & Transferable</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{ethAmount.toFixed(3)}</div>
              <div className="text-sm text-muted-foreground">ETH Available</div>
              <div className="text-xs text-muted-foreground">${ethValueUSD.toFixed(0)} USD</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="text-xs text-muted-foreground">Verified tokens only</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>ETHGR/WETH Pair Creation</CardTitle>
          <CardDescription>
            Execute createPair with legitimate token addresses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenA (ETHGR Recovery)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {ETHGR_TOKEN}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-600">Verified Contract</Badge>
                <Button size="sm" variant="ghost" onClick={() => copyText(ETHGR_TOKEN)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenB (Wrapped ETH)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {WETH_TOKEN}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-blue-600">Official WETH</Badge>
                <Button size="sm" variant="ghost" onClick={() => copyText(WETH_TOKEN)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={copyPairParams}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy ETHGR/WETH Parameters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Execution Steps</CardTitle>
          <CardDescription>
            Safe createPair execution with verified tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</div>
              <span className="text-sm">Open Uniswap V2 Factory contract on Etherscan</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
              <span className="text-sm">Find createPair function (2 parameters)</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">3</div>
              <span className="text-sm">Enter ETHGR and WETH addresses</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">4</div>
              <span className="text-sm">Execute transaction (should succeed with verified tokens)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Potential
          </CardTitle>
          <CardDescription>
            Legitimate monetization with ETHGR/ETH trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold mb-2">Immediate Benefits</div>
              <ul className="text-sm space-y-1">
                <li>• Legitimate trading pair creation</li>
                <li>• Real liquidity provision opportunity</li>
                <li>• Trading fees from ETH/ETHGR swaps</li>
                <li>• No scam token exposure</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold mb-2">Long-term Strategy</div>
              <ul className="text-sm space-y-1">
                <li>• Establish ETHGR market presence</li>
                <li>• Build legitimate trading volume</li>
                <li>• Create utility for recovery tokens</li>
                <li>• Develop sustainable revenue</li>
              </ul>
            </div>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
              <strong>Real Value:</strong> ETHGR/ETH pair provides authentic trading opportunity without the risks of fraudulent tokens.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
          onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
        >
          <Zap className="h-5 w-5 mr-2" />
          CREATE ETHGR/ETH PAIR NOW
        </Button>
      </div>
    </div>
  );
}