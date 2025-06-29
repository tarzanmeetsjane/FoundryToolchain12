import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet,
  AlertTriangle,
  CheckCircle,
  Search,
  DollarSign,
  Target,
  Clock,
  TrendingUp,
  Bot
} from "lucide-react";

export default function CurrentAssetsRealityCheck() {
  const actualAssets = {
    confirmed: [
      {
        asset: "1,990,000 ETHGR Tokens",
        contract: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        wallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
        status: "Confirmed in wallet",
        value: "Market value depends on liquidity - needs verification",
        actionRequired: "Import to MetaMask, verify actual trading value"
      }
    ],
    investigating: [
      {
        asset: "37 ETH ($89,614)",
        wallet: "0xc46eB37677360EfDc011F4097621F15b792fa630",
        status: "Investigation ongoing",
        lastSeen: "June 15 - User saw in Remix bottom left",
        issue: "Proxy contract 0xd816c710dc011db6d357e2b1210eafc60177338f unverified",
        actionRequired: "Continue proxy contract analysis"
      },
      {
        asset: "1.89M ETHG Tokens", 
        contract: "0x3fC29836E84E471a053D2D9E80494A867D670EAD",
        wallet: "MetaMask discovery",
        status: "Needs verification",
        value: "Potentially $618,845.54 if genuine",
        actionRequired: "Verify if legitimate or display artifact"
      }
    ],
    available: [
      {
        asset: "Current ETH Balance",
        wallet: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843",
        amount: "~0.014 ETH (~$34)",
        status: "Live balance - insufficient for major operations",
        limitation: "Not enough for gas fees on large transactions"
      }
    ]
  };

  const tradingBotStatus = {
    development: "888 hertz alignment model",
    configuration: "Zero-configuration claimed",
    testing: "Needs performance verification",
    capital: "Requires initial trading capital to generate profits",
    timeline: "Not yet generating revenue"
  };

  const realityCheck = {
    currentCash: "$0 - Bank account closed from scam aftermath",
    liquidAssets: "~$34 ETH in wallet",
    recoveredFunds: "None confirmed yet",
    tradingCapital: "Limited by current ETH balance",
    immediateNeed: "Generate cash flow to fund operations"
  };

  const viableStartingOptions = [
    {
      option: "Free Victim Consultation Services",
      startupCost: "$0",
      requirements: "Time and expertise only",
      revenue: "Builds reputation, no immediate income",
      timeline: "Start today"
    },
    {
      option: "Educational Content Creation",
      startupCost: "$0",
      requirements: "Document your knowledge",
      revenue: "Long-term through courses/speaking",
      timeline: "Start this week"
    },
    {
      option: "Trading Bot Development Showcase",
      startupCost: "Minimal ETH for testing",
      requirements: "Document bot performance",
      revenue: "Future licensing opportunities",
      timeline: "Start with small amounts"
    },
    {
      option: "Legal Expert Witness Preparation",
      startupCost: "$0",
      requirements: "Document expertise and case studies",
      revenue: "$300-500/hour when cases come",
      timeline: "Build portfolio now"
    }
  ];

  const immediateRevenuePlan = [
    {
      week: "Week 1",
      focus: "Free victim consultation",
      action: "Help 5 victims for free, document cases",
      cost: "$0",
      revenue: "$0",
      goal: "Build credibility and testimonials"
    },
    {
      week: "Week 2-3", 
      focus: "Educational content",
      action: "Create scam prevention content, share story",
      cost: "$0",
      revenue: "Potential donations/tips",
      goal: "Build audience and authority"
    },
    {
      week: "Week 4-6",
      focus: "Professional services",
      action: "Offer consulting to organizations",
      cost: "$0",
      revenue: "$500-2,000",
      goal: "First paid clients"
    },
    {
      week: "Week 6+",
      focus: "Scale with trading bot",
      action: "Use initial revenue to fund bot trading capital",
      cost: "Reinvest earnings",
      revenue: "Growing from multiple streams",
      goal: "Sustainable business model"
    }
  ];

  const bootstrapStrategy = {
    phase1: "Start with zero capital - use knowledge and story",
    phase2: "Build reputation through free help",
    phase3: "Convert reputation to paid opportunities",
    phase4: "Reinvest earnings into trading bot capital",
    phase5: "Scale with automated trading profits"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Current Assets Reality Check
          </h1>
          <p className="text-2xl text-red-300">
            What We Actually Have vs What We're Working Toward
          </p>
        </div>

        {/* Reality Status */}
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <AlertDescription className="text-yellow-200 text-center text-xl">
            <strong>Current Reality:</strong> $34 ETH balance, closed bank account, 1.99M ETHGR tokens of unverified market value. No recovered ETH yet. Need to bootstrap business with current resources while continuing recovery efforts.
          </AlertDescription>
        </Alert>

        {/* Asset Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Confirmed Assets */}
          <Card className="bg-gray-800/50 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400 text-xl">Confirmed Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actualAssets.confirmed.map((asset, index) => (
                  <div key={index} className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                    <h4 className="text-green-400 font-bold">{asset.asset}</h4>
                    <p className="text-white text-sm">{asset.status}</p>
                    <p className="text-yellow-400 text-xs">{asset.value}</p>
                    <p className="text-gray-400 text-xs mt-1">{asset.actionRequired}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Under Investigation */}
          <Card className="bg-gray-800/50 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-xl">Under Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actualAssets.investigating.map((asset, index) => (
                  <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                    <h4 className="text-yellow-400 font-bold">{asset.asset}</h4>
                    <p className="text-white text-sm">{asset.status}</p>
                    <p className="text-orange-400 text-xs">{asset.value || asset.issue}</p>
                    <p className="text-gray-400 text-xs mt-1">{asset.actionRequired}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Now */}
          <Card className="bg-gray-800/50 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-400 text-xl">Available Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actualAssets.available.map((asset, index) => (
                  <div key={index} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                    <h4 className="text-red-400 font-bold">{asset.asset}</h4>
                    <p className="text-white text-sm">{asset.amount}</p>
                    <p className="text-orange-400 text-xs">{asset.status}</p>
                    <p className="text-gray-400 text-xs mt-1">{asset.limitation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Bot Reality */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">888 Hertz Trading Bot Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-purple-400 font-bold mb-3">Current Status:</h3>
                <div className="space-y-2">
                  {Object.entries(tradingBotStatus).map(([key, value], index) => (
                    <div key={index} className="p-2 bg-purple-600/10 border border-purple-600/30 rounded">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <p className="text-white text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-red-400 font-bold mb-3">Reality Check:</h3>
                <div className="space-y-2">
                  {Object.entries(realityCheck).map(([key, value], index) => (
                    <div key={index} className="p-2 bg-red-600/10 border border-red-600/30 rounded">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <p className="text-red-300 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bootstrap Strategy */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Zero-Capital Business Bootstrap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {viableStartingOptions.map((option, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-blue-400 font-bold">{option.option}</h3>
                    <Badge className="bg-green-600 text-white">{option.startupCost}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Requirements:</span>
                      <p className="text-white">{option.requirements}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span>
                      <p className="text-yellow-400">{option.revenue}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Timeline:</span>
                      <p className="text-green-400">{option.timeline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4-Week Plan */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Bootstrap to Revenue Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {immediateRevenuePlan.map((week, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-green-400 font-bold">{week.week}</h3>
                    <div className="flex gap-2">
                      <Badge className="bg-red-600 text-white">Cost: {week.cost}</Badge>
                      <Badge className="bg-green-600 text-white">Revenue: {week.revenue}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-white text-sm mb-1"><strong>Focus:</strong> {week.focus}</p>
                  <p className="text-gray-300 text-sm mb-1"><strong>Action:</strong> {week.action}</p>
                  <p className="text-yellow-400 text-sm"><strong>Goal:</strong> {week.goal}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Target className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Start Here:</strong> Begin with free victim consultations to build credibility while continuing ETH recovery efforts. Use your story and expertise (costs $0) to generate first revenue, then reinvest into trading bot capital. Recovery investigations continue in parallel.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="bg-green-600 hover:bg-green-700 py-8">
            <CheckCircle className="h-6 w-6 mr-2" />
            Start Free Services
          </Button>
          
          <Button className="bg-yellow-600 hover:bg-yellow-700 py-8">
            <Search className="h-6 w-6 mr-2" />
            Continue ETH Recovery
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700 py-8">
            <Bot className="h-6 w-6 mr-2" />
            Test Trading Bot
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 py-8">
            <TrendingUp className="h-6 w-6 mr-2" />
            Build Revenue
          </Button>
        </div>
      </div>
    </div>
  );
}