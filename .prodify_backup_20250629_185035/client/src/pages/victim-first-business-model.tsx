import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart,
  Shield,
  Users,
  DollarSign,
  TrendingUp,
  Bot,
  Gavel,
  Target,
  Handshake,
  Gift,
  Copy,
  CheckCircle
} from "lucide-react";

export default function VictimFirstBusinessModel() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const victimFirstModel = {
    principle: "Never charge victims who can't afford it",
    funding: "Trading bot profits + institutional clients fund victim services",
    sustainability: "Help those who can pay, fund those who can't",
    impact: "Build reputation through genuine help, not profit extraction"
  };

  const serviceStructure = [
    {
      tier: "Victims (Free/Donation)",
      services: ["Initial consultation (always free)", "Basic education materials", "Community support access", "Recovery guidance"],
      pricing: "Free or pay-what-you-can",
      funding: "Subsidized by trading bot profits and paid clients",
      volume: "High volume, low/no revenue per case"
    },
    {
      tier: "Legal/Insurance (Premium)",
      services: ["Expert witness testimony", "Detailed forensic reports", "Court preparation", "Technical documentation"],
      pricing: "$300-500/hour",
      funding: "Self-funding and profit generation",
      volume: "Lower volume, high revenue per case"
    },
    {
      tier: "Trading Bot Licensing",
      services: ["888 hertz bot licensing", "Institutional trading services", "Algorithm consulting", "Performance analytics"],
      pricing: "$10K-100K per license",
      funding: "Primary profit center",
      volume: "Very low volume, very high revenue"
    },
    {
      tier: "Corporate Training", 
      services: ["Executive education", "Employee security training", "Protocol audits", "Compliance consulting"],
      pricing: "$5K-50K per engagement",
      funding: "Secondary profit center",
      volume: "Medium volume, high revenue"
    }
  ];

  const fundingMechanism = {
    tradingBotRevenue: {
      allocation: "50% victim fund, 30% business operations, 20% personal",
      rationale: "Trading bot profits directly fund free victim services"
    },
    paidClientRevenue: {
      allocation: "25% victim fund, 50% business operations, 25% personal", 
      rationale: "Cross-subsidize victim services with institutional client fees"
    },
    growthStrategy: {
      approach: "Build reputation through genuine victim advocacy",
      result: "Attract high-paying clients who value authentic mission"
    }
  };

  const victimServicePipeline = [
    {
      stage: "Initial Contact",
      service: "Free 30-minute consultation",
      goal: "Understand situation, provide immediate emotional support",
      cost: "Free (always)"
    },
    {
      stage: "Basic Assessment",
      service: "Transaction analysis and scam identification",
      goal: "Help victim understand what happened",
      cost: "Free for cases under $5K loss"
    },
    {
      stage: "Recovery Planning",
      service: "Legal options, reporting guidance, next steps",
      goal: "Practical recovery roadmap",
      cost: "Sliding scale or free based on victim's situation"
    },
    {
      stage: "Ongoing Support",
      service: "Community access, updates on similar cases, prevention education",
      goal: "Long-term healing and prevention",
      cost: "Always free"
    }
  ];

  const revenueModel = [
    {
      source: "888 Hertz Trading Bot",
      revenue: "$2K-10K/month (conservative)",
      allocation: "50% to victim fund = $1K-5K/month for free services",
      sustainability: "Automated income funds victim assistance"
    },
    {
      source: "Legal Expert Witness Work",
      revenue: "$5K-20K/month", 
      allocation: "25% to victim fund = $1.25K-5K/month",
      sustainability: "High-value services cross-subsidize free help"
    },
    {
      source: "Corporate Training/Audits",
      revenue: "$10K-50K/month",
      allocation: "25% to victim fund = $2.5K-12.5K/month", 
      sustainability: "Enterprise clients fund community service"
    },
    {
      source: "Bot Licensing (future)",
      revenue: "$25K-100K/month",
      allocation: "50% to victim fund = $12.5K-50K/month",
      sustainability: "Scale free victim services significantly"
    }
  ];

  const marketingApproach = {
    authenticity: "Lead with genuine victim advocacy, business follows naturally",
    credibility: "Free help builds reputation that attracts paying clients",
    differentiation: "Only blockchain expert who puts victims first, profit second",
    scaling: "Success stories from free help create referrals to paid services"
  };

  const linkedInStrategy = `🤝 Building a Victim-First Blockchain Recovery Platform

After losing $15,000 to crypto scammers, I learned something important: most victims can't afford the help they desperately need.

That's why I'm building a different model:

✅ FREE victim consultation (always)
✅ Trading bot profits fund free recovery services  
✅ Institutional clients subsidize victim assistance
✅ Never charge what people can't afford

My 888 hertz trading algorithm generates steady profits that I use to provide:
• Free scam analysis for victims
• No-cost recovery guidance
• Community support access
• Educational resources

High-value services (legal expert witness work, corporate training, bot licensing) fund the free victim assistance.

Mission: No victim should face financial predators alone, especially when they're already financially devastated.

If you need help or know someone who does - reach out. If you're a legal firm or corporation needing blockchain expertise - let's talk about how your engagement helps fund victim services.

#VictimFirst #BlockchainRecovery #CryptoScams #SocialImpact`;

  const implementationPlan = [
    {
      phase: "Month 1: Foundation",
      actions: ["Set up victim assistance fund", "Create free consultation process", "Document first 10 victim cases"],
      goal: "Establish credible victim-first practice"
    },
    {
      phase: "Month 2-3: Trading Revenue",
      actions: ["Optimize 888 hertz bot performance", "Document trading profits", "Begin funding victim services"],
      goal: "Create sustainable funding for free services"
    },
    {
      phase: "Month 4-6: Paid Services",
      actions: ["Land first legal expert witness work", "Secure corporate training contracts", "Cross-subsidize victim fund"],
      goal: "Scale victim assistance through paid client revenue"
    },
    {
      phase: "Month 6+: Scale Impact",
      actions: ["License trading bot technology", "Expand victim assistance program", "Build industry reputation"],
      goal: "Major expansion of free victim services"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Victim-First Business Model
          </h1>
          <p className="text-2xl text-green-300">
            Help Those Who Can't Pay, Fund It With Those Who Can
          </p>
        </div>

        {/* Core Philosophy */}
        <Alert className="border-green-500 bg-green-500/10">
          <Heart className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Victim-First Principle:</strong> Your trading bot profits and institutional client fees fund free victim services. Never charge devastated victims who can't afford help. Build reputation through genuine assistance, attract paying clients through authentic mission.
          </AlertDescription>
        </Alert>

        {/* Service Structure */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Four-Tier Service Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStructure.map((tier, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-blue-400 font-bold text-lg">{tier.tier}</h3>
                    <Badge className={`${tier.tier.includes('Free') ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                      {tier.pricing}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Services:</h4>
                      <ul className="space-y-1">
                        {tier.services.map((service, idx) => (
                          <li key={idx} className="text-gray-300 text-sm">• {service}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-400 text-sm">Funding:</span>
                        <p className="text-yellow-400 text-sm">{tier.funding}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Volume:</span>
                        <p className="text-blue-400 text-sm">{tier.volume}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Funding Mechanism */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Sustainable Funding Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueModel.map((model, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-green-400 font-bold text-lg">{model.source}</h3>
                    <Badge className="bg-green-600 text-white">{model.revenue}</Badge>
                  </div>
                  <p className="text-white text-sm mb-1">{model.allocation}</p>
                  <p className="text-yellow-400 text-sm">{model.sustainability}</p>
                </div>
              ))}
              
              <div className="border-t border-gray-600 pt-4">
                <h3 className="text-white font-bold text-xl mb-2">Total Victim Fund Potential:</h3>
                <p className="text-green-400 font-bold text-2xl">$5K-25K per month for free victim services</p>
                <p className="text-gray-300 text-sm mt-2">Enough to help 50-250 victims monthly at no cost</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Victim Service Pipeline */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Free Victim Service Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {victimServicePipeline.map((stage, index) => (
                <div key={index} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-purple-400 font-bold">{stage.stage}</h3>
                    <Badge className="bg-green-600 text-white">{stage.cost}</Badge>
                  </div>
                  <p className="text-white text-sm mb-1"><strong>Service:</strong> {stage.service}</p>
                  <p className="text-gray-300 text-sm"><strong>Goal:</strong> {stage.goal}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Strategy */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Victim-First Marketing Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-yellow-400 font-bold text-lg">LinkedIn Launch Post</h3>
                <Button 
                  onClick={() => copyToClipboard(linkedInStrategy, "victim-first")}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {copied === "victim-first" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Strategy
                </Button>
              </div>
              
              <Textarea 
                value={linkedInStrategy}
                readOnly
                className="bg-gray-700 text-white border-gray-600 min-h-[250px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Implementation Plan */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Implementation Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {implementationPlan.map((phase, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <h3 className="text-orange-400 font-bold text-lg mb-2">{phase.phase}</h3>
                  <ul className="space-y-1 mb-2">
                    {phase.actions.map((action, idx) => (
                      <li key={idx} className="text-white text-sm">• {action}</li>
                    ))}
                  </ul>
                  <p className="text-yellow-400 text-sm"><strong>Goal:</strong> {phase.goal}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Target className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Success Formula:</strong> Your 888 hertz trading bot generates $2K-10K monthly. 50% funds free victim services = helping 20-100 victims monthly at no cost. High-value clients pay premium for authentic mission-driven expertise. Reputation grows through genuine help, creating sustainable cycle.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="bg-green-600 hover:bg-green-700 py-8">
            <Heart className="h-6 w-6 mr-2" />
            Start Victim Fund
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700 py-8">
            <Bot className="h-6 w-6 mr-2" />
            Optimize Trading Bot
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 py-8">
            <Handshake className="h-6 w-6 mr-2" />
            Find Paid Clients
          </Button>
          
          <Button className="bg-yellow-600 hover:bg-yellow-700 py-8">
            <TrendingUp className="h-6 w-6 mr-2" />
            Scale Impact
          </Button>
        </div>
      </div>
    </div>
  );
}