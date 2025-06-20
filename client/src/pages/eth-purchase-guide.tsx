import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard,
  ExternalLink,
  CheckCircle,
  DollarSign,
  Wallet
} from "lucide-react";

export default function EthPurchaseGuide() {
  const currentETH = 0.0144;
  const currentUSD = currentETH * 2500;

  const purchaseOptions = [
    {
      platform: "Coinbase",
      url: "https://www.coinbase.com/price/ethereum",
      fees: "1.49%",
      speed: "Instant",
      minimum: "$2",
      advantages: ["Instant purchase", "Credit/debit cards", "Bank transfer", "Most user-friendly"]
    },
    {
      platform: "Binance",
      url: "https://www.binance.com/en/trade/ETH_USDT",
      fees: "0.1%",
      speed: "5 minutes",
      minimum: "$10",
      advantages: ["Lower fees", "Global access", "Multiple payment methods", "Professional interface"]
    },
    {
      platform: "Kraken",
      url: "https://www.kraken.com/prices/ethereum-eth-price-chart",
      fees: "1.5%",
      speed: "10 minutes",
      minimum: "$5",
      advantages: ["High security", "Advanced features", "Wire transfers", "Established reputation"]
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">💳</div>
        <h1 className="text-4xl font-bold">ETH PURCHASE GUIDE</h1>
        <p className="text-xl text-muted-foreground">
          Quick methods to acquire ETH for gas fees
        </p>
      </div>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Current Balance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentETH}</div>
              <div className="text-sm text-muted-foreground">ETH Available</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">${currentUSD.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">USD Value</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">✓ SUFFICIENT</div>
              <div className="text-sm text-muted-foreground">For createPair</div>
            </div>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your current balance of 0.0144 ETH (~$36) is sufficient for createPair execution (~$25-30 gas cost).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ETH Purchase Platforms</CardTitle>
          <CardDescription>
            If you need additional ETH for future operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {purchaseOptions.map((option, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-lg">{option.platform}</div>
                <Badge variant="outline">{option.fees} fees</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="font-medium text-blue-600">{option.speed}</div>
                  <div className="text-xs text-muted-foreground">Processing Time</div>
                </div>
                
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-medium text-green-600">{option.minimum}</div>
                  <div className="text-xs text-muted-foreground">Minimum Purchase</div>
                </div>
                
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="font-medium text-purple-600">{option.fees}</div>
                  <div className="text-xs text-muted-foreground">Transaction Fee</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Advantages:</div>
                <div className="grid grid-cols-2 gap-1">
                  {option.advantages.map((advantage, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      {advantage}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={index === 0 ? "default" : "outline"}
                className="w-full"
                onClick={() => window.open(option.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {index === 0 ? "Buy on " : "Visit "}{option.platform}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>Purchase Steps</CardTitle>
          <CardDescription>
            General process for buying ETH
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</div>
              <div>
                <div className="font-medium">Create Account</div>
                <div className="text-sm text-muted-foreground">Sign up on chosen platform with email verification</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
              <div>
                <div className="font-medium">Identity Verification</div>
                <div className="text-sm text-muted-foreground">Complete KYC process (usually photo ID required)</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">3</div>
              <div>
                <div className="font-medium">Add Payment Method</div>
                <div className="text-sm text-muted-foreground">Link credit card, debit card, or bank account</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">4</div>
              <div>
                <div className="font-medium">Purchase ETH</div>
                <div className="text-sm text-muted-foreground">Buy desired amount and withdraw to your wallet</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>Alternative Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-bold mb-2">Peer-to-Peer</div>
              <div className="text-sm text-muted-foreground mb-2">
                Buy directly from other users
              </div>
              <Button variant="outline" size="sm" onClick={() => window.open('https://localbitcoins.com/', '_blank')}>
                <ExternalLink className="h-3 w-3 mr-1" />
                LocalBitcoins
              </Button>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-bold mb-2">DEX Aggregators</div>
              <div className="text-sm text-muted-foreground mb-2">
                Swap other tokens for ETH
              </div>
              <Button variant="outline" size="sm" onClick={() => window.open('https://app.1inch.io/', '_blank')}>
                <ExternalLink className="h-3 w-3 mr-1" />
                1inch DEX
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <Alert className="border-green-500 bg-green-50">
          <Wallet className="h-4 w-4" />
          <AlertDescription>
            <strong>Ready to Proceed:</strong> Your current ETH balance is sufficient for createPair execution. Additional purchases only needed for future operations.
          </AlertDescription>
        </Alert>
        
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => window.open('/execute-ethgr-eth', '_self')}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          PROCEED WITH CURRENT BALANCE
        </Button>
      </div>
    </div>
  );
}