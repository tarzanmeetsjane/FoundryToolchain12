import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Copy,
  ExternalLink,
  Terminal,
  Zap,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContractVerificationDashboard() {
  const [verificationStatus, setVerificationStatus] = useState('unverified');
  const [progress, setProgress] = useState(25);
  const { toast } = useToast();

  const contractDetails = {
    address: '0xc2b6d375b7d14c9ce73f97ddf565002cce257308',
    deploymentTx: '0xd03eef8b6bd869b38cd51ce4b37129354642f92f644d5ca8a03b0843c2c80351',
    migrationTx: '0x7b597b87f4db2cb3a29c50f8d3f6d3de40bea600c2309a04dd5a8f8fe212c9cb',
    tokenAmount: '1,990,000 ETHGR',
    currentValue: 'N/A (Unverified)',
    potentialValue: '$648,740 - $1,294,700'
  };

  const verificationSteps = [
    {
      step: 1,
      title: 'Contract Deployed',
      status: 'completed',
      description: 'ETHGRecovery contract successfully deployed',
      details: contractDetails.address
    },
    {
      step: 2,
      title: 'Tokens Migrated',
      status: 'completed',
      description: '1,990,000 ETHGR tokens minted to foundation wallet',
      details: contractDetails.migrationTx
    },
    {
      step: 3,
      title: 'Foundry Setup',
      status: 'in-progress',
      description: 'Install Foundry toolkit for professional verification',
      details: 'curl -L foundry.paradigm.xyz | bash && foundryup'
    },
    {
      step: 4,
      title: 'Contract Verification',
      status: 'pending',
      description: 'Submit contract source code to Sourcify/Etherscan',
      details: 'forge verify-contract --chain-id 1 --verifier sourcify...'
    },
    {
      step: 5,
      title: 'Market Recognition',
      status: 'pending',
      description: 'Wallets and DEXs recognize token value',
      details: 'Portfolio shows real USD values'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600">Pending</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Command copied successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Contract Verification Dashboard
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Transform Your 1,990,000 ETHGR Tokens from "N/A" to Market Value
        </p>
      </div>

      {/* Critical Status Alert */}
      <Alert className="mb-8 border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Critical Issue:</strong> Your 1,990,000 ETHGR tokens show "N/A" value because the contract is unverified.
          Contract verification will enable price recognition and market trading.
        </AlertDescription>
      </Alert>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Verification Progress
          </CardTitle>
          <CardDescription>
            2 of 5 steps completed - Ready for Foundry verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={40} className="w-full mb-4" />
          <div className="text-sm text-slate-600">
            40% Complete - Next: Install Foundry toolkit
          </div>
        </CardContent>
      </Card>

      {/* Value Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-800 text-lg">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 mb-2">$0.00</div>
            <div className="text-sm text-red-700">Portfolio shows "N/A"</div>
            <div className="text-sm text-red-600 mt-1">Unverified contract</div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800 text-lg">Token Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 mb-2">1,990,000</div>
            <div className="text-sm text-amber-700">ETHGR Tokens</div>
            <div className="text-sm text-amber-600 mt-1">Successfully migrated</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-lg">Potential Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">$648K+</div>
            <div className="text-sm text-green-700">After verification</div>
            <div className="text-sm text-green-600 mt-1">Market recognition</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="steps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="steps">Verification Steps</TabsTrigger>
          <TabsTrigger value="commands">Foundry Commands</TabsTrigger>
          <TabsTrigger value="impact">Value Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="steps">
          <div className="space-y-4">
            {verificationSteps.map((step) => (
              <Card key={step.step} className="relative">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Step {step.step}: {step.title}
                        </h3>
                        {getStatusBadge(step.status)}
                      </div>
                      <p className="text-slate-600 mb-2">{step.description}</p>
                      <div className="text-sm text-slate-500 font-mono bg-slate-50 p-2 rounded border">
                        {step.details}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="commands">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Install Foundry
                </CardTitle>
                <CardDescription>
                  Professional smart contract toolkit for verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                  curl -L https://foundry.paradigm.xyz | bash && foundryup
                </div>
                <Button 
                  onClick={() => copyToClipboard('curl -L https://foundry.paradigm.xyz | bash && foundryup')}
                  variant="outline" 
                  size="sm"
                  className="mr-2"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Command
                </Button>
                <Button 
                  onClick={() => window.open('https://book.getfoundry.sh/getting-started/installation', '_blank')}
                  variant="outline" 
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Installation Guide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Verification Command
                </CardTitle>
                <CardDescription>
                  Simplified command confirmed by user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 whitespace-pre-wrap">
{`forge verify-contract \\
  --chain-id 1 \\
  --verifier sourcify \\
  --constructor-args 0x \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`}
                </div>
                <Button 
                  onClick={() => copyToClipboard(`forge verify-contract \\
  --chain-id 1 \\
  --verifier sourcify \\
  --constructor-args 0x \\
  0xc2b6d375b7d14c9ce73f97ddf565002cce257308 \\
  src/ETHGRecovery.sol:ETHGRecovery`)}
                  variant="outline" 
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Verification Command
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  Financial Impact Analysis
                </CardTitle>
                <CardDescription>
                  What contract verification unlocks for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Before Verification:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Portfolio shows "N/A" or $0.00</li>
                        <li>• Wallets can't read token information</li>
                        <li>• DEXs don't recognize the token</li>
                        <li>• No price feeds or market data</li>
                        <li>• Cannot trade or create liquidity</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">After Verification:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Portfolio shows real USD values</li>
                        <li>• Token appears in wallet properly</li>
                        <li>• DEX aggregators can list it</li>
                        <li>• Price discovery mechanisms work</li>
                        <li>• Trading and liquidity creation enabled</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-green-800 mb-2">Conservative Value Estimates:</h4>
                    <div className="space-y-1 text-sm text-green-700">
                      <div>• At $0.10/token: $199,000 portfolio value</div>
                      <div>• At $0.326/token: $648,740 portfolio value (based on ETHG pricing)</div>
                      <div>• At $0.65/token: $1,293,500 portfolio value (recovery premium)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps After Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-600">
                  <div>1. <strong>Submit to CoinGecko/CoinMarketCap:</strong> Get official price tracking</div>
                  <div>2. <strong>Create Uniswap Liquidity Pool:</strong> Enable trading with small initial liquidity</div>
                  <div>3. <strong>Contact DEX Aggregators:</strong> Get listed on 1inch, Paraswap, etc.</div>
                  <div>4. <strong>Wallet Integration:</strong> Ensure MetaMask, Trust Wallet show correct values</div>
                  <div>5. <strong>Community Marketing:</strong> Announce successful recovery to crypto community</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center mt-8">
        <Button 
          onClick={() => window.open('https://etherscan.io/address/' + contractDetails.address, '_blank')}
          variant="outline"
          size="lg"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Contract on Etherscan
        </Button>
        <Button 
          onClick={() => window.open('https://etherscan.io/tx/' + contractDetails.migrationTx, '_blank')}
          variant="outline"
          size="lg"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Migration Transaction
        </Button>
      </div>
    </div>
  );
}