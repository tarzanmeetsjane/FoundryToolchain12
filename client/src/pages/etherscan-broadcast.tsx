import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy,
  ExternalLink,
  Radio,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function EtherscanBroadcast() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Pre-built transaction data for each step
  const transactions = [
    {
      name: "1. Approve ETHGR Tokens",
      description: "Allow Uniswap Router to spend your ETHGR tokens",
      to: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      data: "0x095ea7b3000000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d00000000000000000000000000000000000000000000001e7e4171bf4d3a00000",
      value: "0",
      gasLimit: "60000",
      gasPrice: "10000000000",
      function: "approve(address,uint256)",
      parameters: "spender: 0x7a250d5630b4cf539739df2c5dacb4c659f2488d, amount: 9000000000000000000000"
    },
    {
      name: "2. Create ETHGR/WETH Pair",
      description: "Create the trading pair on Uniswap Factory",
      to: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      data: "0xc9c6539600000000000000000000000000fa7b8c553c48c56ec7027d26ae95b029a2abf247000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      value: "0",
      gasLimit: "150000",
      gasPrice: "10000000000",
      function: "createPair(address,address)",
      parameters: "tokenA: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247, tokenB: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    },
    {
      name: "3. Add Liquidity ETH",
      description: "Add initial liquidity to the created pool",
      to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      data: "0xf305d71900000000000000000000000000fa7b8c553c48c56ec7027d26ae95b029a2abf24700000000000000000000000000000000000000000000001e7e4171bf4d3a0000000000000000000000000000000000000000000000000001b1ae4d6e2ef5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066f0e6e0",
      value: "3000000000000000",
      gasLimit: "200000",
      gasPrice: "10000000000",
      function: "addLiquidityETH(address,uint256,uint256,uint256,address,uint256)",
      parameters: "token: ETHGR, amountTokenDesired: 9000 ETHGR, amountTokenMin: 8550 ETHGR, amountETHMin: 0.0029 ETH, to: YOUR_ADDRESS, deadline: 1750400000"
    }
  ];

  const rawTransactionTemplate = `
{
  "to": "CONTRACT_ADDRESS",
  "data": "FUNCTION_DATA",
  "value": "ETH_VALUE",
  "gas": "GAS_LIMIT",
  "gasPrice": "GAS_PRICE",
  "nonce": "YOUR_NONCE"
}`;

  const broadcastInstructions = [
    "Copy the transaction data from the step you want to execute",
    "Paste it into the Etherscan Broadcast Raw Transaction field",
    "Ensure your wallet is connected and has sufficient ETH",
    "Click 'Send Transaction' and confirm in MetaMask",
    "Wait for confirmation before proceeding to the next step"
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">📡</div>
        <h1 className="text-4xl font-bold">ETHERSCAN BROADCAST EXECUTION</h1>
        <p className="text-xl text-muted-foreground">
          Direct transaction broadcasting for ETHGR pool creation
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Radio className="h-4 w-4" />
        <AlertDescription>
          <strong>Broadcasting Method:</strong> You're using Etherscan's raw transaction broadcaster 
          to execute smart contract functions directly, bypassing all UI limitations.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transaction Data</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="monitoring">Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ready-to-Broadcast Transactions</CardTitle>
              <CardDescription>
                Copy these exact transaction data strings into Etherscan's broadcast field
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {transactions.map((tx, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tx.name}</CardTitle>
                      <Badge variant="outline">{tx.function.split('(')[0]}</Badge>
                    </div>
                    <CardDescription>{tx.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>To:</strong> {tx.to}
                      </div>
                      <div>
                        <strong>Value:</strong> {tx.value === "0" ? "0 ETH" : `${parseInt(tx.value) / 1e18} ETH`}
                      </div>
                      <div>
                        <strong>Gas Limit:</strong> {tx.gasLimit}
                      </div>
                      <div>
                        <strong>Gas Price:</strong> {parseInt(tx.gasPrice) / 1e9} Gwei
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <strong>Transaction Data:</strong>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(tx.data, index)}
                          className="h-8"
                        >
                          <Copy className="h-3 w-3 mr-2" />
                          {copiedIndex === index ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                      <Textarea
                        value={tx.data}
                        readOnly
                        className="font-mono text-xs h-20"
                      />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <strong>Parameters:</strong> {tx.parameters}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Broadcasting Instructions</CardTitle>
              <CardDescription>Step-by-step guide for transaction execution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Current Status:</strong> You're already on Etherscan's broadcast page. 
                  Perfect position to execute these transactions directly.
                </AlertDescription>
              </Alert>

              <ol className="space-y-3">
                {broadcastInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      {index + 1}
                    </Badge>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>

              <Alert className="border-orange-500 bg-orange-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Execute transactions in exact order. 
                  Wait for each transaction to confirm before proceeding to the next.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://etherscan.io/pushTx', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Broadcast Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://etherscan.io/gastracker', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Check Gas Prices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Monitoring</CardTitle>
              <CardDescription>Track your pool creation progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://etherscan.io/token/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  ETHGR Contract
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Uniswap Factory
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Uniswap Router
                </Button>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Success Indicators:</strong> After completion, you'll see ETHGR/WETH pair on Uniswap, 
                  trading will be enabled, and you'll receive LP tokens representing your liquidity position.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-green-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">EXECUTE NOW</CardTitle>
          <CardDescription>
            Your wallet has 0.006 ETH - sufficient for all transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl">🎯</div>
          <p className="text-lg">
            Copy the first transaction data and paste it into Etherscan's broadcast field to begin.
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => copyToClipboard(transactions[0].data, 0)}
          >
            <Copy className="h-5 w-5 mr-2" />
            COPY FIRST TRANSACTION
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}