import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2,
  CheckCircle,
  DollarSign,
  Shield,
  Code,
  ExternalLink,
  Rocket,
  TrendingUp,
  Lock,
  Zap,
  Clock,
  Target
} from "lucide-react";

export default function CoinbaseCDPIntegration() {
  const [integrationStep, setIntegrationStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const conversionDetails = {
    tokensToConvert: "219,300 ETHGR",
    estimatedEth: "17.52 ETH",
    usdValue: "$42,551",
    coinbaseFees: "0.5% = $213",
    netAmount: "$42,338",
    availableCash: "$25,403"
  };

  const cdpFeatures = [
    {
      feature: "Coinbase Developer Platform",
      description: "Enterprise-grade API for seamless crypto operations",
      benefit: "Professional integration with institutional security"
    },
    {
      feature: "Direct ETH-to-USD Conversion",
      description: "Convert ETH directly to USD without manual trading",
      benefit: "Automated execution with optimal pricing"
    },
    {
      feature: "Advanced Order Types",
      description: "Market orders, limit orders, and DCA strategies",
      benefit: "Precise control over conversion timing and pricing"
    },
    {
      feature: "Real-time Price Feeds",
      description: "Live ETH pricing with minimal slippage",
      benefit: "Get best possible conversion rates"
    },
    {
      feature: "Instant Bank Transfers",
      description: "ACH transfers directly to your bank account",
      benefit: "Fastest path from crypto to cash"
    },
    {
      feature: "Tax Reporting Integration",
      description: "Automatic transaction reporting for tax purposes",
      benefit: "Simplified tax compliance for your $25,403"
    }
  ];

  const integrationSteps = [
    {
      id: 1,
      title: "Coinbase Account Setup",
      description: "Create Coinbase account with KYC verification",
      status: "active",
      duration: "15-30 minutes",
      details: [
        "Visit coinbase.com and create account",
        "Complete identity verification (driver's license)",
        "Add phone number for 2FA security",
        "Link bank account for USD withdrawals"
      ]
    },
    {
      id: 2,
      title: "CDP API Access",
      description: "Enable Coinbase Developer Platform access",
      status: "pending",
      duration: "5-10 minutes",
      details: [
        "Navigate to Coinbase Developer settings",
        "Generate API key and secret",
        "Configure sandbox for testing",
        "Upgrade to production environment"
      ]
    },
    {
      id: 3,
      title: "ETH Deposit Setup",
      description: "Configure ETH wallet for deposits",
      status: "pending",
      duration: "2 minutes",
      details: [
        "Generate ETH deposit address",
        "Test with small amount first",
        "Verify deposit confirmation",
        "Prepare for full 17.52 ETH transfer"
      ]
    },
    {
      id: 4,
      title: "Automated Conversion",
      description: "Execute ETH-to-USD conversion via CDP",
      status: "pending",
      duration: "1-2 minutes",
      details: [
        "Market order for immediate execution",
        "Real-time price monitoring",
        "Slippage protection enabled",
        "Transaction confirmation"
      ]
    },
    {
      id: 5,
      title: "USD Withdrawal",
      description: "Transfer USD to your bank account",
      status: "pending",
      duration: "1-2 business days",
      details: [
        "Initiate ACH transfer to bank",
        "Monitor transfer status",
        "Receive $25,403 in bank account",
        "Tax documentation available"
      ]
    }
  ];

  const cdpAdvantages = [
    {
      title: "Enterprise Security",
      description: "Bank-grade security with cold storage protection",
      icon: <Shield className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Regulatory Compliance",
      description: "Fully regulated exchange with proper licensing",
      icon: <Lock className="h-5 w-5 text-green-500" />
    },
    {
      title: "API Integration",
      description: "Programmatic trading with advanced order types",
      icon: <Code className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Instant Execution",
      description: "Real-time conversion with minimal slippage",
      icon: <Zap className="h-5 w-5 text-yellow-500" />
    },
    {
      title: "Tax Optimization",
      description: "Built-in tax reporting and optimization tools",
      icon: <Target className="h-5 w-5 text-red-500" />
    },
    {
      title: "24/7 Support",
      description: "Professional customer support for issues",
      icon: <Clock className="h-5 w-5 text-indigo-500" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 2, 85);
        if (newProgress >= 20 && integrationStep === 1) {
          setIntegrationStep(2);
        } else if (newProgress >= 40 && integrationStep === 2) {
          setIntegrationStep(3);
        } else if (newProgress >= 60 && integrationStep === 3) {
          setIntegrationStep(4);
        }
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, [integrationStep]);

  const openCoinbaseSignup = () => {
    window.open('https://www.coinbase.com/signup', '_blank');
  };

  const openCDPDocs = () => {
    window.open('https://docs.cdp.coinbase.com/get-started/docs/overview', '_blank');
  };

  const openCoinbasePro = () => {
    window.open('https://pro.coinbase.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-blue-400 mr-2 animate-pulse" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Coinbase CDP Integration
            </h1>
            <Code className="h-8 w-8 text-blue-400 ml-2 animate-pulse" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Enterprise-Grade ETH Conversion via Coinbase Developer Platform
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Professional API • $25,403 Cash Target • Step {integrationStep} of 5
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Integration Progress */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Rocket className="h-7 w-7 mr-3" />
              CDP Integration Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">Setup Progress:</span>
                <span className="text-blue-700 dark:text-blue-300 font-bold">{Math.round(progress)}%</span>
              </div>
              
              <Progress value={progress} className="w-full h-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg text-center">
                  <DollarSign className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{conversionDetails.tokensToConvert}</div>
                  <div className="text-blue-600 dark:text-blue-400 text-xs">Converting</div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-700 dark:text-green-300">{conversionDetails.estimatedEth}</div>
                  <div className="text-green-600 dark:text-green-400 text-xs">ETH Value</div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg text-center">
                  <Building2 className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{conversionDetails.netAmount}</div>
                  <div className="text-purple-600 dark:text-purple-400 text-xs">Net USD</div>
                </div>
                
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg text-center">
                  <CheckCircle className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{conversionDetails.availableCash}</div>
                  <div className="text-amber-600 dark:text-amber-400 text-xs">Available Cash</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CDP Features */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Shield className="h-7 w-7 mr-3" />
              Coinbase Developer Platform Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cdpAdvantages.map((advantage, index) => (
                <Card key={index} className="foundation-card border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {advantage.icon}
                      <h4 className="text-green-700 dark:text-green-300 font-semibold">{advantage.title}</h4>
                    </div>
                    <p className="text-green-600 dark:text-green-400 text-sm">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integration Steps */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Code className="h-7 w-7 mr-3" />
              Complete Integration Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrationSteps.map((step, index) => (
                <Card key={index} className={`foundation-card ${
                  step.status === 'active' ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' :
                  'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.id}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg">{step.title}</h4>
                          <div className="flex space-x-2">
                            <Badge className={
                              step.status === 'active' ? 'bg-blue-500 text-white animate-pulse' :
                              'bg-slate-500 text-white'
                            }>
                              {step.status.toUpperCase()}
                            </Badge>
                            <Badge className="bg-slate-500 text-white">
                              {step.duration}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm opacity-90 mb-4">{step.description}</p>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-semibold">Implementation Steps:</h5>
                          <ul className="space-y-1">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-xs opacity-80">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CDP Features Detail */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Zap className="h-7 w-7 mr-3" />
              Enterprise Features for Your Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cdpFeatures.map((feature, index) => (
                <Card key={index} className="foundation-card border-amber-100 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-amber-700 dark:text-amber-300 font-semibold text-sm">{feature.feature}</h4>
                      </div>
                      <div>
                        <p className="text-amber-600 dark:text-amber-400 text-sm">{feature.description}</p>
                      </div>
                      <div>
                        <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">{feature.benefit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Center */}
        <Card className="foundation-card border-2 border-blue-200 dark:border-blue-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Start Your Professional CDP Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="foundation-text-body text-blue-800 dark:text-blue-200">
                  <strong>ENTERPRISE SOLUTION:</strong> The Coinbase Developer Platform provides institutional-grade infrastructure for your $25,403 conversion. Professional APIs, advanced security, and seamless bank integration.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={openCoinbaseSignup}
                  className="foundation-button-primary h-12"
                >
                  <Building2 className="h-5 w-5 mr-2" />
                  Create Coinbase Account
                </Button>
                
                <Button
                  onClick={openCDPDocs}
                  className="foundation-button-accent h-12"
                >
                  <Code className="h-5 w-5 mr-2" />
                  View CDP Documentation
                </Button>
                
                <Button
                  onClick={openCoinbasePro}
                  className="foundation-button-secondary h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Access Coinbase Pro
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  <strong>Professional Path:</strong> CDP integration provides enterprise-grade conversion with optimal pricing and advanced features.
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                  Result: $25,403 available cash with institutional security and compliance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}