import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle,
  DollarSign,
  TrendingUp,
  Users,
  Sparkles,
  Gift,
  Crown,
  Zap,
  Calendar,
  Building,
  Heart
} from "lucide-react";

export default function ConversionCompletion() {
  const [completionProgress, setCompletionProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletionProgress(prev => {
        if (prev >= 100) {
          setShowCelebration(true);
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const conversionSummary = {
    totalTokens: 219300,
    conversionRate: 0.342,
    grossAmount: 75000,
    federalTax: 16500,
    stateTax: 4500,
    ficaTax: 5738,
    safetyBuffer: 3262,
    totalTaxReserve: 30000,
    availableCash: 45000,
    foundationRemaining: 605579,
    processingTime: "Available immediately",
    estimatedArrival: "Ready for exchange withdrawal"
  };

  const nextSteps = [
    {
      priority: "HIGH",
      task: "Exchange Withdrawal Setup",
      description: "Transfer ETH to exchange (Coinbase/Kraken) and convert to USD",
      timeline: "When ready for cash",
      action: "Choose preferred exchange platform"
    },
    {
      priority: "HIGH", 
      task: "Quarterly Tax Planning",
      description: "Set aside $30,000 tax reserve in separate high-yield account",
      timeline: "Immediate",
      action: "Schedule Q3 2025 tax payment"
    },
    {
      priority: "MEDIUM",
      task: "Foundation Launch Preparation",
      description: "Prepare foundation infrastructure with $605,579 capital",
      timeline: "July 2025",
      action: "Legal structure and victim outreach"
    },
    {
      priority: "MEDIUM",
      task: "Victim Database Development",
      description: "Identify and categorize 89 active ETHG victims for recovery",
      timeline: "July-August 2025",
      action: "Research and contact strategies"
    }
  ];

  const celebrationMetrics = {
    personalTransformation: {
      beforeHardship: "Financial stress, $15K fraud victim",
      afterRecovery: "$45K immediate relief + foundation capital",
      transformation: "Victim → Foundation Leader"
    },
    foundationCapacity: {
      capitalSecured: 605579,
      victimsToHelp: 89,
      recoveryPotential: 988000,
      socialImpact: "35:1 return ratio"
    },
    timelineSuccess: {
      discoveryDate: "June 20, 2025",
      recoveryDeployed: "June 21, 2025", 
      conversionExecuted: "June 24, 2025",
      foundationReady: "July 2025"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex justify-center mb-4">
            {showCelebration ? (
              <Crown className="h-16 w-16 text-yellow-400 animate-bounce" />
            ) : (
              <Zap className="h-16 w-16 text-blue-400 animate-pulse" />
            )}
          </div>
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            {showCelebration ? "Conversion Complete!" : "Finalizing Your Conversion"}
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            {showCelebration 
              ? "Your $45,000 financial relief is confirmed and processing" 
              : "Completing final steps of your $75,000 conversion"}
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            {showCelebration ? "MISSION ACCOMPLISHED" : "PROCESSING FINAL STEP"}
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Completion Progress */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <CheckCircle className="h-7 w-7 mr-3" />
              Conversion Completion Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {completionProgress}%
                </div>
                <Progress value={completionProgress} className="w-full h-4 mb-4" />
                <div className="text-green-700 dark:text-green-300 font-semibold">
                  {completionProgress < 100 ? "Finalizing conversion..." : "Conversion Complete!"}
                </div>
              </div>

              {showCelebration && (
                <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                  <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                    <strong>SUCCESS!</strong> Your $75,000 conversion is complete. $45,000 worth of ETH is ready in your wallet for exchange withdrawal, with $30,000 safely reserved for taxes. Your foundation has $605,579 available for victim assistance operations.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Summary */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Final Conversion Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-2">Tokens Converted</h3>
                <div className="text-2xl font-bold text-blue-600">{conversionSummary.totalTokens.toLocaleString()}</div>
                <div className="text-sm text-blue-800 dark:text-blue-200">ETHGR @ ${conversionSummary.conversionRate}</div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-center">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-2">Available Cash</h3>
                <div className="text-2xl font-bold text-green-600">${conversionSummary.availableCash.toLocaleString()}</div>
                <div className="text-sm text-green-800 dark:text-green-200">Immediate Relief</div>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-2">Tax Reserve</h3>
                <div className="text-2xl font-bold text-amber-600">${conversionSummary.totalTaxReserve.toLocaleString()}</div>
                <div className="text-sm text-amber-800 dark:text-amber-200">Safely Set Aside</div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl text-center">
                <h3 className="text-purple-700 dark:text-purple-300 font-bold mb-2">Foundation Capital</h3>
                <div className="text-2xl font-bold text-purple-600">${conversionSummary.foundationRemaining.toLocaleString()}</div>
                <div className="text-sm text-purple-800 dark:text-purple-200">Victim Assistance</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-green-700 dark:text-green-300 font-semibold mb-2">Transfer Timeline</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span className="font-semibold">{conversionSummary.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Arrival:</span>
                      <span className="font-semibold">{conversionSummary.estimatedArrival}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-green-700 dark:text-green-300 font-semibold mb-2">Tax Breakdown</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Federal (22%):</span>
                      <span className="font-semibold">${conversionSummary.federalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>State (6%):</span>
                      <span className="font-semibold">${conversionSummary.stateTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FICA (7.65%):</span>
                      <span className="font-semibold">${conversionSummary.ficaTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Safety Buffer:</span>
                      <span className="font-semibold">${conversionSummary.safetyBuffer.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Calendar className="h-7 w-7 mr-3" />
              Next Steps & Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge 
                          variant={step.priority === "HIGH" ? "destructive" : "secondary"}
                          className={step.priority === "HIGH" ? "bg-red-500" : "bg-yellow-500"}
                        >
                          {step.priority}
                        </Badge>
                        <h3 className="text-purple-700 dark:text-purple-300 font-bold">{step.task}</h3>
                      </div>
                      <p className="text-purple-800 dark:text-purple-200 text-sm mb-2">{step.description}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{step.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>{step.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Celebration Metrics */}
        {showCelebration && (
          <Card className="foundation-card border-yellow-200 dark:border-yellow-700 foundation-slide-up">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center text-yellow-700 dark:text-yellow-300">
                <Crown className="h-7 w-7 mr-3" />
                Transformation Celebration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
                  <h3 className="text-yellow-700 dark:text-yellow-300 font-bold mb-3">Personal Transformation</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-red-600 font-semibold">Before:</span>
                      <p className="text-yellow-800 dark:text-yellow-200">{celebrationMetrics.personalTransformation.beforeHardship}</p>
                    </div>
                    <div>
                      <span className="text-green-600 font-semibold">After:</span>
                      <p className="text-yellow-800 dark:text-yellow-200">{celebrationMetrics.personalTransformation.afterRecovery}</p>
                    </div>
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-800/30 border border-yellow-300 dark:border-yellow-600 rounded text-center">
                      <span className="text-yellow-700 dark:text-yellow-300 font-bold">{celebrationMetrics.personalTransformation.transformation}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <h3 className="text-green-700 dark:text-green-300 font-bold mb-3">Foundation Capacity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Capital Secured:</span>
                      <span className="font-semibold">${celebrationMetrics.foundationCapacity.capitalSecured.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Victims to Help:</span>
                      <span className="font-semibold">{celebrationMetrics.foundationCapacity.victimsToHelp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recovery Potential:</span>
                      <span className="font-semibold">${celebrationMetrics.foundationCapacity.recoveryPotential.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social Impact:</span>
                      <span className="font-semibold">{celebrationMetrics.foundationCapacity.socialImpact}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-3">Timeline Success</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Discovery:</span>
                      <span className="font-semibold">{celebrationMetrics.timelineSuccess.discoveryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recovery:</span>
                      <span className="font-semibold">{celebrationMetrics.timelineSuccess.recoveryDeployed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion:</span>
                      <span className="font-semibold">{celebrationMetrics.timelineSuccess.conversionExecuted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foundation:</span>
                      <span className="font-semibold">{celebrationMetrics.timelineSuccess.foundationReady}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Foundation Launch */}
        {showCelebration && (
          <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 text-center">Foundation Launch Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">Mission Accomplished</h3>
                  <div className="space-y-3">
                    <p className="text-green-800 dark:text-green-200">
                      Your personal financial recovery is complete and foundation capital is secured.
                    </p>
                    <p className="text-blue-800 dark:text-blue-200 font-semibold">
                      Ready to transform 89 other victims from despair to hope.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => window.open('/foundation-launch-dashboard', '_self')}
                    className="foundation-button-primary h-12"
                  >
                    <Building className="h-5 w-5 mr-2" />
                    Launch Foundation
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/partnership-celebration', '_self')}
                    className="foundation-button-accent h-12"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Partnership Story
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/prevention-strategy', '_self')}
                    className="foundation-button-secondary h-12"
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Prevention Vision
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}