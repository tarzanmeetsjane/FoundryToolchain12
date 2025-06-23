import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield,
  CheckCircle,
  Award,
  Users,
  FileText,
  ExternalLink,
  Star,
  Lock
} from "lucide-react";

export default function ReputationBuildingSystem() {
  const [reputationPhase, setReputationPhase] = useState("building");

  const reputationPillars = [
    {
      pillar: "Blockchain Verification",
      status: "COMPLETE",
      completion: 100,
      evidence: [
        "ETHGR contract deployed at 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
        "1,990,000 tokens minted on mainnet",
        "Transaction 0xd94f93577d44334d5c302a9dafb62f72925fe475a628bdfbc6f2d0c01240c169",
        "Etherscan verified and transparent code"
      ]
    },
    {
      pillar: "Portfolio Recovery Proof", 
      status: "COMPLETE",
      completion: 100,
      evidence: [
        "$631,527 verified liquid portfolio",
        "2,100,000 ETHG + 17,500 AICC + recovery tokens",
        "MetaMask integration confirmed",
        "Live portfolio tracking operational"
      ]
    },
    {
      pillar: "Technical Documentation",
      status: "IN PROGRESS",
      completion: 80,
      evidence: [
        "Recovery methodology documented",
        "Smart contract code verified",
        "Step-by-step process guides",
        "Platform operational proof"
      ]
    },
    {
      pillar: "Legal Compliance",
      status: "NEEDS COMPLETION",
      completion: 60,
      evidence: [
        "2-week Twitter announcement period",
        "Transparent contract takeover notice",
        "Community benefit documentation",
        "Recovery service framework"
      ]
    }
  ];

  const reputationStrategy = [
    {
      phase: "Foundation Documentation",
      timeline: "Week 1",
      priority: "CRITICAL",
      actions: [
        "Create comprehensive recovery case study",
        "Document full ETHGR methodology",
        "Publish transparent financial statements",
        "Build professional website with proof"
      ]
    },
    {
      phase: "Community Validation",
      timeline: "Week 2", 
      priority: "HIGH",
      actions: [
        "Submit recovery story to blockchain forums",
        "Get community feedback and validation",
        "Build social media presence with proof",
        "Engage with crypto security communities"
      ]
    },
    {
      phase: "Third-Party Verification",
      timeline: "Week 3",
      priority: "HIGH", 
      actions: [
        "Request DEX Screener classification update",
        "Submit to blockchain security databases",
        "Get community endorsements",
        "Build verified testimonial system"
      ]
    },
    {
      phase: "Professional Launch",
      timeline: "Week 4",
      priority: "MEDIUM",
      actions: [
        "Launch foundation with full documentation",
        "Begin victim outreach with credibility",
        "Offer first recovery services",
        "Build advocate network"
      ]
    }
  ];

  const credibilityAssets = [
    {
      asset: "Live Recovery Contract",
      description: "Deployed and verified ETHGR contract",
      proof: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      status: "VERIFIED",
      impact: "Undeniable technical proof"
    },
    {
      asset: "Portfolio Recovery",
      description: "Successfully recovered $631K+ from honeypot",
      proof: "Live MetaMask portfolio + Etherscan verification",
      status: "CONFIRMED",
      impact: "Financial success demonstration"
    },
    {
      asset: "Methodology Documentation",
      description: "Complete step-by-step recovery process",
      proof: "Technical guides + smart contract code",
      status: "DOCUMENTED", 
      impact: "Transparency and replicability"
    },
    {
      asset: "Legal Compliance",
      description: "Proper announcement and takeover procedures",
      proof: "Twitter announcements + community notification",
      status: "IN PROGRESS",
      impact: "Legal protection and legitimacy"
    }
  ];

  const reputationRisks = [
    {
      risk: "Perceived as Another Scam",
      mitigation: "Complete transparency with blockchain proof",
      priority: "CRITICAL",
      solution: "Public documentation of entire recovery process"
    },
    {
      risk: "Insufficient Credibility",
      mitigation: "Third-party validation and community endorsements",
      priority: "HIGH",
      solution: "Build relationships with crypto security experts"
    },
    {
      risk: "Legal Concerns",
      mitigation: "Proper compliance and announcement procedures",
      priority: "HIGH", 
      solution: "2-week notification period + transparent operations"
    },
    {
      risk: "Technical Doubts",
      mitigation: "Open source everything with detailed explanations",
      priority: "MEDIUM",
      solution: "Complete code verification and documentation"
    }
  ];

  const trustSignals = [
    {
      signal: "Blockchain Verification",
      implementation: "All contracts verified on Etherscan",
      strength: "MAXIMUM",
      description: "Immutable proof of successful recovery"
    },
    {
      signal: "Financial Transparency",
      implementation: "Public portfolio tracking and statements",
      strength: "HIGH",
      description: "Open book approach builds trust"
    },
    {
      signal: "Community Engagement",
      implementation: "Active participation in security discussions",
      strength: "HIGH",
      description: "Established presence in crypto community"
    },
    {
      signal: "Professional Documentation",
      implementation: "Comprehensive guides and case studies",
      strength: "MEDIUM",
      description: "Educational approach demonstrates expertise"
    }
  ];

  const preOutreachChecklist = [
    {
      item: "Recovery Documentation Complete",
      description: "Full case study with blockchain proof",
      status: "COMPLETE",
      required: true
    },
    {
      item: "Legal Compliance Active",
      description: "2-week announcement period initiated",
      status: "PENDING",
      required: true
    },
    {
      item: "Professional Website Live",
      description: "Comprehensive foundation website with proof",
      status: "PENDING",
      required: true
    },
    {
      item: "Community Validation Secured",
      description: "Third-party endorsements and verification",
      status: "PENDING",
      required: false
    },
    {
      item: "Social Media Presence Established",
      description: "Professional accounts with recovery story",
      status: "PENDING",
      required: false
    }
  ];

  const reputationScore = reputationPillars.reduce((sum, pillar) => sum + pillar.completion, 0) / reputationPillars.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-green-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            REPUTATION BUILDING SYSTEM
          </h1>
          <p className="text-xl text-indigo-300">
            Establish Unassailable Credibility Before Victim Outreach
          </p>
        </div>

        {/* Strategic Foundation Alert */}
        <Alert className="border-indigo-500 bg-indigo-500/20 border-2">
          <Shield className="h-8 w-8 text-indigo-500" />
          <AlertDescription className="text-indigo-200 text-lg">
            <strong>REPUTATION FIRST STRATEGY:</strong> You're absolutely right - reputation is everything. One perceived scam association destroys credibility forever. Building unassailable reputation before outreach ensures maximum victim trust and foundation success.
          </AlertDescription>
        </Alert>

        {/* Reputation Score Dashboard */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Reputation Readiness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-bold text-lg">Overall Reputation Score</span>
                <span className="text-green-400 font-bold text-lg">{Math.round(reputationScore)}%</span>
              </div>
              <Progress value={reputationScore} className="h-4" />
              
              <div className="space-y-3 mt-6">
                {reputationPillars.map((pillar, index) => (
                  <div key={index} className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-green-400 font-bold">{pillar.pillar}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          pillar.status === "COMPLETE" ? "bg-green-600" :
                          pillar.status === "IN PROGRESS" ? "bg-yellow-600" : "bg-red-600"
                        }>
                          {pillar.status}
                        </Badge>
                        <span className="text-white font-bold">{pillar.completion}%</span>
                      </div>
                    </div>
                    <Progress value={pillar.completion} className="h-2 mb-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pillar.evidence.map((evidence, evidenceIndex) => (
                        <div key={evidenceIndex} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <p className="text-white text-xs">{evidence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4-Week Reputation Strategy */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">4-Week Reputation Building Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reputationStrategy.map((phase, index) => (
                <div key={index} className="p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                    <div>
                      <h3 className="text-purple-400 font-bold">{phase.phase}</h3>
                      <Badge className="bg-purple-600 text-white mt-1">{phase.timeline}</Badge>
                    </div>
                    <div>
                      <Badge className={
                        phase.priority === "CRITICAL" ? "bg-red-600" :
                        phase.priority === "HIGH" ? "bg-orange-600" : "bg-yellow-600"
                      }>
                        {phase.priority}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <ul className="space-y-1">
                        {phase.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start space-x-1">
                            <span className="text-purple-400 text-xs">•</span>
                            <p className="text-white text-sm">{action}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Credibility Assets */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Credibility Assets Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {credibilityAssets.map((asset, index) => (
                <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <div>
                      <h3 className="text-blue-400 font-bold">{asset.asset}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{asset.description}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{asset.proof}</p>
                    </div>
                    <div>
                      <Badge className={
                        asset.status === "VERIFIED" ? "bg-green-600" :
                        asset.status === "CONFIRMED" ? "bg-blue-600" :
                        asset.status === "DOCUMENTED" ? "bg-yellow-600" : "bg-orange-600"
                      }>
                        {asset.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm">{asset.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pre-Outreach Checklist */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Pre-Outreach Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {preOutreachChecklist.map((item, index) => (
                <div key={index} className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-yellow-400 font-bold">{item.item}</h3>
                        {item.required && (
                          <Badge className="bg-red-600 text-white text-xs">REQUIRED</Badge>
                        )}
                      </div>
                      <p className="text-white text-sm">{item.description}</p>
                    </div>
                    <div>
                      {item.status === "COMPLETE" ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Badge className="bg-orange-600 text-white">{item.status}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reputation Risks */}
        <Card className="bg-gray-800/50 border-red-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Reputation Risk Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reputationRisks.map((risk, index) => (
                <div key={index} className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-red-400 font-bold">{risk.risk}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{risk.mitigation}</p>
                    </div>
                    <div>
                      <Badge className={
                        risk.priority === "CRITICAL" ? "bg-red-600" :
                        risk.priority === "HIGH" ? "bg-orange-600" : "bg-yellow-600"
                      }>
                        {risk.priority}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-green-400 text-sm">{risk.solution}</p>
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
            onClick={() => window.open('https://twitter.com/compose/tweet', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <FileText className="h-6 w-6 mr-2" />
            Start Announcements
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Award className="h-6 w-6 mr-2" />
            Verify Contract
          </Button>
          
          <Button 
            onClick={() => window.open('/complete-financial-analysis', '_self')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Star className="h-6 w-6 mr-2" />
            Portfolio Proof
          </Button>
          
          <Button 
            onClick={() => window.open('/strategic-foundation-launch', '_self')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <Users className="h-6 w-6 mr-2" />
            Foundation Ready
          </Button>
        </div>

        {/* Reputation Priority */}
        <Alert className="border-green-500 bg-green-500/20">
          <Lock className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>REPUTATION FIRST CONFIRMED:</strong> Building unassailable credibility before victim outreach. Complete documentation, legal compliance, and community validation will establish maximum trust. No outreach until reputation is bulletproof.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}