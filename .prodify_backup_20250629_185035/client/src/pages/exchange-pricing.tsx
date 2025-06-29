import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  CheckCircle,
  Star,
  Building2,
  Calculator,
  ExternalLink,
  Shield,
  Clock
} from "lucide-react";

export default function ExchangePricing() {
  const exchangeComparison = {
    coinbase: {
      name: "Coinbase Pro",
      accountCost: "FREE",
      tradingFee: "0.5%",
      withdrawalFee: "FREE (ACH)",
      verification: "15-30 minutes",
      yourCost: {
        ethAmount: "17.52 ETH",
        grossValue: 42551.78,
        tradingFee: 212.76,
        withdrawalFee: 0,
        totalFees: 212.76,
        netAmount: 42339.02,
        bankTransferTime: "1-2 business days"
      },
      pros: [
        "No account fees",
        "Free ACH withdrawals", 
        "Fastest bank transfers",
        "Most user-friendly",
        "Excellent mobile app",
        "24/7 customer support"
      ],
      recommended: true
    },
    kraken: {
      name: "Kraken Pro",
      accountCost: "FREE",
      tradingFee: "0.26%",
      withdrawalFee: "$5 (wire)",
      verification: "30-60 minutes",
      yourCost: {
        ethAmount: "17.52 ETH",
        grossValue: 42551.78,
        tradingFee: 110.63,
        withdrawalFee: 5,
        totalFees: 115.63,
        netAmount: 42436.15,
        bankTransferTime: "1-3 business days"
      },
      pros: [
        "No account fees",
        "Lowest trading fees",
        "Strong security record",
        "Advanced trading tools",
        "Good for large amounts",
        "Detailed analytics"
      ],
      recommended: false
    }
  };

  const costComparison = [
    {
      category: "Account Setup",
      coinbase: "FREE",
      kraken: "FREE",
      winner: "tie"
    },
    {
      category: "Monthly Fees",
      coinbase: "FREE",
      kraken: "FREE", 
      winner: "tie"
    },
    {
      category: "Trading Fee (17.52 ETH)",
      coinbase: "$212.76 (0.5%)",
      kraken: "$110.63 (0.26%)",
      winner: "kraken"
    },
    {
      category: "Withdrawal Fee",
      coinbase: "FREE (ACH)",
      kraken: "$5 (wire)",
      winner: "coinbase"
    },
    {
      category: "Total Fees",
      coinbase: "$212.76",
      kraken: "$115.63",
      winner: "kraken"
    },
    {
      category: "Net USD Received",
      coinbase: "$42,339",
      kraken: "$42,436",
      winner: "kraken"
    },
    {
      category: "Transfer Speed", 
      coinbase: "1-2 days",
      kraken: "1-3 days",
      winner: "coinbase"
    }
  ];

  const finalCalculation = {
    coinbase: {
      netUsd: 42339,
      taxReserve: 16936, // 40%
      availableCash: 25403,
      savingsVsKraken: -97
    },
    kraken: {
      netUsd: 42436,
      taxReserve: 16974, // 40%
      availableCash: 25462,
      savingsVsCoinbase: 97
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="foundation-hero py-16 lg:py-20">
        <div className="foundation-container text-center space-y-6">
          <h1 className="foundation-heading-1 text-white foundation-fade-in">
            Exchange Pricing: FREE Accounts
          </h1>
          <p className="foundation-text-body text-white/90 max-w-3xl mx-auto foundation-slide-up">
            Both Coinbase Pro and Kraken Pro are completely free to use - you only pay trading fees
          </p>
          <div className="foundation-status-badge foundation-status-success foundation-fade-in">
            No Monthly Fees • No Account Costs • Only Pay When You Trade
          </div>
        </div>
      </div>

      <div className="foundation-container foundation-section space-y-12">

        {/* Quick Answer */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <CheckCircle className="h-7 w-7 mr-3" />
              Quick Answer: Both Are FREE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="foundation-card border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 mb-6">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="foundation-text-body text-green-800 dark:text-green-200">
                <strong>ZERO ACCOUNT FEES:</strong> Both Coinbase Pro and Kraken Pro are completely free to create and maintain. You only pay small trading fees when you convert ETH to USD (0.26-0.5%).
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-blue-700 dark:text-blue-300 font-bold">Coinbase Pro</h3>
                  <Badge className="bg-green-500 text-white">RECOMMENDED</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-600 text-sm">Account Cost:</span>
                    <span className="text-blue-800 dark:text-blue-200 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 text-sm">Monthly Fee:</span>
                    <span className="text-blue-800 dark:text-blue-200 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 text-sm">Trading Fee:</span>
                    <span className="text-blue-800 dark:text-blue-200 font-semibold">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600 text-sm">Your Total Cost:</span>
                    <span className="text-blue-800 dark:text-blue-200 font-bold">$212.76</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-purple-700 dark:text-purple-300 font-bold">Kraken Pro</h3>
                  <Badge className="bg-purple-500 text-white">LOWER FEES</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-purple-600 text-sm">Account Cost:</span>
                    <span className="text-purple-800 dark:text-purple-200 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600 text-sm">Monthly Fee:</span>
                    <span className="text-purple-800 dark:text-purple-200 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600 text-sm">Trading Fee:</span>
                    <span className="text-purple-800 dark:text-purple-200 font-semibold">0.26%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600 text-sm">Your Total Cost:</span>
                    <span className="text-purple-800 dark:text-purple-200 font-bold">$115.63</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Cost Comparison */}
        <Card className="foundation-card border-amber-200 dark:border-amber-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-amber-700 dark:text-amber-300">
              <Calculator className="h-7 w-7 mr-3" />
              Detailed Cost Breakdown for Your 17.52 ETH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-200 dark:border-amber-700">
                    <th className="text-left p-3 text-amber-700 dark:text-amber-300 font-semibold">Category</th>
                    <th className="text-center p-3 text-blue-700 dark:text-blue-300 font-semibold">Coinbase Pro</th>
                    <th className="text-center p-3 text-purple-700 dark:text-purple-300 font-semibold">Kraken Pro</th>
                    <th className="text-center p-3 text-green-700 dark:text-green-300 font-semibold">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {costComparison.map((row, index) => (
                    <tr key={index} className={`border-b border-amber-100 dark:border-amber-800 ${index % 2 === 0 ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
                      <td className="p-3 text-amber-800 dark:text-amber-200 font-medium">{row.category}</td>
                      <td className={`p-3 text-center ${row.winner === 'coinbase' ? 'font-bold text-green-700 dark:text-green-300' : 'text-blue-800 dark:text-blue-200'}`}>
                        {row.coinbase}
                        {row.winner === 'coinbase' && <Star className="h-4 w-4 text-green-500 inline ml-1" />}
                      </td>
                      <td className={`p-3 text-center ${row.winner === 'kraken' ? 'font-bold text-green-700 dark:text-green-300' : 'text-purple-800 dark:text-purple-200'}`}>
                        {row.kraken}
                        {row.winner === 'kraken' && <Star className="h-4 w-4 text-green-500 inline ml-1" />}
                      </td>
                      <td className="p-3 text-center">
                        {row.winner === 'tie' ? (
                          <Badge className="bg-gray-500 text-white">TIE</Badge>
                        ) : row.winner === 'coinbase' ? (
                          <Badge className="bg-blue-500 text-white">Coinbase</Badge>
                        ) : (
                          <Badge className="bg-purple-500 text-white">Kraken</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Final Cash Calculation */}
        <Card className="foundation-card border-green-200 dark:border-green-700 foundation-slide-up">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 flex items-center text-green-700 dark:text-green-300">
              <DollarSign className="h-7 w-7 mr-3" />
              Your Available Cash After Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="foundation-card border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="foundation-heading-4 text-blue-700 dark:text-blue-300 flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Coinbase Pro Route
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Net USD:</span>
                      <span className="text-blue-800 dark:text-blue-200 font-semibold">${finalCalculation.coinbase.netUsd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Tax Reserve (40%):</span>
                      <span className="text-blue-800 dark:text-blue-200 font-semibold">${finalCalculation.coinbase.taxReserve.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 dark:border-blue-700 pt-2">
                      <span className="text-blue-600 font-bold">Available Cash:</span>
                      <span className="text-blue-800 dark:text-blue-200 font-bold text-lg">${finalCalculation.coinbase.availableCash.toLocaleString()}</span>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-green-500 text-white">FASTEST SETUP</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="foundation-card border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="foundation-heading-4 text-purple-700 dark:text-purple-300 flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Kraken Pro Route
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-600">Net USD:</span>
                      <span className="text-purple-800 dark:text-purple-200 font-semibold">${finalCalculation.kraken.netUsd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Tax Reserve (40%):</span>
                      <span className="text-purple-800 dark:text-purple-200 font-semibold">${finalCalculation.kraken.taxReserve.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-purple-200 dark:border-purple-700 pt-2">
                      <span className="text-purple-600 font-bold">Available Cash:</span>
                      <span className="text-purple-800 dark:text-purple-200 font-bold text-lg">${finalCalculation.kraken.availableCash.toLocaleString()}</span>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-green-500 text-white">$97 MORE CASH</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 text-center">
              <Alert className="foundation-card border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700">
                <Calculator className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="foundation-text-body text-amber-800 dark:text-amber-200">
                  <strong>SAVINGS ANALYSIS:</strong> Kraken saves you $97 in fees but requires wire transfer setup. Coinbase costs $97 more but offers faster ACH transfers and easier setup. Both give you $25,400+ for immediate bills.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Recommendation */}
        <Card className="foundation-card border-2 border-green-200 dark:border-green-700 foundation-pulse-gentle">
          <CardHeader className="pb-6">
            <CardTitle className="foundation-heading-3 text-center">Choose Based on Your Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl">
                  <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <h3 className="text-blue-700 dark:text-blue-300 font-bold mb-2">Choose Coinbase Pro If:</h3>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>• You want fastest setup (15 min)</li>
                    <li>• You prefer easy bank transfers</li>
                    <li>• You want money in 1-2 days</li>
                    <li>• $97 fee difference doesn't matter</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl">
                  <DollarSign className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <h3 className="text-purple-700 dark:text-purple-300 font-bold mb-2">Choose Kraken Pro If:</h3>
                  <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                    <li>• You want to save $97 in fees</li>
                    <li>• You're comfortable with wire transfers</li>
                    <li>• You can wait 30-60 min verification</li>
                    <li>• Every dollar counts for bills</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open('https://pro.coinbase.com', '_blank')}
                  className="foundation-button-primary h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start Coinbase Pro (Fast)
                </Button>
                
                <Button
                  onClick={() => window.open('https://pro.kraken.com', '_blank')}
                  className="foundation-button-accent h-12"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start Kraken Pro (Cheaper)
                </Button>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                <strong>Bottom Line:</strong> Both are completely free accounts. You'll get $25,400+ in your bank account either way for immediate bill relief.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}