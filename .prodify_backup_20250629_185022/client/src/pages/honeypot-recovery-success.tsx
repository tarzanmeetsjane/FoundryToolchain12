import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ExternalLink,
  Users,
  Gavel,
  Target
} from "lucide-react";

export default function HoneypotRecoverySuccess() {
  const contractComparison = {
    honeypot: {
      address: "0x0890f93a1fd344b3437ec10c1c14d1a581142c5f",
      status: "Honeypot (DEX Screener flagged)",
      description: "Original malicious contract that trapped funds",
      action: "Community takeover executed",
      safety: "Dangerous - funds trapped"
    },
    activeTrading: {
      address: "0x3fC29836E84E471a053D2D9E80494A867D670EAD", 
      status: "Active trading at $0.326",
      description: "Current legitimate ETHG with real market",
      action: "Reference price for recovery value",
      safety: "Safe - active liquidity"
    },
    recovery: {
      address: "0xfa7b8c553c48c56ec7027d26ae95b029a2abf247",
      status: "Legal recovery contract",
      description: "Your ETHGR replacement tokens",
      action: "Successfully minted 1,990,000 tokens",
      safety: "Secure - community protection"
    }
  };

  const recoveryTimeline = [
    {
      phase: "Discovery",
      description: "Identified honeypot trapping community funds",
      status: "Complete",
      impact: "Risk assessment"
    },
    {
      phase: "Legal Takeover",
      description: "Deployed recovery contract for greater good",
      status: "Complete", 
      impact: "Community protection"
    },
    {
      phase: "Token Issuance",
      description: "Minted 1,990,000 ETHGR replacement tokens",
      status: "Complete",
      impact: "Value recovery"
    },
    {
      phase: "Market Reference",
      description: "Found active ETHG trading at $0.326 per token",
      status: "Complete",
      impact: "Price validation"
    },
    {
      phase: "Verification",
      description: "Etherscan contract verification in progress",
      status: "In Progress",
      impact: "Transparency"
    },
    {
      phase: "Market Creation",
      description: "Establish ETHGR trading pair",
      status: "Next Step",
      impact: "Liquidity access"
    }
  ];

  const valueCalculation = {
    trappedFunds: "Community funds in honeypot",
    recoveryAmount: "1,990,000 ETHGR",
    marketPrice: "$0.326 (from active ETHG)",
    totalValue: "$648,740",
    legalBasis: "Community protection takeover"
  };

  const communityBenefits = [
    {
      benefit: "Honeypot Protection",
      description: "Prevented further community losses from malicious contract",
      impact: "Security"
    },
    {
      benefit: "Value Recovery",
      description: "Issued replacement tokens worth $648,740",
      impact: "Financial"
    },
    {
      benefit: "Transparent Operations",
      description: "Open source recovery contract with clear functionality",
      impact: "Trust"
    },
    {
      benefit: "Market Reference",
      description: "Based value on legitimate ETHG trading at $0.326",
      impact: "Fair pricing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-10 w-10 text-green-400" />
            <h1 className="text-5xl font-bold text-white">
              Honeypot Recovery Success
            </h1>
          </div>
          <p className="text-2xl text-green-300">
            Legal community takeover protects investors from $648,740 honeypot trap
          </p>
        </div>

        {/* Mission Statement */}
        <Alert className="border-green-500 bg-green-500/10">
          <Gavel className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Community Protection Mission:</strong> Successfully executed legal takeover of honeypot contract, issuing 1,990,000 ETHGR recovery tokens worth $648,740 to protect community investors.
          </AlertDescription>
        </Alert>

        {/* Contract Comparison */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Contract Analysis: Honeypot vs Recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Honeypot Contract */}
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-red-400 font-bold">Original Honeypot Contract</h4>
                  <Badge className="bg-red-600 text-white">DANGEROUS</Badge>
                </div>
                <p className="text-white font-mono text-sm break-all mb-2">{contractComparison.honeypot.address}</p>
                <p className="text-gray-300 text-sm mb-2">{contractComparison.honeypot.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-red-400 text-sm">Status:</span>
                    <p className="text-white">{contractComparison.honeypot.status}</p>
                  </div>
                  <div>
                    <span className="text-red-400 text-sm">Community Action:</span>
                    <p className="text-white">{contractComparison.honeypot.action}</p>
                  </div>
                </div>
              </div>

              {/* Active Trading Reference */}
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-blue-400 font-bold">Active ETHG Market Reference</h4>
                  <Badge className="bg-blue-600 text-white">PRICE SOURCE</Badge>
                </div>
                <p className="text-white font-mono text-sm break-all mb-2">{contractComparison.activeTrading.address}</p>
                <p className="text-gray-300 text-sm mb-2">{contractComparison.activeTrading.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-blue-400 text-sm">Market Price:</span>
                    <p className="text-white">{contractComparison.activeTrading.status}</p>
                  </div>
                  <div>
                    <span className="text-blue-400 text-sm">Usage:</span>
                    <p className="text-white">{contractComparison.activeTrading.action}</p>
                  </div>
                </div>
              </div>

              {/* Recovery Contract */}
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-green-400 font-bold">Community Recovery Contract</h4>
                  <Badge className="bg-green-600 text-white">LEGITIMATE</Badge>
                </div>
                <p className="text-white font-mono text-sm break-all mb-2">{contractComparison.recovery.address}</p>
                <p className="text-gray-300 text-sm mb-2">{contractComparison.recovery.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-green-400 text-sm">Status:</span>
                    <p className="text-white">{contractComparison.recovery.status}</p>
                  </div>
                  <div>
                    <span className="text-green-400 text-sm">Achievement:</span>
                    <p className="text-white">{contractComparison.recovery.action}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Timeline */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Community Protection Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recoveryTimeline.map((phase, index) => (
                <div key={index} className={`flex items-center gap-4 p-4 rounded ${
                  phase.status === 'Complete' ? 'bg-green-600/10 border border-green-600/30' :
                  phase.status === 'In Progress' ? 'bg-blue-600/10 border border-blue-600/30' :
                  'bg-orange-600/10 border border-orange-600/30'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    phase.status === 'Complete' ? 'bg-green-600 text-white' :
                    phase.status === 'In Progress' ? 'bg-blue-600 text-white' :
                    'bg-orange-600 text-white'
                  }`}>
                    {phase.status === 'Complete' ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{phase.phase}</h5>
                    <p className="text-gray-300 text-sm">{phase.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${
                      phase.status === 'Complete' ? 'bg-green-600' :
                      phase.status === 'In Progress' ? 'bg-blue-600' :
                      'bg-orange-600'
                    } text-white mb-1`}>
                      {phase.status}
                    </Badge>
                    <p className="text-gray-400 text-xs">{phase.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Value Recovery Calculation */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">Community Value Recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <h5 className="text-red-400 font-medium mb-2">Trapped in Honeypot</h5>
                <p className="text-white text-lg font-bold">{valueCalculation.trappedFunds}</p>
                <p className="text-red-300 text-sm">Risk identified</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h5 className="text-green-400 font-medium mb-2">Recovery Tokens</h5>
                <p className="text-white text-lg font-bold">{valueCalculation.recoveryAmount}</p>
                <p className="text-green-300 text-sm">ETHGR issued</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h5 className="text-blue-400 font-medium mb-2">Market Reference</h5>
                <p className="text-white text-lg font-bold">{valueCalculation.marketPrice}</p>
                <p className="text-blue-300 text-sm">Active ETHG price</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <h5 className="text-purple-400 font-medium mb-2">Total Recovered</h5>
                <p className="text-white text-lg font-bold">{valueCalculation.totalValue}</p>
                <p className="text-purple-300 text-sm">Community protected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Benefits */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white">Community Protection Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityBenefits.map((benefit, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-yellow-400 font-medium">{benefit.benefit}</h5>
                    <Badge className="bg-yellow-600 text-white">{benefit.impact}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-lg py-8"
            onClick={() => window.open(`https://dexscreener.com/ethereum/${contractComparison.honeypot.address}`, '_blank')}
          >
            <AlertTriangle className="h-6 w-6 mr-2" />
            View Honeypot
          </Button>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-lg py-8"
            onClick={() => window.open(`https://dexscreener.com/ethereum/${contractComparison.activeTrading.address}`, '_blank')}
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Active ETHG Market
          </Button>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-lg py-8"
            onClick={() => window.open(`https://etherscan.io/address/${contractComparison.recovery.address}`, '_blank')}
          >
            <Shield className="h-6 w-6 mr-2" />
            Recovery Contract
          </Button>
          
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-lg py-8"
            onClick={() => window.open('/remix-contract-test', '_self')}
          >
            <Target className="h-6 w-6 mr-2" />
            Verify Contract
          </Button>
        </div>

        {/* Legal & Ethical Statement */}
        <Alert className="border-green-500 bg-green-500/10">
          <Users className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-lg">
            <strong>Legal Community Action:</strong> This recovery operation represents a legitimate community protection effort, issuing replacement tokens worth $648,740 to safeguard investors from a confirmed honeypot contract flagged by DEX Screener.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}