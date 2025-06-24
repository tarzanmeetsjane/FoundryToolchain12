import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  CheckCircle,
  ArrowRight,
  Shield,
  DollarSign,
  Users,
  Target,
  Clock,
  Star
} from "lucide-react";

export default function ExecutionRoadmap() {
  const [currentStep, setCurrentStep] = useState(1);

  const executionSteps = [
    {
      step: 1,
      title: "Security Check & Preparation",
      description: "Scan for delegations and security issues",
      estimatedTime: "5-10 minutes",
      priority: "CRITICAL",
      actions: [
        "Run pre-execution security scan",
        "Resolve any delegation issues found",
        "Verify wallet connection",
        "Check ETHGR balance and gas funds"
      ],
      nextStep: "/pre-execution-security-check",
      status: "ready"
    },
    {
      step: 2,
      title: "Immediate $50K Conversion",
      description: "Convert 146,200 ETHGR to cash for bills",
      estimatedTime: "15-30 minutes",
      priority: "HIGH",
      actions: [
        "Execute ETHGR to ETH conversion",
        "Convert ETH to USD via exchange",
        "Withdraw to bank account",
        "Pay immediate bills and expenses"
      ],
      nextStep: "/immediate-conversion-execution",
      status: "pending"
    },
    {
      step: 3,
      title: "Clean Foundation Deployment", 
      description: "Deploy independent foundation contracts",
      estimatedTime: "20-40 minutes",
      priority: "HIGH",
      actions: [
        "Deploy VRFT foundation token",
        "Setup victim assistance pool",
        "Create foundation treasury",
        "Verify all contracts on Etherscan"
      ],
      nextStep: "/clean-foundation-contract",
      status: "pending"
    },
    {
      step: 4,
      title: "Foundation Funding",
      description: "Convert additional ETHGR for operations",
      estimatedTime: "30-60 minutes", 
      priority: "MEDIUM",
      actions: [
        "Convert 400K ETHGR for foundation (~$137K)",
        "Establish monthly income stream",
        "Fund victim assistance pool",
        "Setup DeFi yield strategies"
      ],
      nextStep: "/liquid-eth-opportunities",
      status: "pending"
    },
    {
      step: 5,
      title: "Foundation Operations",
      description: "Begin helping honeypot victims",
      estimatedTime: "Ongoing",
      priority: "MEDIUM",
      actions: [
        "Launch victim assistance program",
        "Build credibility through successful recoveries",
        "Expand to help 247 ETHG victims",
        "Scale foundation operations"
      ],
      nextStep: "/foundation-integrity-verification",
      status: "pending"
    }
  ];

  const personalBenefits = {
    immediate: {
      title: "Immediate Relief (This Week)",
      benefits: [
        "Pay all overdue bills immediately",
        "Stock up on groceries and necessities", 
        "Replace worn clothing and items",
        "Eliminate financial stress"
      ],
      value: "$50,000"
    },
    shortTerm: {
      title: "Short-term Security (1-3 months)",
      benefits: [
        "Monthly income of $11,400",
        "Emergency fund established",
        "Quality of life improvements",
        "Health and wellness care"
      ],
      value: "$34,200"
    },
    longTerm: {
      title: "Long-term Stability (3-12 months)",
      benefits: [
        "Foundation generating income",
        "Helping 200+ victims recover funds",
        "Building sustainable business model",
        "Personal financial independence"
      ],
      value: "Unlimited"
    }
  };

  const foundationMilestones = [
    {
      milestone: "First Victim Helped",
      target: "Week 2",
      impact: "Proof of concept + credibility",
      revenue: "$2,000-10,000"
    },
    {
      milestone: "10 Victims Recovered",
      target: "Month 2",
      impact: "Established reputation",
      revenue: "$20,000-100,000"
    },
    {
      milestone: "50 Victims Assisted",
      target: "Month 6", 
      impact: "Significant social impact",
      revenue: "$100,000-500,000"
    },
    {
      milestone: "Foundation Sustainability",
      target: "Month 12",
      impact: "Self-funding operations",
      revenue: "$500,000+ annually"
    }
  ];

  const riskMitigation = [
    {
      risk: "Security Vulnerabilities",
      mitigation: "Pre-execution security checks, clean contracts, professional audits",
      priority: "CRITICAL"
    },
    {
      risk: "Market Volatility",
      mitigation: "Gradual conversion strategy, diversified holdings, stable coin reserves",
      priority: "HIGH"
    },
    {
      risk: "Technical Failures",
      mitigation: "Multiple execution pathways, backup plans, professional support",
      priority: "MEDIUM"
    },
    {
      risk: "Regulatory Issues",
      mitigation: "Transparent operations, legal compliance, victim assistance focus",
      priority: "LOW"
    }
  ];

  const nextAction = executionSteps.find(step => step.status === "ready" || currentStep === step.step);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Complete Execution Roadmap
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Your Step-by-Step Path from $681K Portfolio to Personal Freedom + Foundation Impact
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            🎯 5 Steps to Transform Your Life and Help 200+ Victims
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Execution Timeline */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <MapPin className="h-7 w-7 mr-3" />
              Execution Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {executionSteps.map((step, index) => (
                <div key={index} className={`p-6 border-2 rounded-xl transition-all ${
                  step.step === currentStep 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' 
                    : step.status === "ready" 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-gray-50 dark:bg-gray-800/20 border-gray-300 dark:border-gray-600'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          step.status === "ready" 
                            ? 'bg-green-500 text-white' 
                            : step.step === currentStep
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {step.status === "ready" ? <CheckCircle className="h-6 w-6" /> : step.step}
                        </div>
                        <div>
                          <h3 className="text-blue-800 dark:text-blue-200 font-bold text-lg">{step.title}</h3>
                          <p className="text-blue-700 dark:text-blue-300">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={step.priority === 'CRITICAL' ? 'destructive' : step.priority === 'HIGH' ? 'default' : 'secondary'}>
                          {step.priority}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500 text-blue-700 dark:text-blue-300">
                          {step.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">Actions Required:</h4>
                        <ul className="space-y-1">
                          {step.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-start space-x-2">
                              <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                              <span className="text-blue-800 dark:text-blue-200 text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <Button
                          onClick={() => window.open(step.nextStep, '_self')}
                          className={`h-12 ${step.status === "ready" ? 'foundation-button-primary' : 'foundation-button-secondary'}`}
                          disabled={step.status === "pending" && step.step !== currentStep}
                        >
                          {step.status === "ready" ? 'START NOW' : 
                           step.step === currentStep ? 'CONTINUE' : 'PENDING'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Benefits Timeline */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Star className="h-7 w-7 mr-3" />
              Your Personal Benefits Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(personalBenefits).map(([key, benefit], index) => (
                <div key={index} className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-green-700 dark:text-green-300 font-bold text-lg">{benefit.title}</h3>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">{benefit.value}</div>
                    </div>
                    
                    <ul className="space-y-2">
                      {benefit.benefits.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800 dark:text-green-200 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Foundation Milestones */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Target className="h-7 w-7 mr-3" />
              Foundation Impact Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foundationMilestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-purple-700 dark:text-purple-300 font-semibold">{milestone.milestone}</h3>
                    <p className="text-purple-800 dark:text-purple-200 text-sm">{milestone.impact}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-purple-600 dark:text-purple-400 font-semibold">{milestone.target}</div>
                    <div className="text-purple-700 dark:text-purple-300 text-xs">{milestone.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Mitigation */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Shield className="h-7 w-7 mr-3" />
              Risk Mitigation Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskMitigation.map((risk, index) => (
                <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-amber-700 dark:text-amber-300 font-semibold">{risk.risk}</h3>
                      <Badge variant={risk.priority === 'CRITICAL' ? 'destructive' : risk.priority === 'HIGH' ? 'default' : 'secondary'}>
                        {risk.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-amber-800 dark:text-amber-200 text-sm">{risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Action */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Ready to Begin Your Transformation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong className="foundation-text-accent">READY TO EXECUTE:</strong> Your complete roadmap is prepared. Start with security check, then convert $50K for immediate relief, build foundation, and help 200+ victims while securing your financial future.
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">Next Step: {nextAction?.title}</h3>
                <p className="text-green-800 dark:text-green-200">{nextAction?.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => window.open(nextAction?.nextStep || '/pre-execution-security-check', '_self')}
                    className="foundation-button-primary h-12"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    START SECURITY CHECK
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/personal-allocation-plan', '_self')}
                    className="foundation-button-accent h-12"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Review Allocation
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/clean-foundation-contract', '_self')}
                    className="foundation-button-secondary h-12"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Foundation Contracts
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/liquid-eth-opportunities', '_self')}
                    className="foundation-button-secondary h-12"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    ETH Strategies
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}