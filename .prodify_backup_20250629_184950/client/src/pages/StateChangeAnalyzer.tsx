import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Database, ArrowRight, Wallet } from "lucide-react";

interface StateChange {
  address: string;
  before: string;
  after: string;
  difference: string;
  description: string;
}

export default function StateChangeAnalyzer() {
  const transactionHash = "0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169";
  
  const addressChanges: StateChange[] = [
    {
      address: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
      before: "0.014312080462213577 ETH (Nonce: 5)",
      after: "0.014029594462213577 ETH (Nonce: 6)",
      difference: "-0.000282486 ETH",
      description: "Your wallet - paid gas fees for contract deployment"
    },
    {
      address: "0x4838B106...B0BAD5f97",
      before: "5.895640605466140181 ETH",
      after: "5.89587262116328354 ETH",
      difference: "+0.000232015697143359 ETH",
      description: "Titan Builder (Producer) - received block reward"
    },
    {
      address: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      before: "Contract not deployed",
      after: "ERC20 Contract deployed",
      difference: "Contract Creation",
      description: "ETHG Recovery contract - newly deployed"
    }
  ];

  const storageChanges = [
    {
      slot: "0x0000000000000000000000000000000000000000000000000000000000000002",
      before: "0x0000000000000000000000000000000000000000000000000000000000000000",
      after: "0x00000000000000000000000000000000000000000001a5661dbcd0208fc00000",
      description: "Total Supply storage - set to 1,990,000 tokens (18 decimals)"
    },
    {
      slot: "0x0000000000000000000000000000000000000000000000000000000000000009",
      before: "0x0000000000000000000000000000000000000000000000000000000000000000",
      after: "0x00000000000000000000000000000000000000000001a5661dbcd0208fc00000",
      description: "Owner balance storage - allocated 1,990,000 tokens to deployer"
    },
    {
      slot: "0x00e4013b3b86106a6756fef993c9c15380df0229cbbc2ed529458b443af16c13",
      before: "0x0000000000000000000000000000000000000000000000000000000000000000",
      after: "0x00000000000000000000000000000000000000000001a5661dbcd0208fc00000",
      description: "Balance mapping storage - records token balance for your address"
    },
    {
      slot: "0xc424fbe1652e422db0a6f77ca3a0fcdf8e09d9be2c3c4bfcd1bf58244d4d3751",
      before: "0x0000000000000000000000000000000000000000000000000000000000000000",
      after: "0x0000000000000000000000000000000000000000000000000000000000000001",
      description: "Ownership flag - establishes contract ownership"
    },
    {
      slot: "0xf52efc4956ec5871f1d9b93b1fc19981a147a8d21859c94301a4db60c29fed9d",
      before: "0x0000000000000000000000000000000000000000000000000000000000000000",
      after: "0x00000000000000000000000000000000000000000001a5661dbcd0208fc00000",
      description: "Additional balance reference - confirms token allocation"
    }
  ];

  const convertHexToDecimal = (hex: string): string => {
    if (hex === "0x0000000000000000000000000000000000000000000000000000000000000000") return "0";
    if (hex === "0x0000000000000000000000000000000000000000000000000000000000000001") return "1";
    if (hex === "0x00000000000000000000000000000000000000000001a5661dbcd0208fc00000") {
      // This is 1,990,000 * 10^18 in hex
      return "1,990,000 (with 18 decimals)";
    }
    return "Unknown value";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Blockchain State Change Analysis
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Detailed analysis of state changes during ETHG Recovery contract deployment
        </p>
      </div>

      {/* Transaction Info */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="w-4 h-4" />
        <AlertDescription>
          <div className="font-semibold text-green-800 mb-2">Contract Deployment Confirmed</div>
          <div className="text-green-700 text-sm">
            Transaction {transactionHash} successfully deployed your ETHG Recovery contract with complete state initialization.
          </div>
        </AlertDescription>
      </Alert>

      {/* Address State Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Address State Changes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {addressChanges.map((change, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-sm font-semibold">
                  {change.address.length > 20 ? 
                    `${change.address.slice(0, 8)}...${change.address.slice(-8)}` : 
                    change.address
                  }
                </div>
                <Badge className={change.difference.startsWith('+') ? 'bg-green-100 text-green-800' : 
                                change.difference.startsWith('-') ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'}>
                  {change.difference}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-700">Before</div>
                  <div className="text-gray-600">{change.before}</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-700">After</div>
                  <div className="text-gray-600">{change.after}</div>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-blue-600 italic">
                {change.description}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Storage Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Contract Storage Changes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            These storage changes show how your ERC20 contract was initialized with token data:
          </div>
          
          {storageChanges.map((change, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-800 mb-2">Storage Slot {index + 1}</div>
              
              <div className="space-y-2">
                <div>
                  <div className="text-xs font-medium text-gray-700">Storage Address:</div>
                  <div className="font-mono text-xs text-gray-600 break-all">{change.slot}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-gray-700">Before:</div>
                    <div className="font-mono text-xs text-gray-600">
                      {convertHexToDecimal(change.before)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-700">After:</div>
                    <div className="font-mono text-xs text-green-700 font-semibold">
                      {convertHexToDecimal(change.after)}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-blue-700 italic bg-white p-2 rounded">
                  {change.description}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-800">Deployment Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-purple-700">
            <div className="font-semibold mb-2">Contract Deployment Results:</div>
            <div className="space-y-1 text-sm">
              <div>✓ ERC20 contract successfully deployed at 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247</div>
              <div>✓ Total supply of 1,990,000 tokens initialized in contract storage</div>
              <div>✓ All tokens allocated to your deployer address (0x058C8FE0...368843)</div>
              <div>✓ Contract ownership established with proper access controls</div>
              <div>✓ Gas fee of 0.000282486 ETH paid for deployment</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-purple-800 mb-2">Technical Validation:</div>
            <div className="text-purple-700 text-sm space-y-1">
              <div>• Storage slots properly initialized with ERC20 standard data</div>
              <div>• Balance mappings correctly established for token holder</div>
              <div>• Ownership controls activated for administrative functions</div>
              <div>• Contract deployment confirmed with successful state changes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}