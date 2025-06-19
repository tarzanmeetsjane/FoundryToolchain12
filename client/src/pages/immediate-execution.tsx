import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ExternalLink,
  Copy,
  Target,
  CheckCircle
} from "lucide-react";

export default function ImmediateExecution() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">EXECUTE POOL CREATION</h1>
        <p className="text-xl text-muted-foreground">
          Direct execution with exact parameters
        </p>
      </div>

      <Alert className="border-green-500 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Ready:</strong> Wallet has 0.006 ETH ($15.92) - sufficient for all three steps
        </AlertDescription>
      </Alert>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>STEP 1: Approve ETHGR Tokens</CardTitle>
          <CardDescription>Allow Uniswap Router to spend your tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Function</Label>
              <Badge variant="outline">approve</Badge>
            </div>
            <div>
              <Label>Gas Cost</Label>
              <span className="text-sm">~$0.60</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label>spender (address)</Label>
              <div className="flex gap-2">
                <Input 
                  value="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div>
              <Label>amount (uint256)</Label>
              <div className="flex gap-2">
                <Input 
                  value="9000000000000000000000" 
                  readOnly 
                  className="font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard("9000000000000000000000")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => window.open('https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247#writeContract', '_blank')}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            EXECUTE STEP 1
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>STEP 2: Create Pair</CardTitle>
          <CardDescription>Execute after Step 1 confirms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label>tokenA</Label>
              <Input 
                value="0xfA7b8c553C48C56ec7027d26ae95b029a2abF247" 
                readOnly 
                className="font-mono text-xs"
              />
            </div>
            <div>
              <Label>tokenB</Label>
              <Input 
                value="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" 
                readOnly 
                className="font-mono text-xs"
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Factory Contract
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>STEP 3: Add Liquidity</CardTitle>
          <CardDescription>Final step - send 0.003 ETH with transaction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>token: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247</div>
            <div>amountTokenDesired: 9000000000000000000000</div>
            <div>amountTokenMin: 8550000000000000000000</div>
            <div>amountETHMin: 2850000000000000000</div>
            <div>to: YOUR_WALLET_ADDRESS</div>
            <div>deadline: 1750400000</div>
          </div>

          <Alert>
            <Target className="h-4 w-4" />
            <AlertDescription>
              <strong>ETH Value:</strong> Send 0.003 ETH with this transaction
            </AlertDescription>
          </Alert>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open('https://etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D#writeContract', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Router Contract
          </Button>
        </CardContent>
      </Card>

      <Alert className="border-blue-500 bg-blue-50">
        <AlertDescription>
          <strong>Execution Order:</strong> Complete Step 1, wait for confirmation, then proceed to Step 2, then Step 3. Your pool will be live after Step 3 completes.
        </AlertDescription>
      </Alert>
    </div>
  );
}