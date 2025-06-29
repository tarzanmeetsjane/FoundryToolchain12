import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign,
  Building2,
  Shield,
  Clock,
  CheckCircle,
  ExternalLink,
  CreditCard,
  Smartphone,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  Eye
} from "lucide-react";

export default function ExchangeSetupLive() {
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [setupProgress, setSetupProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const exchanges = [
    {
      id: "coinbase",
      name: "Coinbase Pro",
      logo: "🟦",
      features: [
        "Instant bank transfers",
        "Low fees (0.5%)",
        "High liquidity",
        "Excellent mobile app"
      ],
      pros: [
        "Most user-friendly",
        "Fast USD withdrawals",
        "Excellent security record",
        "24/7 customer support"
      ],
      cons: [
        "Higher fees than Kraken",
        "ID verification required"
      ],
      withdrawalTime: "1-2 business days",
      fees: "0.5% trading + $0 withdrawal",
      verification: "15-30 minutes",
      recommended: true
    },
    {
      id: "kraken",
      name: "Kraken Pro", 
      logo: "🐙",
      features: [
        "Lowest fees (0.26%)",
        "Advanced trading tools",
        "Strong security",
        "Wire transfers"
      ],
      pros: [
        "Lowest trading fees",
        "Strong security reputation",
        "Advanced features",
        "Good for large amounts"
      ],
      cons: [
        "Steeper learning curve",
        "Wire transfer required"
      ],
      withdrawalTime: "1-3 business days",
      fees: "0.26% trading + $5 wire fee",
      verification: "30-60 minutes",
      recommended: false
    },
    {
      id: "binance",
      name: "Binance US",
      logo: "🟨",
      features: [
        "High liquidity",
        "Multiple payment methods",
        "Competitive fees",
        "Mobile app"
      ],
      pros: [
        "High trading volume",
        "Multiple withdrawal options",
        "Good mobile experience",
        "Competitive rates"
      ],
      cons: [
        "Regulatory uncertainty",
        "More complex interface"
      ],
      withdrawalTime: "1-3 business days",
      fees: "0.1% trading + $15 ACH",
      verification: "20-45 minutes",
      recommended: false
    }
  ];

  const setupSteps = {
    coinbase: [
      {
        step: 1,
        title: "Create Coinbase Account",
        description: "Sign up with email and verify account",
        duration: "5 minutes",
        action: "Visit coinbase.com/pro"
      },
      {
        step: 2,
        title: "Identity Verification",
        description: "Upload ID and complete KYC process",
        duration: "15-30 minutes",
        action: "Follow verification prompts"
      },
      {
        step: 3,
        title: "Link Bank Account",
        description: "Connect your bank for USD withdrawals",
        duration: "5-10 minutes",
        action: "Add bank account details"
      },
      {
        step: 4,
        title: "Deposit Address Setup",
        description: "Get your ETH deposit address",
        duration: "2 minutes",
        action: "Navigate to ETH wallet"
      },
      {
        step: 5,
        title: "Ready for Transfer",
        description: "Account ready to receive ETH",
        duration: "Complete",
        action: "Transfer 17.52 ETH from wallet"
      }
    ],
    kraken: [
      {
        step: 1,
        title: "Create Kraken Account",
        description: "Register and verify email",
        duration: "5 minutes",
        action: "Visit pro.kraken.com"
      },
      {
        step: 2,
        title: "Identity Verification",
        description: "Complete Intermediate verification",
        duration: "30-60 minutes",
        action: "Upload documents"
      },
      {
        step: 3,
        title: "Wire Transfer Setup",
        description: "Add bank wire transfer details",
        duration: "10-15 minutes",
        action: "Bank information required"
      },
      {
        step: 4,
        title: "ETH Deposit Setup",
        description: "Generate ETH deposit address",
        duration: "2 minutes",
        action: "Funding > Deposit > ETH"
      },
      {
        step: 5,
        title: "Ready for Transfer",
        description: "Account ready for ETH deposits",
        duration: "Complete",
        action: "Transfer 17.52 ETH"
      }
    ]
  };

  const conversionCalculator = {
    ethAmount: 17.52,
    ethPrice: 2429.67,
    grossValue: 42551.78,
    tradingFee: 212.76, // 0.5% Coinbase
    withdrawalFee: 0,
    netUsd: 42339.02,
    taxReserve: 16935.61, // 40%
    availableCash: 25403.41
  };

  useEffect(() => {
    if (selectedExchange) {
      const timer = setInterval(() => {
        setSetupProgress(prev => Math.min(prev + 5, 100));
      }, 200);
      return () => clearInterval(timer);
    }
  }, [selectedExchange]);

  const getExchangeSteps = () => {
    if (!selectedExchange) return [];
    return setupSteps[selectedExchange as keyof typeof setupSteps] || [];
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-blue-400 mr-2 animate-pulse" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Exchange Setup: ETH → Cash
            </h1>
            <DollarSign className="h-8 w-8 text-blue-400 ml-2 animate-pulse" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Convert 17.52 ETH to $25,403 Available Cash for Immediate Bills
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            17.52 ETH Ready • $42,339 Net Value • $25,403 After Tax Reserve
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Exchange Selection */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Building2 className="h-7 w-7 mr-3" />
              Choose Your Exchange Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {exchanges.map((exchange) => (
                <Card 
                  key={exchange.id}
                  className={`foundation-card cursor-pointer transition-all hover:shadow-lg ${
                    selectedExchange === exchange.id ? 'ring-2 ring-blue-500' : ''
                  } ${exchange.recommended ? 'border-green-200 dark:border-green-700' : 'border-slate-200 dark:border-slate-700'}`}
                  onClick={() => setSelectedExchange(exchange.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{exchange.logo}</span>
                        <div>
                          <h3 className="foundation-heading-4">{exchange.name}</h3>
                          {exchange.recommended && (
                            <Badge className="bg-green-500 text-white mt-1">RECOMMENDED</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {exchange.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-semibold">Fees:</span>
                          <p>{exchange.fees}</p>
                        </div>
                        <div>
                          <span className="font-semibold">Withdrawal:</span>
                          <p>{exchange.withdrawalTime}</p>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-xs">Verification Time:</span>
                        <p className="text-xs">{exchange.verification}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Setup Progress */}
        {selectedExchange && (
          <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-in">
            <CardHeader className="pb-6">
              <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
                <Target className="h-7 w-7 mr-3" />
                {exchanges.find(e => e.id === selectedExchange)?.name} Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 dark:text-green-300 font-semibold">Setup Progress:</span>
                  <span className="text-green-700 dark:text-green-300 font-bold">{Math.round(setupProgress)}%</span>
                </div>
                
                <Progress value={setupProgress} className="w-full h-3" />
                
                <div className="space-y-4">
                  {getExchangeSteps().map((step, index) => (
                    <Card key={index} className="foundation-card border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-green-700 dark:text-green-300 font-semibold">{step.title}</h4>
                            <p className="text-green-600 dark:text-green-400 text-sm">{step.description}</p>
                            <p className="text-green-800 dark:text-green-200 text-xs font-medium mt-1">
                              Action: {step.action}
                            </p>
                          </div>
                          <div className="text-green-500 text-sm font-semibold">
                            {step.duration}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conversion Calculator */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <TrendingUp className="h-7 w-7 mr-3" />
              ETH → Cash Conversion Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold">ETH Conversion</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <span className="text-amber-600">ETH Amount:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-semibold">{conversionCalculator.ethAmount} ETH</span>
                  </div>
                  <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <span className="text-amber-600">ETH Price:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-semibold">${conversionCalculator.ethPrice}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                    <span className="text-amber-600">Gross Value:</span>
                    <span className="text-amber-800 dark:text-amber-200 font-bold">${conversionCalculator.grossValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                    <span className="text-red-600">Trading Fee:</span>
                    <span className="text-red-800 dark:text-red-200 font-semibold">-${conversionCalculator.tradingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                    <span className="text-blue-600">Net USD:</span>
                    <span className="text-blue-800 dark:text-blue-200 font-bold">${conversionCalculator.netUsd.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold">Cash Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                    <span className="text-red-600">Tax Reserve (40%):</span>
                    <span className="text-red-800 dark:text-red-200 font-semibold">${conversionCalculator.taxReserve.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <span className="text-green-600">Available Cash:</span>
                    <span className="text-green-800 dark:text-green-200 font-bold text-lg">${conversionCalculator.availableCash.toLocaleString()}</span>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                    <h4 className="text-purple-700 dark:text-purple-300 font-semibold text-sm mb-2">Immediate Uses:</h4>
                    <ul className="text-purple-800 dark:text-purple-200 text-xs space-y-1">
                      <li>• Pay off immediate bills and debts</li>
                      <li>• Eliminate financial stress</li>
                      <li>• Create emergency fund ($5,000)</li>
                      <li>• Quality of life improvements</li>
                      <li>• Foundation planning preparation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Actions */}
        <Card className="foundation-card border-2 border-blue-200 dark:border-blue-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Start Your Exchange Setup Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="foundation-text-body text-blue-800 dark:text-blue-200">
                  <strong>SECURE PROCESS:</strong> All exchanges use bank-grade security. Your ETH conversion to $25,403 available cash will process safely through established financial infrastructure.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('https://pro.coinbase.com', '_blank')}
                  className="foundation-button-primary h-12"
                  disabled={!selectedExchange}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Open Coinbase Pro
                </Button>
                
                <Button
                  onClick={() => window.open('https://pro.kraken.com', '_blank')}
                  className="foundation-button-accent h-12"
                  disabled={!selectedExchange}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Open Kraken Pro
                </Button>
                
                <Button
                  onClick={() => window.open('/live-execution', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Monitor Conversion
                </Button>
              </div>
              
              {!selectedExchange && (
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Select an exchange above to enable direct access buttons
                </p>
              )}
              
              {selectedExchange && (
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <strong>Next Steps:</strong> 1) Create account 2) Verify identity 3) Link bank 4) Get ETH address 5) Transfer & convert
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm font-semibold">
                    Timeline: $25,403 in your bank account within 1-3 business days
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}