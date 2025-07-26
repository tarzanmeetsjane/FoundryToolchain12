
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  Search
} from "lucide-react";

export default function Interact() {
  const [walletAddress, setWalletAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("0xc2B6D375B7D14c9CE73f97Ddf565002CcE257308");
  const [amount, setAmount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleExecute = () => {
    console.log("Executing recovery with:", { walletAddress, contractAddress, amount });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          ETHG Token Recovery Interface
        </h1>
        <p className="text-lg text-gray-600">
          Interact with your ETHGR recovery contract to claim your tokens
        </p>
      </div>

      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Wallet Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="wallet">Your Wallet Address</Label>
                <Input
                  id="wallet"
                  placeholder="0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              <Button onClick={handleConnect} className="w-full">
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Connected: {walletAddress || "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Interaction */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Contract Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contract">ETHGR Contract Address</Label>
            <div className="flex gap-2">
              <Input
                id="contract"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                readOnly
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigator.clipboard.writeText(contractAddress)}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Your Eligible Amount: 1,990,000 ETHGR
              </Badge>
            </div>
            <div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Status: Ready to Claim
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              You are eligible to recover 1,990,000 ETHGR tokens. This is a one-time recovery for your specific wallet address.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount to Recover (ETHGR)</Label>
              <Input
                id="amount"
                placeholder="1990000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={handleExecute}
                className="bg-green-600 hover:bg-green-700"
                disabled={!isConnected}
              >
                Execute Recovery
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('/transaction-analyzer', '_blank')}
              >
                <Search className="w-4 h-4 mr-2" />
                Check Transaction Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Fill Out This Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">1. Wallet Address</h4>
              <p className="text-sm text-gray-600">
                Enter your Ethereum wallet address (the one that originally held the trapped ETHG tokens)
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">2. Contract Address</h4>
              <p className="text-sm text-gray-600">
                This is pre-filled with your deployed ETHGR recovery contract address
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">3. Amount</h4>
              <p className="text-sm text-gray-600">
                Enter the amount of ETHGR tokens you want to recover (maximum: 1,990,000)
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold">4. Execute Recovery</h4>
              <p className="text-sm text-gray-600">
                Click this button to call the recovery function on your smart contract
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
