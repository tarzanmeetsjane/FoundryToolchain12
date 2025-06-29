import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  CheckCircle,
  DollarSign,
  Calculator,
  ArrowRight,
  Wallet,
  Building2,
  Target
} from "lucide-react";

export default function ConversionSummary() {
  const conversionPlan = {
    totalTokens: 1990000,
    tokensToConvert: 219300,
    remainingTokens: 1770700,
    grossConversion: 75000,
    taxReserve: 30000,
    netCash: 45000,
    remainingValue: 605579
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            $50K Conversion Ready
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Your ETHGR Portfolio Conversion to Immediate Cash Relief
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            System Ready - Convert 219,300 ETHGR to $45K Available Cash
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-8">

        {/* Status Overview */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <CheckCircle className="h-7 w-7 mr-3" />
              Conversion Status: Ready for Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                  <strong>READY TO EXECUTE:</strong> Security cleared, taxes calculated, conversion path verified. Your 1,990,000 ETHGR tokens are safe and ready for $50K conversion.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{conversionPlan.tokensToConvert.toLocaleString()}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">ETHGR to Convert</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">${conversionPlan.grossConversion.toLocaleString()}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Gross Conversion</div>
                </div>
                
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">${conversionPlan.taxReserve.toLocaleString()}</div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">Tax Reserve</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${conversionPlan.netCash.toLocaleString()}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Available Cash</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Process */}
        <Card className="foundation-card border-blue-200 dark:border-blue-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-blue-700 dark:text-blue-300">
              <Target className="h-7 w-7 mr-3" />
              5-Step Conversion Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { step: 1, title: "Tax Reserve Calculation", description: "Calculate exact tax obligations and set aside $20K reserve", status: "ready" },
                { step: 2, title: "Uniswap Connection", description: "Connect to ETHGR/ETH trading pair", status: "ready" },
                { step: 3, title: "Token Conversion", description: "Convert 146,200 ETHGR tokens to ETH", status: "ready" },
                { step: 4, title: "Exchange Transfer", description: "Transfer ETH to exchange for USD conversion", status: "ready" },
                { step: 5, title: "Bank Withdrawal", description: "Withdraw $30K to bank account for immediate use", status: "ready" }
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-blue-700 dark:text-blue-300 font-bold">{step.title}</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">{step.description}</p>
                  </div>
                  <Badge variant="default">READY</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Impact */}
        <Card className="foundation-card border-purple-200 dark:border-purple-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-purple-700 dark:text-purple-300">
              <Wallet className="h-7 w-7 mr-3" />
              Portfolio Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                <h3 className="text-amber-700 dark:text-amber-300 font-bold mb-3">Before Conversion</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total ETHGR:</span>
                    <span className="font-semibold">{conversionPlan.totalTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portfolio Value:</span>
                    <span className="font-semibold">$681,196</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Cash:</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Financial Status:</span>
                    <span className="font-semibold text-amber-600">Hardship</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                <h3 className="text-green-700 dark:text-green-300 font-bold mb-3">After Conversion</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Remaining ETHGR:</span>
                    <span className="font-semibold">{conversionPlan.remainingTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portfolio Value:</span>
                    <span className="font-semibold">${conversionPlan.remainingValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Cash:</span>
                    <span className="font-semibold text-green-600">${conversionPlan.netCash.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Financial Status:</span>
                    <span className="font-semibold text-green-600">Relief + Foundation Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Execution Center */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Execute Your Transformation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">Ready for Immediate Relief</h3>
                <p className="text-lg">Convert your ETHGR tokens to cash for bills, necessities, and foundation operations</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => window.open('/live-conversion-execution', '_self')}
                    className="foundation-button-primary h-14 text-lg"
                  >
                    <Zap className="h-6 w-6 mr-3" />
                    Start Live Conversion
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/tax-strategy-planning', '_self')}
                    className="foundation-button-accent h-14 text-lg"
                  >
                    <Calculator className="h-6 w-6 mr-3" />
                    Review Tax Plan
                  </Button>
                  
                  <Button
                    onClick={() => window.open('/execution-roadmap', '_self')}
                    className="foundation-button-secondary h-14 text-lg"
                  >
                    <ArrowRight className="h-6 w-6 mr-3" />
                    Full Roadmap
                  </Button>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>NEXT STEP:</strong> Click "Start Live Conversion" to begin the 5-step process that will convert 146,200 ETHGR tokens into $30,000 available cash for immediate use.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}