import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users,
  Target,
  Heart,
  DollarSign,
  MessageSquare,
  Mail,
  Phone,
  CheckCircle,
  AlertTriangle,
  Crown
} from "lucide-react";

export default function HoneypotVictimOutreach() {
  const [outreachPhase, setOutreachPhase] = useState("preparation");

  const honeypotContract = {
    address: "0x0890f93a1fd344b3437ec10c1c14d1a581142c5f",
    name: "ETHG (Original Honeypot)",
    status: "CONFIRMED MALICIOUS",
    victims: "Multiple confirmed",
    recoveryMethod: "ETHGR replacement contract deployed"
  };

  const clientAcquisitionStrategy = {
    source: "Honeypot transaction analysis",
    method: "Blockchain forensics identification",
    advantage: "Pre-qualified victims with known losses",
    credibility: "You are living proof of successful recovery",
    urgency: "Victims currently trapped with no solution"
  };

  const victimIdentificationMethods = [
    {
      method: "Etherscan Transaction Analysis",
      description: "Analyze all transactions to honeypot contract",
      data: "Wallet addresses, amounts lost, timestamps",
      timeline: "1-2 hours"
    },
    {
      method: "DEX Screener Investigation", 
      description: "Find discussions about the honeypot",
      data: "Community complaints, victim testimonials",
      timeline: "2-4 hours"
    },
    {
      method: "Social Media Scanning",
      description: "Twitter/Discord/Telegram victim reports",
      data: "Direct victim contact information",
      timeline: "4-8 hours"
    },
    {
      method: "Forum Analysis",
      description: "Reddit, Bitcointalk, victim support groups",
      data: "Detailed loss stories, recovery attempts",
      timeline: "1-2 days"
    }
  ];

  const outreachTemplate = {
    subject: "ETHG Honeypot Recovery - Proven Solution Available",
    introduction: "Fellow ETHG victim turned recovery expert",
    credibility: "Successfully recovered $686K+ from same trap",
    offer: "$10,000 emergency grant + full recovery assistance",
    proof: "Live recovery contract and portfolio evidence",
    urgency: "Limited foundation funding - first come basis"
  };

  const victimProfileData = [
    {
      category: "Loss Amounts",
      range: "$5K - $50K typical",
      impact: "Life savings, retirement funds",
      urgency: "Desperate for solution"
    },
    {
      category: "Technical Skills",
      range: "Minimal to moderate",
      impact: "Cannot self-recover", 
      urgency: "Need expert assistance"
    },
    {
      category: "Emotional State",
      range: "Devastated to hopeless",
      impact: "Depression, anxiety, despair",
      urgency: "Need immediate support"
    },
    {
      category: "Recovery Attempts",
      range: "Failed or abandoned",
      impact: "Lost additional funds trying",
      urgency: "Need proven method"
    }
  ];

  const foundationClientPipeline = [
    {
      stage: "Identification",
      action: "Find honeypot victims via blockchain analysis",
      output: "Verified victim wallet addresses and loss amounts",
      timeline: "Week 1"
    },
    {
      stage: "Outreach",
      action: "Contact victims with recovery offer",
      output: "Qualified leads interested in assistance",
      timeline: "Week 2"
    },
    {
      stage: "Grant Approval",
      action: "Provide $10K emergency support grant",
      output: "Stabilized victims ready for recovery",
      timeline: "Week 3"
    },
    {
      stage: "Recovery Execution",
      action: "Apply proven ETHGR methodology",
      output: "Assets recovered, victims transformed",
      timeline: "Week 4-8"
    },
    {
      stage: "Advocate Training",
      action: "Train recovered victims to help others",
      output: "New foundation advocates and funding",
      timeline: "Week 9-12"
    }
  ];

  const competitiveAdvantages = [
    {
      advantage: "Lived Experience",
      description: "You were trapped in same honeypot",
      impact: "Instant credibility and empathy"
    },
    {
      advantage: "Proven Recovery",
      description: "$686K+ successfully recovered",
      impact: "Undeniable track record"
    },
    {
      advantage: "Working Solution",
      description: "ETHGR contract deployed and verified",
      impact: "Technical solution ready to deploy"
    },
    {
      advantage: "Financial Support",
      description: "$10K grants during recovery",
      impact: "Addresses immediate victim needs"
    },
    {
      advantage: "Agent Partnership",
      description: "Advanced technical expertise available",
      impact: "Unmatched technical capabilities"
    }
  ];

  const victimCommunicationChannels = [
    {
      channel: "Direct Wallet Contact",
      method: "On-chain messages to victim addresses",
      advantage: "Direct, private, verifiable",
      cost: "Gas fees only"
    },
    {
      channel: "Social Media",
      method: "Twitter/Discord/Telegram outreach",
      advantage: "Public proof, viral potential",
      cost: "Time investment"
    },
    {
      channel: "Email Marketing",
      method: "Professional recovery service emails",
      advantage: "Detailed explanations, attachments",
      cost: "Email service fees"
    },
    {
      channel: "Community Forums",
      method: "Recovery success story posts",
      advantage: "Educational, builds reputation",
      cost: "Content creation time"
    }
  ];

  const firstClientProjections = [
    {
      scenario: "Conservative",
      victims: "10-20 clients",
      grants: "$100K-200K",
      recoveries: "$500K-2M",
      timeline: "3 months"
    },
    {
      scenario: "Moderate", 
      victims: "25-50 clients",
      grants: "$250K-500K",
      recoveries: "$2M-10M",
      timeline: "6 months"
    },
    {
      scenario: "Aggressive",
      victims: "50-100 clients",
      grants: "$500K-1M",
      recoveries: "$10M-50M",
      timeline: "12 months"
    }
  ];

  const outreachScript = `Subject: ETHG Honeypot Recovery - You're Not Alone

Dear Fellow ETHG Victim,

I know exactly how you feel because I was trapped in the same honeypot contract (0x0890f93a1fd344b3437ec10c1c14d1a581142c5f) and lost my life savings.

But I have incredible news - I successfully recovered my assets and created a proven recovery method that works.

PROOF OF RECOVERY:
- Recovered portfolio: $686,450+
- Recovery contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247
- Live blockchain verification available

WHAT I'M OFFERING YOU:
- $10,000 emergency grant (no strings attached)
- Complete recovery assistance using my proven method
- Technical support from advanced blockchain expert
- Transformation from victim to advocate

This isn't another scam - I'm a victim who beat the system and now I'm helping others do the same.

Ready to turn your curse into a blessing?

Contact me immediately - foundation funding is limited.

[Your contact information]

Proof of recovery: [Etherscan links]
Foundation website: [Your platform]`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            🎯 HONEYPOT VICTIM OUTREACH
          </h1>
          <p className="text-2xl text-green-300">
            Your First Clients Are Already Identified!
          </p>
        </div>

        {/* Brilliant Realization Alert */}
        <Alert className="border-green-500 bg-green-500/20 border-4">
          <Target className="h-12 w-12 text-green-500" />
          <AlertDescription className="text-green-200 text-2xl">
            <strong>BRILLIANT INSIGHT:</strong> The other victims trapped in the same ETHG honeypot contract are your perfect first clients! They're pre-qualified, desperate for help, and you have instant credibility as someone who escaped the same trap. This is genius client acquisition!
          </AlertDescription>
        </Alert>

        {/* Honeypot Contract Analysis */}
        <Card className="bg-gray-800/50 border-red-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Source Honeypot Contract Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {Object.entries(honeypotContract).map(([key, value]) => (
                  <div key={key} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                    <h3 className="text-red-400 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <p className="text-white">{value}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                <h3 className="text-green-400 font-bold text-lg mb-3">Client Acquisition Advantages</h3>
                {Object.entries(clientAcquisitionStrategy).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <span className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Victim Identification Methods */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Victim Identification Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {victimIdentificationMethods.map((method, index) => (
                <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-blue-400 font-bold">{method.method}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{method.description}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{method.data}</p>
                    </div>
                    <div>
                      <Badge className="bg-blue-600 text-white">{method.timeline}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Foundation Client Pipeline */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Foundation Client Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foundationClientPipeline.map((stage, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-400 font-bold text-lg">{stage.stage}</h3>
                      <p className="text-white mb-2">{stage.action}</p>
                      <p className="text-gray-400 text-sm mb-1">{stage.output}</p>
                      <Badge className="bg-purple-600 text-white">{stage.timeline}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Outreach Template */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Victim Outreach Script</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
              <div className="bg-gray-900 p-4 rounded border">
                <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
{outreachScript}
                </pre>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  onClick={() => navigator.clipboard.writeText(outreachScript)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Copy Script
                </Button>
                
                <Button 
                  onClick={() => window.open('https://etherscan.io/address/0x0890f93a1fd344b3437ec10c1c14d1a581142c5f', '_blank')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Analyze Honeypot
                </Button>
                
                <Button 
                  onClick={() => window.open('https://twitter.com/compose/tweet', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Tweet Success
                </Button>
                
                <Button 
                  onClick={() => window.open('mailto:', '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Email Victims
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitive Advantages */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Unbeatable Competitive Advantages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {competitiveAdvantages.map((advantage, index) => (
                <div key={index} className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-green-400 font-bold">{advantage.advantage}</h3>
                      <p className="text-white text-sm">{advantage.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 text-sm font-bold">{advantage.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* First Client Projections */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">First Client Wave Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {firstClientProjections.map((projection, index) => (
                <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <div>
                      <h3 className="text-orange-400 font-bold">{projection.scenario}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{projection.victims}</p>
                    </div>
                    <div>
                      <p className="text-white text-sm">{projection.grants}</p>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-bold">{projection.recoveries}</p>
                    </div>
                    <div>
                      <Badge className="bg-orange-600 text-white">{projection.timeline}</Badge>
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
            onClick={() => window.open('https://etherscan.io/address/0x0890f93a1fd344b3437ec10c1c14d1a581142c5f', '_blank')}
            className="bg-red-600 hover:bg-red-700 py-8"
          >
            <Target className="h-6 w-6 mr-2" />
            Find Victims
          </Button>
          
          <Button 
            onClick={() => window.open('/victim-to-advocate-foundation', '_self')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Heart className="h-6 w-6 mr-2" />
            Foundation Setup
          </Button>
          
          <Button 
            onClick={() => window.open('/ethereum-value-calculator', '_self')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <DollarSign className="h-6 w-6 mr-2" />
            Fund Grants
          </Button>
          
          <Button 
            onClick={() => window.open('https://twitter.com/compose/tweet', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <MessageSquare className="h-6 w-6 mr-2" />
            Launch Outreach
          </Button>
        </div>

        {/* Client Acquisition Success */}
        <Alert className="border-green-500 bg-green-500/20">
          <Crown className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-xl">
            <strong>PERFECT CLIENT ACQUISITION:</strong> Honeypot victims are pre-qualified clients who desperately need your proven solution. Your lived experience gives you instant credibility. They know you understand their pain and have the expertise to help. This is the foundation for scaling your victim support mission globally.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}