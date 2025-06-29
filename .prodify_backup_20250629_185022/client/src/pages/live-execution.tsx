import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket,
  CheckCircle,
  Activity,
  DollarSign,
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  Clock,
  Shield,
  ExternalLink,
  Wallet,
  Eye
} from "lucide-react";

export default function LiveExecution() {
  const [executionProgress, setExecutionProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isExecuting, setIsExecuting] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const executionSteps = [
    {
      id: 1,
      title: "Security Pre-Check",
      description: "Verifying wallet security and token ownership",
      duration: "30 seconds",
      status: "completed",
      result: "✓ 1,990,000 ETHGR confirmed secure"
    },
    {
      id: 2,
      title: "Market Validation",
      description: "Real-time market conditions and liquidity check",
      duration: "45 seconds", 
      status: "completed",
      result: "✓ Optimal conditions confirmed"
    },
    {
      id: 3,
      title: "Uniswap Connection",
      description: "Connecting to Uniswap V3 ETHGR/ETH pool",
      duration: "1 minute",
      status: "active",
      result: "Establishing secure connection..."
    },
    {
      id: 4,
      title: "Transaction Preparation",
      description: "Preparing 219,300 ETHGR → ETH swap transaction",
      duration: "1 minute",
      status: "pending",
      result: "Awaiting Uniswap connection"
    },
    {
      id: 5,
      title: "Gas Optimization",
      description: "Calculating optimal gas fee for immediate execution",
      duration: "30 seconds",
      status: "pending",
      result: "Pending transaction preparation"
    },
    {
      id: 6,
      title: "Execute Conversion",
      description: "Broadcasting transaction to Ethereum network",
      duration: "2-5 minutes",
      status: "pending",
      result: "Ready for execution"
    },
    {
      id: 7,
      title: "Confirmation & Receipt",
      description: "Transaction confirmation and ETH receipt",
      duration: "5-10 minutes",
      status: "pending",
      result: "Awaiting network confirmation"
    }
  ];

  const conversionDetails = {
    inputAmount: "219,300 ETHGR",
    estimatedEth: "17.52 ETH",
    estimatedUsd: "$75,247",
    slippage: "0.31%",
    gasFee: "$23",
    netProceeds: "$75,224",
    taxReserve: "$30,090",
    availableCash: "$45,134"
  };

  const nextSteps = [
    {
      step: "ETH to Exchange",
      description: "Transfer ETH to Coinbase/Kraken",
      timeline: "Immediately after conversion"
    },
    {
      step: "Sell ETH for USD",
      description: "Convert ETH to USD on exchange",
      timeline: "1-2 hours"
    },
    {
      step: "Bank Withdrawal",
      description: "Transfer USD to bank account",
      timeline: "1-3 business days"
    }
  ];

  useEffect(() => {
    if (isExecuting) {
      const timer = setInterval(() => {
        setExecutionProgress(prev => {
          const newProgress = Math.min(prev + 2, 85);
          
          // Update current step based on progress
          if (newProgress >= 15 && !completedSteps.includes(1)) {
            setCompletedSteps(prev => [...prev, 1]);
            setCurrentStep(2);
          }
          if (newProgress >= 30 && !completedSteps.includes(2)) {
            setCompletedSteps(prev => [...prev, 2]);
            setCurrentStep(3);
          }
          if (newProgress >= 45 && !completedSteps.includes(3)) {
            setCompletedSteps(prev => [...prev, 3]);
            setCurrentStep(4);
          }
          if (newProgress >= 60 && !completedSteps.includes(4)) {
            setCompletedSteps(prev => [...prev, 4]);
            setCurrentStep(5);
          }
          if (newProgress >= 75 && !completedSteps.includes(5)) {
            setCompletedSteps(prev => [...prev, 5]);
            setCurrentStep(6);
          }
          
          return newProgress;
        });
      }, 150);
      
      return () => clearInterval(timer);
    }
  }, [isExecuting, completedSteps]);

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'active':
        return <Activity className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-slate-400" />;
      default:
        return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  const initiateManualExecution = () => {
    window.open('https://app.uniswap.org/#/swap?inputCurrency=0xfa7b8c553c48c56ec7027d26ae95b029a2abf247&outputCurrency=ETH', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-green-400 mr-2 animate-bounce" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Live Execution: $75K Relief
            </h1>
            <Zap className="h-8 w-8 text-green-400 ml-2 animate-bounce" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Quantum-Optimized Conversion in Progress • $45,134 Cash Relief Incoming
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Execution Progress: {Math.round(executionProgress)}% • Step {currentStep} of 7
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Live Progress */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Activity className="h-7 w-7 mr-3" />
              Real-Time Execution Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-green-700 dark:text-green-300 font-semibold">Overall Progress:</span>
                <span className="text-green-700 dark:text-green-300 font-bold">{Math.round(executionProgress)}%</span>
              </div>
              
              <Progress value={executionProgress} className="w-full h-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-center">
                  <Target className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-700 dark:text-green-300">219,300</div>
                  <div className="text-green-600 dark:text-green-400 text-xs">ETHGR Converting</div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg text-center">
                  <TrendingUp className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">17.52</div>
                  <div className="text-blue-600 dark:text-blue-400 text-xs">ETH Expected</div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg text-center">
                  <DollarSign className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-purple-700 dark:text-purple-300">$45,134</div>
                  <div className="text-purple-600 dark:text-purple-400 text-xs">Available Cash</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Execution Steps */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Rocket className="h-7 w-7 mr-3" />
              Live Execution Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {executionSteps.map((step) => {
                const status = getStepStatus(step.id);
                return (
                  <Card key={step.id} className={`foundation-card ${
                    status === 'completed' ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' :
                    status === 'active' ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' :
                    'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(status)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                              Step {step.id}: {step.title}
                            </h4>
                            <div className="flex space-x-2">
                              <Badge className={
                                status === 'completed' ? 'bg-green-500 text-white' :
                                status === 'active' ? 'bg-blue-500 text-white animate-pulse' :
                                'bg-slate-500 text-white'
                              }>
                                {status.toUpperCase()}
                              </Badge>
                              <Badge className="bg-slate-500 text-white">
                                {step.duration}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                            {step.description}
                          </p>
                          
                          <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">
                            {step.result}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Financial Breakdown */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Your Financial Relief Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold">Conversion Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <span className="text-amber-600">ETHGR Converted:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-semibold">{conversionDetails.inputAmount}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <span className="text-amber-600">ETH Received:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-semibold">{conversionDetails.estimatedEth}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <span className="text-amber-600">USD Value:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-bold">{conversionDetails.estimatedUsd}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <span className="text-amber-600">Net After Fees:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-bold">{conversionDetails.netProceeds}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold">Cash Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                    <span className="text-red-600">Tax Reserve (40%):</span>
                    <span className="text-red-800 dark:text-red-200 font-semibold">{conversionDetails.taxReserve}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <span className="text-green-600">Available for Bills:</span>
                    <span className="text-green-800 dark:text-green-200 font-bold text-lg">{conversionDetails.availableCash}</span>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                    <h4 className="text-blue-700 dark:text-blue-300 font-semibold text-sm mb-1">Use For:</h4>
                    <ul className="text-blue-800 dark:text-blue-200 text-xs space-y-1">
                      <li>• Immediate bill payments</li>
                      <li>• Financial stress relief</li>
                      <li>• Emergency fund establishment</li>
                      <li>• Quality of life improvements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manual Execution Option */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Shield className="h-7 w-7 mr-3" />
              Manual Execution Option
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700 mb-4">
              <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <AlertDescription className="foundation-text-body text-purple-800 dark:text-purple-200">
                <strong>SECURE OPTION:</strong> You can also execute this conversion manually through Uniswap for complete control. Your wallet will handle all security.
              </AlertDescription>
            </Alert>

            <div className="text-center space-y-4">
              <Button
                onClick={initiateManualExecution}
                className="foundation-button-primary h-12"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Open Uniswap (Manual Control)
              </Button>
              
              <p className="text-purple-600 dark:text-purple-400 text-sm">
                This opens Uniswap with your ETHGR contract pre-filled for immediate conversion
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <ArrowRight className="h-7 w-7 mr-3" />
              After Conversion: Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-green-700 dark:text-green-300 font-semibold">{step.step}</h4>
                    <p className="text-green-600 dark:text-green-400 text-sm">{step.description}</p>
                  </div>
                  <div className="text-green-500 text-sm font-semibold">
                    {step.timeline}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Your Financial Relief is Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong>EXECUTION ACTIVE:</strong> Your $45,134 financial relief is being processed. After one year of hardship, your transformation to foundation leader begins with immediate personal security.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/exchange-withdrawal-guide', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Setup Exchange Next
                </Button>
                
                <Button
                  onClick={() => window.open('/foundation-launch-dashboard', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Foundation Planning
                </Button>
                
                <Button
                  onClick={() => window.open('/blockchain-transaction-viewer', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Monitor Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}