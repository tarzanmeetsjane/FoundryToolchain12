import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Coins,
  TrendingUp,
  Users,
  Zap,
  Target,
  DollarSign,
  Rocket,
  Shield,
  ArrowRightLeft,
  ExternalLink
} from "lucide-react";

export default function LiquidEthOpportunities() {
  const [selectedOpportunity, setSelectedOpportunity] = useState("token-creation");

  const liquidEthExplanation = {
    definition: "Liquid ETH is regular ETH that you can freely spend, trade, or use for any blockchain operation",
    difference: "Unlike locked tokens (like your ETHGR), liquid ETH has no restrictions - you control it completely",
    advantages: [
      "Immediate use for any transaction",
      "No approval requirements", 
      "Direct trading on all platforms",
      "Foundation operational funding",
      "Gas fees for all operations"
    ]
  };

  const ethConversionPotential = {
    portfolioValue: "$681,196.21",
    currentEthPrice: "$2,420",
    potentialEth: "281.48 ETH",
    afterGasCosts: "281.28 ETH", // ~0.2 ETH gas
    liquidValue: "$680,797.60"
  };

  const liquidEthOpportunities = {
    "token-creation": {
      title: "Foundation Token Creation",
      description: "Deploy your own foundation token with ETH funding",
      ethRequired: "5-15 ETH",
      expectedReturn: "$50K-500K",
      timeframe: "1-7 days",
      steps: [
        "Deploy ERC20 token contract (0.1 ETH)",
        "Add initial liquidity pool (10 ETH)",
        "Verify contract on Etherscan (0.05 ETH)",
        "List on DEX platforms (0.5 ETH)",
        "Marketing and promotion (2-5 ETH)"
      ],
      benefits: [
        "Complete control over tokenomics",
        "Revenue from token appreciation",
        "Foundation funding mechanism",
        "Victim reward system capability"
      ]
    },
    "liquidity-provision": {
      title: "DeFi Liquidity Provision",
      description: "Earn yield by providing liquidity to established pools",
      ethRequired: "50-200 ETH",
      expectedReturn: "5-25% APR",
      timeframe: "Ongoing",
      steps: [
        "Select high-yield ETH pairs (ETH/USDC, ETH/WBTC)",
        "Provide liquidity to Uniswap V3 pools",
        "Optimize fee tier selection (0.05%, 0.3%, 1%)",
        "Monitor and rebalance positions",
        "Compound earned fees"
      ],
      benefits: [
        "Passive income generation",
        "Portfolio diversification",
        "Foundation operational funding",
        "Risk management through established pairs"
      ]
    },
    "victim-assistance": {
      title: "Direct Victim Assistance",
      description: "Use ETH to directly help honeypot victims recover funds",
      ethRequired: "10-100 ETH",
      expectedReturn: "Social impact + 20% service fees",
      timeframe: "Immediate",
      steps: [
        "Identify verified honeypot victims",
        "Assess recovery requirements",
        "Deploy recovery contracts using ETH",
        "Execute victim fund recovery",
        "Collect 20% service fee from recovered amounts"
      ],
      benefits: [
        "Immediate social impact",
        "Foundation credibility building",
        "Revenue through service fees", 
        "Victim network expansion"
      ]
    },
    "arbitrage-trading": {
      title: "ETH Arbitrage Trading",
      description: "Profit from ETH price differences across platforms",
      ethRequired: "20-100 ETH",
      expectedReturn: "2-10% per trade",
      timeframe: "Minutes to hours",
      steps: [
        "Monitor ETH prices across DEXs",
        "Identify arbitrage opportunities",
        "Execute simultaneous buy/sell orders",
        "Account for gas fees and slippage",
        "Reinvest profits for compound growth"
      ],
      benefits: [
        "Quick profit generation",
        "Market-neutral strategy",
        "Foundation capital growth",
        "Trading expertise development"
      ]
    },
    "infrastructure": {
      title: "Foundation Infrastructure",
      description: "Build technical infrastructure for foundation operations",
      ethRequired: "5-25 ETH",
      expectedReturn: "Operational efficiency",
      timeframe: "2-4 weeks",
      steps: [
        "Deploy foundation smart contracts",
        "Set up automated victim detection systems",
        "Create recovery contract templates",
        "Build monitoring and alert systems",
        "Establish security audit processes"
      ],
      benefits: [
        "Automated foundation operations",
        "Scalable victim assistance",
        "Professional credibility",
        "Reduced operational costs"
      ]
    }
  };

  const ethUseCases = [
    {
      category: "Token Operations",
      uses: [
        "Deploy new ERC20 tokens",
        "Create liquidity pools",
        "Provide initial liquidity",
        "Pay for contract verification"
      ],
      ethNeeded: "5-20 ETH"
    },
    {
      category: "Foundation Operations", 
      uses: [
        "Gas fees for all transactions",
        "Smart contract deployments",
        "Victim assistance funding",
        "Operational expenses"
      ],
      ethNeeded: "10-50 ETH"
    },
    {
      category: "Investment Opportunities",
      uses: [
        "DeFi yield farming",
        "Liquidity provision rewards", 
        "Arbitrage trading capital",
        "Staking for validator rewards"
      ],
      ethNeeded: "50-200 ETH"
    },
    {
      category: "Emergency Fund",
      uses: [
        "Rapid victim assistance",
        "Crisis response funding",
        "Opportunity investments",
        "Foundation security reserves"
      ],
      ethNeeded: "20-100 ETH"
    }
  ];

  const conversionStrategy = {
    phase1: {
      title: "Initial Conversion (25%)",
      ethgr: "497,500 ETHGR",
      eth: "~70 ETH", 
      usd: "$170,400",
      purpose: "Foundation operations, token creation, initial liquidity"
    },
    phase2: {
      title: "Growth Conversion (50%)", 
      ethgr: "995,000 ETHGR",
      eth: "~140 ETH",
      usd: "$340,800", 
      purpose: "Victim assistance funding, DeFi investments, infrastructure"
    },
    phase3: {
      title: "Scale Conversion (25%)",
      ethgr: "497,500 ETHGR",
      eth: "~70 ETH",
      usd: "$170,400",
      purpose: "Emergency reserves, major opportunities, foundation growth"
    }
  };

  const immediateActions = [
    {
      action: "Convert 100K ETHGR to ETH",
      result: "~34 ETH ($82,280)",
      purpose: "Foundation setup and token creation",
      priority: "HIGH"
    },
    {
      action: "Deploy Foundation Token",
      result: "New ERC20 with initial liquidity",
      purpose: "Foundation funding mechanism",
      priority: "HIGH"
    },
    {
      action: "Create Victim Assistance Pool",
      result: "Direct helping capability",
      purpose: "Immediate social impact",
      priority: "MEDIUM"
    },
    {
      action: "Establish DeFi Positions",
      result: "Passive income generation",
      purpose: "Sustainable foundation funding",
      priority: "MEDIUM"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Liquid ETH Opportunities
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Transform Your ETHGR Portfolio Into Powerful ETH-Based Foundation Operations
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            🚀 281 ETH Potential = $680K+ Liquid Foundation Capital
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Liquid ETH Explanation */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Coins className="h-7 w-7 mr-3" />
              What is Liquid ETH?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-3">Simple Explanation:</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4">{liquidEthExplanation.definition}</p>
                <p className="text-blue-800 dark:text-blue-200">{liquidEthExplanation.difference}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-blue-700 dark:text-blue-300 font-semibold">Your Current Situation:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                      <span className="text-red-700 dark:text-red-300">ETHGR Tokens:</span>
                      <span className="text-red-800 dark:text-red-200">Locked in contract</span>
                    </div>
                    <div className="flex justify-between p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                      <span className="text-amber-700 dark:text-amber-300">Current ETH:</span>
                      <span className="text-amber-800 dark:text-amber-200">0.014 ETH (limited use)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-green-700 dark:text-green-300 font-semibold">After Conversion:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                      <span className="text-green-700 dark:text-green-300">Liquid ETH:</span>
                      <span className="text-green-800 dark:text-green-200">281+ ETH available</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                      <span className="text-green-700 dark:text-green-300">Foundation Power:</span>
                      <span className="text-green-800 dark:text-green-200">Unlimited operations</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-green-700 dark:text-green-300 font-semibold">Liquid ETH Advantages:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {liquidEthExplanation.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                      <Shield className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-green-800 dark:text-green-200 text-sm">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Potential */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <ArrowRightLeft className="h-7 w-7 mr-3" />
              Your ETH Conversion Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{ethConversionPotential.portfolioValue}</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">ETHGR Value</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ethConversionPotential.potentialEth}</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Potential ETH</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{ethConversionPotential.afterGasCosts}</div>
                <div className="text-sm text-green-700 dark:text-green-300">After Gas</div>
              </div>
              
              <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{ethConversionPotential.liquidValue}</div>
                <div className="text-sm text-amber-700 dark:text-amber-300">Liquid Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ETH Use Cases */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Target className="h-7 w-7 mr-3" />
              What You Can Do With Liquid ETH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ethUseCases.map((category, index) => (
                <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-green-700 dark:text-green-300 font-bold">{category.category}</h3>
                      <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-300">
                        {category.ethNeeded}
                      </Badge>
                    </div>
                    
                    <ul className="space-y-2">
                      {category.uses.map((use, useIndex) => (
                        <li key={useIndex} className="flex items-start space-x-2">
                          <Zap className="h-3 w-3 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-green-800 dark:text-green-200 text-sm">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Major Opportunities */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Rocket className="h-7 w-7 mr-3" />
              Major ETH Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(liquidEthOpportunities).map(([key, opportunity], index) => (
                <div 
                  key={index}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedOpportunity === key 
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500' 
                      : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-700 hover:border-amber-400'
                  }`}
                  onClick={() => setSelectedOpportunity(key)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-amber-800 dark:text-amber-200 font-bold text-lg">{opportunity.title}</h3>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="border-amber-500 text-amber-700 dark:text-amber-300">
                          {opportunity.ethRequired}
                        </Badge>
                        <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                          {opportunity.expectedReturn}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-amber-700 dark:text-amber-300">{opportunity.description}</p>
                    
                    {selectedOpportunity === key && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-amber-700 dark:text-amber-300 font-semibold mb-2">Implementation Steps:</h4>
                            <ol className="space-y-1">
                              {opportunity.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start space-x-2">
                                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{stepIndex + 1}.</span>
                                  <span className="text-amber-800 dark:text-amber-200 text-sm">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          
                          <div>
                            <h4 className="text-amber-700 dark:text-amber-300 font-semibold mb-2">Benefits:</h4>
                            <ul className="space-y-1">
                              {opportunity.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start space-x-2">
                                  <TrendingUp className="h-3 w-3 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                                  <span className="text-amber-800 dark:text-amber-200 text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Badge variant="secondary">Timeframe: {opportunity.timeframe}</Badge>
                          <Badge variant="outline">ETH Required: {opportunity.ethRequired}</Badge>
                          <Badge variant="default">Return: {opportunity.expectedReturn}</Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Strategy */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Phased Conversion Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(conversionStrategy).map(([key, phase], index) => (
                <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h3 className="text-blue-700 dark:text-blue-300 font-semibold">{phase.title}</h3>
                      <p className="text-blue-800 dark:text-blue-200 text-sm mt-2">{phase.purpose}</p>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{phase.ethgr}</div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">ETHGR Convert</div>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">{phase.eth}</div>
                      <div className="text-xs text-green-700 dark:text-green-300">ETH Received</div>
                    </div>
                    
                    <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                      <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{phase.usd}</div>
                      <div className="text-xs text-amber-700 dark:text-amber-300">USD Value</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Actions */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Immediate ETH Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <Rocket className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong className="foundation-text-accent">START SIMPLE:</strong> Convert 100K ETHGR to ~34 ETH first. This gives you $82K liquid capital to begin foundation operations while keeping most tokens as reserves.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {immediateActions.map((action, index) => (
                  <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-green-700 dark:text-green-300 font-semibold">{action.action}</h3>
                        <Badge variant={action.priority === 'HIGH' ? 'destructive' : 'secondary'}>
                          {action.priority}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                          <span className="text-blue-700 dark:text-blue-300 font-semibold">Result: </span>
                          <span className="text-blue-800 dark:text-blue-200">{action.result}</span>
                        </div>
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                          <span className="text-purple-700 dark:text-purple-300 font-semibold">Purpose: </span>
                          <span className="text-purple-800 dark:text-purple-200">{action.purpose}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/ethgr-to-eth-conversion', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <ArrowRightLeft className="h-5 w-5 mr-2" />
                  Convert ETHGR to ETH
                </Button>
                
                <Button
                  onClick={() => window.open('/personal-allocation-plan', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Personal Allocation
                </Button>
                
                <Button
                  onClick={() => window.open('https://app.uniswap.org/', '_blank')}
                  className="foundation-button-secondary h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start Trading
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}