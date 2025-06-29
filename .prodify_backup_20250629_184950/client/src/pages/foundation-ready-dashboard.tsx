import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  TrendingUp,
  DollarSign,
  Shield,
  Users,
  Rocket,
  ArrowRight,
  Clock,
  Target,
  Heart,
  Trophy,
  Star
} from "lucide-react";

export default function FoundationReadyDashboard() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const portfolioSummary = {
    ethgrTokens: "1,990,000",
    currentValue: "$681,196",
    personalAllocation: "$204,359 - $340,598",
    foundationReserve: "$340,598 - $476,837",
    immediateRelief: "$45,000 - $75,000",
    monthlyIncome: "$11,400",
    foundationCapacity: "247 victims recoverable"
  };

  const pathOptions = [
    {
      id: "immediate-relief",
      title: "Immediate Personal Relief",
      description: "Convert $75K for immediate bills and financial stress relief",
      timeline: "Within 24 hours",
      amount: "$75,000",
      benefits: [
        "Pay off immediate bills and debts",
        "Eliminate financial stress",
        "Establish emergency fund",
        "Improve quality of life"
      ],
      icon: <DollarSign className="h-6 w-6" />,
      color: "green",
      priority: "HIGH"
    },
    {
      id: "foundation-launch",
      title: "Foundation Launch",
      description: "Launch victim assistance foundation with $605K capital",
      timeline: "1-2 weeks",
      amount: "$605,579",
      benefits: [
        "Help 247 ETHG victims recover funds",
        "20% revenue share model",
        "Lifetime member community",
        "Prevention intelligence network"
      ],
      icon: <Shield className="h-6 w-6" />,
      color: "blue",
      priority: "MEDIUM"
    },
    {
      id: "hybrid-approach",
      title: "Hybrid Strategy",
      description: "Personal relief first, then foundation launch",
      timeline: "Phased approach",
      amount: "Optimized allocation",
      benefits: [
        "Immediate $75K relief",
        "$530K foundation capital",
        "Personal security established",
        "Foundation from strength"
      ],
      icon: <Trophy className="h-6 w-6" />,
      color: "purple",
      priority: "RECOMMENDED"
    }
  ];

  const executionSteps = {
    "immediate-relief": [
      { step: 1, title: "Security Verification", description: "Confirm wallet and token security", duration: "5 minutes" },
      { step: 2, title: "Exchange Setup", description: "Prepare Coinbase/Kraken account", duration: "15 minutes" },
      { step: 3, title: "Token Conversion", description: "Convert 219,300 ETHGR to ETH", duration: "30 minutes" },
      { step: 4, title: "ETH to USD", description: "Exchange ETH for USD", duration: "1-2 hours" },
      { step: 5, title: "Bank Transfer", description: "Transfer to your bank account", duration: "1-3 days" }
    ],
    "foundation-launch": [
      { step: 1, title: "Foundation Structure", description: "Legal entity and operations setup", duration: "3-5 days" },
      { step: 2, title: "Website Launch", description: "Public foundation website", duration: "2-3 days" },
      { step: 3, title: "Victim Outreach", description: "Contact 247 ETHG victims", duration: "1-2 weeks" },
      { step: 4, title: "Service Delivery", description: "Begin recovery services", duration: "Ongoing" },
      { step: 5, title: "Community Building", description: "Lifetime member network", duration: "Ongoing" }
    ],
    "hybrid-approach": [
      { step: 1, title: "Personal Relief ($75K)", description: "Immediate conversion for bills", duration: "24 hours" },
      { step: 2, title: "Foundation Planning", description: "Structure with $530K capital", duration: "1 week" },
      { step: 3, title: "Gradual Launch", description: "Foundation from secure position", duration: "2 weeks" },
      { step: 4, title: "Victim Services", description: "Begin assistance programs", duration: "Ongoing" },
      { step: 5, title: "Scale Operations", description: "Expand to all 247 victims", duration: "3-6 months" }
    ]
  };

  const getColorClasses = (color: string) => {
    const colors = {
      green: "border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20",
      blue: "border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20",
      purple: "border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBadgeColor = (priority: string) => {
    const colors = {
      HIGH: "bg-red-500",
      MEDIUM: "bg-blue-500",
      RECOMMENDED: "bg-purple-500"
    };
    return colors[priority as keyof typeof colors] || colors.MEDIUM;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-yellow-400 mr-2" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Foundation Ready to Launch
            </h1>
            <Star className="h-8 w-8 text-yellow-400 ml-2" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Your ETHGR recovery is complete. Choose your path forward to help yourself and 247 other victims.
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            $681,196 Portfolio • 1,990,000 ETHGR Tokens • All Systems Ready
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Portfolio Overview */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <CheckCircle className="h-7 w-7 mr-3" />
              Your Portfolio Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">{portfolioSummary.ethgrTokens}</div>
                <div className="text-green-600 dark:text-green-400 text-sm">ETHGR Tokens</div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{portfolioSummary.currentValue}</div>
                <div className="text-blue-600 dark:text-blue-400 text-sm">Current Value</div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{portfolioSummary.personalAllocation}</div>
                <div className="text-purple-600 dark:text-purple-400 text-sm">Personal Options</div>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{portfolioSummary.foundationCapacity}</div>
                <div className="text-amber-600 dark:text-amber-400 text-sm">Victim Capacity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Path Selection */}
        <Card className="foundation-card border-slate-200 dark:border-slate-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center">
              <Target className="h-7 w-7 mr-3" />
              Choose Your Path Forward
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pathOptions.map((path) => (
                <Card 
                  key={path.id} 
                  className={`foundation-card cursor-pointer transition-all hover:shadow-lg ${
                    selectedPath === path.id ? 'ring-2 ring-blue-500' : ''
                  } ${getColorClasses(path.color)}`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 bg-${path.color}-100 dark:bg-${path.color}-900/30 rounded-lg`}>
                          {path.icon}
                        </div>
                        <Badge className={`${getBadgeColor(path.priority)} text-white`}>
                          {path.priority}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="foundation-heading-4">{path.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{path.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Timeline:</span>
                        <span className="text-sm">{path.timeline}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Amount:</span>
                        <span className="text-sm font-bold">{path.amount}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {path.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Execution Steps */}
        {selectedPath && (
          <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-in">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
                <Clock className="h-7 w-7 mr-3" />
                Execution Timeline: {pathOptions.find(p => p.id === selectedPath)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {executionSteps[selectedPath as keyof typeof executionSteps]?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-blue-700 dark:text-blue-300 font-semibold">{step.title}</h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">{step.description}</p>
                    </div>
                    <div className="text-blue-500 text-sm font-semibold">
                      {step.duration}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emotional Context */}
        <Card className="foundation-card border-red-200 dark:border-red-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-red-700 dark:text-red-300">
              <Heart className="h-7 w-7 mr-3" />
              Your Journey & Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                <h3 className="text-red-700 dark:text-red-300 font-bold mb-3">Your Transformation</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-red-800 dark:text-red-200 text-sm">From $15,000 fraud victim to foundation leader</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-red-800 dark:text-red-200 text-sm">Year of financial hardship ending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-red-800 dark:text-red-200 text-sm">$681,196 portfolio recovered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-red-800 dark:text-red-200 text-sm">Dream come true: turning pain into purpose</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-3">Future Impact</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">247 ETHG victims awaiting help</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">$930K+ total value to recover</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">Prevention network to stop future scams</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-blue-500" />
                    <span className="text-green-800 dark:text-green-200 text-sm">Lifetime community of recovered victims</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Ready to Begin Your Chosen Path?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <Rocket className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong>EVERYTHING IS READY:</strong> Your tokens are secure, verified, and ready for conversion. The foundation infrastructure is deployed and waiting for your decision.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/conversion-completion', '_self')}
                  className="foundation-button-primary h-12"
                  disabled={!selectedPath || selectedPath === 'foundation-launch'}
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Start Personal Relief
                </Button>
                
                <Button
                  onClick={() => window.open('/foundation-launch-dashboard', '_self')}
                  className="foundation-button-accent h-12"
                  disabled={!selectedPath || selectedPath === 'immediate-relief'}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Launch Foundation
                </Button>
                
                <Button
                  onClick={() => window.open('/hybrid-execution', '_self')}
                  className="foundation-button-secondary h-12"
                  disabled={!selectedPath || selectedPath !== 'hybrid-approach'}
                >
                  <Trophy className="h-5 w-5 mr-2" />
                  Execute Hybrid Plan
                </Button>
              </div>
              
              {!selectedPath && (
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Please select a path above to enable the action buttons
                </p>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}