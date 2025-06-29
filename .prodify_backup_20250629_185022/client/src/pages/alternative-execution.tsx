import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  ExternalLink,
  Copy,
  CreditCard,
  Wallet,
  DollarSign
} from "lucide-react";

export default function AlternativeExecution() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  const ETHG_TOKEN = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const ETHGR_TOKEN = "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247";

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
  };

  const executionMethods = [
    {
      id: "minimal-eth",
      title: "Buy Minimal ETH",
      description: "Purchase just 0.003 ETH (~$8) for gas fees",
      icon: <CreditCard className="h-5 w-5" />,
      cost: "$8-12",
      time: "5 minutes",
      steps: [
        "Visit Coinbase or Binance",
        "Buy $12 worth of ETH",
        "Send to your wallet",
        "Execute createPair directly"
      ],
      action: () => window.open('https://www.coinbase.com/price/ethereum', '_blank')
    },
    {
      id: "gas-station",
      title: "Gas Station Network",
      description: "Use GSN relay for gasless transactions",
      icon: <Zap className="h-5 w-5" />,
      cost: "Free",
      time: "10 minutes",
      steps: [
        "Connect to OpenGSN relay",
        "Sign meta-transaction",
        "Relay executes with sponsored gas",
        "Pair created without ETH requirement"
      ],
      action: () => window.open('https://opengsn.org/', '_blank')
    },
    {
      id: "token-swap",
      title: "Token-to-ETH Conversion",
      description: "Convert small ETHG amount to ETH for gas",
      icon: <DollarSign className="h-5 w-5" />,
      cost: "~100 ETHG tokens",
      time: "15 minutes",
      steps: [
        "Use DEX aggregator (1inch)",
        "Swap 100 ETHG tokens for ETH",
        "Receive ~$35 worth of ETH",
        "Execute createPair with obtained ETH"
      ],
      action: () => window.open('https://app.1inch.io/', '_blank')
    },
    {
      id: "flashloan",
      title: "Flash Loan Execution",
      description: "Borrow ETH, execute, repay in same transaction",
      icon: <Wallet className="h-5 w-5" />,
      cost: "0.1% fee",
      time: "Advanced",
      steps: [
        "Use Aave flash loan",
        "Borrow ETH for gas",
        "Execute createPair",
        "Repay loan + fee"
      ],
      action: () => window.open('https://aave.com/', '_blank')
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h1 className="text-4xl font-bold">ALTERNATIVE EXECUTION METHODS</h1>
        <p className="text-xl text-muted-foreground">
          Multiple ways to execute createPair without sufficient ETH
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Zap className="h-4 w-4" />
        <AlertDescription>
          <strong>Current Situation:</strong> You need ~0.003 ETH ($8-12) for gas fees to create the ETHG/ETHGR pair. Here are practical solutions.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {executionMethods.map((method) => (
          <Card key={method.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {method.icon}
                {method.title}
              </CardTitle>
              <CardDescription>{method.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="font-bold text-green-600">{method.cost}</div>
                  <div className="text-xs text-muted-foreground">Cost</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-600">{method.time}</div>
                  <div className="text-xs text-muted-foreground">Time</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Steps:</div>
                {method.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={method.action}
                variant={method.id === "minimal-eth" ? "default" : "outline"}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {method.id === "minimal-eth" ? "Buy ETH Now (Recommended)" : "Learn More"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500">
        <CardHeader>
          <CardTitle>FASTEST SOLUTION: Buy Minimal ETH</CardTitle>
          <CardDescription>
            Recommended approach for immediate execution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">$8-12</div>
              <div className="text-sm text-muted-foreground">Total Cost</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">5 min</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <CreditCard className="h-4 w-4" />
            <AlertDescription>
              <strong>Quick Purchase:</strong> Buy $12 worth of ETH on Coinbase, send to your wallet (0x058C...843), then execute createPair directly on Etherscan.
            </AlertDescription>
          </Alert>

          <div className="text-center space-y-4">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => window.open('https://www.coinbase.com/price/ethereum', '_blank')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Buy ETH on Coinbase
            </Button>
            
            <div className="text-sm text-muted-foreground">
              After purchase, return to execute createPair with your ETH balance
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Parameters Ready</CardTitle>
          <CardDescription>
            Copy these addresses for createPair execution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenA (ETHG)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {ETHG_TOKEN}
              </div>
              <Button size="sm" variant="ghost" onClick={() => copyText(ETHG_TOKEN)}>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm font-bold mb-2">tokenB (ETHGR)</div>
              <div className="font-mono text-xs bg-white p-2 rounded border mb-2 break-all">
                {ETHGR_TOKEN}
              </div>
              <Button size="sm" variant="ghost" onClick={() => copyText(ETHGR_TOKEN)}>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => copyText(`${ETHG_TOKEN}\n${ETHGR_TOKEN}`)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Both Addresses
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500">
        <CardHeader>
          <CardTitle>After Getting ETH</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-lg">
            Once you have ETH in your wallet, proceed to execute createPair
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#writeContract', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Execute on Etherscan
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/execution-status', '_self')}
            >
              Track Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}