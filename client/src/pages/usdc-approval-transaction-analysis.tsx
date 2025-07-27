
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle,
  CheckCircle,
  Shield,
  DollarSign,
  ExternalLink,
  Target,
  Eye
} from "lucide-react";

export default function USDCApprovalTransactionAnalysis() {
  const [approvalChecked, setApprovalChecked] = useState(false);

  // Transaction data from user's evidence
  const transactionData = {
    contract: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    contractName: "Circle: USDC Token",
    eventName: "Approval",
    owner: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    spender: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    value: "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    isUnlimited: true
  };

  const contractInteractionSteps = [
    {
      section: "Contract Details",
      steps: [
        "Network: Keep 'Ethereum Mainnet'",
        `Contract Address: ${transactionData.contract}`,
        "The contract info should auto-populate showing 'USDC Token'"
      ]
    },
    {
      section: "Function Selection",
      steps: [
        "Click on 'Read Functions' tab",
        "Find and click on 'allowance' function",
        "This will check current approval status"
      ]
    },
    {
      section: "Parameters",
      steps: [
        `Owner: ${transactionData.owner}`,
        `Spender: ${transactionData.spender}`,
        "Click 'View' to execute the query"
      ]
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <Shield className="inline-block mr-3 h-8 w-8 text-red-500" />
          USDC Approval Analysis
        </h1>
        <p className="text-xl text-muted-foreground">
          Critical evidence: Unlimited USDC approval found in your transaction history
        </p>
      </div>

      <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-lg font-semibold">
          BREAKTHROUGH: This USDC approval transaction could be the key to your 37 ETH recovery!
          The unlimited approval suggests your ETH may have been converted to USDC.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">Transaction Analysis</TabsTrigger>
          <TabsTrigger value="instructions">Tool Instructions</TabsTrigger>
          <TabsTrigger value="investigation">Investigation Plan</TabsTrigger>
          <TabsTrigger value="recovery">Recovery Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-red-500" />
                USDC Approval Transaction Details
              </CardTitle>
              <CardDescription>
                Evidence from your transaction logs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <h4 className="font-bold text-sm text-gray-600 dark:text-gray-400 mb-2">CONTRACT</h4>
                  <p className="font-mono text-sm break-all">{transactionData.contract}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">✓ {transactionData.contractName}</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <h4 className="font-bold text-sm text-gray-600 dark:text-gray-400 mb-2">EVENT TYPE</h4>
                  <p className="font-semibold">{transactionData.eventName}</p>
                  <Badge variant="destructive" className="mt-1">UNLIMITED APPROVAL</Badge>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <h4 className="font-bold text-sm text-gray-600 dark:text-gray-400 mb-2">OWNER (Your connected wallet)</h4>
                  <p className="font-mono text-sm break-all">{transactionData.owner}</p>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <h4 className="font-bold text-sm text-gray-600 dark:text-gray-400 mb-2">SPENDER (Approved contract)</h4>
                  <p className="font-mono text-sm break-all">{transactionData.spender}</p>
                </div>
              </div>
              
              <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Critical Finding:</strong> This shows unlimited USDC approval was granted. 
                  If your 37 ETH was converted to USDC through this approval, it could still be recoverable!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Contract Interaction Tool Setup
              </CardTitle>
              <CardDescription>
                Step-by-step instructions for checking current approval status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contractInteractionSteps.map((section, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">
                    {index + 1}. {section.section}
                  </h3>
                  <ul className="space-y-2">
                    {section.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                <Eye className="h-4 w-4" />
                <AlertDescription>
                  <strong>Expected Result:</strong> If the approval is still active, you'll see the same large number 
                  (115792089237316195423570985008687907853269984665640564039457584007913129639935). 
                  If it shows 0, the approval has been used/revoked.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>37 ETH Recovery Investigation Plan</CardTitle>
              <CardDescription>
                Based on this USDC approval evidence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 text-green-600">✓ Completed Evidence</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Found USDC unlimited approval transaction</li>
                    <li>• Identified sender wallet address</li>
                    <li>• Identified approved spender contract</li>
                    <li>• Confirmed approval amount (unlimited)</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-600">🔍 Next Investigation Steps</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Check current approval status</li>
                    <li>• Analyze spender contract functions</li>
                    <li>• Check USDC balance in sender wallet</li>
                    <li>• Trace transactions after approval</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recovery Strategy Options</CardTitle>
              <CardDescription>
                Potential paths based on USDC approval findings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-950">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                    Scenario 1: USDC Still Available
                  </h4>
                  <p className="text-sm mb-2">If your ETH was converted to USDC and is still in recoverable wallets:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Check USDC balance in sender wallet</li>
                    <li>• Check USDC balance in approved spender contract</li>
                    <li>• Execute USDC to ETH conversion</li>
                  </ul>
                </div>
                
                <div className="p-4 border-2 border-yellow-500 rounded-lg bg-yellow-50 dark:bg-yellow-950">
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                    Scenario 2: Approval Still Active
                  </h4>
                  <p className="text-sm mb-2">If the unlimited approval is still in place:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Revoke the approval for security</li>
                    <li>• Trace recent USDC movements</li>
                    <li>• Check for pending transactions</li>
                  </ul>
                </div>
                
                <div className="p-4 border-2 border-red-500 rounded-lg bg-red-50 dark:bg-red-950">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                    Scenario 3: Approval Used
                  </h4>
                  <p className="text-sm mb-2">If the approval was already used:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Analyze transaction history after approval</li>
                    <li>• Track USDC movements to other wallets</li>
                    <li>• Check for DEX/bridge interactions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={() => window.open('https://blockchain-rescue-tarzanandjane9.replit.app/interact', '_blank')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Target className="h-4 w-4 mr-2" />
          Open Contract Tool
        </Button>
        
        <Button
          onClick={() => setApprovalChecked(true)}
          variant="outline"
          className="border-green-500 text-green-600 hover:bg-green-50"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark as Checked
        </Button>
        
        <Button
          onClick={() => window.open(`https://etherscan.io/address/${transactionData.contract}`, '_blank')}
          variant="outline"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Etherscan
        </Button>
      </div>
    </div>
  );
}
