import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle,
  AlertTriangle,
  DollarSign,
  ExternalLink,
  Copy,
  Zap,
  Eye,
  Wallet,
  Search,
  FileText
} from "lucide-react";

export default function FinalETHSolution() {
  const [manualAddress, setManualAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [balanceResult, setBalanceResult] = useState<any>(null);

  const checkManualAddress = async () => {
    if (!manualAddress || manualAddress.length !== 42) {
      alert("Please enter a complete 42-character contract address");
      return;
    }

    setIsAnalyzing(true);
    try {
      // Real ETH balance check using Etherscan API
      const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${manualAddress}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY || 'YourApiKeyToken'}`);
      const data = await response.json();
      
      if (data.status === "1") {
        const balanceWei = data.result;
        const balanceETH = (parseInt(balanceWei) / Math.pow(10, 18)).toString();
        const balanceUSD = (parseFloat(balanceETH) * 2500).toFixed(2);
        
        setBalanceResult({
          address: manualAddress,
          balance: balanceETH,
          balanceUSD: balanceUSD,
          hasWithdrawal: parseFloat(balanceETH) > 0,
          isValid: true
        });
      } else {
        setBalanceResult({
          address: manualAddress,
          balance: "0",
          balanceUSD: "0",
          hasWithdrawal: false,
          isValid: false,
          error: "Invalid address or API error"
        });
      }
    } catch (error) {
      setBalanceResult({
        address: manualAddress,
        balance: "0",
        balanceUSD: "0",
        hasWithdrawal: false,
        isValid: false,
        error: "Network error"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const executeWithdrawal = () => {
    alert(`Emergency withdrawal interface would connect to ${manualAddress} and attempt to recover ${balanceResult.balance} ETH`);
  };

  const knownAddresses = [
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      name: "Your Main Wallet",
      balance: "~$35",
      action: "Current Balance"
    },
    {
      address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      name: "ETHGR Recovery Contract",
      balance: "0 ETH",
      action: "1,990,000 ETHGR Minted"
    },
    {
      address: "0x02f92645010484773594008477359400831e16198",
      name: "Generated Wallet from Seed",
      balance: "Unknown",
      action: "Check Balance"
    }
  ];

  const nextSteps = [
    {
      step: "1. Find Complete Address",
      description: "Check MetaMask history for June 15 transactions with 0xd914...",
      status: "PRIORITY",
      action: "Manual Check Required"
    },
    {
      step: "2. Immediate ETH Check",
      description: "Use manual address entry below to check any suspected contract",
      status: "READY",
      action: "Enter Address"
    },
    {
      step: "3. Alternative ETH Generation",
      description: "Sell 90,000 ETHGR at $0.001 each = $90 to buy ETH for pool",
      status: "BACKUP",
      action: "Direct Sales"
    },
    {
      step: "4. Pool Creation",
      description: "Create ETHGR/ETH pool with recovered or purchased ETH",
      status: "FINAL",
      action: "Uniswap V2"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Final ETH Recovery Solution</h1>
        <p className="text-muted-foreground">
          Complete strategy to locate missing 37 ETH or generate alternative ETH for pool creation
        </p>
      </div>

      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>37 ETH STATUS:</strong> Contract 0xd914...9138 from June 15 not found in uploaded files. 
          Manual MetaMask check required or alternative ETH generation strategy needed.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="manual-check" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manual-check">Manual Check</TabsTrigger>
          <TabsTrigger value="known-addresses">Known Addresses</TabsTrigger>
          <TabsTrigger value="next-steps">Action Plan</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="manual-check">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Manual Contract Address Checker
              </CardTitle>
              <CardDescription>
                Enter the complete contract address from your June 15 MetaMask history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="manual-address">Complete Contract Address (42 characters)</Label>
                <Input
                  id="manual-address"
                  placeholder="0xd914... (paste complete address starting with 0xd914)"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="font-mono"
                />
                <div className="text-xs text-muted-foreground">
                  Go to MetaMask → Activity → June 15 → Find transaction with 0xd914... → Copy complete "To" address
                </div>
              </div>

              <Button 
                onClick={checkManualAddress}
                disabled={!manualAddress || isAnalyzing}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <DollarSign className="h-4 w-4 mr-1" />
                {isAnalyzing ? "Checking ETH Balance..." : "Check for 37 ETH"}
              </Button>

              {balanceResult && (
                <div className={`p-4 border rounded-lg ${
                  parseFloat(balanceResult.balance) > 0 ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="font-bold mb-2">
                    {parseFloat(balanceResult.balance) > 0 ? "ETH FOUND!" : "Balance Check Result"}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="font-bold">Address:</div>
                      <div className="font-mono text-xs break-all">{balanceResult.address}</div>
                    </div>
                    <div>
                      <div className="font-bold">ETH Balance:</div>
                      <div className="text-lg font-bold">{balanceResult.balance} ETH</div>
                    </div>
                    <div>
                      <div className="font-bold">USD Value:</div>
                      <div className="text-lg font-bold">${balanceResult.balanceUSD}</div>
                    </div>
                    <div>
                      <div className="font-bold">Status:</div>
                      <div>{balanceResult.isValid ? "Valid Contract" : "Invalid/Error"}</div>
                    </div>
                  </div>

                  {balanceResult.hasWithdrawal && (
                    <Button 
                      onClick={executeWithdrawal}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Zap className="h-4 w-4 mr-1" />
                      Execute Emergency ETH Withdrawal ({balanceResult.balance} ETH)
                    </Button>
                  )}

                  {balanceResult.error && (
                    <div className="text-red-600 text-sm mt-2">
                      Error: {balanceResult.error}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="known-addresses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Known Wallet & Contract Addresses
              </CardTitle>
              <CardDescription>
                All confirmed addresses from your recovery operation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {knownAddresses.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="font-mono text-xs text-muted-foreground break-all">
                        {item.address}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{item.balance}</div>
                      <div className="text-xs text-muted-foreground">{item.action}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => navigator.clipboard.writeText(item.address)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => window.open(`https://etherscan.io/address/${item.address}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Etherscan
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="next-steps">
          <Card>
            <CardHeader>
              <CardTitle>Complete Action Plan</CardTitle>
              <CardDescription>
                Step-by-step strategy to recover ETH or create alternatives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">{step.step}</div>
                      <div className="text-sm text-muted-foreground">{step.description}</div>
                    </div>
                    <Badge variant={
                      step.status === "PRIORITY" ? "destructive" :
                      step.status === "READY" ? "default" :
                      step.status === "BACKUP" ? "secondary" : 
                      "outline"
                    }>
                      {step.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-bold text-blue-600">{step.action}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives">
          <Card>
            <CardHeader>
              <CardTitle>Alternative ETH Generation</CardTitle>
              <CardDescription>
                If 37 ETH cannot be recovered, generate ETH through direct token sales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-blue-500 bg-blue-50">
                <DollarSign className="h-4 w-4" />
                <AlertDescription>
                  <strong>DIRECT SALES STRATEGY:</strong> Sell portions of your 1,990,000 ETHGR tokens 
                  directly at $0.001 each to generate initial ETH for pool creation.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="font-bold mb-2">Option 1: Minimum Pool</div>
                  <div className="space-y-2 text-sm">
                    <div>Sell: 90,000 ETHGR tokens</div>
                    <div>Price: $0.001 each</div>
                    <div>Revenue: $90</div>
                    <div>Buy ETH: ~0.036 ETH</div>
                    <div>Pool Size: Small but functional</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="font-bold mb-2">Option 2: Optimal Pool</div>
                  <div className="space-y-2 text-sm">
                    <div>Sell: 500,000 ETHGR tokens</div>
                    <div>Price: $0.001 each</div>
                    <div>Revenue: $500</div>
                    <div>Buy ETH: ~0.2 ETH</div>
                    <div>Pool Size: Strong liquidity</div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <ExternalLink className="h-4 w-4 mr-1" />
                Create Direct Sales Interface
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recovery Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <div className="font-bold">ETHGR Tokens Recovered</div>
                <div className="text-sm text-muted-foreground">1,990,000 ETHGR tokens ready for monetization</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <div className="font-bold">37 ETH Location Unknown</div>
                <div className="text-sm text-muted-foreground">Manual MetaMask check required for June 15 contract</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-bold">Alternative Strategy Ready</div>
                <div className="text-sm text-muted-foreground">Direct token sales can generate needed ETH for pool creation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}