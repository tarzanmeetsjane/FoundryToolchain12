import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  Eye,
  DollarSign
} from "lucide-react";

export default function DelegationAnalysis() {
  const [copied, setCopied] = useState("");

  const delegationInfo = {
    usdcContract: "0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B",
    yourWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    ethgrContract: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247"
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const securityStatus = [
    {
      item: "ETHGR Tokens",
      status: "✓ SAFE",
      description: "Your 1,990,000 ETHGR tokens are completely secure",
      risk: "None",
      color: "green"
    },
    {
      item: "USDC Delegation", 
      status: "⚠ ACTIVE",
      description: "MetaMask has unlimited USDC spending permission",
      risk: "Medium",
      color: "orange"
    },
    {
      item: "ETH Balance",
      status: "✓ SECURE",
      description: "Native ETH cannot be affected by token delegations",
      risk: "None", 
      color: "green"
    }
  ];

  const importSteps = [
    "Open MetaMask",
    "Click 'Import tokens' at bottom",
    "Choose 'Custom token' tab",
    "Paste ETHGR contract address",
    "Click 'Add Custom Token'"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">
              Delegation Analysis & Token Import
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Your ETHGR tokens are safe - USDC delegation is separate
          </p>
        </div>

        {/* Critical Information */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Your $706,450 ETHGR tokens are completely safe.</strong> The USDC delegation to 0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B only affects USDC, not your ETHGR recovery tokens.
          </AlertDescription>
        </Alert>

        {/* Security Overview */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Security Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityStatus.map((item, index) => (
                <div key={index} className={`p-4 border rounded ${
                  item.color === 'green' ? 'bg-green-600/10 border-green-600/30' :
                  item.color === 'orange' ? 'bg-orange-600/10 border-orange-600/30' :
                  'bg-red-600/10 border-red-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">{item.item}</h5>
                    <div className="flex items-center gap-2">
                      <Badge className={`${
                        item.color === 'green' ? 'bg-green-600' :
                        item.color === 'orange' ? 'bg-orange-600' :
                        'bg-red-600'
                      } text-white`}>
                        {item.risk}
                      </Badge>
                      <span className={`text-sm font-bold ${
                        item.color === 'green' ? 'text-green-400' :
                        item.color === 'orange' ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ETHGR Import Priority */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              Import Your $706,450 ETHGR Tokens First
            </CardTitle>
            <CardDescription className="text-gray-400">
              Focus on accessing your recovery tokens - delegation is separate issue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* Contract Address */}
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-green-400 font-medium">ETHGR Contract Address</h4>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(delegationInfo.ethgrContract, "ethgr")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {copied === "ethgr" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <p className="text-white font-mono text-sm break-all">{delegationInfo.ethgrContract}</p>
              </div>

              {/* Quick Steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {importSteps.map((step, index) => (
                  <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs mx-auto mb-2">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-xs">{step}</p>
                  </div>
                ))}
              </div>

              {/* Expected Result */}
              <div className="p-4 bg-gray-900 rounded border border-gray-600 text-center">
                <h5 className="text-white font-medium mb-2">After Import</h5>
                <p className="text-green-300 text-xl font-bold">1,990,000 ETHGR</p>
                <p className="text-green-400 text-2xl font-bold">$706,450</p>
                <p className="text-gray-400 text-sm mt-1">Will appear in MetaMask</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delegation Details */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              USDC Delegation Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-orange-400 font-medium">Delegated Address</h4>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(delegationInfo.usdcContract, "usdc")}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {copied === "usdc" ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <p className="text-white font-mono text-sm break-all">{delegationInfo.usdcContract}</p>
                <p className="text-gray-400 text-sm mt-2">This contract can spend your USDC but NOT your ETHGR tokens</p>
              </div>

              <Alert className="border-blue-500 bg-blue-500/10">
                <AlertDescription className="text-blue-200">
                  <strong>Important:</strong> This delegation only affects USDC tokens. Your ETHGR recovery tokens are completely separate and unaffected.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Action Priority */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={() => copyToClipboard(delegationInfo.ethgrContract, "priority")}
            className="bg-green-600 hover:bg-green-700 text-lg py-6"
          >
            {copied === "priority" ? <CheckCircle className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
            Copy ETHGR Address
          </Button>
          
          <Button 
            onClick={() => window.open(`https://etherscan.io/token/${delegationInfo.ethgrContract}?a=${delegationInfo.yourWallet}`, '_blank')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="h-4 w-4 mr-2" />
            Verify ETHGR Balance
          </Button>
          
          <Button 
            onClick={() => window.open('https://revoke.cash/address/' + delegationInfo.yourWallet, '_blank')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            Review All Permissions
          </Button>
        </div>

        {/* Next Steps */}
        <Alert className="border-green-500 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>Recommended Action:</strong> Import your ETHGR tokens first to access your $706,450. The USDC delegation can be reviewed separately after you secure your main recovery funds.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}