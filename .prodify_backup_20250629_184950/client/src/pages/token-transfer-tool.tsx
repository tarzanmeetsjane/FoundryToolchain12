import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Send,
  Wallet,
  CheckCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function TokenTransferTool() {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [gasPrice, setGasPrice] = useState("20");
  const { toast } = useToast();

  const transferMutation = useMutation({
    mutationFn: async (transferData: any) => {
      // This would integrate with the wallet service to execute transfers
      const response = await fetch('/api/tokens/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferData)
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Transfer Initiated",
        description: `Transaction hash: ${data.transactionHash}`,
      });
    }
  });

  const validateAddress = (address: string) => {
    return address.match(/^0x[a-fA-F0-9]{40}$/);
  };

  const copyWalletAddress = () => {
    const address = "0x058C8FE01E5c9eaC6ee19e6673673B549B368843";
    navigator.clipboard.writeText(address);
    toast({
      title: "Copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  const presetAmounts = [
    { label: "1K Tokens", value: "1000", price: "$50" },
    { label: "10K Tokens", value: "10000", price: "$500" },
    { label: "50K Tokens", value: "50000", price: "$2,500" },
    { label: "100K Tokens", value: "100000", price: "$5,000" }
  ];

  const calculateValue = (amount: string) => {
    const tokens = parseFloat(amount) || 0;
    return {
      marketValue: (tokens * 0.355).toFixed(2),
      salePrice: (tokens * 0.05).toFixed(2) // Using starter package pricing
    };
  };

  const values = calculateValue(tokenAmount);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Token Transfer Tool</h1>
          <p className="text-muted-foreground">
            Execute ETHGR token transfers for sales and payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/instant-monetization', '_blank')}>
            Back to Monetization
          </Button>
        </div>
      </div>

      <Alert className="border-blue-500 bg-blue-50">
        <Wallet className="h-4 w-4" />
        <AlertDescription>
          <strong>Your ETHGR Wallet:</strong> 0x058C8FE01E5c9eaC6ee19e6673673B549B368843
          <Button size="sm" variant="ghost" onClick={copyWalletAddress} className="ml-2">
            <Copy className="h-3 w-3" />
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Transfer ETHGR Tokens
            </CardTitle>
            <CardDescription>Send tokens to buyers after payment confirmation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                className={!validateAddress(recipientAddress) && recipientAddress ? "border-red-500" : ""}
              />
              {recipientAddress && !validateAddress(recipientAddress) && (
                <p className="text-sm text-red-500 mt-1">Invalid Ethereum address</p>
              )}
            </div>

            <div>
              <Label htmlFor="amount">Token Amount</Label>
              <Input
                id="amount"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                placeholder="Enter number of tokens"
                type="number"
              />
              {tokenAmount && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                  <div>Market Value: ${values.marketValue}</div>
                  <div>Sale Price: ${values.salePrice}</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setTokenAmount(preset.value)}
                  className="text-xs"
                >
                  {preset.label}
                  <span className="text-green-600 ml-1">{preset.price}</span>
                </Button>
              ))}
            </div>

            <div>
              <Label htmlFor="gas">Gas Price (Gwei)</Label>
              <Input
                id="gas"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                type="number"
              />
            </div>

            <Button 
              className="w-full"
              disabled={!validateAddress(recipientAddress) || !tokenAmount || transferMutation.isPending}
              onClick={() => transferMutation.mutate({
                to: recipientAddress,
                amount: tokenAmount,
                gasPrice: gasPrice
              })}
            >
              {transferMutation.isPending ? (
                "Processing..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Transfer Tokens
                </>
              )}
            </Button>

            {transferMutation.data && (
              <Alert className={transferMutation.data.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}>
                <AlertDescription>
                  {transferMutation.data.success ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Transfer successful! Hash: {transferMutation.data.transactionHash}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Transfer failed: {transferMutation.data.error}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Workflow</CardTitle>
            <CardDescription>Step-by-step process for token sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded">
                <div className="font-semibold text-blue-700 mb-2">1. Receive Payment</div>
                <div className="text-sm">
                  Buyer sends ETH/USDC to: 
                  <div className="font-mono text-xs mt-1">0x058C8FE01E5c9eaC6ee19e6673673B549B368843</div>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded">
                <div className="font-semibold text-green-700 mb-2">2. Verify Payment</div>
                <div className="text-sm">
                  Check transaction on Etherscan or wallet
                </div>
                <Button size="sm" variant="outline" className="mt-2" 
                  onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}>
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Check Wallet
                </Button>
              </div>

              <div className="p-3 bg-purple-50 rounded">
                <div className="font-semibold text-purple-700 mb-2">3. Transfer Tokens</div>
                <div className="text-sm">
                  Use this tool to send ETHGR tokens to buyer's wallet
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded">
                <div className="font-semibold text-yellow-700 mb-2">4. Confirm Delivery</div>
                <div className="text-sm">
                  Share transaction hash with buyer for verification
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded">
              <div className="font-semibold mb-2">Quick Sale Pricing:</div>
              <div className="text-sm space-y-1">
                <div>• 1,000 tokens = $50 (instant transfer)</div>
                <div>• 10,000 tokens = $500 (premium rate)</div>
                <div>• 100,000 tokens = $5,000 (bulk discount)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('https://etherscan.io/token/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247', '_blank')}
            >
              <ExternalLink className="h-5 w-5" />
              <span>View ETHGR Contract</span>
              <span className="text-xs opacity-80">Check token details</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('https://etherscan.io/address/0x058C8FE01E5c9eaC6ee19e6673673B549B368843', '_blank')}
            >
              <Wallet className="h-5 w-5" />
              <span>Check Wallet</span>
              <span className="text-xs opacity-80">View incoming payments</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open('/instant-monetization', '_blank')}
            >
              <Send className="h-5 w-5" />
              <span>Marketing Content</span>
              <span className="text-xs opacity-80">Copy sales templates</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}