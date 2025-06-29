import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  CheckCircle,
  DollarSign,
  ExternalLink,
  Shield,
  TrendingUp,
  Award
} from "lucide-react";

export default function DEXScreenerVerification() {
  const [verificationStep, setVerificationStep] = useState("preparation");

  const verificationDetails = {
    platform: "DEX Screener",
    cost: "$700",
    availableFunds: "$631,527",
    affordability: "0.1% of portfolio",
    timeline: "1-3 business days",
    impact: "Professional token legitimacy"
  };

  const verificationBenefits = [
    {
      benefit: "Honeypot Flag Removal",
      description: "Removes dangerous token classification",
      impact: "Foundation credibility restored",
      priority: "CRITICAL"
    },
    {
      benefit: "Professional Listing",
      description: "Verified badge and legitimate status",
      impact: "Community trust building",
      priority: "HIGH"
    },
    {
      benefit: "Victim Confidence",
      description: "Potential clients see verified status",
      impact: "Higher success rate for outreach",
      priority: "HIGH"
    },
    {
      benefit: "Reputation Foundation",
      description: "First step in professional credibility",
      impact: "Long-term foundation success",
      priority: "MEDIUM"
    }
  ];

  const verificationProcess = [
    {
      step: 1,
      action: "Submit ETHGR Contract",
      method: "DEX Screener verification portal",
      requirement: "Contract address: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
      timeline: "5 minutes"
    },
    {
      step: 2,
      action: "Provide Documentation",
      method: "Recovery story + blockchain proof",
      requirement: "Recovery contract evidence + portfolio proof",
      timeline: "30 minutes"
    },
    {
      step: 3,
      action: "Pay Verification Fee",
      method: "Direct payment to DEX Screener",
      requirement: "$700 from your $631K portfolio",
      timeline: "Instant"
    },
    {
      step: 4,
      action: "Await Review",
      method: "DEX Screener team verification",
      requirement: "Technical and documentation review",
      timeline: "1-3 business days"
    },
    {
      step: 5,
      action: "Receive Verification",
      method: "Verified badge + status update",
      requirement: "Token classification updated",
      timeline: "Automatic upon approval"
    }
  ];

  const requiredDocumentation = [
    {
      document: "Recovery Contract Code",
      status: "READY",
      description: "Verified ETHGR contract on Etherscan",
      proof: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247"
    },
    {
      document: "Portfolio Recovery Proof",
      status: "READY",
      description: "$631K recovered portfolio evidence",
      proof: "Live MetaMask integration + Etherscan verification"
    },
    {
      document: "Recovery Methodology",
      status: "READY",
      description: "Complete honeypot escape process",
      proof: "Technical documentation + smart contract"
    },
    {
      document: "Community Benefit Statement",
      status: "NEEDS CREATION",
      description: "Foundation mission documentation",
      proof: "Victim advocacy program outline"
    }
  ];

  const postVerificationStrategy = [
    {
      phase: "Immediate Impact",
      timeline: "Day 1-7",
      actions: [
        "Token status updated to verified",
        "Foundation credibility established",
        "Victim outreach materials updated",
        "Professional reputation baseline set"
      ]
    },
    {
      phase: "Foundation Launch",
      timeline: "Week 2-4",
      actions: [
        "Begin honeypot victim identification",
        "Launch $10K grant program",
        "Execute first recovery services",
        "Build advocate network"
      ]
    },
    {
      phase: "Scaling Operations",
      timeline: "Month 2-6",
      actions: [
        "Multiple client recoveries",
        "Community testimonials",
        "Advocate training program",
        "Sustainable revenue model"
      ]
    }
  ];

  const competitiveAdvantages = [
    {
      advantage: "Verified Token Status",
      description: "DEX Screener verified badge",
      impact: "Instant legitimacy vs unverified competitors"
    },
    {
      advantage: "Proven Recovery Track Record",
      description: "$631K successful recovery with blockchain proof",
      impact: "Undeniable credibility with victims"
    },
    {
      advantage: "Financial Foundation",
      description: "Substantial portfolio for grants and operations",
      impact: "Can provide immediate victim support"
    },
    {
      advantage: "Technical Expertise",
      description: "Advanced blockchain forensics platform",
      impact: "Capability to handle complex cases"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            DEX SCREENER VERIFICATION
          </h1>
          <p className="text-xl text-purple-300">
            $700 Investment for Foundation Credibility
          </p>
        </div>

        {/* Verification Investment Alert */}
        <Alert className="border-purple-500 bg-purple-500/20 border-2">
          <Star className="h-8 w-8 text-purple-500" />
          <AlertDescription className="text-purple-200 text-lg">
            <strong>SMART REPUTATION INVESTMENT:</strong> $700 (0.1% of your $631K portfolio) to remove honeypot flagging and establish verified token status. This creates the professional foundation credibility needed for successful victim outreach.
          </AlertDescription>
        </Alert>

        {/* Verification Overview */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl">Verification Investment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {Object.entries(verificationDetails).map(([key, value]) => (
                <div key={key} className="p-3 bg-green-600/10 border border-green-600/30 rounded text-center">
                  <h3 className="text-green-400 font-bold capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</h3>
                  <p className="text-white">{value}</p>
                  {key === 'affordability' && (
                    <Badge className="bg-green-600 text-white mt-1">EASILY AFFORDABLE</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Benefits */}
        <Card className="bg-gray-800/50 border-blue-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Strategic Benefits Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {verificationBenefits.map((benefit, index) => (
                <div key={index} className="p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h3 className="text-blue-400 font-bold">{benefit.benefit}</h3>
                    </div>
                    <div>
                      <p className="text-white text-sm">{benefit.description}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{benefit.impact}</p>
                    </div>
                    <div>
                      <Badge className={
                        benefit.priority === "CRITICAL" ? "bg-red-600" :
                        benefit.priority === "HIGH" ? "bg-orange-600" : "bg-yellow-600"
                      }>
                        {benefit.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5-Step Verification Process */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">5-Step Verification Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationProcess.map((step, index) => (
                <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-yellow-400 font-bold text-lg">{step.action}</h3>
                      <p className="text-white mb-2">{step.method}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <p className="text-gray-400 text-sm">{step.requirement}</p>
                        <Badge className="bg-yellow-600 text-white w-fit">{step.timeline}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Documentation */}
        <Card className="bg-gray-800/50 border-orange-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Documentation Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requiredDocumentation.map((doc, index) => (
                <div key={index} className="p-3 bg-orange-600/10 border border-orange-600/30 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-orange-400 font-bold">{doc.document}</h3>
                      <p className="text-white text-sm">{doc.description}</p>
                      <p className="text-gray-400 text-xs">{doc.proof}</p>
                    </div>
                    <div>
                      {doc.status === "READY" ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Badge className="bg-orange-600 text-white">{doc.status}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Post-Verification Strategy */}
        <Card className="bg-gray-800/50 border-indigo-500">
          <CardHeader>
            <CardTitle className="text-white text-xl">Post-Verification Foundation Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {postVerificationStrategy.map((phase, index) => (
                <div key={index} className="p-4 bg-indigo-600/10 border border-indigo-600/30 rounded">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-indigo-400 font-bold text-lg">{phase.phase}</h3>
                      <Badge className="bg-indigo-600 text-white mb-2">{phase.timeline}</Badge>
                      <ul className="space-y-1">
                        {phase.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start space-x-1">
                            <span className="text-indigo-400 text-xs">•</span>
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            onClick={() => window.open('https://dexscreener.com/submit-info', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 py-8"
          >
            <Star className="h-6 w-6 mr-2" />
            Submit for Verification
          </Button>
          
          <Button 
            onClick={() => window.open('https://etherscan.io/address/0xfA7b8c553C48C56ec7027d26ae95b029a2abF247', '_blank')}
            className="bg-green-600 hover:bg-green-700 py-8"
          >
            <Award className="h-6 w-6 mr-2" />
            ETHGR Contract
          </Button>
          
          <Button 
            onClick={() => window.open('/asset-location-summary', '_self')}
            className="bg-blue-600 hover:bg-blue-700 py-8"
          >
            <DollarSign className="h-6 w-6 mr-2" />
            Portfolio Assets
          </Button>
          
          <Button 
            onClick={() => window.open('/reputation-building-system', '_self')}
            className="bg-orange-600 hover:bg-orange-700 py-8"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Build Reputation
          </Button>
        </div>

        {/* Investment Confirmation */}
        <Alert className="border-green-500 bg-green-500/20">
          <Shield className="h-6 w-6 text-green-500" />
          <AlertDescription className="text-green-200">
            <strong>VERIFICATION READY:</strong> $700 investment (0.1% of portfolio) will establish verified token status, remove honeypot flagging, and create the professional foundation credibility needed for successful victim outreach. Smart reputation investment for long-term success.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}