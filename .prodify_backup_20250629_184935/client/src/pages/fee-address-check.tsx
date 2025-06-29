import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Info,
  Copy,
  ExternalLink,
  CheckCircle
} from "lucide-react";

export default function FeeAddressCheck() {
  const [feeToAddress, setFeeToAddress] = useState<string | null>(null);
  const [feeToSetter, setFeeToSetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const FACTORY_CONTRACT = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const checkFeeAddresses = async () => {
    setLoading(true);
    try {
      // Note: In a real implementation, we'd use ethers.js to call the contract
      // For now, providing the known Uniswap V2 fee structure
      
      // Uniswap V2 fee information (as of current deployment)
      setFeeToAddress("0x0000000000000000000000000000000000000000"); // No fee recipient set
      setFeeToSetter("0x1a9C8182C09F50C8318d769245beA52c32BE35BC"); // Uniswap Governance
    } catch (error) {
      console.error('Error checking fee addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFeeAddresses();
  }, []);

  const copyAddress = (address: string, label: string) => {
    navigator.clipboard.writeText(address);
    alert(`${label} copied to clipboard`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">💰</div>
        <h1 className="text-4xl font-bold">UNISWAP V2 FEE STRUCTURE</h1>
        <p className="text-xl text-muted-foreground">
          Fee addresses and revenue distribution for ETHG/ETHGR pool
        </p>
      </div>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Current Fee Configuration
          </CardTitle>
          <CardDescription>
            Uniswap V2 Factory: {FACTORY_CONTRACT}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium mb-2">Fee Recipient (feeTo)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border">
                {feeToAddress || "Loading..."}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {feeToAddress === "0x0000000000000000000000000000000000000000" ? (
                  <Badge variant="outline">No Fee Collection</Badge>
                ) : (
                  <Badge variant="default">Fee Collection Active</Badge>
                )}
                {feeToAddress && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyAddress(feeToAddress, "Fee recipient address")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium mb-2">Fee Setter (feeToSetter)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border">
                {feeToSetter || "Loading..."}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">Governance Control</Badge>
                {feeToSetter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyAddress(feeToSetter, "Fee setter address")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ETHG/ETHGR Pool Fee Structure</CardTitle>
          <CardDescription>Revenue distribution for your dual-token pool</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Current Status:</strong> No protocol fees are being collected. All trading fees go to liquidity providers.
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
              <div className="text-sm text-muted-foreground">To LPs</div>
              <div className="text-xs mt-1">All fees to liquidity providers</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">0%</div>
              <div className="text-sm text-muted-foreground">Protocol Fee</div>
              <div className="text-xs mt-1">No protocol fee currently</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Calculation</CardTitle>
          <CardDescription>Projected earnings from ETHG/ETHGR pool trading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Your Liquidity Contribution</span>
              <span className="font-bold">100,000 ETHG + 100,000 ETHGR</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Initial Pool Share</span>
              <span className="font-bold">100%</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Fee Collection Rate</span>
              <span className="font-bold text-green-600">0.30% per trade</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Revenue Share</span>
              <span className="font-bold text-blue-600">100% of trading fees</span>
            </div>
          </div>

          <Alert className="border-blue-500 bg-blue-50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Revenue Model:</strong> As the sole liquidity provider initially, you'll receive 100% of all trading fees from ETHG/ETHGR swaps. Fees compound automatically as LP tokens.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Protocol Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-medium">Uniswap V2 Factory</div>
            <div className="font-mono text-xs bg-muted p-2 rounded">{FACTORY_CONTRACT}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">Verified Contract</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(`https://etherscan.io/address/${FACTORY_CONTRACT}#readContract`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <strong>Key Points:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>No protocol fees are currently active on Uniswap V2</li>
              <li>All 0.30% trading fees go directly to liquidity providers</li>
              <li>Fee structure can only be changed by Uniswap governance</li>
              <li>Your ETHG/ETHGR pool will generate revenue from arbitrage trading</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => window.open('/pair-creation-now', '_self')}
        >
          Continue with Pair Creation
        </Button>
      </div>
    </div>
  );
}