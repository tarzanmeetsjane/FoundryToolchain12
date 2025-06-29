import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone,
  CheckCircle,
  DollarSign,
  Shield,
  Zap,
  ExternalLink,
  Rocket,
  TrendingUp,
  Clock,
  Target,
  Building2,
  Code
} from "lucide-react";

export default function BaseMiniKitIntegration() {
  const [integrationStep, setIntegrationStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const conversionDetails = {
    tokensToConvert: "219,300 ETHGR",
    estimatedEth: "17.52 ETH",
    baseEthValue: "17.52 ETH",
    usdValue: "$42,551",
    baseFees: "~$3 (vs $50+ Ethereum)",
    coinbaseFees: "0.5% = $213",
    totalFees: "~$216",
    netAmount: "$42,335",
    availableCash: "$25,401"
  };

  const miniKitFeatures = [
    {
      feature: "Mobile-First Experience",
      description: "Native mobile wallet integration with seamless UX",
      benefit: "Convert tokens directly from your phone"
    },
    {
      feature: "Base Layer 2 Network",
      description: "Coinbase's optimized blockchain with 10x lower fees",
      benefit: "Save $47+ on gas fees vs Ethereum mainnet"
    },
    {
      feature: "Instant Bridging",
      description: "Seamless ETH transfer between Ethereum and Base",
      benefit: "Bridge ETHGR to Base for cheaper conversions"
    },
    {
      feature: "MiniKit SDK",
      description: "Direct integration with Coinbase Wallet",
      benefit: "No manual wallet switching or complex setup"
    },
    {
      feature: "Progressive Web App",
      description: "Install as mobile app for easy access",
      benefit: "One-tap access to your conversion dashboard"
    },
    {
      feature: "Real-time Execution",
      description: "Live conversion tracking with push notifications",
      benefit: "Monitor $25,401 cash progress in real-time"
    }
  ];

  const integrationSteps = [
    {
      id: 1,
      title: "MiniKit Setup",
      description: "Configure Base MiniKit for mobile wallet integration",
      status: "active",
      duration: "5 minutes",
      details: [
        "Install Coinbase Wallet mobile app",
        "Enable Base network in wallet settings",
        "Connect to MiniKit-powered conversion app",
        "Verify wallet address and token balance"
      ]
    },
    {
      id: 2,
      title: "Base Network Bridge",
      description: "Bridge ETHGR tokens from Ethereum to Base",
      status: "pending",
      duration: "10 minutes",
      details: [
        "Initiate bridge transaction from mobile wallet",
        "Confirm ETHGR transfer to Base network",
        "Wait for bridge confirmation (5-10 minutes)",
        "Verify tokens received on Base network"
      ]
    },
    {
      id: 3,
      title: "Mobile Conversion",
      description: "Execute ETHGR to ETH swap on Base network",
      status: "pending",
      duration: "2 minutes",
      details: [
        "Open conversion interface on mobile",
        "Set conversion amount (219,300 ETHGR)",
        "Confirm gas fee (~$3 vs $50+ on Ethereum)",
        "Execute swap transaction"
      ]
    },
    {
      id: 4,
      title: "ETH Bridge Back",
      description: "Bridge ETH from Base to Ethereum mainnet",
      status: "pending",
      duration: "10 minutes",
      details: [
        "Initiate ETH bridge to Ethereum mainnet",
        "Confirm bridge transaction on mobile",
        "Wait for mainnet confirmation",
        "Verify 17.52 ETH received on Ethereum"
      ]
    },
    {
      id: 5,
      title: "Coinbase Conversion",
      description: "Convert ETH to USD via Coinbase integration",
      status: "pending",
      duration: "5 minutes",
      details: [
        "Direct transfer to Coinbase account",
        "Execute ETH to USD conversion",
        "Confirm $42,335 USD received",
        "Initiate bank transfer for $25,401"
      ]
    }
  ];

  const baseBenefits = [
    {
      title: "10x Lower Fees",
      description: "Base network gas fees ~$3 vs $50+ on Ethereum",
      savings: "$47+ saved",
      icon: <DollarSign className="h-5 w-5 text-green-500" />
    },
    {
      title: "Mobile Native",
      description: "Purpose-built for mobile-first crypto operations",
      savings: "Native UX",
      icon: <Smartphone className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Coinbase Ecosystem",
      description: "Seamless integration with Coinbase services",
      savings: "Direct access",
      icon: <Building2 className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Faster Transactions",
      description: "2-second block times vs 12 seconds on Ethereum",
      savings: "6x faster",
      icon: <Zap className="h-5 w-5 text-yellow-500" />
    },
    {
      title: "Enterprise Security",
      description: "Same security as Ethereum with L2 optimizations",
      savings: "Bank-grade",
      icon: <Shield className="h-5 w-5 text-red-500" />
    },
    {
      title: "Progressive Web App",
      description: "Install as native mobile app for easy access",
      savings: "One-tap access",
      icon: <Code className="h-5 w-5 text-indigo-500" />
    }
  ];

  const comparisonData = {
    ethereum: {
      name: "Ethereum Mainnet",
      gasFees: "$50-100",
      speed: "12 sec blocks",
      confirmation: "5-15 minutes",
      totalCost: "$263",
      finalCash: "$25,288"
    },
    base: {
      name: "Base Network",
      gasFees: "$3-5",
      speed: "2 sec blocks", 
      confirmation: "1-2 minutes",
      totalCost: "$216",
      finalCash: "$25,401"
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 3, 90);
        if (newProgress >= 20 && integrationStep === 1) {
          setIntegrationStep(2);
        } else if (newProgress >= 40 && integrationStep === 2) {
          setIntegrationStep(3);
        } else if (newProgress >= 60 && integrationStep === 3) {
          setIntegrationStep(4);
        } else if (newProgress >= 80 && integrationStep === 4) {
          setIntegrationStep(5);
        }
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, [integrationStep]);

  const openBaseDocs = () => {
    window.open('https://docs.base.org/wallet-app/build-with-minikit/overview', '_blank');
  };

  const openCoinbaseWallet = () => {
    window.open('https://www.coinbase.com/wallet/downloads', '_blank');
  };

  const openBaseApp = () => {
    window.open('https://base.org/', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="h-8 w-8 text-blue-400 mr-2 animate-pulse" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Base MiniKit Integration
            </h1>
            <Zap className="h-8 w-8 text-blue-400 ml-2 animate-pulse" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Mobile-First L2 Conversion: Save $47+ in Fees, 6x Faster Execution
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Base L2 Network • $25,401 Target • Step {integrationStep} of 5 • {Math.round(progress)}% Complete
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Integration Progress */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Target className="h-7 w-7 mr-3" />
              Mobile Conversion Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">MiniKit Setup Progress:</span>
                <span className="text-blue-700 dark:text-blue-300 font-bold">{Math.round(progress)}%</span>
              </div>
              
              <Progress value={progress} className="w-full h-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg text-center">
                  <Smartphone className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{conversionDetails.tokensToConvert}</div>
                  <div className="text-blue-600 dark:text-blue-400 text-xs">Mobile Convert</div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-center">
                  <Zap className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-700 dark:text-green-300">{conversionDetails.baseFees}</div>
                  <div className="text-green-600 dark:text-green-400 text-xs">Base Fees</div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg text-center">
                  <TrendingUp className="h-5 w-5 text-purple-500 mx-auto mb-1" />
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

        {/* Cost Comparison */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Base vs Ethereum: Cost Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="foundation-card border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="foundation-heading-4 text-red-700 dark:text-red-300">
                    {comparisonData.ethereum.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-red-600">Gas Fees:</span>
                      <span className="text-red-800 dark:text-red-200 font-semibold">{comparisonData.ethereum.gasFees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Block Speed:</span>
                      <span className="text-red-800 dark:text-red-200 font-semibold">{comparisonData.ethereum.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Confirmation:</span>
                      <span className="text-red-800 dark:text-red-200 font-semibold">{comparisonData.ethereum.confirmation}</span>
                    </div>
                    <div className="flex justify-between border-t border-red-200 dark:border-red-700 pt-2">
                      <span className="text-red-600 font-bold">Total Cost:</span>
                      <span className="text-red-800 dark:text-red-200 font-bold">{comparisonData.ethereum.totalCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600 font-bold">Final Cash:</span>
                      <span className="text-red-800 dark:text-red-200 font-bold text-lg">{comparisonData.ethereum.finalCash}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="foundation-card border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="foundation-heading-4 text-green-700 dark:text-green-300 flex items-center">
                    {comparisonData.base.name}
                    <Badge className="bg-green-500 text-white ml-2">RECOMMENDED</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-600">Gas Fees:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{comparisonData.base.gasFees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Block Speed:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{comparisonData.base.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Confirmation:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{comparisonData.base.confirmation}</span>
                    </div>
                    <div className="flex justify-between border-t border-green-200 dark:border-green-700 pt-2">
                      <span className="text-green-600 font-bold">Total Cost:</span>
                      <span className="text-green-800 dark:text-green-200 font-bold">{comparisonData.base.totalCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600 font-bold">Final Cash:</span>
                      <span className="text-green-800 dark:text-green-200 font-bold text-lg">{comparisonData.base.finalCash}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded text-center">
                    <span className="text-green-700 dark:text-green-300 font-bold text-sm">SAVES $47+ vs Ethereum</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Base Benefits */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Rocket className="h-7 w-7 mr-3" />
              Base Network Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {baseBenefits.map((benefit, index) => (
                <Card key={index} className="foundation-card border-purple-100 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {benefit.icon}
                      <h4 className="text-purple-700 dark:text-purple-300 font-semibold text-sm">{benefit.title}</h4>
                    </div>
                    <p className="text-purple-600 dark:text-purple-400 text-xs mb-2">{benefit.description}</p>
                    <Badge className="bg-purple-500 text-white text-xs">{benefit.savings}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integration Steps */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Clock className="h-7 w-7 mr-3" />
              Mobile Integration Timeline
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
                      <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
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
                          <h5 className="text-sm font-semibold">Mobile Steps:</h5>
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

        {/* Action Center */}
        <Card className="foundation-card border-2 border-blue-200 dark:border-blue-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Start Your Mobile Base Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="foundation-text-body text-blue-800 dark:text-blue-200">
                  <strong>MOBILE-FIRST SOLUTION:</strong> Base MiniKit provides native mobile experience with 10x lower fees ($3 vs $50+), 6x faster transactions, and seamless Coinbase integration for your $25,401 conversion.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={openCoinbaseWallet}
                  className="foundation-button-primary h-12"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Download Coinbase Wallet
                </Button>
                
                <Button
                  onClick={openBaseDocs}
                  className="foundation-button-accent h-12"
                >
                  <Code className="h-5 w-5 mr-2" />
                  View MiniKit Docs
                </Button>
                
                <Button
                  onClick={openBaseApp}
                  className="foundation-button-secondary h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Explore Base Network
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  <strong>Mobile Path:</strong> Install Coinbase Wallet → Enable Base → Bridge ETHGR → Convert on L2 → Bridge back → Cash out
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                  Result: $25,401 available cash with $47+ saved in fees via mobile-native experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}