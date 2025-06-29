import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building,
  Users,
  Shield,
  TrendingUp,
  Gavel,
  DollarSign,
  Target,
  CheckCircle,
  Star,
  Award
} from "lucide-react";

export default function FoundationFundraising() {
  const [donationAmount, setDonationAmount] = useState("");

  const missionStats = {
    recoveredValue: "$648,740",
    affectedUsers: "10,000+",
    honeypotContracts: "247 identified",
    legalCases: "3 pending",
    communitySize: "15,000 members"
  };

  const fundraisingGoals = [
    {
      purpose: "Legal Defense Fund",
      target: "$50,000",
      raised: "$12,500",
      percentage: 25,
      priority: "Critical",
      description: "Cover legal fees for challenging honeypot contracts in court"
    },
    {
      purpose: "Smart Contract Audits",
      target: "$25,000", 
      raised: "$8,750",
      percentage: 35,
      priority: "High",
      description: "Professional security audits for recovery contracts"
    },
    {
      purpose: "Gas Fee Reserve",
      target: "$15,000",
      raised: "$11,200",
      percentage: 75,
      priority: "Medium",
      description: "Cover transaction costs for mass recovery operations"
    },
    {
      purpose: "Community Outreach",
      target: "$10,000",
      raised: "$3,400",
      percentage: 34,
      priority: "Medium", 
      description: "Education and awareness campaigns"
    }
  ];

  const legalStrategy = [
    {
      phase: "Documentation",
      status: "Complete",
      description: "Comprehensive evidence collection of honeypot schemes",
      cost: "$5,000"
    },
    {
      phase: "Legal Consultation",
      status: "In Progress",
      description: "Blockchain law specialists reviewing cases",
      cost: "$15,000"
    },
    {
      phase: "Class Action Preparation",
      status: "Pending",
      description: "Organize affected parties for collective legal action",
      cost: "$25,000"
    },
    {
      phase: "Recovery Implementation",
      status: "Future",
      description: "Execute legal recovery contracts for community",
      cost: "$30,000"
    }
  ];

  const platformAssets = [
    {
      asset: "ETHGR Recovery Tokens",
      value: "$648,740",
      type: "Secured Assets",
      status: "Fully Operational"
    },
    {
      asset: "Quantum Liquidity Scanner",
      value: "16 LP Tokens Discovered",
      type: "Analysis Platform",
      status: "Operational"
    },
    {
      asset: "Multi-Blockchain Database",
      value: "151 LP Tokens",
      type: "Data Intelligence",
      status: "Active Scanning"
    },
    {
      asset: "Legal Recovery Framework",
      value: "Proven Success Model",
      type: "Methodology",
      status: "Ready to Scale"
    }
  ];

  const donationTiers = [
    {
      amount: "$25",
      tier: "Community Supporter",
      benefits: ["Monthly updates", "Community access"],
      impact: "Covers 1 hour of legal research"
    },
    {
      amount: "$100", 
      tier: "Recovery Advocate",
      benefits: ["Quarterly reports", "Priority support", "Beta access"],
      impact: "Funds 1 smart contract audit"
    },
    {
      amount: "$500",
      tier: "Legal Defender",
      benefits: ["Direct updates", "Strategy calls", "Recognition"],
      impact: "Covers 10 recovery transactions"
    },
    {
      amount: "$1,000",
      tier: "Foundation Partner",
      benefits: ["Board consultation", "Custom reports", "VIP status"],
      impact: "Funds major legal milestone"
    }
  ];

  const totalRaised = fundraisingGoals.reduce((sum, goal) => {
    return sum + parseFloat(goal.raised.replace('$', '').replace(',', ''));
  }, 0);

  const totalTarget = fundraisingGoals.reduce((sum, goal) => {
    return sum + parseFloat(goal.target.replace('$', '').replace(',', ''));
  }, 0);

  const overallProgress = (totalRaised / totalTarget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-orange-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Building className="h-12 w-12 text-pink-400" />
            <h1 className="text-5xl font-bold text-white">
              DeFi Recovery Foundation
            </h1>
          </div>
          <p className="text-2xl text-orange-300">
            Building Legal Framework for Community Protection Against Honeypot Schemes
          </p>
        </div>

        {/* Mission Statement */}
        <Alert className="border-pink-500 bg-pink-500/10">
          <Shield className="h-6 w-6 text-pink-500" />
          <AlertDescription className="text-pink-200 text-center text-xl">
            <strong>Our Mission:</strong> Establish a properly funded legal foundation to systematically challenge honeypot contracts, recover trapped funds, and protect the DeFi community through legitimate legal channels.
          </AlertDescription>
        </Alert>

        {/* Platform Assets */}
        <Card className="bg-gray-800/50 border-pink-500">
          <CardHeader>
            <CardTitle className="text-white">Foundation Assets & Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformAssets.map((asset, index) => (
                <div key={index} className="p-4 bg-pink-600/10 border border-pink-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-pink-400 font-medium">{asset.asset}</h5>
                    <Badge className="bg-pink-600 text-white">{asset.status}</Badge>
                  </div>
                  <p className="text-white font-bold mb-1">{asset.value}</p>
                  <p className="text-gray-300 text-sm">{asset.type}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fundraising Progress */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white">Legal Foundation Funding Progress</CardTitle>
            <CardDescription className="text-orange-300">
              ${totalRaised.toLocaleString()} raised of ${totalTarget.toLocaleString()} goal ({overallProgress.toFixed(1)}% complete)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="mb-6">
                <Progress value={overallProgress} className="h-3" />
              </div>
              
              {fundraisingGoals.map((goal, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-orange-400 font-medium">{goal.purpose}</h5>
                    <Badge className={`${
                      goal.priority === 'Critical' ? 'bg-red-600' :
                      goal.priority === 'High' ? 'bg-orange-600' :
                      'bg-yellow-600'
                    } text-white`}>
                      {goal.priority}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{goal.raised} raised</span>
                      <span className="text-orange-300">{goal.target} goal</span>
                    </div>
                    <Progress value={goal.percentage} className="h-2" />
                  </div>
                  
                  <p className="text-gray-300 text-sm">{goal.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Legal Strategy */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white">Legal Recovery Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {legalStrategy.map((phase, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    phase.status === 'Complete' ? 'bg-green-600' :
                    phase.status === 'In Progress' ? 'bg-blue-600' :
                    phase.status === 'Pending' ? 'bg-orange-600' :
                    'bg-gray-600'
                  }`}>
                    {phase.status === 'Complete' ? <CheckCircle className="h-6 w-6 text-white" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium">{phase.phase}</h5>
                    <p className="text-gray-300 text-sm">{phase.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${
                      phase.status === 'Complete' ? 'bg-green-600' :
                      phase.status === 'In Progress' ? 'bg-blue-600' :
                      phase.status === 'Pending' ? 'bg-orange-600' :
                      'bg-gray-600'
                    } text-white mb-1`}>
                      {phase.status}
                    </Badge>
                    <p className="text-gray-400 text-xs">{phase.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Donation Tiers */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white">Support the Foundation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donationTiers.map((tier, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="text-center mb-4">
                    <h5 className="text-purple-400 font-bold text-lg">{tier.tier}</h5>
                    <p className="text-white text-3xl font-bold">{tier.amount}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-300 text-sm font-medium">Benefits:</p>
                    {tier.benefits.map((benefit, idx) => (
                      <p key={idx} className="text-gray-400 text-xs">• {benefit}</p>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-green-400 text-sm font-medium">Impact:</p>
                    <p className="text-green-300 text-xs">{tier.impact}</p>
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Donate {tier.amount}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Impact */}
        <Card className="bg-gray-800/50 border-gold-500">
          <CardHeader>
            <CardTitle className="text-white">Community Impact Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="p-4 bg-gold-600/10 border border-gold-600/30 rounded">
                <DollarSign className="h-8 w-8 text-gold-400 mx-auto mb-2" />
                <p className="text-white text-lg font-bold">{missionStats.recoveredValue}</p>
                <p className="text-gold-300 text-sm">Already Recovered</p>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white text-lg font-bold">{missionStats.affectedUsers}</p>
                <p className="text-blue-300 text-sm">Affected Users</p>
              </div>
              
              <div className="p-4 bg-red-600/10 border border-red-600/30 rounded">
                <Target className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <p className="text-white text-lg font-bold">{missionStats.honeypotContracts}</p>
                <p className="text-red-300 text-sm">Honeypots Identified</p>
              </div>
              
              <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                <Gavel className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-white text-lg font-bold">{missionStats.legalCases}</p>
                <p className="text-purple-300 text-sm">Legal Cases</p>
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <Star className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-white text-lg font-bold">{missionStats.communitySize}</p>
                <p className="text-green-300 text-sm">Community Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button className="bg-pink-600 hover:bg-pink-700 text-lg py-8">
            <DollarSign className="h-6 w-6 mr-2" />
            Donate Now
          </Button>
          
          <Button className="bg-orange-600 hover:bg-orange-700 text-lg py-8">
            <Award className="h-6 w-6 mr-2" />
            Become Partner
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 text-lg py-8">
            <Users className="h-6 w-6 mr-2" />
            Join Community
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700 text-lg py-8">
            <Gavel className="h-6 w-6 mr-2" />
            Legal Resources
          </Button>
        </div>

        {/* Success Outlook */}
        <Alert className="border-green-500 bg-green-500/10">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-200 text-center">
            <strong>Foundation Outlook:</strong> With proven recovery capabilities ($648,740 ETHGR success) and comprehensive legal strategy, this foundation is positioned to become the leading authority for legitimate DeFi recovery operations and community protection.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}