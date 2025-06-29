import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

export default function PairExistenceCheck() {
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const ETHG_TOKEN = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";
  const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const checkPairExists = async () => {
    setChecking(true);
    setResult(null);

    try {
      // Check if pair already exists using getPair function
      const response = await fetch('/api/uniswap/pools/' + ETHG_TOKEN);
      
      if (response.ok) {
        const data = await response.json();
        setResult({
          exists: data.pairAddress !== "0x0000000000000000000000000000000000000000",
          pairAddress: data.pairAddress,
          status: data.exists ? "exists" : "not_found"
        });
      } else {
        // Manual check using contract call
        const checkResponse = await fetch('/api/etherscan/contract/' + FACTORY_ADDRESS);
        setResult({
          exists: false,
          status: "manual_check_needed",
          message: "Need to verify pair existence manually"
        });
      }
    } catch (error) {
      setResult({
        exists: false,
        status: "error",
        message: "Could not verify pair existence"
      });
    }

    setChecking(false);
  };

  const getAlternativeSolutions = () => {
    if (!result) return [];

    if (result.exists) {
      return [
        {
          title: "Pair Already Exists",
          description: "Skip createPair and go directly to Add Liquidity",
          action: "Use existing pair address for liquidity addition",
          severity: "info"
        }
      ];
    }

    return [
      {
        title: "Check Token Addresses",
        description: "Verify both ETHG and ETHGR addresses are correct",
        action: "Double-check contract addresses on Etherscan",
        severity: "warning"
      },
      {
        title: "Try Different Ordering",
        description: "Swap tokenA and tokenB parameters",
        action: "Use ETHGR as tokenA and ETHG as tokenB",
        severity: "info"
      },
      {
        title: "Check Network Congestion",
        description: "High gas prices might cause simulation failure",
        action: "Wait for lower network activity or increase gas",
        severity: "warning"
      }
    ];
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🔍</div>
        <h1 className="text-4xl font-bold">PAIR EXISTENCE CHECK</h1>
        <p className="text-xl text-muted-foreground">
          Verify why createPair transaction might fail
        </p>
      </div>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Transaction Failure Warning
          </CardTitle>
          <CardDescription>
            MetaMask detected this transaction is likely to fail
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-500 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> "This transaction is likely to fail" usually means the ETHG/ETHGR pair already exists or there's an address issue.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="font-bold text-red-600 mb-2">Don't Execute</div>
              <div className="text-sm">
                Executing a failing transaction wastes your $28 gas fees without creating the pair.
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold text-blue-600 mb-2">Check First</div>
              <div className="text-sm">
                Verify if the pair already exists before attempting creation.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pair Existence Verification</CardTitle>
          <CardDescription>
            Check if ETHG/ETHGR pair already exists on Uniswap V2
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold">Token A (ETHG)</div>
              <div className="font-mono text-xs break-all">{ETHG_TOKEN}</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-bold">Token B (ETHGR)</div>
              <div className="font-mono text-xs break-all">{ETHGR_TOKEN}</div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={checkPairExists}
              disabled={checking}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {checking ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Check Pair Existence
            </Button>
          </div>

          {result && (
            <div className="mt-6">
              {result.exists ? (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pair Exists!</strong> ETHG/ETHGR pair is already created at address: {result.pairAddress}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-yellow-500 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pair Not Found:</strong> {result.message || "ETHG/ETHGR pair does not exist yet"}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getAlternativeSolutions().map((solution, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                solution.severity === 'info' ? 'bg-blue-50 border-blue-500' :
                solution.severity === 'warning' ? 'bg-orange-50 border-orange-500' :
                'bg-gray-50 border-gray-500'
              }`}>
                <div className="font-bold mb-2">{solution.title}</div>
                <div className="text-sm text-muted-foreground mb-2">{solution.description}</div>
                <div className="text-sm font-medium">{solution.action}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Manual Verification</CardTitle>
          <CardDescription>
            Check pair existence directly on Etherscan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            Use the getPair function on Uniswap V2 Factory to check if the pair exists
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#readContract', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Check on Factory Contract
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.open('https://v2.info.uniswap.org/pairs', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse Uniswap V2 Pairs
            </Button>
          </div>

          <Alert className="border-blue-500 bg-blue-50">
            <Search className="h-4 w-4" />
            <AlertDescription>
              <strong>Manual Check:</strong> On Etherscan Factory contract, use getPair function with both token addresses to see if it returns a valid pair address (not 0x000...000).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {result?.exists && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-green-600">Skip to Add Liquidity</CardTitle>
            <CardDescription>
              Pair exists - proceed directly to Step 4
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-lg">
              Since the ETHG/ETHGR pair already exists, skip createPair and go directly to adding liquidity with your tokens.
            </div>
            
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.open('/execution-status', '_self')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Proceed to Add Liquidity
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}