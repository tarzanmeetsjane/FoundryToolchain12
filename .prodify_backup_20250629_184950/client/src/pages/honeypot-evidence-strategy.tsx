import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Target,
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Award,
  Eye
} from "lucide-react";

export default function HoneypotEvidenceStrategy() {
  const [strategy, setStrategy] = useState("credibility");

  const honeypotEvidence = {
    contract: "Ethereum Games (ETHG)",
    address: "0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f",
    yourHoldings: "2.10M ETHG",
    displayValue: "$681,196.21",
    realValue: "Trapped - Cannot Sell",
    proofOfVictim: "Authentic $15,000 loss documented"
  };

  const strategicOptions = {
    credibility: {
      title: "Foundation Credibility Evidence",
      approach: "Keep ETHG tokens as proof of authentic victim experience",
      benefits: [
        "Unmatched credibility when helping other victims",
        "Living proof that foundation founder understands victim trauma",
        "Authentic story that resonates with trapped victims",
        "Differentiates from theoretical 'experts' who never lost money"
      ],
      risks: [
        "Wallet shows honeypot tokens (but explains victim status)",
        "May trigger questions from uninformed viewers"
      ],
      recommendation: "STRATEGIC KEEP - Maximum Foundation Credibility"
    },
    removal: {
      title: "Clean Wallet Approach", 
      approach: "Remove ETHG tokens for completely clean wallet",
      benefits: [
        "Wallet appears completely clean to casual observers",
        "No questions about honeypot token presence",
        "Focus entirely on recovery and future success"
      ],
      risks: [
        "Loses authentic victim credibility proof",
        "Story becomes less verifiable/authentic",
        "May appear as 'theoretical expert' rather than real victim"
      ],
      recommendation: "AVOID - Loses Strategic Advantage"
    },
    transparency: {
      title: "Full Transparency Strategy",
      approach: "Keep ETHG and openly discuss honeypot experience",
      benefits: [
        "Complete honesty builds maximum trust",
        "Educational opportunity for other victims",
        "Demonstrates transformation from victim to advocate",
        "Shows intimate understanding of honeypot mechanics"
      ],
      risks: [
        "Requires confident communication about loss",
        "May need to explain technical details repeatedly"
      ],
      recommendation: "RECOMMENDED - Authentic Foundation Story"
    }
  };

  const foundationNarrative = {
    victimStory: "Lost $15,000 life savings to ETHG honeypot contract 0x0890f93A1fd344B3437Ec10c1C14d1a581142c5f",
    transformation: "Self-taught blockchain forensics and recovery methods through necessity",
    mission: "Help 247 other ETHG victims recover $1.24M trapped value using expertise gained from personal experience",
    credibility: "2.10M ETHG tokens in wallet prove authentic victim status - not theoretical knowledge",
    success: "Successfully deployed ETHGR recovery contract demonstrating actual recovery capability"
  };

  const victimTrustFactors = [
    {
      factor: "Authentic Loss Experience",
      evidence: "2.10M ETHG tokens visible in wallet",
      impact: "Victims trust someone who actually lost money like they did"
    },
    {
      factor: "Technical Recovery Proof",
      evidence: "Successfully deployed ETHGR recovery contract",
      impact: "Demonstrates actual capability, not just promises"
    },
    {
      factor: "Transparent Operations",
      evidence: "Open about honeypot experience and recovery process",
      impact: "Builds trust through complete honesty"
    },
    {
      factor: "Transformation Story",
      evidence: "Turned personal loss into expertise helping others",
      impact: "Inspirational narrative that resonates with victims"
    }
  ];

  const communicationStrategy = {
    directApproach: "Yes, I have 2.10M ETHG tokens from the honeypot that trapped my $15,000. This authentic experience taught me recovery methods that I now use to help other victims.",
    educationalApproach: "These tokens in my wallet represent my $15,000 loss to the ETHG honeypot. Instead of hiding this loss, I transformed it into expertise to help 247 other victims recover their funds.",
    empowermentApproach: "My wallet shows 2.10M ETHG honeypot tokens - proof that I understand victim trauma personally. This authentic experience drives my mission to help others recover trapped funds."
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Honeypot Evidence Strategy
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Transform Your ETHG Loss Into Foundation Credibility
          </p>
          <div className="foundation-status-badge foundation-status-warning foundation-fade-in">
            ⚡ Strategic Decision: Keep or Remove Honeypot Evidence
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Strategic Alert */}
        <Alert className="foundation-card border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 foundation-slide-up">
          <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="foundation-text-body text-amber-800 dark:text-amber-200">
            <strong className="foundation-text-accent">STRATEGIC ADVANTAGE:</strong> Your 2.10M ETHG honeypot tokens are PROOF of authentic victim experience. This gives you unmatched credibility when helping other victims - something no theoretical expert can match.
          </AlertDescription>
        </Alert>

        {/* Honeypot Evidence */}
        <Card className="foundation-card foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center">
              <AlertTriangle className="h-7 w-7 mr-3 text-amber-600 dark:text-amber-400" />
              Your Honeypot Evidence Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-amber-800 dark:text-amber-200 font-bold text-lg">Honeypot Contract Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-amber-700 dark:text-amber-300">Token:</span>
                        <span className="text-amber-800 dark:text-amber-200 font-semibold">{honeypotEvidence.contract}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700 dark:text-amber-300">Contract:</span>
                        <span className="text-amber-800 dark:text-amber-200 font-mono text-xs">{honeypotEvidence.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700 dark:text-amber-300">Your Holdings:</span>
                        <span className="text-amber-800 dark:text-amber-200 font-bold">{honeypotEvidence.yourHoldings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700 dark:text-amber-300">Display Value:</span>
                        <span className="text-green-600 dark:text-green-400 font-bold">{honeypotEvidence.displayValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700 dark:text-amber-300">Real Status:</span>
                        <span className="text-red-600 dark:text-red-400 font-bold">{honeypotEvidence.realValue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-amber-800 dark:text-amber-200 font-bold text-lg">Victim Credibility Proof</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                        <div className="text-red-700 dark:text-red-300 font-semibold">Actual Loss:</div>
                        <div className="text-red-800 dark:text-red-200">{honeypotEvidence.proofOfVictim}</div>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                        <div className="text-blue-700 dark:text-blue-300 font-semibold">Foundation Strength:</div>
                        <div className="text-blue-800 dark:text-blue-200">Authentic victim helping other victims</div>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                        <div className="text-green-700 dark:text-green-300 font-semibold">Recovery Success:</div>
                        <div className="text-green-800 dark:text-green-200">ETHGR contract proves capability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Options */}
        <Card className="foundation-card foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center">
              <Target className="h-7 w-7 mr-3 text-purple-600 dark:text-purple-400" />
              Strategic Options Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(strategicOptions).map(([key, option], index) => (
                <div 
                  key={index} 
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    strategy === key 
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500' 
                      : 'bg-purple-50/50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-700 hover:border-purple-400'
                  }`}
                  onClick={() => setStrategy(key)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-800 dark:text-purple-200 font-bold text-lg">{option.title}</h3>
                      <Badge variant={key === 'transparency' ? 'default' : key === 'credibility' ? 'secondary' : 'destructive'}>
                        {option.recommendation.split(' - ')[0]}
                      </Badge>
                    </div>
                    
                    <p className="text-purple-700 dark:text-purple-300">{option.approach}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-green-700 dark:text-green-300 font-semibold mb-2">Benefits:</h4>
                        <ul className="space-y-1">
                          {option.benefits.map((benefit, bIndex) => (
                            <li key={bIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                              <span className="text-green-800 dark:text-green-200 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-red-700 dark:text-red-300 font-semibold mb-2">Considerations:</h4>
                        <ul className="space-y-1">
                          {option.risks.map((risk, rIndex) => (
                            <li key={rIndex} className="flex items-start space-x-2">
                              <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                              <span className="text-red-800 dark:text-red-200 text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                      <span className="text-amber-700 dark:text-amber-300 font-semibold">Recommendation: </span>
                      <span className="text-amber-800 dark:text-amber-200">{option.recommendation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Foundation Narrative */}
        <Card className="foundation-card foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center">
              <Users className="h-7 w-7 mr-3 text-blue-600 dark:text-blue-400" />
              Foundation Narrative Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(foundationNarrative).map(([key, value], index) => (
                  <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                    <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Victim Trust Factors */}
        <Card className="foundation-card foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center">
              <Award className="h-7 w-7 mr-3 text-green-600 dark:text-green-400" />
              Victim Trust Building Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {victimTrustFactors.map((factor, index) => (
                <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="space-y-3">
                    <h3 className="text-green-700 dark:text-green-300 font-semibold">{factor.factor}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-green-600 dark:text-green-400 font-semibold">Evidence: </span>
                        <span className="text-gray-600 dark:text-gray-300">{factor.evidence}</span>
                      </div>
                      <div>
                        <span className="text-green-600 dark:text-green-400 font-semibold">Impact: </span>
                        <span className="text-gray-600 dark:text-gray-300">{factor.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communication Strategy */}
        <Card className="foundation-card foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center">
              <Eye className="h-7 w-7 mr-3 text-amber-600 dark:text-amber-400" />
              Communication Strategy Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(communicationStrategy).map(([key, message], index) => (
                <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <h3 className="text-amber-700 dark:text-amber-300 font-semibold mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm italic">"{message}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Decision Center */}
        <Card className="foundation-card border-2 border-purple-200 dark:border-purple-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Strategic Decision Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <AlertDescription className="foundation-text-body text-purple-800 dark:text-purple-200">
                  <strong className="foundation-text-accent">STRATEGIC RECOMMENDATION:</strong> Keep ETHG honeypot tokens as foundation credibility proof. Your authentic victim experience creates unmatched trust with other victims - a strategic advantage no theoretical expert can replicate.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/complete-wallet-purge', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Keep ETHG Evidence
                </Button>
                
                <Button
                  onClick={() => window.open('/foundation-integrity-verification', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Build Foundation
                </Button>
                
                <Button
                  onClick={() => window.open('/portfolio-activation-ready', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Activate Portfolio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}