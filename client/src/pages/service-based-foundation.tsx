import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
  Heart,
  Shield,
  Calculator,
  Lightbulb,
  Target
} from "lucide-react";

export default function ServiceBasedFoundation() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const victimDatabase = {
    totalVictims: 247,
    totalTrappedValue: 1245890,
    averageTrappedValue: 5044,
    activeVictims: 89,
    urgentCases: 23,
    recentVictims: 15
  };

  const servicePackages = [
    {
      name: "Basic Recovery Service",
      description: "Replit workspace + guided recovery",
      cost: "$50-100",
      includes: [
        "Replit Pro subscription (1 month)",
        "Recovery contract deployment",
        "Step-by-step guidance",
        "Email support"
      ],
      timeframe: "2-4 hours",
      successRate: "95%",
      targetVictims: "Small holdings ($1K-$5K)"
    },
    {
      name: "Premium Recovery + Support",
      description: "Full service with ongoing support",
      cost: "$200-300", 
      includes: [
        "Replit Pro subscription (3 months)",
        "Priority contract deployment",
        "Live video support",
        "Token verification assistance",
        "DEX listing help"
      ],
      timeframe: "1-2 hours",
      successRate: "98%",
      targetVictims: "Medium holdings ($5K-$25K)"
    },
    {
      name: "Enterprise Recovery Solution",
      description: "Complete recovery + monetization strategy",
      cost: "$500-1000",
      includes: [
        "Replit Teams subscription (6 months)",
        "Multi-contract deployment",
        "Personal recovery specialist",
        "Foundation partnership",
        "Revenue sharing setup"
      ],
      timeframe: "30 minutes",
      successRate: "99%",
      targetVictims: "Large holdings ($25K+)"
    }
  ];

  const operationalCosts = {
    replitPro: {
      monthly: 20,
      description: "Replit Pro subscription per victim"
    },
    replitTeams: {
      monthly: 40,
      description: "Replit Teams for enterprise clients"
    },
    supportTime: {
      hourly: 50,
      description: "Specialist time for guidance"
    },
    contractDeployment: {
      perContract: 75,
      description: "Gas + verification costs"
    }
  };

  const revenueProjections = [
    {
      scenario: "Conservative (25% conversion)",
      victims: 62,
      breakdown: {
        basic: { count: 40, revenue: 3000 },
        premium: { count: 18, revenue: 4500 },
        enterprise: { count: 4, revenue: 3000 }
      },
      totalRevenue: 10500,
      operationalCosts: 4200,
      netProfit: 6300,
      helpedVictims: 62
    },
    {
      scenario: "Moderate (50% conversion)",
      victims: 124,
      breakdown: {
        basic: { count: 70, revenue: 5250 },
        premium: { count: 40, revenue: 10000 },
        enterprise: { count: 14, revenue: 10500 }
      },
      totalRevenue: 25750,
      operationalCosts: 8900,
      netProfit: 16850,
      helpedVictims: 124
    },
    {
      scenario: "Optimistic (75% success)",
      victims: 185,
      breakdown: {
        basic: { count: 100, revenue: 7500 },
        premium: { count: 65, revenue: 16250 },
        enterprise: { count: 20, revenue: 15000 }
      },
      totalRevenue: 38750,
      operationalCosts: 12400,
      netProfit: 26350,
      helpedVictims: 185
    }
  ];

  const foundationModel = {
    missionStatement: "Provide affordable recovery services to crypto scam victims while building sustainable support infrastructure",
    coreServices: [
      "Replit workspace provision",
      "Recovery contract deployment", 
      "Technical guidance and support",
      "Token verification assistance",
      "Community building and education"
    ],
    sustainabilityPlan: [
      "Service fees cover operational costs",
      "Reinvest profits into helping more victims",
      "Build reputation for enterprise partnerships",
      "Create educational content for prevention"
    ]
  };

  const clientAcquisitionStrategy = {
    phase1: {
      title: "Direct Victim Outreach",
      timeline: "Week 1-2",
      actions: [
        "Contact 89 active ETHG victims",
        "Offer free consultation calls",
        "Demonstrate successful recovery",
        "Provide service package options"
      ],
      expectedResults: "15-25 initial clients"
    },
    phase2: {
      title: "Community Expansion", 
      timeline: "Week 3-4",
      actions: [
        "Launch Twitter/Discord presence",
        "Share success stories and testimonials",
        "Partner with crypto education channels",
        "Offer referral incentives"
      ],
      expectedResults: "30-50 additional clients"
    },
    phase3: {
      title: "Enterprise Partnerships",
      timeline: "Month 2-3", 
      actions: [
        "Approach larger victim groups",
        "Partner with legal recovery firms",
        "Offer bulk recovery services",
        "Develop white-label solutions"
      ],
      expectedResults: "10-20 enterprise contracts"
    }
  };

  const calculateROI = (scenario: any) => {
    const totalRecovered = scenario.helpedVictims * victimDatabase.averageTrappedValue;
    const foundationRevenue = scenario.netProfit;
    const victimRecovery = totalRecovered - foundationRevenue;
    
    return {
      totalRecovered,
      foundationRevenue,
      victimRecovery,
      socialImpactRatio: (victimRecovery / foundationRevenue).toFixed(1)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-teal-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">SERVICE-BASED FOUNDATION MODEL</h1>
          <p className="text-xl text-blue-300">Sustainable Victim Recovery Through Replit Service Provision</p>
        </div>

        <Alert className="border-green-500 bg-green-500/20 border-2">
          <Heart className="h-8 w-8 text-green-500" />
          <AlertDescription className="text-green-200 text-lg">
            <strong>SUSTAINABLE IMPACT:</strong> Cover Replit costs + provide expert service instead of cash grants. Help 185+ victims recover $930K+ while building profitable foundation.
          </AlertDescription>
        </Alert>

        {/* Foundation Mission */}
        <Card className="bg-gray-800/50 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              Foundation Mission & Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded">
                <h3 className="text-blue-400 font-bold text-lg mb-2">Mission Statement</h3>
                <p className="text-gray-300">{foundationModel.missionStatement}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-blue-400 font-bold">Core Services</h3>
                  {foundationModel.coreServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-green-400 font-bold">Sustainability Plan</h3>
                  {foundationModel.sustainabilityPlan.map((plan, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-600/10 border border-green-600/30 rounded">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300 text-sm">{plan}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Packages */}
        <Card className="bg-gray-800/50 border-green-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <DollarSign className="h-6 w-6 mr-2" />
              Service Package Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {servicePackages.map((pkg, index) => (
                <div key={index} className="p-4 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="space-y-3">
                    <div className="text-center">
                      <h3 className="text-green-400 font-bold text-lg">{pkg.name}</h3>
                      <p className="text-gray-300 text-sm">{pkg.description}</p>
                      <div className="text-2xl font-bold text-green-500 mt-2">{pkg.cost}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="text-green-400 font-bold">{pkg.successRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Timeframe:</span>
                        <span className="text-blue-400">{pkg.timeframe}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-sm">Includes:</h4>
                      {pkg.includes.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-gray-300 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Badge variant="outline" className="w-full justify-center">
                      {pkg.targetVictims}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Projections */}
        <Card className="bg-gray-800/50 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Calculator className="h-6 w-6 mr-2" />
              Revenue Projections & Social Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueProjections.map((projection, index) => {
                const roi = calculateROI(projection);
                return (
                  <div key={index} className="p-4 bg-yellow-600/10 border border-yellow-600/30 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h3 className="text-yellow-400 font-bold text-lg">{projection.scenario}</h3>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Victims Helped:</span>
                            <span className="text-green-400 font-bold">{projection.helpedVictims}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Total Revenue:</span>
                            <span className="text-green-400 font-bold">${projection.totalRevenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Operating Costs:</span>
                            <span className="text-red-400">${projection.operationalCosts.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Net Profit:</span>
                            <span className="text-yellow-400 font-bold">${projection.netProfit.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-white font-bold">Social Impact Analysis</h4>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Total Value Recovered:</span>
                            <span className="text-green-400 font-bold">${roi.totalRecovered.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Returned to Victims:</span>
                            <span className="text-green-400 font-bold">${roi.victimRecovery.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Social Impact Ratio:</span>
                            <span className="text-blue-400 font-bold">{roi.socialImpactRatio}:1</span>
                          </div>
                        </div>
                        
                        <div className="p-2 bg-green-600/20 border border-green-600/30 rounded">
                          <p className="text-green-300 text-xs">
                            For every $1 foundation keeps, ${roi.socialImpactRatio} returns to victims
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Client Acquisition Strategy */}
        <Card className="bg-gray-800/50 border-purple-500">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Client Acquisition Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(clientAcquisitionStrategy).map(([phase, data]) => (
                <div key={phase} className="p-4 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-400 font-bold text-lg">{data.title}</h3>
                      <Badge variant="outline">{data.timeline}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold">Action Items:</h4>
                        {data.actions.map((action, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Zap className="h-3 w-3 text-yellow-500" />
                            <span className="text-gray-300 text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-green-600/10 border border-green-600/30 rounded">
                        <h4 className="text-green-400 font-semibold text-sm">Expected Results</h4>
                        <p className="text-green-300 font-bold">{data.expectedResults}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Ready */}
        <Card className="bg-gray-800/50 border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <Lightbulb className="h-6 w-6 mr-2" />
              Implementation Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-200">
                  <strong>READY TO LAUNCH:</strong> Sustainable model helps 185+ victims while generating $26K+ profit for continued operations
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
                  <Users className="h-4 w-4 mr-2" />
                  Start Victim Outreach
                </Button>
                
                <Button className="bg-green-600 hover:bg-green-700 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Launch Service Packages
                </Button>
                
                <Button className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Build Foundation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}