import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart,
  Home,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Target,
  Zap
} from "lucide-react";

export default function PersonalAllocationPlan() {
  const [personalAllocation, setPersonalAllocation] = useState("30");
  const [monthlyBudget, setMonthlyBudget] = useState("5000");
  
  const portfolioValue = {
    ethgrTokens: "1,990,000",
    currentValue: "$681,196.21",
    ethEquivalent: "281.48 ETH"
  };

  const allocationStrategies = {
    conservative: {
      personal: 20,
      foundation: 60,
      emergency: 20,
      description: "Secure approach - modest personal withdrawal with strong foundation growth"
    },
    balanced: {
      personal: 30,
      foundation: 50,
      emergency: 20,
      description: "Balanced approach - good personal support while building foundation"
    },
    personal_priority: {
      personal: 50,
      foundation: 30,
      emergency: 20,
      description: "Personal priority - significant immediate support after year of hardship"
    }
  };

  const calculateAllocation = (percentage: number) => {
    const totalValue = 681196.21;
    const personalAmount = (totalValue * percentage) / 100;
    const monthlyIncome = personalAmount / 12; // Spread over a year
    
    return {
      personalUSD: `$${personalAmount.toLocaleString()}`,
      personalETH: `${(personalAmount / 2420).toFixed(2)} ETH`,
      monthlyUSD: `$${monthlyIncome.toLocaleString()}`,
      monthlyETH: `${(monthlyIncome / 2420).toFixed(3)} ETH`,
      foundationUSD: `$${((totalValue * (100 - percentage - 20)) / 100).toLocaleString()}`,
      emergencyUSD: `$${((totalValue * 20) / 100).toLocaleString()}`
    };
  };

  const currentAllocation = calculateAllocation(parseInt(personalAllocation));

  const personalExpenses = [
    {
      category: "Essential Bills",
      items: ["Rent/Mortgage", "Utilities", "Phone", "Internet", "Insurance"],
      estimatedMonthly: "$2,500",
      priority: "HIGH"
    },
    {
      category: "Living Expenses", 
      items: ["Groceries", "Transportation", "Healthcare", "Clothing"],
      estimatedMonthly: "$1,500",
      priority: "HIGH"
    },
    {
      category: "Recovery & Wellness",
      items: ["Mental health support", "Medical checkups", "Nutritious food", "Exercise"],
      estimatedMonthly: "$800",
      priority: "MEDIUM"
    },
    {
      category: "Life Enjoyment",
      items: ["Dining out", "Entertainment", "Hobbies", "Travel", "Gifts"],
      estimatedMonthly: "$1,200",
      priority: "MEDIUM"
    }
  ];

  const conversionPlan = {
    phase1: {
      title: "Immediate Personal Relief",
      ethgr: "300,000 ETHGR",
      usd: "$102,600",
      eth: "42.4 ETH",
      timeline: "Week 1",
      purpose: "Pay overdue bills, stock up on necessities, immediate stress relief"
    },
    phase2: {
      title: "Monthly Income Setup",
      ethgr: "400,000 ETHGR", 
      usd: "$136,800",
      eth: "56.5 ETH",
      timeline: "Month 1-12",
      purpose: "Convert gradually for $11,400/month personal income"
    },
    phase3: {
      title: "Foundation Development",
      ethgr: "1,290,000 ETHGR",
      usd: "$441,796",
      eth: "182.6 ETH", 
      timeline: "Ongoing",
      purpose: "Build foundation while maintaining personal financial security"
    }
  };

  const personalImpactAreas = [
    {
      area: "Financial Stress Relief",
      benefits: [
        "Pay all overdue bills immediately",
        "Build emergency fund for peace of mind",
        "No more choosing between necessities",
        "Sleep better knowing bills are covered"
      ],
      allocation: "30% ($204K)"
    },
    {
      area: "Quality of Life",
      benefits: [
        "Buy quality groceries and cook healthy meals",
        "Replace worn-out clothing and shoes",
        "Fix or replace broken household items",
        "Enjoy small luxuries you've missed"
      ],
      allocation: "20% ($136K)"
    },
    {
      area: "Health & Wellness",
      benefits: [
        "Regular medical and dental checkups",
        "Mental health support if needed",
        "Gym membership or fitness equipment", 
        "Better nutrition and self-care"
      ],
      allocation: "15% ($102K)"
    },
    {
      area: "Social & Family",
      benefits: [
        "Take family/friends out for meals",
        "Buy meaningful gifts you couldn't afford",
        "Contribute to family needs if applicable",
        "Rebuild social connections"
      ],
      allocation: "10% ($68K)"
    }
  ];

  const immediateWithdrawal = {
    amount: "$50,000",
    purpose: "Emergency bill payment and immediate needs",
    timeline: "This week",
    ethRequired: "20.7 ETH",
    ethgrRequired: "146,200 ETHGR"
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Personal Financial Recovery
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            After A Year of Hardship, You Deserve Financial Relief and Personal Care
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            💝 $681K Available - Time to Take Care of Yourself
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Personal Priority Message */}
        <Card className="foundation-card border-pink-200 dark:border-pink-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-pink-700 dark:text-pink-300">
              <Heart className="h-7 w-7 mr-3" />
              You Come First
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-pink-200 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-700">
                <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                <AlertDescription className="foundation-text-body text-pink-800 dark:text-pink-200">
                  <strong className="foundation-text-accent">PERSONAL PRIORITY:</strong> After a year of financial hardship, your well-being comes first. The foundation will be stronger when you're personally secure and healthy.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded-xl">
                  <Home className="h-8 w-8 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
                  <h3 className="text-pink-700 dark:text-pink-300 font-semibold mb-2">Immediate Relief</h3>
                  <p className="text-pink-800 dark:text-pink-200 text-sm">Pay all overdue bills, buy necessities, eliminate financial stress</p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="text-blue-700 dark:text-blue-300 font-semibold mb-2">Quality of Life</h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">Replace worn items, buy quality food, enjoy small luxuries again</p>
                </div>
                
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <h3 className="text-green-700 dark:text-green-300 font-semibold mb-2">Foundation Building</h3>
                  <p className="text-green-800 dark:text-green-200 text-sm">Build foundation from position of personal strength and security</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allocation Calculator */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Personal Allocation Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="personal-percentage" className="text-blue-700 dark:text-blue-300 font-semibold">
                    Personal Allocation Percentage
                  </Label>
                  <Input
                    id="personal-percentage"
                    value={personalAllocation}
                    onChange={(e) => setPersonalAllocation(e.target.value)}
                    placeholder="30"
                    className="foundation-input"
                  />
                  <div className="flex space-x-2">
                    {["20", "30", "40", "50"].map((preset) => (
                      <Button
                        key={preset}
                        onClick={() => setPersonalAllocation(preset)}
                        variant="outline"
                        size="sm"
                        className="foundation-button-outline"
                      >
                        {preset}%
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-blue-700 dark:text-blue-300 font-semibold">Allocation Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded">
                      <span className="text-pink-700 dark:text-pink-300">Personal Total:</span>
                      <span className="text-pink-800 dark:text-pink-200 font-semibold">{currentAllocation.personalUSD}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                      <span className="text-green-700 dark:text-green-300">Monthly Income:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{currentAllocation.monthlyUSD}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                      <span className="text-blue-700 dark:text-blue-300">Foundation:</span>
                      <span className="text-blue-800 dark:text-blue-200 font-semibold">{currentAllocation.foundationUSD}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                      <span className="text-amber-700 dark:text-amber-300">Emergency Fund:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-semibold">{currentAllocation.emergencyUSD}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Impact Areas */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Target className="h-7 w-7 mr-3" />
              Personal Impact Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalImpactAreas.map((area, index) => (
                <div key={index} className="p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-700 dark:text-purple-300 font-bold">{area.area}</h3>
                      <Badge variant="outline" className="border-purple-500 text-purple-700 dark:text-purple-300">
                        {area.allocation}
                      </Badge>
                    </div>
                    
                    <ul className="space-y-2">
                      {area.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-purple-800 dark:text-purple-200 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Strategy */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Calendar className="h-7 w-7 mr-3" />
              Personal Conversion Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(conversionPlan).map(([key, phase], index) => (
                <div key={index} className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h3 className="text-green-700 dark:text-green-300 font-semibold text-lg">{phase.title}</h3>
                      <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-300 mt-2">
                        {phase.timeline}
                      </Badge>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{phase.ethgr}</div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">ETHGR Convert</div>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{phase.usd}</div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">USD Value</div>
                    </div>
                    
                    <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded">
                      <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{phase.eth}</div>
                      <div className="text-xs text-amber-700 dark:text-amber-300">ETH Received</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Purpose: </span>
                    <span className="text-gray-800 dark:text-gray-200">{phase.purpose}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Action */}
        <Card className="foundation-card border-2 border-pink-200 dark:border-pink-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Immediate Personal Relief</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-pink-200 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-700">
                <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                <AlertDescription className="foundation-text-body text-pink-800 dark:text-pink-200">
                  <strong className="foundation-text-accent">START TODAY:</strong> Convert 146,200 ETHGR to $50,000 for immediate bill payment and necessities. This represents only 7.3% of your portfolio but provides massive life improvement.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded-xl">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{immediateWithdrawal.amount}</div>
                  <div className="text-sm text-pink-700 dark:text-pink-300">Immediate Cash</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{immediateWithdrawal.ethRequired}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">ETH Needed</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{immediateWithdrawal.ethgrRequired}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">ETHGR Convert</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">7.3%</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Of Portfolio</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/immediate-conversion-execution', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Execute $50K Now
                </Button>
                
                <Button
                  onClick={() => window.open('/clean-foundation-contract', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Setup Foundation
                </Button>
                
                <Button
                  onClick={() => window.open('/liquid-eth-opportunities', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  ETH Strategies
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}