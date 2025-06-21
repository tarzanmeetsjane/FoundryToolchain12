import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wallet,
  DollarSign,
  ExternalLink,
  Search
} from "lucide-react";

export default function TokenApprovalManager() {
  const [walletAddress, setWalletAddress] = useState("0x058C8FE01E5c9eaC6ee19e6673673B549B368843");

  const commonTokens = [
    {
      name: "USDC",
      address: "0xA0b86a33E6441b8A41FC4e40c8F9E6b4e8D2f76B",
      symbol: "USDC",
      risk: "HIGH"
    },
    {
      name: "USDT",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT", 
      risk: "HIGH"
    },
    {
      name: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      risk: "MEDIUM"
    },
    {
      name: "WETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "WETH",
      risk: "MEDIUM"
    }
  ];

  const revocationMethods = [
    {
      name: "Etherscan Token Approvals",
      url: `https://etherscan.io/tokenapprovalchecker?a=${walletAddress}`,
      description: "Official Etherscan tool to view and revoke token approvals",
      pros: ["Official tool", "Free to use", "Comprehensive view"],
      cons: ["Manual process", "Gas fees required"]
    },
    {
      name: "Revoke.cash",
      url: `https://revoke.cash/address/${walletAddress}`,
      description: "Popular third-party tool for managing token approvals",
      pros: ["User-friendly interface", "Batch revocations", "Mobile friendly"],
      cons: ["Third-party service", "Gas fees for revocations"]
    },
    {
      name: "DeBank Approval Manager",
      url: `https://debank.com/profile/${walletAddress}/approval`,
      description: "Portfolio tracker with approval management",
      pros: ["Integrated portfolio view", "Risk assessment", "Clean interface"],
      cons: ["Limited to major tokens", "Requires wallet connection"]
    }
  ];

  const emergencyApprovals = [
    {
      contract: "0x710fad1041f0ee79916bb1a6adef662303bb8b6e",
      name: "CrimeEnjoyor (Malicious)",
      risk: "CRITICAL",
      action: "REVOKE IMMEDIATELY"
    },
    {
      contract: "Uniswap Router",
      name: "Unlimited Token Swaps",
      risk: "HIGH",
      action: "Set Specific Limits"
    },
    {
      contract: "Unknown Contracts",
      name: "Unrecognized Approvals",
      risk: "HIGH", 
      action: "Investigate & Revoke"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-red-400" />
            <h1 className="text-4xl font-bold text-white">
              Token Approval Security Manager
            </h1>
          </div>
          <p className="text-xl text-gray-300">
            Check and revoke dangerous token approvals on your wallet
          </p>
        </div>

        {/* Critical Alert */}
        <Alert className="border-red-500 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-200">
            <strong>SECURITY PRIORITY:</strong> Token approvals can be as dangerous as ETH delegation. Malicious contracts with unlimited token access can drain your entire token balance.
          </AlertDescription>
        </Alert>

        {/* Wallet Input */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-400" />
              Wallet Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="Enter wallet address"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Check Approvals
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Revocations */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Emergency Revocations Needed
            </CardTitle>
            <CardDescription className="text-red-300">
              High-risk approvals that should be revoked immediately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyApprovals.map((approval, index) => (
                <div key={index} className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-red-400 font-medium">{approval.name}</h4>
                      <p className="text-gray-300 text-sm">{approval.contract}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-600 text-white mb-2">{approval.risk}</Badge>
                      <p className="text-red-300 text-sm">{approval.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revocation Tools */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Token Approval Revocation Tools</CardTitle>
            <CardDescription className="text-gray-400">
              Use these tools to check and revoke dangerous token approvals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {revocationMethods.map((method, index) => (
                <div key={index} className="p-4 bg-gray-700/30 border border-gray-600 rounded">
                  <h4 className="text-white font-medium mb-2">{method.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{method.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div>
                      <h5 className="text-green-400 text-xs font-medium">Pros:</h5>
                      <ul className="text-gray-400 text-xs">
                        {method.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-red-400 text-xs font-medium">Cons:</h5>
                      <ul className="text-gray-400 text-xs">
                        {method.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open(method.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Tool
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Token Risks */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Common Token Approval Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonTokens.map((token, index) => (
                <div key={index} className="p-4 bg-gray-700/20 border border-gray-600 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{token.name} ({token.symbol})</h4>
                    <Badge className={`${
                      token.risk === 'HIGH' ? 'bg-red-600' :
                      token.risk === 'MEDIUM' ? 'bg-yellow-600' :
                      'bg-green-600'
                    } text-white`}>
                      {token.risk}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm font-mono break-all">{token.address}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Revocation */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">How to Revoke Token Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded text-center">
                <Badge className="bg-blue-600 text-white mb-2">Step 1</Badge>
                <h4 className="text-blue-400 font-medium mb-2">Check Approvals</h4>
                <p className="text-gray-300 text-sm">Use Etherscan or Revoke.cash to view all approvals</p>
              </div>
              
              <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded text-center">
                <Badge className="bg-yellow-600 text-white mb-2">Step 2</Badge>
                <h4 className="text-yellow-400 font-medium mb-2">Identify Risks</h4>
                <p className="text-gray-300 text-sm">Look for unlimited approvals and unknown contracts</p>
              </div>
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded text-center">
                <Badge className="bg-red-600 text-white mb-2">Step 3</Badge>
                <h4 className="text-red-400 font-medium mb-2">Revoke Dangerous</h4>
                <p className="text-gray-300 text-sm">Priority: CrimeEnjoyor and unlimited approvals</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded text-center">
                <Badge className="bg-green-600 text-white mb-2">Step 4</Badge>
                <h4 className="text-green-400 font-medium mb-2">Monitor Regularly</h4>
                <p className="text-gray-300 text-sm">Check approvals monthly for security</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg mr-4"
            onClick={() => window.open(`https://etherscan.io/tokenapprovalchecker?a=${walletAddress}`, '_blank')}
          >
            <Shield className="h-5 w-5 mr-2" />
            Check My Approvals
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4"
            onClick={() => window.open(`https://revoke.cash/address/${walletAddress}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Revoke.cash Tool
          </Button>
        </div>

        {/* Final Warning */}
        <Alert className="border-orange-500 bg-orange-500/10">
          <DollarSign className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-orange-200">
            <strong>Priority Action:</strong> With $706,450 in tokens, checking and revoking dangerous approvals is critical. Focus on unlimited USDC/USDT approvals and any contracts you don't recognize.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}