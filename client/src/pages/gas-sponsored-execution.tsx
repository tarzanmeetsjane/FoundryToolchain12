import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  Wallet,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  DollarSign
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function GasSponsoredExecution() {
  const [sponsorshipMethod, setSponsorshipMethod] = useState<string | null>(null);
  const TARGET_WALLET = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";

  // Check current ETH balance
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
  const needsGasSponsorship = ethAmount < 0.003;

  const gasSponsorshipOptions = [
    {
      id: "gelato",
      name: "Gelato Network",
      description: "Automated gas sponsorship for DeFi transactions",
      url: "https://app.gelato.network/",
      supported: true,
      estimatedCost: "Free for qualifying DeFi transactions"
    },
    {
      id: "biconomy",
      name: "Biconomy Gasless",
      description: "Meta-transaction relay service",
      url: "https://www.biconomy.io/",
      supported: true,
      estimatedCost: "Sponsored by protocol"
    },
    {
      id: "opengsn",
      name: "OpenGSN Relay",
      description: "Decentralized gas relay network",
      url: "https://opengsn.org/",
      supported: true,
      estimatedCost: "Pay with tokens instead of ETH"
    }
  ];

  const executeWithGasRelay = async () => {
    try {
      // Call our gas relay service
      const response = await fetch('/api/gas-relay/execute-migration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: TARGET_WALLET,
          tokenA: "0xd9145CCE52D386f254917e481eB44e9943F39138",
          tokenB: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247"
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Gas-sponsored transaction initiated: ${result.transactionHash}`);
      } else {
        throw new Error('Gas relay service unavailable');
      }
    } catch (error) {
      console.error('Gas relay error:', error);
      alert('Gas relay service currently unavailable. Try alternative methods.');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⛽</div>
        <h1 className="text-4xl font-bold">GAS SPONSORSHIP SOLUTION</h1>
        <p className="text-xl text-muted-foreground">
          Execute transactions without sufficient ETH balance
        </p>
      </div>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Current Gas Situation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{ethAmount.toFixed(6)}</div>
              <div className="text-sm text-muted-foreground">Current ETH</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">~0.003</div>
              <div className="text-sm text-muted-foreground">Required ETH</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {needsGasSponsorship ? "Insufficient" : "Sufficient"}
              </div>
              <div className="text-sm text-muted-foreground">Gas Status</div>
            </div>
          </div>

          {needsGasSponsorship && (
            <Alert className="border-orange-500 bg-orange-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Insufficient ETH for gas fees. Gas sponsorship recommended for transaction execution.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Gas Relay Service (Recommended)
          </CardTitle>
          <CardDescription>
            Use our integrated gas relay for immediate execution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Sponsored Execution:</strong> Our gas relay service can execute the createPair transaction using sponsored gas fees.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-medium mb-2">Benefits</div>
              <ul className="text-sm space-y-1">
                <li>• No ETH required from your wallet</li>
                <li>• Immediate transaction execution</li>
                <li>• Same result as direct execution</li>
                <li>• No additional setup needed</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium mb-2">How It Works</div>
              <ul className="text-sm space-y-1">
                <li>• Signs transaction with your permission</li>
                <li>• Relay service pays gas fees</li>
                <li>• Creates ETHG/ETHGR pair normally</li>
                <li>• You maintain full ownership</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={executeWithGasRelay}
            >
              <Zap className="h-4 w-4 mr-2" />
              Execute with Gas Sponsorship
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alternative Gas Solutions</CardTitle>
          <CardDescription>
            External gas sponsorship services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {gasSponsorshipOptions.map((option) => (
            <div key={option.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{option.name}</div>
                <Badge variant={option.supported ? "default" : "outline"}>
                  {option.supported ? "Available" : "Limited"}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-3">
                {option.description}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Cost: {option.estimatedCost}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(option.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token-Based Gas Payment</CardTitle>
          <CardDescription>
            Use your ETHG/ETHGR tokens to pay for gas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-500 bg-blue-50">
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
              <strong>Alternative:</strong> Some services allow paying gas fees using ERC-20 tokens instead of ETH. Your ETHG tokens might be accepted.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">2,100,000</div>
              <div className="text-sm text-muted-foreground">ETHG Available</div>
              <div className="text-xs mt-1">Value: ~$700,000</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">1,990,000</div>
              <div className="text-sm text-muted-foreground">ETHGR Available</div>
              <div className="text-xs mt-1">Value: ~$666,650</div>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => window.open('https://1inch.io/gas-refuel/', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Explore Token Gas Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Proceed with Execution</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-lg font-medium">
            Choose your preferred gas solution to create the ETHG/ETHGR pair
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={executeWithGasRelay}
            >
              Use Gas Relay Service
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/execution-status', '_self')}
            >
              <Wallet className="h-4 w-4 mr-2" />
              Check Execution Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}