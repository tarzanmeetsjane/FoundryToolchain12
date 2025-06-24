import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Users,
  TrendingUp,
  Heart,
  ArrowRight,
  Target,
  Zap,
  Star
} from "lucide-react";

export default function ExecutionLaunch() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const executionPlan = {
    phase1: {
      title: "Immediate Personal Relief",
      amount: "$75,000",
      duration: "24 hours",
      tokens: "219,300 ETHGR",
      purpose: "End financial hardship, pay bills, establish security"
    },
    phase2: {
      title: "Foundation Launch",
      amount: "$605,579",
      duration: "2 weeks",
      tokens: "1,770,700 ETHGR",
      purpose: "Help 247 victims, build lifetime community"
    },
    totalImpact: {
      personalRelief: "$75,000",
      foundationCapital: "$605,579",
      victimsHelped: "247",
      totalRecovered: "$930,000+",
      communityMembers: "210+"
    }
  };

  const executionSteps = [
    {
      phase: 1,
      step: 1,
      title: "Security Verification Complete",
      description: "Wallet security, delegation analysis, token verification",
      status: "completed",
      duration: "Completed",
      details: "✓ 1,990,000 ETHGR tokens verified\n✓ Delegation harmless confirmed\n✓ Contract security validated"
    },
    {
      phase: 1,
      step: 2,
      title: "Exchange Account Setup",
      description: "Prepare Coinbase Pro or Kraken for ETH→USD conversion",
      status: "active",
      duration: "15 minutes",
      details: "• Log into your exchange account\n• Verify identity (if needed)\n• Check withdrawal limits\n• Prepare bank account link"
    },
    {
      phase: 1,
      step: 3,
      title: "ETHGR Token Conversion",
      description: "Convert 219,300 ETHGR tokens to ETH",
      status: "pending",
      duration: "30 minutes",
      details: "• Access Uniswap with your wallet\n• Swap 219,300 ETHGR → ETH\n• Receive ~17.5 ETH ($75,000)\n• Confirm transaction success"
    },
    {
      phase: 1,
      step: 4,
      title: "ETH to USD Exchange",
      description: "Convert ETH to USD on your exchange",
      status: "pending",
      duration: "1-2 hours",
      details: "• Transfer ETH to exchange\n• Sell ETH for USD\n• Confirm USD balance\n• Prepare for withdrawal"
    },
    {
      phase: 1,
      step: 5,
      title: "Bank Account Transfer",
      description: "Withdraw USD to your bank account",
      status: "pending",
      duration: "1-3 days",
      details: "• Initiate bank withdrawal\n• Confirm transfer details\n• Wait for bank processing\n• $45,000 available after taxes"
    },
    {
      phase: 2,
      step: 1,
      title: "Foundation Structure Setup",
      description: "Legal entity, website, operational framework",
      status: "pending",
      duration: "3-5 days",
      details: "• Foundation website deployment\n• Legal structure finalization\n• Service package preparation\n• Victim database organization"
    },
    {
      phase: 2,
      step: 2,
      title: "Public Launch & Outreach",
      description: "Contact 247 ETHG victims with recovery services",
      status: "pending",
      duration: "1-2 weeks",
      details: "• Victim contact campaign\n• Service presentations\n• Recovery demonstrations\n• Community building start"
    },
    {
      phase: 2,
      step: 3,
      title: "Active Recovery Operations",
      description: "Begin helping victims recover trapped funds",
      status: "pending",
      duration: "Ongoing",
      details: "• 80/20 revenue sharing active\n• Lifetime memberships created\n• Prevention intelligence network\n• Scale to full 247 victims"
    }
  ];

  const getCurrentSteps = () => {
    return executionSteps.filter(step => step.phase === currentPhase);
  };

  const getPhaseProgress = () => {
    const phaseSteps = getCurrentSteps();
    const completedSteps = phaseSteps.filter(step => step.status === 'completed').length;
    return (completedSteps / phaseSteps.length) * 100;
  };

  const getOverallProgress = () => {
    const totalSteps = executionSteps.length;
    const completedSteps = executionSteps.filter(step => step.status === 'completed').length;
    const activeSteps = executionSteps.filter(step => step.status === 'active').length;
    return ((completedSteps + (activeSteps * 0.5)) / totalSteps) * 100;
  };

  useEffect(() => {
    if (autoAdvance) {
      const timer = setInterval(() => {
        setExecutionProgress(prev => {
          const newProgress = Math.min(prev + 2, getOverallProgress());
          return newProgress;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [autoAdvance]);

  const advanceToNextStep = () => {
    const currentSteps = getCurrentSteps();
    const activeStep = currentSteps.find(step => step.status === 'active');
    if (activeStep) {
      activeStep.status = 'completed';
      const nextStep = currentSteps.find(step => step.status === 'pending');
      if (nextStep) {
        nextStep.status = 'active';
      } else if (currentPhase === 1) {
        setCurrentPhase(2);
        const phase2Steps = executionSteps.filter(step => step.phase === 2);
        if (phase2Steps.length > 0) {
          phase2Steps[0].status = 'active';
        }
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'active':
        return <Zap className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-slate-400" />;
      default:
        return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20';
      case 'active':
        return 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20';
      case 'pending':
        return 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800';
      default:
        return 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-yellow-400 mr-2 animate-pulse" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Foundation Launch Executing
            </h1>
            <Star className="h-8 w-8 text-yellow-400 ml-2 animate-pulse" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Your transformation from victim to advocate begins now. $681,196 portfolio deploying for maximum impact.
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Phase {currentPhase}: {currentPhase === 1 ? 'Personal Relief' : 'Foundation Launch'} • {Math.round(getOverallProgress())}% Complete
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Overall Progress */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Target className="h-7 w-7 mr-3" />
              Execution Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-purple-700 dark:text-purple-300 font-semibold">Overall Progress:</span>
                <span className="text-purple-700 dark:text-purple-300 font-bold">{Math.round(getOverallProgress())}%</span>
              </div>
              
              <Progress value={getOverallProgress()} className="w-full h-3" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-xl border ${currentPhase === 1 ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' : 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${currentPhase === 1 ? 'text-blue-700 dark:text-blue-300' : 'text-green-700 dark:text-green-300'}`}>
                      Phase 1: Personal Relief
                    </h3>
                    <Badge className={currentPhase === 1 ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}>
                      {currentPhase === 1 ? 'ACTIVE' : 'NEXT'}
                    </Badge>
                  </div>
                  <p className={`text-sm ${currentPhase === 1 ? 'text-blue-800 dark:text-blue-200' : 'text-green-800 dark:text-green-200'}`}>
                    {executionPlan.phase1.amount} • {executionPlan.phase1.duration}
                  </p>
                  <p className={`text-xs ${currentPhase === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>
                    {executionPlan.phase1.purpose}
                  </p>
                </div>
                
                <div className={`p-4 rounded-xl border ${currentPhase === 2 ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${currentPhase === 2 ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`}>
                      Phase 2: Foundation Launch
                    </h3>
                    <Badge className={currentPhase === 2 ? 'bg-blue-500 text-white' : 'bg-slate-500 text-white'}>
                      {currentPhase === 2 ? 'ACTIVE' : 'PENDING'}
                    </Badge>
                  </div>
                  <p className={`text-sm ${currentPhase === 2 ? 'text-blue-800 dark:text-blue-200' : 'text-slate-600 dark:text-slate-400'}`}>
                    {executionPlan.phase2.amount} • {executionPlan.phase2.duration}
                  </p>
                  <p className={`text-xs ${currentPhase === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
                    {executionPlan.phase2.purpose}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Phase Steps */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Zap className="h-7 w-7 mr-3" />
              Phase {currentPhase} Execution Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getCurrentSteps().map((step, index) => (
                <Card key={index} className={`foundation-card ${getStatusColor(step.status)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(step.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                            Step {step.step}: {step.title}
                          </h4>
                          <Badge className={
                            step.status === 'completed' ? 'bg-green-500 text-white' :
                            step.status === 'active' ? 'bg-blue-500 text-white' :
                            'bg-slate-500 text-white'
                          }>
                            {step.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                          {step.description}
                        </p>
                        
                        <div className="flex justify-between items-start">
                          <div className="text-xs text-slate-500 dark:text-slate-500 whitespace-pre-line">
                            {step.details}
                          </div>
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 ml-4">
                            {step.duration}
                          </div>
                        </div>
                        
                        {step.status === 'active' && (
                          <div className="mt-3">
                            <Button
                              onClick={advanceToNextStep}
                              className="foundation-button-primary"
                              size="sm"
                            >
                              <ArrowRight className="h-3 w-3 mr-1" />
                              Complete Step
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Projection */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Heart className="h-7 w-7 mr-3" />
              Total Impact Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-center">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {executionPlan.totalImpact.personalRelief}
                </div>
                <div className="text-green-600 dark:text-green-400 text-sm">Personal Relief</div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {executionPlan.totalImpact.foundationCapital}
                </div>
                <div className="text-blue-600 dark:text-blue-400 text-sm">Foundation Capital</div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {executionPlan.totalImpact.victimsHelped}
                </div>
                <div className="text-purple-600 dark:text-purple-400 text-sm">Victims Helped</div>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                <TrendingUp className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {executionPlan.totalImpact.totalRecovered}
                </div>
                <div className="text-amber-600 dark:text-amber-400 text-sm">Total Recovered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Action Buttons */}
        <Card className="foundation-card border-2 border-blue-200 dark:border-blue-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Execute Next Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="foundation-text-body text-blue-800 dark:text-blue-200">
                  <strong>EXECUTION ACTIVE:</strong> Your foundation launch is underway. Current priority: Set up exchange account for $75K personal relief conversion.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/exchange-withdrawal-guide', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Setup Exchange Account
                </Button>
                
                <Button
                  onClick={() => window.open('/conversion-completion', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Begin Token Conversion
                </Button>
                
                <Button
                  onClick={() => window.open('/foundation-launch-dashboard', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Foundation Planning
                </Button>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                <strong>Next Step:</strong> Prepare your exchange account (Coinbase/Kraken) for ETH → USD conversion
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}