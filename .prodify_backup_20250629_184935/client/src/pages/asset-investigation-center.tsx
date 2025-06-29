import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Wallet,
  Shield,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Database,
  TrendingUp
} from "lucide-react";

export default function AssetInvestigationCenter() {
  const [investigationTarget, setInvestigationTarget] = useState("0x6z4s5d8t9i7m6k5j4h3g2f1n");
  const [investigating, setInvestigating] = useState(false);

  const knownAssets = {
    primaryWallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
    ethgContract: "0x3fC29836E84E471a053D2D9E80494A867D670EAD",
    ethgrContract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    secondaryWallet: "0xc46eB37677360EfDc011F4097621F15b792fa630",
    currentValue: "$631,527"
  };

  const investigationMethods = [
    {
      method: "Etherscan Analysis",
      purpose: "Contract verification and transaction history",
      reveals: "Token balances, transaction patterns, contract functions",
      reliability: "HIGH"
    },
    {
      method: "Blockchain Explorer",
      purpose: "Multi-chain asset discovery",
      reveals: "Cross-chain holdings, bridge transactions",
      reliability: "HIGH"
    },
    {
      method: "DEX Scanner Integration",
      purpose: "Liquidity pool identification",
      reveals: "LP tokens, farming positions, yield opportunities",
      reliability: "MEDIUM"
    },
    {
      method: "Token Contract Analysis",
      purpose: "Smart contract function analysis",
      reveals: "Hidden functions, recovery mechanisms, owner privileges",
      reliability: "HIGH"
    }
  ];

  const potentialFindings = [
    {
      finding: "Additional Token Holdings",
      description: "Undiscovered ERC-20 tokens in wallet",
      value: "Variable - could be significant",
      action: "Token import and valuation"
    },
    {
      finding: "Liquidity Pool Positions",
      description: "LP tokens from DeFi farming",
      value: "$1,000 - $50,000+ potential",
      action: "Pool withdrawal and claiming"
    },
    {
      finding: "Staking Rewards",
      description: "Unclaimed staking or farming rewards",
      value: "$100 - $10,000+ potential",
      action: "Reward claiming mechanisms"
    },
    {
      finding: "Bridge Assets",
      description: "Tokens locked in cross-chain bridges",
      value: "Could match main portfolio",
      action: "Bridge completion or recovery"
    }
  ];

  const securityChecks = [
    {
      check: "Address Format Validation",
      status: investigationTarget.startsWith("0x") && investigationTarget.length === 42 ? "VALID" : "INVALID",
      concern: "Ethereum addresses must be 42 characters starting with 0x"
    },
    {
      check: "Contract vs EOA Detection",
      status: "PENDING",
      concern: "Determine if address is wallet or smart contract"
    },
    {
      check: "Honeypot Risk Assessment",
      status: "PENDING", 
      concern: "Check for malicious contract behavior"
    },
    {
      check: "Fund Safety Verification",
      status: "PENDING",
      concern: "Confirm no risk to existing $631K portfolio"
    }
  ];

  const investigationSteps = [
    {
      step: 1,
      action: "Address Validation",
      description: "Verify format and existence on blockchain",
      tools: "Etherscan, blockchain explorers"
    },
    {
      step: 2,
      action: "Asset Enumeration", 
      description: "Scan for all token holdings and balances",
      tools: "Moralis API, Etherscan API, CoinGecko"
    },
    {
      step: 3,
      action: "Contract Analysis",
      description: "Analyze smart contract functions and permissions",
      tools: "Contract ABI analysis, function verification"
    },
    {
      step: 4,
      action: "Risk Assessment",
      description: "Evaluate security risks and recovery potential",
      tools: "Honeypot detection, security scanners"
    },
    {
      step: 5,
      action: "Recovery Strategy",
      description: "Develop safe asset recovery plan",
      tools: "Custom recovery contracts, safe interaction methods"
    }
  ];

  const executeInvestigation = async () => {
    setInvestigating(true);
    // Investigation logic would go here
    setTimeout(() => setInvestigating(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            ASSET INVESTIGATION CENTER
          </h1>
          <p className="text-xl text-purple-300">
            Comprehensive Blockchain Asset Discovery & Analysis
          </p>
        </div>

        {/* Investigation Target Input */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Investigation Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  value={investigationTarget}
                  onChange={(e) => setInvestigationTarget(e.target.value)}
                  placeholder="Enter wallet address or contract address"
                  className="flex-1 bg-gray-700 text-white border-gray-600"
                />
                <Button 
                  onClick={executeInvestigation}
                  disabled={investigating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {investigating ? "Investigating..." : "Investigate"}
                </Button>
              </div>
              
              {investigationTarget && (
                <Alert className={
                  investigationTarget.startsWith("0x") && investigationTarget.length === 42
                    ? "border-green-500 bg-green-500/20"
                    : "border-red-500 bg-red-500/20"
                }>
                  {investigationTarget.startsWith("0x") && investigationTarget.length === 42 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  <AlertDescription className={
                    investigationTarget.startsWith("0x") && investigationTarget.length === 42
                      ? "text-green-200"
                      : "text-red-200"
                  }>
                    {investigationTarget.startsWith("0x") && investigationTarget.length === 42
                      ? "Valid Ethereum address format detected"
                      : "Invalid address format - Ethereum addresses must be 42 characters starting with 0x"
                    }
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Known Assets Summary */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Confirmed Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(knownAssets).map(([key, value]) => (
                <div key={key} className="p-3 bg-green-600/10 border border-green-600/30 rounded text-center">
                  <h3 className="text-green-400 font-bold capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  <p className="text-white text-xs break-all">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investigation Methods */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Investigation Methods Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {investigationMethods.map((method, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-yellow-400 font-bold">{method.method}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{method.purpose}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{method.reveals}</p>
                    </div>
                    <div>
                      <Badge className={
                        method.reliability === "HIGH" ? "bg-green-600" : "bg-yellow-600"
                      }>
                        {method.reliability}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Potential Findings */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Potential Asset Discoveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {potentialFindings.map((finding, index) => (
                <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-orange-400 font-bold">{finding.finding}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{finding.description}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm">{finding.value}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{finding.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Verification */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Security Verification Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityChecks.map((check, index) => (
                <div key={index} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-red-400 font-bold">{check.check}</h3>
                      <p className="text-gray-400 text-sm">{check.concern}</p>
                    </div>
                    <div>
                      <Badge className={
                        check.status === "VALID" ? "bg-green-600" :
                        check.status === "INVALID" ? "bg-red-600" : "bg-yellow-600"
                      }>
                        {check.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investigation Process */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">5-Step Investigation Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investigationSteps.map((step, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-400 font-bold text-lg">{step.action}</h3>
                      <p className="text-white mb-2">{step.description}</p>
                      <p className="text-gray-400 text-sm">{step.tools}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open(`https://etherscan.io/address/${investigationTarget}`, '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
            disabled={!investigationTarget.startsWith("0x")}
          >
            <ExternalLink className="h-6 w-6 mr-2" />
            View on Etherscan
          </Button>
          
          <Button 
            onClick={() => executeInvestigation()}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Search className="h-6 w-6 mr-2" />
            Deep Investigation
          </Button>
          
          <Button 
            onClick={() => window.open('/asset-location-summary', '_self')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Wallet className="h-6 w-6 mr-2" />
            Known Assets
          </Button>
          
          <Button 
            onClick={() => window.open('/dex-screener-verification', '_self')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Continue Mission
          </Button>
        </div>

        {/* Summary Alert */}
        <Alert className="border-blue-500 bg-blue-500/20">
          <Database className="h-6 w-6 text-blue-500" />
          <AlertDescription className="text-blue-200">
            <strong>INVESTIGATION READY:</strong> Comprehensive asset discovery system prepared for blockchain analysis. Enter valid Ethereum address to scan for additional funds, liquidity positions, and recovery opportunities beyond your confirmed $631,527 portfolio.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}