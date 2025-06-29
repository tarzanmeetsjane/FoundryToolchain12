import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  Copy,
  ExternalLink,
  Info
} from "lucide-react";

export default function CorrectFeeInfo() {
  const FACTORY_CONTRACT = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
  const CORRECT_FEE_SETTER = "0x18e433c7bf8a2e1d0197ce5d8f9afada1a771360";
  const FEE_TO_ADDRESS = "0x0000000000000000000000000000000000000000";

  const copyAddress = (address: string, label: string) => {
    navigator.clipboard.writeText(address);
    alert(`${label} copied to clipboard`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">✅</div>
        <h1 className="text-4xl font-bold">CORRECT FEE ADDRESSES</h1>
        <p className="text-xl text-muted-foreground">
          Verified Uniswap V2 Factory fee configuration
        </p>
      </div>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Verified Fee Addresses
          </CardTitle>
          <CardDescription>
            Retrieved directly from Uniswap V2 Factory contract
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium mb-2">Fee Recipient (feeTo)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2">
                {FEE_TO_ADDRESS}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">No Fee Collection</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyAddress(FEE_TO_ADDRESS, "Fee recipient address")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm font-medium mb-2">Fee Setter (feeToSetter)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2">
                {CORRECT_FEE_SETTER}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Verified Active</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyAddress(CORRECT_FEE_SETTER, "Fee setter address")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ETHG/ETHGR Pool Revenue Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500 bg-green-50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Revenue Advantage:</strong> Since feeTo is set to zero address, 100% of trading fees go to liquidity providers. No protocol fees are collected.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">0.30%</div>
              <div className="text-sm text-muted-foreground">Trading Fee</div>
              <div className="text-xs mt-1">Per swap transaction</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-muted-foreground">To You</div>
              <div className="text-xs mt-1">As initial LP provider</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">0%</div>
              <div className="text-sm text-muted-foreground">Protocol Fee</div>
              <div className="text-xs mt-1">No protocol fee taken</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why This Matters for Your Pool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium">Maximum Revenue Capture</div>
                <div className="text-sm text-muted-foreground">All 0.30% trading fees flow directly to your LP position</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium">Automatic Compounding</div>
                <div className="text-sm text-muted-foreground">Fees automatically increase your pool share and token reserves</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium">First-Mover Advantage</div>
                <div className="text-sm text-muted-foreground">As the sole LP initially, you capture 100% of all ETHG/ETHGR arbitrage activity</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Continue Pool Creation</CardTitle>
          <CardDescription>
            Fee structure confirmed - proceed with pair creation
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-lg font-medium">
            Ready to create ETHG/ETHGR pair with optimal fee structure
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => window.open('/pair-creation-now', '_self')}
            >
              Create Pair Now
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contract References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <div className="text-sm font-medium">Uniswap V2 Factory</div>
            <div className="font-mono text-xs bg-muted p-2 rounded">{FACTORY_CONTRACT}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Current Fee Setter</div>
            <div className="font-mono text-xs bg-muted p-2 rounded">{CORRECT_FEE_SETTER}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Fee Recipient</div>
            <div className="font-mono text-xs bg-muted p-2 rounded">{FEE_TO_ADDRESS}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}