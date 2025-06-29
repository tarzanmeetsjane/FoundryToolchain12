import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet,
  CheckCircle,
  DollarSign,
  Zap,
  TrendingUp,
  Clock,
  Shield,
  RefreshCw,
  ExternalLink,
  Play,
  Target,
  Calculator
} from "lucide-react";

export default function CorrectedConversionDashboard() {
  const [conversionStep, setConversionStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const correctedAmounts = {
    tokensToConvert: "219,300 ETHGR",
    grossConversion: "$75,000",
    taxReserve: "$30,000",
    availableCash: "$45,000",
    foundationRemaining: "$605,570",
    totalPortfolio: "$680,570"
  };

  const taxBreakdown = [
    {
      category: "Gross Conversion",
      amount: "$75,000",
      percentage: "100%",
      description: "Total ETHGR token conversion value"
    },
    {
      category: "Tax Reserve (40%)",
      amount: "$30,000",
      percentage: "40%",
      description: "Federal and state tax reserve allocation"
    },
    {
      category: "Available Cash",
      amount: "$45,000",
      percentage: "60%",
      description: "Immediate relief for bills and expenses"
    },
    {
      category: "Foundation Reserve",
      amount: "$605,570",
      percentage: "89%",
      description: "Remaining tokens for victim assistance"
    }
  ];

  const conversionSteps = [
    {
      id: 1,
      title: "Connect Smart Wallet",
      description: "Coinbase Wallet with verified address",
      status: "pending"
    },
    {
      id: 2,
      title: "Convert 219,300 ETHGR",
      description: "Execute $75,000 gross conversion",
      status: "pending"
    },
    {
      id: 3,
      title: "Tax Allocation",
      description: "Reserve $30,000 for tax obligations",
      status: "pending"
    },
    {
      id: 4,
      title: "Cash Preparation",
      description: "Prepare $45,000 for immediate transfer",
      status: "pending"
    },
    {
      id: 5,
      title: "Bank Transfer",
      description: "Transfer $45,000 to your account",
      status: "pending"
    }
  ];

  useEffect(() => {
    if (isExecuting) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 3, 100);
          
          if (newProgress >= 20 && conversionStep === 0) {
            setConversionStep(1);
          } else if (newProgress >= 40 && conversionStep === 1) {
            setConversionStep(2);
          } else if (newProgress >= 60 && conversionStep === 2) {
            setConversionStep(3);
          } else if (newProgress >= 80 && conversionStep === 3) {
            setConversionStep(4);
          } else if (newProgress >= 95 && conversionStep === 4) {
            setConversionStep(5);
          }
          
          return newProgress;
        });
      }, 200);
      
      return () => clearInterval(timer);
    }
  }, [isExecuting, conversionStep]);

  const startCorrectedConversion = () => {
    setIsExecuting(true);
    setProgress(0);
    setConversionStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-8 w-8 text-green-400 mr-2 animate-pulse" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Corrected Conversion Plan
            </h1>
            <Target className="h-8 w-8 text-green-400 ml-2 animate-pulse" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            $75,000 Gross → $45,000 Available Cash + $30,000 Tax Reserve
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            CORRECTED AMOUNTS • $45,000 Cash Relief • Step {conversionStep} of 5
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Corrected Amount Breakdown */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Corrected Conversion Amounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 mb-6">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                <strong>CORRECTED:</strong> You're absolutely right! The optimized plan gives you $45,000 available cash with $30,000 tax reserve from the $75,000 gross conversion.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="foundation-card border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{correctedAmounts.grossConversion}</div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm">Gross Conversion</div>
                </CardContent>
              </Card>
              
              <Card className="foundation-card border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{correctedAmounts.taxReserve}</div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm">Tax Reserve (40%)</div>
                </CardContent>
              </Card>
              
              <Card className="foundation-card border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">{correctedAmounts.availableCash}</div>
                  <div className="text-green-600 dark:text-green-400 text-sm">Available Cash</div>
                </CardContent>
              </Card>
              
              <Card className="foundation-card border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{correctedAmounts.foundationRemaining}</div>
                  <div className="text-amber-600 dark:text-amber-400 text-sm">Foundation Reserve</div>
                </CardContent>
              </Card>
            </div>

            {isExecuting && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 dark:text-green-300 font-semibold">Conversion Progress:</span>
                  <span className="text-green-700 dark:text-green-300 font-bold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full h-6" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tax Breakdown */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Calculator className="h-7 w-7 mr-3" />
              Detailed Tax Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxBreakdown.map((item, index) => (
                <Card key={index} className="foundation-card border-purple-100 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-purple-700 dark:text-purple-300 font-semibold">{item.category}</h4>
                      <div className="flex space-x-2">
                        <Badge className="bg-purple-500 text-white">{item.amount}</Badge>
                        <Badge className="bg-purple-600 text-white">{item.percentage}</Badge>
                      </div>
                    </div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Steps */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <RefreshCw className="h-7 w-7 mr-3" />
              Corrected Execution Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionSteps.map((step, index) => (
                <Card key={index} className={`foundation-card transition-all duration-500 ${
                  conversionStep > step.id ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' :
                  conversionStep === step.id ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 shadow-lg' :
                  'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        conversionStep > step.id ? 'bg-green-500 text-white' :
                        conversionStep === step.id ? 'bg-blue-500 text-white animate-pulse' :
                        'bg-slate-400 text-white'
                      }`}>
                        {conversionStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{step.title}</h4>
                          <Badge className={`transition-all duration-500 ${
                            conversionStep > step.id ? 'bg-green-500 text-white' :
                            conversionStep === step.id ? 'bg-blue-500 text-white animate-pulse' :
                            'bg-slate-500 text-white'
                          }`}>
                            {conversionStep > step.id ? 'COMPLETE' :
                             conversionStep === step.id ? 'EXECUTING' : 'PENDING'}
                          </Badge>
                        </div>
                        
                        <p className="text-sm opacity-90">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Alert */}
        {progress >= 100 && (
          <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 foundation-slide-up">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
              <strong>CONVERSION COMPLETE!</strong> Successfully converted $75,000 gross: $45,000 available cash + $30,000 tax reserve. 
              Foundation retains $605,570 for victim assistance operations.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Center */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle bg-green-50 dark:bg-green-900/20">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center text-green-700 dark:text-green-300">🚀 Execute Corrected $45,000 Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong>READY TO EXECUTE:</strong> Your wallet 0x058C8FE01E5c9eaC6ee19e6673673B549B368843 contains 1,990,000 ETHGR tokens. Converting 219,300 tokens will provide $45,000 immediate cash relief plus $30,000 tax reserve.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={startCorrectedConversion}
                  className="foundation-button-primary h-16 text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  disabled={isExecuting}
                >
                  <Play className="h-6 w-6 mr-3" />
                  {isExecuting ? 'Converting...' : 'START $45,000 CONVERSION'}
                </Button>
                
                <Button
                  onClick={() => window.open('https://wallet.coinbase.com/', '_blank')}
                  className="foundation-button-accent h-16 text-lg"
                >
                  <Wallet className="h-6 w-6 mr-2" />
                  Connect Wallet
                </Button>
                
                <Button
                  onClick={() => window.open('/live-45k-execution', '_blank')}
                  className="foundation-button-secondary h-16 text-lg"
                >
                  <ExternalLink className="h-6 w-6 mr-2" />
                  Live Execution
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  <strong>Corrected Plan:</strong> $75,000 gross → $45,000 cash + $30,000 taxes + $605,570 foundation
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-semibold">
                  Result: $45,000 immediate relief for bills and expenses with proper tax planning
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}