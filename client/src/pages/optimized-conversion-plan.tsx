import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp,
  Calculator,
  DollarSign,
  Target,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function OptimizedConversionPlan() {
  const [conversionAmount, setConversionAmount] = useState("75000");
  
  const portfolioData = {
    totalTokens: 1990000,
    tokenPrice: 0.342,
    totalValue: 681196.21
  };

  const calculateConversion = (amount: number) => {
    const tokensNeeded = Math.ceil(amount / portfolioData.tokenPrice);
    const taxReserve = amount * 0.40; // 40% for taxes
    const netCash = amount - taxReserve;
    const remainingTokens = portfolioData.totalTokens - tokensNeeded;
    const remainingValue = remainingTokens * portfolioData.tokenPrice;
    
    return {
      grossAmount: amount,
      tokensNeeded,
      taxReserve,
      netCash,
      remainingTokens,
      remainingValue,
      taxRate: 40
    };
  };

  const conversion = calculateConversion(parseFloat(conversionAmount));

  const conversionOptions = [
    {
      amount: 50000,
      description: "Conservative - Original Plan",
      highlight: false
    },
    {
      amount: 75000,
      description: "Optimized - More Relief",
      highlight: true
    },
    {
      amount: 100000,
      description: "Maximum - Substantial Relief",
      highlight: false
    },
    {
      amount: 125000,
      description: "Premium - Set for Success",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Optimized Conversion Plan
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Maximize Your Immediate Relief While Preserving Foundation Capital
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            Smart Tax Planning - Get More Cash While Staying Safe
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-8">

        {/* Tax Realization */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Calculator className="h-7 w-7 mr-3" />
              Tax Planning Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700">
              <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="foundation-text-body text-amber-800 dark:text-amber-200">
                <strong className="foundation-text-accent">SMART OBSERVATION:</strong> Since you're setting aside $20K for taxes anyway, we can increase the conversion amount and still maintain the same 40% tax reserve rate. This gets you more immediate cash relief.
              </AlertDescription>
            </Alert>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">40%</div>
                <div className="text-sm text-amber-700 dark:text-amber-300">Tax Reserve Rate</div>
                <div className="text-xs text-amber-800 dark:text-amber-200 mt-1">Stays the same</div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">60%</div>
                <div className="text-sm text-green-700 dark:text-green-300">Available Cash</div>
                <div className="text-xs text-green-800 dark:text-green-200 mt-1">Your spending money</div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$631K+</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Foundation Capital</div>
                <div className="text-xs text-blue-800 dark:text-blue-200 mt-1">Still massive</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Calculator */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Target className="h-7 w-7 mr-3" />
              Interactive Conversion Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="conversion-amount" className="text-blue-700 dark:text-blue-300 font-semibold">
                  Target Conversion Amount ($)
                </Label>
                <Input
                  id="conversion-amount"
                  value={conversionAmount}
                  onChange={(e) => setConversionAmount(e.target.value)}
                  placeholder="75000"
                  className="foundation-input text-lg h-12"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{conversion.tokensNeeded.toLocaleString()}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">ETHGR Needed</div>
                </div>
                
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">${conversion.taxReserve.toLocaleString()}</div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">Tax Reserve</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">${conversion.netCash.toLocaleString()}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Available Cash</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${conversion.remainingValue.toLocaleString()}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Foundation Value</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Options */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Recommended Conversion Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conversionOptions.map((option, index) => {
                const calc = calculateConversion(option.amount);
                return (
                  <div key={index} className={`p-6 border-2 rounded-xl transition-all cursor-pointer ${
                    option.highlight 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                      : 'bg-gray-50 dark:bg-gray-800/20 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                  onClick={() => setConversionAmount(option.amount.toString())}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">${option.amount.toLocaleString()}</h3>
                        {option.highlight && (
                          <Badge variant="default" className="bg-green-500">RECOMMENDED</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm opacity-75">{option.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Tokens Used:</span>
                          <span className="font-semibold">{calc.tokensNeeded.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax Reserve:</span>
                          <span className="font-semibold">${calc.taxReserve.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Available Cash:</span>
                          <span className="font-semibold text-green-600">${calc.netCash.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Foundation Left:</span>
                          <span className="font-bold">${calc.remainingValue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Impact Analysis */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <TrendingUp className="h-7 w-7 mr-3" />
              Impact Analysis: ${conversionAmount} Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-purple-700 dark:text-purple-300 font-bold">Immediate Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Pay all overdue bills immediately</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Stock up on groceries and necessities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Emergency fund for peace of mind</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Quality of life improvements</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-purple-700 dark:text-purple-300 font-bold">Foundation Impact</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Still ${conversion.remainingValue.toLocaleString()} for operations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Help 200+ victims with massive backing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Sustainable monthly income from yield</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">Personal security = stronger foundation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Execute Optimized Plan */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Execute Optimized Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong className="foundation-text-accent">OPTIMIZED PLAN:</strong> Convert ${conversionAmount} → Tax reserve ${conversion.taxReserve.toLocaleString()} → Available cash ${conversion.netCash.toLocaleString()} → Foundation capital ${conversion.remainingValue.toLocaleString()}
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">Get ${conversion.netCash.toLocaleString()} Available Cash</h3>
                <p className="text-lg">Same tax planning, more immediate relief for your financial hardship</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => window.open('/live-conversion-execution', '_self')}
                    className="foundation-button-primary h-14 text-lg"
                  >
                    <Zap className="h-6 w-6 mr-3" />
                    Execute ${conversionAmount} Conversion
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/tax-strategy-planning', '_self')}
                    className="foundation-button-accent h-14 text-lg"
                  >
                    <Calculator className="h-6 w-6 mr-3" />
                    Review Tax Details
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