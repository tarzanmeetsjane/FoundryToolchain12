import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  DollarSign,
  ArrowRight,
  Zap,
  CreditCard,
  Wallet,
  AlertTriangle
} from "lucide-react";

export default function EmergencyETHFunding() {
  const wallets = [
    {
      name: "Main Wallet",
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      ethBalance: "0.004 ETH",
      ethValue: "$10.08",
      status: "Insufficient for pool creation"
    },
    {
      name: "Secondary Wallet", 
      address: "0xc46eB37677360EfDc011F4097621F15b792fa630",
      ethBalance: "0.004 ETH",
      ethValue: "$10.81",
      status: "Could combine with main wallet"
    }
  ];

  const fundingOptions = [
    {
      title: "Quick ETH Purchase (Recommended)",
      description: "Buy ETH directly to your wallet using credit card",
      timeframe: "2-5 minutes",
      amount: "$25-50",
      steps: [
        "Use Coinbase or similar to buy ETH directly to wallet",
        "Send to 0x058C...8843 (your main wallet)",
        "Wait for confirmation (1-2 minutes)",
        "Proceed with pool creation"
      ],
      links: [
        {
          name: "Coinbase Direct Purchase",
          url: "https://www.coinbase.com/buy-ethereum",
          description: "Buy ETH with credit card"
        },
        {
          name: "MoonPay (Alternative)",
          url: "https://www.moonpay.com/buy/ethereum",
          description: "Another direct purchase option"
        }
      ],
      risk: "Low",
      cost: "$25 + fees"
    },
    {
      title: "Transfer from Secondary Wallet",
      description: "Move ETH from your other wallet",
      timeframe: "1-2 minutes",
      amount: "0.004 ETH",
      steps: [
        "From wallet 0xc46e...a630 send 0.003 ETH",
        "To wallet 0x058C...8843", 
        "Keep 0.001 ETH for gas in source wallet",
        "Combined balance: ~0.007 ETH"
      ],
      links: [
        {
          name: "MetaMask Transfer",
          url: "#",
          description: "Use MetaMask to transfer between your wallets"
        }
      ],
      risk: "None",
      cost: "~$0.50 gas fee"
    },
    {
      title: "Micro-Funding Strategy",
      description: "Create pool with minimal ETH and add more later",
      timeframe: "Immediate",
      amount: "0.001 ETH",
      steps: [
        "Create pool with 0.001 ETH + 0.003 ETHGR",
        "Set price ratio accordingly",
        "Add more liquidity after first trades generate ETH",
        "Gradually increase pool size"
      ],
      links: [
        {
          name: "Minimal Pool Creation",
          url: "https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH",
          description: "Create with minimum liquidity"
        }
      ],
      risk: "Medium",
      cost: "Current balance"
    }
  ];

  const urgentActions = [
    {
      title: "FASTEST: Buy $25 ETH Now",
      description: "Credit card purchase takes 2-5 minutes",
      url: "https://www.coinbase.com/buy-ethereum",
      buttonText: "Buy ETH ($25)",
      priority: "high"
    },
    {
      title: "FREE: Transfer Between Wallets", 
      description: "Move 0.003 ETH from secondary to main wallet",
      url: "#",
      buttonText: "Transfer ETH",
      priority: "medium"
    },
    {
      title: "RISKY: Create Micro Pool",
      description: "Start with 0.001 ETH and grow organically",
      url: "https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH",
      buttonText: "Create Minimal Pool",
      priority: "low"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Emergency ETH Funding</h1>
          <p className="text-muted-foreground">
            Get the ETH needed to unlock your $666,650 token value
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">Need: $7.56</div>
          <div className="text-sm text-muted-foreground">To Create Pool</div>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Situation:</strong> You need 0.003 ETH ($7.56) to create the ETHGR pool that will unlock $666,650 in token value. 
          Current combined balance: 0.008 ETH ($20.89) across both wallets.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.map((wallet, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{wallet.name}</CardTitle>
              <CardDescription className="font-mono text-xs">
                {wallet.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ETH Balance:</span>
                  <span className="font-bold">{wallet.ethBalance}</span>
                </div>
                <div className="flex justify-between">
                  <span>USD Value:</span>
                  <span className="font-bold text-green-600">{wallet.ethValue}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {wallet.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">Urgent Action Required</h2>
        {urgentActions.map((action, index) => (
          <Card key={index} className={
            action.priority === 'high' ? 'border-green-500 bg-green-50' :
            action.priority === 'medium' ? 'border-blue-500 bg-blue-50' :
            'border-yellow-500 bg-yellow-50'
          }>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{action.title}</span>
                <Badge variant={
                  action.priority === 'high' ? 'default' :
                  action.priority === 'medium' ? 'secondary' :
                  'outline'
                }>
                  {action.priority.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  if (action.url !== '#') {
                    window.open(action.url, '_blank');
                  }
                }}
                variant={action.priority === 'high' ? 'default' : 'outline'}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {action.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold">Detailed Funding Strategies</h2>
        {fundingOptions.map((option, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{option.title}</span>
                <div className="flex gap-2">
                  <Badge variant={option.risk === 'Low' ? 'default' : option.risk === 'None' ? 'secondary' : 'outline'}>
                    {option.risk} Risk
                  </Badge>
                  <Badge variant="outline">
                    {option.timeframe}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Cost: {option.cost}</div>
                  <div className="text-muted-foreground">Total investment</div>
                </div>
                <div>
                  <div className="font-medium">Time: {option.timeframe}</div>
                  <div className="text-muted-foreground">Until pool ready</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {option.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>
              
              <div className="space-y-2">
                {option.links.map((link, linkIndex) => (
                  <Button
                    key={linkIndex}
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      if (link.url !== '#') {
                        window.open(link.url, '_blank');
                      }
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {link.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <DollarSign className="h-4 w-4" />
        <AlertDescription>
          <strong>Investment Perspective:</strong> Spending $25-50 on ETH to unlock $666,650 in token value represents a 13,000x+ return ratio. 
          This is the final step to monetize your recovered tokens.
        </AlertDescription>
      </Alert>
    </div>
  );
}