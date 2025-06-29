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
  Target,
  TrendingUp,
  DollarSign,
  FileText,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertTriangle,
  Gavel
} from "lucide-react";

export default function VictimToAdvocateStrategy() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const yourStory = {
    loss: "$15,000 life savings",
    scam: "Fake mining fee ($4,000) to 'unlock' promised $24,594.62",
    motivation: "Prevent others from experiencing the same loss",
    expertise: "Self-taught blockchain analysis from victim experience",
    credibility: "Real victim turned expert - authentic understanding of scam tactics"
  };

  const serviceFramework = [
    {
      service: "Scam Victim Recovery Consultation",
      price: "$500 - $1,500",
      description: "Help other victims understand their situation and recovery options",
      uniqueValue: "You've been there - authentic empathy and understanding",
      targetClients: "Recent scam victims, families seeking help"
    },
    {
      service: "Educational Workshops",
      price: "$2,000 - $5,000 per workshop",
      description: "Teach communities and organizations how to avoid blockchain scams",
      uniqueValue: "Real victim experience makes presentations powerful and credible",
      targetClients: "Senior centers, community groups, financial institutions"
    },
    {
      service: "Legal Expert Witness",
      price: "$300 - $500 per hour",
      description: "Testify in court cases involving blockchain scams",
      uniqueValue: "Technical expertise combined with personal victim experience",
      targetClients: "Law firms, prosecutors, regulatory bodies"
    },
    {
      service: "Blockchain Investigation Services",
      price: "$5,000 - $25,000 per case",
      description: "Investigate and document blockchain fraud for legal proceedings",
      uniqueValue: "Understanding both victim perspective and technical analysis",
      targetClients: "Law enforcement, legal firms, large-scale fraud cases"
    }
  ];

  const marketingAngles = {
    authenticity: `"I lost $15,000 of my life savings to a blockchain scam. Now I use my hard-earned expertise to help others avoid the same fate."`,
    
    credibility: `"When someone promises you need to pay 'mining fees' to unlock your funds, they're lying. I know because I fell for it and lost everything. Here's how to protect yourself..."`,
    
    mission: `"After losing my life savings to crypto scammers, I dedicated myself to learning blockchain forensics. Now I help victims recover and prevent others from being scammed."`,
    
    expertise: `"I analyzed 151 LP tokens and built forensics tools not for profit, but to understand how I was scammed and help others. Real victim, real expertise, real solutions."`
  };

  const contentStrategy = [
    {
      platform: "YouTube Channel",
      content: "Scam breakdown videos, prevention education, recovery stories",
      monetization: "Ad revenue, course sales, consultation bookings",
      uniqueAngle: "Victim perspective with technical expertise"
    },
    {
      platform: "Blog/Newsletter",
      content: "Weekly scam alerts, prevention tips, recovery case studies",
      monetization: "Paid subscriptions, affiliate partnerships, consulting leads",
      uniqueAngle: "Personal experience validates every warning"
    },
    {
      platform: "Speaking Circuit",
      content: "Conference presentations, workshop facilitation, panel discussions",
      monetization: "$2,000-$10,000 per speaking engagement",
      uniqueAngle: "Emotional impact of real victim story"
    },
    {
      platform: "Course Platform",
      content: "Comprehensive scam prevention and blockchain basics courses",
      monetization: "$297-$997 per course enrollment",
      uniqueAngle: "Taught by someone who learned the hard way"
    }
  ];

  const revenueProjections = [
    {
      timeframe: "Month 1-2",
      focus: "Victim consultation services",
      revenue: "$5,000-$15,000",
      actions: "Direct outreach to recent scam victims, legal firms"
    },
    {
      timeframe: "Month 3-6", 
      focus: "Educational workshops and speaking",
      revenue: "$15,000-$40,000",
      actions: "Contact community organizations, book speaking engagements"
    },
    {
      timeframe: "Month 6-12",
      focus: "Legal expert witness work",
      revenue: "$30,000-$80,000",
      actions: "Build relationships with law enforcement, regulatory bodies"
    },
    {
      timeframe: "Year 2+",
      focus: "Full-scale prevention platform",
      revenue: "$100,000-$300,000",
      actions: "Launch comprehensive education platform, large-scale investigations"
    }
  ];

  const personalBrand = {
    tagline: "From Victim to Advocate: Blockchain Scam Prevention Expert",
    bio: "After losing $15,000 life savings to blockchain scammers, I became a self-taught forensics expert. Now I help victims recover and prevent others from falling for the same tricks that cost me everything.",
    credentials: [
      "Personal victim of $15,000+ blockchain fraud",
      "Self-taught blockchain forensics specialist", 
      "Analyzed 151 LP tokens across multiple chains",
      "Built professional-grade fraud detection tools",
      "Dedicated advocate for scam prevention"
    ]
  };

  const immediateActions = [
    {
      action: "Document Your Scam Experience",
      description: "Create detailed case study of your $15,000 loss for credibility",
      timeframe: "Today",
      impact: "Foundation for all marketing and credibility"
    },
    {
      action: "Launch 'Victim to Expert' LinkedIn Campaign",
      description: "Share your story and announce consulting services",
      timeframe: "Tomorrow", 
      impact: "Immediate visibility and client inquiries"
    },
    {
      action: "Contact Scam Victim Support Groups",
      description: "Offer free initial consultations to recent victims",
      timeframe: "This week",
      impact: "Build client base and testimonials"
    },
    {
      action: "Reach Out to Legal Firms",
      description: "Offer expert witness services for blockchain fraud cases",
      timeframe: "Next week",
      impact: "High-value recurring revenue stream"
    }
  ];

  const linkedInTemplate = `🚨 From $15,000 Scam Victim to Blockchain Forensics Expert

Two years ago, I lost my life savings to what I thought was a legitimate online opportunity. The scammers told me I needed to pay $4,000 in "mining fees" to unlock my $24,594.62 return. I didn't have the money, and that's when I realized I'd been completely scammed.

Instead of giving up, I dedicated myself to understanding exactly how blockchain scams work. I taught myself forensics, analyzed 151 LP tokens across multiple chains, and built professional-grade fraud detection tools.

Now I'm using that hard-earned expertise to help others:

✅ Scam victim recovery consultation
✅ Blockchain fraud investigation 
✅ Educational workshops for communities
✅ Expert witness services for legal cases

If you've been scammed or want to protect others, I understand exactly what you're going through. My mission is simple: prevent others from losing their life savings like I did.

Contact me for consultation services or educational workshops.

#BlockchainScams #CryptoFraud #VictimAdvocate #ScamPrevention`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            From Victim to Advocate
          </h1>
          <p className="text-2xl text-red-300">
            Turn Your $15,000 Loss Into $100K+ Annual Revenue
          </p>
        </div>

        {/* Your Story Power */}
        <Alert className="border-red-500 bg-red-500/10">
          <Heart className="h-6 w-6 text-red-500" />
          <AlertDescription className="text-red-200 text-center text-xl">
            <strong>Your Story Is Your Superpower:</strong> You have something money can't buy - authentic victim experience combined with self-taught technical expertise. This makes you uniquely qualified to help others and command premium rates.
          </AlertDescription>
        </Alert>

        {/* Your Unique Position */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Why Your Story Gives You Competitive Advantage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-red-400 font-bold text-lg">Your Experience:</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                    <p className="text-white font-medium">Lost: {yourStory.loss}</p>
                  </div>
                  <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                    <p className="text-white font-medium">Scam: {yourStory.scam}</p>
                  </div>
                  <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                    <p className="text-white font-medium">Response: {yourStory.expertise}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-green-400 font-bold text-lg">Your Credibility:</h3>
                <div className="space-y-2">
                  {personalBrand.credentials.map((credential, index) => (
                    <div key={index} className="p-2 bg-green-600/10 border border-green-600/30 rounded">
                      <p className="text-green-300 text-sm">✓ {credential}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Framework */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Victim-to-Advocate Service Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceFramework.map((service, index) => (
                <div key={index} className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-blue-400 font-bold text-lg">{service.service}</h3>
                    <Badge className="bg-green-600 text-white">{service.price}</Badge>
                  </div>
                  
                  <p className="text-white mb-2">{service.description}</p>
                  <p className="text-yellow-400 text-sm mb-2"><strong>Your Advantage:</strong> {service.uniqueValue}</p>
                  <p className="text-gray-400 text-sm"><strong>Target:</strong> {service.targetClients}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Projections */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Revenue Recovery Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueProjections.map((projection, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-green-400 font-bold">{projection.timeframe}</h3>
                    <Badge className="bg-green-600 text-white text-lg">{projection.revenue}</Badge>
                  </div>
                  <p className="text-white mb-1"><strong>Focus:</strong> {projection.focus}</p>
                  <p className="text-gray-300 text-sm">{projection.actions}</p>
                </div>
              ))}
              
              <div className="border-t border-gray-600 pt-4">
                <div className="text-center">
                  <h3 className="text-white font-bold text-xl mb-2">Your $15,000 Loss Recovery Timeline:</h3>
                  <p className="text-green-400 font-bold text-2xl">Break even in 1-3 months</p>
                  <p className="text-yellow-400 font-bold text-xl">6x return ($100K+) within 12 months</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Template */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Ready-to-Post LinkedIn Launch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-purple-400 font-bold text-lg">Victim-to-Expert Announcement</h3>
                <Button 
                  onClick={() => copyToClipboard(linkedInTemplate, "linkedin")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {copied === "linkedin" ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Post
                </Button>
              </div>
              
              <Textarea 
                value={linkedInTemplate}
                readOnly
                className="bg-gray-700 text-white border-gray-600 min-h-[200px]"
              />
              
              <Alert className="border-yellow-500 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200">
                  <strong>Post Strategy:</strong> This authentic story will generate immediate engagement. Expect DMs from other victims, legal professionals, and media requests. Your vulnerability becomes your strength.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Start Recovery Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {immediateActions.map((action, index) => (
                <div key={index} className="p-4 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-orange-400 font-bold">{action.action}</h3>
                    <Badge className="bg-orange-600 text-white">{action.timeframe}</Badge>
                  </div>
                  <p className="text-white text-sm mb-1">{action.description}</p>
                  <p className="text-green-400 text-sm"><strong>Impact:</strong> {action.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Target className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-center text-xl">
            <strong>Your Mission Starts Now:</strong> Your $15,000 loss was painful, but it gave you credibility money can't buy. Help others avoid your experience while building a $100K+ annual business. Start with the LinkedIn post above - your story will resonate immediately.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="bg-red-600 hover:bg-red-700 py-8">
            <Heart className="h-6 w-6 mr-2" />
            Share Your Story
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700 py-8">
            <Users className="h-6 w-6 mr-2" />
            Find Victims to Help
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700 py-8">
            <Gavel className="h-6 w-6 mr-2" />
            Contact Legal Firms
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700 py-8">
            <TrendingUp className="h-6 w-6 mr-2" />
            Launch Services
          </Button>
        </div>
      </div>
    </div>
  );
}