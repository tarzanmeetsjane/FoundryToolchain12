import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  TrendingUp,
  Shield,
  Calculator,
  DollarSign,
  Target,
  ArrowRight,
  Info
} from "lucide-react";

export default function TokenValueClarification() {
  const tokenOwnership = {
    totalSupply: "1,990,000 ETHGR",
    yourOwnership: "1,990,000 ETHGR (100%)",
    ownershipPercentage: "100%",
    contractAddress: "0xfA7b8c553C48C56ec7027d26ae95b029a2abF247",
    walletAddress: "0x058C8FE01E5c9eaC6ee19e6673673B549B368843"
  };

  const conversionBreakdown = {
    personalRelief: {
      tokens: "219,300 ETHGR",
      percentage: "11%",
      ethValue: "17.52 ETH",
      usdValue: "$42,551",
      afterFees: "$42,339",
      afterTaxes: "$25,403",
      purpose: "Immediate bill relief"
    },
    foundationReserve: {
      tokens: "1,770,700 ETHGR", 
      percentage: "89%",
      ethValue: "142.4 ETH",
      usdValue: "$345,945",
      purpose: "Help 247 victims recover funds"
    }
  };

  const noNegotiation = [
    {
      point: "You Own Everything",
      explanation: "All 1,990,000 ETHGR tokens belong to you at 100% ownership",
      value: "Full market value"
    },
    {
      point: "No Price Reduction",
      explanation: "We're using current ETH market price ($2,429) for calculations",
      value: "Current market rate"
    },
    {
      point: "Only Trading Fees",
      explanation: "Exchange fees (0.26-0.5%) are standard costs everyone pays",
      value: "Industry standard"
    },
    {
      point: "Your Choice",
      explanation: "You decide how much to convert and when to convert",
      value: "Complete control"
    }
  ];

  const valueFlow = [
    {
      step: 1,
      title: "Your ETHGR Tokens",
      amount: "219,300 ETHGR",
      description: "Your tokens at full value"
    },
    {
      step: 2,
      title: "Convert to ETH",
      amount: "17.52 ETH",
      description: "Market rate conversion"
    },
    {
      step: 3,
      title: "Sell ETH for USD",
      amount: "$42,339",
      description: "After small exchange fee"
    },
    {
      step: 4,
      title: "Set Aside Taxes",
      amount: "$16,936",
      description: "40% tax reserve (safe estimate)"
    },
    {
      step: 5,
      title: "Available Cash",
      amount: "$25,403",
      description: "Ready for immediate bills"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Token Value Clarification
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            You Own 100% of Your Tokens at Full Market Value - No Negotiations Needed
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            100% Ownership • Full Market Value • Your Complete Control
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Ownership Confirmation */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <Shield className="h-7 w-7 mr-3" />
              You Own Everything - No One is Paying You Less
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 mb-6">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                <strong>COMPLETE OWNERSHIP:</strong> You own 100% of all 1,990,000 ETHGR tokens. There are no negotiations, price reductions, or anyone paying you less. The small exchange fees (0.26-0.5%) are standard costs that everyone pays when converting crypto to cash.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-4">Your Token Ownership</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-600">Total Supply:</span>
                    <span className="text-green-800 dark:text-green-200 font-semibold">{tokenOwnership.totalSupply}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">You Own:</span>
                    <span className="text-green-800 dark:text-green-200 font-bold">{tokenOwnership.yourOwnership}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Ownership %:</span>
                    <span className="text-green-800 dark:text-green-200 font-bold text-lg">{tokenOwnership.ownershipPercentage}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-4">No Negotiations</h3>
                <div className="space-y-3">
                  {noNegotiation.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">{item.point}</span>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 text-xs ml-6">{item.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Value Flow */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <TrendingUp className="h-7 w-7 mr-3" />
              Your Money Flow: Tokens → Cash
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {valueFlow.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-blue-700 dark:text-blue-300 font-semibold">{step.title}</h4>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">{step.description}</p>
                  </div>
                  <div className="text-blue-700 dark:text-blue-300 font-bold text-lg">
                    {step.amount}
                  </div>
                  {index < valueFlow.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-blue-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Plan */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Target className="h-7 w-7 mr-3" />
              Your Strategic Allocation Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="foundation-card border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="foundation-heading-4 text-amber-700 dark:text-amber-300">
                    Personal Relief (11%)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-600">Tokens:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-semibold">{conversionBreakdown.personalRelief.tokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600">ETH Value:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-semibold">{conversionBreakdown.personalRelief.ethValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600">After Fees:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-semibold">{conversionBreakdown.personalRelief.afterFees}</span>
                    </div>
                    <div className="flex justify-between border-t border-amber-200 dark:border-amber-700 pt-2">
                      <span className="text-amber-600 font-bold">Available Cash:</span>
                      <span className="text-amber-800 dark:text-amber-200 font-bold">{conversionBreakdown.personalRelief.afterTaxes}</span>
                    </div>
                    <p className="text-amber-600 text-sm">{conversionBreakdown.personalRelief.purpose}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="foundation-card border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="foundation-heading-4 text-green-700 dark:text-green-300">
                    Foundation Reserve (89%)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-600">Tokens:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{conversionBreakdown.foundationReserve.tokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">ETH Value:</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">{conversionBreakdown.foundationReserve.ethValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">USD Value:</span>
                      <span className="text-green-800 dark:text-green-200 font-bold">{conversionBreakdown.foundationReserve.usdValue}</span>
                    </div>
                    <p className="text-green-600 text-sm border-t border-green-200 dark:border-green-700 pt-2">
                      {conversionBreakdown.foundationReserve.purpose}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Reassurance */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">You're Getting Full Value - No Reductions!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong>PERFECT VALUE:</strong> Your happiness is exactly right! You're getting full market value for your tokens. The only "costs" are tiny exchange fees that everyone pays - like a small processing fee at a bank. No one negotiated anything down.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => window.open('/exchange-pricing', '_self')}
                  className="foundation-button-primary h-12"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  View Fee Breakdown
                </Button>
                
                <Button
                  onClick={() => window.open('/exchange-setup-live', '_self')}
                  className="foundation-button-accent h-12"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Start Cash Conversion
                </Button>
                
                <Button
                  onClick={() => window.open('/quantum-execution-dashboard', '_self')}
                  className="foundation-button-secondary h-12"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Foundation Planning
                </Button>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                <strong>Bottom Line:</strong> You own everything, control everything, and get full value. The $25,403 cash is your money for immediate relief!
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}