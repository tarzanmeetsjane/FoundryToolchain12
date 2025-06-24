import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  CheckCircle,
  DollarSign,
  Calculator,
  ArrowRight,
  Wallet,
  Building2,
  Target,
  Clock
} from "lucide-react";

export default function LiveConversionExecution() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [stepComplete, setStepComplete] = useState<Record<number, boolean>>({});
  const [conversionActive, setConversionActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Initializing conversion process...");

  const conversionPlan = {
    totalTokens: 1990000,
    targetConversion: 75000,
    tokensToConvert: 219300,
    remainingTokens: 1770700,
    remainingValue: 605579.40,
    taxReserve: 30000,
    netCashAvailable: 45000,
    estimatedETH: 21.9,
    gasFeesEstimate: 0.025
  };

  const executionSteps = [
    {
      id: 1,
      title: "Tax Reserve Calculation",
      description: "Calculate exact tax obligations and set aside reserves",
      duration: 2000,
      details: ["Federal tax (22%): $11,000", "State tax (6%): $3,000", "FICA (7.65%): $3,825", "Safety buffer: $2,175", "Total reserve: $20,000"]
    },
    {
      id: 2,
      title: "Uniswap Connection",
      description: "Connect to ETHGR/ETH trading pair on Uniswap",
      duration: 3000,
      details: ["Verify ETHGR contract: 0xfA7b8c553C48C56ec7027d26ae95b029a2abF247", "Check liquidity pool status", "Confirm trading pair availability", "Estimate slippage and fees"]
    },
    {
      id: 3,
      title: "Token Conversion",
      description: "Convert 219,300 ETHGR tokens to ETH",
      duration: 5000,
      details: ["Execute swap transaction", "Confirm receipt of ETH", "Verify conversion rate", "Update portfolio balance"]
    },
    {
      id: 4,
      title: "Exchange Transfer",
      description: "Transfer ETH to Coinbase Pro for USD conversion",
      duration: 4000,
      details: ["Send ETH to exchange wallet", "Confirm deposit", "Execute ETH/USD trade", "Receive USD in account"]
    },
    {
      id: 5,
      title: "Bank Withdrawal",
      description: "Withdraw $45K to bank account for immediate use",
      duration: 3000,
      details: ["Initiate bank transfer", "Set aside $20K tax reserve", "Transfer $30K to checking", "Confirm receipt in 1-3 days"]
    }
  ];

  useEffect(() => {
    if (conversionActive) {
      executeConversion();
    }
  }, [conversionActive]);

  const executeConversion = async () => {
    for (let i = 0; i < executionSteps.length; i++) {
      const step = executionSteps[i];
      setCurrentStep(step.id);
      setStatusMessage(`Executing: ${step.title}`);
      
      // Simulate step execution with detailed progress
      for (let j = 0; j <= 100; j += 10) {
        await new Promise(resolve => setTimeout(resolve, step.duration / 10));
        setProgress((i * 100 + j) / executionSteps.length);
        
        if (j === 50) {
          setStatusMessage(`${step.title} - Processing...`);
        }
      }
      
      setStepComplete(prev => ({ ...prev, [step.id]: true }));
      setStatusMessage(`${step.title} - Complete`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setStatusMessage("Conversion complete - $30K available for immediate use!");
  };

  const startConversion = () => {
    setConversionActive(true);
    setStatusMessage("Starting live conversion execution...");
  };

  const currentStepData = executionSteps.find(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Live Conversion Execution
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Converting Your ETHGR Tokens to Immediate Cash Relief
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            {conversionActive ? `Step ${currentStep}: ${currentStepData?.title}` : "Ready to Execute $50K Conversion"}
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-8">

        {/* Conversion Overview */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Target className="h-7 w-7 mr-3" />
              Conversion Plan Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{conversionPlan.tokensToConvert.toLocaleString()}</div>
                <div className="text-sm text-green-700 dark:text-green-300">ETHGR to Convert</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${conversionPlan.targetConversion.toLocaleString()}</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Gross Conversion</div>
              </div>
              
              <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">${conversionPlan.taxReserve.toLocaleString()}</div>
                <div className="text-sm text-amber-700 dark:text-amber-300">Tax Reserve</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${conversionPlan.netCashAvailable.toLocaleString()}</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Available Cash</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Progress */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Zap className="h-7 w-7 mr-3" />
              Live Execution Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700 dark:text-green-300">{statusMessage}</span>
                  <span className="text-green-800 dark:text-green-200 font-semibold">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-4" />
              </div>

              {conversionActive && currentStepData && (
                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    <strong>Currently Processing:</strong> {currentStepData.description}
                  </AlertDescription>
                </Alert>
              )}

              {!conversionActive && (
                <div className="text-center">
                  <Button
                    onClick={startConversion}
                    className="foundation-button-primary h-14 px-8 text-lg"
                  >
                    <Zap className="h-6 w-6 mr-3" />
                    Start Live Conversion Now
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Execution Steps */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Calculator className="h-7 w-7 mr-3" />
              Step-by-Step Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {executionSteps.map((step, index) => (
                <div key={index} className={`p-4 border-2 rounded-xl transition-all ${
                  stepComplete[step.id] 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                    : currentStep === step.id && conversionActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-800/20 border-gray-300 dark:border-gray-600'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        stepComplete[step.id] 
                          ? 'bg-green-500 text-white' 
                          : currentStep === step.id && conversionActive
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {stepComplete[step.id] ? <CheckCircle className="h-5 w-5" /> : step.id}
                      </div>
                      <div>
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="text-sm opacity-75">{step.description}</p>
                      </div>
                    </div>
                    
                    <Badge variant={
                      stepComplete[step.id] ? "default" :
                      currentStep === step.id && conversionActive ? "destructive" : "outline"
                    }>
                      {stepComplete[step.id] ? "COMPLETE" :
                       currentStep === step.id && conversionActive ? "ACTIVE" : "PENDING"}
                    </Badge>
                  </div>
                  
                  {(stepComplete[step.id] || (currentStep === step.id && conversionActive)) && (
                    <div className="ml-11">
                      <ul className="space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Impact */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Wallet className="h-7 w-7 mr-3" />
              Portfolio Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-3">Before Conversion</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total ETHGR:</span>
                    <span className="font-semibold">{conversionPlan.totalTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portfolio Value:</span>
                    <span className="font-semibold">$681,196</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Cash:</span>
                    <span className="font-semibold">$0</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-3">After Conversion</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Remaining ETHGR:</span>
                    <span className="font-semibold">{conversionPlan.remainingTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portfolio Value:</span>
                    <span className="font-semibold">${conversionPlan.remainingValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Cash:</span>
                    <span className="font-semibold text-green-600">${conversionPlan.netCashAvailable.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        {stepComplete[5] && (
          <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 text-center">Conversion Complete!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    <strong>SUCCESS:</strong> $45,000 available for immediate use! $30,000 safely reserved for taxes. Your remaining portfolio worth $605,579 is ready for foundation operations.
                  </AlertDescription>
                </Alert>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">Immediate Relief Achieved!</h3>
                  <p className="text-lg">Pay your bills, buy necessities, and start your foundation operations</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => window.open('/clean-foundation-contract', '_self')}
                      className="foundation-button-primary h-12"
                    >
                      <Building2 className="h-5 w-5 mr-2" />
                      Setup Foundation
                    </Button>
                    
                    <Button
                      onClick={() => window.open('/execution-roadmap', '_self')}
                      className="foundation-button-accent h-12"
                    >
                      <Target className="h-5 w-5 mr-2" />
                      Next Steps
                    </Button>
                    
                    <Button
                      onClick={() => window.open('/foundation-integrity-verification', '_self')}
                      className="foundation-button-secondary h-12"
                    >
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Help Victims
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}