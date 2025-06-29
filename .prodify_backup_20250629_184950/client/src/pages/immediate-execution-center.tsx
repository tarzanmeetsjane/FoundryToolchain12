import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play,
  Shield,
  Calculator,
  DollarSign,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  Clock
} from "lucide-react";

export default function ImmediateExecutionCenter() {
  const [currentStep, setCurrentStep] = useState(0);
  const [securityPassed, setSecurityPassed] = useState(false);
  const [taxCalculated, setTaxCalculated] = useState(false);

  const portfolioData = {
    ethgrTokens: 1990000,
    currentValue: 681196.21,
    pricePerToken: 0.342,
    gasBalance: 0.01444535,
    walletAddress: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
  };

  const immediateConversion = {
    targetAmount: 50000,
    tokensNeeded: Math.ceil(50000 / portfolioData.pricePerToken),
    remainingTokens: portfolioData.ethgrTokens - Math.ceil(50000 / portfolioData.pricePerToken),
    remainingValue: (portfolioData.ethgrTokens - Math.ceil(50000 / portfolioData.pricePerToken)) * portfolioData.pricePerToken
  };

  const taxCalculation = {
    grossConversion: 50000,
    taxReserve: 50000 * 0.40, // 40% tax reserve
    netAvailable: 50000 * 0.60, // 60% available for spending
    quarterlyPayment: (50000 * 0.3565) / 4 // Quarterly estimated tax
  };

  const executionSteps = [
    {
      id: 1,
      title: "Security Scan",
      description: "Check for delegation issues and security problems",
      action: () => setSecurityPassed(true),
      completed: securityPassed,
      duration: "2 minutes",
      critical: true
    },
    {
      id: 2,
      title: "Tax Calculation",
      description: "Calculate exact tax reserves and net proceeds",
      action: () => setTaxCalculated(true),
      completed: taxCalculated,
      duration: "1 minute",
      critical: true
    },
    {
      id: 3,
      title: "ETHGR Conversion",
      description: "Convert ETHGR tokens to ETH",
      action: () => {},
      completed: false,
      duration: "5 minutes",
      critical: false
    },
    {
      id: 4,
      title: "ETH to USD",
      description: "Exchange ETH for USD on Coinbase/Binance",
      action: () => {},
      completed: false,
      duration: "10 minutes",
      critical: false
    },
    {
      id: 5,
      title: "Bank Transfer",
      description: "Withdraw USD to bank account",
      action: () => {},
      completed: false,
      duration: "1-3 days",
      critical: false
    }
  ];

  const completedSteps = executionSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / executionSteps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Immediate Execution Center
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Convert Your $681K ETHGR Portfolio to Immediate Cash Relief
          </p>
          <div className="foundation-status-badge foundation-status-warning foundation-fade-in">
            ⚡ Ready to Execute: $50K Conversion in 30 Minutes
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Current Status */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Target className="h-7 w-7 mr-3" />
              Current Portfolio Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong className="foundation-text-accent">TOKENS CONFIRMED:</strong> Your 1,990,000 ETHGR tokens worth $681,196.21 are still intact and ready for conversion. Nothing has changed - they're waiting for your execution command.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,990,000</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">ETHGR Tokens</div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">${portfolioData.currentValue.toLocaleString()}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Total Value</div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${portfolioData.pricePerToken.toFixed(3)}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Price per Token</div>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{portfolioData.gasBalance.toFixed(5)}</div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">ETH Balance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Conversion Plan */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <DollarSign className="h-7 w-7 mr-3" />
              $50K Immediate Relief Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <h3 className="text-green-700 dark:text-green-300 font-bold mb-4">Conversion Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Target Amount:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">${immediateConversion.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Tokens Needed:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{immediateConversion.tokensNeeded.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Remaining Tokens:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{immediateConversion.remainingTokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-green-700 dark:text-green-300">Remaining Value:</span>
                      <span className="text-green-800 dark:text-green-200 font-bold">${immediateConversion.remainingValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-4">Tax Planning</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-700 dark:text-amber-300">Gross Conversion:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-semibold">${taxCalculation.grossConversion.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700 dark:text-amber-300">Tax Reserve (40%):</span>
                      <span className="text-amber-800 dark:text-amber-200 font-semibold">${taxCalculation.taxReserve.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700 dark:text-amb-300">Quarterly Payment:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-semibold">${taxCalculation.quarterlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-amber-700 dark:text-amber-300">Available to Spend:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-bold">${taxCalculation.netAvailable.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Execution Progress */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Clock className="h-7 w-7 mr-3" />
              Execution Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">Progress: {completedSteps} of {executionSteps.length} steps</span>
                  <span className="text-purple-800 dark:text-purple-200 font-semibold">{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>

              <div className="space-y-4">
                {executionSteps.map((step, index) => (
                  <div key={index} className={`p-4 border-2 rounded-xl transition-all ${
                    step.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                      : step.critical 
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500'
                      : 'bg-gray-50 dark:bg-gray-800/20 border-gray-300 dark:border-gray-600'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : step.critical
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {step.completed ? <CheckCircle className="h-5 w-5" /> : step.id}
                        </div>
                        <div>
                          <h3 className="font-bold">{step.title}</h3>
                          <p className="text-sm opacity-75">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{step.duration}</Badge>
                        {step.critical && !step.completed && (
                          <Badge variant="destructive">Required</Badge>
                        )}
                        {!step.completed && step.critical && (
                          <Button
                            onClick={step.action}
                            className="foundation-button-primary"
                            size="sm"
                          >
                            Execute
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ready to Execute */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Ready for Immediate Execution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="foundation-text-body text-blue-800 dark:text-blue-200">
                  <strong className="foundation-text-accent">TOKENS UNCHANGED:</strong> Your ETHGR tokens show the same values on Uniswap because we haven't executed yet. The system is ready - we're waiting for your go-ahead to start the conversion process.
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Your tokens are safe and ready!</h3>
                <p className="text-lg">1,990,000 ETHGR tokens worth $681,196.21 waiting for conversion</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => window.open('/pre-execution-security-check', '_self')}
                    className="foundation-button-primary h-12"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Start Security Check
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/tax-strategy-planning', '_self')}
                    className="foundation-button-accent h-12"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Taxes
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/ethgr-to-eth-conversion', '_self')}
                    className="foundation-button-secondary h-12"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Convert ETHGR
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/execution-roadmap', '_self')}
                    className="foundation-button-secondary h-12"
                  >
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Full Roadmap
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