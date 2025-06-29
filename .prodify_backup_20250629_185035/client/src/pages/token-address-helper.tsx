import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ExternalLink, 
  Copy,
  CheckCircle,
  AlertTriangle,
  Target
} from "lucide-react";

export default function TokenAddressHelper() {
  const [copied, setCopied] = useState<string>("");

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const tokenAddresses = {
    ETHGR: {
      address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      name: "ETHG Recovery",
      status: "Verified & Working",
      balance: "1,990,000 ETHGR",
      useCase: "Primary token for pools"
    },
    ETHG: {
      address: "0xd9145CCE52D386f254917e481eB44e9943F39138", 
      name: "Original ETHG",
      status: "Unverified Contract",
      balance: "2,100,000 ETHG",
      useCase: "May not work in Uniswap"
    }
  };

  const alternativeStrategies = [
    {
      title: "ETHGR/ETH Pool (Recommended)",
      description: "Use your verified ETHGR tokens with ETH",
      url: "https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH",
      requirements: "0.003 ETH + ETHGR tokens",
      advantages: ["Verified contract", "Standard pool", "Immediate functionality"]
    },
    {
      title: "Manual Token Import",
      description: "Import ETHG manually by contract address",
      url: "https://app.uniswap.org/#/swap",
      requirements: "Manual token import process",
      advantages: ["May work with unverified contracts", "Direct approach"]
    },
    {
      title: "Transfer ETH from Secondary Wallet",
      description: "Get more ETH for ETHGR/ETH pool",
      url: "#",
      requirements: "0.003 ETH from wallet 2",
      advantages: ["Uses existing funds", "No purchase needed", "Quick solution"]
    }
  ];

  const manualImportSteps = [
    "Go to Uniswap swap interface",
    "Click 'Select Token' dropdown",
    "Click 'Import Token' at bottom",
    "Paste contract address: 0xd9145CCE52D386f254917e481eB44e9943F39138",
    "Verify token details and import",
    "Proceed to pool creation"
  ];

  const quickSolutions = [
    {
      priority: "BEST",
      title: "Create ETHGR/ETH Pool",
      description: "Use verified ETHGR contract with ETH",
      action: "Transfer 0.003 ETH from wallet 2, then create pool",
      timeframe: "5 minutes"
    },
    {
      priority: "ALTERNATIVE", 
      title: "Import ETHG Manually",
      description: "Force import the unverified ETHG contract",
      action: "Manual import in Uniswap interface",
      timeframe: "2 minutes"
    },
    {
      priority: "BACKUP",
      title: "Buy $15 ETH",
      description: "Quick purchase for immediate pool creation",
      action: "Coinbase purchase to wallet",
      timeframe: "3 minutes"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Token Address Helper</h1>
          <p className="text-muted-foreground">
            Solve token location issues for pool creation
          </p>
        </div>
      </div>

      <Alert className="border-orange-500 bg-orange-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Issue Identified:</strong> Original ETHG contract is unverified on Etherscan, 
          making it difficult for Uniswap to locate automatically. Multiple solutions available.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(tokenAddresses).map(([symbol, token]) => (
          <Card key={symbol} className={token.status === 'Verified & Working' ? 'border-green-500' : 'border-red-500'}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{symbol} - {token.name}</span>
                <Badge variant={token.status === 'Verified & Working' ? 'default' : 'destructive'}>
                  {token.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-2 bg-muted rounded font-mono text-sm">
                <span className="flex-1">{token.address}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(token.address, symbol)}
                >
                  <Copy className="h-4 w-4" />
                  {copied === symbol ? "Copied!" : "Copy"}
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div><strong>Balance:</strong> {token.balance}</div>
                <div><strong>Use Case:</strong> {token.useCase}</div>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`https://etherscan.io/token/${token.address}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Etherscan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">Immediate Solutions</h2>
        {quickSolutions.map((solution, index) => (
          <Card key={index} className={
            solution.priority === 'BEST' ? 'border-green-500 bg-green-50' :
            solution.priority === 'ALTERNATIVE' ? 'border-blue-500 bg-blue-50' :
            'border-gray-500 bg-gray-50'
          }>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{solution.title}</span>
                <div className="flex gap-2">
                  <Badge variant={solution.priority === 'BEST' ? 'default' : 'outline'}>
                    {solution.priority}
                  </Badge>
                  <Badge variant="secondary">{solution.timeframe}</Badge>
                </div>
              </CardTitle>
              <CardDescription>{solution.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-3">
                <strong>Action:</strong> {solution.action}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommended Immediate Action
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Best Solution:</strong> Create ETHGR/ETH pool using your verified contract. 
              Transfer 0.003 ETH from your secondary wallet to have sufficient ETH for pool creation.
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <Button
              size="lg"
              className="text-xl px-12 py-6 h-auto"
              onClick={() => window.open('https://app.uniswap.org/#/add/v2/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247/ETH', '_blank')}
            >
              <ExternalLink className="h-6 w-6 mr-3" />
              CREATE ETHGR/ETH POOL
            </Button>
            <div className="text-sm text-muted-foreground mt-2">
              Uses verified contract - guaranteed to work
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
            <div className="p-3 bg-blue-50 rounded">
              <div className="font-bold">0.003 ETH</div>
              <div className="text-muted-foreground">Liquidity amount</div>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <div className="font-bold">9,000 ETHGR</div>
              <div className="text-muted-foreground">Token amount (approximate)</div>
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <div className="font-bold">0.3% Fee</div>
              <div className="text-muted-foreground">Trading fee tier</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual ETHG Import (If Needed)</CardTitle>
          <CardDescription>
            Steps to manually import the unverified ETHG contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {manualImportSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
          
          <Button
            className="w-full mt-4"
            variant="outline"
            onClick={() => window.open('https://app.uniswap.org/#/swap', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Try Manual Import
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}