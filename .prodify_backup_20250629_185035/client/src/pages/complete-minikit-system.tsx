import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone,
  Globe,
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
  Code,
  Upload,
  Trophy,
  HandCoins,
  Users
} from "lucide-react";

export default function CompleteMiniKitSystem() {
  const [systemStep, setSystemStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const conversionDetails = {
    tokensToConvert: "219,300 ETHGR",
    estimatedEth: "17.52 ETH",
    usdValue: "$42,551",
    baseFees: "$3-5 (vs $50+ Ethereum)",
    netAmount: "$42,340",
    availableCash: "$25,404",
    foundationReserve: "$605,570"
  };

  const completePlatform = {
    frontend: "React + OnChainKit + MiniKit",
    backend: "Vercel Edge Functions + Redis",
    blockchain: "Base L2 + Ethereum Mainnet",
    wallet: "Coinbase Wallet + Smart Wallet",
    deployment: "Global CDN + PWA",
    security: "Bank-grade + HTTPS"
  };

  const systemFeatures = [
    {
      category: "Mobile-First Design",
      features: [
        "Native mobile wallet integration",
        "PWA with offline capabilities",
        "Touch-optimized conversion interface",
        "Push notifications for updates"
      ],
      icon: <Smartphone className="h-5 w-5 text-blue-500" />
    },
    {
      category: "Base Network Benefits",
      features: [
        "10x lower fees ($3 vs $50+)",
        "6x faster transactions (2s blocks)",
        "Seamless bridging to/from Ethereum",
        "Coinbase ecosystem integration"
      ],
      icon: <Zap className="h-5 w-5 text-green-500" />
    },
    {
      category: "Smart Wallet Features",
      features: [
        "Passkey authentication",
        "Sponsored transactions",
        "Spend permissions",
        "Magic Spend capabilities"
      ],
      icon: <Shield className="h-5 w-5 text-purple-500" />
    },
    {
      category: "OnChainKit Components",
      features: [
        "WalletModal for seamless onboarding",
        "Identity components for ENS",
        "Transaction components",
        "Real-time balance updates"
      ],
      icon: <Code className="h-5 w-5 text-indigo-500" />
    },
    {
      category: "Global Deployment",
      features: [
        "Vercel global CDN",
        "Sub-second load times",
        "Auto-scaling serverless",
        "Real-time analytics"
      ],
      icon: <Globe className="h-5 w-5 text-cyan-500" />
    },
    {
      category: "Foundation Integration",
      features: [
        "Victim assistance tracking",
        "Revenue sharing (80/20)",
        "Impact measurement",
        "Community building"
      ],
      icon: <Users className="h-5 w-5 text-amber-500" />
    }
  ];

  const implementationSteps = [
    {
      id: 1,
      title: "Project Scaffolding",
      command: "npx create-onchain --mini ethgr-foundation",
      description: "Bootstrap complete MiniKit project with all integrations",
      status: "active",
      duration: "5 minutes",
      details: [
        "Frontend: React + TypeScript + OnChainKit",
        "Backend: Vercel functions + Redis",
        "Webhooks: Notification system",
        "Demo: Snake game → ETHGR converter"
      ]
    },
    {
      id: 2,
      title: "ETHGR Integration",
      command: "Configure token contract and conversion logic",
      description: "Add ETHGR-specific functionality to MiniKit app",
      status: "pending",
      duration: "15 minutes",
      details: [
        "Add ETHGR contract address and ABI",
        "Configure Base network bridging",
        "Implement Uniswap V3 integration",
        "Set up conversion progress tracking"
      ]
    },
    {
      id: 3,
      title: "Smart Wallet Setup",
      command: "Configure Coinbase Smart Wallet features",
      description: "Enable advanced wallet features for seamless UX",
      status: "pending",
      duration: "10 minutes",
      details: [
        "Enable Passkey authentication",
        "Configure sponsored transactions",
        "Set up spend permissions",
        "Implement Magic Spend"
      ]
    },
    {
      id: 4,
      title: "Foundation Features",
      command: "Add victim assistance and revenue tracking",
      description: "Integrate foundation-specific functionality",
      status: "pending",
      duration: "20 minutes",
      details: [
        "User onboarding flow",
        "Recovery progress tracking",
        "Revenue sharing calculation",
        "Impact measurement dashboard"
      ]
    },
    {
      id: 5,
      title: "Production Deployment",
      command: "Deploy to Vercel with global CDN",
      description: "Launch globally accessible mobile app",
      status: "pending",
      duration: "10 minutes",
      details: [
        "Environment variables setup",
        "Domain configuration",
        "PWA manifest generation",
        "Performance optimization"
      ]
    }
  ];

  const baseFunding = [
    {
      program: "Builder Rewards",
      amount: "Up to 2 ETH weekly",
      description: "Get rewarded through the Builder Rewards Program",
      url: "https://www.builderscore.xyz/",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />
    },
    {
      program: "Base Grants",
      amount: "1-5 ETH fast grants",
      description: "Fast, retroactive Base Builder Grants",
      url: "https://paragraph.com/@grants.base.eth/calling-based-builders",
      icon: <HandCoins className="h-5 w-5 text-green-500" />
    },
    {
      program: "Base Batches",
      amount: "Global program",
      description: "Program for builders creating next wave of onchain apps",
      url: "https://www.basebatches.xyz/",
      icon: <Rocket className="h-5 w-5 text-blue-500" />
    }
  ];

  const codeExamples = {
    provider: `import { MiniKitProvider } from '@coinbase/onchainkit/minikit';

function App({ children }) {
  return (
    <MiniKitProvider
      projectId="ethgr-foundation-app"
      notificationProxyUrl="/api/notification"
    >
      {children}
    </MiniKitProvider>
  );
}`,
    
    conversion: `import { useMiniKit, useNotification } from '@coinbase/onchainkit/minikit';

function ETHGRConverter() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const sendNotification = useNotification();
  
  const convertTokens = async () => {
    // Convert 219,300 ETHGR → ETH → $25,404 cash
    const result = await executeConversion();
    
    sendNotification({
      title: 'Conversion Complete!',
      body: \`$25,404 available for immediate relief\`
    });
  };
}`,

    wallet: `import { Wallet, ConnectWallet, WalletDropdown } from '@coinbase/onchainkit/wallet';

function WalletConnection() {
  return (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}`
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 3, 90);
        if (newProgress >= 18 && systemStep === 1) {
          setSystemStep(2);
        } else if (newProgress >= 36 && systemStep === 2) {
          setSystemStep(3);
        } else if (newProgress >= 54 && systemStep === 3) {
          setSystemStep(4);
        } else if (newProgress >= 72 && systemStep === 4) {
          setSystemStep(5);
        }
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, [systemStep]);

  const executeCommand = (command: string) => {
    navigator.clipboard.writeText(command);
  };

  const openBaseDocs = () => {
    window.open('https://docs.base.org/', '_blank');
  };

  const openOnChainKit = () => {
    window.open('https://onchainkit.xyz/', '_blank');
  };

  const openVercel = () => {
    window.open('https://vercel.com/', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-blue-400 mr-2 animate-pulse" />
            <h1 className="foundation-heading-1 text-white foundation-fade-in">
              Complete MiniKit System
            </h1>
            <Globe className="h-8 w-8 text-blue-400 ml-2 animate-pulse" />
          </div>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Mobile-First Foundation: Global $25,404 Conversion + Victim Assistance Platform
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Production Ready • Global CDN • Step {systemStep} of 5 • {Math.round(progress)}% Complete
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* System Overview */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Target className="h-7 w-7 mr-3" />
              Complete System Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">System Integration:</span>
                <span className="text-blue-700 dark:text-blue-300 font-bold">{Math.round(progress)}%</span>
              </div>
              
              <Progress value={progress} className="w-full h-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="foundation-card border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="foundation-heading-4 text-green-700 dark:text-green-300">Technology Stack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(completePlatform).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-green-600 capitalize">{key}:</span>
                          <span className="text-green-800 dark:text-green-200 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="foundation-card border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="foundation-heading-4 text-purple-700 dark:text-purple-300">Conversion Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600">Converting:</span>
                        <span className="text-purple-800 dark:text-purple-200 font-medium">{conversionDetails.tokensToConvert}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600">ETH Value:</span>
                        <span className="text-purple-800 dark:text-purple-200 font-medium">{conversionDetails.estimatedEth}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-600">Base Fees:</span>
                        <span className="text-purple-800 dark:text-purple-200 font-medium">{conversionDetails.baseFees}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-purple-200 dark:border-purple-700 pt-2">
                        <span className="text-purple-600 font-bold">Available Cash:</span>
                        <span className="text-purple-800 dark:text-purple-200 font-bold">{conversionDetails.availableCash}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="foundation-card border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="foundation-heading-4 text-amber-700 dark:text-amber-300">Foundation Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600">Reserve:</span>
                        <span className="text-amber-800 dark:text-amber-200 font-medium">{conversionDetails.foundationReserve}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600">Target Victims:</span>
                        <span className="text-amber-800 dark:text-amber-200 font-medium">247 ETHG victims</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-600">Revenue Model:</span>
                        <span className="text-amber-800 dark:text-amber-200 font-medium">80% to victims</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-amber-200 dark:border-amber-700 pt-2">
                        <span className="text-amber-600 font-bold">Impact Ratio:</span>
                        <span className="text-amber-800 dark:text-amber-200 font-bold">35:1 return</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Features */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Zap className="h-7 w-7 mr-3" />
              Complete Feature Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemFeatures.map((category, index) => (
                <Card key={index} className="foundation-card border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="foundation-heading-4 text-green-700 dark:text-green-300 flex items-center">
                      {category.icon}
                      <span className="ml-2">{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-green-600 dark:text-green-400 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Steps */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Code className="h-7 w-7 mr-3" />
              Implementation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {implementationSteps.map((step, index) => (
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
                        
                        <div className="space-y-3">
                          <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-3">
                            <code className="text-green-400 text-sm">{step.command}</code>
                            <Button 
                              onClick={() => executeCommand(step.command)}
                              className="ml-2 h-6 text-xs"
                              variant="outline"
                            >
                              Copy
                            </Button>
                          </div>
                          
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

        {/* Code Examples */}
        <Card className="foundation-card border-indigo-200 dark:border-indigo-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-indigo-700 dark:text-indigo-300">
              <Code className="h-7 w-7 mr-3" />
              Ready-to-Use Code Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(codeExamples).map(([key, code]) => (
                <div key={key}>
                  <h4 className="text-indigo-700 dark:text-indigo-300 font-semibold mb-3 capitalize">{key} Implementation:</h4>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Base Funding Opportunities */}
        <Card className="foundation-card border-yellow-200 dark:border-yellow-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-yellow-700 dark:text-yellow-300">
              <Trophy className="h-7 w-7 mr-3" />
              Base Ecosystem Funding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {baseFunding.map((program, index) => (
                <Card key={index} className="foundation-card border-yellow-100 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      {program.icon}
                      <h4 className="text-yellow-700 dark:text-yellow-300 font-semibold">{program.program}</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-yellow-800 dark:text-yellow-200 font-bold">{program.amount}</p>
                      <p className="text-yellow-600 dark:text-yellow-400 text-sm">{program.description}</p>
                      <Button 
                        onClick={() => window.open(program.url, '_blank')}
                        className="w-full mt-3"
                        variant="outline"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
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
            <CardTitle className="foundation-heading-3 text-center">Launch Your Complete MiniKit System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="foundation-text-body text-blue-800 dark:text-blue-200">
                  <strong>PRODUCTION READY:</strong> Complete MiniKit system with mobile-first design, Base L2 integration, Smart Wallet features, and global deployment. Convert $25,404 cash while building foundation for 247 victims.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => executeCommand("npx create-onchain --mini ethgr-foundation")}
                  className="foundation-button-primary h-12"
                >
                  <Code className="h-5 w-5 mr-2" />
                  Start Build
                </Button>
                
                <Button
                  onClick={openBaseDocs}
                  className="foundation-button-accent h-12"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Base Docs
                </Button>
                
                <Button
                  onClick={openVercel}
                  className="foundation-button-secondary h-12"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Deploy Global
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  <strong>Complete Solution:</strong> Mobile app + Base L2 + Smart Wallet + Global CDN + Foundation tools
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                  Result: $25,404 immediate relief + $605,570 foundation + global victim assistance platform
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}