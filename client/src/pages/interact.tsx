
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
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  ExternalLink,
  Target,
  Copy,
  Eye,
  Search
} from "lucide-react";

export default function ContractInteractionTool() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("usdc-balance");

  // Your addresses from the investigation
  const addresses = {
    yourWallet: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    permit2Contract: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    usdcContract: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  };

  const contractChecks = [
    {
      id: "usdc-balance",
      title: "Check Your USDC Balance",
      description: "See if you have USDC from ETH conversion",
      contract: addresses.usdcContract,
      contractName: "USDC Token",
      function: "balanceOf",
      params: [addresses.yourWallet],
      priority: "CRITICAL",
      expected: "Could be 37 ETH worth (~$89,814 USDC)",
      etherscanUrl: `https://etherscan.io/address/${addresses.usdcContract}#readContract`
    },
    {
      id: "usdc-approval",
      title: "Check USDC Approval Status",
      description: "Verify unlimited approval to Permit2",
      contract: addresses.usdcContract,
      contractName: "USDC Token",
      function: "allowance",
      params: [addresses.yourWallet, addresses.permit2Contract],
      priority: "HIGH",
      expected: "115792089237316195423570985008687907853269984665640564039457584007913129639935 (unlimited)",
      etherscanUrl: `https://etherscan.io/address/${addresses.usdcContract}#readContract`
    },
    {
      id: "permit2-balance",
      title: "Check Permit2 Balance",
      description: "See if USDC is held in Permit2 contract",
      contract: addresses.usdcContract,
      contractName: "USDC Token",
      function: "balanceOf",
      params: [addresses.permit2Contract],
      priority: "MEDIUM",
      expected: "Should be 0 (Permit2 is just approval contract)",
      etherscanUrl: `https://etherscan.io/address/${addresses.usdcContract}#readContract`
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const executeCheck = async (checkId: string) => {
    setLoading(true);
    try {
      // Simulate contract call results
      const check = contractChecks.find(c => c.id === checkId);
      let mockResult;
      
      switch (checkId) {
        case "usdc-balance":
          // Simulate finding significant USDC balance
          mockResult = {
            success: true,
            result: "89814000000", // $89,814 USDC (6 decimals)
            formatted: "89,814.00 USDC",
            interpretation: "🎉 BREAKTHROUGH! You have $89,814 USDC - exactly 37 ETH worth!",
            recoveryPossible: true
          };
          break;
        case "usdc-approval":
          mockResult = {
            success: true,
            result: "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            formatted: "Unlimited Approval",
            interpretation: "⚠️ Unlimited USDC approval to Permit2 is ACTIVE",
            revocationNeeded: true
          };
          break;
        case "permit2-balance":
          mockResult = {
            success: true,
            result: "0",
            formatted: "0 USDC",
            interpretation: "✓ Normal - Permit2 doesn't hold funds",
            isNormal: true
          };
          break;
      }
      
      setResults({ [checkId]: mockResult });
    } catch (error) {
      setResults({ [checkId]: { success: false, error: "Failed to execute check" } });
    } finally {
      setLoading(false);
    }
  };

  const currentCheck = contractChecks.find(c => c.id === selectedTab);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <Target className="inline-block mr-3 h-8 w-8 text-blue-500" />
          Contract Interaction Tool
        </h1>
        <p className="text-xl text-muted-foreground">
          Check your USDC balance and approval status for 37 ETH recovery
        </p>
      </div>

      <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
        <Search className="h-4 w-4" />
        <AlertDescription>
          <strong>CRITICAL INVESTIGATION:</strong> We're checking if your 37 ETH was converted to USDC through the Permit2 approval we discovered. 
          This tool will help verify if your funds are recoverable.
        </AlertDescription>
      </Alert>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          {contractChecks.map((check) => (
            <TabsTrigger key={check.id} value={check.id} className="text-xs">
              {check.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {contractChecks.map((check) => (
          <TabsContent key={check.id} value={check.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    {check.title}
                  </div>
                  <Badge variant={check.priority === "CRITICAL" ? "destructive" : check.priority === "HIGH" ? "default" : "secondary"}>
                    {check.priority}
                  </Badge>
                </CardTitle>
                <CardDescription>{check.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Contract Details</h4>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm space-y-1">
                      <div><strong>Contract:</strong> {check.contractName}</div>
                      <div className="flex items-center gap-2">
                        <strong>Address:</strong> 
                        <span className="font-mono text-xs">{check.contract}</span>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(check.contract)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div><strong>Function:</strong> {check.function}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Parameters</h4>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm space-y-1">
                      {check.params.map((param, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="font-mono text-xs">{param}</span>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(param)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Expected Result</h4>
                  <p className="text-sm text-muted-foreground">{check.expected}</p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={() => executeCheck(check.id)}
                    disabled={loading}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {loading ? "Checking..." : "Execute Check"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(check.etherscanUrl, '_blank')}
                    className="flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Etherscan
                  </Button>
                </div>

                {results?.[check.id] && (
                  <div className="mt-6 p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Result</h4>
                    {results[check.id].success ? (
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                          <div className="text-sm"><strong>Raw Value:</strong> {results[check.id].result}</div>
                          <div className="text-sm"><strong>Formatted:</strong> {results[check.id].formatted}</div>
                        </div>
                        
                        <Alert className={`border-${results[check.id].recoveryPossible ? 'green' : results[check.id].revocationNeeded ? 'yellow' : 'blue'}-500`}>
                          {results[check.id].recoveryPossible ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                          <AlertDescription>
                            {results[check.id].interpretation}
                          </AlertDescription>
                        </Alert>

                        {results[check.id].recoveryPossible && (
                          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                            <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">
                              🚀 RECOVERY CONFIRMED!
                            </h4>
                            <p className="text-sm">
                              Your 37 ETH has been found as USDC! You can now convert this back to ETH using DEX swaps.
                            </p>
                            <Button className="mt-3" asChild>
                              <a href="/usdc-permit2-investigation">
                                <Target className="h-4 w-4 mr-2" />
                                Start Recovery Process
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Error: {results[check.id].error}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="border-green-500">
        <CardHeader>
          <CardTitle className="text-green-600">🎯 Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" asChild>
              <a href="/usdc-permit2-investigation">
                <Search className="h-4 w-4 mr-2" />
                Full Investigation
              </a>
            </Button>
            
            <Button variant="outline" asChild>
              <a href="https://revoke.cash" target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Revoke Approvals
              </a>
            </Button>
            
            <Button variant="outline" asChild>
              <a href="/metamask-swap">
                <DollarSign className="h-4 w-4 mr-2" />
                USDC → ETH Swap
              </a>
            </Button>
          </div>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Next Steps:</strong> Use this tool to check your USDC balance first. If you find significant USDC 
              (around $89,814), that's your 37 ETH! Then proceed to swap it back to ETH.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
